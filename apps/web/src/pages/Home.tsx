import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const stages = [
  ['Começando agora', 'Ainda não tenho uma presença digital consistente.', 'inicio'],
  ['Já tenho algo no ar', 'Tenho site ou redes, mas os resultados oscilam.', 'evolucao'],
  ['Negócio estabelecido', 'Quero previsibilidade, escala e governança.', 'escala'],
];

const foundations = [
  ['Inteligência de negócio', 'Leitura de oferta, operação, público e dados para localizar onde a tecnologia realmente deve atuar.'],
  ['Arquitetura de IA aplicada', 'Agentes, automações, interfaces e integrações desenhados a partir do processo real da empresa.'],
  ['Engenharia de decisão', 'Dados organizados em experiências que reduzem atrito e ajudam clientes e equipes a avançar.'],
  ['Governança contínua', 'Publicação, segurança, medição e evolução com responsabilidade técnica claramente definida.'],
];

const intelligence = [
  ['01', 'IA que atende', 'Agentes treinados para orientar, qualificar e encaminhar cada conversa.'],
  ['02', 'Dados que decidem', 'Painéis que transformam sinais dispersos em prioridades operacionais.'],
  ['03', 'Fluxos que executam', 'Automações conectando captação, atendimento e pós-venda sem tarefas repetitivas.'],
];

const audit = [
  ['01', 'Presença', 'Site, busca local, mapa, identidade e consistência das informações públicas.'],
  ['02', 'Conversão', 'Oferta, prova, clareza, CTAs, formulários e caminhos até o contato.'],
  ['03', 'Tecnologia', 'Performance, responsividade, acessibilidade, segurança e integrações essenciais.'],
  ['04', 'Governança', 'Medição, continuidade, documentação, publicação e prioridades de evolução.'],
];

const projects = [
  ['SaúdeGPT', 'Produto digital de saúde', 'https://saudegpt.com', 'Produto', '/imagens/portfolio/saudegpt.jpg'],
  ['Sentinela', 'Saúde ambiental e controle de pragas', 'https://sentinelasaudeambiental.com.br', 'Site local', '/imagens/portfolio/sentinela.jpg'],
  ['Thiago Piola', 'Autoridade e portfólio profissional', 'https://thiagopiola.com.br', 'Presença', '/imagens/portfolio/thiagopiola.jpg'],
];

