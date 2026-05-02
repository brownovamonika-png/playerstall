/**
 * HTML bodies for MailerSend room-plan emails.
 *
 * Visual target (customer + team): the same centered hero the customer sees
 * in the submitted layout — big `PLAYERSTALL` wordmark, centered sub-headline
 * (Review your layout / New room planner submission), intro paragraph, then
 * stacked panels: YOUR SELECTIONS (timing + funding), CUSTOMER strip (team
 * only), and ORDER SUMMARY (Product / Qty / Subtotal with Subtotal +
 * Estimated Total, locker count, shipping note, and either the customer's
 * inline Your email row or the team's Customer mailto).
 *
 * Preview: /dev/email-preview-room-plan (npm run dev only).
 * POST handler: /api/send-room-plan (Astro server route).
 * Copy: src/lib/roomPlanCustomerCopy.ts.
 */

import {
	ROOM_PLAN_ATTACHMENT_FILES_DESC,
	ROOM_PLAN_ATTACHMENTS_NOTE,
	ROOM_PLAN_CTA_LABEL,
	ROOM_PLAN_CTA_URL,
	ROOM_PLAN_CUSTOMER_HEADLINE,
	ROOM_PLAN_FOOTER_LINES,
	ROOM_PLAN_EMAIL_3D_PREVIEW_ALT,
	ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB,
	ROOM_PLAN_EMAIL_3D_PREVIEW_TITLE,
	ROOM_PLAN_INTRO,
	ROOM_PLAN_SELECTIONS_FUNDING_LABEL,
	ROOM_PLAN_SELECTIONS_HEADING,
	ROOM_PLAN_SELECTIONS_TIMING_LABEL,
	ROOM_PLAN_SHIPPING_LINES,
	ROOM_PLAN_TEAM_CUSTOMER_HEADING,
	ROOM_PLAN_TEAM_HEADLINE,
	ROOM_PLAN_TEAM_INTRO,
	ROOM_PLAN_TEAM_NOTE,
	ROOM_PLAN_WHAT_NEXT_HEADING,
	ROOM_PLAN_WHAT_NEXT_STEPS,
} from './roomPlanCustomerCopy';
import { extractPlannerMetaFromOrderSummary, parsePlannerProductLine } from './roomPlanOrderSummaryParse';

/*
 * PlayerStall brand typography — mirror the live site (playerstall.com):
 *   • Oswald (600/700) for display / wordmark / section headings.
 *   • Yantramanav (400/500) for body copy, labels, numbers.
 * Both are loaded from Google Fonts with graceful Arial / sans-serif fallbacks
 * so Gmail / Outlook / Apple Mail render something close to the site even when
 * the web fonts are blocked. The PDF attachment embeds the same TTFs (see
 * src/room-planner/pdfFonts.ts) so email + PDF share one typographic voice.
 */
const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Yantramanav:wght@400;500;700&display=swap" rel="stylesheet">`;

const FF_BODY = `'Yantramanav', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
const FF_HEAD = `'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif`;

const C_RULE = '#e0e0e0';
const C_RULE_STRONG = '#cccccc';
const C_TEXT = '#0d0d0d';
const C_MUTED = '#8c8c8c';
const C_PAGE = '#ffffff';
const C_PANEL = '#f7f7f7';
const C_FOOT = '#b6b6b6';

