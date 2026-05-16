/**
 * Disable jsPDF's synchronous `loadFile` fallback.
 *
 * jsPDF bundles a `loadFile` helper (src/modules/fileloading.js) that issues a
 * **synchronous** XMLHttpRequest when `addImage` / `getImageProperties` /
 * `addFont` are handed something other than a base64 data URL or a VFS-stored
 * file. Chrome emits "Synchronous XMLHttpRequest on the main thread is
 * deprecated" any time that XHR opens, and Safari may eventually refuse to
 * execute it at all.
 *
 * Every PDF surface in this repo feeds jsPDF either a `canvas.toDataURL(...)`
 * blob, a `FileReader.readAsDataURL` result, or a VFS-registered TTF — so the
 * sync fetch fallback is never actually needed for our flows. Replacing
 * `loadFile` with a no-op silences the deprecation warning without changing
 * any rendering behaviour: if jsPDF ever did need to load a remote asset it
 * would now fail fast (returning `undefined`), matching the current
 * try/catch-guarded call sites in pdfBranding/pdfEstimate/pdfLayoutDoc.
 */

import { jsPDF } from 'jspdf';

let patched = false;

export function disableJsPdfSyncXhr(): void {
	if (patched) return;
	const api = (jsPDF as unknown as { API: Record<string, unknown> }).API;
	const noop = function () {
		return undefined;
	};
	api.loadFile = noop;
	api.loadImageFile = noop;
	patched = true;
}

disableJsPdfSyncXhr();
