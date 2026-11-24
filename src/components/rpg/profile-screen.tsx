"use client";

import { about, profile, startYear } from "@/data/content";
import { DOG, ICONS, PLAYER } from "@/game/sprites";
import { PixelSprite } from "./pixel-sprite";
import { RichText } from "./rich-text";
import { buttonClass, Heading, useYear, useYearProgress } from "./ui";

const equipment = [
  { name: "Claude Code", use: "for engineering", href: "https://claude.ai/code", icon: ICONS.terminal },
  { name: "Claude Design", use: "for UI", href: "https://claude.ai/design", icon: ICONS.brush },
  { name: "Conductor", use: "to parallelise agents", href: "https://conductor.build", icon: ICONS.wand },
];

export function ProfileScreen({ onNext }: { onNext: () => void }) {
  const year = useYear();
  const exp = useYearProgress();
  const level = year ? year - startYear : 0;

  const stats: [string, React.ReactNode][] = [
    ["Class", "Software Builder"],
    ["Level", year ? `LV ${level}` : "—"],
    ["Home", profile.location],
    [
      "Status",
      <span key="s" className="text-accent-3">
        <span className="glyph blink">●</span> {profile.availability}
      </span>,
    ],
  ];

  return (
    <div className="space-y-10">
      <section aria-labelledby="char-heading">
        <Heading>
          <span id="char-heading">Character</span>
        </Heading>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="flex-none self-start flex items-end gap-2 border-4 border-foreground bg-background px-5 pt-5 pb-3 shadow-[6px_6px_0_0_#000]">
            <PixelSprite sprite={PLAYER.idle} scale={6} title="Pixel portrait of Ian" />
            <PixelSprite sprite={DOG.sit} scale={4} title="His dog" />
          </div>
          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h1 className="font-pixel text-xl sm:text-2xl text-accent leading-tight" style={{ textShadow: "3px 3px 0 #000" }}>
                {profile.name}
              </h1>
              <p className="font-terminal text-2xl text-foreground mt-2 leading-tight">{profile.tagline}</p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-baseline">
              {stats.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-pixel text-[9px] uppercase text-subtle">{k}</dt>
                  <dd className="font-terminal text-xl text-foreground leading-tight">{v}</dd>
                </div>
              ))}
              <dt className="font-pixel text-[9px] uppercase text-subtle">Exp</dt>
              <dd className="flex items-center gap-3">
                <span className="relative h-3 flex-1 max-w-56 border-2 border-foreground bg-background" aria-hidden>
                  <span className="absolute inset-y-0 left-0 bg-accent-3" style={{ width: `${exp ?? 0}%` }} />
                </span>
                <span className="font-terminal text-lg text-muted">
                  {exp !== null ? `${exp}% to LV ${level + 1}` : ""}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="bio-heading">
        <Heading>
          <span id="bio-heading">Bio</span>
        </Heading>
        <div className="space-y-4 max-w-2xl">
          {about.map((p, i) => (
            <p key={i} className="font-terminal text-xl sm:text-2xl leading-snug text-muted">
              <RichText paragraph={p} />
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="equip-heading">
        <Heading>
          <span id="equip-heading">Equipped</span>
        </Heading>
        <ul className="grid sm:grid-cols-3 gap-3">
          {equipment.map((e) => (
            <li key={e.name}>
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border-4 border-subtle/50 hover:border-accent bg-background p-3"
              >
                <span className="flex-none w-12 h-12 flex items-center justify-center border-2 border-subtle/40">
                  <PixelSprite sprite={e.icon} scale={3} />
                </span>
                <span>
                  <span className="block font-pixel text-[9px] text-foreground group-hover:text-accent">{e.name}</span>
                  <span className="block font-terminal text-lg text-subtle leading-tight mt-1">{e.use}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <button onClick={onNext} className={buttonClass}>
        <span className="glyph">▶</span> Open quest log
      </button>
    </div>
  );
}
