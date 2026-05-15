import type { jsPDF } from 'jspdf';
import { BRAND_FONT, setBrandFont } from './pdfFonts';

const ORANGE: [number, number, number] = [254, 89, 0];
const BLACK: [number, number, number] = [0, 0, 0];
const TEXT: [number, number, number] = [13, 13, 13];
const MUTED: [number, number, number] = [140, 140, 140];
const FOOT_GRAY: [number, number, number] = [182, 182, 182];

/*
 * Typography helpers: every PDF text call routes through these so Oswald +
 * Yantramanav are used when registerBrandFonts() has already attached them to
 * the doc, and Helvetica fallbacks take over otherwise (rare — only when the
 * /fonts-pdf asset fetch fails). Pass { brandFonts: false } to force Helvetica
 * (e.g. during tests or when intentionally matching a legacy PDF).
 */
export interface BrandFontAware {
	brandFonts?: boolean;
}

function fontDisplay(pdf: jsPDF, useBrand: boolean): void {
	if (useBrand) setBrandFont(pdf, BRAND_FONT.display);
	else pdf.setFont('helvetica', 'bold');
}

function fontBold(pdf: jsPDF, useBrand: boolean): void {
	if (useBrand) setBrandFont(pdf, BRAND_FONT.bold);
	else pdf.setFont('helvetica', 'bold');
}

function fontBody(pdf: jsPDF, useBrand: boolean): void {
	if (useBrand) setBrandFont(pdf, BRAND_FONT.body);
	else pdf.setFont('helvetica', 'normal');
}

/** Black bar + orange accent strip. Returns Y for first line of page body. */
export function drawPlayerStallPdfHeader(pdf: jsPDF, options?: { pageNum?: number } & BrandFontAware): number {
	const pageW = pdf.internal.pageSize.getWidth();
	const margin = 48;
	const useBrand = options?.brandFonts !== false;
	pdf.setFillColor(...BLACK);
	pdf.rect(0, 0, pageW, 52, 'F');
	pdf.setFillColor(...ORANGE);
	pdf.rect(0, 52, pageW, 3, 'F');
	pdf.setTextColor(255, 255, 255);
	pdf.setFontSize(18);
	fontDisplay(pdf, useBrand);
	pdf.text('PLAYERSTALL', margin, 32);
	pdf.setFontSize(9);
	pdf.setTextColor(254, 89, 0);
	fontBold(pdf, useBrand);
	pdf.text('CUSTOM SPORTS LOCKERS', margin + 118, 32);
	if (options?.pageNum != null) {
		pdf.setTextColor(200, 200, 200);
		fontBody(pdf, useBrand);
		pdf.setFontSize(8);
		pdf.text(`Page ${options.pageNum}`, pageW - margin, 32, { align: 'right' });
	}
	pdf.setTextColor(0, 0, 0);
	fontBody(pdf, useBrand);
	return 72;
}

const LOGO_URL =
	'https://playerstall.b-cdn.net/images/logos/logo-playerstall-oswald-black.png';

/**
 * Pre-fetches the PlayerStall logo as a PNG data URL so it can be embedded in
 * jsPDF documents via `pdf.addImage()`. Returns `null` if the fetch fails —
 * callers should fall back to the text wordmark in that case.
 *
 * Uses an off-screen canvas so the image can be serialised in a browser
 * context (jsPDF requires a data URL, HTMLImageElement, or HTMLCanvasElement).
 */
export async function fetchBrandLogoDataUrl(): Promise<string | null> {
	try {
		return await new Promise<string | null>((resolve) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => {
				try {
					const c = document.createElement('canvas');
					c.width = img.naturalWidth || 440;
					c.height = img.naturalHeight || 80;
					c.getContext('2d')!.drawImage(img, 0, 0);
					resolve(c.toDataURL('image/png'));
				} catch {
					resolve(null);
				}
			};
			img.onerror = () => resolve(null);
			img.src = LOGO_URL;
		});
	} catch {
		return null;
	}
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
	/**
	 * PNG data URL of the PlayerStall logo (from `fetchBrandLogoDataUrl()`).
	 * When provided, replaces the text wordmark with the actual logo image.
	 * Falls back to text when null / undefined.
	 */
	logoDataUrl?: string | null;
} & BrandFontAware;

