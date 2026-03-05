import sharp from 'sharp';
import { writeFileSync } from 'fs';

const svg = `<svg viewBox="4 2 94 94" xmlns="http://www.w3.org/2000/svg"><path fill="#1565C0" d="M52 8 C30 4, 10 18, 8 42 C6 60, 16 76, 32 84 C44 90, 52 92, 58 88 C62 86, 60 78, 64 72 C68 66, 78 66, 84 60 C92 52, 94 36, 86 22 C78 10, 66 10, 52 8Z"/></svg>`;

const svgBuffer = Buffer.from(svg);

// Generate 32x32 icons (light and dark are same - blue blob on transparent)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/icon-light-32x32.png');

await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/icon-dark-32x32.png');

// Generate apple-icon 180x180
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile('public/apple-icon.png');

console.log('Favicons generated successfully!');