/** Invisible to users in most clients; use "Show original" / raw HTML to confirm the live API sent this build. */
export const ROOM_PLAN_EMAIL_HTML_MARKER = '<!-- playerstall-room-plan:v5-brand-fonts -->';

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** Format a planner-supplied total ("5908.00" or "5,908.00") consistently with comma separators. */
function formatTotal(raw: string): string {
	const cleaned = String(raw || '').replace(/[^0-9.]/g, '');
	const n = Number(cleaned);
	if (!isFinite(n)) return escapeHtml(String(raw || ''));
	return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Only allow our client-generated PNG data URLs in email HTML (no escaping of payload). */
function isSafeLayoutPreviewDataUrl(url: string | undefined | null): url is string {
	return (
		typeof url === 'string' &&
		url.startsWith('data:image/png;base64,') &&
		url.length > 28 &&
		url.length < 1_400_000
	);
}

function layoutPreviewBlock(layoutPreviewDataUrl: string | undefined | null): string {
	if (!isSafeLayoutPreviewDataUrl(layoutPreviewDataUrl)) return '';
	return `
  <tr><td style="padding:8px 8px 24px;text-align:center;">
    <p style="margin:0 0 8px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;">${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_TITLE)}</p>
    <p style="margin:0 auto 14px;max-width:520px;font-family:${FF_BODY};font-size:12px;line-height:1.55;color:${C_MUTED};text-align:center;">${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB)}</p>
    <img src="${layoutPreviewDataUrl}" alt="${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_ALT)}" width="560" style="max-width:100%;height:auto;display:block;margin:0 auto;border:1px solid ${C_RULE};" />
  </td></tr>`;
}

/**
 * Split a parsed specLine into the base dimensions+color and individual
 * accessory items (each with optional price). Handles formats like:
 *   `24"W x 19"D · Marigold · Shelf ($45.00), Hook ($24.00)`
 */
function splitSpecAccessories(specLine: string): { basePart: string; accParts: string[] } {
	const parts = specLine.split(' · ');
	if (parts.length <= 2) return { basePart: specLine, accParts: [] };
	const basePart = parts.slice(0, 2).join(' · ');
	const accRaw = parts.slice(2).join(' · ');
	const accParts = accRaw.split(/,\s*/).map((s) => s.trim()).filter(Boolean);
	return { basePart, accParts };
}

/** Three-column review-style rows (Product | Qty | Subtotal) + counts. */
function buildReviewStyleTableRows(orderSummary: string): {
	rows: string;
	lockerCount: number;
	roomCount: number;
} {
	let lockerCount = 0;
	let roomCount = 0;
	const chunks: string[] = [];
	const lines = orderSummary
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !/^Estimated Total:/i.test(l));

	for (const line of lines) {
		const rm = line.match(/^---\s*(.+?)\s*---\s*$/);
		if (rm) {
			roomCount += 1;
			const roomU = rm[1].trim().toUpperCase();
			chunks.push(
				`<tr><td colspan="3" style="padding:16px 24px 6px;font-family:${FF_HEAD};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:${C_TEXT};border-bottom:1px solid ${C_RULE};">${escapeHtml(roomU)}</td></tr>`,
			);
			continue;
		}
		const p = parsePlannerProductLine(line);
		if (p) {
			lockerCount += parseInt(p.qty, 10) || 0;
			const nameU = p.name.toUpperCase();
			const title = nameU.includes('LOCKER') ? nameU : `${nameU} LOCKER`;
			const { basePart, accParts } = splitSpecAccessories(p.specLine);
			const accHtml = accParts.length
				? accParts
						.map(
							(a) =>
								`<div style="margin-top:2px;font-family:${FF_BODY};font-size:10px;font-weight:400;color:${C_MUTED};letter-spacing:0.2px;line-height:1.35;padding-left:8px;">+ ${escapeHtml(a)}</div>`,
						)
						.join('')
				: '';
			chunks.push(`<tr>
  <td style="padding:14px 24px;border-bottom:1px solid ${C_RULE};vertical-align:top;">
    <div style="font-family:${FF_HEAD};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${C_TEXT};line-height:1.25;">${escapeHtml(title)}</div>
    <div style="margin-top:4px;font-family:${FF_BODY};font-size:11px;font-weight:400;color:${C_MUTED};letter-spacing:0.3px;line-height:1.45;">${escapeHtml(basePart)}</div>
    ${accHtml}
  </td>
  <td style="padding:14px 16px;border-bottom:1px solid ${C_RULE};text-align:center;vertical-align:top;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};width:48px;">${escapeHtml(p.qty)}</td>
  <td style="padding:14px 24px 14px 12px;border-bottom:1px solid ${C_RULE};text-align:right;vertical-align:top;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};white-space:nowrap;">$${escapeHtml(p.price)}</td>
</tr>`);
			continue;
		}
		chunks.push(
			`<tr><td colspan="3" style="padding:10px 24px;border-bottom:1px solid ${C_RULE};font-family:${FF_BODY};font-size:11px;color:#666666;line-height:1.5;">${escapeHtml(line)}</td></tr>`,
		);
	}

	const effectiveRooms =
		roomCount > 0 ? roomCount : lines.some((l) => parsePlannerProductLine(l)) ? 1 : 0;
	return { rows: chunks.join('\n'), lockerCount, roomCount: effectiveRooms };
}

