import type { ColorOption } from './types';
import { ADORNUS_DESIGNER_PAINT_FINISHES } from '../data/adornus-designer-paint-colors';
import { TEXTURED_WOODGRAIN_OPTIONS, texturedWoodgrainSwatchUrl } from '../data/textured-woodgrain-colors';

/** Sherwin-Williams–aligned melamine solids (same order as PDPs: light → dark). */
export function buildMelaminePlannerColors(): ColorOption[] {
	return ADORNUS_DESIGNER_PAINT_FINISHES.map((o) => ({
		code: o.code,
		label: o.label,
		hex: o.approxHex,
		group: 'solid' as const,
	}));
}

/** Textured woodgrain references (premium melamine lines only). */
export function buildWoodgrainPlannerColors(): ColorOption[] {
	return TEXTURED_WOODGRAIN_OPTIONS.map((o) => ({
		code: o.code,
		label: o.label,
		hex: o.fallbackHex,
		group: 'woodgrain' as const,
		swatchImage: texturedWoodgrainSwatchUrl(o.fileSlug),
	}));
}

/** Model S / L / Z / X — matches shop melamine + woodgrain options. */
export function buildPremiumMelaminePlannerPalette(): ColorOption[] {
	return [...buildMelaminePlannerColors(), ...buildWoodgrainPlannerColors()];
}

/** Varsity, Semi Pro, Pro, Stadium — melamine names for planning (no textured woodgrain SKUs). */
export function buildEssentialLinePlannerPalette(): ColorOption[] {
	return buildMelaminePlannerColors();
}
