#!/usr/bin/env node
/**
 * Audit blog MDX for SEO on-page checklist (§2 of BLOG_PRE_LAUNCH_CHECKLIST.md).
 * Usage: node scripts/audit-blog-seo-onpage.mjs
 *
 * Checks:
 * - Title tag length (full = title + " | PlayerStall" → 50–60 chars)
 * - Meta description length (150–160 chars)
 * - Duplicate H1 (no # or <h1> in body; layout provides H1)
 * - Heading hierarchy (H2→H3→H4; no skipped levels)
 * - Primary keyword in first 150 words and in at least one H2
 * - URL/slug: kebab-case, readable, keyword-relevant
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

const BRAND_SUFFIX = ' | PlayerStall';
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;
const FIRST_WORDS = 150;

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };
  const body = match[2];
  const fm = {};
  const block = match[1];
  let key = null;
  let value = '';
  for (const line of block.split(/\r?\n/)) {
    const keyMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      if (key) fm[key] = value.trim().replace(/^["']|["']$/g, '');
      key = keyMatch[1];
      value = keyMatch[2] || '';
    } else if (key && (line.startsWith(' ') || line.startsWith('\t'))) {
      value += '\n' + line;
    } else if (key) {
      fm[key] = value.trim().replace(/^["']|["']$/g, '');
      key = null;
      value = '';
    }
  }
  if (key) fm[key] = value.trim().replace(/^["']|["']$/g, '');
  return { frontmatter: fm, body };
}

function getFirstNWords(text, n) {
  const plain = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/#{1,6}\s*/g, '').replace(/\*\*?/g, '');
  const words = plain.split(/\s+/).filter(Boolean);
  return words.slice(0, n).join(' ');
}

function inferPrimaryKeyword(slug, title) {
  const fromSlug = slug.replace(/-/g, ' ');
  const combined = `${fromSlug} ${(title || '').toLowerCase()}`;
  if (combined.includes('sports lockers')) return 'sports lockers';
  if (combined.includes('wood lockers')) return 'wood lockers';
  if (combined.includes('athletic lockers')) return 'athletic lockers';
  if (combined.includes('locker room')) return 'locker room';
  if (combined.includes('lockers')) return 'lockers';
  return fromSlug.split(' ').slice(0, 3).join(' ');
}

function getHeadings(body) {
  const headings = [];
  const mdH = [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)];
  for (const m of mdH) headings.push({ level: m[1].length, text: m[2].trim() });
  const htmlH = [...body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  for (const m of htmlH) headings.push({ level: parseInt(m[1], 10), text: m[2].replace(/<[^>]+>/g, '').trim() });
  headings.sort((a, b) => body.indexOf(a.text) - body.indexOf(b.text));
  return headings;
}

function checkHierarchy(headings) {
  const levels = headings.map((h) => h.level);
  const errors = [];
  let prev = 1;
  for (let i = 0; i < levels.length; i++) {
    const l = levels[i];
    if (l > prev + 1) errors.push(`Skip: ${prev} → ${l} at "${headings[i].text.slice(0, 40)}..."`);
    prev = l;
  }
  return errors;
}

function isKebabCase(slug) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return false;
  if (slug.startsWith('title-')) return false;
  if (/[a-z]{20,}/.test(slug.replace(/-/g, ''))) return false;
  return true;
}

