/** External-link arrow — avoids iOS rendering ↗ as a color emoji */
export default function ArrowUpRightIcon({ size = 20, color = "#C8FF00", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      <path
        d="M7 17L17 7M17 7H9.5M17 7V14.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
