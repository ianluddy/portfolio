import { buildLevel, GROUND, VIEW_H, type Level, type WorldObject } from "./level";
import { DOG, PLAYER, spriteCanvas } from "./sprites";
import { play } from "./audio";

export interface Input {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export interface EngineCallbacks {
  onActiveChange: (obj: WorldObject | null) => void;
  onZoneChange: (zone: string) => void;
  onCoin: (total: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const STEP = 1 / 60;
const PW = 10;
const PH = 18;

function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export class Engine {
  level: Level;
  viewW = 320;
  viewH = VIEW_H;
  private yOff = 0;
  camX = 0;
  player = { x: 0, y: GROUND - PH, vx: 0, vy: 0, facing: 1, onGround: true, coyote: 0, jumpBuffer: 0, anim: 0 };
  input: Input = { left: false, right: false, jump: false };
  paused = false;
  playing = false;
  opened = new Set<string>();
  coins = 0;

  private ctx: CanvasRenderingContext2D;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private time = 0;
  private trail: { x: number; y: number; facing: number }[] = [];
  private particles: Particle[] = [];
  private active: WorldObject | null = null;
  private zone = "";
  private prevJump = false;
  private farHills: number[] = [];
  private nearHills: number[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private font: string,
    private cb: EngineCallbacks,
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.level = buildLevel();
    this.player.x = this.level.spawnX;
    for (let i = 0; i < 2048; i++) {
      this.farHills[i] = Math.round((Math.sin(i * 0.011) * 18 + Math.sin(i * 0.037) * 8 + 40) / 4) * 4;
      this.nearHills[i] = Math.round((Math.sin(i * 0.02 + 2) * 14 + Math.sin(i * 0.053) * 6 + 22) / 4) * 4;
    }
  }

  resize(viewW: number, viewH: number) {
    this.viewW = viewW;
    this.viewH = Math.max(VIEW_H, viewH);
    this.yOff = this.viewH - VIEW_H;
    this.canvas.width = viewW;
    this.canvas.height = this.viewH;
    this.ctx.imageSmoothingEnabled = false;
  }

  start() {
    this.last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      this.acc += dt;
      while (this.acc >= STEP) {
        this.update();
        this.acc -= STEP;
      }
      this.render();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }

  markOpened(id: string) {
    this.opened.add(id);
  }

  /** Move the player in front of an object (used by the menu and click-to-open). */
  teleportTo(obj: WorldObject) {
    const p = this.player;
    p.x = obj.kind === "chest" ? obj.x + 3 : Math.max(8, obj.x + obj.w / 2 - PW / 2);
    p.y = obj.kind === "chest" ? obj.y + obj.h - PH : GROUND - PH;
    p.vx = 0;
    p.vy = 0;
    this.trail = [];
    this.camX = this.clampCam(p.x - this.viewW * 0.4);
  }

  /** Find the interactive object under a point in canvas pixels. */
  objectAt(cx: number, screenY: number): WorldObject | null {
    const wx = cx + this.camX;
    const cy = screenY - this.yOff;
    for (const o of this.level.objects) {
      if (!o.content) continue;
      const pad = o.kind === "chest" ? 6 : 0;
      if (wx >= o.x - pad && wx <= o.x + o.w + pad && cy >= o.y - pad - (o.kind === "building" || o.kind === "school" ? 14 : 0) && cy <= o.y + o.h + pad) return o;
    }
    return null;
  }

  // ───────────────────────── update ─────────────────────────

  private update() {
    this.time += STEP;
    const p = this.player;

    if (this.playing && !this.paused) {
      const dir = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0);
      if (dir) {
        p.vx += dir * 0.28;
        p.facing = dir;
      } else {
        p.vx *= p.onGround ? 0.72 : 0.94;
        if (Math.abs(p.vx) < 0.05) p.vx = 0;
      }
      p.vx = Math.max(-2, Math.min(2, p.vx));

      if (this.input.jump && !this.prevJump) p.jumpBuffer = 8;
      this.prevJump = this.input.jump;
      if (p.jumpBuffer > 0) p.jumpBuffer--;
      if (p.jumpBuffer > 0 && (p.onGround || p.coyote > 0)) {
        p.vy = -6.1;
        p.onGround = false;
        p.coyote = 0;
        p.jumpBuffer = 0;
        play("jump");
        this.dust(p.x + PW / 2, p.y + PH);
      }
    } else {
      p.vx *= 0.7;
    }

    p.vy += this.input.jump || p.vy > 0 || !this.playing ? 0.32 : 0.6;
    p.vy = Math.min(p.vy, 8);

    const prevFeet = p.y + PH;
    p.x = Math.max(4, Math.min(this.level.width - PW - 4, p.x + p.vx));
    p.y += p.vy;

    const wasGround = p.onGround;
    p.onGround = false;
    if (p.vy >= 0) {
      if (p.y + PH >= GROUND) {
        p.y = GROUND - PH;
        p.vy = 0;
        p.onGround = true;
      } else {
        for (const pl of this.level.platforms) {
          if (p.x + PW > pl.x && p.x < pl.x + pl.w && prevFeet <= pl.y && p.y + PH >= pl.y) {
            p.y = pl.y - PH;
            p.vy = 0;
            p.onGround = true;
            break;
          }
        }
      }
    }
    if (p.onGround && !wasGround && this.playing) this.dust(p.x + PW / 2, p.y + PH);
    p.coyote = p.onGround ? 6 : Math.max(0, p.coyote - 1);
    p.anim += Math.abs(p.vx) * 0.12;

    // Dog follows the player's trail
    this.trail.push({ x: p.x, y: p.y, facing: p.facing });
    if (this.trail.length > 40) this.trail.shift();

    // Coins
    for (const c of this.level.coins) {
      if (c.taken) continue;
      if (p.x + PW > c.x - 3 && p.x < c.x + 3 && p.y + PH > c.y - 4 && p.y < c.y + 4) {
        c.taken = true;
        this.coins++;
        this.cb.onCoin(this.coins);
        play("coin");
        for (let i = 0; i < 6; i++) this.particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2, life: 24, color: "#ffd23f" });
      }
    }

