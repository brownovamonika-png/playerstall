import { jsPDF } from 'jspdf';
import {
	drawLayoutPdfCenteredHeader,
	drawLayoutPdfFooterLine,
} from './pdfBranding';
import { BRAND_FONT, ensureBrandFontsLoaded, registerBrandFonts, setBrandFont } from './pdfFonts';
import { capturePlanner3DDataURL } from './render3d';
import { needByTimelineLabel, fundingStatusLabel } from './state';
import type { DisplayUnit, PlannerState } from './types';
import type { LockerInstance } from './types';
import type { EstimatePdfLine } from './pdfEstimate';

/** Minimal saved-room shape for layout PDF (3D snapshot + summary only). */
export interface PdfLayoutSavedRoom {
	roomName: string;
	needByTimeline?: string;
	fundingStatus?: string;
	sportType: string;
	floorColor: string;
	wallColor: string;
	showBase: boolean;
	baseColor: string;
	edgebandColor?: string;
	customLogoDataUrl: string | null;
	walls: PlannerState['walls'];
	openings: PlannerState['openings'];
	lockers: LockerInstance[];
}

/** Optional pricing + customer fields needed by the portrait summary page. */
export interface PdfLayoutSummaryData {
	customerEmail: string;
	grandTotal: number;
	lines: EstimatePdfLine[];
}

const FOOTER_LINE = 'playerstall.com · team@playerstall.com';
const SNAPSHOT_W = 1920;
const SNAPSHOT_H = 1200;

/** Tints — match the reference `room-planner-layout.pdf` design. */
const TEXT: [number, number, number] = [13, 13, 13];
const MUTED: [number, number, number] = [140, 140, 140];
const STRONG_MUTED: [number, number, number] = [110, 110, 110];
const LINE_COLOR: [number, number, number] = [224, 224, 224];
const PANEL_BG: [number, number, number] = [250, 250, 250];

function defaultFloorWall(): { floor: string; wall: string } {
	return { floor: '#8B7355', wall: '#ffffff' };
}

/** Planner state from saved room JSON for 3D snapshot capture. */
function buildPlannerStateFromSavedRoom(
	room: PdfLayoutSavedRoom,
	displayUnit: DisplayUnit,
): PlannerState {
	const { floor, wall } = defaultFloorWall();
	return {
		roomName: room.roomName,
		needByTimeline: room.needByTimeline || '',
		fundingStatus: room.fundingStatus || '',
		sportType: (room.sportType || '') as PlannerState['sportType'],
		displayUnit,
		editMode: false,
		camera: { centerX: 0, centerY: 0, pixelsPerInch: 2 },
		walls: JSON.parse(JSON.stringify(room.walls)),
		openings: JSON.parse(JSON.stringify(room.openings)),
		lockers: JSON.parse(JSON.stringify(room.lockers)),
		selection: null,
		floorColor: room.floorColor || floor,
		wallColor: room.wallColor || wall,
		showBase: room.showBase ?? false,
		baseColor: room.baseColor || '#1A1A1A',
		edgebandColor: room.edgebandColor || '',
	};
}

/**
 * Small 3D render of the first saved room for email HTML (matches layout PDF engine).
 * Returns a PNG data URL, or null if WebGL capture fails.
 */
export async function captureFirstRoom3DEmailPreviewDataUrl(
	savedRooms: PdfLayoutSavedRoom[],
	displayUnit: DisplayUnit,
): Promise<string | null> {
	if (!savedRooms.length) return null;
	const room = savedRooms[0];
	const tempState = buildPlannerStateFromSavedRoom(room, displayUnit);
	return capturePlanner3DDataURL(tempState, {
		width: 560,
		height: 350,
		pixelRatio: 1,
		customLogoDataUrl: room.customLogoDataUrl ?? undefined,
	});
}

