"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { PanelHome } from "./panel-home";
import { PanelAbout } from "./panel-about";
import { PanelProjects } from "./panel-projects";
import { PanelExperience } from "./panel-experience";
import { PanelContact } from "./panel-contact";

const COLLAPSED_PX = 56;

const panels = [
  { id: "01", label: "Home", Content: PanelHome },
  { id: "02", label: "About", Content: PanelAbout },
  { id: "03", label: "Projects", Content: PanelProjects },
  { id: "04", label: "Experience", Content: PanelExperience },
  { id: "05", label: "Contact", Content: PanelContact },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 p-2 text-subtle hover:text-foreground transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark
        ? <Sun size={16} strokeWidth={1.5} />
        : <Moon size={16} strokeWidth={1.5} />
      }
    </button>
  );
}

export function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ThemeToggle />

      {/* ── Desktop: horizontal accordion ── */}
      <div className="hidden md:flex h-screen w-screen overflow-hidden bg-background text-foreground">
        {panels.map(({ id, label, Content }, i) => {
          const isActive = activeIndex === i;
          const collapsedTotal = (panels.length - 1) * COLLAPSED_PX;

          return (
            <div
              key={id}
              className="relative h-full flex-none overflow-hidden border-r border-foreground/10 last:border-r-0"
              style={{
                width: isActive
                  ? `calc(100vw - ${collapsedTotal}px)`
                  : `${COLLAPSED_PX}px`,
                transition: "width 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: isActive ? "default" : "pointer",
              }}
              onClick={() => !isActive && setActiveIndex(i)}
            >
              {/* Collapsed tab */}
              <div
                className="absolute top-0 left-0 flex flex-col items-center pt-6 gap-5 z-10 select-none"
                style={{ width: COLLAPSED_PX }}
              >
                <span className="text-[10px] font-light tracking-[0.15em] text-subtle">
                  {id}
                </span>
                <span
                  className="text-[10px] font-light tracking-[0.18em] text-subtle uppercase"
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
                className="absolute top-0 h-full overflow-y-auto"
                style={{
                  left: COLLAPSED_PX,
                  width: `calc(100vw - ${collapsedTotal + COLLAPSED_PX}px)`,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-12px)",
                  transition: isActive
                    ? "opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s"
                    : "opacity 0.15s ease, transform 0.15s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <Content />
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
                onClick={() => setActiveIndex(i)}
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
                  transition: "grid-template-rows 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
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
