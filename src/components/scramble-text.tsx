"use client";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, delay = 0, duration = 1200 }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);
  return <>{displayed}</>;
}
