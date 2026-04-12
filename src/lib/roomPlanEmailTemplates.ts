/**
 * HTML bodies for MailerSend room-plan emails.
 * Line items match cart product rows: bold uppercase name + grey price, then smaller grey specs with · separator.
 * Preview: /dev/email-preview-room-plan (npm run dev only). POST handler: /api/send-room-plan (Astro server route).
 */

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Yantramanav:wght@400;500&display=swap" rel="stylesheet">`;

const FF_BODY = `'Yantramanav', 'Roboto', Arial, sans-serif`;
const FF_HEAD = `'Oswald', Arial, sans-serif`;

/** Cart screenshot: primary black, secondary/price grey */
const CART_NAME = '#000000';
const CART_MUTED = '#757575';
const CART_RULE = '#e0e0e0';

const BG_PAGE = '#e8e8e8';
const BG_CARD = '#ffffff';
/** Top / footer bar — matches site footer */
const BG_HEADER_FOOTER = '#1a1a1a';
const HEADER_TEXT_WHITE = '#ffffff';
const HEADER_TEXT_MUTED = '#a0a0a0';
const HEADER_TEXT_DIM = '#888888';

/** Top bar wordmark — matches original template (24px bold in header strip) */
const STYLE_BRAND_HEADER = `margin:0;font-family:${FF_HEAD};font-size:24px;font-weight:700;color:${HEADER_TEXT_WHITE};line-height:1.2;letter-spacing:1px;`;
/** Footer brand line — original template: 13px, muted grey on dark bar */
const STYLE_BRAND_FOOTER = `margin:0;font-family:${FF_BODY};font-size:13px;font-weight:700;color:#cccccc;line-height:1.45;letter-spacing:0.02em;`;

const BG_TABLE_HEAD = '#dedede';
const BG_TOTAL_ROW = '#e5e5e5';
const BG_SECTION = '#efefef';
const BG_ROW_B = '#fafafa';
const BG_CTA_BAND = '#e8e8e8';
const BORDER = '#d0d0d0';

const STYLE_TABLE_HEAD = `padding:12px 14px;font-family:${FF_HEAD};font-size:13px;font-weight:700;color:#1c1c1c;text-transform:uppercase;letter-spacing:0.1em;text-align:left;vertical-align:middle;border-bottom:1px solid ${BORDER};background:${BG_TABLE_HEAD};line-height:1.3;`;

const STYLE_TOTALS_LABEL = `padding:12px 14px;font-family:${FF_HEAD};font-size:14px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.08em;text-align:left;vertical-align:middle;border-top:1px solid ${BORDER};width:45%;background:${BG_TOTAL_ROW};line-height:1.35;`;

const STYLE_TOTALS_VALUE = `padding:12px 14px;font-family:${FF_BODY};font-size:14px;font-weight:400;color:#6a6a6a;text-align:right;vertical-align:middle;border-top:1px solid ${BORDER};background:${BG_TOTAL_ROW};line-height:1.35;`;

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
	const re = /^(\d+)x\s+(.+?)\s+\((.+)\)\s+-\s+\$([\d,]+\.\d{2})\s*$/;
	const m = line.match(re);
	if (!m) return null;
	const qty = m[1];
	const name = m[2].trim();
	const inner = m[3].trim();
	const price = m[4].replace(/,/g, '');
	// `24"W x 19"D, Color + extras`
	const innerRe = /^(\d+"\s*W\s+[x×]\s+\d+"\s*D)\s*,\s*(.+)$/i;
	const im = inner.match(innerRe);
	const specLine = im ? `${im[1].replace(/\s+/g, ' ').trim()} · ${im[2].trim()}` : inner;
	return { qty, name, specLine, price: price };
}

