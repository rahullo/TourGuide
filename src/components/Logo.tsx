import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  scrolled?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export default function Logo({
  size = 34,
  className = '',
  scrolled,
  variant,
}: LogoProps) {
  // If variant is 'dark' or scrolled is true, render with deep teal for light backgrounds.
  // Otherwise, render with luminous cyan/teal for dark backgrounds.
  const isLightSurface = variant === 'dark' || (scrolled === true && variant !== 'light');

  const needleLight = isLightSurface ? '#0d9488' : '#2dd4bf';
  const needleDark = isLightSurface ? '#0f766e' : '#14b8a6';
  const ringColor = isLightSurface ? '#0d9488' : '#2dd4bf';
  const centerDot = isLightSurface ? '#042f2e' : '#ffffff';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        flexShrink: 0,
        display: 'inline-block',
        verticalAlign: 'middle',
        transition: 'all 0.25s ease',
      }}
      aria-label="TourGuide Logo"
    >
      {/* Orbital guidance ring */}
      <circle
        cx="19"
        cy="19"
        r="16.5"
        stroke={ringColor}
        strokeWidth="2.2"
        strokeOpacity={isLightSurface ? 0.35 : 0.45}
        strokeDasharray="72 26"
        strokeLinecap="round"
      />
      {/* Faceted North-East exploration delta */}
      <path
        d="M33 5L7 17L17.5 21L33 5Z"
        fill={needleLight}
      />
      <path
        d="M33 5L17.5 21L21.5 32L33 5Z"
        fill={needleDark}
      />
      {/* Center pivot point */}
      <circle
        cx="17.5"
        cy="21"
        r="2"
        fill={centerDot}
      />
    </svg>
  );
}
