import { Link } from 'react-router-dom';
import {
  ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap,
  MessageCircle, CheckCircle2, MapPin, Quote,
  TrendingUp, Shield, Zap, Target, Layers,
  Star, ChevronRight, ChevronLeft, Globe, ShoppingBag,
  Building2, HeartPulse, BookOpen, Briefcase, Play,
  Check, Sparkles, CreditCard, ArrowUpRight, ChevronDown,
  Users, Clock, DollarSign,
} from 'lucide-react';
import {
  motion, useScroll, useTransform, useSpring, animate, useInView,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { BRAND } from '@/lib/brand';
import {
  springTransition, springSoft, springGentle,
  SectionWrapper, staggerContainer, staggerItem,
  Reveal, SectionLabel, SectionTitle,
} from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';
import { GlassCard } from '@/components/GlassCard';
import { LuxuryDivider, SectionHeading, FeatureCard, ProcessStep } from '@/components/PremiumComponents';
import { FounderSection } from '@/components/FounderSection';

/* ─── Types ─── */
interface VideoSlide {
  src: string;
  poster?: string;
}

interface Category {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  items: {
    icon: React.ElementType;
    title: string;
    desc: string;
    cta: string;
  }[];
}

interface ProjectTemplate {
  title: string;
  category: string;
  image: string;
  tags: string[];
}

interface PricingPlan {
  name: string;
  desc: string;
  monthly: number;
  yearly: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

interface FaqItem {
  q: string;
  r: string;
}

/* ─── Counter Animation Hook ─── */
function useCounter(end: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString('pt-BR') + (end > 100 ? '%' : '');
      },
    });
    return () => controls.stop();
  }, [inView, end, duration]);
  return ref;
}

/* ─── DATA ─── */

const heroVideos: VideoSlide[] = [
  { src: '/videos/sentinela/7.mp4' },
  { src: '/videos/sentinela/4.mp4' },
  { src: '/videos/sentinela/8.mp4' },
  { src: '/videos/sentinela/10.mp4' },
];

const servicosData = [
  {
    icon: Monitor, title: 'Sites & Landing Pages', tagline: 'Seu negócio aberto 24h',
    desc: 'Seu negócio aberto 24h por dia, 7 dias por semana. Um site que carrega em 1.2s, aparece no Google e entrega leads no seu WhatsApp.',
    img: BRAND.images.services.sites,
  },
  {
    icon: Smartphone, title: 'Aplicativos Sob Medida', tagline: 'Cliente fiel na palma da mão',
    desc: 'App iOS/Android sob medida. Delivery sem comissão, catálogo que atualiza sozinho, fidelidade que traz o cliente de volta.',
    img: BRAND.images.services.apps,
  },
  {
    icon: Bot, title: 'Automação Comercial', tagline: 'Ela vende enquanto você vive',
    desc: 'CRM que alimenta o funil sozinho. Chatbot que qualifica antes de transferir. Disparo omnichannel que segue o lead até fechar.',
    img: BRAND.images.services.automations,
  },
  {
    icon: BarChart3, title: 'Dashboards em Tempo Real', tagline: 'Números. Palpite zero.',
    desc: 'Vendas, estoque, leads, ROI — tudo num painel vivo que atualiza em tempo real. Adeus planilha, olá governo dos dados.',
    img: BRAND.images.services.dashboards,
  },
  {
    icon: GraduationCap, title: 'Consultoria Digital', tagline: 'Estratégia, não curso',
    desc: 'Sessões individuais mês a mês. Você no comando, a gente na construção. Sem teoria vazia — só plano de ação e resultado mensurável.',
    img: BRAND.images.services.mentoria,
  },
  {
    icon: Zap, title: 'Soluções com IA', tagline: 'Inteligência que vende',
    desc: 'Chatbots inteligentes, análise preditiva de vendas, recomendação personalizada e automação cognitiva para seu negócio.',
    img: BRAND.images.services.dashboards,
  },
];

