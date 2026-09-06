const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  // 1. Standalone Mark (Transparent SVG)
  const iconSvg = `
  <svg width="512" height="512" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="19" cy="19" r="16.5" stroke="#2dd4bf" stroke-width="2.2" stroke-opacity="0.45" stroke-dasharray="72 26" stroke-linecap="round"/>
    <path d="M33 5L7 17L17.5 21L33 5Z" fill="#2dd4bf"/>
    <path d="M33 5L17.5 21L21.5 32L33 5Z" fill="#0d9488"/>
    <circle cx="17.5" cy="21" r="2" fill="#ffffff"/>
  </svg>
  `;

  // 2. App Icon with sleek dark background for PWA / Touch icons
  const appIconSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="112" fill="#090d16"/>
    <rect width="510" height="510" x="1" y="1" rx="111" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    <g transform="translate(106, 106) scale(7.89)">
      <circle cx="19" cy="19" r="16.5" stroke="#2dd4bf" stroke-width="2.2" stroke-opacity="0.45" stroke-dasharray="72 26" stroke-linecap="round"/>
      <path d="M33 5L7 17L17.5 21L33 5Z" fill="#2dd4bf"/>
      <path d="M33 5L17.5 21L21.5 32L33 5Z" fill="#0d9488"/>
      <circle cx="17.5" cy="21" r="2" fill="#ffffff"/>
    </g>
  </svg>
  `;

  // 3. Social / OpenGraph Banner (1200 x 630)
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#090d16"/>
    
    <!-- Subtle glow background effect -->
    <circle cx="600" cy="260" r="320" fill="#0d9488" fill-opacity="0.12"/>
    
    <!-- Logo Mark -->
    <g transform="translate(380, 180) scale(3.5)">
      <circle cx="19" cy="19" r="16.5" stroke="#2dd4bf" stroke-width="2.2" stroke-opacity="0.5" stroke-dasharray="72 26" stroke-linecap="round"/>
      <path d="M33 5L7 17L17.5 21L33 5Z" fill="#2dd4bf"/>
      <path d="M33 5L17.5 21L21.5 32L33 5Z" fill="#0d9488"/>
      <circle cx="17.5" cy="21" r="2" fill="#ffffff"/>
    </g>

    <!-- Brand Typography -->
    <text x="540" y="270" font-family="'Inter', -apple-system, sans-serif" font-size="76" font-weight="800" fill="#ffffff" letter-spacing="-1.5">
      Tour<tspan fill="#2dd4bf">Guide</tspan>
    </text>

    <!-- Tagline -->
    <text x="600" y="380" font-family="'Inter', -apple-system, sans-serif" font-size="28" font-weight="500" fill="#94a3b8" text-anchor="middle" letter-spacing="-0.2">
      Discover Unforgettable Experiences Worldwide
    </text>
    
    <!-- Pill badges -->
    <g transform="translate(420, 430)">
      <rect width="360" height="42" rx="21" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
      <text x="180" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="15" font-weight="600" fill="#5eead4" text-anchor="middle">
        Verified Local Guides  •  Instant Confirmation
      </text>
    </g>
  </svg>
  `;

  console.log('Generating assets...');

  // Generate favicon.png (64x64)
  await sharp(Buffer.from(iconSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));
  console.log('Saved public/favicon.png');

  // Generate favicon.ico (32x32 PNG inside ico)
  const icoBuffer = await sharp(Buffer.from(iconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico and src/app/favicon.ico');

  // Generate logo-icon.png (512x512 transparent)
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/logo-icon.png'));
  console.log('Saved public/logo-icon.png');

  // Generate icon-192.png and icon-512.png
  await sharp(Buffer.from(appIconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon-192.png'));
  await sharp(Buffer.from(appIconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/icon-512.png'));
  console.log('Saved public/icon-192.png and public/icon-512.png');

  // Generate logo.png (1200x630 OG banner)
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../public/logo.png'));
  console.log('Saved public/logo.png');

  console.log('All brand assets successfully generated!');
}

run().catch(console.error);
