/**
 * Clean up remaining HTML issues in MDX files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function cleanHTML(content) {
  let cleaned = content;
  
  // Convert HTML strong/bold to Markdown
  cleaned = cleaned.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  cleaned = cleaned.replace(/<b>(.*?)<\/b>/g, '**$1**');
  
  // Convert HTML em/italic to Markdown
  cleaned = cleaned.replace(/<em>(.*?)<\/em>/g, '*$1*');
  cleaned = cleaned.replace(/<i>(.*?)<\/i>/g, '*$1*');
  
  // Convert HTML headings to Markdown
  cleaned = cleaned.replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1');
  cleaned = cleaned.replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1');
  cleaned = cleaned.replace(/<h4[^>]*>(.*?)<\/h4>/g, '#### $1');
  
  // Convert HTML lists to Markdown
  cleaned = cleaned.replace(/<ul[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/ul>/g, '');
  cleaned = cleaned.replace(/<ol[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/ol>/g, '');
  cleaned = cleaned.replace(/<li>(.*?)<\/li>/g, '- $1');
  
  // Convert HTML paragraphs
  cleaned = cleaned.replace(/<p>(.*?)<\/p>/gs, '$1\n');
  
  // Remove span tags
  cleaned = cleaned.replace(/<\/?span[^>]*>/g, '');
  
  // Remove figure/figcaption tags
  cleaned = cleaned.replace(/<figure[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/figure>/g, '');
  cleaned = cleaned.replace(/<figcaption>(.*?)<\/figcaption>/g, '\n*$1*\n');
  
  // Fix img tags to be self-closing Markdown
  cleaned = cleaned.replace(/<img src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/g, '![$2]($1)');
  cleaned = cleaned.replace(/<img src="([^"]+)"[^>]*>/g, '![]($1)');
  
  // Convert HTML links to Markdown
  cleaned = cleaned.replace(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
  
  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<br\s*\/?>/g, '\n');
  cleaned = cleaned.replace(/&nbsp;/g, ' ');
  cleaned = cleaned.replace(/&amp;/g, '&');
  cleaned = cleaned.replace(/&lt;/g, '<');
  cleaned = cleaned.replace(/&gt;/g, '>');
  cleaned = cleaned.replace(/&quot;/g, '"');
  
  // Clean up multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned;
}

function fixFile(filePath) {
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Extract frontmatter and content separately
  const match = originalContent.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!match) {
    console.error(`❌ ${fileName}: Could not parse frontmatter`);
    return false;
  }
  
  const frontmatter = match[1];
  const content = match[2];
  
  // Clean the content
  const cleanedContent = cleanHTML(content);
  
  if (cleanedContent !== content) {
    const finalContent = frontmatter + cleanedContent;
    fs.writeFileSync(filePath, finalContent, 'utf-8');
    console.log(`✅ Fixed: ${fileName}`);
    return true;
  }
  
  return false;
}

function scanAndFix() {
  console.log('🔧 Cleaning HTML in MDX files...\n');
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  let fixedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    try {
      if (fixFile(filePath)) {
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Cleanup complete!`);
  console.log(`   Fixed: ${fixedCount} files`);
  console.log('='.repeat(50));
}

scanAndFix();
