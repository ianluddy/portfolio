const themes = [
  { name: "Graphite",          bg: "#2d2d2d", fg: "#f5f5f5", muted: "#b5b5b5", subtle: "#707070", accent: "#fbbf24" },
  { name: "Warm Charcoal",     bg: "#1c1917", fg: "#e7e5e4", muted: "#a8a29e", subtle: "#57534e", accent: "#f97316" },
  { name: "Obsidian",          bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#ff6b6b" },
  { name: "Carbon Amber",      bg: "#222222", fg: "#f5f5f5", muted: "#b0b0b0", subtle: "#686868", accent: "#f59e0b" },
  { name: "Slate Tangerine",   bg: "#1e1e1e", fg: "#f5f5f5", muted: "#b5b5b5", subtle: "#707070", accent: "#ff8c42" },
  { name: "Graphite Coral",    bg: "#2a2a2a", fg: "#f0f0f0", muted: "#aaaaaa", subtle: "#686868", accent: "#ff7f6e" },
  { name: "Charcoal Peach",    bg: "#2d2d2d", fg: "#fff5f0", muted: "#c0b0aa", subtle: "#7a6a64", accent: "#ff9472" },
  { name: "Pewter Flame",      bg: "#323232", fg: "#f8f8f8", muted: "#b8b8b8", subtle: "#787878", accent: "#ff4500" },
  { name: "Graphite Marigold", bg: "#282828", fg: "#f5f5f5", muted: "#b5b5b5", subtle: "#707070", accent: "#ffb700" },
  { name: "Smoke Rose",        bg: "#252525", fg: "#faf0f0", muted: "#c0a8a8", subtle: "#7a6060", accent: "#e85d75" },
  { name: "Dark Copper",       bg: "#1e1c1a", fg: "#f0ece8", muted: "#b0a090", subtle: "#6a5a50", accent: "#bf7040" },
  { name: "Gunmetal Orange",   bg: "#262626", fg: "#f5f5f5", muted: "#b0b0b0", subtle: "#686868", accent: "#ff6b2b" },
  { name: "Charcoal Terracotta", bg: "#282420", fg: "#f0ece8", muted: "#b0a090", subtle: "#706050", accent: "#c05840" },
  { name: "Graphite Rust",     bg: "#2a2520", fg: "#f0ece8", muted: "#b0a898", subtle: "#706860", accent: "#c04820" },
  { name: "Carbon Blush",      bg: "#201e1e", fg: "#f5f0f0", muted: "#b0a0a0", subtle: "#707070", accent: "#e87890" },
  { name: "Graphite Saffron",  bg: "#252525", fg: "#fafaf8", muted: "#b0b0a0", subtle: "#686868", accent: "#e8a020" },
  { name: "Graphite Salmon",   bg: "#2e2e2e", fg: "#f8f0ee", muted: "#c0a8a0", subtle: "#806860", accent: "#e8705a" },
  { name: "Onyx Gold",         bg: "#1a1816", fg: "#ede8e0", muted: "#a8a090", subtle: "#686050", accent: "#d4901a" },
  { name: "Carbon Vermillion", bg: "#242222", fg: "#f5f2f2", muted: "#b0a8a8", subtle: "#706868", accent: "#e03030" },
  { name: "Warm Slate Honey",  bg: "#1f1d1b", fg: "#ede8e3", muted: "#a89888", subtle: "#686055", accent: "#c89030" },
  { name: "Graphite Lemon",    bg: "#222222", fg: "#fafaf5", muted: "#b0b0a0", subtle: "#686868", accent: "#ddc020" },
  { name: "Ash Crimson",       bg: "#201818", fg: "#f5f0f0", muted: "#b89090", subtle: "#706060", accent: "#dc4040" },
  { name: "Carbon Apricot",    bg: "#282828", fg: "#fff8f0", muted: "#c0b0a0", subtle: "#807060", accent: "#ff9a3c" },
];

export default function ThemesPage() {
  return (
    <div style={{ background: "#111", minHeight: "100vh", padding: "40px 32px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Theme Variants</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 40 }}>25 colour combinations — background · foreground · accent</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {themes.map((t, i) => (
          <div
            key={t.name}
            style={{
              background: t.bg,
              border: `1px solid ${t.fg}18`,
              borderRadius: 10,
              padding: "40px 48px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "32px 48px",
              alignItems: "start",
            }}
          >
            {/* Col 1: identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ color: t.muted, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {String(i + 1).padStart(2, "0")} — {t.name}
              </div>
              <div>
                <div style={{ color: t.fg, fontSize: 28, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>
                  Ian Luddy
                </div>
                <div style={{ color: t.accent, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Software Builder
                </div>
              </div>
              <div style={{ color: t.muted, fontSize: 13, lineHeight: 1.7 }}>
                Shipping AI&#x2011;first products with Claude Code, Claude Design and Conductor.
              </div>
            </div>

            {/* Col 2: project list sample */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Fin · Marketing site for Intercom's AI agent product", "Intercom · Marketing site for Intercom's platform", "Zendesk · 2M monthly visitors across 16 languages"].map((item) => {
                const [title, sub] = item.split(" · ");
                return (
                  <div key={title} style={{ borderBottom: `1px solid ${t.fg}10`, paddingBottom: 14 }}>
                    <div style={{ color: t.fg, fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{title}</div>
                    <div style={{ color: t.subtle, fontSize: 11 }}>{sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Col 3: swatches + hex values */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ label: "bg", c: t.bg }, { label: "fg", c: t.fg }, { label: "muted", c: t.muted }, { label: "subtle", c: t.subtle }, { label: "accent", c: t.accent }].map(({ label, c }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `1px solid ${t.fg}20` }} />
                    <span style={{ color: t.subtle, fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 10, color: t.subtle, fontFamily: "monospace", letterSpacing: "0.04em" }}>
                <span>bg <span style={{ color: t.fg }}>{t.bg}</span></span>
                <span>fg <span style={{ color: t.fg }}>{t.fg}</span></span>
                <span>accent <span style={{ color: t.accent }}>{t.accent}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
