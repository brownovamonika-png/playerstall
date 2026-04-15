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

/**
 * Portrait project estimate — same structure and copy as the customer room-plan email.
 */
export function generateEstimatePdfBlob(
	lines: EstimatePdfLine[],
	customerEmail: string,
	grandTotal: number,
): Blob | null {
	try {
		const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
		const pageW = pdf.internal.pageSize.getWidth();
		const pageH = pdf.internal.pageSize.getHeight();
		const margin = 48;
		const contentW = pageW - margin * 2;
		const innerPad = 24;
		const innerLeft = margin + innerPad;
		const innerRight = pageW - margin - innerPad;
		const innerW = innerRight - innerLeft;
		const colQtyW = 44;
		const colTotalW = 108;
		const colProductW = innerW - colQtyW - colTotalW - 18;

		const introW = Math.min(468, contentW);
		const introX = (pageW - introW) / 2;

		let pageNum = 1;
		let y = 40;
		const bottomSafe = pageH - 72;

		function ensureSpace(need: number) {
			if (y + need > bottomSafe) {
				pdf.addPage('letter', 'portrait');
				pageNum++;
				y = 48;
				pdf.setFontSize(22);
				pdf.setFont('helvetica', 'bold');
				pdf.setTextColor(...TEXT);
				pdf.text('PLAYERSTALL', pageW / 2, y, { align: 'center' });
				pdf.setFont('helvetica', 'normal');
				pdf.setTextColor(...MUTED);
				pdf.text(`Order summary (page ${pageNum})`, pageW - margin, y, { align: 'right' });
				y += 28;
				pdf.setTextColor(...TEXT);
			}
		}

		function hRule(xx: number, yy: number, ww: number) {
			pdf.setDrawColor(...LINE);
			pdf.setLineWidth(0.35);
			pdf.line(xx, yy, xx + ww, yy);
		}

		// --- Hero (same as email)
		pdf.setFontSize(43);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...TEXT);
		pdf.text('PLAYERSTALL', pageW / 2, y, { align: 'center', charSpace: 0.4 });
		y += 76;
		pdf.setFontSize(11);
		pdf.text('REVIEW YOUR LAYOUT', pageW / 2, y, { align: 'center' });
		y += 20;
		pdf.setFontSize(10);
		pdf.setFont('helvetica', 'normal');
		pdf.setTextColor(...MUTED);
		const introLines = pdf.splitTextToSize(ROOM_PLAN_INTRO, introW) as string[];
		pdf.text(introLines, introX, y);
		y += introLines.length * 12 + 24;
		pdf.setTextColor(...TEXT);

		const panelOuterTop = y;
		const estPanelH = Math.min(
			pageH - margin - panelOuterTop - 200,
			innerPad + 56 + 36 + Math.max(1, lines.length) * 62 + 224,
		);
		pdf.setFillColor(...PANEL);
		pdf.setDrawColor(...LINE);
		pdf.setLineWidth(0.5);
		pdf.rect(margin, panelOuterTop, contentW, estPanelH, 'FD');

		y = panelOuterTop + innerPad;
		pdf.setFontSize(14);
		pdf.setFont('helvetica', 'bold');
		pdf.text('ORDER SUMMARY', innerLeft, y);
		y += 22;
		hRule(innerLeft, y, innerW);
		y += 16;

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
				pdf.setFontSize(9);
				pdf.setTextColor(...TEXT);
				pdf.text(room.toUpperCase(), innerLeft + 8, y + 10);
				y += 26;
			}

			const title = productTitle(line);
			const specU = productSpecLine(line);
			const nameLines = pdf.splitTextToSize(title, colProductW - 4) as string[];
			const specLines = pdf.splitTextToSize(specU, colProductW - 4) as string[];
			const nameH = nameLines.length * 12;
			const specH = specLines.length * 10;
			const rowH = Math.max(48, 12 + nameH + 6 + specH + 14);
			ensureSpace(rowH + 6);

			const rowTop = y;
			let ty = rowTop + 12;
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(9);
			pdf.setTextColor(...TEXT);
			pdf.text(nameLines, innerLeft, ty);
			ty += nameH + 4;
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(8);
			pdf.setTextColor(...MUTED);
			pdf.text(specLines, innerLeft, ty);

			const qtyY = rowTop + 20;
			pdf.setFont('helvetica', 'bold');
			pdf.setFontSize(9);
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
		pdf.setFontSize(8);
		pdf.setTextColor(...MUTED);
		pdf.text('Subtotal', innerLeft, y);
		pdf.setFontSize(9);
		pdf.setTextColor(...TEXT);
		pdf.text(money(grandTotal), innerRight, y, { align: 'right' });
		y += 18;
		pdf.setDrawColor(...BORDER_STRONG);
		pdf.setLineWidth(0.5);
		pdf.line(innerLeft, y, innerRight, y);
		y += 16;
		const totalRowY = y;
		pdf.setFontSize(8);
		pdf.setTextColor(...MUTED);
		pdf.text('Estimated Total', innerLeft, totalRowY);
		pdf.setFontSize(20);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...TEXT);
		pdf.text(money(grandTotal), innerRight, totalRowY + 5, { align: 'right' });
		y += 28;

		const roomCount = lines.length ? roomNames.size : 0;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(9);
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

		pdf.setFontSize(9);
		pdf.setTextColor(...MUTED);
		for (let si = 0; si < ROOM_PLAN_SHIPPING_LINES.length; si++) {
			const shipLines = pdf.splitTextToSize(ROOM_PLAN_SHIPPING_LINES[si], innerW) as string[];
			pdf.text(shipLines, innerLeft, y);
			y += shipLines.length * 12 + (si < ROOM_PLAN_SHIPPING_LINES.length - 1 ? 4 : 10);
		}

		pdf.setFontSize(9);
		pdf.text('Your email', innerLeft, y);
		y += 14;
		pdf.setTextColor(...TEXT);
		pdf.setFontSize(10);
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
		pdf.rect(margin, wnStart, contentW, wnH, 'FD');
		let wy = wnStart + 18;
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(12);
		pdf.setTextColor(42, 42, 42);
		pdf.text(ROOM_PLAN_WHAT_NEXT_HEADING.toUpperCase(), innerLeft, wy);
		wy += 18;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(10);
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
		pdf.rect(margin, attStart, contentW, attH, 'FD');
		let ay = attStart + 16;
		pdf.setFontSize(10);
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
		pdf.rect(margin, y, contentW, 36, 'F');
		pdf.setTextColor(255, 255, 255);
		pdf.setFont('helvetica', 'bold');
		pdf.setFontSize(9);
		pdf.text(ROOM_PLAN_CTA_LABEL.toUpperCase(), pageW / 2, y + 23, { align: 'center' });
		y += 44;

		// --- Footer (same lines as email)
		pdf.setDrawColor(...LINE);
		pdf.setLineWidth(0.35);
		hRule(margin, y, contentW);
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
