"use client";

import dynamic from "next/dynamic";

const Problem = dynamic(() => import("./Problem"), { ssr: false });
const Services = dynamic(() => import("./Services"), { ssr: false });
const Process = dynamic(() => import("./Process"), { ssr: false });
const Comparison = dynamic(() => import("./Comparison"), { ssr: false });
const Portfolio = dynamic(() => import("./Portfolio"), { ssr: false });
const Pricing = dynamic(() => import("./Pricing"), { ssr: false });
const Guarantee = dynamic(() => import("./Guarantee"), { ssr: false });
const FAQ = dynamic(() => import("./FAQ"), { ssr: false });
const FinalCTA = dynamic(() => import("./FinalCTA"), { ssr: false });

export function LazySections() {
  return <><Problem/><Services/><Process/><Comparison/><Portfolio/><Pricing/><Guarantee/><FAQ/><FinalCTA/></>;
}
