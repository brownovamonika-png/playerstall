/**
 * Premium locker build form — sides (4) + top (4) + bottom (3).
 * Add PNGs under public/images/premium-locker-form/ using `imageFile` names, or leave null for text-only cards.
 */

export type PremiumLockerFormOption = {
	id: string;
	label: string;
	description?: string;
	imageFile: string | null;
};

export const PREMIUM_LOCKER_SIDE_OPTIONS: PremiumLockerFormOption[] = [
	{
		id: 'premium_side_1',
		label: 'Locker L',
		description: 'Model L — stepped profile (match CAD filename to your drawing set)',
		imageFile: 'side-type-1.png',
	},
	{
		id: 'premium_side_2',
		label: 'Locker Z',
		description: 'Model Z (Elite) — C-shaped recess',
		imageFile: 'side-type-2.png',
	},
	{
		id: 'premium_side_3',
		label: 'Locker X',
		description: 'Model X — curved mid-height cutout',
		imageFile: 'side-type-3.png',
	},
	{
		id: 'premium_side_4',
		label: 'Locker S',
		description: 'Model S — deep middle recess',
		imageFile: 'side-type-4.png',
	},
];

export const PREMIUM_LOCKER_TOP_OPTIONS: PremiumLockerFormOption[] = [
	{
		id: 'premium_top_open_shelf',
		label: 'Open shelf — no lock box at all',
		description: 'Full-width open shelf style',
		imageFile: 'top-type-2.png',
	},
	{
		id: 'premium_top_lock_box_no_lock',
		label: 'Lock box no lock',
		description: 'Narrow left bay, wide right bay (no lock)',
		imageFile: 'top-type-1.png',
	},
	{
		id: 'premium_top_lock_box_electric',
		label: 'Lock box with electric lock',
		description: 'Electric lock bay with wide panel',
		imageFile: 'top-type-3.png',
	},
	{
		id: 'premium_top_fully_closed',
		label: 'Fully closed top shelf',
		description: 'Solid front; single closed door',
		imageFile: 'top-type-4.png',
	},
];

export const PREMIUM_LOCKER_BOTTOM_OPTIONS: PremiumLockerFormOption[] = [
	{
		id: 'premium_bottom_no_vent',
		label: 'No vented bottom',
		description: 'Solid door front, no vent slots',
		imageFile: 'bottom-type-3.png',
	},
	{
		id: 'premium_bottom_vented',
		label: '3 slot vented bottom',
		description: 'Horizontal vent slots',
		imageFile: 'bottom-type-1.png',
	},
	{
		id: 'premium_bottom_framed_panel',
		label: 'Full vented bottom',
		description: 'Large inset panel with rounded corners',
		imageFile: 'bottom-type-2.png',
	},
];

export function premiumLockerImagePath(imageFile: string | null): string | null {
	if (!imageFile) return null;
	return `/images/premium-locker-form/${imageFile}`;
}