    // Particles
    for (const pt of this.particles) {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.1;
      pt.life--;
    }
    this.particles = this.particles.filter((pt) => pt.life > 0);

    // Nearest interactive object
    let active: WorldObject | null = null;
    if (this.playing) {
      const cx = p.x + PW / 2;
      for (const o of this.level.objects) {
        if (!o.content) continue;
        if (cx > o.x - 6 && cx < o.x + o.w + 6 && p.y + PH > o.y - 2 && p.y < o.y + o.h + 2) {
          active = o;
          break;
        }
      }
    }
    if (active !== this.active) {
      this.active = active;
      this.cb.onActiveChange(active);
    }

    let zone = this.level.zones[0].name;
    for (const z of this.level.zones) if (p.x >= z.x) zone = z.name;
    if (zone !== this.zone) {
      this.zone = zone;
      this.cb.onZoneChange(zone);
    }

    const target = this.playing ? p.x - this.viewW * 0.38 : p.x - this.viewW * 0.25;
    this.camX = this.clampCam(this.camX + (target - this.camX) * 0.12);
  }

  private clampCam(x: number) {
    return Math.max(0, Math.min(this.level.width - this.viewW, x));
  }

  private dust(x: number, y: number) {
    for (let i = 0; i < 4; i++) this.particles.push({ x, y: y - 1, vx: (Math.random() - 0.5) * 1.6, vy: -Math.random() * 0.6, life: 14, color: "#8580c2" });
  }

  // ───────────────────────── render ─────────────────────────

  private text(str: string, x: number, y: number, color: string, align: CanvasTextAlign = "center", size = 8) {
    const g = this.ctx;
    g.font = `${size}px ${this.font}`;
    g.textAlign = align;
    g.textBaseline = "top";
    g.fillStyle = "#000";
    g.fillText(str, Math.round(x) + 1, Math.round(y) + 1);
    g.fillStyle = color;
    g.fillText(str, Math.round(x), Math.round(y));
  }

  private render() {
    const g = this.ctx;
    const W = this.viewW;
    const cam = Math.round(this.camX);

    // Sky
    const H = this.viewH;
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#0b0820");
    sky.addColorStop(0.7, "#2a1f5c");
    sky.addColorStop(1, "#4b2f6e");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);

    // Stars (slow parallax)
    for (let i = 0; i < 90 + this.yOff; i++) {
      const sx = Math.floor((hash(i) * 1200 - cam * 0.05) % 1200);
      const x = ((sx % 1200) + 1200) % 1200;
      if (x > W) continue;
      const y = Math.floor(hash(i + 99) * (100 + this.yOff));
      const tw = Math.sin(this.time * 2 + i) > 0.7;
      g.fillStyle = tw ? "#ffffff" : "#8580c2";
      g.fillRect(x, y, 1, 1);
    }

