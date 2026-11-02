"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Trophy, Flag, Gauge, Shirt, ArrowUpRight, X } from "lucide-react";
import { DRIVERS, TEAMS, teamById, type Driver } from "@/lib/f1-data";
import { useNav } from "@/lib/f1-store";

type SortKey = "number" | "wins" | "podiums" | "poles" | "name";

export function DriversSection() {
  const { set } = useNav();
  const [team, setTeam] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");
  const [engine, setEngine] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("number");
  const [active, setActive] = useState<Driver | null>(null);

  const countries = useMemo(
    () => Array.from(new Set(DRIVERS.map((d) => d.country))).sort(),
    []
  );
  const engines = useMemo(
    () => Array.from(new Set(DRIVERS.map((d) => d.engine))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const list = DRIVERS.filter(
      (d) =>
        (team === "all" || d.team === team) &&
        (country === "all" || d.country === country) &&
        (engine === "all" || d.engine === engine)
    );
    return list.sort((a, b) => {
      switch (sort) {
        case "wins": return b.stats.wins - a.stats.wins;
        case "podiums": return b.stats.podiums - a.stats.podiums;
        case "poles": return b.stats.poles - a.stats.poles;
        case "name": return a.name.localeCompare(b.name);
        default: return a.number - b.number;
      }
    });
  }, [team, country, engine, sort]);

  const clearAll = () => {
    setTeam("all"); setCountry("all"); setEngine("all"); setSort("number");
  };
  const hasFilters = team !== "all" || country !== "all" || engine !== "all";

  return (
    <div className="grain">
      {/* Section header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>02 / DRIVERS & PERSONAL BRANDS</span>
            <span>{filtered.length} OF {DRIVERS.length} ON GRID</span>
          </div>
          <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                The Roster
              </div>
              <h1 className="font-display text-mega mt-3">
                TWENTY
                <br />
                <span className="text-muted-foreground">NUMBERS.</span>
                <br />
                TWENTY BRANDS.
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5 lg:pl-10">
              <p className="text-sm leading-relaxed text-foreground/80">
                Beyond the helmet, every driver is a business. This index maps career
                statistics against personal ventures &mdash; merchandise lines, fashion
                collaborations, esports rosters, and the sponsors backing each number.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-px border border-border bg-border">
                {[
                  { l: "Nationalities", v: new Set(DRIVERS.map((d) => d.countryCode)).size },
                  { l: "Champions", v: DRIVERS.filter((d) => d.stats.titles > 0).length },
                  { l: "Race Winners", v: DRIVERS.filter((d) => d.stats.wins > 0).length },
                ].map((s) => (
                  <div key={s.l} className="bg-background p-3">
                    <div className="font-mono text-2xl tabnum">{s.v}</div>
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

      {/* Filter bar */}
      <section className="sticky top-14 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 py-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filter
            </div>

            <Select label="Team" value={team} onChange={setTeam}
              options={[{ v: "all", l: "All teams" }, ...TEAMS.map((t) => ({ v: t.id, l: t.name }))]}
            />
            <Select label="Country" value={country} onChange={setCountry}
              options={[{ v: "all", l: "All nations" }, ...countries.map((c) => ({ v: c, l: c }))]}
            />
            <Select label="Engine" value={engine} onChange={setEngine}
              options={[{ v: "all", l: "All suppliers" }, ...engines.map((e) => ({ v: e, l: e }))]}
            />
            <Select label="Sort" value={sort} onChange={(v) => setSort(v as SortKey)}
              options={[
                { v: "number", l: "Car number" },
                { v: "wins", l: "Most wins" },
                { v: "podiums", l: "Most podiums" },
                { v: "poles", l: "Most poles" },
                { v: "name", l: "Name A–Z" },
              ]}
            />

            {hasFilters && (
              <button
                onClick={clearAll}
                className="ml-auto inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Driver grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8">
          {filtered.length === 0 ? (
            <div className="grid place-items-center py-24 text-center">
              <p className="font-display text-2xl text-muted-foreground">No drivers match.</p>
              <button onClick={clearAll} className="mt-3 text-xs uppercase tracking-[0.2em] text-foreground underline">
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((d, i) => {
                const t = teamById(d.team);
                return (
                  <motion.li
                    key={d.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <button
                      onClick={() => setActive(d)}
                      className="group relative flex h-full w-full flex-col bg-background text-left transition-colors hover:bg-card"
                    >
                      {/* accent + number */}
                      <div className="relative overflow-hidden border-b border-border">
                        <div className="flex items-stretch">
                          <div className="w-1.5" style={{ background: t.accent }} />
                          <div className="flex flex-1 items-center justify-between p-4">
                            <div>
                              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                                {t.short} · {d.role === "lead" ? "Lead" : "Support"}
                              </div>
                              <div className="mt-1 font-display text-xl leading-tight">{d.name}</div>
                              <div className="mt-0.5 text-[11px] text-muted-foreground">{d.country}</div>
                            </div>
                            <div
                              className="font-mono text-5xl leading-none tabnum text-muted-foreground transition-colors group-hover:text-foreground"
                            >
                              {String(d.number).padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                        {/* helmet brand mark */}
                        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-[0.07] transition-opacity group-hover:opacity-20"
                          style={{ background: t.accent }}
                        />
                      </div>

                      {/* stats */}
                      <div className="grid grid-cols-3 gap-px bg-border">
                        {[
                          { l: "Wins", v: d.stats.wins },
                          { l: "Podiums", v: d.stats.podiums },
                          { l: "Poles", v: d.stats.poles },
                        ].map((s) => (
                          <div key={s.l} className="bg-background p-3 text-center">
                            <div className="font-mono text-lg tabnum">{s.v}</div>
                            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                              {s.l}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ventures / sponsors preview */}
                      <div className="mt-auto flex items-center justify-between border-t border-border p-3">
                        <div className="flex items-center gap-2">
                          <Shirt className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            {d.brand.ventures.length} ventures
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground">
                          Dossier
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Next dossier
            </div>
            <h3 className="font-display text-2xl sm:text-3xl">The machines they pilot</h3>
          </div>
          <button
            onClick={() => set("cars")}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background"
          >
            Cars & Technical Specs
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Driver dossier modal */}
      {active && <DriverDossier driver={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="group flex items-center gap-2 border border-border px-3 py-1.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background text-xs uppercase tracking-[0.1em] text-foreground outline-none cursor-pointer"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.v} value={o.v} className="bg-background">
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}

function DriverDossier({ driver, onClose }: { driver: Driver; onClose: () => void }) {
  const t = teamById(driver.team);
  const s = driver.stats;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${driver.name} dossier`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl border border-border bg-background"
      >
        {/* accent strip */}
        <div className="h-1 w-full" style={{ background: t.accent }} />
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center border border-border text-muted-foreground hover:text-foreground"
          aria-label="Close dossier"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3">
          {/* Left: identity */}
          <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {t.short} · {driver.countryCode}
            </div>
            <div className="mt-2 font-display text-2xl leading-tight">{driver.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{driver.country}</div>
            <div
              className="mt-6 font-mono text-6xl leading-none tabnum"
              style={{ color: t.accent }}
            >
              {String(driver.number).padStart(2, "0")}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Permanent number
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Helmet / Branding
              </div>
              <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                {driver.brand.helmet}
              </p>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Motto
              </div>
              <p className="mt-1 text-sm italic text-foreground">
                &ldquo;{driver.brand.motto}&rdquo;
              </p>
            </div>
          </div>

          {/* Right: details */}
          <div className="sm:col-span-2">
            {/* stats */}
            <div className="grid grid-cols-5 gap-px border-b border-border bg-border">
              {[
                { l: "Wins", v: s.wins, icon: Trophy },
                { l: "Podiums", v: s.podiums, icon: Flag },
                { l: "Poles", v: s.poles, icon: Gauge },
                { l: "Titles", v: s.titles, icon: Trophy },
                { l: "Seasons", v: s.seasons, icon: Gauge },
              ].map((st) => (
                <div key={st.l} className="bg-background p-3 text-center">
                  <st.icon className="mx-auto h-3.5 w-3.5 text-muted-foreground" />
                  <div className="mt-2 font-mono text-lg tabnum">{st.v}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    {st.l}
                  </div>
                </div>
              ))}
            </div>

            {/* ventures */}
            <div className="border-b border-border p-6">
              <div className="mb-3 flex items-center gap-2">
                <Shirt className="h-4 w-4 text-foreground" />
                <h3 className="font-display text-lg">Business Ventures</h3>
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {driver.brand.ventures.map((v) => (
                  <li key={v} className="flex items-center gap-2 border-l-2 pl-3 text-sm"
                    style={{ borderColor: t.accent }}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* personal sponsors */}
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-foreground" />
                <h3 className="font-display text-lg">Personal Sponsors</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {driver.brand.sponsors.map((sp) => (
                  <span key={sp} className="border border-border px-3 py-1.5 text-xs">
                    {sp}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Engine supplier: <span className="text-foreground">{driver.engine}</span>
                &nbsp;· Seat: <span className="text-foreground">{t.name}</span> ({t.short}).
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
