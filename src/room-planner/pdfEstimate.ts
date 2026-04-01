import { jsPDF } from 'jspdf';

/** Line shape used for the estimate PDF (matches room planner LineItem). */
export interface EstimatePdfLine {
	roomName: string;
	displayName: string;
	widthIn: number;
	depthIn: number;
	colorLabel: string;
	accessories: { label: string; price: number }[];
	unitPrice: number;
	qty: number;
}

const ORANGE: [number, number, number] = [254, 89, 0];
const BLACK: [number, number, number] = [0, 0, 0];
const GRAY: [number, number, number] = [100, 100, 100];

/**
 * Portrait, branded project estimate (pricing only) — separate from layout / 3D PDF.
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

		const dateStr = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		function drawPageHeader(pageNum: number, isFirst: boolean) {
			pdf.setFillColor(...BLACK);
			pdf.rect(0, 0, pageW, 52, 'F');
			pdf.setFillColor(...ORANGE);
			pdf.rect(0, 52, pageW, 3, 'F');
			pdf.setTextColor(255, 255, 255);
			pdf.setFontSize(18);
			pdf.setFont('helvetica', 'bold');
			pdf.text('PLAYERSTALL', margin, 32);
			pdf.setFontSize(9);
			pdf.setTextColor(254, 89, 0);
			pdf.text('CUSTOM SPORTS LOCKERS', margin + 118, 32);
			pdf.setTextColor(200, 200, 200);
			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(8);
			pdf.text(`Page ${pageNum}`, pageW - margin, 32, { align: 'right' });
			pdf.setTextColor(0, 0, 0);

			let y = 72;
			if (isFirst) {
				pdf.setFontSize(22);
				pdf.setFont('helvetica', 'bold');
				pdf.text('Project estimate', margin, y);
				y += 28;
				pdf.setFontSize(10);
				pdf.setFont('helvetica', 'normal');
				pdf.setTextColor(...GRAY);
				pdf.text(`Prepared ${dateStr}`, margin, y);
				y += 16;
				pdf.text(`Prepared for: ${customerEmail}`, margin, y);
				y += 28;
				pdf.setTextColor(0, 0, 0);
				pdf.setFontSize(9);
				pdf.setFont('helvetica', 'italic');
				pdf.text(
					'This document summarizes your room planner selections and estimated pricing. A separate PDF includes your floor plans and 3D previews.',
					margin,
					y,
					{ maxWidth: contentW },
				);
				y += 36;
			}
			return y;
		}

		let pageNum = 1;
		let y = drawPageHeader(pageNum, true);
		const bottomSafe = pageH - 100;
		const rowBlock = 40;

		// Column layout (pt)
		const colRoom = margin;
		const colProduct = margin + 72;
		const colSpec = margin + 168;
		const colQty = pageW - margin - 130;
		const colUnit = pageW - margin - 90;
		const colLine = pageW - margin;

		function ensureSpace(need: number) {
			if (y + need > bottomSafe) {
				pdf.addPage('letter', 'portrait');
				pageNum++;
				y = drawPageHeader(pageNum, false);
			}
		}

		// Table header row
		ensureSpace(50);
		pdf.setFillColor(245, 245, 245);
		pdf.roundedRect(margin, y - 4, contentW, 22, 2, 2, 'F');
		pdf.setFontSize(8);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...GRAY);
		pdf.text('ROOM', colRoom, y + 10);
		pdf.text('PRODUCT', colProduct, y + 10);
		pdf.text('CONFIGURATION', colSpec, y + 10);
		pdf.text('QTY', colQty, y + 10, { align: 'right' });
		pdf.text('EACH', colUnit, y + 10, { align: 'right' });
		pdf.text('LINE', colLine, y + 10, { align: 'right' });
		pdf.setTextColor(0, 0, 0);
		y += 32;

		let curRoom = '';
		for (const line of lines) {
			const room = line.roomName || 'Room';
			const accPart =
				line.accessories.length > 0
					? ` · ${line.accessories.map((a) => a.label).join(', ')}`
					: '';
			const spec = `${line.widthIn}"W x ${line.depthIn}"D · ${line.colorLabel}${accPart}`;
			const lineTotal = line.unitPrice * line.qty;

			if (room !== curRoom) {
				ensureSpace(24);
				curRoom = room;
				pdf.setFont('helvetica', 'bold');
				pdf.setFontSize(9);
				pdf.setTextColor(...ORANGE);
				pdf.text(room.toUpperCase(), colRoom, y + 10);
				pdf.setTextColor(0, 0, 0);
				y += 18;
			}

			ensureSpace(rowBlock + 10);

			pdf.setFont('helvetica', 'normal');
			pdf.setFontSize(9);
			pdf.text(line.displayName, colProduct, y + 8, { maxWidth: colSpec - colProduct - 6 });
			pdf.setFontSize(8);
			pdf.setTextColor(...GRAY);
			pdf.text(spec, colSpec, y + 8, { maxWidth: colQty - colSpec - 8 });
			pdf.setTextColor(0, 0, 0);
			pdf.setFont('helvetica', 'bold');
			pdf.text(String(line.qty), colQty, y + 8, { align: 'right' });
			pdf.setFont('helvetica', 'normal');
			pdf.text(`$${line.unitPrice.toFixed(2)}`, colUnit, y + 8, { align: 'right' });
			pdf.setFont('helvetica', 'bold');
			pdf.text(`$${lineTotal.toFixed(2)}`, colLine, y + 8, { align: 'right' });

			y += rowBlock;
			pdf.setDrawColor(230);
			pdf.line(margin, y, pageW - margin, y);
			y += 6;
		}

		// Total band
		ensureSpace(120);
		y += 12;
		pdf.setFillColor(...ORANGE);
		pdf.roundedRect(margin, y, contentW, 44, 4, 4, 'F');
		pdf.setTextColor(255, 255, 255);
		pdf.setFontSize(12);
		pdf.setFont('helvetica', 'bold');
		pdf.text('Estimated total (USD)', margin + 16, y + 28);
		pdf.setFontSize(16);
		pdf.text(`$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, pageW - margin - 16, y + 28, {
			align: 'right',
		});
		pdf.setTextColor(0, 0, 0);
		y += 64;

		pdf.setFontSize(9);
		pdf.setFont('helvetica', 'bold');
		pdf.text('Why teams choose PlayerStall', margin, y);
		y += 14;
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(9);
		pdf.setTextColor(...GRAY);
		const bullets = [
			'30+ years building custom wood sports lockers for collegiate and pro programs',
			'Five year guarantee and free design consultation',
			'Canadian-owned and operated since 1996 · Serving teams across North America',
		];
		for (const b of bullets) {
			ensureSpace(20);
			pdf.text(`• ${b}`, margin, y, { maxWidth: contentW });
			y += pdf.getTextDimensions(b, { maxWidth: contentW - 10 }).h + 10;
		}
		y += 8;
		pdf.setTextColor(0, 0, 0);
		ensureSpace(40);
		pdf.setFontSize(8);
		pdf.setFont('helvetica', 'italic');
		pdf.setTextColor(120, 120, 120);
		pdf.text(
			'This estimate is based on your online planner configuration. Final pricing may vary with site conditions, shipping, installation scope, and final engineering approval.',
			margin,
			y,
			{ maxWidth: contentW },
		);
		y += 36;
		pdf.setFont('helvetica', 'normal');
		pdf.setTextColor(...GRAY);
		pdf.text('PlayerStall · 2934 200 Street, Langley, BC V2Z 2C1 Canada', margin, y);
		y += 12;
		pdf.text('1-888-584-1444 · sales@playerstall.com · playerstall.com', margin, y);

		return pdf.output('blob');
	} catch (e) {
		console.error('generateEstimatePdfBlob failed:', e);
		return null;
	}
}
