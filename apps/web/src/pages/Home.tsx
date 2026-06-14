import { Link } from 'react-router-dom';
import {
  ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap,
  MessageCircle, CheckCircle2, MapPin, Star, Clock, Zap, Shield,
  TrendingUp, Quote, ChevronDown, Play
} from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import {
  fadeInUp, fadeInLeft, fadeInRight, scaleIn,
  staggerContainer, staggerItem,
  Reveal, SectionLabel, SectionTitle, SectionWrapper,
  useTilt,
} from '@/hooks/useAnimation';

/* ─── Dados ─── */

const servicos = [
  {
    icon: Monitor,
    title: 'Sites & Landing Pages',
    tagline: 'Design que vende 24h por dia',
    img: BRAND.images.services.sites,
    desc: 'Landing pages cinematográficas, sites institucionais premium e e-commerces. Performance obsessiva, SEO estrutural e conversão medida em cada pixel.',
  },
  {
    icon: Smartphone,
    title: 'Aplicativos Sob Medida',
    tagline: 'Seu negócio no bolso do cliente',
    img: BRAND.images.services.apps,
    desc: 'Apps iOS e Android com UX de classe mundial. Delivery, catálogo interativo, relacionamento — experiências que seus clientes vão amar usar.',
  },
  {
    icon: Bot,
    title: 'Automação Inteligente',
    tagline: 'Menos trabalho, mais resultado',
    img: BRAND.images.services.automations,
    desc: 'CRM integrado, chatbots com IA, funis automatizados e disparo omnichannel. Transforme processos manuais em máquinas de venda previsíveis.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards em Tempo Real',
    tagline: 'Decisões baseadas em dados',
    img: BRAND.images.services.dashboards,
    desc: 'Painéis personalizados com métricas vivas do seu negócio. Vendas, estoque, leads, ROI — tudo num golpe de vista.',
  },
  {
    icon: GraduationCap,
    title: 'Mentoria Digital',
    tagline: 'Estratégia que acelera resultados',
    img: BRAND.images.services.mentoria,
    desc: 'Sessões individuais para estruturar sua presença online. Do zero à escala, com metas claras e acompanhamento contínuo.',
  },
];

const diferenciais = [
  { icon: MapPin, title: 'Raiz de Franca-SP', desc: 'Conhecemos o mercado local como ninguém. Atendimento presencial quando você precisar.' },
  { icon: Star, title: 'Projetos Únicos', desc: 'Zero template. Cada solução é desenhada sob medida — como um terno sob medida, mas para sua marca.' },
  { icon: Zap, title: 'Tecnologia Enterprise', desc: 'React, Next.js, IA generativa, automação com n8n. O mesmo stack que move as big techs.' },
  { icon: Shield, title: 'Suporte Vitalício', desc: 'Não entregamos e sumimos. Seu projeto tem acompanhamento contínuo, ajustes e evolução.' },
  { icon: MessageCircle, title: 'WhatsApp Integrado', desc: 'Lead capturado → notificação instantânea → resposta em segundos. Tudo nativo no seu dia a dia.' },
  { icon: TrendingUp, title: 'Resultados Reais', desc: 'Métricas claras: visitas, leads, custo por aquisição. Sem mimimi — dados que mostram o retorno.' },
];

const faq = [
  { q: 'Quanto tempo leva para criar um site?', r: 'Um site institucional premium fica pronto entre 5 a 10 dias úteis. Projetos mais complexos — e-commerce, apps, automações — levam de 3 a 8 semanas, dependendo do escopo.' },
  { q: 'Preciso saber programar ou design?', r: 'Não. Nós cuidamos de tudo: domínio, hospedagem, design, conteúdo técnico e manutenção. Você só precisa saber o que quer comunicar.' },
  { q: 'Quanto custa uma solução digital?', r: 'Cada projeto é único. O investimento varia conforme complexidade e funcionalidades. Oferecemos diagnóstico gratuito para entender sua necessidade e apresentar uma proposta clara, sem surpresas.' },
  { q: 'Atendem empresas de qualquer porte?', r: 'Sim. Trabalhamos desde MEIs que estão dando o primeiro passo online até indústrias consolidadas que querem escalar com automação e dados.' },
  { q: 'Como funciona a mentoria digital?', r: 'Online, individual e 100% prática. Planejamos sua presença digital, definimos metas quinzenais e ajustamos a rota com base em resultados reais.' },
  { q: 'Vocês fazem manutenção após a entrega?', r: 'Sim. Todo projeto sai com suporte incluso. Também oferecemos planos mensais de evolução contínua com melhorias, segurança e novas funcionalidades.' },
];

