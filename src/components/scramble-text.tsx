"use client";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  wrap?: boolean;
}

export function ScrambleText({ text, delay = 0, duration = 1200, wrap = false }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);

  return (
    <span style={{ display: "inline-grid" }}>
      <span style={{ visibility: "hidden", gridArea: "1/1" }}>{text}</span>
      <span style={{ gridArea: "1/1", overflow: "hidden", whiteSpace: wrap ? "normal" : "nowrap" }}>
        {displayed}
      </span>
    </span>
  );
}
