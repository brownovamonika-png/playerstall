/**
 * HTML bodies for MailerSend room-plan emails.
 * Customer email: white layout, compact totals, 3D snapshot — line-by-line order is in the estimate PDF only.
 * Team (sales) email: same compact panel as the customer email, plus customer mailto at the top of the card. Copy: roomPlanCustomerCopy.
 * Preview: /dev/email-preview-room-plan (npm run dev only). POST handler: /api/send-room-plan (Astro server route).
 */

import {
	ROOM_PLAN_ATTACHMENT_FILES_DESC,
	ROOM_PLAN_ATTACHMENTS_NOTE,
	ROOM_PLAN_EMAIL_COMPACT_PANEL_HEADING,
	ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE,
	ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE_TEAM,
	ROOM_PLAN_CTA_LABEL,
	ROOM_PLAN_CTA_URL,
	ROOM_PLAN_FOOTER_LINES,
	ROOM_PLAN_EMAIL_3D_PREVIEW_ALT,
	ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB,
	ROOM_PLAN_EMAIL_3D_PREVIEW_TITLE,
	ROOM_PLAN_INTRO,
	ROOM_PLAN_SHIPPING_LINES,
	ROOM_PLAN_TEAM_INTRO,
	ROOM_PLAN_TEAM_NOTE,
	ROOM_PLAN_WHAT_NEXT_HEADING,
	ROOM_PLAN_WHAT_NEXT_STEPS,
} from './roomPlanCustomerCopy';
import { extractPlannerMetaFromOrderSummary, parsePlannerProductLine } from './roomPlanOrderSummaryParse';

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Yantramanav:wght@400;500&display=swap" rel="stylesheet">`;

const FF_BODY = `'Yantramanav', 'Roboto', Arial, sans-serif`;
const FF_HEAD = `'Oswald', Arial, sans-serif`;

const C_RULE = '#e0e0e0';
const C_TEXT = '#0d0d0d';
const C_MUTED = '#8c8c8c';
const C_PAGE = '#ffffff';
const C_PANEL = '#f7f7f7';
const C_FOOT = '#b6b6b6';

/** Invisible to users in most clients; use “Show original” / raw HTML to confirm the live API sent this build. */
export const ROOM_PLAN_EMAIL_HTML_MARKER = '<!-- playerstall-room-plan:v2-html-compact -->';

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
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
  <tr><td style="padding:24px 8px 0;text-align:center;">
    <p style="margin:0 0 8px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;">${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_TITLE)}</p>
    <p style="margin:0 auto 14px;max-width:520px;font-family:${FF_BODY};font-size:12px;line-height:1.55;color:${C_MUTED};text-align:center;">${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB)}</p>
    <img src="${layoutPreviewDataUrl}" alt="${escapeHtml(ROOM_PLAN_EMAIL_3D_PREVIEW_ALT)}" width="560" style="max-width:100%;height:auto;display:block;margin:0 auto;border:1px solid ${C_RULE};" />
  </td></tr>`;
}

/** Three-column body rows like review.astro order table (Product | Qty | Subtotal). */
function buildReviewStyleTableRows(orderSummary: string): { rows: string; lockerCount: number; roomCount: number } {
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
				`<tr><td colspan="3" style="padding:16px 24px 6px 40px;font-family:${FF_HEAD};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${C_TEXT};">${escapeHtml(roomU)}</td></tr>`,
			);
			continue;
		}
		const p = parsePlannerProductLine(line);
		if (p) {
			lockerCount += parseInt(p.qty, 10) || 0;
			const nameU = p.name.toUpperCase();
			const title = nameU.includes('LOCKER') ? nameU : `${nameU} LOCKER`;
			chunks.push(`<tr>
  <td style="padding:12px 24px;border-bottom:1px solid ${C_RULE};vertical-align:top;font-family:${FF_BODY};font-size:13px;color:${C_TEXT};">
    <div style="font-family:${FF_HEAD};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${C_TEXT};line-height:1.25;">${escapeHtml(title)}</div>
    <div style="margin-top:4px;font-family:${FF_BODY};font-size:11px;font-weight:400;color:${C_MUTED};text-transform:uppercase;letter-spacing:0.5px;line-height:1.4;">${escapeHtml(p.specLine)}</div>
  </td>
  <td style="padding:12px 16px;border-bottom:1px solid ${C_RULE};text-align:center;vertical-align:top;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};width:48px;">${escapeHtml(p.qty)}</td>
  <td style="padding:12px 24px 12px 12px;border-bottom:1px solid ${C_RULE};text-align:right;vertical-align:top;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};white-space:nowrap;">$${escapeHtml(p.price)}</td>
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

type CompactOrderRole = 'customer' | 'team';

