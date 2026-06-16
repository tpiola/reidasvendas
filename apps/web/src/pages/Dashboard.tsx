import { TrendingUp, Users, DollarSign, MessageCircle, Eye, MousePointerClick, CheckCircle2, ArrowRight, ExternalLink, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { MetricsTable } from '@/components/dashboard/MetricsTable';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/hooks/useAnimation';

const stats = [
  { title: 'Leads no Mês', value: '247', change: '+12.4%', positive: true, icon: Users, subtitle: 'vs. mês anterior' },
  { title: 'Taxa de Conversão', value: '4.8%', change: '+0.6pp', positive: true, icon: TrendingUp, subtitle: 'média do período' },
  { title: 'Receita Estimada', value: 'R$ 48.200', change: '+18.2%', positive: true, icon: DollarSign, subtitle: 'projetos ativos' },
  { title: 'Interações WhatsApp', value: '892', change: '+32.1%', positive: true, icon: MessageCircle, subtitle: 'últimos 30 dias' },
];

const onboardingSteps = [
  { label: 'Integração inicial agendada', done: true },
  { label: 'Configuração de domínio e DNS', done: true },
  { label: 'Design system aprovado', done: true },
  { label: 'Integração com WhatsApp configurada', done: false },
  { label: 'Ferramentas de analytics instaladas', done: false },
  { label: 'Treinamento da equipe concluído', done: false },
  { label: 'Primeira campanha de marketing lançada', done: false },
];

const chartData = [
  { label: 'Jan', value: 42 },
  { label: 'Fev', value: 55 },
  { label: 'Mar', value: 48 },
  { label: 'Abr', value: 72 },
  { label: 'Mai', value: 88 },
  { label: 'Jun', value: 95 },
  { label: 'Jul', value: 84 },
  { label: 'Ago', value: 102 },
  { label: 'Set', value: 118 },
  { label: 'Out', value: 134 },
  { label: 'Nov', value: 156 },
  { label: 'Dez', value: 142 },
];

const trafficData = [
  { label: 'Seg', value: 320 },
  { label: 'Ter', value: 480 },
  { label: 'Qua', value: 410 },
  { label: 'Qui', value: 560 },
  { label: 'Sex', value: 620 },
  { label: 'Sáb', value: 380 },
  { label: 'Dom', value: 210 },
];

const topPages = [
  { label: '/', value: '8.240 visitas', change: '+5.2%', positive: true },
  { label: '/servicos', value: '3.120 visitas', change: '+12.8%', positive: true },
  { label: '/contato', value: '1.890 visitas', change: '-2.1%', positive: false },
  { label: '/blog/soberania-digital', value: '1.450 visitas', change: '+45.3%', positive: true },
  { label: '/blog/infraestrutura-vendas', value: '980 visitas', change: '+28.7%', positive: true },
];

export default function Dashboard() {
  const progressPct = Math.round((onboardingSteps.filter((s) => s.done).length / onboardingSteps.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#000000]">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashboardHeader />
        <main className="p-6">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-white">Visão Geral</h1>
            <p className="mt-1 text-sm text-[#71717A]">Métricas consolidadas da sua infraestrutura digital.</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard
                key={s.title}
                title={s.title}
                value={s.value}
                change={s.change}
                positive={s.positive}
                subtitle={s.subtitle}
                icon={<s.icon className="h-4 w-4" />}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Charts Row */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <PerformanceChart title="Leads por Mês" data={chartData} height={220} />
            <PerformanceChart
              title="Tráfego Semanal"
              data={trafficData}
              height={220}
            />
          </div>

          {/* Bottom Row */}
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Top Pages */}
            <div className="lg:col-span-3">
              <MetricsTable title="Páginas Mais Acessadas" data={topPages} />
            </div>

            {/* AI Insight Card */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-gradient-to-br from-[rgba(214,168,79,0.04)] to-transparent p-5 backdrop-blur-sm h-full">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] mb-4">
                  Insight IA
                </h3>
                <div className="flex flex-col items-center justify-center text-center h-[calc(100%-2rem)]">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.06)]">
                    <Eye className="h-5 w-5 text-[#D6A84F]" />
                  </div>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    Configure as chaves de IA nas configurações para receber análises preditivas e insights automáticos.
                  </p>
                  <a
                    href="/dashboard/config"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.2)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D6A84F] transition-all hover:bg-[rgba(214,168,79,0.08)]"
                  >
                    Configurar IA
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos Passos + Onboarding */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Onboarding Checklist */}
            <Reveal className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-[rgba(3,3,3,0.4)] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Checklist de Onboarding
                </h3>
                <span className="text-[10px] font-bold text-[#71717A]">{progressPct}%</span>
              </div>
              {/* Progress bar */}
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(214,168,79,0.08)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F5D68A] transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <ul className="space-y-2">
                {onboardingSteps.map((step) => (
                  <li key={step.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        step.done
                          ? 'bg-[rgba(214,168,79,0.15)] text-[#D6A84F]'
                          : 'border border-[rgba(214,168,79,0.15)] text-[#71717A]'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-[rgba(214,168,79,0.15)]" />
                      )}
                    </span>
                    <span className={`text-xs ${step.done ? 'text-[#71717A] line-through' : 'text-white'}`}>
                      {step.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Próximos Passos + Suporte */}
            <div className="space-y-6">
              <Reveal className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-gradient-to-br from-[rgba(214,168,79,0.04)] to-transparent p-6 backdrop-blur-sm">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] mb-4">
                  <Zap className="h-3.5 w-3.5" />
                  Próximos Passos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[10px] font-bold text-[#D6A84F]">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Complete o onboarding</p>
                      <p className="text-[10px] text-[#71717A]">Siga o checklist ao lado para configurar tudo</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[10px] font-bold text-[#D6A84F]">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Explore o portfólio</p>
                      <p className="text-[10px] text-[#71717A]">Inspire-se com cases de sucesso reais</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[10px] font-bold text-[#D6A84F]">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Agende sua mentoria</p>
                      <p className="text-[10px] text-[#71717A]">Sessão individual para acelerar resultados</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[10px] font-bold text-[#D6A84F]">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Ative a automação</p>
                      <p className="text-[10px] text-[#71717A]">Configure funis automatizados de vendas</p>
                    </div>
                  </li>
                </ul>
              </Reveal>

              {/* WhatsApp Support */}
              <Reveal className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-gradient-to-br from-[#D6A84F]/5 to-transparent p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.12)]">
                    <MessageCircle className="h-6 w-6 text-[#D6A84F]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">Precisa de ajuda?</h3>
                    <p className="mt-0.5 text-[11px] text-[#71717A]">
                      Nosso time de suporte está pronto para ajudar com qualquer dúvida.
                    </p>
                  </div>
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold shrink-0 text-[10px] px-3 py-2"
                  >
                    <MessageCircle className="h-3 w-3" />
                    Suporte
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
