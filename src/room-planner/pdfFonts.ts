/**
 * PlayerStall brand fonts for jsPDF attachments.
 *
 * jsPDF only ships the 14 built-in PostScript fonts (Helvetica / Times /
 * Courier), so the estimate + layout PDFs used to render in Helvetica —
 * noticeably different from the live site and the MailerSend HTML, which use
 * Oswald (display) + Yantramanav (body). This module fetches the TTF files
 * from `/public/fonts-pdf/` on first use, base64-encodes them, caches the
 * result, and exposes `registerBrandFonts(pdf)` so every PDF instance renders
 * with the same type stack as the site.
 *
 *   Font family aliases exposed to jsPDF:
 *     • 'Oswald'      (bold)   — Oswald 600 SemiBold (display / wordmark)
 *     • 'Yantramanav' (normal) — Yantramanav 400 Regular (body, values)
 *     • 'Yantramanav' (bold)   — Yantramanav 700 Bold (subheads, totals)
 *     • 'Yantramanav' (italic) — alias to Medium 500 (small caps / labels)
 *
 * Call `await ensureBrandFontsLoaded()` before constructing the jsPDF doc (or
 * let the generator do it) and then `registerBrandFonts(pdf)` to attach the
 * fonts to that specific doc. Subsequent calls are free (cached base64 +
 * per-doc registration only).
 */

import type { jsPDF } from 'jspdf';

const FONT_BASE_PATH = '/fonts-pdf';

interface BrandFontFile {
	alias: 'Oswald' | 'Yantramanav';
	style: 'normal' | 'bold' | 'italic';
	file: string;
}

/*
 * Map jsPDF (family, style) → TTF asset. Yantramanav "italic" is an alias for
 * the Medium weight so small-caps labels (e.g. uppercase section titles) have
 * a noticeably heavier stroke than 400 without jumping to 700.
 */
const BRAND_FONT_FILES: BrandFontFile[] = [
	{ alias: 'Oswald', style: 'bold', file: 'Oswald-SemiBold.ttf' },
	{ alias: 'Yantramanav', style: 'normal', file: 'Yantramanav-Regular.ttf' },
	{ alias: 'Yantramanav', style: 'bold', file: 'Yantramanav-Bold.ttf' },
	{ alias: 'Yantramanav', style: 'italic', file: 'Yantramanav-Medium.ttf' },
];

interface CachedBrandFont extends BrandFontFile {
	base64: string;
}

let cache: CachedBrandFont[] | null = null;
let inFlight: Promise<CachedBrandFont[]> | null = null;

function arrayBufferToBase64(buf: ArrayBuffer): string {
	const bytes = new Uint8Array(buf);
	const CHUNK = 0x8000;
	let binary = '';
	for (let i = 0; i < bytes.length; i += CHUNK) {
		binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CHUNK)));
	}
	return btoa(binary);
}

async function fetchFontAsBase64(fileName: string): Promise<string> {
	const res = await fetch(`${FONT_BASE_PATH}/${fileName}`, { cache: 'force-cache' });
	if (!res.ok) throw new Error(`font fetch failed: ${fileName} (${res.status})`);
	const buf = await res.arrayBuffer();
	return arrayBufferToBase64(buf);
}

/** Fetch + base64-encode every brand font exactly once per page load. */
export async function ensureBrandFontsLoaded(): Promise<CachedBrandFont[]> {
	if (cache) return cache;
	if (inFlight) return inFlight;
	inFlight = Promise.all(
		BRAND_FONT_FILES.map(async (entry) => ({
			...entry,
			base64: await fetchFontAsBase64(entry.file),
		})),
	)
		.then((loaded) => {
			cache = loaded;
			inFlight = null;
			console.info(
				'[pdfFonts] brand fonts loaded:',
				loaded.map((f) => `${f.alias}/${f.style} (${f.file}, ${Math.round(f.base64.length / 1024)}KB b64)`).join(', '),
			);
			return loaded;
		})
		.catch((err) => {
			inFlight = null;
			throw err;
		});
	return inFlight;
}

/**
 * Register brand fonts with a specific jsPDF document. Must be called after
 * `ensureBrandFontsLoaded()`; `generateEstimatePdfBlob` / `generateLayoutPdfBlob`
 * handle the await + registration for you.
 *
 * Returns true on success, false if the cache is empty (caller should fall
 * back to Helvetica so PDF generation still completes).
 */
export function registerBrandFonts(pdf: jsPDF): boolean {
	if (!cache) return false;
	for (const f of cache) {
		pdf.addFileToVFS(f.file, f.base64);
		pdf.addFont(f.file, f.alias, f.style);
	}
	/*
	 * Sanity check so we know at-a-glance in devtools whether jsPDF actually
	 * accepted the TTFs. Variable fonts + signed-but-malformed DSIG entries
	 * are silently dropped by jsPDF (it falls back to Helvetica) — this log
	 * lets us confirm 'Oswald' / 'Yantramanav' are in the font list before we
	 * start drawing.
	 */
	try {
		const list = (pdf as unknown as { getFontList?: () => Record<string, string[]> }).getFontList?.();
		if (list && typeof console !== 'undefined') {
			/*
			 * Stringify so devtools + remote inspection pipelines don't flatten
			 * the object to "[object Object]". The summary is intentionally
			 * short (alias → registered styles) so it's easy to eyeball.
			 */
			console.info(
				'[pdfFonts] jsPDF font list after register:',
				JSON.stringify({
					Oswald: list.Oswald ?? 'MISSING',
					Yantramanav: list.Yantramanav ?? 'MISSING',
				}),
			);
		}
	} catch {
		/* getFontList is a debug helper — missing in some jsPDF builds */
	}
	return true;
}

/**
 * Style catalogue: call sites use these constants instead of raw
 * `setFont('helvetica', …)` so the whole PDF surface shares one brand-font
 * vocabulary (and a single place to tweak weights / aliases).
 */
export const BRAND_FONT = {
	/** Big display wordmark + section hero. Oswald 600. */
	display: { family: 'Oswald', style: 'bold' } as const,
	/** Subheads + table headers + totals. Yantramanav 700. */
	bold: { family: 'Yantramanav', style: 'bold' } as const,
	/** Default body copy, values, footer. Yantramanav 400. */
	body: { family: 'Yantramanav', style: 'normal' } as const,
	/** Small muted caps labels ("PREFERRED DELIVERY TIMING"). Yantramanav 500. */
	label: { family: 'Yantramanav', style: 'italic' } as const,
};

/** Convenience: set a BRAND_FONT preset on the given document in one call. */
export function setBrandFont(pdf: jsPDF, preset: { family: string; style: string }): void {
	pdf.setFont(preset.family, preset.style);
}
