import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'public', 'Projects');

async function convertImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const inputPath = path.join(directoryPath, file);
        const outputPath = path.join(directoryPath, `${path.parse(file).name}.webp`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Converted ${file} to ${path.parse(file).name}.webp`);
        // Optional: delete original file
        // fs.unlinkSync(inputPath);
      }
    }
    console.log('Done!');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertImages();
