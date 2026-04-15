import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { PlannerState, Wall, Opening, ColorOption } from './types';
import { getTemplate, getAllTemplates, resolveLockerColor } from './catalog';
import { lockerAABB, wallLength, cornerExclusionAABBs, getWallsWithLockers, wouldOverlap, clampLockerToRoom } from './geometry';

const WALL_HEIGHT = 108;
const DOOR_HEIGHT = 84;
const WINDOW_SILL = 36;
const WINDOW_HEAD = 72;

const WALL_HEX = 0xffffff;
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

/** Swatch photos for textured woodgrain melamine — shared across locker meshes; do not dispose with materials. */
const _woodgrainTexByUrl = new Map<string, THREE.Texture>();

function configureWoodgrainTexture(tex: THREE.Texture): void {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  // Repeat across each box face (UV 0–1) so tall panels show visible grain.
  tex.repeat.set(2.4, 2.4);
  tex.offset.set(0, 0);
  tex.rotation = 0;
  if (_renderer) {
    const maxA = _renderer.capabilities.getMaxAnisotropy();
    tex.anisotropy = Math.min(12, maxA);
  }
}

function refreshWoodgrainAnisotropy(): void {
  if (!_renderer) return;
  const maxA = Math.min(12, _renderer.capabilities.getMaxAnisotropy());
  for (const tex of _woodgrainTexByUrl.values()) {
    tex.anisotropy = maxA;
  }
}

const _woodgrainLoadStarted = new Set<string>();

/** Preload TW-* swatch JPGs so 3D bodies can use real woodgrain instead of flat hex. */
function preloadWoodgrainSwatches(): void {
  const urls = new Set<string>();
  for (const tmpl of getAllTemplates()) {
    for (const c of tmpl.colors) {
      if (c.group === 'woodgrain' && c.swatchImage) urls.add(c.swatchImage);
    }
  }
  for (const url of urls) {
    if (_woodgrainTexByUrl.has(url) || _woodgrainLoadStarted.has(url)) continue;
    _woodgrainLoadStarted.add(url);
    _texLoader.load(
      url,
      (tex) => {
        _woodgrainLoadStarted.delete(url);
        tex.userData.plannerWoodgrainUrl = url;
        configureWoodgrainTexture(tex);
        _woodgrainTexByUrl.set(url, tex);
        if (_scene && _state) {
          for (const lm of _lockerMeshes) {
            const locker = _state.lockers.find((l) => l.instanceId === lm.instanceId);
            const tmpl = locker ? getTemplate(locker.templateId) : undefined;
            const co = tmpl && locker ? resolveLockerColor(tmpl, locker.config.colorCode) : undefined;
            if (co?.swatchImage === url) rebuildLockerMesh(lm.instanceId);
          }
          highlightLocker(_selectedMeshId);
        }
      },
      undefined,
      () => {
        _woodgrainLoadStarted.delete(url);
      },
    );
  }
}

function createLockerBodyMaterials(
  colorOpt: ColorOption | undefined,
  baseHexNum: number,
): { woodMat: THREE.MeshStandardMaterial; innerMat: THREE.MeshStandardMaterial } {
  const url = colorOpt?.group === 'woodgrain' ? colorOpt.swatchImage : undefined;
  const tex = url ? _woodgrainTexByUrl.get(url) : undefined;

  if (tex) {
    const woodMat = new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.035,
      color: 0xffffff,
      roughness: 0.52,
      metalness: 0.02,
      envMapIntensity: 0.9,
    });
    const innerMat = new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.02,
      color: 0xc8c4be,
      roughness: 0.68,
      metalness: 0.02,
      envMapIntensity: 0.75,
    });
    return { woodMat, innerMat };
  }

  const woodMat = new THREE.MeshStandardMaterial({ color: baseHexNum, roughness: 0.6, metalness: 0.05 });
  const innerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseHexNum).multiplyScalar(0.8),
    roughness: 0.7,
    metalness: 0.03,
  });
  return { woodMat, innerMat };
}

