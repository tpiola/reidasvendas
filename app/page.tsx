/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp redirects require full navigation and a per-click event ID; never prefetch this endpoint. */
import Link from 'next/link';
import content from '@/data/content.json';
import portfolio from '@/data/portfolio.json';
import Pricing from '@/components/Pricing';
import IntentNavigator from '@/components/IntentNavigator';
import DynamicFeed from '@/components/DynamicFeed';
import { MaturityQuiz } from '@/components/MaturityQuiz';
import { CommercialFlow, BeforeAfter } from '@/components/CommercialFlow';
import { metadata as createMetadata } from '@/lib/site';

export const metadata = createMetadata(
  'Sites e presença digital por assinatura em Franca',
  'Site, SEO local, WhatsApp e manutenção com escopo e acompanhamento contínuo. Planos para pequenas empresas de Franca/SP, região e Brasil.',
  '/',
);

const modules = [
  {
    href: '/seo-local-franca',
    label: 'Ser encontrado',
    title: 'Presença na busca local.',
    text: 'Informações claras sobre serviço, região e contato. Uma base de SEO que pode ser mantida ao longo do tempo.',
    mark: '↗',
  },
  {
    href: '/whatsapp-que-vende',
    label: 'Facilitar o contato',
    title: 'WhatsApp com contexto.',
    text: 'O visitante chega à conversa sabendo o que procura. Sua equipe continua o atendimento com um próximo passo.',
    mark: '↗',
  },
  {
    href: '/painel-de-leads',
    label: 'Acompanhar oportunidades',
    title: 'Contatos fora da memória.',
    text: 'Uma visão do caminho comercial quando o escopo e as integrações permitem. Recursos adicionais são avaliados na proposta.',
    mark: '↗',
  },
  {
    href: '/manutencao-de-site',
    label: 'Manter a base',
    title: 'Cuidado depois da entrega.',
    text: 'Revisões técnicas, atualizações compatíveis e uma capacidade definida para pequenos ajustes.',
    mark: '↗',
  },
  {
    href: '/otimizacao-de-conversao',
    label: 'Revisar o caminho',
    title: 'Melhorias com uma razão.',
    text: 'Oferta, leitura e chamadas para contato podem ser revisadas com base nas perguntas e nos dados disponíveis.',
    mark: '↗',
  },
  {
    href: '/automacao-comercial',
    label: 'Conectar a operação',
    title: 'Automação com responsabilidade.',
    text: 'Integrações e retomadas dependem de escopo, consentimento e capacidade de atendimento. Nada de prometer um comercial no piloto automático.',
    mark: '↗',
  },
];
const method = [
  ['Entender', 'Negócio, público e ponto de partida.'],
  ['Definir', 'Escopo, materiais e critérios de entrega.'],
  ['Construir', 'Site, conteúdo e caminhos de contato.'],
  ['Publicar', 'Conferência técnica e ativação da base.'],
  ['Acompanhar', 'Entregas e indicadores disponíveis.'],
  ['Evoluir', 'Ajustes dentro da capacidade contratada.'],
];
const questions = [
  [
    'O que significa site por assinatura?',
    'É a combinação de um trabalho inicial de implantação com uma rotina recorrente de cuidado e entregas. Não é um software que você precisa montar sozinho. O escopo informa o que será construído e o que continua depois da publicação.',
  ],
  [
    'A assinatura inclui tudo o que meu negócio precisar?',
    'Não. Cada plano tem limite de páginas, conteúdo e ajustes. Anúncios, redes sociais, licenças e integrações específicas só entram quando previstos na proposta. Trabalho recorrente não significa trabalho ilimitado.',
  ],
  [
    'Vou receber uma quantidade garantida de clientes?',
    'Não. O site ajuda a apresentar a oferta e a facilitar o contato, mas volume e qualidade de oportunidades dependem de demanda, região, investimento, preço, atendimento e outros fatores. Medimos o que estiver disponível sem prometer vendas ou posições na busca.',
  ],
  [
    'Posso contratar um projeto sem assinatura?',
    'Sim. Há projetos de implantação e serviços avulsos. A escolha depende do que precisa ser entregue e da continuidade que sua operação deseja. Podemos comparar os caminhos antes de elaborar a proposta.',
  ],
  [
    'Minha empresa precisa estar em Franca?',
    'O foco local é Franca/SP e região, com atendimento também a distância no Brasil. Materiais, reuniões e aprovação de conteúdo são combinados conforme o projeto.',
  ],
];

