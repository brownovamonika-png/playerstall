const CANONICAL_SEND_ROOM_PLAN = 'https://www.playerstall.com/api/send-room-plan';

/**
 * Always POST to the production www API for any `playerstall.com` host (apex, www, or subdomain)
 * so the same serverless bundle sends email/PDFs. Preview (`*.vercel.app`) keeps same-origin `/api`.
 * Local dev uses relative `/api`.
 */
export function sendRoomPlanApiUrl(): string {
	if (typeof window === 'undefined') return '/api/send-room-plan';
	const h = window.location.hostname;
	if (h === 'localhost' || h === '127.0.0.1') return '/api/send-room-plan';
	if (h.endsWith('.vercel.app')) return '/api/send-room-plan';
	if (h === 'playerstall.com' || h.endsWith('.playerstall.com')) return CANONICAL_SEND_ROOM_PLAN;
	return '/api/send-room-plan';
}
