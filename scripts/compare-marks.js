const sharp = require('sharp');

const svgVariants = `
<svg width="900" height="360" viewBox="0 0 900 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark Header Preview BG -->
  <rect width="900" height="180" fill="#2d2524"/>
  <!-- Light Header Preview BG -->
  <rect y="180" width="900" height="180" fill="#ffffff"/>
  <line x1="0" y1="180" x2="900" y2="180" stroke="#e2e8f0" stroke-width="1"/>
  
  <defs>
    <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
    <linearGradient id="deepTeal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#115e59"/>
    </linearGradient>
  </defs>

  <!-- MARK A: Origami Exploration Compass (Pure Vector, Modern Facets) -->
  <g transform="translate(50, 65)">
    <g>
      <circle cx="19" cy="19" r="17" stroke="#2dd4bf" stroke-width="2" stroke-opacity="0.35" stroke-dasharray="75 28" stroke-linecap="round"/>
      <path d="M33 5L6 17L17 21L33 5Z" fill="#2dd4bf"/>
      <path d="M33 5L17 21L21 33L33 5Z" fill="#0d9488"/>
      <circle cx="17" cy="21" r="2" fill="#ffffff"/>
    </g>
    <text x="46" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#2dd4bf">Guide</tspan>
    </text>
  </g>

  <!-- MARK B: Dynamic Travel Compass Delta (Ultra-Modern Minimal) -->
  <g transform="translate(360, 65)">
    <g>
      <path d="M32 6L9 18L18 22L32 6Z" fill="#2dd4bf"/>
      <path d="M32 6L18 22L22 31L32 6Z" fill="#14b8a6"/>
      <circle cx="18" cy="22" r="2" fill="#ffffff"/>
    </g>
    <text x="44" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#2dd4bf">Guide</tspan>
    </text>
  </g>

  <!-- MARK C: North Star / Horizon Diamond (Bold Icon) -->
  <g transform="translate(660, 65)">
    <g>
      <path d="M19 3L24 14L35 19L24 24L19 35L14 24L3 19L14 14L19 3Z" fill="url(#tealGrad)"/>
      <path d="M19 3L24 14L19 19L14 14L19 3Z" fill="#5eead4"/>
      <circle cx="19" cy="19" r="2.5" fill="#042f2e"/>
    </g>
    <text x="46" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#2dd4bf">Guide</tspan>
    </text>
  </g>

  <!-- Light Header Row -->
  <!-- MARK A on Light -->
  <g transform="translate(50, 245)">
    <g>
      <circle cx="19" cy="19" r="17" stroke="#0d9488" stroke-width="2" stroke-opacity="0.3" stroke-dasharray="75 28" stroke-linecap="round"/>
      <path d="M33 5L6 17L17 21L33 5Z" fill="#0d9488"/>
      <path d="M33 5L17 21L21 33L33 5Z" fill="#0f766e"/>
      <circle cx="17" cy="21" r="2" fill="#042f2e"/>
    </g>
    <text x="46" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#0f172a" letter-spacing="-0.5">
      Tour<tspan fill="#0d9488">Guide</tspan>
    </text>
  </g>

  <!-- MARK B on Light -->
  <g transform="translate(360, 245)">
    <g>
      <path d="M32 6L9 18L18 22L32 6Z" fill="#0d9488"/>
      <path d="M32 6L18 22L22 31L32 6Z" fill="#0f766e"/>
      <circle cx="18" cy="22" r="2" fill="#042f2e"/>
    </g>
    <text x="44" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#0f172a" letter-spacing="-0.5">
      Tour<tspan fill="#0d9488">Guide</tspan>
    </text>
  </g>

  <!-- MARK C on Light -->
  <g transform="translate(660, 245)">
    <g>
      <path d="M19 3L24 14L35 19L24 24L19 35L14 24L3 19L14 14L19 3Z" fill="url(#deepTeal)"/>
      <path d="M19 3L24 14L19 19L14 14L19 3Z" fill="#14b8a6"/>
      <circle cx="19" cy="19" r="2.5" fill="#ffffff"/>
    </g>
    <text x="46" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#0f172a" letter-spacing="-0.5">
      Tour<tspan fill="#0d9488">Guide</tspan>
    </text>
  </g>
</svg>
`;

sharp(Buffer.from(svgVariants)).png().toFile('scripts/marks-comparison.png').then(() => {
  console.log('Successfully saved scripts/marks-comparison.png');
});
