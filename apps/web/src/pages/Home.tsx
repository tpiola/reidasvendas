import { Link } from 'react-router-dom';
import './HomeSovereign.css';

const solutions = [
  ['01', 'Sites de alta conversão', 'Arquitetura, copy e experiência para transformar atenção em oportunidades qualificadas.'],
  ['02', 'Presença local dominante', 'SEO local, reputação e autoridade para ocupar o território digital da sua região.'],
  ['03', 'Automação comercial', 'Atendimento, qualificação e follow-up conectados em um fluxo ininterrupto.'],
  ['04', 'Aplicativos sob medida', 'Catálogos, portais e sistemas leves para reduzir atrito e acelerar a operação.'],
];

const segments = [
  ['Clínicas & Saúde', 'Confiança, agenda e autoridade local.'],
  ['Serviços Premium', 'Posicionamento à altura do seu ticket.'],
  ['Imobiliário', 'Intenção qualificada e visitas.'],
  ['Gastronomia', 'Descoberta, desejo e reserva.'],
  ['Jurídico', 'Autoridade com aquisição ética.'],
  ['Educação', 'Da descoberta à matrícula.'],
];

export default function Home() {
  return (
    <main className="sv-home">
      <section className="sv-hero sv-shell">
        <div className="sv-hero-copy">
          <p className="sv-kicker"><span /> Unidade Externa de Tecnologia</p>
          <h1>Seu negócio é local.<br/><em>Sua autoridade, não.</em></h1>
          <p className="sv-lead">Construímos a infraestrutura digital que transforma empresas locais em referências incontornáveis de suas regiões.</p>
          <div className="sv-actions">
            <Link className="sv-button" to="/contato">Solicitar diagnóstico <b>↗</b></Link>
            <a className="sv-link" href="#solucoes">Explorar soluções <span>→</span></a>
          </div>
        </div>
        <aside className="sv-signal" aria-label="Sistema de engenharia de crescimento">
          <div className="sv-signal-head"><span>ENGENHARIA DE CRESCIMENTO</span><i>OPERACIONAL</i></div>
          <div className="sv-radar"><div className="sv-orbit sv-o1"/><div className="sv-orbit sv-o2"/><div className="sv-orbit sv-o3"/><div className="sv-core">RDV<small>SISTEMA ATIVO</small></div><span className="sv-node sv-n1"/><span className="sv-node sv-n2"/><span className="sv-node sv-n3"/></div>
          <div className="sv-metrics"><div><strong>24/7</strong><span>Fluxo ativo</span></div><div><strong>360°</strong><span>Governança</span></div><div><strong>01</strong><span>Operação</span></div></div>
        </aside>
      </section>

      <div className="sv-strip"><div className="sv-shell"><span>ESTRATÉGIA</span><i>◆</i><span>DESIGN</span><i>◆</i><span>TECNOLOGIA</span><i>◆</i><span>AUTOMAÇÃO</span><i>◆</i><span>INTELIGÊNCIA</span></div></div>

      <section className="sv-light"><div className="sv-shell sv-intro">
        <div><p className="sv-kicker">O PROBLEMA REAL</p><h2>Não é falta de presença.<br/>É falta de <em>governança.</em></h2></div>
        <div><p>A maioria dos negócios locais acumula ferramentas desconectadas, fornecedores fragmentados e decisões sem dados.</p><p>Nós substituímos esse caos por uma <strong>Solução Completa Digital</strong>: uma estrutura única, mensurável e construída para gerar resultado.</p></div>
      </div></section>

      <section id="solucoes" className="sv-section sv-shell">
        <header className="sv-section-head"><div><p className="sv-kicker">ARQUITETURAS DE SOLUÇÃO</p><h2>O sistema por trás<br/>da sua próxima fase.</h2></div><p>Não vendemos peças soltas. Conectamos posicionamento, aquisição e conversão sob uma única governança.</p></header>
        <div className="sv-solutions">{solutions.map(([n,t,d])=><Link to="/servicos" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>Conhecer arquitetura →</b></Link>)}</div>
      </section>

      <section id="metodo" className="sv-method"><div className="sv-shell sv-method-grid">
        <div><p className="sv-kicker">MÉTODO PROPRIETÁRIO</p><h2>Precisão antes<br/>da execução.</h2><p>Antes de criar, mapeamos. Antes de prometer, medimos. Cada projeto nasce de um diagnóstico profundo do negócio, mercado e capacidade operacional.</p></div>
        <div className="sv-steps">{[['01','Mapeamento Diamante','Oferta, posicionamento e maturidade digital.'],['02','Engenharia da Jornada','Atenção, confiança e decisão.'],['03','Implementação Soberana','Design, tecnologia e integrações.'],['04','Inteligência Operacional','Dados, evolução e resultado.']].map(x=><article key={x[0]}><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div></article>)}</div>
      </div></section>

      <section className="sv-segments"><div className="sv-shell"><header className="sv-section-head"><div><p className="sv-kicker">ESPECIALIZAÇÃO LOCAL</p><h2>Arquiteturas para quem<br/>move a economia real.</h2></div><p>Cada mercado possui uma lógica de decisão. Construímos a experiência certa para o seu.</p></header><div className="sv-segment-grid">{segments.map(([t,d])=><Link to="/segmentos" key={t}><h3>{t}</h3><p>{d}</p><span>↗</span></Link>)}</div></div></section>

      <section className="sv-proof"><div className="sv-shell"><p className="sv-kicker">GOVERNANÇA DE RESULTADOS</p><div className="sv-proof-grid"><div><strong>Estratégia</strong><span>Prioridades ancoradas no negócio</span></div><div><strong>Tecnologia</strong><span>Infraestrutura rápida e independente</span></div><div><strong>Inteligência</strong><span>Decisões orientadas por dados</span></div></div></div></section>

      <section className="sv-cta"><div className="sv-shell"><p className="sv-kicker">PRÓXIMO MOVIMENTO</p><h2>Seu mercado não espera.<br/><em>Sua estrutura também não deveria.</em></h2><p>Solicite um diagnóstico estratégico. Se houver aderência, mostraremos a arquitetura necessária para a sua próxima fase.</p><Link className="sv-button" to="/contato">Iniciar diagnóstico <b>↗</b></Link><small>Sem compromisso · Análise individual · Retorno em até 1 dia útil</small></div></section>
    </main>
  );
}
