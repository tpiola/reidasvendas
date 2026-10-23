'use client';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { track } from '@/lib/tracking';
const intents = [
  {
    id: 'presenca',
    label: 'Não recebo contatos',
    title: 'O cliente precisa encontrar e entender seu negócio.',
    text: 'Comece pela oferta, pela região atendida e por um caminho curto até o contato. Um site bem explicado é uma base; demanda e atendimento continuam fazendo parte da venda.',
    href: '/sites-para-pequenos-negocios',
    cta: 'Revisar minha presença',
  },
  {
    id: 'conversao',
    label: 'Site não converte',
    title: 'Antes de trazer mais visitas, confira a próxima ação.',
    text: 'Uma revisão de oferta, navegação e formulário pode revelar onde o contato se perde. Sem dados suficientes, tratamos a mudança como hipótese e conferimos no uso real.',
    href: '/otimizacao-de-conversao',
    cta: 'Entender a revisão',
  },
  {
    id: 'followup',
    label: 'Retorno desorganizado',
    title: 'Cada oportunidade precisa de responsável e retorno.',
    text: 'Organize o atendimento e o registro das etapas. O painel integrado e os lembretes dependem de CRM, acesso e escopo contratados; não são números fictícios em um gráfico.',
    href: '/painel-de-leads',
    cta: 'Organizar meus contatos',
  },
  {
    id: 'seo',
    label: 'Busca local fraca',
    title: 'Seu serviço precisa responder à busca da sua região.',
    text: 'Confira as páginas, a indexação e as informações reais da empresa. SEO local exige manutenção e contexto; não há primeira posição garantida.',
    href: '/seo-local-franca',
    cta: 'Avaliar a busca local',
  },
  {
    id: 'assinatura',
    label: 'Quero continuidade',
    title: 'Uma assinatura precisa mostrar o trabalho de cada mês.',
    text: 'Compare implantação, páginas, conteúdo, ajustes e relatório. A proposta define o que entra, o que é extra e como encerrar, sem esconder o custo inteiro.',
    href: '/planos',
    cta: 'Comparar os planos',
  },
] as const;
export default function IntentNavigator() {
  const [active, setActive] = useState(0);
  const id = useId();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const intent = query.get('intent') || query.get('utm_content');
    const mapping: Record<string, number> = {
      sites: 0,
      presenca: 0,
      conversao: 1,
      crm: 2,
      followup: 2,
      seo: 3,
      assinatura: 4,
    };
    if (intent && Object.prototype.hasOwnProperty.call(mapping, intent))
      setActive(mapping[intent]);
    else if (query.get('utm_source') === 'google') setActive(3);
    else {
      try {
        const host = new URL(document.referrer).hostname;
        if (/^(?:www\.)?google\.com(?:\.br)?$/.test(host)) setActive(3);
      } catch {
        /* No readable referrer uses neutral intent. */
      }
    }
  }, []);
  const item = intents[active];
  return (
    <section
      className="subscription-section container intent-section"
      aria-labelledby={`${id}-title`}
    >
      <div className="subscription-heading">
        <div>
          <p className="subscription-kicker">Comece pelo que está travando</p>
          <h2 id={`${id}-title`}>
            Qual parte merece
            <br />
            atenção primeiro?
          </h2>
        </div>
        <p>
          Escolha seu cenário. A recomendação muda pelo problema, sem pedir seu
          telefone para mostrar o caminho.
        </p>
      </div>
      <div
        role="tablist"
        aria-label="Seu principal desafio"
        className="intent-tabs"
      >
        {intents.map((intent, index) => (
          <button
            type="button"
            key={intent.id}
            id={`${id}-${intent.id}`}
            role="tab"
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => {
              setActive(index);
              track('click_cta_secundario', {
                page: '/',
                placement: intent.id,
              });
            }}
            onKeyDown={(event) => {
              const direction =
                event.key === 'ArrowRight'
                  ? 1
                  : event.key === 'ArrowLeft'
                    ? -1
                    : 0;
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? intents.length - 1
                    : direction
                      ? (active + direction + intents.length) % intents.length
                      : undefined;
              if (next === undefined) return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`${id}-${intents[next].id}`)?.focus();
            }}
          >
            {intent.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${item.id}`}
        tabIndex={0}
        className="intent-panel"
      >
        <div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
        <Link
          href={item.href}
          className="text-link"
          data-event={
            item.href === '/planos'
              ? 'click_cta_planos'
              : 'click_cta_secundario'
          }
        >
          {item.cta} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
