'use client';

import { useEffect, useId, useState } from 'react';
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
              onBlur={() => track('calculator_use')}
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

const questions = [
  {
    label:
      'Sua empresa tem um próximo passo claro depois do anúncio ou da busca?',
    yes: 'Sim, o caminho está claro',
    no: 'Ainda não',
  },
  {
    label: 'Todo contato tem um responsável e uma data de retorno?',
    yes: 'Sim, está registrado',
    no: 'Depende da memória',
  },
  {
    label: 'Você sabe quais canais geram conversas que viram venda?',
    yes: 'Sim, acompanhamos',
    no: 'Ainda não medimos',
  },
];
export function MaturityQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [started, setStarted] = useState(false);
  const completed = Object.keys(answers).length === questions.length;
  const score = Object.values(answers).filter(Boolean).length;
  const recommendation =
    score < 2
      ? 'Comece organizando o caminho entre descoberta, contato e acompanhamento.'
      : 'Sua base parece organizada. A próxima conversa pode focar em medição e melhoria.';
  const update = (index: number, value: boolean) => {
    if (!started) {
      setStarted(true);
      track('quiz_start');
    }
    const next = { ...answers, [index]: value };
    setAnswers(next);
    if (!completed && Object.keys(next).length === 3)
      track('quiz_complete', {
        score: Object.values(next).filter(Boolean).length,
      });
  };
  return (
    <div className="maturity-quiz">
      <div className="quiz-questions">
        {questions.map((question, index) => (
          <fieldset key={question.label}>
            <legend>{question.label}</legend>
            <div>
              <button
                type="button"
                className={answers[index] === true ? 'is-selected' : ''}
                aria-pressed={answers[index] === true}
                onClick={() => update(index, true)}
              >
                {question.yes}
              </button>
              <button
                type="button"
                className={answers[index] === false ? 'is-selected' : ''}
                aria-pressed={answers[index] === false}
                onClick={() => update(index, false)}
              >
                {question.no}
              </button>
            </div>
          </fieldset>
        ))}
      </div>
      <div className="quiz-result" aria-live="polite">
        {completed ? (
          <>
            <span className="quiz-result-label">Sua leitura inicial</span>
            <h3>{score}/3 fundamentos presentes</h3>
            <p>{recommendation}</p>
            <p className="fine-print">
              Autoavaliação, sem diagnóstico profissional ou garantia de
              desempenho.
            </p>
            <a className="button" href={`/go/whatsapp?src=quiz&score=${score}`}>
              Conversar sobre meu cenário ↗
            </a>
          </>
        ) : (
          <>
            <span className="quiz-result-label">
              Três perguntas. Sem cadastro.
            </span>
            <h3>Antes de investir mais, enxergue a base.</h3>
            <p>
              Responda ao lado para receber uma orientação inicial. Seus dados
              de contato não são necessários.
            </p>
            <span className="quiz-count">
              {Object.keys(answers).length} de 3 respostas
            </span>
          </>
        )}
      </div>
    </div>
  );
}
