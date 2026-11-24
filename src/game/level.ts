import { timeline, projects, type Job, type Project } from "@/data/content";

export const VIEW_H = 180;
export const GROUND = 148;

export type DialogContent =
  | { kind: "welcome" }
  | { kind: "about" }
  | { kind: "jobs"; company: string; url: string; jobs: Job[] }
  | { kind: "project"; project: Project }
  | { kind: "contact" };

export type ObjKind = "sign" | "cottage" | "school" | "building" | "chest" | "postbox" | "arch" | "campfire" | "yearpost";

export interface WorldObject {
  id: string;
  kind: ObjKind;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  verb?: string;
  content?: DialogContent;
  color?: string;
  roof?: "flat" | "peak" | "antenna" | "marquee" | "tower";
  seed: number;
}

export interface Platform {
  x: number;
  y: number;
  w: number;
}

export interface Coin {
  x: number;
  y: number;
  taken: boolean;
}

export interface Zone {
  name: string;
  x: number;
}

export interface Level {
  width: number;
  objects: WorldObject[];
  platforms: Platform[];
  coins: Coin[];
  zones: Zone[];
  spawnX: number;
}

const BUILDING_COLORS = ["#3c6e47", "#4a4e8f", "#8f2d3c", "#2c7a7b", "#6b4f8f", "#7a5230", "#2f6f4f", "#283a8f"];

const SHORT_NAMES: Record<string, string> = {
  "Fin (formerly Intercom)": "FIN",
};

/** Merge consecutive roles at the same company into one building, oldest first. */
function careerStops() {
  const chrono = [...timeline].reverse();
  const stops: { company: string; url: string; jobs: Job[] }[] = [];
  for (const job of chrono) {
    const last = stops[stops.length - 1];
    if (last && last.company === job.company) last.jobs.unshift(job);
    else stops.push({ company: job.company, url: job.url, jobs: [job] });
  }
  return stops;
}

export function buildLevel(): Level {
  const objects: WorldObject[] = [];
  const platforms: Platform[] = [];
  const coins: Coin[] = [];
  const zones: Zone[] = [];
  let seed = 1;

  const coinRow = (x: number, y: number, n: number) => {
    for (let i = 0; i < n; i++) coins.push({ x: x + i * 12, y, taken: false });
  };

  // ── Galway: welcome + about ──
  zones.push({ name: "GALWAY", x: 0 });
  objects.push({ id: "welcome", kind: "sign", x: 92, y: GROUND - 24, w: 28, h: 24, label: "START", verb: "READ", content: { kind: "welcome" }, seed: seed++ });
  objects.push({ id: "about", kind: "cottage", x: 172, y: GROUND - 60, w: 96, h: 60, label: "ABOUT ME", verb: "ENTER", content: { kind: "about" }, seed: seed++ });
  coinRow(136, GROUND - 30, 3);

  // Warm-up hops
  platforms.push({ x: 300, y: 118, w: 48 }, { x: 368, y: 94, w: 48 }, { x: 436, y: 118, w: 48 });
  coinRow(306, 104, 3);
  coinRow(374, 80, 3);
  coinRow(442, 104, 3);

  // ── Career road ──
  let x = 520;
  zones.push({ name: "CAREER ROAD", x: x - 20 });
  const stops = careerStops();
  stops.forEach((stop, i) => {
    const label = SHORT_NAMES[stop.company] ?? stop.company.toUpperCase();
    const isSchool = i === 0 && stop.jobs[0].description?.startsWith("Graduated");
    const w = Math.max(72, label.length * 8 + 20);
    const h = 56 + i * 6;
    const year = stop.jobs[0].date.slice(-4);
    objects.push({ id: `year-${i}`, kind: "yearpost", x: x - 34, y: GROUND - 22, w: 26, h: 22, label: year, seed: seed++ });
    const roof: WorldObject["roof"] =
      i === stops.length - 1 ? "tower" : stop.company.includes("Arts Alliance") ? "marquee" : (["flat", "peak", "antenna"] as const)[i % 3];
    objects.push({
      id: `job-${i}`,
      kind: isSchool ? "school" : "building",
      x,
      y: GROUND - h,
      w,
      h,
      label,
      verb: "ENTER",
      content: { kind: "jobs", company: stop.company, url: stop.url, jobs: stop.jobs },
      color: isSchool ? "#3a5a8c" : BUILDING_COLORS[i % BUILDING_COLORS.length],
      roof: isSchool ? "peak" : roof,
      seed: seed++,
    });
    const after = x + w + 16;
    if (i % 2 === 0) {
      platforms.push({ x: after, y: 116, w: 40 });
      coinRow(after + 4, 102, 3);
    } else {
      coinRow(after, GROUND - 14, 3);
    }
    x += w + 96;
  });

  // ── Project vault ──
  zones.push({ name: "PROJECT VAULT", x: x - 20 });
  objects.push({ id: "arch", kind: "arch", x, y: GROUND - 64, w: 104, h: 64, label: "PROJECTS", seed: seed++ });
  x += 140;
  const tiers = [GROUND, 118, 90, 118];
  projects.forEach((project, i) => {
    const top = tiers[i % tiers.length];
    if (top !== GROUND) platforms.push({ x: x - 12, y: top, w: 40 });
    objects.push({
      id: `project-${i}`,
      kind: "chest",
      x,
      y: top - 12,
      w: 16,
      h: 12,
      label: project.title,
      verb: "OPEN",
      content: { kind: "project", project },
      seed: seed++,
    });
    if (i % 4 === 2) coins.push({ x: x + 4, y: top - 34, taken: false });
    x += 56;
  });

  // ── Contact ──
  x += 60;
  zones.push({ name: "CONTACT", x: x - 40 });
  objects.push({ id: "contact", kind: "postbox", x, y: GROUND - 34, w: 18, h: 34, label: "CONTACT", verb: "SEND MAIL", content: { kind: "contact" }, seed: seed++ });
  coinRow(x + 40, GROUND - 14, 4);
  objects.push({ id: "campfire", kind: "campfire", x: x + 120, y: GROUND - 14, w: 16, h: 14, label: "", seed: seed++ });

  return { width: x + 280, objects, platforms, coins, zones, spawnX: 40 };
}
