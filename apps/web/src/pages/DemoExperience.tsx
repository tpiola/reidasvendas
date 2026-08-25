import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { diagnosticUrl, trackEvent } from '@/lib/analytics';
import { DEMONSTRATION_BY_SLUG } from '@/lib/growth';
import NotFound from '@/pages/NotFound';
import '@/pages/GrowthEngine.css';

type DemoItem = { category: string; title: string; detail: string; note: string };

const items: Record<string, DemoItem[]> = {
  'clinica-premium': [
    { category: 'Odontologia', title: 'Avaliação odontológica', detail: 'Solicite informações sobre horários e atendimento com a equipe responsável.', note: 'Consulta ilustrativa' },
    { category: 'Odontologia', title: 'Acompanhamento preventivo', detail: 'Entenda como solicitar uma avaliação com profissionais habilitados.', note: 'Atendimento demonstrativo' },
    { category: 'Especialidades', title: 'Consulta especializada', detail: 'Selecione a área desejada para iniciar uma solicitação contextual.', note: 'Especialidade fictícia' },
    { category: 'Especialidades', title: 'Primeira avaliação', detail: 'A equipe recebe sua necessidade e verifica disponibilidade.', note: 'Dados fictícios' },
  ],
  'restaurante-premium': [
    { category: 'Entradas', title: 'Bruschetta da casa', detail: 'Pão artesanal, tomate confit e ervas frescas.', note: 'R$ 32 · valor fictício' },
    { category: 'Principais', title: 'Risoto de cogumelos', detail: 'Arroz arbóreo, cogumelos frescos e finalização vegetal.', note: 'R$ 68 · valor fictício' },
    { category: 'Principais', title: 'Massa artesanal', detail: 'Massa fresca com molho autoral e ingredientes sazonais.', note: 'R$ 59 · valor fictício' },
    { category: 'Sobremesas', title: 'Torta cítrica', detail: 'Creme leve, base crocante e raspas de limão.', note: 'R$ 28 · valor fictício' },
  ],
  'representacao-comercial': [
    { category: 'Linha essencial', title: 'Referência AL-101', detail: 'Produto demonstrativo · acabamento grafite · pedido mínimo sob consulta.', note: 'REF. AL-101' },
    { category: 'Linha essencial', title: 'Referência AL-208', detail: 'Produto demonstrativo · acabamento natural · disponibilidade ilustrativa.', note: 'REF. AL-208' },
    { category: 'Linha de produto', title: 'Referência PR-410', detail: 'Produto demonstrativo · ficha comercial fictícia.', note: 'REF. PR-410' },
    { category: 'Linha de produto', title: 'Referência PR-522', detail: 'Produto demonstrativo · variações sob consulta · catálogo ilustrativo.', note: 'REF. PR-522' },
  ],
  'imobiliaria-premium': [
    { category: 'Apartamento', title: 'Apartamento central', detail: '2 dormitórios · 1 vaga · características exclusivamente ilustrativas.', note: 'Venda · imóvel fictício' },
    { category: 'Casa', title: 'Casa contemporânea', detail: '3 dormitórios · área externa · anúncio criado apenas para demonstrar o fluxo.', note: 'Venda · imóvel fictício' },
    { category: 'Comercial', title: 'Conjunto comercial', detail: 'Sala comercial · localização ilustrativa · disponibilidade não verificada.', note: 'Locação · imóvel fictício' },
    { category: 'Apartamento', title: 'Apartamento com varanda', detail: '1 dormitório · planta demonstrativa · dados sem valor comercial.', note: 'Locação · imóvel fictício' },
  ],
};

const actionByDemo: Record<string, string> = {
  'clinica-premium': 'Selecionar atendimento',
  'restaurante-premium': 'Adicionar ao pedido',
  'representacao-comercial': 'Adicionar à cotação',
  'imobiliaria-premium': 'Marcar interesse',
};

export default function DemoExperience() {
  const { slug = '' } = useParams();
  const demo = DEMONSTRATION_BY_SLUG.get(slug);
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  if (!demo) return <NotFound />;

  const entries = items[slug] || [];
  const categories = ['Todos', ...new Set(entries.map((entry) => entry.category))];
  const visible = entries.filter((entry) => (category === 'Todos' || entry.category === category) && `${entry.title} ${entry.detail}`.toLowerCase().includes(query.toLowerCase()));

  const toggle = (title: string) => {
    setSelected((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
    trackEvent('demo_interaction', { demonstration: slug, item: title });
  };

  return <main className="ge-page" id="main-content"><div className="ge-demo-topbar"><span><b>ARQUITETURA DEMONSTRATIVA</b> · Dados fictícios</span><Link className="ge-link" to={diagnosticUrl(demo.solution, `demo-${slug}`)}>Quero esta arquitetura <ArrowRight size={15} aria-hidden="true" /></Link></div><section className="ge-demo-stage"><div className="ge-shell"><header className="ge-demo-header"><div><p className="ge-eyebrow">{demo.segment}</p><h1>{demo.title}</h1><p>{demo.description}</p></div><div><input className="ge-search" aria-label="Pesquisar na demonstração" placeholder="Pesquisar nesta arquitetura" value={query} onChange={(event) => setQuery(event.target.value)} /></div></header><div className="ge-demo-controls" aria-label="Filtrar categorias">{categories.map((entry) => <button className={`ge-filter${category === entry ? ' is-active' : ''}`} key={entry} type="button" aria-pressed={category === entry} onClick={() => setCategory(entry)}>{entry}</button>)}</div><p className="ge-catalog-count">{visible.length} {visible.length === 1 ? 'item encontrado' : 'itens encontrados'}</p><div className="ge-demo-items">{visible.map((entry) => <article className="ge-demo-item" key={entry.title}><span>{entry.category}</span><h2>{entry.title}</h2><p>{entry.detail}</p><footer><small>{entry.note}</small><button className="ge-demo-button" type="button" aria-pressed={selected.includes(entry.title)} onClick={() => toggle(entry.title)}>{selected.includes(entry.title) ? 'Remover' : actionByDemo[slug]}</button></footer></article>)}</div>{selected.length ? <aside className="ge-demo-summary" aria-live="polite"><strong>{selected.length} {selected.length === 1 ? 'item selecionado' : 'itens selecionados'}:</strong> {selected.join(' · ')}. Esta ação é apenas ilustrativa e não envia pedidos, reservas ou agendamentos.</aside> : null}<p className="ge-demo-disclaimer">Esta página demonstra uma arquitetura de interface. Empresas, produtos, preços, imóveis, horários e disponibilidade são fictícios. Uma solução real depende de diagnóstico, conteúdo autorizado e escopo aprovado.</p><div className="ge-actions"><Link className="ge-button" to={diagnosticUrl(demo.solution, `demo-${slug}`)} onClick={() => trackEvent('hero_cta', { demonstration: slug, service: demo.solution })}>Mapear minha operação <ArrowRight size={16} aria-hidden="true" /></Link><Link className="ge-link" to="/demonstracoes">Ver outras arquiteturas <span aria-hidden="true">↗</span></Link></div></div></section></main>;
}
