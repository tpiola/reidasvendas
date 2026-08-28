import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';

const CONTEXT = [
  'O que o negócio vende e para quem',
  'Qual canal ou processo está travando',
  'O que já existe hoje',
  'Qual prioridade precisa entrar no ar primeiro',
];

export default function ContatoDireto() {
  return (
    <main id="main-content" className="rdv-contact-v3">
      <header className="rdv-contact-v3__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Contato direto</p>
          <h1>Chegue com contexto. Saia com uma direção.</h1>
          <p>O diagnóstico é o caminho mais rápido para organizar a conversa. Se preferir, fale diretamente pelo WhatsApp ou e-mail.</p>
        </div>
      </header>

      <section className="rdv-contact-v3__channels" aria-labelledby="contact-channels-title">
        <div className="rdv-shell">
          <h2 id="contact-channels-title" className="sr-only">Canais de contato</h2>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { position: 'contact' })}>
            <span>01 / WhatsApp</span>
            <h3>{BRAND.phoneDisplay}</h3>
            <p>Canal disponível 24h. Respostas humanas em horário comercial: seg–sex, 9h–18h; sáb, 9h–13h.</p>
            <strong>Iniciar conversa <ArrowRight aria-hidden="true" /></strong>
          </a>
          <a href={`mailto:${BRAND.email}`} onClick={() => trackEvent('email_click', { position: 'contact' })}>
            <span>02 / E-mail</span>
            <h3>{BRAND.email}</h3>
            <p>Indicado para documentos, briefing, contexto institucional ou continuidade de uma conversa já iniciada.</p>
            <strong>Escrever e-mail <ArrowRight aria-hidden="true" /></strong>
          </a>
        </div>
      </section>

      <section className="rdv-contact-v3__context" aria-labelledby="contact-context-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Para ganhar velocidade</p>
            <h2 id="contact-context-title">Quatro informações que melhoram a primeira resposta.</h2>
          </header>
          <ol>{CONTEXT.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
        </div>
      </section>

      <section className="rdv-contact-v3__closing">
        <div className="rdv-shell">
          <p className="rdv-kicker">Diagnóstico guiado</p>
          <h2>Prefere não começar de uma página em branco?</h2>
          <p>Responda duas etapas. O contexto fica pronto antes de o WhatsApp ser aberto.</p>
          <Link className="rdv-primary-action" to="/diagnostico?origem=contato" onClick={() => trackEvent('diagnostic_start', { position: 'contact' })}>
            Preparar meu contexto <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
