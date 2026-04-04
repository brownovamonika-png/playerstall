import { fundingStatusLabel } from '../room-planner/state';

/** Stored values — aligned with new room planner `fundraising_status` select. */
export const FUNDRAISING_STATUS_VALUES = [
	'have_funds',
	'need_funding',
	'fundraising',
	'unsure',
] as const;

export type FundraisingStatusCode = (typeof FUNDRAISING_STATUS_VALUES)[number];

export function fundraisingStatusOptionsForSelect(): { value: string; label: string }[] {
	return [
		{ value: '', label: 'Not set' },
		{ value: 'have_funds', label: 'Have Funds' },
		{ value: 'need_funding', label: 'Need Funding' },
		{ value: 'fundraising', label: 'Currently Fundraising' },
		{ value: 'unsure', label: 'Unsure' },
	];
}

export function displayFundraisingStatus(code: string | null | undefined): string {
	const s = (code || '').trim();
	if (!s) return '—';
	return fundingStatusLabel(s) || s;
}

export function normalizeFundraisingStatus(raw: string | null | undefined): string | null {
	const v = (raw || '').trim();
	if (!v) return null;
	if (FUNDRAISING_STATUS_VALUES.includes(v as FundraisingStatusCode)) return v;
	return null;
}
