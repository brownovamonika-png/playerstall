/**
 * PDF spec sheet copy — single source for CRM locker forms (aligned with src/pages/pdf/*-locker-spec.astro).
 * Update here first, then sync the PDF pages if wording changes.
 */

import type { SiteCatalogTier } from './crm-site-pricing';

export type LockerSpecSheetRow = { readonly label: string; readonly value: string };

export type LockerPdfSpecReference = {
	readonly id: string;
	readonly shortLabel: string;
	readonly catalogModels: readonly string[];
	readonly pdfHref: string;
	readonly line: SiteCatalogTier;
	/** Side elevation PNG in `public/images/locker-build-form/` (Types 1–4 = L / Z / X / S). Null = no thumb. */
	readonly sideImageFile: string | null;
	/** When set, spec panel uses this public URL instead of `sideImageFile` (e.g. manufacturer CAD — tied to model name). */
	readonly sideImageSrc?: string;
	readonly specs: readonly LockerSpecSheetRow[];
	readonly features: readonly string[];
	readonly options: readonly string[];
};

/** Public URL for a locker-build-form side thumbnail. */
export function lockerSpecSideImageSrc(sideImageFile: string | null): string | null {
	if (!sideImageFile) return null;
	return `/images/locker-build-form/${sideImageFile}`;
}

/** Model tile thumb: prefer explicit `sideImageSrc`, else locker-build-form file. */
export function lockerSpecReferenceThumbSrc(s: LockerPdfSpecReference): string | null {
	const src = s.sideImageSrc?.trim();
	if (src) return src;
	return lockerSpecSideImageSrc(s.sideImageFile);
}

/** Premium melamine models (Model L / S / X / Z) — same spec block on each PDF. */
const PREMIUM_MELAMINE_SPECS: readonly LockerSpecSheetRow[] = [
	{ label: 'Standard dimensions', value: '24" W × 76" H × 19" D' },
	{ label: 'Base', value: 'Optional 4" high base' },
	{ label: 'Frame', value: '3/4"' },
	{ label: 'Backing', value: '3/4"' },
	{ label: 'Weight', value: 'Approx. 175 lbs' },
	{ label: 'Construction', value: 'MPW-6C plywood core, premium melamine surface' },
	{ label: 'Edgebanding', value: 'PVC edgebanding' },
	{ label: 'Width range', value: '18" – 32"' },
	{ label: 'Depth options', value: '19" or 24"' },
	{ label: 'Custom build', value: '8–12 weeks — any size, wood, or materials' },
	{ label: 'Warranty', value: '5 year warranty' },
];

const PREMIUM_MELAMINE_FEATURES: readonly string[] = [
	'MPW-6C plywood core with premium melamine surface for a furniture-grade look',
	'High scratch resistance and impact durability; moisture-resistant, dimensionally stable',
	'Engineered for high-traffic athletic locker rooms',
	'14" high foot locker provides comfortable seating and secure equipment storage',
	'Available in 18" to 32" widths; standard configuration 24" W x 76" H x 19" D with optional 4" base',
	'5 year warranty',
];

const PREMIUM_MELAMINE_OPTIONS: readonly string[] = [
	'Vented front panel for increased airflow',
	'Secure lock box integrated into the upper compartment',
	'Bottom cushion or both cushions for added seating comfort',
	'Skate hooks for hockey or figure skating storage',
	'Custom logo option for teams or programs (custom orders only)',
	'Name plate and additional gear hooks',
];

const ESSENTIAL_SPECS: readonly LockerSpecSheetRow[] = [
	{ label: 'Standard dimensions', value: '24" W × 76" H × 19" D' },
	{ label: 'Base', value: 'Optional 4" high base' },
	{ label: 'Frame', value: '3/4"' },
	{ label: 'Backing', value: '3/4"' },
	{ label: 'Weight', value: 'Approx. 66–75 lbs (model dependent)' },
	{ label: 'Construction', value: '19mm cabinet-grade pre-finished birch plywood, UV-coated both sides' },
	{ label: 'Edgebanding', value: 'PVC edgebanding' },
	{ label: 'Width range', value: '18" – 32"' },
	{ label: 'Depth options', value: '19" (standard)' },
	{ label: 'Material', value: 'Birch plywood only — no other wood types' },
	{ label: 'Custom build', value: '8–12 weeks — any size, color, options' },
	{ label: 'Warranty', value: '5 year warranty' },
];

