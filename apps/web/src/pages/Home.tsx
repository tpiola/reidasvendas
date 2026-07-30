import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const systems = [
  ['01', 'Diagnóstico de presença', 'Site, Google, Maps, reputação, mobile e conversão avaliados como um único sistema.'],
  ['02', 'Arquitetura local', 'Páginas por serviço, dados estruturados e rotas claras para busca, IA e decisão humana.'],
  ['03', 'Engenharia de conversão', 'Oferta, prova, WhatsApp e formulários conectados para reduzir atrito e registrar origem.'],
  ['04', 'Operação protegida', 'Deploy gerenciado, segurança, monitoramento e evolução sem depender de improvisos.'],
];

const audit = [
  ['Descoberta', 'Google Business Profile, Maps, consistência local e indexação'],
  ['Experiência', 'Mobile-first, acessibilidade, clareza e velocidade percebida'],
  ['Conversão', 'Oferta, prova, CTA, WhatsApp, formulários e rastreamento'],
  ['Infraestrutura', 'SSL, headers, deploy, recuperação e estabilidade operacional'],
];

const projects = [
  ['SaúdeGPT', 'Produto de inteligência em saúde', 'https://saudegpt.com'],
  ['Sentinela Saúde Ambiental', 'Sistema de vigilância e indicadores', 'https://sentinelasaudeambiental.com.br'],
  ['Thiago Piola', 'Autoridade profissional e portfólio', 'https://thiagopiola.com.br'],
];

const segments = [
  'Calçados & indústria', 'Estética & beleza', 'Odontologia & saúde',
  'Varejo & farmácia', 'Gastronomia', 'Serviços profissionais',
];

