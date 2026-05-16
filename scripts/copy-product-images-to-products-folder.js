/**
 * copy-product-images-to-products-folder.js
 *
 * Copies product studio shots from images/customer-lockers/ → images/products/
 * No deletions — originals are left in place until all page/blog links are updated.
 *
 * Run: node scripts/copy-product-images-to-products-folder.js
 * Requires BUNNY_STORAGE_ACCESS_KEY + BUNNY_STORAGE_HOST + BUNNY_STORAGE_ZONE_NAME in .env
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

// Parse .env manually (no dotenv dependency required)
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const ACCESS_KEY = env.BUNNY_STORAGE_ACCESS_KEY;
const HOST = env.BUNNY_STORAGE_HOST;          // e.g. ny.storage.bunnycdn.com
const ZONE = env.BUNNY_STORAGE_ZONE_NAME;     // e.g. playerstall-images

const SOURCE_DIR = 'images/customer-lockers';
const DEST_DIR   = 'images/products';

// ---------------------------------------------------------------------------
// Files to copy
// Edit this list to add / remove files before running.
// ---------------------------------------------------------------------------

const FILES_TO_COPY = [
  // ── Model S (Stadium Locker) — Black ──────────────────────────────────────
  'S black front.jpg',
  'S black front base.jpg',
  'S black left side.jpg',
  'S black right side.jpg',
  'S black side view.jpg',

  // ── Model X — Dark Grey ───────────────────────────────────────────────────
  'X dark grey front.jpg',
  'X dark grey front base.jpg',
  'X dark grey front base (1).jpg',
  'X dark grey left side.jpg',
  'X dark grey right side.jpg',
  'X dark grey side view.jpg',

  // ── Model X — Light Grey ──────────────────────────────────────────────────
  'X light grey front.jpg',
  'X light grey front base.jpg',
  'X light grey front cuhsion.jpg',       // note: typo in original filename kept intentionally
  'X light grey front open seat.jpg',
  'X light grey base open seat.jpg',
  'X light grey left side.jpg',
  'X light grey right side .jpg',         // note: trailing space in original filename kept intentionally
  'X light grey side view.jpg',

  // ── Model Z — Dark Grey ───────────────────────────────────────────────────
  'Z dark grey front.jpg',
  'Z dark grey front base.jpg',
  'Z dark grey front cushion.jpg',
  'Z dark grey front cushion (1).jpg',
  'Z dark grey front open seat.jpg',
  'Z dark grey left side.jpg',
  'Z dark grey right side.jpg',
  'Z dark grey side view.jpg',

  // ── Bench ─────────────────────────────────────────────────────────────────
  'bench front.jpg',
  'bench front front (1).jpg',
  'bench side view.jpg',

  // ── Cushion / Seat Details ────────────────────────────────────────────────
  'black cushion front view.jpg',
  'black cushion side view.jpg',
  'black cushion seam view.jpg',

  // ── Lock Boxes ────────────────────────────────────────────────────────────
  'lock box black.jpg',
  'lock box blue.jpg',
  'lock box light grey.jpg',

  // ── Accessories ───────────────────────────────────────────────────────────
  'StickRack.jpg',

  // ── Multi-locker / General Product Shots ─────────────────────────────────
  'four-lockers.jpg',
  'four-lockers-1.jpg',
  'three-lockers.jpg',
  'lockers-portrait.jpg',
  'lockers-red-black.jpg',
  'sports-lockers-red-white.jpg',
  'quality-wood.jpg',
  'playerstall-sports-locker.png',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function bunnyUrl(path) {
  return `https://${HOST}/${ZONE}/${path}`;
}

async function copyFile(filename) {
  const srcUrl  = bunnyUrl(`${SOURCE_DIR}/${encodeURIComponent(filename)}`);
  const destUrl = bunnyUrl(`${DEST_DIR}/${encodeURIComponent(filename)}`);

  // 1. Download
  const getRes = await fetch(srcUrl, {
    headers: { AccessKey: ACCESS_KEY },
  });

  if (!getRes.ok) {
    throw new Error(`GET failed (${getRes.status}): ${srcUrl}`);
  }

  const buffer = await getRes.arrayBuffer();

  // 2. Upload to destination
  const putRes = await fetch(destUrl, {
    method: 'PUT',
    headers: {
      AccessKey: ACCESS_KEY,
      'Content-Type': getRes.headers.get('content-type') || 'application/octet-stream',
    },
    body: buffer,
  });

  if (!putRes.ok) {
    const body = await putRes.text().catch(() => '');
    throw new Error(`PUT failed (${putRes.status}): ${destUrl}\n  ${body}`);
  }

  return buffer.byteLength;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const WIDTH = 55;

console.log(`\nBunny CDN — copy product images`);
console.log(`  Source : ${SOURCE_DIR}/`);
console.log(`  Dest   : ${DEST_DIR}/`);
console.log(`  Files  : ${FILES_TO_COPY.length}\n`);

let ok = 0, fail = 0, totalBytes = 0;

for (const filename of FILES_TO_COPY) {
  const label = filename.length > WIDTH ? filename.slice(0, WIDTH - 1) + '…' : filename.padEnd(WIDTH);
  process.stdout.write(`  ${label} `);

  try {
    const bytes = await copyFile(filename);
    const kb = (bytes / 1024).toFixed(0);
    console.log(`✓  ${kb} KB`);
    ok++;
    totalBytes += bytes;
  } catch (err) {
    console.log(`✗  ${err.message}`);
    fail++;
  }
}

console.log(`\n  Done: ${ok} copied, ${fail} failed  (${(totalBytes / 1024 / 1024).toFixed(1)} MB transferred)\n`);
