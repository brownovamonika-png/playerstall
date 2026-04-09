/**
 * Premium melamine solid colors — names align with popular Sherwin-Williams paint colors.
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
	{ code: 'AD-ABE', label: 'Accessible Beige', approxHex: '#d4c5a9' },
	{ code: 'AD-ALB', label: 'Alabaster', approxHex: '#ede9de' },
	{ code: 'AD-ANW', label: 'Antique White', approxHex: '#ede3d5' },
	{ code: 'AD-BRB', label: 'Bracing Blue', approxHex: '#4b697c' },
	{ code: 'AD-CYS', label: 'Cyberspace', approxHex: '#2a2c2e' },
	{ code: 'AD-GF', label: 'Gale Force', approxHex: '#2f3e4c' },
	{ code: 'AD-HRW', label: 'High Reflective White', approxHex: '#f4f4f0' },
	{ code: 'AD-IO', label: 'Iron Ore', approxHex: '#4a4b4d' },
	{ code: 'AD-LFG', label: 'Light French Gray', approxHex: '#c5c0b8' },
	{ code: 'AD-MG', label: 'Mindful Gray', approxHex: '#68696b' },
	{ code: 'AD-NAV', label: 'Naval', approxHex: '#2e3a5a' },
	{ code: 'AD-PG', label: 'Perfect Greige', approxHex: '#b6a99a' },
	{ code: 'AD-PW', label: 'Pure White', approxHex: '#edece6' },
	{ code: 'AD-QUI', label: 'Quietude', approxHex: '#b7c3c4' },
	{ code: 'AD-RPG', label: 'Repose Gray', approxHex: '#ccc8c0' },
	{ code: 'AD-RGN', label: 'Roycroft Green', approxHex: '#6b734f' },
	{ code: 'AD-SEA', label: 'Sea Salt', approxHex: '#d4dcd5' },
	{ code: 'AD-TRB', label: 'Tricorn Black', approxHex: '#2d2d2d' },
	{ code: 'AD-URB', label: 'Urban Bronze', approxHex: '#5c5048' },
	{ code: 'AD-WG', label: 'Web Gray', approxHex: '#777b80' },
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
	ADORNUS_DESIGNER_PAINT_FINISHES.find((o) => o.code === DEFAULT_ADORNUS_PAINT_CODE)?.label ?? 'High Reflective White';

/** Comma-separated labels for spec sheets and static HTML */
export const ADORNUS_DESIGNER_PAINT_LABELS_CSV = ADORNUS_DESIGNER_PAINT_FINISHES.map((o) => o.label).join(', ');
