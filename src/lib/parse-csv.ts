/** Minimal RFC4180-style CSV parse (handles quoted fields and doubled quotes). */
export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
	const rows: string[][] = [];
	let i = 0;
	const s = text.replace(/^\uFEFF/, '');
	const len = s.length;

	while (i < len) {
		const row: string[] = [];
		while (i < len) {
			let cell = '';
			if (s[i] === '"') {
				i++;
				while (i < len) {
					if (s[i] === '"') {
						if (s[i + 1] === '"') {
							cell += '"';
							i += 2;
							continue;
						}
						i++;
						break;
					}
					cell += s[i++];
				}
			} else {
				while (i < len && s[i] !== ',' && s[i] !== '\n' && s[i] !== '\r') {
					cell += s[i++];
				}
			}
			row.push(cell);
			if (s[i] === ',') {
				i++;
				continue;
			}
			if (s[i] === '\r') i++;
			if (s[i] === '\n') {
				i++;
				break;
			}
			break;
		}
		rows.push(row);
	}

	while (rows.length && rows[rows.length - 1].every((c) => !String(c).trim())) {
		rows.pop();
	}
	if (rows.length === 0) return { headers: [], rows: [] };
	const headers = rows[0].map((h) => String(h).trim());
	const dataRows = rows.slice(1).filter((r) => r.some((c) => String(c).trim()));
	return { headers, rows: dataRows };
}

export function isLikelyHtmlLoginResponse(text: string): boolean {
	const t = text.trimStart().slice(0, 200).toLowerCase();
	return t.startsWith('<!doctype') || t.startsWith('<html') || text.includes('Sign in') || text.includes('accounts.google.com');
}
