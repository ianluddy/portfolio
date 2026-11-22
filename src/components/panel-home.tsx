"use client";

import { ScrambleText } from "@/components/scramble-text";
import { ScrambleParagraph } from "@/components/scramble-paragraph";

export function PanelHome() {
  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-between p-8 md:p-16">
      <div className="space-y-3 md:space-y-5">
        <p className="font-pixel text-[10px] text-accent-2 uppercase">
          <span className="blink">●</span> Player 1
        </p>
        <div className="space-y-2">
          <h1 className="font-pixel pixel-shadow text-4xl sm:text-5xl lg:text-7xl leading-[1.15] uppercase text-accent">
            <ScrambleText text="Ian" delay={0} duration={600} /><br />
            <ScrambleText text="Luddy" delay={200} duration={900} />
          </h1>
        </div>

        <ScrambleParagraph
          text="Building software at the speed of thought with AI"
          delay={500}
          duration={1600}
          className="text-2xl leading-snug text-foreground max-w-sm"
        >
          Building software at the speed of thought with AI
        </ScrambleParagraph>

        <div className="font-pixel space-y-3 text-[10px] leading-relaxed text-subtle uppercase">
          <p><ScrambleText text="Galway, Ireland" delay={900} duration={700} /></p>
          <p className="text-accent-3"><ScrambleText text="Available for contract work" delay={1100} duration={1000} /><span className="blink">_</span></p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12 pl-6">
        <p className="font-pixel text-[10px] text-subtle uppercase -ml-6 mb-1">Select</p>
        <a
          href="mailto:ianluddy@gmail.com"
          className="pixel-select font-pixel text-[10px] leading-relaxed text-accent hover:text-foreground uppercase break-all"
        >
          <ScrambleText text="ianluddy@gmail.com" delay={1400} duration={800} />
        </a>
        <a
          href="https://github.com/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-select font-pixel text-[10px] leading-relaxed text-accent hover:text-foreground uppercase break-all"
        >
          <ScrambleText text="github.com/ianluddy" delay={1600} duration={800} />
        </a>
        <a
          href="https://ie.linkedin.com/in/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-select font-pixel text-[10px] leading-relaxed text-accent hover:text-foreground uppercase break-all"
        >
          <ScrambleText text="linkedin.com/in/ianluddy" delay={1800} duration={900} />
        </a>
      </div>
    </div>
  );
}
