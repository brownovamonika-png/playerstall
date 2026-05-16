#!/usr/bin/env node
/**
 * Lists files in the Bunny Edge Storage `images/` folder (root only — no recursion).
 * Run: node --env-file=.env scripts/list-bunny-images-root.mjs
 *
 * Requires: BUNNY_STORAGE_ZONE_NAME, BUNNY_STORAGE_READ_ONLY_KEY or BUNNY_STORAGE_ACCESS_KEY
 * BUNNY_STORAGE_HOST must be the Storage API host from Storage → zone → FTP & API
 * (e.g. ny.storage.bunnycdn.com), not the CDN hostname (*.b-cdn.net).
 */

const STORAGE_HOST_CANDIDATES = [
  'ny.storage.bunnycdn.com',
  'la.storage.bunnycdn.com',
  'storage.bunnycdn.com',
  'uk.storage.bunnycdn.com',
  'sg.storage.bunnycdn.com',
  'se.storage.bunnycdn.com',
  'br.storage.bunnycdn.com',
  'jh.storage.bunnycdn.com',
  'syd.storage.bunnycdn.com',
];

function normalizeConfiguredHost(raw) {
  if (!raw) return null;
  const h = raw.replace(/^https?:\/\//, '');
  if (/\.b-cdn\.net$/i.test(h)) return null;
  return h;
}

async function listImagesFolder(host, zone, accessKey) {
  const url = `https://${host}/${zone}/images/`;
  const res = await fetch(url, {
    headers: { AccessKey: accessKey },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${url} → ${res.status} ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Unexpected response (not a JSON array)');
  return data;
}

async function resolveHost(zone, accessKey) {
  const configured = normalizeConfiguredHost(process.env.BUNNY_STORAGE_HOST);
  const order = configured
    ? [configured, ...STORAGE_HOST_CANDIDATES.filter((h) => h !== configured)]
    : STORAGE_HOST_CANDIDATES;

  let lastErr;
  for (const host of order) {
    try {
      await listImagesFolder(host, zone, accessKey);
      return host;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

const zone = process.env.BUNNY_STORAGE_ZONE_NAME;
const accessKey =
  process.env.BUNNY_STORAGE_READ_ONLY_KEY || process.env.BUNNY_STORAGE_ACCESS_KEY;

if (!zone || !accessKey) {
  console.error(
    'Set BUNNY_STORAGE_ZONE_NAME and BUNNY_STORAGE_READ_ONLY_KEY (or BUNNY_STORAGE_ACCESS_KEY).',
  );
  process.exit(1);
}

const host = await resolveHost(zone, accessKey);
const items = await listImagesFolder(host, zone, accessKey);
const files = items
  .filter((i) => !i.IsDirectory)
  .map((i) => i.ObjectName)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

const dirs = items.filter((i) => i.IsDirectory).map((i) => i.ObjectName);

console.log(`<!-- Bunny Storage: https://${host}/${zone}/images/ -->\n`);
console.log(`# Bunny \`images/\` root files (checklist)\n`);
console.log(
  `_Generated ${new Date().toISOString().slice(0, 10)} — ${files.length} files; ${dirs.length} subfolders (not listed)._`,
);
console.log('\n| Done | File name |\n| --- | --- |');
for (const name of files) {
  const cell = name.replace(/\|/g, '\\|');
  console.log(`| ☐ | ${cell} |`);
}
if (dirs.length) {
  console.log('\n## Subfolders (not expanded)\n');
  for (const d of dirs.sort()) console.log(`- \`${d}/\``);
}
