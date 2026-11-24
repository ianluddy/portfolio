import { useState, useEffect } from "react";

// Split-flap ("train departure board") animation. Each letter flips forward
// through its alphabet one character at a time until it lands on the target,
// with letters settling roughly left to right.

const STEP_MS = 75; // time per flap
const SLOWDOWN = 1.6; // stretch the caller's duration so the board reads slower

const SEQUENCES = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
];

function sequenceFor(c: string) {
  return SEQUENCES.find((s) => s.includes(c));
}

interface Plan {
  seq: string;
  start: number; // index in seq the flap starts on
  flips: number; // flaps before landing on the target
}

function makePlan(text: string, duration: number): (Plan | null)[] {
  const n = text.length;
  return text.split("").map((c, i) => {
    const seq = sequenceFor(c);
    if (!seq) return null; // spaces & punctuation never flip
    const settleAt = ((i + 1) / n) * duration * SLOWDOWN;
    const jitter = Math.floor(Math.random() * 4);
    const flips = Math.max(3, Math.round(settleAt / STEP_MS) + jitter);
    const start = (((seq.indexOf(c) - flips) % seq.length) + seq.length) % seq.length;
    return { seq, start, flips };
  });
}

function frame(text: string, plan: (Plan | null)[], step: number): string {
  return text
    .split("")
    .map((c, i) => {
      const p = plan[i];
      if (!p) return c;
      return p.seq[(p.start + Math.min(step, p.flips)) % p.seq.length];
    })
    .join("");
}

export function useScramble(text: string, delay = 0, duration = 1200): string {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const plan = makePlan(text, duration);
    const maxFlips = Math.max(0, ...plan.map((p) => p?.flips ?? 0));
    let rafId = 0;
    let lastStep = -1;
    const mountTime = performance.now();

    function tick(ts: number) {
      const elapsed = ts - mountTime - delay;
      // Before the delay the board sits on its starting letters
      const step = elapsed < 0 ? 0 : Math.floor(elapsed / STEP_MS);
      if (step !== lastStep) {
        lastStep = step;
        setDisplayed(frame(text, plan, step));
      }
      if (step < maxFlips) rafId = requestAnimationFrame(tick);
      else setDisplayed(text);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, delay, duration]);

  return displayed;
}
