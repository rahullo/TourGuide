const sharp = require('sharp');

// Design A: Ultra-Minimalist Geometric Compass Star (4 faceted diamond points)
// Clean, luxurious, razor-sharp vector mark.
const svgA = `
<svg width="128" height="128" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gA1" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#14b8a6"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="gA2" x1="4" y1="24" x2="44" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0d9488"/>
    </linearGradient>
  </defs>
  <!-- North facet (bright) -->
  <path d="M24 4L24 24L31 24L24 4Z" fill="#2dd4bf"/>
  <!-- North facet (dark) -->
  <path d="M24 4L17 24L24 24L24 4Z" fill="#0f766e"/>
  <!-- South facet (bright) -->
  <path d="M24 44L24 24L17 24L24 44Z" fill="#14b8a6"/>
  <!-- South facet (dark) -->
  <path d="M24 44L31 24L24 24L24 44Z" fill="#094e47"/>
  <!-- East facet (bright) -->
  <path d="M44 24L24 24L24 17L44 24Z" fill="#14b8a6"/>
  <!-- East facet (dark) -->
  <path d="M44 24L24 31L24 24L44 24Z" fill="#0d9488"/>
  <!-- West facet (bright) -->
  <path d="M4 24L24 24L24 31L4 24Z" fill="#2dd4bf"/>
  <!-- West facet (dark) -->
  <path d="M4 24L24 17L24 24L4 24Z" fill="#0f766e"/>
  <!-- Center core accent -->
  <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
</svg>
`;

// Design B: Modern Sleek Exploration Arrow / Delta Jet (Airbnb / Linear aesthetic)
// Angled at 45 degrees, bold, aerodynamic, instant recognition
const svgB = `
<svg width="128" height="128" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gB1" x1="38" y1="10" x2="10" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="gB2" x1="38" y1="10" x2="20" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#14b8a6"/>
      <stop offset="100%" stopColor="#042f2e"/>
    </linearGradient>
  </defs>
  <!-- Top wing: vivid turquoise/teal -->
  <path d="M40 8L8 24L24 24L40 8Z" fill="url(#gB1)"/>
  <!-- Bottom wing: deep emerald/teal -->
  <path d="M40 8L24 24L24 40L40 8Z" fill="url(#gB2)"/>
  <!-- Center notch highlight -->
  <path d="M24 24L40 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.8"/>
  <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
</svg>
`;

// Design C: Modern Pin + Compass Ring (Bold, Iconic, Travel-Native)
// The universal symbol of tours & navigation, stripped down to pure geometry
const svgC = `
<svg width="128" height="128" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gC1" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
  </defs>
  <!-- Sleek outer ring with subtle gap -->
  <circle cx="24" cy="24" r="18" stroke="url(#gC1)" stroke-width="3.5" stroke-dasharray="90 24" stroke-linecap="round"/>
  <!-- Bold compass needle pointing NE -->
  <path d="M34 14L18 22L24 24L34 14Z" fill="#2dd4bf"/>
  <path d="M34 14L24 24L26 30L34 14Z" fill="#0f766e"/>
  <!-- Southwest tail -->
  <path d="M14 34L24 24L22 18L14 34Z" fill="#0d9488" fill-opacity="0.5"/>
  <path d="M14 34L30 26L24 24L14 34Z" fill="#14b8a6" fill-opacity="0.5"/>
  <circle cx="24" cy="24" r="2.5" fill="white"/>
</svg>
`;

// Design D: Minimalist Modern "TG" Monogram / Compass Horizon (Tech Startup Vibe)
// Like Stripe or Vercel: simple, clever, unforgettable
const svgD = `
<svg width="128" height="128" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gD1" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
  </defs>
  <!-- Minimalist compass diamond: sleek and bold -->
  <path d="M24 4L34 24L24 20L24 4Z" fill="#2dd4bf"/>
  <path d="M24 4L14 24L24 20L24 4Z" fill="#0f766e"/>
  <path d="M24 44L14 24L24 28L24 44Z" fill="#14b8a6" fill-opacity="0.4"/>
  <path d="M24 44L34 24L24 28L24 44Z" fill="#0f766e" fill-opacity="0.4"/>
  <circle cx="24" cy="24" r="2" fill="#ffffff"/>
</svg>
`;

// Let's create a mockup banner showing each design next to "TourGuide" on both dark header and white background
async function renderMockup() {
  await sharp(Buffer.from(svgA)).png().toFile('scripts/designA.png');
  await sharp(Buffer.from(svgB)).png().toFile('scripts/designB.png');
  await sharp(Buffer.from(svgC)).png().toFile('scripts/designC.png');
  await sharp(Buffer.from(svgD)).png().toFile('scripts/designD.png');
  console.log('Saved designA, designB, designC, designD');
}

renderMockup();
