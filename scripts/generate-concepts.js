const sharp = require('sharp');

// Let's create an HTML/SVG banner to render all options side-by-side with the "TourGuide" typography
// on the user's header background!

const headerBg = '#3d3432'; // user's screenshot background tone

const htmlContent = `
<svg width="900" height="420" viewBox="0 0 900 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="900" height="420" fill="${headerBg}"/>

  <defs>
    <linearGradient id="tgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#14b8a6"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
  </defs>

  <text x="450" y="45" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    MODERN &amp; MINIMALIST LOGO CONCEPTS
  </text>

  <!-- OPTION 1: Pure Transparent Minimalist Compass Needle (No white box, razor-sharp) -->
  <g transform="translate(60, 90)">
    <rect width="780" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
    <text x="30" y="46" font-family="sans-serif" font-size="14" font-weight="600" fill="#94a3b8">OPTION 1 (Pure Vector, No Box)</text>
    
    <!-- Logo Mark -->
    <g transform="translate(420, 20)">
      <!-- Modern faceted compass pointer -->
      <path d="M38 4L6 18L18 22L38 4Z" fill="#2dd4bf"/>
      <path d="M38 4L18 22L22 34L38 4Z" fill="#14b8a6"/>
      <circle cx="18" cy="22" r="2.5" fill="#ffffff"/>
      <circle cx="20" cy="20" r="18" stroke="#14b8a6" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="80 30" stroke-linecap="round"/>
    </g>
    <!-- Text -->
    <text x="474" y="48" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#14b8a6">Guide</tspan>
    </text>
  </g>

  <!-- OPTION 2: Sleek Teal Gradient Squircle with Minimalist Compass Star -->
  <g transform="translate(60, 190)">
    <rect width="780" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
    <text x="30" y="46" font-family="sans-serif" font-size="14" font-weight="600" fill="#94a3b8">OPTION 2 (Sleek Gradient Badge)</text>

    <!-- Logo Mark -->
    <g transform="translate(420, 20)">
      <rect width="40" height="40" rx="11" fill="url(#glowGrad)"/>
      <!-- Crisp white 4-point faceted compass inside -->
      <path d="M20 7L20 20L25 20L20 7Z" fill="#ffffff"/>
      <path d="M20 7L15 20L20 20L20 7Z" fill="#e0f2fe"/>
      <path d="M20 33L20 20L15 20L20 33Z" fill="#99f6e4"/>
      <path d="M20 33L25 20L20 20L20 33Z" fill="#5eead4"/>
      <path d="M33 20L20 20L20 15L33 20Z" fill="#ffffff"/>
      <path d="M33 20L20 25L20 20L33 20Z" fill="#99f6e4"/>
      <path d="M7 20L20 20L20 25L7 20Z" fill="#e0f2fe"/>
      <path d="M7 20L20 15L20 20L7 20Z" fill="#5eead4"/>
      <circle cx="20" cy="20" r="2" fill="#0f766e"/>
    </g>
    <!-- Text -->
    <text x="474" y="48" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#14b8a6">Guide</tspan>
    </text>
  </g>

  <!-- OPTION 3: Geometric Compass Horizon (AirBnb / Raycast simplicity) -->
  <g transform="translate(60, 290)">
    <rect width="780" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
    <text x="30" y="46" font-family="sans-serif" font-size="14" font-weight="600" fill="#94a3b8">OPTION 3 (Minimalist Horizon Diamond)</text>

    <!-- Logo Mark -->
    <g transform="translate(420, 20)">
      <rect width="40" height="40" rx="11" fill="#0f766e" fill-opacity="0.3" stroke="rgba(20, 184, 166, 0.4)" stroke-width="1.5"/>
      <!-- Sleek origami delta -->
      <path d="M20 9L29 27L20 22L20 9Z" fill="#2dd4bf"/>
      <path d="M20 9L11 27L20 22L20 9Z" fill="#14b8a6"/>
      <path d="M20 31L14 28L20 22L26 28L20 31Z" fill="#ffffff" fill-opacity="0.8"/>
    </g>
    <!-- Text -->
    <text x="474" y="48" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Tour<tspan fill="#14b8a6">Guide</tspan>
    </text>
  </g>
</svg>
`;

sharp(Buffer.from(htmlContent))
  .png()
  .toFile('scripts/concepts.png')
  .then(() => console.log('Saved scripts/concepts.png'));