const segmentImages = [
  ['/imagens/nichos/saude.jpg', 'Tecnologia aplicada a uma operação de saúde'],
  ['/imagens/nichos/servicos.jpg', 'Equipe de serviços usando processos digitais'],
  ['/imagens/nichos/comercio.jpg', 'Operação comercial conectada por tecnologia'],
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
            <p className="sv-kicker">Unidade externa de inteligência e tecnologia</p>
            <h1 id="home-title">Sua empresa não precisa de mais software. Precisa de <strong>inteligência operacional.</strong></h1>
            <p className="sv-lead">O Rei das Vendas projeta sites, sistemas, agentes de IA e automações como uma única infraestrutura: cada ponto captura sinais, conduz decisões e sustenta crescimento com controle.</p>
            <div className="sv-actions">
              <Link className="sv-button" to="/diagnostico">Mapear minha operação <span aria-hidden="true">→</span></Link>
              <Link className="sv-link" to="/solucoes">Explorar arquiteturas <span aria-hidden="true">↗</span></Link>
            </div>
            <dl className="sv-proof-list">
              <div><dt>Diagnóstico antes da IA</dt><dd>A tecnologia começa no gargalo, não na ferramenta.</dd></div>
              <div><dt>Arquitetura exclusiva</dt><dd>Cada fluxo responde à operação real da empresa.</dd></div>
              <div><dt>Governança verificável</dt><dd>Escopo, critérios e próximos movimentos visíveis.</dd></div>
            </dl>
          </div>

          <div className="sv-diagnostic" aria-labelledby="diagnostic-title">
            <div className="sv-diagnostic-head">
              <div><p>Mapeamento Diamante</p><h2 id="diagnostic-title">Onde a sua operação ainda depende de esforço manual?</h2></div>
              <span>Passo 1 de 2</span>
            </div>
            <p className="sv-diagnostic-intro">Escolha o ponto de partida. A análise cruza presença, conversão, tecnologia e capacidade de escala.</p>
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
        <div className="sv-shell sv-ai-stage" aria-label="Sistema de inteligência operacional Rei das Vendas">
          <div className="sv-ai-grid" aria-hidden="true" />
          <div className="sv-ai-orbit" aria-hidden="true"><i /><i /><i /></div>
          <img src="/logo-mark.svg" alt="Símbolo Rei das Vendas" width="560" height="560" decoding="async" />
          <div className="sv-ai-status"><span>RDV / INTELLIGENCE CORE</span><strong>SISTEMA ATIVO</strong></div>
          <dl><div><dt>Camada 01</dt><dd>Estratégia</dd></div><div><dt>Camada 02</dt><dd>Inteligência</dd></div><div><dt>Camada 03</dt><dd>Execução</dd></div></dl>
        </div>
      </section>

      <section id="solucoes" className="sv-statement sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">O formato</p>
          <h2>Não é pacote pronto. É uma <span>unidade externa de tecnologia e governança.</span></h2>
          <p>Uma estrutura terceirizada e independente que mapeia prioridades, constrói a solução e mantém a evolução digital conectada a indicadores verificáveis.</p>
        </div>
      </section>

      <section className="sv-intelligence sv-reveal" aria-labelledby="intelligence-title">
        <div className="sv-shell">
          <header><p className="sv-kicker">Inteligência aplicada ao negócio</p><h2 id="intelligence-title">A IA só cria vantagem quando entende <span>o que precisa mover.</span></h2><p>Não instalamos automação por aparência. Desenhamos uma camada operacional que observa, responde e executa dentro do fluxo comercial da empresa.</p></header>
          <div className="sv-intelligence-list">{intelligence.map(([number,title,text])=><article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><Link to="/diagnostico" aria-label={`Mapear ${title}`}>↗</Link></article>)}</div>
          <Link className="sv-button sv-button-inline" to="/diagnostico">Identificar oportunidades de IA <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="metodo" className="sv-section sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head"><div><p className="sv-kicker">Solução completa digital</p><h2>Uma infraestrutura. Quatro camadas de soberania.</h2></div><p>A inteligência vem depois do diagnóstico. Primeiro organizamos a hierarquia do negócio; depois, agentes, interfaces, integrações e governança.</p></header>
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
          <div className="sv-projects">{projects.map(([name, text, url, label, image]) => <a href={url} target="_blank" rel="noopener noreferrer" key={name}><img src={image} alt={`Projeto ${name}`} width="720" height="480" loading="lazy" decoding="async" /><div><span>{label}</span><h3>{name}</h3><p>{text}</p><b aria-hidden="true">↗</b></div></a>)}</div>
          <Link className="sv-button sv-button-inline" to="/portfolio">Ver arquiteturas publicadas <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="sv-segments sv-reveal">
        <div className="sv-shell"><p className="sv-kicker">Biblioteca de possibilidades</p><h2>Referências por segmento. A solução final continua exclusiva.</h2><div className="sv-segment-visuals" aria-label="Operações atendidas">{segmentImages.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} width="720" height="540" loading="lazy" decoding="async" /></figure>)}</div><div className="sv-segment-list">{models.map(([model, slug]) => <Link to={`/contato?modelo=${slug}`} key={model}>{model}<span aria-hidden="true">↗</span></Link>)}</div><Link className="sv-button sv-button-inline" to="/templates">Explorar possibilidades <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="sv-cta sv-reveal">
        <div className="sv-shell"><p className="sv-kicker">Próximo movimento</p><h2>Antes de construir mais tecnologia, descubra o que merece ser construído.</h2><p>O processo começa pelo cenário, pelos gargalos e pelas prioridades capazes de sustentar uma solução digital completa.</p><Link className="sv-button sv-button-inline" to="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">↗</span></Link><small>Escopo transparente · Arquitetura exclusiva · Governança independente</small></div>
      </section>
    </main>
  );
}
