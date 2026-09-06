const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\daac27ab-7db9-4f77-b967-519da31a2d8b\\tourguide_logo_1788717207753.jpg';
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'src', 'app');

async function processLogo() {
  console.log('Reading source image from:', srcImage);
  const metadata = await sharp(srcImage).metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);

  // 1. Full logo (saved to public/logo.png)
  await sharp(srcImage)
    .resize(800, 800)
    .png()
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('Saved public/logo.png');

  // 2. Focused emblem (crop the compass part: perfectly centered, excluding bottom text)
  const emblemSize = 700;
  const emblemLeft = Math.round((metadata.width - emblemSize) / 2); // 162
  const emblemTop = 68; // ends at 768, safely above text at ~780

  await sharp(srcImage)
    .extract({ left: emblemLeft, top: emblemTop, width: emblemSize, height: emblemSize })
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo-icon.png'));
  console.log('Saved public/logo-icon.png');

  // 3. Apple Touch Icon / Web App Icon (192x192)
  await sharp(path.join(publicDir, 'logo-icon.png'))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // 4. Favicon 32x32 & 48x48
  await sharp(path.join(publicDir, 'logo-icon.png'))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // Save to src/app/favicon.ico and public/favicon.ico
  // A PNG 32x32 saved as .ico works cleanly in modern browsers and Turbopack
  const icoBuffer = await sharp(path.join(publicDir, 'logo-icon.png'))
    .resize(48, 48)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved favicon.ico to app and public dirs');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
