import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/brand';
import './HomeSovereign.css';

type PanelData = {
  conversations: number | null;
  appointments: number | null;
  lastResponse: string | null;
  firstContact: string | null;
};

const PANEL: PanelData = {
  conversations: null,
  appointments: null,
  lastResponse: null,
  firstContact: null,
};

const cases = [
  { name: 'Sentinela Saúde Ambiental', before: 'Atendimento e apresentação digital dispersos.', running: 'Site comercial publicado, com rotas claras para os serviços e contato.', href: 'https://sentinelasaudeambiental.com.br' },
  { name: 'Better Controle de Pragas', before: 'Presença digital sem uma jornada comercial central.', running: 'Estrutura digital entregue para apresentar serviços e receber solicitações.' },
  { name: 'Farmácia Sete Lírios', before: 'Operação sem uma plataforma própria de gestão.', running: 'Plataforma de gestão construída para apoiar a rotina da empresa.' },
  { name: 'Elisa Regina', before: 'Atendimento terapêutico sem fluxo digital de agenda.', running: 'Presença profissional com agendamento integrado.' },
];

const plans = [
  { name: 'Presença ativa', monthly: 'R$ 747', setup: 'R$ 1.497', description: 'Para transformar visitas em conversas sem deixar o cliente esperando.', items: ['Site comercial estático e indexável', 'WhatsApp com respostas essenciais', 'Painel mensal de contatos', 'Hospedagem e manutenção'] },
  { name: 'Captação contínua', monthly: 'R$ 1.097', setup: 'R$ 1.997', description: 'Para organizar atendimento, agenda e acompanhamento em uma operação única.', items: ['Tudo do plano Presença ativa', 'Automação de atendimento', 'Agenda ou triagem integrada', 'Painel operacional atualizado'] },
  { name: 'Operação completa', monthly: 'R$ 1.497', setup: 'R$ 2.497', description: 'Para negócios que precisam medir, corrigir e ampliar a captação todos os meses.', items: ['Tudo do plano Captação contínua', 'Rotas por serviço ou campanha', 'Integrações sob escopo', 'Revisão mensal de desempenho'] },
];

const verticals = [
  { name: 'Odontologia', href: '/odontologia', pain: 'Responde dúvidas, filtra urgências e leva o paciente até o agendamento.' },
  { name: 'Advocacia', href: '/advocacia', pain: 'Organiza a primeira conversa sem prometer resultado e sem perder o histórico.' },
  { name: 'Imobiliária', href: '/imobiliaria', pain: 'Identifica interesse, faixa de valor e região antes do corretor assumir.' },
  { name: 'Estética', href: '/estetica', pain: 'Apresenta procedimentos, tira dúvidas recorrentes e encaminha para a agenda.' },
];

function Metric({ label, value, empty }: { label: string; value: string | number | null; empty: string }) {
  return (
    <div className="rv-metric">
      <dt>{label}</dt>
      <dd className={value === null ? 'is-empty' : 'has-value'}>{value ?? '—'}</dd>
      {value === null && <small>{empty}</small>}
    </div>
  );
}

export function LivePanel({ data = PANEL }: { data?: PanelData }) {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="rv-panel" aria-label="Exemplo do painel entregue ao cliente">
      <header className="rv-panel-head">
        <div><span className="rv-status" /> Operação online</div>
        <time dateTime={new Date().toISOString()}>{clock || '00:00:00'}</time>
      </header>
      <dl className="rv-metrics">
        <Metric label="Conversas atendidas hoje" value={data.conversations} empty="A primeira conversa aparece aqui." />
        <Metric label="Agendamentos confirmados" value={data.appointments} empty="Conecte sua agenda para começar." />
        <Metric label="Última resposta automática" value={data.lastResponse} empty="Nenhuma resposta enviada ainda." />
        <Metric label="Tempo até o primeiro contato" value={data.firstContact} empty="O tempo será medido no primeiro lead." />
      </dl>
      <footer className="rv-panel-foot"><span>Dados do atendimento</span><span>Atualização contínua</span></footer>
    </section>
  );
}

