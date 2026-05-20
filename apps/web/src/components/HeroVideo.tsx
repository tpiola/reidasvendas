import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0]));
  const [videoReady, setVideoReady] = useState<boolean[]>(() => BRAND.heroVideos.map(() => false));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const VIDEOS = BRAND.heroVideos;
  const posterUrl = poster ?? BRAND.heroPosterUrl;

  // Preload next video
  const preloadNext = useCallback((currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % VIDEOS.length;
    if (!loadedVideos.has(nextIndex)) {
      setLoadedVideos(prev => new Set([...prev, nextIndex]));
    }
  }, [VIDEOS.length, loadedVideos]);

  useEffect(() => {
    if (reduceMotion) return;
    
    // Preload next video 3 seconds before switching
    const preloadTimer = setTimeout(() => {
      preloadNext(activeIndex);
    }, 5000);

    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % VIDEOS.length);
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(preloadTimer);
    };
  }, [activeIndex, reduceMotion, VIDEOS.length, preloadNext]);

  const markReady = (i: number) => {
    setVideoReady((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <div className={className ?? 'absolute inset-0'} aria-hidden="true">
      {/* Poster image - always visible initially */}
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      
      {/* Videos - lazy loaded */}
      {!reduceMotion &&
        VIDEOS.map((src, i) => {
          // Only render videos that should be loaded
          if (!loadedVideos.has(i)) return null;
          
          const isActive = activeIndex === i;
          const isReady = videoReady[i];
          
          return (
            <video
              key={src}
              ref={(el) => { videoRefs.current[i] = el; }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out"
              style={{ opacity: isActive && isReady ? 1 : 0 }}
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? 'auto' : 'metadata'}
              onCanPlayThrough={() => markReady(i)}
              crossOrigin="anonymous"
            >
              <source src={src} type="video/mp4" />
            </video>
          );
        })}
      
      {/* Overlays */}
      <div className="absolute inset-0 hero-noise" />
      <div className="absolute inset-0 bg-[#030303]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,168,76,0.10)_0%,transparent_60%)]" />
    </div>
  );
}
