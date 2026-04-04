/**
 * Admin shipping reference: Essential vs Premium pallet profiles and C & D Logistics memo merge fields.
 */

export const SHIPPING_TIERS = ['essential', 'premium'] as const;
export type ShippingProductTier = (typeof SHIPPING_TIERS)[number];

export const SHIPPING_TIER_LABELS: Record<ShippingProductTier, string> = {
	essential: 'Essential lockers',
	premium: 'Premium lockers',
};

export type ShippingPalletProfileRow = {
	id: string;
	product_tier: ShippingProductTier;
	label: string;
	pallet_length_in: number | null;
	pallet_width_in: number | null;
	pallet_height_in: number | null;
	weight_lb: number | null;
	lockers_per_pallet_note: string | null;
	packing_notes: string | null;
	handling_instructions: string | null;
	created_at: string;
	updated_at: string;
};

export type LogisticsCarrierTemplateRow = {
	id: string;
	carrier_slug: string;
	carrier_display_name: string;
	email_subject_template: string;
	attachment_body_template: string;
	created_at: string;
	updated_at: string;
};

/** Documented merge keys for attachment + subject (double-brace in DB template). */
export const CD_LOGISTICS_MERGE_FIELD_HELP: { key: string; description: string }[] = [
	{ key: 'shipper_company', description: 'Default: PlayerStall' },
	{ key: 'shipper_contact', description: 'Contact name for carrier' },
	{ key: 'shipper_phone', description: 'Shipper phone' },
	{ key: 'reference', description: 'PO / order / internal ref' },
	{ key: 'ship_date', description: 'Requested pickup or ship date' },
	{ key: 'ship_to', description: 'Full deliver-to block' },
	{ key: 'product_line', description: 'Essential or Premium (from tier)' },
	{ key: 'locker_qty', description: 'Locker count for this shipment' },
	{ key: 'pallet_qty', description: 'Number of pallets' },
	{ key: 'pallet_length_in', description: 'From saved pallet profile' },
	{ key: 'pallet_width_in', description: 'From saved pallet profile' },
	{ key: 'pallet_height_in', description: 'From saved pallet profile' },
	{ key: 'weight_lb', description: 'From saved pallet profile' },
	{ key: 'packing_notes', description: 'From saved pallet profile' },
	{ key: 'handling_instructions', description: 'From saved pallet profile' },
	{ key: 'internal_notes', description: 'One-off notes for this shipment' },
	{ key: 'generated_at', description: 'ISO timestamp when memo was built' },
	{ key: 'carrier_display_name', description: 'e.g. C & D Logistics' },
];

export function fillShipmentTemplate(template: string, vars: Record<string, string>): string {
	let out = template;
	for (const [k, v] of Object.entries(vars)) {
		const re = new RegExp(`\\{\\{\\s*${escapeRegExp(k)}\\s*\\}\\}`, 'g');
		out = out.replace(re, v ?? '');
	}
	return out;
}

function escapeRegExp(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isShippingTier(s: string): s is ShippingProductTier {
	return (SHIPPING_TIERS as readonly string[]).includes(s);
}

export const DEFAULT_DEMO_PROFILES: ShippingPalletProfileRow[] = [
	{
		id: 'demo-essential',
		product_tier: 'essential',
		label: 'Essential lockers (Semi Pro, Varsity, Pro Locker, Stadium)',
		pallet_length_in: 96,
		pallet_width_in: 48,
		pallet_height_in: 72,
		weight_lb: 1200,
		lockers_per_pallet_note: 'Demo — connect Supabase to save edits.',
		packing_notes: 'Demo flat-pack note.',
		handling_instructions: 'Demo handling note.',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: 'demo-premium',
		product_tier: 'premium',
		label: 'Premium lockers (Models X, Z, S, L)',
		pallet_length_in: 96,
		pallet_width_in: 48,
		pallet_height_in: 84,
		weight_lb: 1650,
		lockers_per_pallet_note: 'Demo — connect Supabase to save edits.',
		packing_notes: 'Demo premium packing note.',
		handling_instructions: 'Demo handling note.',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const DEFAULT_DEMO_CD_TEMPLATE: Omit<LogisticsCarrierTemplateRow, 'id' | 'created_at' | 'updated_at'> = {
	carrier_slug: 'cd_logistics',
	carrier_display_name: 'C & D Logistics',
	email_subject_template: 'Shipment request — PlayerStall — {{reference}}',
	attachment_body_template: `C & D LOGISTICS — SHIPMENT MEMO (PlayerStall)
Generated: {{generated_at}}

FROM / SHIPPER
Company: {{shipper_company}}
Contact: {{shipper_contact}}
Phone: {{shipper_phone}}

REFERENCE
Reference / PO: {{reference}}
Ship date (requested): {{ship_date}}

CONSIGNEE / DELIVER TO
{{ship_to}}

PRODUCT
Line: {{product_line}}
Locker quantity (approx): {{locker_qty}}
Number of pallets: {{pallet_qty}}

PALLET DATA
Dimensions (L × W × H inches): {{pallet_length_in}} × {{pallet_width_in}} × {{pallet_height_in}}
Declared weight (lb, est.): {{weight_lb}}

PACKING / HANDLING NOTES
{{packing_notes}}

HANDLING INSTRUCTIONS
{{handling_instructions}}

INTERNAL NOTES
{{internal_notes}}
`,
};
