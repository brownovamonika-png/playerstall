import type { ColorOption, LockerTemplate } from './types';

import modelS from '../data/locker-templates/model-s.json';
import modelL from '../data/locker-templates/model-l.json';
import modelZ from '../data/locker-templates/model-z.json';
import modelX from '../data/locker-templates/model-x.json';
import varsity from '../data/locker-templates/varsity.json';
import semiPro from '../data/locker-templates/semi-pro.json';
import pro from '../data/locker-templates/pro.json';
import stadium from '../data/locker-templates/stadium.json';

import {
	buildEssentialLinePlannerPalette,
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
	pro as LockerTemplate,
	stadium as LockerTemplate,
];

const templates: LockerTemplate[] = rawTemplates.map((t) => ({
	...t,
	colors: PREMIUM_TEMPLATE_IDS.has(t.templateId)
		? buildPremiumMelaminePlannerPalette()
		: buildEssentialLinePlannerPalette(),
}));

const byId = new Map<string, LockerTemplate>(templates.map((t) => [t.templateId, t]));

/**
 * Legacy planner / JSON color codes from older laminate presets → current AD-* melamine codes.
 * Keeps saved room plans and 3D previews working after palette upgrade.
 */
const LEGACY_LOCKER_COLOR_CODE: Record<string, string> = {
	DW: 'AD-HRW',
	WS: 'AD-PG',
	FG: 'AD-WG',
	NS: 'AD-BRB',
	GR: 'AD-IO',
	BL: 'AD-TRB',
	HB: 'AD-URB',
	LB: 'AD-NAV',
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