function run() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const report = { ok: [], title: [], desc: [], h1: [], hierarchy: [], keyword: [], slug: [] };

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { frontmatter: fm, body } = extractFrontmatter(raw);

    const title = (fm.title || '').trim();
    const description = (fm.description || '').trim();
    const fullTitle = title + BRAND_SUFFIX;

    let issues = [];

    if (fullTitle.length < TITLE_MIN || fullTitle.length > TITLE_MAX) {
      report.title.push({ slug, len: fullTitle.length, title: title.slice(0, 50) });
      issues.push(`Title: ${fullTitle.length} chars (target 50–60)`);
    }
    if (description.length < DESC_MIN || description.length > DESC_MAX) {
      report.desc.push({ slug, len: description.length });
      issues.push(`Description: ${description.length} chars (target 150–160)`);
    }

    const hasMdH1 = /^#\s+/m.test(body);
    const hasHtmlH1 = /<h1(\s|>)/i.test(body);
    if (hasMdH1 || hasHtmlH1) {
      report.h1.push(slug);
      issues.push('Duplicate H1 in body (use ## only; layout provides H1)');
    }

    const headings = getHeadings(body);
    const hierarchyErrors = checkHierarchy(headings);
    if (hierarchyErrors.length) {
      report.hierarchy.push({ slug, errors: hierarchyErrors });
      issues.push(`Hierarchy: ${hierarchyErrors.join('; ')}`);
    }

    const primaryKeyword = inferPrimaryKeyword(slug, title);
    const firstWords = getFirstNWords(body, FIRST_WORDS);
    const h2Texts = headings.filter((h) => h.level === 2).map((h) => h.text);
    const inFirst = firstWords.toLowerCase().includes(primaryKeyword.toLowerCase());
    const inH2 = h2Texts.some((t) => t.toLowerCase().includes(primaryKeyword.toLowerCase()));
    if (!inFirst || !inH2) {
      report.keyword.push({
        slug,
        keyword: primaryKeyword,
        inFirst,
        inH2,
        h2Count: h2Texts.length,
      });
      if (!inFirst) issues.push(`Primary keyword "${primaryKeyword}" not in first ${FIRST_WORDS} words`);
      if (!inH2) issues.push(`Primary keyword not in any H2`);
    }

    if (!isKebabCase(slug)) {
      report.slug.push(slug);
      issues.push('Slug not kebab-case or has title-/long run-together');
    }

    if (issues.length === 0) report.ok.push(slug);
  }

  console.log('\n## SEO On-Page Audit (Blog MDX)\n');
  console.log(`Total posts: ${files.length}`);
  console.log(`Fully OK: ${report.ok.length}\n`);

  if (report.title.length) {
    console.log('### Title tag length (full title 50–60 chars)');
    report.title.forEach(({ slug, len, title }) => console.log(`  - ${slug}: ${len} chars — "${title}..."`));
    console.log('');
  }
  if (report.desc.length) {
    console.log('### Meta description (150–160 chars)');
    report.desc.forEach(({ slug, len }) => console.log(`  - ${slug}: ${len} chars`));
    console.log('');
  }
  if (report.h1.length) {
    console.log('### Duplicate H1 in body (use ## only)');
    console.log('  ' + report.h1.join(', '));
    console.log('');
  }
  if (report.hierarchy.length) {
    console.log('### Heading hierarchy (no skipped levels)');
    report.hierarchy.forEach(({ slug, errors }) => console.log(`  - ${slug}: ${errors.join('; ')}`));
    console.log('');
  }
  if (report.keyword.length) {
    console.log('### Primary keyword (first 150 words + at least one H2)');
    report.keyword.slice(0, 15).forEach(({ slug, keyword, inFirst, inH2 }) =>
      console.log(`  - ${slug}: "${keyword}" inFirst=${inFirst} inH2=${inH2}`)
    );
    if (report.keyword.length > 15) console.log(`  ... and ${report.keyword.length - 15} more`);
    console.log('');
  }
  if (report.slug.length) {
    console.log('### Slug (kebab-case, no title-, readable)');
    console.log('  ' + report.slug.join(', '));
    console.log('');
  }

  const totalIssues =
    report.title.length +
    report.desc.length +
    report.h1.length +
    report.hierarchy.length +
    report.keyword.length +
    report.slug.length;
  console.log('---');
  console.log(`Summary: ${report.ok.length} OK, ${totalIssues} posts with one or more issues.`);
}

run();
