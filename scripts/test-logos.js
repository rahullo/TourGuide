const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Design 1: Ultra-modern faceted Compass Arrow (minimalist, bold, geometric)
// Pointing North-East (direction of adventure / growth), with two clean gradient facets and an orbital trajectory ring.
const svgDesign1 = `
<svg width="256" height="256" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="facet1" x1="14" y1="12" x2="52" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#14b8a6"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="facet2" x1="32" y1="10" x2="52" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#14b8a6"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
      <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Modern minimalist compass needle: sleek, bold, iconic -->
  <!-- Left Wing / Facet -->
  <path d="M48 16L18 36L28 28L48 16Z" fill="url(#facet1)"/>
  <!-- Right Wing / Facet -->
  <path d="M48 16L28 28L36 46L48 16Z" fill="url(#facet2)"/>
  <!-- Central core crease -->
  <path d="M28 28L48 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
  <!-- Rear tail accent -->
  <path d="M24 32L18 36L28 28L36 46L32 40L28 32Z" fill="#0f766e" fill-opacity="0.3"/>
  <!-- Minimalist orbit ring behind -->
  <circle cx="32" cy="32" r="26" stroke="url(#ringGrad)" stroke-width="3" stroke-dasharray="140 30" stroke-linecap="round"/>
</svg>
`;

// Design 2: Pure Luxury Tech Vector (Super clean, bold "compass jet" monogram vibe)
const svgDesign2 = `
<svg width="256" height="256" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#0f766e"/>
      <stop offset="100%" stopColor="#134e4a"/>
    </linearGradient>
    <linearGradient id="arrowGrad" x1="20" y1="12" x2="50" y2="44" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#14b8a6"/>
    </linearGradient>
  </defs>
  
  <!-- Sleek Squircle badge with glow or pure transparent -->
  <rect width="64" height="64" rx="18" fill="url(#bgGrad)"/>
  
  <!-- Minimalist North-East Compass Arrow -->
  <path d="M46 18L18 34L28 28L46 18Z" fill="#ffffff" fill-opacity="0.95"/>
  <path d="M46 18L28 28L34 46L46 18Z" fill="url(#arrowGrad)"/>
  <circle cx="28" cy="28" r="3" fill="#ffffff"/>
</svg>
`;

// Design 3: Transparent, ultra-minimalist geometric Compass (AirBnb / Linear style)
// Just pure icon, no badge, blends seamlessly everywhere!
const svgDesign3 = `
<svg width="256" height="256" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="d3_grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="50%" stopColor="#14b8a6"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="d3_grad2" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#0f766e"/>
      <stop offset="100%" stopColor="#115e59"/>
    </linearGradient>
  </defs>
  
  <!-- Outer Compass Ring with 4 cardinal tick notches -->
  <circle cx="32" cy="32" r="26" stroke="url(#d3_grad)" stroke-width="4"/>
  <!-- Top notch -->
  <line x1="32" y1="2" x2="32" y2="10" stroke="url(#d3_grad)" stroke-width="4" stroke-linecap="round"/>
  <!-- Right notch -->
  <line x1="54" y1="32" x2="62" y2="32" stroke="url(#d3_grad)" stroke-width="4" stroke-linecap="round"/>
  
  <!-- The Arrow: Pure modern geometric needle pointing NE -->
  <path d="M46 18L22 32L30 26L46 18Z" fill="url(#d3_grad)"/>
  <path d="M46 18L30 26L32 42L46 18Z" fill="url(#d3_grad2)"/>
  <circle cx="30" cy="26" r="3.5" fill="white"/>
</svg>
`;

// Design 4: The "Paper Jet & Compass Star" (Ultra Simple, Iconic, Modern Travel Vibe)
// Think Telegram/Linear level simplicity. 
const svgDesign4 = `
<svg width="256" height="256" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2dd4bf"/>
      <stop offset="100%" stopColor="#0f766e"/>
    </linearGradient>
    <linearGradient id="shadeGrad" x1="20" y1="20" x2="50" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#0f766e"/>
      <stop offset="100%" stopColor="#042f2e"/>
    </linearGradient>
  </defs>
  
  <!-- Smooth rounded backdrop or standalone mark -->
  <!-- Bold modern Compass Diamond / Arrow -->
  <!-- North-East pointer (bright teal) -->
  <path d="M52 12L24 28L36 36L52 12Z" fill="url(#mainGrad)"/>
  <!-- South-West tail (deep teal) -->
  <path d="M12 52L24 28L36 36L12 52Z" fill="url(#shadeGrad)"/>
  <!-- Center division line -->
  <path d="M24 28L36 36" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

async function testSvgs() {
  await sharp(Buffer.from(svgDesign1)).png().toFile('scripts/test1.png');
  await sharp(Buffer.from(svgDesign2)).png().toFile('scripts/test2.png');
  await sharp(Buffer.from(svgDesign3)).png().toFile('scripts/test3.png');
  await sharp(Buffer.from(svgDesign4)).png().toFile('scripts/test4.png');
  console.log('Generated test images in scripts/');
}

testSvgs();