/** Avoid disposing shared woodgrain textures when tearing down locker meshes. */
function disposeMaterialKeepSharedMaps(m: THREE.Material): void {
  if (m instanceof THREE.MeshStandardMaterial && m.map?.userData?.plannerWoodgrainUrl) {
    m.map = null;
    m.bumpMap = null;
  }
  m.dispose();
}

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
let _roomFloorMesh: THREE.Mesh | null = null;
let _wallMaterial: THREE.MeshStandardMaterial | null = null;
let _logoMesh: THREE.Mesh | null = null;
let _logoTexture: THREE.Texture | null = null;

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
  _scene = scene;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.0;
  _renderer = renderer;
  refreshWoodgrainAnisotropy();
  preloadWoodgrainSwatches();

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
  controls.dampingFactor = 0.15;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minDistance = 24;
  controls.maxDistance = span * 4;
  controls.update();
  _controls = controls;

  _initPos.copy(camera.position);
  _initTarget.copy(target);

  setupLights(scene, bounds);
  addFloor(scene, bounds, state);
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
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => disposeMaterialKeepSharedMaps(m));
    }
    if (o instanceof THREE.LineSegments) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  removeFloorLogo();
  _renderer?.dispose(); _renderer = null;
  _scene = null; _camera = null;
  _state = null; _onStateChange = null; _canvas = null;
  _lockerMeshes = []; _selectedMeshId = null; _roomFloorMesh = null; _wallMaterial = null;
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

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xf5efe6, 0.45));

  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(cx + span * 0.4, WALL_HEIGHT * 2.5, cz - span * 0.3);
  sun.target.position.set(cx, 0, cz);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
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

function addFloor(scene: THREE.Scene, b: Bounds, state: PlannerState): void {
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

  const floorHex = state.floorColor
    ? parseInt(state.floorColor.replace('#', ''), 16)
    : ROOM_FLOOR_HEX;
  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: floorHex, roughness: 0.7 }),
  );
  roomFloor.rotation.x = -Math.PI / 2;
  roomFloor.position.set(cx, 0, cz);
  roomFloor.receiveShadow = true;
  scene.add(roomFloor);
  _roomFloorMesh = roomFloor;
}

/* ── Room Name Label ───────────────────────────────────── */

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
  const wallHex = state.wallColor
    ? parseInt(state.wallColor.replace('#', ''), 16)
    : WALL_HEX;
  const wallMat = new THREE.MeshStandardMaterial({
    color: wallHex, roughness: 0.3, metalness: 0.0,
    emissive: wallHex, emissiveIntensity: 0.15,
  });
  _wallMaterial = wallMat;

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
  mesh.receiveShadow = false;
  scene.add(mesh);
}

/* ── Corner Zones ───────────────────────────────────────── */

function addCornerZones(scene: THREE.Scene, state: PlannerState): void {
  const occupied = getWallsWithLockers(state.walls, state.lockers);
  const zones = cornerExclusionAABBs(state.walls, occupied);
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
    const group = buildLockerGroup(locker, edgeMat, state.showBase, state.baseColor, state.edgebandColor || undefined);
    if (!group) continue;
    scene.add(group);
    _lockerMeshes.push({ instanceId: locker.instanceId, group });
  }
}

/* ── Open-Front Locker Geometry ─────────────────────────── */

const PANEL_T = 0.75;
const BASE_H = 4;
const BASE_RECESS = 2.5;
const VARSITY_IDS = new Set(['varsity']);

const FRAC_BOTTOM = 0.211;
const FRAC_BENCH = 0.033;
const FRAC_MIDDLE = 0.546;
const FRAC_SHELF = 0.033;
const FRAC_CUBBY = 0.177;

function addPanel(
  parent: THREE.Group,
  x: number, y: number, z: number,
  sx: number, sy: number, sz: number,
  mat: THREE.Material,
): void {
  if (sx <= 0 || sy <= 0 || sz <= 0) return;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
}

function addVentedPanel(
  group: THREE.Group,
  widthIn: number, bottomH: number, t: number, hd: number,
  mat: THREE.Material,
): void {
  const panelW = widthIn - t * 2;
  const totalH = bottomH - t;
  if (totalH <= 0 || panelW <= 0) return;

  addPanel(group, 0, t + totalH / 2, hd - t / 2, panelW, totalH, t, mat);

  const slotCount = 3;
  const slotW = panelW * 0.82;
  const slotH = 0.3;
  const spacing = totalH / (slotCount + 1);
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 1.0, metalness: 0 });
  for (let i = 1; i <= slotCount; i++) {
    const sy = t + spacing * i;
    addPanel(group, 0, sy, hd - t / 2 + 0.05, slotW, slotH, t + 0.1, darkMat);
  }
}

