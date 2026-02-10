#!/usr/bin/env node
/**
 * Extracts blog posts from WordPress XML export and creates Astro draft files.
 * Usage: node scripts/extract-wordpress-blogs.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const XML_PATH = join(ROOT, 'playerstallwoodsportslockers.WordPress.2026-02-09.xml');
const DRAFTS_DIR = join(ROOT, 'src', 'pages', 'blog', 'drafts');

function extractCData(block, tagName) {
  const fullTag = tagName.includes(':') ? tagName : tagName;
  const regex = new RegExp(`<${fullTag.replace(':', '\\:')}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${fullTag.replace(':', '\\:')}>`, 'm');
  const m = block.match(regex);
  return m ? m[1].trim() : '';
}

function extractSimple(block, tagName) {
  const escaped = tagName.replace(':', '\\:');
  const regex = new RegExp(`<${escaped}>([^<]*)</${escaped}>`, 'm');
  const m = block.match(regex);
  return m ? m[1].trim() : '';
}

function slugFromPostName(postName, title) {
  const raw = (postName || title || 'post').toLowerCase();
  return raw
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';
}

function formatDate(pubDateStr) {
  if (!pubDateStr) return 'Unknown';
  try {
    const d = new Date(pubDateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return pubDateStr;
  }
}

function formatDateISO(pubDateStr) {
  if (!pubDateStr) return '';
  try {
    const d = new Date(pubDateStr);
    return d.toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

function escapeForTemplateLiteral(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .slice(0, 160);
}

function extractCategory(block) {
  const regex = /<category domain="category" nicename="[^"]*"><!\[CDATA\[([^\]]*)\]\]><\/category>/;
  const m = block.match(regex);
  return m ? m[1] : 'Blog';
}

const xml = readFileSync(XML_PATH, 'utf8');
const parts = xml.split('</item>');
const posts = [];

for (let i = 0; i < parts.length - 1; i++) {
  const raw = i === 0 ? parts[i].replace(/^[\s\S]*?(<item>)/, '$1') : '<item>' + parts[i];
  if (!raw.includes('<wp:post_type><![CDATA[post]]></wp:post_type>')) continue;

  const title = extractCData(raw, 'title');
  const content = extractCData(raw, 'content:encoded');
  const pubDate = extractSimple(raw, 'pubDate');
  const postName = extractCData(raw, 'wp:post_name');
  const category = extractCategory(raw);

  if (!title) continue;

  posts.push({
    title,
    content: content || '<p>No content.</p>',
    pubDate,
    postName,
    category,
    slug: slugFromPostName(postName, title),
    description: stripHtml(content),
    dateFormatted: formatDate(pubDate),
    dateISO: formatDateISO(pubDate)
  });
}

console.log(`Found ${posts.length} blog posts.`);

const existingDrafts = new Set(
  existsSync(DRAFTS_DIR)
    ? readdirSync(DRAFTS_DIR).filter((f) => f.endsWith('.astro')).map((f) => f.replace(/\.astro$/, ''))
    : []
);

let created = 0;
let skipped = 0;

for (const post of posts) {
  let filename = `${post.slug}.astro`;
  if (existingDrafts.has(post.slug)) {
    filename = `wp-${post.slug}.astro`;
  }
  const filepath = join(DRAFTS_DIR, filename);

  const contentEscaped = escapeForTemplateLiteral(post.content);
  const descriptionEscaped = escapeForTemplateLiteral(post.description).replace(/'/g, "\\'");
  const titleEscaped = post.title.replace(/'/g, "\\'");
  const categoryEscaped = post.category.replace(/'/g, "\\'");

  const astroContent = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';

const post = {
  title: '${titleEscaped}',
  description: '${descriptionEscaped}',
  category: '${categoryEscaped}',
  datePublished: '${post.dateISO}',
  readTime: '5 min read',
  author: 'PlayerStall',
  slug: '${post.slug}',
  wordCount: ${Math.max(100, (post.content.split(/\s/).length))}
};

const content = \`${contentEscaped}\`;
---

<BaseLayout title={post.title + ' | PlayerStall'} description={post.description}>
  <section class="page-header">
    <div class="container">
      <div class="article-meta">
        <span class="blog-date">{post.datePublished ? new Date(post.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'} · {post.readTime}</span>
        <span class="blog-category">{post.category}</span>
      </div>
      <h1>{post.title}</h1>
      {post.description && <p class="lede">{post.description}</p>}
    </div>
  </section>

  <section class="blog-section">
    <div class="container">
      <article class="blog-content">
        <Fragment set:html={content} />
      </article>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>Ready for Custom Sports Lockers?</h2>
        <p>Get a free design consultation. 30+ years experience. Lifetime guarantee.</p>
        <a class="btn-primary" href="/contact">Get Free Consultation</a>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  :global(:root) { --bg-off-white: #f9f7f2; --border-color: #e3dfd7; --text-gray: #4a4a4a; --accent-color: #fe5900; --text-white: #ffffff; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
  .page-header { background: var(--bg-off-white); padding: 4rem 0; text-align: center; }
  .article-meta { display: flex; gap: 1rem; justify-content: center; font-size: 0.9rem; color: var(--accent-color); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem; }
  .page-header h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; line-height: 1.25; }
  .lede { max-width: 760px; margin: 0 auto; font-size: 1.2rem; color: var(--text-gray); line-height: 1.8; }
  .blog-section { padding: 4rem 0; }
  .blog-content { background: var(--bg-off-white); border: 1px solid var(--border-color); border-radius: 12px; padding: 3rem; }
  .blog-content :global(h2) { margin-top: 2.5rem; margin-bottom: 1rem; font-size: 2rem; }
  .blog-content :global(h2:first-of-type) { margin-top: 0; }
  .blog-content :global(h3), .blog-content :global(h4) { margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.35rem; }
  .blog-content :global(p), .blog-content :global(ul) { color: var(--text-gray); font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem; }
  .blog-content :global(ul) { padding-left: 1.5rem; margin: 1.5rem 0; }
  .blog-content :global(a) { color: var(--accent-color); text-decoration: none; }
  .blog-content :global(a:hover) { text-decoration: underline; }
  .btn-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.9rem 2rem; border-radius: 999px; font-weight: 600; text-decoration: none; background: var(--accent-color); color: var(--text-white); letter-spacing: 0.04em; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
  .cta-section { background: #121212; color: #fff; padding: 4rem 0; margin-top: 2rem; }
  .cta-content { text-align: center; background: #1f1f1f; padding: 3rem; border-radius: 16px; }
  .cta-content h2 { margin-top: 0; font-size: 2.25rem; color: #fff; }
  .cta-content p { color: #d8d8d8; margin-bottom: 2rem; font-size: 1.1rem; }
  @media (max-width: 768px) { .blog-content { padding: 2rem; } }
</style>
`;

  try {
    writeFileSync(filepath, astroContent, 'utf8');
    created++;
    if (created <= 5) console.log('  Created:', filename);
  } catch (err) {
    console.error('Error writing', filename, err.message);
    skipped++;
  }
}

if (created > 5) console.log(`  ... and ${created - 5} more.`);
console.log(`Done. Created ${created} drafts, ${skipped} errors.`);
