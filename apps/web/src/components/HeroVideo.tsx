import { useState, useEffect, useRef, useMemo } from 'react';
import { BRAND } from '@/lib/brand';
import { LOCAL_HERO_VIDEO } from '@/lib/media';

type HeroVideoProps = {
  className?: string;
  poster?: string;
  /** Vídeo único (páginas internas); omitir na Home para rotação */
  src?: string;
  /** Hero da Home: prioriza clip local curto quando existir em /public/videos */
  preferLocalHero?: boolean;
};

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function preferHdHero(): boolean {
  if (typeof window === 'undefined') return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (conn?.saveData) return true;
  if (window.matchMedia('(max-width: 768px)').matches) return true;
  if (conn?.effectiveType && /(?:2g|slow-2g)/i.test(conn.effectiveType)) return true;
  return false;
}

export function HeroVideo({ className, poster, src, preferLocalHero = false }: HeroVideoProps) {
  const [reduceMotion] = useState(getReducedMotion);
  const [useHd, setUseHd] = useState(true);
  const [localHeroReady, setLocalHeroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const heroWebm = BRAND.heroVideoWebm;
  const videos = useMemo(() => {
    if (src) return [src];
    const list = useHd ? BRAND.heroVideosHd : BRAND.heroVideosUhd;
    if (preferLocalHero && localHeroReady) return [BRAND.heroLocalMp4, ...list];
    return list;
  }, [src, useHd, preferLocalHero, localHeroReady]);
  const [loaded, setLoaded] = useState<boolean[]>(() => videos.map(() => false));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const posterUrl = poster ?? BRAND.heroPosterUrl;

  useEffect(() => {
    setUseHd(preferHdHero());
  }, []);

  useEffect(() => {
    if (!preferLocalHero) return;
    let cancelled = false;
    fetch(LOCAL_HERO_VIDEO.mp4, { method: 'HEAD' })
      .then((r) => {
        if (!cancelled && r.ok) setLocalHeroReady(true);
      })
      .catch(() => {
        /* fallback Pexels */
      });
    return () => {
      cancelled = true;
    };
  }, [preferLocalHero]);

  useEffect(() => {
    setLoaded(videos.map(() => false));
    setActiveIndex(0);
  }, [videos]);

  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % videos.length);
    }, 12000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, reduceMotion, videos.length]);

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
        width={1920}
        height={1080}
      />
      {!reduceMotion &&
        videos.map((src, i) => (
          <video
            key={`${src}-${i}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: activeIndex === i && loaded[i] ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            crossOrigin={src.startsWith('http') ? 'anonymous' : undefined}
            onCanPlayThrough={() => markLoaded(i)}
            onError={() => {
              if (i === 0 && preferLocalHero) markLoaded(i);
            }}
          >
            {preferLocalHero && i === 0 ? (
              <source src={heroWebm} type="video/webm" />
            ) : null}
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
