/**
 * List USD pricing aligned with playerstall.com shop + public/price-sheet-cad.html
 * (Premium Models X/Z/S/L, Essential Semi Pro / Varsity / Pro Locker / Stadium Locker).
 * Single source of truth for CRM estimates/invoices built from the site price list.
 */

import { LOCKER_SPEC_ACCESSORY_ROWS } from './crm-locker-accessories';

/** USD per add-on per locker (matches shop / spec sheet list prices). */
export const SITE_ACCESSORY_USD: Readonly<Record<string, number>> = {
	cushion_top_bottom: 75,
	cushion_both: 150,
	hooks: 15,
	name_plate: 10,
	custom_logo: 75,
};

export const SITE_CATALOG_WIDTHS = [18, 20, 22, 24, 26, 28, 30, 32] as const;

export type SiteCatalogTier = 'premium' | 'essential';

export type SiteCatalogModel = {
	readonly value: string;
	readonly label: string;
	readonly tier: SiteCatalogTier;
	readonly prices: Readonly<Record<number, number>>;
};

/** Width (inches) → base list USD per locker. */
const P649: Readonly<Record<number, number>> = {
	18: 649,
	20: 649,
	22: 649,
	24: 649,
	26: 699,
	28: 699,
	30: 749,
	32: 749,
};

const L599: Readonly<Record<number, number>> = {
	18: 599,
	20: 599,
	22: 599,
	24: 599,
	26: 629,
	28: 629,
	30: 649,
	32: 649,
};

const SEMI: Readonly<Record<number, number>> = {
	18: 349,
	20: 349,
	22: 349,
	24: 349,
	26: 399,
	28: 399,
	30: 429,
	32: 429,
};

const VARSITY: Readonly<Record<number, number>> = {
	18: 449,
	20: 449,
	22: 449,
	24: 449,
	26: 499,
	28: 499,
	30: 529,
	32: 529,
};

const PRO_STADIUM: Readonly<Record<number, number>> = {
	18: 599,
	20: 599,
	22: 599,
	24: 599,
	26: 629,
	28: 629,
	30: 649,
	32: 649,
};

export const SITE_LOCKER_MODELS: readonly SiteCatalogModel[] = [
	{ value: 'Model X', label: 'Model X — Premium', tier: 'premium', prices: P649 },
	{ value: 'Model Z', label: 'Model Z — Premium', tier: 'premium', prices: P649 },
	{ value: 'Model S', label: 'Model S — Premium', tier: 'premium', prices: P649 },
	{ value: 'Model L', label: 'Model L — Premium', tier: 'premium', prices: L599 },
	{ value: 'Semi Pro', label: 'Semi Pro — Essential', tier: 'essential', prices: SEMI },
	{ value: 'Varsity', label: 'Varsity — Essential', tier: 'essential', prices: VARSITY },
	{ value: 'Pro Locker', label: 'Pro Locker — Essential', tier: 'essential', prices: PRO_STADIUM },
	{ value: 'Stadium Locker', label: 'Stadium Locker — Essential', tier: 'essential', prices: PRO_STADIUM },
] as const;

export function getSiteCatalogModel(value: string): SiteCatalogModel | undefined {
	return SITE_LOCKER_MODELS.find((m) => m.value === value);
}

export function getLockerBaseUsd(modelValue: string, widthInches: number): number | null {
	const m = getSiteCatalogModel(modelValue);
	if (!m) return null;
	const p = m.prices[widthInches as keyof typeof m.prices];
	return typeof p === 'number' ? p : null;
}

export function sumAccessoryUsdPerLocker(quantities: Record<string, number>): number {
	let sum = 0;
	for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
		const q = Math.max(0, Math.floor(quantities[row.id] ?? 0));
		if (q <= 0) continue;
		const unit = SITE_ACCESSORY_USD[row.id];
		if (typeof unit === 'number') sum += unit * q;
	}
	return Math.round(sum * 100) / 100;
}

/**
 * Accessory fields are **per locker**, but people often enter an **order total** (e.g. 60 name plates for 60 lockers).
 * When raw qty ≥ locker count and divides evenly, treat it as a total across the order and convert to per-locker.
 * Examples: (60, 60)→1, (120, 60)→2. (3, 60) stays 3 (already per-locker).
 */
