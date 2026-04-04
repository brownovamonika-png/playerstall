import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/auth';
import {
	DEFAULT_DEMO_CD_TEMPLATE,
	DEFAULT_DEMO_PROFILES,
	fillShipmentTemplate,
	isShippingTier,
	type ShippingPalletProfileRow,
} from '../../../lib/crm-shipping';
import { supabaseAdmin, isSupabaseConfigured } from '../../../lib/supabase';

export const prerender = false;

function sanitizeFilenamePart(s: string): string {
	return String(s || 'shipment')
		.replace(/[^a-zA-Z0-9-_]+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 80) || 'shipment';
}

export const POST: APIRoute = async ({ request, cookies }) => {
	const demoMode = !isSupabaseConfigured;
	if (!demoMode) {
		const session = await getSession(cookies);
		if (!session) {
			return new Response('Unauthorized', { status: 401 });
		}
	}

	const form = await request.formData();
	const tierRaw = String(form.get('product_tier') || '');
	if (!isShippingTier(tierRaw)) {
		return new Response('Invalid product tier', { status: 400 });
	}

	let profile: ShippingPalletProfileRow | undefined;
	let templateBody: string;
	let templateSubject: string;
	let carrierName: string;

	if (demoMode) {
		profile = DEFAULT_DEMO_PROFILES.find((p) => p.product_tier === tierRaw);
		templateBody = DEFAULT_DEMO_CD_TEMPLATE.attachment_body_template;
		templateSubject = DEFAULT_DEMO_CD_TEMPLATE.email_subject_template;
		carrierName = DEFAULT_DEMO_CD_TEMPLATE.carrier_display_name;
	} else {
		const { data: p } = await supabaseAdmin!
			.from('shipping_pallet_profiles')
			.select('*')
			.eq('product_tier', tierRaw)
			.single();
		if (!p) {
			return new Response('Pallet profile not found', { status: 404 });
		}
		profile = p as ShippingPalletProfileRow;

		const { data: t } = await supabaseAdmin!
			.from('logistics_carrier_templates')
			.select('*')
			.eq('carrier_slug', 'cd_logistics')
			.single();
		if (!t) {
			return new Response('C & D template not found', { status: 404 });
		}
		templateBody = String(t.attachment_body_template);
		templateSubject = String(t.email_subject_template);
		carrierName = String(t.carrier_display_name);
	}

	const reference = String(form.get('reference') || '').trim();
	const shipDate = String(form.get('ship_date') || '').trim();
	const shipTo = String(form.get('ship_to') || '').trim();
	const lockerQty = String(form.get('locker_qty') || '').trim();
	const palletQty = String(form.get('pallet_qty') || '').trim();
	const shipperCompany = String(form.get('shipper_company') || 'PlayerStall').trim();
	const shipperContact = String(form.get('shipper_contact') || '').trim();
	const shipperPhone = String(form.get('shipper_phone') || '').trim();
	const internalNotes = String(form.get('internal_notes') || '').trim();

	const fmt = (n: number | null | undefined) => (n != null && !Number.isNaN(Number(n)) ? String(n) : '');

	const vars: Record<string, string> = {
		carrier_display_name: carrierName,
		shipper_company: shipperCompany,
		shipper_contact: shipperContact,
		shipper_phone: shipperPhone,
		reference: reference || '—',
		ship_date: shipDate || '—',
		ship_to: shipTo || '—',
		product_line: tierRaw === 'essential' ? 'Essential' : 'Premium',
		locker_qty: lockerQty || '—',
		pallet_qty: palletQty || '—',
		pallet_length_in: fmt(profile!.pallet_length_in),
		pallet_width_in: fmt(profile!.pallet_width_in),
		pallet_height_in: fmt(profile!.pallet_height_in),
		weight_lb: fmt(profile!.weight_lb),
		packing_notes: profile!.packing_notes?.trim() || '—',
		handling_instructions: profile!.handling_instructions?.trim() || '—',
		internal_notes: internalNotes || '—',
		generated_at: new Date().toISOString(),
	};

	const filled = fillShipmentTemplate(templateBody, vars);
	const filledSubject = fillShipmentTemplate(templateSubject, vars);

	const header =
		`EMAIL SUBJECT (copy into your mail client)\n${filledSubject}\n\n` +
		`--- ATTACHMENT BODY BELOW (or attach this file) ---\n\n`;

	const bodyOut = header + filled;
	const fname = `C-and-D-Logistics-memo-${sanitizeFilenamePart(reference)}-${new Date().toISOString().slice(0, 10)}.txt`;

	return new Response(bodyOut, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Content-Disposition': `attachment; filename="${fname}"`,
			'Cache-Control': 'no-store',
		},
	});
};
