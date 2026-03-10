#!/usr/bin/env node
/**
 * Audit image links across the project and output a markdown scaffold for IMAGE_DIRECTORY.md.
 * Usage: node scripts/audit-image-links.js
 *
 * Scans src/, guides/ for:
 * - src="..."
 * - heroImage: "..."
 * - url('...') and url("...")
 * - ![](...) and ![alt](...)
 * - background-image: url(...)
 * - image: "..." (in JSON/schema)
 *
 * Categorizes by: CDN, local (/images/), playerstall.com, topscorer, customsportslockers.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const GUIDES_DIR = path.join(ROOT, 'guides');

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;

// Extract URLs from content; returns array of { url, usedIn }
function extractImageUrls(content, filePath) {
  const results = [];
  const usedIn = filePath.replace(ROOT + path.sep, '').replace(/\\/g, '/');

  // src="..." or src='...'
  const srcRe = /src\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = srcRe.exec(content)) !== null) {
    const url = m[1].trim();
    if (couldBeImage(url)) results.push({ url, usedIn });
  }

  // heroImage: "..."
  const heroRe = /heroImage\s*:\s*["']([^"']+)["']/g;
  while ((m = heroRe.exec(content)) !== null) {
    const url = m[1].trim();
    if (couldBeImage(url)) results.push({ url, usedIn });
  }

  // url('...') or url("...")
  const urlRe = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/g;
  while ((m = urlRe.exec(content)) !== null) {
    const url = m[1].trim();
    if (couldBeImage(url)) results.push({ url, usedIn });
  }

  // ![alt](url) or ![](url)
  const mdImgRe = /!\[([^\]]*)\]\(\s*([^)]+)\s*\)/g;
  while ((m = mdImgRe.exec(content)) !== null) {
    const url = m[2].trim();
    if (couldBeImage(url)) results.push({ url, usedIn });
  }

  // "image": "..." (JSON-like)
  const jsonImageRe = /"image"\s*:\s*["']([^"']+)["']/g;
  while ((m = jsonImageRe.exec(content)) !== null) {
    const url = m[1].trim();
    if (couldBeImage(url)) results.push({ url, usedIn });
  }

  return results;
}

function couldBeImage(url) {
  if (!url || url.length > 500) return false;
  if (url.startsWith('data:')) return false;
  if (url.startsWith('{') || url.startsWith('$')) return false;
  return IMAGE_EXT.test(url) || url.includes('/images/') || url.includes('uploads/') || url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg') || url.includes('.webp') || url.includes('.gif') || url.includes('.svg');
}

function categorize(url) {
  const u = url.replace(/^https?:\/\//i, '').trim();
  if (u.startsWith('playerstall.b-cdn.net/')) return 'cdn';
  if (u.startsWith('/images/') || u === 'images/' || (u.startsWith('images/') && !u.includes('://'))) return 'local';
  if (u.includes('playerstall.com/')) return 'playerstall';
  if (u.includes('topscorer.qodeinteractive.com/')) return 'topscorer';
  if (u.includes('customsportslockers.com/')) return 'customsportslockers';
  return null;
}

function normalizeUrl(url) {
  let u = url.trim();
  if (u.startsWith('http://')) u = 'https://' + u.slice(7);
  return u;
}

function walkDir(dir, extensions, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist' && e.name !== '.git' && e.name !== '_astro') walkDir(full, extensions, fileList);
    } else if (extensions.some(ext => e.name.endsWith(ext))) {
      fileList.push(full);
    }
  }
  return fileList;
}

function main() {
  const exts = ['.astro', '.mdx', '.md', '.ts', '.tsx', '.js', '.mjs', '.html'];
  const files = [...walkDir(SRC_DIR, exts), ...walkDir(GUIDES_DIR, exts)];

  const byCategory = { cdn: [], local: [], playerstall: [], topscorer: [], customsportslockers: [] };
  const seen = new Set();

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const entries = extractImageUrls(content, file);
      for (const { url, usedIn } of entries) {
        const key = normalizeUrl(url) + '|' + usedIn;
        if (seen.has(key)) continue;
        seen.add(key);
        const cat = categorize(normalizeUrl(url));
        if (cat && byCategory[cat]) {
          byCategory[cat].push({ url: normalizeUrl(url), usedIn });
        }
      }
    } catch (err) {
      // skip
    }
  }

  // Dedupe by URL within each category, collect usedIn
  const dedupe = (arr) => {
    const byUrl = new Map();
    for (const { url, usedIn } of arr) {
      if (!byUrl.has(url)) byUrl.set(url, []);
      if (!byUrl.get(url).includes(usedIn)) byUrl.get(url).push(usedIn);
    }
    return Array.from(byUrl.entries()).map(([url, usedIn]) => ({ url, usedIn: usedIn.join('; ') }));
  };

  const cdnRoot = [];
  const cdnTopscorer = [];
  const cdnGallery = [];
  for (const { url, usedIn } of dedupe(byCategory.cdn)) {
    const entry = { url, usedIn, description: 'Description TBD' };
    if (url.includes('/images/topscorer/')) cdnTopscorer.push(entry);
    else if (url.includes('/images/gallery/') || url.includes('/gallery/')) cdnGallery.push(entry);
    else cdnRoot.push(entry);
  }

  const local = dedupe(byCategory.local).map(({ url, usedIn }) => ({ url: url.startsWith('/') ? url : '/' + url.replace(/^images\//, 'images/'), usedIn, description: 'Description TBD' }));
  const playerstall = dedupe(byCategory.playerstall).map(({ url, usedIn }) => ({ url, usedIn, description: 'Description TBD' }));
  const topscorer = dedupe(byCategory.topscorer).map(({ url, usedIn }) => ({ url, usedIn, description: 'Description TBD' }));
  const customsportslockers = dedupe(byCategory.customsportslockers).map(({ url, usedIn }) => ({ url, usedIn, description: 'Description TBD' }));

  const line = (arr, cols = 3) => {
    if (arr.length === 0) return '| *(none)* | | |\n';
    return arr.map((e) => `| ${e.url} | ${e.description} | ${(e.usedIn || '').replace(/\|/g, '\\|')} |`).join('\n') + '\n';
  };

  const line4 = (arr) => {
    if (arr.length === 0) return '| *(none)* | | | |\n';
    return arr.map((e) => `| ${e.url} | ${e.description} | ${(e.usedIn || '').replace(/\|/g, '\\|')} | Migrate to CDN |`).join('\n') + '\n';
  };

  const out = [
    '## CDN (playerstall.b-cdn.net)',
    '',
    '### images/ (root)',
    '',
    '| URL / Path | Description | Used in |',
    '|------------|-------------|---------|',
    line(cdnRoot),
    '### images/topscorer/',
    '',
    '| URL / Path | Description | Used in |',
    '|------------|-------------|---------|',
    line(cdnTopscorer),
    '### images/gallery/',
    '',
    '| URL / Path | Description | Used in |',
    '|------------|-------------|---------|',
    line(cdnGallery),
    '## Local (public/images)',
    '',
    '| Path | Description | Used in |',
    '|------|-------------|---------|',
    line(local),
    '## playerstall.com (legacy)',
    '',
    '| URL | Description | Used in | Migration |',
    '|-----|-------------|---------|-----------|',
    line4(playerstall),
    '## topscorer.qodeinteractive.com',
    '',
    '| URL | Description | Used in | Migration |',
    '|-----|-------------|---------|-----------|',
    line4(topscorer),
    '## customsportslockers.com',
    '',
    '| URL | Description | Used in | Migration |',
    '|-----|-------------|---------|-----------|',
    line4(customsportslockers),
  ].join('\n');

  console.log(out);
}

main();
