"use client";

import { useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 8 }, (_, index) => index);

export function ParticleField() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">{particles.map((item) => <i key={item} className="particle absolute h-1 w-1 rounded-full bg-[#d4a853]/45" style={{ left: `${10 + item * 11}%`, top: `${16 + (item % 4) * 18}%`, animationDelay: `${item * 0.7}s` }} />)}</div>;
}