const ESSENTIAL_FEATURES: readonly string[] = [
	'19mm cabinet-grade pre-finished birch plywood — the only wood type used for Essential lockers',
	'Smooth face, stable veneer core, durable UV-coated finish on both sides',
	'Professional-grade construction for demanding locker room settings',
	'Available in Semi Pro (from $349) and Varsity (from $449) configurations',
	'18" to 32" widths; standard 24" W × 76" H × 19" D with optional 4" base',
	'5 year warranty',
];

const ESSENTIAL_OPTIONS: readonly string[] = [
	'Vented front panel for increased airflow',
	'Secure lock box integrated into the upper compartment',
	'Bottom cushion or both cushions for added seating comfort',
	'Skate hooks for hockey or figure skating storage',
	'Custom logo option for teams or programs (custom orders only)',
	'Name plate and additional gear hooks',
];

const PRO_SPECS: readonly LockerSpecSheetRow[] = [
	{ label: 'Standard dimensions', value: '24" W × 76" H × 19" D' },
	{ label: 'Base', value: 'Optional 4" high base' },
	{ label: 'Frame', value: '3/4"' },
	{ label: 'Backing', value: '3/4"' },
	{ label: 'Weight', value: 'Approx. 175 lbs' },
	{ label: 'Construction', value: '3/4" cabinetry grade birch plywood' },
	{ label: 'Edgebanding', value: 'PVC edgebanding' },
	{ label: 'Width range', value: '18" – 32"' },
	{ label: 'Depth', value: '19"' },
	{ label: 'Finish', value: 'Cabinet-Grade Pre-Finished Birch Plywood for Wood Lockers' },
	{ label: 'Custom build', value: '8–12 weeks — any size, options' },
	{ label: 'Warranty', value: '5 year warranty' },
];

/** Matches pro-locker-spec.astro feature list. */
const PRO_FEATURES: readonly string[] = [
	'MPW-6C plywood core with premium melamine surface for a furniture-grade look',
	'High scratch resistance and impact durability; moisture-resistant, dimensionally stable',
	'Engineered for high-traffic athletic locker rooms',
	'14" high foot locker provides comfortable seating and secure equipment storage',
	'Available in 18" to 32" widths; standard configuration 24" W x 76" H x 19" D with optional 4" base',
	'5 year warranty',
];

const PRO_OPTIONS: readonly string[] = [
	'Vented front panel for increased airflow',
	'Secure lock box integrated into the upper compartment',
	'Bottom cushion or both cushions for added seating comfort',
	'Skate hooks for hockey or figure skating storage',
	'Custom logo option for teams or programs (custom orders only)',
	'Name plate and additional gear hooks',
];

const STADIUM_SPECS: readonly LockerSpecSheetRow[] = [
	{ label: 'Standard dimensions', value: '18" W × 76" H × 19" D' },
	{ label: 'Base', value: 'Optional 4" high base' },
	{ label: 'Frame', value: '3/4"' },
	{ label: 'Backing', value: '3/4"' },
	{ label: 'Weight', value: 'Approx. 175 lbs' },
	{ label: 'Construction', value: '3/4" cabinetry grade birch plywood' },
	{ label: 'Edgebanding', value: 'PVC edgebanding' },
	{ label: 'Width range', value: '18" – 32"' },
	{ label: 'Depth', value: '19"' },
	{ label: 'Finish', value: 'Cabinet-Grade Pre-Finished Birch Plywood for Wood Lockers' },
	{ label: 'Custom build', value: '8–12 weeks — any size, options' },
	{ label: 'Warranty', value: '5 year warranty' },
];

const STADIUM_FEATURES: readonly string[] = [
	'MPW-6C plywood core with premium melamine surface for a furniture-grade look',
	'High scratch resistance and impact durability; moisture-resistant, dimensionally stable',
	'Engineered for high-traffic athletic locker rooms',
	'14" high foot locker provides comfortable seating and secure equipment storage',
	'Available in 18" to 32" widths; standard configuration 24" W x 76" H x 19" D with optional 4" base',
	'5 year warranty',
];

