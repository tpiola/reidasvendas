import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const foundations = [
  ['Ser encontrado', 'Site, Google, mapa e páginas de serviço trabalhando com informações consistentes.'],
  ['Transmitir confiança', 'Hierarquia clara, texto legível e decisões desenhadas primeiro para o celular.'],
  ['Facilitar o contato', 'WhatsApp, formulário, telefone e rotas organizados sem criar atrito.'],
  ['Manter tudo estável', 'Publicação, segurança, velocidade e suporte sob uma responsabilidade clara.'],
];

const audit = [
  ['01', 'Presença', 'Site, perfil da empresa no Google, mapa e consistência das informações.'],
  ['02', 'Experiência', 'Celular, acessibilidade, clareza dos serviços e velocidade percebida.'],
  ['03', 'Contato', 'Provas, botões, WhatsApp, formulários e caminhos para pedir orçamento.'],
  ['04', 'Configuração', 'Segurança, preparação para buscas, publicação e recuperação.'],
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
  return (
    <main className="sv-home">
      <section className="sv-hero">
        <div className="sv-shell sv-hero-grid">
          <div className="sv-hero-copy">
            <p className="sv-kicker"><span /> Sites profissionais para negócios locais · Franca e região</p>
            <h1>Seu negócio merece ser encontrado.<br/><strong>E causar uma ótima primeira impressão.</strong></h1>
            <p className="sv-lead">Criamos o site da sua empresa e organizamos sua presença online para que seus clientes encontrem informações corretas, conheçam seus serviços e falem com você com facilidade.</p>
            <div className="sv-actions">
              <Link className="sv-button" to="/contato">Solicitar análise do meu negócio <span>↗</span></Link>
              <Link className="sv-link" to="/templates">Ver modelos por segmento <span>→</span></Link>
            </div>
            <div className="sv-trust">
              <span>Funciona no celular</span><span>Preparado para buscas</span><span>Google e mapa</span><span>Publicação acompanhada</span>
            </div>
          </div>

          <div className="sv-visual" aria-label="Demonstração de uma presença online organizada">
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
            <div className="sv-map-card"><span className="sv-status"/> <b>Presença local ativa</b><small>Google · Mapa · Site</small></div>
            <div className="sv-score"><strong>✓</strong><span>Experiência<br/>revisada</span></div>
          </div>
        </div>
      </section>

      <section className="sv-statement">
        <div className="sv-shell">
          <p className="sv-kicker">O QUE MUDA</p>
          <h2>Não é apenas uma página bonita.<br/>É uma presença que <span>reduz dúvida.</span></h2>
          <p>Quando alguém encontra sua empresa, cada detalhe precisa confirmar três coisas: você é uma escolha confiável, está acessível e é fácil entrar em contato.</p>
        </div>
      </section>

      <section id="metodo" className="sv-section">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div><p className="sv-kicker">PRESENÇA COMPLETA</p><h2>Um processo. Quatro fundamentos.</h2></div>
            <p>O visual nasce da identidade do negócio. A construção segue um padrão rigoroso de busca, experiência, contato e estabilidade.</p>
          </header>
          <div className="sv-foundations">{foundations.map(([title, text], index) =>
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          )}</div>
        </div>
      </section>

      <section className="sv-audit">
        <div className="sv-shell sv-audit-grid">
          <div className="sv-audit-copy">
            <p className="sv-kicker">ANÁLISE ANTES DA PROPOSTA</p>
            <h2>O investimento começa com uma leitura honesta.</h2>
            <p>Você recebe prioridades claras, impacto comercial e a estrutura recomendada. Sem métricas inventadas e sem prometer primeira posição no Google.</p>
            <Link className="sv-link" to="/contato">Analisar minha presença online <span>↗</span></Link>
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
            <p>Uma seleção curta de sites e produtos reais. Cada projeto foi organizado conforme o objetivo e o público do negócio.</p>
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
          <p className="sv-kicker">MODELOS POR SEGMENTO</p>
          <h2>Cada mercado pede uma forma diferente de apresentar e convencer.</h2>
          <div className="sv-segment-list">{models.map(([model, slug]) =>
            <Link to={`/contato?modelo=${slug}`} key={model}>{model}<span>↗</span></Link>
          )}</div>
          <Link className="sv-button sv-models-button" to="/templates">Conhecer todos os modelos <span>→</span></Link>
        </div>
      </section>

      <section className="sv-cta">
        <div className="sv-shell">
          <p className="sv-kicker">PRÓXIMO PASSO</p>
          <h2>Sua empresa já tem valor. O site precisa deixar isso evidente.</h2>
          <p>Envie seu site atual ou o perfil da empresa no Google. A primeira conversa começa pela análise do que realmente precisa ser melhorado.</p>
          <Link className="sv-button" to="/contato">Solicitar análise do meu negócio <span>↗</span></Link>
          <small>Escopo transparente, projeto personalizado e tudo explicado com clareza.</small>
        </div>
      </section>
    </main>
  );
}
