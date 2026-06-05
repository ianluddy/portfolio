import { WireframeSphere } from "./wireframe-sphere";

export function PanelHome() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Visual */}
      <div className="flex-none md:w-[45%] flex items-center justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-foreground/10">
        <div className="w-full max-w-[320px]">
          <WireframeSphere size={320} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase">
              Software Engineer
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight">
              Ian<br />Luddy
            </h1>
          </div>

          <p className="text-sm font-light leading-relaxed text-foreground/55 max-w-sm">
            One engineer · Many agents · Parallel workflows · Shipping at full velocity.
          </p>

          <div className="space-y-1 text-[10px] font-light tracking-[0.2em] text-foreground/35 uppercase">
            <p>Galway, Ireland</p>
            <p>Available for contract work</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-12">
          <a
            href="mailto:ianluddy@gmail.com"
            className="text-[10px] tracking-widest text-foreground/40 hover:text-foreground/80 transition-colors uppercase"
          >
            ianluddy@gmail.com /
          </a>
          <a
            href="https://github.com/ianluddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest text-foreground/40 hover:text-foreground/80 transition-colors uppercase"
          >
            github.com/ianluddy /
          </a>
          <a
            href="https://ie.linkedin.com/in/ianluddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest text-foreground/40 hover:text-foreground/80 transition-colors uppercase"
          >
            linkedin.com/in/ianluddy /
          </a>
        </div>
      </div>
    </div>
  );
}
