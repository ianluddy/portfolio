"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { jobSlug, profile, projects, projectSlug, timeline } from "@/data/content";
import { DOG, ICONS, PLAYER } from "@/game/sprites";
import { play, setMuted } from "@/game/audio";
import { arrowNav, navigate, SECTIONS, useRoute, type Section } from "./nav";
import { PixelSprite } from "./pixel-sprite";
import { useMedia } from "./ui";
import { ProfileScreen } from "./profile-screen";
import { QuestScreen } from "./quest-screen";
import { iconFor, InventoryScreen } from "./inventory-screen";
import { ContactScreen } from "./contact-screen";

const MENU: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <PixelSprite sprite={PLAYER.idle.slice(0, 12)} scale={2} /> },
  { id: "quests", label: "Quest log", icon: <span className="glyph text-accent">!</span> },
  { id: "inventory", label: "Inventory", icon: <PixelSprite sprite={iconFor(projects[0])} scale={2} /> },
  { id: "contact", label: "Contact", icon: <PixelSprite sprite={ICONS.postbox} scale={2} /> },
];

// ── mute preference, persisted per browser ──
const MUTE_KEY = "muted";
const MUTE_EVT = "rpg:mute";
function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}
function useMuted() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(MUTE_EVT, cb);
      return () => window.removeEventListener(MUTE_EVT, cb);
    },
    readMuted,
    () => false,
  );
}

