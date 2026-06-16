"use client";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, delay = 0, duration = 1200 }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);

  return (
    <span style={{ display: "inline-grid" }}>
      {/* Invisible real text — anchors the grid cell to the correct dimensions */}
      <span style={{ visibility: "hidden", gridArea: "1/1" }}>{text}</span>
      {/* Visible scrambled/settled text — wraps naturally, clipped to the cell */}
      <span style={{ gridArea: "1/1", overflow: "hidden" }}>{displayed}</span>
    </span>
  );
}
