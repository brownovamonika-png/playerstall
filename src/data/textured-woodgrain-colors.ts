/**
 * Textured woodgrain melamine reference finishes — shop PDP dropdowns, room planner JSON, spec PDF copy.
 * Image files: public/images/adornus-alusso-textured/{fileSlug}.jpg
 */
export type TexturedWoodgrainOption = {
	readonly code: string;
	readonly label: string;
	readonly fileSlug: string;
	/** Fallback when preview cannot load image */
	readonly fallbackHex: string;
};

export const TEXTURED_WOODGRAIN_OPTIONS: readonly TexturedWoodgrainOption[] = [
	{ code: 'TW-BRUNO', label: 'Bruno', fileSlug: 'bruno', fallbackHex: '#8d6f52' },
	{ code: 'TW-CANELLA', label: 'Canella', fileSlug: 'canella', fallbackHex: '#9a7a58' },
	{ code: 'TW-FAD', label: 'Fad', fileSlug: 'fad', fallbackHex: '#7a5c40' },
	{ code: 'TW-FLAXEN', label: 'Flaxen', fileSlug: 'flaxen', fallbackHex: '#c4a574' },
	{ code: 'TW-ICE', label: 'Ice', fileSlug: 'ice', fallbackHex: '#b8a892' },
	{ code: 'TW-IMPULSE', label: 'Impulse', fileSlug: 'impulse', fallbackHex: '#6b5344' },
	{ code: 'TW-JAVA', label: 'Java', fileSlug: 'java', fallbackHex: '#4a3528' },
	{ code: 'TW-LOFTY', label: 'Lofty', fileSlug: 'lofty', fallbackHex: '#a89880' },
	{ code: 'TW-MARIGOLD', label: 'Marigold', fileSlug: 'marigold', fallbackHex: '#b89a5e' },
	{ code: 'TW-NOIR', label: 'Noir', fileSlug: 'noir', fallbackHex: '#3d2e26' },
	{ code: 'TW-PEBBLE', label: 'Pebble', fileSlug: 'pebble', fallbackHex: '#8a8078' },
	{ code: 'TW-REALM', label: 'Realm', fileSlug: 'realm', fallbackHex: '#6e5644' },
	{ code: 'TW-RIFT', label: 'Rift', fileSlug: 'rift', fallbackHex: '#5c4a3a' },
	{ code: 'TW-SUNSET', label: 'Sunset', fileSlug: 'sunset', fallbackHex: '#8b5c3c' },
	{ code: 'TW-WALNUT', label: 'Walnut', fileSlug: 'walnut', fallbackHex: '#4a3520' },
] as const;

export function texturedWoodgrainSwatchUrl(fileSlug: string): string {
	return `/images/adornus-alusso-textured/${fileSlug}.jpg`;
}

/** Comma-separated labels for spec sheets and PDF copy. */
export const TEXTURED_WOODGRAIN_LABELS_CSV = TEXTURED_WOODGRAIN_OPTIONS.map((o) => o.label).join(', ');
