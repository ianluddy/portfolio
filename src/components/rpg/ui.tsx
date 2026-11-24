"use client";

import { useSyncExternalStore, type ReactNode } from "react";

export const buttonClass =
  "inline-flex items-center gap-2 font-pixel text-[10px] uppercase text-background bg-accent px-3 py-2.5 shadow-[4px_4px_0_0_#000] hover:bg-foreground active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer";

export function Heading({ children, as: Tag = "h2" }: { children: ReactNode; as?: "h2" | "h3" }) {
  return (
    <Tag className="flex items-center gap-3 font-pixel text-[10px] uppercase text-accent-2 mb-4">
      <span>{children}</span>
      <span className="flex-1 border-t-2 border-dashed border-subtle/40" aria-hidden />
    </Tag>
  );
}

export function Cursor({ show }: { show: boolean }) {
  return (
    <span className={`glyph text-accent w-4 flex-none ${show ? "blink" : "invisible group-hover:visible"}`} aria-hidden>
      ▶
    </span>
  );
}

const noop = () => () => {};

export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Current year on the client only (the page is statically prerendered). */
export function useYear() {
  return useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
}

/** Percentage of the current year elapsed — drives the EXP bar. */
export function useYearProgress() {
  return useSyncExternalStore(
    noop,
    () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1).getTime();
      const end = new Date(now.getFullYear() + 1, 0, 1).getTime();
      return Math.round(((now.getTime() - start) / (end - start)) * 100);
    },
    () => null,
  );
}
