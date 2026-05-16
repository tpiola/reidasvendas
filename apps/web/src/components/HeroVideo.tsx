import { useState, useEffect, useRef } from 'react';
import { BRAND } from '@/lib/brand';

type HeroVideoProps = {
  className?: string;
  poster?: string;
  src?: string;
};

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroVideo({ className, poster }: HeroVideoProps) {
  const [reduceMotion] = useState(getReducedMotion);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(
    () => BRAND.heroVideos.map(() => false)
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const VIDEOS = BRAND.heroVideos;
  const posterUrl = poster ?? BRAND.heroPosterUrl;

  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % VIDEOS.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, reduceMotion, VIDEOS.length]);

  const markLoaded = (i: number) =>
    setLoaded((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });

  return (
    <div className={className ?? 'absolute inset-0'} aria-hidden="true">
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      {!reduceMotion &&
        VIDEOS.map((src, i) => (
          <video
            key={src}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: activeIndex === i && loaded[i] ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            onCanPlayThrough={() => markLoaded(i)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
      <div className="absolute inset-0 hero-noise" />
      <div className="absolute inset-0 bg-[#030303]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(0,112,243,0.15)_0%,transparent_65%)]" />
    </div>
  );
}
