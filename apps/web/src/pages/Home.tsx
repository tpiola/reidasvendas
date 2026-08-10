import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const stages = [
  ['Começando agora', 'Ainda não tenho uma presença digital consistente.', 'inicio'],
  ['Já tenho algo no ar', 'Tenho site ou redes, mas os resultados oscilam.', 'evolucao'],
  ['Negócio estabelecido', 'Quero previsibilidade, escala e governança.', 'escala'],
];

const foundations = [
  ['Mapeamento de Perfil Diamante', 'Leitura do negócio, oferta, público e pontos de atrito antes de definir qualquer arquitetura.'],
  ['Arquitetura exclusiva', 'Site, páginas, fluxos e integrações desenhados para a realidade de cada empresa.'],
  ['Engenharia de conversão', 'Hierarquia, conteúdo e caminhos de contato organizados para facilitar a próxima decisão.'],
  ['Governança contínua', 'Publicação, estabilidade, segurança, medição e evolução sob responsabilidade técnica clara.'],
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
  ['Clínica odontológica', 'odontologia'], ['Dedetização', 'dedetizacao'],
  ['Restaurante e delivery', 'restaurante'], ['Estética e beleza', 'estetica'],
  ['Academia e studio', 'academia'], ['Oficina mecânica', 'oficina'],
  ['Pet shop', 'pet-shop'], ['Advocacia', 'advocacia'],
  ['Imobiliária', 'imobiliaria'], ['Escola e cursos', 'escola'],
];

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.sv-reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="sv-home" id="main-content">
      <section className="sv-hero" aria-labelledby="home-title">
        <div className="sv-shell sv-hero-layout">
          <div className="sv-hero-copy">
            <p className="sv-kicker">Engenharia de crescimento para negócios locais</p>
            <h1 id="home-title">Engenharia que transforma presença digital em <strong>decisão comercial.</strong></h1>
            <p className="sv-lead">O Rei das Vendas organiza posicionamento, experiência, conversão e tecnologia em uma operação clara, mensurável e construída para a realidade do seu negócio.</p>
            <div className="sv-actions">
              <Link className="sv-button" to="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">→</span></Link>
              <Link className="sv-link" to="/solucoes">Ver soluções <span aria-hidden="true">↗</span></Link>
            </div>
            <dl className="sv-proof-list">
              <div><dt>Processo documentado</dt><dd>Decisões, critérios e responsáveis definidos.</dd></div>
              <div><dt>Escopo validado</dt><dd>Prioridades alinhadas antes da execução.</dd></div>
              <div><dt>Entrega acompanhada</dt><dd>Visibilidade do início à evolução.</dd></div>
            </dl>
          </div>

          <div className="sv-diagnostic" aria-labelledby="diagnostic-title">
            <div className="sv-diagnostic-head">
              <div><p>Diagnóstico Rei das Vendas</p><h2 id="diagnostic-title">Qual é o estágio atual do seu negócio?</h2></div>
              <span>Passo 1 de 2</span>
            </div>
            <p className="sv-diagnostic-intro">Escolha o ponto de partida para receber uma análise coerente com o seu momento.</p>
            <div className="sv-stage-list">
              {stages.map(([title, text, stage], index) => (
                <Link key={stage} to={`/diagnostico?estagio=${stage}`}>
                  <span>0{index + 1}</span><div><strong>{title}</strong><small>{text}</small></div><b aria-hidden="true">→</b>
                </Link>
              ))}
            </div>
            <p className="sv-privacy">Suas respostas são usadas somente para preparar o diagnóstico.</p>
          </div>
        </div>
        <div className="sv-shell sv-hero-media">
          <img src="/imagens/rei-das-vendas-hero.webp" alt="Ambiente de um negócio local preparado para receber clientes" width="1344" height="768" loading="lazy" decoding="async" />
          <p><strong>Negócios reais exigem presença profissional.</strong><span>Imagem editorial ilustrativa produzida para o Rei das Vendas.</span></p>
        </div>
      </section>

      <section id="solucoes" className="sv-statement sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">O formato</p>
          <h2>Não é pacote pronto. É uma <span>unidade externa de tecnologia e governança.</span></h2>
          <p>Uma estrutura terceirizada e independente que mapeia prioridades, constrói a solução e mantém a evolução digital conectada a indicadores verificáveis.</p>
        </div>
      </section>

      <section id="metodo" className="sv-section sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head"><div><p className="sv-kicker">Solução completa digital</p><h2>Uma execução. Quatro camadas de soberania.</h2></div><p>A tecnologia vem depois do diagnóstico. Primeiro organizamos a hierarquia do negócio; depois, os componentes, integrações e a governança necessários.</p></header>
          <div className="sv-foundations">{foundations.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="sv-audit sv-reveal">
        <div className="sv-shell sv-audit-grid">
          <div><p className="sv-kicker">Diagnóstico antes da execução</p><h2>Decisão técnica começa com uma leitura fria do cenário.</h2><p>Mapeamos o que existe, onde há atrito e o que realmente merece prioridade. Sem urgência artificial e sem métrica inventada.</p><Link className="sv-link" to="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">↗</span></Link></div>
          <div className="sv-audit-list">{audit.map(([number, title, text]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="sv-project-section sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head"><div><p className="sv-kicker">Projetos em produção</p><h2>Capacidade demonstrada em operações publicadas.</h2></div><p>Cada arquitetura responde ao objetivo, ao público e ao estágio específico do projeto.</p></header>
          <div className="sv-projects">{projects.map(([name, text, url, label]) => <a href={url} target="_blank" rel="noopener noreferrer" key={name}><span>{label}</span><h3>{name}</h3><p>{text}</p><b aria-hidden="true">↗</b></a>)}</div>
          <Link className="sv-button sv-button-inline" to="/portfolio">Ver arquiteturas publicadas <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="sv-segments sv-reveal">
        <div className="sv-shell"><p className="sv-kicker">Biblioteca de possibilidades</p><h2>Referências por segmento. A solução final continua exclusiva.</h2><div className="sv-segment-list">{models.map(([model, slug]) => <Link to={`/contato?modelo=${slug}`} key={model}>{model}<span aria-hidden="true">↗</span></Link>)}</div><Link className="sv-button sv-button-inline" to="/templates">Explorar possibilidades <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="sv-cta sv-reveal">
        <div className="sv-shell"><p className="sv-kicker">Próximo movimento</p><h2>Antes de construir mais tecnologia, descubra o que merece ser construído.</h2><p>O processo começa pelo cenário, pelos gargalos e pelas prioridades capazes de sustentar uma solução digital completa.</p><Link className="sv-button sv-button-inline" to="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">↗</span></Link><small>Escopo transparente · Arquitetura exclusiva · Governança independente</small></div>
      </section>
    </main>
  );
}
