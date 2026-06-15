import { Link } from 'react-router-dom';
import {
  ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap,
  MessageCircle, CheckCircle2, MapPin, Quote,
  TrendingUp, Shield, Zap, Clock, Target, Layers, Users,
} from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/lib/brand';
import {
  fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem,
  Reveal, SectionLabel, SectionTitle, SectionWrapper,
} from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';
import { GlassCard } from '@/components/GlassCard';
import { DataPanel } from '@/components/DataPanel';
import { LuxuryDivider, SectionHeading, FeatureCard, ProcessStep } from '@/components/PremiumComponents';
import { AutomationFlow } from '@/components/AutomationFlow';
import { FounderSection } from '@/components/FounderSection';

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const hasPlus = value.includes('+');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="num-gold text-3xl font-extrabold sm:text-4xl lg:text-5xl tabular-nums">
      {count}{hasPlus ? '+' : ''}{suffix}
    </span>
  );
}

/* ─── DATA ─── */

const servicos = [
  {
    icon: Monitor, title: 'Sites & Landing Pages', tagline: 'Design que converte 24h',
    desc: 'Landing pages que carregam em 1.2s. Sites institucionais com SEO que entrega leads. E-commerce que não perde venda por lentidão. Performance medida — não prometida.',
    img: BRAND.images.services.sites,
  },
  {
    icon: Smartphone, title: 'Aplicativos Sob Medida', tagline: 'Seu negócio no bolso',
    desc: 'Apps iOS/Android construídos do zero. Delivery, catálogo, relacionamento. Sem template. Sem bloatware. O que seu cliente precisa, nada mais.',
    img: BRAND.images.services.apps,
  },
  {
    icon: Bot, title: 'Automação Inteligente', tagline: 'Processos que rodam sem você',
    desc: 'CRM integrado. Chatbots que qualificam antes de transferir. Disparo omnichannel. Funis que fecham venda enquanto você dorme.',
    img: BRAND.images.services.automations,
  },
  {
    icon: BarChart3, title: 'Dashboards em Tempo Real', tagline: 'Números. Não achismos.',
    desc: 'Painéis com métricas vivas. Vendas, estoque, leads, ROI. O que funciona, o que não funciona — você vê na hora. Sem planilha, sem palpite.',
    img: BRAND.images.services.dashboards,
  },
  {
    icon: GraduationCap, title: 'Mentoria Digital', tagline: 'Estratégia, não tutorial',
    desc: 'Sessões individuais. Metro a metro na sua presença digital. Sem teoria. Sem curso gravado. Resultado mensurável a cada quinzena.',
    img: BRAND.images.services.mentoria,
  },
];

