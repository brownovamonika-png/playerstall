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

/** Human-readable labels for `PlannerState.needByTimeline` select values. */
const NEED_BY_LABELS: Record<string, string> = {
	asap: 'ASAP / under 2 months',
	'1-3': '1–3 months',
	'3-6': '3–6 months',
	'6plus': '6+ months',
	flexible: 'Flexible / still planning',
	unsure: 'Not sure yet',
};

export function needByTimelineLabel(code: string): string {
	const c = (code || '').trim();
	if (!c) return '';
	return NEED_BY_LABELS[c] || c;
}

/** Human-readable labels for `PlannerState.fundingStatus` select values. */
const FUNDING_LABELS: Record<string, string> = {
	have_funds: 'Have funds / budget approved',
	fundraising: 'Currently fundraising',
	need_help: 'Need help with fundraising',
};

export function fundingStatusLabel(code: string): string {
	const c = (code || '').trim();
	if (!c) return '';
	return FUNDING_LABELS[c] || c;
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
    needByTimeline: '',
    fundingStatus: '',
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
