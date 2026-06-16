import { ScrambleText } from "@/components/scramble-text";

export function PanelAbout() {
  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-start p-8 md:p-16 gap-6">
      <div className="space-y-4 text-sm leading-loose text-muted max-w-lg">
        <p>
          <ScrambleText text="I'm a full-stack software builder from Galway with a passion for coding that started in 2008. I build software the way modern engineers should: AI-first, using " delay={200} duration={3000} wrap />
          <a href="https://claude.ai/code" className="text-accent underline underline-offset-4 hover:text-foreground transition-colors">
            <ScrambleText text="Claude Code" delay={310} duration={600} />
          </a>
          <ScrambleText text=" for engineering, " delay={370} duration={400} />
          <a href="https://claude.ai/design" className="text-accent underline underline-offset-4 hover:text-foreground transition-colors">
            <ScrambleText text="Claude Design" delay={430} duration={700} />
          </a>
          <ScrambleText text=" for UI, and " delay={490} duration={400} />
          <a href="https://conductor.build" className="text-accent underline underline-offset-4 hover:text-foreground transition-colors">
            <ScrambleText text="Conductor" delay={550} duration={500} />
          </a>
          <ScrambleText text=" to parallelise multiple agents across tasks simultaneously." delay={610} duration={1400} wrap />
        </p>

        <p>
          <ScrambleText
            text="This lets me prototype, architect, and ship production systems dramatically faster than traditional workflows — exploring design tradeoffs, eliminating boilerplate, and maintaining high velocity without sacrificing code quality."
            delay={800}
            duration={3500}
            wrap
          />
        </p>

        <p>
          <ScrambleText
            text="Outside of work I'm usually chilling with the family, dialling in coffee, playing tunes on the banjo, or walking the dog."
            delay={1100}
            duration={2200}
            wrap
          />
        </p>
      </div>
    </div>
  );
}
