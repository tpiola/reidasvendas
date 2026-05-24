import { useState, useEffect, useRef, useMemo } from 'react';
import { BRAND } from '@/lib/brand';
import { LOCAL_HERO_VIDEO } from '@/lib/media';

const LOCAL_HERO_CACHE_KEY = 'rdv-hero-local';

type HeroVideoProps = {
  className?: string;
  poster?: string;
  src?: string;
  /** Home: 1 clip (local ou Pexels) — sem rotação */
  preferLocalHero?: boolean;
  /** Força um único vídeo (performance LCP) */
  singleClip?: boolean;
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
  if (window.matchMedia('(max-width: 1024px)').matches) return true;
  if (conn?.effectiveType && /(?:2g|slow-2g)/i.test(conn.effectiveType)) return true;
  return false;
}

function readLocalHeroCached(): boolean {
  try {
    return sessionStorage.getItem(LOCAL_HERO_CACHE_KEY) === '1';
  } catch {
    return false;
  }
}

export function HeroVideo({
  className,
  poster,
  src,
  preferLocalHero = false,
  singleClip = false,
}: HeroVideoProps) {
  const [reduceMotion] = useState(getReducedMotion);
  const [useHd, setUseHd] = useState(true);
  const [localHeroReady, setLocalHeroReady] = useState(() =>
    preferLocalHero ? readLocalHeroCached() : false,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const heroWebm = BRAND.heroVideoWebm;

  const videos = useMemo(() => {
    if (src) return [src];
    if (singleClip || preferLocalHero) {
      if (preferLocalHero && localHeroReady) return [BRAND.heroLocalMp4];
      return [BRAND.heroHomeVideo];
    }
    const list = useHd ? BRAND.heroVideosHd : BRAND.heroVideosUhd;
    return list.slice(0, useHd ? 3 : 2);
  }, [src, useHd, preferLocalHero, localHeroReady, singleClip]);

  const [loaded, setLoaded] = useState<boolean[]>(() => videos.map(() => false));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const posterUrl = poster ?? BRAND.heroPosterUrl;

  useEffect(() => {
    setUseHd(preferHdHero());
  }, []);

  useEffect(() => {
    if (!preferLocalHero || localHeroReady) return;
    let cancelled = false;
    fetch(LOCAL_HERO_VIDEO.mp4, { method: 'HEAD' })
      .then((r) => {
        if (cancelled || !r.ok) return;
        try {
          sessionStorage.setItem(LOCAL_HERO_CACHE_KEY, '1');
        } catch {
          /* ignore */
        }
        setLocalHeroReady(true);
      })
      .catch(() => {
        /* Pexels */
      });
    return () => {
      cancelled = true;
    };
  }, [preferLocalHero, localHeroReady]);

  useEffect(() => {
    setLoaded(videos.map(() => false));
    setActiveIndex(0);
  }, [videos]);

  useEffect(() => {
    if (reduceMotion || videos.length <= 1) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % videos.length);
    }, 14000);
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
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        sizes="100vw"
      />
      {!reduceMotion &&
        videos.map((videoSrc, i) => (
          <video
            key={videoSrc}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1800ms] ease-in-out motion-reduce:transition-none"
            style={{ opacity: activeIndex === i && loaded[i] ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            poster={posterUrl}
            crossOrigin={videoSrc.startsWith('http') ? 'anonymous' : undefined}
            onCanPlay={() => markLoaded(i)}
            onError={() => {
              if (i === 0) markLoaded(i);
            }}
          >
            {preferLocalHero && localHeroReady && i === 0 ? (
              <source src={heroWebm} type="video/webm" />
            ) : null}
            <source src={videoSrc} type="video/mp4" />
          </video>
        ))}
      <div className="absolute inset-0 hero-noise" />
      <div className="absolute inset-0 bg-[#030303]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/40 via-transparent to-[#030305]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,87,255,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.08)_0%,transparent_45%)]" />
    </div>
  );
}
