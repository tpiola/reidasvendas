import { Link } from 'react-router-dom';
import {
  ArrowRight, Menu, X, Check, Star, Monitor, Smartphone, Zap, Shield,
  Target, Layers, MessageCircle, TrendingUp, ChevronDown, Sparkles,
  Globe, ShoppingBag, Users, Building2, HeartPulse, Briefcase, ArrowUpRight,
} from 'lucide-react';
import {
  motion, useScroll, useTransform, AnimatePresence,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ─── COLOR PALETTE ─── */
const C = {
  bg: '#030303',
  surface: '#080808',
  surface2: '#0B0B0B',
  surface3: '#111111',
  gold: '#D6A84F',
  goldLight: '#F2D38A',
  goldDark: '#B88932',
  white: '#F5F5F5',
  muted: '#A1A1AA',
};

/* ─── REVEAL HOOK ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useReveal();
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── STAGGER ─── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── SECTION LABEL ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-3">
      <span className="h-px w-6 bg-[#D6A84F]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">{children}</span>
      <span className="h-px w-6 bg-[#D6A84F]" />
    </div>
  );
}

/* ─── SECTION TITLE ─── */
function SectionTitle({ children, highlight }: { children: React.ReactNode; highlight?: string }) {
  const parts = typeof children === 'string' && highlight
    ? children.split(highlight)
    : [children];

  if (typeof children !== 'string' || !highlight) {
    return <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">{children}</h2>;
  }

  return (
    <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
      {parts[0]}
      <span className="text-[#D6A84F]">{highlight}</span>
      {parts[1]}
    </h2>
  );
}

/* ─── GLASS CARD ─── */
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[rgba(214,168,79,0.2)] hover:shadow-[0_0_40px_rgba(214,168,79,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── PARALLAX SECTION WRAPPER ─── */
function ParallaxSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.04)] bg-[rgba(3,3,3,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-serif text-xl font-bold tracking-tight text-white">
            Rei das <span className="text-[#D6A84F]">Vendas</span>
          </span>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#solucao" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Solução</a>
            <a href="#para-quem" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Para Quem</a>
            <a href="#como-funciona" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Processo</a>
            <a href="#possibilidades" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Serviços</a>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full bg-[#D6A84F] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#030303] transition-all duration-300 hover:bg-[#F2D38A] hover:shadow-[0_0_25px_rgba(214,168,79,0.3)]"
            >
              Começar <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center text-[#A1A1AA]"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[rgba(255,255,255,0.04)] bg-[#080808]"
            >
              <div className="flex flex-col gap-4 px-4 py-6">
                {['Solução', 'Para Quem', 'Processo', 'Serviços'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-[#A1A1AA] transition-colors hover:text-[#D6A84F]"
                  >
                    {item}
                  </a>
                ))}
                <Link to="/contato" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A84F] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#030303]">
                  Começar <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-block rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.06)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F]">
            Infraestrutura Digital Premium
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sua empresa pronta para{' '}
            <span className="text-[#D6A84F]">vender no digital</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Sites, apps, automações e sistemas que realmente vendem. 
            Sua marca aparece, seus clientes encontram e seus resultados crescem.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D6A84F] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#030303] transition-all duration-300 hover:bg-[#F2D38A] hover:shadow-[0_0_35px_rgba(214,168,79,0.35)]"
            >
              <MessageCircle className="h-4 w-4" />
              Diagnóstico Gratuito
            </Link>
            <a
              href="#solucao"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#F5F5F5] transition-all duration-300 hover:border-[#D6A84F] hover:text-[#D6A84F]"
            >
              Ver Soluções <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Floating Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-full max-w-5xl"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.12)] bg-gradient-to-br from-[rgba(214,168,79,0.06)] to-[rgba(3,3,3,0.8)] p-1 shadow-[0_0_60px_rgba(214,168,79,0.06)]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0B0B0B]">
              <div className="text-center">
                <div className="mb-4 flex justify-center gap-6">
                  {[Monitor, Smartphone, Globe].map((Icon, i) => (
                    <div key={i} className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F]">
                      <Icon className="h-6 w-6" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold tracking-widest text-[#D6A84F]">SUA MARCA. DIGITAL. PREMIUM.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Cards */}
        <div className="mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-3">
          {[
            { icon: TrendingUp, title: 'Mais Presença', desc: 'Apareça no Google e redes sociais' },
            { icon: ShoppingBag, title: 'Mais Pedidos', desc: 'Vendas diretas sem intermediário' },
            { icon: Shield, title: 'Mais Confiança', desc: 'Marca profissional que inspira crédito' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                <card.icon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">{card.title}</p>
                <p className="text-[10px] text-[#A1A1AA]">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">Role</span>
          <ChevronDown className="h-4 w-4 text-[#D6A84F]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2: DOR (Pain Points)
   ═══════════════════════════════════════════════════════════════════ */
function DorSection() {
  return (
    <ParallaxSection className="bg-[#030303] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>O Problema</SectionLabel>
          <SectionTitle highlight="aparecer">
            Seu cliente procura. Sua empresa precisa
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Enquanto você perde vendas, seus concorrentes estão a um clique de distância.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 md:grid-cols-3"
        >
          {[
            {
              icon: Monitor,
              title: 'Site antigo ou inexistente',
              desc: 'Seu cliente pesquisa no Google e não encontra você. Ou encontra um site que parece de 2010 e fecha a aba em 3 segundos.',
            },
            {
              icon: MessageCircle,
              title: 'WhatsApp desorganizado',
              desc: 'Pedidos se perdem no meio de conversas. Cliente manda áudio e você esquece. Nenhum dado fica registrado.',
            },
            {
              icon: Shield,
              title: 'Pouca confiança digital',
              desc: 'Sem site profissional, sem credibilidade. Cliente desconfia, compara com quem tem e escolhe seu concorrente.',
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="group rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#080808] p-8 transition-all duration-500 hover:border-[rgba(214,168,79,0.2)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ParallaxSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3: SOLUÇÃO (Solution Grid - 7 cards)
   ═══════════════════════════════════════════════════════════════════ */
function SolucaoSection() {
  return (
    <section id="solucao" className="bg-[#030303] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Nossa Solução</SectionLabel>
          <SectionTitle highlight="estrutura digital">
            Criamos a
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Tudo que sua empresa precisa para vender online — num só lugar.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {[
            { icon: Globe, title: 'Website Profissional', desc: 'Site rápido, bonito e otimizado para o Google.' },
            { icon: Target, title: 'Página de Venda', desc: 'Landing page que converte visitante em lead.' },
            { icon: ShoppingBag, title: 'Catálogo Digital', desc: 'Seus produtos online 24h, atualizados em tempo real.' },
            { icon: Smartphone, title: 'Aplicativo', desc: 'App iOS/Android para fidelizar seus clientes.' },
            { icon: Layers, title: 'Sistema Interno', desc: 'Gestão de pedidos, estoque e equipe numa plataforma.' },
            { icon: Zap, title: 'Extensão', desc: 'Ferramentas que integram e automatizam seu negócio.' },
            { icon: Sparkles, title: 'Ferramentas IA', desc: 'Inteligência artificial pra turbinar seus resultados.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#080808] p-6 transition-all duration-500 hover:border-[rgba(214,168,79,0.2)] hover:bg-[#0B0B0B]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)]">
                <item.icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
              </div>
              <h3 className="font-serif text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4: PARALLAX SCROLL (Big phrases)
   ═══════════════════════════════════════════════════════════════════ */
function ParallaxScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const phrases = [
    'Menos improviso.',
    'Mais presença.',
    'Mais confiança.',
    'Mais vendas.',
    'Mais controle.',
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#030303] py-32 sm:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-16 sm:gap-24">
          {phrases.map((phrase, i) => {
            const start = i / phrases.length;
            const end = (i + 1) / phrases.length;
            const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.08, 1, 1, 0.08]);
            const x = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -80 : 80, 0]);
            const scale = useTransform(scrollYProgress, [start, end], [0.7, 1]);

            return (
              <motion.div
                key={phrase}
                style={{ opacity, x, scale }}
                className="text-center"
              >
                <span className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {phrase}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5: PARA QUEM É (6 blocks)
   ═══════════════════════════════════════════════════════════════════ */
function ParaQuemSection() {
  return (
    <section id="para-quem" className="bg-[#030303] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Para Quem É</SectionLabel>
          <SectionTitle highlight="negócio">
            Ideal para todo tipo de
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Soluções sob medida. Cada segmento tem seu plano.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            { icon: ShoppingBag, title: 'Comércio', desc: 'Lojas físicas que precisam vender online sem complicação. Catálogo, delivery e pagamento num só lugar.' },
            { icon: Briefcase, title: 'Serviços', desc: 'Prestadores que querem ser encontrados no Google. Site profissional, captação de leads e agenda online.' },
            { icon: Users, title: 'Profissionais', desc: 'Advogados, arquitetos, consultores. Presença digital que transmite autoridade e atrai clientes.' },
            { icon: HeartPulse, title: 'Clínicas', desc: 'Clínicas e consultórios. Agendamento online, prontuário digital e presença que gera confiança.' },
            { icon: Building2, title: 'Lojas Virtuais', desc: 'E-commerces que querem escalar. Plataforma completa com gestão de estoque e meios de pagamento.' },
            { icon: Monitor, title: 'Infoprodutores', desc: 'Criadores de conteúdo e cursos. Página de vendas, área de membros e automação de marketing.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#080808] p-7 transition-all duration-500 hover:border-[rgba(214,168,79,0.2)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D6A84F] opacity-0 transition-all duration-300 group-hover:opacity-100">
                Saber mais <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6: COMO FUNCIONA (4 steps)
   ═══════════════════════════════════════════════════════════════════ */
function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="bg-[#030303] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Como Funciona</SectionLabel>
          <SectionTitle highlight="simples">
            É mais
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Quatro etapas. Sem mistério. Sem surpresa.
          </p>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-[#D6A84F] via-[rgba(214,168,79,0.3)] to-transparent sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {[
              { num: '01', title: 'Entendemos seu negócio', desc: 'Uma conversa sem compromisso pra entender sua realidade, seus objetivos e o que precisa ser resolvido.' },
              { num: '02', title: 'Criamos a solução ideal', desc: 'Projeto personalizado com tudo que você precisa. Sem firula, sem excesso, sem o que não vai usar.' },
              { num: '03', title: 'Entregamos funcionando', desc: 'Tudo pronto, testado e rodando. Você só precisa usar. Acompanhamento na ativação.' },
              { num: '04', title: 'Ajustamos conforme cresce', desc: 'Seu negócio muda, a gente acompanha. Suporte contínuo, melhorias e novas funcionalidades.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-5 sm:gap-8"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(214,168,79,0.3)] bg-[#080808] text-sm font-bold text-[#D6A84F] shadow-[0_0_15px_rgba(214,168,79,0.08)]">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7: AUTORIDADE (Trust / Authority - 5 cards)
   ═══════════════════════════════════════════════════════════════════ */
function AutoridadeSection() {
  return (
    <ParallaxSection className="bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Autoridade</SectionLabel>
          <SectionTitle highlight="vender">
            Design bonito não basta. Precisa
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Resultado que seu negócio merece. Tecnologia que entrega.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {[
            { icon: Target, title: 'Foco em Conversão', desc: 'Cada pixel pensado pra transformar visitante em cliente.' },
            { icon: Zap, title: 'Performance', desc: 'Sites que carregam em segundos. Google ama, cliente compra.' },
            { icon: Shield, title: 'Tecnologia Sólida', desc: 'Stack moderna, segura e preparada pra crescer com você.' },
            { icon: Star, title: 'Design Premium', desc: 'Sua marca no padrão das grandes. Sem cara de amador.' },
            { icon: Layers, title: 'Suporte Real', desc: 'Gente de verdade do outro lado. Não robô.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[#0B0B0B] p-6 text-center transition-all duration-500 hover:border-[rgba(214,168,79,0.2)] hover:bg-[#111111]"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ParallaxSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8: POSSIBILIDADES (12 items grid)
   ═══════════════════════════════════════════════════════════════════ */
function PossibilidadesSection() {
  return (
    <section id="possibilidades" className="bg-[#030303] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Possibilidades</SectionLabel>
          <SectionTitle highlight="pode ter">
            Tudo que sua empresa
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Um cardápio completo de soluções digitais. Escolha o que faz sentido pro seu negócio.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {[
            { icon: Globe, title: 'Site Institucional' },
            { icon: Target, title: 'Landing Page' },
            { icon: ShoppingBag, title: 'Catálogo Online' },
            { icon: Monitor, title: 'Sistema Web' },
            { icon: Smartphone, title: 'App Mobile' },
            { icon: Layers, title: 'Dashboard' },
            { icon: MessageCircle, title: 'Chatbot' },
            { icon: Zap, title: 'Automação' },
            { icon: Shield, title: 'CRM' },
            { icon: TrendingUp, title: 'Blog Profissional' },
            { icon: Users, title: 'Área de Membros' },
            { icon: Sparkles, title: 'IA Personalizada' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[#080808] px-4 py-3.5 transition-all duration-300 hover:border-[rgba(214,168,79,0.2)] hover:bg-[#0B0B0B]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)]">
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-white">{item.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9: CTA FINAL
   ═══════════════════════════════════════════════════════════════════ */
function CtaFinalSection() {
  return (
    <ParallaxSection className="relative bg-[#080808] py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[rgba(214,168,79,0.03)] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <SectionLabel>Comece Agora</SectionLabel>
          <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Vamos transformar sua{' '}
            <span className="text-[#D6A84F]">ideia em realidade</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Diagnóstico gratuito. Sem compromisso. Sua empresa merece uma presença digital que vende.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D6A84F] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#030303] transition-all duration-300 hover:bg-[#F2D38A] hover:shadow-[0_0_35px_rgba(214,168,79,0.35)]"
            >
              <MessageCircle className="h-4 w-4" />
              Diagnóstico Gratuito
            </Link>
            <a
              href="#possibilidades"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#F5F5F5] transition-all duration-300 hover:border-[#D6A84F] hover:text-[#D6A84F]"
            >
              Ver Possibilidades <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 10: FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function FooterSection() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] bg-[#030303] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="font-serif text-lg font-bold text-white">
              Rei das <span className="text-[#D6A84F]">Vendas</span>
            </span>
            <p className="mt-1 text-xs text-[#A1A1AA]">
              Infraestrutura digital que vende.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#solucao" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Solução</a>
            <a href="#para-quem" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Para Quem</a>
            <a href="#como-funciona" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Processo</a>
            <Link to="/contato" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#D6A84F]">Contato</Link>
          </div>
          <p className="text-[10px] text-[#71717A]">
            &copy; {new Date().getFullYear()} Rei das Vendas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-[#030303]">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Dor */}
      <DorSection />

      {/* 3. Solução */}
      <SolucaoSection />

      {/* 4. Parallax Scroll */}
      <ParallaxScrollSection />

      {/* 5. Para Quem É */}
      <ParaQuemSection />

      {/* 6. Como Funciona */}
      <ComoFuncionaSection />

      {/* 7. Autoridade */}
      <AutoridadeSection />

      {/* 8. Possibilidades */}
      <PossibilidadesSection />

      {/* 9. CTA Final */}
      <CtaFinalSection />

      {/* 10. Footer */}
      <FooterSection />
    </main>
  );
}