function addAccessories(
  group: THREE.Group,
  locker: import('./types').LockerInstance,
  h: number, widthIn: number, depthIn: number,
  hw: number, hd: number, t: number,
  bottomH: number, benchTop: number, cubbyBot: number,
  cubbyShelfTop: number, cubbyH: number, middleH: number,
  divX: number, bodyHex: number,
): void {
  const accs = locker.config.accessoryIds;
  if (accs.length === 0) return;

  const metalMat = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.25, metalness: 0.7 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4, metalness: 0.1 });
  const cushionHex = locker.config.cushionColorHex
    ? parseInt(locker.config.cushionColorHex.replace('#', ''), 16)
    : 0x1a1a1a;
  const cushionMat = new THREE.MeshStandardMaterial({ color: cushionHex, roughness: 0.85, metalness: 0.0 });

  if (accs.includes('lock_box')) {
    const doorCx = (-hw + t + divX) / 2;
    const cubbyDoorW = divX - (-hw + t);
    const lbX = doorCx + cubbyDoorW * 0.35;
    const lbY = cubbyShelfTop + cubbyH * 0.5;
    addPanel(group, lbX, lbY, hd + 0.2, 3, 4, 0.6, blackMat);
  }

  if (accs.includes('name_plate')) {
    const npW = 8;
    const npH = 2;
    const st = cubbyShelfTop - cubbyBot;
    addPanel(group, 0, cubbyBot + st / 2, hd + 0.15, npW, npH, 0.25, blackMat);
  }

  const hasSeatCushion = accs.includes('bottom_cushion') || accs.includes('top_bottom_cushions');
  if (hasSeatCushion) {
    const cw = widthIn - t * 4;
    const cd = depthIn - t * 2 - 1;
    addPanel(group, 0, benchTop + 1, 0, cw, 2, cd, cushionMat);
  }

  if (accs.includes('top_bottom_cushions')) {
    const bcW = widthIn - t * 4;
    const bcH = middleH * 0.5;
    addPanel(group, 0, benchTop + middleH * 0.35, -hd + t + 1, bcW, bcH, 2, cushionMat);
  }

  if (accs.includes('hooks_4')) {
    const hookY = cubbyBot - middleH * 0.2;
    const spacing = (widthIn - 6) / 3;
    for (let i = 0; i < 4; i++) {
      const hx = -hw + 3 + i * spacing;
      addPanel(group, hx, hookY, -hd + t + 0.2, 0.8, 3, 0.4, metalMat);
      addPanel(group, hx, hookY - 2, -hd + t + 0.9, 0.5, 1.5, 1, metalMat);
    }
  }

  if (accs.includes('skate_hooks')) {
    const skY = benchTop + middleH * 0.4;
    const armLen = 6;
    addPanel(group, -hw + t + 0.5, skY, -hd + depthIn * 0.3, 1, 0.5, armLen, metalMat);
    addPanel(group, -hw + t + 0.5, skY - 2.5, -hd + depthIn * 0.3 + armLen / 2, 1, 5, 0.5, metalMat);
    addPanel(group, hw - t - 0.5, skY, -hd + depthIn * 0.3, 1, 0.5, armLen, metalMat);
    addPanel(group, hw - t - 0.5, skY - 2.5, -hd + depthIn * 0.3 + armLen / 2, 1, 5, 0.5, metalMat);
  }

  if (accs.includes('custom_logo')) {
    const logoMat = new THREE.MeshStandardMaterial({ color: 0xfe5900, roughness: 0.5, metalness: 0.1 });
    const lw = Math.min(widthIn * 0.5, 12);
    const lh = Math.min(middleH * 0.2, 8);
    addPanel(group, 0, cubbyBot - middleH * 0.35, -hd + t + 0.15, lw, lh, 0.2, logoMat);
  }
}

/**
 * Build an accurate open-front wood sport locker matching the real product.
 * Geometry is built in local space (centered on width/depth, Y starts at 0)
 * then positioned/rotated by the wrapping group.
 */
