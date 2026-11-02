"use client";

import { useEffect, useState } from "react";
import { SEASON } from "@/lib/f1-data";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    d: Math.floor(d / 86400000),
    h: Math.floor((d / 3600000) % 24),
    m: Math.floor((d / 60000) % 60),
    s: Math.floor((d / 1000) % 60),
    done: d === 0,
  };
}

export function SeasonCountdown({ compact = false }: { compact?: boolean }) {
  const target = new Date(SEASON[0].date + "T15:00:00Z").getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { v: number; l: string }[] = [
    { v: t.d, l: "DAYS" },
    { v: t.h, l: "HRS" },
    { v: t.m, l: "MIN" },
    { v: t.s, l: "SEC" },
  ];

  if (compact) {
    return (
      <span className="font-mono text-xs tabnum text-foreground">
        {String(t.d).padStart(2, "0")}:{String(t.h).padStart(2, "0")}:
        {String(t.m).padStart(2, "0")}:{String(t.s).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.l}
          className="border border-border bg-card/60 p-3 text-center sm:p-5"
        >
          <div className="font-mono text-3xl tabnum leading-none text-foreground sm:text-5xl">
            {String(u.v).padStart(2, "0")}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {u.l}
          </div>
        </div>
      ))}
    </div>
  );
}
