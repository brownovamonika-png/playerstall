/**
 * Parse pasted text from Custom Sport Lockers / legacy site inquiry emails
 * (label on one line, value on the next).
 */

export type ParsedCslInquiry = {
	contact_name: string;
	company_name: string | null;
	email: string | null;
	phone: string | null;
	shipping_address: string | null;
	country: string | null;
	order_title: string;
	locker_type: string | null;
	locker_size: string | null;
	locker_color: string | null;
	accessories: string | null;
	quantity: number | null;
	estimated_completion: string | null;
	client_notes: string | null;
	warnings: string[];
};

const US_STATES = new Set([
	'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
	'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
	'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

function normLabel(line: string): string {
	return line
		.trim()
		.toLowerCase()
		.replace(/\s*\/\s*/g, '/')
		.replace(/\s+/g, ' ');
}

/** Map normalized label -> field bucket */
function labelKey(norm: string): string | null {
	const aliases: [string, string][] = [
		['name', 'name'],
		['shipping address', 'shipping'],
		['city', 'city'],
		['state/province', 'state'],
		['zip/postal code', 'zip'],
		['e-mail', 'email'],
		['email', 'email'],
		['phone number', 'phone'],
		['phone', 'phone'],
		['product', 'product'],
		['quantity', 'quantity'],
		['name plate holder color', 'name_plate'],
		['hooks', 'hooks'],
		['comment or message', 'comment'],
		['comment', 'comment'],
		['message', 'comment'],
	];
	for (const [prefix, key] of aliases) {
		if (norm === prefix || norm.startsWith(prefix + ' ')) return key;
	}
	return null;
}

function extractLockerType(product: string): string | null {
	const p = product.toLowerCase();
	if (/\bstadium\b/.test(p)) return 'Stadium';
	if (/\bvarsity\b/.test(p)) return 'Varsity';
	if (/\bsemi\s*pro\b/.test(p)) return 'Semi Pro';
	if (/\bpro\b/.test(p) && !/semi/.test(p)) return 'Pro';
	if (/\bcurve\b/.test(p)) return 'Curve';
	if (/\bmodel\s*l\b/.test(p)) return 'Model L';
	if (/\bmodel\s*s\b/.test(p)) return 'Model S';
	if (/\bmodel\s*z\b/.test(p)) return 'Model Z';
	if (/\bmodel\s*x\b/.test(p)) return 'Model X';
	if (/\bcustom\b/.test(p)) return 'Custom';
	return null;
}

function parsePriceOrSizeHint(product: string): string | null {
	const m = product.match(/\$\s*[\d,]+(?:\.\d{2})?/);
	return m ? m[0].replace(/\s/g, '') : null;
}

/** m/d or m/d/yy in text -> YYYY-MM-DD for Postgres date */
function parseLooseUsDate(text: string): string | null {
	const m = text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
	if (!m) return null;
	const month = Number(m[1]);
	const day = Number(m[2]);
	let year: number;
	if (m[3]) {
		year = Number(m[3]);
		if (m[3].length === 2) year += year >= 70 ? 1900 : 2000;
	} else {
		const now = new Date();
		year = now.getFullYear();
		const candidate = new Date(year, month - 1, day);
		if (candidate < now) year += 1;
	}
	if (month < 1 || month > 12 || day < 1 || day > 31) return null;
	const mm = String(month).padStart(2, '0');
	const dd = String(day).padStart(2, '0');
	return `${year}-${mm}-${dd}`;
}

function splitCompanyFromShipping(line: string): { company: string | null; street: string } {
	const idx = line.indexOf(',');
	if (idx === -1) return { company: null, street: line.trim() };
	const a = line.slice(0, idx).trim();
	const b = line.slice(idx + 1).trim();
	if (a.length < 2 || b.length < 4) return { company: null, street: line.trim() };
	return { company: a, street: b };
}

export function parseCslInquiryPaste(raw: string): ParsedCslInquiry {
	const warnings: string[] = [];
	const lines = raw.split(/\r?\n/).map((l) => l.trim());
	const rawMap: Record<string, string> = {};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!line) continue;
		const key = labelKey(normLabel(line));
		if (!key) continue;
		let j = i + 1;
		while (j < lines.length && !lines[j]) j++;
		if (j >= lines.length) {
			warnings.push(`Missing value after "${line}"`);
			break;
		}
		const val = lines[j];
		if (labelKey(normLabel(val))) {
			warnings.push(`Expected value after "${line}", got another label`);
			continue;
		}
		rawMap[key] = val;
		i = j;
	}

	const name = rawMap.name?.trim() || '';
	if (!name) warnings.push('No contact name found — add a "Name" line in the paste.');

	const { company, street } = rawMap.shipping ? splitCompanyFromShipping(rawMap.shipping) : { company: null, street: '' };
	const city = rawMap.city?.trim() || '';
	const state = rawMap.state?.trim() || '';
	const zip = rawMap.zip?.trim() || '';

	let shipping_address: string | null = null;
	if (street || city || state || zip) {
		const tail = [city, [state, zip].filter(Boolean).join(' ')].filter(Boolean).join(', ');
		shipping_address = [street, tail].filter(Boolean).join(', ') || null;
	}

	let country: string | null = null;
	if (state && US_STATES.has(state.toUpperCase())) country = 'USA';
	else if (state && state.length === 2 && !US_STATES.has(state.toUpperCase())) country = 'Canada';

	const qtyRaw = rawMap.quantity?.trim();
	let quantity: number | null = null;
	if (qtyRaw) {
		const n = parseInt(qtyRaw.replace(/[^\d]/g, ''), 10);
		if (!Number.isNaN(n) && n > 0) quantity = n;
		else warnings.push(`Could not parse quantity: "${qtyRaw}"`);
	}

	const product = rawMap.product?.trim() || '';
	const locker_type = product ? extractLockerType(product) : null;
	const priceHint = product ? parsePriceOrSizeHint(product) : null;

	const accParts: string[] = [];
	if (rawMap.name_plate) accParts.push(`Name plate holder color: ${rawMap.name_plate}`);
	if (rawMap.hooks) accParts.push(`Hooks: ${rawMap.hooks}`);
	if (priceHint) accParts.push(product);
	const accessories = accParts.length ? accParts.join(' · ') : (product || null);

	const comment = rawMap.comment?.trim() || null;
	let estimated_completion = comment ? parseLooseUsDate(comment) : null;
	let client_notes = comment;

	const order_title =
		locker_type && quantity
			? `Inquiry — ${locker_type} × ${quantity}`
			: product
				? `Inquiry — ${product.slice(0, 80)}`
				: name
					? `Inquiry — ${name}`
					: 'Website inquiry';

	return {
		contact_name: name || 'Unknown contact',
		company_name: company,
		email: rawMap.email?.trim() || null,
		phone: rawMap.phone?.replace(/\D/g, '').length ? rawMap.phone.trim() : rawMap.phone?.trim() || null,
		shipping_address,
		country,
		order_title,
		locker_type,
		locker_size: null,
		locker_color: null,
		accessories,
		quantity,
		estimated_completion,
		client_notes,
		warnings,
	};
}
