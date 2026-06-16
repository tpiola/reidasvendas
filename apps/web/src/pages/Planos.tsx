import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, XCircle, Monitor, ShoppingCart, LayoutDashboard,
  Bot, Smartphone, Brain, HeadphonesIcon, Star, Shield, Zap, Clock,
  MessageCircle, BarChart3, Users, Globe, ChevronDown, CreditCard, Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, SectionTitle, staggerContainer, staggerItem, fadeInUp } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeading, LuxuryDivider } from '@/components/PremiumComponents';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Planos Data ─── */
const PLANOS = [
  {
    name: 'Digital',
    slug: 'digital',
    price: 97,
    desc: 'Presença digital profissional para empresas que querem começar com o pé direito.',
    popular: false,
    features: [
      'Site institucional premium (5 páginas)',
      'Domínio .com.br grátis (1 ano)',
      'Hospedagem otimizada',
      'Blog integrado',
      'SEO básico (estrutural + on-page)',
      'Design responsivo mobile-first',
      'Formulário de contato inteligente',
      'Integração WhatsApp',
      'Suporte por e-mail (48h)',
    ],
    highlighted: 'Ideal para profissionais liberais, clínicas, pequenos comércios e prestadores de serviço.',
  },
  {
    name: 'Profissional',
    slug: 'profissional',
    price: 247,
    desc: 'Tudo que sua empresa precisa para vender online com estrutura profissional.',
    popular: true,
    features: [
      'Tudo do plano Digital',
      'E-commerce completo (até 100 produtos)',
      'Painel administrativo (Dashboard)',
      'Automações de marketing (e-mail + WhatsApp)',
      'CRM básico integrado',
      'SEO avançado (técnico + conteúdo)',
      'Blog com estratégia de conteúdo',
      'Agendamento online',
      'Integração com redes sociais',
      'Suporte prioritário (24h)',
      'Relatórios mensais de performance',
    ],
    highlighted: 'Perfeito para lojas virtuais, restaurantes, clínicas com agenda e empresas em crescimento.',
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    price: 597,
    desc: 'Solução completa com inteligência artificial e prioridade total para sua empresa.',
    popular: false,
    features: [
      'Tudo do plano Profissional',
      'Aplicativo iOS/Android',
      'CRM enterprise com automação',
      'IA generativa integrada (chatbot inteligente)',
      'Dashboard avançado com analytics preditivos',
      'Automações ilimitadas',
      'API para integrações customizadas',
      'Suporte VIP (4h) com gerente dedicado',
      'Consultoria estratégica mensal',
      'Migração de dados inclusa',
      'Treinamento da equipe',
      'SLA de uptime 99,9%',
    ],
    highlighted: 'Para empresas que querem dominar o mercado com tecnologia de ponta e atendimento premium.',
  },
];

/* ─── Comparativo Concorrentes ─── */
const COMPARATIVO = [
  { feature: 'Site Profissional', rei: true, squarespace: true, wix: true, wp: true },
  { feature: 'Domínio Grátis', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'Blog Integrado', rei: true, squarespace: true, wix: true, wp: true },
  { feature: 'E-commerce Nativo', rei: true, squarespace: false, wix: true, wp: false },
  { feature: 'Dashboard Gerencial', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'Automações Marketing', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'CRM Integrado', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'App iOS/Android', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'IA Generativa', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'Suporte VIP', rei: true, squarespace: false, wix: false, wp: false },
  { feature: 'SEO Avançado', rei: true, squarespace: true, wix: true, wp: false },
  { feature: 'Consultoria Estratégica', rei: true, squarespace: false, wix: false, wp: false },
];

const CONCORRENTES_PRECOS = [
  { name: 'Rei das Vendas', plan: 'Digital', price: 'R$ 97/mês', color: 'text-[#D6A84F]', isBest: true },
  { name: 'Squarespace', plan: 'Personal', price: 'R$ 144/mês', color: 'text-white/70', isBest: false },
  { name: 'Wix', plan: 'Combo', price: 'R$ 128/mês', color: 'text-white/70', isBest: false },
  { name: 'WordPress (+plugins)', plan: 'Business', price: 'R$ 179/mês*', color: 'text-white/70', isBest: false },
];

