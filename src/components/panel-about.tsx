import { ScrambleParagraph } from "@/components/scramble-paragraph";

export function PanelAbout() {
  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-start p-8 md:p-16 gap-6">
      <h2 className="font-pixel text-xs text-accent uppercase">
        <span className="text-accent-2">▶</span> Player Profile
      </h2>
      <div className="space-y-5 text-xl leading-snug text-muted max-w-lg">
        <ScrambleParagraph
          text="I'm a full-stack software builder from Galway with a passion for coding that started in 2008. I build software the way modern engineers should: AI-first, using Claude Code for engineering, Claude Design for UI, and Conductor to parallelise multiple agents across tasks simultaneously."
          delay={200}
          duration={1500}
          className="text-xl leading-snug text-muted max-w-lg"
        >
          I'm a full-stack software builder from Galway with a passion for coding that started in 2008. I build software the way modern engineers should: AI-first, using{" "}
          <a href="https://claude.ai/code" className="text-accent underline decoration-2 underline-offset-4 hover:bg-accent hover:text-background">
            Claude Code
          </a>
          {" "}for engineering,{" "}
          <a href="https://claude.ai/design" className="text-accent underline decoration-2 underline-offset-4 hover:bg-accent hover:text-background">
            Claude Design
          </a>
          {" "}for UI, and{" "}
          <a href="https://conductor.build" className="text-accent underline decoration-2 underline-offset-4 hover:bg-accent hover:text-background">
            Conductor
          </a>
          {" "}to parallelise multiple agents across tasks simultaneously.
        </ScrambleParagraph>

        <ScrambleParagraph
          text="This lets me prototype, architect, and ship production systems dramatically faster than traditional workflows — exploring design tradeoffs, eliminating boilerplate, and maintaining high velocity without sacrificing code quality."
          delay={800}
          duration={1750}
          className="text-xl leading-snug text-muted"
        >
          This lets me prototype, architect, and ship production systems dramatically faster than traditional workflows — exploring design tradeoffs, eliminating boilerplate, and maintaining high velocity without sacrificing code quality.
        </ScrambleParagraph>

        <ScrambleParagraph
          text="Outside of work I'm usually chilling with the family, dialling in coffee, playing tunes on the banjo, or walking the dog."
          delay={1100}
          duration={1100}
          className="text-xl leading-snug text-muted"
        >
          Outside of work I'm usually chilling with the family, dialling in coffee, playing tunes on the banjo, or walking the dog.
        </ScrambleParagraph>
      </div>
    </div>
  );
}
