/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/tracking';

const pains = [
  {
    short: 'Falta presença',
    title: 'Seu negócio precisa ser encontrado — e entendido.',
    text: 'Site claro, presença local e conteúdo que explicam o que você faz antes da primeira conversa.',
    service: 'criacao-de-sites-franca',
    label: 'Começar pela presença',
    steps: ['Busca local', 'Site com direção', 'Conversa qualificada'],
  },
  {
    short: 'O anúncio não vende',
    title: 'O clique chegou. O próximo passo está claro?',
    text: 'Campanha, oferta, página e atendimento precisam trabalhar juntos. Medimos o caminho inteiro.',
    service: 'gestao-de-trafego-franca',
    label: 'Revisar minha aquisição',
    steps: ['Anúncio relevante', 'Oferta e página', 'Venda acompanhada'],
  },
  {
    short: 'O contato esfria',
    title: 'A oportunidade não pode depender da memória.',
    text: 'Organizamos CRM, responsáveis e retomadas para você saber quem precisa de resposta e o que fazer.',
    service: 'implantacao-crm-franca',
    label: 'Organizar meu comercial',
    steps: ['Contato registrado', 'Próximo passo', 'Acompanhamento'],
  },
] as const;

export function PainSelector() {
  const [active, setActive] = useState(0);
  const id = useId();
  useEffect(() => {
    const intent = new URLSearchParams(location.search).get('utm_content');
    const options: Record<string, number> = {
      sites: 0,
      trafego: 1,
      crm: 2,
      followup: 2,
    };
    if (intent && intent in options) setActive(options[intent]);
  }, []);
  const pain = pains[active];
  return (
    <div className="pain-selector">
      <div className="pain-selector-title">
        <span className="status-dot" aria-hidden="true" />
        <p>Por onde faz sentido começar?</p>
      </div>
      <h2>Onde sua venda trava?</h2>
      <div
        className="pain-tabs"
        role="tablist"
        aria-label="Seu principal desafio"
      >
        {pains.map((item, index) => (
          <button
            key={item.short}
            id={`${id}-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const next =
                  (active + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
            onClick={() => {
              setActive(index);
            }}
          >
            {item.short}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="pain-panel"
        tabIndex={0}
      >
        <div className="path-diagram" aria-label={pain.steps.join(', depois ')}>
          {pain.steps.map((step, index) => (
            <div key={step}>
              <span className="path-node" aria-hidden="true">
                {index === 2 ? '↗' : `0${index + 1}`}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <h3>{pain.title}</h3>
        <p>{pain.text}</p>
        <Link
          className="text-link"
          data-event="click_cta_secundario"
          href={`/servicos/${pain.service}`}
        >
          {pain.label} <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="selector-foot">
        <span>Uma prioridade de cada vez.</span>
        <span>Seu contexto define o plano.</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const started = useRef(false);
  const [contacts, setContacts] = useState(40);
  const [rate, setRate] = useState(20);
  const [target, setTarget] = useState(25);
  const [ticket, setTicket] = useState(500);
  const extra = (contacts * (target - rate)) / 100;
  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
  const fields = [
    {
      id: 'contacts',
      label: 'Contatos no mês',
      value: contacts,
      set: setContacts,
      max: 100000,
      suffix: '',
    },
    {
      id: 'current',
      label: 'Fechamento atual (%)',
      value: rate,
      set: setRate,
      max: 100,
      suffix: '',
    },
    {
      id: 'target',
      label: 'Fechamento no cenário (%)',
      value: target,
      set: setTarget,
      max: 100,
      suffix: '',
    },
    {
      id: 'ticket',
      label: 'Ticket médio (R$)',
      value: ticket,
      set: setTicket,
      max: 1000000,
      suffix: '',
    },
  ];
  return (
    <div className="calculator">
      <div className="calculator-fields">
        {fields.map((field) => (
          <label key={field.id} htmlFor={`calc-${field.id}`}>
            {field.label}
            <input
              id={`calc-${field.id}`}
              type="number"
              min="0"
              max={field.max}
              onFocus={() => {
                if (!started.current) {
                  started.current = true;
                  track('calculator_start', { page: window.location.pathname });
                }
              }}
              onBlur={() => {
                track('calculator_use', { page: window.location.pathname });
                track('calculator_result', { page: window.location.pathname });
              }}
              inputMode="decimal"
              value={field.value}
              onChange={(event) => {
                field.set(
                  Math.min(
                    field.max,
                    Math.max(0, Number(event.target.value) || 0),
                  ),
                );
              }}
            />
          </label>
        ))}
      </div>
      <div className="calculator-result" aria-live="polite" aria-atomic="true">
        <span>Diferença de receita bruta no cenário</span>
        <output>{money.format(extra * ticket)}</output>
        <p>
          {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(
            extra,
          )}{' '}
          vendas de diferença no mês.
        </p>
        <small>
          Exemplo matemático com premissas editáveis. Não representa resultado
          de cliente, previsão ou lucro. Não inclui custos, impostos ou margem.
        </small>
        <a className="text-link" href="/go/whatsapp?src=calculator">
          Conversar sobre os números reais ↗
        </a>
      </div>
    </div>
  );
}
