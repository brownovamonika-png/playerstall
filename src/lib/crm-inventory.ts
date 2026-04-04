import { SITE_CATALOG_WIDTHS, SITE_LOCKER_MODELS, type SiteCatalogModel } from './crm-site-pricing';

export { SITE_CATALOG_WIDTHS };

export const INVENTORY_REGIONS = ['canada', 'mexico', 'vietnam'] as const;
export type InventoryRegion = (typeof INVENTORY_REGIONS)[number];

export const TRACKING_PART = 'part' as const;
export const TRACKING_LOCKER_BOX = 'locker_box' as const;

export const MATERIAL_PREFINISHED_UV = 'prefinished_uv';
export const MATERIAL_MELAMINE = 'melamine';

export const PART_CODES = [
	'side_support_left',
	'side_support_right',
	'front_panel',
	'back_panel',
	'side_panel',
	'seat_top',
	'shelf',
	'bottom_shelf',
	'shelf_spacers',
] as const;

export type InventoryPartCode = (typeof PART_CODES)[number];

export const PART_CODE_LABELS: Record<InventoryPartCode, string> = {
	side_support_left: 'Side support (left)',
	side_support_right: 'Side support (right)',
	front_panel: 'Front panel',
	back_panel: 'Back panel',
	side_panel: 'Side panel',
	seat_top: 'Seat top',
	shelf: 'Shelf',
	bottom_shelf: 'Bottom shelf',
	shelf_spacers: 'Shelf spacers',
};

export const REGION_LABELS: Record<InventoryRegion, string> = {
	canada: 'Canada',
	mexico: 'Mexico',
	vietnam: 'Vietnam',
};

export function essentialModelsForParts(): Pick<SiteCatalogModel, 'value' | 'label'>[] {
	return SITE_LOCKER_MODELS.filter((m) => m.tier === 'essential').map((m) => ({
		value: m.value,
		label: m.label,
	}));
}

/** Essential `value` strings for CA/MX part grid (kept in sync with catalog). */
export function essentialModelValuesForPartGrid(): string[] {
	return SITE_LOCKER_MODELS.filter((m) => m.tier === 'essential').map((m) => m.value);
}

/** Demo/preview rows: full CA/MX grid (4×9×8 = 288 lines per region). */
export function buildCaMxPartGridDemoRows(region: 'canada' | 'mexico'): InventoryStockLineRow[] {
	const now = new Date().toISOString();
	const models = essentialModelValuesForPartGrid();
	const rows: InventoryStockLineRow[] = [];
	for (const essential_model of models) {
		for (const part_code of PART_CODES) {
			for (const width_inches of SITE_CATALOG_WIDTHS) {
				const slug = `${essential_model}-${part_code}-${width_inches}`.replace(/\s+/g, '_');
				rows.push({
					id: `demo-${region}-${slug}`,
					region,
					tracking_mode: 'part',
					essential_model,
					part_code,
					material: MATERIAL_PREFINISHED_UV,
					width_inches,
					depth_inches: 19,
					vented_front: null,
					lock_box_variant: null,
					quantity_on_hand: 0,
					notes: null,
					created_at: now,
					updated_at: now,
				});
			}
		}
	}
	return rows;
}

/** Vietnam whole-locker SKUs: premium + essential from site catalog. */
export function lockerBoxModels(): Pick<SiteCatalogModel, 'value' | 'label'>[] {
	return SITE_LOCKER_MODELS.map((m) => ({ value: m.value, label: m.label }));
}

export const VIETNAM_BOX_WIDTHS = [24, 26, 28, 30] as const;

export function isPartWidth(w: number): boolean {
	return (SITE_CATALOG_WIDTHS as readonly number[]).includes(w);
}

export function isPartCode(s: string): s is InventoryPartCode {
	return (PART_CODES as readonly string[]).includes(s);
}

export function isInventoryRegion(s: string): s is InventoryRegion {
	return (INVENTORY_REGIONS as readonly string[]).includes(s);
}

export function validatePartInsert(input: {
	region: string;
	essential_model: string;
	part_code: string;
	width_inches: number;
}): string | null {
	if (!isInventoryRegion(input.region) || (input.region !== 'canada' && input.region !== 'mexico')) {
		return 'Parts inventory is only for Canada or Mexico.';
	}
	const model = SITE_LOCKER_MODELS.find((m) => m.value === input.essential_model);
	if (!model || model.tier !== 'essential') {
		return 'Choose an Essential locker model (Semi Pro, Varsity, Pro Locker, or Stadium Locker).';
	}
	if (!isPartCode(input.part_code)) {
		return 'Invalid part type.';
	}
	if (!isPartWidth(input.width_inches)) {
		return `Width must be one of: ${SITE_CATALOG_WIDTHS.join(', ')} inches.`;
	}
	return null;
}

export function validateLockerBoxInsert(input: {
	region: string;
	essential_model: string;
	width_inches: number;
	lock_box_variant: boolean;
}): string | null {
	if (input.region !== 'vietnam') {
		return 'Locker box inventory is only for Vietnam.';
	}
	if (!SITE_LOCKER_MODELS.some((m) => m.value === input.essential_model)) {
		return 'Invalid locker model.';
	}
	if (!(VIETNAM_BOX_WIDTHS as readonly number[]).includes(input.width_inches)) {
		return 'Vietnam box width must be 24, 26, 28, or 30 inches.';
	}
	return null;
}

export type InventoryStockLineRow = {
	id: string;
	region: string;
	tracking_mode: string;
	essential_model: string | null;
	part_code: string | null;
	material: string;
	width_inches: number;
	depth_inches: number;
	vented_front: boolean | null;
	lock_box_variant: boolean | null;
	quantity_on_hand: number;
	notes: string | null;
	created_at: string;
	updated_at: string;
};

export function describeStockLine(row: InventoryStockLineRow): string {
	if (row.tracking_mode === 'part') {
		const part = row.part_code ? PART_CODE_LABELS[row.part_code as InventoryPartCode] || row.part_code : '';
		return `${row.essential_model || '—'} · ${part} · ${row.width_inches}"W × ${row.depth_inches}"D · UV prefinished`;
	}
	const lock = row.lock_box_variant ? 'With lock box' : 'No lock box';
	return `${row.essential_model || '—'} · ${row.width_inches}"W × ${row.depth_inches}"D · Melamine · Vented · ${lock}`;
}
