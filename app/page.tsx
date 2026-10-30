/* eslint-disable @next/next/no-html-link-for-pages -- Tracked WhatsApp redirects require a full navigation. */
import Link from 'next/link';
import content from '@/data/content.json';
import portfolio from '@/data/portfolio.json';
import Pricing from '@/components/Pricing';
import IntentNavigator from '@/components/IntentNavigator';
import DynamicFeed from '@/components/DynamicFeed';
import HeroOrbit from '@/components/HeroOrbit';
import { MaturityQuiz } from '@/components/MaturityQuiz';
import { CommercialFlow, BeforeAfter } from '@/components/CommercialFlow';
import { metadata as createMetadata } from '@/lib/site';

export const metadata = createMetadata(
  'Soberania Digital e Governança de Resultados em Franca',
  'Digital completo, operação correta e crescimento com controle: sites, busca local, atendimento e tecnologia empresarial em Franca e no Brasil.',
  '/',
);
const modules = [
  {
    href: '/sites-para-pequenos-negocios',
    label: 'Design + desenvolvimento',
    title: 'Um site à altura do seu negócio.',
    text: 'Mostre por que escolher sua empresa. Páginas rápidas, conteúdo que explica sua oferta e um próximo passo fácil de encontrar.',
    detail: 'Da primeira impressão ao pedido de orçamento.',
    type: 'site',
  },
  {
    href: '/seo-local-franca',
    label: 'SEO + presença local',
    title: 'Sua região precisa encontrar você.',
    text: 'Organize serviços, localização e informações da empresa para responder às buscas de quem procura o que você faz.',
    detail: 'Seu serviço, no contexto da sua cidade.',
    type: 'search',
  },
  {
    href: '/whatsapp-que-vende',
    label: 'Contato + atendimento',
    title: 'Menos atrito. Mais conversa.',
    text: 'Conecte a página ao WhatsApp com uma mensagem contextualizada. O cliente entende a oferta e sua equipe sabe por onde começar.',
    detail: 'Um caminho curto entre interesse e contato.',
    type: 'contact',
  },
  {
    href: '/manutencao-de-site',
    label: 'Manutenção + evolução',
    title: 'O negócio muda. O site acompanha.',
    text: 'Atualizações, ajustes e revisão da presença digital em uma rotina combinada. Você cuida da operação; nós cuidamos da sua base.',
    detail: 'Continuidade com escopo e entregas definidos.',
    type: 'care',
  },
];
const questions = [
  [
    'Já tenho um site. Preciso começar do zero?',
    'Nem sempre. Primeiro avaliamos oferta, conteúdo, navegação e estrutura técnica. O que estiver funcionando pode ser aproveitado. A proposta explica o que manter, ajustar ou reconstruir.',
  ],
  [
    'O que significa site por assinatura?',
    'Você contrata a implantação inicial e uma rotina de manutenção e entregas. Cada plano informa páginas, conteúdo, ajustes e investimento. Assim, a presença digital continua recebendo cuidado depois da publicação.',
  ],
  [
    'A assinatura inclui anúncios e redes sociais?',
    'Gestão de anúncios, redes sociais, licenças e integrações específicas têm escopo separado. Antes de contratar, você recebe a relação do que entra no plano e dos custos adicionais, quando houver.',
  ],
  [
    'Vou receber uma quantidade garantida de clientes?',
    'Não há garantia de vendas ou de posição no Google. Construímos uma presença que apresenta sua oferta e facilita o contato. Demanda, preço, atendimento e investimento também influenciam o resultado.',
  ],
  [
    'Posso contratar sem assinatura?',
    'Sim. Projetos de implantação e serviços avulsos também são avaliados. A conversa inicial serve para encontrar o formato que faz sentido para seu negócio.',
  ],
  [
    'Vocês atendem fora de Franca?',
    'Sim. Estamos em Franca/SP e atendemos empresas da região e de outras cidades do Brasil. Reuniões, envio de materiais e aprovações podem acontecer a distância.',
  ],
];

