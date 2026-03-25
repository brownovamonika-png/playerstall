import type { LockerInstance, LockerConfig, Wall, Opening } from './types';
import { getTemplate } from './catalog';

/** No lockers within this many inches of each room corner. */
export const CORNER_CLEARANCE_IN = 30;

/** Axis-aligned bounding box in world inches. */
export interface AABB {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Get the plan-view AABB for a locker instance (no rotation for v1). */
export function lockerAABB(locker: LockerInstance): AABB {
  const { widthIn, depthIn } = locker.config;
  const isRotated = locker.rotationDeg === 90 || locker.rotationDeg === 270;
  const w = isRotated ? depthIn : widthIn;
  const d = isRotated ? widthIn : depthIn;
  return {
    minX: locker.x,
    minY: locker.y,
    maxX: locker.x + w,
    maxY: locker.y + d,
  };
}

/** Check whether two AABBs overlap (strictly — touching edges are OK). */
export function aabbOverlap(a: AABB, b: AABB): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;
}

const WALL_PROXIMITY_IN = 2;

/**
 * Determine which walls have at least one locker placed against their inner face.
 * A locker is "against" a wall if the locker edge facing the wall is within
 * WALL_PROXIMITY_IN inches of the wall's inner surface.
 */
export function getWallsWithLockers(walls: Wall[], lockers: LockerInstance[]): Set<string> {
  const result = new Set<string>();
  for (const wall of walls) {
    const len = wallLength(wall);
    if (len === 0) continue;
    const halfT = wall.thicknessIn / 2;
    const aX = (wall.end.x - wall.start.x) / len;
    const aY = (wall.end.y - wall.start.y) / len;
    const inX = -aY;
    const inY = aX;
    const isHoriz = Math.abs(aY) < 0.01;

    for (const locker of lockers) {
      if (result.has(wall.id)) break;
      const box = lockerAABB(locker);

      if (isHoriz) {
        const wallMinX = Math.min(wall.start.x, wall.end.x);
        const wallMaxX = Math.max(wall.start.x, wall.end.x);
        if (box.maxX <= wallMinX || box.minX >= wallMaxX) continue;
        const innerY = wall.start.y + inY * halfT;
        const edge = inY > 0 ? box.minY : box.maxY;
        if (Math.abs(edge - innerY) <= WALL_PROXIMITY_IN) result.add(wall.id);
      } else {
        const wallMinY = Math.min(wall.start.y, wall.end.y);
        const wallMaxY = Math.max(wall.start.y, wall.end.y);
        if (box.maxY <= wallMinY || box.minY >= wallMaxY) continue;
        const innerX = wall.start.x + inX * halfT;
        const edge = inX > 0 ? box.minX : box.maxX;
        if (Math.abs(edge - innerX) <= WALL_PROXIMITY_IN) result.add(wall.id);
      }
    }
  }
  return result;
}

/**
 * Compute exclusion AABBs for corners where two consecutive walls meet.
 * When wallsWithLockers is provided, only corners where BOTH adjacent walls
 * have lockers get an exclusion zone. This prevents blocking corners
 * unnecessarily when the customer only uses one wall.
 */
export function cornerExclusionAABBs(walls: Wall[], wallsWithLockers?: Set<string>): AABB[] {
  if (walls.length < 2) return [];
  const zones: AABB[] = [];
  for (let i = 0; i < walls.length; i++) {
    const curr = walls[i];
    const next = walls[(i + 1) % walls.length];

    if (wallsWithLockers && (!wallsWithLockers.has(curr.id) || !wallsWithLockers.has(next.id))) {
      continue;
    }

    const cx = curr.end.x;
    const cy = curr.end.y;
    const currLen = wallLength(curr);
    const nextLen = wallLength(next);
    if (currLen === 0 || nextLen === 0) continue;

    const currDx = (curr.end.x - curr.start.x) / currLen;
    const currDy = (curr.end.y - curr.start.y) / currLen;
    const nextDx = (next.end.x - next.start.x) / nextLen;
    const nextDy = (next.end.y - next.start.y) / nextLen;

    const c = CORNER_CLEARANCE_IN;
    const pts = [
      { x: cx - currDx * c, y: cy - currDy * c },
      { x: cx, y: cy },
      { x: cx + nextDx * c, y: cy + nextDy * c },
    ];
    zones.push({
      minX: Math.min(pts[0].x, pts[1].x, pts[2].x),
      minY: Math.min(pts[0].y, pts[1].y, pts[2].y),
      maxX: Math.max(pts[0].x, pts[1].x, pts[2].x),
      maxY: Math.max(pts[0].y, pts[1].y, pts[2].y),
    });
  }
  return zones;
}

