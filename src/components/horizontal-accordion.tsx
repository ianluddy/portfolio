"use client";

import { useEffect, useRef, useState } from "react";
import { PanelHome } from "./panel-home";
import { PanelAbout } from "./panel-about";
import { PanelProjects } from "./panel-projects";
import { PanelExperience } from "./panel-experience";

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
  const panelScrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileTopAnchorRef = useRef<HTMLDivElement>(null);

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
    // Scroll to the top anchor instantly so the accordion headers are always
    // visible before the expand/collapse animation plays.
    mobileTopAnchorRef.current?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    setActiveIndex(i);
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
              onClick={() => !isActive && setActiveIndex(i)}
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
                  {id}
                </span>
                <span
                  className="text-xs font-normal tracking-[0.18em] uppercase"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {label}
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
                {label === "Projects"
                  ? <PanelProjects isActive={isActive} />
                  : <Content />
                }
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical accordion ── */}
      <div className="flex md:hidden flex-col w-screen bg-background text-foreground overflow-y-auto">
        <div ref={mobileTopAnchorRef} />
        {panels.map(({ id, label, Content }, i) => {
          const isActive = activeIndex === i;

          return (
            <div key={id} className="border-b border-foreground/10 last:border-b-0">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                onClick={() => openPanel(i)}
              >
                <span className="text-[10px] font-light tracking-[0.15em] text-subtle flex-none">
                  {id}
                </span>
                <span className="text-[10px] font-light tracking-[0.18em] text-subtle uppercase flex-1">
                  {label}
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
                  <div className="min-h-[60vh]">
                    <Content />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