const categorias: Category[] = [
  {
    id: 'sites',
    icon: Monitor,
    title: 'Sites Premium',
    description: 'Presença digital profissional que vende 24h por dia',
    items: [
      { icon: Globe, title: 'Landing Pages', desc: 'Páginas de alta conversão com design premium e SEO integrado.', cta: 'Ver Sites' },
      { icon: ShoppingBag, title: 'E-commerce', desc: 'Loja virtual completa com checkout otimizado e gestão de produtos.', cta: 'Ver E-commerce' },
      { icon: Briefcase, title: 'Institucionais', desc: 'Site corporativo com identidade visual única e performance excepcional.', cta: 'Ver Institucionais' },
    ],
  },
  {
    id: 'apps',
    icon: Smartphone,
    title: 'Aplicativos',
    description: 'Apps nativos iOS/Android que engajam clientes',
    items: [
      { icon: ShoppingBag, title: 'App Delivery', desc: 'Delivery próprio sem taxa por venda. Catálogo, pedidos e pagamentos.', cta: 'Ver Delivery' },
      { icon: Star, title: 'Fidelidade', desc: 'Programa de pontos e cashback que traz o cliente de volta toda semana.', cta: 'Ver Fidelidade' },
      { icon: Users, title: 'App Corporativo', desc: 'Sistema mobile para equipe interna, estoque e gestão de tarefas.', cta: 'Ver Corporativo' },
    ],
  },
  {
    id: 'automacoes',
    icon: Bot,
    title: 'Automações',
    description: 'Processos que rodam 24h sem supervisão humana',
    items: [
      { icon: MessageCircle, title: 'Chatbot Inteligente', desc: 'Atendimento automático que qualifica leads antes de transferir.', cta: 'Ver Chatbot' },
      { icon: Zap, title: 'CRM Automatizado', desc: 'Funil de vendas que alimenta, nutre e acompanha cada lead sozinho.', cta: 'Ver CRM' },
      { icon: TrendingUp, title: 'Disparo Omnichannel', desc: 'E-mail, SMS, WhatsApp — sequência automática que segue o lead até fechar.', cta: 'Ver Disparo' },
    ],
  },
  {
    id: 'dashboards',
    icon: BarChart3,
    title: 'Dashboards',
    description: 'Painéis em tempo real para decisão baseada em dados',
    items: [
      { icon: TrendingUp, title: 'Vendas & ROI', desc: 'Receita, conversão, ticket médio. Tudo atualizado em tempo real.', cta: 'Ver Vendas' },
      { icon: Users, title: 'Equipe & Metas', desc: 'Performance individual, metas batidas, comissões calculadas automaticamente.', cta: 'Ver Equipe' },
      { icon: Target, title: 'Marketing & Tráfego', desc: 'CAC, ROAS, leads por canal. Decisão baseada em dado, palpite zero.', cta: 'Ver Marketing' },
    ],
  },
  {
    id: 'consultoria',
    icon: GraduationCap,
    title: 'Consultoria Digital',
    description: 'Estratégia personalizada mês a mês',
    items: [
      { icon: Target, title: 'Diagnóstico Digital', desc: 'Análise completa do negócio, concorrência e oportunidades.', cta: 'Agendar' },
      { icon: Zap, title: 'Plano de Ação', desc: 'Roadmap personalizado com metas, prazos e entregáveis claros.', cta: 'Ver Planos' },
      { icon: TrendingUp, title: 'Mentoria Mensal', desc: 'Acompanhamento contínuo com ajustes e otimização de resultados.', cta: 'Saber Mais' },
    ],
  },
  {
    id: 'ia',
    icon: Zap,
    title: 'Soluções com IA',
    description: 'Inteligência artificial aplicada ao seu negócio',
    items: [
      { icon: Bot, title: 'Chatbots com IA', desc: 'Atendimento inteligente que entende contexto e aprende com o tempo.', cta: 'Ver Chatbots' },
      { icon: BarChart3, title: 'Análise Preditiva', desc: 'Previsão de vendas, sazonalidade e comportamento do cliente.', cta: 'Ver Análise' },
      { icon: Sparkles, title: 'Automação Cognitiva', desc: 'Processos que tomam decisão sozinhos baseados em dados reais.', cta: 'Ver Automação' },
    ],
  },
];

