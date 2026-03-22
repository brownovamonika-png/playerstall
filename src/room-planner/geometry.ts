import type { LockerInstance, LockerConfig, Wall, Opening } from './types';
import { getTemplate } from './catalog';

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

/** Return true if placing `candidate` causes an overlap with any existing locker or opening zone. */
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

  return openings.some((op) => {
    const wall = walls.find((w) => w.id === op.wallId);
    if (!wall) return false;
    const zone = openingExclusionAABB(op, wall);
    return aabbOverlap(box, zone);
  });
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

/** Wall length in inches. */
export function wallLength(wall: Wall): number {
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Intervals along a wall that are free of openings. */
function freeSpans(wallLen: number, openings: Opening[]): Array<{ start: number; end: number }> {
  const blocked = openings
    .map((o) => ({ start: o.offsetAlongWall, end: o.offsetAlongWall + o.widthIn }))
    .sort((a, b) => a.start - b.start);

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
 */
export function packWall(
  wall: Wall,
  templateId: string,
  defaultConfig: LockerConfig,
  startId: number,
  wallOpenings: Opening[] = [],
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

  const spans = freeSpans(len, wallOpenings);

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
