import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'logo.png');
const outputPath = path.join(__dirname, 'public', 'logo_trimmed.png');

async function trimLogo() {
  try {
    await sharp(inputPath)
      .trim()
      .toFile(outputPath);
      
    console.log('Successfully trimmed logo.png');
  } catch (error) {
    console.error('Error trimming logo:', error);
  }
}

trimLogo();
