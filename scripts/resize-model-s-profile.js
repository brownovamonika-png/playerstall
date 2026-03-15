/**
 * Resize Model S locker image to profile picture size (400x400).
 * Output: public/images/model-s-locker-profile.png
 * Run: node scripts/resize-model-s-profile.js
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const inputPath = path.join(projectRoot, 'public/images/stadium-locker.png');
const outputPath = path.join(projectRoot, 'public/images/model-s-locker-profile.png');

sharp(inputPath)
  .resize(400, 400, { fit: 'cover', position: 'center' })
  .png()
  .toFile(outputPath)
  .then(() => console.log('Created profile image:', outputPath))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