const templates: ProjectTemplate[] = [
  { title: 'Calçados King', category: 'Site Premium', image: BRAND.images.nichos.calcadista, tags: ['E-commerce', 'Franca-SP'] },
  { title: 'Clínica Vitalis', category: 'App Saúde', image: BRAND.images.nichos.saude, tags: ['App', 'Agendamento'] },
  { title: 'Delícias do Chef', category: 'App Delivery', image: BRAND.images.nichos.comercio, tags: ['Delivery', 'Mobile'] },
  { title: 'TechSolution', category: 'Dashboard', image: BRAND.images.nichos.industria, tags: ['Painel', 'Tempo Real'] },
  { title: 'Escola Genius', category: 'Plataforma', image: BRAND.images.nichos.educacao, tags: ['Educação', 'CRM'] },
  { title: 'OfficePlus', category: 'Automação', image: BRAND.images.nichos.servicos, tags: ['BPM', 'Workflow'] },
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
  { nome: 'Calçadista', img: BRAND.images.nichos.calcadista, icon: Briefcase },
  { nome: 'Comércio', img: BRAND.images.nichos.comercio, icon: ShoppingBag },
  { nome: 'Indústria', img: BRAND.images.nichos.industria, icon: Building2 },
  { nome: 'Saúde', img: BRAND.images.nichos.saude, icon: HeartPulse },
  { nome: 'Educação', img: BRAND.images.nichos.educacao, icon: BookOpen },
  { nome: 'Serviços', img: BRAND.images.nichos.servicos, icon: Briefcase },
];

const processos = [
  { num: '01', title: 'Diagnóstico Digital', desc: 'Análise do negócio, concorrência, mercado e metas. Mapeamento do que existe, o que falta, o que precisa ser reconstruído.' },
  { num: '02', title: 'Arquitetura da Solução', desc: 'Estrutura tecnológica, fluxo de conversão, usabilidade. Projeto detalhado antes de escrever uma linha de código.' },
  { num: '03', title: 'Design Premium', desc: 'Identidade visual e interface com foco em conversão. Layouts validados antes de ir para desenvolvimento.' },
  { num: '04', title: 'Desenvolvimento Ágil', desc: 'Tecnologia de ponta. Sprints semanais. Entregas incrementais. Você vê o resultado a cada ciclo.' },
];

const planos: PricingPlan[] = [
  {
    name: 'Essencial',
    desc: 'Perfeito para quem está dando o primeiro passo na infraestrutura digital.',
    monthly: 147,
    yearly: 119,
    features: [
      'Site institucional ou landing page',
      'Design responsivo premium',
      'SEO básico otimizado',
      'Integração com WhatsApp',
      'Hospedagem 12 meses',
      'Suporte por e-mail',
    ],
    cta: 'Começar Agora',
  },
  {
    name: 'Profissional',
    desc: 'Para empresas que querem uma máquina de vendas completa.',
    monthly: 297,
    yearly: 247,
    features: [
      'Tudo do Essencial +',
      'Site + App ou Automação',
      'Dashboard em tempo real',
      'CRM integrado',
      'Chatbot inteligente',
      'Suporte prioritário 24h',
    ],
    highlighted: true,
    cta: 'Mais Escolhido',
  },
  {
    name: 'Enterprise',
    desc: 'Solução completa com infraestrutura digital de alto desempenho.',
    monthly: 597,
    yearly: 497,
    features: [
      'Tudo do Profissional +',
      'E-commerce ou plataforma',
      'Automações avançadas',
      'IA e análise preditiva',
      'Mentoria mensal exclusiva',
      'Suporte dedicado 24/7',
    ],
    cta: 'Falar com Consultor',
  },
];

