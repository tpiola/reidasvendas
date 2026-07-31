import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import './HomeSovereign.css';
import './PortfolioSovereign.css';

const PILLARS = [
  {
    tag: 'Site',
    title: 'Site de alta conversão',
    text: 'Projetado para transformar visita em contato: hierarquia clara, prova social e caminhos diretos para orçamento ou agendamento.',
    img: BRAND.images.services.sites,
  },
  {
    tag: 'Automação',
    title: 'Automação de WhatsApp',
    text: 'Respostas automáticas, confirmação de agendamento e triagem de leads — sua empresa atende mesmo fora do horário comercial.',
    img: BRAND.images.services.automations,
  },
  {
    tag: 'Aplicativo',
    title: 'Aplicativos sob medida',
    text: 'Quando um site não resolve, construímos o sistema certo: agendamento, catálogo ou painel interno para a operação do negócio.',
    img: BRAND.images.services.apps,
  },
  {
    tag: 'Diagnóstico',
    title: 'Diagnóstico de erros operacionais',
    text: 'Analisamos onde sua empresa perde clientes hoje — informações erradas, atendimento lento, processos que travam a venda.',
    img: BRAND.images.services.dashboards,
  },
];

const CASES = [
  {
    name: 'SaúdeGPT',
    meta: 'Produto de IA · Ao vivo',
    tags: ['IA generativa', 'React', 'Node.js'],
    text: 'Plataforma de inteligência artificial especializada em saúde, com respostas orientadas por diretrizes clínicas. Prova de que construímos software complexo, não apenas páginas.',
    href: 'https://saudegpt.com',
  },
  {
    name: 'Sentinela Saúde Ambiental',
    meta: 'Sistema de gestão · Ao vivo',
    tags: ['Dashboard', 'TypeScript', 'Automação de dados'],
    text: 'Sistema de monitoramento para vigilância ambiental em saúde pública, com indicadores em tempo real e relatórios automatizados — o mesmo tipo de painel que aplicamos a operações comerciais.',
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'Thiago Piola — Vitrine profissional',
    meta: 'Site premium · Ao vivo',
    tags: ['Presença digital', 'Performance', 'SEO local'],
    text: 'Site de autoridade profissional publicado com o mesmo padrão de construção usado nos projetos de clientes: rápido, responsivo e preparado para buscas.',
    href: 'https://thiagopiola.com.br',
  },
  {
    name: 'Rei das Vendas — infraestrutura própria',
    meta: 'Captação e automação · Em operação',
    tags: ['Captação de leads', 'Automação de resposta', 'Painel interno'],
    text: 'O próprio Rei das Vendas roda sobre a estrutura que vendemos: captação automática de leads e roteamento de contato sem intervenção manual.',
    href: 'https://www.reidasvendas.com.br',
  },
];

const PROCESS = [
  ['01', 'Diagnóstico', 'Analisamos seu site atual, seu perfil no Google e os pontos que hoje travam o atendimento ou a venda.'],
  ['02', 'Plano da solução', 'Definimos o que resolve de verdade: site, automação de WhatsApp, aplicativo ou uma combinação dos três.'],
  ['03', 'Construção', 'Desenvolvemos com padrão premium, revisando cada etapa antes de qualquer publicação.'],
  ['04', 'Publicação e automação', 'Colocamos no ar, ligamos os canais de contato e ativamos as automações combinadas.'],
  ['05', 'Acompanhamento', 'Suporte contínuo e ajustes com base no uso real — sua presença evolui junto com o negócio.'],
];

