// Renders text as fixed-width "flaps": each character occupies exactly the
// width of its final letter, so the line never grows or shrinks while the
// letters are flipping. Words stay unbreakable so wrapping matches the real
// text too.

export const flapTextStyle: React.CSSProperties = {
  // Kerning/ligatures would make per-letter widths differ from the settled text
  fontKerning: "none",
  fontVariantLigatures: "none",
};

export function FlapCells({ text, displayed }: { text: string; displayed: string }) {
  const tokens = text.split(/(\s+)/);
  const starts = tokens.map((_, t) => tokens.slice(0, t).join("").length);

  return (
    <>
      {tokens.map((token, t) => {
        const start = starts[t];
        if (!token || /^\s+$/.test(token)) return token;
        return (
          <span key={t} style={{ whiteSpace: "nowrap" }}>
            {token.split("").map((real, j) => {
              const shown = displayed[start + j] ?? real;
              if (shown === real) return real;
              return (
                <span key={j} className="flap-cell">
                  <span style={{ visibility: "hidden" }}>{real}</span>
                  <span key={shown} className="flap-char" aria-hidden>
                    {shown}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}
