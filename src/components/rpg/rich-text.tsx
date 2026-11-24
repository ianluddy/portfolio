import type { Paragraph } from "@/data/content";

export function paragraphLength(p: Paragraph) {
  return p.reduce((n, seg) => n + (typeof seg === "string" ? seg.length : seg.text.length), 0);
}

const linkClass = "text-accent underline decoration-2 underline-offset-4 hover:bg-accent hover:text-background";

/** Render a paragraph, optionally cut off after `limit` characters (typewriter). */
export function RichText({ paragraph, limit = Infinity }: { paragraph: Paragraph; limit?: number }) {
  const starts = paragraph.map((_, i) => paragraphLength(paragraph.slice(0, i)));
  return (
    <>
      {paragraph.map((seg, i) => {
        const left = limit - starts[i];
        if (left <= 0) return null;
        const text = typeof seg === "string" ? seg : seg.text;
        const shown = text.slice(0, left);
        if (typeof seg === "string") return <span key={i}>{shown}</span>;
        // While typing, links are visual only so nothing hidden is focusable
        if (limit !== Infinity) return <span key={i} className={linkClass}>{shown}</span>;
        return (
          <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {shown}
          </a>
        );
      })}
    </>
  );
}