export default function Portfolio() {
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
    <main className="sv-home sv-portfolio">
      {/* ─── HERO ─── */}
      <section className="sv-pf-hero">
        <div className="sv-shell sv-pf-hero-grid">
          <div className="sv-hero-enter">
            <p className="sv-kicker"><span /> Projetos reais · Franca e região</p>
            <h1>
              Não vendemos um site pronto. <strong>Vendemos a solução que faz seu negócio vender mais.</strong>
            </h1>
            <p className="sv-pf-lead">
              Site de alta conversão, automação de WhatsApp, aplicativos sob medida e diagnóstico dos erros
              operacionais que hoje afastam clientes — tudo construído em torno do seu negócio, nunca um template genérico.
            </p>
            <div className="sv-actions">
              <a className="sv-button" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                Solicitar análise do meu negócio <span>↗</span>
              </a>
              <Link className="sv-link" to="/templates">Ver modelos por segmento <span>→</span></Link>
            </div>

            <div className="sv-pf-stats">
              <div>
                <strong>{BRAND.stats.projects}</strong>
                <span>Projetos entregues</span>
              </div>
              <div>
                <strong>{BRAND.stats.satisfaction}</strong>
                <span>Satisfação dos clientes</span>
              </div>
              <div>
                <strong>{BRAND.stats.years}</strong>
                <span>Anos de experiência</span>
              </div>
            </div>
          </div>

          <div className="sv-visual-enter" aria-hidden="true">
            <div className="sv-pf-phone">
              <div className="sv-pf-phone-bar">
                <span className="sv-pf-phone-avatar">RV</span>
                <div>
                  <b>Atendimento automático</b>
                  <span>● Online agora</span>
                </div>
              </div>
              <div className="sv-pf-phone-msgs">
                <div className="sv-pf-bubble sv-pf-bubble-in">Oi! Vi o anúncio de vocês, qual o horário disponível para amanhã?</div>
                <span className="sv-pf-bubble-auto"><i /> Resposta automática</span>
                <div className="sv-pf-bubble sv-pf-bubble-out">Temos 14h e 16h30 livres amanhã. Posso confirmar um horário pra você agora?</div>
                <div className="sv-pf-bubble sv-pf-bubble-in">Pode ser 16h30!</div>
              </div>
              <div className="sv-pf-phone-cta">Agendamento confirmado automaticamente</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PILARES ─── */}
      <section className="sv-pf-pillars sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker"><span /> O que entregamos</p>
          <h2 style={{ margin: 0, maxWidth: 720, fontSize: 'clamp(30px,7vw,48px)', fontWeight: 650, lineHeight: 1.08, letterSpacing: '-0.04em' }}>
            Quatro frentes. Uma única solução para vender mais.
          </h2>
          <p style={{ maxWidth: 560, marginTop: 16, color: 'var(--sv-muted)', lineHeight: 1.7 }}>
            Cada projeto combina o que o negócio realmente precisa — nunca um pacote fechado de template.
          </p>

          <div className="sv-pf-pillar-grid">
            {PILLARS.map((pillar) => (
              <article key={pillar.title} className="sv-pf-pillar-card">
                <div className="sv-pf-pillar-media">
                  <img src={pillar.img} alt={pillar.title} loading="lazy" />
                  <span>{pillar.tag}</span>
                </div>
                <div className="sv-pf-pillar-body">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASES ─── */}
      <section className="sv-pf-projects sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker"><span /> Prova de capacidade</p>
          <h2 style={{ margin: 0, maxWidth: 760, fontSize: 'clamp(30px,7vw,48px)', fontWeight: 650, lineHeight: 1.08, letterSpacing: '-0.04em' }}>
            Projetos reais, publicados e em operação.
          </h2>
          <p style={{ maxWidth: 580, marginTop: 16, color: 'var(--sv-muted)', lineHeight: 1.7 }}>
            Sem cases inventados e sem números sem comprovação. Cada projeto abaixo está no ar — visite e confira.
          </p>

          <div className="sv-pf-case-list">
            {CASES.map((item) => (
              <div className="sv-pf-case" key={item.name}>
                <div>
                  <div className="sv-pf-case-head">
                    <h3>{item.name}</h3>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      Visitar projeto <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="sv-pf-case-meta" style={{ marginTop: 10 }}>{item.meta}</p>
                </div>
                <div>
                  <p>{item.text}</p>
                  <div className="sv-pf-case-tags" style={{ marginTop: 14 }}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESSO ─── */}
      <section id="metodo" className="sv-pf-process sv-reveal">
        <div className="sv-shell">
          <header className="sv-section-head">
            <div>
              <p className="sv-kicker"><span /> Como funciona</p>
              <h2>Um processo. Cinco etapas até o resultado.</h2>
            </div>
            <p>Sem promessas vagas — você acompanha exatamente o que está sendo construído e por quê.</p>
          </header>
          <div className="sv-foundations">
            {PROCESS.map(([n, title, text]) => (
              <article key={title}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="sv-cta sv-reveal">
        <div className="sv-shell">
          <p className="sv-kicker">PRÓXIMO PASSO</p>
          <h2>Seu negócio pode ser o próximo projeto no ar.</h2>
          <p>Envie seu site atual ou o perfil da empresa no Google. Mostramos exatamente onde está a perda de clientes e o que resolve.</p>
          <a className="sv-button" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
            Solicitar análise do meu negócio <span>↗</span>
          </a>
          <small>Escopo transparente, projeto personalizado e tudo explicado com clareza.</small>
        </div>
      </section>
    </main>
  );
}
