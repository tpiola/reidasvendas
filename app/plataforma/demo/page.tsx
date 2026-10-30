'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Sector = 'Varejo' | 'Clínicas' | 'Alimentação' | 'Serviços';
type Product = { name: string; sku: string; stock: number; min: number; cost: number; price: number };
const seed: Product[] = [
  { name: 'Produto A', sku: 'RDV-001', stock: 8, min: 12, cost: 42, price: 89 },
  { name: 'Produto B', sku: 'RDV-002', stock: 34, min: 10, cost: 18, price: 44 },
  { name: 'Produto C', sku: 'RDV-003', stock: 4, min: 6, cost: 120, price: 219 },
];
const brl = (n: number) => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(n);
export default function SovereignPrototype() {
  const [sector, setSector] = useState<Sector>('Varejo');
  const [products, setProducts] = useState<Product[]>(seed);
  const [name, setName] = useState('');
  const [stock, setStock] = useState('10');
  const [price, setPrice] = useState('99');
  const [tab, setTab] = useState<'visao'|'estoque'|'governanca'>('visao');
  const metrics = useMemo(() => ({
    items: products.length,
    alerts: products.filter(p=>p.stock<p.min).length,
    value: products.reduce((a,p)=>a+p.stock*p.cost,0),
    potential: products.reduce((a,p)=>a+p.stock*p.price,0),
  }),[products]);
  const add = () => {
    const quantity = Number(stock), salePrice = Number(price);
    if (!name.trim() || !Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(salePrice) || salePrice <= 0) return;
    setProducts(p=>[...p,{name: name.trim().slice(0,80),sku:'DEMO-'+String(p.length+1).padStart(3,'0'),stock:Math.floor(quantity),min:5,cost:Math.round(salePrice*.55*100)/100,price:salePrice}]);
    setName('');
  };
  const card: React.CSSProperties = {border:'1px solid #333',background:'#111',borderRadius:16,padding:22};
  return <main style={{minHeight:'100vh',background:'#050505',color:'#f4f0e8',padding:'32px clamp(16px,5vw,80px)',fontFamily:'Arial, sans-serif'}}>
    <style>{`button:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:2px solid #d2b781;outline-offset:4px}.rdv-button{padding:12px 18px;border-radius:10px;border:1px solid #5b5040;background:#262117;color:#f4e4c3;cursor:pointer}.rdv-button[aria-pressed="true"]{background:#bba078;color:#090909}.rdv-input{width:100%;padding:13px;background:#161616;color:white;border:1px solid #555;border-radius:9px}.rdv-table{width:100%;border-collapse:collapse}.rdv-table th,.rdv-table td{padding:12px;text-align:left;border-bottom:1px solid #333}.rdv-table th{color:#b5a27f;font-size:12px;text-transform:uppercase;letter-spacing:.08em}@media(max-width:700px){.rdv-table{font-size:12px}.rdv-table th,.rdv-table td{padding:8px 5px}}`}</style>
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:18,flexWrap:'wrap'}}>
      <Link href="/" style={{color:'#e7d3ad',textDecoration:'none',fontWeight:700,letterSpacing:'.12em'}}>REI DAS VENDAS <span style={{color:'#888',fontWeight:400}}> / LAB</span></Link>
      <span style={{border:'1px solid #65563b',borderRadius:99,padding:'8px 14px',fontSize:12,color:'#e3c89b'}}>PROTÓTIPO • DADOS FICTÍCIOS • SEM LOGIN</span>
    </header>
    <section style={{maxWidth:1000,margin:'70px 0 40px'}}>
      <p style={{color:'#d2b781',textTransform:'uppercase',letterSpacing:'.2em',fontSize:12}}>Soberania Empresarial / Arquitetura demonstrativa</p>
      <h1 style={{fontFamily:'Georgia,serif',fontWeight:400,fontSize:'clamp(38px,6vw,75px)',lineHeight:1.08,margin:'18px 0'}}>A operação sob controle.<br/><em style={{color:'#bdab8c'}}>A decisão, com contexto.</em></h1>
      <p style={{maxWidth:670,color:'#c2beb7',fontSize:17,lineHeight:1.7}}>Uma visão inicial da futura área assinável: inventário, alertas operacionais e governança para negócios locais. Esta página é uma demonstração funcional no navegador, não um sistema de produção.</p>
    </section>
    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:26}}>
      <label htmlFor="sector" style={{color:'#bcb6a9'}}>Setor</label>
      <select id="sector" className="rdv-input" style={{maxWidth:240}} value={sector} onChange={e=>setSector(e.target.value as Sector)}>
        {(['Varejo','Clínicas','Alimentação','Serviços'] as Sector[]).map(x=><option key={x}>{x}</option>)}
      </select>
      <span style={{color:'#888',fontSize:13}}>Demonstração adaptável por setor</span>
    </div>
    <nav aria-label="Áreas da demonstração" style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:26}}>
      {([['visao','Visão executiva'],['estoque','Estoque'],['governanca','Governança']] as const).map(([id,label])=><button key={id} className="rdv-button" aria-pressed={tab===id} onClick={()=>setTab(id)}>{label}</button>)}
    </nav>
    {tab==='visao'&&<div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14}}>
        {([['Itens cadastrados',String(metrics.items)],['Abaixo do mínimo',String(metrics.alerts)],['Custo em estoque',brl(metrics.value)],['Valor de venda potencial',brl(metrics.potential)]] as const).map(([label,value])=><section key={label} style={card}><div style={{fontSize:12,color:'#b7b2a9',marginBottom:16}}>{label}</div><strong style={{fontSize:27,fontWeight:500}}>{value}</strong></section>)}
      </div>
      <section style={{...card,marginTop:18}}><h2 style={{fontFamily:'Georgia,serif',fontSize:28,fontWeight:400}}>Prioridades da operação</h2><p style={{color:'#bbb',lineHeight:1.7}}>{metrics.alerts ? `${metrics.alerts} itens exigem revisão de reposição. Confira os limites de estoque antes de novos pedidos.` : 'Nenhum item abaixo do estoque mínimo no conjunto demonstrativo.'}</p><p style={{color:'#c5b08d'}}>Contexto: {sector}. Indicadores são apenas ilustrativos e não representam dados reais.</p></section>
    </div>}
    {tab==='estoque'&&<section style={card}>
      <h2 style={{fontFamily:'Georgia,serif',fontWeight:400,fontSize:30}}>Inventário demonstrativo</h2>
      <div style={{overflowX:'auto'}}><table className="rdv-table"><thead><tr><th>Item</th><th>SKU</th><th>Saldo</th><th>Mínimo</th><th>Preço</th><th>Ajustar saldo</th></tr></thead><tbody>{products.map((p,i)=><tr key={p.sku}><td>{p.name}</td><td>{p.sku}</td><td style={{color:p.stock<p.min?'#ecc27d':'inherit'}}>{p.stock}</td><td>{p.min}</td><td>{brl(p.price)}</td><td><button className="rdv-button" aria-label={`Diminuir saldo de ${p.name}`} onClick={()=>setProducts(v=>v.map((item,k)=>k===i?{...item,stock:Math.max(0,item.stock-1)}:item))}>−</button> <button className="rdv-button" aria-label={`Aumentar saldo de ${p.name}`} onClick={()=>setProducts(v=>v.map((item,k)=>k===i?{...item,stock:item.stock+1}:item))}>+</button></td></tr>)}</tbody></table></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:12,marginTop:22}}>
        <label>Nome do item<input className="rdv-input" maxLength={80} value={name} onChange={e=>setName(e.target.value)} placeholder="Novo item"/></label>
        <label>Saldo inicial<input className="rdv-input" type="number" min="0" max="1000000" value={stock} onChange={e=>setStock(e.target.value)}/></label>
        <label>Preço de venda (R$)<input className="rdv-input" type="number" min="0.01" step="0.01" max="100000000" value={price} onChange={e=>setPrice(e.target.value)}/></label>
      </div>
      <button className="rdv-button" onClick={add} style={{marginTop:16}}>Adicionar item de demonstração</button>
      <p style={{fontSize:12,color:'#9e978e'}}>Alterações existem somente nesta sessão do navegador. Sem banco de dados, sem persistência e sem uso para operação real.</p>
    </section>}
    {tab==='governanca'&&<section style={card}>
      <h2 style={{fontFamily:'Georgia,serif',fontWeight:400,fontSize:30}}>Mapa de governança</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:14}}>
        {[
          ['Inventário','Lotes, contagem, entradas, saídas e alertas de ruptura.'],
          ['Supply e logística','Pedidos, fornecedores, prazo de reposição e rastreio de entregas.'],
          ['Receita e canais','Origens de pedidos, ticket, margem e conversão por canal.'],
          ['Controle e segurança','Permissões, trilha de auditoria, exportação e política de retenção.'],
        ].map(([title,desc])=><div key={title} style={{padding:18,background:'#1b1b1b',borderRadius:12}}><h3 style={{color:'#d9bf91'}}>{title}</h3><p style={{color:'#b9b5ad',lineHeight:1.6}}>{desc}</p><span style={{fontSize:11,color:'#9c968e'}}>Previsto para a plataforma</span></div>)}
      </div>
    </section>}
    <footer style={{padding:'55px 0 20px',color:'#aaa',fontSize:13}}><p>Protótipo de validação de produto. Assinatura, autenticação, integrações e armazenamento multiempresa ainda não implementados.</p><Link href="/diagnostico" style={{color:'#dec391'}}>Solicitar diagnóstico comercial →</Link></footer>
  </main>;
}
