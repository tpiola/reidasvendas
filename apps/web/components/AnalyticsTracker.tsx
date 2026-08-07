"use client";

import { useEffect } from "react";
import { track } from "@/lib/utils";

export function AnalyticsTracker() {
  useEffect(() => {
    let sent50 = false; let sent100 = false;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (!sent50 && progress >= .5) { sent50 = true; track("Scroll 50%"); }
      if (!sent100 && progress >= .98) { sent100 = true; track("Scroll 100%"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
