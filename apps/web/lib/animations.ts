import type { Variants } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;
export const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
export const fadeIn: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, ease } } };
export const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } } };
export const clipReveal: Variants = { hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.75, ease } } };
export const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
export const magneticSpring = { type: "spring" as const, stiffness: 300, damping: 20 };
