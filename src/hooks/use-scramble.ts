import { useState, useEffect } from "react";

const FRAME_MS = 1000 / (60 * 0.7); // ~24ms — 30% slower than 60fps

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
    let lastRenderTime = 0;
    const mountTime = performance.now();

    function tick(ts: number) {
      const elapsed = ts - mountTime;
      const due = ts - lastRenderTime >= FRAME_MS;

      if (elapsed < delay) {
        // Pre-settle: cycle all chars at throttled rate
        if (due) {
          setDisplayed(chars.map(c => (isPreserved(c) ? c : randomChar(c))).join(""));
          lastRenderTime = ts;
        }
        rafId = requestAnimationFrame(tick);
      } else {
        // Settle: lock chars left-to-right, unsettled ones keep cycling
        if (settleStart === null) settleStart = ts;
        const progress = Math.min((ts - settleStart) / duration, 1);

        if (due || progress === 1) {
          setDisplayed(
            chars
              .map((c, i) => {
                if (isPreserved(c)) return c;
                return progress >= (i + 1) / n ? c : randomChar(c);
              })
              .join("")
          );
          lastRenderTime = ts;
        }

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