function stackWidth(pageW: number, margin: number, o: RoomPlanEmailStyleHeroOptions): number {
	const cap = o.stackMaxWidth ?? pageW - margin * 2;
	return Math.max(200, Math.min(cap, pageW - margin * 2));
}

export function drawRoomPlanEmailStylePdfHero(pdf: jsPDF, o: RoomPlanEmailStyleHeroOptions = {}): number {
	const pageW = pdf.internal.pageSize.getWidth();
	const margin = 48;
	const useBrand = o.brandFonts !== false;
	const sw = stackWidth(pageW, margin, o);
	const sx = (pageW - sw) / 2;
	const introW = o.introMaxWidth ?? Math.min(520, sw);
	const ix = (pageW - introW) / 2;
	let y = 36;

	if (o.pageLabel) {
		pdf.setFontSize(8);
		fontBody(pdf, useBrand);
		pdf.setTextColor(...MUTED);
		pdf.text(o.pageLabel, pageW - margin, y, { align: 'right' });
	}

	/*
	 * PLAYERSTALL wordmark — prefer the real logo PNG when a data URL is
	 * supplied (fetchBrandLogoDataUrl), else fall back to the Oswald text
	 * treatment so the PDF always has something recognisable.
	 */
	if (o.logoDataUrl) {
		// Target ~180pt wide × proportional height, centred on the page
		const logoW = 180;
		// Estimate aspect from the actual PNG (440×80 ≈ 5.5:1); fall back to that ratio
		let logoH = Math.round(logoW / 5.5);
		try {
			// jsPDF can read naturalWidth/Height from a data URL via getImageProperties
			const props = pdf.getImageProperties(o.logoDataUrl);
			if (props.width && props.height) {
				logoH = Math.round(logoW * (props.height / props.width));
			}
		} catch { /* use default ratio */ }
		const logoX = (pageW - logoW) / 2;
		pdf.addImage(o.logoDataUrl, 'PNG', logoX, y, logoW, logoH, undefined, 'NONE');
		y += logoH + 28;
	} else {
		/*
		 * Text fallback — Oswald 600 at 42pt mimics the site heading (1.6–1.8× tracking).
		 * charSpace 0.35 keeps total glyph width aligned with the HTML preview.
		 */
		fontDisplay(pdf, useBrand);
		pdf.setFontSize(42);
		pdf.setTextColor(...TEXT);
		pdf.text('PLAYERSTALL', pageW / 2, y + 30, { align: 'center', charSpace: 0.35 });
		y += 30 + 46;
	}

	if (o.headline) {
		pdf.setFontSize(14);
		fontDisplay(pdf, useBrand);
		pdf.setTextColor(...TEXT);
		const hl = pdf.splitTextToSize(o.headline, sw) as string[];
		pdf.text(hl, pageW / 2, y, { align: 'center' });
		y += hl.length * 17 + 10;
	}

	if (o.mutedCenter) {
		fontBody(pdf, useBrand);
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
		fontBody(pdf, useBrand);
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
	fontBody(pdf, useBrand);
	return y;
}

/** Two-line footer like customer room-plan email HTML. */
export function drawRoomPlanEmailStylePdfFooter(
	pdf: jsPDF,
	line1: string,
	line2: string,
	options?: BrandFontAware,
): void {
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const useBrand = options?.brandFonts !== false;
	fontBody(pdf, useBrand);
	pdf.setFontSize(8);
	pdf.setTextColor(...FOOT_GRAY);
	pdf.text(line1, pageW / 2, pageH - 28, { align: 'center' });
	pdf.text(line2, pageW / 2, pageH - 16, { align: 'center' });
	pdf.setTextColor(0, 0, 0);
}