function buildLockerGroup(
  locker: import('./types').LockerInstance,
  _edgeMat: THREE.LineBasicMaterial,
  showBase?: boolean,
  baseColorHex?: string,
  edgebandHex?: string,
): THREE.Group | null {
  const tmpl = getTemplate(locker.templateId);
  if (!tmpl) return null;

  const colorOpt = resolveLockerColor(tmpl, locker.config.colorCode);
  const hex = colorOpt ? parseInt(colorOpt.hex.replace('#', ''), 16) : 0xcccccc;
  const h = 76;
  const widthIn = locker.config.widthIn;
  const depthIn = locker.config.depthIn;

  const aabb = lockerAABB(locker);
  const cx = (aabb.minX + aabb.maxX) / 2;
  const cz = (aabb.minY + aabb.maxY) / 2;
  const rot = ((locker.rotationDeg % 360) + 360) % 360;

  const group = new THREE.Group();
  group.userData = { lockerId: locker.instanceId };
  group.position.set(cx, showBase ? BASE_H : 0, cz);
  if (rot === 90) group.rotation.y = Math.PI / 2;
  else if (rot === 180) group.rotation.y = Math.PI;
  else if (rot === 270) group.rotation.y = -Math.PI / 2;

  const isVarsity = VARSITY_IDS.has(locker.templateId);
  const hw = widthIn / 2;
  const hd = depthIn / 2;
  const t = PANEL_T;

  const bottomH = h * FRAC_BOTTOM;
  const benchThick = h * FRAC_BENCH;
  const middleH = h * FRAC_MIDDLE;
  const shelfThick = h * FRAC_SHELF;
  const cubbyH = h * FRAC_CUBBY;
  const benchTop = bottomH + benchThick;
  const cubbyBot = benchTop + middleH;
  const cubbyShelfTop = cubbyBot + shelfThick;

  const sideMidDepth = isVarsity ? depthIn : depthIn * 0.30;

  const { woodMat, innerMat } = createLockerBodyMaterials(colorOpt, hex);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.3, metalness: 0.65 });

  /* ── Back panel ──────────────────────────────────────── */
  addPanel(group, 0, h / 2, -hd + t / 2, widthIn, h, t, innerMat);

  /* ── Top + bottom surfaces ───────────────────────────── */
  addPanel(group, 0, h - t / 2, 0, widthIn, t, depthIn, woodMat);
  addPanel(group, 0, t / 2, 0, widthIn, t, depthIn, woodMat);

  /* ── Bench / seat ledge ──────────────────────────────── */
  addPanel(group, 0, bottomH + benchThick / 2, 0, widthIn, benchThick, depthIn, woodMat);

  /* ── Cubby shelf ─────────────────────────────────────── */
  addPanel(group, 0, cubbyBot + shelfThick / 2, 0, widthIn, shelfThick, depthIn, woodMat);

  /* ── Left side panel (3 sections) ────────────────────── */
  const sideBottomH = bottomH - t;
  const sideMidH = cubbyBot - benchTop;
  const sideTopH = h - cubbyBot;
  addPanel(group, -hw + t / 2, t + sideBottomH / 2, 0, t, sideBottomH, depthIn, woodMat);
  addPanel(group, -hw + t / 2, benchTop + sideMidH / 2, -hd + sideMidDepth / 2, t, sideMidH, sideMidDepth, woodMat);
  addPanel(group, -hw + t / 2, cubbyBot + sideTopH / 2, 0, t, sideTopH, depthIn, woodMat);

  /* ── Right side panel (3 sections) ───────────────────── */
  addPanel(group, hw - t / 2, t + sideBottomH / 2, 0, t, sideBottomH, depthIn, woodMat);
  addPanel(group, hw - t / 2, benchTop + sideMidH / 2, -hd + sideMidDepth / 2, t, sideMidH, sideMidDepth, woodMat);
  addPanel(group, hw - t / 2, cubbyBot + sideTopH / 2, 0, t, sideTopH, depthIn, woodMat);

  /* ── Cubby internal divider ──────────────────────────── */
  const divX = -hw + widthIn * 0.45;
  addPanel(group, divX, cubbyShelfTop + cubbyH / 2, 0, t, cubbyH, depthIn - t, innerMat);

  /* ── Cubby door (left enclosed compartment) ──────────── */
  const cubbyDoorW = divX - (-hw + t);
  const hasLockBox = locker.config.accessoryIds.includes('lock_box');
  if (cubbyDoorW > 1) {
    const doorCx = (-hw + t + divX) / 2;
    addPanel(group, doorCx, cubbyShelfTop + cubbyH / 2, hd - t / 2, cubbyDoorW, cubbyH, t, woodMat);
    if (!hasLockBox) {
      addPanel(group, doorCx + cubbyDoorW * 0.35, cubbyShelfTop + cubbyH * 0.5, hd + 0.2, 1, 1.5, 0.5, handleMat);
    }
  }

  /* ── Bottom compartment front panel ──────────────────── */
  const hasVent = locker.config.accessoryIds.includes('vented_front');
  if (hasVent) {
    addVentedPanel(group, widthIn, bottomH, t, hd, woodMat);
  } else {
    const bpW = widthIn - t * 2;
    const bpH = bottomH - t;
    if (bpW > 0 && bpH > 0) {
      addPanel(group, 0, t + bpH / 2, hd - t / 2, bpW, bpH, t, woodMat);
    }
  }

  /* ── Accessories ─────────────────────────────────────── */
  addAccessories(group, locker, h, widthIn, depthIn, hw, hd, t,
    bottomH, benchTop, cubbyBot, cubbyShelfTop, cubbyH, middleH, divX, hex);

  /* ── Front direction indicator (orange strip at base of open face) ── */
  const frontMat = new THREE.MeshStandardMaterial({
    color: 0xfe5900, roughness: 0.4, metalness: 0.1,
  });
  addPanel(group, 0, 0.4, hd + 0.2, widthIn * 0.5, 0.8, 0.4, frontMat);
  addPanel(group, 0, 0.4, hd + 0.8, widthIn * 0.15, 0.8, 0.8, frontMat);

  /* ── Kick-plate base (sits below the locker on the floor) ── */
  if (showBase) {
    const baseHex = baseColorHex ? parseInt(baseColorHex.replace('#', ''), 16) : 0x1a1a1a;
    const baseMat = new THREE.MeshStandardMaterial({ color: baseHex, roughness: 0.5, metalness: 0.15 });
    const baseDepth = depthIn - BASE_RECESS;
    addPanel(group, 0, -BASE_H / 2, -BASE_RECESS / 2, widthIn, BASE_H, baseDepth, baseMat);
  }

  /* ── Edgebanding (colored trim on all exposed panel edges) ─── */
  if (edgebandHex) {
    const ebColor = parseInt(edgebandHex.replace('#', ''), 16);
    const ebMat = new THREE.MeshStandardMaterial({ color: ebColor, roughness: 0.35, metalness: 0.05 });
    const ebW = 0.4;
    const ebD = 0.15;
    const midFrontZ = -hd + sideMidDepth;

    /* ── Front-face horizontal strips ─────────────────────── */
    addPanel(group, 0, h - t / 2, hd + ebD / 2, widthIn, ebW, ebD, ebMat);           // top
    addPanel(group, 0, t / 2, hd + ebD / 2, widthIn, ebW, ebD, ebMat);                // bottom
    addPanel(group, 0, bottomH + benchThick / 2, hd + ebD / 2, widthIn, ebW, ebD, ebMat); // bench
    addPanel(group, 0, cubbyBot + shelfThick / 2, hd + ebD / 2, widthIn, ebW, ebD, ebMat); // cubby shelf

    /* ── Front-face vertical strips (left & right sides) ──── */
    // Bottom section (full depth)
    addPanel(group, -hw + t / 2, t + sideBottomH / 2, hd + ebD / 2, ebW, sideBottomH, ebD, ebMat);
    addPanel(group, hw - t / 2, t + sideBottomH / 2, hd + ebD / 2, ebW, sideBottomH, ebD, ebMat);
    // Top/cubby section (full depth)
    addPanel(group, -hw + t / 2, cubbyBot + sideTopH / 2, hd + ebD / 2, ebW, sideTopH, ebD, ebMat);
    addPanel(group, hw - t / 2, cubbyBot + sideTopH / 2, hd + ebD / 2, ebW, sideTopH, ebD, ebMat);

    /* ── Middle open section — recessed side panel front edges ── */
    addPanel(group, -hw + t / 2, benchTop + sideMidH / 2, midFrontZ + ebD / 2, ebW, sideMidH, ebD, ebMat);
    addPanel(group, hw - t / 2, benchTop + sideMidH / 2, midFrontZ + ebD / 2, ebW, sideMidH, ebD, ebMat);

    /* ── Middle section — horizontal transition strips (bench → recess, recess → cubby shelf) ── */
    const transW = hd - midFrontZ;
    const lx = -hw + t / 2;
    const rx = hw - t / 2;
    // Left side: bench-level horizontal (connects front face to recessed face)
    addPanel(group, lx, benchTop + ebW / 2, midFrontZ + transW / 2, ebW, ebD, transW, ebMat);
    // Left side: cubby-shelf-level horizontal
    addPanel(group, lx, cubbyBot - ebW / 2, midFrontZ + transW / 2, ebW, ebD, transW, ebMat);
    // Right side: bench-level horizontal
    addPanel(group, rx, benchTop + ebW / 2, midFrontZ + transW / 2, ebW, ebD, transW, ebMat);
    // Right side: cubby-shelf-level horizontal
    addPanel(group, rx, cubbyBot - ebW / 2, midFrontZ + transW / 2, ebW, ebD, transW, ebMat);

    /* ── Side edges of horizontal panels (visible from left/right) ── */
    addPanel(group, -hw - ebD / 2, h - t / 2, 0, ebD, ebW, depthIn, ebMat);            // top left
    addPanel(group, hw + ebD / 2, h - t / 2, 0, ebD, ebW, depthIn, ebMat);             // top right
    addPanel(group, -hw - ebD / 2, t / 2, 0, ebD, ebW, depthIn, ebMat);                // bottom left
    addPanel(group, hw + ebD / 2, t / 2, 0, ebD, ebW, depthIn, ebMat);                 // bottom right
    addPanel(group, -hw - ebD / 2, bottomH + benchThick / 2, 0, ebD, ebW, depthIn, ebMat); // bench left
    addPanel(group, hw + ebD / 2, bottomH + benchThick / 2, 0, ebD, ebW, depthIn, ebMat);  // bench right
    addPanel(group, -hw - ebD / 2, cubbyBot + shelfThick / 2, 0, ebD, ebW, depthIn, ebMat); // cubby shelf left
    addPanel(group, hw + ebD / 2, cubbyBot + shelfThick / 2, 0, ebD, ebW, depthIn, ebMat);  // cubby shelf right

    /* ── Cubby divider — front edge ───────────────────────── */
    addPanel(group, divX, cubbyShelfTop + cubbyH / 2, hd + ebD / 2, ebW, cubbyH, ebD, ebMat);

    /* ── Bottom compartment front panel — top edge ────────── */
    const bpW = widthIn - t * 2;
    if (bpW > 0) {
      addPanel(group, 0, bottomH - ebW / 2, hd + ebD / 2, bpW, ebW, ebD, ebMat);
    }

    /* ── Cubby door — edgebanding around perimeter ────────── */
    if (cubbyDoorW > 1) {
      const doorCx = (-hw + t + divX) / 2;
      addPanel(group, doorCx, cubbyShelfTop + ebW / 2, hd + ebD / 2, cubbyDoorW, ebW, ebD, ebMat); // bottom
      addPanel(group, doorCx, cubbyShelfTop + cubbyH - ebW / 2, hd + ebD / 2, cubbyDoorW, ebW, ebD, ebMat); // top
      addPanel(group, -hw + t + ebW / 2, cubbyShelfTop + cubbyH / 2, hd + ebD / 2, ebW, cubbyH, ebD, ebMat); // left
      addPanel(group, divX - ebW / 2, cubbyShelfTop + cubbyH / 2, hd + ebD / 2, ebW, cubbyH, ebD, ebMat); // right
    }
  }

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
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => disposeMaterialKeepSharedMaps(m));
    }
  });
  const locker = _state.lockers.find((l) => l.instanceId === instanceId);
  if (!locker) { _lockerMeshes.splice(idx, 1); return; }
  const edgeMat = new THREE.LineBasicMaterial({ color: EDGE_HEX, transparent: true, opacity: 0.25 });
  const group = buildLockerGroup(locker, edgeMat, _state.showBase, _state.baseColor, _state.edgebandColor || undefined);
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

  clampLockerToRoom(locker, _state.walls);
  snapLocker3D(locker, _state);
  clampLockerToRoom(locker, _state.walls);

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
  const oldX = locker.x;
  const oldY = locker.y;
  locker.rotationDeg = (locker.rotationDeg + 90) % 360;
  clampLockerToRoom(locker, _state.walls);
  if (wouldOverlap(locker, _state.lockers, _state.openings, _state.walls)) {
    locker.rotationDeg = oldRot;
    locker.x = oldX;
    locker.y = oldY;
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

export function highlightAllLockers3D(): void {
  for (const lm of _lockerMeshes) {
    lm.group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.emissive.setHex(0xff5900);
            m.emissiveIntensity = 0.3;
          }
        }
      }
    });
  }
  _selectedMeshId = null;
}

