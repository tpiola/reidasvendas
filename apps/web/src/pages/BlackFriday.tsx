import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { BLACK_FRIDAY, IMPLANTACAO, brl, precoComDesconto } from '@/lib/ofertas';

/**
 * Black Friday do Rei das Vendas.
 *
 * Data real: 27 de novembro de 2026 (4ª quinta de novembro + 1 dia). O prazo no
 * contador é o mesmo prazo das regras — não existe contador que reinicia quando
 * você volta à página, nem "últimas vagas" para te apressar.
 *
 * O ângulo da página é a honestidade como prova: no meio de uma semana em que
 * todo mundo grita desconto falso, dizer exatamente o que a oferta NÃO é vira
 * o argumento mais forte. Isso não é só ética — é o que faz um dono de negócio
 * confiar o suficiente para assinar.
 */

const PASSOS = [
  ['Você faz o diagnóstico', 'Duas etapas, sem telefone e sem vendedor do outro lado. Ele monta o seu caso e o que precisa existir.'],
  ['Você recebe a proposta por escrito', 'Escopo, prazo, valor com o desconto aplicado e o que depende de você. Nada de "a gente vê depois".'],
  ['Você assina até 27/11 e o preço trava', 'O valor combinado não muda depois, mesmo que a entrega comece em dezembro.'],
];

const FAQ = [
  {
    q: 'Por que uma agência está fazendo Black Friday?',
    a: 'Porque entre setembro e dezembro quem vende produto se prepara para o fim de ano — e o site precisa estar pronto antes da correria, não em janeiro. O desconto existe para você começar agora em vez de depois da correria.',
  },
  {
    q: 'Isso não é golpe de "preço de" inflado?',
    a: 'Não. O preço de referência é o mesmo que está publicado em /planos hoje, fora da campanha, e é para onde ele volta em 28 de novembro. Se você quiser conferir antes de decidir, abra a página de planos e compare.',
  },
  {
    q: 'Preciso pagar tudo hoje?',
    a: 'Não. A condição é assinar até 27/11; as condições de pagamento ficam escritas na proposta que você recebe.',
  },
  {
    q: 'A entrega começa quando?',
    a: 'Na ordem de chegada das assinaturas. Como o desconto é o mesmo para todo mundo, quem assina primeiro é atendido primeiro — e você recebe a data de início por escrito.',
  },
  {
    q: 'O que não entra no desconto?',
    a: 'Mídia paga (Google, Instagram), licenças e serviços de terceiros. Esses valores sempre ficam separados e vão direto para a plataforma, na sua conta — a gente não põe desconto em dinheiro que não é nosso.',
  },
  {
    q: 'E se a campanha acabar e eu perder?',
    a: 'O desconto de 30% acaba. O trabalho não: você contrata pelo preço de tabela em qualquer outra semana do ano, e o diagnóstico continua gratuito.',
  },
];

