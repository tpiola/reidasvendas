import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MagneticCTA,
  ParallaxStage,
  SpotlightCard,
  StickyStackSection,
} from "@/components/ObsidianMotion";
import { MicroQuiz } from "@/components/MicroQuiz";
import { IMPLANTACAO, brl } from "@/lib/ofertas";
import { PROJECTS, OTHER_WORK, PROJECT_EVIDENCE } from "@/lib/portfolio";
const cases = [
  ...PROJECTS,
  ...OTHER_WORK.map(([name, type, description, href, image]) => ({
    name,
    type,
    description,
    href,
    image,
    scope: ["Experiência mobile", "Jornada própria"],
  })),
];
const segments = [
  ["Clínicas", "Agendamentos com contexto.", "site-para-clinicas"],
  ["Advogados", "Sua atuação, apresentada com clareza.", "site-para-advogados"],
  ["Imobiliárias", "Do imóvel ao contato certo.", "site-para-imobiliarias"],
  ["Lojas", "Produtos que viram pedidos.", "ecommerce-profissional"],
  ["Restaurantes", "Cardápio, escolha e pedido.", "site-para-restaurantes"],
  [
    "Serviços locais",
    "Seja encontrado na sua região.",
    "seo-local-google-business",
  ],
];
export default function Home() {
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    setInteractive(true);
  }, []);
  const [door, setDoor] = useState<"direct" | "scale">("direct");
  const [optimized, setOptimized] = useState(true);
  const [searches, setSearches] = useState(1000);
  const [ticket, setTicket] = useState(300);
  const [current, setCurrent] = useState(1);
  const [target, setTarget] = useState(2);
  const [close, setClose] = useState(20);
  const potential = Math.max(
    0,
    ((((searches * (target - current)) / 100) * close) / 100) * ticket,
  );
  return (
    <main id="main-content" className="obs-home">
      <section className="obs-hero rdv-shell">
        <div className="obs-hero-copy">
          <p className="obs-label">Franca, SP · Atendemos todo o Brasil</p>
          <h1>
            Seu cliente já está pesquisando na sua cidade.{" "}
            <span>Ele encontra você ou o seu concorrente?</span>
          </h1>
          <p>
            Sites, catálogos e atendimento conectados para transformar a procura
            pelo seu negócio em conversas de venda.
          </p>
          <MagneticCTA to="#comecar">Quero receber mais contatos</MagneticCTA>
          <Link className="obs-text-link" to="/planos">
            Ver escopos e preços publicados →
          </Link>
          <div className="obs-hero-note">
            Seu domínio. Seus acessos. Um caminho claro até o pedido.
          </div>
        </div>
        <ParallaxStage>
          <div
            className="obs-journey"
            aria-label="Demonstração ilustrativa da busca ao contato. Não representa um resultado real."
          >
            <div className="obs-window">
              <span />
              <span />
              <span />
              <small>Uma jornada. Sem pontas soltas.</small>
            </div>
            <div className="obs-search">
              <span aria-hidden="true">⌕</span> Seu serviço + sua cidade{" "}
              <span aria-hidden="true">↵</span>
            </div>
            <div className="obs-search-result">
              <small>SEU NEGÓCIO · SITE PRÓPRIO</small>
              <h2>A escolha começa aqui.</h2>
              <p>
                O que você faz. Onde atende.
                <br />
                Por que falar com você.
              </p>
              <span className="obs-demo-button">Conhecer o serviço ↗</span>
            </div>
            <div className="obs-journey-line" />
            <div className="obs-notification">
              <span className="obs-notification-icon" aria-hidden="true">
                ↗
              </span>
              <div>
                <small>WHATSAPP · CONTATO COM CONTEXTO</small>
                <strong>“Vi seu serviço. Vocês atendem no meu bairro?”</strong>
                <p>Serviço + região + intenção de compra</p>
              </div>
            </div>
            <small className="obs-demo-caption">
              Demonstração ilustrativa · ciclo de 8 segundos
            </small>
          </div>
        </ParallaxStage>
      </section>
      <section className="obs-section rdv-shell" aria-labelledby="door-title">
        <div className="obs-section-heading">
          <h2 id="door-title">
            O próximo passo depende
            <br />
            <span>do seu momento.</span>
          </h2>
          <p>
            Começar bem e escalar uma operação exigem trabalhos diferentes.
            Escolha o seu caminho.
          </p>
        </div>
        <div
          className="obs-tabs"
          role="tablist"
          aria-label="Modelo de contratação"
        >
          <button
            disabled={!interactive}
            id="direct-tab"
            role="tab"
            aria-selected={door === "direct"}
            aria-controls="door-panel"
            onClick={() => setDoor("direct")}
          >
            Quero meu site ou catálogo
          </button>
          <button
            disabled={!interactive}
            id="scale-tab"
            role="tab"
            aria-selected={door === "scale"}
            aria-controls="door-panel"
            onClick={() => setDoor("scale")}
          >
            Já tenho tráfego. Quero vender melhor.
          </button>
        </div>
        <div
          id="door-panel"
          role="tabpanel"
          aria-labelledby={`${door}-tab`}
          className="obs-door-panel"
        >
          {door === "direct" ? (
            <>
              <div className="obs-grid three">
                {IMPLANTACAO.slice(0, 3).map((item) => (
                  <SpotlightCard key={item.id}>
                    <small>Implantação direta</small>
                    <h3>{item.nome}</h3>
                    <strong className="obs-price">{brl(item.valor!)}</strong>
                    <p>{item.resumo}</p>
                    <Link to={`/diagnostico?modo=implantacao&plano=${item.id}`}>
                      Ver meu projeto ↗
                    </Link>
                  </SpotlightCard>
                ))}
              </div>
              <p className="obs-muted">
                Escopo fechado, sem auditoria paga obrigatória. Mensalidade
                opcional e custos de terceiros separados.
              </p>
            </>
          ) : (
            <div className="obs-scale">
              <div>
                <h3>Descubra onde o contato deixa de virar venda.</h3>
                <p>
                  Auditoria profissional para empresas com campanhas e tráfego
                  ativos. Receba prioridades antes de investir na reconstrução.
                </p>
                <Link className="obs-cta" to="/diagnostico?estagio=triagem">
                  Solicitar diagnóstico ↗
                </Link>
              </div>
              <dl>
                <dt>Diagnóstico profissional</dt>
                <dd>
                  R$ 1.500–2.500{" "}
                  <small>Creditado no Setup aprovado em até 30 dias.</small>
                </dd>
                <dt>Setup de infraestrutura</dt>
                <dd>R$ 8.000–25.000</dd>
                <dt>Otimização contínua</dt>
                <dd>R$ 2.000–5.000/mês</dd>
              </dl>
            </div>
          )}
        </div>
      </section>
      <section className="obs-section obs-comparison">
        <div className="rdv-shell">
          <div className="obs-section-heading">
            <h2>
              Bonito ajuda.
              <br />
              <span>O caminho até a venda decide.</span>
            </h2>
            <p>
              Compare a estrutura da jornada. Velocidade e conversão dependem de
              medição em cada projeto.
            </p>
          </div>
          <div
            className="obs-tabs"
            role="group"
            aria-label="Comparar estrutura"
          >
            <button
              disabled={!interactive}
              aria-pressed={!optimized}
              onClick={() => setOptimized(false)}
            >
              Site comum / página de links
            </button>
            <button
              disabled={!interactive}
              aria-pressed={optimized}
              onClick={() => setOptimized(true)}
            >
              Arquitetura Rei das Vendas
            </button>
          </div>
          <div className="obs-compare-grid">
            {(optimized
              ? [
                  [
                    "Busca com intenção",
                    "Uma página para cada serviço e região atendida.",
                  ],
                  [
                    "Escolha sem ruído",
                    "Oferta clara, conteúdo direto e layout adaptado ao celular.",
                  ],
                  [
                    "Conversa qualificada",
                    "WhatsApp recebe o contexto que o cliente escolheu.",
                  ],
                ]
              : [
                  [
                    "Destino genérico",
                    "Quando toda campanha aponta para a mesma lista de links.",
                  ],
                  [
                    "Mais decisões",
                    "Quando o visitante precisa descobrir sozinho onde clicar.",
                  ],
                  [
                    "Contato sem contexto",
                    "Quando a conversa recomeça do zero no atendimento.",
                  ],
                ]
            ).map(([title, copy]) => (
              <div key={title}>
                <span aria-hidden="true">{optimized ? "↗" : "—"}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="obs-section rdv-shell obs-simulator"
        aria-labelledby="sim-title"
      >
        <div>
          <h2 id="sim-title">
            Quanto vale melhorar
            <br />
            <span>o próximo clique?</span>
          </h2>
          <p>
            Teste uma hipótese com seus números. O cálculo considera contatos,
            fechamento e ticket; não confunde lead com venda.
          </p>
          <small>
            Simulação de receita bruta incremental mensal. Não é previsão, lucro
            nem garantia. Não inclui custos, impostos, margem ou recorrência.
          </small>
        </div>
        <div className="obs-calculator">
          {[
            {
              label: "Visitas mensais estimadas",
              value: searches,
              set: setSearches,
              min: 100,
              max: 10000,
              step: 100,
              format: (v: number) => v.toLocaleString("pt-BR"),
            },
            {
              label: "Ticket médio",
              value: ticket,
              set: setTicket,
              min: 50,
              max: 5000,
              step: 50,
              format: brl,
            },
            {
              label: "Visita → contato atual",
              value: current,
              set: setCurrent,
              min: 0.5,
              max: 10,
              step: 0.5,
              format: (v: number) => `${v}%`,
            },
            {
              label: "Visita → contato desejada",
              value: target,
              set: setTarget,
              min: 0.5,
              max: 10,
              step: 0.5,
              format: (v: number) => `${v}%`,
            },
            {
              label: "Contatos que fecham venda",
              value: close,
              set: setClose,
              min: 1,
              max: 100,
              step: 1,
              format: (v: number) => `${v}%`,
            },
          ].map((field) => (
            <label key={field.label}>
              {field.label}
              <output>{field.format(field.value)}</output>
              <input
                type="range"
                disabled={!interactive}
                aria-label={field.label}
                min={field.min}
                max={field.max}
                step={field.step}
                value={field.value}
                onChange={(e) => field.set(Number(e.target.value))}
              />
            </label>
          ))}
          <div className="obs-calculator-total">
            <small>RECEITA ADICIONAL NA HIPÓTESE</small>
            <strong>
              {brl(potential)}
              <span>/mês</span>
            </strong>
          </div>
          <small>
            Visitas × diferença de conversão × fechamento × ticket.{" "}
            {target <= current &&
              "A meta precisa superar a taxa atual para haver incremento."}
          </small>
        </div>
      </section>
      <section className="obs-section rdv-shell" aria-labelledby="cases-title">
        <div className="obs-section-heading">
          <h2 id="cases-title">
            Engenharia aplicada:
            <br />
            <span>casos reais.</span>
          </h2>
          <p>
            Projetos publicados. Entre, navegue e conheça o trabalho. Resultados
            quantitativos de velocidade e conversão: a instrumentar.
          </p>
        </div>
        <StickyStackSection>
          {cases.map((project, i) => (
            <article
              className="obs-case"
              key={project.name}
              style={{ top: `${100 + i * 16}px` }}
            >
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.image}
                  srcSet={`${project.image.replace(".webp", "-480.webp")} 480w, ${project.image.replace(".webp", "-800.webp")} 800w, ${project.image} 1200w`}
                  sizes="(max-width: 800px) calc(100vw - 32px), 50vw"
                  decoding="async"
                  alt={`Projeto ${project.name}`}
                  width="1200"
                  height="750"
                  loading="lazy"
                />
              </a>
              <div>
                <small>{project.type}</small>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul>
                  {project.scope.map((scope) => (
                    <li key={scope}>{scope}</li>
                  ))}
                </ul>
                <div className="obs-measure">
                  <span aria-hidden="true">◔</span>
                  <div>
                    Medição de performance
                    <small>Sem comparação numérica até existir laudo.</small>
                  </div>
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorar projeto publicado ↗
                </a>
              </div>
            </article>
          ))}
        </StickyStackSection>
      </section>
      <section
        className="obs-section rdv-shell"
        aria-labelledby="evidence-title"
      >
        <div className="obs-section-heading">
          <h2 id="evidence-title">
            Trabalho publicado.
            <br />
            <span>Código verificável.</span>
          </h2>
          <p>
            Do serviço local à plataforma de conteúdo: conheça projetos próprios
            e confira o que foi construído.
          </p>
        </div>
        <div className="obs-evidence">
          {PROJECT_EVIDENCE.map((project) => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                Conferir projeto no GitHub ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section
        className="obs-section rdv-shell"
        aria-labelledby="segments-title"
      >
        <div className="obs-section-heading">
          <h2 id="segments-title">
            Seu mercado.
            <br />
            <span>Uma jornada própria.</span>
          </h2>
          <Link to="/solucoes">Explorar todas as estruturas ↗</Link>
        </div>
        <div className="obs-grid three obs-segments">
          {segments.map(([name, description, slug]) => (
            <SpotlightCard key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <Link to={`/solucoes/${slug}`}>Ver estrutura ↗</Link>
            </SpotlightCard>
          ))}
        </div>
      </section>
      <section id="comecar" className="obs-section rdv-shell obs-closing">
        <div>
          <h2>
            Vamos encurtar
            <br />
            <span>o caminho até a venda.</span>
          </h2>
          <p>
            Três escolhas para começar uma conversa sobre o que seu negócio
            precisa.
          </p>
        </div>
        <MicroQuiz context="meu negócio" />
      </section>
    </main>
  );
}