    // Moon
    const my = 34 + Math.round(this.yOff * 0.4);
    g.fillStyle = "#f4f0c8";
    g.fillRect(W - 52, my, 16, 16);
    g.fillRect(W - 54, my + 2, 20, 12);
    g.fillStyle = "#d8d2a0";
    g.fillRect(W - 46, my + 4, 4, 4);
    g.fillRect(W - 40, my + 10, 3, 3);

    g.save();
    g.translate(0, this.yOff);

    // Hills
    this.hills(this.farHills, cam * 0.2, "#1e1846", 40);
    this.hills(this.nearHills, cam * 0.45, "#2a2160", 16);

    g.translate(-cam, 0);

    // End-of-game message in the sky
    const fire = this.level.objects.find((o) => o.kind === "campfire");
    if (fire) {
      this.text("THANKS FOR", fire.x + 8, 40, "#ffd23f");
      this.text("PLAYING!", fire.x + 8, 52, "#ffd23f");
    }

    for (const o of this.level.objects) {
      if (o.x + o.w + 60 < cam || o.x - 60 > cam + W) continue;
      this.drawObject(o);
    }

    for (const pl of this.level.platforms) {
      if (pl.x + pl.w < cam || pl.x > cam + W) continue;
      g.fillStyle = "#7a5230";
      g.fillRect(pl.x, pl.y, pl.w, 6);
      g.fillStyle = "#3ddc97";
      g.fillRect(pl.x, pl.y, pl.w, 2);
      g.fillStyle = "#4a3020";
      for (let bx = pl.x + 6; bx < pl.x + pl.w; bx += 8) g.fillRect(bx, pl.y + 3, 2, 2);
    }

    for (const c of this.level.coins) {
      if (c.taken || c.x < cam - 8 || c.x > cam + W + 8) continue;
      const phase = Math.floor(this.time * 8 + c.x) % 4;
      const w = [6, 4, 2, 4][phase];
      const bob = Math.round(Math.sin(this.time * 3 + c.x) * 1.5);
      g.fillStyle = "#b8860b";
      g.fillRect(c.x - w / 2, c.y - 4 + bob, w, 8);
      g.fillStyle = "#ffd23f";
      g.fillRect(c.x - w / 2 + (w > 2 ? 1 : 0), c.y - 3 + bob, Math.max(1, w - 2), 6);
    }

    this.drawGround(cam, W);
    this.drawDog();
    this.drawPlayer();

    for (const pt of this.particles) {
      g.fillStyle = pt.color;
      g.fillRect(Math.round(pt.x), Math.round(pt.y), 2, 2);
    }

    // "!" bubble over the active object
    if (this.active && !this.paused) {
      const o = this.active;
      const bx = Math.round(o.x + o.w / 2);
      const by = Math.round(o.y - (o.kind === "building" || o.kind === "school" ? 34 : 16) + Math.sin(this.time * 6) * 2);
      g.fillStyle = "#000";
      g.fillRect(bx - 6, by - 1, 13, 13);
      g.fillStyle = "#f4f4f4";
      g.fillRect(bx - 5, by, 11, 11);
      g.fillStyle = "#ff4f69";
      g.fillRect(bx - 1, by + 2, 2, 5);
      g.fillRect(bx - 1, by + 8, 2, 2);
    }