type OrderSectionRole = 'customer' | 'team';

/**
 * Stacked label + value row inside the YOUR SELECTIONS panel — label on top
 * (uppercase muted), value below (dark body text, as-is e.g. "Monika: 1–3
 * months"). Matches the PDF's YOUR SELECTIONS treatment so the two renders
 * read identically.
 */
function buildSelectionRow(label: string, values: readonly string[]): string {
	const valueHtml = values
		.map(
			(v, i) =>
				`<p style="margin:${i === 0 ? '0' : '4px 0 0'};font-family:${FF_BODY};font-size:14px;line-height:1.5;color:${C_TEXT};">${escapeHtml(v)}</p>`,
		)
		.join('');
	return `<tr><td style="padding:14px 24px 18px;border-top:1px solid ${C_RULE};">
    <p style="margin:0 0 6px;font-family:${FF_HEAD};font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${C_MUTED};line-height:1.4;">${escapeHtml(label)}</p>
    ${valueHtml}
  </td></tr>`;
}

function buildSelectionsCard(timing: string[], funding: string[]): string {
	if (!timing.length && !funding.length) return '';
	const rows: string[] = [];
	if (timing.length) rows.push(buildSelectionRow(ROOM_PLAN_SELECTIONS_TIMING_LABEL, timing));
	if (funding.length) rows.push(buildSelectionRow(ROOM_PLAN_SELECTIONS_FUNDING_LABEL, funding));
	return `
  <tr><td style="padding:8px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      <tr><td style="padding:22px 24px 10px;">
        <h3 style="margin:0;font-family:${FF_HEAD};font-size:18px;font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.2;">${escapeHtml(ROOM_PLAN_SELECTIONS_HEADING)}</h3>
      </td></tr>
      ${rows.join('\n')}
    </table>
  </td></tr>`;
}

function buildCustomerStripCard(customerEmail: string): string {
	return `
  <tr><td style="padding:14px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      <tr><td style="padding:16px 24px;">
        <p style="margin:0 0 4px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.3px;">${escapeHtml(ROOM_PLAN_TEAM_CUSTOMER_HEADING)}</p>
        <p style="margin:0;font-family:${FF_BODY};font-size:14px;line-height:1.5;color:${C_TEXT};"><a href="mailto:${escapeHtml(customerEmail)}" style="color:${C_TEXT};text-decoration:underline;">${escapeHtml(customerEmail)}</a></p>
      </td></tr>
    </table>
  </td></tr>`;
}

/**
 * Full `ORDER SUMMARY` card — mirrors the planner review panel.
 * For customer role: ends with "Your email" row + black LAYOUT SENT bar +
 * thank-you line. For team role: ends with locker count + shipping (the
 * customer mailto lives in the Customer strip above this card).
 */
