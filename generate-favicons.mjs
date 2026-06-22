import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'logo.png');

async function generateFavicons() {
  try {
    console.log('Generating Google-compliant favicons...');
    
    // 1. Google Search requirement: multiple of 48px (we'll use 192x192)
    await sharp(inputPath)
      .resize({
        width: 192,
        height: 192,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent
      })
      .toFile(path.join(__dirname, 'public', 'favicon-192.png'));
      
    // 2. Apple Touch Icon requirement: 180x180
    await sharp(inputPath)
      .resize({
        width: 180,
        height: 180,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // white background for apple
      })
      .flatten({ background: { r: 255, g: 255, b: 255 } }) // Ensure no transparency
      .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));

    // 3. Fallback standard favicon size (32x32)
    await sharp(inputPath)
      .resize({
        width: 32,
        height: 32,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(__dirname, 'public', 'favicon-32.png'));

    console.log('Successfully generated favicons!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
