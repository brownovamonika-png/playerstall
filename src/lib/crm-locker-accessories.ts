/**
 * Locker PDF spec sheet accessories (Model L/S/Z/X, Elite, Pro, Stadium, Essential).
 * Each row has a stable `id` for form fields `acc_qty_${id}`.
 */
/** Reference / CRM line labels for cushion fabric color (spec panel + notes). */
export const CUSHION_COLOR_REFERENCE_OPTIONS: readonly { readonly id: string; readonly label: string }[] = [
	{ id: 'none', label: 'No color' },
	{ id: 'black', label: 'Black' },
	{ id: 'dark_blue', label: 'Dark blue' },
	{ id: 'red', label: 'Red' },
	{ id: 'green', label: 'Green' },
	{ id: 'purple', label: 'Purple' },
	{ id: 'other', label: 'Other' },
] as const;

export const LOCKER_SPEC_ACCESSORY_ROWS: readonly { readonly id: string; readonly label: string }[] = [
	{ id: 'cushion_top_bottom', label: 'Bottom cushion only' },
	{ id: 'cushion_both', label: 'Top and bottom cushions' },
	{ id: 'hooks', label: 'Hooks — black or silver' },
	{ id: 'name_plate', label: 'Name plate — black or silver' },
	{ id: 'custom_logo', label: 'Custom logo · custom orders only' },
] as const;

/**
 * Removes embedded catalog prices from the PDF spec label so UIs can show the amount once
 * (e.g. strips legacy "Hooks (+$15) — …" to "Hooks — …" for display).
 */
export function accessoryLabelWithoutEmbeddedPrice(label: string): string {
	const s = String(label ?? '')
		.replace(/\s*\(\+\$[\d,]+(?:\.\d{2})?\)/g, '')
		.replace(/\s*\(\+ \$[\d,]+(?:\.\d{2})?\)/g, '')
		.replace(/\s*\(from \$[\d,.]+\)/gi, '')
		.replace(/\s{2,}/g, ' ')
		.trim();
	return s;
}

/**
 * If `accessoriesBlob` (full field + notes) mentions silver/black near hooks or name plates,
 * replace the generic "— black or silver" suffix so the estimate list matches what the customer chose.
 */
export function accessoryLabelWithFinishFromNotes(
	rowId: string,
	labelWithoutPrice: string,
	accessoriesBlob: string
): string {
	const blob = String(accessoriesBlob ?? '');
	if (!/\bblack or silver\b/i.test(labelWithoutPrice)) return labelWithoutPrice;

	let finish: 'silver' | 'black' | null = null;

	if (rowId === 'name_plate') {
		if (
			/(?:silver|chrome).{0,48}(?:name\s*plate|nameplate)|(?:name\s*plate|nameplate).{0,48}(?:silver|chrome)/i.test(
				blob
			)
		) {
			finish = 'silver';
		} else if (
			/\bblack\b.{0,48}(?:name\s*plate|nameplate)|(?:name\s*plate|nameplate).{0,48}\bblack\b/i.test(blob)
		) {
			finish = 'black';
		}
	}

	if (rowId === 'hooks') {
		if (/(?:silver|chrome).{0,48}hook|hook.{0,48}(?:silver|chrome)/i.test(blob)) finish = 'silver';
		else if (/\bblack\b.{0,48}hook|hook.{0,48}\bblack\b/i.test(blob)) finish = 'black';
	}

	if (!finish) return labelWithoutPrice;
	return labelWithoutPrice.replace(/\s*[—–-]\s*black or silver\s*$/i, '').trim() + ` — ${finish}`;
}

type AccessoryRowId = (typeof LOCKER_SPEC_ACCESSORY_ROWS)[number]['id'];

/** Serialized lines from older copy still map to the same `cushion_*` ids. */
const LEGACY_ACCESSORY_LINE_PATTERNS: readonly { readonly re: RegExp; readonly id: AccessoryRowId }[] = [
	{
		re: /^Cushions — top or bottom \(\+\$75\)\s*[×x]\s*(\d+)\s*$/i,
		id: 'cushion_top_bottom',
	},
	{
		re: /^Cushions — both \(\+\$150\)\s*[×x]\s*(\d+)\s*$/i,
		id: 'cushion_both',
	},
	{
		re: /^Bottom cushion only \(\+\$75\)\s*[×x]\s*(\d+)\s*$/i,
		id: 'cushion_top_bottom',
	},
	{
		re: /^Top and bottom cushions \(\+\$150\)\s*[×x]\s*(\d+)\s*$/i,
		id: 'cushion_both',
	},
	{
		re: /^Hooks\s*\(\+\$15\)\s*[—–-]\s*black or silver\s*[×x]\s*(\d+)\s*$/i,
		id: 'hooks',
	},
	{
		re: /^Name plates?\s*\(\+\$10\)\s*[—–-]\s*black or silver\s*[×x]\s*(\d+)\s*$/i,
		id: 'name_plate',
	},
	{
		re: /^Custom logo\s*\(\+\$75\)\s*·\s*custom orders only\s*[×x]\s*(\d+)\s*$/i,
		id: 'custom_logo',
	},
];

