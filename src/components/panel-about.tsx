export function PanelAbout() {
  return (
    <div className="h-full flex flex-col justify-start p-8 md:p-16 gap-6">
<div className="space-y-4 text-sm leading-loose text-muted max-w-lg">
        <p>
          I&apos;m a full-stack software builder from Galway with a passion for
          coding that started in 2008. I build software the way modern
          engineers should: AI-first, using{" "}
          <a
            href="https://claude.ai/code"
            className="text-accent underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Claude Code
          </a>{" "}
          for engineering,{" "}
          <a
            href="https://claude.ai/design"
            className="text-accent underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Claude Design
          </a>{" "}
          for UI, and{" "}
          <a
            href="https://conductor.build"
            className="text-accent underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Conductor
          </a>{" "}
          to parallelise multiple agents across tasks simultaneously.
        </p>

        <p>
          This lets me prototype, architect, and ship production systems
          dramatically faster than traditional workflows — exploring design
          tradeoffs, eliminating boilerplate, and maintaining high velocity
          without sacrificing code quality.
        </p>

        <p>
          Outside of work I&apos;m usually chilling with the family, dialling in
          coffee, playing tunes on the banjo, or walking the dog.
        </p>
      </div>

    </div>
  );
}
