import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

export default function Governanca() {
  useEffect(() => {
    applySeo({
      title: 'Governança — Rei das Vendas',
      description: 'Transparência, LGPD e governança de dados. Consulte nossa Política de Privacidade e Termos de Uso.',
      canonicalPath: '/governanca',
      robots: 'noindex, follow',
    });
  }, []);

  return (
    <main className="page-surface min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--page-fg)] md:text-5xl">
            <span className="text-gradient-accent">Governança e Compliance</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--text-muted)] md:text-lg">
            Transparência com nossos clientes é o pilar da Rei das Vendas. Abaixo, os compromissos que regem nossa operação.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mx-auto mt-16 max-w-4xl space-y-10 px-6">
        {/* LGPD */}
        <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-bg)] p-8">
          <h2 className="text-xl font-semibold text-[color:var(--page-fg)]">Proteção de Dados (LGPD)</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
            <p>
              A Lei Geral de Proteção de Dados (Lei 13.709/2018) rege o tratamento de dados pessoais no Brasil. A Rei das Vendas atua como operadora de dados, tratando as informações dos clientes conforme a legislação.
            </p>
            <p>
              Coletamos apenas dados essenciais para a prestação dos serviços: nome, e-mail e telefone para contato e orçamento. Seus dados nunca são compartilhados com terceiros sem autorização explícita.
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Os dados coletados são armazenados em servidores seguros com criptografia em trânsito (TLS) e em repouso.</li>
              <li>Você pode solicitar a exclusão dos seus dados a qualquer momento via e-mail ou WhatsApp.</li>
              <li>Retemos os dados pelo período de vigência do contrato + 6 meses para cumprimento legal, salvo solicitação de exclusão.</li>
              <li>Não realizamos vendas de dados pessoais para terceiros ou plataformas de publicidade.</li>
            </ul>
          </div>
        </div>

        {/* Termos de Serviço */}
        <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-bg)] p-8">
          <h2 className="text-xl font-semibold text-[color:var(--page-fg)]">Termos de Serviço</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
            <p>
              A contratação dos serviços da Rei das Vendas é formalizada por proposta comercial com escopo, prazos e investimento definidos. Não há fidelidade obrigatória — os planos são mensais e podem ser cancelados a qualquer momento.
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Prazo de entrega da primeira versão: até 72h úteis após aprovação do escopo (landing pages e funis).</li>
              <li>Projetos de maior complexidade têm cronograma definido em contrato.</li>
              <li>Suporte via WhatsApp com resposta em até 24h em dias úteis.</li>
              <li>Garantia de 7 dias para ajustes críticos no escopo acordado após a entrega.</li>
            </ul>
          </div>
        </div>

        {/* Transparência */}
        <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-bg)] p-8">
          <h2 className="text-xl font-semibold text-[color:var(--page-fg)]">Transparência e Compliance</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
            <p>
              Todos os sites desenvolvidos incluem banner de cookies e política de privacidade em conformidade com a LGPD. Clientes que optam pelos planos Crescimento e Escala recebem adequação completa de privacidade.
            </p>
            <p>
              Não utilizamos técnicas de escassez artificial, timers falsos ou urgência fabricada em nossa comunicação. Cada proposta é baseada no escopo real do projeto.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/politica"
            className="btn-ghost inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-8 text-sm font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--page-fg)]"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/termos"
            className="btn-ghost inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-8 text-sm font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--page-fg)]"
          >
            Termos de Uso
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