function useContagem(fim: string) {
  const [agora, setAgora] = useState<number | null>(null);
  useEffect(() => {
    setAgora(Date.now());
    // Campanha vencida: o estado final não muda mais, então não faz sentido
    // manter um tique de 1s re-renderizando a página para sempre.
    if (new Date(fim).getTime() - Date.now() <= 0) return undefined;
    const t = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [fim]);
  if (agora === null) return null;
  const resta = new Date(fim).getTime() - agora;
  if (resta <= 0) return { acabou: true, dias: 0, horas: 0, minutos: 0, segundos: 0 };
  return {
    acabou: false,
    dias: Math.floor(resta / 86400000),
    horas: Math.floor((resta % 86400000) / 3600000),
    minutos: Math.floor((resta % 3600000) / 60000),
    segundos: Math.floor((resta % 60000) / 1000),
  };
}

export default function BlackFriday() {
  const contagem = useContagem(BLACK_FRIDAY.fim);
  const acabou = contagem?.acabou === true;
  const planos = IMPLANTACAO.filter((plano) => plano.valor !== null);

  return (
    <main id="main-content" className="rdv-offers rdv-bf">
      <header className="rdv-offers__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">
            Black Friday 2026 · vale até 27 de novembro, às 23h59
          </p>
          <h1>
            {Math.round(BLACK_FRIDAY.descontoImplantacao * 100)}% a menos para o seu negócio parar de ser
            <em className="rdv-accent-serif"> invisível</em> na busca da sua cidade.
          </h1>
          <p>
            Sem contador que reinicia quando você volta à página. Sem "últimas vagas" inventadas para te apressar.
            Sem preço "de" que nunca foi praticado. A campanha é simples: você fecha até 27 de novembro e paga 30%
            menos na implantação — e o primeiro mês da assinatura sai de graça.
          </p>

          <div className="rdv-bf__contagem" role="timer" aria-live="off">
            {acabou ? (
              <p>
                <strong>A campanha terminou.</strong> Os valores voltaram para a tabela de{' '}
                <Link to="/planos">planos</Link> — o contato inicial continua sem compromisso.
              </p>
            ) : contagem ? (
              <>
                <span className="rdv-bf__rotulo">Termina em</span>
                <span className="rdv-bf__numeros">
                  <span><strong>{contagem.dias}</strong>dias</span>
                  <span><strong>{contagem.horas}</strong>horas</span>
                  <span><strong>{contagem.minutos}</strong>min</span>
                  <span><strong>{contagem.segundos}</strong>seg</span>
                </span>
              </>
            ) : (
              <p className="rdv-bf__rotulo">A oferta vale até sexta, 27 de novembro de 2026, às 23h59.</p>
            )}
          </div>

          <div className="rdv-offers__hero-actions">
            <Link
              className="rdv-primary-action"
              to="/diagnostico?origem=black-friday"
              onClick={() => trackEvent('diagnostic_start', { position: 'black-friday' })}
            >
              Garantir o desconto <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="rdv-offers__secondary" to="/planos">
              Comparar com o preço de tabela <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="rdv-precos__bloco" aria-labelledby="bf-precos">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">O que muda no seu bolso</p>
            <h2 id="bf-precos">O preço de sempre, com 30% a menos até sexta.</h2>
            <p>Os valores riscados são os mesmos publicados em /planos fora da campanha — pode conferir.</p>
          </header>
          <div className="rdv-precos__grade">
            {planos.map((plano) => {
              const comDesconto = precoComDesconto(plano.valor as number);
              const economia = (plano.valor as number) - comDesconto;
              return (
                <article key={plano.nome} className={plano.destaque ? 'is-destaque' : undefined}>
                  <span className="rdv-precos__selo">{plano.selo ?? ''}</span>
                  <h3>{plano.nome}</h3>
                  <p className="rdv-precos__valor is-desconto">
                    <s>{brl(plano.valor as number)}</s>
                    <strong>{brl(comDesconto)}</strong>
                    <span>uma vez{BLACK_FRIDAY.mesGratisAssinatura ? ' + 1º mês de assinatura grátis' : ''}</span>
                  </p>
                  <p className="rdv-precos__economia">Você economiza {brl(economia)}.</p>
                  <ul>
                    {plano.entrega.map((item) => (
                      <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>
                    ))}
                  </ul>
                  <p className="rdv-precos__prazo">Prazo: {plano.prazo}.</p>
                  <Link
                    className="rdv-primary-action"
                    to={`/diagnostico?origem=black-friday&plano=${plano.id}&solucao=${plano.solucao}&campanha=black-friday`}
                    onClick={() => trackEvent('diagnostic_start', { position: 'black-friday-plan', plan: plano.nome })}
                  >
                    Quero com o desconto <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rdv-bf__honestidade" aria-labelledby="bf-honestidade">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">O que esta página não tem</p>
            <h2 id="bf-honestidade">Numa semana de desconto falso, o mais raro é o que não está aqui.</h2>
          </header>
          <ul>
            {BLACK_FRIDAY.oQueNaoTem.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Se você viu qualquer um desses quatro em outro anúncio, agora você sabe o que aquele preço estava
            realmente comprando: a sua pressa.
          </p>
        </div>
      </section>

      <section className="rdv-offers__principles" aria-labelledby="bf-passos">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Como funciona</p>
            <h2 id="bf-passos">Três passos. Nenhum deles é uma ligação de vendedor.</h2>
          </header>
          <ol>
            {PASSOS.map(([titulo, detalhe], index) => (
              <li key={titulo}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{titulo}</strong>
                  <p>{detalhe}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-precos__faq" aria-labelledby="bf-faq">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Dúvidas da campanha</p>
            <h2 id="bf-faq">O que você precisa saber antes de decidir.</h2>
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

      <section className="rdv-offers__principles" aria-labelledby="bf-regras">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Regras da campanha, por escrito</p>
            <h2 id="bf-regras">Para não sobrar dúvida depois.</h2>
          </header>
          <ol>
            {BLACK_FRIDAY.regras.map((regra, index) => (
              <li key={regra}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><p>{regra}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-offers__closing" aria-labelledby="bf-fechamento">
        <div className="rdv-shell">
          <p className="rdv-kicker">{acabou ? 'A campanha terminou' : 'Faltam dias contados'}</p>
          <h2 id="bf-fechamento">
            {acabou
              ? 'O desconto acabou — o problema que ele resolvia, não.'
              : 'Até 27 de novembro o site que coloca você na busca custa 30% menos. Depois, preço de tabela.'}
          </h2>
          <p>
            O diagnóstico tem duas etapas, é gratuito e não te compromete a nada. Ele mostra o que o seu cliente
            pesquisa, o que o concorrente tem publicado e qual das opções resolve o seu caso.
          </p>
          <div>
            <Link
              className="rdv-primary-action"
              to="/diagnostico?origem=black-friday-final"
              onClick={() => trackEvent('diagnostic_start', { position: 'black-friday-final' })}
            >
              Montar o meu diagnóstico <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="rdv-offers__secondary" to="/contato">Falar direto no WhatsApp <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
