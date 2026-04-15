import { jsPDF } from 'jspdf';
import { drawPlayerStallPdfHeader } from './pdfBranding';
import { render } from './render';
import { appendPlanner3DPreviewPage } from './pdfAppend3D';
import type { DisplayUnit, PlannerState } from './types';
import type { LockerInstance } from './types';

/** Minimal saved-room shape for layout PDF (2D + 3D only). */
export interface PdfLayoutSavedRoom {
	roomName: string;
	needByTimeline?: string;
	fundingStatus?: string;
	sportType: string;
	floorColor: string;
	wallColor: string;
	showBase: boolean;
	baseColor: string;
	edgebandColor?: string;
	customLogoDataUrl: string | null;
	walls: PlannerState['walls'];
	openings: PlannerState['openings'];
	lockers: LockerInstance[];
}

function defaultFloorWall(): { floor: string; wall: string } {
	return { floor: '#8B7355', wall: '#ffffff' };
}

/**
 * Landscape pages: per room, top-view floor plan then 3D preview. No pricing tables.
 */
export async function generateLayoutPdfBlob(
	savedRooms: PdfLayoutSavedRoom[],
	displayUnit: DisplayUnit,
): Promise<Blob | null> {
	try {
		const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
		const pageW = pdf.internal.pageSize.getWidth();
		const pageH = pdf.internal.pageSize.getHeight();
		const margin = 48;
		const offCanvas = document.createElement('canvas');
		offCanvas.width = 2400;
		offCanvas.height = 1600;
		const offCtx = offCanvas.getContext('2d')!;

		for (let ri = 0; ri < savedRooms.length; ri++) {
			if (ri > 0) pdf.addPage('letter', 'landscape');

			const room = savedRooms[ri];
			const roomLabel = room.roomName || `Room ${ri + 1}`;
			const { floor, wall } = defaultFloorWall();

			const tempState: PlannerState = {
				roomName: room.roomName,
				needByTimeline: room.needByTimeline || '',
				fundingStatus: room.fundingStatus || '',
				sportType: (room.sportType || '') as PlannerState['sportType'],
				displayUnit,
				editMode: false,
				camera: { centerX: 0, centerY: 0, pixelsPerInch: 2 },
				walls: JSON.parse(JSON.stringify(room.walls)),
				openings: JSON.parse(JSON.stringify(room.openings)),
				lockers: JSON.parse(JSON.stringify(room.lockers)),
				selection: null,
				floorColor: room.floorColor || floor,
				wallColor: room.wallColor || wall,
				showBase: room.showBase ?? false,
				baseColor: room.baseColor || '#1A1A1A',
				edgebandColor: room.edgebandColor || '',
			};

			let minX = Infinity,
				minY = Infinity,
				maxX = -Infinity,
				maxY = -Infinity;
			for (const w of tempState.walls) {
				minX = Math.min(minX, w.start.x, w.end.x);
				minY = Math.min(minY, w.start.y, w.end.y);
				maxX = Math.max(maxX, w.start.x, w.end.x);
				maxY = Math.max(maxY, w.start.y, w.end.y);
			}
			if (isFinite(minX)) {
				tempState.camera.pixelsPerInch = Math.min(
					(offCanvas.width - 60) / (maxX - minX || 100),
					(offCanvas.height - 60) / (maxY - minY || 100),
				);
				tempState.camera.centerX = (minX + maxX) / 2;
				tempState.camera.centerY = (minY + maxY) / 2;
			}

			offCtx.fillStyle = '#fff';
			offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);
			render(offCtx, tempState);
			const imgData = offCanvas.toDataURL('image/png');

			const yBody = drawPlayerStallPdfHeader(pdf);
			pdf.setFontSize(15);
			pdf.setFont('helvetica', 'bold');
			pdf.setTextColor(0);
			pdf.text(roomLabel, margin, yBody);
			pdf.setFontSize(9);
			pdf.setFont('helvetica', 'normal');
			pdf.setTextColor(100);
			pdf.text('Floor plan (top view)', margin, yBody + 14);
			pdf.setTextColor(0);

			const imgTop = yBody + 22;
			const imgW = pageW - margin * 2;
			const imgH = (offCanvas.height / offCanvas.width) * imgW;
			const maxImgH = pageH - imgTop - margin;
			const drawH = Math.min(imgH, maxImgH);
			pdf.addImage(imgData, 'PNG', margin, imgTop, imgW, drawH, undefined, 'NONE');

			pdf.setFontSize(8);
			pdf.setFont('helvetica', 'italic');
			pdf.setTextColor(180);
			pdf.text('PlayerStall Room Planner - playerstall.com', pageW / 2, pageH - 20, { align: 'center' });
			pdf.setTextColor(0);

			await appendPlanner3DPreviewPage(pdf, roomLabel, tempState, room.customLogoDataUrl ?? null);
		}

		return pdf.output('blob');
	} catch (e) {
		console.error('generateLayoutPdfBlob failed:', e);
		return null;
	}
}
