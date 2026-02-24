/**
 * Validate and report all MDX frontmatter issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    console.error(`❌ ${fileName}: No frontmatter found`);
    return false;
  }
  
  const frontmatter = frontmatterMatch[1];
  
  try {
    yaml.load(frontmatter);
    return true;
  } catch (error) {
    console.error(`❌ ${fileName}:`);
    console.error(`   Error: ${error.message}`);
    console.error(`   Line: ${error.mark?.line || 'unknown'}`);
    
    // Show the problematic lines
    const lines = frontmatter.split('\n');
    const errorLine = error.mark?.line || 0;
    const start = Math.max(0, errorLine - 2);
    const end = Math.min(lines.length, errorLine + 3);
    
    console.error(`   Context:`);
    for (let i = start; i < end; i++) {
      const marker = i === errorLine ? ' >>> ' : '     ';
      console.error(`${marker}${i + 1}: ${lines[i]}`);
    }
    console.error('');
    
    return false;
  }
}

function scanAll() {
  console.log('🔍 Validating MDX frontmatter...\n');
  
  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .sort();
  
  let validCount = 0;
  let errorCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    if (validateFile(filePath)) {
      validCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log('='.repeat(50));
  console.log(`✨ Validation complete!`);
  console.log(`   Valid:  ${validCount} files`);
  console.log(`   Errors: ${errorCount} files`);
  console.log('='.repeat(50));
  
  return errorCount === 0;
}

const success = scanAll();
process.exit(success ? 0 : 1);
