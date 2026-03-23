import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { PlannerState, Wall, Opening } from './types';
import { getTemplate, getAllTemplates } from './catalog';
import { lockerAABB, wallLength, cornerExclusionAABBs, wouldOverlap } from './geometry';

const WALL_HEIGHT = 108;
const DOOR_HEIGHT = 84;
const WINDOW_SILL = 36;
const WINDOW_HEAD = 72;

const WALL_HEX = 0xe8e4df;
const FLOOR_HEX = 0xf0eeeb;
const ROOM_FLOOR_HEX = 0xf5f3f0;
const EDGE_HEX = 0x333333;
const SKY_HEX = 0xd4dce6;

let _renderer: THREE.WebGLRenderer | null = null;
let _scene: THREE.Scene | null = null;
let _camera: THREE.PerspectiveCamera | null = null;
let _controls: OrbitControls | null = null;
let _frameId = 0;
let _resizeObs: ResizeObserver | null = null;
const _initPos = new THREE.Vector3();
const _initTarget = new THREE.Vector3();

let _state: PlannerState | null = null;
let _onStateChange: (() => void) | null = null;
let _canvas: HTMLCanvasElement | null = null;

const _texCache = new Map<string, THREE.Texture>();
const _texLoader = new THREE.TextureLoader();
_texLoader.crossOrigin = 'anonymous';

function preloadTextures(): void {
  for (const tmpl of getAllTemplates()) {
    if (!tmpl.heroImage || _texCache.has(tmpl.templateId)) continue;
    const id = tmpl.templateId;
    _texLoader.load(tmpl.heroImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      _texCache.set(id, tex);
      if (_scene && _state) {
        for (const lm of _lockerMeshes) {
          const locker = _state.lockers.find((l) => l.instanceId === lm.instanceId);
          if (locker?.templateId === id) rebuildLockerMesh(lm.instanceId);
        }
        highlightLocker(_selectedMeshId);
      }
    });
  }
}

const _raycaster = new THREE.Raycaster();
const _mouse = new THREE.Vector2();
const _floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _intersectPt = new THREE.Vector3();

type LockerMeshData = {
  instanceId: string;
  group: THREE.Group;
};
let _lockerMeshes: LockerMeshData[] = [];
let _selectedMeshId: string | null = null;
let _isDragging3D = false;
let _dragOffset = new THREE.Vector3();

export function launch3DPreview(
  state: PlannerState,
  canvas: HTMLCanvasElement,
  onStateChange?: () => void,
): void {
  dispose3DPreview();
  preloadTextures();

  _state = state;
  _onStateChange = onStateChange ?? null;
  _canvas = canvas;
  _lockerMeshes = [];
  _selectedMeshId = null;
  _isDragging3D = false;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SKY_HEX);
  scene.fog = new THREE.Fog(SKY_HEX, 800, 3000);
  _scene = scene;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  _renderer = renderer;

  const bounds = roomBounds(state);
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cz = (bounds.minZ + bounds.maxZ) / 2;
  const span = Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ, 120);

  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    1,
    span * 10,
  );
  const dist = span * 1.2;
  camera.position.set(cx + dist * 0.6, dist * 0.8, cz + dist * 0.6);
  _camera = camera;

  const target = new THREE.Vector3(cx, WALL_HEIGHT * 0.3, cz);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = 24;
  controls.maxDistance = span * 4;
  controls.update();
  _controls = controls;

  _initPos.copy(camera.position);
  _initTarget.copy(target);

  setupLights(scene, bounds);
  addFloor(scene, bounds);
  addWalls(scene, state);
  addCornerZones(scene, state);
  addLockers(scene, state);

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  _resizeObs = new ResizeObserver(() => {
    if (!_renderer || !_camera) return;
    _renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    _camera.aspect = canvas.clientWidth / canvas.clientHeight;
    _camera.updateProjectionMatrix();
  });
  _resizeObs.observe(canvas);

  canvas.addEventListener('pointerdown', on3DPointerDown);
  canvas.addEventListener('pointermove', on3DPointerMove);
  canvas.addEventListener('pointerup', on3DPointerUp);
  canvas.addEventListener('dblclick', on3DDblClick);
  canvas.addEventListener('keydown', on3DKeyDown);
  canvas.tabIndex = 0;

  (function loop() {
    _frameId = requestAnimationFrame(loop);
    _controls?.update();
    _renderer!.render(_scene!, _camera!);
  })();
}