const faq: FaqItem[] = [
  { q: 'Por que eu preciso de um site se tenho Instagram?', r: 'Instagram é aluguel. Você não controla o algoritmo, não é dono dos seus seguidores e muda as regras quando quer. Um site é seu — você controla, aparece no Google e os leads vão direto pro seu WhatsApp. Instagram complementa. Site é base.' },
  { q: 'Quanto custa? Vale a pena?', r: 'Cada projeto é único — o valor depende da complexidade. Mas o diagnóstico é gratuito. A pergunta certa não é "quanto custa", mas "quanto você está perdendo sem infraestrutura digital". Empresas com site vendem 3x mais.' },
  { q: 'E se eu não gostar do resultado?', r: 'Você valida cada etapa antes de avançarmos. Nada é feito "às cegas". Se em qualquer momento não estiver satisfeito, ajustamos. Sem estresse, sem burocracia.' },
  { q: 'Quanto tempo leva?', r: 'Diagnóstico em 48h. Projeto de infraestrutura digital: 2 a 8 semanas, dependendo da complexidade. Entrega incremental — você vê resultado em cada sprint.' },
  { q: 'Preciso saber programar?', r: 'Não. Você decide o que fazer. A gente faz acontecer. Zero envolvimento técnico.' },
  { q: 'Atendem empresas de qualquer porte?', r: 'MEI querendo sair do Instagram, indústria querendo escalar com automação. Tamanho não é filtro. Seriedade sim.' },
  { q: 'E depois da entrega?', r: 'Todo projeto inclui suporte. Planos de governança contínua: melhorias, segurança, funcionalidades novas. Seu projeto não morre na entrega.' },
];

