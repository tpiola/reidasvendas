"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

/** Props do reveal de seção com execução única. */
export interface ScrollRevealProps { children: ReactNode; className?: string; delay?: number; }

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }} transition={{ delay }}>{children}</motion.div>;
}