export function dispose3DPreview(): void {
  if (_frameId) { cancelAnimationFrame(_frameId); _frameId = 0; }
  _resizeObs?.disconnect(); _resizeObs = null;
  _controls?.dispose(); _controls = null;

  if (_canvas) {
    _canvas.removeEventListener('pointerdown', on3DPointerDown);
    _canvas.removeEventListener('pointermove', on3DPointerMove);
    _canvas.removeEventListener('pointerup', on3DPointerUp);
    _canvas.removeEventListener('dblclick', on3DDblClick);
    _canvas.removeEventListener('keydown', on3DKeyDown);
  }

  _scene?.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    }
    if (o instanceof THREE.LineSegments) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  _renderer?.dispose(); _renderer = null;
  _scene = null; _camera = null;
  _state = null; _onStateChange = null; _canvas = null;
  _lockerMeshes = []; _selectedMeshId = null;
}

export function resetCamera(): void {
  if (!_camera || !_controls) return;
  _camera.position.copy(_initPos);
  _controls.target.copy(_initTarget);
  _controls.update();
}

/* ── Bounds ─────────────────────────────────────────────── */

interface Bounds { minX: number; maxX: number; minZ: number; maxZ: number }

function roomBounds(state: PlannerState): Bounds {
  if (state.walls.length === 0) return { minX: 0, maxX: 120, minZ: 0, maxZ: 120 };
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const w of state.walls) {
    minX = Math.min(minX, w.start.x, w.end.x);
    maxX = Math.max(maxX, w.start.x, w.end.x);
    minZ = Math.min(minZ, w.start.y, w.end.y);
    maxZ = Math.max(maxZ, w.start.y, w.end.y);
  }
  return { minX, maxX, minZ, maxZ };
}

/* ── Lighting ───────────────────────────────────────────── */

function setupLights(scene: THREE.Scene, b: Bounds): void {
  const cx = (b.minX + b.maxX) / 2;
  const cz = (b.minZ + b.maxZ) / 2;
  const span = Math.max(b.maxX - b.minX, b.maxZ - b.minZ, 120);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  scene.add(new THREE.HemisphereLight(0xddeeff, 0xf5efe6, 0.5));

  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(cx + span * 0.4, WALL_HEIGHT * 2.5, cz - span * 0.3);
  sun.target.position.set(cx, 0, cz);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const se = span * 0.8;
  Object.assign(sun.shadow.camera, { left: -se, right: se, top: se, bottom: -se, near: 1, far: span * 4 });
  sun.shadow.bias = -0.001;
  scene.add(sun);
  scene.add(sun.target);

  const fill = new THREE.DirectionalLight(0xfff4e5, 0.3);
  fill.position.set(cx - span * 0.3, WALL_HEIGHT * 1.5, cz + span * 0.4);
  scene.add(fill);
}

/* ── Floor ──────────────────────────────────────────────── */

function addFloor(scene: THREE.Scene, b: Bounds): void {
  const w = b.maxX - b.minX;
  const d = b.maxZ - b.minZ;
  const cx = (b.minX + b.maxX) / 2;
  const cz = (b.minZ + b.maxZ) / 2;
  const pad = Math.max(w, d) * 0.5;

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(w + pad * 2, d + pad * 2),
    new THREE.MeshStandardMaterial({ color: FLOOR_HEX, roughness: 0.85 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(cx, -0.1, cz);
  ground.receiveShadow = true;
  scene.add(ground);

  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: ROOM_FLOOR_HEX, roughness: 0.7 }),
  );
  roomFloor.rotation.x = -Math.PI / 2;
  roomFloor.position.set(cx, 0, cz);
  roomFloor.receiveShadow = true;
  scene.add(roomFloor);
}

