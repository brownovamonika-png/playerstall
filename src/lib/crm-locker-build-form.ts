/**
 * Locker build form — sides (4) + top (4) + bottom (3).
 * Add PNGs under public/images/locker-build-form/ using `imageFile` names, or leave null for text-only cards.
 */

export type LockerBuildOption = {
	/** Stable id for forms / future DB */
	id: string;
	label: string;
	/** Optional line under the title */
	description?: string;
	/** File name only; served from /images/locker-build-form/ */
	imageFile: string | null;
};

/** Side elevation / profile — CAD thumbnails in public/images/locker-build-form/side-type-*.png */
export const LOCKER_SIDE_OPTIONS: LockerBuildOption[] = [
	{
		id: 'side_1',
		label: 'Locker L',
		description: 'Model L — stepped profile: shallow upper, deeper base, rounded transition',
		imageFile: 'side-type-1.png',
	},
	{
		id: 'side_2',
		label: 'Locker Z',
		description: 'Model Z (Elite) — C-shaped recess: solid top and bottom, open middle',
		imageFile: 'side-type-2.png',
	},
	{
		id: 'side_3',
		label: 'Locker X',
		description: 'Model X — curved mid-height cutout on front edge',
		imageFile: 'side-type-3.png',
	},
	{
		id: 'side_4',
		label: 'Locker S',
		description: 'Model S — deep middle recess; full-depth top and base',
		imageFile: 'side-type-4.png',
	},
];

export const LOCKER_BUILD_TOP_OPTIONS: LockerBuildOption[] = [
	{
		id: 'top_open_shelf',
		label: 'Open shelf — no lock box at all',
		description: 'Full-width open shelf style (double top trim, detailed base line)',
		imageFile: 'top-type-2.png',
	},
	{
		id: 'top_lock_box_no_lock',
		label: 'Lock box no lock',
		description: 'Narrow left bay and wide right bay with shared header strip (no lock)',
		imageFile: 'top-type-1.png',
	},
	{
		id: 'top_lock_box_electric',
		label: 'Lock box with electric lock',
		description: 'Narrow lock bay (~⅓ width) with electric lock; wide panel on the right',
		imageFile: 'top-type-3.png',
	},
	{
		id: 'top_fully_closed',
		label: 'Fully closed closed top shelf',
		description: 'Solid wood front; single closed door with pull — interior fully concealed',
		imageFile: 'top-type-4.png',
	},
];

export const LOCKER_BUILD_BOTTOM_OPTIONS: LockerBuildOption[] = [
	{
		id: 'bottom_no_vent',
		label: 'No vented bottom',
		description: 'Solid door front with latch and hinge side — no vent slots',
		imageFile: 'bottom-type-3.png',
	},
	{
		id: 'bottom_vented',
		label: '3 slot vented bottom',
		description: 'Three horizontal vent slots; joins top section at trim line',
		imageFile: 'bottom-type-1.png',
	},
	{
		id: 'bottom_framed_panel',
		label: 'Full vented bottom',
		description: 'Large inset panel with rounded corners',
		imageFile: 'bottom-type-2.png',
	},
];

export function lockerBuildImagePath(imageFile: string | null): string | null {
	if (!imageFile) return null;
	return `/images/locker-build-form/${imageFile}`;
}
