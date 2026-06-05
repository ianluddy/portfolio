import { WireframeCircle } from "./wireframe-sphere";

export function PanelAbout() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Visual */}
      <div className="flex-none md:w-[40%] flex items-center justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
        <div className="w-full max-w-[280px]">
          <WireframeCircle size={280} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 gap-6">
        <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">About</p>

        <div className="space-y-4 text-sm font-light leading-loose text-white/70 max-w-lg">
          <p>
            I&apos;m a full-stack software engineer from Galway with a passion for
            building that started in 2008. I build software the way modern
            engineers should: AI-first. Using{" "}
            <a
              href="https://claude.ai/code"
              className="text-white underline underline-offset-4 hover:text-white/60 transition-colors"
            >
              Claude Code
            </a>{" "}
            as my primary engineering partner, I prototype, architect, and ship
            production systems dramatically faster than traditional workflows allow.
          </p>

          <p>
            I use AI to explore design tradeoffs, eliminate boilerplate, refactor
            safely, and maintain high velocity without sacrificing code quality.
            I use{" "}
            <a
              href="https://conductor.build"
              className="text-white underline underline-offset-4 hover:text-white/60 transition-colors"
            >
              Conductor
            </a>{" "}
            to maximise productivity by parallelising multiple AI agents across
            tasks — shipping features, fixing bugs, and iterating on designs
            simultaneously.
          </p>

          <p>
            Outside of work I&apos;m usually chilling with the family, dialling in
            coffee, playing tunes on the banjo, or walking the dog.
          </p>
        </div>

        <div className="pt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] tracking-widest text-white/30 uppercase max-w-lg">
          <span>Next.js / React</span>
          <span>Python</span>
          <span>TypeScript</span>
          <span>PostgreSQL</span>
          <span>Node.js</span>
          <span>AWS / Docker</span>
          <span>Claude Code</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
}
