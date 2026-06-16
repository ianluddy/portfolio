import { useState, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=";

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function isPreserved(c: string): boolean {
  return c === " " || c === "·" || c === "\n" || c === "\t";
}

export function useScramble(text: string, delay = 0, duration = 1200): string {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    const chars = text.split("");
    const n = chars.length;
    let rafId: number;
    let start: number | null = null;

    setDisplayed(chars.map(c => (isPreserved(c) ? c : randomChar())).join(""));

    const timeoutId = window.setTimeout(() => {
      function tick(ts: number) {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);

        setDisplayed(
          chars
            .map((c, i) => {
              if (isPreserved(c)) return c;
              return progress >= (i + 1) / n ? c : randomChar();
            })
            .join("")
        );

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      }

      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, delay, duration]);

  return displayed;
}
