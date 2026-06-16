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

  // Paragraph / mixed-inline text: render as a plain fragment so it stays
  // in the parent's inline formatting context. No wrapper element means no
  // disruption to line-breaking around links or adjacent ScrambleText segments.
  if (wrap) {
    return <>{displayed}</>;
  }

  // Single-line strings: inline-grid keeps the slot locked to the real text
  // width while nowrap prevents scrambled chars from causing reflow.
  return (
    <span style={{ display: "inline-grid" }}>
      <span style={{ visibility: "hidden", gridArea: "1/1" }}>{text}</span>
      <span style={{ gridArea: "1/1", overflow: "hidden", whiteSpace: "nowrap" }}>
        {displayed}
      </span>
    </span>
  );
}
