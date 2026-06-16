"use client";

import { useEffect, useRef, useState } from "react";
import { PanelHome } from "./panel-home";
import { PanelAbout } from "./panel-about";
import { PanelProjects } from "./panel-projects";
import { PanelExperience } from "./panel-experience";
import { ScrambleText } from "./scramble-text";

const COLLAPSED_PX = 56;
const DESKTOP_ANIM_MS = 390;
const MOBILE_ANIM_MS = 270;

const panels = [
  { id: "01", label: "Home", Content: PanelHome },
  { id: "02", label: "About", Content: PanelAbout },
  { id: "03", label: "Experience", Content: PanelExperience },
  { id: "04", label: "Projects", Content: PanelProjects },
];


export function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visitedPanels, setVisitedPanels] = useState<Set<number>>(new Set([0]));
  const panelScrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  function markVisited(i: number) {
    setVisitedPanels(prev => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }

  // Reset desktop panel scroll to top after the width animation completes
  useEffect(() => {
    const ref = panelScrollRefs.current[activeIndex];
    if (!ref) return;
    const timer = setTimeout(() => {
      ref.scrollTo({ top: 0, behavior: "smooth" });
    }, DESKTOP_ANIM_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  function openPanel(i: number) {
    setActiveIndex(i);
    markVisited(i);
    // Wait one frame so React commits the DOM update and scroll anchoring
    // has run, then hard-reset to the top before the animation plays.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }

  return (
    <>
      {/* ── Desktop: horizontal accordion ── */}
      <div className="hidden md:flex h-screen w-screen overflow-hidden bg-background text-foreground">
        {panels.map(({ id, label, Content }, i) => {
          const isActive = activeIndex === i;
          const collapsedTotal = (panels.length - 1) * COLLAPSED_PX;

          return (
            <div
              key={id}
              className="relative h-full flex-none overflow-hidden border-r border-foreground/50 last:border-r-0"
              style={{
                width: isActive
                  ? `calc(100vw - ${collapsedTotal}px)`
                  : `${COLLAPSED_PX}px`,
                transition: "width 0.39s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease",
                cursor: isActive ? "default" : "pointer",
                backgroundColor: !isActive && hoveredIndex === i
                  ? "color-mix(in srgb, var(--foreground) 4%, transparent)"
                  : "transparent",
              }}
              onClick={() => { if (!isActive) { setActiveIndex(i); markVisited(i); } }}
              onMouseEnter={() => !isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Collapsed tab */}
              <div
                className="absolute top-0 left-0 flex flex-col items-center pt-6 gap-5 z-10 select-none"
                style={{
                  width: COLLAPSED_PX,
                  transition: "color 0.2s ease",
                  color: !isActive && hoveredIndex === i ? "var(--foreground)" : "var(--subtle)",
                }}
              >
                <span className="text-[10px] font-normal tracking-[0.15em]">
                  <ScrambleText text={id} delay={200 + i * 200} duration={700} />
                </span>
                <span
                  className="text-xs font-normal tracking-[0.18em] uppercase"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  <ScrambleText text={label} delay={350 + i * 200} duration={Math.max(800, label.length * 80)} />
                </span>
              </div>

              {/* Panel content */}
              <div
                ref={(el) => { panelScrollRefs.current[i] = el; }}
                className="absolute top-0 h-full overflow-y-auto"
                style={{
                  left: COLLAPSED_PX,
                  width: `calc(100vw - ${collapsedTotal + COLLAPSED_PX}px)`,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-12px)",
                  transition: isActive
                    ? "opacity 0.24s ease 0.21s, transform 0.24s ease 0.21s"
                    : "opacity 0.09s ease, transform 0.09s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {visitedPanels.has(i) && (
                  label === "Projects"
                    ? <PanelProjects isActive={isActive} />
                    : <Content />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical accordion ── */}
      <div className="flex md:hidden flex-col w-screen bg-background text-foreground overflow-y-auto">
        {panels.map(({ id, label, Content }, i) => {
          const isActive = activeIndex === i;

          return (
            <div key={id} className="border-b border-foreground/10 last:border-b-0">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                onClick={() => openPanel(i)}
              >
                <span className="text-[10px] font-light tracking-[0.15em] text-subtle flex-none">
                  <ScrambleText text={id} delay={200 + i * 200} duration={700} />
                </span>
                <span className="text-[10px] font-light tracking-[0.18em] text-subtle uppercase flex-1">
                  <ScrambleText text={label} delay={350 + i * 200} duration={Math.max(800, label.length * 80)} />
                </span>
                <span className={`text-subtle text-sm flex-none transition-transform ${isActive ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isActive ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.27s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="overflow-hidden">
                  {visitedPanels.has(i) && (
                    label === "Projects"
                      ? <PanelProjects isActive={isActive} />
                      : <Content />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
