import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';

const FACTORS = [
  'Quantidade e profundidade das páginas',
  'Produção ou revisão de textos e imagens',
  'Formulários, agendamento ou integrações necessárias',
  'Número de serviços, unidades ou regiões atendidas',
  'Necessidade de manutenção e suporte após a publicação',
];

const STEPS = [
  ['1', 'Análise breve', 'Entendemos o momento da empresa, os serviços prioritários e o caminho de contato desejado.'],
  ['2', 'Recomendação', 'Indicamos somente as páginas, recursos e conexões que fazem sentido para o negócio.'],
  ['3', 'Proposta clara', 'O documento informa escopo, investimento, responsabilidades, revisões e suporte antes do início.'],
];

export default function Planos() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,111,24,0.14),transparent_44%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Investimento</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.04] text-text-primary sm:text-5xl md:text-6xl">
              O preço depende do que sua empresa realmente precisa.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
              Não usamos uma tabela genérica para vender recursos desnecessários. Primeiro analisamos a presença atual e depois apresentamos um escopo fechado, com investimento e responsabilidades definidos.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PremiumButton href="/diagnostico">Solicitar análise <ArrowRight className="h-4 w-4" /></PremiumButton>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>O que define o escopo</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-5xl">Cada empresa exige uma combinação diferente de páginas e recursos.</h2>
            <p className="mt-5 text-base leading-7 text-text-secondary">A proposta separa o que está incluído, o que depende do cliente e quais itens são opcionais. Nenhum valor ou condição é publicado antes de ser confirmado.</p>
          </div>
          <ul className="grid gap-3 rounded-3xl border border-text-primary/[0.08] bg-surface-2 p-6 sm:p-8">
            {FACTORS.map((factor) => (
              <li key={factor} className="flex gap-3 text-sm leading-6 text-text-secondary">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <SectionLabel>Como receber uma proposta</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-5xl">Três passos antes de iniciar.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {STEPS.map(([number, title, text]) => (
              <article key={number} className="rounded-3xl border border-text-primary/[0.08] bg-surface-3 p-6 sm:p-8">
                <span className="text-xs font-bold text-gold">0{number}</span>
                <h3 className="mt-5 font-serif text-2xl font-bold text-text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-5xl">Comece pela análise, não pela escolha de um pacote.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary">Envie o site atual, o perfil da empresa no Google ou uma descrição do negócio. A recomendação será baseada no que precisa ser corrigido e construído.</p>
          <div className="mt-8">
            <PremiumButton href="/diagnostico">Quero solicitar uma análise <ArrowRight className="h-4 w-4" /></PremiumButton>
          </div>
          <p className="mt-5 text-xs leading-5 text-text-muted">A análise inicial não representa garantia de posicionamento, vendas ou resultados específicos.</p>
        </div>
      </section>
    </main>
  );
}
