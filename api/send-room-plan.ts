import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildCustomerHTML, buildSalesHTML } from '../src/lib/roomPlanEmailTemplates';

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || 'team@playerstall.com';
const FROM_NAME = 'PlayerStall Room Planner';
const SALES_EMAIL = 'team@playerstall.com';

interface RequestBody {
  email: string;
  orderSummary: string;
  grandTotal: string;
  /** @deprecated Single combined PDF; prefer estimatePdfBase64 + layoutPdfBase64 */
  pdfBase64?: string;
  estimatePdfBase64?: string;
  layoutPdfBase64?: string;
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
    const { email, orderSummary, grandTotal, pdfBase64, estimatePdfBase64, layoutPdfBase64 } =
      req.body as RequestBody;

    if (!email || !orderSummary) {
      return res.status(400).json({ error: 'Missing required fields (email, orderSummary)' });
    }

    const attachments: { filename: string; content: string }[] = [];
    if (estimatePdfBase64) {
      attachments.push({ filename: 'PlayerStall-Room-Estimate.pdf', content: estimatePdfBase64 });
    }
    if (layoutPdfBase64) {
      attachments.push({ filename: 'PlayerStall-Room-Layout.pdf', content: layoutPdfBase64 });
    }
    if (attachments.length === 0 && pdfBase64) {
      attachments.push({ filename: 'room-planner-layout.pdf', content: pdfBase64 });
    }

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