/* ── Walls ──────────────────────────────────────────────── */

interface Segment { along0: number; along1: number; y0: number; y1: number }

function wallSegments(wLen: number, openings: Opening[]): Segment[] {
  const cuts = openings
    .filter((o) => o.type === 'door' || o.type === 'window')
    .sort((a, b) => a.offsetAlongWall - b.offsetAlongWall);

  if (cuts.length === 0) {
    return [{ along0: 0, along1: wLen, y0: 0, y1: WALL_HEIGHT }];
  }

  const segs: Segment[] = [];
  let cursor = 0;

  for (const op of cuts) {
    const os = op.offsetAlongWall;
    const oe = os + op.widthIn;

    if (os > cursor) {
      segs.push({ along0: cursor, along1: os, y0: 0, y1: WALL_HEIGHT });
    }

    if (op.type === 'door') {
      if (WALL_HEIGHT > DOOR_HEIGHT) {
        segs.push({ along0: os, along1: oe, y0: DOOR_HEIGHT, y1: WALL_HEIGHT });
      }
    } else {
      if (WINDOW_SILL > 0) {
        segs.push({ along0: os, along1: oe, y0: 0, y1: WINDOW_SILL });
      }
      if (WINDOW_HEAD < WALL_HEIGHT) {
        segs.push({ along0: os, along1: oe, y0: WINDOW_HEAD, y1: WALL_HEIGHT });
      }
    }

    cursor = oe;
  }

  if (cursor < wLen) {
    segs.push({ along0: cursor, along1: wLen, y0: 0, y1: WALL_HEIGHT });
  }
  return segs;
}

function addWalls(scene: THREE.Scene, state: PlannerState): void {
  const wallMat = new THREE.MeshStandardMaterial({ color: WALL_HEX, roughness: 0.9 });

  for (const wall of state.walls) {
    const len = wallLength(wall);
    if (len === 0) continue;

    const ops = state.openings.filter((o) => o.wallId === wall.id);
    const segs = wallSegments(len, ops);

    for (const seg of segs) {
      placeWallBlock(scene, wall, len, seg, wallMat);
    }
  }
}

function placeWallBlock(
  scene: THREE.Scene,
  wall: Wall,
  len: number,
  seg: Segment,
  mat: THREE.MeshStandardMaterial,
): void {
  const segW = seg.along1 - seg.along0;
  const segH = seg.y1 - seg.y0;
  if (segW <= 0 || segH <= 0) return;

  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const ax = dx / len;
  const ay = dy / len;

  const mid = (seg.along0 + seg.along1) / 2;
  const px = wall.start.x + ax * mid;
  const pz = wall.start.y + ay * mid;
  const py = (seg.y0 + seg.y1) / 2;

  const geo = new THREE.BoxGeometry(segW, segH, wall.thicknessIn);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(px, py, pz);
  mesh.rotation.y = -Math.atan2(ay, ax);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

/* ── Corner Zones ───────────────────────────────────────── */

function addCornerZones(scene: THREE.Scene, state: PlannerState): void {
  const zones = cornerExclusionAABBs(state.walls);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff5900,
    transparent: true,
    opacity: 0.15,
    roughness: 1,
    side: THREE.DoubleSide,
  });
  for (const zone of zones) {
    const w = zone.maxX - zone.minX;
    const d = zone.maxY - zone.minY;
    if (w <= 0 || d <= 0) continue;
    const geo = new THREE.PlaneGeometry(w, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(
      (zone.minX + zone.maxX) / 2,
      0.2,
      (zone.minY + zone.maxY) / 2,
    );
    scene.add(mesh);
  }
}

/* ── Lockers ────────────────────────────────────────────── */

function addLockers(scene: THREE.Scene, state: PlannerState): void {
  _lockerMeshes = [];
  const edgeMat = new THREE.LineBasicMaterial({ color: EDGE_HEX, transparent: true, opacity: 0.25 });

  for (const locker of state.lockers) {
    const group = buildLockerGroup(locker, edgeMat);
    if (!group) continue;
    scene.add(group);
    _lockerMeshes.push({ instanceId: locker.instanceId, group });
  }
}

