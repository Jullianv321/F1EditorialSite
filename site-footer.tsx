"use client";

import { useNav, type SectionId } from "@/lib/f1-store";
import { SEASON_STATS } from "@/lib/f1-data";

const COLS: { id: SectionId; label: string; idx: string }[] = [
  { id: "home", label: "Index", idx: "01" },
  { id: "drivers", label: "Drivers", idx: "02" },
  { id: "cars", label: "Cars & Specs", idx: "03" },
  { id: "sponsors", label: "Brand Matrix", idx: "04" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "RSS Feed", href: "#" },
];

export function SiteFooter() {
  const { set } = useNav();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* Ticker line */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-6 lg:px-8">
          <span>{SEASON_STATS.season} World Championship</span>
          <span className="hidden sm:inline">·</span>
          <span>{SEASON_STATS.drivers} drivers / {SEASON_STATS.teams} constructors</span>
          <span className="hidden sm:inline">·</span>
          <span>{SEASON_STATS.races} rounds · {SEASON_STATS.fuel}</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">PU split {SEASON_STATS.electricSplit}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center bg-foreground text-background">
              <span className="text-[10px] font-bold leading-none">A</span>
            </span>
            <span className="font-display text-base">
              APEX<span className="text-muted-foreground">{"//"}</span>26
            </span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            An editorial dossier on the 2026 Formula 1 grid — drivers, constructors, and the
            sponsor matrix of the new power-unit era. Independent. Non-official.
          </p>
        </div>

        {/* Section index */}
        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Sections
          </h3>
          <ul className="space-y-2">
            {COLS.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => set(c.id)}
                  className="link-reveal flex items-center gap-3 text-sm text-foreground/90 hover:text-foreground"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{c.idx}</span>
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Channels
          </h3>
          <ul className="space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-reveal text-sm text-foreground/90 hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colophon */}
        <div>
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Colophon
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>Type: Geist Sans / Geist Mono</li>
            <li>Grid: 12-col brutalist hairline</li>
            <li>Built with Next.js 16 + Tailwind 4</li>
            <li>Accent palette: per-constructor</li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-2 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span>© {year} APEX{"//"}26 Editorial — Concept project.</span>
          <span>Not affiliated with Formula 1, the FIA, or any constructor.</span>
          <span>v1.0 · EDITION ZERO</span>
        </div>
      </div>
    </footer>
  );
}
