#!/usr/bin/env node
/**
 * Fix duplicate H1 in blog MDX: layout provides H1 from title, so body must not use # or <h1>.
 * Demotes: # → ##, ## → ###, ### → ####, #### → #####.
 * Also replaces <h1> with <h2>.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const hasMdH1 = /^#\s+/m.test(content);
  const hasHtmlH1 = /<h1(\s|>)/i.test(content);
  if (!hasMdH1 && !hasHtmlH1) continue;

  const parts = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (!parts) continue;
  const body = parts[1];
  const beforeBody = content.slice(0, content.length - body.length);

  let newBody = body
    .replace(/<h1(\s|>)/gi, '<h2$1')
    .replace(/<\/h1>/gi, '</h2>');
  newBody = newBody
    .replace(/^(#### )(.*)$/gm, '##### $2')
    .replace(/^(### )(.*)$/gm, '#### $2')
    .replace(/^(## )(.*)$/gm, '### $2')
    .replace(/^(# )(.*)$/gm, '## $2');

  if (newBody !== body) {
    fs.writeFileSync(filePath, beforeBody + newBody, 'utf8');
    console.log('Fixed:', file);
    fixed++;
  }
}

console.log('\nTotal fixed:', fixed);