function rowCartStyleItem(line: string): string {
	const p = parsePlannerProductLine(line);
	if (!p) {
		return `<tr><td colspan="2" style="padding:12px 14px;border-top:1px solid ${CART_RULE};background:#fafafa;font-family:${FF_BODY};font-size:11px;font-weight:500;color:${CART_MUTED};text-transform:uppercase;letter-spacing:0.08em;line-height:1.4;">${escapeHtml(line)}</td></tr>`;
	}
	const title = `${p.qty}x ${p.name}`;
	return `<tr>
  <td colspan="2" style="padding:0;border-top:1px solid ${CART_RULE};background:${BG_CARD};">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="left" style="padding:14px 14px 2px;font-family:${FF_HEAD};font-size:14px;font-weight:700;color:${CART_NAME};text-transform:uppercase;letter-spacing:0.06em;line-height:1.25;">${escapeHtml(title)}</td>
        <td align="right" nowrap style="padding:14px 14px 2px;font-family:${FF_BODY};font-size:14px;font-weight:400;color:${CART_MUTED};line-height:1.25;">$${escapeHtml(p.price)}</td>
      </tr>
    </table>
    <div style="padding:0 14px 14px;font-family:${FF_BODY};font-size:11px;font-weight:400;color:${CART_MUTED};text-transform:uppercase;letter-spacing:0.06em;line-height:1.45;">${escapeHtml(p.specLine)}</div>
  </td>
</tr>`;
}

function buildItemRowsFromSummary(orderSummary: string): string {
	return orderSummary
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && !l.startsWith('Estimated Total'))
		.map((l) => rowCartStyleItem(l))
		.join('\n');
}

