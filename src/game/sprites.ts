// Hand-drawn pixel sprites. Each sprite is a list of rows; each character maps
// to a palette colour ("." is transparent). Sprites face right; the renderer
// mirrors them when facing left.

export type Sprite = string[];

export const PALETTE: Record<string, string> = {
  h: "#4a2c1a", // hair
  H: "#6b4026", // hair highlight
  s: "#f2c39a", // skin
  S: "#d99d74", // skin shade
  e: "#14112b", // eyes
  c: "#ff4f69", // hoodie
  C: "#c7334c", // hoodie shade
  w: "#f4f4f4", // white
  j: "#3b5bdb", // jeans
  J: "#2a3f9e", // jeans shade
  k: "#1b1b2f", // shoes
  d: "#e0a84a", // dog fur
  D: "#9c6a25", // dog ears/shade
  n: "#14112b", // dog nose
  t: "#ff8fa0", // dog tongue
};

const head = [
  "...hhhhH....",
  "..hhhhhhhH..",
  "..hhhhhhhhh.",
  "..hhsssssh..",
  "..hssesseS..",
  "..hsssssss..",
  "...sssSss...",
  "....ssss....",
];

const torso = [
  "..cccccccc..",
  ".cccwcccccc.",
  ".cc.ccccCcc.",
  ".ss.ccccC.ss",
  "....cccc....",
];

const torsoJump = [
  "ss.cccccc.ss",
  ".cccwcccccc.",
  "...cccccCc..",
  "....ccccC...",
  "....cccc....",
];

const legsStand = [
  "...jjjjjj...",
  "...jjJjjj...",
  "...jjj.jjj..",
  "...jj...jj..",
  "..kkk...kkk.",
];

const legsWalkA = [
  "...jjjjjj...",
  "..jjjJ.jjj..",
  ".jjj....jjj.",
  ".jj......jj.",
  "kkk......kkk",
];

const legsWalkB = [
  "...jjjjjj...",
  "....jjJj....",
  "....jjjj....",
  "....jjjj....",
  "...kkkkk....",
];

const legsJump = [
  "...jjjjjj...",
  "..jjj..jjj..",
  "..jj....jjk.",
  "..kk....kk..",
  "............",
];

export const PLAYER = {
  idle: [...head, ...torso, ...legsStand],
  walkA: [...head, ...torso, ...legsWalkA],
  walkB: [...head, ...torso, ...legsWalkB],
  jump: [...head, ...torsoJump, ...legsJump],
};

export const DOG = {
  a: [
    "..........D..",
    ".........dDd.",
    "D.......dddde",
    ".d......dddn.",
    ".dddddddddd..",
    ".dddddddddt..",
    ".d.d....d.d..",
    ".D.D....D.D..",
  ],
  b: [
    "..........D..",
    ".........dDd.",
    "D.......dddde",
    ".d......dddn.",
    ".dddddddddd..",
    ".dddddddddt..",
    "..d.d..d.d...",
    "..D.D..D.D...",
  ],
  sit: [
    "..........D..",
    ".........dDd.",
    ".........ddde",
    "D......ddddn.",
    ".d....ddddd..",
    ".dddddddddt..",
    ".ddddddd.d...",
    "..DD.DD..D...",
  ],
};

const cache = new Map<string, HTMLCanvasElement>();

/** Rasterise a sprite once into an offscreen canvas (optionally mirrored). */
export function spriteCanvas(sprite: Sprite, flip = false): HTMLCanvasElement {
  const key = sprite.join("|") + (flip ? "f" : "");
  const hit = cache.get(key);
  if (hit) return hit;
  const w = Math.max(...sprite.map((r) => r.length));
  const h = sprite.length;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  sprite.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const col = PALETTE[row[x]];
      if (!col) continue;
      g.fillStyle = col;
      g.fillRect(flip ? w - 1 - x : x, y, 1, 1);
    }
  });
  cache.set(key, c);
  return c;
}
