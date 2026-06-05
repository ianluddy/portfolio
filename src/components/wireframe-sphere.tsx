export function WireframeSphere({ size = 300 }: { size?: number }) {
  const R = size * 0.42;
  const cx = size / 2;
  const cy = size / 2;
  const numLines = 13;

  const ellipses = [];
  for (let i = 0; i <= numLines; i++) {
    const dy = ((i / numLines) - 0.5) * 2 * R;
    const rx = Math.sqrt(Math.max(0, R * R - dy * dy));
    if (rx > 3) {
      ellipses.push(
        <ellipse
          key={i}
          cx={cx}
          cy={cy + dy}
          rx={rx}
          ry={(R / numLines) * 0.65}
        />
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className="opacity-40"
    >
      <circle cx={cx} cy={cy} r={R} />
      {ellipses}
    </svg>
  );
}

export function WireframeCircle({ size = 300 }: { size?: number }) {
  const R = size * 0.42;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className="opacity-40"
    >
      <circle cx={cx} cy={cy} r={R} />
    </svg>
  );
}
