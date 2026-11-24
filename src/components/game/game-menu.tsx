"use client";

import type { WorldObject } from "@/game/level";

interface Props {
  objects: WorldObject[];
  opened: Set<string>;
  onSelect: (obj: WorldObject) => void;
  onClose: () => void;
}

function Item({ obj, opened, onSelect, label }: { obj: WorldObject; opened: boolean; onSelect: (o: WorldObject) => void; label?: string }) {
  return (
    <li>
      <button
        onClick={() => onSelect(obj)}
        className="group w-full flex items-baseline gap-3 text-left cursor-pointer py-1.5 font-terminal text-xl leading-tight text-muted hover:text-accent focus-visible:text-accent"
      >
        <span className="glyph text-accent invisible group-hover:visible group-focus-visible:visible">▶</span>
        <span className="flex-1">{label ?? obj.label}</span>
        <span className={`glyph ${opened ? "text-accent-3" : "text-subtle/50"}`} aria-label={opened ? "visited" : "not visited"}>
          {opened ? "★" : "☆"}
        </span>
      </button>
    </li>
  );
}

export function GameMenu({ objects, opened, onSelect, onClose }: Props) {
  const interactive = objects.filter((o) => o.content);
  const intro = interactive.filter((o) => o.kind === "sign" || o.kind === "cottage");
  const jobs = interactive.filter((o) => o.kind === "building" || o.kind === "school");
  const chests = interactive.filter((o) => o.kind === "chest");
  const contact = interactive.filter((o) => o.kind === "postbox");

  const section = (title: string, list: WorldObject[], labelFor?: (o: WorldObject) => string) => (
    <section>
      <h3 className="font-pixel text-[10px] text-accent-2 uppercase mb-2">{title}</h3>
      <ul>
        {list.map((o) => (
          <Item key={o.id} obj={o} opened={opened.has(o.id)} onSelect={onSelect} label={labelFor?.(o)} />
        ))}
      </ul>
    </section>
  );

  return (
    <div className="absolute inset-0 z-30 bg-background/85 flex items-center justify-center p-3" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="pop pixel-box w-full max-w-2xl max-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b-4 border-foreground">
          <h2 className="font-pixel text-xs text-accent">PAUSED</h2>
          <button onClick={onClose} className="font-pixel text-[10px] text-foreground hover:text-accent cursor-pointer" autoFocus>
            RESUME ▶
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 grid gap-6 sm:grid-cols-2">
          <div className="space-y-6">
            {section("Start", intro, (o) => (o.id === "welcome" ? "Welcome" : "About me"))}
            {section("Career road", [...jobs].reverse(), (o) => {
              const c = o.content;
              return c?.kind === "jobs" ? c.company : o.label;
            })}
            {section("Contact", contact, () => "Get in touch")}
          </div>
          {section("Project vault", chests)}
        </div>
        <p className="px-5 pb-4 pt-2 font-pixel text-[8px] text-subtle">PICK ANYTHING TO WARP THERE</p>
      </div>
    </div>
  );
}
