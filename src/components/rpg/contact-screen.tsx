"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { CAMPFIRE, DOG, ICONS, PLAYER } from "@/game/sprites";
import { PixelSprite } from "./pixel-sprite";
import { Heading } from "./ui";

const labels = ["Email", "GitHub", "LinkedIn"];

export function ContactScreen() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFrame((f) => 1 - f), 260);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-8 max-w-2xl">
      <Heading>Save point</Heading>
      <div className="flex items-end gap-4 sm:gap-6 border-4 border-foreground bg-background px-6 pt-6 pb-4 w-fit shadow-[6px_6px_0_0_#000]" aria-hidden>
        <PixelSprite sprite={PLAYER.idle} scale={4} />
        <PixelSprite sprite={CAMPFIRE[frame]} scale={4} />
        <PixelSprite sprite={DOG.sit} scale={3} flip />
        <PixelSprite sprite={ICONS.postbox} scale={4} />
      </div>
      <p className="font-terminal text-2xl leading-snug text-foreground">
        {profile.location} — <span className="text-accent-3">{profile.availability.toLowerCase()}</span>.
      </p>
      <ul className="space-y-3">
        {profile.links.map((l, i) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-4 border-subtle/50 hover:border-accent focus-visible:border-accent bg-background px-4 py-3"
            >
              <span className="glyph text-accent invisible group-hover:visible group-focus-visible:visible blink">▶</span>
              <span className="font-pixel text-[9px] uppercase text-subtle w-20">{labels[i]}</span>
              <span className="font-pixel text-[10px] text-accent break-all">{l.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