const STADIUM_OPTIONS: readonly string[] = [
	'Vented front panel for increased airflow',
	'Secure lock box integrated into the upper compartment',
	'Bottom cushion or both cushions for added seating comfort',
	'Skate hooks for hockey or figure skating storage',
	'Custom logo option for teams or programs (custom orders only)',
	'Name plate and additional gear hooks',
];

export const LOCKER_PDF_SPEC_REFERENCES: readonly LockerPdfSpecReference[] = [
	{
		id: 'essential',
		shortLabel: 'Essential (Semi Pro & Varsity)',
		catalogModels: ['Semi Pro', 'Varsity'],
		pdfHref: '/pdf/essential-locker-spec/',
		line: 'essential',
		sideImageFile: 'side-type-1.png',
		specs: ESSENTIAL_SPECS,
		features: ESSENTIAL_FEATURES,
		options: ESSENTIAL_OPTIONS,
	},
	{
		id: 'pro-locker',
		shortLabel: 'Pro Locker',
		catalogModels: ['Pro Locker'],
		pdfHref: '/pdf/pro-locker-spec/',
		line: 'essential',
		sideImageFile: 'side-type-1.png',
		specs: PRO_SPECS,
		features: PRO_FEATURES,
		options: PRO_OPTIONS,
	},
	{
		id: 'stadium-locker',
		shortLabel: 'Stadium Locker',
		catalogModels: ['Stadium Locker'],
		pdfHref: '/pdf/stadium-locker-spec/',
		line: 'essential',
		sideImageFile: 'side-type-1.png',
		specs: STADIUM_SPECS,
		features: STADIUM_FEATURES,
		options: STADIUM_OPTIONS,
	},
	{
		id: 'model-l',
		shortLabel: 'Model L',
		catalogModels: ['Model L'],
		pdfHref: '/pdf/model-l-locker-spec/',
		line: 'premium',
		sideImageFile: null,
		sideImageSrc: '/images/crm-manufacturer-forms/model-l-type-1-24-inch.png',
		specs: PREMIUM_MELAMINE_SPECS,
		features: PREMIUM_MELAMINE_FEATURES,
		options: PREMIUM_MELAMINE_OPTIONS,
	},
	{
		id: 'model-x',
		shortLabel: 'Model X',
		catalogModels: ['Model X'],
		pdfHref: '/pdf/model-x-locker-spec/',
		line: 'premium',
		sideImageFile: null,
		sideImageSrc: '/images/crm-manufacturer-forms/model-x-type-2-24-inch.png',
		specs: PREMIUM_MELAMINE_SPECS,
		features: PREMIUM_MELAMINE_FEATURES,
		options: PREMIUM_MELAMINE_OPTIONS,
	},
	{
		id: 'model-s',
		shortLabel: 'Model S',
		catalogModels: ['Model S'],
		pdfHref: '/pdf/model-s-locker-spec/',
		line: 'premium',
		sideImageFile: null,
		sideImageSrc: '/images/crm-manufacturer-forms/model-s-type-3-24-inch.png',
		specs: PREMIUM_MELAMINE_SPECS,
		features: PREMIUM_MELAMINE_FEATURES,
		options: PREMIUM_MELAMINE_OPTIONS,
	},
	{
		id: 'model-z',
		shortLabel: 'Model Z (Elite)',
		catalogModels: ['Model Z'],
		pdfHref: '/pdf/elite-locker-spec/',
		line: 'premium',
		sideImageFile: null,
		sideImageSrc: '/images/crm-manufacturer-forms/model-z-type-4-24-inch.png',
		specs: PREMIUM_MELAMINE_SPECS,
		features: PREMIUM_MELAMINE_FEATURES,
		options: PREMIUM_MELAMINE_OPTIONS,
	},
] as const;

export function lockerPdfSpecReferencesForLine(line: SiteCatalogTier): readonly LockerPdfSpecReference[] {
	return LOCKER_PDF_SPEC_REFERENCES.filter((s) => s.line === line);
}

export function lockerPdfSpecReferenceByCatalogModel(model: string): LockerPdfSpecReference | undefined {
	const t = String(model || '').trim();
	return LOCKER_PDF_SPEC_REFERENCES.find((s) => s.catalogModels.includes(t));
}
