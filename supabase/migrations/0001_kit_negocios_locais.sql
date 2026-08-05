-- =====================================================
-- KIT SUPABASE — Negócios Locais (universal)
-- Schema que atende QUALQUER tipo de negócio/profissão:
-- odonto, advocacia, estética, academia, restaurante,
-- clínica, fisioterapia, construção, imobiliária, barbearia...
-- =====================================================

-- extensões úteis
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- 1) NEGÓCIO (cliente)
create table if not exists public.negocios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text unique not null,
  segmento text not null,             -- 'odonto', 'advocacia', ...
  cnpj text,
  whatsapp text,
  telefone text,
  email text,
  endereco text,
  cidade text default 'Franca',
  uf text default 'SP',
  latitude numeric,
  longitude numeric,
  nota_google numeric(2,1),           -- ex: 5.0 (avaliacao real)
  descricao text,
  logo_url text,
  cor_primaria text default '#0031b4',
  site_deployado boolean default false,
  clinica_url text,
  criado_em timestamptz default now(),
  ativo boolean default true
);

-- 2) LEADS (formularios/WhatsApp)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  nome text,
  whatsapp text,
  email text,
  origem text,                          -- 'site','google','whatsapp','indicacao'
  utm text,
  mensagem text,
  status text default 'novo',           -- novo, contatado, convertido, perdido
  criado_em timestamptz default now()
);

-- 3) SERVIÇOS (o que o negócio oferece)
create table if not exists public.servicos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  nome text not null,
  slug text,
  descricao text,
  preco_min numeric,
  preco_max numeric,
  imagem_url text,
  icone text,
  ordem int default 0,
  ativo boolean default true
);

-- 4) PROFISSIONAIS (equipe)
create table if not exists public.profissionais (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  nome text not null,
  cargo text,
  registro text,                        -- OAB/CRO/CRM
  bio text,
  foto_url text,
  especialidade text,
  ordem int default 0,
  ativo boolean default true
);

-- 5) DEPOIMENTOS (só com autorização/real)
create table if not exists public.depoimentos (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  autor text,
  texto text not null,
  nota int check (nota between 1 and 5),
  autorizado boolean default false,     -- nunca expor sem autorização
  criado_em timestamptz default now()
);

-- 6) FAQ
create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  pergunta text not null,
  resposta text not null,
  ordem int default 0
);

-- 7) IMAGENS (galeria/hero/antes-depois)
create table if not exists public.imagens (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  url text not null,
  tipo text,                            -- 'hero','galeria','antes','depois','logo'
  alt text,
  ordem int default 0
);

-- 8) HORÁRIOS (funcionamento)
create table if not exists public.horarios (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id) on delete cascade,
  dia text,                             -- seg,ter,qua,qui,sex,sab,dom
  abertura text,
  fechamento text,
  fechado boolean default false
);

-- RLS: habilitar e politica publica de leitura (sites públicos), escrita protegida
alter table public.negocios enable row level security;
alter table public.servicos enable row level security;
alter table public.profissionais enable row level security;
alter table public.depoimentos enable row level security;
alter table public.leads enable row level security;

-- leitura pública (dados do site)
create policy "leitura publica negocios" on public.negocios for select using (ativo = true);
create policy "leitura publica servicos" on public.servicos for select using (true);
create policy "leitura publica profissionais" on public.profissionais for select using (true);

-- leads: inserção pública (formulário), leitura só autenticado/serviço
create policy "inserir lead" on public.leads for insert with check (true);

-- índices
create index if not exists idx_negocios_segmento on public.negocios(segmento);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_servicos_negocio on public.servicos(negocio_id);

-- VIEW: painel de conversão por negócio
create or replace view public.painel_conversao as
select n.nome as negocio, n.segmento,
  count(distinct l.id) as total_leads,
  count(distinct case when l.status = 'convertido' then l.id end) as convertidos,
  count(distinct case when l.status = 'contatado' then l.id end) as contatados
from public.negocios n
left join public.leads l on l.negocio_id = n.id
group by n.id, n.nome, n.segmento;

-- note: criar um usuário anônimo p/ inserir lead? o anon role já consegue com policy insert.