/** Lines that omit the full PDF label but include finish + qty (CRM / pasted text). */
function tryParseLooseAccessoryLine(line: string): { id: AccessoryRowId; qty: number } | null {
	const t = line.trim();
	let m = t.match(/silver\s+name\s*plates?\s*[×x]\s*(\d+)/i);
	if (m) return { id: 'name_plate', qty: Number(m[1]) };
	m = t.match(/black\s+name\s*plates?\s*[×x]\s*(\d+)/i);
	if (m) return { id: 'name_plate', qty: Number(m[1]) };
	m = t.match(/name\s*plates?\s*(?:[—–:,]\s*)?(?:silver|black)\s*[×x]\s*(\d+)/i);
	if (m) return { id: 'name_plate', qty: Number(m[1]) };

	m = t.match(/silver\s+hooks?\s*[×x]\s*(\d+)/i);
	if (m) return { id: 'hooks', qty: Number(m[1]) };
	m = t.match(/black\s+hooks?\s*[×x]\s*(\d+)/i);
	if (m) return { id: 'hooks', qty: Number(m[1]) };

	return null;
}

function partitionLooseAccessoryLines(lines: string[], quantities: Record<string, number>): string[] {
	const kept: string[] = [];
	for (const line of lines) {
		const loose = tryParseLooseAccessoryLine(line);
		if (loose) {
			quantities[loose.id] = Math.max(quantities[loose.id] ?? 0, loose.qty);
		} else {
			kept.push(line);
		}
	}
	return kept;
}

/** @deprecated Use LOCKER_SPEC_ACCESSORY_ROWS.map((r) => r.label) */
export const LOCKER_SPEC_SHEET_ACCESSORIES: readonly string[] = LOCKER_SPEC_ACCESSORY_ROWS.map((r) => r.label);

function escapeRe(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function emptyQuantities(): Record<string, number> {
	return Object.fromEntries(LOCKER_SPEC_ACCESSORY_ROWS.map((r) => [r.id, 0])) as Record<string, number>;
}

/**
 * Decode `orders.accessories` TEXT: lines like `Label × 2`, optional `\n\n` + free-form notes.
 * Legacy prose (no matching lines) becomes `notes` only.
 */
export function parseAccessoriesField(stored: string | null | undefined): {
	quantities: Record<string, number>;
	notes: string;
} {
	const quantities = emptyQuantities();
	if (!stored?.trim()) return { quantities, notes: '' };

	let main = stored.trim();
	let notes = '';
	const sep = '\n\n';
	const i = main.indexOf(sep);
	if (i !== -1) {
		notes = main.slice(i + sep.length).trim();
		main = main.slice(0, i).trim();
	}

	let unmatched: string[] = [];
	const lines = main.split('\n').map((l) => l.trim()).filter(Boolean);

	for (const line of lines) {
		let matched = false;
		for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
			const re = new RegExp(`^${escapeRe(row.label)}\\s*[×x]\\s*(\\d+)\\s*$`, 'i');
			const m = line.match(re);
			if (m) {
				quantities[row.id] = Number(m[1]);
				matched = true;
				break;
			}
		}
		if (!matched) {
			let legacyMatched = false;
			for (const leg of LEGACY_ACCESSORY_LINE_PATTERNS) {
				const m = line.match(leg.re);
				if (m) {
					quantities[leg.id] = Number(m[1]);
					legacyMatched = true;
					break;
				}
			}
			if (!legacyMatched) unmatched.push(line);
		}
	}

	unmatched = partitionLooseAccessoryLines(unmatched, quantities);

	if (notes.trim()) {
		const noteLines = notes.split('\n').map((l) => l.trim()).filter(Boolean);
		notes = partitionLooseAccessoryLines(noteLines, quantities).join('\n\n');
	}

	if (unmatched.length && unmatched.length === lines.length) {
		return {
			quantities,
			notes: [unmatched.join('\n'), notes].filter(Boolean).join('\n\n'),
		};
	}

	if (unmatched.length) {
		notes = [unmatched.join('\n'), notes].filter(Boolean).join('\n\n');
	}
	return { quantities, notes };
}

export function serializeAccessoriesField(
	quantities: Record<string, number>,
	notes: string
): string | null {
	const lines: string[] = [];
	for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
		const q = quantities[row.id] ?? 0;
		if (q > 0) lines.push(`${row.label} × ${q}`);
	}
	const n = notes.trim();
	if (lines.length && n) return `${lines.join('\n')}\n\n${n}`;
	if (lines.length) return lines.join('\n');
	return n || null;
}

/** Read `acc_qty_${id}` + `accessories_notes` from a POST body. */
export function buildAccessoriesFromForm(form: FormData): string | null {
	return buildAccessoriesFromFormPrefixed(form, '');
}

/**
 * Same as buildAccessoriesFromForm but field names are `${prefix}acc_qty_${id}` and
 * `${prefix}accessories_notes` (use per-order prefix when multiple forms exist on one page).
 */
export function buildAccessoriesFromFormPrefixed(form: FormData, prefix: string): string | null {
	const quantities = emptyQuantities();
	for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
		const raw = form.get(`${prefix}acc_qty_${row.id}`);
		if (raw == null || raw === '') continue;
		const n = Math.floor(Number(raw));
		if (Number.isFinite(n) && n > 0) quantities[row.id] = n;
	}
	const notes = String(form.get(`${prefix}accessories_notes`) ?? '').trim();
	return serializeAccessoriesField(quantities, notes);
}

/** Quantities from prefixed acc fields (for server-side pricing). */
export function accessoryQuantitiesFromFormPrefixed(form: FormData, prefix: string): Record<string, number> {
	const quantities = emptyQuantities();
	for (const row of LOCKER_SPEC_ACCESSORY_ROWS) {
		const raw = form.get(`${prefix}acc_qty_${row.id}`);
		if (raw == null || raw === '') continue;
		const n = Math.floor(Number(raw));
		if (Number.isFinite(n) && n > 0) quantities[row.id] = n;
	}
	return quantities;
}