/** Return true if placing `candidate` causes an overlap with any existing locker, opening zone, or corner zone. */
export function wouldOverlap(
  candidate: LockerInstance,
  others: LockerInstance[],
  openings: Opening[] = [],
  walls: Wall[] = [],
): boolean {
  const box = lockerAABB(candidate);
  const hitsLocker = others.some((other) => {
    if (other.instanceId === candidate.instanceId) return false;
    return aabbOverlap(box, lockerAABB(other));
  });
  if (hitsLocker) return true;

  const hitsOpening = openings.some((op) => {
    const wall = walls.find((w) => w.id === op.wallId);
    if (!wall) return false;
    const zone = openingExclusionAABB(op, wall);
    return aabbOverlap(box, zone);
  });
  if (hitsOpening) return true;

  const allLockers = [candidate, ...others.filter((o) => o.instanceId !== candidate.instanceId)];
  const occupied = getWallsWithLockers(walls, allLockers);
  return cornerExclusionAABBs(walls, occupied).some((zone) => aabbOverlap(box, zone));
}

/**
 * Compute the AABB exclusion zone for an opening.
 * The zone spans the opening width along the wall, plus clearanceIn into the room.
 */
export function openingExclusionAABB(opening: Opening, wall: Wall): AABB {
  const len = wallLength(wall);
  if (len === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const aX = dx / len;
  const aY = dy / len;
  const inX = -dy / len;
  const inY = dx / len;
  const halfT = wall.thicknessIn / 2;

  // Start and end of opening along the wall
  const oStart = opening.offsetAlongWall;
  const oEnd = oStart + opening.widthIn;

  // Four corners of the exclusion rectangle:
  // Two points on the outer face of the wall, two at clearance depth inward
  const p1x = wall.start.x + aX * oStart - inX * halfT;
  const p1y = wall.start.y + aY * oStart - inY * halfT;
  const p2x = wall.start.x + aX * oEnd - inX * halfT;
  const p2y = wall.start.y + aY * oEnd - inY * halfT;
  const p3x = wall.start.x + aX * oStart + inX * (halfT + opening.clearanceIn);
  const p3y = wall.start.y + aY * oStart + inY * (halfT + opening.clearanceIn);
  const p4x = wall.start.x + aX * oEnd + inX * (halfT + opening.clearanceIn);
  const p4y = wall.start.y + aY * oEnd + inY * (halfT + opening.clearanceIn);

  return {
    minX: Math.min(p1x, p2x, p3x, p4x),
    minY: Math.min(p1y, p2y, p3y, p4y),
    maxX: Math.max(p1x, p2x, p3x, p4x),
    maxY: Math.max(p1y, p2y, p3y, p4y),
  };
}

/** Hit-test a world point against all openings; returns the opening if the point is close enough. */
export function hitTestOpening(worldX: number, worldY: number, openings: Opening[], walls: Wall[]): Opening | null {
  const HIT_THRESHOLD = 15;
  for (const op of openings) {
    const wall = walls.find((w) => w.id === op.wallId);
    if (!wall) continue;
    const len = wallLength(wall);
    if (len === 0) continue;
    const dx = wall.end.x - wall.start.x;
    const dy = wall.end.y - wall.start.y;
    const t = ((worldX - wall.start.x) * dx + (worldY - wall.start.y) * dy) / (len * len);
    const projX = wall.start.x + t * dx;
    const projY = wall.start.y + t * dy;
    const distToWall = Math.sqrt((worldX - projX) ** 2 + (worldY - projY) ** 2);
    if (distToWall > HIT_THRESHOLD) continue;
    const posAlongWall = t * len;
    if (posAlongWall >= op.offsetAlongWall && posAlongWall <= op.offsetAlongWall + op.widthIn) {
      return op;
    }
  }
  return null;
}

/** Project a world point onto a wall, returning the offset in inches from the wall's start. */
export function projectOntoWall(worldX: number, worldY: number, wall: Wall): number {
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const len = wallLength(wall);
  if (len === 0) return 0;
  const t = ((worldX - wall.start.x) * dx + (worldY - wall.start.y) * dy) / (len * len);
  return Math.max(0, Math.min(len, t * len));
}

/**
 * Compute the inner bounding box of the room (inset by half-wall thicknesses).
 * Lockers must stay entirely within this box.
 */
export function computeRoomInnerBounds(walls: Wall[]): AABB {
  if (walls.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

  let outerMinX = Infinity, outerMaxX = -Infinity;
  let outerMinY = Infinity, outerMaxY = -Infinity;
  for (const w of walls) {
    outerMinX = Math.min(outerMinX, w.start.x, w.end.x);
    outerMaxX = Math.max(outerMaxX, w.start.x, w.end.x);
    outerMinY = Math.min(outerMinY, w.start.y, w.end.y);
    outerMaxY = Math.max(outerMaxY, w.start.y, w.end.y);
  }

  let topThick = 0, bottomThick = 0, leftThick = 0, rightThick = 0;
  for (const w of walls) {
    const isHoriz = Math.abs(w.end.y - w.start.y) < 0.01;
    if (isHoriz) {
      if (Math.abs(w.start.y - outerMinY) < 0.01) topThick = Math.max(topThick, w.thicknessIn);
      if (Math.abs(w.start.y - outerMaxY) < 0.01) bottomThick = Math.max(bottomThick, w.thicknessIn);
    } else {
      if (Math.abs(w.start.x - outerMinX) < 0.01) leftThick = Math.max(leftThick, w.thicknessIn);
      if (Math.abs(w.start.x - outerMaxX) < 0.01) rightThick = Math.max(rightThick, w.thicknessIn);
    }
  }

  return {
    minX: outerMinX + leftThick / 2,
    minY: outerMinY + topThick / 2,
    maxX: outerMaxX - rightThick / 2,
    maxY: outerMaxY - bottomThick / 2,
  };
}

/**
 * Clamp a locker so its AABB stays entirely within the room's inner bounds.
 */
export function clampLockerToRoom(locker: LockerInstance, walls: Wall[]): void {
  if (walls.length === 0) return;
  const bounds = computeRoomInnerBounds(walls);
  const box = lockerAABB(locker);
  const w = box.maxX - box.minX;
  const h = box.maxY - box.minY;

  const roomW = bounds.maxX - bounds.minX;
  const roomH = bounds.maxY - bounds.minY;

  if (w > roomW) {
    locker.x = bounds.minX + (roomW - w) / 2;
  } else {
    if (box.minX < bounds.minX) locker.x = bounds.minX;
    else if (box.minX + w > bounds.maxX) locker.x = bounds.maxX - w;
  }

  if (h > roomH) {
    locker.y = bounds.minY + (roomH - h) / 2;
  } else {
    if (box.minY < bounds.minY) locker.y = bounds.minY;
    else if (box.minY + h > bounds.maxY) locker.y = bounds.maxY - h;
  }
}

/** Wall length in inches. */
export function wallLength(wall: Wall): number {
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Intervals along a wall that are free of openings and corner clearances.
 * clearStart/clearEnd control whether corner clearance is applied at each
 * end of the wall (only needed when the adjacent wall also has lockers).
 */
function freeSpans(
  wallLen: number,
  openings: Opening[],
  clearStart = true,
  clearEnd = true,
): Array<{ start: number; end: number }> {
  const blocked: Array<{ start: number; end: number }> = [];
  if (clearStart) blocked.push({ start: 0, end: Math.min(CORNER_CLEARANCE_IN, wallLen) });
  if (clearEnd) blocked.push({ start: Math.max(wallLen - CORNER_CLEARANCE_IN, 0), end: wallLen });
  for (const o of openings) {
    blocked.push({ start: o.offsetAlongWall, end: o.offsetAlongWall + o.widthIn });
  }
  blocked.sort((a, b) => a.start - b.start);

  const spans: Array<{ start: number; end: number }> = [];
  let cursor = 0;
  for (const b of blocked) {
    if (b.start > cursor) spans.push({ start: cursor, end: b.start });
    cursor = Math.max(cursor, b.end);
  }
  if (cursor < wallLen) spans.push({ start: cursor, end: wallLen });
  return spans;
}

/**
 * Pack lockers along a wall's inner face, skipping openings.
 * "Inside" = left of the wall direction in screen-coords (matches CW winding).
 *
 * When existingLockers and allWalls are provided, corner clearance is only
 * applied at a wall end if the adjacent wall also has lockers.
 */
export function packWall(
  wall: Wall,
  templateId: string,
  defaultConfig: LockerConfig,
  startId: number,
  wallOpenings: Opening[] = [],
  existingLockers: LockerInstance[] = [],
  allWalls: Wall[] = [],
): LockerInstance[] {
  const template = getTemplate(templateId);
  if (!template) return [];

  const len = wallLength(wall);
  const lockerWidth = defaultConfig.widthIn;
  const lockerDepth = defaultConfig.depthIn;
  if (lockerWidth <= 0 || len <= 0) return [];

  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;

  const aX = dx / len;
  const aY = dy / len;
  const inX = -dy / len;
  const inY = dx / len;

  const halfT = wall.thicknessIn / 2;
  const isHorizontal = Math.abs(dy) < 0.01;
  const results: LockerInstance[] = [];
  let idx = 0;

  let clearStart = true;
  let clearEnd = true;
  if (allWalls.length >= 2) {
    const occupied = getWallsWithLockers(allWalls, existingLockers);
    occupied.add(wall.id);
    const wi = allWalls.findIndex((w) => w.id === wall.id);
    if (wi >= 0) {
      const prev = allWalls[(wi - 1 + allWalls.length) % allWalls.length];
      const next = allWalls[(wi + 1) % allWalls.length];
      clearStart = occupied.has(prev.id);
      clearEnd = occupied.has(next.id);
    }
  }

  const spans = freeSpans(len, wallOpenings, clearStart, clearEnd);

  for (const span of spans) {
    const spanLen = span.end - span.start;
    const count = Math.floor(spanLen / lockerWidth);

    for (let i = 0; i < count; i++) {
      const along = span.start + i * lockerWidth;
      const id = `lck_${(startId + idx).toString(36)}`;
      idx++;

      const wallX = wall.start.x + aX * along;
      const wallY = wall.start.y + aY * along;

      if (isHorizontal) {
        const innerY = wall.start.y + inY * halfT;
        const lockerY = inY > 0 ? innerY : innerY - lockerDepth;
        const lockerX = aX > 0 ? wallX : wallX - lockerWidth;

        results.push({
          instanceId: id,
          templateId,
          config: { ...defaultConfig },
          x: lockerX,
          y: lockerY,
          rotationDeg: 0,
        });
      } else {
        const innerX = wall.start.x + inX * halfT;
        const lockerX = inX > 0 ? innerX : innerX - lockerDepth;
        const lockerY = aY > 0 ? wallY : wallY - lockerWidth;

        results.push({
          instanceId: id,
          templateId,
          config: { ...defaultConfig },
          x: lockerX,
          y: lockerY,
          rotationDeg: 90,
        });
      }
    }
  }

  return results;
}