function buildReviewOrderSection(
	role: OrderSectionRole,
	customerEmail: string,
	grandTotal: string,
	rows: string,
	lockerCount: number,
	roomCount: number,
): string {
	const totalStr = formatTotal(grandTotal);
	const lockerLine =
		lockerCount > 0
			? `${lockerCount} locker${lockerCount !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`
			: 'No lockers in this summary.';

	const shippingRows = ROOM_PLAN_SHIPPING_LINES.map(
		(line, i) =>
			`<p style="margin:${i === 0 ? '0 0 6px' : '0'};font-family:${FF_BODY};font-size:12px;color:${C_MUTED};line-height:1.55;">${escapeHtml(line)}</p>`,
	).join('');

	const emailRow =
		role === 'customer'
			? `
  <tr><td style="padding:18px 24px 0;">
    <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.2px;">Your email</p>
    <div style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid ${C_RULE};background:#ffffff;font-family:${FF_BODY};font-size:14px;color:${C_TEXT};">${escapeHtml(customerEmail)}</div>
  </td></tr>
  <tr><td style="padding:16px 24px 0;">
    <div style="display:block;padding:16px 24px;background:${C_TEXT};color:#ffffff;text-align:center;font-family:${FF_HEAD};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;border:1px solid ${C_TEXT};">Layout sent</div>
  </td></tr>
  <tr><td style="padding:14px 24px 24px;">
    <p style="margin:0;font-family:${FF_BODY};font-size:12px;line-height:1.6;color:${C_MUTED};text-align:center;">Thank you! We emailed two PDFs to ${escapeHtml(customerEmail)}: your project estimate and your layout (floor plans + 3D). Our team received copies too.</p>
  </td></tr>`
			: `
  <tr><td style="padding:14px 24px 24px;">
    <p style="margin:0;font-family:${FF_BODY};font-size:12px;line-height:1.6;color:${C_MUTED};">The customer received the same two PDFs (project estimate and layout with floor plans + 3D). Reply directly to this email to reach them.</p>
  </td></tr>`;

	return `
  <tr><td style="padding:14px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      <tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <h2 style="margin:0;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.2;">Order Summary</h2>
      </td></tr>
      <tr><td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th style="padding:12px 24px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;text-align:left;border-bottom:1px solid ${C_RULE};">Product</th>
              <th style="padding:12px 16px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;text-align:center;width:48px;border-bottom:1px solid ${C_RULE};">Qty</th>
              <th style="padding:12px 24px 12px 12px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;text-align:right;border-bottom:1px solid ${C_RULE};">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${rows ||
				`<tr><td colspan="3" style="padding:30px 24px;text-align:center;font-family:${FF_BODY};font-size:12px;color:${C_FOOT};">No items submitted.</td></tr>`}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2" style="padding:14px 24px;font-family:${FF_HEAD};font-size:12px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;text-align:left;border:none;">Subtotal</th>
              <td style="padding:14px 24px 14px 12px;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};text-align:right;border:none;white-space:nowrap;">$${escapeHtml(totalStr)}</td>
            </tr>
            <tr>
              <th colspan="2" style="padding:14px 24px;font-family:${FF_HEAD};font-size:12px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;text-align:left;border-top:1px solid ${C_RULE_STRONG};">Estimated Total</th>
              <td style="padding:14px 24px 14px 12px;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};text-align:right;border-top:1px solid ${C_RULE_STRONG};white-space:nowrap;">$${escapeHtml(totalStr)}</td>
            </tr>
          </tfoot>
        </table>
      </td></tr>
      <tr><td style="padding:10px 24px 4px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.5px;">${escapeHtml(lockerLine)}</td></tr>
      <tr><td style="padding:0 24px 12px;">${shippingRows}</td></tr>
      ${emailRow}
    </table>
  </td></tr>`;
}

/** Big centered PLAYERSTALL wordmark + centered bold sub-headline + centered intro paragraph. */
function buildHeroBlock(headline: string, intro: string): string {
	return `
  <tr><td style="padding:8px 8px 0;text-align:center;">
    <p style="margin:0 0 36px;font-family:${FF_HEAD};font-size:clamp(34px,5vw,48px);font-weight:700;color:${C_TEXT};letter-spacing:0.08em;text-transform:uppercase;line-height:1;">PLAYERSTALL</p>
    <h1 style="margin:0;font-family:${FF_HEAD};font-size:clamp(16px,2.2vw,18px);font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:3px;line-height:1.2;">${escapeHtml(headline)}</h1>
    <p style="margin:18px auto 28px;max-width:560px;font-family:${FF_BODY};font-size:14px;line-height:1.65;color:${C_MUTED};text-align:center;">
      ${escapeHtml(intro)}
    </p>
  </td></tr>`;
}

function buildWhatNextBlock(): string {
	return `
  <tr><td style="padding:24px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${FF_HEAD};font-size:16px;font-weight:700;color:#2a2a2a;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(ROOM_PLAN_WHAT_NEXT_HEADING)}</p>
        <ol style="margin:0;padding-left:20px;font-family:${FF_BODY};font-size:14px;line-height:1.7;color:#555555;">
          ${ROOM_PLAN_WHAT_NEXT_STEPS.map(
				(step, i) =>
					`<li style="margin-bottom:${i < ROOM_PLAN_WHAT_NEXT_STEPS.length - 1 ? '6px' : '0'};">${escapeHtml(step)}</li>`,
			).join('')}
        </ol>
      </td></tr>
    </table>
  </td></tr>`;
}

