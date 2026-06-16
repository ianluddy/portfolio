import { useState, useEffect } from "react";

function randomChar(target: string): string {
  if (target >= "a" && target <= "z") {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  if (target >= "A" && target <= "Z") {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }
  if (target >= "0" && target <= "9") {
    return String.fromCharCode(48 + Math.floor(Math.random() * 10));
  }
  return target;
}

function isPreserved(c: string): boolean {
  return !/[a-zA-Z0-9]/.test(c);
}

export function useScramble(text: string, delay = 0, duration = 1200): string {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    const chars = text.split("");
    const n = chars.length;
    let rafId: number;
    let settleStart: number | null = null;
    const mountTime = performance.now();

    function tick(ts: number) {
      const elapsed = ts - mountTime;

      if (elapsed < delay) {
        // Pre-settle phase: all chars cycle continuously
        setDisplayed(chars.map(c => (isPreserved(c) ? c : randomChar(c))).join(""));
        rafId = requestAnimationFrame(tick);
      } else {
        // Settle phase: chars lock in left-to-right
        if (settleStart === null) settleStart = ts;
        const progress = Math.min((ts - settleStart) / duration, 1);

        setDisplayed(
          chars
            .map((c, i) => {
              if (isPreserved(c)) return c;
              return progress >= (i + 1) / n ? c : randomChar(c);
            })
            .join("")
        );

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [text, delay, duration]);

  return displayed;
}
