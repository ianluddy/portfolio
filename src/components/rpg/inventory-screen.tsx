"use client";

import { projects, projectSlug, type Project } from "@/data/content";
import { ICONS } from "@/game/sprites";
import { Browser } from "./browser";
import { PixelSprite } from "./pixel-sprite";
import { buttonClass, Heading } from "./ui";

const ITEM_ICON: Record<string, keyof typeof ICONS> = {
  Cuplift: "cup",
  Fin: "bot",
  Intercom: "chat",
  Zendesk: "headset",
  "Dylan Luddy": "megaphone",
  Screenwriter: "film",
  "Ian & Claire": "heart",
  "Enterprise Ireland": "shamrock",
  "Health Connect": "medkit",
  "Baked Goodes": "cake",
  Qualio: "potion",
  "DPD — Manage Delivery": "parcel",
  "Weir & Sons": "gem",
  "Health Services Staffs Credit Union": "coins",
  "Member First Credit Union": "bag",
  Sparebace: "scissors",
};

export const iconFor = (p: Project) => ICONS[ITEM_ICON[p.title] ?? "gem"];

export function InventoryScreen(props: {
  selected: number;
  detailOpen: boolean;
  isMobile: boolean;
  onSelect: (slug: string, via: "focus" | "click") => void;
  onBack: () => void;
  onExitLeft: () => void;
}) {
  return (
    <Browser
      {...props}
      items={projects}
      slugOf={projectSlug}
      cols={4}
      listLabel="Items"
      listClass="grid grid-cols-4 gap-2 sm:gap-3"
      header={<Heading>{`Inventory · ${projects.length} items`}</Heading>}
      itemClass={(sel) =>
        `aspect-square flex flex-col items-center justify-center gap-1 border-4 bg-background ${
          sel ? "border-accent shadow-[0_0_0_2px_#000,0_0_12px_rgba(255,210,63,0.5)]" : "border-subtle/40 hover:border-foreground"
        }`
      }
      renderItem={(p) => (
        <>
          <PixelSprite sprite={iconFor(p)} scale={4} className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="font-terminal text-sm sm:text-base leading-none text-muted max-w-full truncate px-1">{p.title}</span>
        </>
      )}
      renderDetail={(p) => (
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="flex-none border-4 border-accent bg-panel p-2">
              <PixelSprite sprite={iconFor(p)} scale={5} />
            </span>
            <div className="min-w-0">
              <p className="font-pixel text-[8px] uppercase text-subtle mb-2">Item</p>
              <h2 className="font-pixel text-xs sm:text-sm leading-relaxed text-accent">{p.title}</h2>
            </div>
          </div>
          <p className="font-terminal text-xl text-accent-3 leading-tight">&ldquo;{p.tagline}&rdquo;</p>
          {p.description.map((d, i) => (
            <p key={i} className="font-terminal text-xl sm:text-2xl leading-snug text-muted">
              {d}
            </p>
          ))}
          <div>
            <p className="font-pixel text-[8px] uppercase text-subtle mb-2">Stats</p>
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {p.stack.map((t) => (
                <li key={t} className="font-pixel text-[8px] uppercase text-accent-3 border-2 border-accent-3 px-2 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            <span className="glyph">▶</span> Use · {p.urlLabel}
          </a>
        </div>
      )}
    />
  );
}
