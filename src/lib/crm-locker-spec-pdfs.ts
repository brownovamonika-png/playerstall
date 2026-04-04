/**
 * On-site “spec sheet” pages under /pdf/… (browser Print → Save as PDF).
 * Maps catalog `SITE_LOCKER_MODELS` values to paths for CRM / inventory reference.
 *
 * Instruction PDFs (exploded parts / assembly) are static files under
 * `public/locker-instruction-manuals/` — see `instructionPdfHrefForCatalogModel`.
 */

import {
	assemblyInstructionPdfHref,
	isAssemblyManualCatalogModel,
} from './crm-locker-assembly-bom';
import { SITE_LOCKER_MODELS } from './crm-site-pricing';

/** Premium models: add matching PDFs under `public/locker-instruction-manuals/` (optional until uploaded). */
const PREMIUM_INSTRUCTION_PDF_HREFS: Readonly<Record<string, string>> = {
	'Model X': '/locker-instruction-manuals/model-x-locker-instructions.pdf',
	'Model Z': '/locker-instruction-manuals/model-z-locker-instructions.pdf',
	'Model S': '/locker-instruction-manuals/model-s-locker-instructions.pdf',
	'Model L': '/locker-instruction-manuals/model-l-locker-instructions.pdf',
};

/** Public URL to open the customer instruction PDF for this catalog model, or null if none mapped. */
export function instructionPdfHrefForCatalogModel(modelValue: string): string | null {
	if (isAssemblyManualCatalogModel(modelValue)) {
		return assemblyInstructionPdfHref(modelValue);
	}
	return PREMIUM_INSTRUCTION_PDF_HREFS[modelValue] ?? null;
}

const SPEC_SHEET_PATH_BY_MODEL: Readonly<Record<string, string>> = {
	'Model X': '/pdf/model-x-locker-spec/',
	'Model Z': '/pdf/elite-locker-spec/',
	'Model S': '/pdf/model-s-locker-spec/',
	'Model L': '/pdf/model-l-locker-spec/',
	'Semi Pro': '/pdf/essential-locker-spec/',
	Varsity: '/pdf/essential-locker-spec/',
	'Pro Locker': '/pdf/pro-locker-spec/',
	'Stadium Locker': '/pdf/stadium-locker-spec/',
};

/** Site page: shipping, flat-pack, assembly overview (print → PDF). */
export const PDF_ASSEMBLY_OVERVIEW = '/pdf/installation-instructions/';

export function specSheetPathForCatalogModel(modelValue: string): string | null {
	const href = SPEC_SHEET_PATH_BY_MODEL[modelValue];
	return href ?? null;
}

export type LockerSpecSheetLink = {
	value: string;
	label: string;
	href: string;
	/** Instruction PDF under `public/locker-instruction-manuals/` (may 404 until file is added). */
	instructionPdfHref: string | null;
};

/** One row per shop catalog model that has a dedicated spec page. */
export function lockerSpecSheetLinksForCatalog(): LockerSpecSheetLink[] {
	return SITE_LOCKER_MODELS.map((m) => {
		const href = specSheetPathForCatalogModel(m.value);
		if (!href) return null;
		return {
			value: m.value,
			label: m.label,
			href,
			instructionPdfHref: instructionPdfHrefForCatalogModel(m.value),
		};
	}).filter((x): x is LockerSpecSheetLink => x != null);
}
