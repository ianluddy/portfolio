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
    <span
      style={
        isAnimating
          ? {
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }
          : undefined
      }
    >
      {displayed}
    </span>
  );
}
