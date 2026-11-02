"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Building2, Tag } from "lucide-react";
import {
  SPONSORS,
  TEAMS,
  type Sponsor,
  type SponsorSector,
  teamById,
} from "@/lib/f1-data";
import { useNav } from "@/lib/f1-store";

const SECTORS: (SponsorSector | "All")[] = [
  "All",
  "Tech",
  "Crypto",
  "Luxury Watches",
  "Automotive",
  "Apparel",
  "Energy",
  "Financial",
];

const TIER_RANK: Record<Sponsor["tier"], number> = {
  Title: 1,
  Principal: 2,
  Technical: 3,
  Official: 4,
  Regional: 5,
};

export function SponsorsSection() {
  const { set } = useNav();
  const [sector, setSector] = useState<(typeof SECTORS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SPONSORS.filter((s) => {
      const sectorOk = sector === "All" || s.sector === sector;
      const qOk =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.note.toLowerCase().includes(q) ||
        s.teams.some((t) => teamById(t).name.toLowerCase().includes(q));
      return sectorOk && qOk;
    }).sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.name.localeCompare(b.name));
  }, [sector, query]);

  // sector distribution
  const sectorCounts = useMemo(() => {
    const map: Record<string, number> = {};
    SPONSORS.forEach((s) => {
      map[s.sector] = (map[s.sector] || 0) + 1;
    });
    return SECTORS.filter((s) => s !== "All").map((s) => ({
      sector: s as SponsorSector,
      count: map[s as SponsorSector] || 0,
    }));
  }, []);

  return (
    <div className="grain">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>04 / BRAND & SPONSOR MATRIX</span>
            <span>{SPONSORS.length} PARTNERS MAPPED</span>
          </div>
          <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                The Ecosystem
              </div>
              <h1 className="font-display text-mega mt-3">
                WHO
                <br />
                <span className="text-muted-foreground">PAYS FOR</span>
                <br />
                THE GRID.
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5 lg:pl-10">
              <p className="text-sm leading-relaxed text-foreground/80">
                Behind every constructor is a tiered stack of partners &mdash; title backers,
                technical collaborators, and regional affiliates. This matrix maps the commercial
                web of the 2026 season by sector, tier, and team.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-px border border-border bg-border">
                {[
                  { l: "Title Sponsors", v: SPONSORS.filter((s) => s.tier === "Title").length },
                  { l: "Sectors", v: sectorCounts.length },
                  { l: "Teams Covered", v: TEAMS.length },
                ].map((s) => (
                  <div key={s.l} className="bg-background p-3 text-center">
                    <div className="font-mono text-lg tabnum">{s.v}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker of all partners */}
      <section className="border-b border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
            {[...SPONSORS, ...SPONSORS].map((s, i) => (
              <span
                key={`${s.id}-${i}`}
                className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                <span className="h-1 w-1 bg-foreground/40" />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-14 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* search */}
          <div className="flex items-center gap-3 border-b border-border py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search partner or team…"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search sponsors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          {/* sector chips */}
          <div className="flex items-center gap-1 overflow-x-auto py-3 scroll-thin">
            <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Sector
            </span>
            {SECTORS.map((s) => {
              const count = s === "All" ? SPONSORS.length : sectorCounts.find((x) => x.sector === s)?.count || 0;
              const isActive = sector === s;
              return (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`flex shrink-0 items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                  <span className={isActive ? "opacity-60" : "text-muted-foreground/60"}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsor grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8">
          {filtered.length === 0 ? (
            <div className="grid place-items-center py-24 text-center">
              <p className="font-display text-2xl text-muted-foreground">No partners found.</p>
              <button
                onClick={() => { setQuery(""); setSector("All"); }}
                className="mt-3 text-xs uppercase tracking-[0.2em] text-foreground underline"
              >
                Reset
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((s, i) => (
                <SponsorCard key={s.id} sponsor={s} index={i} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Team-partner matrix */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="border-b border-border py-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Cross-Reference
            </div>
            <h2 className="font-display text-2xl sm:text-3xl">Team × Partner Matrix</h2>
          </div>
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="py-3 text-left font-normal">Team</th>
                  {SECTORS.filter((s) => s !== "All").map((s) => (
                    <th key={s} className="py-3 text-left font-normal">
                      <span className="block max-w-[8rem] truncate">{s}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEAMS.map((t) => {
                  const teamSponsors = SPONSORS.filter((s) => s.teams.includes(t.id));
                  return (
                    <tr key={t.id} className="border-b border-border/60">
                      <td className="py-3">
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-1" style={{ background: t.accent }} />
                          <span className="font-medium">{t.name}</span>
                        </span>
                      </td>
                      {SECTORS.filter((s) => s !== "All").map((s) => {
                        const matches = teamSponsors.filter((sp) => sp.sector === s);
                        return (
                          <td key={s} className="py-3 pr-4 align-top">
                            {matches.length === 0 ? (
                              <span className="font-mono text-xs text-muted-foreground/40">—</span>
                            ) : (
                              <ul className="space-y-1">
                                {matches.map((m) => (
                                  <li key={m.id} className="flex items-center gap-1.5 text-xs">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                                      {m.tier[0]}
                                    </span>
                                    {m.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Legend: <span className="text-foreground">T</span> Title ·{" "}
            <span className="text-foreground">P</span> Principal ·{" "}
            <span className="text-foreground">T</span> Technical ·{" "}
            <span className="text-foreground">O</span> Official
          </p>
        </div>
      </section>

      {/* CTA back to top */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              End of dossier
            </div>
            <h3 className="font-display text-2xl sm:text-3xl">Return to the index</h3>
          </div>
          <button
            onClick={() => set("home")}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background"
          >
            Back to Index
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function SponsorCard({ sponsor, index }: { sponsor: Sponsor; index: number }) {
  const teams = sponsor.teams.map(teamById);
  const primary = teams[0];
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="group flex h-full flex-col bg-background transition-colors hover:bg-card"
    >
      {/* tier + sector bar */}
      <div className="flex items-stretch border-b border-border">
        <div className="w-1.5" style={{ background: primary.accent }} />
        <div className="flex flex-1 items-center justify-between px-4 py-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            {sponsor.sector}
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.22em] ${
              sponsor.tier === "Title"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {sponsor.tier}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-display text-xl leading-tight">{sponsor.name}</div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <Building2 className="h-3 w-3" /> {sponsor.origin} · est. {sponsor.founded}
            </div>
          </div>
          <Tag className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        </div>

        <p className="mt-3 text-xs leading-relaxed text-foreground/70">{sponsor.note}</p>

        {/* teams */}
        <div className="mt-auto pt-4">
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Backs
          </div>
          <div className="flex flex-wrap gap-1.5">
            {teams.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[11px]"
              >
                <span className="h-2 w-2" style={{ background: t.accent }} />
                {t.short}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
