import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { HOME_SEO } from '@/lib/seo-meta';
import {
  CASE_PLACEHOLDERS,
  DELIVERY_PILLARS,
  HOME_FAQ,
  PAIN_POINTS,
  VIDEO_SHOWCASE,
} from '@/lib/home-content';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { VideoShowcaseGrid } from '@/components/home/VideoShowcaseGrid';
import { CasePlaceholderGrid } from '@/components/home/CasePlaceholderGrid';

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;
function AmbientOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] -right-[5%] h-[400px] w-[400px] rounded-full opacity-12 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#0057FF]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.04]);

  useEffect(() => {
    applySeo({
      title: HOME_SEO.title,
      description: HOME_SEO.description,
      canonicalPath: '/',
      jsonLd: buildHomeJsonLd(HOME_FAQ),
    });
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#030305]">
      <ScrollProgress />

      {/* Hero */}
      <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 parallax-bg">
          <HeroVideo />
        </motion.div>
        <AmbientOrbs />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-36 text-center"
        >
          <Reveal>
            <div className="mb-10 inline-flex items-center gap-3 border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-5 py-2.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A84C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/85">
                Fábrica digital · Franca-SP · IA com revisão humana
              </span>
            </div>
          </Reveal>

          <div className="max-w-4xl">
            <Reveal delay={0.06}>
              <h1 className="text-display font-semibold text-white leading-[1.08]">
                <motion.span
                  className="block text-gradient-gold"
                  initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: EASE_LUXURY, delay: 0.12 }}
                >
                  Se sua empresa ainda vende como ontem,
                </motion.span>
                <motion.span
                  className="mt-2 block text-gradient-titanium"
                  initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: EASE_LUXURY, delay: 0.24 }}
                >
                  já está perdendo para quem opera com IA hoje.
                </motion.span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
              Desenvolvemos sites, aplicativos, extensões sob medida e inteligência de vendas para negócios que
              precisam validar projetos na velocidade da luz, dominar o mercado e crescer sem caos operacional.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/contato"
                className="btn-glow inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.26em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Quero um Diagnóstico de Funil com IA
              </Link>
              <a
                href="#tecnologia"
                className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.26em] text-white/75 hover:text-white"
              >
                Ver Tecnologia em Ação
              </a>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* Dor */}
      <section className="border-y border-white/[0.04] bg-[#08080B] py-24 md:py-32" aria-labelledby="pain-heading">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">Diagnóstico do atrito</span>
            <h2 id="pain-heading" className="mt-4 text-heading font-semibold text-white">
              O cansaço operacional
              <span className="text-gradient-titanium"> antes da virada.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/40">
              Não é falta de vontade — é excesso de ferramenta solta, processo manual e promessa de agência que não
              entrega código nem funil.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="card-dark border-l-2 border-l-[#0057FF]/40 p-7">
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="section-white py-28 md:py-44" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Mecanismo de entrega</span>
            <h2 id="pillars-heading" className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Quatro motores de
              <span className="text-gradient-gold"> IA aplicada.</span>
            </h2>
          </Reveal>
          <div className="grid gap-0 border border-black/[0.06] md:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <div className="pillar-card group relative h-full border-r border-black/[0.06] bg-white p-8 transition-all duration-400 last:border-r-0 hover:bg-[#F0F4FF]">
                  <div className="mb-5 text-[10px] font-bold tracking-[0.32em] text-[#0057FF]/50">{p.num}</div>
                  <h3 className="mb-3 text-xl font-bold text-[#0A0A0B]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#0A0A0B]/50">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoShowcaseGrid items={VIDEO_SHOWCASE} />
      <CasePlaceholderGrid items={CASE_PLACEHOLDERS} />
      <FaqAccordion items={HOME_FAQ} />

      {/* CTA / Lead */}
      <section className="relative overflow-hidden bg-[#030305] py-32 md:py-48">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.14)_0%,transparent_65%)]" />
        <AmbientOrbs />
        <div className="relative mx-auto grid max-w-6xl items-start gap-16 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0057FF]/60">Próximo passo</span>
              <h2 className="mt-5 text-heading font-semibold text-white">
                Diagnóstico de funil
                <span className="text-gradient-titanium"> com IA.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/40">
                Conte onde está a operação hoje. Devolvemos rota, escopo técnico e prioridade — em linguagem de
                quem executa, não de quem só apresenta deck.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-7">
            <div className="glass-card relative overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0057FF]/40 to-transparent" />
              <LeadForm
                source="hero"
                title="Diagnóstico de Funil com IA"
                description="Mapeamento de gargalos, stack recomendada e próximo marco de entrega — resposta em até 24h."
                ctaLabel="Quero meu diagnóstico de funil"
                context={{ intent: 'diagnostico-funil-ia' }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
