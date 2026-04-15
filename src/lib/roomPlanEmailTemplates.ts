/**
 * HTML bodies for MailerSend room-plan emails.
 * Customer and team (sales) emails share the same white layout and order table as the Review Your Layout page; copy is centralized in roomPlanCustomerCopy.
 * Preview: /dev/email-preview-room-plan (npm run dev only). POST handler: /api/send-room-plan (Astro server route).
 */

import {
	ROOM_PLAN_ATTACHMENT_FILES_DESC,
	ROOM_PLAN_ATTACHMENTS_NOTE,
	ROOM_PLAN_CTA_LABEL,
	ROOM_PLAN_CTA_URL,
	ROOM_PLAN_FOOTER_LINES,
	ROOM_PLAN_INTRO,
	ROOM_PLAN_TEAM_INTRO,
	ROOM_PLAN_TEAM_NOTE,
	ROOM_PLAN_WHAT_NEXT_HEADING,
	ROOM_PLAN_WHAT_NEXT_STEPS,
} from './roomPlanCustomerCopy';

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

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/**
 * Parse planner line: `4x Model S (24"W x 19"D, High Reflective White + acc) - $2596.00`
 */
function parsePlannerProductLine(line: string): { qty: string; name: string; specLine: string; price: string } | null {
	const re = /^(\d+)x\s+(.+?)\s+\((.+)\)\s+-\s+\$([\d,]+\.\d{2})\s*$/i;
	const m = line.match(re);
	if (!m) return null;
	const qty = m[1];
	const name = m[2].trim();
	const inner = m[3].trim();
	const price = m[4].replace(/,/g, '');
	const innerRe = /^(\d+"\s*W\s+[x×]\s+\d+"\s*D)\s*,\s*(.+)$/i;
	const im = inner.match(innerRe);
	const specLine = im ? `${im[1].replace(/\s+/g, ' ').trim()} · ${im[2].trim()}` : inner;
	return { qty, name, specLine, price: price };
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

function reviewOrderTableTheadSubfoot(grandTotal: string): { thead: string; subfoot: string } {
	const thead = `<tr>
    <th align="left" style="padding:12px 24px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${C_RULE};">Product</th>
    <th align="center" style="padding:12px 16px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${C_RULE};width:48px;">Qty</th>
    <th align="right" style="padding:12px 24px 12px 12px;font-family:${FF_HEAD};font-size:11px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid ${C_RULE};">Subtotal</th>
  </tr>`;
	const subfoot = `<tr>
    <th colspan="2" align="left" style="padding:12px 24px;font-family:${FF_HEAD};font-size:12px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;border:none;">Subtotal</th>
    <td align="right" style="padding:12px 24px 12px 12px;font-family:${FF_HEAD};font-size:13px;font-weight:600;color:${C_TEXT};border:none;">$${escapeHtml(grandTotal)}</td>
  </tr>
  <tr>
    <th colspan="2" align="left" style="padding:14px 24px 12px;font-family:${FF_HEAD};font-size:12px;font-weight:600;color:${C_MUTED};text-transform:uppercase;letter-spacing:1px;border-top:1px solid #cccccc;">Estimated Total</th>
    <td align="right" style="padding:14px 24px 12px 12px;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};border-top:1px solid #cccccc;">$${escapeHtml(grandTotal)}</td>
  </tr>`;
	return { thead, subfoot };
}

export function buildCustomerHTML(email: string, orderSummary: string, grandTotal: string): string {
	const { rows, lockerCount, roomCount } = buildReviewStyleTableRows(orderSummary);
	const footerLine2Parts = ROOM_PLAN_FOOTER_LINES[1].split(' · ');
	const { thead, subfoot } = reviewOrderTableTheadSubfoot(grandTotal);

	const lockerLine =
		lockerCount > 0
			? `${lockerCount} locker${lockerCount !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`
			: 'No lockers in this summary.';

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${FONT_LINK}
</head>
<body style="margin:0;padding:0;background:${C_PAGE};font-family:${FF_BODY};color:${C_TEXT};">
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

  <tr><td style="padding:28px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      <tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <h2 style="margin:0;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.2;">Order Summary</h2>
      </td></tr>
      <tr><td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <thead>${thead}</thead>
          <tbody>${rows}</tbody>
          <tfoot>${subfoot}</tfoot>
        </table>
      </td></tr>
      <tr><td style="padding:10px 24px 20px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.5px;">${escapeHtml(lockerLine)}</td></tr>
      <tr><td style="padding:0 24px 20px;">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};">Your email</p>
        <p style="margin:0;padding:10px 0 8px;font-family:${FF_BODY};font-size:14px;color:${C_TEXT};border-bottom:1px solid ${C_RULE};">${escapeHtml(email)}</p>
      </td></tr>
    </table>
  </td></tr>

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

export function buildSalesHTML(email: string, orderSummary: string, grandTotal: string): string {
	const { rows, lockerCount, roomCount } = buildReviewStyleTableRows(orderSummary);
	const footerLine2Parts = ROOM_PLAN_FOOTER_LINES[1].split(' · ');
	const { thead, subfoot } = reviewOrderTableTheadSubfoot(grandTotal);

	const lockerLine =
		lockerCount > 0
			? `${lockerCount} locker${lockerCount !== 1 ? 's' : ''} across ${roomCount} room${roomCount !== 1 ? 's' : ''}`
			: 'No lockers in this summary.';

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${FONT_LINK}
</head>
<body style="margin:0;padding:0;background:${C_PAGE};font-family:${FF_BODY};color:${C_TEXT};">
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

  <tr><td style="padding:28px 8px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${C_PANEL};border:1px solid ${C_RULE};">
      <tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};">Customer</p>
        <p style="margin:0;font-family:${FF_BODY};font-size:14px;line-height:1.5;">
          <a href="mailto:${escapeHtml(email)}" style="color:${C_TEXT};text-decoration:underline;">${escapeHtml(email)}</a>
        </p>
      </td></tr>
      <tr><td style="padding:24px 24px 16px;border-bottom:1px solid ${C_RULE};">
        <h2 style="margin:0;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:${C_TEXT};text-transform:uppercase;letter-spacing:2px;line-height:1.2;">Order Summary</h2>
      </td></tr>
      <tr><td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <thead>${thead}</thead>
          <tbody>${rows}</tbody>
          <tfoot>${subfoot}</tfoot>
        </table>
      </td></tr>
      <tr><td style="padding:10px 24px 20px;font-family:${FF_BODY};font-size:12px;color:${C_MUTED};letter-spacing:0.5px;">${escapeHtml(lockerLine)}</td></tr>
    </table>
  </td></tr>

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

/** Matches real planner payload so preview shows review-style table */
export const SAMPLE_ORDER_SUMMARY = [
	'--- DEAN ---',
	'7x Model S (24"W x 19"D, Marigold) - $5908.00',
	'Estimated Total: $5,908.00',
].join('\n');
