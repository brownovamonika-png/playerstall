/**
 * Shared parsing for room-planner `orderSummary` strings (email HTML, PDF estimate, API).
 */

/**
 * Parse planner line: `4x Model S (24"W x 19"D, High Reflective White + acc) - $2596.00`
 */
export function parsePlannerProductLine(line: string): {
	qty: string;
	name: string;
	specLine: string;
	price: string;
} | null {
	const re = /^(\d+)x\s+(.+?)\s+\((.+)\)\s+-\s+\$([\d,]+\.\d{2})\s*$/i;
	const m = line.match(re);
	if (!m) return null;
	const qty = m[1];
	const name = m[2].trim();
	const inner = m[3].trim();
	const price = m[4].replace(/,/g, '');
	const innerRe = /^(\d+"\s*W\s+[x×]\s+\d+"\s*D)\s*,\s*(.+)$/i;
	const im = inner.match(innerRe);
	const specLine = im ? `${im[1].replace(/\s+/g, ' ').trim()} · ${im[2].trim()}` : inner;
	return { qty, name, specLine, price: price };
}

/**
 * Planner pages prepend delivery timing and funding lines before room dividers / products.
 */
export function extractPlannerMetaFromOrderSummary(orderSummary: string): {
	timingLines: string[];
	fundingLines: string[];
	rest: string;
} {
	const rawLines = orderSummary.split('\n');
	let i = 0;
	while (i < rawLines.length && rawLines[i].trim() === '') i++;

	const timingLines: string[] = [];
	const fundingLines: string[] = [];

	const isTimingHeader = (s: string) => /^preferred delivery timing:\s*$/i.test(s.trim());
	const isFundingHeader = (s: string) => /^funding \/ budget:\s*$/i.test(s.trim());
	const isRoomDivider = (s: string) => /^---\s*.+\s*---\s*$/.test(s.trim());
	const isProductLine = (s: string) => s.trim().length > 0 && parsePlannerProductLine(s.trim()) !== null;
	const isEstimatedTotal = (s: string) => /^estimated total:/i.test(s.trim());

	if (i < rawLines.length && isTimingHeader(rawLines[i])) {
		i++;
		while (i < rawLines.length) {
			const L = rawLines[i];
			const t = L.trim();
			if (!t) break;
			if (isFundingHeader(L)) break;
			if (isRoomDivider(L)) break;
			if (isProductLine(L)) break;
			if (isEstimatedTotal(L)) break;
			timingLines.push(L.trimEnd().trim());
			i++;
		}
	}

	if (i < rawLines.length && isFundingHeader(rawLines[i])) {
		i++;
		while (i < rawLines.length) {
			const L = rawLines[i];
			const t = L.trim();
			if (!t) break;
			if (isTimingHeader(L)) break;
			if (isRoomDivider(L)) break;
			if (isProductLine(L)) break;
			if (isEstimatedTotal(L)) break;
			fundingLines.push(L.trimEnd().trim());
			i++;
		}
	}

	while (i < rawLines.length && rawLines[i].trim() === '') i++;
	const rest = rawLines.slice(i).join('\n').replace(/^\s+/, '');
	return { timingLines, fundingLines, rest };
}
