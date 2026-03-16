/**
 * Remove black background from stick-rack.png: make dark pixels transparent.
 * Run: node scripts/remove-stick-rack-bg.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const inputPath = path.join(projectRoot, 'public/images/stick-rack.png');
const tmpPath = path.join(projectRoot, 'public/images/stick-rack.tmp.png');

// Pixels with R,G,B all below this are treated as background (made transparent)
const BLACK_THRESHOLD = 45;

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const n = width * height * channels;

  for (let i = 0; i < n; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(tmpPath);

  fs.renameSync(tmpPath, inputPath);
  console.log('Done: background removed from public/images/stick-rack.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