export function clearSelection3D(): void {
  _selectedMeshId = null;
  highlightLocker(null);
}

export function rebuildLockerMesh3D(instanceId: string): void {
  rebuildLockerMesh(instanceId);
}

export function updateFloorColor3D(hex: string): void {
  if (!_roomFloorMesh) return;
  const mat = _roomFloorMesh.material as THREE.MeshStandardMaterial;
  mat.color.set(parseInt(hex.replace('#', ''), 16));
}

export function updateWallColor3D(hex: string): void {
  if (!_wallMaterial) return;
  const c = parseInt(hex.replace('#', ''), 16);
  _wallMaterial.color.set(c);
  _wallMaterial.emissive.set(c);
}

export function updateBaseColor3D(hex: string): void {
  if (!_state) return;
  _state.baseColor = hex;
  for (const lm of _lockerMeshes) rebuildLockerMesh(lm.instanceId);
}

export function toggleBase3D(show: boolean): void {
  if (!_state) return;
  _state.showBase = show;
  for (const lm of _lockerMeshes) rebuildLockerMesh(lm.instanceId);
}

export function updateEdgebandColor3D(hex: string): void {
  if (!_state) return;
  _state.edgebandColor = hex;
  for (const lm of _lockerMeshes) rebuildLockerMesh(lm.instanceId);
}

