import type { SupabaseClient } from '@supabase/supabase-js';

export type CreateClientOrderPayload = {
	contact_name: string;
	company_name: string | null;
	email: string | null;
	phone: string | null;
	sport: string | null;
	team_name: string | null;
	/** Room-planner codes: have_funds | need_funding | fundraising | unsure */
	fundraising_status: string | null;
	country: string | null;
	shipping_address: string | null;
	source: string;
	source_website: string | null;
	notes: string | null;
	order_title: string | null;
	locker_type: string | null;
	locker_size: string | null;
	locker_width: string | null;
	locker_color: string | null;
	accessories: string | null;
	quantity: number | null;
	estimated_completion: string | null;
};

export async function createClientWithInitialOrder(
	admin: SupabaseClient,
	input: CreateClientOrderPayload,
): Promise<{ clientId: string } | { error: string }> {
	const { data, error } = await admin
		.from('clients')
		.insert({
			contact_name: input.contact_name,
			company_name: input.company_name,
			email: input.email,
			phone: input.phone,
			sport: input.sport,
			team_name: input.team_name,
			fundraising_status: input.fundraising_status,
			country: input.country,
			shipping_address: input.shipping_address,
			source: input.source,
			source_website: input.source_website,
			notes: input.notes,
		})
		.select()
		.single();

	if (error || !data) return { error: error?.message || 'Could not create client' };

	if (input.order_title) {
		const { error: orderErr } = await admin.from('orders').insert({
			client_id: data.id,
			title: input.order_title,
			locker_type: input.locker_type,
			locker_size: input.locker_size,
			locker_width: input.locker_width,
			locker_color: input.locker_color,
			accessories: input.accessories,
			quantity: input.quantity,
			stage: 'new_lead',
			estimated_completion: input.estimated_completion || null,
		});
		if (orderErr) return { error: orderErr.message };
	}

	return { clientId: data.id };
}