export default function Home() {
  return (
    <main className="sv-home">
      <section className="sv-hero sv-shell">
        <div className="sv-hero-copy">
          <p className="sv-kicker"><span /> Unidade Externa de Tecnologia · Franca, SP</p>
          <h1>Não entregamos uma página.<br/><em>Instalamos presença.</em></h1>
          <p className="sv-lead">
            Sites para negócios locais tratados como infraestrutura de aquisição:
            Google, Maps, velocidade, mobile e conversão sob uma única governança.
          </p>
          <div className="sv-actions">
            <Link className="sv-button" to="/contato">Solicitar diagnóstico <b>↗</b></Link>
            <a className="sv-link" href="#metodo">Ver o que analisamos <span>↓</span></a>
          </div>
          <p className="sv-hero-note">Investimento a partir de R$ 1.000 · escopo definido após diagnóstico</p>
        </div>
        <aside className="sv-console" aria-label="Escopo do diagnóstico digital">
          <div className="sv-console-head"><span>DIAGNÓSTICO RDV / 01</span><i>ANÁLISE INDIVIDUAL</i></div>
          <div className="sv-console-body">
            <p>O que o empresário recebe</p>
            <ol>
              <li><span>01</span><div><strong>Leitura executiva</strong><small>Onde a presença atual perde confiança e contato.</small></div></li>
              <li><span>02</span><div><strong>Prioridades por impacto</strong><small>O que corrigir primeiro, sem lista genérica.</small></div></li>
              <li><span>03</span><div><strong>Arquitetura recomendada</strong><small>Páginas, conteúdo, integrações e infraestrutura.</small></div></li>
              <li><span>04</span><div><strong>Escopo transparente</strong><small>Entregáveis, dependências e próximos movimentos.</small></div></li>
            </ol>
          </div>
          <div className="sv-console-foot"><span>FRANCA · SP</span><span>MOBILE FIRST</span><span>SEO LOCAL</span></div>
        </aside>
      </section>

      <div className="sv-strip"><div className="sv-shell">
        <span>GOOGLE BUSINESS</span><i>◆</i><span>MAPS</span><i>◆</i><span>SEO + GEO</span><i>◆</i>
        <span>CORE WEB VITALS</span><i>◆</i><span>WHATSAPP</span>
      </div></div>

      <section className="sv-light"><div className="sv-shell sv-intro">
        <div><p className="sv-kicker">O CUSTO DO SITE ERRADO</p><h2>Estar online não significa<br/>ser <em>escolhido.</em></h2></div>
        <div>
          <p>Quando a oferta é confusa, o mobile é lento ou o Google encontra informações inconsistentes, a empresa perde a oportunidade antes da conversa começar.</p>
          <p>O site precisa confirmar a reputação, explicar por que escolher o negócio e criar o caminho mais curto até a ação.</p>
        </div>
      </div></section>

      <section id="metodo" className="sv-section sv-shell">
        <header className="sv-section-head">
          <div><p className="sv-kicker">SOLUÇÃO COMPLETA DIGITAL</p><h2>Quatro sistemas.<br/>Uma presença.</h2></div>
          <p>Cada implementação nasce do negócio real. A base técnica é padronizada; marca, oferta, comunicação e jornada permanecem exclusivas.</p>
        </header>
        <div className="sv-solutions">{systems.map(([n,t,d])=>
          <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>
        )}</div>
      </section>

      <section className="sv-method"><div className="sv-shell sv-method-grid">
        <div><p className="sv-kicker">RELATÓRIO DE OPORTUNIDADE</p><h2>O valor fica visível<br/>antes da proposta.</h2><p>O relatório traduz problemas técnicos em impacto comercial. Sem jargão vazio e sem prometer posição, faturamento ou resultado garantido.</p></div>
        <div className="sv-steps">{audit.map(([t,d],index)=><article key={t}><span>0{index + 1}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
      </div></section>

      <section className="sv-work"><div className="sv-shell">
        <header className="sv-section-head">
          <div><p className="sv-kicker">PROJETOS SELECIONADOS</p><h2>Trabalho real.<br/>Curadoria curta.</h2></div>
          <p>A home mostra apenas uma seleção. A vitrine completa organiza projetos aprovados por objetivo e segmento, sem transformar o início em catálogo.</p>
        </header>
        <div className="sv-projects">{projects.map(([name,type,url],index)=>
          <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
            <span>0{index + 1}</span><div><h3>{name}</h3><p>{type}</p></div><b aria-hidden="true">↗</b>
          </a>
        )}</div>
        <Link className="sv-text-button" to="/portfolio">Abrir vitrine de projetos <span>→</span></Link>
      </div></section>

      <section className="sv-segments"><div className="sv-shell">
        <header className="sv-section-head">
          <div><p className="sv-kicker">ECONOMIA LOCAL</p><h2>Arquitetura muda.<br/>O padrão não.</h2></div>
          <p>Saúde exige segurança. Gastronomia exige desejo. Indústria exige capacidade. A comunicação nasce da lógica de decisão de cada mercado.</p>
        </header>
        <div className="sv-segment-list">{segments.map((segment,index)=><Link to="/segmentos" key={segment}><span>0{index + 1}</span><h3>{segment}</h3><b>↗</b></Link>)}</div>
      </div></section>

      <section className="sv-proof"><div className="sv-shell">
        <p className="sv-kicker">BASE TÉCNICA OBRIGATÓRIA</p>
        <div className="sv-proof-grid"><div><strong>Encontrável</strong><span>Metadados, schema e presença local coerente</span></div><div><strong>Rápido</strong><span>Mídia otimizada, CDN e orçamento de performance</span></div><div><strong>Mensurável</strong><span>Eventos, origem, consentimento e melhoria contínua</span></div></div>
      </div></section>

      <section className="sv-cta"><div className="sv-shell">
        <p className="sv-kicker">PRÓXIMO MOVIMENTO</p>
        <h2>Primeiro, diagnosticamos.<br/><em>Depois, construímos.</em></h2>
        <p>Envie o site atual ou o perfil no Google. Se houver uma oportunidade real, você recebe a leitura inicial e o escopo recomendado.</p>
        <Link className="sv-button" to="/contato">Solicitar análise <b>↗</b></Link>
        <small>Análise individual · Sem promessa artificial · Escopo transparente</small>
      </div></section>
    </main>
  );
}
