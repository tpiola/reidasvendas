import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

const dataRows = [
  {
    label: 'Diagnóstico',
    detail: 'Nome, e-mail, WhatsApp, tipo de negócio, necessidade, problema, objetivo, faixa de investimento e o endereço opcional do site ou perfil informado.',
  },
  {
    label: 'Origem',
    detail: 'Página de entrada, referência e parâmetros de campanha presentes no endereço, mantidos durante a sessão para relacionar a solicitação à sua origem.',
  },
  {
    label: 'Preferência',
    detail: 'A escolha de permitir ou recusar medição fica guardada no próprio navegador para que o aviso não seja repetido sem necessidade.',
  },
];

const rights = [
  'Confirmar se há tratamento de dados relacionado à sua solicitação.',
  'Pedir acesso, correção ou atualização das informações enviadas.',
  'Solicitar eliminação quando a conservação não for necessária ou exigida.',
  'Revogar um consentimento e registrar oposição, quando aplicável.',
];

export default function Politica() {
  return (
    <main id="main-content" className="rdv-privacy">
      <section className="rdv-privacy__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Aviso de privacidade / 25 ago. 2026</p>
          <h1>Dados suficientes para responder. Nada além do necessário.</h1>
          <p>
            Este aviso descreve as informações tratadas quando você navega, registra um diagnóstico ou abre
            uma conversa a partir de reidasvendas.com.br.
          </p>
        </div>
      </section>

      <section className="rdv-privacy__summary" aria-labelledby="privacy-summary-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">Leitura curta</p>
          <h2 id="privacy-summary-title">O site usa os dados para entender e responder à sua solicitação.</h2>
          <p>
            Não vendemos os dados enviados. O diagnóstico pode ser encaminhado ao provedor de automação
            configurado para atendimento; se ele não estiver disponível, o site prepara a mensagem para você
            decidir se quer enviá-la pelo WhatsApp.
          </p>
        </div>
      </section>

      <section className="rdv-privacy__ledger" aria-labelledby="privacy-data-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">01 / informações</p>
          <h2 id="privacy-data-title">O que entra no fluxo</h2>
          <dl>
            {dataRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rdv-privacy__text" aria-label="Finalidade, compartilhamento e conservação">
        <div className="rdv-shell">
          <article>
            <p className="rdv-kicker">02 / finalidade</p>
            <h2>Por que esses dados são usados</h2>
            <p>
              Para validar a solicitação, organizar o contexto comercial, responder pelo canal indicado,
              proteger o formulário contra uso indevido e entender quais páginas originam conversas úteis.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">03 / operadores</p>
            <h2>Quem pode participar</h2>
            <p>
              A infraestrutura de hospedagem processa as requisições do site. O provedor de automação recebe
              o diagnóstico apenas quando configurado. WhatsApp e e-mail passam a tratar informações quando
              você escolhe abrir ou enviar uma mensagem nesses serviços.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">04 / conservação</p>
            <h2>Por quanto tempo</h2>
            <p>
              Informações são conservadas pelo período necessário para atendimento, continuidade da relação e
              cumprimento de obrigações aplicáveis. Um pedido de exclusão é analisado considerando essas finalidades.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">05 / medição</p>
            <h2>Cookies e armazenamento local</h2>
            <p>
              A preferência de medição é salva no navegador. Dados de atribuição ficam na sessão. Eventos só são
              enviados a uma ferramenta externa de medição quando ela estiver configurada e você tiver permitido.
            </p>
          </article>
        </div>
      </section>

      <section className="rdv-privacy__rights" aria-labelledby="privacy-rights-title">
        <div className="rdv-shell">
          <div>
            <p className="rdv-kicker">06 / seus pedidos</p>
            <h2 id="privacy-rights-title">Você mantém o canal aberto.</h2>
          </div>
          <ul>
            {rights.map((right) => <li key={right}>{right}</li>)}
          </ul>
          <p>
            Envie o pedido para <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. Para evitar entrega de dados
            à pessoa errada, pode ser necessário confirmar sua identidade e a relação com a solicitação original.
          </p>
        </div>
      </section>

      <section className="rdv-privacy__notes" aria-label="Segurança e atualização">
        <div className="rdv-shell">
          <article>
            <h2>Segurança</h2>
            <p>Usamos transporte HTTPS, validação de entrada e limites de requisição. Nenhum sistema elimina todo risco; incidentes confirmados são avaliados conforme impacto e obrigações aplicáveis.</p>
          </article>
          <article>
            <h2>Atualizações</h2>
            <p>Este aviso muda quando o fluxo de dados muda. A data no início da página indica a versão publicada.</p>
          </article>
        </div>
      </section>

      <section className="rdv-privacy__closing">
        <div className="rdv-shell">
          <a className="rdv-action rdv-action--outline rdv-action--lg" href={`mailto:${BRAND.email}`}>
            <Mail aria-hidden="true" /> Falar sobre meus dados
          </a>
          <Link className="rdv-primary-action" to="/diagnostico">
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
