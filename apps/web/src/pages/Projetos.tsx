import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';

type Project = {
  slug: string;
  niche: string;
  title: string;
  tagline: string;
  imageUrl: string;
  features: string[];
};

const PROJECTS: Project[] = [
  {
    slug: 'hub-clinico',
    niche: 'Saúde & Estética',
    title: 'Hub Clínico Autônomo',
    tagline: 'Triagem via IA, agendamento inteligente e funil de recuperação de pacientes.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&h=800&q=75',
    features: ['Agendamento IA', 'WhatsApp Bot', 'SEO Local'],
  },
  {
    slug: 'advocacia-soberana',
    niche: 'Direito & Advocacia',
    title: 'Advocacia Soberana',
    tagline: 'Autoridade instantânea. Captação de leads qualificados e qualificação via n8n.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=800&q=75',
    features: ['Filtro de Leads', 'Google Ads Ready', 'CRM'],
  },
  {
    slug: 'imobiliario-premium',
    niche: 'Imóveis & Arquitetura',
    title: 'Vitrine Imobiliária 3D',
    tagline: 'Experiência imersiva, sites falantes e tour virtual para imóveis de alto padrão.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=800&q=75',
    features: ['Sites Falantes', 'Tour 3D', 'Avatares IA'],
  },
  {
    slug: 'e-commerce-elite',
    niche: 'Varejo & E-commerce',
    title: 'Máquina de Varejo',
    tagline: 'Integração Google Meu Negócio, tráfego pago e recuperação de carrinho via WhatsApp.',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&h=800&q=75',
    features: ['Google Shopping', 'Recuperação WhatsApp', 'Upsell'],
  },
];

// ─── Dopamine 3D Card Effect ───
function DopamineCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 25, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, rotateY: 4, rotateX: -4, zIndex: 10 }}
      className="glass-card group relative overflow-hidden rounded-3xl p-2 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,112,243,0.3)] hover:border-brand-blue/50"
      style={{ transformPerspective: 1200 }}
    >
      <div className="relative h-64 overflow-hidden rounded-2xl bg-black/20">
        <motion.img
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90 grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
        
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {project.niche}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-white group-hover:text-brand-blue transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.features.map((feat, i) => (
            <motion.span
              key={feat}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="inline-flex items-center rounded-lg bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-titanium border border-white/5 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors duration-300"
            >
              {feat}
            </motion.span>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/contato"
            className="btn-glow inline-flex h-12 w-full items-center justify-center rounded-xl px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300"
          >
            Quero dominar meu mercado
          </Link>
        </div>
      </div>
      
      {/* Luz interna que segue o hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,112,243,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.article>
  );
}

export default function Projetos() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    applySeo({
      title: 'O Fim do Digital Obsoleto — Rei das Vendas',
      description: 'O digital tradicional está morto. Conheça o cardápio de Hubs Digitais da Rei das Vendas. Automação, IA, SEO e conversão extrema.',
      canonicalPath: '/projetos',
    });
  }, []);

  return (
    <main className="bg-background min-h-screen" ref={containerRef}>
      {/* ═══════════════════════ HERO SOBERANO ═══════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-20 md:pt-48 md:pb-32">
        {/* Abstract 3D Background Element */}
        <motion.div 
          style={{ y }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.08)_0%,transparent_60%)] blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_60%)] blur-3xl pointer-events-none"
        />
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <span className="border-glow-blue inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-blue">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-blue" />
              Projetos reais
            </span>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-serif text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
              Estruturas que
              <span className="text-gradient-titanium"> convertem.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Referências por segmento. Cada entrega é adaptada ao seu funil, CRM e WhatsApp — nada de pacote genérico.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ CARDÁPIO / VITRINE ═══════════════════════ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal className="mb-16 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">
            Cardápio de Estruturas
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ponto de Partida. <span className="text-white/40">Execução Exclusiva.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 mx-auto md:mx-0">
            Modelos de partida. O que vai para produção é feito sob medida para a sua operação.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <DopamineCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════ LEAD CAPTURE ═══════════════════════ */}
      <section className="relative border-t border-white/5 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,112,243,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-blue">
                Garantia de Execução
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Pronto para dominar o seu <span className="text-gradient-titanium">mercado?</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/50">
                Site, automação e integração no escopo. Você foca em fechar e atender.
              </p>
            </Reveal>
          </div>
          
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <LeadForm
                  source="template_catalog"
                  title="Solicitar Hub Digital"
                  description="Preencha os dados e receba uma análise de como a Rei das Vendas vai transformar sua operação."
                  ctaLabel="Quero dominar meu nicho"
                  context={{ intent: 'hub_digital' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
