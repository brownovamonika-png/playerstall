import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || 'team@playerstall.com';
const FROM_NAME = 'PlayerStall Room Planner';
const SALES_EMAIL = 'team@playerstall.com';

interface LineItemPayload {
  roomName: string;
  displayName: string;
  widthIn: number;
  depthIn: number;
  colorLabel: string;
  accessoryLabels: string[];
  qty: number;
  lineTotal: string;
}

interface RequestBody {
  email: string;
  orderSummary: string;
  grandTotal: string;
  pdfBase64?: string;
  deliveryTiming?: string;
  budget?: string;
  lineItems?: LineItemPayload[];
}

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

function buildLineItemRows(lineItems: LineItemPayload[]): string {
  let html = '';
  let currentRoom = '';
  for (const item of lineItems) {
    const room = item.roomName || 'Unnamed Room';
    if (room !== currentRoom) {
      currentRoom = room;
      html += `<tr><td colspan="3" style="padding:10px 16px;background:#fafafa;border-top:1px solid #e0e0e0;border-bottom:1px solid #ebebeb;font-family:${FONT};font-size:11px;font-weight:700;color:#888888;letter-spacing:2px;text-transform:uppercase;">${escHtml(room)}</td></tr>`;
    }
    const spec = `${item.widthIn}&quot;W &times; ${item.depthIn}&quot;D &middot; ${escHtml(item.colorLabel)}${item.accessoryLabels.length ? ' &middot; ' + item.accessoryLabels.map(escHtml).join(', ') : ''}`;
    html += `
<tr>
  <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
    <span style="display:block;font-family:${FONT};font-size:14px;font-weight:700;color:#0d0d0d;">${escHtml(item.displayName)}</span>
    <span style="display:block;font-family:${FONT};font-size:12px;color:#999999;margin-top:2px;">${spec}</span>
  </td>
  <td style="padding:12px 16px;text-align:center;border-bottom:1px solid #f0f0f0;font-family:${FONT};font-size:14px;color:#0d0d0d;vertical-align:top;">${item.qty}</td>
  <td style="padding:12px 16px;text-align:right;border-bottom:1px solid #f0f0f0;font-family:${FONT};font-size:14px;color:#0d0d0d;vertical-align:top;white-space:nowrap;">${escHtml(item.lineTotal)}</td>
</tr>`;
  }
  return html;
}

/** Fallback: build line item rows by parsing the plain-text orderSummary string. */
function buildLineItemRowsFallback(orderSummary: string): string {
  const lines = orderSummary.split('\n').filter((l) => l.trim() && !l.startsWith('Estimated Total'));
  let html = '';
  for (const line of lines) {
    if (line.startsWith('---')) {
      const room = line.replace(/---/g, '').trim();
      html += `<tr><td colspan="3" style="padding:10px 16px;background:#fafafa;border-top:1px solid #e0e0e0;border-bottom:1px solid #ebebeb;font-family:${FONT};font-size:11px;font-weight:700;color:#888888;letter-spacing:2px;text-transform:uppercase;">${escHtml(room)}</td></tr>`;
    } else {
      html += `<tr><td colspan="3" style="padding:8px 16px;border-bottom:1px solid #f0f0f0;font-family:${FONT};font-size:13px;color:#333333;">${escHtml(line)}</td></tr>`;
    }
  }
  return html;
}

function escHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildCustomerHTML(
  email: string,
  orderSummary: string,
  grandTotal: string,
  deliveryTiming?: string,
  budget?: string,
  lineItems?: LineItemPayload[],
): string {
  const rows = lineItems?.length ? buildLineItemRows(lineItems) : buildLineItemRowsFallback(orderSummary);
  const timing = escHtml(deliveryTiming || '—');
  const budgetVal = escHtml(budget || '—');
  const total = escHtml(grandTotal);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
@media (prefers-color-scheme:dark){
  .em-wrap{background-color:#1a1a1a!important}
  .em-body{background-color:#0d0d0d!important}
  .em-title{color:#cccccc!important}
  .em-desc{color:#888888!important}
  .em-card{border-color:#2a2a2a!important}
  .em-card-hdr{background-color:#1e1e1e!important;border-color:#2a2a2a!important;color:#aaaaaa!important}
  .em-sel-label{color:#777777!important}
  .em-sel-value{color:#dddddd!important}
  .em-sel-row td{border-color:#2a2a2a!important}
  .em-col-hdr{color:#666666!important;border-color:#2a2a2a!important}
  .em-room-row td{background-color:#181818!important;color:#666666!important;border-color:#2a2a2a!important}
  .em-pname{color:#e0e0e0!important}
  .em-pspec{color:#666666!important}
  .em-ptd{color:#d0d0d0!important;border-color:#222222!important}
  .em-sub-row th,.em-sub-row td{color:#888888!important;border-color:#2a2a2a!important}
  .em-total-row th,.em-total-row td{background-color:#1e1e1e!important;color:#ffffff!important;border-color:#2a2a2a!important}
  .em-footer td{color:#555555!important;border-color:#1e1e1e!important}
  .em-footer a{color:#666666!important}
}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;" class="em-wrap">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;width:100%;max-width:600px;" class="em-body">

  <!-- Wordmark -->
  <tr><td style="padding:48px 40px 36px;text-align:center;background-color:#0d0d0d;">
    <p style="margin:0;font-family:'Oswald',sans-serif;font-size:43px;font-weight:600;color:#ffffff;letter-spacing:.05em;text-transform:uppercase;line-height:1;">PLAYERSTALL</p>
  </td></tr>

  <!-- Section heading -->
  <tr><td style="padding:20px 40px 0;text-align:center;">
    <p style="margin:0;font-family:${FONT};font-size:12px;font-weight:700;color:#0d0d0d;letter-spacing:3px;text-transform:uppercase;" class="em-title">REVIEW YOUR LAYOUT</p>
  </td></tr>

  <!-- Description -->
  <tr><td style="padding:16px 40px 32px;text-align:center;">
    <p style="margin:0 auto;font-family:${FONT};font-size:14px;line-height:1.75;color:#666666;max-width:460px;" class="em-desc">You've turned ideas into a real layout across your rooms. We've received your plan and will be in touch to help bring your dream locker room to life.</p>
  </td></tr>

  <!-- YOUR SELECTIONS card -->
  <tr><td style="padding:0 32px 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;" class="em-card">
      <tr>
        <td colspan="2" style="padding:12px 16px;background:#f8f8f8;border-bottom:1px solid #e0e0e0;" class="em-card-hdr">
          <span style="font-family:${FONT};font-size:10px;font-weight:700;color:#555555;letter-spacing:2px;text-transform:uppercase;">YOUR SELECTIONS</span>
        </td>
      </tr>
      <tr class="em-sel-row">
        <td style="padding:14px 16px;border-bottom:1px solid #f0f0f0;font-family:${FONT};font-size:10px;font-weight:700;color:#999999;letter-spacing:1px;text-transform:uppercase;width:48%;" class="em-sel-label">PREFERRED DELIVERY TIMING</td>
        <td style="padding:14px 16px;border-bottom:1px solid #f0f0f0;font-family:${FONT};font-size:14px;color:#0d0d0d;" class="em-sel-value">${timing}</td>
      </tr>
      <tr class="em-sel-row">
        <td style="padding:14px 16px;font-family:${FONT};font-size:10px;font-weight:700;color:#999999;letter-spacing:1px;text-transform:uppercase;" class="em-sel-label">FUNDING / BUDGET</td>
        <td style="padding:14px 16px;font-family:${FONT};font-size:14px;color:#0d0d0d;" class="em-sel-value">${budgetVal}</td>
      </tr>
    </table>
  </td></tr>

  <!-- ORDER SUMMARY card -->
  <tr><td style="padding:0 32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;" class="em-card">
      <!-- Card header -->
      <tr>
        <td colspan="3" style="padding:12px 16px;background:#f8f8f8;border-bottom:1px solid #e0e0e0;" class="em-card-hdr">
          <span style="font-family:${FONT};font-size:10px;font-weight:700;color:#555555;letter-spacing:2px;text-transform:uppercase;">ORDER SUMMARY</span>
        </td>
      </tr>
      <!-- Column headers -->
      <tr>
        <th style="padding:10px 16px;font-family:${FONT};font-size:10px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:1px;text-align:left;border-bottom:1px solid #ebebeb;" class="em-col-hdr">PRODUCT</th>
        <th style="padding:10px 16px;font-family:${FONT};font-size:10px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:1px;text-align:center;border-bottom:1px solid #ebebeb;width:56px;" class="em-col-hdr">QTY</th>
        <th style="padding:10px 16px;font-family:${FONT};font-size:10px;font-weight:600;color:#aaaaaa;text-transform:uppercase;letter-spacing:1px;text-align:right;border-bottom:1px solid #ebebeb;width:90px;" class="em-col-hdr">SUBTOTAL</th>
      </tr>
      <!-- Line items -->
      ${rows}
      <!-- Subtotal -->
      <tr class="em-sub-row">
        <th colspan="2" style="padding:12px 16px;font-family:${FONT};font-size:11px;font-weight:600;color:#888888;text-align:left;text-transform:uppercase;letter-spacing:1px;border-top:1px solid #e0e0e0;">SUBTOTAL</th>
        <td style="padding:12px 16px;font-family:${FONT};font-size:12px;color:#333333;text-align:right;border-top:1px solid #e0e0e0;white-space:nowrap;" class="em-ptd">$${total}</td>
      </tr>
      <!-- Estimated Total -->
      <tr class="em-total-row">
        <th colspan="2" style="padding:14px 16px;font-family:${FONT};font-size:13px;font-weight:700;color:#0d0d0d;text-align:left;background:#f8f8f8;border-top:1px solid #e0e0e0;">ESTIMATED TOTAL</th>
        <td style="padding:14px 16px;font-family:${FONT};font-size:14px;font-weight:700;color:#0d0d0d;text-align:right;background:#f8f8f8;border-top:1px solid #e0e0e0;white-space:nowrap;">$${total}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr class="em-footer"><td style="padding:24px 32px 36px;text-align:center;border-top:1px solid #f0f0f0;">
    <p style="margin:0 0 6px;font-family:${FONT};font-size:12px;color:#aaaaaa;">PlayerStall &mdash; Custom Sports Lockers Since 1996</p>
    <p style="margin:0 0 4px;font-family:${FONT};font-size:11px;color:#bbbbbb;">1-888-584-1444 &middot; <a href="mailto:team@playerstall.com" style="color:#aaaaaa;text-decoration:none;">team@playerstall.com</a></p>
    <p style="margin:8px 0 0;font-family:${FONT};font-size:11px;"><a href="https://playerstall.com" style="color:#aaaaaa;text-decoration:none;">playerstall.com</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildSalesHTML(
  email: string,
  orderSummary: string,
  grandTotal: string,
  deliveryTiming?: string,
  budget?: string,
  lineItems?: LineItemPayload[],
): string {
  const rows = lineItems?.length ? buildLineItemRows(lineItems) : buildLineItemRowsFallback(orderSummary);
  const timing = escHtml(deliveryTiming || '—');
  const budgetVal = escHtml(budget || '—');
  const total = escHtml(grandTotal);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:${FONT};margin:0;padding:20px;background:#f5f5f5;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;padding:28px;margin:0 auto;">
  <tr><td>
    <h2 style="margin:0 0 4px;font-family:${FONT};color:#0d0d0d;font-size:18px;">New Room Planner Submission</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#555555;">From: <a href="mailto:${escHtml(email)}" style="color:#fe5900;">${escHtml(email)}</a></p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;margin-bottom:16px;">
      <tr><td colspan="2" style="padding:10px 14px;background:#f8f8f8;border-bottom:1px solid #e0e0e0;font-size:10px;font-weight:700;color:#555;letter-spacing:2px;text-transform:uppercase;">YOUR SELECTIONS</td></tr>
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:10px;font-weight:700;color:#999;letter-spacing:1px;text-transform:uppercase;width:45%;">PREFERRED DELIVERY TIMING</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#333;">${timing}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-size:10px;font-weight:700;color:#999;letter-spacing:1px;text-transform:uppercase;">FUNDING / BUDGET</td>
        <td style="padding:10px 14px;font-size:13px;color:#333;">${budgetVal}</td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;margin-bottom:16px;">
      <tr><td colspan="3" style="padding:10px 14px;background:#f8f8f8;border-bottom:1px solid #e0e0e0;font-size:10px;font-weight:700;color:#555;letter-spacing:2px;text-transform:uppercase;">ORDER SUMMARY</td></tr>
      ${rows}
      <tr>
        <th colspan="2" style="padding:12px 14px;text-align:left;font-size:13px;font-weight:700;color:#0d0d0d;border-top:1px solid #e0e0e0;background:#f8f8f8;">ESTIMATED TOTAL</th>
        <td style="padding:12px 14px;text-align:right;font-size:14px;font-weight:700;color:#fe5900;border-top:1px solid #e0e0e0;background:#f8f8f8;white-space:nowrap;">$${total}</td>
      </tr>
    </table>
    <p style="font-size:12px;color:#999;margin:0;">The customer's room plan PDF is attached. Reply to this email to reach them at <a href="mailto:${escHtml(email)}" style="color:#fe5900;">${escHtml(email)}</a>.</p>
  </td></tr>
</table>
</body></html>`;
}

async function sendEmail(
  token: string,
  to: { email: string; name?: string },
  subject: string,
  html: string,
  replyTo?: { email: string },
  attachments?: { filename: string; content: string }[],
) {
  const payload: Record<string, unknown> = {
    from: { email: FROM_EMAIL, name: FROM_NAME },
    to: [to],
    subject,
    html,
  };
  if (replyTo) payload.reply_to = [replyTo];
  if (attachments?.length) payload.attachments = attachments;

  const res = await fetch(MAILERSEND_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MailerSend ${res.status}: ${text}`);
  }
  return res;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.MAILERSEND_API_TOKEN;
  if (!token) {
    console.error('MAILERSEND_API_TOKEN not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const { email, orderSummary, grandTotal, pdfBase64, deliveryTiming, budget, lineItems } = req.body as RequestBody;

    if (!email || !orderSummary) {
      return res.status(400).json({ error: 'Missing required fields (email, orderSummary)' });
    }

    const attachments = pdfBase64
      ? [{ filename: 'room-planner-layout.pdf', content: pdfBase64 }]
      : [];

    const customerHTML = buildCustomerHTML(email, orderSummary, grandTotal, deliveryTiming, budget, lineItems);
    const salesHTML = buildSalesHTML(email, orderSummary, grandTotal, deliveryTiming, budget, lineItems);

    await Promise.all([
      sendEmail(
        token,
        { email, name: 'Room Planner Customer' },
        'Your PlayerStall Room Layout — PlayerStall (PDFs attached)',
        customerHTML,
        { email: SALES_EMAIL },
        attachments,
      ),
      sendEmail(
        token,
        { email: SALES_EMAIL, name: 'PlayerStall Team' },
        `Room Planner Submission from ${email}`,
        salesHTML,
        { email },
        attachments,
      ),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('send-room-plan error:', message);
    return res.status(500).json({ error: message });
  }
}
