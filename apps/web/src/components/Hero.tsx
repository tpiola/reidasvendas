import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { ESTADO_TECNICO, MEDICAO_REALIZADA_EM } from '@/lib/conversao';
import { useI18n } from '@/lib/i18n';

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

/**
 * A capa não carrega mais animação ambiente em canvas/3D. O bloco da direita agora
 * é o estado técnico medido em produção: dado real no lugar de escultura — e é o
 * que mantém o LCP dentro do orçamento (LCP < 1,2 s, CLS 0), porque não há uma
 * segunda árvore de JavaScript para baixar acima da dobra.
 */
export default function Hero() {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const cascata = { hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } } };
  const linhaCascata = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={sectionRef} className="rdv-studio-hero rdv-studio-hero--still" aria-labelledby="home-title">
      <div className="rdv-studio-hero__layout">
        <motion.div
          className="rdv-studio-hero__content"
          initial={shouldReduceMotion ? false : { opacity: 0, transform: 'scale(0.985)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="rdv-studio-hero__eyebrow">
            <span aria-hidden="true" />
            {t('hero.premium.badge')}
          </p>

          <h1 id="home-title">
            {t('hero.premium.title.lead')}{' '}
            <span className="rdv-studio-hero__accent">{t('hero.premium.title.accent')}</span>
          </h1>

          <p className="rdv-studio-hero__lede">
            {t('hero.premium.lede.before')} <strong>{t('hero.premium.lede.site')}</strong>
            {t('hero.premium.lede.middle')}{' '}
            <strong>{t('hero.premium.lede.reception')}</strong> {t('hero.premium.lede.after')}
          </p>

          <div className="rdv-studio-hero__actions">
            <Link
              className="rdv-studio-hero__submit"
              to="/diagnostico?origem=home-hero&estagio=triagem"
              onClick={() => trackEvent('hero_cta', { destination: 'diagnostico', origin: 'home-hero', stage: 'triagem' })}
            >
              {t('hero.premium.cta')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              className="rdv-studio-hero__secondary"
              href="#protocolo"
              onClick={() => trackEvent('hero_cta', { destination: 'protocolo' })}
            >
              {t('hero.premium.cases')} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="rdv-studio-hero__assurance">{t('hero.premium.assurance')}</p>
          <a className="rdv-studio-hero__pricing" href="#triagem-paga">{t('hero.premium.pricing')}</a>
        </motion.div>

        <div className="rdv-studio-hero__art">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:grid-cols-2" aria-label={`Estado técnico medido em produção em ${MEDICAO_REALIZADA_EM}`}>
            {ESTADO_TECNICO.map((item) => (
              <div key={item.rotulo} className="p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{item.rotulo}</dt>
                <dd className="mt-2 font-serif text-2xl font-bold text-text-primary">{item.valor}</dd>
                <dd className="mt-1 text-xs leading-5 text-text-muted">{item.detalhe}</dd>
              </div>
            ))}
          </dl>
          <div className="rdv-studio-hero__caption">
            <span>Medição</span>
            <span>Instrumentação</span>
            <span>Engenharia</span>
          </div>
        </div>
      </div>

      <div className="rdv-studio-segments">
        <motion.nav
          className="rdv-studio-segments__nav"
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
