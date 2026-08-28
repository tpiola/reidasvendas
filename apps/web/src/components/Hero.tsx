import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n';

const NeuralCanvas = lazy(() => import('./NeuralCanvas'));

type NavigatorWithPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

function ambientMotionAllowed(reducedMotion: boolean): boolean {
  const navigatorHints = navigator as NavigatorWithPerformanceHints;
  const lowMemory = navigatorHints.deviceMemory !== undefined && navigatorHints.deviceMemory < 4;

  return !reducedMotion && navigatorHints.connection?.saveData !== true && !lowMemory;
}

export default function Hero() {
  const { t } = useI18n();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ambientMotion, setAmbientMotion] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const animationActive = ambientMotion && heroInView && documentVisible;
  const diagnosticSearch = new URLSearchParams(location.search);
  diagnosticSearch.set('origem', 'home-hero');
  const diagnosticPath = `/diagnostico?${diagnosticSearch.toString()}`;

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPolicy = () => {
      setAmbientMotion(ambientMotionAllowed(reducedMotionQuery.matches));
    };
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    const section = sectionRef.current;
    const observer =
      section && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => setHeroInView(entry?.isIntersecting ?? false), { threshold: 0.01 })
        : undefined;

    updateMotionPolicy();
    updateVisibility();
    if (section) observer?.observe(section);
    reducedMotionQuery.addEventListener('change', updateMotionPolicy);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer?.disconnect();
      reducedMotionQuery.removeEventListener('change', updateMotionPolicy);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (animationActive) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [animationActive]);

  return (
    <section
      ref={sectionRef}
      className={`rdv-hero rdv-hero--premium${ambientMotion ? '' : ' rdv-hero--static'}`}
      aria-labelledby="home-title"
      data-animation-active={animationActive ? 'true' : 'false'}
    >
      <div className="rdv-hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="rdv-hero__video"
          autoPlay={animationActive}
          muted
          loop
          playsInline
          preload={ambientMotion ? 'metadata' : 'none'}
          poster="/videos/hero-signal-poster.webp"
          disablePictureInPicture
        >
          <source src="/videos/hero-signal-loop.mp4" type="video/mp4" />
        </video>
        <div className="rdv-hero__shade" />
      </div>

      <div className="rdv-hero__network" aria-hidden="true">
        {ambientMotion ? (
          <Suspense fallback={null}>
            <NeuralCanvas active={animationActive} className="rdv-neural-canvas" />
          </Suspense>
        ) : null}
      </div>

      <div className="rdv-hero__noise" aria-hidden="true" />

      <motion.div
        className="rdv-hero__content"
        initial={shouldReduceMotion ? false : { opacity: 0, transform: 'scale(0.985)' }}
        animate={{ opacity: 1, transform: 'scale(1)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="rdv-hero__eyebrow">
          <span aria-hidden="true" />
          {t('hero.premium.badge')}
        </p>

        <h1 id="home-title">
          {t('hero.premium.title.lead')}{' '}
          <span className="rdv-hero__accent">{t('hero.premium.title.accent')}</span>
        </h1>

        <p className="rdv-hero__lede">
          {t('hero.premium.lede.before')} <strong>{t('hero.premium.lede.site')}</strong>
          {t('hero.premium.lede.middle')}{' '}
          <strong>{t('hero.premium.lede.reception')}</strong> {t('hero.premium.lede.after')}
        </p>

        <div className="rdv-hero__actions-v3">
          <Link
            className="rdv-hero__submit"
            to="/solucoes"
            onClick={() => trackEvent('hero_cta', { destination: 'solucoes' })}
          >
            {t('hero.premium.cta')}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            className="rdv-hero__secondary"
            to={diagnosticPath}
            onClick={() => trackEvent('diagnostic_start', { position: 'home-hero' })}
          >
            {t('hero.premium.cases')} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <ul className="rdv-hero__assurances" aria-label={t('hero.premium.assurances.label')}>
          <li>{t('hero.premium.assurances.individual')}</li>
          <li>{t('hero.premium.assurances.mobile')}</li>
          <li>{t('hero.premium.assurances.operation')}</li>
        </ul>
      </motion.div>
    </section>
  );
}
