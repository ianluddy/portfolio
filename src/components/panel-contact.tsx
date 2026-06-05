export function PanelContact() {
  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-16">
      <div className="space-y-12">
        <p className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase">Contact</p>

        <div className="space-y-2">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight">
            Get in<br />touch
          </h2>
          <p className="text-sm font-light text-foreground/40 max-w-xs pt-4">
            Open to contract work, collaborations, and interesting problems.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-t border-foreground/10 pt-6">
            <p className="text-[10px] tracking-[0.2em] text-foreground/25 uppercase mb-2">Email</p>
            <a
              href="mailto:ianluddy@gmail.com"
              className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
            >
              ianluddy@gmail.com
            </a>
          </div>

          <div className="border-t border-foreground/10 pt-6">
            <p className="text-[10px] tracking-[0.2em] text-foreground/25 uppercase mb-2">GitHub</p>
            <a
              href="https://github.com/ianluddy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
            >
              github.com/ianluddy
            </a>
          </div>

          <div className="border-t border-foreground/10 pt-6">
            <p className="text-[10px] tracking-[0.2em] text-foreground/25 uppercase mb-2">LinkedIn</p>
            <a
              href="https://ie.linkedin.com/in/ianluddy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
            >
              linkedin.com/in/ianluddy
            </a>
          </div>

          <div className="border-t border-foreground/10 pt-6">
            <p className="text-[10px] tracking-[0.2em] text-foreground/25 uppercase mb-2">Location</p>
            <p className="text-sm font-light text-foreground/60">Galway, Ireland</p>
          </div>
        </div>
      </div>

      <p className="text-[10px] tracking-widest text-foreground/20 uppercase">
        © {new Date().getFullYear()} Ian Luddy
      </p>
    </div>
  );
}
