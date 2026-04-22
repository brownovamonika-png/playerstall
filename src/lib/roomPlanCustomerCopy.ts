/**
 * Shared wording for room-plan flows: single-page Locker Room Planner (/room-planner),
 * step-by-step planner review (/new-room-planner/review), customer email, and estimate PDF.
 * See roomPlanEmailTemplates + pdfEstimate + planner pages.
 */

/** Hero intro under "Review your layout" */
export const ROOM_PLAN_INTRO =
	"You've turned ideas into a real layout across your rooms. We've attached two PDFs: a polished project estimate with full line-by-line pricing, and a share-ready layout pack with floor plans and 3D views for donors, leadership, or your next meeting. We're thrilled to pick up from here with you and help turn this plan into the locker room your team deserves.";

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

/** Customer email only — full product table lives in PlayerStall-Room-Estimate.pdf (avoids duplicating the PDF in HTML). */
export const ROOM_PLAN_EMAIL_COMPACT_PANEL_HEADING = 'Your estimate at a glance';

/** Customer email — under totals; tells them the PDFs are the canonical detail. */
export const ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE =
	'Line-by-line lockers, options, shipping notes, and any delivery timing or funding details you entered are in the attached PlayerStall-Room-Estimate.pdf. Floor plans and 3D views for each room are in PlayerStall-Room-Layout.pdf.';

/** Team email — same compact panel; PDFs match what the customer received. */
export const ROOM_PLAN_EMAIL_COMPACT_PDF_NOTE_TEAM =
	'Full line-by-line lockers, options, timing, funding, and totals are in the attached PlayerStall-Room-Estimate.pdf (same file sent to the customer). Floor plans and 3D views are in PlayerStall-Room-Layout.pdf.';

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

/** Centered bold sub-headline under the PLAYERSTALL wordmark. Customer + team variants share the same visual treatment. */
export const ROOM_PLAN_CUSTOMER_HEADLINE = 'Review your layout';
export const ROOM_PLAN_TEAM_HEADLINE = 'New room planner submission';

/** Team email hero (under main title). */
export const ROOM_PLAN_TEAM_INTRO =
	'Internal copy for the team — same layout as the customer email. Use the customer address and order summary below to follow up; both PDFs are attached to this message.';

/** Section heading above the timing + funding rows in both email and PDF. */
export const ROOM_PLAN_SELECTIONS_HEADING = 'Your selections';
export const ROOM_PLAN_SELECTIONS_TIMING_LABEL = 'Preferred delivery timing';
export const ROOM_PLAN_SELECTIONS_FUNDING_LABEL = 'Funding / budget';

/** Team-email "Customer" strip (between Your Selections and Order Summary). */
export const ROOM_PLAN_TEAM_CUSTOMER_HEADING = 'Customer';

/** Team email note box (attachments strip). */
export const ROOM_PLAN_TEAM_NOTE =
	"Both PDFs match the customer's attachments (estimate + layout). Reply directly to this email to reach the customer.";
