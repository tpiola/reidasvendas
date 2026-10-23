'use client';

import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import '@/styles/commercial-flow.css';

const stages = [
  {
    name: 'Diagnóstico',
    title: 'Primeiro, entender o seu negócio.',
    description:
      'Oferta, público, região e atendimento entram na conversa antes de definir a estrutura do site.',
    delivery: 'Uma prioridade clara para orientar a construção.',
    items: [
      'Objetivo da presença digital',
      'Serviços e público prioritários',
      'Caminho de contato',
    ],
  },
  {
    name: 'Estrutura e publicação',
    title: 'Uma presença com caminho de compra.',
    description:
      'Organizamos a mensagem, as páginas e o próximo passo. A publicação vem acompanhada de revisão no celular.',
    delivery: 'Site publicado, com escopo e responsabilidades combinados.',
    items: [
      'Conteúdo e navegação',
      'Página rápida e acessível',
      'Contato fácil de encontrar',
    ],
  },
  {
    name: 'Leads e WhatsApp',
    title: 'O contato chega com mais contexto.',
    description:
      'Botões conduzem à conversa. Quando a mensuração está configurada e autorizada, os cliques ajudam a avaliar esse caminho.',
    delivery: 'Uma passagem clara entre a página e o atendimento.',
    items: [
      'Mensagem inicial contextualizada',
      'Responsável pelo atendimento',
      'Clique não significa venda',
    ],
  },
  {
    name: 'Otimização e manutenção',
    title: 'O site continua sendo acompanhado.',
    description:
      'Revisamos funcionamento, conteúdo e oportunidades de melhoria conforme o plano contratado e os dados disponíveis.',
    delivery: 'Continuidade de cuidado, com limites de escopo definidos.',
    items: [
      'Manutenção combinada',
      'Revisão do caminho de contato',
      'Melhorias orientadas por evidência',
    ],
  },
] as const;

function FlowDiagram({ active }: { active: number }) {
  return (
    <svg
      className="commercial-flow-diagram"
      viewBox="0 0 560 330"
      aria-hidden="true"
      focusable="false"
    >
      <path className="flow-route" d="M133 87H427V243H133V87" />
      <path
        className="flow-route-direction"
        d="m273 80 9 7-9 7m161 62-7 9-7-9m-128 80-9 7 9 7m-166-78 7-9 7 9"
      />
      <g
        className={`flow-illustration-node ${active === 0 ? 'is-active' : ''}`}
      >
        <rect x="72" y="29" width="122" height="116" rx="20" />
        <circle cx="126" cy="77" r="23" />
        <path d="m143 95 16 16M114 77h24m-12-12v24" />
      </g>
      <g
        className={`flow-illustration-node ${active === 1 ? 'is-active' : ''}`}
      >
        <rect x="366" y="29" width="122" height="116" rx="20" />
        <path d="M399 60h56v55h-56zM410 72h34m-34 11h20m-20 19h17m10 0h7" />
      </g>
      <g
        className={`flow-illustration-node ${active === 2 ? 'is-active' : ''}`}
      >
        <rect x="366" y="185" width="122" height="116" rx="20" />
        <path d="M402 217h50v34h-23l-15 14v-14h-12v-34Zm12 12h26m-26 10h17" />
      </g>
      <g
        className={`flow-illustration-node ${active === 3 ? 'is-active' : ''}`}
      >
        <rect x="72" y="185" width="122" height="116" rx="20" />
        <path d="M111 240a23 23 0 0 1 39-16m4 21a23 23 0 0 1-39 16m36-46v12h-12m-27 42v-12h12" />
      </g>
      <circle className="flow-center" cx="280" cy="165" r="27" />
      <path className="flow-center-mark" d="m268 164 8 8 17-18" />
    </svg>
  );
}

