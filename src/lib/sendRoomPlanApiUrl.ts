/**
 * Apex `playerstall.com` can resolve `/api/send-room-plan` to a different stack or cache
 * than `www.playerstall.com`. Use the canonical www origin for POSTs from the bare domain.
 */
export function sendRoomPlanApiUrl(): string {
	if (typeof window === 'undefined') return '/api/send-room-plan';
	const h = window.location.hostname;
	if (h === 'localhost' || h === '127.0.0.1') return '/api/send-room-plan';
	if (h.endsWith('.vercel.app')) return '/api/send-room-plan';
	if (h === 'playerstall.com') return 'https://www.playerstall.com/api/send-room-plan';
	return '/api/send-room-plan';
}
