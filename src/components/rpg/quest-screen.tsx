"use client";

import { jobSlug, timeline, type Job } from "@/data/content";
import { Browser } from "./browser";
import { buttonClass, Cursor, Heading } from "./ui";

const isActive = (job: Job) => job.endDate === "Present";
const years = (job: Job) => {
  const from = job.date.slice(-4);
  const to = job.endDate === "Present" ? "now" : job.endDate.slice(-4);
  return from === to ? from : `${from}–${to}`;
};
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export function QuestScreen(props: {
  selected: number;
  detailOpen: boolean;
  isMobile: boolean;
  onSelect: (slug: string, via: "focus" | "click") => void;
  onBack: () => void;
  onExitLeft: () => void;
}) {
  return (
    <Browser
      {...props}
      items={timeline}
      slugOf={jobSlug}
      listLabel="Quests"
      listClass="space-y-1"
      header={<Heading>{`Quest log · ${timeline.length} quests`}</Heading>}
      itemClass={(sel) =>
        `flex items-start gap-2 px-2 py-2.5 border-2 ${sel ? "border-accent bg-accent/10" : "border-transparent hover:border-subtle/40"}`
      }
      renderItem={(job, sel) => (
        <>
          <Cursor show={sel} />
          <span className={`glyph flex-none w-5 text-center ${isActive(job) ? "text-accent blink" : "text-accent-3"}`} aria-label={isActive(job) ? "In progress" : "Complete"}>
            {isActive(job) ? "!" : "✓"}
          </span>
          <span className="flex-1 min-w-0">
            <span className={`block font-pixel text-[9px] leading-relaxed ${sel ? "text-accent" : "text-foreground group-hover:text-accent"}`}>
              {job.role}
            </span>
            <span className="block font-terminal text-lg text-subtle leading-tight mt-0.5">
              {job.company} · {years(job)}
            </span>
          </span>
        </>
      )}
      renderDetail={(job) => (
        <div className="space-y-5">
          <div>
            <p className="font-pixel text-[8px] uppercase text-subtle mb-2">Quest</p>
            <h2 className="font-pixel text-xs sm:text-sm leading-relaxed text-accent">{job.role}</h2>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-baseline">
            <dt className="font-pixel text-[8px] uppercase text-subtle">Giver</dt>
            <dd className="font-terminal text-xl text-foreground leading-tight">{job.company}</dd>
            <dt className="font-pixel text-[8px] uppercase text-subtle">Dates</dt>
            <dd className="font-terminal text-xl text-foreground leading-tight">
              {job.date} – {job.endDate}
            </dd>
            <dt className="font-pixel text-[8px] uppercase text-subtle">Status</dt>
            <dd className={`font-pixel text-[9px] uppercase ${isActive(job) ? "text-accent" : "text-accent-3"}`}>
              {isActive(job) ? "In progress" : "Complete"}
            </dd>
          </dl>
          {job.description && <p className="font-terminal text-xl sm:text-2xl leading-snug text-muted">{job.description}</p>}
          <a href={job.url} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            <span className="glyph">▶</span> {host(job.url)}
          </a>
        </div>
      )}
    />
  );
}
