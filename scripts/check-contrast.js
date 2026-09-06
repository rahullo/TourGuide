const sharp = require('sharp');

const htmlContrast = `
<svg width="800" height="300" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark Header Preview -->
  <rect width="800" height="150" fill="#2d2524"/>
  <text x="30" y="35" font-family="sans-serif" font-size="12" font-weight="600" fill="#a8a29e">TRANSPARENT HEADER (HERO BACKGROUND)</text>
  
  <g transform="translate(40, 60)">
    <!-- Option 1 Logo Mark -->
    <path d="M38 4L6 18L18 22L38 4Z" fill="#2dd4bf"/>
    <path d="M38 4L18 22L22 34L38 4Z" fill="#14b8a6"/>
    <circle cx="18" cy="22" r="2.5" fill="#ffffff"/>
    <circle cx="20" cy="20" r="18" stroke="#2dd4bf" stroke-width="2.5" stroke-opacity="0.45" stroke-dasharray="82 30" stroke-linecap="round"/>
    <!-- Typography -->
    <text x="50" y="27" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#14b8a6">Guide</tspan>
    </text>
  </g>

  <!-- Light / Scrolled Header Preview -->
  <rect y="150" width="800" height="150" fill="#ffffff"/>
  <line x1="0" y1="150" x2="800" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <text x="30" y="185" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">SCROLLED HEADER (WHITE/LIGHT SURFACE)</text>

  <g transform="translate(40, 210)">
    <!-- Option 1 Logo Mark -->
    <path d="M38 4L6 18L18 22L38 4Z" fill="#0f766e"/>
    <path d="M38 4L18 22L22 34L38 4Z" fill="#14b8a6"/>
    <circle cx="18" cy="22" r="2.5" fill="#042f2e"/>
    <circle cx="20" cy="20" r="18" stroke="#0f766e" stroke-width="2.5" stroke-opacity="0.35" stroke-dasharray="82 30" stroke-linecap="round"/>
    <!-- Typography -->
    <text x="50" y="27" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#0f172a" letter-spacing="-0.5">
      Tour<tspan fill="#0f766e">Guide</tspan>
    </text>
  </g>
</svg>
`;

sharp(Buffer.from(htmlContrast))
  .png()
  .toFile('scripts/contrast.png')
  .then(() => console.log('Saved scripts/contrast.png'));
