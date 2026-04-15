import type { jsPDF } from 'jspdf';

const ORANGE: [number, number, number] = [254, 89, 0];
const BLACK: [number, number, number] = [0, 0, 0];

/** Black bar + orange accent strip. Returns Y for first line of page body. */
export function drawPlayerStallPdfHeader(pdf: jsPDF, options?: { pageNum?: number }): number {
	const pageW = pdf.internal.pageSize.getWidth();
	const margin = 48;
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
	pdf.setFont('helvetica', 'bold');
	pdf.text('CUSTOM SPORTS LOCKERS', margin + 118, 32);
	if (options?.pageNum != null) {
		pdf.setTextColor(200, 200, 200);
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(8);
		pdf.text(`Page ${options.pageNum}`, pageW - margin, 32, { align: 'right' });
	}
	pdf.setTextColor(0, 0, 0);
	pdf.setFont('helvetica', 'normal');
	return 72;
}
