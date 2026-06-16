"use client";

import { ScrambleText } from "@/components/scramble-text";

export function PanelHome() {
  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-between p-8 md:p-16">
      <div className="space-y-3 md:space-y-5">
        <div className="space-y-2">
          <h1 className="font-display text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight uppercase text-muted">
            <ScrambleText text="Ian" delay={0} duration={600} /><br />
            <ScrambleText text="Luddy" delay={200} duration={900} />
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-muted max-w-sm">
          <ScrambleText
            text="Building software at the speed of thought with AI"
            delay={500}
            duration={1600}
            wrap
          />
        </p>

        <div className="space-y-1 text-[10px] tracking-[0.2em] text-subtle uppercase">
          <p><ScrambleText text="Galway, Ireland" delay={900} duration={700} /></p>
          <p><ScrambleText text="Available for contract work" delay={1100} duration={1000} /></p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-12">
        <a
          href="mailto:ianluddy@gmail.com"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          <ScrambleText text="ianluddy@gmail.com" delay={1400} duration={800} />
        </a>
        <a
          href="https://github.com/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          <ScrambleText text="github.com/ianluddy" delay={1600} duration={800} />
        </a>
        <a
          href="https://ie.linkedin.com/in/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          <ScrambleText text="linkedin.com/in/ianluddy" delay={1800} duration={900} />
        </a>
      </div>
    </div>
  );
}