export default function Home() {
  const whatsapp = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent('Olá! Quero ver como a operação mensal funciona para o meu negócio.')}`;
  return (
    <main className="rv-home" id="main-content">
      <section className="rv-hero">
        <div className="rv-shell rv-hero-grid">
          <div className="rv-hero-intro">
            <p className="rv-overline">Atendimento e captação para negócios locais</p>
            <h1>Seu atendimento continua quando você para.</h1>
            <p>Este painel é o produto. O site vem junto.</p>
            <div className="rv-actions">
              <a className="rv-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Ver no WhatsApp <span aria-hidden="true">↗</span></a>
              <a className="rv-text-link" href={`mailto:${BRAND.email}?subject=Operação mensal Rei das Vendas`}>Enviar e-mail</a>
            </div>
          </div>
          <LivePanel />
        </div>
      </section>

      <section className="rv-one-line"><div className="rv-shell"><p>Seu WhatsApp responde às 22h de sábado, registra cada conversa e mostra o que virou oportunidade.</p></div></section>

      <section className="rv-section" id="prova">
        <div className="rv-shell">
          <header className="rv-section-head"><h2>O que já colocamos para rodar.</h2><p>Sem números decorativos. Quando uma métrica não está confirmada, mostramos apenas a entrega verificável.</p></header>
          <div className="rv-cases">
            {cases.map((item) => {
              const content = <><h3>{item.name}</h3><dl><div><dt>Antes</dt><dd>{item.before}</dd></div><div><dt>Passou a rodar</dt><dd>{item.running}</dd></div></dl><p>Métrica pública confirmada: <strong>não informada</strong></p></>;
              return item.href ? <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rv-case">{content}<span aria-hidden="true">↗</span></a> : <article key={item.name} className="rv-case">{content}</article>;
            })}
          </div>
        </div>
      </section>

      <section className="rv-section rv-pricing" id="precos">
        <div className="rv-shell">
          <header className="rv-section-head"><h2>Mensalidade clara. Operação contínua.</h2><p>Setup coloca tudo no ar. Mensalidade mantém atendimento, painel e evolução funcionando.</p></header>
          <div className="rv-plans">
            {plans.map((plan) => <article className="rv-plan" key={plan.name}><header><h3>{plan.name}</h3><p>{plan.description}</p></header><div className="rv-price"><strong>{plan.monthly}</strong><span>/mês</span></div><p className="rv-setup">Setup único <b>{plan.setup}</b></p><ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul><a href={`https://wa.me/${BRAND.phone}?text=${encodeURIComponent(`Olá! Tenho interesse no plano ${plan.name}.`)}`} target="_blank" rel="noopener noreferrer">Conversar sobre este plano <span aria-hidden="true">→</span></a></article>)}
          </div>
        </div>
      </section>

      <section className="rv-section" id="segmentos"><div className="rv-shell"><header className="rv-section-head"><h2>A operação muda com o seu balcão.</h2><p>Cada rota fala da dor real do setor e entrega HTML indexável sem depender do JavaScript.</p></header><div className="rv-verticals">{verticals.map(item => <a href={item.href} key={item.name}><h3>{item.name}</h3><p>{item.pain}</p><span>Ver operação para {item.name.toLowerCase()} →</span></a>)}</div></div></section>

      <section className="rv-section rv-entry"><div className="rv-shell"><header className="rv-section-head"><h2>Entrada curta. Rotina visível.</h2></header><div className="rv-entry-grid"><article><h3>Mapeamos o atendimento</h3><p>Perguntas, horários, serviços e o ponto em que uma pessoa precisa assumir.</p></article><article><h3>Colocamos a operação no ar</h3><p>Site, WhatsApp, agenda e painel entram em funcionamento com um escopo fechado.</p></article><article><h3>Você acompanha o número</h3><p>Conversas, agendamentos e tempo de resposta ficam visíveis para orientar a próxima decisão.</p></article></div></div></section>

      <section className="rv-close"><div className="rv-shell"><p>Quer ver essa operação aplicada ao seu negócio?</p><a className="rv-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <span aria-hidden="true">↗</span></a></div></section>
    </main>
  );
}
