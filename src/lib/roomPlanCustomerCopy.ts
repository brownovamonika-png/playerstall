/**
 * Shared wording for room-plan flows: Locker Room Planner (/room-planner),
 * customer email, and estimate PDF.
 * See roomPlanEmailTemplates + pdfEstimate + planner pages.
 */

/** Hero intro under "Review your layout" */
export const ROOM_PLAN_INTRO =
	"You've turned ideas into a real layout across your rooms. Your project estimate PDF — with the 3D view and full line-by-line pricing — was saved to your device when you submitted, ready to share with donors, leadership, or your next meeting. We're thrilled to pick up from here with you and help turn this plan into the locker room your team deserves.";

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

/** Email-only: explains snapshot below the heading. */
export const ROOM_PLAN_EMAIL_3D_PREVIEW_BLURB =
	'First room at a snapshot angle, captured from the planner. The same image is at the top of the estimate PDF saved to your device.';

export const ROOM_PLAN_EMAIL_3D_PREVIEW_ALT = '3D preview of your locker room';

/** Customer email only — full product table lives in PlayerStall-Room-Estimate.pdf (saved to the customer's device on submit). */
export const ROOM_PLAN_EMAIL_COMPACT_PANEL_HEADING = 'Your estimate at a glance';

/** Customer email — under totals; tells them the PDF saved on submit is the canonical detail. */
export const ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE =
	'Line-by-line lockers, options, shipping notes, and any delivery timing or funding details you entered are in PlayerStall-Room-Estimate.pdf, which was downloaded to your device when you submitted. Reply to this email if you need us to send it again.';

/** Team email — same compact panel; customer keeps their own copy. */
export const ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE_TEAM =
	'Full line-by-line lockers, options, timing, funding, and totals live in PlayerStall-Room-Estimate.pdf, which downloaded to the customer’s device on submit. Reply directly to this email if you need them to send it back to you.';

export const ROOM_PLAN_WHAT_NEXT_HEADING = 'What happens next?';

export const ROOM_PLAN_WHAT_NEXT_STEPS = [
	'Our design team reviews your layout and measurements',
	"We'll reach out within 1-2 business days with a detailed quote",
	"We'll work with you to finalize colors, accessories, and specs",
] as const;

/** File name (downloaded to the customer's device on submit — not emailed). */
export const ROOM_PLAN_ATTACHMENT_FILES_DESC =
	'PlayerStall-Room-Estimate.pdf (3D view, pricing, and your selections) was saved to your device when you submitted.';

export const ROOM_PLAN_ATTACHMENTS_NOTE =
	"If you can't find the PDF on your device, reply to this email and we'll send another copy.";

/** PDF variant (no “this email”); same intent */
export const ROOM_PLAN_ATTACHMENTS_NOTE_PDF =
	"If a file is missing, contact team@playerstall.com and we'll send it again.";

export const ROOM_PLAN_CTA_LABEL = 'Back to room planner';

export const ROOM_PLAN_CTA_URL = 'https://playerstall.com/room-planner';

export const ROOM_PLAN_FOOTER_LINES = [
	'PlayerStall · 2934 200 Street, Langley, BC V2Z 2C1 Canada',
	'1-888-584-1444 · team@playerstall.com · playerstall.com',
] as const;

/** Centered bold sub-headline under the PLAYERSTALL wordmark. Customer + team variants share the same visual treatment. */
export const ROOM_PLAN_CUSTOMER_HEADLINE = 'Review your layout';
export const ROOM_PLAN_TEAM_HEADLINE = 'New room planner submission';

/** Team email hero (under main title). */
export const ROOM_PLAN_TEAM_INTRO =
	"Internal copy for the team — same layout as the customer email. Use the customer address and order summary below to follow up. The customer's PDF estimate downloaded to their device on submit; ask them to send it back if you need a copy.";

/** Section heading above the timing + funding rows in both email and PDF. */
export const ROOM_PLAN_SELECTIONS_HEADING = 'Your selections';
export const ROOM_PLAN_SELECTIONS_TIMING_LABEL = 'Preferred delivery timing';
export const ROOM_PLAN_SELECTIONS_FUNDING_LABEL = 'Funding / budget';

/** Team-email "Customer" strip (between Your Selections and Order Summary). */
export const ROOM_PLAN_TEAM_CUSTOMER_HEADING = 'Customer';

/** Team email note box (downloaded-on-submit strip). */
export const ROOM_PLAN_TEAM_NOTE =
	"The customer's PlayerStall-Room-Estimate.pdf was downloaded to their device on submit (not emailed). Reply directly to this email to reach them.";
