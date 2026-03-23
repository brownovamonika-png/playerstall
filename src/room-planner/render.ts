import type { PlannerState, Camera } from './types';
import { getTemplate, getAllTemplates } from './catalog';
import { lockerAABB, openingExclusionAABB, wallLength, cornerExclusionAABBs } from './geometry';
import { formatDimension } from './units';

const _imgCache = new Map<string, HTMLImageElement>();
let _imagesPreloaded = false;

function preloadLockerImages(): void {
  if (_imagesPreloaded) return;
  _imagesPreloaded = true;
  for (const tmpl of getAllTemplates()) {
    if (!tmpl.heroImage || _imgCache.has(tmpl.templateId)) continue;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = tmpl.heroImage;
    _imgCache.set(tmpl.templateId, img);
  }
}

function getLockerImage(templateId: string): HTMLImageElement | null {
  const img = _imgCache.get(templateId);
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

const BRAND_ORANGE = '#fe5900';
const WALL_COLOR = '#333';
const FLOOR_COLOR = '#f9f9f7';
const GRID_COLOR = '#e5e5e5';
const LOCKER_STROKE = '#555';
const SELECTED_STROKE = BRAND_ORANGE;
const DOOR_COLOR = '#5a9fd4';
const WINDOW_COLOR = '#6dc46d';
const OBSTACLE_COLOR = '#d4a05a';

/** World inches → canvas pixel x. */
function wx(val: number, cam: Camera, canvasW: number): number {
  return (val - cam.centerX) * cam.pixelsPerInch + canvasW / 2;
}

/** World inches → canvas pixel y. */
function wy(val: number, cam: Camera, canvasH: number): number {
  return (val - cam.centerY) * cam.pixelsPerInch + canvasH / 2;
}

/** Full render pass. */
export function render(ctx: CanvasRenderingContext2D, state: PlannerState): void {
  preloadLockerImages();

  const canvas = ctx.canvas;
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;

  if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  drawGrid(ctx, state, cssW, cssH);
  drawFloor(ctx, state, cssW, cssH);
  drawWalls(ctx, state, cssW, cssH);
  drawOpenings(ctx, state, cssW, cssH);
  drawCornerZones(ctx, state, cssW, cssH);
  drawLockers(ctx, state, cssW, cssH);
}

function drawGrid(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const cam = state.camera;
  const ppi = cam.pixelsPerInch;
  if (ppi < 0.3) return;

  let stepIn = 12;
  if (ppi > 1.5) stepIn = 6;
  if (ppi > 4) stepIn = 1;

  const worldLeft = cam.centerX - cw / 2 / ppi;
  const worldRight = cam.centerX + cw / 2 / ppi;
  const worldTop = cam.centerY - ch / 2 / ppi;
  const worldBottom = cam.centerY + ch / 2 / ppi;

  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  const startX = Math.floor(worldLeft / stepIn) * stepIn;
  for (let x = startX; x <= worldRight; x += stepIn) {
    const px = wx(x, cam, cw);
    ctx.moveTo(px, 0);
    ctx.lineTo(px, ch);
  }

  const startY = Math.floor(worldTop / stepIn) * stepIn;
  for (let y = startY; y <= worldBottom; y += stepIn) {
    const py = wy(y, cam, ch);
    ctx.moveTo(0, py);
    ctx.lineTo(cw, py);
  }

  ctx.stroke();
}

function drawFloor(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const { walls, camera: cam } = state;
  if (walls.length < 3) return;

  ctx.fillStyle = FLOOR_COLOR;
  ctx.beginPath();
  ctx.moveTo(wx(walls[0].start.x, cam, cw), wy(walls[0].start.y, cam, ch));
  for (const wall of walls) {
    ctx.lineTo(wx(wall.end.x, cam, cw), wy(wall.end.y, cam, ch));
  }
  ctx.closePath();
  ctx.fill();
}

function drawWalls(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const { walls, camera: cam, selection } = state;
  const ppi = cam.pixelsPerInch;

  for (const wall of walls) {
    const isSelected = selection?.type === 'wall' && selection.id === wall.id;
    const thickPx = wall.thicknessIn * ppi;

    const sx = wx(wall.start.x, cam, cw);
    const sy = wy(wall.start.y, cam, ch);
    const ex = wx(wall.end.x, cam, cw);
    const ey = wy(wall.end.y, cam, ch);

    ctx.strokeStyle = isSelected ? SELECTED_STROKE : WALL_COLOR;
    ctx.lineWidth = Math.max(thickPx, 2);
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    if (ppi > 1) {
      const midPx = wx((wall.start.x + wall.end.x) / 2, cam, cw);
      const midPy = wy((wall.start.y + wall.end.y) / 2, cam, ch);
      ctx.fillStyle = '#666';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(wall.id, midPx, midPy - thickPx / 2 - 4);
    }
  }
}

function drawOpenings(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const { openings, walls, camera: cam, selection } = state;
  const ppi = cam.pixelsPerInch;

  for (const op of openings) {
    const wall = walls.find((w) => w.id === op.wallId);
    if (!wall) continue;

    const len = wallLength(wall);
    if (len === 0) continue;

    const dx = wall.end.x - wall.start.x;
    const dy = wall.end.y - wall.start.y;
    const aX = dx / len;
    const aY = dy / len;
    const inX = -dy / len;
    const inY = dx / len;
    const halfT = wall.thicknessIn / 2;

    // Opening start and end positions in world coords
    const s1x = wall.start.x + aX * op.offsetAlongWall;
    const s1y = wall.start.y + aY * op.offsetAlongWall;
    const s2x = s1x + aX * op.widthIn;
    const s2y = s1y + aY * op.widthIn;

    const isSelected = selection?.type === 'opening' && selection.id === op.id;
    const color = op.type === 'door' ? DOOR_COLOR : op.type === 'window' ? WINDOW_COLOR : OBSTACLE_COLOR;

    // Draw gap in wall (clear wall segment with floor color, then redraw opening symbol)
    ctx.strokeStyle = FLOOR_COLOR;
    ctx.lineWidth = Math.max(wall.thicknessIn * ppi, 3) + 2;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(wx(s1x, cam, cw), wy(s1y, cam, ch));
    ctx.lineTo(wx(s2x, cam, cw), wy(s2y, cam, ch));
    ctx.stroke();

    // Draw opening symbol
    ctx.strokeStyle = isSelected ? SELECTED_STROKE : color;
    ctx.lineWidth = isSelected ? 2.5 : 2;

    if (op.type === 'door') {
      ctx.beginPath();
      // Jamb 1
      ctx.moveTo(
        wx(s1x - inX * halfT, cam, cw), wy(s1y - inY * halfT, cam, ch),
      );
      ctx.lineTo(
        wx(s1x + inX * halfT, cam, cw), wy(s1y + inY * halfT, cam, ch),
      );
      // Jamb 2
      ctx.moveTo(
        wx(s2x - inX * halfT, cam, cw), wy(s2y - inY * halfT, cam, ch),
      );
      ctx.lineTo(
        wx(s2x + inX * halfT, cam, cw), wy(s2y + inY * halfT, cam, ch),
      );
      ctx.stroke();

      // Swing arc (quarter circle into the room)
      if (ppi > 0.5) {
        const pivotX = wx(s1x + inX * halfT, cam, cw);
        const pivotY = wy(s1y + inY * halfT, cam, ch);
        const radius = op.widthIn * ppi;
        const wallAngle = Math.atan2(aY, aX);
        const inAngle = Math.atan2(inY, inX);
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, radius, inAngle, wallAngle, false);
        ctx.stroke();
      }
    } else {
      // Window: parallel lines across the wall
      ctx.beginPath();
      ctx.moveTo(
        wx(s1x - inX * halfT * 0.5, cam, cw), wy(s1y - inY * halfT * 0.5, cam, ch),
      );
      ctx.lineTo(
        wx(s2x - inX * halfT * 0.5, cam, cw), wy(s2y - inY * halfT * 0.5, cam, ch),
      );
      ctx.moveTo(
        wx(s1x + inX * halfT * 0.5, cam, cw), wy(s1y + inY * halfT * 0.5, cam, ch),
      );
      ctx.lineTo(
        wx(s2x + inX * halfT * 0.5, cam, cw), wy(s2y + inY * halfT * 0.5, cam, ch),
      );
      ctx.stroke();
    }

    // Exclusion zone — always drawn, even with 0 clearance (still covers the wall gap itself)
    const zone = openingExclusionAABB(op, wall);
    const zx = wx(zone.minX, cam, cw);
    const zy = wy(zone.minY, cam, ch);
    const zw = (zone.maxX - zone.minX) * ppi;
    const zh = (zone.maxY - zone.minY) * ppi;

    // Solid tinted fill
    ctx.fillStyle = op.type === 'door' ? 'rgba(90, 159, 212, 0.08)' : op.type === 'window' ? 'rgba(109, 196, 109, 0.08)' : 'rgba(212, 160, 90, 0.08)';
    ctx.fillRect(zx, zy, zw, zh);

    // Diagonal hatching
    ctx.save();
    ctx.beginPath();
    ctx.rect(zx, zy, zw, zh);
    ctx.clip();
    const hatchColor = op.type === 'door' ? 'rgba(90, 159, 212, 0.18)' : op.type === 'window' ? 'rgba(109, 196, 109, 0.18)' : 'rgba(212, 160, 90, 0.18)';
    ctx.strokeStyle = hatchColor;
    ctx.lineWidth = 1;
    const hatchStep = 10;
    const diag = zw + zh;
    for (let d = -zh; d < diag; d += hatchStep) {
      ctx.beginPath();
      ctx.moveTo(zx + d, zy);
      ctx.lineTo(zx + d + zh, zy + zh);
      ctx.stroke();
    }
    ctx.restore();

    // Dashed border
    const borderColor = op.type === 'door' ? 'rgba(90, 159, 212, 0.4)' : op.type === 'window' ? 'rgba(109, 196, 109, 0.4)' : 'rgba(212, 160, 90, 0.4)';
    ctx.strokeStyle = isSelected ? SELECTED_STROKE : borderColor;
    ctx.lineWidth = isSelected ? 2 : 1;
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(zx, zy, zw, zh);
    ctx.setLineDash([]);

    // "NO LOCKERS" label inside the exclusion zone
    if (ppi > 0.6 && zw > 40 && zh > 16) {
      ctx.fillStyle = op.type === 'door' ? 'rgba(90, 159, 212, 0.55)' : op.type === 'window' ? 'rgba(109, 196, 109, 0.55)' : 'rgba(212, 160, 90, 0.55)';
      const fontSize = Math.min(11, Math.max(7, ppi * 5));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NO LOCKERS', zx + zw / 2, zy + zh / 2);
    }

    // Opening type label + width dimension above/beside the wall
    if (ppi > 0.8) {
      const midX = wx((s1x + s2x) / 2 + inX * (halfT + 10), cam, cw);
      const midY = wy((s1y + s2y) / 2 + inY * (halfT + 10), cam, ch);
      ctx.fillStyle = color;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const typeLabel = op.type === 'door' ? 'DOOR' : op.type === 'window' ? 'WINDOW' : 'OBSTACLE';
      const dimLabel = formatDimension(op.widthIn, state.displayUnit, 0);
      ctx.fillText(`${typeLabel}  ${dimLabel}`, midX, midY);
    }
  }
}

