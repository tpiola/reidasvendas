import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { ProjectVideo } from '@/components/ProjectVideo';
import { SetorDivider } from '@/components/SetorDivider';
import { Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { BRAND } from '@/lib/brand';
import {
  ACQUISITION_CHANNELS,
  DELIVERY_MODELS,
  FAMILY_LABELS,
  MARKETPLACE_ITEMS,
  type SolutionFamily,
} from '@/lib/marketplace';

const FAMILY_ORDER: SolutionFamily[] = [
  'presenca',
  'comercio',
  'atendimento',
  'produto',
  'distribuicao',
  'operacao',
];

const PROJECTS = [
  {
    name: 'Sentinela Saúde Ambiental',
    type: 'Serviço local · Franca/SP',
    detail: 'Serviços, áreas atendidas, diagnóstico e orçamento reunidos em uma jornada móvel.',
    image: '/imagens/portfolio/sentinela.webp',
    video: '/videos/projetos/sentinela.mp4',
    emphasis: 'flagship',
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'TKA Esportes',
    type: 'Comércio · e-commerce',
    detail: 'Trinta anos de história transformados em catálogo por categoria e experiência de compra.',
    image: '/imagens/portfolio/tka-esportes.webp',
    video: '/videos/projetos/tka.mp4',
    emphasis: 'standard',
    href: 'https://tkaesportes.com.br',
  },
];

const OTHER_WORK = [
  {
    name: 'Thiago Piola',
    type: 'Presença autoral · portfólio',
    detail: 'Trajetória, projetos e serviços organizados em uma narrativa própria.',
    image: '/imagens/portfolio/thiagopiola.webp',
    video: '/videos/projetos/thiagopiola.mp4',
    href: 'https://thiagopiola.com.br',
  },
  {
    name: 'SaúdeGPT',
    type: 'Produto conversacional · saúde',
    detail: 'Produto web guiado, com histórico e limites institucionais explícitos.',
    image: '/imagens/portfolio/saudegpt.webp',
    video: '/videos/projetos/saudegpt.mp4',
    href: 'https://saudegpt.com',
  },
];

const METHOD = [
  ['Leitura', 'Entendemos oferta, público, canais, atendimento e o que está travando a próxima venda.'],
  ['Corte', 'Priorizamos a intervenção que reduz mais atrito sem inflar o primeiro escopo.'],
  ['Construção', 'Design, conteúdo, código, integrações e medição avançam como uma única entrega.'],
  ['Distribuição', 'Publicamos e conectamos busca, campanhas, conteúdo e atendimento ao destino certo.'],
  ['Operação', 'Acompanhamos estabilidade, uso e oportunidades para decidir o próximo release.'],
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <main id="main-content" className="rdv-platform">
      <Hero />

      <section className="rdv-motion-rail" aria-label="Capacidades digitais">
        <div className="rdv-motion-rail__track">
          {[...MARKETPLACE_ITEMS.slice(0, 12), ...MARKETPLACE_ITEMS.slice(0, 12)].map((item, index) => (
            <span key={`${item.title}-${index}`} aria-hidden={index >= 12 ? 'true' : undefined}>
              {item.title}
            </span>
          ))}
        </div>
      </section>

      <SetorDivider
        video="/videos/setores/pizzaria.mp4"
        poster="/videos/setores/pizzaria-poster.jpg"
        kicker="Alimentação · Franca/SP"
        title="O cardápio que trabalha até de madrugada."
        description="Pizzaria, hamburgueria, restaurante: o site mostra o cardápio, o horário e o bairro atendido. O pedido cai no WhatsApp de quem está no salão — não em caixa de e-mail esquecida."
      />

      <section className="rdv-platform-intro" aria-labelledby="platform-intro-title">
        <div className="rdv-shell rdv-platform-intro__grid">
          <header>
            <p className="rdv-kicker">Mapa de possibilidades</p>
            <h2 id="platform-intro-title">Não vendemos uma página. Construímos o que o seu negócio precisa para avançar.</h2>
          </header>
          <div className="rdv-platform-intro__copy">
            <p>
              Site, loja, aplicativo, atendimento ou automação são partes do mesmo sistema: fazer o cliente encontrar,
              entender, escolher e continuar com você.
            </p>
            <Link className="rdv-text-action" to="/solucoes">
              Explorar todas as possibilidades <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <motion.div
          className="rdv-shell rdv-family-ledger"
          role="list"
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {FAMILY_ORDER.map((family, index) => {
            const familyItems = MARKETPLACE_ITEMS.filter((item) => item.family === family);
            return (
              <motion.div key={family} variants={staggerItem}>
                <Link
                  role="listitem"
                  className="rdv-family-row"
                  to={`/solucoes?categoria=${family}`}
                  onClick={() => trackEvent('category_select', { category: family, position: 'home-map' })}
                >
                  <span className="rdv-family-row__index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{FAMILY_LABELS[family]}</h3>
                    <p>{familyItems.map((item) => item.format).slice(0, 4).join(' · ')}</p>
                  </div>
                  <strong>{familyItems.length} possibilidades</strong>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="rdv-distribution" aria-labelledby="distribution-title">
        <div className="rdv-shell rdv-distribution__grid">
          <Reveal>
            <header>
              <p className="rdv-kicker">Capilaridade com direção</p>
              <h2 id="distribution-title">Um núcleo próprio. Vários caminhos até ele.</h2>
              <p>
                A presença central organiza a oferta. Cada canal recebe a mensagem, a página e a próxima ação adequadas
                à intenção de quem chegou.
              </p>
              <Link className="rdv-primary-action" to="/solucoes/distribuicao-multicanal">
                Ver arquitetura multicanal <ArrowRight aria-hidden="true" />
              </Link>
            </header>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rdv-channel-map" aria-label="Canais conectáveis ao núcleo digital">
              <div className="rdv-channel-map__core">
                <span>Seu negócio</span>
                <strong>Oferta · dados · atendimento</strong>
              </div>
              <div className="rdv-channel-map__orbit">
                {ACQUISITION_CHANNELS.map((channel, index) => (
                  <span key={channel} style={{ '--channel-index': index } as CSSProperties}>{channel}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SetorDivider
        video="/videos/setores/barbearia.mp4"
        poster="/videos/setores/barbearia-poster.jpg"
        kicker="Beleza & barbearia · Franca/SP"
        title="A agenda cheia começa no primeiro corte bem feito."
        description="Barbearia e salão vivem de indicação — e de aparecer quando alguém busca 'barbearia perto de mim'. O site mostra o trabalho, o preço e o botão que abre a conversa."
        align="right"
      />

      <section className="rdv-proof-v3" aria-labelledby="proof-title">
        <div className="rdv-shell">
          <Reveal>
            <header className="rdv-proof-v3__header">
              <div>
                <p className="rdv-kicker">Projetos publicados</p>
                <h2 id="proof-title">Prova em tela. Sem número inventado.</h2>
              </div>
              <p>Cada projeto responde a uma operação diferente. A evidência é o produto publicado, a arquitetura e o que ele realmente organiza.</p>
            </header>
          </Reveal>

          <div className="rdv-project-stage" role="list">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.08} className="rdv-project-shot-wrap">
                <article
                  role="listitem"
                  className={`rdv-project-shot${project.emphasis === 'flagship' ? ' is-flagship' : ''}`}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rdv-project-shot__link"
                    aria-label={`Abrir o site publicado de ${project.name} em nova aba`}
                    onClick={() => trackEvent('portfolio_open', { project: project.name, position: 'home-proof' })}
                  >
                    <div className="rdv-project-shot__media">
                      <ProjectVideo src={project.video ?? ''} poster={project.image} />
                      <img src={project.image} alt={`Interface publicada de ${project.name}`} loading={index === 0 ? 'eager' : 'lazy'} width="1200" height="750" />
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <em>Ver em movimento <ArrowRight aria-hidden="true" /></em>
                    </div>
                    <div className="rdv-project-shot__body">
                      <p>{project.type}</p>
                      <h3>{project.name}</h3>
                      <p>{project.detail}</p>
                    </div>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="rdv-home-otherwork" role="list">
            {OTHER_WORK.map((work) => (
              <Reveal key={work.name} delay={0.1}>
                <a href={work.href} target="_blank" rel="noopener noreferrer" role="listitem" className="rdv-home-otherwork__item" onClick={() => trackEvent('portfolio_open', { project: work.name, position: 'home-proof' })}>
                  <span className="rdv-home-otherwork__media">
                    <ProjectVideo src={work.video ?? ''} poster={work.image ?? ''} />
                    <img src={work.image} alt="" width="1200" height="750" loading="lazy" />
                  </span>
                  <div>
                    <p>{work.type}</p>
                    <h3>{work.name}</h3>
                  </div>
                  <p>{work.detail}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="rdv-proof-v3__actions">
            <Link className="rdv-text-action" to="/portfolio">Ver projetos reais <ArrowRight aria-hidden="true" /></Link>
            <Link className="rdv-text-action" to="/demonstracoes">Explorar arquiteturas demonstrativas <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <SetorDivider
        video="/videos/setores/oficina.mp4"
        poster="/videos/setores/oficina-poster.jpg"
        kicker="Automotivo · Franca/SP"
        title="Quem quebra na estrada não escolhe oficina no escuro."
        description="Oficina mecânica, funilaria, auto elétrica: o cliente chega com o carro parado e a dúvida de quem confiar. O site mostra o serviço, o endereço e o telefone que atende na hora."
      />

      <section className="rdv-models" aria-labelledby="models-title">
        <div className="rdv-shell">
          <Reveal>
            <header className="rdv-models__header">
              <p className="rdv-kicker">Formas de trabalhar</p>
              <h2 id="models-title">Um projeto individual. A continuidade que fizer sentido.</h2>
              <p>O desenho, a copy, a estrutura e as integrações pertencem ao contexto do cliente. A assinatura existe para operar e evoluir — não para aprisionar o projeto.</p>
            </header>
          </Reveal>

          <motion.div
            className="rdv-models__grid"
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {DELIVERY_MODELS.map((model, index) => (
              <motion.article key={model.id} variants={staggerItem}>
                <span>{String(index + 1).padStart(2, '0')} / {model.label}</span>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <strong>{model.cadence}</strong>
              </motion.article>
            ))}
          </motion.div>

          <Reveal delay={0.1}>
            <Link className="rdv-primary-action" to="/planos">
              Comparar modelos de contratação <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="rdv-method-v3" aria-labelledby="method-title">
        <div className="rdv-shell rdv-method-v3__grid">
          <Reveal>
            <header>
              <p className="rdv-kicker">Método Rei das Vendas</p>
              <h2 id="method-title">Da leitura à operação, sem pular a realidade do cliente.</h2>
              <p>Nossa missão é o sucesso digital do cliente — e isso exige publicar o que funciona, medir o que importa e manter alguém responsável pelo próximo passo.</p>
            </header>
          </Reveal>
          <motion.ol
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {METHOD.map(([title, detail], index) => (
              <motion.li key={title} variants={staggerItem}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <SetorDivider
        video="/videos/setores/estetica.mp4"
        poster="/videos/setores/estetica-poster.jpg"
        kicker="Saúde & estética · Franca/SP"
        title="A primeira consulta começa antes da porta abrir."
        description="Clínica de estética e saúde: o paciente pesquisa, compara e decide no celular antes de ligar. O site mostra o que é feito, quem faz e o que custa — sem prometer milagre."
        align="right"
      />

      <section className="rdv-closing-v3 rdv-closing-v3--video" aria-labelledby="closing-title">
        <div className="rdv-closing-v3__video" aria-hidden="true">
          <video
            src="/videos/final-cinematic.mp4"
            poster="/imagens/final-cinematic-poster.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
          />
          <span className="rdv-closing-v3__shade" />
        </div>
        <div className="rdv-shell rdv-closing-v3__content">
          <Reveal>
            <p className="rdv-kicker">O primeiro movimento</p>
            <h2 id="closing-title">Mostre seu negócio. A gente devolve uma direção.</h2>
            <p>O diagnóstico registra objetivo, gargalo e prioridade antes de abrir o WhatsApp. Sem proposta genérica e sem compromisso automático.</p>
          </Reveal>
          <Reveal delay={0.12} className="rdv-closing-v3__actions">
            <div>
              <Link
                className="rdv-primary-action"
                to="/diagnostico?origem=home-final"
                onClick={() => trackEvent('diagnostic_start', { position: 'home-final' })}
              >
                Mapear meu negócio <ArrowRight aria-hidden="true" />
              </Link>
              <a className="rdv-whatsapp-action" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { position: 'home-final' })}>
                WhatsApp · {BRAND.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="rdv-closing-v3__footnote">
              O próximo passo do seu negócio começa com uma conversa — não com um formulário frio.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
