type CatLogoProps = {
  size?: number
  className?: string
}

/**
 * Inline SVG logo of a cat. Rendered inline (rather than an <img> src) so it
 * inherits colour via `currentColor` and ships with no extra network request.
 */
export default function CatLogo({ size = 48, className }: CatLogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Cat logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head + ears */}
      <path
        d="M12 26 L8 8 L24 18 A28 28 0 0 1 40 18 L56 8 L52 26 A24 22 0 1 1 12 26 Z"
        fill="currentColor"
      />
      {/* Inner ears */}
      <path d="M14 12 L22 18 L15 21 Z" fill="#ffb3c1" />
      <path d="M50 12 L42 18 L49 21 Z" fill="#ffb3c1" />
      {/* Eyes */}
      <circle cx="24" cy="34" r="3.5" fill="#f4f5f7" />
      <circle cx="40" cy="34" r="3.5" fill="#f4f5f7" />
      {/* Nose */}
      <path d="M30 41 L34 41 L32 44 Z" fill="#ffb3c1" />
      {/* Whiskers */}
      <g stroke="#f4f5f7" strokeWidth="1.5" strokeLinecap="round">
        <line x1="30" y1="43" x2="16" y2="40" />
        <line x1="30" y1="45" x2="16" y2="46" />
        <line x1="34" y1="43" x2="48" y2="40" />
        <line x1="34" y1="45" x2="48" y2="46" />
      </g>
    </svg>
  )
}