function buildAttachmentsBlock(role: OrderSectionRole): string {
	const note = role === 'team' ? ROOM_PLAN_TEAM_NOTE : ROOM_PLAN_ATTACHMENTS_NOTE;
	return `
  <tr><td style="padding:20px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:13px;line-height:1.65;color:#555555;letter-spacing:0.02em;">📎 <strong>Attachments:</strong> <em>${escapeHtml(ROOM_PLAN_ATTACHMENT_FILES_DESC)}</em></p>
        <p style="margin:0;font-family:${FF_BODY};font-size:12px;color:#777777;">${escapeHtml(note)}</p>
      </td></tr>
    </table>
  </td></tr>`;
}

function buildCtaBlock(): string {
	return `
  <tr><td style="padding:24px 8px 0;text-align:center;">
    <a href="${escapeHtml(ROOM_PLAN_CTA_URL)}" style="display:block;padding:16px 24px;background:#ffffff;color:${C_TEXT};text-decoration:none;font-family:${FF_HEAD};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:2px;border:1px solid ${C_TEXT};">${escapeHtml(ROOM_PLAN_CTA_LABEL)}</a>
  </td></tr>`;
}

function buildFooterBlock(): string {
	const footerLine2Parts = ROOM_PLAN_FOOTER_LINES[1].split(' · ');
	return `
  <tr><td style="padding:32px 8px 0;border-top:1px solid ${C_RULE};margin-top:8px;">
    <p style="margin:0;font-family:${FF_BODY};font-size:12px;color:${C_FOOT};line-height:1.6;text-align:center;">
      ${escapeHtml(ROOM_PLAN_FOOTER_LINES[0])}<br />
      ${escapeHtml(footerLine2Parts[0] || '')} · <a href="mailto:${escapeHtml(footerLine2Parts[1] || '')}" style="color:${C_MUTED};">${escapeHtml(footerLine2Parts[1] || '')}</a> · ${escapeHtml(footerLine2Parts[2] || '')}
    </p>
  </td></tr>`;
}

function buildEmailShell(
	headline: string,
	intro: string,
	role: OrderSectionRole,
	email: string,
	orderSummary: string,
	grandTotal: string,
	layoutPreviewDataUrl?: string | null,
): string {
	const { timingLines, fundingLines, rest } = extractPlannerMetaFromOrderSummary(orderSummary);
	const { rows, lockerCount, roomCount } = buildReviewStyleTableRows(rest);
	const previewRow = layoutPreviewBlock(layoutPreviewDataUrl);
	const selectionsCard = buildSelectionsCard(timingLines, fundingLines);
	const customerStrip = role === 'team' ? buildCustomerStripCard(email) : '';
	const orderSection = buildReviewOrderSection(role, email, grandTotal, rows, lockerCount, roomCount);

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${FONT_LINK}
</head>
<body style="margin:0;padding:0;background:${C_PAGE};font-family:${FF_BODY};color:${C_TEXT};">
${ROOM_PLAN_EMAIL_HTML_MARKER}
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C_PAGE};padding:48px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;border-collapse:collapse;">

${buildHeroBlock(headline, intro)}
${previewRow}
${selectionsCard}
${customerStrip}
${orderSection}
${buildWhatNextBlock()}
${buildAttachmentsBlock(role)}
${buildCtaBlock()}
${buildFooterBlock()}

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildCustomerHTML(
	email: string,
	orderSummary: string,
	grandTotal: string,
	layoutPreviewDataUrl?: string | null,
): string {
	return buildEmailShell(
		ROOM_PLAN_CUSTOMER_HEADLINE,
		ROOM_PLAN_INTRO,
		'customer',
		email,
		orderSummary,
		grandTotal,
		layoutPreviewDataUrl,
	);
}

export function buildSalesHTML(
	email: string,
	orderSummary: string,
	grandTotal: string,
	layoutPreviewDataUrl?: string | null,
): string {
	return buildEmailShell(
		ROOM_PLAN_TEAM_HEADLINE,
		ROOM_PLAN_TEAM_INTRO,
		'team',
		email,
		orderSummary,
		grandTotal,
		layoutPreviewDataUrl,
	);
}

/** Matches real planner payload so preview shows meta + review-style table */
export const SAMPLE_ORDER_SUMMARY = [
	'Preferred delivery timing:',
	'DEAN: 1–3 months',
	'Funding / budget:',
	'DEAN: Have funds',
	'--- DEAN ---',
	'7x Model S (24"W x 19"D, Marigold) - $5908.00',
	'Estimated Total: $5,908.00',
].join('\n');
