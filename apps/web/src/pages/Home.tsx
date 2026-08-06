import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const foundations = [
  ['Mapeamento de Perfil Diamante', 'Leitura do negócio, oferta, público e pontos de atrito antes de definir qualquer arquitetura.'],
  ['Arquitetura exclusiva', 'Site, páginas, fluxos e integrações desenhados para a realidade de cada empresa, sem solução genérica.'],
  ['Engenharia de conversão', 'Hierarquia, conteúdo e caminhos de contato organizados para reduzir dúvida e facilitar a próxima decisão.'],
  ['Governança contínua', 'Publicação, estabilidade, segurança, medição e evolução sob uma responsabilidade técnica clara.'],
];

const audit = [
  ['01', 'Presença', 'Site, busca local, mapa, identidade e consistência das informações públicas.'],
  ['02', 'Conversão', 'Oferta, prova, clareza, CTAs, formulários e caminhos até o contato.'],
  ['03', 'Tecnologia', 'Performance, responsividade, acessibilidade, segurança e integrações essenciais.'],
  ['04', 'Governança', 'Medição, continuidade, documentação, publicação e prioridades de evolução.'],
];

const projects = [
  ['SaúdeGPT', 'Produto digital de saúde', 'https://saudegpt.com', 'Produto'],
  ['Sentinela', 'Saúde ambiental e controle de pragas', 'https://sentinelasaudeambiental.com.br', 'Site local'],
  ['Thiago Piola', 'Autoridade e portfólio profissional', 'https://thiagopiola.com.br', 'Presença'],
];