export function buildCustomerHTML(email: string, orderSummary: string, grandTotal: string): string {
	const itemRows = buildItemRowsFromSummary(orderSummary);
	const totalRow = `<tr>
        <td style="${STYLE_TOTALS_LABEL}">Estimated Total</td>
        <td style="${STYLE_TOTALS_VALUE}">$${grandTotal}</td>
      </tr>`;

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${FONT_LINK}
</head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:${FF_BODY};color:#4a4a4a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_PAGE};padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border:1px solid ${BORDER};border-collapse:collapse;">

  <tr><td style="background:${BG_HEADER_FOOTER};padding:32px 40px;text-align:center;border-bottom:1px solid #2a2a2a;">
    <p style="${STYLE_BRAND_HEADER}">PlayerStall</p>
    <p style="margin:8px 0 0;font-family:${FF_BODY};font-size:12px;font-weight:500;color:${HEADER_TEXT_MUTED};text-transform:uppercase;letter-spacing:0.12em;">Room Planner</p>
  </td></tr>

  <tr><td style="padding:40px 36px 44px;background:${BG_CARD};">
    <h2 style="margin:0 0 16px;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.06em;line-height:1.25;">Your Locker Room Plan</h2>
    <p style="margin:0 0 24px;font-family:${FF_BODY};font-size:16px;line-height:1.65;color:#555555;">
      Thanks for using the PlayerStall Room Planner! We've attached <strong>two PDFs</strong>: a polished <strong>project estimate</strong> with pricing, and a <strong>layout pack</strong> with floor plans and 3D views for fundraising or sharing. Our team has also received copies and will follow up.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border-collapse:collapse;border:1px solid ${BORDER};">
      <tr><td colspan="2" style="${STYLE_TABLE_HEAD}">Your Selections</td></tr>
      ${itemRows}
      ${totalRow}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;background:${BG_SECTION};border:1px solid ${BORDER};">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${FF_HEAD};font-size:18px;font-weight:700;color:#2a2a2a;text-transform:uppercase;letter-spacing:0.08em;">What Happens Next?</p>
        <ol style="margin:0;padding-left:20px;font-family:${FF_BODY};font-size:16px;line-height:1.7;color:#555555;">
          <li style="margin-bottom:8px;">Our design team reviews your layout and measurements</li>
          <li style="margin-bottom:8px;">We'll reach out within 1-2 business days with a detailed quote</li>
          <li>We'll work with you to finalize colors, accessories, and specs</li>
        </ol>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;border-collapse:collapse;background:${BG_ROW_B};border:1px solid ${BORDER};">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 6px;font-family:${FF_BODY};font-size:14px;line-height:1.65;color:#555555;letter-spacing:0.02em;">📎 <strong>Attachments:</strong> <em>PlayerStall-Room-Estimate.pdf</em> (pricing) and <em>PlayerStall-Room-Layout.pdf</em> (plans + 3D).</p>
        <p style="margin:0;font-family:${FF_BODY};font-size:13px;color:#777777;">If an attachment didn't come through, reply to this email and we'll resend it.</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:24px 36px 32px;text-align:left;background:${BG_CTA_BAND};border-top:1px solid ${BORDER};">
    <a href="https://playerstall.com/room-planner" style="display:inline-block;padding:12px 24px;background:#000000;color:#ffffff;text-decoration:none;font-family:${FF_HEAD};font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Back to Room Planner</a>
  </td></tr>

  <tr><td style="background:${BG_HEADER_FOOTER};padding:32px 40px;text-align:center;border-top:1px solid #2a2a2a;">
    <p style="${STYLE_BRAND_FOOTER}">PlayerStall</p>
    <p style="margin:14px 0 0;font-family:${FF_BODY};font-size:12px;font-weight:400;color:${HEADER_TEXT_DIM};line-height:1.5;">2934 200 Street, Langley, BC V2Z 2C1 Canada</p>
    <p style="margin:6px 0 0;font-family:${FF_BODY};font-size:12px;font-weight:400;color:${HEADER_TEXT_DIM};line-height:1.5;">1-888-584-1444 <span style="color:#666666;">·</span> <a href="mailto:team@playerstall.com" style="color:${HEADER_TEXT_DIM};text-decoration:underline;">team@playerstall.com</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildSalesHTML(email: string, orderSummary: string, grandTotal: string): string {
	const itemRows = buildItemRowsFromSummary(orderSummary);
	const salesTotalRow = `<tr>
        <td style="${STYLE_TOTALS_LABEL}">Estimated Total</td>
        <td style="${STYLE_TOTALS_VALUE}">$${grandTotal}</td>
      </tr>`;

	return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${FONT_LINK}
</head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:${FF_BODY};color:#4a4a4a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_PAGE};padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border:1px solid ${BORDER};border-collapse:collapse;">
  <tr><td style="background:${BG_HEADER_FOOTER};padding:32px 40px;text-align:center;border-bottom:1px solid #2a2a2a;">
    <p style="${STYLE_BRAND_HEADER}">PlayerStall</p>
    <p style="margin:8px 0 0;font-family:${FF_BODY};font-size:12px;font-weight:500;color:${HEADER_TEXT_MUTED};text-transform:uppercase;letter-spacing:0.12em;">Internal · Room Planner</p>
  </td></tr>

  <tr><td style="padding:40px 36px 44px;background:${BG_CARD};">
    <h2 style="margin:0 0 16px;font-family:${FF_HEAD};font-size:20px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.06em;line-height:1.25;">New Room Planner Submission</h2>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-collapse:collapse;border:1px solid ${BORDER};background:${BG_SECTION};">
      <tr>
        <td style="padding:12px 14px;font-family:${FF_HEAD};font-size:13px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.08em;text-align:left;vertical-align:middle;width:45%;border-right:1px solid ${BORDER};">Customer</td>
        <td style="padding:12px 14px;font-family:${FF_BODY};font-size:14px;text-align:right;vertical-align:middle;color:#666666;"><a href="mailto:${escapeHtml(email)}" style="color:#5a5a5a;text-decoration:underline;">${escapeHtml(email)}</a></td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-collapse:collapse;border:1px solid ${BORDER};">
      <tr><td colspan="2" style="${STYLE_TABLE_HEAD}">Order Lines</td></tr>
      ${itemRows}
      ${salesTotalRow}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${BG_ROW_B};border:1px solid ${BORDER};">
      <tr><td style="padding:18px 22px;">
        <p style="font-family:${FF_BODY};font-size:14px;color:#555555;line-height:1.65;letter-spacing:0.02em;margin:0;">Both PDFs are attached (estimate + layout). Reply directly to this email to reach the customer.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Matches real planner payload so preview shows cart-style rows */
export const SAMPLE_ORDER_SUMMARY = [
	'--- Home Locker Room ---',
	'4x Model S (24"W x 19"D, High Reflective White) - $2596.00',
	'2x Model L (36"W x 22"D, Designer White + Extra shelf) - $1899.00',
	'Estimated Total: $4,495.00',
].join('\n');
