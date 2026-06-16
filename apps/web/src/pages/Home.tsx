import { Link } from 'react-router-dom';
import {
  ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap,
  MessageCircle, CheckCircle2, MapPin, Quote,
  TrendingUp, Shield, Zap, Clock, Target, Layers,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/lib/brand';
import {
  staggerContainer, staggerItem,
  Reveal, SectionLabel, SectionTitle, SectionWrapper,
} from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';
import { GlassCard } from '@/components/GlassCard';
import { LuxuryDivider, SectionHeading, FeatureCard, ProcessStep } from '@/components/PremiumComponents';
import { FounderSection } from '@/components/FounderSection';

/* ─── DATA ─── */

const servicos = [
  {
    icon: Monitor, title: 'Sites & Landing Pages', tagline: 'Seu negócio aberto 24h',
    desc: 'Um site que carrega em 1.2s e entrega leads enquanto você dorme. SEO que coloca você no Google. Design que vende — não só que enfeita.',
    img: BRAND.images.services.sites,
    videoSrc: '/videos/sentinela/4.mp4',
  },
  {
    icon: Smartphone, title: 'Aplicativos Sob Medida', tagline: 'Na palma da mão do seu cliente',
    desc: 'App iOS/Android feito do zero pro seu negócio. Delivery, catálogo, fidelidade. Sem template. Sem bloatware. Só o que seu cliente precisa.',
    img: BRAND.images.services.apps,
    videoSrc: '/videos/sentinela/8.mp4',
  },
  {
    icon: Bot, title: 'Automação Comercial', tagline: 'Enquanto você dorme, ela vende',
    desc: 'CRM que alimenta o funil sozinho. Chatbot que qualifica antes de transferir. Disparo omnichannel que segue o lead até fechar. Processos que rodam sem você.',
    img: BRAND.images.services.automations,
    videoSrc: '/videos/sentinela/3.mp4',
  },
  {
    icon: BarChart3, title: 'Dashboards em Tempo Real', tagline: 'Números. Palpite zero.',
    desc: 'Vendas, estoque, leads, ROI. Tudo num painel vivo. O que funciona cresce. O que não funciona você ajusta na hora. Adeus planilha.',
    img: BRAND.images.services.dashboards,
    videoSrc: '/videos/sentinela/10.mp4',
  },
  {
    icon: GraduationCap, title: 'Mentoria Digital', tagline: 'Estratégia, não curso',
    desc: 'Sessões individuais. Mês a mês na sua presença digital. Sem teoria, sem aula gravada. Resultado mensurável a cada encontro.',
    img: BRAND.images.services.mentoria,
    videoSrc: '/videos/sentinela/2.mp4',
  },
];

const diferenciais = [
  { icon: MapPin, title: 'Raiz de Franca-SP', desc: 'Conhecemos o mercado local. Atendimento presencial quando e onde precisar.' },
  { icon: Target, title: 'Projetos Únicos', desc: 'Zero template. Cada projeto nasce do zero — do seu problema, não de um molde.' },
  { icon: Zap, title: 'Stack Enterprise', desc: 'React, Next.js, IA, n8n. Mesma tecnologia que move bilhões. Sem firula, sem excesso.' },
  { icon: Shield, title: 'Suporte Contínuo', desc: 'Entregamos e ficamos. Ajustes, evolução, segurança — porteira não fecha na entrega.' },
  { icon: Layers, title: 'Arquitetura Modular', desc: 'Começa pequeno. Escala sem precisar refazer nada. Cresce no seu ritmo.' },
  { icon: TrendingUp, title: 'Governança de Resultados', desc: 'Visitas, leads, CPA. Decisão baseada em dado. Palpite zero.' },
];

const nichos = [
  { nome: 'Calçadista', img: BRAND.images.nichos.calcadista },
  { nome: 'Comércio', img: BRAND.images.nichos.comercio },
  { nome: 'Indústria', img: BRAND.images.nichos.industria },
  { nome: 'Saúde', img: BRAND.images.nichos.saude },
  { nome: 'Educação', img: BRAND.images.nichos.educacao },
  { nome: 'Serviços', img: BRAND.images.nichos.servicos },
];

const processos = [
  { num: '01', title: 'Diagnóstico Digital', desc: 'Análise do negócio, concorrência, mercado e metas. Mapeamento do que existe, o que falta, o que precisa ser reconstruído.' },
  { num: '02', title: 'Arquitetura da Solução', desc: 'Estrutura tecnológica, fluxo de conversão, usabilidade. Projeto detalhado antes de escrever uma linha de código.' },
  { num: '03', title: 'Design Premium', desc: 'Identidade visual e interface com foco em conversão. Layouts validados antes de ir para desenvolvimento.' },
  { num: '04', title: 'Desenvolvimento Ágil', desc: 'Tecnologia de ponta. Sprints semanais. Entregas incrementais. Você vê o resultado a cada ciclo.' },
  { num: '05', title: 'Automação & Integrações', desc: 'CRM, WhatsApp, e-mail, pagamentos — tudo conectado. Processos que rodam 24h sem supervisão.' },
  { num: '06', title: 'SEO & Performance', desc: 'Otimização Google, Core Web Vitals, schema markup. Velocidade que segura o visitante.' },
  { num: '07', title: 'Testes & Validação', desc: 'QA completo. Testes de conversão. Acessibilidade. Responsividade. Zero surpresa no lançamento.' },
  { num: '08', title: 'Governança & Evolução', desc: 'Entrega com métricas claras. Dashboard de resultados. Plano de evolução contínua — seu projeto não morre na entrega.' },
];

const faq = [
  { q: 'O que é soberania digital?', r: 'É você ter controle sobre seus dados, processos e automações — sem depender de plataforma de terceiro que muda as regras quando quer. Seu negócio. Sua infraestrutura.' },
  { q: 'Quanto tempo leva?', r: 'Diagnóstico em 48h. Projeto de infraestrutura digital: 2 a 8 semanas, dependendo da complexidade.' },
  { q: 'Preciso saber programar?', r: 'Não. Você decide o que fazer. A gente faz acontecer. Zero envolvimento técnico.' },
  { q: 'Quanto custa?', r: 'Cada projeto é um projeto. Varia conforme a complexidade. Diagnóstico gratuito para chegar num número justo — sem surpresa.' },
  { q: 'Atendem empresas de qualquer porte?', r: 'MEI querendo sair do Instagram, indústria querendo escalar com automação. Tamanho não é filtro. Seriedade sim.' },
  { q: 'E depois da entrega?', r: 'Todo projeto inclui suporte. Planos de governança contínua: melhorias, segurança, funcionalidades novas.' },
];

/* ─── SECTION 1: Hero ─── */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#030303]">
      {/* Gold particles */}
      <GoldParticles count={50} />

      {/* Background — Vídeo premium sem texto */}
      <motion.div style={{ y: heroY, scale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-[0.3]"
        >
          <source src="/videos/sentinela/7.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/85 to-[#030303]" />
        <div className="absolute inset-0 bg-grid-lg opacity-[0.04]" />
      </motion.div>

      {/* Gold glow gradients */}
      <div className="absolute inset-0">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[rgba(214,168,79,0.06)] blur-[150px]" />
        <div className="absolute -bottom-[20%] -right-[20%] h-[50%] w-[50%] rounded-full bg-[rgba(214,168,79,0.04)] blur-[120px]" />
        <div className="absolute left-[20%] top-[30%] h-[200px] w-[200px] rounded-full bg-[rgba(214,168,79,0.03)] blur-[80px] animate-float-slow" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-lg opacity-[0.4]" />

      {/* Floating geometric elements */}
      <motion.div className="absolute left-[8%] top-[25%] hidden h-14 w-14 border border-[rgba(214,168,79,0.15)] rounded-lg md:block"
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div className="absolute right-[12%] top-[30%] hidden h-6 w-6 bg-[rgba(214,168,79,0.08)] rounded-full md:block"
        animate={{ y: [0, -25, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute left-[18%] bottom-[35%] hidden h-8 w-8 border border-[rgba(214,168,79,0.08)] rounded-full md:block"
        animate={{ y: [0, -12, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Gold line + badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="mb-4">
              <div className="h-px w-6 bg-[#D6A84F] opacity-60 mb-3" />
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
                <MapPin className="h-3 w-3 inline-block mr-1.5 -mt-0.5" />
                Infraestrutura Digital • Franca-SP
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-serif text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-white"
          >
            A infraestrutura digital{' '}
            <span className="text-gradient-premium">que seu negócio merece</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            Sites premium, aplicativos sob medida, automações inteligentes e dashboards em tempo real — tudo integrado para empresas locais que querem vender mais, todos os dias, sem depender de ninguém.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(214,168,79,0.2)', '0 0 40px rgba(214,168,79,0.4)', '0 0 20px rgba(214,168,79,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full"
            >
              <PremiumButton href={BRAND.whatsapp} size="lg" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Diagnóstico Digital Gratuito
              </PremiumButton>
            </motion.div>
            <Link to="/servicos" className="btn-outline-gold text-sm sm:text-base group">
              Ver Soluções
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats — Em breve */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(214,168,79,0.12)] bg-[rgba(214,168,79,0.03)] px-6 py-4 backdrop-blur-sm">
              <Clock className="h-5 w-5 text-[#D6A84F]" />
              <span className="text-sm font-semibold text-[#A1A1AA]">
                Métricas em breve — resultados do primeiro projeto publicados aqui.
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator removido — scroll-driven animations tomam seu lugar */}
    </section>
  );
};

/* ─── SECTION 2: O Problema ─── */
const ProblemaSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
  <SectionWrapper dark>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-7xl px-4 sm:px-6"
    >
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <SectionLabel>O Diagnóstico</SectionLabel>
        <SectionTitle highlight="gargalo">
          Por que seu negócio ainda não vende — o
        </SectionTitle>
      </Reveal>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-6 md:grid-cols-3"
      >
        {[
          { icon: Target, title: 'Sem Infraestrutura', desc: 'Site genérico, processo manual, dados espalhados. Falta uma base digital sólida para crescer com consistência.' },
          { icon: Zap, title: 'Dependência de Terceiros', desc: 'Instagram muda o algoritmo, tráfego pago encarece, e seu negócio fica refém de plataformas que você não controla.' },
          { icon: TrendingUp, title: 'Resultados Imprevisíveis', desc: 'Sem métricas claras, sem governança. Você investe mas não sabe exatamente o que funciona e o que precisa ser ajustado.' },
        ].map((item) => (
          <GlassCard key={item.title} hover glow>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
          </GlassCard>
        ))}
      </motion.div>

      <Reveal delay={0.3}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <div className="luxury-divider max-w-xs mx-auto mb-6" />
          <p className="text-sm italic text-[#A1A1AA]">
            É aqui que a maioria trava. Mas existe um caminho diferente.
          </p>
        </motion.div>
      </Reveal>
    </motion.div>
  </SectionWrapper>
);
};

/* ─── SECTION 3: A Solução ─── */
const SolucaoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
  <SectionWrapper>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeading
          label="Soluções"
          title="A Arquitetura"
          highlight="Rei das Vendas"
          description="Cinco pilares que formam a base da sua soberania digital. Cada um é desenhado sob medida."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {servicos.map((s) => (
          <GlassCard key={s.title} hover glow>
            <div className="relative h-36 overflow-hidden rounded-xl mb-4">
              <video
                autoPlay muted loop playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-[0.4]"
              >
                <source src={s.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.15)] backdrop-blur-sm text-[#D6A84F]">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">{s.tagline}</span>
            <h3 className="font-serif mt-1.5 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</p>
          </GlassCard>
        ))}
      </motion.div>
    </motion.div>
  </SectionWrapper>
);
};

/* ─── SECTION 4: Vídeo-Cinema (scroll reveal) ─── */
const VideoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <SectionWrapper dark>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Projetos em Ação"
          title="Tecnologia que"
          highlight="transforma negócios"
          description="Cada projeto é uma infraestrutura digital viva — sites, apps, automações, dashboards. Tudo feito sob medida para empresas locais que pensam grande."
        />

        <motion.div ref={ref} style={{ scale, opacity }} className="relative mx-auto mt-12 max-w-4xl">
          {/* Golden frame — glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.25)] bg-[rgba(3,3,3,0.6)] backdrop-blur-sm shadow-[0_0_60px_rgba(214,168,79,0.08)]">
            {/* Glow superior */}
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-[rgba(214,168,79,0.1)] to-transparent blur-xl" />
            
            <motion.div style={{ y }} className="relative aspect-[9/16] max-h-[75vh] overflow-hidden rounded-2xl sm:mx-auto sm:w-auto">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/sentinela/7.mp4" type="video/mp4" />
              </video>
              {/* Overlay gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30" />
              
              {/* Texto sobreposto no canto inferior */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(3,3,3,0.7)] px-4 py-2 backdrop-blur-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D6A84F] animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">
                    Infraestrutura Digital • Franca-SP
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats — Em breve */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(214,168,79,0.12)] bg-[rgba(214,168,79,0.03)] px-6 py-4 backdrop-blur-sm">
              <Clock className="h-5 w-5 text-[#D6A84F]" />
              <span className="text-sm font-semibold text-[#A1A1AA]">
                Métricas em breve — resultados do primeiro projeto publicados aqui.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

