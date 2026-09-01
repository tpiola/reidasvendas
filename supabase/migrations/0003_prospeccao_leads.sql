-- ═══════════════════════════════════════════
-- MIGRATION 0003 — Prospecção de Leads (Franca/SP)
-- 2.852 leads de negócios locais — backend da prospecção
-- ═══════════════════════════════════════════

create table if not exists public.prospeccao_leads (
  id text primary key,
  nome text not null,
  vertical text not null,
  tipo text,
  nivel text,
  telefone text,
  whatsapp text,
  site text,
  endereco text,
  rating numeric(2,1),
  avaliacoes int,
  cid text,
  google_maps text,
  cnpj text,
  dores text,
  verificacao text,
  status text default 'novo',          -- novo / contatado / reuniao / proposta / fechado / perdido
  observacoes text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- índices para consulta rápida por vertical e status
create index if not exists idx_prospeccao_vertical on public.prospeccao_leads (vertical);
create index if not exists idx_prospeccao_status on public.prospeccao_leads (status);
create index if not exists idx_prospeccao_whatsapp on public.prospeccao_leads (whatsapp) where whatsapp is not null;
create index if not exists idx_prospeccao_nivel on public.prospeccao_leads (nivel);

-- RLS: leitura pública (dados de prospecção aberta), escrita autenticada
alter table public.prospeccao_leads enable row level security;

create policy "leitura publica de prospeccao"
  on public.prospeccao_leads for select
  using (true);

create policy "escrita autenticada de prospeccao"
  on public.prospeccao_leads for insert
  with check (auth.role() = 'authenticated');

create policy "atualizacao autenticada de prospeccao"
  on public.prospeccao_leads for update
  using (auth.role() = 'authenticated');

-- função de busca por texto
create or replace function public.buscar_leads(termo text)
returns setof public.prospeccao_leads
language sql stable
as $$
  select * from public.prospeccao_leads
  where nome ilike '%' || termo || '%'
     or vertical ilike '%' || termo || '%'
     or endereco ilike '%' || termo || '%'
  order by avaliacoes desc nulls last
  limit 100;
$$;
