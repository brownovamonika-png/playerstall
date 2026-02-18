/**
 * Convert HTML comments to JSX comments and remove WordPress block comments
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  let changed = false;
  
  // Remove WordPress block comments completely (<!-- wp:... --> and <!-- /wp:... -->)
  const wpCommentRegex = /<!-- (?:\/)?wp:[a-z:-]+(?:\s+\{[^}]+\})? -->/g;
  if (wpCommentRegex.test(content)) {
    content = content.replace(wpCommentRegex, '');
    changed = true;
  }
  
  // Convert remaining HTML comments to JSX comments
  const htmlCommentRegex = /<!--\s*([\s\S]*?)\s*-->/g;
  if (htmlCommentRegex.test(content)) {
    content = content.replace(htmlCommentRegex, '{/* $1 */}');
    changed = true;
  }
  
  // Clean up extra blank lines (more than 2 consecutive)
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${fileName}`);
    return true;
  }
  
  return false;
}

function scanAndFix() {
  console.log('🔧 Fixing HTML comments in MDX files...\n');
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  let fixedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    if (fixFile(filePath)) {
      fixedCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Fix complete!`);
  console.log(`   Fixed: ${fixedCount} files`);
  console.log('='.repeat(50));
}

scanAndFix();