const models = [
  ['Clínica odontológica', 'odontologia'],
  ['Dedetização', 'dedetizacao'],
  ['Restaurante e delivery', 'restaurante'],
  ['Estética e beleza', 'estetica'],
  ['Academia e studio', 'academia'],
  ['Oficina mecânica', 'oficina'],
  ['Pet shop', 'pet-shop'],
  ['Advocacia', 'advocacia'],
  ['Imobiliária', 'imobiliaria'],
  ['Escola e cursos', 'escola'],
];

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.sv-reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="sv-home">
      <section className="sv-hero">
        <div className="sv-shell sv-hero-grid">
          <div className="sv-hero-copy sv-hero-enter">
            <p className="sv-kicker"><span /> Soberania Digital · Tecnologia e Governança</p>
            <h1>Infraestrutura digital para empresas que <strong>não podem depender de improviso.</strong></h1>
            <p className="sv-lead">O Rei das Vendas atua como Unidade Externa de Tecnologia e Governança de Resultados: organiza presença, experiência, conversão e evolução digital em uma execução independente, mensurável e orientada ao negócio.</p>
            <div className="sv-actions">
              <Link className="sv-button" to="/diagnostico">Solicitar mapeamento estratégico <span>↗</span></Link>
              <Link className="sv-link" to="/solucoes">Conhecer a solução completa <span>→</span></Link>
            </div>
            <div className="sv-trust">
              <span>Arquitetura exclusiva</span><span>Governança de resultados</span><span>Entrega técnica</span><span>Continuidade operacional</span>
            </div>
          </div>

          <div className="sv-visual sv-visual-enter" aria-label="Demonstração de uma infraestrutura digital organizada">
            <div className="sv-browser">
              <div className="sv-browser-bar"><i/><i/><i/><span>empresa.com.br</span></div>
              <div className="sv-browser-page">
                <div className="sv-browser-nav"><b>MARCA</b><span>Soluções&nbsp;&nbsp; Autoridade&nbsp;&nbsp; Contato</span></div>
                <p>ARQUITETURA SOB MEDIDA</p>
                <h2>Clareza para decidir.<br/>Estrutura para crescer.</h2>
                <button>Iniciar diagnóstico</button>
                <div className="sv-browser-cards"><i/><i/><i/></div>
              </div>
            </div>
            <div className="sv-map-card"><span className="sv-status"/> <b>Operação digital ativa</b><small>Presença · Conversão · Dados</small></div>
            <div className="sv-score"><strong>✓</strong><span>Governança<br/>verificada</span></div>
          </div>
        </div>
      </section>

      <section className="sv-statement sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">O FORMATO</p>
          <h2>Não é agência. Não é pacote pronto.<br/>É uma <span>unidade externa de tecnologia.</span></h2>
          <p>Uma estrutura terceirizada e independente que entra no negócio para mapear prioridades, construir a solução e manter a evolução digital conectada a indicadores reais.</p>
        </div>
      </section>

      <section className="sv-showcase sv-reveal" aria-labelledby="showcase-title">
        <div className="sv-shell sv-showcase-grid">
          <div className="sv-showcase-copy">
            <p className="sv-kicker">ENGENHARIA DE FLUXO ININTERRUPTO</p>
            <h2 id="showcase-title">Da descoberta à decisão, cada ponto trabalha como parte do mesmo sistema.</h2>
            <p>Busca, site, oferta, prova, formulário e contato deixam de ser peças isoladas e passam a formar uma experiência contínua.</p>
            <div className="sv-showcase-steps" aria-label="Etapas da experiência">
              <span>01 · Atrair</span><span>02 · Qualificar</span><span>03 · Converter</span><span>04 · Medir</span>
            </div>
          </div>
          <div className="sv-video-frame">
            <video autoPlay loop muted playsInline preload="metadata" aria-label="Demonstração visual da infraestrutura digital">
              <source src="/showcase-rei-das-vendas.mp4" type="video/mp4" />
            </video>
            <span className="sv-video-live"><i /> Arquitetura demonstrativa</span>
          </div>
        </div>
      </section>

      <section id="metodo" className="sv-section sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div><p className="sv-kicker">SOLUÇÃO COMPLETA DIGITAL</p><h2>Uma execução. Quatro camadas de soberania.</h2></div>
            <p>A tecnologia é consequência do diagnóstico. Primeiro vem a hierarquia do negócio; depois, os componentes, integrações e a governança necessária para sustentar o resultado.</p>
          </header>
          <div className="sv-foundations">{foundations.map(([title, text], index) =>
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          )}</div>
        </div>
      </section>

      <section className="sv-audit sv-reveal">
        <div className="sv-shell sv-audit-grid">
          <div className="sv-audit-copy">
            <p className="sv-kicker">DIAGNÓSTICO ANTES DA EXECUÇÃO</p>
            <h2>Decisão técnica começa com leitura fria do cenário.</h2>
            <p>Mapeamos o que existe, onde há atrito e o que realmente merece prioridade. Sem urgência artificial, sem promessa vazia e sem métrica inventada.</p>
            <Link className="sv-link" to="/diagnostico">Iniciar Mapeamento de Perfil Diamante <span>↗</span></Link>
          </div>
          <div className="sv-audit-list">{audit.map(([n, title, text]) =>
            <article key={title}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><b>✓</b></article>
          )}</div>
        </div>
      </section>

      <section className="sv-project-section sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div><p className="sv-kicker">PROJETOS EM PRODUÇÃO</p><h2>Capacidade demonstrada em produtos e operações reais.</h2></div>
            <p>Uma seleção curta de soluções publicadas. Cada arquitetura responde ao objetivo, ao público e ao estágio específico do projeto.</p>
          </header>
          <div className="sv-projects">{projects.map(([name, text, url, label], index) =>
            <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
              <div className={`sv-project-preview sv-project-${index + 1}`}><span>{label}</span><strong>{name}</strong><i>↗</i></div>
              <div><h3>{name}</h3><p>{text}</p></div>
            </a>
          )}</div>
          <Link className="sv-button sv-button-light" to="/portfolio">Ver arquiteturas publicadas <span>→</span></Link>
        </div>
      </section>

      <section className="sv-segments sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">BIBLIOTECA DE POSSIBILIDADES</p>
          <h2>Referências demonstrativas por segmento. A solução final continua exclusiva.</h2>
          <div className="sv-segment-list">{models.map(([model, slug]) =>
            <Link to={`/contato?modelo=${slug}`} key={model}>{model}<span>↗</span></Link>
          )}</div>
          <Link className="sv-button sv-models-button" to="/templates">Explorar possibilidades <span>→</span></Link>
        </div>
      </section>

      <section className="sv-cta sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">PRÓXIMO MOVIMENTO</p>
          <h2>Antes de construir mais tecnologia, descubra o que merece ser construído.</h2>
          <p>Envie sua presença atual. O processo começa pelo mapeamento do cenário, dos gargalos e das prioridades que podem sustentar uma solução completa digital.</p>
          <Link className="sv-button" to="/diagnostico">Solicitar diagnóstico estratégico <span>↗</span></Link>
          <small>Escopo transparente · Arquitetura exclusiva · Governança independente</small>
        </div>
      </section>
    </main>
  );
}
