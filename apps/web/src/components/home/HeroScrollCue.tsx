export function HeroScrollCue() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div
      className="hero-scroll-cue absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      aria-hidden
    >
      <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-2">
        <div className="hero-scroll-cue-dot h-2 w-0.5 rounded-full bg-[#C9A84C]/70" />
      </div>
      <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-white/30">Scroll</span>
    </div>
  );
}
