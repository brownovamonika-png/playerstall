import { jsPDF } from 'jspdf';
import {
	ROOM_PLAN_ATTACHMENT_FILES_DESC,
	ROOM_PLAN_ATTACHMENTS_NOTE_PDF,
	ROOM_PLAN_CTA_LABEL,
	ROOM_PLAN_FOOTER_LINES,
	ROOM_PLAN_INTRO,
	ROOM_PLAN_SHIPPING_LINES,
	ROOM_PLAN_WHAT_NEXT_HEADING,
	ROOM_PLAN_WHAT_NEXT_STEPS,
} from '../lib/roomPlanCustomerCopy';
import { extractPlannerMetaFromOrderSummary } from '../lib/roomPlanOrderSummaryParse';
import { drawRoomPlanEmailStylePdfHero } from './pdfBranding';

/** Line shape used for the estimate PDF (matches room planner LineItem). */
export interface EstimatePdfLine {
	roomName: string;
	displayName: string;
	widthIn: number;
	depthIn: number;
	colorLabel: string;
	accessories: { label: string; price: number }[];
	/** Locker base (width + depth); omit on legacy callers. */
	basePrice?: number;
	unitPrice: number;
	qty: number;
}

/** Match room-plan customer email + review.astro */
const TEXT: [number, number, number] = [13, 13, 13];
const MUTED: [number, number, number] = [140, 140, 140];
const LINE: [number, number, number] = [224, 224, 224];
const PANEL: [number, number, number] = [247, 247, 247];
const BAND: [number, number, number] = [250, 250, 250];
const BORDER_STRONG: [number, number, number] = [204, 204, 204];
const FOOTNOTE: [number, number, number] = [182, 182, 182];

