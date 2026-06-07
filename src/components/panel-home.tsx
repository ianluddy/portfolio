export function PanelHome() {
  return (
    <div className="min-h-[calc(100svh-210px)] md:h-full flex flex-col justify-between p-8 md:p-16">
      <div className="space-y-3 md:space-y-5">
        <div className="space-y-2">
          <h1 className="font-display text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight uppercase text-muted">
            Ian<br />Luddy
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-muted max-w-sm">
          Building software at the speed of thought with AI
        </p>

        <div className="space-y-1 text-[10px] tracking-[0.2em] text-subtle uppercase">
          <p>Galway, Ireland</p>
          <p>Available for contract work</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-12">
        <a
          href="mailto:ianluddy@gmail.com"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          ianluddy@gmail.com
        </a>
        <a
          href="https://github.com/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          github.com/ianluddy
        </a>
        <a
          href="https://ie.linkedin.com/in/ianluddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
        >
          linkedin.com/in/ianluddy
        </a>
      </div>
    </div>
  );
}
