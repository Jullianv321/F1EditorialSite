"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Cpu, Zap, Fuel, Weight, Wind } from "lucide-react";
import { CAR_SPECS, TEAMS, specByTeam, teamById, type TeamId } from "@/lib/f1-data";
import { useNav } from "@/lib/f1-store";

type Metric = "totalPower" | "weight" | "topSpeed" | "electricPower";

const METRICS: { key: Metric; label: string; unit: string; icon: React.ElementType }[] = [
  { key: "totalPower", label: "Total Power", unit: "hp", icon: Zap },
  { key: "weight", label: "Weight", unit: "kg", icon: Weight },
  { key: "topSpeed", label: "Top Speed", unit: "km/h", icon: Gauge },
  { key: "electricPower", label: "E-Power", unit: "kW", icon: Cpu },
];

function bestValue(m: Metric, v: number) {
  // higher is better for power/speed; lower is better for weight
  if (m === "weight") return v;
  return -v;
}

export function CarsSection() {
  const { set } = useNav();
  const [metric, setMetric] = useState<Metric>("totalPower");
  const [active, setActive] = useState<TeamId>("mclaren");

  const sorted = useMemo(
    () => [...CAR_SPECS].sort((a, b) => bestValue(metric, a[metric]) - bestValue(metric, b[metric])),
    [metric]
  );
  const max = useMemo(() => Math.max(...CAR_SPECS.map((c) => c[metric])), [metric]);
  const min = useMemo(() => Math.min(...CAR_SPECS.map((c) => c[metric])), [metric]);

  const activeTeam = teamById(active);
  const activeSpec = specByTeam(active);

  return (
    <div className="grain">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>03 / CARS & TECHNICAL SPECS</span>
            <span>2026 POWER-UNIT REGULATIONS</span>
          </div>
          <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                The Machinery
              </div>
              <h1 className="font-display text-mega mt-3">
                <span className="text-muted-foreground">1000</span> HORSE
                <br />
                POWER<span style={{ color: activeTeam.accent }}>.</span>
                <br />
                ZERO CARBON.
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5 lg:pl-10">
              <p className="text-sm leading-relaxed text-foreground/80">
                Every 2026 chassis wraps a ~1000 hp hybrid power unit running 100% sustainable
                fuel. Electrical energy nearly triples, active aerodynamics reshape the car mid-corner,
                and minimum weight drops by ~30 kg. The spec sheet below is the new normal.
              </p>
              <div className="mt-5 grid grid-cols-4 gap-px border border-border bg-border">
                {[
                  { l: "Power", v: "≈1.0k", s: "hp" },
                  { l: "E-Power", v: "350", s: "kW" },
                  { l: "Weight", v: "768", s: "kg" },
                  { l: "Battery", v: "4.0", s: "kWh" },
                ].map((m) => (
                  <div key={m.l} className="bg-background p-3 text-center">
                    <div className="font-mono text-lg tabnum">{m.v}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {m.l} / {m.s}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constructor selector */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scroll-thin">
            {TEAMS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="h-2 w-2" style={{ background: t.accent }} />
                  {t.short}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active constructor detail */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
            {/* Livery preview */}
            <div className="relative bg-background p-6 lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Livery · {activeTeam.short}
              </div>
              <div className="mt-3 font-display text-3xl sm:text-4xl">{activeTeam.fullName}</div>

              {/* Brutalist livery block */}
              <div className="relative mt-6 aspect-[16/9] border border-border bg-card">
                <div className="absolute inset-0 flex">
                  <div className="h-full w-1/3" style={{ background: activeTeam.accent }} />
                  <div className="h-full flex-1 bg-background" />
                  <div className="h-full w-1/6" style={{ background: activeTeam.accentSoft }} />
                </div>
                {/* racing number */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-7xl text-background mix-blend-difference sm:text-8xl">
                    {activeTeam.short}
                  </span>
                </div>
                {/* grid overlay */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/3 top-0 h-full w-px bg-background/30" />
                  <div className="absolute left-2/3 top-0 h-full w-px bg-background/20" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-background/20" />
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {activeTeam.livery}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px border border-border bg-border">
                {[
                  { l: "Base", v: activeTeam.base },
                  { l: "Team Principal", v: activeTeam.principal },
                  { l: "Founded", v: String(activeTeam.founded) },
                  { l: "Constructor Titles", v: String(activeTeam.titles) },
                ].map((r) => (
                  <div key={r.l} className="bg-background p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {r.l}
                    </div>
                    <div className="mt-1 text-sm">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec sheet */}
            <div className="bg-background p-6 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Technical Specification
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: activeTeam.accent }}>
                  {activeTeam.chassis}
                </div>
              </div>

              <dl className="mt-2">
                {[
                  { l: "Chassis", v: activeSpec.chassis, icon: Cpu },
                  { l: "Power Unit", v: activeSpec.powerUnit, icon: Zap },
                  { l: "Configuration", v: activeSpec.puConfig, icon: Gauge },
                  { l: "Combustion Output", v: `${activeSpec.combustionPower} hp`, icon: Zap },
                  { l: "Electric Output", v: `${activeSpec.electricPower} kW`, icon: Cpu },
                  { l: "Total Output", v: `${activeSpec.totalPower} hp`, icon: Zap },
                  { l: "Minimum Weight", v: `${activeSpec.weight} kg`, icon: Weight },
                  { l: "Top Speed", v: `${activeSpec.topSpeed} km/h`, icon: Gauge },
                  { l: "Fuel", v: activeSpec.fuel, icon: Fuel },
                  { l: "Aerodynamics", v: activeSpec.aero, icon: Wind },
                  { l: "Gearbox", v: activeSpec.gearbox, icon: Cpu },
                  { l: "ERS Battery", v: `${activeSpec.ersBattery} kWh`, icon: Zap },
                ].map((row, i) => (
                  <motion.div
                    key={row.l}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="flex items-center justify-between border-b border-border/60 py-2.5"
                  >
                    <dt className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <row.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      <span className="font-mono uppercase tracking-[0.15em]">{row.l}</span>
                    </dt>
                    <dd className="text-right font-mono text-sm tabnum text-foreground">{row.v}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border py-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Comparative Analysis
              </div>
              <h2 className="font-display text-2xl sm:text-3xl">Grid Spec Matrix</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Rank by
              </span>
              {METRICS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMetric(m.key)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                    metric === m.key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* bar chart */}
          <ul className="py-6">
            {sorted.map((c, i) => {
              const team = teamById(c.team);
              const v = c[metric];
              const pct = metric === "weight"
                ? ((max - v) / (max - min || 1)) * 100 // lower weight = better = fuller bar
                : (v / max) * 100;
              return (
                <li key={c.team}>
                  <button
                    onClick={() => setActive(c.team)}
                    className="group grid w-full grid-cols-12 items-center gap-3 border-b border-border/60 py-2.5 text-left"
                  >
                    <span className="col-span-1 font-mono text-xs tabnum text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-3 flex items-center gap-2 sm:col-span-2">
                      <span className="h-3 w-1" style={{ background: team.accent }} />
                      <span className="text-xs font-medium sm:text-sm">{team.short}</span>
                    </span>
                    <span className="col-span-6 col-start-4 sm:col-span-7 sm:col-start-4">
                      <span className="block h-4 w-full bg-card">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.max(4, pct)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="block h-full"
                          style={{ background: team.accent }}
                        />
                      </span>
                    </span>
                    <span className="col-span-3 col-start-10 text-right font-mono text-xs tabnum sm:col-span-2 sm:col-start-11">
                      {v} <span className="text-muted-foreground">{METRICS.find((m) => m.key === metric)?.unit}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* full table */}
          <div className="overflow-x-auto scroll-thin pb-8">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="py-3 text-left font-normal">Constructor</th>
                  <th className="py-3 text-left font-normal">Chassis</th>
                  <th className="py-3 text-left font-normal">Power Unit</th>
                  <th className="py-3 text-right font-normal">Power</th>
                  <th className="py-3 text-right font-normal">E-Power</th>
                  <th className="py-3 text-right font-normal">Weight</th>
                  <th className="py-3 text-right font-normal">Top</th>
                  <th className="py-3 text-right font-normal">ERS</th>
                </tr>
              </thead>
              <tbody>
                {CAR_SPECS.map((c) => {
                  const team = teamById(c.team);
                  return (
                    <tr
                      key={c.team}
                      onClick={() => setActive(c.team)}
                      className="cursor-pointer border-b border-border/60 transition-colors hover:bg-card/60"
                    >
                      <td className="py-2.5">
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-1" style={{ background: team.accent }} />
                          <span className="font-medium">{team.name}</span>
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-xs text-muted-foreground">{c.chassis}</td>
                      <td className="py-2.5 font-mono text-xs text-muted-foreground">{c.powerUnit}</td>
                      <td className="py-2.5 text-right font-mono tabnum">{c.totalPower}</td>
                      <td className="py-2.5 text-right font-mono tabnum">{c.electricPower}</td>
                      <td className="py-2.5 text-right font-mono tabnum">{c.weight}</td>
                      <td className="py-2.5 text-right font-mono tabnum">{c.topSpeed}</td>
                      <td className="py-2.5 text-right font-mono tabnum">{c.ersBattery}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Final dossier
            </div>
            <h3 className="font-display text-2xl sm:text-3xl">Who funds the grid</h3>
          </div>
          <button
            onClick={() => set("sponsors")}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background"
          >
            Brand & Sponsor Matrix
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
