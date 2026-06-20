import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, BarChart3, Users, CreditCard, MessageCircle,
  Database, Cpu, Shield, Puzzle, RefreshCw, Globe, Zap,
  CheckCircle2,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Apps / Extensões ─── */
const EXTENSIONS = [
  {
    name: 'n8n Automations',
    icon: Cpu,
    description: 'Automatize fluxos de trabalho entre apps sem código. Conecte CRM, e-mail, WhatsApp, planilhas e centenas de serviços.',
    badge: 'Grátis',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Automação',
    features: ['Trigger visual', '300+ integrações', 'Execução agendada'],
  },
  {
    name: 'Analytics Pro',
    icon: BarChart3,
    description: 'Painel analítico completo com métricas de tráfego, conversão, comportamento do usuário e relatórios exportáveis.',
    badge: 'Premium',
    badgeColor: 'text-[#D6A84F] border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.08)]',
    category: 'Dados',
    features: ['Tempo real', 'Funil de conversão', 'Exportação CSV/PDF'],
  },
  {
    name: 'CRM de Vendas',
    icon: Users,
    description: 'Gestão completa de relacionamento com clientes. Pipeline de vendas, histórico de contatos, tarefas e follow-up automático.',
    badge: 'Grátis',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Vendas',
    features: ['Pipeline visual', 'Histórico completo', 'Tarefas e lembretes'],
  },
  {
    name: 'Payment Gateway',
    icon: CreditCard,
    description: 'Receba pagamentos via PIX, cartão de crédito e boleto. Checkout transparente, parcelamento e conciliação automática.',
    badge: 'Premium',
    badgeColor: 'text-[#D6A84F] border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.08)]',
    category: 'Pagamentos',
    features: ['PIX integrado', 'Parcelamento', 'Conciliação'],
  },
  {
    name: 'Chatbot IA',
    icon: Bot,
    description: 'Atendimento automatizado com inteligência artificial. Tire dúvidas, qualifique leads e agende horários 24 horas por dia.',
    badge: 'Grátis',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Atendimento',
    features: ['Treinamento por URL', 'Agendamento', 'Histórico de chats'],
  },
  {
    name: 'E-mail Marketing',
    icon: MessageCircle,
    description: 'Dispare campanhas de e-mail segmentadas com templates prontos, automação de sequência e relatórios de abertura.',
    badge: 'Grátis',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Marketing',
    features: ['Templates prontos', 'Automação', 'Relatórios'],
  },
  {
    name: 'Database Cloud',
    icon: Database,
    description: 'Banco de dados gerenciado na nuvem com backup automático, replicação e escalonamento sob demanda.',
    badge: 'Premium',
    badgeColor: 'text-[#D6A84F] border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.08)]',
    category: 'Infraestrutura',
    features: ['Backup diário', 'Replicação', 'Escalonamento'],
  },
  {
    name: 'Security Shield',
    icon: Shield,
    description: 'Proteção completa contra ameaças: firewall, anti-malware, proteção DDoS e monitoramento de segurança 24/7.',
    badge: 'Premium',
    badgeColor: 'text-[#D6A84F] border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.08)]',
    category: 'Segurança',
    features: ['Firewall', 'Anti-malware', 'Monitoramento 24/7'],
  },
  {
    name: 'Form Builder',
    icon: Puzzle,
    description: 'Crie formulários personalizados com drag-and-drop. Integre com CRM, e-mail e Webhooks em segundos.',
    badge: 'Grátis',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Ferramentas',
    features: ['Drag-and-drop', 'Campos customizados', 'Webhooks'],
  },
];

export default function Extensions() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Marketplace de Apps</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Expanda o Poder do{' '}
              <span className="text-gradient-gold">Seu Site</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Integre apps e extensões poderosas ao seu site com um clique. Automatização,
              analytics, CRM, pagamentos e muito mais — tudo integrado.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Integração com 1 Clique
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-[#D6A84F]" /> Atualizações Automáticas
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Apps Verificados
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ GRID DE APPS ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXTENSIONS.map((app) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.name}
                  variants={staggerItem}
                  className="glass-card group flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${app.badgeColor}`}
                    >
                      {app.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="mt-4 font-serif text-lg font-bold text-white">{app.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                    {app.description}
                  </p>

                  {/* Features */}
                  <div className="mt-4 space-y-1.5">
                    {app.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-[#71717A]">
                        <CheckCircle2 className="h-3 w-3 text-[#D6A84F]" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  {/* Category tag */}
                  <div className="mt-3">
                    <span className="rounded-md bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-[10px] text-[#71717A]">
                      {app.category}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5">
                      Instalar App <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.1)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Precisa de uma Integração Específica?</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              App Sob Medida para{' '}
              <span className="text-gradient-gold">Seu Negócio</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Não encontrou o que precisa? Criamos extensões personalizadas para integrar
              seu site com qualquer sistema — ERP, API própria, sistemas legados e muito mais.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/contato">
                Solicitar App Personalizado <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Falar no WhatsApp <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> Desenvolvimento Ágil
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Documentação Completa
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Entrega por Etapas
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Suporte Técnico
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
