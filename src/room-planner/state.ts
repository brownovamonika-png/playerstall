import type { PlannerState, Wall } from './types';

let _nextId = 1;

export function nextInstanceId(): string {
  return `lck_${(_nextId++).toString(36)}`;
}

export interface RoomDimensions {
  wallA: number;
  wallB: number;
  wallC: number;
  wallD: number;
  thicknessA: number;
  thicknessB: number;
  thicknessC: number;
  thicknessD: number;
}

/**
 * Build a 4-wall rectangular room (CW winding).
 *   A = top (horizontal),  B = right (vertical),
 *   C = bottom (horizontal), D = left (vertical).
 * Wall A and C are horizontal (width); B and D are vertical (depth).
 */
export function buildWalls(dims: RoomDimensions): Wall[] {
  const w = dims.wallA;
  const d = dims.wallB;
  return [
    { id: 'Wall A', start: { x: 0, y: 0 }, end: { x: w, y: 0 }, thicknessIn: dims.thicknessA },
    { id: 'Wall B', start: { x: w, y: 0 }, end: { x: w, y: d }, thicknessIn: dims.thicknessB },
    { id: 'Wall C', start: { x: w, y: d }, end: { x: 0, y: d }, thicknessIn: dims.thicknessC },
    { id: 'Wall D', start: { x: 0, y: d }, end: { x: 0, y: 0 }, thicknessIn: dims.thicknessD },
  ];
}

export function defaultDimensions(): RoomDimensions {
  return {
    wallA: 240, wallB: 240, wallC: 240, wallD: 240,
    thicknessA: 4.5, thicknessB: 4.5, thicknessC: 4.5, thicknessD: 4.5,
  };
}

/** Create an initial state with a simple rectangular room. */
export function createInitialState(dims?: RoomDimensions): PlannerState {
  const d = dims ?? defaultDimensions();
  return {
    roomName: '',
    sportType: '',
    displayUnit: 'in',
    editMode: true,
    camera: {
      centerX: d.wallA / 2,
      centerY: d.wallB / 2,
      pixelsPerInch: 2,
    },
    walls: buildWalls(d),
    openings: [],
    lockers: [],
    selection: null,
    floorColor: '#b0aba4',
    wallColor: '#ffffff',
    showBase: false,
    baseColor: '#1A1A1A',
    edgebandColor: '',
  };
}
