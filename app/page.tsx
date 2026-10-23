import Link from 'next/link';
import content from '@/data/content.json';
import portfolio from '@/data/portfolio.json';
import {
  Calculator,
  MaturityQuiz,
  PainSelector,
} from '@/components/Interactive';

const services = [
  {
    slug: 'criacao-de-sites-franca',
    name: 'Sites que conduzem à conversa',
    description:
      'Seu negócio bem explicado, rápido no celular e com um próximo passo claro.',
    category: 'Presença',
    className: 'service-featured',
  },
  {
    slug: 'gestao-de-trafego-franca',
    name: 'Tráfego com direção',
    description:
      'Campanhas conectadas à oferta, à página e ao que acontece depois do clique.',
    category: 'Aquisição',
    className: '',
  },
  {
    slug: 'social-media-franca',
    name: 'Conteúdo que sustenta a decisão',
    description:
      'Estratégia, calendário e criação para mostrar seu trabalho com consistência.',
    category: 'Relacionamento',
    className: '',
  },
  {
    slug: 'seo-local-franca',
    name: 'Sua empresa na busca local',
    description:
      'Site e presença no Google alinhados a quem procura pelo seu serviço.',
    category: 'Descoberta',
    className: '',
  },
  {
    slug: 'implantacao-crm-franca',
    name: 'CRM que sai da planilha',
    description:
      'Contatos, responsáveis e próximos passos organizados em um fluxo que a equipe usa.',
    category: 'Operação',
    className: '',
  },
  {
    slug: 'automacao-de-follow-up-franca',
    name: 'Retomadas sem perder o contexto',
    description:
      'Processos e automações para acompanhar oportunidades com cuidado e permissão.',
    category: 'Continuidade',
    className: '',
  },
  {
    slug: 'consultoria-comercial-franca',
    name: 'Clareza para decidir onde agir',
    description:
      'Leitura da operação, prioridades e plano de trabalho ligado ao seu cenário.',
    category: 'Estratégia',
    className: '',
  },
  {
    slug: 'diagnostico-de-funil-franca',
    name: 'Encontrar o ponto de perda',
    description:
      'Uma leitura do caminho entre descoberta, contato e proposta para definir a próxima intervenção.',
    category: 'Diagnóstico',
    className: '',
  },
];
const method = [
  [
    'Diagnóstico',
    'Entender antes de propor.',
    'Lemos oferta, canais, atendimento e acompanhamento para localizar o problema.',
  ],
  [
    'Arquitetura',
    'Uma prioridade. Um plano.',
    'Definimos escopo, sequência, responsabilidades e como o trabalho será avaliado.',
  ],
  [
    'Implantação',
    'Tirar o plano do papel.',
    'Construímos os ativos e conectamos os pontos que a operação realmente precisa.',
  ],
  [
    'Gestão',
    'Ver o que está acontecendo.',
    'Acompanhamos dados disponíveis, aprendizados e decisões em uma rotina combinada.',
  ],
  [
    'Escala',
    'Ampliar o que faz sentido.',
    'O próximo investimento considera evidência, capacidade de atendimento e margem.',
  ],
];
const faqs = [
  [
    'Vocês fazem só sites ou cuidam do marketing completo?',
    'Podemos atuar em um projeto específico ou conectar site, tráfego, conteúdo e processo comercial. O escopo nasce do seu contexto; você não precisa contratar tudo para começar.',
  ],
  [
    'Preciso contratar diagnóstico antes de fazer um site?',
    'Não para uma implantação direta com escopo definido. Operações com campanhas ativas, perda de oportunidades ou problemas de conversão podem precisar de uma análise profissional antes de escolher a intervenção.',
  ],
  [
    'Quanto custa e em quanto tempo fica pronto?',
    'Depende do escopo, das integrações e dos materiais disponíveis. Antes de começar, você recebe uma proposta com entregas, investimento, responsabilidades e prazo. Não publicamos uma promessa única para projetos diferentes.',
  ],
  [
    'O investimento em anúncios está incluído?',
    'A verba de mídia e a gestão são itens diferentes. A proposta informa os custos e as contas utilizadas. O orçamento de anúncios deve considerar sua margem, região e capacidade de atendimento.',
  ],
  [
    'Vocês garantem vendas ou primeira posição no Google?',
    'Não. Vendas e posicionamento dependem de fatores que vão além do site ou da campanha. Assumimos o escopo contratado, os critérios de entrega e a transparência na medição.',
  ],
  [
    'Atendem presencialmente em Franca?',
    'A Rei das Vendas tem foco em Franca/SP e região, com atendimento também a distância no Brasil. O formato das reuniões e da implantação é combinado na proposta.',
  ],
];

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Agência de marketing digital · Franca/SP
          </p>
          <h1 id="hero-title">
            Presença que atrai.
            <br />
            <span>Estrutura que vende.</span>
          </h1>
          <p className="hero-description">
            Sites, tráfego e social media conectados ao atendimento e à venda.
            Sua empresa com um caminho claro — da primeira busca à próxima
            conversa.
          </p>
          <div className="hero-actions">
            <a className="button" href="/go/whatsapp?src=hero">
              Falar com especialista <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/metodo"
              className="secondary-link"
              data-event="click_cta_secundario"
            >
              Entender o método <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-assurance">
            <span>Atendimento humano</span>
            <span>Escopo antes da execução</span>
            <span>Sem promessa de venda garantida</span>
          </div>
        </div>
        <div className="hero-interactive">
          <PainSelector />
        </div>
        <a
          className="hero-scroll"
          href="#servicos"
          aria-label="Conhecer os serviços"
        >
          <span aria-hidden="true">↓</span> Conheça o que podemos conectar
        </a>
      </section>

      <div className="trust-strip">
        <div className="container">
          <p>Franca, região e Brasil.</p>
          <span>Site + aquisição + atendimento</span>
          <span>Dados para decidir</span>
          <span>Contas e ativos sob seu controle</span>
        </div>
      </div>

      <section
        id="servicos"
        className="section container"
        aria-labelledby="services-title"
      >
        <div className="section-heading" data-reveal>
          <h2 id="services-title">
            O marketing precisa
            <br />
            chegar à venda.
          </h2>
          <div>
            <p>
              Uma peça bonita não resolve um caminho quebrado. Conectamos o que
              atrai clientes ao que sua equipe precisa para atender, acompanhar
              e fechar.
            </p>
            <Link className="text-link" href="/servicos">
              Explorar todos os serviços <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className={`service-card ${service.className}`}
              data-reveal
            >
              <div className="service-card-top">
                <span>{service.category}</span>
                <span className="service-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              {index === 0 && (
                <div className="site-path" aria-hidden="true">
                  <div className="site-path-line" />
                  <span>Encontrar</span>
                  <span>Entender</span>
                  <span>Conversar ↗</span>
                </div>
              )}
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="problem-section">
        <div className="container problem-layout">
          <div data-reveal>
            <h2>Mais visibilidade não corrige uma venda sem direção.</h2>
            <p>
              Às vezes, o problema não está em atrair mais gente. Está entre o
              interesse e a resposta.
            </p>
            <Link className="text-link" href="/diagnostico">
              Vamos localizar o ponto de perda ↗
            </Link>
          </div>
          <ul className="problem-list" data-reveal>
            <li>
              <span aria-hidden="true">↘</span>
              <div>
                <h3>O contato chega. O retorno não.</h3>
                <p>
                  Sem responsável e próximo passo, a oportunidade esfria no
                  WhatsApp.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">↘</span>
              <div>
                <h3>O investimento aparece. A origem da venda, não.</h3>
                <p>
                  Cliques isolados não dizem quais conversas tiveram qualidade.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">↘</span>
              <div>
                <h3>Tudo depende de uma pessoa.</h3>
                <p>
                  Conhecimento preso na memória deixa a operação difícil de
                  repetir.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="method-section" aria-labelledby="method-title">
        <div className="container">
          <div className="section-heading" data-reveal>
            <h2 id="method-title">
              Menos achismo.
              <br />
              Mais sequência.
            </h2>
            <div>
              <p>
                O rigor de um diagnóstico aplicado ao negócio: observar,
                identificar a causa, executar e acompanhar. Sem receita pronta
                para empresas diferentes.
              </p>
              <Link className="text-link" href="/metodo">
                Ver método em 3 minutos ↗
              </Link>
            </div>
          </div>
          <div className="method-steps">
            {method.map(([name, title, text], index) => (
              <article key={name} data-reveal>
                <span className="step-index">0{index + 1}</span>
                <p className="step-name">{name}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="proof-title">
        <div className="section-heading" data-reveal>
          <h2 id="proof-title">
            Evidência antes
            <br />
            de promessa.
          </h2>
          <div>
            <p>
              Um resultado só merece esse nome quando tem contexto, período e
              fonte. Veja o que pedimos para avaliar um projeto com seriedade.
            </p>
            <Link className="text-link" href="/resultados">
              Como avaliamos resultados ↗
            </Link>
          </div>
        </div>
        <div
          className="proof-feed"
          aria-label="Método, guias e critérios de trabalho"
        >
          {content.feed.map((item) => (
            <article data-reveal key={item.id}>
              <span className="feed-type">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="feed-footer">
                <span>Rei das Vendas</span>
                <Link href={item.href}>{item.cta} ↗</Link>
              </div>
            </article>
          ))}
        </div>
        <p className="evidence-note">
          Este feed reúne conteúdos e critérios de trabalho. Não apresenta
          depoimentos ou resultados de clientes.{' '}
          <Link href="/cases">Entenda nossa política de evidências.</Link>
        </p>
      </section>

      <section className="section container" aria-labelledby="portfolio-title">
        <div className="section-heading" data-reveal>
          <h2 id="portfolio-title">
            Trabalho que você
            <br />
            pode abrir.
          </h2>
          <div>
            <p>
              Projetos mantidos na conta pública de Thiago Piola. Explore a
              navegação e confira o código. São referências de execução técnica,
              sem promessa de resultado comercial.
            </p>
            <Link className="text-link" href="/cases">
              Como avaliamos uma evidência ↗
            </Link>
          </div>
        </div>
        <div className="portfolio-grid">
          {portfolio.map((project) => (
            <article key={project.id} className="portfolio-card">
              <p className="muted">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="portfolio-links">
                <a
                  className="text-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar projeto{' '}
                  <span className="sr-only">(abre em nova aba)</span> ↗
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver código <span className="sr-only">(abre em nova aba)</span>{' '}
                  ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="calculator-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <h2>
              Antes de aumentar a verba,
              <br />
              teste o raciocínio.
            </h2>
            <p>
              O que muda quando o mesmo volume de contatos encontra uma operação
              mais organizada? Edite as premissas e compare um cenário.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      <section className="section container" aria-labelledby="comparison-title">
        <div className="comparison-intro" data-reveal>
          <h2 id="comparison-title">
            De ações soltas
            <br />a um caminho acompanhado.
          </h2>
          <p>
            Uma mudança de organização, sem promessa de resultado automático.
          </p>
        </div>
        <div
          className="comparison-table"
          role="table"
          aria-label="Comparação entre operação dispersa e organizada"
        >
          <div role="row" className="comparison-head">
            <span role="columnheader">Ponto da operação</span>
            <span role="columnheader">Quando cada peça fica isolada</span>
            <span role="columnheader">O que procuramos organizar</span>
          </div>
          {[
            [
              'Site e campanha',
              'Mensagens diferentes, próximo passo confuso.',
              'Oferta, página e chamada alinhadas.',
            ],
            [
              'Atendimento',
              'Contato distribuído pela memória.',
              'Responsável e próxima ação definidos.',
            ],
            [
              'Decisão',
              'Impressão de quem falou mais alto.',
              'Dados disponíveis, contexto e prioridade.',
            ],
          ].map(([title, before, after]) => (
            <div role="row" key={title}>
              <span role="rowheader">{title}</span>
              <span role="cell">{before}</span>
              <span role="cell">{after}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="quiz-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <h2>
              Como está a base
              <br />
              da sua operação?
            </h2>
            <p>
              Uma leitura rápida para chegar à conversa com mais clareza. O
              resultado aparece aqui, sem pedir seu telefone.
            </p>
          </div>
          <MaturityQuiz />
        </div>
      </section>

      <section
        className="section container faq-layout"
        aria-labelledby="faq-title"
      >
        <div data-reveal>
          <h2 id="faq-title">O que vale esclarecer antes de contratar.</h2>
          <p>
            Investimento, responsabilidade e expectativa devem estar claros
            antes do primeiro trabalho.
          </p>
          <Link className="text-link" href="/faq">
            Ver todas as perguntas ↗
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">＋</span>
              </summary>
              <div>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner" data-reveal>
          <div>
            <p>Seu negócio tem um contexto. A conversa começa por ele.</p>
            <h2>
              Qual parte da sua
              <br />
              venda precisa de atenção?
            </h2>
          </div>
          <div>
            <a className="button" href="/go/whatsapp?src=final">
              Falar com especialista <span aria-hidden="true">↗</span>
            </a>
            <Link href="/diagnostico">Prefiro enviar meu desafio →</Link>
            <small>
              Conte o que você vende, para quem e onde sente dificuldade.
            </small>
          </div>
        </div>
      </section>
    </>
  );
}