/* ─── Hero Section — Cinematográfico ─── */
const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const blur = useTransform(scrollY, [0, 600], [0, 8]);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#030305]">
      {/* Background Layer — Parallax Profundo */}
      <motion.div style={{ y: heroY, scale, filter: `blur(${blur.get()}px)` }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=85')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/80 to-[#030305]" />
      </motion.div>

      {/* Gradientes de Luz Cinematográficos */}
      <div className="absolute inset-0">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[#0057FF] opacity-[0.08] blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[20%] h-[50%] w-[50%] rounded-full bg-[#C9A84C] opacity-[0.06] blur-[100px]" />
        <div className="orb left-[20%] top-[30%] h-[300px] w-[300px] bg-[#0057FF] opacity-[0.03] animate-float-slow" />
        <div className="orb right-[15%] top-[20%] h-[200px] w-[200px] bg-[#C9A84C] opacity-[0.04] animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Geometric Elements */}
      <motion.div
        className="absolute left-[8%] top-[25%] hidden h-16 w-16 border border-[#C9A84C]/20 rounded-lg md:block"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute right-[12%] top-[35%] hidden h-8 w-8 bg-[#0057FF]/10 rounded-full md:block"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[15%] bottom-[30%] hidden h-10 w-10 border border-white/10 rounded-full md:block"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Conteúdo */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              Soluções Digitais • Franca-SP
            </span>
          </motion.div>

          {/* Headline — Impacto que para o scroll */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-white"
          >
            Seu negócio vendendo{' '}
            <span className="text-gradient-premium">como as gigantes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(248,248,250,0.6)] sm:text-lg md:text-xl"
          >
            Sites cinematográficos, apps premium e automações que transformam 
            seu negócio em uma máquina de vendas digital — em Franca-SP e em todo o Brasil.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4" />
              Diagnóstico Gratuito
            </a>
            <Link to="/servicos" className="btn-outline text-sm sm:text-base group">
              Ver Soluções
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats — Números Reais */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-3 gap-6 sm:gap-10"
          >
            {[
              { n: '12+', l: 'projetos\nentregues' },
              { n: '98%', l: 'clientes\nsatisfeitos' },
              { n: '3', l: 'anos de\natuação' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{s.n}</div>
                <div className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(248,248,250,0.4)]">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(248,248,250,0.3)]"
        >
          <span>Role para explorar</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─── Serviços Section ─── */
const ServicosSection = () => (
  <SectionWrapper dark>
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <SectionLabel>O que fazemos</SectionLabel>
        <SectionTitle highlight="transformar seu negócio">
          Soluções digitais que
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[rgba(248,248,250,0.5)]">
          Da primeira ideia ao resultado batendo na porta: um ecossistema completo 
          de soluções digitais pensadas para empresas que não aceitam o mínimo.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {servicos.map((s) => (
          <TiltCard key={s.title} servico={s} />
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);

const TiltCard = ({ servico: s }: { servico: typeof servicos[0] }) => {
  const { ref, style } = useTilt();
  const Icon = s.icon;

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="shine-effect border-glow group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(0,87,255,0.3)] hover:bg-[rgba(0,87,255,0.04)]"
      style={style}
    >
      {/* Image Background */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(0,87,255,0.2)] backdrop-blur-sm text-[#0057FF]">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A84C]">{s.tagline}</span>
        <h3 className="font-serif mt-1.5 text-lg font-semibold text-white">{s.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{s.desc}</p>
      </div>
    </motion.div>
  );
};

/* ─── Diferenciais ─── */
const DiferenciaisSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <SectionLabel>Diferenciais</SectionLabel>
        <SectionTitle highlight="Rei das Vendas">
          Por que a
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-lg text-sm text-[rgba(248,248,250,0.5)]">
          Não somos mais uma agência. Somos parceiros de crescimento com metodologia, 
          tecnologia e compromisso com resultado real.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {diferenciais.map((d) => (
          <motion.div
            key={d.title}
            variants={staggerItem}
            className="glass-card shine-effect group rounded-2xl p-6 hover:border-[rgba(0,87,255,0.2)]"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.08)] text-[#0057FF] transition-all duration-300 group-hover:bg-[rgba(0,87,255,0.15)] group-hover:scale-110">
              <d.icon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-white">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.5)]">{d.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);

/* ─── Como Funciona ─── */
const ComoFuncionaSection = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const steps = [
    { num: '01', title: 'Diagnóstico Estratégico', desc: 'Uma conversa profunda sobre seu negócio, metas e desafios. Em 24h você recebe um diagnóstico claro com o roteiro do que precisa ser feito.' },
    { num: '02', title: 'Criação & Desenvolvimento', desc: 'Projetamos e desenvolvemos cada detalhe com design premium, tecnologia de ponta e foco absoluto em conversão. Você acompanha cada etapa em tempo real.' },
    { num: '03', title: 'Resultado & Evolução', desc: 'Entregamos, ajustamos e acompanhamos. Diferente de agências tradicionais, nosso compromisso é com o resultado — não com a entrega.' },
  ];

  return (
    <SectionWrapper dark>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Processo</SectionLabel>
          <SectionTitle highlight="funciona" gradient="blue">
            Como
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[rgba(248,248,250,0.5)]">
            Metodologia testada em dezenas de projetos. Três etapas, um compromisso: resultado.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((item, i) => (
            <motion.div
              key={item.num}
              variants={staggerItem}
              className="glass-premium relative rounded-2xl p-7 sm:p-8 text-center"
            >
              {/* Número decorativo */}
              <div className="absolute -top-4 -right-4 text-[80px] font-extrabold leading-none text-[rgba(0,87,255,0.04)] select-none pointer-events-none">
                {item.num}
              </div>

              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(0,87,255,0.15)] to-[rgba(0,87,255,0.05)] text-2xl font-extrabold text-[#0057FF] shadow-lg shadow-[rgba(0,87,255,0.1)]">
                  {item.num}
                </div>
                <h3 className="font-serif mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

/* ─── Nichos ─── */
const NichosSection = () => {
  const nichos = [
    { nome: 'Calçadista', img: BRAND.images.nichos.calcadista },
    { nome: 'Comércio', img: BRAND.images.nichos.comercio },
    { nome: 'Indústria', img: BRAND.images.nichos.industria },
    { nome: 'Saúde', img: BRAND.images.nichos.saude },
    { nome: 'Educação', img: BRAND.images.nichos.educacao },
    { nome: 'Serviços', img: BRAND.images.nichos.servicos },
  ];

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Segmentos</SectionLabel>
          <SectionTitle highlight="segmentos">
            Atendemos diversos
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[rgba(248,248,250,0.5)]">
            Cada nicho tem suas particularidades. Nossas soluções são desenhadas 
            para se adaptar — nunca o contrário.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {nichos.map((n) => (
            <motion.div
              key={n.nome}
              variants={staggerItem}
              className="group relative h-56 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] cursor-pointer"
            >
              <img
                src={n.img}
                alt={n.nome}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-[rgba(0,87,255,0.1)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#0057FF]/30 group-hover:pl-5">
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
};

/* ─── Depoimentos ─── */
const DepoimentosSection = () => {
  const depoimentos = [
    {
      texto: 'O site que fizeram superou minhas expectativas. Apareço no Google, recebo leads pelo WhatsApp e o melhor: não precisei aprender nada técnico. Profissionalismo do começo ao fim.',
      resultado: 'Site no ar em 8 dias • +140% leads',
      contexto: 'Comércio local — Franca-SP',
    },
    {
      texto: 'Automatizamos o atendimento e hoje respondemos clientes em segundos. Antes levava horas. O impacto no faturamento apareceu em 30 dias. Valeu cada centavo investido.',
      resultado: 'Atendimento 5x mais rápido • +35% conversão',
      contexto: 'Prestador de serviços — Franca-SP',
    },
    {
      texto: 'A mentoria online me ajudou a estruturar o marketing digital do zero. Em 3 meses saímos do nada para uma presença digital consistente. Recomendo de olhos fechados.',
      resultado: '+180% tráfego orgânico em 3 meses',
      contexto: 'Indústria — Franca-SP',
    },
  ];

  return (
    <SectionWrapper dark>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Depoimentos</SectionLabel>
          <SectionTitle highlight="recomenda">
            Quem já viveu na pele
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[rgba(248,248,250,0.45)]">
            Feedback real de quem confiou no nosso trabalho e viu o resultado bater na porta.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {depoimentos.map((d) => (
            <motion.div
              key={d.texto.slice(0, 30)}
              variants={staggerItem}
              className="glass-card shine-effect group rounded-2xl p-6 sm:p-7 relative"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[rgba(201,168,76,0.1)]" />
              
              <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.65)]">&ldquo;{d.texto}&rdquo;</p>
              <div className="my-3 flex items-center gap-2 text-sm font-bold text-[#C9A84C]">
                <CheckCircle2 className="h-4 w-4" />
                {d.resultado}
              </div>
              <div className="border-t border-[rgba(255,255,255,0.06)] pt-3">
                <p className="text-xs text-[rgba(248,248,250,0.4)]">{d.contexto}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

/* ─── FAQ ─── */
const FaqSection = () => (
  <SectionWrapper>
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <SectionLabel>FAQ</SectionLabel>
        <SectionTitle highlight="frequentes" gradient="blue">
          Perguntas
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-lg text-sm text-[rgba(248,248,250,0.5)]">
          As dúvidas mais comais de quem está dando o primeiro passo.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className="space-y-3"
      >
        {faq.map((item) => (
          <motion.details
            key={item.q}
            variants={staggerItem}
            className="group glass-card overflow-hidden rounded-2xl transition-all duration-300"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-semibold text-white transition hover:bg-[rgba(255,255,255,0.02)] min-h-[44px]">
              <span className="flex-1">{item.q}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-[rgba(255,255,255,0.3)] transition duration-300 group-open:rotate-180" />
            </summary>
            <div className="border-t border-[rgba(255,255,255,0.06)] px-5 py-4">
              <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{item.r}</p>
            </div>
          </motion.details>
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);

/* ─── CTA Final ─── */
const CtaSection = () => (
  <SectionWrapper className="relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,87,255,0.1)_0%,transparent_60%)]" />
      <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#C9A84C] opacity-[0.04] blur-[100px]" />
      <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-[#0057FF] opacity-[0.05] blur-[100px]" />
    </div>

    {/* Grid overlay */}
    <div className="absolute inset-0 bg-grid-subtle" />

    <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
      <SectionLabel>Diagnóstico Gratuito</SectionLabel>
      <h2 className="font-serif mt-6 text-[clamp(1.8rem,5vw,3.5rem)] font-bold leading-tight text-white">
        Pronto para transformar seu{' '}
        <span className="text-gradient-gold">negócio</span>
        {' '}em uma máquina de vendas digital?
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[rgba(248,248,250,0.55)]">
        Agende um diagnóstico gratuito. Uma conversa sem compromisso para entender 
        seu negócio e mostrar exatamente o que está faltando para você vender mais online.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold group text-sm sm:text-base"
        >
          <MessageCircle className="h-4 w-4" />
          Quero meu Diagnóstico Gratuito
        </a>
        <Link to="/contato" className="btn-outline group text-sm sm:text-base">
          <Play className="h-4 w-4" />
          Enviar Mensagem
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Reveal>
  </SectionWrapper>
);

/* ─── Home Page ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicosSection />
      <DiferenciaisSection />
      <ComoFuncionaSection />
      <NichosSection />
      <DepoimentosSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
