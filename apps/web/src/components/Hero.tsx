import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n';

const NeuralCanvas = lazy(() => import('./NeuralCanvas'));

type NavigatorWithPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/**
 * Os segmentos do seletor apontam TODOS para páginas que existem de verdade —
 * cada slug foi conferido no sitemap construído antes de entrar aqui. Se a lista
 * do catálogo mudar, estes links precisam mudar junto (o teste do hero falha se
 * algum apontar para rota que não existe).
 */
const SEGMENTOS = [
  { slug: '/solucoes/site-para-clinicas', key: 'hero.premium.selector.clinicas' },
  { slug: '/solucoes/site-para-advogados', key: 'hero.premium.selector.advocacia' },
  { slug: '/solucoes/site-para-restaurantes', key: 'hero.premium.selector.restaurantes' },
  { slug: '/solucoes/ecommerce-profissional', key: 'hero.premium.selector.loja' },
  { slug: '/solucoes/site-para-imobiliarias', key: 'hero.premium.selector.imobiliarias' },
  { slug: '/solucoes/site-para-profissionais-liberais', key: 'hero.premium.selector.liberais' },
] as const;

function ambientMotionAllowed(reducedMotion: boolean): boolean {
  const navigatorHints = navigator as NavigatorWithPerformanceHints;
  const lowMemory = navigatorHints.deviceMemory !== undefined && navigatorHints.deviceMemory < 4;

  return !reducedMotion && navigatorHints.connection?.saveData !== true && !lowMemory;
}

export default function Hero() {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ambientMotion, setAmbientMotion] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const animationActive = ambientMotion && heroInView && documentVisible;

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

  /**
   * O seletor entra logo depois da mensagem, com as linhas em cascata. É animação
   * de MONTAGEM, não de scroll: a capa já está na tela quando a página abre, e
   * whileInView exigiria IntersectionObserver — que o jsdom dos testes não tem.
   */
  const cascata = { hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } } };
  const linhaCascata = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      ref={sectionRef}
      className={`rdv-hero rdv-hero--premium${ambientMotion ? '' : ' rdv-hero--static'}`}
      aria-labelledby="home-title"
      data-animation-active={animationActive ? 'true' : 'false'}
    >
      <div className="rdv-hero__media" aria-hidden="true">
        <img
          className="rdv-hero__image"
          src="/imagens/hero-agencia-cinematic.webp"
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={videoRef}
          className="rdv-hero__video"
          autoPlay={animationActive}
          muted
          loop
          playsInline
          preload={ambientMotion ? 'metadata' : 'none'}
          poster="/imagens/hero-poster.jpg"
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

      <div className="rdv-hero__layout">
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
              data-magnetic
              onClick={() => trackEvent('hero_cta', { destination: 'solucoes' })}
            >
              {t('hero.premium.cta')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              className="rdv-hero__secondary"
              to="/portfolio"
              data-magnetic
              onClick={() => trackEvent('hero_cta', { destination: 'portfolio' })}
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

        <motion.nav
          className="rdv-hero__selector"
          aria-labelledby="hero-seletor"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={cascata}
        >
          <div className="rdv-hero__selector-head">
            <p className="rdv-hero__selector-title" id="hero-seletor">
              {t('hero.premium.selector.title')}
            </p>
            <Link
              className="rdv-hero__selector-all"
              to="/solucoes"
              onClick={() => trackEvent('hero_cta', { destination: 'solucoes-todas' })}
            >
              {t('hero.premium.selector.all')} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul>
            {SEGMENTOS.map((segmento, indice) => (
              <motion.li key={segmento.slug} variants={linhaCascata}>
                <Link
                  to={segmento.slug}
                  onClick={() => trackEvent('hero_segmento', { segmento: segmento.slug })}
                >
                  <span className="rdv-hero__selector-num" aria-hidden="true">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span className="rdv-hero__selector-label">{t(segmento.key)}</span>
                  <span className="rdv-hero__selector-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
