/**
 * Script to fix truncated descriptions in MDX frontmatter
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if description ends with \" or \' (truncated)
  const truncatedDescMatch = content.match(/description:\s*"([^"]*)\\\"/);
  
  if (truncatedDescMatch) {
    const fileName = path.basename(filePath);
    console.log(`🔧 Fixing: ${fileName}`);
    
    // Try to extract the full first paragraph from content
    const contentAfterFrontmatter = content.split('---')[2];
    if (contentAfterFrontmatter) {
      const firstParagraph = contentAfterFrontmatter.trim().split('\n\n')[0];
      // Remove markdown links and clean up
      const cleanText = firstParagraph
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
        .replace(/\*\*/g, '') // Remove bold markers
        .replace(/\*/g, '') // Remove italic markers
        .trim();
      
      // Truncate to reasonable length (150-160 chars)
      let description = cleanText.substring(0, 160);
      if (cleanText.length > 160) {
        description = description.substring(0, description.lastIndexOf(' ')) + '...';
      }
      
      // Fix the content
      const fixed = content.replace(
        /description:\s*"[^"]*\\"/,
        `description: "${description}"`
      );
      
      fs.writeFileSync(filePath, fixed, 'utf-8');
      console.log(`   ✅ Fixed with: "${description}"`);
      return true;
    }
  }
  
  return false;
}

function scanAndFix() {
  console.log('🔍 Scanning for truncated descriptions...\n');
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  let fixedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    if (fixFile(filePath)) {
      fixedCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Scan complete!`);
  console.log(`   Fixed: ${fixedCount} files`);
  console.log('='.repeat(50));
}

scanAndFix();