/* ─── SECTION 1: HERO with Video Carousel ─── */
function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#030303]">
      <GoldParticles count={50} />

      {/* Video Carousel Background */}
      <motion.div style={{ y: heroY, scale }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-preview.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.3]"
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <source src={heroVideos[currentVideo].src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/85 to-[#030303]" />
      </motion.div>

      {/* Gold glow gradients */}
      <div className="absolute inset-0">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[rgba(214,168,79,0.06)] blur-[150px]" />
        <div className="absolute -bottom-[20%] -right-[20%] h-[50%] w-[50%] rounded-full bg-[rgba(214,168,79,0.04)] blur-[120px]" />
      </div>

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Gold line + badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle }}
          >
            <div className="mb-4">
              <div className="mb-3 h-px w-6 bg-[#D6A84F] opacity-60" />
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
                <MapPin className="mr-1.5 inline-block h-3 w-3" />
                Infraestrutura Digital • Franca-SP
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.15 }}
            className="mt-8 font-serif text-[clamp(2.8rem,7.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
          >
            Sua Empresa Precisa de uma{' '}
            <span className="text-gradient-premium">Infraestrutura Digital</span>
            <span className="block text-white">Não de um Site.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            Enquanto você toca o negócio, a gente constrói a máquina de vendas que trabalha 24h por dia, 7 dias por semana — sites, apps, automações e dashboards que realmente entregam resultado.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(214,168,79,0.2)',
                  '0 0 40px rgba(214,168,79,0.4)',
                  '0 0 20px rgba(214,168,79,0.2)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full"
            >
              <PremiumButton
                href={BRAND.whatsapp}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Diagnóstico Digital Gratuito
              </PremiumButton>
            </motion.div>
            <Link to="/servicos" className="btn-outline-gold group text-sm sm:text-base">
              Ver Soluções
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.45 }}
            className="mt-14"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(214,168,79,0.12)] bg-[rgba(214,168,79,0.03)] px-6 py-4 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-[#D6A84F]" />
              <span className="text-sm font-semibold text-[#A1A1AA]">
                12+ projetos entregues • 98% satisfação • Franca-SP
              </span>
            </div>
          </motion.div>

          {/* Video Carousel Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center gap-2"
          >
            {heroVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentVideo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentVideo ? 'w-8 bg-[#D6A84F]' : 'w-1.5 bg-[rgba(214,168,79,0.3)]'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── SECTION 2: Category Tabs ─── */
function CategoryTabsSection() {
  const [activeTab, setActiveTab] = useState(categorias[0].id);

  const activeCategory = categorias.find((c) => c.id === activeTab) ?? categorias[0];

  return (
    <SectionWrapper dark>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <SectionLabel>Amplie seus negócios</SectionLabel>
          <SectionTitle highlight="digital">
            Soluções completas para sua presença
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            De sites premium a automações com IA — cada solução é desenhada sob medida para o seu negócio em Franca-SP.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 min-h-[44px] ${
                activeTab === cat.id
                  ? 'bg-[#D6A84F] text-[#030303] shadow-[0_0_20px_rgba(214,168,79,0.3)]'
                  : 'border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] hover:border-[#D6A84F] hover:text-[#D6A84F]'
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-8 text-center text-sm text-[#D6A84F]">
              {activeCategory.description}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategory.items.map((item) => (
                <GlassCard key={item.title} hover glow className="hover-lift">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
                  <Link
                    to="/servicos"
                    className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F] transition-all hover:gap-2"
                  >
                    {item.cta}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 3: Template Carousel ─── */
function TemplateCarouselSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const itemsPerView = 3;
  const maxIdx = Math.max(0, templates.length - itemsPerView);

  const next = useCallback(() => {
    setCurrentIdx((prev) => Math.min(prev + 1, maxIdx));
  }, [maxIdx]);

  const prev = useCallback(() => {
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <SectionWrapper>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel>Portfólio</SectionLabel>
          <SectionTitle highlight="reais">
            Projetos que entregamos para clientes
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Cada projeto é único — construído do zero para resolver problemas reais de empresas em Franca-SP.
          </p>
        </Reveal>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIdx === 0}
            className="absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(214,168,79,0.2)] bg-[#030303] text-[#D6A84F] transition-all hover:bg-[rgba(214,168,79,0.1)] hover:shadow-[0_0_20px_rgba(214,168,79,0.15)] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIdx >= maxIdx}
            className="absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(214,168,79,0.2)] bg-[#030303] text-[#D6A84F] transition-all hover:bg-[rgba(214,168,79,0.1)] hover:shadow-[0_0_20px_rgba(214,168,79,0.15)] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards Track */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIdx * (100 / itemsPerView)}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 25 }}
              className="flex gap-6"
            >
              {templates.map((t, i) => (
                <motion.div
                  key={i}
                  className="min-w-[calc(33.333%-16px)] shrink-0"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative h-72 overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.1)]">
                    <img
                      src={t.image}
                      alt={t.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent" />
                    <div className="absolute inset-0 bg-[rgba(214,168,79,0.06)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="mb-2 inline-block rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(3,3,3,0.6)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D6A84F] backdrop-blur-sm">
                        {t.category}
                      </span>
                      <h3 className="font-serif mt-2 text-lg font-semibold text-white">{t.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[rgba(255,255,255,0.05)] px-2.5 py-0.5 text-[10px] text-[#A1A1AA]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIdx ? 'w-8 bg-[#D6A84F]' : 'w-2 bg-[rgba(214,168,79,0.2)]'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 4: Stat Bar ─── */
function StatBarSection() {
  const projectsRef = useCounter(12);
  const satisfactionRef = useCounter(98);
  const clientsRef = useCounter(50);
  const cityRef = useRef<HTMLSpanElement>(null);
  const inViewCity = useInView(cityRef, { once: true });
  useEffect(() => {
    if (inViewCity && cityRef.current) {
      cityRef.current.textContent = 'Franca-SP';
    }
  }, [inViewCity]);

  return (
    <section className="relative border-y border-[rgba(214,168,79,0.08)] bg-[#080808] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { ref: projectsRef, number: '', label: 'Projetos Entregues', suffix: '+' },
            { ref: satisfactionRef, number: '', label: 'Satisfação', suffix: '%' },
            { ref: clientsRef, number: '', label: 'Clientes Atendidos', suffix: '+' },
            { ref: cityRef, number: '', label: 'Atendimento Local', suffix: '' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="block font-serif text-4xl font-bold text-[#D6A84F] sm:text-5xl">
                <span ref={stat.ref as React.Ref<HTMLSpanElement>} />
                {stat.suffix}
              </span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.15em] text-[#A1A1AA]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: Features / Diferenciais ─── */
function FeaturesSection() {
  return (
    <SectionWrapper dark>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel>Diferenciais</SectionLabel>
          <SectionTitle highlight="Rei das Vendas">
            Por que o
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Não somos uma agência. Somos construtores de infraestrutura digital com metodologia, tecnologia e compromisso com resultado.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {diferenciais.map((d) => (
            <FeatureCard
              key={d.title}
              icon={<d.icon className="h-5 w-5" />}
              title={d.title}
              description={d.desc}
              className="hover-lift"
            />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 6: Segmentos ─── */
function SegmentosSection() {
  return (
    <SectionWrapper>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel>Segmentos</SectionLabel>
          <SectionTitle highlight="realidade de negócio">
            Soluções para cada
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Cada nicho tem suas particularidades. Nossa arquitetura se adapta — nunca o contrário.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {nichos.map((n) => (
            <motion.div
              key={n.nome}
              variants={staggerItem}
              className="group relative h-52 cursor-pointer overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.1)] hover-lift"
            >
              <img
                src={n.img}
                alt={n.nome}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[rgba(214,168,79,0.08)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(3,3,3,0.6)] px-4 py-1.5 text-xs font-semibold text-[#D6A84F] backdrop-blur-sm transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.2)]">
                  <n.icon className="h-3.5 w-3.5" />
                  {n.nome}
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 7: Founder (imported) ─── */
// FounderSection imported above

/* ─── SECTION 8: Prova Social (Depoimentos + Números) ─── */
function ProvaSection() {
  const depoimentos: {
    texto: string;
    resultado: string;
    contexto: string;
  }[] = [];

  return (
    <SectionWrapper dark>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel>Prova Social</SectionLabel>
          <SectionTitle highlight="falam por si">
            Resultados que
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Números, cases e depoimentos de quem já construiu a infraestrutura digital conosco.
          </p>
        </Reveal>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 grid gap-6 md:grid-cols-3 stagger-children"
        >
          {[
            { number: '12+', label: 'Projetos Entregues', desc: 'Sites, apps, automações e dashboards — cada um feito sob medida.' },
            { number: '98%', label: 'Satisfação', desc: 'Taxa de aprovação baseada em feedback pós-entrega.' },
            { number: 'Franca-SP', label: 'Atendimento Local', desc: 'Conhecemos o mercado da cidade. Presencial quando precisar.' },
          ].map((stat) => (
            <GlassCard key={stat.label} glow className="hover-lift">
              <div className="py-6 text-center">
                <span className="mb-1 block font-serif text-4xl font-bold text-[#D6A84F]">{stat.number}</span>
                <h3 className="mb-1 font-serif text-base font-semibold text-white">{stat.label}</h3>
                <p className="text-xs text-[#A1A1AA]">{stat.desc}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Social proof logos */}
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
              Empresas que confiam
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="rounded-xl border border-[rgba(214,168,79,0.08)] bg-[rgba(214,168,79,0.02)] px-6 py-4">
                <p className="text-xs italic text-[#8A8A92]">
                  Adicione aqui os logotipos reais dos seus clientes
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Depoimentos */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-1"
        >
          {depoimentos.length > 0 ? (
            depoimentos.map((d) => (
              <GlassCard key={d.texto.slice(0, 30)} glow>
                <Quote className="absolute right-4 top-4 h-8 w-8 text-[rgba(214,168,79,0.1)]" />
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
              <div className="py-8 text-center">
                <Quote className="mx-auto mb-4 h-10 w-10 text-[rgba(214,168,79,0.15)]" />
                <p className="mx-auto max-w-md text-sm leading-relaxed text-[#A1A1AA]">
                  Estamos coletando depoimentos dos primeiros projetos. Enquanto isso, veja nossos cases em andamento no Instagram.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.05)] px-4 py-1.5 text-xs font-semibold text-[#D6A84F]">
                  <MapPin className="h-3 w-3" />
                  @reidasvendas
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>

        <LuxuryDivider />
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 9: Processo (Timeline 4 etapas) ─── */
function ProcessoSection() {
  return (
    <SectionWrapper>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Process Steps */}
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel>Processo</SectionLabel>
              <SectionTitle highlight="etapas">
                Como construímos sua infraestrutura em 4
              </SectionTitle>
              <p className="mt-3 max-w-md text-sm text-[#A1A1AA]">
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
              <div className="glass-premium sticky top-28 rounded-2xl p-8 sm:p-10">
                <div className="text-center">
                  <div className="mb-4 inline-flex items-center gap-2.5">
                    <span className="block h-px w-6 bg-[#D6A84F]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                      Comece agora
                    </span>
                    <span className="block h-px w-6 bg-[#D6A84F]" />
                  </div>
                  <h3 className="font-serif mt-6 text-2xl font-bold text-white">
                    Pronto para construir sua{' '}
                    <span className="text-gradient-gold">máquina de vendas</span>?
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                    Agende um diagnóstico gratuito e descubra como estruturar sua infraestrutura digital — sites, apps, automações e dashboards que vendem 24h por dia.
                  </p>
                  <div className="mt-8 space-y-3">
                    <PremiumButton
                      href={BRAND.whatsapp}
                      size="lg"
                      className="w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Diagnóstico Digital Gratuito
                    </PremiumButton>
                    <Link to="/contato" className="btn-outline-gold w-full justify-center text-sm">
                      Enviar Mensagem <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mt-4 text-[10px] text-[#71717A]">
                    Mais de 12 empresas em Franca-SP já confiam • Resposta em até 24h
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 10: Pricing Preview ─── */
function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <SectionWrapper dark>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <SectionLabel>Planos</SectionLabel>
          <SectionTitle highlight="ideal">
            Escolha o plano
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Invista na infraestrutura digital do seu negócio com planos que cabem no seu bolso.
          </p>
        </Reveal>

        {/* Toggle */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-semibold transition-colors ${
              !isYearly ? 'text-[#D6A84F]' : 'text-[#A1A1AA]'
            }`}
          >
            Mensal
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              isYearly ? 'bg-[#D6A84F]' : 'bg-[rgba(255,255,255,0.1)]'
            }`}
            aria-label="Alternar para anual"
          >
            <motion.div
              animate={{ x: isYearly ? 28 : 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-lg"
            />
          </button>
          <span
            className={`text-sm font-semibold transition-colors ${
              isYearly ? 'text-[#D6A84F]' : 'text-[#A1A1AA]'
            }`}
          >
            Anual
            <span className="ml-1.5 rounded-full bg-[rgba(214,168,79,0.15)] px-2 py-0.5 text-[10px] text-[#D6A84F]">
              -20%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((plano, i) => (
            <motion.div
              key={plano.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 hover:border-[rgba(214,168,79,0.3)] hover:shadow-[0_0_40px_rgba(214,168,79,0.06)] ${
                plano.highlighted
                  ? 'border-[#D6A84F] bg-gradient-to-b from-[rgba(214,168,79,0.06)] to-[rgba(214,168,79,0.02)]'
                  : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]'
              }`}
            >
              {plano.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D6A84F] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#030303]">
                    <Sparkles className="h-3 w-3" />
                    Mais Popular
                  </span>
                </div>
              )}

              <h3 className="font-serif text-xl font-bold text-white">{plano.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{plano.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-white">
                  R${isYearly ? plano.yearly : plano.monthly}
                </span>
                <span className="text-sm text-[#A1A1AA]">/mês</span>
              </div>
              {isYearly && (
                <p className="mt-1 text-xs text-[#D6A84F]">
                  Economia de R${(plano.monthly - plano.yearly) * 12}/ano
                </p>
              )}

              <ul className="mt-6 space-y-3">
                {plano.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84F]" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <PremiumButton
                  href={BRAND.whatsapp}
                  variant={plano.highlighted ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plano.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </PremiumButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─── SECTION 11: FAQ Accordion ─── */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle highlight="frequentes">
            Perguntas
          </SectionTitle>
        </Reveal>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-3">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full rounded-xl border text-left transition-all duration-300 min-h-[44px] ${
                    openIndex === i
                      ? 'border-[rgba(214,168,79,0.25)] bg-[rgba(214,168,79,0.04)]'
                      : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] hover:border-[rgba(214,168,79,0.15)]'
                  }`}
                  aria-expanded={openIndex === i}
                >
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="pr-4 text-sm font-medium text-white">{item.q}</span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-4 w-4 text-[#D6A84F]" />
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[rgba(214,168,79,0.08)] px-5 pb-4 pt-3">
                          <p className="text-sm leading-relaxed text-[#A1A1AA]">{item.r}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <LuxuryDivider />

        {/* Final CTA */}
        <Reveal>
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Transforme Seu Negócio em uma{' '}
              <span className="text-gradient-gold">Máquina de Vendas Digitais</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Mais de 12 empresas em Franca-SP já confiam. Agende uma conversa sem compromisso.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <PremiumButton
                href={BRAND.whatsapp}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Quero Minha Infraestrutura Digital
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
}

/* ─── SECTION 12: CTA Final Banner (Gold / Form + WhatsApp) ─── */
function CtaFinalSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#D6A84F] to-[#B88932] py-20 sm:py-28">
      {/* Gold particles overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] -top-[10%] h-[300px] w-[300px] rounded-full bg-[rgba(255,255,255,0.1)] blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[250px] w-[250px] rounded-full bg-[rgba(255,255,255,0.08)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[rgba(3,3,3,0.1)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[rgba(3,3,3,0.7)]">
            Comece Hoje
          </span>

          <h2 className="font-serif mt-6 text-3xl font-bold leading-tight text-[#030303] sm:text-4xl md:text-5xl">
            Pronto para dar o próximo passo?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[rgba(3,3,3,0.7)]">
            Diagnóstico gratuito. Projeto sob medida. Mais de 12 empresas em Franca-SP já confiam no Rei das Vendas.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#030303] px-8 py-3 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(3,3,3,0.3)] active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Fale Conosco pelo WhatsApp
            </a>
            <Link
              to="/contato"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-[rgba(3,3,3,0.25)] px-8 py-3 text-sm font-bold text-[#030303] transition-all hover:bg-[rgba(3,3,3,0.06)] hover:shadow-[0_0_30px_rgba(3,3,3,0.1)] active:scale-[0.98]"
            >
              Enviar E-mail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[rgba(3,3,3,0.5)]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Resposta em até 24h
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Diagnóstico sem compromisso
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Franca-SP
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Banner Reutilizável ─── */
function CtaBanner({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
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
              Transforme seu negócio em uma{' '}
              <span className="text-gradient-gold">máquina de vendas digital</span>
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#A1A1AA]">
              Diagnóstico gratuito • Projeto sob medida • Mais de 12 empresas em Franca-SP confiam
            </p>
            <div className="mt-6">
              <PremiumButton
                href={BRAND.whatsapp}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Quero Minha Infraestrutura Digital
              </PremiumButton>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatBarSection />
      <CategoryTabsSection />
      <TemplateCarouselSection />
      <FeaturesSection />
      <SegmentosSection />
      <FounderSection />
      <ProvaSection />
      <ProcessoSection />
      <PricingSection />
      <FaqSection />
      <CtaFinalSection />
    </main>
  );
}
