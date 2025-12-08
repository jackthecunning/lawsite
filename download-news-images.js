import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.pexels.com/photos/8111855/pexels-photo-8111855.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'appellate-case.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'environmental-victory.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'medical-settlement.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/8111769/pexels-photo-8111769.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'federal-appeal.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'municipal-case.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'personal-injury-victory.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    filename: 'new-attorney.jpg'
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAll = async () => {
  const outputDir = path.join(__dirname, 'public', 'images', 'news');

  console.log('Downloading news article images...\n');

  for (const image of images) {
    const filepath = path.join(outputDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('\nAll downloads complete!');
};

downloadAll();
