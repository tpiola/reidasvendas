import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';

const PRINCIPLES = [
  {
    icon: Search,
    title: 'Entender antes de construir',
    description: 'O projeto começa pela realidade do negócio, pelos serviços, pelo público e pela forma como os clientes pesquisam e entram em contato.',
  },
  {
    icon: Smartphone,
    title: 'Pensar primeiro no celular',
    description: 'Cada página é planejada para leitura, navegação e contato em telas pequenas antes de ser adaptada para computadores.',
  },
  {
    icon: ShieldCheck,
    title: 'Publicar somente o que pode ser sustentado',
    description: 'Não usamos avaliações inventadas, resultados sem prova, garantias genéricas ou informações comerciais que não tenham sido confirmadas.',
  },
  {
    icon: Users,
    title: 'Explicar sem complicar',
    description: 'O cliente acompanha as decisões importantes sem precisar dominar termos técnicos, ferramentas ou configurações de desenvolvimento.',
  },
];

const RESPONSIBILITIES = [
  'Organização das páginas e da apresentação dos serviços',
  'Experiência responsiva e acessível no celular',
  'Conexão com WhatsApp, telefone, formulários e localização',
  'Preparação essencial para buscas e compartilhamento',
  'Testes técnicos e revisão das informações antes da publicação',
  'Orientação e suporte de acordo com o escopo contratado',
];

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(214,168,79,0.14),transparent_44%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <Reveal><SectionLabel>Sobre o Rei das Vendas</SectionLabel></Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">
                Sites profissionais para empresas que precisam ser encontradas e transmitir confiança.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
                O Rei das Vendas cria sites para negócios locais e organiza os pontos essenciais da presença online: serviços, informações comerciais, localização e canais de contato trabalhando juntos.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <PremiumButton href="/contato">Solicitar análise <ArrowRight className="h-4 w-4" /></PremiumButton>
                <Link to="/portfolio" className="btn-outline-gold">Ver projetos</Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <aside className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8" aria-label="Responsável pelo Rei das Vendas">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2D38A] to-[#B88932] font-serif text-2xl font-bold text-[#030303]" aria-hidden="true">TP</span>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">{BRAND.founder.name}</h2>
                  <p className="mt-1 text-sm text-[#D6A84F]">Direção de projeto e estratégia digital</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-[#A1A1AA]">{BRAND.founder.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#D4D4D8]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2"><MapPin className="h-3.5 w-3.5 text-[#D6A84F]" /> Franca, SP</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">{BRAND.founder.crf}</span>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <SectionLabel>Como trabalhamos</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">Autoridade demonstrada por organização, clareza e acabamento.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.08)] text-[#F2D38A]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-white">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Responsabilidade completa</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">O cliente não precisa coordenar vários fornecedores para colocar o site no ar.</h2>
            <p className="mt-5 text-base leading-7 text-[#A1A1AA]">Planejamento, construção, revisão e publicação são conduzidos de forma integrada, com os limites de cada projeto descritos antes do início.</p>
          </div>
          <ul className="grid gap-3 rounded-3xl border border-white/[0.08] bg-[#0D0D0D] p-6 sm:p-8">
            {RESPONSIBILITIES.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-[#D4D4D8]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84F]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-5xl">Sua empresa já tem valor. O site precisa deixar isso evidente.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#A1A1AA]">Envie o site atual ou o perfil da empresa no Google para receber uma leitura inicial dos pontos que merecem prioridade.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PremiumButton href="/contato">Solicitar análise <ArrowRight className="h-4 w-4" /></PremiumButton>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