/* ─── FAQ ─── */
const FAQ = [
  {
    q: 'Preciso de conhecimento técnico para gerenciar o site?',
    a: 'Não. Nós cuidamos de tudo — da criação à manutenção. Você só precisa enviar o conteúdo (textos e fotos). O resto é conosco. Se quiser fazer alterações, o painel é tão simples quanto usar o Instagram.',
  },
  {
    q: 'Quanto tempo demora para meu site ficar pronto?',
    a: 'Seu site profissional fica no ar em até 7 dias úteis. Para planos com e-commerce ou funcionalidades avançadas, o prazo é de 15 a 21 dias, dependendo da complexidade. Você receberá um cronograma detalhado antes de começarmos.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem multa, sem burocracia, sem letras miúdas. Você cancela quando quiser com um simples e-mail. Seu conteúdo fica disponível para exportação por 30 dias após o cancelamento.',
  },
  {
    q: 'E se eu não gostar do resultado?',
    a: 'Oferecemos garantia incondicional de 30 dias. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro. Sem questionamentos. Nosso risco, não o seu.',
  },
  {
    q: 'O domínio é realmente grátis?',
    a: 'Sim. Todos os planos incluem domínio .com.br grátis no primeiro ano. A partir do segundo ano, a renovação é feita diretamente com o provedor (cerca de R$ 40/ano). Sem surpresas.',
  },
  {
    q: 'O que acontece se meu site sair do ar?',
    a: 'Temos infraestrutura em cloud com SLA de 99,9% de uptime. Nos planos Profissional e Enterprise, monitoramento 24/7 com alertas em tempo real. Se algo acontecer, resolvemos antes de você perceber.',
  },
  {
    q: 'Vocês atendem empresas fora de Franca-SP?',
    a: 'Sim! Atendemos empresas em todo o Brasil. Toda a comunicação é remota via WhatsApp, e-mail e videoconferência. O resultado é o mesmo — ou melhor, já que focamos 100% na entrega digital.',
  },
];

