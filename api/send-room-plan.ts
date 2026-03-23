import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || 'sales@playerstall.com';
const FROM_NAME = 'PlayerStall Room Planner';
const SALES_EMAIL = 'sales@playerstall.com';

interface RequestBody {
  email: string;
  orderSummary: string;
  grandTotal: string;
  pdfBase64?: string;
}

function buildCustomerHTML(email: string, orderSummary: string, grandTotal: string): string {
  const lines = orderSummary.split('\n').filter((l) => l.trim());
  const itemRows = lines
    .filter((l) => !l.startsWith('Estimated Total'))
    .map((l) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#333;">${l}</td></tr>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr><td style="background:#000000;padding:30px 40px;text-align:center;">
    <h1 style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:1px;">PLAYERSTALL</h1>
    <p style="margin:6px 0 0;font-size:13px;color:#fe5900;letter-spacing:2px;text-transform:uppercase;">Room Planner</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;color:#0d0d0d;">Your Locker Room Plan</h2>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555;">
      Thanks for using the PlayerStall Room Planner! We've attached a PDF copy of your layout below. Our team has also received a copy and will review it to help bring your dream locker room to life.
    </p>

    <!-- Order summary table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
      <tr><td style="background:#fafafa;padding:12px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e8e8e8;">Your Selections</td></tr>
      ${itemRows}
    </table>

    <!-- Grand total -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="padding:12px 16px;background:#fe5900;border-radius:6px;text-align:center;">
          <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">Estimated Total: $${grandTotal}</span>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#555;">
      <strong>What happens next?</strong>
    </p>
    <ol style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.8;color:#555;">
      <li>Our design team reviews your layout and measurements</li>
      <li>We'll reach out within 1-2 business days with a detailed quote</li>
      <li>We'll work with you to finalize colors, accessories, and specs</li>
    </ol>

    <p style="margin:0 0 4px;font-size:14px;color:#555;">📎 <strong>Your room plan PDF is attached to this email.</strong></p>
    <p style="margin:0;font-size:13px;color:#999;">If the attachment didn't come through, just reply to this email and we'll resend it.</p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:0 40px 40px;text-align:center;">
    <a href="https://playerstall.com/room-planner" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;border-radius:6px;letter-spacing:0.5px;text-transform:uppercase;">Back to Room Planner</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1a1a1a;padding:30px 40px;text-align:center;">
    <p style="margin:0 0 8px;font-size:13px;color:#cccccc;font-family:'Helvetica Neue',Arial,sans-serif;">PlayerStall — Custom Sports Lockers Since 1996</p>
    <p style="margin:0 0 4px;font-size:12px;color:#888888;">2934 200 Street, Langley, BC V2Z 2C1 Canada</p>
    <p style="margin:0;font-size:12px;color:#888888;">1-888-584-1444 · <a href="mailto:sales@playerstall.com" style="color:#fe5900;text-decoration:none;">sales@playerstall.com</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildSalesHTML(email: string, orderSummary: string, grandTotal: string): string {
  const lines = orderSummary.split('\n').filter((l) => l.trim());
  const itemRows = lines
    .filter((l) => !l.startsWith('Estimated Total'))
    .map((l) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:14px;">${l}</td></tr>`)
    .join('');

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:6px;padding:30px;margin:0 auto;">
  <tr><td>
    <h2 style="margin:0 0 8px;color:#0d0d0d;">New Room Planner Submission</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#fe5900;font-weight:600;">Customer: ${email}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:4px;margin-bottom:20px;">
      <tr><td style="background:#f8f8f8;padding:10px 12px;font-weight:600;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e8e8e8;">Order Lines</td></tr>
      ${itemRows}
    </table>

    <p style="font-size:18px;font-weight:700;color:#fe5900;margin:0 0 20px;">Estimated Total: $${grandTotal}</p>
    <p style="font-size:13px;color:#888;">The customer's room plan PDF is attached. Reply directly to this email to reach them at <a href="mailto:${email}">${email}</a>.</p>
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
    const { email, orderSummary, grandTotal, pdfBase64 } = req.body as RequestBody;

    if (!email || !orderSummary) {
      return res.status(400).json({ error: 'Missing required fields (email, orderSummary)' });
    }

    const attachments = pdfBase64
      ? [{ filename: 'room-planner-layout.pdf', content: pdfBase64 }]
      : [];

    const customerHTML = buildCustomerHTML(email, orderSummary, grandTotal);
    const salesHTML = buildSalesHTML(email, orderSummary, grandTotal);

    await Promise.all([
      sendEmail(
        token,
        { email, name: 'Room Planner Customer' },
        'Your PlayerStall Room Plan is Ready!',
        customerHTML,
        { email: SALES_EMAIL },
        attachments,
      ),
      sendEmail(
        token,
        { email: SALES_EMAIL, name: 'PlayerStall Sales' },
        `Room Planner Layout Request from ${email}`,
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
