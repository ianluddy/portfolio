"use client";

import { useScramble } from "@/hooks/use-scramble";
import { ReactNode } from "react";

interface ScrambleParagraphProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}

// For paragraph content — especially mixed inline+link text — the inline-grid
// trick used in ScrambleText disrupts the inline formatting context and causes
// line breaks in wrong places. This component instead renders the real content
// (with real links) as an invisible layout anchor and absolutely overlays the
// scrambled string on top, guaranteeing identical line-breaking throughout.
export function ScrambleParagraph({
  text,
  delay = 0,
  duration = 1200,
  className,
  children,
}: ScrambleParagraphProps) {
  const displayed = useScramble(text, delay, duration);
  const isAnimating = displayed !== text;

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <p
        className={className}
        style={isAnimating ? { opacity: 0, pointerEvents: "none" } : undefined}
      >
        {children}
      </p>
      {isAnimating && (
        <p
          className={className}
          style={{ position: "absolute", inset: 0, margin: 0, pointerEvents: "none" }}
          aria-hidden
        >
          {displayed}
        </p>
      )}
    </div>
  );
}