function buildLockerGroup(
  locker: import('./types').LockerInstance,
  edgeMat: THREE.LineBasicMaterial,
): THREE.Group | null {
  const tmpl = getTemplate(locker.templateId);
  if (!tmpl) return null;

  const colorOpt = tmpl.colors.find((c) => c.code === locker.config.colorCode);
  const hex = colorOpt ? parseInt(colorOpt.hex.replace('#', ''), 16) : 0xcccccc;
  const h = tmpl.geometry.heightIn;

  const aabb = lockerAABB(locker);
  const w = aabb.maxX - aabb.minX;
  const d = aabb.maxY - aabb.minY;
  const cx = (aabb.minX + aabb.maxX) / 2;
  const cz = (aabb.minY + aabb.maxY) / 2;

  const group = new THREE.Group();
  group.userData = { lockerId: locker.instanceId };

  const bodyGeo = new THREE.BoxGeometry(w, h, d);
  const tex = _texCache.get(locker.templateId) ?? null;

  let bodyMat: THREE.MeshStandardMaterial;
  if (tex) {
    const faceMats: THREE.MeshStandardMaterial[] = [];
    const sideMat = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.6, metalness: 0.05 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: tex.clone(),
      color: new THREE.Color(hex).lerp(new THREE.Color(0xffffff), 0.6),
      roughness: 0.55,
      metalness: 0.03,
    });
    frontMat.map!.needsUpdate = true;
    // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
    faceMats.push(sideMat, sideMat, sideMat, sideMat, frontMat, sideMat);
    const body = new THREE.Mesh(bodyGeo, faceMats);
    body.position.set(cx, h / 2, cz);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
  } else {
    bodyMat = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.6, metalness: 0.05 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(cx, h / 2, cz);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
  }

  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), edgeMat);
  edges.position.set(cx, h / 2, cz);
  group.add(edges);

  const shelfY = h * 0.55;
  const inset = 0.5;
  const shelfGeo = new THREE.BoxGeometry(w - inset * 2, 0.75, d - inset * 2);
  const shelfMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex).multiplyScalar(0.9),
    roughness: 0.7,
  });
  const shelf = new THREE.Mesh(shelfGeo, shelfMat);
  shelf.position.set(cx, shelfY, cz);
  group.add(shelf);

  return group;
}

function highlightLocker(instanceId: string | null): void {
  for (const lm of _lockerMeshes) {
    const isSelected = lm.instanceId === instanceId;
    lm.group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.emissive.setHex(isSelected ? 0xff5900 : 0x000000);
            m.emissiveIntensity = isSelected ? 0.3 : 0;
          }
        }
      }
    });
  }
}

function rebuildLockerMesh(instanceId: string): void {
  if (!_scene || !_state) return;
  const idx = _lockerMeshes.findIndex((lm) => lm.instanceId === instanceId);
  if (idx === -1) return;
  const old = _lockerMeshes[idx];
  _scene.remove(old.group);
  old.group.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    }
  });
  const locker = _state.lockers.find((l) => l.instanceId === instanceId);
  if (!locker) { _lockerMeshes.splice(idx, 1); return; }
  const edgeMat = new THREE.LineBasicMaterial({ color: EDGE_HEX, transparent: true, opacity: 0.25 });
  const group = buildLockerGroup(locker, edgeMat);
  if (group) {
    _scene.add(group);
    _lockerMeshes[idx] = { instanceId, group };
    highlightLocker(_selectedMeshId);
  }
}

/* ── 3D Interaction ─────────────────────────────────────── */

function canvasToNDC(e: PointerEvent | MouseEvent): THREE.Vector2 {
  if (!_canvas) return _mouse;
  const rect = _canvas.getBoundingClientRect();
  _mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  _mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  return _mouse;
}

