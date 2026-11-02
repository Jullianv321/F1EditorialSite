"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Gauge, Fuel, Zap, Cpu } from "lucide-react";
import {
  TEAMS,
  DRIVERS,
  STANDINGS,
  SEASON,
  SEASON_STATS,
  teamById,
} from "@/lib/f1-data";
import { useNav } from "@/lib/f1-store";
import { SeasonCountdown } from "@/components/f1/season-countdown";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HomeSection() {
  const { set } = useNav();
  const spotlight = teamById("mclaren");
  const spotlightDriver = DRIVERS.find((d) => d.id === "norris")!;

  return (
    <div className="grain">
      {/* ─── HERO ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          {/* meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>VOL.01 · ISSUE 26 · EDITORIAL DOSSIER</span>
            <span className="hidden sm:inline">NEW POWER-UNIT ERA</span>
            <span>F1 / 2026 / GRID OVERVIEW</span>
          </div>

          {/* hero grid */}
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
            {/* Left: headline */}
            <div className="relative flex flex-col justify-between border-border py-10 lg:col-span-8 lg:border-r lg:py-16 lg:pr-10">
              <motion.div
                initial="hidden"
                animate="show"
                variants={reveal}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="h-px w-8 bg-foreground" />
                <span>The 2026 Grid, Dissected</span>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="show"
                custom={1}
                variants={reveal}
                className="font-display text-mega mt-6"
              >
                SPEED
                <br />
                <span className="text-muted-foreground">IS A</span> LANGUAGE
                <br />
                <span className="relative inline-block">
                  WE TRANSLATE
                  <span
                    className="absolute -right-3 top-2 h-[0.7em] w-2 sm:-right-5"
                    style={{ background: spotlight.accent }}
                  />
                </span>
                .
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                custom={3}
                variants={reveal}
                className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base"
              >
                An editorial dossier on the twenty drivers, ten constructors, and the brand
                ecosystem defining Formula 1&rsquo;s first fully-sustainable, hybrid-dominant
                season. Built for fans, engineers, and brand analysts alike.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                custom={4}
                variants={reveal}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={() => set("drivers")}
                  className="group inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/85"
                >
                  Enter the Grid
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => set("cars")}
                  className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground"
                >
                  Technical Brief
                </button>
              </motion.div>
            </div>

            {/* Right: spotlight card */}
            <div className="border-t border-border py-10 lg:col-span-4 lg:border-t-0 lg:py-16 lg:pl-10">
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Spotlight · R01</span>
                <span>Championship Leader</span>
              </div>

              <div className="relative border border-border bg-card">
                {/* accent bar */}
                <div className="h-1 w-full" style={{ background: spotlight.accent }} />
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {spotlight.short} · {spotlight.powerUnit}
                      </div>
                      <div className="mt-1 font-display text-2xl">{spotlight.name}</div>
                    </div>
                    <div
                      className="font-mono text-5xl leading-none tabnum"
                      style={{ color: spotlight.accent }}
                    >
                      {spotlightDriver.number}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4">
                    {[
                      { l: "Wins", v: spotlightDriver.stats.wins },
                      { l: "Podiums", v: spotlightDriver.stats.podiums },
                      { l: "Poles", v: spotlightDriver.stats.poles },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="font-mono text-xl tabnum text-foreground">{s.v}</div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs italic leading-relaxed text-muted-foreground">
                    &ldquo;{spotlightDriver.brand.motto}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Chassis {spotlight.chassis}
                    </span>
                    <button
                      onClick={() => set("cars")}
                      className="link-reveal inline-flex items-center gap-1 text-xs text-foreground"
                    >
                      Spec sheet
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY METRICS / COUNTDOWN ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Season countdown */}
            <div className="border-border py-10 lg:col-span-7 lg:border-r lg:py-12 lg:pr-10">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl">
                  Lights out in
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {SEASON[0].name} · {SEASON[0].circuit}
                </span>
              </div>
              <SeasonCountdown />
              <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
                Round 01 opens the 2026 championship at Albert Park. New regulations halve the
                fuel carbon footprint and elevate electrical deployment to ~350 kW.
              </p>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-px border-t border-border bg-border lg:col-span-5 lg:border-l lg:border-t-0">
              {[
                { k: SEASON_STATS.teams, l: "Constructors", s: "Full works grid" },
                { k: SEASON_STATS.drivers, l: "Drivers", s: "20 permanent seats" },
                { k: SEASON_STATS.races, l: "Rounds", s: `${SEASON_STATS.sprintRaces} sprints` },
                { k: "≈50%", l: "Electric Split", s: "PU energy share" },
              ].map((m) => (
                <div key={m.l} className="bg-background p-5">
                  <div className="font-display text-4xl sm:text-5xl">{m.k}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {m.l}
                  </div>
                  <div className="mt-1 text-[11px] text-foreground/60">{m.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK NAV GRID: TEAMS ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-border py-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                02 · Constructors
              </div>
              <h2 className="font-display text-3xl sm:text-4xl">The Ten Teams</h2>
            </div>
            <button
              onClick={() => set("cars")}
              className="link-reveal inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              All specs
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <ul className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
            {TEAMS.map((t, i) => (
              <motion.li
                key={t.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={reveal}
              >
                <button
                  onClick={() => set("cars")}
                  className="group relative flex h-full w-full flex-col justify-between bg-background p-4 text-left transition-colors hover:bg-card"
                >
                  <div className="h-1 w-full transition-transform group-hover:scale-x-110" style={{ background: t.accent }} />
                  <div className="mt-3 flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                        {t.short}
                      </div>
                      <div className="mt-1 font-display text-lg leading-tight">{t.name}</div>
                    </div>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: t.accent }}
                    >
                      {String(t.titles).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4 text-[11px] text-muted-foreground">
                    {t.powerUnit} PU
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── STANDINGS TEASER ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-border py-10 lg:col-span-4 lg:border-r lg:pr-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                03 · Standings
              </div>
              <h2 className="font-display text-3xl sm:text-4xl">Title Race</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The projected pecking order after the opening flyaways. McLaren&rsquo;s
                Norris holds the initiative; Verstappen and Leclerc close within a race.
              </p>
              <button
                onClick={() => set("drivers")}
                className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] hover:border-foreground"
              >
                Full driver index
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="lg:col-span-8 lg:pl-10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <th className="py-3 text-left font-normal">Pos</th>
                    <th className="py-3 text-left font-normal">Driver</th>
                    <th className="hidden py-3 text-left font-normal sm:table-cell">Team</th>
                    <th className="py-3 text-right font-normal">Pts</th>
                    <th className="py-3 text-right font-normal">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {STANDINGS.map((row) => {
                    const team = teamById(row.team);
                    const gap = row.pos === 1 ? 0 : STANDINGS[0].pts - row.pts;
                    return (
                      <tr
                        key={row.pos}
                        className="border-b border-border/60 transition-colors hover:bg-card/60"
                      >
                        <td className="py-3 font-mono text-xs tabnum text-muted-foreground">
                          {String(row.pos).padStart(2, "0")}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-1"
                              style={{ background: team.accent }}
                            />
                            <span className="font-medium">{row.driver}</span>
                          </div>
                        </td>
                        <td className="hidden py-3 text-muted-foreground sm:table-cell">
                          {team.name}
                        </td>
                        <td className="py-3 text-right font-mono tabnum">{row.pts}</td>
                        <td className="py-3 text-right font-mono tabnum text-muted-foreground">
                          {gap === 0 ? "—" : `-${gap}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REGULATION PILLARS ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="border-b border-border py-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              04 · Regulation Era
            </div>
            <h2 className="font-display text-3xl sm:text-4xl">What changes in 2026</h2>
          </div>
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Fuel,
                t: "Sustainable Fuel",
                d: "100% advanced sustainable fuel — net-zero carbon lifecycle across all power units.",
              },
              {
                icon: Zap,
                t: "Electric Dominance",
                d: "Electrical power nearly triples to ~350 kW, approaching 50% of total PU output.",
              },
              {
                icon: Gauge,
                t: "Active Aero",
                d: "Moveable front & rear wings toggle between high-downforce and low-drag Z-modes.",
              },
              {
                icon: Cpu,
                t: "Lighter, Nimbler",
                d: "Minimum weight cut ~30 kg, shorter wheelbase & narrower track for closer racing.",
              },
            ].map((p) => (
              <div key={p.t} className="bg-background p-6">
                <p.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <div className="mt-4 font-display text-lg">{p.t}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
