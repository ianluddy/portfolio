"use client";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, delay = 0, duration = 1200 }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);
  const isAnimating = displayed !== text;

  return (
    <span style={{ display: "inline-grid" }}>
      {/* Always present, invisible — fixes the grid cell to the real text's dimensions */}
      <span style={{ visibility: "hidden", gridArea: "1/1" }}>{text}</span>
      {/* Visible layer — nowrap + clipped during scramble so it never affects layout */}
      <span
        style={{
          gridArea: "1/1",
          overflow: "hidden",
          whiteSpace: isAnimating ? "nowrap" : "normal",
        }}
      >
        {displayed}
      </span>
    </span>
  );
}