const CORNER_ZONE_COLOR = '#999';

function drawCornerZones(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const { walls, camera: cam } = state;
  const ppi = cam.pixelsPerInch;
  const zones = cornerExclusionAABBs(walls);

  for (const zone of zones) {
    const zx = wx(zone.minX, cam, cw);
    const zy = wy(zone.minY, cam, ch);
    const zw = (zone.maxX - zone.minX) * ppi;
    const zh = (zone.maxY - zone.minY) * ppi;

    ctx.fillStyle = 'rgba(255, 89, 0, 0.06)';
    ctx.fillRect(zx, zy, zw, zh);

    ctx.save();
    ctx.beginPath();
    ctx.rect(zx, zy, zw, zh);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255, 89, 0, 0.15)';
    ctx.lineWidth = 1;
    const hatchStep = 10;
    const diag = zw + zh;
    for (let d = -zh; d < diag; d += hatchStep) {
      ctx.beginPath();
      ctx.moveTo(zx + d, zy);
      ctx.lineTo(zx + d + zh, zy + zh);
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = 'rgba(255, 89, 0, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(zx, zy, zw, zh);
    ctx.setLineDash([]);

    if (ppi > 0.6 && zw > 40 && zh > 16) {
      ctx.fillStyle = 'rgba(255, 89, 0, 0.45)';
      const fontSize = Math.min(11, Math.max(7, ppi * 5));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NO LOCKERS', zx + zw / 2, zy + zh / 2);
    }
  }
}

