/**
 * Writes room-plan customer + team HTML (same builders as /dev/email-preview-room-plan)
 * and a sample estimate PDF to ./email-export/ on your machine.
 *
 * Usage: npm run email:export-preview
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	buildCustomerHTML,
	buildSalesHTML,
	SAMPLE_ORDER_SUMMARY,
} from '../src/lib/roomPlanEmailTemplates';
import { generateEstimatePdfBlob } from '../src/room-planner/pdfEstimate';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const outDir = join(root, 'email-export');

const sampleEmail = 'you@example.com';
const sampleTotal = '5908.00';

/** Matches SAMPLE_ORDER_SUMMARY product line */
const sampleEstimateLines = [
	{
		roomName: 'DEAN',
		displayName: 'Model S',
		widthIn: 24,
		depthIn: 19,
		colorLabel: 'Marigold',
		accessories: [] as { label: string; price: number }[],
		unitPrice: 844,
		qty: 7,
	},
];

async function main() {
	mkdirSync(outDir, { recursive: true });

	const customerPath = join(outDir, 'room-plan-customer-email.html');
	const teamPath = join(outDir, 'room-plan-team-email.html');
	const estimatePath = join(outDir, 'PlayerStall-Room-Estimate-sample.pdf');

	writeFileSync(customerPath, buildCustomerHTML(sampleEmail, SAMPLE_ORDER_SUMMARY, sampleTotal), 'utf8');
	writeFileSync(teamPath, buildSalesHTML(sampleEmail, SAMPLE_ORDER_SUMMARY, sampleTotal), 'utf8');

	const estimateBlob = generateEstimatePdfBlob(
		sampleEstimateLines,
		sampleEmail,
		5908,
		SAMPLE_ORDER_SUMMARY,
	);
	if (estimateBlob) {
		const buf = Buffer.from(await estimateBlob.arrayBuffer());
		writeFileSync(estimatePath, buf);
	} else {
		console.warn('Estimate PDF was not generated (see console errors above).');
	}

	console.log('Exported to:', outDir);
	console.log('  ', customerPath);
	console.log('  ', teamPath);
	if (estimateBlob) console.log('  ', estimatePath);
	console.log('\nOpen the HTML files in Chrome/Safari, or from Terminal: open "' + outDir + '"');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
