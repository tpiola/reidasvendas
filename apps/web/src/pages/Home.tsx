import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const foundations = [
  ['Descoberta local', 'Google, Maps, páginas de serviço e dados estruturados trabalhando juntos.'],
  ['Experiência que convence', 'Hierarquia clara, texto legível e decisões desenhadas primeiro para o celular.'],
  ['Contato mensurável', 'WhatsApp, formulário e origem do lead conectados sem criar atrito.'],
  ['Operação estável', 'Deploy, segurança, velocidade e evolução contínua sob uma única responsabilidade.'],
];

const audit = [
  ['01', 'Presença', 'Site, Google Business Profile, Maps e consistência das informações.'],
  ['02', 'Experiência', 'Mobile, acessibilidade, clareza da oferta e velocidade percebida.'],
  ['03', 'Conversão', 'Prova, CTAs, WhatsApp, formulários e rastreamento.'],
  ['04', 'Infraestrutura', 'SSL, SEO técnico, deploy, proteção e recuperação.'],
];

const projects = [
  ['SaúdeGPT', 'Produto digital de saúde', 'https://saudegpt.com', 'Produto'],
  ['Sentinela', 'Vigilância e indicadores', 'https://sentinelasaudeambiental.com.br', 'Plataforma'],
  ['Thiago Piola', 'Autoridade e portfólio', 'https://thiagopiola.com.br', 'Presença'],
];

const segments = ['Saúde', 'Estética', 'Gastronomia', 'Varejo', 'Indústria', 'Serviços'];

export default function Home() {
  return (
    <main className="sv-home">
      <section className="sv-hero">
        <div className="sv-shell sv-hero-grid">
          <div className="sv-hero-copy">
            <p className="sv-kicker"><span /> Tecnologia para negócios locais · Franca, SP</p>
            <h1>Seu negócio já é real.<br/><strong>O digital precisa provar.</strong></h1>
            <p className="sv-lead">Criamos sites rápidos, encontráveis e preparados para transformar uma busca local em uma conversa comercial.</p>
            <div className="sv-actions">
              <Link className="sv-button" to="/contato">Solicitar diagnóstico <span>↗</span></Link>
              <a className="sv-link" href="#metodo">Conhecer o método <span>↓</span></a>
            </div>
            <div className="sv-trust">
              <span>Mobile first</span><span>SEO + GEO</span><span>Google Maps</span><span>Deploy gerenciado</span>
            </div>
          </div>

          <div className="sv-visual" aria-label="Demonstração de uma presença digital integrada">
            <div className="sv-browser">
              <div className="sv-browser-bar"><i/><i/><i/><span>negocio.com.br</span></div>
              <div className="sv-browser-page">
                <div className="sv-browser-nav"><b>MARCA</b><span>Serviços&nbsp;&nbsp; Sobre&nbsp;&nbsp; Contato</span></div>
                <p>ATENDIMENTO EM FRANCA</p>
                <h2>Clareza para ser<br/>a próxima escolha.</h2>
                <button>Agendar atendimento</button>
                <div className="sv-browser-cards"><i/><i/><i/></div>
              </div>
            </div>
            <div className="sv-map-card"><span className="sv-status"/> <b>Presença local ativa</b><small>Google · Maps · Site</small></div>
            <div className="sv-score"><strong>92</strong><span>Experiência<br/>mobile</span></div>
          </div>
        </div>
      </section>

      <section className="sv-statement">
        <div className="sv-shell">
          <p className="sv-kicker">O QUE MUDA</p>
          <h2>Não é uma página bonita.<br/>É uma presença que <span>reduz dúvida.</span></h2>
          <p>Quando alguém encontra sua empresa, cada segundo precisa confirmar três coisas: você é a escolha certa, está perto e é fácil entrar em contato.</p>
        </div>
      </section>

      <section id="metodo" className="sv-section">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div><p className="sv-kicker">ARQUITETURA COMPLETA</p><h2>Um sistema. Quatro fundamentos.</h2></div>
            <p>O visual nasce da identidade do negócio. A engenharia por trás segue um padrão rigoroso de busca, experiência, conversão e estabilidade.</p>
          </header>
          <div className="sv-foundations">{foundations.map(([title, text], index) =>
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          )}</div>
        </div>
      </section>

      <section className="sv-audit">
        <div className="sv-shell sv-audit-grid">
          <div className="sv-audit-copy">
            <p className="sv-kicker">DIAGNÓSTICO ANTES DO ESCOPO</p>
            <h2>O investimento começa com uma leitura honesta.</h2>
            <p>Você recebe prioridades claras, impacto comercial e a arquitetura recomendada. Sem métricas inventadas, sem prometer posição no Google.</p>
            <Link className="sv-link" to="/contato">Analisar minha presença <span>↗</span></Link>
          </div>
          <div className="sv-audit-list">{audit.map(([n, title, text]) =>
            <article key={title}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><b>✓</b></article>
          )}</div>
        </div>
      </section>

      <section className="sv-project-section">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div><p className="sv-kicker">PROJETOS SELECIONADOS</p><h2>Capacidade que você pode abrir.</h2></div>
            <p>Uma seleção curta de produtos e presenças digitais reais. A vitrine completa organiza os projetos por objetivo.</p>
          </header>
          <div className="sv-projects">{projects.map(([name, text, url, label], index) =>
            <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
              <div className={`sv-project-preview sv-project-${index + 1}`}><span>{label}</span><strong>{name}</strong><i>↗</i></div>
              <div><h3>{name}</h3><p>{text}</p></div>
            </a>
          )}</div>
          <Link className="sv-button sv-button-light" to="/portfolio">Ver todos os projetos <span>→</span></Link>
        </div>
      </section>

      <section className="sv-segments">
        <div className="sv-shell">
          <p className="sv-kicker">NEGÓCIOS LOCAIS</p>
          <h2>Cada mercado pede uma decisão diferente.</h2>
          <div className="sv-segment-list">{segments.map(segment => <Link to="/segmentos" key={segment}>{segment}<span>↗</span></Link>)}</div>
        </div>
      </section>

      <section className="sv-cta">
        <div className="sv-shell">
          <p className="sv-kicker">PRÓXIMO MOVIMENTO</p>
          <h2>Vamos descobrir o que seu digital ainda não prova.</h2>
          <p>Envie seu site atual ou perfil no Google. A primeira conversa começa pelo diagnóstico, não pela venda de um pacote.</p>
          <Link className="sv-button" to="/contato">Solicitar diagnóstico <span>↗</span></Link>
          <small>Investimento a partir de R$ 1.000 · Escopo transparente</small>
        </div>
      </section>
    </main>
  );
}
