/* ═══════════════════════════════════════════
   API LEADS.TS — Rei das Vendas
   Backend de prospecção local: 2.852 leads de Franca/SP
   Endpoints:
     GET /api/leads?vertical=X&nivel=CRITICO&tem_whatsapp=1&q=busca&limit=50&offset=0
     GET /api/leads/stats
     GET /api/leads/verticals
     GET /api/leads/:id
═══════════════════════════════════════════ */

// Dataset embutido no bundle (esbuild JSON loader) — sem IO em runtime
import leadsData from './data/backend-leads.json';

const DB: any[] = leadsData;

// Dados imutáveis por deploy (dataset embutido no bundle): cacheável no edge da Vercel.
// s-maxage=3600 + SWR: primeira chamada roda a function, as seguintes saem do CDN.
const CACHE_EDGE = 'public, s-maxage=3600, stale-while-revalidate=86400';

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname.replace(/\/+$/, '');

  // ===== STATS =====
  if (pathname.endsWith('/leads/stats')) {
    const total = DB.length;
    const comWhats = DB.filter((l: any) => l.whatsapp).length;
    const semSite = DB.filter((l: any) => l.tipo !== 'com_site').length;
    const criticos = DB.filter((l: any) => l.nivel === 'CRÍTICO').length;
    const verts: Record<string, number> = {};
    for (const l of DB) verts[l.vertical] = (verts[l.vertical] || 0) + 1;
    res.setHeader('Cache-Control', CACHE_EDGE);
    return res.status(200).json({
      total, com_whatsapp: comWhats, sem_site: semSite, criticos,
      verticais: Object.keys(verts).length,
      por_vertical: verts,
      atualizado_em: '2026-09-01',
    });
  }

  // ===== LISTA DE VERTICAIS =====
  if (pathname.endsWith('/leads/verticals')) {
    const verts: Record<string, any> = {};
    for (const l of DB) {
      if (!verts[l.vertical]) verts[l.vertical] = { total: 0, com_whatsapp: 0, sem_site: 0 };
      verts[l.vertical].total += 1;
      if (l.whatsapp) verts[l.vertical].com_whatsapp += 1;
      if (l.tipo !== 'com_site') verts[l.vertical].sem_site += 1;
    }
    res.setHeader('Cache-Control', CACHE_EDGE);
    return res.status(200).json(Object.entries(verts)
      .map(([vertical, v]: [string, any]) => ({ vertical, total: v.total, com_whatsapp: v.com_whatsapp, sem_site: v.sem_site }))
      .sort((a, b) => b.com_whatsapp - a.com_whatsapp));
  }

  // ===== LISTA DE LEADS (com filtros) =====
  if (pathname.endsWith('/leads') || pathname.endsWith('/leads/')) {
    const params = url.searchParams;
    let resultado: any[] = DB;

    const vertical = params.get('vertical');
    if (vertical) resultado = resultado.filter((l) => l.vertical === vertical);

    const nivel = params.get('nivel');
    if (nivel) resultado = resultado.filter((l) => l.nivel.toUpperCase() === nivel.toUpperCase());

    const tipo = params.get('tipo');
    if (tipo) resultado = resultado.filter((l) => l.tipo === tipo);

    if (params.get('tem_whatsapp') === '1' || params.get('tem_whatsapp') === 'true') {
      resultado = resultado.filter((l) => l.whatsapp);
    }

    if (params.get('quentes') === '1' || params.get('quentes') === 'true') {
      resultado = resultado.filter((l) => l.tipo !== 'com_site');
    }

    const q = params.get('q');
    if (q) {
      const termo = q.toLowerCase();
      resultado = resultado.filter(
        (l) => l.nome.toLowerCase().includes(termo) || (l.endereco || '').toLowerCase().includes(termo)
      );
    }

    const sort = params.get('sort') || 'nome';
    if (sort === 'rating') resultado = [...resultado].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'avaliacoes') resultado = [...resultado].sort((a, b) => (b.avaliacoes || 0) - (a.avaliacoes || 0));
    else resultado = [...resultado].sort((a, b) => a.nome.localeCompare(b.nome));

    const limit = Math.min(parseInt(params.get('limit') || '50', 10), 200);
    const offset = parseInt(params.get('offset') || '0', 10);

    res.setHeader('Cache-Control', CACHE_EDGE);
    return res.status(200).json({
      total: resultado.length, limit, offset,
      leads: resultado.slice(offset, offset + limit),
    });
  }

  // ===== LEAD POR ID =====
  const idMatch = pathname.match(/\/leads\/([^/]+)$/);
  if (idMatch) {
    const lead = DB.find((l) => l.id === idMatch[1]);
    if (!lead) return res.status(404).json({ error: 'lead não encontrado' });
    res.setHeader('Cache-Control', CACHE_EDGE);
    return res.status(200).json(lead);
  }

  return res.status(404).json({ error: 'rota não encontrada' });
}
