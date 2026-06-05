import { WireframeSphere } from "./wireframe-sphere";

export function PanelHome() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Visual — wireframe sphere */}
      <div className="flex-none md:w-[45%] flex items-center justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
        <div className="w-full max-w-[320px]">
          <WireframeSphere size={320} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-8 md:p-16">
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Software Engineer</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none uppercase">
              Ian<br />Luddy
            </h1>
          </div>

          <p className="text-sm font-light leading-relaxed text-white/60 max-w-sm">
            One engineer · Many agents · Parallel workflows · Shipping at full velocity.
          </p>

          <div className="space-y-1 text-xs font-light tracking-widest text-white/40 uppercase">
            <p>Galway, Ireland</p>
            <p>Available for contract work</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 mt-12">
          <a
            href="mailto:ianluddy@gmail.com"
            className="text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase"
          >
            ianluddy@gmail.com /
          </a>
          <a
            href="https://github.com/ianluddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase"
          >
            github.com/ianluddy /
          </a>
          <a
            href="https://ie.linkedin.com/in/ianluddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase"
          >
            linkedin.com/in/ianluddy /
          </a>
        </div>
      </div>
    </div>
  );
}
