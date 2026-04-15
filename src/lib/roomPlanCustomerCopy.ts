/**
 * Shared wording for the room-plan customer email and the estimate PDF
 * so both stay in sync (see roomPlanEmailTemplates + pdfEstimate).
 */

/** Hero intro under "Review your layout" */
export const ROOM_PLAN_INTRO =
	"Here's everything you've configured across all your rooms. When you submit, you'll get two PDFs by email: a polished project estimate with pricing, and a layout pack with floor plans plus 3D views for fundraising or sharing. We'll help you bring it to life.";

export const ROOM_PLAN_WHAT_NEXT_HEADING = 'What happens next?';

export const ROOM_PLAN_WHAT_NEXT_STEPS = [
	'Our design team reviews your layout and measurements',
	"We'll reach out within 1-2 business days with a detailed quote",
	"We'll work with you to finalize colors, accessories, and specs",
] as const;

/** File names + roles (used in PDF plain text and email HTML). */
export const ROOM_PLAN_ATTACHMENT_FILES_DESC =
	'PlayerStall-Room-Estimate.pdf (pricing) and PlayerStall-Room-Layout.pdf (plans + 3D).';

export const ROOM_PLAN_ATTACHMENTS_NOTE =
	"If an attachment didn't come through, reply to this email and we'll resend it.";

/** PDF variant (no “this email”); same intent */
export const ROOM_PLAN_ATTACHMENTS_NOTE_PDF =
	"If a file is missing, contact team@playerstall.com and we'll send it again.";

export const ROOM_PLAN_CTA_LABEL = 'Back to room planner';

export const ROOM_PLAN_CTA_URL = 'https://playerstall.com/new-room-planner/review';

export const ROOM_PLAN_FOOTER_LINES = [
	'PlayerStall · 2934 200 Street, Langley, BC V2Z 2C1 Canada',
	'1-888-584-1444 · team@playerstall.com · playerstall.com',
] as const;

/** Team email hero (under main title). */
export const ROOM_PLAN_TEAM_INTRO =
	'Internal copy for the team — same layout as the customer email. Use the customer address and order summary below to follow up; both PDFs are attached to this message.';

/** Team email note box (after order table). */
export const ROOM_PLAN_TEAM_NOTE =
	'Both PDFs are attached (estimate + layout). Reply directly to this email to reach the customer.';
