const themes = [
  { name: "Electric Blue",   bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#3b82f6" },
  { name: "Cyan",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#06b6d4" },
  { name: "Emerald",         bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#10b981" },
  { name: "Lime",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#84cc16" },
  { name: "Yellow",          bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#eab308" },
  { name: "Amber",           bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#f59e0b" },
  { name: "Orange",          bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#f97316" },
  { name: "Red",             bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#ef4444" },
  { name: "Rose",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#f43f5e" },
  { name: "Pink",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#ec4899" },
  { name: "Fuchsia",         bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#d946ef" },
  { name: "Violet",          bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#8b5cf6" },
  { name: "Indigo",          bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#6366f1" },
  { name: "Sky",             bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#0ea5e9" },
  { name: "Teal",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#14b8a6" },
  { name: "Mint",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#4ade80" },
  { name: "Gold",            bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#ca8a04" },
  { name: "Coral",           bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#fb7185" },
  { name: "Lavender",        bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#a78bfa" },
  { name: "White",           bg: "#121212", fg: "#ffffff", muted: "#b0b0b0", subtle: "#606060", accent: "#e2e2e2" },
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
