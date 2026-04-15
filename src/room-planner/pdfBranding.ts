import type { jsPDF } from 'jspdf';

const ORANGE: [number, number, number] = [254, 89, 0];
const BLACK: [number, number, number] = [0, 0, 0];
const TEXT: [number, number, number] = [13, 13, 13];
const MUTED: [number, number, number] = [140, 140, 140];
const FOOT_GRAY: [number, number, number] = [182, 182, 182];

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

/** Matches /dev/email-preview-room-plan: white page, large centered PLAYERSTALL + optional stack. */
export type RoomPlanEmailStyleHeroOptions = {
	pageLabel?: string;
	headline?: string;
	/** Short muted block, centered (split if long) */
	mutedCenter?: string;
	/** Long muted intro (e.g. ROOM_PLAN_INTRO) */
	introParagraph?: string;
	/** Max width for intro split (email ~520px) */
	introMaxWidth?: number;
	/**
	 * Max width for headline + intro + muted stack (email inner column ~640px minus padding).
	 * When set, blocks are centered at that width like the HTML preview.
	 */
	stackMaxWidth?: number;
};

function stackWidth(pageW: number, margin: number, o: RoomPlanEmailStyleHeroOptions): number {
	const cap = o.stackMaxWidth ?? pageW - margin * 2;
	return Math.max(200, Math.min(cap, pageW - margin * 2));
}

export function drawRoomPlanEmailStylePdfHero(pdf: jsPDF, o: RoomPlanEmailStyleHeroOptions = {}): number {
	const pageW = pdf.internal.pageSize.getWidth();
	const margin = 48;
	const sw = stackWidth(pageW, margin, o);
	const sx = (pageW - sw) / 2;
	const introW = o.introMaxWidth ?? Math.min(520, sw);
	const ix = (pageW - introW) / 2;
	let y = 36;

	if (o.pageLabel) {
		pdf.setFontSize(8);
		pdf.setFont('helvetica', 'normal');
		pdf.setTextColor(...MUTED);
		pdf.text(o.pageLabel, pageW - margin, y, { align: 'right' });
	}

	/* Email: 43px PLAYERSTALL, letter-spacing ~0.05em, ~48px gap before h1 */
	pdf.setFont('helvetica', 'bold');
	pdf.setFontSize(42);
	pdf.setTextColor(...TEXT);
	pdf.text('PLAYERSTALL', pageW / 2, y + 30, { align: 'center', charSpace: 0.35 });
	y += 30 + 46;

	if (o.headline) {
		pdf.setFontSize(14);
		pdf.setFont('helvetica', 'bold');
		pdf.setTextColor(...TEXT);
		const hl = pdf.splitTextToSize(o.headline, sw) as string[];
		pdf.text(hl, pageW / 2, y, { align: 'center' });
		y += hl.length * 17 + 10;
	}

	if (o.mutedCenter) {
		pdf.setFont('helvetica', 'normal');
		pdf.setFontSize(9);
		pdf.setTextColor(...MUTED);
		const lines = pdf.splitTextToSize(o.mutedCenter, sw) as string[];
		let my = y;
		for (const ln of lines) {
			pdf.text(ln, sx + sw / 2, my, { align: 'center' });
			my += 11 * 1.55;
		}
		y = my + 8;
	}

	if (o.introParagraph) {
		/* Email body intro: ~15px, line-height 1.65 */
		pdf.setFontSize(11);
		pdf.setFont('helvetica', 'normal');
		pdf.setTextColor(...MUTED);
		const lines = pdf.splitTextToSize(o.introParagraph, introW) as string[];
		let iy = y;
		const lh = 11 * 1.65;
		for (const ln of lines) {
			pdf.text(ln, ix, iy);
			iy += lh;
		}
		y = iy + 18;
	}

	pdf.setTextColor(...TEXT);
	pdf.setFont('helvetica', 'normal');
	return y;
}

/** Two-line footer like customer room-plan email HTML. */
export function drawRoomPlanEmailStylePdfFooter(pdf: jsPDF, line1: string, line2: string): void {
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	pdf.setFont('helvetica', 'normal');
	pdf.setFontSize(8);
	pdf.setTextColor(...FOOT_GRAY);
	pdf.text(line1, pageW / 2, pageH - 28, { align: 'center' });
	pdf.text(line2, pageW / 2, pageH - 16, { align: 'center' });
	pdf.setTextColor(0, 0, 0);
}
