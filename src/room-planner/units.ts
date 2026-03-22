import type { DisplayUnit } from './types';

const TO_INCHES: Record<DisplayUnit, number> = {
  in: 1,
  ft: 12,
  cm: 1 / 2.54,
  mm: 1 / 25.4,
};

const FROM_INCHES: Record<DisplayUnit, number> = {
  in: 1,
  ft: 1 / 12,
  cm: 2.54,
  mm: 25.4,
};

const LABELS: Record<DisplayUnit, string> = {
  in: '″',
  ft: '′',
  cm: 'cm',
  mm: 'mm',
};

/** Convert a value in the given display unit to canonical inches. */
export function toInches(value: number, from: DisplayUnit): number {
  return value * TO_INCHES[from];
}

/** Convert canonical inches to the given display unit. */
export function fromInches(inches: number, to: DisplayUnit): number {
  return inches * FROM_INCHES[to];
}

/** Short suffix label for the unit. */
export function unitLabel(u: DisplayUnit): string {
  return LABELS[u];
}

/** Format a value in inches as a display string in the given unit. */
export function formatDimension(inches: number, unit: DisplayUnit, decimals = 1): string {
  const val = fromInches(inches, unit);
  const rounded = Number(val.toFixed(decimals));
  return `${rounded}${LABELS[unit]}`;
}
