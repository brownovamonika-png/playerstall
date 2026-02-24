/**
 * Script to convert draft Astro blog posts to MDX format
 * Run with: node scripts/convert-drafts-to-mdx.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRAFTS_DIR = path.join(__dirname, '../src/pages/blog/drafts');
const OUTPUT_DIR = path.join(__dirname, '../src/content/blog');

// Files to skip (trashed or already moved)
const SKIP_FILES = [
  'trashed.astro',
  'trashed-2.astro',
  'README.md'
];

/**
 * Convert WordPress HTML comments to clean Markdown
 */
function cleanContent(htmlContent) {
  let content = htmlContent;
  
  // Remove WordPress block comments
  content = content.replace(/<!-- \/wp:[a-z:]+ -->/g, '');
  content = content.replace(/<!-- wp:[a-z:]+(?:\s+\{[^}]+\})? -->/g, '');
  
  // Convert HTML paragraphs to Markdown
  content = content.replace(/<p>(.*?)<\/p>/gs, (match, text) => {
    return text.trim() + '\n\n';
  });
  
  // Convert HTML links to Markdown
  content = content.replace(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
  
  // Remove figure tags but keep images
  content = content.replace(/<figure[^>]*>/g, '');
  content = content.replace(/<\/figure>/g, '');
  content = content.replace(/<figcaption>(.*?)<\/figcaption>/g, '\n*$1*\n');
  
  // Convert images to Markdown (simplified - remove size attributes)
  content = content.replace(/<img src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/g, (match, src, alt) => {
    return alt ? `![${alt}](${src})` : `![](${src})`;
  });
  
  // Remove empty lines (more than 2 consecutive)
  content = content.replace(/\n{3,}/g, '\n\n');
  
  return content.trim();
}

/**
 * Determine category based on content
 */
function determineCategory(title, content) {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  if (titleLower.includes('football') || contentLower.includes('football locker')) {
    return 'Football';
  }
  if (titleLower.includes('hockey') || contentLower.includes('hockey')) {
    return 'Hockey';
  }
  if (titleLower.includes('basketball') || contentLower.includes('basketball')) {
    return 'Basketball';
  }
  if (titleLower.includes('mudroom') || titleLower.includes('garage')) {
    return 'Home Storage';
  }
  if (titleLower.includes('wood vs metal') || titleLower.includes('plywood vs mdf')) {
    return 'Comparisons';
  }
  if (titleLower.includes('guide') || titleLower.includes('how to choose') || titleLower.includes('complete guide')) {
    return 'Guides';
  }
  if (titleLower.includes('recruitment') || titleLower.includes('culture') || titleLower.includes('team')) {
    return 'College Athletics';
  }
  
  return 'General';
}

/**
 * Extract frontmatter and content from Astro file
 */
function parseAstroFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Extract the post object
  const postMatch = fileContent.match(/const post = \{([\s\S]*?)\};/);
  if (!postMatch) {
    console.error(`Could not find post object in ${filePath}`);
    return null;
  }
  
  const postObject = postMatch[1];
  
  // Extract individual fields
  const title = postObject.match(/title:\s*['"](.+?)['"]/)?.[1] || 'Untitled';
  const description = postObject.match(/description:\s*['"](.+?)['"]/)?.[1] || '';
  const datePublished = postObject.match(/datePublished:\s*['"](.+?)['"]/)?.[1] || new Date().toISOString().split('T')[0];
  const readTime = postObject.match(/readTime:\s*['"](.+?)['"]/)?.[1] || '5 min read';
  const author = postObject.match(/author:\s*['"](.+?)['"]/)?.[1] || 'PlayerStall Editorial Team';
  const wordCount = postObject.match(/wordCount:\s*(\d+)/)?.[1] || 500;
  
  // Extract content
  const contentMatch = fileContent.match(/const content = `([\s\S]*?)`;/);
  if (!contentMatch) {
    console.error(`Could not find content in ${filePath}`);
    return null;
  }
  
  const rawContent = contentMatch[1];
  const cleanedContent = cleanContent(rawContent);
  
  // Determine category
  const category = determineCategory(title, cleanedContent);
  
  return {
    title,
    description,
    category,
    datePublished,
    readTime,
    author,
    wordCount: parseInt(wordCount),
    content: cleanedContent
  };
}

/**
 * Generate MDX file content
 */
function generateMDX(data) {
  return `---
title: "${data.title}"
description: "${data.description}"
category: "${data.category}"
datePublished: "${data.datePublished}"
readTime: "${data.readTime}"
author: "${data.author}"
wordCount: ${data.wordCount}
---

${data.content}
`;
}

/**
 * Convert filename to slug
 */
function filenameToSlug(filename) {
  return filename.replace('.astro', '');
}

/**
 * Main conversion function
 */
function convertDrafts() {
  console.log('🔄 Starting draft conversion...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Read all files from drafts directory
  const files = fs.readdirSync(DRAFTS_DIR);
  
  let converted = 0;
  let skipped = 0;
  let errors = 0;
  
  files.forEach(file => {
    // Skip non-Astro files and blacklisted files
    if (!file.endsWith('.astro') || SKIP_FILES.includes(file)) {
      console.log(`⏭️  Skipping: ${file}`);
      skipped++;
      return;
    }
    
    try {
      const filePath = path.join(DRAFTS_DIR, file);
      const slug = filenameToSlug(file);
      const outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
      
      // Check if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⚠️  Already exists: ${slug}.mdx`);
        skipped++;
        return;
      }
      
      console.log(`📝 Converting: ${file}`);
      
      // Parse Astro file
      const data = parseAstroFile(filePath);
      if (!data) {
        errors++;
        return;
      }
      
      // Generate MDX content
      const mdxContent = generateMDX(data);
      
      // Write MDX file
      fs.writeFileSync(outputPath, mdxContent, 'utf-8');
      
      console.log(`✅ Created: ${slug}.mdx (${data.category})`);
      converted++;
      
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
      errors++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Conversion complete!`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Errors:    ${errors}`);
  console.log('='.repeat(50));
}

// Run the conversion
convertDrafts();
