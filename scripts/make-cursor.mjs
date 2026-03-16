#!/usr/bin/env node
/**
 * Make cursor image: remove white/near-white background and resize to 32x32.
 * Usage: node scripts/make-cursor.mjs <input.png> [output.png]
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2] || join(__dirname, '../.cursor/projects/Users-monikabrownova-Documents-github-player-stall-December-19-2025/assets/Screenshot_2026-03-16_at_4.41.01_PM-5b19621b-34eb-4c23-8564-c757cb5043b1.png');
const outputPath = process.argv[3] || join(__dirname, '../public/cursor-football.png');

async function main() {
  const img = sharp(inputPath);
  const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  // Make light background (white, off-white, beige) transparent.
  const thresh = 242; // R,G,B >= 242 -> treat as background (catches beige/off-white)
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= thresh && g >= thresh && b >= thresh) {
      data[i + 3] = 0;
    }
  }
  await sharp(Buffer.from(data), { raw: { width, height, channels } })
    .png()
    .resize(32, 32)
    .toFile(outputPath);
  console.log('Wrote', outputPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
