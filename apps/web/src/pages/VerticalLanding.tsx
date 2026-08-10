import { BRAND } from '@/lib/brand';
import { LivePanel } from '@/pages/Home';
import '@/pages/HomeSovereign.css';

export default function VerticalLanding({ sector = 'Odontologia' }: { sector?: string }) {
  const isDentistry = sector === 'Odontologia';
  const whatsapp = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(`Olá! Quero ver a operação mensal para ${sector.toLowerCase()}.`)}`;
  return (
    <main className="rv-home rv-vertical-page" id="main-content">
      <section className="rv-hero"><div className="rv-shell rv-hero-grid"><div className="rv-hero-intro"><p className="rv-overline">Operação mensal para {sector.toLowerCase()}</p><h1>{isDentistry ? 'Paciente respondido. Agenda preenchida.' : `Atendimento ativo para ${sector.toLowerCase()}.`}</h1><p>{isDentistry ? 'O paciente pergunta preço, horário ou urgência. A operação responde, organiza a intenção e encaminha para a agenda — inclusive fora do expediente.' : 'Atendimento, triagem e acompanhamento em uma rotina que continua funcionando depois que a equipe encerra o dia.'}</p><div className="rv-actions"><a className="rv-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Ver no WhatsApp <span aria-hidden="true">↗</span></a></div></div><LivePanel /></div></section>
      <section className="rv-one-line"><div className="rv-shell"><p>{isDentistry ? 'Seu WhatsApp orienta o primeiro contato sem substituir a avaliação do dentista.' : 'Cada conversa entra em um fluxo claro até a equipe assumir.'}</p></div></section>
      <section className="rv-section"><div className="rv-shell"><header className="rv-section-head"><h2>O que passa a rodar.</h2><p>Uma operação comercial adaptada à rotina, aos limites e à linguagem do seu setor.</p></header><div className="rv-entry-grid"><article><h3>Resposta fora do horário</h3><p>Dúvidas frequentes recebem retorno imediato, com limites claros e encaminhamento humano.</p></article><article><h3>Triagem inicial</h3><p>{isDentistry ? 'Motivo do contato, urgência e preferência de horário chegam organizados.' : 'Intenção, contexto e prioridade chegam organizados para a equipe.'}</p></article><article><h3>Painel de resultado</h3><p>Conversas, agendamentos e tempo de resposta ficam visíveis sem depender de planilha manual.</p></article></div></div></section>
      <section className="rv-section rv-pricing"><div className="rv-shell"><header className="rv-section-head"><h2>Comece com preço conhecido.</h2><p>Setup único de R$ 1.997. Operação Captação contínua por R$ 1.097/mês.</p></header><a className="rv-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Aplicar à minha operação <span aria-hidden="true">↗</span></a></div></section>
      <section className="rv-close"><div className="rv-shell"><p>Veja como isso funciona na sua rotina.</p><a className="rv-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <span aria-hidden="true">↗</span></a></div></section>
    </main>
  );
}