export function normalizeAccessoryQtyToPerLocker(rawQty: number, lockerQty: number): number {
	const q = Math.max(0, Math.floor(Number(rawQty)));
	if (q <= 0) return 0;
	const L = Math.max(1, Math.floor(lockerQty || 1));
	if (L > 1 && q >= L && q % L === 0) return q / L;
	return q;
}

export function normalizeAccessoryQuantitiesToPerLocker(
	raw: Record<string, number>,
	lockerQty: number
): Record<string, number> {
	const L = Math.max(1, Math.floor(lockerQty || 1));
	const out: Record<string, number> = {};
	for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
		out[row.id] = normalizeAccessoryQtyToPerLocker(raw[row.id] ?? 0, L);
	}
	return out;
}

export function computeCatalogLineUsd(input: {
	modelValue: string;
	widthInches: number;
	lockerQuantity: number;
	accessoryQuantities: Record<string, number>;
}): { basePerLocker: number; accessoriesPerLocker: number; perLocker: number; total: number } | null {
	const basePerLocker = getLockerBaseUsd(input.modelValue, input.widthInches);
	if (basePerLocker == null) return null;
	const lockerQty = Math.max(1, Math.floor(input.lockerQuantity || 1));
	const accPerLocker = normalizeAccessoryQuantitiesToPerLocker(input.accessoryQuantities, lockerQty);
	const accessoriesPerLocker = sumAccessoryUsdPerLocker(accPerLocker);
	const perLocker = Math.round((basePerLocker + accessoriesPerLocker) * 100) / 100;
	const total = Math.round(perLocker * lockerQty * 100) / 100;
	return { basePerLocker, accessoriesPerLocker, perLocker, total };
}

/** Parse `24"` or `24` → 24 */
export function parseWidthInches(raw: string | null | undefined): number | null {
	if (raw == null || String(raw).trim() === '') return null;
	const m = String(raw).trim().match(/^(\d+)/);
	if (!m) return null;
	const w = parseInt(m[1], 10);
	return (SITE_CATALOG_WIDTHS as readonly number[]).includes(w) ? w : null;
}

/** Parse depth field e.g. `19"` → 19 or 24 */
export function parseDepthInches(raw: string | null | undefined): 19 | 24 {
	const m = raw && String(raw).match(/^(\d+)/);
	const n = m ? parseInt(m[1], 10) : 19;
	return n === 24 ? 24 : 19;
}

/**
 * Map CRM / legacy dropdown values to catalog keys (e.g. "Pro" → "Pro Locker").
 * Returns null for Custom or unknown models not on the public price list.
 */
export function normalizeLockerTypeForCatalog(raw: string | null | undefined): string | null {
	const s = String(raw ?? '').trim();
	if (!s || s === 'Custom') return null;
	if (s === 'Pro') return 'Pro Locker';
	if (s === 'Stadium') return 'Stadium Locker';
	if (getSiteCatalogModel(s)) return s;
	return null;
}

/** Site list total from order fields + per-locker accessory quantities (same rules as client page catalog). */
export function computeSiteListForOrderFields(input: {
	locker_type: string | null | undefined;
	locker_size: string | null | undefined;
	quantity: number | null | undefined;
	accessoryQuantities: Record<string, number>;
}): ReturnType<typeof computeCatalogLineUsd> {
	const model = normalizeLockerTypeForCatalog(input.locker_type);
	const width = parseWidthInches(input.locker_size);
	const qty = Math.max(1, Math.floor(Number(input.quantity) || 1));
	if (!model || width == null) return null;
	return computeCatalogLineUsd({
		modelValue: model,
		widthInches: width,
		lockerQuantity: qty,
		accessoryQuantities: input.accessoryQuantities,
	});
}

/** Payload for browser preview (JSON-safe). */
export function getSitePricingClientPayload() {
	return {
		models: SITE_LOCKER_MODELS.map((m) => ({
			value: m.value,
			label: m.label,
			tier: m.tier,
			prices: m.prices as Record<string, number>,
		})),
		widths: [...SITE_CATALOG_WIDTHS],
		accessoryUsd: { ...SITE_ACCESSORY_USD },
		accessoryIds: LOCKER_SPEC_ACCESSORY_ROWS.map((r) => r.id),
	};
}
