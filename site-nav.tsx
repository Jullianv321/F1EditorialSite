"use client";

import { useEffect, useState } from "react";
import { useNav, type SectionId } from "@/lib/f1-store";
import { SEASON_STATS, STANDINGS } from "@/lib/f1-data";
import { Menu, X } from "lucide-react";

const ITEMS: { id: SectionId; label: string; idx: string }[] = [
  { id: "home", label: "Index", idx: "01" },
  { id: "drivers", label: "Drivers", idx: "02" },
  { id: "cars", label: "Cars", idx: "03" },
  { id: "sponsors", label: "Brands", idx: "04" },
];

export function SiteNav() {
  const { active, set } = useNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leader = STANDINGS[0];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors ${
        scrolled ? "bg-background/95" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => set("home")}
          className="group flex items-center gap-2.5"
          aria-label="Back to index"
        >
          <span className="grid h-6 w-6 place-items-center bg-foreground text-background">
            <span className="text-[10px] font-bold leading-none">A</span>
          </span>
          <span className="font-display text-base tracking-tight">
            APEX<span className="text-muted-foreground">{"//"}</span>26
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => set(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[10px] opacity-50">{item.idx}</span>
                <span>{item.label}</span>
                <span
                  className={`ml-0.5 h-1 w-1 transition-all ${
                    isActive ? "bg-foreground opacity-100" : "bg-transparent opacity-0 group-hover:opacity-40"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: live leader + season tag (desktop) */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <span className="h-1.5 w-1.5 animate-pulse bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Leader P01
            </span>
            <span className="text-xs font-medium">{leader.driver}</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {leader.pts} PTS
            </span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center border border-border text-foreground md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="border-b border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-4 py-2" aria-label="Mobile">
            {ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    set(item.id);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between border-b border-border/60 py-3 text-sm uppercase tracking-[0.18em] last:border-0 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] opacity-50">{item.idx}</span>
                    {item.label}
                  </span>
                  {isActive && <span className="h-1.5 w-1.5 bg-foreground" />}
                </button>
              );
            })}
            <div className="py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {SEASON_STATS.season} · {SEASON_STATS.regulations}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
