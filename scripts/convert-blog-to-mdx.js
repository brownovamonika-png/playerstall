#!/usr/bin/env node

/**
 * Convert .astro blog posts to .mdx format for Astro Content Collections
 * Converts HTML content strings to Markdown format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple HTML to Markdown converter
function htmlToMarkdown(html) {
  let md = html;
  
  // Remove WordPress comments
  md = md.replace(/<!-- wp:[^>]+ -->/g, '');
  md = md.replace(/<!-- \/wp:[^>]+ -->/g, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  
  // Convert headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n');
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n');
  
  // Convert paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');
  
  // Convert lists
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert links
  md = md.replace(/<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images
  md = md.replace(/<img\s+(?:[^>]*?\s+)?src=["']([^"']*)["'](?:[^>]*?\s+)?alt=["']([^"']*)["'][^>]*\/?>/gi, '\n![$2]($1)\n');
  md = md.replace(/<img\s+(?:[^>]*?\s+)?src=["']([^"']*)["'][^>]*\/?>/gi, '\n![]($1)\n');
  
  // Convert figures
  md = md.replace(/<figure[^>]*>(.*?)<\/figure>/gis, '$1');
  md = md.replace(/<figcaption[^>]*>(.*?)<\/figcaption>/gi, '\n*$1*\n');
  
  // Convert emphasis
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Remove span tags but keep content
  md = md.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1');
  
  // Remove remaining HTML tags
  md = md.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  
  return md.trim();
}

// Parse .astro file and convert to .mdx
function convertAstroToMdx(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract metadata with better regex that handles escaped quotes
  const titleMatch = content.match(/title:\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/s);
  const categoryMatch = content.match(/category:\s*['"]([^'"]*)['"]/);
  const dateMatch = content.match(/datePublished:\s*['"]([^'"]*)['"]/);
  const readTimeMatch = content.match(/readTime:\s*['"]([^'"]*)['"]/);
  const authorMatch = content.match(/author:\s*['"]([^'"]*)['"]/);
  const wordCountMatch = content.match(/wordCount:\s*(\d+)/);
  const slugMatch = content.match(/slug:\s*['"]([^'"]*)['"]/);
  
  // Extract content
  const contentMatch = content.match(/const content = `([\s\S]*?)`;/);
  
  if (!titleMatch || !contentMatch) {
    console.error(`Failed to parse: ${filePath}`);
    return null;
  }
  
  // Properly decode escaped quotes in matched strings
  const title = titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
  const description = descMatch ? descMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : title;
  const category = categoryMatch ? categoryMatch[1] : 'Uncategorized';
  // Preserve original publish date from Astro; use fallback only when missing (e.g. draft without date)
  const datePublished = (dateMatch && dateMatch[1].trim()) ? dateMatch[1].trim() : new Date().toISOString().slice(0, 10);
  const readTime = readTimeMatch ? readTimeMatch[1] : '5 min read';
  const author = authorMatch ? authorMatch[1] : 'PlayerStall';
  const wordCount = wordCountMatch ? parseInt(wordCountMatch[1]) : undefined;
  const slug = slugMatch ? slugMatch[1] : path.basename(filePath, '.astro');
  
  const htmlContent = contentMatch[1];
  const markdownContent = htmlToMarkdown(htmlContent);
  
  // Build MDX file with JSON.stringify for proper YAML escaping
  let mdx = `---\n`;
  mdx += `title: ${JSON.stringify(title)}\n`;
  mdx += `description: ${JSON.stringify(description)}\n`;
  mdx += `category: ${JSON.stringify(category)}\n`;
  mdx += `datePublished: ${JSON.stringify(datePublished)}\n`;
  mdx += `readTime: ${JSON.stringify(readTime)}\n`;
  mdx += `author: ${JSON.stringify(author)}\n`;
  if (wordCount) mdx += `wordCount: ${wordCount}\n`;
  mdx += `---\n\n`;
  mdx += markdownContent;
  
  return { slug, mdx };
}

// Process all blog posts
const blogDir = path.join(__dirname, '../src/pages/blog');
const outputDir = path.join(__dirname, '../src/content/blog');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

console.log(`Converting ${files.length} blog posts...`);

let converted = 0;
let failed = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const result = convertAstroToMdx(filePath);
  
  if (result) {
    const outputPath = path.join(outputDir, `${result.slug}.mdx`);
    fs.writeFileSync(outputPath, result.mdx);
    console.log(`✓ Converted: ${file} → ${result.slug}.mdx`);
    converted++;
  } else {
    console.error(`✗ Failed: ${file}`);
    failed++;
  }
});

console.log(`\nConversion complete!`);
console.log(`Converted: ${converted}`);
console.log(`Failed: ${failed}`);
