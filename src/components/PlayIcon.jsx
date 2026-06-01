/** SVG play triangle — avoids iOS rendering ▶ as a color emoji */
export default function PlayIcon({ size = 18, color = "#C8FF00", className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      <path
        d="M9.5 6.3v11.4c0 .8.9 1.3 1.6.9l9.2-5.3c.7-.4.7-1.4 0-1.8l-9.2-5.3c-.7-.4-1.6.1-1.6.9z"
        fill={color}
      />
    </svg>
  );
}
