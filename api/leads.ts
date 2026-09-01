/* ═══════════════════════════════════════════
   API LEADS.TS — Rei das Vendas
   Backend de prospecção local: 2.852 leads de Franca/SP
   Endpoints:
     GET /api/leads?vertical=X&nivel=CRITICO&tem_whatsapp=1&q=busca&limit=50&offset=0
     GET /api/leads/stats
     GET /api/leads/verticals
═══════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

// Carrega o dataset uma vez por cold start (1.5MB — aceitável)
const DB_PATH = path.join(__dirname, '..', 'data', 'backend-leads.json');
let DB = null;
function loadDB() {
  if (DB) return DB;
  try {
    DB = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (e) {
    DB = [];
  }
  return DB;
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname.replace(/\/+$/, '');

  // ===== STATS =====
  if (pathname.endsWith('/leads/stats')) {
    const data = loadDB();
    const total = data.length;
    const comWhats = data.filter((l) => l.whatsapp).length;
    const semSite = data.filter((l) => l.tipo !== 'com_site').length;
    const criticos = data.filter((l) => l.nivel === 'CRÍTICO').length;
    const verts = {};
    for (const l of data) {
      verts[l.vertical] = (verts[l.vertical] || 0) + 1;
    }
    return res.status(200).json({
      total,
      com_whatsapp: comWhats,
      sem_site: semSite,
      criticos,
      verticais: Object.keys(verts).length,
      por_vertical: verts,
      atualizado_em: '2026-09-01',
    });
  }

  // ===== LISTA DE VERTICAIS =====
  if (pathname.endsWith('/leads/verticals')) {
    const data = loadDB();
    const verts = {};
    for (const l of data) {
      if (!verts[l.vertical]) {
        verts[l.vertical] = { total: 0, com_whatsapp: 0, sem_site: 0 };
      }
      verts[l.vertical].total += 1;
      if (l.whatsapp) verts[l.vertical].com_whatsapp += 1;
      if (l.tipo !== 'com_site') verts[l.vertical].sem_site += 1;
    }
    return res.status(200).json(Object.entries(verts)
      .map(([vertical, v]) => ({ vertical, ...v }))
      .sort((a, b) => b.com_whatsapp - a.com_whatsapp));
  }

  // ===== LISTA DE LEADS (com filtros) =====
  if (pathname.endsWith('/leads') || pathname.endsWith('/leads/')) {
    const params = url.searchParams;
    const data = loadDB();

    let resultado = data;

    // filtro por vertical
    const vertical = params.get('vertical');
    if (vertical) resultado = resultado.filter((l) => l.vertical === vertical);

    // filtro por nível
    const nivel = params.get('nivel');
    if (nivel) resultado = resultado.filter((l) => l.nivel.toUpperCase() === nivel.toUpperCase());

    // filtro por tipo
    const tipo = params.get('tipo');
    if (tipo) resultado = resultado.filter((l) => l.tipo === tipo);

    // filtro: só com whatsapp
    if (params.get('tem_whatsapp') === '1' || params.get('tem_whatsapp') === 'true') {
      resultado = resultado.filter((l) => l.whatsapp);
    }

    // filtro: só sem site (quentes)
    if (params.get('quentes') === '1' || params.get('quentes') === 'true') {
      resultado = resultado.filter((l) => l.tipo !== 'com_site');
    }

    // busca textual
    const q = params.get('q');
    if (q) {
      const termo = q.toLowerCase();
      resultado = resultado.filter(
        (l) => l.nome.toLowerCase().includes(termo) || (l.endereco || '').toLowerCase().includes(termo)
      );
    }

    // ordenação
    const sort = params.get('sort') || 'nome';
    if (sort === 'rating') resultado = [...resultado].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'avaliacoes') resultado = [...resultado].sort((a, b) => (b.avaliacoes || 0) - (a.avaliacoes || 0));
    else resultado = [...resultado].sort((a, b) => a.nome.localeCompare(b.nome));

    // paginação
    const limit = Math.min(parseInt(params.get('limit') || '50', 10), 200);
    const offset = parseInt(params.get('offset') || '0', 10);

    return res.status(200).json({
      total: resultado.length,
      limit,
      offset,
      leads: resultado.slice(offset, offset + limit),
    });
  }

  // ===== LEAD POR ID =====
  const idMatch = pathname.match(/\/leads\/([^/]+)$/);
  if (idMatch) {
    const data = loadDB();
    const lead = data.find((l) => l.id === idMatch[1]);
    if (!lead) return res.status(404).json({ error: 'lead não encontrado' });
    return res.status(200).json(lead);
  }

  return res.status(404).json({ error: 'rota não encontrada' });
};
