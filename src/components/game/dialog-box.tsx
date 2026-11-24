"use client";

import { useEffect, useImperativeHandle, useMemo, useState, type ReactNode, type Ref } from "react";
import { about, profile, type Paragraph } from "@/data/content";
import type { DialogContent } from "@/game/level";
import { play } from "@/game/audio";
import { paragraphLength, RichText } from "./rich-text";

interface Page {
  heading?: string;
  sub?: string;
  body: Paragraph;
  extras?: ReactNode;
}

export interface DialogApi {
  advance: () => void;
}

const buttonClass =
  "inline-block font-pixel text-[10px] uppercase text-background bg-accent px-3 py-2 shadow-[4px_4px_0_0_#000] hover:bg-foreground active:translate-x-1 active:translate-y-1 active:shadow-none";

function buildPages(content: DialogContent, touch: boolean): { title: string; pages: Page[] } {
  switch (content.kind) {
    case "welcome":
      return {
        title: "WELCOME!",
        pages: [
          { body: [`I'm ${profile.name}. ${profile.tagline}.`] },
          { body: [`${profile.location} — ${profile.availability.toLowerCase()}.`] },
          {
            heading: "HOW TO PLAY",
            body: [
              touch
                ? "Walk right to explore my career, then open the project chests. Use ◀ ▶ to move, A to jump and B to enter or open things. Tap MENU to jump anywhere."
                : "Walk right to explore my career, then open the project chests. ← → to move, SPACE to jump, E or ↓ to enter or open things, M for the menu.",
            ],
          },
        ],
      };
    case "about":
      return { title: "ABOUT ME", pages: about.map((body) => ({ body })) };
    case "jobs":
      return {
        title: content.company,
        pages: content.jobs.map((job) => ({
          heading: job.role,
          sub: `${job.date} – ${job.endDate}`,
          body: [job.description ?? ""],
          extras: (
            <a href={job.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <span className="glyph">▶</span> Visit {new URL(job.url).hostname.replace(/^www\./, "")}
            </a>
          ),
        })),
      };
    case "project": {
      const p = content.project;
      return {
        title: p.title,
        pages: [
          {
            heading: p.tagline,
            body: [p.description.join(" ")],
            extras: (
              <div className="space-y-4">
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((tech) => (
                    <li key={tech} className="font-pixel text-[8px] uppercase text-accent-3 border-2 border-accent-3 px-2 py-1.5">
                      {tech}
                    </li>
                  ))}
                </ul>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                  <span className="glyph">▶</span> {p.urlLabel}
                </a>
              </div>
            ),
          },
        ],
      };
    }
    case "contact":
      return {
        title: "CONTACT",
        pages: [
          {
            body: [`${profile.location} — ${profile.availability.toLowerCase()}.`],
            extras: (
              <ul className="space-y-3">
                {profile.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="font-pixel text-[10px] text-accent hover:text-foreground break-all">
                      <span className="glyph">▶</span> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          },
        ],
      };
  }
}

export function DialogBox({
  content,
  touch,
  onClose,
  ref,
}: {
  content: DialogContent;
  touch: boolean;
  onClose: () => void;
  ref?: Ref<DialogApi>;
}) {
  const { title, pages } = useMemo(() => buildPages(content, touch), [content, touch]);
  const [page, setPage] = useState(0);
  const [chars, setChars] = useState(0);
  const current = pages[page];
  const total = paragraphLength(current.body);
  const done = chars >= total;

  useEffect(() => {
    if (done) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => {
      setChars((c) => {
        const next = reduce ? total : Math.min(total, c + 3);
        if (Math.floor(next / 9) !== Math.floor(c / 9)) play("blip");
        return next;
      });
    }, 16);
    return () => clearInterval(id);
  }, [done, total, page]);

  const advance = () => {
    if (!done) setChars(total);
    else if (page < pages.length - 1) {
      setPage(page + 1);
      setChars(0);
      play("page");
    } else onClose();
  };

  useImperativeHandle(ref, () => ({ advance }));

  const isLast = page === pages.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="pop pixel-box absolute inset-x-3 bottom-4 md:bottom-auto md:top-24 mx-auto max-w-3xl max-h-[calc(100%-5.5rem)] md:max-h-[calc(100%-8rem)] flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-4">
        <h2 className="font-pixel text-[11px] sm:text-xs leading-relaxed uppercase text-accent">{title}</h2>
        <button onClick={onClose} aria-label="Close" className="font-pixel text-[10px] text-subtle hover:text-accent-2 cursor-pointer px-1">
          <span className="glyph">✕</span>
        </button>
      </div>
      <div className="overflow-y-auto px-5 pb-2 pt-2 space-y-3">
        {current.heading && <p className="font-pixel text-[9px] sm:text-[10px] leading-relaxed text-foreground">{current.heading}</p>}
        {current.sub && <p className="font-pixel text-[8px] text-subtle uppercase">{current.sub}</p>}
        <p className="font-terminal text-xl sm:text-2xl leading-snug text-muted">
          {done ? (
            <RichText paragraph={current.body} />
          ) : (
            <>
              {/* Full text for assistive tech; the typewriter copy is visual only */}
              <span className="sr-only">
                <RichText paragraph={current.body} />
              </span>
              <span aria-hidden>
                <RichText paragraph={current.body} limit={chars} />
              </span>
            </>
          )}
        </p>
        {done && current.extras && <div className="pop pt-1 pb-2">{current.extras}</div>}
      </div>
      <div className="flex items-center justify-between px-5 pb-3 pt-1">
        <span className="font-pixel text-[8px] text-subtle">
          {pages.length > 1 ? `${page + 1}/${pages.length}` : ""}
        </span>
        <button onClick={advance} className="font-pixel text-[9px] text-accent cursor-pointer uppercase">
          {done ? (isLast ? "Close" : "Next") : "Skip"} <span className="blink glyph">▼</span>
          <span className="text-subtle ml-2 hidden sm:inline">{touch ? "(B)" : "(E)"}</span>
        </button>
      </div>
    </div>
  );
}
