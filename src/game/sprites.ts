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
  x: "#14112b", // outline
  y: "#ffd23f", // gold
  Y: "#b8860b", // dark gold
  r: "#ff4f69", // red
  R: "#c7334c", // dark red
  g: "#3ddc97", // green
  G: "#1f8a4c", // dark green
  b: "#4aa3ff", // blue
  B: "#283a8f", // dark blue
  o: "#a0703a", // brown
  O: "#6b4426", // dark brown
  p: "#ff8fa0", // pink
  l: "#c9c5ef", // light
  m: "#8580c2", // mid grey
  f: "#ff8a3d", // flame orange
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

// 12×12 inventory icons
export const ICONS: Record<string, Sprite> = {
  cup: [
    "............",
    "...l..l.....",
    "....l..l....",
    "............",
    ".xxxxxxxx...",
    ".xwwwwwwxxx.",
    ".xwOOOOwx.x.",
    ".xwOOOOwx.x.",
    ".xwwwwwwxxx.",
    "..xwwwwx....",
    "xxxxxxxxxx..",
    "............",
  ],
  bot: [
    ".....yy.....",
    ".....xx.....",
    "..xxxxxxxx..",
    ".xllllllllx.",
    ".xlggllgglx.",
    ".xlggllgglx.",
    ".xllllllllx.",
    ".xllxxxxllx.",
    ".xllllllllx.",
    "..xxxxxxxx..",
    "...xx..xx...",
    "............",
  ],
  chat: [
    "............",
    ".xxxxxxxxxx.",
    "xbbbbbbbbbbx",
    "xbbbbbbbbbbx",
    "xbwwbwwbwwbx",
    "xbbbbbbbbbbx",
    "xbbbbbbbbbbx",
    ".xxxxbbxxxx.",
    "....xbx.....",
    "....xx......",
    "............",
    "............",
  ],
  headset: [
    "...xxxxxx...",
    "..xmmmmmmx..",
    ".xm......mx.",
    ".xm......mx.",
    "xggx....xggx",
    "xggx....xggx",
    "xggx....xggx",
    ".xx......mx.",
    ".........mx.",
    ".......xxmx.",
    "......xrrx..",
    ".......xx...",
  ],
  megaphone: [
    ".........x..",
    ".......xxyx.",
    ".....xxyyyx.",
    ".xxxxyyyyyx.",
    ".xrrxyyyyyx.",
    ".xrrxyyyyyx.",
    ".xxxxyyyyyx.",
    "..xx.xxyyyx.",
    "..xx...xxyx.",
    "..xx.....x..",
    "............",
    "............",
  ],
  film: [
    "............",
    "xxxxxxxxxxxx",
    "xwxxwxxwxxwx",
    "xxxxxxxxxxxx",
    "xmmmmmmmmmmx",
    "xmbbbbbbbbmx",
    "xmbbbybbbbmx",
    "xmbbbyybbbmx",
    "xmbbbybbbbmx",
    "xmmmmmmmmmmx",
    "xxxxxxxxxxxx",
    "............",
  ],
  heart: [
    "............",
    "..xx...xx...",
    ".xrrx.xrrx..",
    "xrwrrxrrrrx.",
    "xrrrrrrrrrx.",
    "xrrrrrrrrrx.",
    ".xrrrrrrrx..",
    "..xrrrrrx...",
    "...xrrrx....",
    "....xrx.....",
    ".....x......",
    "............",
  ],
  shamrock: [
    "............",
    "...xx..xx...",
    "..xggxxggx..",
    "..xggggggx..",
    "...xggggx...",
    ".xxxggggxxx.",
    "xggggxxggggx",
    "xggggxxggggx",
    ".xxxx.Gxxxx.",
    "......G.....",
    ".....G......",
    "............",
  ],
  medkit: [
    "............",
    "....xxxx....",
    "....x..x....",
    ".xxxxxxxxxx.",
    ".xwwwwwwwwx.",
    ".xwwwrrwwwx.",
    ".xwwrrrrwwx.",
    ".xwwrrrrwwx.",
    ".xwwwrrwwwx.",
    ".xwwwwwwwwx.",
    ".xxxxxxxxxx.",
    "............",
  ],
  cake: [
    ".....f......",
    ".....y......",
    ".....x......",
    "..xxxxxxxx..",
    "..xppppppx..",
    "..xwpwwpwx..",
    "..xOOOOOOx..",
    "..xppppppx..",
    "..xOOOOOOx..",
    ".xxxxxxxxxx.",
    "............",
    "............",
  ],
  potion: [
    "....xxxx....",
    "....xOOx....",
    ".....xx.....",
    "....xllx....",
    "....xllx....",
    "...xllllx...",
    "..xllllllx..",
    ".xggggggggx.",
    ".xgwggggggx.",
    ".xggggggggx.",
    "..xxxxxxxx..",
    "............",
  ],
  parcel: [
    "............",
    ".xxxxxxxxxx.",
    ".xooooRooox.",
    ".xooooRooox.",
    ".xxxxxxxxxx.",
    ".xooooRooox.",
    ".xooooRooox.",
    ".xooooRooox.",
    ".xooooRooox.",
    ".xxxxxxxxxx.",
    "............",
    "............",
  ],
  gem: [
    "............",
    "...xxxxxx...",
    "..xbwbbbbx..",
    ".xbwbbbbbbx.",
    "xxxxxxxxxxxx",
    ".xbbbbbbbbx.",
    "..xbbbbbbx..",
    "...xbbbbx...",
    "....xbbx....",
    ".....xx.....",
    "............",
    "............",
  ],
  coins: [
    "............",
    "..xxxxxxxx..",
    "..xyyyyyyx..",
    "..xYYYYYYx..",
    "..xxxxxxxx..",
    ".xxxxxxxxxx.",
    ".xyyyyyyyyx.",
    ".xYYYYYYYYx.",
    "xxxxxxxxxxxx",
    "xyyyyyyyyyyx",
    "xYYYYYYYYYYx",
    "xxxxxxxxxxxx",
  ],
  bag: [
    "....x..x....",
    ".....xx.....",
    "....xoox....",
    "...xoooox...",
    "..xooyyooox.",
    ".xooyoooooox",
    ".xoooyyoooox",
    ".xooooooyoox",
    ".xooyyyyooox",
    "..xooooooox.",
    "...xxxxxxx..",
    "............",
  ],
  scissors: [
    "x.........x.",
    ".x.......x..",
    "..x.....x...",
    "...x...x....",
    "....x.x.....",
    ".....x......",
    "....x.x.....",
    ".xxx...xxx..",
    "xrrrx.xrrrx.",
    "xr.rx.xr.rx.",
    "xrrrx.xrrrx.",
    ".xxx...xxx..",
  ],
  terminal: [
    "xxxxxxxxxxxx",
    "xBBBBBBBBBBx",
    "xBgBBBBBBBBx",
    "xBBgBBBBBBBx",
    "xBgBBggggBBx",
    "xBBBBBBBBBBx",
    "xxxxxxxxxxxx",
    "....xmmx....",
    "..xxxxxxxx..",
  ],
  brush: [
    ".........xx.",
    "........xmx.",
    ".......xmx..",
    "......xmx...",
    ".....xOx....",
    "...xrrx.....",
    "..xrrrx.....",
    ".xrrrx......",
    ".xrx........",
    ".x..........",
  ],
  wand: [
    "........y...",
    ".......yyy..",
    "........y...",
    ".......x....",
    "......x.....",
    ".....x......",
    "....x.......",
    "...x........",
    "..x.........",
  ],
  postbox: [
    "..xxxxxxxx..",
    ".xGGGGGGGGx.",
    ".xGxxxxxxGx.",
    ".xGGGGGGGGx.",
    ".xGGyyyyGGx.",
    ".xGGGGGGGGx.",
    ".xGGGGGGGGx.",
    ".xGGGGGGGGx.",
    ".xGGGGGGGGx.",
    ".xGGGGGGGGx.",
    "..xxxxxxxx..",
    "...xx..xx...",
  ],
};

export const CAMPFIRE: [Sprite, Sprite] = [
  [
    ".....r......",
    "....rr..r...",
    "....rfr.rr..",
    "...rffrrfr..",
    "...rfyffffr.",
    "..rfyyyyfr..",
    "..rffyyyfr..",
    "...rfffffr..",
    ".OOoOOoOOoO.",
    "OoOOoOOoOOoO",
  ],
  [
    "......r.....",
    "...r..rr....",
    "..rr.rfr....",
    "..rfrrffr...",
    ".rffffyfr...",
    "..rfyyyyfr..",
    "..rfyyyffr..",
    "..rfffffr...",
    ".OOoOOoOOoO.",
    "OoOOoOOoOOoO",
  ],
];