function drawLockers(ctx: CanvasRenderingContext2D, state: PlannerState, cw: number, ch: number): void {
  const { lockers, camera: cam, selection } = state;
  const ppi = cam.pixelsPerInch;

  for (const locker of lockers) {
    const template = getTemplate(locker.templateId);
    const color = template?.colors.find((c) => c.code === locker.config.colorCode);
    const fillColor = color?.hex ?? '#ccc';

    const box = lockerAABB(locker);
    const x1 = wx(box.minX, cam, cw);
    const y1 = wy(box.minY, cam, ch);
    const w = (box.maxX - box.minX) * ppi;
    const h = (box.maxY - box.minY) * ppi;

    const isSelected = selection?.type === 'locker' && selection.id === locker.instanceId;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x1, y1, w, h);
    ctx.clip();

    ctx.fillStyle = fillColor;
    ctx.fillRect(x1, y1, w, h);

    const img = getLockerImage(locker.templateId);
    if (img) {
      const cx = x1 + w / 2;
      const cy = y1 + h / 2;
      ctx.translate(cx, cy);
      if (locker.rotationDeg !== 0) ctx.rotate((locker.rotationDeg * Math.PI) / 180);

      const isRot = locker.rotationDeg === 90 || locker.rotationDeg === 270;
      const drawW = isRot ? h : w;
      const drawH = isRot ? w : h;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const boxAspect = drawW / drawH;
      let sw: number, sh: number;
      if (imgAspect > boxAspect) {
        sh = drawH;
        sw = drawH * imgAspect;
      } else {
        sw = drawW;
        sh = drawW / imgAspect;
      }
      ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);

      ctx.globalAlpha = 0.25;
      ctx.fillStyle = fillColor;
      ctx.fillRect(-drawW / 2, -drawH / 2, drawW, drawH);
      ctx.globalAlpha = 1;

      ctx.setTransform(ctx.getTransform());
      ctx.resetTransform();
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.restore();

    ctx.strokeStyle = isSelected ? SELECTED_STROKE : LOCKER_STROKE;
    ctx.lineWidth = isSelected ? 2.5 : 1;
    ctx.strokeRect(x1, y1, w, h);

    if (ppi > 0.8) {
      const typeLabel = locker.templateId.toUpperCase();
      const dimStr = `${locker.config.widthIn}″W × ${locker.config.depthIn}″D`;

      const isRot = locker.rotationDeg === 90 || locker.rotationDeg === 270;
      const innerW = isRot ? h : w;
      const innerH = isRot ? w : h;
      const pad = 4;
      const availW = innerW - pad * 2;
      const availH = innerH - pad * 2;
      if (availW < 8 || availH < 8) { continue; }

      const titleSize = Math.min(10, ppi * 5);
      const dimSize = Math.min(9, ppi * 4);

      const cx = x1 + w / 2;
      const cy = y1 + h / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(x1, y1, w, h);
      ctx.clip();
      ctx.translate(cx, cy);
      if (locker.rotationDeg !== 0) ctx.rotate((locker.rotationDeg * Math.PI) / 180);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const labelY = availH / 2 - 8;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(-availW / 2, labelY - titleSize, availW, titleSize + dimSize + 6);
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${titleSize}px sans-serif`;
      ctx.fillText(typeLabel, 0, labelY - dimSize / 2, availW);
      ctx.font = `${dimSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(dimStr, 0, labelY + titleSize / 2 + 1, availW);

      ctx.restore();
    }
  }
}

/** Screen pixel → world inches. */
export function screenToWorld(
  screenX: number,
  screenY: number,
  cam: Camera,
  canvasW: number,
  canvasH: number,
): { x: number; y: number } {
  return {
    x: (screenX - canvasW / 2) / cam.pixelsPerInch + cam.centerX,
    y: (screenY - canvasH / 2) / cam.pixelsPerInch + cam.centerY,
  };
}