function money(n: number): string {
	return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function productTitle(line: EstimatePdfLine): string {
	return line.displayName.trim();
}

function productSpec(line: EstimatePdfLine): string {
	return `${line.widthIn}"W × ${line.depthIn}"D · ${line.colorLabel}`;
}

/**
 * Aggregate the timing + funding selections shown in the YOUR SELECTIONS card.
 * If every saved room has the same value (or only one value is set), show it
 * directly (e.g. "1–3 months"). If they differ, list them per-room so the
 * customer can still tell which room maps to which choice.
 */
function summarizeRoomMeta(
	savedRooms: PdfLayoutSavedRoom[],
	getter: (r: PdfLayoutSavedRoom) => string,
	labelFn: (code: string) => string,
): string {
	const labels = savedRooms.map((r, i) => ({
		room: r.roomName || `Room ${i + 1}`,
		label: labelFn(getter(r) || ''),
	}));
	const unique = new Set(labels.map((l) => l.label).filter(Boolean));
	if (unique.size === 0) return '—';
	if (unique.size === 1) return Array.from(unique)[0];
	return labels
		.filter((l) => l.label)
		.map((l) => `${l.room}: ${l.label}`)
		.join('\n');
}

/**
 * Render the per-room landscape 3D snapshot page. Matches the reference design
 * (`room-planner-layout.pdf`): centered PLAYERSTALL wordmark + tiny "YOUR LOCKER
 * ROOM LAYOUT" subtitle at the top, 3D snapshot filling the body, room name
 * caption centered below, single-line muted footer.
 */
async function drawRoomLayoutPage(
	pdf: jsPDF,
	room: PdfLayoutSavedRoom,
	displayUnit: DisplayUnit,
	brandFonts: boolean,
	setDisplay: () => void,
	setBody: () => void,
): Promise<void> {
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const margin = 40;
	const roomLabel = (room.roomName || 'Locker Room').trim();

	pdf.setFillColor(255, 255, 255);
	pdf.rect(0, 0, pageW, pageH, 'F');

	const yBody = drawLayoutPdfCenteredHeader(pdf, {
		wordmark: 'PLAYERSTALL',
		subtitle: 'YOUR LOCKER ROOM LAYOUT',
		topY: 48,
		wordmarkSize: 22,
		brandFonts,
	});

	const tempState = buildPlannerStateFromSavedRoom(room, displayUnit);
	let snapshotDataUrl: string | null = null;
	try {
		snapshotDataUrl = await capturePlanner3DDataURL(tempState, {
			width: SNAPSHOT_W,
			height: SNAPSHOT_H,
			customLogoDataUrl: room.customLogoDataUrl ?? undefined,
			pixelRatio: 2,
		});
	} catch (e) {
		console.warn('[pdfLayoutDoc] 3D snapshot capture failed:', e);
	}

	const roomNameY = pageH - 50;
	const footerSafeTop = roomNameY - 18;
	const imgTop = yBody + 8;
	const maxImgW = pageW - margin * 2;
	const maxImgH = footerSafeTop - imgTop;
	const aspect = SNAPSHOT_H / SNAPSHOT_W;
	let imgW = maxImgW;
	let imgH = imgW * aspect;
	if (imgH > maxImgH) {
		imgH = maxImgH;
		imgW = imgH / aspect;
	}
	const imgLeft = (pageW - imgW) / 2;

	if (snapshotDataUrl) {
		pdf.addImage(snapshotDataUrl, 'PNG', imgLeft, imgTop, imgW, imgH, undefined, 'NONE');
	} else {
		pdf.setDrawColor(...LINE_COLOR);
		pdf.setLineWidth(0.5);
		pdf.rect(imgLeft, imgTop, imgW, imgH);
		setBody();
		pdf.setFontSize(10);
		pdf.setTextColor(...MUTED);
		pdf.text(
			'3D snapshot unavailable for this room — open the room planner and try again, or reply to your email and we will send images.',
			pageW / 2,
			imgTop + imgH / 2,
			{ align: 'center', maxWidth: imgW - 40 },
		);
	}

	setDisplay();
	pdf.setFontSize(11);
	pdf.setTextColor(...TEXT);
	pdf.text(roomLabel.toUpperCase(), pageW / 2, roomNameY, {
		align: 'center',
		charSpace: 0.6,
	});

	drawLayoutPdfFooterLine(pdf, FOOTER_LINE, { brandFonts });
}

/**
 * Append the portrait summary page. Mirrors the reference reference design:
 * centered PLAYERSTALL wordmark, "REVIEW YOUR LAYOUT" headline, summary
 * subtitle, YOUR SELECTIONS card (delivery timing / funding / email), ORDER
 * SUMMARY rows, Subtotal + Estimated Total, italic disclaimer, footer.
 */
function drawSummaryPage(
	pdf: jsPDF,
	savedRooms: PdfLayoutSavedRoom[],
	summary: PdfLayoutSummaryData,
	brandFonts: boolean,
	setDisplay: () => void,
	setBold: () => void,
	setBody: () => void,
	setLabel: () => void,
): void {
	pdf.addPage('letter', 'portrait');
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const margin = 56;

	pdf.setFillColor(255, 255, 255);
	pdf.rect(0, 0, pageW, pageH, 'F');

	let y = drawLayoutPdfCenteredHeader(pdf, {
		wordmark: 'PLAYERSTALL',
		subtitle: '',
		topY: 56,
		wordmarkSize: 24,
		brandFonts,
	});
	y += 10;

	setDisplay();
	pdf.setFontSize(22);
	pdf.setTextColor(...TEXT);
	pdf.text('REVIEW YOUR LAYOUT', pageW / 2, y + 12, { align: 'center', charSpace: 0.4 });
	y += 32;

	setBody();
	pdf.setFontSize(10);
	pdf.setTextColor(...MUTED);
	pdf.text(
		'Here is a summary of your room planner selections.',
		pageW / 2,
		y,
		{ align: 'center' },
	);
	y += 28;

	const cardLeft = margin;
	const cardW = pageW - margin * 2;
	const cardPad = 18;

	const timingValue = summarizeRoomMeta(
		savedRooms,
		(r) => r.needByTimeline || '',
		needByTimelineLabel,
	);
	const fundingValue = summarizeRoomMeta(
		savedRooms,
		(r) => r.fundingStatus || '',
		fundingStatusLabel,
	);

	setBody();
	pdf.setFontSize(10);
	const timingLines = pdf.splitTextToSize(timingValue, cardW - cardPad * 2) as string[];
	const fundingLines = pdf.splitTextToSize(fundingValue, cardW - cardPad * 2) as string[];
	const emailLines = pdf.splitTextToSize(summary.customerEmail || '—', cardW - cardPad * 2) as string[];

	const titleH = 16;
	const ruleH = 10;
	const rowGap = 12;
	const labelH = 12;
	const valueLineH = 13;
	const rowH = (lines: string[]) => labelH + 4 + lines.length * valueLineH;

	const cardContentH =
		titleH +
		ruleH +
		rowH(timingLines) +
		rowGap +
		rowH(fundingLines) +
		rowGap +
		rowH(emailLines);
	const cardH = cardPad + cardContentH + cardPad;

	pdf.setFillColor(...PANEL_BG);
	pdf.setDrawColor(...LINE_COLOR);
	pdf.setLineWidth(0.5);
	pdf.rect(cardLeft, y, cardW, cardH, 'FD');

	let cy = y + cardPad;
	setDisplay();
	pdf.setFontSize(13);
	pdf.setTextColor(...TEXT);
	pdf.text('YOUR SELECTIONS', cardLeft + cardPad, cy + 11, { charSpace: 0.4 });
	cy += titleH;
	pdf.setDrawColor(...LINE_COLOR);
	pdf.setLineWidth(0.4);
	pdf.line(cardLeft + cardPad, cy, cardLeft + cardW - cardPad, cy);
	cy += ruleH - 2;

	const drawCardRow = (label: string, valueLines: string[]) => {
		setLabel();
		pdf.setFontSize(8);
		pdf.setTextColor(...STRONG_MUTED);
		pdf.text(label, cardLeft + cardPad, cy + 8, { charSpace: 0.5 });
		setBody();
		pdf.setFontSize(11);
		pdf.setTextColor(...TEXT);
		pdf.text(valueLines, cardLeft + cardPad, cy + 8 + labelH);
		cy += rowH(valueLines) + rowGap;
	};

	drawCardRow('PREFERRED DELIVERY TIMING', timingLines);
	drawCardRow('FUNDING / BUDGET', fundingLines);
	drawCardRow('EMAIL', emailLines);

	y += cardH + 24;

	setDisplay();
	pdf.setFontSize(13);
	pdf.setTextColor(...TEXT);
	pdf.text('ORDER SUMMARY', cardLeft, y, { charSpace: 0.4 });
	y += 14;

	pdf.setDrawColor(...LINE_COLOR);
	pdf.setLineWidth(0.5);
	pdf.line(cardLeft, y, cardLeft + cardW, y);
	y += 14;

	const colQtyW = 50;
	const colTotalW = 90;
	const colProductW = cardW - colQtyW - colTotalW;
	const colQtyCenter = cardLeft + colProductW + colQtyW / 2;
	const colTotalRight = cardLeft + cardW;

	setLabel();
	pdf.setFontSize(8);
	pdf.setTextColor(...STRONG_MUTED);
	pdf.text('PRODUCT', cardLeft, y, { charSpace: 0.5 });
	pdf.text('QTY', colQtyCenter, y, { align: 'center', charSpace: 0.5 });
	pdf.text('SUBTOTAL', colTotalRight, y, { align: 'right', charSpace: 0.5 });
	y += 8;
	pdf.line(cardLeft, y, cardLeft + cardW, y);
	y += 14;

	let subtotal = 0;
	let totalLockers = 0;
	let curRoom = '';
	const roomNames = new Set<string>();
	const bottomSafe = pageH - 110;

	const ensureSpace = (need: number) => {
		if (y + need > bottomSafe) {
			pdf.addPage('letter', 'portrait');
			y = margin;
		}
	};

	for (const line of summary.lines) {
		const room = line.roomName || 'Unnamed Room';
		roomNames.add(room);
		const lineTotal = line.unitPrice * line.qty;
		subtotal += lineTotal;
		totalLockers += line.qty;

		if (room !== curRoom) {
			curRoom = room;
			ensureSpace(22);
			setBold();
			pdf.setFontSize(10);
			pdf.setTextColor(...STRONG_MUTED);
			pdf.text(room.toUpperCase(), cardLeft, y, { charSpace: 0.5 });
			y += 14;
		}

		ensureSpace(34);
		setBold();
		pdf.setFontSize(11);
		pdf.setTextColor(...TEXT);
		pdf.text(productTitle(line), cardLeft, y, { maxWidth: colProductW - 4 });
		setBody();
		pdf.setFontSize(9);
		pdf.setTextColor(...MUTED);
		pdf.text(productSpec(line), cardLeft, y + 12, { maxWidth: colProductW - 4 });

		setBody();
		pdf.setFontSize(11);
		pdf.setTextColor(...TEXT);
		pdf.text(String(line.qty), colQtyCenter, y, { align: 'center' });
		pdf.text(money(lineTotal), colTotalRight, y, { align: 'right' });

		y += 28;
	}

	if (summary.lines.length === 0) {
		setBody();
		pdf.setFontSize(11);
		pdf.setTextColor(...MUTED);
		pdf.text('No lockers in this summary.', cardLeft, y);
		y += 18;
	}

	pdf.setDrawColor(...LINE_COLOR);
	pdf.setLineWidth(0.5);
	pdf.line(cardLeft, y, cardLeft + cardW, y);
	y += 16;

	setBody();
	pdf.setFontSize(10);
	pdf.setTextColor(...STRONG_MUTED);
	pdf.text('Subtotal', cardLeft, y);
	setBold();
	pdf.setFontSize(11);
	pdf.setTextColor(...TEXT);
	pdf.text(money(subtotal), colTotalRight, y, { align: 'right' });
	y += 18;

	pdf.setDrawColor(...LINE_COLOR);
	pdf.line(cardLeft, y, cardLeft + cardW, y);
	y += 16;

	setLabel();
	pdf.setFontSize(10);
	pdf.setTextColor(...STRONG_MUTED);
	pdf.text('ESTIMATED TOTAL', cardLeft, y, { charSpace: 0.5 });
	setDisplay();
	pdf.setFontSize(16);
	pdf.setTextColor(...TEXT);
	pdf.text(money(summary.grandTotal || subtotal), colTotalRight, y + 2, { align: 'right' });
	y += 22;

	if (totalLockers > 0) {
		setBody();
		pdf.setFontSize(9);
		pdf.setTextColor(...MUTED);
		const roomCount = roomNames.size || 1;
		pdf.text(
			`${totalLockers} locker${totalLockers !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`,
			cardLeft,
			y,
		);
		y += 18;
	}

	ensureSpace(40);
	setBody();
	pdf.setFontSize(8);
	pdf.setTextColor(...MUTED);
	const disclaimer =
		'This layout is an estimate. Final pricing may vary based on customization and installation requirements.';
	const disclaimerLines = pdf.splitTextToSize(disclaimer, cardW) as string[];
	pdf.text(disclaimerLines, cardLeft, y);

	drawLayoutPdfFooterLine(pdf, FOOTER_LINE, { brandFonts });
}

/**
 * Generate the downloadable layout PDF.
 *
 * Layout (matches `room-planner-layout.pdf` reference from the abandoned
 * `feature/email-pdf-redesign` branch):
 * - 1 landscape page per saved room — centered PLAYERSTALL wordmark, 3D
 *   snapshot, room name caption, footer line.
 * - 1 portrait summary page at the end with the YOUR SELECTIONS card and the
 *   ORDER SUMMARY (only when `summary` is provided).
 *
 * The `summary` argument is optional so the existing `captureFirstRoom3DEmail
 * PreviewDataUrl()` flow and any callers that only want the layout pages keep
 * working — but production callers (room-planner.astro) should always pass it
 * so the downloaded PDF matches the reference design.
 */
export async function generateLayoutPdfBlob(
	savedRooms: PdfLayoutSavedRoom[],
	displayUnit: DisplayUnit,
	summary?: PdfLayoutSummaryData,
): Promise<Blob | null> {
	try {
		/*
		 * Preload Oswald + Yantramanav so the PDF matches the live site
		 * typography. If the fetch fails jsPDF falls back to Helvetica and the
		 * PDF still completes — better than blocking the "send plan" flow on a
		 * font asset error.
		 */
		let brandFontsReady = false;
		try {
			await ensureBrandFontsLoaded();
			brandFontsReady = true;
		} catch (err) {
			console.warn('[pdfLayoutDoc] brand fonts unavailable, falling back to Helvetica:', err);
		}

		const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
		if (brandFontsReady) registerBrandFonts(pdf);

		pdf.setProperties({
			title: 'PlayerStall — Your locker room layout',
			subject: 'Layout PDF generated by the playerstall.com room planner',
			author: 'PlayerStall',
			keywords: 'playerstall.com; room-planner; layout-pdf-v5-3d-snapshot',
			creator: 'PlayerStall Room Planner',
		});

		const setDisplay = () =>
			brandFontsReady ? setBrandFont(pdf, BRAND_FONT.display) : pdf.setFont('helvetica', 'bold');
		const setBold = () =>
			brandFontsReady ? setBrandFont(pdf, BRAND_FONT.bold) : pdf.setFont('helvetica', 'bold');
		const setBody = () =>
			brandFontsReady ? setBrandFont(pdf, BRAND_FONT.body) : pdf.setFont('helvetica', 'normal');
		const setLabel = () =>
			brandFontsReady ? setBrandFont(pdf, BRAND_FONT.label) : pdf.setFont('helvetica', 'bold');

		for (let ri = 0; ri < savedRooms.length; ri++) {
			if (ri > 0) pdf.addPage('letter', 'landscape');
			await drawRoomLayoutPage(pdf, savedRooms[ri], displayUnit, brandFontsReady, setDisplay, setBody);
		}

		if (summary) {
			drawSummaryPage(
				pdf,
				savedRooms,
				summary,
				brandFontsReady,
				setDisplay,
				setBold,
				setBody,
				setLabel,
			);
		}

		return pdf.output('blob');
	} catch (e) {
		console.error('generateLayoutPdfBlob failed:', e);
		return null;
	}
}
