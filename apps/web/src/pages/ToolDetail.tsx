import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GrowthClosing, GrowthHero } from '@/components/GrowthShell';
import { diagnosticUrl, trackEvent } from '@/lib/analytics';
import { TOOL_BY_SLUG } from '@/lib/growth';
import NotFound from '@/pages/NotFound';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

function NumberField({ id, label, value, min = 0, max, step = 1, onChange, help }: { id: string; label: string; value: number; min?: number; max?: number; step?: number; onChange: (value: number) => void; help?: string }) {
  return <div className="ge-field"><label htmlFor={id}>{label}</label><input id={id} type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} />{help ? <small>{help}</small> : null}</div>;
}

function ResultCard({ label, value, description, tool, children }: { label: string; value: string; description: string; tool: string; children?: React.ReactNode }) {
  return <aside className="ge-result" aria-live="polite"><span>{label}</span><strong>{value}</strong><p>{description}</p>{children}<Link className="ge-button" to={diagnosticUrl(undefined, tool)} onClick={() => trackEvent('hero_cta', { tool, destination: 'diagnostico' })}>Validar no diagnóstico <ArrowRight size={16} aria-hidden="true" /></Link></aside>;
}

function PriceCalculator() {
  const [pages, setPages] = useState(5);
  const [integrations, setIntegrations] = useState(1);
  const [rate, setRate] = useState(150);
  const [content, setContent] = useState(true);
  const hours = 12 + pages * 5 + integrations * 8 + (content ? pages * 2 : 0);
  const minimum = hours * rate;
  const maximum = Math.round(minimum * 1.35);

  return <div className="ge-tool-layout"><form className="ge-tool-form" onSubmit={(event) => event.preventDefault()}><NumberField id="pages" label="Quantidade prevista de páginas" value={pages} min={1} max={100} onChange={setPages} /><NumberField id="integrations" label="Integrações necessárias" value={integrations} min={0} max={30} onChange={setIntegrations} help="Exemplos: formulário, WhatsApp contextual ou automação." /><NumberField id="rate" label="Valor-hora de referência informado por você (R$)" value={rate} min={1} onChange={setRate} /><fieldset className="ge-tool-checks"><label><input type="checkbox" checked={content} onChange={(event) => setContent(event.target.checked)} />Incluir esforço de organização de conteúdo</label></fieldset><p className="ge-tool-note">Fórmula ilustrativa: 12 horas de base + 5 horas por página + 8 horas por integração + 2 horas por página quando há apoio de conteúdo.</p></form><ResultCard label="Faixa orientativa" value={`${money.format(minimum)} — ${money.format(maximum)}`} description={`${number.format(hours)} horas de referência. Esta simulação usa parâmetros informados por você; não representa preço, proposta ou compromisso comercial.`} tool="calculadora-preco-site" /></div>;
}

function OpportunityCalculator() {
  const [visitors, setVisitors] = useState(1000);
  const [current, setCurrent] = useState(1.2);
  const [target, setTarget] = useState(2);
  const [ticket, setTicket] = useState(350);
  const currentSales = visitors * Math.max(0, current) / 100;
  const targetSales = visitors * Math.max(0, target) / 100;
  const delta = Math.max(0, targetSales - currentSales);

  return <div className="ge-tool-layout"><form className="ge-tool-form" onSubmit={(event) => event.preventDefault()}><NumberField id="visitors" label="Visitas mensais consideradas" value={visitors} min={0} onChange={setVisitors} /><NumberField id="current-conversion" label="Conversão atual (%)" value={current} min={0} max={100} step={0.1} onChange={setCurrent} /><NumberField id="target-conversion" label="Conversão de referência informada (%)" value={target} min={0} max={100} step={0.1} onChange={setTarget} /><NumberField id="ticket" label="Ticket médio informado (R$)" value={ticket} min={0} onChange={setTicket} /><p className="ge-tool-note">Cálculo: visitas × diferença entre as taxas informadas × ticket médio.</p></form><ResultCard label="Cenário potencial por mês" value={money.format(delta * ticket)} description={`${number.format(delta)} conversões adicionais no cenário informado. Trata-se de uma simulação matemática, sem promessa de resultado ou garantia de crescimento.`} tool="calculadora-perda-vendas" /></div>;
}

function RoiCalculator() {
  const [investment, setInvestment] = useState(3000);
  const [leads, setLeads] = useState(30);
  const [closing, setClosing] = useState(15);
  const [ticket, setTicket] = useState(1200);
  const revenue = leads * Math.max(0, closing) / 100 * ticket;
  const roi = investment > 0 ? (revenue - investment) / investment * 100 : 0;

  return <div className="ge-tool-layout"><form className="ge-tool-form" onSubmit={(event) => event.preventDefault()}><NumberField id="investment" label="Investimento considerado (R$)" value={investment} min={1} onChange={setInvestment} /><NumberField id="leads" label="Leads considerados" value={leads} min={0} onChange={setLeads} /><NumberField id="closing" label="Taxa de fechamento estimada (%)" value={closing} min={0} max={100} step={0.5} onChange={setClosing} /><NumberField id="average-ticket" label="Ticket médio informado (R$)" value={ticket} min={0} onChange={setTicket} /><p className="ge-tool-note">Fórmula: (receita estimada − investimento) ÷ investimento × 100.</p></form><ResultCard label="ROI do cenário informado" value={`${number.format(roi)}%`} description={`Receita bruta simulada: ${money.format(revenue)}. Não considera impostos, margem, recompra ou custos adicionais e não representa garantia.`} tool="calculadora-roi" /></div>;
}