/** Compact totals panel — customer (your email) or team (customer mailto first, no duplicate table). */
function buildCompactOrderSection(
	role: CompactOrderRole,
	customerEmail: string,
	grandTotal: string,
	lockerLine: string,
): string {
	const shippingRows = ROOM_PLAN_SHIPPING_LINES.map(
		(line, i) =>
			`<p style="margin:${i === 0 ? '0 0 6px' : '0'};font-family:${FF_BODY};font-size:12px;color:${C_MUTED};line-height:1.55;">${escapeHtml(line)}</p>`,
	).join('');
	const pdfNote =
		role === 'team' ? ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE_TEAM : ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE;

	const teamCustomerRow =
		role === 'team'
			? `<tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};">Customer</p>
        <p style="margin:0;font-family:${FF_BODY};font-size:14px;line-height:1.5;">
          <a href="mailto:${escapeHtml(customerEmail)}" style="color:${C_TEXT};text-decoration:underline;">${escapeHtml(customerEmail)}</a>
        </p>
      </td></tr>`
			: '';

	const customerEmailRow =
		role === 'customer'
			? `<tr><td style="padding:0 24px 14px;border-top:1px solid ${C_RULE};">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};">Your email</p>
        <p style="margin:0;padding:10px 0 8px;font-family:${FF_BODY};font-size:14px;color:${C_TEXT};border-bottom:1px solid ${C_RULE};">${escapeHtml(customerEmail)}</p>
      </td></tr>`
			: '';

	const pdfNoteTopBorder = role === 'team' ? `border-top:1px solid ${C_RULE};` : '';

	return `
  <tr><td style="padding:28px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      ${teamCustomerRow}
      <tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <h2 style="margin:0;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.2;">${escapeHtml(ROOM_PLAN_EMAIL_COMPACT_PANEL_HEADING)}</h2>
      </td></tr>
      <tr><td style="padding:24px 20px 12px;text-align:center;border-bottom:1px solid ${C_RULE};">
        <p style="margin:0;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;">Estimated total</p>
        <p style="margin:10px 0 0;font-family:${FF_HEAD};font-size:32px;font-weight:700;color:${C_TEXT};letter-spacing:0.02em;">$${escapeHtml(grandTotal)}</p>
      </td></tr>
      <tr><td style="padding:14px 24px 10px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.5px;text-align:center;">${escapeHtml(lockerLine)}</td></tr>
      <tr><td style="padding:0 24px 14px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};line-height:1.55;">
        ${shippingRows}
      </td></tr>
      ${customerEmailRow}
      <tr><td style="padding:16px 24px 20px;${pdfNoteTopBorder}">
        <p style="margin:0;font-family:${FF_BODY};font-size:13px;line-height:1.65;color:${C_TEXT};">${escapeHtml(pdfNote)}</p>
      </td></tr>
    </table>
  </td></tr>`;
}

export function buildCustomerHTML(
	email: string,
	orderSummary: string,
	grandTotal: string,
	layoutPreviewDataUrl?: string | null,
): string {
	const { rest } = extractPlannerMetaFromOrderSummary(orderSummary);
	const { lockerCount, roomCount } = buildReviewStyleTableRows(rest);
	const footerLine2Parts = ROOM_PLAN_FOOTER_LINES[1].split(' · ');
	const previewRow = layoutPreviewBlock(layoutPreviewDataUrl);

	const lockerLine =
		lockerCount > 0
			? `${lockerCount} locker${lockerCount !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`
			: 'No lockers in this summary.';
	const compactOrderSection = buildCompactOrderSection('customer', email, grandTotal, lockerLine);

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
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C_PAGE};padding:32px 16px 48px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border-collapse:collapse;">

  <tr><td style="padding:0 8px 8px;text-align:center;">
    <p style="margin:0;font-family:${FF_HEAD};font-size:43px;font-weight:600;color:${C_TEXT};letter-spacing:0.05em;text-transform:uppercase;text-align:center;line-height:1;">PLAYERSTALL</p>
  </td></tr>

  <tr><td style="padding:48px 8px 0;text-align:center;">
    <h1 style="margin:0;font-family:${FF_HEAD};font-size:clamp(14px,2.5vw,20px);font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.1;">Review your layout</h1>
    <p style="margin:16px auto 0;max-width:520px;font-family:${FF_BODY};font-size:15px;line-height:1.65;color:${C_MUTED};text-align:center;">
      ${escapeHtml(ROOM_PLAN_INTRO)}
    </p>
  </td></tr>
