"use client";

import { useScramble } from "@/hooks/use-scramble";
import { FlapCells, flapTextStyle } from "@/components/flap-cells";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  /** Kept for API compatibility — text always wraps at word boundaries now. */
  wrap?: boolean;
}

export function ScrambleText({ text, delay = 0, duration = 1200 }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);
  const done = displayed === text;

  return (
    <span style={flapTextStyle} aria-label={done ? undefined : text}>
      {done ? text : <FlapCells text={text} displayed={displayed} />}
    </span>
  );
}
