// Tiny square-wave sound effects, synthesised on the fly.

type Sfx = "jump" | "coin" | "open" | "close" | "start" | "blip" | "page";

const SEQUENCES: Record<Sfx, [freq: number, ms: number][]> = {
  jump: [[330, 40], [495, 60]],
  coin: [[988, 50], [1319, 140]],
  open: [[523, 60], [659, 60], [784, 60], [1047, 120]],
  close: [[784, 50], [523, 80]],
  start: [[392, 80], [523, 80], [659, 80], [784, 80], [1047, 200]],
  blip: [[880, 18]],
  page: [[660, 40]],
};

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

export function play(name: Sfx) {
  if (muted || typeof window === "undefined") return;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    let t = ctx.currentTime;
    for (const [freq, ms] of SEQUENCES[name]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      const vol = name === "blip" ? 0.015 : 0.04;
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + ms / 1000);
      t += ms / 1000;
    }
  } catch {
    // Audio is optional; ignore failures.
  }
}