/* ─── SECTION 5: Soluções Detalhadas ─── */
const SolucoesDetalhadas = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
  <SectionWrapper>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeading
          label="Diferenciais"
          title="Por que o"
          highlight="Rei das Vendas"
          description="Não somos uma agência. Somos construtores de infraestrutura digital com metodologia, tecnologia e compromisso com resultado."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {diferenciais.map((d) => (
          <FeatureCard key={d.title} icon={<d.icon className="h-5 w-5" />} title={d.title} description={d.desc} />
        ))}
      </motion.div>
    </motion.div>
  </SectionWrapper>
);
};

/* ─── SECTION 6: Projetos por Segmento ─── */
const SegmentosSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [45, -45]);

  return (
  <SectionWrapper dark>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeading
          label="Segmentos"
          title="Soluções para cada"
          highlight="realidade de negócio"
          description="Cada nicho tem suas particularidades. Nossa arquitetura se adapta — nunca o contrário."
        />
      </motion.div>

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {nichos.map((n) => (
          <motion.div
            key={n.nome} variants={staggerItem}
            className="group relative h-52 overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.1)] cursor-pointer"
          >
            <img src={n.img} alt={n.nome} loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-[rgba(214,168,79,0.08)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(3,3,3,0.6)] px-4 py-1.5 text-xs font-semibold text-[#D6A84F] backdrop-blur-sm transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.2)]">
                {n.nome}
                <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </SectionWrapper>
);
};

/* ─── SECTION 7: Founder (importado) ─── */
// FounderSection imported above

/* ─── SECTION 8: Provas & Confiança ─── */
const ProvaSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const depoimentos: {
    texto: string;
    resultado: string;
    contexto: string;
  }[] = [];

  return (
    <SectionWrapper>
      <motion.div
        ref={ref}
        style={{ y: sectionY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            label="Depoimentos"
            title="Quem já viveu na pele"
            highlight="recomenda"
            description="Pessoas reais, resultados reais — sem roteiro, sem historinha."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-1"
        >
          {depoimentos.length > 0 ? (
            depoimentos.map((d) => (
              <GlassCard key={d.texto.slice(0, 30)} glow>
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[rgba(214,168,79,0.1)]" />
                <p className="text-sm leading-relaxed text-[#A1A1AA]">&ldquo;{d.texto}&rdquo;</p>
                <div className="my-3 flex items-center gap-2 text-sm font-bold text-[#D6A84F]">
                  <CheckCircle2 className="h-4 w-4" />
                  {d.resultado}
                </div>
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-3">
                  <p className="text-xs text-[#71717A]">{d.contexto}</p>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard glow>
              <div className="text-center py-8">
                <Quote className="mx-auto h-10 w-10 text-[rgba(214,168,79,0.15)] mb-4" />
                <p className="text-sm leading-relaxed text-[#A1A1AA] max-w-md mx-auto">
                  Depoimentos reais em breve. Acompanhe nossos cases no Instagram.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.05)] px-4 py-1.5 text-xs font-semibold text-[#D6A84F]">
                  <MapPin className="h-3 w-3" />
                  @reidasvendas
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>

        {/* Métricas honestas */}
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <GlassCard glow>
              <div className="py-6 px-4">
                <BarChart3 className="mx-auto h-8 w-8 text-[rgba(214,168,79,0.2)] mb-3" />
                <p className="text-sm font-medium text-[#A1A1AA]">
                  Métricas disponíveis após o primeiro projeto entregue.
                </p>
              </div>
            </GlassCard>
          </div>
        </Reveal>

        <LuxuryDivider />
      </motion.div>
    </SectionWrapper>
  );
};

/* ─── SECTION 8 (cont.): Processo + CTA ─── */
const ProcessoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
  <SectionWrapper dark>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6"
    >
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Process Steps */}
        <div className="lg:col-span-3">
          <Reveal>
            <SectionLabel>Processo</SectionLabel>
            <SectionTitle highlight="etapas">
              Como construímos sua infraestrutura em 8
            </SectionTitle>
            <p className="mt-3 text-sm text-[#A1A1AA] max-w-md">
              Metodologia proprietária testada em dezenas de projetos. Cada etapa tem entregáveis claros e validação antes de avançar.
            </p>
          </Reveal>

          <div className="mt-8 space-y-1">
            {processos.map((p, i) => (
              <ProcessStep
                key={p.num}
                number={p.num}
                title={p.title}
                description={p.desc}
                isLast={i === processos.length - 1}
              />
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="lg:col-span-2">
          <Reveal delay={0.2}>
            <div className="glass-premium rounded-2xl p-8 sm:p-10 sticky top-28">
              <div className="text-center">
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span className="block h-px w-6 bg-[#D6A84F]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Comece agora</span>
                  <span className="block h-px w-6 bg-[#D6A84F]" />
                </div>
                <h3 className="font-serif mt-6 text-2xl font-bold text-white">
                  Pronto para construir sua{' '}
                  <span className="text-gradient-gold">soberania digital</span>?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                  Agende um diagnóstico gratuito e descubra como estruturar sua infraestrutura de vendas com tecnologia, design e estratégia.
                </p>
                <div className="mt-8 space-y-3">
                  <PremiumButton href={BRAND.whatsapp} size="lg" className="w-full" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Diagnóstico Gratuito
                  </PremiumButton>
                  <Link to="/contato" className="btn-outline-gold w-full justify-center text-sm">
                    Enviar Mensagem <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-4 text-[10px] text-[#71717A]">
                  Resposta em até 24h • Sem compromisso
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </motion.div>
  </SectionWrapper>
  );
};

/* ─── FAQ ─── */
const FaqSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
  <SectionWrapper>
    <motion.div
      ref={ref}
      style={{ y: sectionY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeading
          label="FAQ"
          title="Perguntas"
          highlight="frequentes"
        />
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="space-y-3"
        >
          {faq.map((item) => (
            <motion.details
              key={item.q} variants={staggerItem}
              className="glass-card group rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(214,168,79,0.2)]"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white transition-colors hover:text-[#D6A84F] list-none">
                {item.q}
                <svg className="h-4 w-4 text-[#D6A84F] transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-[#A1A1AA]">{item.r}</p>
              </div>
            </motion.details>
          ))}
        </motion.div>
      </div>

      <LuxuryDivider />

      {/* Final CTA */}
      <Reveal>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Sua infraestrutura digital começa aqui
          </h2>
          <p className="mt-3 text-sm text-[#A1A1AA] max-w-lg mx-auto">
            Franca-SP • Diagnóstico gratuito • Projetos sob medida
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <PremiumButton href={BRAND.whatsapp} size="lg" target="_blank" rel="noopener noreferrer">
              Falar com o Time
            </PremiumButton>
            <Link to="/contato" className="btn-outline-gold text-sm">
              Enviar Mensagem
            </Link>
          </div>
        </div>
      </Reveal>
    </motion.div>
  </SectionWrapper>
  );
};

/* ─── CTA Banner Reutilizável ─── */
const CtaBanner = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => (
  <SectionWrapper dark={variant === 'dark'}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <LuxuryDivider />
          <h3 className="font-serif mt-8 text-xl font-bold text-white sm:text-2xl">
            Vamos construir sua{' '}
            <span className="text-gradient-gold">infraestrutura digital</span>?
          </h3>
          <p className="mt-3 text-sm text-[#A1A1AA] max-w-md mx-auto">
            Diagnóstico gratuito • Projeto sob medida • Resultado mensurável
          </p>
          <div className="mt-6">
            <PremiumButton href={BRAND.whatsapp} size="lg" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Falar com o Time
            </PremiumButton>
          </div>
        </motion.div>
      </Reveal>
    </div>
  </SectionWrapper>
);

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemaSection />
      <CtaBanner />
      <SolucaoSection />
      <VideoSection />
      <SolucoesDetalhadas />
      <SegmentosSection />
      <CtaBanner />
      <FounderSection />
      <ProvaSection />
      <ProcessoSection />
      <FaqSection />
      <CtaBanner variant="light" />
    </main>
  );
}