function hitTestLockers(e: PointerEvent | MouseEvent): LockerMeshData | null {
  if (!_camera || !_scene) return null;
  canvasToNDC(e);
  _raycaster.setFromCamera(_mouse, _camera);
  const allMeshes: THREE.Object3D[] = [];
  for (const lm of _lockerMeshes) lm.group.traverse((o) => { if (o instanceof THREE.Mesh) allMeshes.push(o); });
  const hits = _raycaster.intersectObjects(allMeshes, false);
  if (hits.length === 0) return null;
  let obj = hits[0].object;
  while (obj.parent && !obj.userData.lockerId) obj = obj.parent;
  const lockerId = obj.userData.lockerId as string | undefined;
  if (!lockerId) return null;
  return _lockerMeshes.find((lm) => lm.instanceId === lockerId) ?? null;
}

function getFloorPoint(e: PointerEvent | MouseEvent): THREE.Vector3 | null {
  if (!_camera) return null;
  canvasToNDC(e);
  _raycaster.setFromCamera(_mouse, _camera);
  const hit = _raycaster.ray.intersectPlane(_floorPlane, _intersectPt);
  return hit;
}

function on3DPointerDown(e: PointerEvent): void {
  if (!_state || !_canvas) return;
  const hit = hitTestLockers(e);
  if (hit) {
    _selectedMeshId = hit.instanceId;
    _state.selection = { type: 'locker', id: hit.instanceId };
    highlightLocker(hit.instanceId);

    const locker = _state.lockers.find((l) => l.instanceId === hit.instanceId);
    if (locker) {
      const fp = getFloorPoint(e);
      if (fp) {
        const aabb = lockerAABB(locker);
        const cx = (aabb.minX + aabb.maxX) / 2;
        const cz = (aabb.minY + aabb.maxY) / 2;
        _dragOffset.set(fp.x - cx, 0, fp.z - cz);
        _isDragging3D = true;
        if (_controls) _controls.enabled = false;
        _canvas.setPointerCapture(e.pointerId);
      }
    }
    _onStateChange?.();
  } else {
    _selectedMeshId = null;
    _state.selection = null;
    highlightLocker(null);
    _onStateChange?.();
  }
}

const SNAP_DIST_IN = 4;

function snapLocker3D(target: import('./types').LockerInstance, state: PlannerState): void {
  const box = lockerAABB(target);
  let bestDx = Infinity;
  let bestDy = Infinity;

  for (const other of state.lockers) {
    if (other.instanceId === target.instanceId) continue;
    const ob = lockerAABB(other);

    for (const edge of [
      { from: box.maxX, to: ob.minX },
      { from: box.minX, to: ob.maxX },
      { from: box.minX, to: ob.minX },
      { from: box.maxX, to: ob.maxX },
    ]) {
      const d = edge.to - edge.from;
      if (Math.abs(d) < Math.abs(bestDx) && Math.abs(d) < SNAP_DIST_IN) bestDx = d;
    }

    for (const edge of [
      { from: box.maxY, to: ob.minY },
      { from: box.minY, to: ob.maxY },
      { from: box.minY, to: ob.minY },
      { from: box.maxY, to: ob.maxY },
    ]) {
      const d = edge.to - edge.from;
      if (Math.abs(d) < Math.abs(bestDy) && Math.abs(d) < SNAP_DIST_IN) bestDy = d;
    }
  }

  for (const wall of state.walls) {
    const halfT = wall.thicknessIn / 2;
    const isHoriz = Math.abs(wall.end.y - wall.start.y) < 0.01;

    if (isHoriz) {
      const innerY = wall.start.y + (wall.id === 'Wall A' ? halfT : -halfT);
      const dTop = innerY - box.minY;
      const dBot = innerY - box.maxY;
      if (Math.abs(dTop) < Math.abs(bestDy) && Math.abs(dTop) < SNAP_DIST_IN) bestDy = dTop;
      if (Math.abs(dBot) < Math.abs(bestDy) && Math.abs(dBot) < SNAP_DIST_IN) bestDy = dBot;

      const xMin = Math.min(wall.start.x, wall.end.x) + halfT;
      const xMax = Math.max(wall.start.x, wall.end.x) - halfT;
      const dL = xMin - box.minX;
      const dR = xMax - box.maxX;
      if (Math.abs(dL) < Math.abs(bestDx) && Math.abs(dL) < SNAP_DIST_IN) bestDx = dL;
      if (Math.abs(dR) < Math.abs(bestDx) && Math.abs(dR) < SNAP_DIST_IN) bestDx = dR;
    } else {
      const innerX = wall.start.x + (wall.id === 'Wall D' ? halfT : -halfT);
      const dLeft = innerX - box.minX;
      const dRight = innerX - box.maxX;
      if (Math.abs(dLeft) < Math.abs(bestDx) && Math.abs(dLeft) < SNAP_DIST_IN) bestDx = dLeft;
      if (Math.abs(dRight) < Math.abs(bestDx) && Math.abs(dRight) < SNAP_DIST_IN) bestDx = dRight;

      const yMin = Math.min(wall.start.y, wall.end.y) + halfT;
      const yMax = Math.max(wall.start.y, wall.end.y) - halfT;
      const dT = yMin - box.minY;
      const dB = yMax - box.maxY;
      if (Math.abs(dT) < Math.abs(bestDy) && Math.abs(dT) < SNAP_DIST_IN) bestDy = dT;
      if (Math.abs(dB) < Math.abs(bestDy) && Math.abs(dB) < SNAP_DIST_IN) bestDy = dB;
    }
  }

  if (Math.abs(bestDx) < SNAP_DIST_IN) target.x += bestDx;
  if (Math.abs(bestDy) < SNAP_DIST_IN) target.y += bestDy;
}

