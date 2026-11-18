import type { ColorOption, LockerTemplate } from './types';

import modelS from '../data/locker-templates/model-s.json';
import modelL from '../data/locker-templates/model-l.json';
import modelZ from '../data/locker-templates/model-z.json';
import modelX from '../data/locker-templates/model-x.json';
import varsity from '../data/locker-templates/varsity.json';
import semiPro from '../data/locker-templates/semi-pro.json';
import stadium from '../data/locker-templates/stadium.json';

import {
	buildPremiumMelaminePlannerPalette,
} from './planner-locker-colors';

const PREMIUM_TEMPLATE_IDS = new Set(['model-s', 'model-l', 'model-z', 'model-x']);

const rawTemplates: LockerTemplate[] = [
	modelS as LockerTemplate,
	modelL as LockerTemplate,
	modelZ as LockerTemplate,
	modelX as LockerTemplate,
	varsity as LockerTemplate,
	semiPro as LockerTemplate,
	stadium as LockerTemplate,
];

const templates: LockerTemplate[] = rawTemplates.map((t) => ({
	...t,
	colors: PREMIUM_TEMPLATE_IDS.has(t.templateId)
		? buildPremiumMelaminePlannerPalette()
		: buildPremiumMelaminePlannerPalette(),
}));

const byId = new Map<string, LockerTemplate>(templates.map((t) => [t.templateId, t]));

/**
 * Legacy planner / JSON color codes from older laminate presets → current AD-* melamine codes.
 * Keeps saved room plans and 3D previews working after palette upgrade.
 */
const LEGACY_LOCKER_COLOR_CODE: Record<string, string> = {
	DW: 'AD-HRW',
	WS: 'AD-CRM',
	FG: 'AD-LFG',
	NS: 'AD-BLU',
	GR: 'AD-IO',
	BL: 'AD-TRB',
	HB: 'TW-WALNUT',
	LB: 'AD-BLU',
	// Retired 2026 palette codes → nearest current color
	'AD-ABE': 'AD-CRM', 'AD-ALB': 'AD-CRM', 'AD-ANW': 'AD-CRM', 'AD-PW': 'AD-HRW', 'AD-SEA': 'AD-HRW',
	'AD-RPG': 'AD-LFG', 'AD-PG': 'AD-LFG', 'AD-QUI': 'AD-LFG', 'AD-WG': 'AD-LFG',
	'AD-MG': 'AD-IO', 'AD-BRB': 'AD-BLU', 'AD-GF': 'AD-BLU', 'AD-NAV': 'AD-BLU',
	'AD-CYS': 'AD-TRB', 'AD-RGN': 'AD-IO', 'AD-URB': 'TW-WALNUT',
	'TW-BRUNO': 'TW-MAPLE', 'TW-CANELLA': 'TW-MAPLE', 'TW-FAD': 'TW-WALNUT', 'TW-FLAXEN': 'UV-BIRCH',
	'TW-ICE': 'UV-BIRCH', 'TW-IMPULSE': 'TW-WALNUT', 'TW-JAVA': 'TW-WALNUT', 'TW-LOFTY': 'UV-BIRCH',
	'TW-MARIGOLD': 'TW-MAPLE', 'TW-NOIR': 'TW-WALNUT', 'TW-PEBBLE': 'AD-LFG', 'TW-REALM': 'TW-WALNUT',
	'TW-RIFT': 'TW-WALNUT', 'TW-SUNSET': 'TW-MAPLE',
};

export function getAllTemplates(): LockerTemplate[] {
	return templates;
}

export function getTemplate(templateId: string): LockerTemplate | undefined {
	return byId.get(templateId);
}

/** Resolve locker body color for 2D/3D and review (handles legacy short codes). */
export function resolveLockerColor(template: LockerTemplate | undefined, colorCode: string): ColorOption | undefined {
	if (!template) return undefined;
	const direct = template.colors.find((c) => c.code === colorCode);
	if (direct) return direct;
	const mapped = LEGACY_LOCKER_COLOR_CODE[colorCode];
	if (mapped) return template.colors.find((c) => c.code === mapped);
	return undefined;
}

/** Inline CSS for 28×28 locker color swatches (2D UI); 3D still uses `hex`. */
export function lockerColorSwatchStyle(c: ColorOption): string {
	const size = 'width:28px;height:28px;min-width:28px;min-height:28px;';
	if (c.swatchImage) {
		return `${size}background-image:url('${c.swatchImage}');background-size:cover;background-position:center;border:1px solid rgba(0,0,0,0.12);`;
	}
	return `${size}background:${c.hex};`;
}