export default function Home() {
  return (
    <>
      <section
        className="subscription-hero hero"
        aria-labelledby="subscription-hero-title"
      >
        <div className="container subscription-hero-grid">
          <div className="subscription-hero-copy">
            <p className="subscription-kicker">
              Assinatura de presença digital · Franca/SP
            </p>
            <h1 id="subscription-hero-title">
              Seu site no ar.
              <br />
              <span>
                Sua presença
                <br />
                em evolução.
              </span>
            </h1>
            <p className="subscription-hero-description">
              Site, busca local, WhatsApp e manutenção em uma rotina definida.
              Você apresenta seu negócio com clareza e sabe o que será cuidado
              depois da publicação.
            </p>
            <div className="subscription-hero-actions">
              <a
                className="button subscription-button-gold"
                href="#planos"
                data-event="click_cta_planos"
              >
                Ver planos <span aria-hidden="true">↓</span>
              </a>
              <a
                className="subscription-dark-link"
                href="/go/whatsapp?src=hero"
              >
                Conversar sobre meu negócio <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="subscription-hero-location">
              Franca/SP · região · atendimento no Brasil
            </p>
          </div>
          <aside
            className="subscription-hero-summary"
            aria-label="Como a assinatura é composta"
          >
            <div
              className="subscription-hero-brand"
              aria-hidden="true"
              data-scroll-parallax
            >
              <img src="/logo/simbolo.svg" alt="" width="124" height="124" />
            </div>
            <p className="subscription-summary-intro">
              O site é o começo.
              <br />{' '}O trabalho continua.
            </p>
            <div className="subscription-summary-row">
              <span>Implantação</span>
              <p>Uma base construída para a sua oferta.</p>
            </div>
            <div className="subscription-summary-row">
              <span>Recorrência</span>
              <p>Cuidado e entregas dentro de um escopo.</p>
            </div>
            <div className="subscription-summary-row">
              <span>Clareza</span>
              <p>Limites, investimento e próximos passos visíveis.</p>
            </div>
            <Link className="subscription-dark-link" href="/metodo">
              Entenda a sequência de trabalho ↗
            </Link>
          </aside>
        </div>
        <div className="subscription-hero-bottom container">
          <span>Um projeto para o seu negócio.</span>
          <span>Uma rotina para manter a base.</span>
          <span>Uma proposta antes de qualquer cobrança.</span>
        </div>
      </section>

      <IntentNavigator />

      <section
        className="subscription-section container"
        aria-labelledby="continuity-title"
      >
        <div className="subscription-heading">
          <h2 id="continuity-title">
            Publicar resolve a estreia.
            <br />
            Quem cuida do dia seguinte?
          </h2>
          <p>
            O horário muda. Uma oferta sai de linha. O cliente faz uma pergunta
            que o site não responde. A assinatura cria uma rotina para esse
            trabalho não ficar sempre para depois.
          </p>
        </div>
        <div className="subscription-continuity">
          <article data-reveal>
            <span aria-hidden="true">↗</span>
            <h3>Uma base bem explicada.</h3>
            <p>
              Seu serviço, sua região e seu contato apresentados para quem está
              decidindo.
            </p>
          </article>
          <article data-reveal>
            <span aria-hidden="true">↗</span>
            <h3>Uma continuidade combinada.</h3>
            <p>
              Entregas recorrentes e ajustes com limites que você conhece antes
              de contratar.
            </p>
          </article>
          <article data-reveal>
            <span aria-hidden="true">↗</span>
            <h3>Uma leitura do que aconteceu.</h3>
            <p>
              Relatório das entregas e dos indicadores disponíveis, sem
              confundir clique com venda.
            </p>
          </article>
        </div>
      </section>

      <section className="subscription-flow-section">
        <div className="container">
          <div className="subscription-heading">
            <h2>
              Do primeiro interesse
              <br />à próxima conversa.
            </h2>
            <p>
              O site faz parte de um caminho. Encontrar, entender a oferta,
              entrar em contato e dar continuidade precisam fazer sentido
              juntos.
            </p>
          </div>
          <CommercialFlow />
        </div>
      </section>

      <section
        className="subscription-section container"
        aria-labelledby="modules-title"
      >
        <div className="subscription-heading">
          <h2 id="modules-title">
            Cada parte tem
            <br />
            uma função comercial.
          </h2>
          <div>
            <p>
              Uma base conectada por etapas. Os módulos abaixo mostram o que
              pode ser organizado; a inclusão em cada plano ou projeto é
              definida na proposta.
            </p>
            <Link className="text-link" href="/servicos">
              Ver todos os serviços ↗
            </Link>
          </div>
        </div>
        <div className="subscription-module-grid">
          {modules.map((module) => (
            <Link
              href={module.href}
              key={module.href}
              className="subscription-module"
              data-reveal
            >
              <div>
                <span>{module.label}</span>
                <span aria-hidden="true">{module.mark}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="planos"
        className="subscription-plans-section"
        aria-labelledby="pricing-title"
      >
        <div className="container">
          <div className="subscription-heading">
            <div>
              <p className="subscription-kicker">
                Implantação + acompanhamento
              </p>
              <h2 id="pricing-title">
                Escolha uma base.
                <br />
                Conheça a continuidade.
              </h2>
            </div>
            <div>
              <p>
                Três escopos para comparar capacidade, rotina e investimento. A
                escolha abre uma conversa para confirmar se o plano atende sua
                empresa.
              </p>
              <Link className="text-link" href="/planos">
                Comparar planos e condições ↗
              </Link>
            </div>
          </div>
          <Pricing />
        </div>
      </section>

      <section
        className="subscription-section container"
        aria-labelledby="method-title"
      >
        <div className="subscription-heading">
          <h2 id="method-title">
            Uma sequência clara,
            <br />
            da leitura à evolução.
          </h2>
          <p>
            O método evita começar pelo desenho e descobrir o objetivo no final.
            Cada etapa prepara a próxima, com responsabilidade e critério de
            entrega.
          </p>
        </div>
        <ol className="subscription-method">
          {method.map(([title, text], index) => (
            <li key={title} data-reveal>
              <span className="subscription-method-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Link className="text-link" href="/metodo">
          Ver como trabalhamos ↗
        </Link>
      </section>

      <section className="subscription-comparison-section">
        <div className="container">
          <div className="subscription-heading">
            <h2>
              Uma base que muda
              <br />a forma de acompanhar.
            </h2>
            <p>
              Esta comparação explica a organização pretendida. Não apresenta
              resultado de cliente nem garante que a implantação, sozinha,
              aumente as vendas.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      <section
        className="subscription-section container"
        aria-labelledby="portfolio-title"
      >
        <div className="subscription-heading">
          <h2 id="portfolio-title">
            Projetos que você
            <br />
            pode abrir e conhecer.
          </h2>
          <div>
            <p>
              Três projetos do portfólio próprio, com site e repositório
              públicos verificados. Mostram execução e formas de organizar
              conteúdo — sem atribuir retorno financeiro.
            </p>
            <Link className="text-link" href="/cases">
              Conhecer o contexto dos projetos ↗
            </Link>
          </div>
        </div>
        <div className="subscription-portfolio">
          {portfolio.map((project) => (
            <article key={project.id} data-reveal>
              <span className="subscription-project-category">
                {project.category}
              </span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.observedFeatures.slice(0, 2).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${project.title}, em nova aba`}
              >
                Abrir o projeto <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="subscription-evidence-note">
          Projetos próprios não equivalem a casos comerciais auditados.
          Recursos, dados e vínculos de cada projeto estão descritos na página
          de evidências.
        </p>
      </section>

      <section className="subscription-tools-section">
        <div className="container">
          <div className="subscription-heading">
            <h2>
              Antes de escolher o plano,
              <br />
              olhe para o seu cenário.
            </h2>
            <div>
              <p>
                Uma leitura rápida ajuda a preparar a conversa. O questionário
                não pede seu telefone; o simulador trabalha com hipóteses que
                você pode editar.
              </p>
              <Link className="text-link" href="/simulador">
                Abrir simulador de oportunidade ↗
              </Link>
            </div>
          </div>
          <MaturityQuiz />
        </div>
      </section>

      <section
        className="subscription-section container"
        aria-labelledby="content-title"
      >
        <div className="subscription-heading">
          <h2 id="content-title">
            Conteúdo para decidir
            <br />
            com mais contexto.
          </h2>
          <Link className="text-link" href="/blog">
            Explorar os guias ↗
          </Link>
        </div>
        <DynamicFeed items={content.feed} />
      </section>

      <section className="subscription-services-note">
        <div className="container">
          <div>
            <h2>
              Precisa de tráfego,
              <br />
              social media ou consultoria?
            </h2>
            <p>
              A Rei das Vendas também atua nessas frentes. Gestão de anúncios,
              redes sociais e projetos comerciais são avaliados em escopo
              separado; a assinatura não inclui tudo por padrão.
            </p>
          </div>
          <Link href="/servicos" className="button">
            Explorar os serviços ↗
          </Link>
        </div>
      </section>

      <section
        className="subscription-section container subscription-faq"
        aria-labelledby="faq-title"
      >
        <div>
          <h2 id="faq-title">
            O que vale esclarecer
            <br />
            antes de começar.
          </h2>
          <p>
            O plano deve deixar o trabalho mais claro, inclusive o que não está
            incluído.
          </p>
          <Link href="/faq" className="text-link">
            Ver todas as perguntas ↗
          </Link>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="subscription-final">
        <div className="container">
          <div>
            <p>Conte o que sua empresa precisa apresentar — e manter.</p>
            <h2>
              Vamos encontrar o ponto
              <br />
              de partida do seu site.
            </h2>
          </div>
          <div>
            <a className="button" href="/go/whatsapp?src=final">
              Conversar sobre meu negócio ↗
            </a>
            <Link href="/planos">Prefiro comparar os planos →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