${previewRow}
${compactOrderSection}

  <tr><td style="padding:24px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${FF_HEAD};font-size:18px;font-weight:700;color:#2a2a2a;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(ROOM_PLAN_WHAT_NEXT_HEADING)}</p>
        <ol style="margin:0;padding-left:20px;font-family:${FF_BODY};font-size:16px;line-height:1.7;color:#555555;">
          ${ROOM_PLAN_WHAT_NEXT_STEPS.map(
						(step, i) =>
							`<li style="margin-bottom:${i < ROOM_PLAN_WHAT_NEXT_STEPS.length - 1 ? '8px' : '0'};">${escapeHtml(step)}</li>`,
					).join('')}
        </ol>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:20px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:14px;line-height:1.65;color:#555555;letter-spacing:0.02em;">📎 <strong>Attachments:</strong> <em>${escapeHtml(ROOM_PLAN_ATTACHMENT_FILES_DESC)}</em></p>
        <p style="margin:0;font-family:${FF_BODY};font-size:13px;color:#777777;">${escapeHtml(ROOM_PLAN_ATTACHMENTS_NOTE)}</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:24px 8px 0;text-align:center;">
    <a href="${escapeHtml(ROOM_PLAN_CTA_URL)}" style="display:block;padding:16px 24px;background:${C_TEXT};color:#ffffff;text-decoration:none;font-family:${FF_HEAD};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:2px;border:1px solid ${C_TEXT};">${escapeHtml(ROOM_PLAN_CTA_LABEL)}</a>
  </td></tr>

  <tr><td style="padding:32px 8px 0;border-top:1px solid ${C_RULE};margin-top:8px;">
    <p style="margin:0;font-family:${FF_BODY};font-size:12px;color:${C_FOOT};line-height:1.6;text-align:center;">
      ${escapeHtml(ROOM_PLAN_FOOTER_LINES[0])}<br />
      ${escapeHtml(footerLine2Parts[0] || '')} · <a href="mailto:${escapeHtml(footerLine2Parts[1] || '')}" style="color:${C_MUTED};">${escapeHtml(footerLine2Parts[1] || '')}</a> · ${escapeHtml(footerLine2Parts[2] || '')}
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildSalesHTML(
	email: string,
	orderSummary: string,
	grandTotal: string,
	layoutPreviewDataUrl?: string | null,
): string {
	const { rest } = extractPlannerMetaFromOrderSummary(orderSummary);
	const { lockerCount, roomCount } = buildReviewStyleTableRows(rest);
	const footerLine2Parts = ROOM_PLAN_FOOTER_LINES[1].split(' · ');
	const previewRow = layoutPreviewBlock(layoutPreviewDataUrl);

	const lockerLine =
		lockerCount > 0
			? `${lockerCount} locker${lockerCount !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`
			: 'No lockers in this summary.';
	const compactOrderSection = buildCompactOrderSection('team', email, grandTotal, lockerLine);

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
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C_PAGE};padding:32px 16px 48px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border-collapse:collapse;">

  <tr><td style="padding:0 8px 8px;text-align:center;">
    <p style="margin:0;font-family:${FF_HEAD};font-size:43px;font-weight:600;color:${C_TEXT};letter-spacing:0.05em;text-transform:uppercase;text-align:center;line-height:1;">PLAYERSTALL</p>
  </td></tr>

  <tr><td style="padding:48px 8px 0;text-align:center;">
    <h1 style="margin:0;font-family:${FF_HEAD};font-size:clamp(14px,2.5vw,20px);font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.1;">New room planner submission</h1>
    <p style="margin:16px auto 0;max-width:520px;font-family:${FF_BODY};font-size:15px;line-height:1.65;color:${C_MUTED};text-align:center;">
      ${escapeHtml(ROOM_PLAN_TEAM_INTRO)}
    </p>
  </td></tr>
${previewRow}
${compactOrderSection}

  <tr><td style="padding:24px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${FF_HEAD};font-size:18px;font-weight:700;color:#2a2a2a;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(ROOM_PLAN_WHAT_NEXT_HEADING)}</p>
        <ol style="margin:0;padding-left:20px;font-family:${FF_BODY};font-size:16px;line-height:1.7;color:#555555;">
          ${ROOM_PLAN_WHAT_NEXT_STEPS.map(
						(step, i) =>
							`<li style="margin-bottom:${i < ROOM_PLAN_WHAT_NEXT_STEPS.length - 1 ? '8px' : '0'};">${escapeHtml(step)}</li>`,
					).join('')}
        </ol>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:20px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid ${C_RULE};">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:14px;line-height:1.65;color:#555555;letter-spacing:0.02em;">📎 <strong>Attachments:</strong> <em>${escapeHtml(ROOM_PLAN_ATTACHMENT_FILES_DESC)}</em></p>
        <p style="margin:0;font-family:${FF_BODY};font-size:13px;color:#777777;">${escapeHtml(ROOM_PLAN_TEAM_NOTE)}</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:24px 8px 0;text-align:center;">
    <a href="${escapeHtml(ROOM_PLAN_CTA_URL)}" style="display:block;padding:16px 24px;background:${C_TEXT};color:#ffffff;text-decoration:none;font-family:${FF_HEAD};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:2px;border:1px solid ${C_TEXT};">${escapeHtml(ROOM_PLAN_CTA_LABEL)}</a>
  </td></tr>

  <tr><td style="padding:32px 8px 0;border-top:1px solid ${C_RULE};margin-top:8px;">
    <p style="margin:0;font-family:${FF_BODY};font-size:12px;color:${C_FOOT};line-height:1.6;text-align:center;">
      ${escapeHtml(ROOM_PLAN_FOOTER_LINES[0])}<br />
      ${escapeHtml(footerLine2Parts[0] || '')} · <a href="mailto:${escapeHtml(footerLine2Parts[1] || '')}" style="color:${C_MUTED};">${escapeHtml(footerLine2Parts[1] || '')}</a> · ${escapeHtml(footerLine2Parts[2] || '')}
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
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
