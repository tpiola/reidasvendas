import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { ASSINATURA, CAMPANHA_ATIVA, IMPLANTACAO, MESES_ANUAIS, brl } from '@/lib/ofertas';
import { GUIDE_BY_SLUG, type Guide } from '@/lib/growth';

/**
 * Página de planos com preço na mesa.
 *
 * Antes esta página explicava modelos de contratação e não dizia nenhum número:
 * o dono tinha que preencher um formulário para descobrir se podia pagar. Preço
 * escondido não protege a proposta, ele gasta o tempo de quem já decidiu — e a
 * pessoa vai olhar o concorrente que publicou o valor.
 *
 * O que NÃO mudou, porque é princípio da casa: nenhuma promessa de ranking,
 * de volume de vendas ou de prazo que não dê para cumprir. A parte que eu não
 * posso provar (nota de cliente, número de resultado) não está aqui.
 */

const PRINCIPIOS = [
  'O que está incluído, o que depende de você e o que é opcional vai por escrito antes de começar.',
  'Mídia paga, licenças e serviços de terceiros ficam separados do trabalho da casa — você vê para onde vai cada real.',
  'Domínio, código, acessos e dados são seus. Na entrega, tudo migra para o seu nome.',
  'Ninguém aqui promete primeiro lugar no Google nem volume de venda. Promessa dessas é o jeito mais rápido de te perder.',
];

const FAQ = [
  {
    q: 'Por que o preço está na página, e não atrás de "fale conosco"?',
    a: 'Porque orçamento escondido serve a quem vende, não a quem compra. Se o valor não cabe no seu momento, é melhor você descobrir agora mesmo do que depois de uma reunião. E se cabe, você já chega na conversa decidindo escopo, não preço.',
  },
  {
    q: 'A mensalidade é obrigatória?',
    a: 'Não. Você pode contratar só a implantação, receber todos os acessos e operar por conta própria. A assinatura existe para quem prefere que alguém responda quando o site cai numa sexta à noite e para quem quer continuar crescendo.',
  },
  {
    q: 'Tem fidelidade, multa ou aviso prévio?',
    a: 'Não tem fidelidade. A assinatura é mês a mês: você cancela quando quiser, sem multa, e leva com você tudo o que foi produzido no período.',
  },
  {
    q: 'E se eu não gostar do que foi feito?',
    a: 'Você aprova texto e desenho antes de qualquer coisa ir para o ar — nada é publicado sem o seu "pode ir". Se o caminho estiver errado na primeira entrega, corrigimos antes de avançar; a etapa seguinte só começa depois da sua aprovação.',
  },
  {
    q: 'Vocês garantem que eu vou aparecer em primeiro no Google?',
    a: 'Não. E desconfie de quem garante: o Google não vende posição, e quem promete isso está vendendo o que não controla. O que a gente entrega é o trabalho que faz o robô do Google encontrar, ler e indexar o seu conteúdo: estrutura, conteúdo para quem está decidindo comprar, dados de contato corretos e velocidade.',
  },
  {
    q: 'Quanto tempo até estar no ar?',
    a: 'A página de campanha fica pronta em até 5 dias úteis; o site profissional, em até 12; a loja, em até 20 — contados a partir do momento em que você entrega o material (textos, fotos, acessos). O prazo está escrito na proposta justamente para não virar conversa de memória.',
  },
  {
    q: 'O preço inclui anúncio no Google e no Instagram?',
    a: 'Não. Anúncio é mídia paga direto para a plataforma, com o valor na sua conta, no seu cartão. A gente monta e mede a campanha por um valor de trabalho à parte — assim você enxerga o que pagou para a plataforma e o que pagou pelo trabalho.',
  },
  {
    q: 'Preciso entender de tecnologia para contratar?',
    a: 'Não. Você fala do seu negócio — o que vende, para quem, o que o cliente pergunta no balcão. Traduzir isso para a internet é o trabalho pelo qual você está pagando.',
  },
];

