"use client";

import type { ReactNode } from "react";
import { arrowNav } from "./nav";

interface Props<T> {
  items: T[];
  slugOf: (item: T) => string;
  selected: number;
  /** On small screens the detail view replaces the list. */
  detailOpen: boolean;
  isMobile: boolean;
  cols?: number;
  listLabel: string;
  listClass: string;
  renderItem: (item: T, selected: boolean) => ReactNode;
  itemClass: (selected: boolean) => string;
  renderDetail: (item: T) => ReactNode;
  onSelect: (slug: string, via: "focus" | "click") => void;
  onBack: () => void;
  onExitLeft: () => void;
  header?: ReactNode;
}

/** A selectable list/grid with a detail pane, RPG-menu style. */
export function Browser<T>(p: Props<T>) {
  const cols = p.cols ?? 1;
  const showList = !p.isMobile || !p.detailOpen;
  const showDetail = !p.isMobile || p.detailOpen;
  const current = p.items[p.selected];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {showList && (
        <div className="lg:w-[46%] flex-none">
          {p.header}
          <ul
            aria-label={p.listLabel}
            className={p.listClass}
            onKeyDown={(e) => {
              if (arrowNav(e, cols)) return;
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                p.onExitLeft();
              } else if (e.key === "ArrowRight" && !p.isMobile && cols === 1) {
                e.preventDefault();
                document.getElementById("detail-pane")?.focus();
              }
            }}
          >
            {p.items.map((item, i) => {
              const sel = i === p.selected && !p.isMobile;
              const slug = p.slugOf(item);
              return (
                <li key={slug}>
                  <button
                    data-nav
                    data-selected={i === p.selected}
                    aria-current={sel ? "true" : undefined}
                    className={`group w-full text-left cursor-pointer ${p.itemClass(sel)}`}
                    onFocus={() => p.onSelect(slug, "focus")}
                    onClick={() => p.onSelect(slug, "click")}
                  >
                    {p.renderItem(item, sel)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {showDetail && current && (
        <div
          id="detail-pane"
          tabIndex={-1}
          className="pop flex-1 min-w-0 border-4 border-foreground bg-background p-5 sm:p-6 shadow-[6px_6px_0_0_#000] self-start w-full outline-none"
          key={p.slugOf(current)}
          aria-live="polite"
        >
          {p.isMobile && (
            <button onClick={p.onBack} className="font-pixel text-[9px] uppercase text-subtle hover:text-accent mb-5 cursor-pointer">
              <span className="glyph">◀</span> Back
            </button>
          )}
          {p.renderDetail(current)}
        </div>
      )}
    </div>
  );
}
