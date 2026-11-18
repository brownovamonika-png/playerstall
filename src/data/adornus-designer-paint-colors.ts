/**
 * Locker melamine solid colors (2026 look book + Red, White, Cream).
 * Used for PDP dropdowns, laminate PDFs, and spec copy.
 * Approximate hex values for UI preview; confirm selections with physical samples.
 */

export type AdornusDesignerPaintFinish = {
	readonly code: string;
	readonly label: string;
	/** Approximate RGB for PDP color preview */
	readonly approxHex: string;
};

const RAW: readonly AdornusDesignerPaintFinish[] = [
	{ code: 'AD-HRW', label: 'White', approxHex: '#f5f5f2' },
	{ code: 'AD-CRM', label: 'Cream', approxHex: '#ede4d3' },
	{ code: 'AD-LFG', label: 'Light Grey', approxHex: '#c4c2be' },
	{ code: 'AD-BLU', label: 'Blue', approxHex: '#6d767e' },
	{ code: 'AD-RED', label: 'Red', approxHex: '#983327' },
	{ code: 'AD-IO', label: 'Dark Grey', approxHex: '#4b4c4c' },
	{ code: 'AD-TRB', label: 'Black', approxHex: '#2a2a2a' },
] as const;

function srgbChannelToLinear(c255: number): number {
	const x = c255 / 255;
	return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

/** WCAG relative luminance for `approxHex` (#RRGGBB) — used to order lightest → darkest */
function relativeLuminance(hex: string): number {
	const r = srgbChannelToLinear(parseInt(hex.slice(1, 3), 16));
	const g = srgbChannelToLinear(parseInt(hex.slice(3, 5), 16));
	const b = srgbChannelToLinear(parseInt(hex.slice(5, 7), 16));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Lightest to darkest by approximate screen color — PDPs, PDFs, and spec lists */
export const ADORNUS_DESIGNER_PAINT_FINISHES: readonly AdornusDesignerPaintFinish[] = [...RAW].sort(
	(a, b) => relativeLuminance(b.approxHex) - relativeLuminance(a.approxHex),
);

export const DEFAULT_ADORNUS_PAINT_CODE = 'AD-HRW';

export const DEFAULT_ADORNUS_PAINT_LABEL =
	ADORNUS_DESIGNER_PAINT_FINISHES.find((o) => o.code === DEFAULT_ADORNUS_PAINT_CODE)?.label ?? 'White';

/** Comma-separated labels for spec sheets and static HTML */
export const ADORNUS_DESIGNER_PAINT_LABELS_CSV = ADORNUS_DESIGNER_PAINT_FINISHES.map((o) => o.label).join(', ');