export function toggleEdgeband3D(show: boolean): void {
  if (!_state) return;
  _state.edgebandColor = show ? _state.edgebandColor || '' : '';
  for (const lm of _lockerMeshes) rebuildLockerMesh(lm.instanceId);
}

export function removeLockers3D(instanceIds: string[]): void {
  if (!_scene || !_state) return;
  for (const id of instanceIds) {
    const idx = _lockerMeshes.findIndex((lm) => lm.instanceId === id);
    if (idx === -1) continue;
    const old = _lockerMeshes[idx];
    _scene.remove(old.group);
    old.group.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => disposeMaterialKeepSharedMaps(m));
      }
    });
    _lockerMeshes.splice(idx, 1);
  }
  if (_selectedMeshId && instanceIds.includes(_selectedMeshId)) {
    _selectedMeshId = null;
    highlightLocker(null);
  }
}

/* ── Floor logo ────────────────────────────────────────── */

export function setFloorLogo(dataUrl: string): void {
  if (!_scene || !_state) return;
  removeFloorLogo();

  _texLoader.load(dataUrl, (tex: THREE.Texture) => {
    if (!_scene || !_state) return;
    tex.colorSpace = THREE.SRGBColorSpace;
    _logoTexture = tex;

    const b = roomBounds(_state);
    const roomW = b.maxX - b.minX;
    const roomD = b.maxZ - b.minZ;
    const cx = (b.minX + b.maxX) / 2;
    const cz = (b.minZ + b.maxZ) / 2;

    const imgAspect = tex.image.width / tex.image.height;
    const maxDim = Math.min(roomW, roomD) * 0.5;
    const logoW = imgAspect >= 1 ? maxDim : maxDim * imgAspect;
    const logoD = imgAspect >= 1 ? maxDim / imgAspect : maxDim;

    const geo = new THREE.PlaneGeometry(logoW, logoD);
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      transparent: true,
      roughness: 0.7,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(cx, 0.05, cz);
    mesh.receiveShadow = true;
    _scene.add(mesh);
    _logoMesh = mesh;
  });
}

