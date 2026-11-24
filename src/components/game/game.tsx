"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pixelFont } from "@/app/fonts";
import { profile } from "@/data/content";
import { Engine, type Input } from "@/game/engine";
import { VIEW_H, type Level, type WorldObject } from "@/game/level";
import { play, setMuted as setAudioMuted } from "@/game/audio";
import { DialogBox, type DialogApi } from "./dialog-box";
import { GameMenu } from "./game-menu";

const JUMP_KEYS = new Set([" ", "z", "Z", "w", "W", "ArrowUp"]);
const ACT_KEYS = new Set(["e", "E", "Enter", "ArrowDown", "s", "S", "x", "X"]);

export function Game() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const dialogApi = useRef<DialogApi>(null);
  const scaleRef = useRef(1);

  const [started, setStarted] = useState(false);
  const [active, setActive] = useState<WorldObject | null>(null);
  const [zone, setZone] = useState("GALWAY");
  const [coins, setCoins] = useState(0);
  const [dialog, setDialog] = useState<WorldObject | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState(false);
  const [canvasH, setCanvasH] = useState(0);
  const [touch, setTouch] = useState(false);
  const [level, setLevel] = useState<Level | null>(null);

  const totalFindable = level?.objects.filter((o) => o.content).length ?? 0;

  // ── engine lifecycle ──
  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    const engine = new Engine(canvas, pixelFont.style.fontFamily, {
      onActiveChange: setActive,
      onZoneChange: setZone,
      onCoin: setCoins,
    });
    engineRef.current = engine;
    setLevel(engine.level);

    const fit = () => {
      const { width, height } = stage.getBoundingClientRect();
      // Show more of the world on wider screens; extra height becomes sky.
      const targetW = width < 640 ? 224 : width < 1100 ? 320 : 440;
      const scale = Math.min(height / VIEW_H, width / targetW);
      const viewW = Math.ceil(width / scale);
      const viewH = Math.ceil(height / scale);
      scaleRef.current = scale;
      canvas.style.width = `${viewW * scale}px`;
      canvas.style.height = `${viewH * scale}px`;
      setCanvasH(height);
      engine.resize(viewW, viewH);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    engine.start();

    try {
      const m = localStorage.getItem("muted") === "1";
      setMuted(m);
      setAudioMuted(m);
    } catch {}
    const mq = window.matchMedia("(pointer: coarse)");
    setTouch(mq.matches);
    const onMq = () => setTouch(mq.matches);
    mq.addEventListener("change", onMq);

    return () => {
      engine.stop();
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const releaseInput = () => {
    const e = engineRef.current;
    if (e) e.input = { left: false, right: false, jump: false };
  };

  const start = useCallback(() => {
    const e = engineRef.current;
    if (!e || e.playing) return;
    e.playing = true;
    setStarted(true);
    play("start");
  }, []);

  const openDialog = useCallback((obj: WorldObject) => {
    const e = engineRef.current;
    if (!e || !obj.content) return;
    e.paused = true;
    e.markOpened(obj.id);
    releaseInput();
    setOpened(new Set(e.opened));
    setDialog(obj);
    play("open");
  }, []);

  const closeDialog = useCallback(() => {
    const e = engineRef.current;
    if (e) e.paused = false;
    releaseInput();
    setDialog(null);
    play("close");
  }, []);

  const openMenu = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    if (!e.playing) start();
    e.paused = true;
    releaseInput();
    setMenuOpen(true);
    play("page");
  }, [start]);

  const closeMenu = useCallback(() => {
    const e = engineRef.current;
    if (e) e.paused = false;
    setMenuOpen(false);
  }, []);

  const warpTo = useCallback(
    (obj: WorldObject) => {
      engineRef.current?.teleportTo(obj);
      setMenuOpen(false);
      openDialog(obj);
    },
    [openDialog],
  );

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setAudioMuted(next);
    try {
      localStorage.setItem("muted", next ? "1" : "0");
    } catch {}
  };

  // ── keyboard ──
  useEffect(() => {
    const setKey = (key: string, down: boolean) => {
      const e = engineRef.current;
      if (!e) return false;
      if (key === "ArrowLeft" || key === "a" || key === "A") e.input.left = down;
      else if (key === "ArrowRight" || key === "d" || key === "D") e.input.right = down;
      else if (JUMP_KEYS.has(key)) e.input.jump = down;
      else return false;
      return true;
    };

    const onDown = (ev: KeyboardEvent) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const target = ev.target as HTMLElement;
      const onControl = target.closest("a, button");
      if (onControl && (ev.key === "Enter" || ev.key === " ")) return;

      if (!started) {
        if (ev.key === "Tab" || ev.key === "Shift") return;
        ev.preventDefault();
        if (ev.key === "m" || ev.key === "M") openMenu();
        else start();
        return;
      }
      if (menuOpen) {
        if (ev.key === "Escape" || ev.key === "m" || ev.key === "M") closeMenu();
        return;
      }
      if (dialog) {
        if (ev.key === "Escape") closeDialog();
        else if (!ev.repeat && (ACT_KEYS.has(ev.key) || JUMP_KEYS.has(ev.key))) {
          ev.preventDefault();
          dialogApi.current?.advance();
        }
        return;
      }
      if (ev.key === "Escape" || ev.key === "m" || ev.key === "M") {
        openMenu();
        return;
      }
      if (ACT_KEYS.has(ev.key) && !JUMP_KEYS.has(ev.key)) {
        ev.preventDefault();
        if (!ev.repeat && active) openDialog(active);
        return;
      }
      if (setKey(ev.key, true)) ev.preventDefault();
    };
    const onUp = (ev: KeyboardEvent) => setKey(ev.key, false);

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", releaseInput);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", releaseInput);
    };
  }, [started, menuOpen, dialog, active, start, openMenu, closeMenu, closeDialog, openDialog]);

  // ── click / tap on the game screen ──
  const onCanvasPointer = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (!started) return start();
    if (dialog || menuOpen) return;
    const e = engineRef.current!;
    const rect = ev.currentTarget.getBoundingClientRect();
    const obj = e.objectAt((ev.clientX - rect.left) / scaleRef.current, (ev.clientY - rect.top) / scaleRef.current);
    if (obj) {
      e.teleportTo(obj);
      openDialog(obj);
    }
  };

  // ── touch pad ──
  const hold = (key: keyof Input) => ({
    onPointerDown: (ev: React.PointerEvent) => {
      ev.preventDefault();
      (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
      if (!started) start();
      const e = engineRef.current;
      if (e && !dialog && !menuOpen) e.input[key] = true;
    },
    onPointerUp: () => {
      const e = engineRef.current;
      if (e) e.input[key] = false;
    },
    onPointerCancel: () => {
      const e = engineRef.current;
      if (e) e.input[key] = false;
    },
    onContextMenu: (ev: React.MouseEvent) => ev.preventDefault(),
  });

  const pressB = (ev: React.PointerEvent) => {
    ev.preventDefault();
    if (!started) return start();
    if (menuOpen) return;
    if (dialog) dialogApi.current?.advance();
    else if (active) openDialog(active);
  };

  const padBtn =
    "select-none touch-none flex items-center justify-center font-pixel border-4 border-foreground bg-panel text-foreground shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none active:bg-accent active:text-background";

  return (
    <div className="h-[100svh] w-full flex flex-col bg-background select-none">
      <div ref={stageRef} className="relative flex-1 min-h-0 overflow-hidden">
        <div className="crt absolute inset-0 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="block mx-auto cursor-pointer"
            style={{ imageRendering: "pixelated" }}
            onPointerDown={onCanvasPointer}
            role="img"
            aria-label="A pixel-art world: Ian walks with his dog from Galway along a career road of buildings to a vault of project chests."
          />
        </div>

        {/* HUD */}
        {started && (
          <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-between gap-2 p-2 sm:p-3 font-pixel text-[8px] sm:text-[10px] uppercase pointer-events-none">
            <div className="space-y-1.5 bg-background/60 px-2 py-1.5">
              <p className="text-foreground">IAN LUDDY</p>
              <p className="text-accent-3">{zone}</p>
            </div>
            <div className="flex items-start gap-2 pointer-events-auto">
              <div className="space-y-1.5 bg-background/60 px-2 py-1.5 text-right">
                <p className="text-accent"><span className="glyph">●</span> x{String(coins).padStart(2, "0")}</p>
                <p className="text-foreground" title="Places discovered">
                  <span className="glyph">★</span> {opened.size}/{totalFindable}
                </p>
              </div>
              <button onClick={toggleMute} className={`${padBtn} h-9 w-9 text-[10px]`} aria-label={muted ? "Unmute sound" : "Mute sound"}>
                <span className="glyph">{muted ? "✕" : "♪"}</span>
              </button>
              <button onClick={openMenu} className={`${padBtn} h-9 px-2 text-[9px]`}>
                MENU
              </button>
            </div>
          </div>
        )}

        {/* Interaction prompt */}
        {started && active && !dialog && !menuOpen && (
          <button
            onClick={() => openDialog(active)}
            className="pop absolute left-1/2 -translate-x-1/2 z-10 font-pixel text-[9px] sm:text-[10px] uppercase bg-panel border-4 border-foreground px-3 py-2 shadow-[4px_4px_0_0_#000] text-foreground cursor-pointer whitespace-nowrap"
            style={{ top: Math.max(60, canvasH - 52) }}
          >
            <span className="text-accent">{touch ? "B" : "E"}</span> {active.verb} <span className="text-accent">{active.label}</span>
          </button>
        )}

        {/* Title screen */}
        {!started && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 sm:gap-7 px-4 text-center bg-background/75 cursor-pointer"
            onClick={start}
          >
            <p className="font-pixel text-[9px] sm:text-[10px] text-accent-2 uppercase">
              <span className="blink glyph">●</span> Player 1
            </p>
            <h1
              className="font-pixel text-4xl sm:text-6xl lg:text-7xl leading-[1.2] text-accent uppercase"
              style={{ textShadow: "4px 4px 0 var(--accent-2), 8px 8px 0 #000" }}
            >
              Ian
              <br />
              Luddy
            </h1>
            <p className="font-terminal text-2xl sm:text-3xl text-foreground max-w-md leading-tight">{profile.tagline}</p>
            <p className="font-pixel text-[8px] sm:text-[9px] leading-relaxed text-subtle uppercase">
              {profile.location} · <span className="text-accent-3">{profile.availability}</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                start();
              }}
              className="font-pixel text-xs sm:text-sm text-foreground uppercase mt-2 cursor-pointer"
              autoFocus
            >
              <span className="blink text-accent glyph">▶</span> Press start
            </button>
            <p className="font-pixel text-[8px] text-subtle leading-loose uppercase max-w-sm">
              {touch ? "◀ ▶ move · A jump · B open" : "← → move · space jump · E open · M menu"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openMenu();
              }}
              className="font-pixel text-[8px] text-subtle hover:text-accent underline underline-offset-4 uppercase cursor-pointer"
            >
              Skip the game: open menu
            </button>
          </div>
        )}

        {dialog?.content && (
          <div className="absolute inset-0 z-20" onClick={closeDialog}>
            <div onClick={(e) => e.stopPropagation()}>
              <DialogBox key={dialog.id} ref={dialogApi} content={dialog.content} touch={touch} onClose={closeDialog} />
            </div>
          </div>
        )}

        {menuOpen && level && (
          <GameMenu objects={level.objects} opened={opened} onSelect={warpTo} onClose={closeMenu} />
        )}
      </div>

      {/* Touch controls */}
      {touch && (
        <div className="flex-none flex items-center justify-between px-5 py-4 gap-4 border-t-4 border-foreground bg-panel/60" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <div className="flex gap-3">
            <button aria-label="Move left" className={`${padBtn} h-16 w-16 text-lg`} {...hold("left")}>
              <span className="glyph">◀</span>
            </button>
            <button aria-label="Move right" className={`${padBtn} h-16 w-16 text-lg`} {...hold("right")}>
              <span className="glyph">▶</span>
            </button>
          </div>
          <div className="flex gap-3 items-end">
            <button aria-label="Open" className={`${padBtn} h-14 w-14 rounded-full text-sm ${active || dialog ? "!bg-accent-2" : ""}`} onPointerDown={pressB}>
              B
            </button>
            <button aria-label="Jump" className={`${padBtn} h-16 w-16 rounded-full text-sm mb-4`} {...hold("jump")}>
              A
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