const auditChecks = [
  { key: 'mobile', label: 'O site funciona corretamente no celular.' },
  { key: 'offer', label: 'A oferta principal fica clara logo no início.' },
  { key: 'contact', label: 'O visitante encontra um caminho claro para contato.' },
  { key: 'google', label: 'Endereço, horários e dados comerciais estão atualizados.' },
  { key: 'tracking', label: 'A origem dos contatos é acompanhada pela operação.' },
] as const;

function WebsiteAudit() {
  const [url, setUrl] = useState('');
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  let host = '';
  if (url.trim()) {
    try {
      const parsed = new URL(/^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`);
      if (['http:', 'https:'].includes(parsed.protocol)) host = parsed.hostname;
    } catch {
      host = '';
    }
  }
  const checked = auditChecks.filter((entry) => answers[entry.key]).length;
  const pending = auditChecks.filter((entry) => !answers[entry.key]);

  return <div className="ge-tool-layout"><form className="ge-tool-form" onSubmit={(event) => event.preventDefault()}><div className="ge-field"><label htmlFor="website-url">Domínio ou endereço do site</label><input id="website-url" type="text" inputMode="url" autoComplete="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="suaempresa.com.br" /><small>O domínio é apenas validado localmente; esta ferramenta não rastreia, escaneia nem mede o site.</small></div><fieldset className="ge-tool-checks"><legend>Marque o que você já consegue confirmar</legend>{auditChecks.map((entry) => <label key={entry.key}><input type="checkbox" checked={Boolean(answers[entry.key])} onChange={(event) => setAnswers((current) => ({ ...current, [entry.key]: event.target.checked }))} />{entry.label}</label>)}</fieldset></form><ResultCard label="Critérios declarados" value={`${checked} / ${auditChecks.length}`} description={`${host ? `Domínio informado: ${host}. ` : 'Informe um domínio válido. '}Esta triagem reflete somente suas respostas; não é uma auditoria técnica automatizada.`} tool="auditoria-de-site"><ul className="ge-checklist">{pending.map((entry) => <li key={entry.key}>{entry.label}</li>)}</ul></ResultCard></div>;
}

function BriefingGenerator() {
  const [company, setCompany] = useState('');
  const [audience, setAudience] = useState('');
  const [offer, setOffer] = useState('');
  const [goal, setGoal] = useState('');
  const [requirements, setRequirements] = useState('');
  const briefing = [company && `Empresa / segmento: ${company}`, audience && `Público principal: ${audience}`, offer && `Oferta / solução: ${offer}`, goal && `Objetivo prioritário: ${goal}`, requirements && `Requisitos ou restrições: ${requirements}`].filter(Boolean).join('\n');

  return <div className="ge-tool-layout"><form className="ge-tool-form" onSubmit={(event) => event.preventDefault()}><div className="ge-field"><label htmlFor="brief-company">Empresa ou segmento</label><input id="brief-company" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Ex.: clínica odontológica" /></div><div className="ge-field"><label htmlFor="brief-audience">Público atendido</label><input id="brief-audience" value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="Quem precisa da solução?" /></div><div className="ge-field"><label htmlFor="brief-offer">Oferta ou serviço</label><input id="brief-offer" value={offer} onChange={(event) => setOffer(event.target.value)} placeholder="Qual é a principal entrega?" /></div><div className="ge-field"><label htmlFor="brief-goal">Objetivo principal</label><input id="brief-goal" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Qual problema precisa ser resolvido?" /></div><div className="ge-field"><label htmlFor="brief-requirements">Requisitos ou restrições</label><textarea id="brief-requirements" value={requirements} onChange={(event) => setRequirements(event.target.value)} placeholder="Canais, integrações, prazos ou limitações importantes." /></div></form><ResultCard label="Briefing estruturado" value={`${[company, audience, offer, goal, requirements].filter(Boolean).length} / 5`} description="Use este resumo como ponto de partida para discutir a arquitetura e o escopo necessários." tool="gerador-de-briefing">{briefing ? <pre>{briefing}</pre> : null}</ResultCard></div>;
}

const calculators: Record<string, () => React.JSX.Element> = {
  'calculadora-preco-site': PriceCalculator,
  'calculadora-perda-vendas': OpportunityCalculator,
  'calculadora-roi': RoiCalculator,
  'auditoria-de-site': WebsiteAudit,
  'gerador-de-briefing': BriefingGenerator,
};

export default function ToolDetail() {
  const { slug = '' } = useParams();
  const tool = TOOL_BY_SLUG.get(slug);
  const Calculator = calculators[slug];
  if (!tool || !Calculator) return <NotFound />;

  return <main className="ge-page" id="main-content"><GrowthHero label="Ferramenta de inteligência operacional" title={tool.title} description={tool.summary} secondary={{ label: 'Ver todas as ferramentas', to: '/ferramentas' }} /><section className="ge-section"><div className="ge-shell"><Calculator /></div></section><GrowthClosing title="A simulação organiza hipóteses. O diagnóstico define o próximo movimento." /></main>;
}
