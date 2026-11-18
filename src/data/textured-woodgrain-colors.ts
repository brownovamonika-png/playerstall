/**
 * Wood tone finishes (Walnut, Maple melamine; UV coated birch) — shop PDP dropdowns, room planner JSON, spec PDF copy.
 * Image files: public/images/locker-colors/{fileSlug}.jpg
 */
export type TexturedWoodgrainOption = {
	readonly code: string;
	readonly label: string;
	readonly fileSlug: string;
	/** Fallback when preview cannot load image */
	readonly fallbackHex: string;
};

export const TEXTURED_WOODGRAIN_OPTIONS: readonly TexturedWoodgrainOption[] = [
	{ code: 'TW-WALNUT', label: 'Walnut', fileSlug: 'walnut-grain', fallbackHex: '#7c4f3a' },
	{ code: 'TW-MAPLE', label: 'Maple', fileSlug: 'maple-grain', fallbackHex: '#8a5a36' },
	{ code: 'UV-BIRCH', label: 'UV Coated Birch', fileSlug: 'uv-birch', fallbackHex: '#ca9f71' },
] as const;

export function texturedWoodgrainSwatchUrl(fileSlug: string): string {
	return `/images/locker-colors/${fileSlug}.jpg`;
}

/** Comma-separated labels for spec sheets and PDF copy. */
export const TEXTURED_WOODGRAIN_LABELS_CSV = TEXTURED_WOODGRAIN_OPTIONS.map((o) => o.label).join(', ');
