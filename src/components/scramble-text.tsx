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

  // Single-line strings: outer span is sized only by the hidden real-text span.
  // The visible span is absolutely positioned so it never contributes to the
  // grid's intrinsic width — scrambled chars wider than real chars can't push
  // adjacent elements or cause reflow.
  return (
    <span style={{ display: "inline-grid", position: "relative" }}>
      <span style={{ visibility: "hidden", gridArea: "1/1" }}>{text}</span>
      <span style={{ position: "absolute", inset: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
        {displayed}
      </span>
    </span>
  );
}