    g.restore();
  }

  private hills(heights: number[], offset: number, color: string, base: number) {
    const g = this.ctx;
    g.fillStyle = color;
    for (let x = 0; x < this.viewW; x += 4) {
      const i = Math.floor((x + offset) / 4) % heights.length;
      const h = heights[(i + heights.length) % heights.length];
      g.fillRect(x, GROUND - base - h + 40, 4, VIEW_H * 2);
    }
  }

  private drawGround(cam: number, W: number) {
    const g = this.ctx;
    g.fillStyle = "#3b2618";
    g.fillRect(cam, GROUND, W, VIEW_H - GROUND);
    for (let tx = Math.floor(cam / 16) * 16; tx < cam + W; tx += 16) {
      g.fillStyle = "#4a3020";
      g.fillRect(tx + 2, GROUND + 8, 6, 4);
      g.fillRect(tx + 10, GROUND + 18, 4, 4);
      g.fillStyle = "#2c1c12";
      g.fillRect(tx + 6, GROUND + 26, 3, 2);
    }
    g.fillStyle = "#2f9e6b";
    g.fillRect(cam, GROUND, W, 5);
    g.fillStyle = "#3ddc97";
    g.fillRect(cam, GROUND, W, 2);
    for (let tx = Math.floor(cam / 8) * 8; tx < cam + W; tx += 8) {
      g.fillRect(tx + (hash(tx) > 0.5 ? 2 : 5), GROUND - 2, 1, 2);
    }
  }

  private drawPlayer() {
    const p = this.player;
    let frame = PLAYER.idle;
    if (!p.onGround) frame = PLAYER.jump;
    else if (Math.abs(p.vx) > 0.2) frame = Math.floor(p.anim) % 2 === 0 ? PLAYER.walkA : PLAYER.walkB;
    const bob = p.onGround && Math.abs(p.vx) <= 0.2 && Math.floor(this.time * 2) % 2 === 0 ? 1 : 0;
    this.ctx.drawImage(spriteCanvas(frame, p.facing < 0), Math.round(p.x - 1), Math.round(p.y) + bob);
  }

  private drawDog() {
    const p = this.player;
    const t = this.trail[0] ?? { x: p.x, y: p.y, facing: p.facing };
    const dx = t.x - 16 * t.facing;
    const moving = Math.abs(p.vx) > 0.2;
    const frame = !moving ? DOG.sit : Math.floor(this.time * 10) % 2 ? DOG.a : DOG.b;
    const y = GROUND - 8;
    this.ctx.drawImage(spriteCanvas(frame, t.facing < 0), Math.round(dx), Math.round(y));
  }

  private drawObject(o: WorldObject) {
    const g = this.ctx;
    const opened = this.opened.has(o.id);
    switch (o.kind) {
      case "sign": {
        g.fillStyle = "#4a3020";
        g.fillRect(o.x + 12, o.y + 10, 4, 14);
        g.fillStyle = "#a0703a";
        g.fillRect(o.x, o.y, o.w, 12);
        g.fillStyle = "#7a5230";
        g.fillRect(o.x, o.y + 10, o.w, 2);
        // arrow
        g.fillStyle = "#f4f4f4";
        g.fillRect(o.x + 6, o.y + 5, 12, 2);
        g.fillRect(o.x + 16, o.y + 3, 2, 6);
        g.fillRect(o.x + 18, o.y + 4, 2, 4);
        g.fillRect(o.x + 20, o.y + 5, 2, 2);
        this.text(o.label, o.x + o.w / 2, o.y - 12, "#ffd23f");
        break;
      }
      case "yearpost": {
        g.fillStyle = "#4a3020";
        g.fillRect(o.x + 11, o.y + 8, 3, 14);
        g.fillStyle = "#14112b";
        g.fillRect(o.x - 4, o.y - 2, o.w + 8, 12);
        g.fillStyle = "#3ddc97";
        g.fillRect(o.x - 3, o.y - 1, o.w + 6, 10);
        this.ctx.font = `8px ${this.font}`;
        g.textAlign = "center";
        g.textBaseline = "top";
        g.fillStyle = "#14112b";
        g.fillText(o.label, o.x + o.w / 2 + 1, o.y + 1);
        break;
      }
      case "cottage": {
        // walls
        g.fillStyle = "#e8e2d0";
        g.fillRect(o.x + 4, o.y + 22, o.w - 8, o.h - 22);
        g.fillStyle = "#c9c2ad";
        g.fillRect(o.x + 4, o.y + o.h - 4, o.w - 8, 4);
        // thatch roof
        for (let r = 0; r < 24; r += 2) {
          g.fillStyle = r % 4 === 0 ? "#c9a24a" : "#b08a3a";
          g.fillRect(o.x + 12 - r / 2, o.y + r, o.w - 24 + r, 2);
        }
        // chimney + smoke
        g.fillStyle = "#8a8070";
        g.fillRect(o.x + o.w - 26, o.y - 6, 8, 10);
        const s = Math.floor(this.time * 2) % 3;
        g.fillStyle = "#8580c2";
        g.fillRect(o.x + o.w - 24 + s, o.y - 12 - s * 3, 4, 4);
        g.fillRect(o.x + o.w - 20 - s, o.y - 20 - s * 2, 3, 3);
        // door (red) + windows
        g.fillStyle = "#c7334c";
        g.fillRect(o.x + o.w / 2 - 7, o.y + o.h - 24, 14, 24);
        g.fillStyle = "#ffd23f";
        g.fillRect(o.x + o.w / 2 + 3, o.y + o.h - 13, 2, 2);
        this.window(o.x + 14, o.y + 30, true);
        this.window(o.x + o.w - 28, o.y + 30, true);
        this.text(o.label, o.x + o.w / 2, o.y - 26, "#ffd23f");
        break;
      }
      case "school":
      case "building": {
        const top = o.y;
        g.fillStyle = o.color ?? "#4a4e8f";
        g.fillRect(o.x, top, o.w, o.h);
        g.fillStyle = "rgba(0,0,0,0.25)";
        g.fillRect(o.x + o.w - 6, top, 6, o.h);
        g.fillStyle = "rgba(255,255,255,0.12)";
        g.fillRect(o.x, top, 2, o.h);
        // roof styles
        if (o.roof === "peak") {
          for (let r = 0; r < 12; r++) {
            g.fillStyle = "#5a2a2a";
            g.fillRect(o.x + o.w / 2 - r * (o.w / 24) - 2, top - 12 + r, r * (o.w / 12) + 4, 1);
          }
        } else if (o.roof === "antenna") {
          g.fillStyle = "#8580c2";
          g.fillRect(o.x + o.w - 18, top - 16, 2, 16);
          g.fillStyle = Math.floor(this.time * 2) % 2 ? "#ff4f69" : "#5a1a24";
          g.fillRect(o.x + o.w - 19, top - 18, 4, 3);
        } else if (o.roof === "tower") {
          g.fillStyle = o.color ?? "#283a8f";
          g.fillRect(o.x + 10, top - 18, o.w - 20, 18);
          g.fillStyle = "#8580c2";
          g.fillRect(o.x + o.w / 2 - 1, top - 34, 2, 16);
          g.fillStyle = Math.floor(this.time * 3) % 2 ? "#3ddc97" : "#14112b";
          g.fillRect(o.x + o.w / 2 - 2, top - 36, 4, 3);
        } else {
          g.fillStyle = "rgba(0,0,0,0.3)";
          g.fillRect(o.x - 2, top - 3, o.w + 4, 3);
        }
        // windows
        const cols = Math.max(2, Math.floor((o.w - 12) / 14));
        const rows = Math.max(1, Math.floor((o.h - 34) / 14));
        const gap = (o.w - cols * 8) / (cols + 1);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const lit = hash(o.seed * 31 + r * 7 + c) > 0.35;
            this.window(Math.round(o.x + gap + c * (8 + gap)), top + 8 + r * 14, lit);
          }
        }
        // door
        g.fillStyle = "#14112b";
        g.fillRect(o.x + o.w / 2 - 7, o.y + o.h - 20, 14, 20);
        g.fillStyle = opened ? "#ffd23f" : "#3a3060";
        g.fillRect(o.x + o.w / 2 - 5, o.y + o.h - 18, 10, 18);
        // marquee lights for the cinema company
        if (o.roof === "marquee") {
          for (let lx = o.x; lx < o.x + o.w; lx += 6) {
            const on = (Math.floor(this.time * 6) + lx / 6) % 2 < 1;
            g.fillStyle = on ? "#ffd23f" : "#7a5a10";
            g.fillRect(lx + 1, top - 3, 3, 3);
          }
        }
        // rooftop sign
        const signW = o.label.length * 8 + 8;
        const signY = top - (o.roof === "tower" ? 30 : o.roof === "peak" ? 26 : 16);
        g.fillStyle = "#000";
        g.fillRect(o.x + o.w / 2 - signW / 2 - 1, signY - 1, signW + 2, 13);
        g.fillStyle = "#14112b";
        g.fillRect(o.x + o.w / 2 - signW / 2, signY, signW, 11);
        this.text(o.label, o.x + o.w / 2, signY + 2, o.kind === "school" ? "#3ddc97" : "#ffd23f");
        break;
      }
      case "arch": {
        g.fillStyle = "#5a5480";
        g.fillRect(o.x, o.y + 12, 12, o.h - 12);
        g.fillRect(o.x + o.w - 12, o.y + 12, 12, o.h - 12);
        g.fillStyle = "#3f3a66";
        for (let by = o.y + 16; by < o.y + o.h; by += 8) {
          g.fillRect(o.x + 2, by, 8, 1);
          g.fillRect(o.x + o.w - 10, by, 8, 1);
        }
        g.fillStyle = "#14112b";
        g.fillRect(o.x - 4, o.y, o.w + 8, 14);
        g.fillStyle = "#5a5480";
        g.fillRect(o.x - 3, o.y + 1, o.w + 6, 12);
        this.text(o.label, o.x + o.w / 2, o.y + 3, "#ffd23f");
        // torches
        for (const tx of [o.x + 4, o.x + o.w - 8]) {
          g.fillStyle = Math.floor(this.time * 8 + tx) % 2 ? "#ff8a3d" : "#ffd23f";
          g.fillRect(tx, o.y + 18, 4, 5);
        }
        break;
      }
      case "chest": {
        const glow = !opened && Math.floor(this.time * 2 + o.seed) % 4 === 0;
        g.fillStyle = "#14112b";
        g.fillRect(o.x - 1, o.y - 1, o.w + 2, o.h + 2);
        g.fillStyle = "#8a5a2b";
        g.fillRect(o.x, o.y + 5, o.w, o.h - 5);
        if (opened) {
          g.fillStyle = "#ffd23f";
          g.fillRect(o.x + 2, o.y + 3, o.w - 4, 3);
          g.fillStyle = "#6b4426";
          g.fillRect(o.x, o.y - 4, o.w, 4);
          g.fillStyle = "#14112b";
          g.fillRect(o.x - 1, o.y - 5, o.w + 2, 1);
        } else {
          g.fillStyle = "#a0703a";
          g.fillRect(o.x, o.y, o.w, 5);
        }
        g.fillStyle = glow ? "#fff6c0" : "#ffd23f";
        g.fillRect(o.x, o.y + 5, o.w, 1);
        g.fillRect(o.x + o.w / 2 - 1, o.y + 4, 3, 4);
        break;
      }
      case "postbox": {
        g.fillStyle = "#14112b";
        g.fillRect(o.x - 1, o.y - 1, o.w + 2, o.h + 1);
        g.fillStyle = "#1f8a4c";
        g.fillRect(o.x, o.y + 4, o.w, o.h - 4);
        g.fillRect(o.x + 2, o.y, o.w - 4, 4);
        g.fillStyle = "#14112b";
        g.fillRect(o.x + 4, o.y + 10, o.w - 8, 2);
        g.fillStyle = "#ffd23f";
        g.fillRect(o.x + 6, o.y + 16, o.w - 12, 4);
        g.fillStyle = "#156b3a";
        g.fillRect(o.x + o.w - 4, o.y + 4, 4, o.h - 4);
        this.text(o.label, o.x + o.w / 2, o.y - 14, "#3ddc97");
        if (opened) {
          // a letter flying off
          const t = (this.time * 20) % 60;
          g.fillStyle = "#f4f4f4";
          g.fillRect(o.x + 20 + t, o.y - 10 - t / 2, 6, 4);
        }
        break;
      }
      case "campfire": {
        g.fillStyle = "#6b4426";
        g.fillRect(o.x, o.y + 10, o.w, 4);
        const f = Math.floor(this.time * 8) % 2;
        g.fillStyle = "#ff4f69";
        g.fillRect(o.x + 3, o.y + 2 + f, 10, 8 - f);
        g.fillStyle = "#ff8a3d";
        g.fillRect(o.x + 5, o.y + f, 6, 9 - f);
        g.fillStyle = "#ffd23f";
        g.fillRect(o.x + 7 - f, o.y + 5, 3, 5);
        break;
      }
    }
  }

  private window(x: number, y: number, lit: boolean) {
    const g = this.ctx;
    g.fillStyle = "#14112b";
    g.fillRect(x - 1, y - 1, 10, 10);
    g.fillStyle = lit ? "#ffd23f" : "#2a2160";
    g.fillRect(x, y, 8, 8);
    g.fillStyle = lit ? "#fff0a0" : "#3a3070";
    g.fillRect(x, y, 3, 3);
    g.fillStyle = "#14112b";
    g.fillRect(x + 3, y, 1, 8);
    g.fillRect(x, y + 4, 8, 1);
  }
}
