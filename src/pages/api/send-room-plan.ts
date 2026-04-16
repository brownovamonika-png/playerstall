import type { APIRoute } from 'astro';
import {
	ROOM_PLAN_ATTACHMENTS_NOTE,
	ROOM_PLAN_ATTACHMENT_FILES_DESC,
	ROOM_PLAN_INTRO,
	ROOM_PLAN_SHIPPING_LINES,
	ROOM_PLAN_TEAM_INTRO,
	ROOM_PLAN_TEAM_NOTE,
} from '../../lib/roomPlanCustomerCopy';
import { buildCustomerHTML, buildSalesHTML } from '../../lib/roomPlanEmailTemplates';
import { extractPlannerMetaFromOrderSummary } from '../../lib/roomPlanOrderSummaryParse';

/** Server route — bundled with Astro on Vercel (root `api/` was missing traced deps → FUNCTION_INVOCATION_FAILED). */
export const prerender = false;

/** Allow browser POST from dev, any https playerstall.com host, and Vercel previews. */
function allowedCorsOrigin(origin: string | null): string | null {
	if (!origin) return null;
	try {
		const u = new URL(origin);
		const { protocol, hostname } = u;
		if (protocol === 'http:' && (hostname === 'localhost' || hostname === '127.0.0.1')) return origin;
		if (protocol !== 'https:') return null;
		if (hostname === 'playerstall.com' || hostname.endsWith('.playerstall.com')) return origin;
		if (hostname.endsWith('.vercel.app')) return origin;
		return null;
	} catch {
		return null;
	}
}

function applyCors(request: Request, headers: Headers): void {
	const origin = request.headers.get('Origin');
	const allowed = allowedCorsOrigin(origin);
	if (allowed) {
		headers.set('Access-Control-Allow-Origin', allowed);
		headers.append('Vary', 'Origin');
		headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');
		headers.set('Access-Control-Max-Age', '86400');
	}
}

function finalizeApiHeaders(request: Request, headers: Headers): void {
	applyCors(request, headers);
	headers.set('Cache-Control', 'no-store, must-revalidate');
	headers.set('Pragma', 'no-cache');
}

export const OPTIONS: APIRoute = async ({ request }) => {
	const headers = new Headers();
	finalizeApiHeaders(request, headers);
	return new Response(null, { status: 204, headers });
};

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL || 'team@playerstall.com';
const FROM_NAME = 'PlayerStall';
const SALES_EMAIL = 'team@playerstall.com';

/** Plain text for customer and team — short; line-by-line detail is in the PDFs (same as HTML). */
function roomPlanCompactPlainText(forTeam: boolean, email: string, grandTotal: string, orderSummary: string): string {
	const intro = (forTeam ? ROOM_PLAN_TEAM_INTRO : ROOM_PLAN_INTRO).replace(/\s+/g, ' ').trim();
	const title = forTeam ? 'PLAYERSTALL — New room planner submission' : 'PLAYERSTALL — Review your layout';
	const htmlHint = forTeam
		? 'The HTML version is a short summary; the attached PDFs have the full breakdown (same files the customer received).'
		: 'The HTML version is a short summary; your attached PDFs have the full breakdown.';
	const { timingLines, fundingLines } = extractPlannerMetaFromOrderSummary(orderSummary);
	const lines: string[] = [
		title,
		'',
		htmlHint,
		'',
		intro,
		'',
		`Estimated total: $${grandTotal}`,
		forTeam ? `Customer email: ${email}` : `Your email: ${email}`,
		'',
	];
	if (timingLines.length) {
		lines.push('Preferred delivery timing:', ...timingLines.map((l) => `  • ${l}`), '');
	}
	if (fundingLines.length) {
		lines.push('Funding / budget:', ...fundingLines.map((l) => `  • ${l}`), '');
	}
	lines.push(
		`Attachments: ${ROOM_PLAN_ATTACHMENT_FILES_DESC}`,
		forTeam ? ROOM_PLAN_TEAM_NOTE : ROOM_PLAN_ATTACHMENTS_NOTE,
		'',
		...ROOM_PLAN_SHIPPING_LINES.map((l) => `• ${l}`),
		'',
		'Questions: team@playerstall.com',
	);
	return lines.join('\n');
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
		const headers = new Headers({ 'Content-Type': 'application/json' });
		finalizeApiHeaders(request, headers);
		return new Response(JSON.stringify({ error: 'Email service not configured' }), {
			status: 500,
			headers,
		});
	}

	try {
		const body = (await request.json()) as RequestBody;
		const { email, orderSummary, grandTotal, pdfBase64, estimatePdfBase64, layoutPdfBase64, layoutPreviewDataUrl } =
			body;

		if (!email || !orderSummary) {
			const headers = new Headers({ 'Content-Type': 'application/json' });
			finalizeApiHeaders(request, headers);
			return new Response(JSON.stringify({ error: 'Missing required fields (email, orderSummary)' }), {
				status: 400,
				headers,
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
		const customerText = roomPlanCompactPlainText(false, email, grandTotal, orderSummary);
		const salesText = [
			`New room planner submission from ${email}`,
			'',
			'Use the HTML view in your inbox — same compact layout as the customer; full detail is in the PDFs below.',
			'',
			roomPlanCompactPlainText(true, email, grandTotal, orderSummary),
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

		console.info('[send-room-plan] MailerSend ok', { roomPlanEmailVersion: 'v2-html-compact' });

		const okHeaders = new Headers({
			'Content-Type': 'application/json',
			'X-PlayerStall-Room-Plan-Email': 'v2-html-compact',
		});
		finalizeApiHeaders(request, okHeaders);
		return new Response(JSON.stringify({ ok: true, roomPlanEmailVersion: 'v2-html-compact' }), {
			status: 200,
			headers: okHeaders,
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('send-room-plan error:', message);
		const errHeaders = new Headers({ 'Content-Type': 'application/json' });
		finalizeApiHeaders(request, errHeaders);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: errHeaders,
		});
	}
};
