/**
 * Per-locker assembly BOMs from customer instruction PDFs (LayOut / SketchUp exports).
 * Source filenames in `ASSEMBLY_MANUAL_FILES` match originals used for BOM extraction.
 *
 * For the **admin site**, place the same PDFs under `public/locker-instruction-manuals/`
 * using the slug names in `ASSEMBLY_INSTRUCTION_PDF_PUBLIC_HREFS` so `/locker-instruction-manuals/…`
 * opens in the browser (parts diagrams / exploded views).
 *
 * `InventoryPartCode` rows in Supabase are width-specific stock lines; counts here are
 * **pieces per assembled locker** at any catalog width.
 */

import type { InventoryPartCode } from './crm-inventory';

/** Legacy / internal path label (BOM text); served copies use `public/locker-instruction-manuals/`. */
export const LOCKER_MANUAL_PDF_DIR = 'public/locker-instruction-manuals';

/** Essential models that have instruction manuals in-repo. */
export type AssemblyManualModel = 'Semi Pro' | 'Varsity' | 'Pro Locker' | 'Stadium Locker';

export const ASSEMBLY_MANUAL_FILES: Record<AssemblyManualModel, string> = {
	'Semi Pro': 'SEMI-PRO LOCKER INSTRUCTION MANUAL (1).pdf',
	Varsity: 'VARSITY LOCKER INSTRUCTION MANUAL (2).pdf',
	'Pro Locker': 'PRO LOCKER INSTRUCTION MANUAL LAYOUT (3).pdf',
	'Stadium Locker': 'STADIUM LOCKER INSTRUCTION MANUAL (5).pdf',
};

/** Served from `public/`; rename your PDFs to these paths (or symlink) for one-click open in CRM. */
export const ASSEMBLY_INSTRUCTION_PDF_PUBLIC_HREFS: Record<AssemblyManualModel, string> = {
	'Semi Pro': '/locker-instruction-manuals/semi-pro-locker-instructions.pdf',
	Varsity: '/locker-instruction-manuals/varsity-locker-instructions.pdf',
	'Pro Locker': '/locker-instruction-manuals/pro-locker-instructions.pdf',
	'Stadium Locker': '/locker-instruction-manuals/stadium-locker-instructions.pdf',
};

export function assemblyInstructionPdfHref(model: AssemblyManualModel): string {
	return ASSEMBLY_INSTRUCTION_PDF_PUBLIC_HREFS[model];
}

export function isAssemblyManualCatalogModel(value: string): value is AssemblyManualModel {
	return Object.prototype.hasOwnProperty.call(ASSEMBLY_INSTRUCTION_PDF_PUBLIC_HREFS, value);
}

/** Wood / panel pieces tracked in `inventory_stock_lines.part_code` (Canada/Mexico UV parts). */
export type TrackedPartCount = { code: InventoryPartCode; perLocker: number };

const SEMI_TRACKED: TrackedPartCount[] = [
	{ code: 'side_panel', perLocker: 2 },
	{ code: 'shelf', perLocker: 1 },
	{ code: 'bottom_shelf', perLocker: 1 },
	{ code: 'shelf_spacers', perLocker: 2 },
	{ code: 'seat_top', perLocker: 1 },
	{ code: 'back_panel', perLocker: 1 },
	{ code: 'side_support_left', perLocker: 1 },
	{ code: 'side_support_right', perLocker: 1 },
];

/** Semi Pro manual does not list a front panel (open below shelves). */
const VARSITY_AND_PRO_STADIUM_TRACKED: TrackedPartCount[] = [
	...SEMI_TRACKED,
	{ code: 'front_panel', perLocker: 1 },
];

export const TRACKED_PARTS_PER_LOCKER: Record<AssemblyManualModel, TrackedPartCount[]> = {
	'Semi Pro': SEMI_TRACKED,
	Varsity: VARSITY_AND_PRO_STADIUM_TRACKED,
	'Pro Locker': VARSITY_AND_PRO_STADIUM_TRACKED,
	'Stadium Locker': VARSITY_AND_PRO_STADIUM_TRACKED,
};

/** Manual callouts not represented as `part_code` today (future SKUs or non-UV). */
export type ManualExtraLine = { label: string; qtyPerLocker: number };

export const MANUAL_EXTRAS_PER_LOCKER: Record<AssemblyManualModel, ManualExtraLine[]> = {
	'Semi Pro': [
		{ label: 'Backing (optional locker backing)', qtyPerLocker: 1 },
		{ label: 'Shelf support', qtyPerLocker: 1 },
		{ label: 'Shelf trim', qtyPerLocker: 3 },
		{ label: 'Angle bracket', qtyPerLocker: 2 },
	],
	Varsity: [
		{ label: 'Backing (optional locker backing)', qtyPerLocker: 1 },
		{ label: 'Shelf support', qtyPerLocker: 1 },
		{ label: 'Shelf trim', qtyPerLocker: 2 },
		{ label: 'Angle bracket', qtyPerLocker: 4 },
	],
	'Pro Locker': [
		{ label: 'Backing (optional locker backing)', qtyPerLocker: 1 },
		{ label: 'Shelf support', qtyPerLocker: 1 },
	],
	'Stadium Locker': [
		{ label: 'Backing (optional locker backing)', qtyPerLocker: 1 },
		{ label: 'Shelf support', qtyPerLocker: 1 },
		{ label: 'Top spacer (manual: separate from shelf spacer)', qtyPerLocker: 2 },
		{ label: 'Shelf trim', qtyPerLocker: 2 },
	],
};

/** Typical fastener kit called out in the manuals (not in part_code inventory). */
export const TYPICAL_HARDWARE_NOTE =
	'Per manual: 32× screw 1¼″, 25× screw ½″, 21× screw caps (plus any angle-bracket screws).';

export function trackedPartsForModel(model: AssemblyManualModel): TrackedPartCount[] {
	return TRACKED_PARTS_PER_LOCKER[model];
}

export function extrasForModel(model: AssemblyManualModel): ManualExtraLine[] {
	return MANUAL_EXTRAS_PER_LOCKER[model];
}
