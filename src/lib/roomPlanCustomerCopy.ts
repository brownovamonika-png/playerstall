/**
 * Shared wording for room-plan flows: single-page Locker Room Planner (/room-planner),
 * step-by-step planner review (/new-room-planner/review), customer email, and estimate PDF.
 * See roomPlanEmailTemplates + pdfEstimate + planner pages.
 */

/** Hero intro under "Review your layout" */
export const ROOM_PLAN_INTRO =
	"You've turned ideas into a real layout across your rooms. Submit and we'll email you two PDFs: a polished project estimate with pricing, and a share-ready layout pack with floor plans and 3D views for donors, leadership, or your next meeting. We're thrilled to pick up from here with you and help turn this plan into the locker room your team deserves.";

/** Shown beside order totals (review page, emails, estimate PDF) — two lines. */
export const ROOM_PLAN_SHIPPING_LINES = [
	"Shipping isn't included in this estimate.",
	"We'll add shipping to your final order once we've agreed on everything with you.",
] as const;

/** Muted note under the primary submit CTA (all planner review UIs). */
export const ROOM_PLAN_SUBMIT_DISCLAIMER =
	"We'll send a copy of your layout to your email and to our team so we can help you execute on your dream locker room.";

/** Email-only: heading above optional inline 3D snapshot (first room). */
export const ROOM_PLAN_EMAIL_3D_PREVIEW_TITLE = 'Your 3D preview';

/** Email-only: explains snapshot vs layout PDF. */
export const ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB =
	'First room at a snapshot angle — your attached layout PDF includes a full-size 3D page per room (same renderer as the planner).';

export const ROOM_PLAN_EMAIL_3D_PREVIEW_ALT = '3D preview of your locker room';

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