export function removeFloorLogo(): void {
  if (_logoMesh && _scene) {
    _scene.remove(_logoMesh);
    _logoMesh.geometry.dispose();
    const mats = Array.isArray(_logoMesh.material) ? _logoMesh.material : [_logoMesh.material];
    mats.forEach((m) => (m as THREE.Material).dispose());
    _logoMesh = null;
  }
  if (_logoTexture) {
    _logoTexture.dispose();
    _logoTexture = null;
  }
}

/* ── Off-screen 3D snapshot (PDF / fundraising) ───────────────────
 * Does not touch interactive preview globals (_scene, _renderer, etc.).
 */

function snapshotAddFloor(scene: THREE.Scene, b: Bounds, state: PlannerState): void {
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

  const floorHex = state.floorColor
    ? parseInt(state.floorColor.replace('#', ''), 16)
    : ROOM_FLOOR_HEX;
  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: floorHex, roughness: 0.7 }),
  );
  roomFloor.rotation.x = -Math.PI / 2;
  roomFloor.position.set(cx, 0, cz);
  roomFloor.receiveShadow = true;
  scene.add(roomFloor);
}

function snapshotAddLockers(scene: THREE.Scene, state: PlannerState): void {
  const edgeMat = new THREE.LineBasicMaterial({ color: EDGE_HEX, transparent: true, opacity: 0.25 });
  for (const locker of state.lockers) {
    const group = buildLockerGroup(
      locker,
      edgeMat,
      state.showBase,
      state.baseColor,
      state.edgebandColor || undefined,
    );
    if (group) scene.add(group);
  }
  edgeMat.dispose();
}

