"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { magneticSpring } from "@/lib/animations";

/** Props do wrapper magnético; o efeito é desativado em ponteiros coarse. */
export interface MagneticButtonProps { children: ReactNode; className?: string; }

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), magneticSpring);
  const y = useSpring(useMotionValue(0), magneticSpring);
  return <motion.div style={{ x, y }} className={className} onPointerMove={(event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) <= 100) { x.set(dx * 0.3); y.set(dy * 0.3); }
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
