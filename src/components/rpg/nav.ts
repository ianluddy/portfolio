"use client";

import { useSyncExternalStore } from "react";

export const SECTIONS = ["profile", "quests", "inventory", "contact"] as const;
export type Section = (typeof SECTIONS)[number];

const EVT = "rpg:navigate";

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVT, cb);
  };
}

/** The URL hash is the single source of truth for which screen is showing. */
export function useRoute(): { started: boolean; section: Section; slug: string | null } {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
  const [first, slug] = hash.split("/");
  const section = (SECTIONS as readonly string[]).includes(first) ? (first as Section) : "profile";
  return { started: hash !== "", section, slug: slug || null };
}

export function navigate(hash: string, mode: "push" | "replace" = "push") {
  if (window.location.hash.slice(1) === hash) return;
  const url = hash ? `#${hash}` : window.location.pathname;
  if (mode === "push") history.pushState(null, "", url);
  else history.replaceState(null, "", url);
  window.dispatchEvent(new Event(EVT));
}

/** Arrow-key movement between [data-nav] items inside a container. Returns true if handled. */
export function arrowNav(e: React.KeyboardEvent<HTMLElement>, cols = 1): boolean {
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-nav]"));
  const i = items.indexOf(document.activeElement as HTMLElement);
  if (i < 0) return false;
  let n = -1;
  if (e.key === "ArrowDown") n = i + cols;
  else if (e.key === "ArrowUp") n = i - cols;
  else if (cols > 1 && e.key === "ArrowRight" && (i + 1) % cols !== 0) n = i + 1;
  else if (cols > 1 && e.key === "ArrowLeft" && i % cols !== 0) n = i - 1;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = items.length - 1;
  if (n < 0 || n >= items.length) return false;
  e.preventDefault();
  items[n].focus();
  return true;
}
