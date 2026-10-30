'use client';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { track } from '@/lib/tracking';
const intents = [
  {
    id: 'presenca',
    label: 'Não recebo contatos',
    title: 'Sua oferta clara. O contato mais perto.',
    text: 'Mostre seu serviço, sua região e como pedir orçamento.',
    href: '/sites-para-pequenos-negocios',
    cta: 'Revisar minha presença',
  },
  {
    id: 'conversao',
    label: 'Site não converte',
    title: 'Seu visitante sabe como continuar?',
    text: 'Revise oferta, navegação e formulário para facilitar a decisão.',
    href: '/otimizacao-de-conversao',
    cta: 'Entender a revisão',
  },
  {
    id: 'followup',
    label: 'Retorno desorganizado',
    title: 'Organize o próximo retorno.',
    text: 'Organize contatos, responsáveis e retornos em um processo adequado à sua rotina.',
    href: '/painel-de-leads',
    cta: 'Organizar meus contatos',
  },
  {
    id: 'seo',
    label: 'Busca local fraca',
    title: 'Seja encontrado na sua região.',
    text: 'Conecte páginas de serviço, dados da empresa e presença nas buscas locais.',
    href: '/seo-local-franca',
    cta: 'Avaliar a busca local',
  },
  {
    id: 'assinatura',
    label: 'Quero continuidade',
    title: 'Mantenha seu site atualizado.',
    text: 'Compare os planos para manter conteúdo, ajustes e cuidado técnico.',
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
            Onde o digital
            <br />
            trava seu negócio?
          </h2>
        </div>
        <p>
          Escolha o desafio mais próximo da sua realidade e veja por onde
          podemos começar. Você explora antes de entrar em contato.
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
