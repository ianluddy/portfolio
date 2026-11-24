import { PALETTE, type Sprite } from "@/game/sprites";

/** Render a pixel sprite as crisp SVG rects (horizontal runs merged). */
export function PixelSprite({
  sprite,
  scale = 4,
  flip = false,
  className,
  title,
}: {
  sprite: Sprite;
  scale?: number;
  flip?: boolean;
  className?: string;
  title?: string;
}) {
  const w = Math.max(...sprite.map((r) => r.length));
  const h = sprite.length;
  const rects: React.ReactElement[] = [];
  sprite.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = PALETTE[ch];
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={fill} />);
      x += run;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g transform={flip ? `translate(${w} 0) scale(-1 1)` : undefined}>{rects}</g>
    </svg>
  );
}
