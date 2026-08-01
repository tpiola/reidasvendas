import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import './HomeSovereign.css';
import './PortfolioSovereign.css';

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const target = parseInt(value, 10);
  const suffix = value.replace(/^[0-9]+/, '');

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(String(Math.round(eased * target)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const PILLARS = [
  {
    tag: 'Site',
    title: 'Site de alta conversão',
    text: 'Hierarquia clara e caminho direto para orçamento ou agendamento.',
    img: BRAND.images.services.sites,
  },
  {
    tag: 'Automação',
    title: 'Automação de WhatsApp',
    text: 'Responde, agenda e triagem leads mesmo fora do horário comercial.',
    img: BRAND.images.services.automations,
  },
  {
    tag: 'Aplicativo',
    title: 'Aplicativos sob medida',
    text: 'Quando o site não basta: agendamento, catálogo ou painel interno.',
    img: BRAND.images.services.apps,
  },
  {
    tag: 'Diagnóstico',
    title: 'Diagnóstico de erros operacionais',
    text: 'Encontramos onde sua empresa perde clientes hoje.',
    img: BRAND.images.services.dashboards,
  },
];

const CASES = [
  {
    name: 'SaúdeGPT',
    meta: 'Produto de IA · Ao vivo',
    tags: ['IA generativa', 'React', 'Node.js'],
    text: 'IA especializada em saúde, com respostas orientadas por diretrizes clínicas. Software complexo, não só uma página.',
    href: 'https://saudegpt.com',
  },
  {
    name: 'Sentinela Saúde Ambiental',
    meta: 'Sistema de gestão · Ao vivo',
    tags: ['Dashboard', 'TypeScript', 'Automação de dados'],
    text: 'Vigilância ambiental em saúde pública com indicadores em tempo real e relatórios automáticos.',
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'Thiago Piola — Vitrine profissional',
    meta: 'Site premium · Ao vivo',
    tags: ['Presença digital', 'Performance', 'SEO local'],
    text: 'Mesmo padrão de construção dos projetos de clientes: rápido, responsivo e preparado para buscas.',
    href: 'https://thiagopiola.com.br',
  },
  {
    name: 'Rei das Vendas — infraestrutura própria',
    meta: 'Captação e automação · Em operação',
    tags: ['Captação de leads', 'Automação de resposta', 'Painel interno'],
    text: 'Este site roda sobre a mesma estrutura que vendemos: captação e roteamento automático de leads.',
    href: 'https://www.reidasvendas.com.br',
  },
];

const PROCESS = [
  ['01', 'Diagnóstico', 'Analisamos seu site, seu Google e onde hoje trava a venda.'],
  ['02', 'Plano da solução', 'Site, automação, aplicativo — ou os três juntos.'],
  ['03', 'Construção', 'Padrão premium, revisado antes de publicar.'],
  ['04', 'Publicação', 'No ar, canais conectados, automações ativas.'],
  ['05', 'Acompanhamento', 'Suporte e ajustes com base no uso real.'],
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
              Site de alta conversão, automação de WhatsApp, aplicativo sob medida e diagnóstico dos erros
              que hoje afastam clientes. Sempre desenhado a partir do seu negócio — nunca de um template.
            </p>
            <div className="sv-actions">
              <span className="sv-pf-pulse-wrap">
                <a className="sv-button" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                  Solicitar análise do meu negócio <span>↗</span>
                </a>
              </span>
              <Link className="sv-link" to="/templates">Ver modelos por segmento <span>→</span></Link>
            </div>

            <div className="sv-pf-stats">
              <div>
                <strong><CountUp value={BRAND.stats.projects} /></strong>
                <span>Projetos entregues</span>
              </div>
              <div>
                <strong><CountUp value={BRAND.stats.satisfaction} /></strong>
                <span>Satisfação dos clientes</span>
              </div>
              <div>
                <strong><CountUp value={BRAND.stats.years} /></strong>
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
            Sempre a combinação certa para o seu negócio — nunca um pacote fechado.
          </p>

          <div className="sv-pf-pillar-grid">
            {PILLARS.map((pillar, index) => (
              <article key={pillar.title} className="sv-pf-pillar-card">
                <div className="sv-pf-pillar-media">
                  <img src={pillar.img} alt={pillar.title} loading="lazy" />
                  <span className="sv-pf-pillar-tag">{pillar.tag}</span>
                  <span className="sv-pf-pillar-num" aria-hidden="true">0{index + 1}</span>
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

      {/* ─── QUEBRA ─── */}
      <section className="sv-pf-statement sv-reveal">
        <div className="sv-shell">
          <p><span>Se um template resolvesse,</span> seu concorrente já teria comprado o mesmo. Cada projeto é desenhado a partir do seu negócio — nunca o contrário.</p>
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
            Sem cases inventados. Cada link abaixo está no ar agora — clique e confira.
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
            <p>Você acompanha cada etapa — sem promessas vagas.</p>
          </header>
          <div className="sv-pf-timeline">
            {PROCESS.map(([n, title, text]) => (
              <div className="sv-pf-t-item" key={title}>
                <span className="sv-pf-t-num">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
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
