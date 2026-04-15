import { jsPDF } from 'jspdf';
import { ROOM_PLAN_FOOTER_LINES } from '../lib/roomPlanCustomerCopy';
import { drawRoomPlanEmailStylePdfFooter, drawRoomPlanEmailStylePdfHero } from './pdfBranding';
import type { PlannerState } from './types';
import { capturePlanner3DDataURL } from './render3d';

const SNAP_W = 1920;
const SNAP_H = 1200;

/** Adds a landscape page with a 3D render (for fundraising / sharing). */
export async function appendPlanner3DPreviewPage(
	pdf: InstanceType<typeof jsPDF>,
	roomLabel: string,
	tempState: PlannerState,
	customLogoDataUrl: string | null | undefined,
): Promise<void> {
	const data3d = await capturePlanner3DDataURL(tempState, {
		width: SNAP_W,
		height: SNAP_H,
		customLogoDataUrl: customLogoDataUrl ?? undefined,
		pixelRatio: 2,
	});
	pdf.addPage('letter', 'landscape');
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const margin = 48;

	const yBody = drawRoomPlanEmailStylePdfHero(pdf, {
		headline: `${roomLabel.toUpperCase()} — 3D PREVIEW`,
		mutedCenter:
			'Share with boosters, administrators, or donors for fundraising and approvals.',
		stackMaxWidth: Math.min(480, pageW - 96),
	});

	if (data3d) {
		const maxImgW = pageW - margin * 2;
		const maxImgH = pageH - (yBody + 22) - margin - 36;
		const aspect = SNAP_H / SNAP_W;
		let imgW = maxImgW;
		let imgH = imgW * aspect;
		if (imgH > maxImgH) {
			imgH = maxImgH;
			imgW = imgH / aspect;
		}
		const xCentered = margin + (maxImgW - imgW) / 2;
		const imgTop = yBody + 22;
		pdf.addImage(data3d, 'PNG', xCentered, imgTop, imgW, imgH, undefined, 'NONE');
	} else {
		pdf.setFontSize(10);
		pdf.setFont('helvetica', 'normal');
		pdf.setTextColor(80);
		const msg =
			'We could not render a 3D snapshot in this browser session. Open the PlayerStall room planner, use 3D View for this room, and use Save — or contact team@playerstall.com and we will send layout images.';
		const lines = pdf.splitTextToSize(msg, pageW - margin * 2) as string[];
		pdf.text(lines, margin, yBody + 28);
	}

	drawRoomPlanEmailStylePdfFooter(pdf, ROOM_PLAN_FOOTER_LINES[0], ROOM_PLAN_FOOTER_LINES[1]);
}