function disposeSnapshotScene(scene: THREE.Scene): void {
  scene.traverse((o: THREE.Object3D) => {
    if (o instanceof THREE.Mesh) {
      o.geometry?.dispose();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material) =>
        disposeMaterialKeepSharedMaps(m),
      );
    }
    if (o instanceof THREE.LineSegments) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
}

function addSnapshotFloorLogo(scene: THREE.Scene, state: PlannerState, dataUrl: string): Promise<void> {
  const b = roomBounds(state);
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      dataUrl,
      (tex: THREE.Texture) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const roomW = b.maxX - b.minX;
        const roomD = b.maxZ - b.minZ;
        const cx = (b.minX + b.maxX) / 2;
        const cz = (b.minZ + b.maxZ) / 2;
        const img = tex.image as HTMLImageElement;
        const imgAspect = img.width / img.height;
        const maxDim = Math.min(roomW, roomD) * 0.5;
        const logoW = imgAspect >= 1 ? maxDim : maxDim * imgAspect;
        const logoD = imgAspect >= 1 ? maxDim / imgAspect : maxDim;
        const geo = new THREE.PlaneGeometry(logoW, logoD);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.7,
          metalness: 0,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(cx, 0.05, cz);
        mesh.receiveShadow = true;
        scene.add(mesh);
        resolve();
      },
      undefined,
      () => resolve(),
    );
  });
}

/**
 * Renders a one-off 3D view of the room (same style as the 3D preview modal) for PDFs and sharing.
 * Safe to call while the interactive 3D modal is closed; uses an isolated WebGL context.
 */
export async function capturePlanner3DDataURL(
  state: PlannerState,
  options?: {
    width?: number;
    height?: number;
    customLogoDataUrl?: string | null;
    /** >1 sharpens PDF/email snapshots on HiDPI displays (default 1). */
    pixelRatio?: number;
  },
): Promise<string | null> {
  const prevWallMaterial = _wallMaterial;
  const width = options?.width ?? 1600;
  const height = options?.height ?? 1000;
  const pixelRatio = Math.min(2, Math.max(1, options?.pixelRatio ?? 1));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SKY_HEX);
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    const bounds = roomBounds(state);
    setupLights(scene, bounds);
    snapshotAddFloor(scene, bounds, state);
    addWalls(scene, state);
    addCornerZones(scene, state);
    snapshotAddLockers(scene, state);

    const logoUrl = options?.customLogoDataUrl;
    if (logoUrl) {
      await addSnapshotFloorLogo(scene, state, logoUrl);
    }

    const cx = (bounds.minX + bounds.maxX) / 2;
    const cz = (bounds.minZ + bounds.maxZ) / 2;
    const span = Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ, 120);
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, span * 10);
    const dist = span * 1.2;
    camera.position.set(cx + dist * 0.6, dist * 0.8, cz + dist * 0.6);
    camera.lookAt(cx, WALL_HEIGHT * 0.3, cz);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: false,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;

    renderer.render(scene, camera);
    return renderer.domElement.toDataURL('image/png');
  } catch (e) {
    console.error('capturePlanner3DDataURL failed:', e);
    return null;
  } finally {
    _wallMaterial = prevWallMaterial;
    disposeSnapshotScene(scene);
    renderer?.dispose();
  }
}
