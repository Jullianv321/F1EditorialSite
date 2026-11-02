import { create } from "zustand";

export type SectionId = "home" | "drivers" | "cars" | "sponsors";

interface NavState {
  active: SectionId;
  set: (s: SectionId) => void;
}

export const useNav = create<NavState>((set) => ({
  active: "home",
  set: (s) => {
    set({ active: s });
    if (typeof window !== "undefined") {
      const next = new URL(window.location.href);
      next.hash = s === "home" ? "" : s;
      window.history.replaceState({}, "", next.toString());
    }
  },
}));

export function initNavFromHash(): SectionId {
  if (typeof window === "undefined") return "home";
  const h = window.location.hash.replace("#", "");
  if (h === "drivers" || h === "cars" || h === "sponsors") return h;
  return "home";
}
