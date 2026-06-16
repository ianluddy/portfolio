"use client";

import { useScramble } from "@/hooks/use-scramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

function isPreserved(c: string): boolean {
  return !/[a-zA-Z0-9]/.test(c);
}

export function ScrambleText({ text, delay = 0, duration = 1200 }: ScrambleTextProps) {
  const displayed = useScramble(text, delay, duration);

  return (
    <>
      {Array.from(text).map((realChar, i) => {
        const displayChar = displayed[i] ?? realChar;

        // Non-alphanumeric (spaces, ·, punctuation): render directly so
        // the browser can break lines at natural word boundaries.
        if (isPreserved(realChar)) {
          return displayChar;
        }

        // Alphanumeric: invisible real char locks the slot width;
        // scrambled char is overlaid absolutely inside that slot.
        return (
          <span key={i} style={{ display: "inline-block", position: "relative" }}>
            <span style={{ visibility: "hidden" }}>{realChar}</span>
            <span style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              {displayChar}
            </span>
          </span>
        );
      })}
    </>
  );
}
