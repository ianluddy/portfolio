"use client";

import { useScramble } from "@/hooks/use-scramble";

export function PanelHome() {
  const line1 = useScramble("Ian", 0, 600);
  const line2 = useScramble("Luddy", 200, 900);
  const sub = useScramble("Building software at the speed of thought with AI", 500, 1600);
  const location = useScramble("Galway, Ireland", 900, 700);
  const availability = useScramble("Available for contract work", 1100, 1000);
  const email = useScramble("ianluddy@gmail.com", 1400, 800);
  const github = useScramble("github.com/ianluddy", 1600, 800);
  const linkedin = useScramble("linkedin.com/in/ianluddy", 1800, 900);

  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-between p-8 md:p-16">
      <div className="space-y-3 md:space-y-5">
        <div className="space-y-2">
          <h1 className="font-display text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight uppercase text-muted">
            {line1}<br />{line2}
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-muted max-w-sm">
          {sub}
        </p>

        <div className="space-y-1 text-[10px] tracking-[0.2em] text-subtle uppercase">
          <p>{location}</p>
          <p>{availability}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-12">
        <a
          href="mailto:ianluddy@gmail.com"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          {email}
        </a>
        <a
          href="https://github.com/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          {github}
        </a>
        <a
          href="https://ie.linkedin.com/in/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          {linkedin}
        </a>
      </div>
    </div>
  );
}
