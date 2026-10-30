import Link from 'next/link';
import { metadata as createMetadata } from '@/lib/site';

export const metadata = createMetadata(
  'Tecnologia e governança para negócios locais em Franca',
  'Sites profissionais, presença no Google, atendimento e ferramentas de gestão para empresas em Franca e no Brasil. Diagnóstico e implantação com escopo transparente.',
  '/',
);

const solutions = [
  { icon: '01', title: 'Presença que gera confiança', copy: 'Sites rápidos, comunicação clara, busca local e caminhos de contato para transformar interesse em conversas comerciais.', href: '/sites-para-pequenos-negocios', cta: 'Conhecer sites' },
  { icon: '02', title: 'Atendimento sem oportunidades esquecidas', copy: 'Formulários contextualizados, organização do contato e automações proporcionais à operação de cada empresa.', href: '/automacao-comercial', cta: 'Conhecer automações' },
  { icon: '03', title: 'Controle da operação', copy: 'Arquiteturas demonstrativas para acompanhar pedidos, estoque, agenda, produtividade e indicadores em uma só experiência.', href: '/plataforma/demo', cta: 'Explorar a demonstração' },
];
const sectors = [
  ['Comércio e distribuidoras', 'Catálogo, estoque, pedidos e reposição.'],
  ['Clínicas e consultórios', 'Agenda, atendimento e administração.'],
  ['Bares e alimentação', 'Cardápio, pedidos e operação.'],
  ['Barbearias e estética', 'Horários, serviços e recorrência.'],
  ['Advocacia e serviços', 'Captação qualificada e organização de demandas.'],
  ['Escolas e educação', 'Informação, matrículas e comunicação.'],
];
const promises = [
  ['Escopo por escrito', 'O que será entregue, o que não está incluído e os critérios de aceite constam da proposta.'],
  ['Prazos acompanháveis', 'Etapas, dependências e atualizações são definidas antes do início de cada projeto.'],
  ['Custos sem surpresa', 'Domínio, hospedagem, licenças, manutenção e integrações devem estar identificados.'],
  ['Autonomia e continuidade', 'Titularidade de contas e ativos, acessos e condições de saída são formalizados em contrato.'],
];
const faqs = [
  ['O domínio e os acessos ficam comigo?', 'A titularidade de domínio, contas, licenças e ativos é definida em contrato. Recomendamos que os ativos centrais permaneçam sob controle do cliente, com acessos técnicos delegados.'],
  ['Como sei o que estou contratando?', 'A proposta discrimina entregas, exclusões, dependências, prazos, revisões, preços e critérios de aceite.'],
  ['O que acontece depois da publicação?', 'A manutenção e evolução seguem o escopo contratado, com canais e condições de suporte previstos.'],
  ['Vocês garantem vendas ou primeiro lugar no Google?', 'Não. Entregamos infraestrutura, melhoria de experiência e indicadores acompanháveis. Vendas dependem também de oferta, mercado e operação.'],
];
export default function Home() {
  return <div className="rdv-white">
    <style>{`
      .rdv-white{background:#fff;color:#192630;font-family:Arial,Helvetica,sans-serif;overflow:hidden}
      .rdv-white *{box-sizing:border-box}.rdv-white .wrap{max-width:1190px;margin:auto;padding-left:26px;padding-right:26px}
      .rdv-white a{text-decoration:none}.rdv-white .kicker{color:#326e62;font-size:12px;letter-spacing:.19em;text-transform:uppercase;font-weight:800;margin-bottom:21px}
      .rdv-white h1,.rdv-white h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.045em}
      .rdv-white h1{font-size:clamp(47px,6.7vw,89px);line-height:1.07;margin:0 0 26px}
      .rdv-white h2{font-size:clamp(34px,4vw,58px);line-height:1.11;margin:0 0 23px}
      .rdv-white h3{font-size:21px;line-height:1.25;margin:12px 0}
      .rdv-white p{line-height:1.75}.rdv-white .muted{color:#53616b}
      .rdv-white .button-solid{background:#153d36;color:white;display:inline-flex;align-items:center;justify-content:center;padding:17px 23px;border-radius:9px;font-weight:700;transition:transform .18s,background .18s}
      .rdv-white .button-solid:hover{background:#225d52;transform:translateY(-2px)}
      .rdv-white .button-outline{display:inline-flex;align-items:center;justify-content:center;padding:16px 22px;border:1px solid #bbc9c4;border-radius:9px;color:#153d36;font-weight:700}
      .rdv-white .hero{background:linear-gradient(125deg,#fff 42%,#f0f7f4);padding:100px 0 94px}
      .rdv-white .hero-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center}
      .rdv-white .lead{max-width:650px;color:#465862;font-size:19px;line-height:1.7}
      .rdv-white .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin:30px 0}
      .rdv-white .proof{border-top:1px solid #dce6e1;padding-top:23px;color:#4e6561;font-size:13px}
      .rdv-white .product-visual{border:1px solid #d9e7e0;box-shadow:0 24px 75px #17352d12;border-radius:22px;background:#fff;overflow:hidden;transform:rotate(-1.5deg)}
      .rdv-white .visual-top{display:flex;justify-content:space-between;background:#f2f7f4;padding:17px 22px;font-size:12px;color:#557168;border-bottom:1px solid #dfebe4}
      .rdv-white .visual-content{padding:27px}.rdv-white .visual-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:21px 0}
      .rdv-white .visual-metric{background:#f6f8f7;padding:18px;border-radius:11px}.rdv-white .visual-metric strong{font-size:29px;display:block;margin:8px 0;color:#1c5146}
      .rdv-white .visual-bars{display:flex;gap:7px;height:80px;align-items:end}.rdv-white .visual-bars i{display:block;background:#82bba6;border-radius:6px 6px 0 0;flex:1}
      .rdv-white section.pad{padding:100px 0}.rdv-white .section-intro{max-width:780px;margin-bottom:35px}
      .rdv-white .three{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
      .rdv-white .card{border:1px solid #e1e8e5;padding:31px;border-radius:16px;background:white;transition:box-shadow .2s,transform .2s}
      .rdv-white .card:hover{box-shadow:0 14px 40px #2038300e;transform:translateY(-3px)}
      .rdv-white .step{font-size:13px;color:#2c8069;font-weight:800}.rdv-white .card p{color:#57646c;font-size:15px}
      .rdv-white .card a{color:#175a4b;font-weight:750}
      .rdv-white .soft{background:#f5f8f6}.rdv-white .sector-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}
      .rdv-white .sector{background:white;border:1px solid #e1e8e5;border-radius:12px;padding:24px}.rdv-white .sector strong{font-size:16px}.rdv-white .sector p{color:#64716c;font-size:14px;margin-bottom:0}
      .rdv-white .promise-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}
      .rdv-white .promise{padding:24px 27px;border-left:3px solid #528d7a;background:#f7f9f7}.rdv-white .promise strong{font-size:18px}
      .rdv-white .faq details{border-bottom:1px solid #e0e7e3;padding:21px 0}.rdv-white .faq summary{font-weight:700;cursor:pointer}.rdv-white .faq p{color:#5a676a}
      .rdv-white .closing{background:#133b34;color:white;padding:76px 0}.rdv-white .closing p{color:#d6e8e0}
      .rdv-white a:focus-visible,.rdv-white summary:focus-visible{outline:3px solid #bb8e3e;outline-offset:4px}
      @media(max-width:820px){.rdv-white .hero-layout{grid-template-columns:1fr}.rdv-white .three,.rdv-white .sector-grid{grid-template-columns:repeat(2,1fr)}.rdv-white .hero{padding:66px 0}.rdv-white section.pad{padding:65px 0}}
      @media(max-width:580px){.rdv-white .three,.rdv-white .sector-grid,.rdv-white .promise-grid{grid-template-columns:1fr}.rdv-white .hero-actions>a{width:100%}.rdv-white .wrap{padding-left:20px;padding-right:20px}}
      @media(prefers-reduced-motion:reduce){.rdv-white *, .rdv-white *::before,.rdv-white *::after{transition:none!important;animation:none!important}}
    `}</style>
    <section className="hero"><div className="wrap hero-layout"><div>
      <div className="kicker">Tecnologia e governança para negócios locais</div>
      <h1>Mais clientes.<br/>Mais controle.<br/><span style={{color:'#35806b'}}>Menos improviso.</span></h1>
      <p className="lead">Sua empresa merece mais do que um site bonito. Construímos sua presença digital e organizamos os caminhos entre atendimento, pedidos e operação — com soluções proporcionais ao tamanho do negócio.</p>
      <div className="hero-actions"><Link className="button-solid" href="/diagnostico" data-event="click_cta_diagnostico">Solicitar meu diagnóstico ↗</Link><a className="button-outline" href="#solucoes">Entender as soluções ↓</a></div>
      <div className="proof">Franca/SP · Atendimento em todo o Brasil · Escopo e investimento apresentados antes de contratar</div>
    </div><div className="product-visual" aria-label="Ilustração demonstrativa de painel empresarial"><div className="visual-top"><strong>REI DAS VENDAS / OPERAÇÃO</strong><span>VISÃO DEMONSTRATIVA</span></div><div className="visual-content"><small style={{color:'#6a7a71'}}>Visão executiva</small><h3>O que importa, em um lugar.</h3><div className="visual-grid"><div className="visual-metric"><small>Pedidos em análise</small><strong>24</strong><small>Exemplo fictício</small></div><div className="visual-metric"><small>Itens a repor</small><strong>03</strong><small>Exemplo fictício</small></div></div><div className="visual-bars">{[40,57,47,70,62,85,76,100].map((v,i)=><i key={i} style={{height:v+'%'}}/>)}</div><p className="muted" style={{fontSize:12}}>Representação conceitual. Não apresenta dados de clientes reais.</p></div></div></div></section>
    <section className="pad" id="solucoes"><div className="wrap"><div className="section-intro"><div className="kicker">Uma operação digital conectada</div><h2>Não é só aparecer.<br/>É fazer o negócio funcionar melhor.</h2><p className="muted">Começamos pelo que sua empresa realmente precisa. Sem empurrar ferramentas desnecessárias.</p></div><div className="three">{solutions.map(s=><article className="card" key={s.icon}><span className="step">{s.icon} / SOLUÇÃO</span><h3>{s.title}</h3><p>{s.copy}</p><Link href={s.href}>{s.cta} ↗</Link></article>)}</div></div></section>
    <section className="pad soft"><div className="wrap"><div className="section-intro"><div className="kicker">Cada empresa, uma arquitetura</div><h2>Tecnologia que entende seu setor.</h2><p className="muted">O mesmo princípio de governança, adaptado ao trabalho real de cada empresa. Módulos de gestão são projetos em desenvolvimento e dependem de implantação específica.</p></div><div className="sector-grid">{sectors.map(([t,d])=><div className="sector" key={t}><strong>{t}</strong><p>{d}</p></div>)}</div></div></section>
    <section className="pad"><div className="wrap"><div className="section-intro"><div className="kicker">O jeito certo de contratar tecnologia</div><h2>Clareza antes da venda.<br/>Responsabilidade depois.</h2><p className="muted">Projetos digitais precisam de condições transparentes. Estes são compromissos que levamos para a especificação e para o contrato de cada implantação.</p></div><div className="promise-grid">{promises.map(([a,b])=><div className="promise" key={a}><strong>{a}</strong><p className="muted">{b}</p></div>)}</div></div></section>
    <section className="pad soft"><div className="wrap"><div className="section-intro"><div className="kicker">Da primeira conversa à evolução</div><h2>Um processo que você consegue acompanhar.</h2></div><div className="three">{[['01','Diagnóstico','Entendemos sua operação, seus canais e as prioridades do negócio.'],['02','Projeto e implantação','Definimos entregas, custos, dependências, cronograma e critérios de aceite.'],['03','Medição e continuidade','Acompanhamos o que foi contratado, com ajustes e novas etapas quando fizer sentido.']].map(([n,t,d])=><article className="card" key={n}><span className="step">ETAPA {n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="pad faq"><div className="wrap"><div className="section-intro"><div className="kicker">Perguntas antes de contratar</div><h2>Sem letras miúdas no discurso.</h2></div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="closing"><div className="wrap"><div className="kicker" style={{color:'#b9ddcd'}}>Sua próxima decisão empresarial</div><h2>Seu negócio tem potencial.<br/>Vamos organizar o digital.</h2><p>Conte o momento da sua empresa. Primeiro entendemos; depois indicamos o que vale a pena construir.</p><div className="hero-actions"><Link className="button-solid" style={{background:'#fff',color:'#173f35'}} href="/diagnostico">Começar pelo diagnóstico ↗</Link><Link className="button-outline" style={{color:'#fff',borderColor:'#8bafa1'}} href="/planos">Consultar planos e condições</Link></div></div></section>
  </div>;
}