const diferenciais = [
  { icon: MapPin, title: 'Raiz de Franca-SP', desc: 'Conhecemos o mercado local. Atendimento presencial quando precisa.' },
  { icon: Target, title: 'Projetos Únicos', desc: 'Zero template. Cada projeto nasce do zero para o seu problema.' },
  { icon: Zap, title: 'Tecnologia Enterprise', desc: 'React, Next.js, IA, n8n. Mesmo stack que move bilhões. Sem firula.' },
  { icon: Shield, title: 'Suporte Contínuo', desc: 'Entregamos e ficamos. Ajustes, evolução, segurança — prazo aberto.' },
  { icon: Layers, title: 'Arquitetura Modular', desc: 'Começa pequeno. Escala sem precisar refazer. Cresce com você.' },
  { icon: TrendingUp, title: 'Governança de Resultados', desc: 'Visitas, leads, CPA. Toda decisão apoiada em número. Sem chute.' },
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
  { num: '01', title: 'Diagnóstico Digital', desc: 'Análise do negócio, concorrência, mercado e metas. Mapeamento da infraestrutura atual — o que existe, o que falta, o que precisa ser refeito.' },
  { num: '02', title: 'Arquitetura da Solução', desc: 'Definição da estrutura tecnológica, fluxo de conversão e usabilidade. Projeto detalhado antes de escrever uma linha de código.' },
  { num: '03', title: 'Design Premium', desc: 'Identidade visual e interface com foco em conversão. Layouts testados antes de ir para desenvolvimento.' },
  { num: '04', title: 'Desenvolvimento Ágil', desc: 'Construção com tecnologia de ponta. Sprints semanais. Entregas incrementais. Validação a cada ciclo.' },
  { num: '05', title: 'Automação & Integrações', desc: 'Conexão com CRM, WhatsApp, e-mail, pagamentos. Processos que rodam 24h sem supervisão.' },
  { num: '06', title: 'SEO & Performance', desc: 'Otimização para Google, Core Web Vitals, schema markup. Velocidade que segura visitante.' },
  { num: '07', title: 'Testes & Validação', desc: 'QA completo. Testes de conversão. Acessibilidade. Responsividade. Zero surpresa no lançamento.' },
  { num: '08', title: 'Governança & Evolução', desc: 'Entrega com métricas claras. Dashboard de resultados. Plano de evolução contínua — o projeto não morre na entrega.' },
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

      {/* Background */}
      <motion.div style={{ y: heroY, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=85')] bg-cover bg-center opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/85 to-[#030303]" />
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
            Soberania Digital{' '}
            <span className="text-gradient-premium">para empresas</span>
            {' '}que querem vender com mais estrutura
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            Infraestrutura digital de vendas para empresas que querem crescer com tecnologia, 
            design e governança de resultados. Franca-SP e Brasil.
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

          {/* Stats — Contador Animado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-3 gap-8 sm:gap-12"
          >
            {[
              { n: BRAND.stats.projects, l: 'projetos\nentregues' },
              { n: BRAND.stats.satisfaction, l: 'clientes\nsatisfeitos' },
              { n: BRAND.stats.years, l: 'anos de\natuação' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <AnimatedCounter value={s.n} />
                <div className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase tracking-[0.15em] text-[#71717A]">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A]"
        >
          <span>Role para explorar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── SECTION 2: O Problema ─── */
const ProblemaSection = () => (
  <SectionWrapper dark>
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <SectionLabel>O Diagnóstico</SectionLabel>
        <SectionTitle highlight="gargalo">
          Por que seu negócio ainda não vende — o
        </SectionTitle>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
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
      </div>

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
    </div>
  </SectionWrapper>
);

/* ─── SECTION 3: A Solução ─── */
const SolucaoSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        label="Soluções"
        title="A Arquitetura"
        highlight="Rei das Vendas"
        description="Cinco pilares que formam a base da sua soberania digital. Cada um é desenhado sob medida."
      />

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {servicos.map((s) => (
          <GlassCard key={s.title} hover glow>
            <div className="relative h-36 overflow-hidden rounded-xl mb-4">
              <img src={s.img} alt={s.title} loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
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
    </div>
  </SectionWrapper>
);

/* ─── SECTION 4: Arquitetura Rei das Vendas ─── */
const ArquiteturaSection = () => (
  <SectionWrapper dark>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        label="Arquitetura"
        title="Engenharia da"
        highlight="Soberania Digital"
        description="Do diagnóstico à governança: o fluxo completo que transforma seu negócio em uma máquina de vendas previsível."
      />

      <AutomationFlow />
    </div>
  </SectionWrapper>
);

/* ─── SECTION 5: Soluções Detalhadas ─── */
const SolucoesDetalhadas = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        label="Diferenciais"
        title="Por que o"
        highlight="Rei das Vendas"
        description="Não somos uma agência. Somos construtores de infraestrutura digital com metodologia, tecnologia e compromisso com resultado."
      />

      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {diferenciais.map((d) => (
          <FeatureCard key={d.title} icon={<d.icon className="h-5 w-5" />} title={d.title} description={d.desc} />
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);

/* ─── SECTION 6: Projetos por Segmento ─── */
const SegmentosSection = () => (
  <SectionWrapper dark>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        label="Segmentos"
        title="Soluções para cada"
        highlight="realidade de negócio"
        description="Cada nicho tem suas particularidades. Nossa arquitetura se adapta — nunca o contrário."
      />

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
    </div>
  </SectionWrapper>
);

/* ─── SECTION 7: Founder (importado) ─── */
// FounderSection imported above

/* ─── SECTION 8: Provas & Confiança ─── */
const ProvaSection = () => {
  const depoimentos = [
    {
      texto: 'A infraestrutura digital que montaram transformou a forma como vendemos. O processo manual deu lugar a um ecossistema que funciona 24h. Resultado apareceu em semanas.',
      resultado: '+140% leads • Site no ar em 8 dias',
      contexto: 'Comércio local — Franca-SP',
    },
    {
      texto: 'Automatizamos o atendimento e hoje respondemos clientes em segundos. Antes levava horas. O impacto no faturamento veio em 30 dias.',
      resultado: 'Atendimento 5x mais rápido • +35% conversão',
      contexto: 'Prestador de serviços — Franca-SP',
    },
    {
      texto: 'A mentoria online estruturou nosso marketing digital do zero. Em 3 meses saímos do nada para uma presença digital consistente com métricas claras.',
      resultado: '+180% tráfego orgânico em 3 meses',
      contexto: 'Indústria — Franca-SP',
    },
  ];

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Depoimentos"
          title="Quem já viveu na pele"
          highlight="recomenda"
          description="Pessoas reais, resultados reais — sem roteiro, sem historinha."
        />

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {depoimentos.map((d) => (
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
          ))}
        </motion.div>

        {/* Data Panel */}
        <Reveal delay={0.3}>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <DataPanel
              title="Performance Média"
              items={[
                { label: 'Aumento de Leads', value: '+165%', percent: 88 },
                { label: 'Velocidade de Atendimento', value: '5,2x', percent: 82 },
                { label: 'ROI Médio (12 meses)', value: '4,8x', percent: 76 },
              ]}
            />
            <DataPanel
              title="Métricas de Projeto"
              items={[
                { label: 'Entrega no Prazo', value: '94%', percent: 94 },
                { label: 'Satisfação NPS', value: '92', percent: 85 },
                { label: 'Retenção Anual', value: '87%', percent: 80 },
              ]}
            />
            <DataPanel
              title="Tráfego Orgânico"
              items={[
                { label: 'Crescimento SEO (6 meses)', value: '+210%', percent: 90 },
                { label: 'Taxa de Conversão', value: '4,2%', percent: 72 },
                { label: 'CTR Médio', value: '3,8%', percent: 68 },
              ]}
            />
          </div>
        </Reveal>

        <LuxuryDivider />

        <Reveal>
          <div className="text-center">
            <p className="text-xs text-[#71717A] italic">
              Números reais, baseados em dados consolidados dos nossos projetos.
            </p>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
};

/* ─── SECTION 8 (cont.): Processo + CTA ─── */
const ProcessoSection = () => (
  <SectionWrapper dark>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
                <GoldBadge>Comece agora</GoldBadge>
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
    </div>
  </SectionWrapper>
);

/* ─── FAQ ─── */
const FaqSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        label="FAQ"
        title="Perguntas"
        highlight="frequentes"
      />

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
    </div>
  </SectionWrapper>
);

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemaSection />
      <SolucaoSection />
      <ArquiteturaSection />
      <SolucoesDetalhadas />
      <SegmentosSection />
      <FounderSection />
      <ProvaSection />
      <ProcessoSection />
      <FaqSection />
    </main>
  );
}