/* ─── Depoimentos (placeholder) ─── */
const DEPOIMENTOS = [
  {
    nome: 'Carlos M.',
    empresa: 'Loja do Carlos — Franca, SP',
    texto: 'Em 7 dias meu site estava no ar. Em 30 dias, minhas vendas online já pagavam o investimento de 6 meses. O melhor custo-benefício que já fiz.',
    estrelas: 5,
  },
  {
    nome: 'Ana Paula S.',
    empresa: 'Clínica Bem Estar — Ribeirão Preto, SP',
    texto: 'O dashboard em tempo real transformou minha gestão. Agora vejo exatamente de onde vêm meus pacientes, quais horários têm mais procura e já automatizei 80% dos lembretes.',
    estrelas: 5,
  },
  {
    nome: 'Ricardo O.',
    empresa: 'Tech Solutions — Franca, SP',
    texto: 'Começamos com o plano Digital e em 3 meses migramos para o Enterprise. O app transformou a relação com nossos clientes. Suporte nota 10, sempre resolvendo rápido.',
    estrelas: 5,
  },
];

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
        open
          ? 'border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.04)]'
          : 'border-[rgba(255,255,255,0.06)] bg-transparent hover:border-[rgba(214,168,79,0.15)]'
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <span className="flex items-start gap-3 text-sm font-semibold text-white sm:text-base">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-xs font-bold text-[#D6A84F]">
            {String(index + 1).padStart(2, '0')}
          </span>
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#D6A84F] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-[#A1A1AA] sm:px-6 sm:pb-6 sm:pl-16">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Stripe Checkout Modal ─── */
function StripeCheckoutModal({
  isOpen,
  onClose,
  planSlug,
  planName,
  planPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  planSlug: string;
  planName: string;
  planPrice: number;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const r = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: planSlug, email, name }),
      });
      const data = await r.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.message || 'Erro ao criar checkout. Tente novamente.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente ou fale conosco.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md rounded-2xl border border-[rgba(214,168,79,0.2)] bg-[#080808] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)]">
            <CreditCard className="h-6 w-6 text-[#D6A84F]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">
            Assinar Plano {planName}
          </h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">
            <span className="text-2xl font-bold text-[#D6A84F]">R$ {planPrice}</span>
            <span className="text-[#71717A]">/mês</span>
          </p>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#A1A1AA]">Nome completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-white placeholder-[#71717A] outline-none transition-all duration-300 focus:border-[#D6A84F] focus:bg-[rgba(214,168,79,0.04)] focus:ring-1 focus:ring-[#D6A84F]/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#A1A1AA]">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-white placeholder-[#71717A] outline-none transition-all duration-300 focus:border-[#D6A84F] focus:bg-[rgba(214,168,79,0.04)] focus:ring-1 focus:ring-[#D6A84F]/30"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] py-3 text-sm font-bold text-[#030303] transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,168,79,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecionando para Stripe...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Ir para Pagamento — R$ {planPrice}/mês
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#71717A]">
            Pagamento 100% seguro via Stripe. Cartão de crédito, boleto ou PIX.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-center text-xs text-[#71717A] underline transition-colors hover:text-[#A1A1AA]"
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Planos() {
  const [stripeModal, setStripeModal] = useState<{
    slug: string;
    name: string;
    price: number;
  } | null>(null);
  return (
    <main>
      <GoldParticles count={30} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(214,168,79,0.10)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(214,168,79,0.05)_0%,transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Planos e Preços</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Invista no Digital da Sua Empresa{' '}
              <span className="text-gradient-gold">por Menos que um Estagiário</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Site profissional, domínio, blog, SEO, e-commerce, automações, CRM, app e IA — 
              tudo que sua empresa precisa para vender online, com suporte de verdade e preço que cabe no seu orçamento.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#D6A84F]" /> Garantia 30 dias
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#D6A84F]" /> Site em 7 dias
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-[#D6A84F]" /> Domínio grátis
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <HeadphonesIcon className="h-4 w-4 text-[#D6A84F]" /> Suporte real
              </span>
            </div>
          </Reveal>

          {/* Valor comparison banner */}
          <Reveal delay={0.35}>
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)] px-5 py-3">
              <p className="text-sm font-medium text-[#D6A84F]">
                <span className="text-white/80">Site profissional por </span>
                <span className="font-bold">R$ 97/mês</span>
                <span className="text-white/80"> = </span>
                <span className="font-bold">R$ 3,22/dia</span>
                <span className="text-white/80">. Menos que um cafezinho. ☕</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PLANOS ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-6 md:grid-cols-3 md:gap-8"
          >
            {PLANOS.map((plano) => {
              const Icon = plano.name === 'Digital' ? Monitor
                : plano.name === 'Profissional' ? BarChart3
                : Brain;

              return (
                <motion.div
                  key={plano.slug}
                  variants={staggerItem}
                  className={`group relative rounded-2xl border transition-all duration-500 ${
                    plano.popular
                      ? 'border-[#D6A84F] bg-[rgba(214,168,79,0.04)] shadow-[0_0_60px_rgba(214,168,79,0.06)] md:-mx-3 md:scale-[1.04]'
                      : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(214,168,79,0.2)] hover:bg-[rgba(214,168,79,0.02)]'
                  }`}
                >
                  {/* Popular badge */}
                  {plano.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#030303]">
                        <Star className="h-3 w-3" /> Mais Escolhido
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                        <Icon className="h-5 w-5" />
                      </div>
                      {plano.popular && (
                        <span className="rounded-full bg-[rgba(214,168,79,0.1)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D6A84F]">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Name & Price */}
                    <h3 className="mt-5 font-serif text-2xl font-bold text-white">{plano.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white sm:text-5xl">
                        R$ {plano.price}
                      </span>
                      <span className="text-sm text-[#71717A]">/mês</span>
                    </div>
                    <p className="mt-1 text-xs text-[#71717A]">
                      Faturamento mensal ou cobrança única com desconto
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                      {plano.desc}
                    </p>

                    {/* Highlight */}
                    <p className="mt-3 text-xs italic leading-relaxed text-[#D6A84F]/70">
                      {plano.highlighted}
                    </p>

                    {/* CTA */}
                    {plano.slug === 'enterprise' ? (
                      <Link
                        to={`/contato?plano=${plano.slug}`}
                        className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                          plano.popular
                            ? 'bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] text-[#030303] hover:shadow-[0_0_30px_rgba(214,168,79,0.3)]'
                            : 'border border-[rgba(214,168,79,0.2)] text-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:border-[#D6A84F]'
                        }`}
                      >
                        Falar com Consultor
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setStripeModal({ slug: plano.slug, name: plano.name, price: plano.price })}
                        className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                          plano.popular
                            ? 'bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] text-[#030303] hover:shadow-[0_0_30px_rgba(214,168,79,0.3)]'
                            : 'border border-[rgba(214,168,79,0.2)] text-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:border-[#D6A84F]'
                        }`}
                      >
                        Assinar Agora
                        <CreditCard className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}

                    {/* Divider */}
                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-[rgba(214,168,79,0.15)] to-transparent" />

                    {/* Features */}
                    <ul className="flex-1 space-y-3">
                      {plano.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84F]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ COMPARAÇÃO DE VALOR ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Comparativo de Preços</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle>
              Mais Barato que Squarespace, Wix e WordPress —{' '}
              <span className="text-gradient-gold">e Entrega Muito Mais</span>
            </SectionTitle>
          </Reveal>

          {/* Preços lado a lado */}
          <Reveal delay={0.2}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONCORRENTES_PRECOS.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                    item.isBest
                      ? 'border-[#D6A84F] bg-[rgba(214,168,79,0.04)] shadow-[0_0_30px_rgba(214,168,79,0.06)]'
                      : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  <p className={`text-sm font-semibold ${item.color}`}>{item.name}</p>
                  <p className="mt-1 text-xs text-[#71717A]">{item.plan}</p>
                  <p className={`mt-3 text-2xl font-bold ${item.color}`}>{item.price}</p>
                  {item.isBest && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[rgba(214,168,79,0.1)] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6A84F]">
                      <Zap className="h-3 w-3" /> Melhor Custo-Benefício
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tabela comparativa */}
          <Reveal delay={0.3}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[rgba(214,168,79,0.1)]">
                    <th className="pb-4 pr-4 font-semibold text-white">Funcionalidade</th>
                    <th className="pb-4 px-3 text-center font-semibold text-[#D6A84F]">Rei das Vendas</th>
                    <th className="pb-4 px-3 text-center font-semibold text-white/50">Squarespace</th>
                    <th className="pb-4 px-3 text-center font-semibold text-white/50">Wix</th>
                    <th className="pb-4 px-3 text-center font-semibold text-white/50">WordPress</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVO.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-[rgba(214,168,79,0.03)] ${
                        i % 2 === 0 ? 'bg-[rgba(255,255,255,0.01)]' : ''
                      }`}
                    >
                      <td className="py-3.5 pr-4 text-[#A1A1AA]">{row.feature}</td>
                      <td className="py-3.5 px-3 text-center">
                        {row.rei ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-[#D6A84F]" />
                        ) : (
                          <XCircle className="mx-auto h-4 w-4 text-[#71717A]" />
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.squarespace ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green-500/60" />
                        ) : (
                          <XCircle className="mx-auto h-4 w-4 text-[#71717A]" />
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.wix ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green-500/60" />
                        ) : (
                          <XCircle className="mx-auto h-4 w-4 text-[#71717A]" />
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.wp ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green-500/60" />
                        ) : (
                          <XCircle className="mx-auto h-4 w-4 text-[#71717A]" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-4 text-center text-xs text-[#71717A]">
              * Preços dos concorrentes baseados nos planos mais populares em junho/2026. 
              WordPress inclui custos médios de plugins premium, hospedagem e manutenção.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PROVA SOCIAL ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Resultados Reais</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle>
              Números que Falam por Si
            </SectionTitle>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { number: BRAND.stats.projects, label: 'Projetos Entregues', icon: BarChart3 },
                { number: BRAND.stats.satisfaction, label: 'Satisfação dos Clientes', icon: Users },
                { number: '7 dias', label: 'Prazo Médio de Entrega', icon: Clock },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-card group rounded-2xl p-6 text-center transition-all duration-300 hover:border-[rgba(214,168,79,0.2)]"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-white sm:text-4xl">
                      {stat.number}
                    </p>
                    <p className="mt-1 text-sm text-[#A1A1AA]">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Depoimentos */}
          <Reveal delay={0.2}>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {DEPOIMENTOS.map((dep) => (
                <div
                  key={dep.nome}
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-300 hover:border-[rgba(214,168,79,0.15)]"
                >
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: dep.estrelas }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D6A84F] text-[#D6A84F]" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-[#A1A1AA]">
                    &ldquo;{dep.texto}&rdquo;
                  </blockquote>
                  <div className="mt-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
                    <p className="text-sm font-semibold text-white">{dep.nome}</p>
                    <p className="text-xs text-[#71717A]">{dep.empresa}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Dúvidas Frequentes</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle>
              Tudo que Você Precisa Saber
            </SectionTitle>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-10 space-y-3"
            >
              {FAQ.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Comece Agora</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Sua Presença Digital Começa{' '}
              <span className="text-gradient-gold">Aqui e Agora</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Não é sobre ter um site. É sobre ter uma máquina de vendas funcionando 24 horas por dia, 
              7 dias por semana, enquanto você dorme. Por menos de R$ 3,22 por dia.
            </p>
          </Reveal>

          {/* Value reminder */}
          <Reveal delay={0.18}>
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)] px-4 py-2">
              <Zap className="h-4 w-4 text-[#D6A84F]" />
              <span className="text-xs font-medium text-[#D6A84F]">
                R$ 97/mês = R$ 3,22/dia — Menos que um cafezinho
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setStripeModal({ slug: 'digital', name: 'Digital', price: 97 })}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Assinar Plano Digital
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-8 py-3 text-base font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:shadow-[0_0_30px_rgba(214,168,79,0.1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com Consultor
              </a>
            </div>
          </Reveal>

          {/* Trust badges */}
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Garantia de 30 dias
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#D6A84F]" /> Site em 7 dias
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Domínio grátis
              </span>
              <span className="flex items-center gap-1.5">
                <HeadphonesIcon className="h-3.5 w-3.5 text-[#D6A84F]" /> Suporte humanizado
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-[#D6A84F]" /> Cancele quando quiser
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={stripeModal !== null}
        onClose={() => setStripeModal(null)}
        planSlug={stripeModal?.slug ?? ''}
        planName={stripeModal?.name ?? ''}
        planPrice={stripeModal?.price ?? 0}
      />
    </main>
  );
}