function on3DPointerMove(e: PointerEvent): void {
  if (!_isDragging3D || !_state || !_selectedMeshId) return;
  const locker = _state.lockers.find((l) => l.instanceId === _selectedMeshId);
  if (!locker) return;
  const fp = getFloorPoint(e);
  if (!fp) return;

  const aabb = lockerAABB(locker);
  const hw = (aabb.maxX - aabb.minX) / 2;
  const hd = (aabb.maxY - aabb.minY) / 2;
  const newCx = fp.x - _dragOffset.x;
  const newCz = fp.z - _dragOffset.z;
  const oldX = locker.x;
  const oldY = locker.y;

  locker.x = newCx - hw;
  locker.y = newCz - hd;

  snapLocker3D(locker, _state);

  if (wouldOverlap(locker, _state.lockers, _state.openings, _state.walls)) {
    locker.x = oldX;
    locker.y = oldY;
    return;
  }

  rebuildLockerMesh(locker.instanceId);
  _onStateChange?.();
}

function on3DPointerUp(e: PointerEvent): void {
  if (_isDragging3D) {
    _isDragging3D = false;
    if (_controls) _controls.enabled = true;
    _canvas?.releasePointerCapture(e.pointerId);
  }
}

function on3DDblClick(e: MouseEvent): void {
  if (!_state) return;
  const hit = hitTestLockers(e);
  if (!hit) return;
  rotateLocker3D(hit.instanceId);
}

function on3DKeyDown(e: KeyboardEvent): void {
  if (!_state || !_selectedMeshId) return;
  if (e.key === 'r' || e.key === 'R') {
    rotateLocker3D(_selectedMeshId);
  }
}

function rotateLocker3D(instanceId: string): void {
  if (!_state) return;
  const locker = _state.lockers.find((l) => l.instanceId === instanceId);
  if (!locker) return;
  const oldRot = locker.rotationDeg;
  locker.rotationDeg = (locker.rotationDeg + 90) % 360;
  if (wouldOverlap(locker, _state.lockers, _state.openings, _state.walls)) {
    locker.rotationDeg = oldRot;
    return;
  }
  rebuildLockerMesh(instanceId);
  _onStateChange?.();
}

export function rotateSelected3D(): void {
  if (_selectedMeshId) rotateLocker3D(_selectedMeshId);
}

export function hasSelection3D(): boolean {
  return _selectedMeshId !== null;
}
