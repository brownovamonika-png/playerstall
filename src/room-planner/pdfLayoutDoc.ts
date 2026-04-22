import { jsPDF } from 'jspdf';
import { ROOM_PLAN_FOOTER_LINES } from '../lib/roomPlanCustomerCopy';
import { drawRoomPlanEmailStylePdfFooter, drawRoomPlanEmailStylePdfHero } from './pdfBranding';
import { ensureBrandFontsLoaded, registerBrandFonts } from './pdfFonts';
import { render } from './render';
import { appendPlanner3DPreviewPage } from './pdfAppend3D';
import { capturePlanner3DDataURL } from './render3d';
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

/** Planner state from saved room JSON (2D camera optional — not used by 3D snapshot). */
function buildPlannerStateFromSavedRoom(
	room: PdfLayoutSavedRoom,
	displayUnit: DisplayUnit,
	offCanvas?: { width: number; height: number },
): PlannerState {
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

	if (offCanvas) {
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
	}

	return tempState;
}

/**
 * Small 3D render of the first saved room for email HTML (matches layout PDF engine).
 * Returns a PNG data URL, or null if WebGL capture fails (email still sends without image).
 */
export async function captureFirstRoom3DEmailPreviewDataUrl(
	savedRooms: PdfLayoutSavedRoom[],
	displayUnit: DisplayUnit,
): Promise<string | null> {
	if (!savedRooms.length) return null;
	const room = savedRooms[0];
	const tempState = buildPlannerStateFromSavedRoom(room, displayUnit);
	return capturePlanner3DDataURL(tempState, {
		width: 560,
		height: 350,
		pixelRatio: 1,
		customLogoDataUrl: room.customLogoDataUrl ?? undefined,
	});
}

/**
 * Landscape pages: per room, top-view floor plan then 3D preview. No pricing tables.
 */
export async function generateLayoutPdfBlob(
	savedRooms: PdfLayoutSavedRoom[],
	displayUnit: DisplayUnit,
): Promise<Blob | null> {
	try {
		/*
		 * Preload Oswald + Yantramanav so the layout PDF matches the live site
		 * typography (same treatment as generateEstimatePdfBlob). If the fetch
		 * fails jsPDF falls back to Helvetica and the PDF still completes —
		 * better than blocking the "send plan" flow on a font asset error.
		 */
		let brandFontsReady = false;
		try {
			await ensureBrandFontsLoaded();
			brandFontsReady = true;
		} catch (err) {
			console.warn('[pdfLayoutDoc] brand fonts unavailable, falling back to Helvetica:', err);
		}

		const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
		if (brandFontsReady) registerBrandFonts(pdf);
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
			const tempState = buildPlannerStateFromSavedRoom(room, displayUnit, offCanvas);

			offCtx.fillStyle = '#fff';
			offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);
			render(offCtx, tempState);
			const imgData = offCanvas.toDataURL('image/png');

			const yBody = drawRoomPlanEmailStylePdfHero(pdf, {
				pageLabel: savedRooms.length > 1 ? `Room ${ri + 1} of ${savedRooms.length}` : undefined,
				headline: roomLabel.toUpperCase(),
				mutedCenter: 'Floor plan (top view)',
				stackMaxWidth: Math.min(480, pageW - 96),
				brandFonts: brandFontsReady,
			});

			const imgTop = yBody + 12;
			const imgW = pageW - margin * 2;
			const imgH = (offCanvas.height / offCanvas.width) * imgW;
			const maxImgH = pageH - imgTop - margin - 36;
			const drawH = Math.min(imgH, maxImgH);
			pdf.addImage(imgData, 'PNG', margin, imgTop, imgW, drawH, undefined, 'NONE');

			drawRoomPlanEmailStylePdfFooter(pdf, ROOM_PLAN_FOOTER_LINES[0], ROOM_PLAN_FOOTER_LINES[1], {
				brandFonts: brandFontsReady,
			});

			await appendPlanner3DPreviewPage(pdf, roomLabel, tempState, room.customLogoDataUrl ?? null, {
				brandFonts: brandFontsReady,
			});
		}

		return pdf.output('blob');
	} catch (e) {
		console.error('generateLayoutPdfBlob failed:', e);
		return null;
	}
}
