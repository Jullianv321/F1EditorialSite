"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNav, initNavFromHash } from "@/lib/f1-store";
import { SiteNav } from "@/components/f1/site-nav";
import { SiteFooter } from "@/components/f1/site-footer";
import { HomeSection } from "@/components/f1/sections/home-section";
import { DriversSection } from "@/components/f1/sections/drivers-section";
import { CarsSection } from "@/components/f1/sections/cars-section";
import { SponsorsSection } from "@/components/f1/sections/sponsors-section";

export default function Home() {
  const { active, set } = useNav();

  // initialize from hash on mount + listen to hashchange (back/forward)
  useEffect(() => {
    set(initNavFromHash());
    const onHash = () => set(initNavFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [set]);

  // scroll to top on section change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [active]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {active === "home" && <HomeSection />}
            {active === "drivers" && <DriversSection />}
            {active === "cars" && <CarsSection />}
            {active === "sponsors" && <SponsorsSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}
