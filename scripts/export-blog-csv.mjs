#!/usr/bin/env node
/**
 * Export all published blog posts (MDX + Astro guides) to a CSV file.
 * Run from project root: node scripts/export-blog-csv.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const contentBlogDir = path.join(root, 'src/content/blog');
const pagesBlogDir = path.join(root, 'src/pages/blog');

function escapeCsv(value) {
  if (value == null) return '';
  const s = String(value).trim();
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function parseMdxFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = match[1];
  // Extract value for key; support "..." and '...' (allow escaped quotes inside)
  const get = (key) => {
    const keyRe = new RegExp(`^${key}:\\s*`, 'm');
    const keyMatch = fm.match(keyRe);
    if (!keyMatch) return '';
    const start = fm.indexOf(keyMatch[0]) + keyMatch[0].length;
    const rest = fm.slice(start);
    const trimmed = rest.trimStart();
    if (trimmed.startsWith('"')) {
      let end = 1;
      while (end < trimmed.length) {
        const nextQuote = trimmed.indexOf('"', end);
        const nextNewline = trimmed.indexOf('\n', end);
        if (nextNewline !== -1 && (nextQuote === -1 || nextNewline < nextQuote)) {
          return trimmed.slice(1, nextNewline).replace(/\\"/g, '"').trim();
        }
        if (nextQuote === -1) return trimmed.slice(1).replace(/\\"/g, '"');
        if (trimmed[nextQuote - 1] === '\\') { end = nextQuote + 1; continue; }
        return trimmed.slice(1, nextQuote).replace(/\\"/g, '"');
      }
      return trimmed.slice(1).replace(/\\"/g, '"');
    }
    if (trimmed.startsWith("'")) {
      let end = 1;
      while (end < trimmed.length) {
        const i = trimmed.indexOf("'", end);
        if (i === -1) break;
        if (trimmed[i - 1] === '\\') { end = i + 1; continue; }
        return trimmed.slice(1, i).replace(/\\'/g, "'");
      }
      return trimmed.slice(1).replace(/\\'/g, "'");
    }
    const lineEnd = trimmed.indexOf('\n');
    return (lineEnd === -1 ? trimmed : trimmed.slice(0, lineEnd)).trim();
  };
  return {
    title: get('title') || path.basename(filePath, '.mdx').replace(/-/g, ' '),
    description: get('description') || '',
    category: get('category') || 'Uncategorized',
    datePublished: get('datePublished') || '',
    slug: path.basename(filePath, '.mdx'),
    url: `/blog/${path.basename(filePath, '.mdx')}`,
    source: 'mdx',
  };
}

function parseAstroPost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(filePath, '.astro');
  const titleMatch = raw.match(/title:\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/);
  const descMatch = raw.match(/description:\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/);
  const categoryMatch = raw.match(/category:\s*['"]([^'"]*)['"]/);
  const dateMatch = raw.match(/datePublished:\s*['"]([^'"]*)['"]/);
  const postObjMatch = raw.match(/const post = \{[\s\S]*?title:\s*['"]([^'"]*)['"]/);
  const postDescMatch = raw.match(/description:\s*[\s\S]*?['"]([^'"]{0,200})/);
  let title = '';
  let description = '';
  let category = 'Blog';
  let datePublished = '';
  if (postObjMatch) {
    title = postObjMatch[1].replace(/\\'/g, "'");
    const catM = raw.match(/category:\s*['"]([^'"]*)['"]/);
    if (catM) category = catM[1];
    const dateM = raw.match(/datePublished:\s*['"]([^'"]*)['"]/);
    if (dateM) datePublished = dateM[1];
    const descM = raw.match(/description:\s*\n?\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/);
    if (descM) description = descM[1].replace(/\\'/g, "'");
  } else {
    title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : slug.replace(/-/g, ' ');
    description = descMatch ? descMatch[1].replace(/\\'/g, "'") : '';
    category = categoryMatch ? categoryMatch[1] : 'Blog';
    datePublished = dateMatch ? dateMatch[1] : '';
  }
  return {
    slug,
    title: title || slug.replace(/-/g, ' '),
    description: description || title || '',
    category: category || 'Blog',
    datePublished: datePublished || '',
    url: `/blog/${slug}`,
    source: 'astro',
  };
}

const rows = [];

// MDX posts
const mdxFiles = fs.readdirSync(contentBlogDir).filter((f) => f.endsWith('.mdx'));
for (const f of mdxFiles) {
  const entry = parseMdxFrontmatter(path.join(contentBlogDir, f));
  if (entry) rows.push(entry);
}

// Astro guides (exclude dynamic route)
const astroFiles = fs
  .readdirSync(pagesBlogDir)
  .filter((f) => f.endsWith('.astro') && f !== '[slug].astro');
for (const f of astroFiles) {
  const entry = parseAstroPost(path.join(pagesBlogDir, f));
  if (entry) rows.push(entry);
}

// Sort by date (newest first), then by title
rows.sort((a, b) => {
  const dA = a.datePublished ? new Date(a.datePublished + 'T12:00:00').getTime() : 0;
  const dB = b.datePublished ? new Date(b.datePublished + 'T12:00:00').getTime() : 0;
  if (dB !== dA) return dB - dA;
  return (a.title || '').localeCompare(b.title || '');
});

const headers = ['slug', 'title', 'description', 'category', 'datePublished', 'url', 'source'];
const csvLines = [headers.map(escapeCsv).join(',')];
for (const r of rows) {
  csvLines.push(
    headers.map((h) => escapeCsv(r[h] ?? '')).join(',')
  );
}

const outPath = path.join(root, 'published-blogs.csv');
fs.writeFileSync(outPath, csvLines.join('\n'), 'utf8');
console.log(`Wrote ${rows.length} posts to ${outPath}`);
console.log(`  MDX: ${rows.filter((r) => r.source === 'mdx').length}`);
console.log(`  Astro: ${rows.filter((r) => r.source === 'astro').length}`);
