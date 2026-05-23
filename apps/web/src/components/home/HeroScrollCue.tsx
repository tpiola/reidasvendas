import { motion, useReducedMotion } from 'framer-motion';

export function HeroScrollCue() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-2">
        <motion.div
          className="h-2 w-0.5 rounded-full bg-[#C9A84C]/70"
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-white/30">Scroll</span>
    </motion.div>
  );
}