function ServiceArt({ type }: { type: string }) {
  return (
    <div
      className={`studio-service-art studio-service-art-${type}`}
      aria-hidden="true"
    >
      {type === 'site' ? (
        <div className="art-browser">
          <div className="art-browser-bar">
            <i />
            <i />
            <i />
            <span>Seu negócio, bem apresentado.</span>
          </div>
          <div className="art-browser-body">
            <span>Feito para a sua empresa.</span>
            <b>
              Uma boa impressão.
              <br />
              Um próximo passo.
            </b>
            <div className="art-browser-cta">
              Vamos conversar <span>↗</span>
            </div>
          </div>
          <div className="art-browser-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      ) : type === 'search' ? (
        <div className="art-search">
          <span>⌕</span>
          <b>Seu serviço + sua cidade</b>
          <div>
            <i />
            <i />
            <i />
          </div>
          <p>
            Conecte o que você faz
            <br />a quem está procurando.
          </p>
        </div>
      ) : type === 'contact' ? (
        <div className="art-contact">
          <div>
            Gostei do que vi.
            <br />
            Podemos conversar?
          </div>
          <span>
            Claro. Me conte o que sua empresa precisa. <b>↗</b>
          </span>
          <p>Exemplo de uma jornada de contato</p>
        </div>
      ) : (
        <div className="art-care">
          <div>
            <span>Seu negócio</span>
            <b>Em movimento.</b>
          </div>
          <svg viewBox="0 0 300 90" fill="none">
            <path
              d="M0 80H300M0 45H300M0 10H300"
              stroke="currentColor"
              opacity=".12"
            />
            <path
              d="m10 70 45-12 42 8 49-32 38 6 48-23 56-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <circle cx="288" cy="10" r="5" fill="currentColor" />
          </svg>
          <p>Ilustração de continuidade. Não representa resultados.</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="studio-home">
      <section className="studio-hero hero" aria-labelledby="home-title">
        <div className="container studio-hero-grid">
          <div className="studio-hero-copy">
            <p className="studio-kicker">
              <span /> Unidade Externa de Tecnologia · Franca / Brasil
            </p>
            <h1 id="home-title">
              Você colocou sua vida
              <br />
              <span>
                nesse negócio. O digital
                <br />
                precisa acompanhar.
              </span>
            </h1>
            <p className="studio-hero-description">
              Por trás de cada empresa há alguém que abriu as portas cedo, resolveu problemas difíceis e continuou acreditando. Sua presença digital deve contar essa história e ajudar o próximo cliente a confiar em você. Unimos{' '}
              <strong>sites, Google, atendimento e tecnologia</strong> para transformar dedicação em uma experiência profissional.
            </p>
            <div className="studio-hero-actions">
              <Link
                className="button studio-primary"
                href="/diagnostico"
                data-event="click_cta_diagnostico"
              >
                Solicitar Análise Estratégica <span aria-hidden="true">↗</span>
              </Link>
              <a className="studio-project-link" href="#trabalhos">
                Conhecer a estrutura <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="studio-hero-assurance">
              Você conhece o seu negócio como ninguém. Nós ouvimos antes de construir.
              <br />
              <span>Escopo e investimento apresentados antes de começar.</span>
            </p>
          </div>
          <HeroOrbit />
        </div>
        <div className="container studio-hero-bottom">
          <span>
            Franca/SP <i /> Atendemos todo o Brasil
          </span>
          <a href="#servicos">
            Conheça o que podemos construir <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <div className="studio-audience">
        <div className="container">
          <p>
            Grandes histórias começam de muitos tamanhos.
            <br />
            <strong>Toda empresa merece ser levada a sério.</strong>
          </p>
          <div>
            <span>Comércio</span>
            <span>Serviços</span>
            <span>Clínicas</span>
            <span>Indústrias</span>
            <span>Profissionais</span>
          </div>
        </div>
      </div>

      <IntentNavigator />

      <section
        id="servicos"
        className="studio-services subscription-section container"
        aria-labelledby="services-title"
      >
        <div className="subscription-heading">
          <div>
            <p className="studio-section-label">Presença que trabalha junto</p>
            <h2 id="services-title">
              Feito para inspirar confiança.
              <br />
              <span>Simples para escolher você.</span>
            </h2>
          </div>
          <div>
            <p>
              Quando alguém entra no seu site, precisa sentir o cuidado que você coloca no seu trabalho. Criamos páginas que mostram sua identidade, explicam seu valor e facilitam o primeiro contato.
            </p>
            <Link className="text-link" href="/servicos">
              Explore todos os serviços ↗
            </Link>
          </div>
        </div>
        <div className="studio-services-grid">
          {modules.map((module, index) => (
            <Link
              href={module.href}
              key={module.href}
              className="studio-service"
              data-reveal
              data-reveal-delay={(index % 2) * 80}
            >
              <ServiceArt type={module.type} />
              <div className="studio-service-content">
                <div className="studio-service-label">
                  <span>{module.label}</span>
                  <span aria-hidden="true">0{index + 1} / ↗</span>
                </div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <span className="studio-service-detail">{module.detail}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="studio-services-extras">
          <p>Precisa conectar o que acontece depois do contato?</p>
          <div>
            <Link href="/painel-de-leads">Painel de leads ↗</Link>
            <Link href="/automacao-comercial">Automação comercial ↗</Link>
            <Link href="/otimizacao-de-conversao">
              Otimização de conversão ↗
            </Link>
          </div>
        </div>
      </section>

      <section
        className="studio-method subscription-flow-section"
        aria-labelledby="method-title"
      >
        <div className="container">
          <div className="subscription-heading">
            <div>
              <p className="studio-section-label">
                Um caminho. Partes conectadas.
              </p>
              <h2 id="method-title">
                Do primeiro clique
                <br />
                <span>à próxima conversa.</span>
              </h2>
            </div>
            <div>
              <p>
                A tecnologia tem um propósito humano: fazer com que menos pessoas esperem por uma resposta, menos oportunidades se percam e você tenha mais tranquilidade para cuidar do negócio. Explore cada etapa.
              </p>
              <Link className="text-link" href="/metodo">
                Conheça nosso método ↗
              </Link>
            </div>
          </div>
          <CommercialFlow />
        </div>
      </section>

      <section
        id="trabalhos"
        className="subscription-section container studio-work"
        aria-labelledby="portfolio-title"
      >
        <div className="subscription-heading">
          <div>
            <p className="studio-section-label">Veja a execução</p>
            <h2 id="portfolio-title">
              Sites e plataformas que saíram
              <br />
              <span>do papel para o ar.</span>
            </h2>
          </div>
          <div>
            <p>
              Exemplos publicados, com identidade e funções diferentes. Abra, navegue e veja
              como design, conteúdo e interação se encontram na prática.
            </p>
            <Link className="text-link" href="/cases">
              Conheça os projetos e seu contexto ↗
            </Link>
          </div>
        </div>
        <div className="studio-projects">
          {portfolio.map((project, index) => (
            <a
              className={`studio-project studio-project-${project.id}`}
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${project.title}, em nova aba`}
            >
              <div className="studio-project-visual" aria-hidden="true">
                <span className="studio-project-index">
                  Projeto 0{index + 1}
                </span>
                <span className="studio-project-wordmark">
                  {project.title}

                </span>
                <span className="studio-project-open">Explorar projeto ↗</span>
              </div>
              <div className="studio-project-caption">
                <span>{project.category}</span>
                <h3>
                  {project.title} <span aria-hidden="true">↗</span>
                </h3>
              </div>
            </a>
          ))}
        </div>
        <p className="subscription-evidence-note">
          Portfólio próprio. As capas identificam os projetos; os links abrem os
          sites reais. Contexto e fontes na página de projetos.
        </p>
      </section>

      <section className="subscription-section container rdv-ecosystem" aria-labelledby="ecosystem-title">
        <div className="subscription-heading">
          <div>
            <p className="studio-section-label">Um ecossistema para evoluir com a empresa</p>
            <h2 id="ecosystem-title">Comece pelo site.<br/><span>Avance até sua plataforma.</span></h2>
          </div>
          <div>
            <p>Um negócio local pode precisar de um site para ser encontrado. Outro precisa de catálogo, agendamento, estoque e fluxos de trabalho. Projetamos a estrutura adequada ao estágio da operação, sem vender módulos que ainda não estão implantados.</p>
            <Link className="text-link" href="/diagnostico">Solicitar Análise Estratégica ↗</Link>
          </div>
        </div>
        <div className="rdv-ecosystem-grid">
          <article className="rdv-ecosystem-item"><span>01 / ENTRADA</span><h3>Site e presença local</h3><p>Design profissional, páginas de serviços, busca no Google e contato com contexto.</p><Link href="/sites-para-pequenos-negocios">Conhecer a solução ↗</Link></article>
          <article className="rdv-ecosystem-item"><span>02 / EXPANSÃO</span><h3>Loja, catálogo e fluxos</h3><p>Jornadas de compra, pedidos e automações para reduzir atritos do atendimento.</p><Link href="/servicos">Explorar possibilidades ↗</Link></article>
          <article className="rdv-ecosystem-item"><span>03 / PLATAFORMA</span><h3>Ferramentas empresariais</h3><p>Visão demonstrativa de estoque, alertas e indicadores. Produto ainda em desenvolvimento, sem assinatura operacional.</p><Link href="/plataforma/demo">Ver demonstração ↗</Link></article>
        </div>
      </section>

      <section className="studio-difference subscription-comparison-section">
        <div className="container">
          <div className="subscription-heading">
            <h2>
              O seu esforço merece
              <br />
              <span>uma estrutura à altura.</span>
            </h2>
            <p>
              O que você faz. Para quem. Como entrar em contato. Veja como uma
              presença organizada ajuda a tornar essas respostas mais claras.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      <section
        id="planos"
        className="subscription-plans-section studio-plans"
        aria-labelledby="pricing-title"
      >
        <div className="container">
          <div className="subscription-heading">
            <div>
              <p className="studio-section-label">
                Seu site pronto. O cuidado continua.
              </p>
              <h2 id="pricing-title">
                Comece com a base.
                <br />
                <span>Evolua com um plano.</span>
              </h2>
            </div>
            <div>
              <p>
                A implantação coloca o projeto no ar. A assinatura mantém uma
                rotina de conteúdo, ajustes e cuidado técnico. Compare o que
                cada plano entrega.
              </p>
              <Link className="text-link" href="/planos">
                Comparar todos os detalhes e condições ↗
              </Link>
            </div>
          </div>
          <Pricing />
        </div>
      </section>

      <section className="subscription-tools-section studio-diagnostic">
        <div className="container">
          <div className="subscription-heading">
            <div>
              <p className="studio-section-label">Antes de investir mais</p>
              <h2>
                Descubra onde
                <br />
                <span>o caminho se quebra.</span>
              </h2>
            </div>
            <div>
              <p>
                Seu problema está na presença, no contato ou no acompanhamento?
                Responda a três perguntas para orientar sua próxima decisão. Sem
                cadastro.
              </p>
              <Link className="text-link" href="/simulador">
                Explore também o simulador de oportunidade ↗
              </Link>
            </div>
          </div>
          <MaturityQuiz />
        </div>
      </section>

      <section
        className="subscription-section container studio-content"
        aria-labelledby="content-title"
      >
        <div className="subscription-heading">
          <h2 id="content-title">
            Decisões melhores
            <br />
            <span>começam com clareza.</span>
          </h2>
          <Link className="text-link" href="/blog">
            Explore os guias práticos ↗
          </Link>
        </div>
        <DynamicFeed items={content.feed} />
      </section>

      <section
        className="subscription-section container subscription-faq"
        aria-labelledby="faq-title"
      >
        <div>
          <p className="studio-section-label">Vamos tirar as dúvidas</p>
          <h2 id="faq-title">
            Antes de contratar,
            <br />
            <span>controle e clareza.</span>
          </h2>
          <p>
            Entenda o formato, o acompanhamento e o que faz sentido para a sua
            empresa.
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

      <section className="studio-final">
        <div className="container">
          <p>O que você construiu merece continuar crescendo.</p>
          <div className="studio-final-grid">
            <h2>
              Vamos valorizar
              <br />
              seu negócio
              <br />
              <span>construiu.</span>
            </h2>
            <div>
              <p>
                Conte como sua empresa começou, onde quer chegar e o que hoje dificulta o caminho. Vamos ouvir, diagnosticar e desenhar a tecnologia certa para essa próxima fase.
              </p>
              <a
                className="button studio-primary"
                href="/diagnostico"
              >
                Preencher análise estratégica <span aria-hidden="true">↗</span>
              </a>
              <Link className="studio-final-secondary" href="/diagnostico">
                Prefiro preencher o briefing →
              </Link>
            </div>
          </div>
          <div className="studio-final-foot">
            <span>Estratégia antes do layout. Clareza antes da proposta.</span>
            <Link href="/planos">Ver planos e investimento ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
