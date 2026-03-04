import sharp from 'sharp';
import fs from 'fs';

const inputPath = '/vercel/share/v0-project/public/images/worried-man.png';
const outputPath = '/vercel/share/v0-project/public/images/worried-man-clean.png';

async function removeCheckerboard() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log('[v0] Image metadata:', metadata.format, metadata.width, 'x', metadata.height, 'channels:', metadata.channels, 'hasAlpha:', metadata.hasAlpha);

  // Read raw pixel data
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  console.log('[v0] Raw info:', info);

  const { width, height, channels } = info;
  const output = Buffer.from(data);

  // The checkerboard pattern consists of white (#FFFFFF) and light gray (#C0C0C0 or similar) pixels
  // We need to make these transparent while keeping the illustration pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = output[idx];
      const g = output[idx + 1];
      const b = output[idx + 2];

      // Detect checkerboard: white or light gray pixels
      // White squares: ~255,255,255
      // Gray squares: ~192,192,192 or ~204,204,204
      const isWhite = r > 245 && g > 245 && b > 245;
      const isLightGray = r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && r < 220;
      
      if (isWhite || isLightGray) {
        // Make transparent
        output[idx + 3] = 0;
      }
    }
  }

  await sharp(output, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log('[v0] Saved cleaned image to', outputPath);
  
  // Replace original
  fs.copyFileSync(outputPath, inputPath);
  fs.unlinkSync(outputPath);
  console.log('[v0] Replaced original file');
}

removeCheckerboard().catch(err => console.error('[v0] Error:', err));
