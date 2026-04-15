import { jsPDF } from 'jspdf';
import { drawPlayerStallPdfHeader } from './pdfBranding';
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
	if (!data3d) return;

	pdf.addPage('letter', 'landscape');
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const margin = 48;

	const yBody = drawPlayerStallPdfHeader(pdf);
	pdf.setFontSize(14);
	pdf.setFont('helvetica', 'bold');
	pdf.setTextColor(0);
	pdf.text(`${roomLabel} - 3D preview`, margin, yBody);
	pdf.setFontSize(8);
	pdf.setFont('helvetica', 'italic');
	pdf.setTextColor(100);
	pdf.text(
		'Share with boosters, administrators, or donors for fundraising and approvals.',
		margin,
		yBody + 14,
	);
	pdf.setTextColor(0);
	pdf.setFont('helvetica', 'normal');

	const maxImgW = pageW - margin * 2;
	const maxImgH = pageH - (yBody + 22) - margin;
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

	pdf.setFontSize(7);
	pdf.setFont('helvetica', 'italic');
	pdf.setTextColor(180);
	pdf.text('PlayerStall Room Planner - playerstall.com', pageW / 2, pageH - 16, { align: 'center' });
	pdf.setTextColor(0);
}