export function Rpg() {
  const { started, section, slug } = useRoute();
  const isMobile = useMedia("(max-width: 1023px)");
  const touch = useMedia("(pointer: coarse)");
  const muted = useMuted();
  const menuRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => setMuted(muted), [muted]);

  const toggleMute = () => {
    try {
      localStorage.setItem(MUTE_KEY, muted ? "0" : "1");
    } catch {}
    window.dispatchEvent(new Event(MUTE_EVT));
  };

  const go = useCallback((s: Section) => {
    play("open");
    navigate(s);
  }, []);

  const start = useCallback(() => {
    play("start");
    navigate("profile");
  }, []);

  const focusMenu = useCallback(() => {
    menuRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.focus();
  }, []);

  const focusContent = useCallback(() => {
    const main = mainRef.current?.querySelector<HTMLElement>(":scope > div:not([hidden])");
    if (!main) return;
    const target =
      main.querySelector<HTMLElement>('[data-nav][data-selected="true"]') ??
      main.querySelector<HTMLElement>("[data-nav], a[href], button") ??
      main;
    target.focus();
  }, []);

  // Scroll content back to the top when switching screens
  const detailKey = isMobile ? slug : null;
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [section, detailKey]);

  // Global keys: any key starts, 1–4 jump to a screen, Esc goes back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!started) {
        if (e.key === "Tab" || e.key === "Shift") return;
        e.preventDefault();
        start();
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= SECTIONS.length) {
        go(SECTIONS[n - 1]);
        return;
      }
      if (e.key === "Escape") {
        if (isMobile && slug) navigate(section);
        else focusMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, start, go, isMobile, slug, section, focusMenu]);

  // Selection inside the quest log / inventory
  const indexOf = (list: string[]) => Math.max(0, slug ? list.indexOf(slug) : 0);
  const questSlugs = timeline.map(jobSlug);
  const itemSlugs = projects.map(projectSlug);

  const select = (s: Section) => (itemSlug: string, via: "focus" | "click") => {
    if (isMobile) {
      if (via === "click") {
        play("page");
        navigate(`${s}/${itemSlug}`);
      }
      return;
    }
    if (`${s}/${itemSlug}` !== window.location.hash.slice(1)) play("blip");
    navigate(`${s}/${itemSlug}`, "replace");
  };

  const browserProps = {
    detailOpen: !!slug,
    isMobile,
    onBack: () => navigate(section),
    onExitLeft: focusMenu,
  };

  return (
    <div className="stars h-[100svh] w-full flex items-center justify-center lg:p-6">
      <div className="crt relative w-full h-full max-w-6xl flex flex-col bg-panel lg:border-4 lg:border-foreground lg:shadow-[0_0_0_4px_#000,10px_10px_0_4px_#000]">
        {/* Title bar */}
        <header className="flex-none flex items-center justify-between gap-3 px-4 py-3 border-b-4 border-foreground bg-background">
          <button onClick={() => go("profile")} className="flex items-center gap-3 cursor-pointer text-left">
            <span className="font-pixel text-[10px] sm:text-xs text-accent">{profile.name.toUpperCase()}</span>
            <span className="hidden sm:inline font-pixel text-[8px] text-subtle uppercase">Software Builder</span>
          </button>
          <button
            onClick={toggleMute}
            className="font-pixel text-[8px] uppercase text-subtle hover:text-accent border-2 border-subtle/50 px-2 py-1.5 cursor-pointer"
            aria-pressed={!muted}
          >
            <span className="glyph">♪</span> Sound {muted ? "off" : "on"}
          </button>
        </header>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          {/* Main menu */}
          <nav
            ref={menuRef}
            aria-label="Main menu"
            className="flex-none lg:w-60 border-b-4 lg:border-b-0 lg:border-r-4 border-foreground bg-background/60 lg:flex lg:flex-col lg:justify-between"
            onKeyDown={(e) => {
              if (arrowNav(e, isMobile ? SECTIONS.length : 1)) return;
              if (e.key === "ArrowRight" && !isMobile) {
                e.preventDefault();
                focusContent();
              }
            }}
          >
            <ul className="grid grid-cols-4 lg:grid-cols-1 lg:p-4 lg:gap-1">
              {MENU.map((m, i) => {
                const current = started && section === m.id;
                return (
                  <li key={m.id}>
                    <button
                      data-nav
                      aria-current={current ? "page" : undefined}
                      onClick={() => {
                        if (section === m.id && started) focusContent();
                        else go(m.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && current) {
                          e.preventDefault();
                          focusContent();
                        }
                      }}
                      className={`group w-full h-full flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 px-1 py-3 lg:px-3 lg:py-3 cursor-pointer border-r-2 last:border-r-0 lg:border-r-0 border-subtle/30 lg:border-2 ${
                        current ? "bg-accent text-background lg:border-accent" : "text-foreground hover:bg-panel lg:border-transparent"
                      }`}
                    >
                      <span className="hidden lg:inline">
                        <span className={`glyph ${current ? "blink" : "invisible group-hover:visible text-accent"}`}>▶</span>
                      </span>
                      <span className="h-6 flex items-center" aria-hidden>
                        {m.icon}
                      </span>
                      <span className="font-pixel text-[7px] sm:text-[9px] uppercase leading-relaxed text-center lg:text-left">{m.label}</span>
                      <span className={`hidden lg:inline ml-auto font-pixel text-[8px] ${current ? "text-background/60" : "text-subtle"}`}>{i + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="hidden lg:block p-4 border-t-4 border-foreground">
              <p className="font-pixel text-[8px] uppercase text-subtle mb-3">Party</p>
              <div className="flex items-end gap-2">
                <PixelSprite sprite={PLAYER.idle} scale={3} />
                <PixelSprite sprite={DOG.a} scale={2} />
              </div>
              <p className="font-terminal text-lg text-muted mt-3 leading-tight">{profile.location}</p>
            </div>
          </nav>

          {/* Screen */}
          <main ref={mainRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div hidden={section !== "profile"}>
              <ProfileScreen onNext={() => go("quests")} />
            </div>
            <div hidden={section !== "quests"}>
              <QuestScreen {...browserProps} selected={indexOf(questSlugs)} onSelect={select("quests")} />
            </div>
            <div hidden={section !== "inventory"}>
              <InventoryScreen {...browserProps} selected={indexOf(itemSlugs)} onSelect={select("inventory")} />
            </div>
            <div hidden={section !== "contact"}>
              <ContactScreen />
            </div>
          </main>
        </div>

        {/* Key hints */}
        {!touch && (
          <footer className="hidden lg:flex flex-none items-center justify-center gap-6 px-4 py-2.5 border-t-4 border-foreground bg-background font-pixel text-[8px] uppercase text-subtle">
            <span>
              <span className="glyph text-foreground">↑↓←→</span> Select
            </span>
            <span>
              <span className="text-foreground">Enter</span> Confirm
            </span>
            <span>
              <span className="text-foreground">Esc</span> Menu
            </span>
            <span>
              <span className="text-foreground">1–4</span> Jump
            </span>
          </footer>
        )}

        {/* Title screen */}
        {!started && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 text-center bg-background cursor-pointer stars"
            onClick={start}
          >
            <p className="font-pixel text-[9px] sm:text-[10px] text-accent-2 uppercase">
              <span className="blink glyph">●</span> Player 1
            </p>
            <p
              aria-hidden
              className="font-pixel text-4xl sm:text-6xl lg:text-7xl leading-[1.2] text-accent uppercase"
              style={{ textShadow: "4px 4px 0 var(--accent-2), 8px 8px 0 #000" }}
            >
              Ian
              <br />
              Luddy
            </p>
            <p className="font-terminal text-2xl sm:text-3xl text-foreground max-w-md leading-tight">{profile.tagline}</p>
            <div className="flex items-end gap-3" aria-hidden>
              <PixelSprite sprite={PLAYER.walkA} scale={4} />
              <PixelSprite sprite={DOG.a} scale={3} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                start();
              }}
              className="font-pixel text-xs sm:text-sm text-foreground uppercase cursor-pointer"
              autoFocus
            >
              <span className="blink text-accent glyph">▶</span> Press start
            </button>
            <p className="font-pixel text-[8px] text-subtle uppercase">{touch ? "Tap anywhere" : "Press any key"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
