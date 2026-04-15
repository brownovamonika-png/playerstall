import type { APIRoute } from 'astro';
import { ROOM_PLAN_INTRO } from '../../lib/roomPlanCustomerCopy';
import { buildCustomerHTML, buildSalesHTML } from '../../lib/roomPlanEmailTemplates';

/** Server route — bundled with Astro on Vercel (root `api/` was missing traced deps → FUNCTION_INVOCATION_FAILED). */
export const prerender = false;

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || 'team@playerstall.com';
const FROM_NAME = 'PlayerStall';
const SALES_EMAIL = 'team@playerstall.com';

/** Plain-text part must carry the same planner data as HTML/PDFs — many clients show this snippet first. */
function roomPlanEmailPlainText(email: string, grandTotal: string, orderSummary: string): string {
	const intro = ROOM_PLAN_INTRO.replace(/\s+/g, ' ').trim();
	const raw = orderSummary.trim();
	const maxLen = 56000;
	const summary = raw.length > maxLen ? `${raw.slice(0, maxLen)}\n\n[… message truncated …]` : raw;
	return [
		'PLAYERSTALL — Review your layout',
		'',
		'This email includes a full HTML version (PLAYERSTALL header, your selections, and order table). Use your app’s HTML / rich view to see that layout; the section below is the same data in plain text.',
		'',
		intro,
		'',
		'YOUR PLANNER SUMMARY (same as HTML + estimate PDF)',
		'----------------------------------------',
		summary,
		'----------------------------------------',
		'',
		`Estimated total: $${grandTotal}`,
		`Your email: ${email}`,
		'',
		'Attachments when generated from the planner:',
		'  • PlayerStall-Room-Estimate.pdf — pricing and selections',
		'  • PlayerStall-Room-Layout.pdf — floor plan and 3D',
		'',
		'Questions: team@playerstall.com',
	].join('\n');
}

interface RequestBody {
	email: string;
	orderSummary: string;
	grandTotal: string;
	/** @deprecated Single combined PDF; prefer estimatePdfBase64 + layoutPdfBase64 */
	pdfBase64?: string;
	estimatePdfBase64?: string;
	layoutPdfBase64?: string;
	/** Optional PNG data URL from `captureFirstRoom3DEmailPreviewDataUrl` (embedded in HTML emails). */
	layoutPreviewDataUrl?: string;
}

async function sendEmail(
	token: string,
	to: { email: string; name?: string },
	subject: string,
	html: string,
	text: string,
	replyTo?: { email: string },
	attachments?: { filename: string; content: string }[],
) {
	const payload: Record<string, unknown> = {
		from: { email: FROM_EMAIL, name: FROM_NAME },
		to: [to],
		subject,
		html,
		text,
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

export const POST: APIRoute = async ({ request }) => {
	const token = process.env.MAILERSEND_API_TOKEN;
	if (!token) {
		console.error('MAILERSEND_API_TOKEN not configured');
		return new Response(JSON.stringify({ error: 'Email service not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const body = (await request.json()) as RequestBody;
		const { email, orderSummary, grandTotal, pdfBase64, estimatePdfBase64, layoutPdfBase64, layoutPreviewDataUrl } =
			body;

		if (!email || !orderSummary) {
			return new Response(JSON.stringify({ error: 'Missing required fields (email, orderSummary)' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
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

		const customerHTML = buildCustomerHTML(email, orderSummary, grandTotal, layoutPreviewDataUrl);
		const salesHTML = buildSalesHTML(email, orderSummary, grandTotal, layoutPreviewDataUrl);
		const customerText = roomPlanEmailPlainText(email, grandTotal, orderSummary);
		const salesText = [
			`New room planner submission from ${email}`,
			'',
			'Use the HTML view in your inbox for the designed layout (same data as below).',
			'',
			customerText,
		].join('\n');

		await Promise.all([
			sendEmail(
				token,
				{ email, name: 'Room Planner Customer' },
				'Review your layout — PlayerStall (PDFs attached)',
				customerHTML,
				customerText,
				{ email: SALES_EMAIL },
				attachments,
			),
			sendEmail(
				token,
				{ email: SALES_EMAIL, name: 'PlayerStall Sales' },
				`New layout submission — ${email}`,
				salesHTML,
				salesText,
				{ email },
				attachments,
			),
		]);

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('send-room-plan error:', message);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
