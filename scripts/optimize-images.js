// Image optimization script for Budd's Plumbing website
// Run with: node scripts/optimize-images.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './assets/images/raw';
const outputDir = './public/assets/images';

// Ensure output directories exist
const dirs = ['hero', 'services', 'team', 'logos'];
dirs.forEach(dir => {
  const dirPath = path.join(outputDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Optimization settings
const settings = {
  hero: {
    webp: { width: 1200, height: 800, quality: 85 },
    jpg: { width: 1200, height: 800, quality: 90 }
  },
  services: {
    webp: { width: 600, height: 400, quality: 80 },
    jpg: { width: 600, height: 400, quality: 85 }
  },
  team: {
    webp: { width: 400, height: 400, quality: 80 },
    jpg: { width: 400, height: 400, quality: 85 }
  },
  logos: {
    // SVG preferred, PNG backup
    png: { width: 200, height: 200, quality: 95 }
  }
};

async function optimizeImages() {
  if (!fs.existsSync(inputDir)) {
    console.log('Create ./assets/images/raw directory and add your images');
    return;
  }

  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    // Determine category from filename
    let category = 'services'; // default
    if (name.includes('hero')) category = 'hero';
    if (name.includes('team')) category = 'team';
    if (name.includes('logo')) category = 'logos';

    const config = settings[category];

    try {
      // Generate WebP
      if (config.webp) {
        await sharp(inputPath)
          .resize(config.webp.width, config.webp.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: config.webp.quality })
          .toFile(path.join(outputDir, category, `${name}.webp`));

        console.log(`✅ ${name}.webp created`);
      }

      // Generate JPG fallback
      if (config.jpg) {
        await sharp(inputPath)
          .resize(config.jpg.width, config.jpg.height, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: config.jpg.quality })
          .toFile(path.join(outputDir, category, `${name}.jpg`));

        console.log(`✅ ${name}.jpg created`);
      }

      // Generate PNG for logos
      if (config.png) {
        await sharp(inputPath)
          .resize(config.png.width, config.png.height, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .png({ quality: config.png.quality })
          .toFile(path.join(outputDir, category, `${name}.png`));

        console.log(`✅ ${name}.png created`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
}

optimizeImages();