/** Manual explanatory sequence. No autoplay, commercial metrics or customer records. */
export function CommercialFlow() {
  const [active, setActive] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const id = useId();
  const stage = stages[active];
  const selectWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = (index + 1) % stages.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index + stages.length - 1) % stages.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = stages.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-step-${next}`)?.focus();
    }
  };

  return (
    <div
      className="commercial-flow"
      data-input={keyboard ? 'keyboard' : 'pointer'}
      onKeyDownCapture={() => setKeyboard(true)}
      onPointerDownCapture={() => setKeyboard(false)}
    >
      <p className="flow-disclosure">
        Demonstração conceitual da assinatura. Selecione uma etapa.
      </p>
      <ol className="flow-stepper" aria-label="Como funciona o acompanhamento">
        {stages.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              id={`${id}-step-${index}`}
              aria-pressed={active === index}
              aria-controls={`${id}-detail`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => selectWithKeyboard(event, index)}
            >
              <span className="flow-step-number" aria-hidden="true">
                {index + 1}
              </span>
              <span>{item.name}</span>
              <span className="flow-step-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-detail" id={`${id}-detail`}>
        <div className="flow-art">
          <FlowDiagram active={active} />
        </div>
        <div className="flow-copy" aria-live="polite" aria-atomic="true">
          <p className="flow-step-label">
            Etapa {active + 1} de {stages.length} · {stage.name}
          </p>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
          <ul>
            {stage.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="flow-delivery">{stage.delivery}</p>
        </div>
      </div>
      <p className="flow-footnote">
        O diagrama explica o processo. Não representa leads reais, resultados ou
        promessa de vendas.
      </p>
    </div>
  );
}

const comparisons = [
  {
    name: 'Página sem caminho',
    title: 'O visitante precisa adivinhar o próximo passo.',
    description:
      'Informações dispersas, contato pouco visível e nenhuma rotina definida de revisão.',
    items: [
      'Mensagem sem prioridade',
      'Contato fora do contexto',
      'Atualização só quando algo quebra',
    ],
  },
  {
    name: 'Presença acompanhada',
    title: 'Cada parte ajuda a continuar a conversa.',
    description:
      'Oferta compreensível, caminho de contato e acompanhamento previsto no plano contratado.',
    items: [
      'Serviço e público bem explicados',
      'WhatsApp no momento de decisão',
      'Manutenção com escopo combinado',
    ],
  },
] as const;

function ComparisonDiagram({ connected }: { connected: boolean }) {
  return (
    <svg
      className="comparison-diagram"
      viewBox="0 0 560 330"
      aria-hidden="true"
      focusable="false"
    >
      <g className="comparison-grid-lines">
        <path d="M0 82h560M0 165h560M0 248h560M140 0v330M280 0v330M420 0v330" />
      </g>
      {connected ? (
        <g className="comparison-connected">
          <path
            className="comparison-connection"
            d="M180 165h57m88 0h55M280 205v54H136v-33"
          />
          <path
            className="comparison-connection"
            d="m228 159 9 6-9 6m143-12 9 6-9 6m-240 64 5-9 5 9"
          />
          <rect
            className="comparison-object"
            x="91"
            y="105"
            width="89"
            height="120"
            rx="10"
          />
          <path
            className="comparison-detail-line"
            d="M109 128h53m-53 14h36m-36 20h53m-53 11h53m-53 11h30"
          />
          <rect
            className="comparison-action"
            x="109"
            y="197"
            width="53"
            height="11"
            rx="3"
          />
          <circle className="comparison-object" cx="280" cy="165" r="43" />
          <path
            className="comparison-detail-line"
            d="M260 150h40v24h-17l-12 11v-11h-11v-24Zm10 9h20m-20 8h11"
          />
          <rect
            className="comparison-object"
            x="380"
            y="119"
            width="89"
            height="92"
            rx="10"
          />
          <path
            className="comparison-detail-line"
            d="m397 147 5 5 9-11m9 6h30m-53 23 5 5 9-11m9 6h30m-53 17h53"
          />
        </g>
      ) : (
        <g className="comparison-scattered">
          <rect
            className="comparison-object"
            x="80"
            y="72"
            width="100"
            height="112"
            rx="10"
          />
          <path
            className="comparison-detail-line"
            d="M97 96h65m-65 16h39m-39 20h65m-65 12h50m-50 12h58"
          />
          <rect
            className="comparison-object"
            x="235"
            y="143"
            width="90"
            height="104"
            rx="10"
          />
          <path
            className="comparison-detail-line"
            d="M250 167h59m-59 16h33m-33 17h59m-59 13h42m-42 13h51"
          />
          <rect
            className="comparison-object"
            x="385"
            y="81"
            width="89"
            height="87"
            rx="10"
          />
          <path
            className="comparison-detail-line"
            d="M402 105h53m-53 16h32m-32 18h44"
          />
          <path
            className="comparison-broken-route"
            d="M180 128h28m145 52h24m-247 23v22"
          />
        </g>
      )}
    </svg>
  );
}

/** Conceptual comparison, deliberately separate from the portfolio and case claims. */
export function BeforeAfter() {
  const [active, setActive] = useState(1);
  const id = useId();
  const item = comparisons[active];
  return (
    <div className="before-after">
      <div
        className="comparison-controls"
        role="group"
        aria-label="Comparar duas formas de presença digital"
      >
        {comparisons.map((option, index) => (
          <button
            type="button"
            key={option.name}
            aria-pressed={active === index}
            aria-controls={`${id}-comparison`}
            onClick={() => setActive(index)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="comparison-content" id={`${id}-comparison`}>
        <div className="comparison-art">
          <ComparisonDiagram connected={active === 1} />
        </div>
        <div className="comparison-copy" aria-live="polite" aria-atomic="true">
          <p className="flow-step-label">{item.name}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <ul>
            {item.items.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="flow-footnote">
        Comparação ilustrativa de estrutura e acompanhamento. Não é um antes e
        depois de cliente nem uma projeção de resultado.
      </p>
    </div>
  );
}
