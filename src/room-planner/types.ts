/** Locker template — loaded from JSON, one per product line. */
export interface LockerTemplate {
  templateId: string;
  displayName: string;
  pdpUrl: string;
  geometry: {
    heightIn: number;
    widthOptionsIn: number[];
    depthOptionsIn: number[];
    defaultWidthIn: number;
    defaultDepthIn: number;
  };
  pricing: {
    currency: string;
    basePriceByWidthIn: Record<string, number>;
    depthSurcharge: Record<string, number>;
  };
  colors: ColorOption[];
  accessories: AccessoryOption[];
}

export interface ColorOption {
  code: string;
  label: string;
  hex: string;
  group: 'solid' | 'woodgrain';
}

export interface AccessoryOption {
  id: string;
  label: string;
  price: number;
}

/** Per-locker configuration chosen by the user. */
export interface LockerConfig {
  widthIn: number;
  depthIn: number;
  colorCode: string;
  accessoryIds: string[];
}

/** A placed locker instance on the canvas. */
export interface LockerInstance {
  instanceId: string;
  templateId: string;
  config: LockerConfig;
  x: number;
  y: number;
  rotationDeg: number;
}

/** Wall segment (axis-aligned in v1). */
export interface Wall {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  thicknessIn: number;
}

/** Opening cut into a wall (door, window, or obstacle). */
export interface Opening {
  id: string;
  type: 'door' | 'window' | 'obstacle';
  wallId: string;
  /** Distance from the wall's start point to the opening's near edge, along the wall. */
  offsetAlongWall: number;
  widthIn: number;
  swing?: 'left' | 'right';
  /**
   * How far into the room the exclusion zone extends (in front of the opening).
   * Doors default to 36″ (swing clearance), windows to the locker depth or 0.
   */
  clearanceIn: number;
}

export type DisplayUnit = 'in' | 'cm' | 'mm' | 'ft';

export type SelectionType = 'locker' | 'wall' | 'opening' | 'room';

export interface Selection {
  type: SelectionType;
  id: string;
}

/** Camera / viewport state. */
export interface Camera {
  centerX: number;
  centerY: number;
  pixelsPerInch: number;
}

/** Full application state for the room planner. */
export interface PlannerState {
  roomName: string;
  displayUnit: DisplayUnit;
  editMode: boolean;
  camera: Camera;
  walls: Wall[];
  openings: Opening[];
  lockers: LockerInstance[];
  selection: Selection | null;
}