function money(n: number): string {
	return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function productTitle(line: EstimatePdfLine): string {
	const raw = line.displayName.trim();
	const u = raw.toUpperCase();
	return u.includes('LOCKER') ? u : `${u} LOCKER`;
}

/** One spec line like email HTML (uppercase). */
function productSpecLine(line: EstimatePdfLine): string {
	const acc = line.accessories.map((a) => a.label).join(', ');
	const mid = `${line.widthIn}"W x ${line.depthIn}"D · ${line.colorLabel}${acc ? ` + ${acc}` : ''}`;
	return mid.toUpperCase();
}

function productRowMetrics(pdf: jsPDF, line: EstimatePdfLine, colProductW: number) {
	const title = productTitle(line);
	const specU = productSpecLine(line);
	const nameLines = pdf.splitTextToSize(title, colProductW - 4) as string[];
	const specLines = pdf.splitTextToSize(specU, colProductW - 4) as string[];
	const nameH = nameLines.length * 14;
	const specH = specLines.length * 11;
	const rowH = Math.max(52, 14 + nameH + 6 + specH + 14);
	return { nameLines, specLines, nameH, specH, rowH };
}

function shippingLinesHeight(pdf: jsPDF, innerW: number): number {
	let h = 0;
	for (let si = 0; si < ROOM_PLAN_SHIPPING_LINES.length; si++) {
		const shipLines = pdf.splitTextToSize(ROOM_PLAN_SHIPPING_LINES[si], innerW) as string[];
		h += shipLines.length * 12 + (si < ROOM_PLAN_SHIPPING_LINES.length - 1 ? 4 : 10);
	}
	return h;
}

/** Vertical space for the gray order card (team email structure + customer “Your email” row). */
function measureOrderPanelHeight(
	pdf: jsPDF,
	lines: EstimatePdfLine[],
	innerW: number,
	innerPad: number,
	colProductW: number,
): number {
	// Mirrors the draw sequence below (customer email: no “Customer” strip — Order Summary first).
	let h = innerPad;
	h += 14 + 16 + 14;
	h += 10 + 10 + 14;
	let curRoom = '';
	for (const line of lines) {
		const room = line.roomName || 'Unnamed Room';
		if (room !== curRoom) {
			curRoom = room;
			h += 26;
		}
		const { rowH } = productRowMetrics(pdf, line, colProductW);
		h += rowH + 6;
	}
	h += 8 + 18 + 16 + 28 + 22 + shippingLinesHeight(pdf, innerW);
	h += 12 + 14 + 10 + 16 + 4 + innerPad;
	return h + 32;
}

/**
 * Portrait project estimate — same white layout + hierarchy as the customer room-plan email
 * (`buildCustomerHTML`, /dev/email-preview-room-plan), including the order card (Order Summary
 * first; no internal “Customer” strip — that is team-email-only). Pass the same `orderSummary` you
 * POST to `/api/send-room-plan` so timing/funding appear in the “Your selections” panel.
 */
export function generateEstimatePdfBlob(
	lines: EstimatePdfLine[],
	customerEmail: string,
	grandTotal: number,
	orderSummaryForSelections?: string,
): Blob | null {
	try {
		const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
		const pageW = pdf.internal.pageSize.getWidth();
		const pageH = pdf.internal.pageSize.getHeight();
		const margin = 48;
		/* Email inner column ~max-width 640px — match narrow centered card */
		const cardW = Math.min(480, pageW - 2 * margin);
		const xCard = (pageW - cardW) / 2;
		const contentW = cardW;
		const innerPad = 24;
		const innerLeft = xCard + innerPad;
		const innerRight = xCard + cardW - innerPad;
		const innerW = innerRight - innerLeft;
		const colQtyW = 44;
		const colTotalW = 108;
		const colProductW = innerW - colQtyW - colTotalW - 18;

		const introW = Math.min(520, cardW - 32);

		let pageNum = 1;
		let y = drawRoomPlanEmailStylePdfHero(pdf, {
			headline: 'REVIEW YOUR LAYOUT',
			introParagraph: ROOM_PLAN_INTRO,
			introMaxWidth: introW,
			stackMaxWidth: cardW - 16,
		});
		const bottomSafe = pageH - 88;

		function ensureSpace(need: number) {
			if (y + need > bottomSafe) {
				pdf.addPage('letter', 'portrait');
				pageNum++;
				y = drawRoomPlanEmailStylePdfHero(pdf, {
					pageLabel: `Page ${pageNum}`,
					mutedCenter: `Order summary · page ${pageNum}`,
					stackMaxWidth: cardW - 16,
				});
			}
		}

		function hRule(xx: number, yy: number, ww: number) {
			pdf.setDrawColor(...LINE);
			pdf.setLineWidth(0.35);
			pdf.line(xx, yy, xx + ww, yy);
		}

		const labelColWMeta = Math.floor(innerW * 0.38);
		const valueWMeta = innerW - labelColWMeta - 16;
		let metaTiming: string[] = [];
		let metaFunding: string[] = [];
		if (orderSummaryForSelections?.trim()) {
			const ex = extractPlannerMetaFromOrderSummary(orderSummaryForSelections);
			metaTiming = ex.timingLines;
			metaFunding = ex.fundingLines;
		}

		if (metaTiming.length || metaFunding.length) {
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(9);
			const measureVal = (rows: string[]) =>
				pdf.splitTextToSize(rows.join('\n'), valueWMeta) as string[];
			const timingValLines = metaTiming.length ? measureVal(metaTiming) : [];
			const fundingValLines = metaFunding.length ? measureVal(metaFunding) : [];

			const titleRowH = 46;
			let contentH = 0;
			if (metaTiming.length) contentH += 10 + timingValLines.length * 13 + 8;
			if (metaFunding.length) contentH += 10 + fundingValLines.length * 13 + 4;
			const blockH = innerPad + titleRowH + contentH + innerPad;

			ensureSpace(blockH + 14);
			const selTop = y;
			pdf.setFillColor(...PANEL);
			pdf.setDrawColor(...LINE);
			pdf.setLineWidth(0.5);
			pdf.rect(xCard, selTop, contentW, blockH, 'FD');

			const titleBaseline = selTop + innerPad + 16 + 10;
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(14);
			pdf.setTextColor(...TEXT);
			pdf.text('YOUR SELECTIONS', innerLeft, titleBaseline);
			const ruleUnderTitle = selTop + innerPad + titleRowH;
			hRule(innerLeft, ruleUnderTitle, innerW);
			let sy = ruleUnderTitle + 12;

			const drawRow = (label: string, valLines: string[]) => {
				pdf.setFont('helvetica', 'bold');
				pdf.setFontSize(11);
				pdf.setTextColor(...MUTED);
				pdf.text(label, innerLeft, sy + 9);
				pdf.setFont('helvetica', 'normal');
				pdf.setFontSize(13);
				pdf.setTextColor(...TEXT);
				pdf.text(valLines, innerLeft + labelColWMeta, sy + 9);
				sy += Math.max(14, valLines.length * 13) + 8;
			};
			if (metaTiming.length) drawRow('PREFERRED DELIVERY TIMING', timingValLines);
			if (metaFunding.length) drawRow('FUNDING / BUDGET', fundingValLines);

			y = selTop + blockH + 14;
		}

		const orderPanelTop = y;
		const orderPanelH = Math.min(
			pageH - margin - orderPanelTop - 180,
			measureOrderPanelHeight(pdf, lines, innerW, innerPad, colProductW),
		);
		ensureSpace(orderPanelH + 28);
		pdf.setFillColor(...PANEL);
		pdf.setDrawColor(...LINE);
		pdf.setLineWidth(0.5);
		pdf.rect(xCard, orderPanelTop, contentW, orderPanelH, 'FD');

		/* Match buildCustomerHTML order card: Order Summary row first (team email adds “Customer” above). */
		y = orderPanelTop + innerPad;
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(20);
		pdf.setTextColor(...TEXT);
		pdf.text('ORDER SUMMARY', innerLeft, y + 14);
		y += 14 + 16;
		hRule(innerLeft, y, innerW);
		y += 14;

		pdf.setFontSize(11);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...MUTED);
		const headY = y;
		pdf.text('Product', innerLeft, headY);
		pdf.text('Qty', innerLeft + colProductW + colQtyW / 2, headY, { align: 'center' });
		pdf.text('Subtotal', innerRight, headY, { align: 'right' });
		y += 10;
		hRule(innerLeft, y, innerW);
		y += 14;

		let curRoom = '';
		let totalLockers = 0;
		const roomNames = new Set<string>();

		for (const line of lines) {
			const room = line.roomName || 'Unnamed Room';
			roomNames.add(room);
			totalLockers += line.qty;
			const lineTotal = line.unitPrice * line.qty;

			if (room !== curRoom) {
				curRoom = room;
				ensureSpace(28);
				pdf.setFont('helvetica', 'bold');
				pdf.setFontSize(11);
				pdf.setTextColor(...TEXT);
				pdf.text(room.toUpperCase(), innerLeft + 8, y + 10);
				y += 26;
			}

			const { nameLines, specLines, nameH, specH, rowH } = productRowMetrics(pdf, line, colProductW);
			ensureSpace(rowH + 6);

			const rowTop = y;
			let ty = rowTop + 14;
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(13);
			pdf.setTextColor(...TEXT);
			pdf.text(nameLines, innerLeft, ty);
			ty += nameH + 4;
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(11);
			pdf.setTextColor(...MUTED);
			pdf.text(specLines, innerLeft, ty);

			const qtyY = rowTop + 22;
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(13);
			pdf.setTextColor(...TEXT);
			pdf.text(String(line.qty), innerLeft + colProductW + colQtyW / 2, qtyY, { align: 'center' });
			pdf.text(money(lineTotal), innerRight, qtyY, { align: 'right' });

			y = rowTop + rowH;
			hRule(innerLeft, y, innerW);
			y += 4;
		}

		ensureSpace(72);
		y += 8;
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(12);
		pdf.setTextColor(...MUTED);
		pdf.text('Subtotal', innerLeft, y);
		pdf.setFontSize(13);
		pdf.setTextColor(...TEXT);
		pdf.text(money(grandTotal), innerRight, y, { align: 'right' });
		y += 18;
		pdf.setDrawColor(...BORDER_STRONG);
		pdf.setLineWidth(0.5);
		pdf.line(innerLeft, y, innerRight, y);
		y += 16;
		const totalRowY = y;
		pdf.setFontSize(12);
		pdf.setTextColor(...MUTED);
		pdf.text('Estimated Total', innerLeft, totalRowY);
		pdf.setFontSize(20);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...TEXT);
		pdf.text(money(grandTotal), innerRight, totalRowY + 5, { align: 'right' });
		y += 28;

		const roomCount = lines.length ? roomNames.size : 0;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(12);
		pdf.setTextColor(...MUTED);
		if (lines.length === 0) {
			pdf.text('No lockers in this summary.', innerLeft, y);
		} else {
			pdf.text(
				`${totalLockers} locker${totalLockers !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`,
				innerLeft,
				y,
			);
		}
		y += 22;

		pdf.setFontSize(12);
		pdf.setTextColor(...MUTED);
		for (let si = 0; si < ROOM_PLAN_SHIPPING_LINES.length; si++) {
			const shipLines = pdf.splitTextToSize(ROOM_PLAN_SHIPPING_LINES[si], innerW) as string[];
			pdf.text(shipLines, innerLeft, y);
			y += shipLines.length * 12 + (si < ROOM_PLAN_SHIPPING_LINES.length - 1 ? 4 : 10);
		}

		pdf.setFontSize(12);
		pdf.text('Your email', innerLeft, y);
		y += 14;
		pdf.setTextColor(...TEXT);
		pdf.setFontSize(14);
		pdf.text(customerEmail, innerLeft, y);
		y += 16;
		hRule(innerLeft, y, innerW);
		y += innerPad;

		// --- What happens next (same copy as email; #fafafa band)
		ensureSpace(100);
		const wnStart = y;
		let wnH = 22 + 16;
		for (const step of ROOM_PLAN_WHAT_NEXT_STEPS) {
			const sl = pdf.splitTextToSize(step, innerW - 18) as string[];
			wnH += sl.length * 12 + 6;
		}
		wnH += 20;
		pdf.setFillColor(...BAND);
		pdf.setDrawColor(...LINE);
		pdf.rect(xCard, wnStart, contentW, wnH, 'FD');
		let wy = wnStart + 18;
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(14);
		pdf.setTextColor(42, 42, 42);
		pdf.text(ROOM_PLAN_WHAT_NEXT_HEADING.toUpperCase(), innerLeft, wy);
		wy += 18;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(12);
		pdf.setTextColor(85, 85, 85);
		let n = 1;
		for (const step of ROOM_PLAN_WHAT_NEXT_STEPS) {
			const sl = pdf.splitTextToSize(`${n}. ${step}`, innerW - 18) as string[];
			pdf.text(sl, innerLeft + 8, wy);
			wy += sl.length * 12 + 4;
			n += 1;
		}
		y = wnStart + wnH + 16;

		// --- Attachments band
		const attStart = y;
		const attLead = `Attachments: ${ROOM_PLAN_ATTACHMENT_FILES_DESC}`;
		const att1 = pdf.splitTextToSize(attLead, innerW) as string[];
		const att2 = pdf.splitTextToSize(ROOM_PLAN_ATTACHMENTS_NOTE_PDF, innerW) as string[];
		const attH = 18 + att1.length * 12 + 8 + att2.length * 11 + 18;
		pdf.setFillColor(...BAND);
		pdf.setDrawColor(...LINE);
		pdf.rect(xCard, attStart, contentW, attH, 'FD');
		let ay = attStart + 16;
		pdf.setFontSize(11);
		pdf.setTextColor(85, 85, 85);
		pdf.text(att1, innerLeft, ay);
		ay += att1.length * 12 + 6;
		pdf.setFontSize(9);
		pdf.setTextColor(119, 119, 119);
		pdf.text(att2, innerLeft, ay);
		y = attStart + attH + 20;

		// --- CTA strip (same label as email button)
		ensureSpace(36);
		pdf.setFillColor(...TEXT);
		pdf.rect(xCard, y, contentW, 36, 'F');
		pdf.setTextColor(255, 255, 255);
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(10);
		pdf.text(ROOM_PLAN_CTA_LABEL.toUpperCase(), pageW / 2, y + 23, { align: 'center' });
		y += 44;

		// --- Footer (same lines as email)
		pdf.setDrawColor(...LINE);
		pdf.setLineWidth(0.35);
		hRule(xCard, y, contentW);
		y += 16;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(9);
		pdf.setTextColor(...FOOTNOTE);
		pdf.text(ROOM_PLAN_FOOTER_LINES[0], pageW / 2, y, { align: 'center' });
		y += 12;
		pdf.text(ROOM_PLAN_FOOTER_LINES[1], pageW / 2, y, { align: 'center' });

		return pdf.output('blob');
	} catch (e) {
		console.error('generateEstimatePdfBlob failed:', e);
		return null;
	}
}