const COST_GUIDE_SLUGS = [
  'quanto-custa-um-site-profissional',
  'quanto-custa-criar-um-app',
  'quanto-custa-um-saas',
];

const COST_GUIDES = COST_GUIDE_SLUGS
  .map((slug) => GUIDE_BY_SLUG.get(slug))
  .filter((guide): guide is Guide => Boolean(guide));

export default function Planos() {
  const [anual, setAnual] = useState(false);

  return (
    <main id="main-content" className="rdv-offers rdv-precos">
      <header className="rdv-offers__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Preço na mesa</p>
          <h1>Quanto custa o cliente que procura você e encontra o concorrente?</h1>
          <p>
            Enquanto essa pessoa digita no celular, ela decide entre os negócios que consegue achar na hora — e quem não tem onde ser encontrado
            não entra na lista. Abaixo está quanto custa resolver isso, com o que
            está incluído e em quanto tempo fica pronto. Sem orçamento escondido, sem "a partir de" que vira outro
            número na proposta.
          </p>
          <div className="rdv-offers__hero-actions">
            <Link
              className="rdv-primary-action"
              to="/diagnostico?origem=planos-hero"
              onClick={() => trackEvent('diagnostic_start', { position: 'plans-hero' })}
            >
              Ver o meu caso em duas etapas <ArrowRight aria-hidden="true" />
            </Link>
            {CAMPANHA_ATIVA ? (
              <Link className="rdv-offers__secondary" to="/black-friday">
                Ver a oferta de Black Friday <span aria-hidden="true">↗</span>
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <section className="rdv-precos__bloco" aria-labelledby="precos-implantacao">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Serviço uma vez</p>
            <h2 id="precos-implantacao">Você paga uma vez. A coisa passa a existir.</h2>
            <p>
              Escopo fechado, escopo por escrito, entrega com data. Serve para quem precisa do site no ar e depois
              quer pensar em outra coisa.
            </p>
          </header>
          <div className="rdv-precos__grade">
            {IMPLANTACAO.map((plano) => (
              <article key={plano.nome} className={plano.destaque ? 'is-destaque' : undefined}>
                {/* O selo ocupa lugar mesmo quando vazio: sem isso o cartão sem
                    selo sobe e a linha de preços fica torta entre os cartões. */}
                <span className="rdv-precos__selo">{plano.selo ?? ''}</span>
                <h3>{plano.nome}</h3>
                <p className="rdv-precos__valor">
                  {plano.valor === null ? (
                    <><strong>Sob diagnóstico</strong></>
                  ) : (
                    <><strong>{brl(plano.valor)}</strong> <span>uma vez</span></>
                  )}
                </p>
                <p className="rdv-precos__resumo">{plano.resumo}</p>
                <ul>
                  {plano.entrega.map((item) => (
                    <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>
                  ))}
                </ul>
                <p className="rdv-precos__prazo">Prazo: {plano.prazo}.</p>
                <Link
                  className="rdv-primary-action"
                  to={`/diagnostico?origem=plano-${plano.nome.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  onClick={() => trackEvent('diagnostic_start', { position: 'plans-implantacao', plan: plano.nome })}
                >
                  Quero este <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-precos__bloco is-assinatura" aria-labelledby="precos-assinatura">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Assinatura mensal</p>
            <h2 id="precos-assinatura">Quem cuida disso depois que o site fica pronto?</h2>
            <p>
              Site não é quadro na parede: envelhece, sai do ar sem aviso e deixa de receber contato. A assinatura é ter
              alguém responsável por ele — sem fidelidade, sem multa, mês a mês.
            </p>
          </header>

          <div className="rdv-precos__alternador" role="group" aria-label="Forma de pagamento da assinatura">
            <button
              type="button"
              className={anual ? undefined : 'is-ativo'}
              aria-pressed={!anual}
              onClick={() => { setAnual(false); trackEvent('pricing_toggle', { mode: 'mensal' }); }}
            >
              Mensal
            </button>
            <button
              type="button"
              className={anual ? 'is-ativo' : undefined}
              aria-pressed={anual}
              onClick={() => { setAnual(true); trackEvent('pricing_toggle', { mode: 'anual' }); }}
            >
              Anual <span>2 meses grátis</span>
            </button>
          </div>

          <div className="rdv-precos__grade">
            {ASSINATURA.map((plano) => (
              <article key={plano.nome} className={plano.destaque ? 'is-destaque' : undefined}>
                {/* O selo ocupa lugar mesmo quando vazio: sem isso o cartão sem
                    selo sobe e a linha de preços fica torta entre os cartões. */}
                <span className="rdv-precos__selo">{plano.selo ?? ''}</span>
                <h3>{plano.nome}</h3>
                <p className="rdv-precos__valor">
                  <strong>{brl(anual ? plano.mensal * MESES_ANUAIS : plano.mensal)}</strong>
                  <span>{anual ? 'por ano' : 'por mês'}</span>
                </p>
                {anual ? (
                  <p className="rdv-precos__resumo">
                    Equivale a {brl(Math.round(plano.mensal * MESES_ANUAIS / 12))} por mês — você paga 10 meses e usa 12.
                  </p>
                ) : (
                  <p className="rdv-precos__resumo">{plano.resumo}</p>
                )}
                <ul>
                  {plano.entrega.map((item) => (
                    <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>
                  ))}
                </ul>
                <p className="rdv-precos__prazo">Cancela quando quiser. Sem fidelidade.</p>
                <Link
                  className="rdv-primary-action"
                  to={`/diagnostico?origem=assinatura-${plano.nome.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  onClick={() => trackEvent('diagnostic_start', { position: 'plans-assinatura', plan: plano.nome })}
                >
                  Quero este <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-offers__principles" aria-labelledby="offer-principles-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">O que você leva junto com o preço</p>
            <h2 id="offer-principles-title">Quatro coisas que não mudam, em nenhum pacote.</h2>
          </header>
          <ol>
            {PRINCIPIOS.map((principio, index) => (
              <li key={principio}><span>{String(index + 1).padStart(2, '0')}</span><p>{principio}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-precos__faq" aria-labelledby="precos-faq">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Antes de você decidir</p>
            <h2 id="precos-faq">As perguntas que todo mundo faz antes de pagar.</h2>
          </header>
          <div className="rdv-precos__perguntas">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-offers__principles" aria-labelledby="offer-cost-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Se você ainda quer comparar</p>
            <h2 id="offer-cost-title">Antes de fechar com qualquer um, entenda o que compõe o preço.</h2>
          </header>
          <ol>
            {COST_GUIDES.map((guide, index) => (
              <li key={guide.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <Link
                    className="rdv-offers__secondary"
                    to={`/${guide.slug}`}
                    onClick={() => trackEvent('guide_open', { guide: guide.slug, position: 'planos-custo' })}
                  >
                    {guide.title} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-offers__closing" aria-labelledby="offers-closing-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">Próxima decisão</p>
          <h2 id="offers-closing-title">Em três minutos você sabe se faz sentido. Em nenhum momento alguém te liga sem você pedir.</h2>
          <p>
            O diagnóstico monta o seu caso: o que o cliente pesquisa, o que o concorrente tem, qual das opções acima
            resolve e quanto fica. Nada é contratado automaticamente e ninguém vende por telefone.
          </p>
          <div>
            <Link
              className="rdv-primary-action"
              to="/diagnostico?origem=planos-final"
              onClick={() => trackEvent('diagnostic_start', { position: 'plans-final' })}
            >
              Montar o meu diagnóstico <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="rdv-offers__secondary" to="/solucoes">Ver o que dá para construir <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
