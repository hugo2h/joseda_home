export default function Logo({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 40"
      style={style}
      aria-label="JD"
    >
      <text
        x="4"
        y="32"
        fontFamily="'Courier New', monospace"
        fontSize="32"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-1"
      >
        JD
      </text>
    </svg>
  );
}
