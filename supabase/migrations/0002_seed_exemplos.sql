-- =====================================================
-- SEED — dados de exemplo por nicho (referência)
-- IMPORTANTE: substituir por dados REAIS do cliente.
-- Sempre validar (não inventar depoimento/métrica).
-- =====================================================

-- exemplo: negócio odonto
insert into public.negocios (nome, slug, segmento, whatsapp, cidade, uf, nota_google, descricao, cor_primaria)
values
('Clínica de Exemplo Odonto', 'clinica-exemplo-odonto', 'odonto', '5516999999999', 'Franca', 'SP', 5.0,
 'Odontologia com implantes e clareamento em Franca', '#0031b4')
on conflict (slug) do nothing;

-- exemplo: advogada
insert into public.negocios (nome, slug, segmento, whatsapp, cidade, uf, nota_google, descricao, cor_primaria)
values
('Advogada de Exemplo', 'advogada-exemplo', 'advocacia', '5516999998888', 'Franca', 'SP', 5.0,
 'Advocacia de família e sucessões em Franca', '#1e293b')
on conflict (slug) do nothing;

-- serviços do negócio odonto
insert into public.servicos (negocio_id, nome, descricao, preco_min, ordem)
select id, 'Implante dentário', 'Implante com guia 3D e coroa em porcelana', 1200, 1
from public.negocios where slug = 'clinica-exemplo-odonto'
on conflict do nothing;

-- profissional (com registro OAB como exemplo)
insert into public.profissionais (negocio_id, nome, cargo, registro, bio)
select id, 'Dra. Exemplo', 'Dentista', 'CRO-SP 00000', 'Especialista em implantodontia'
from public.negocios where slug = 'clinica-exemplo-odonto'
on conflict do nothing;

-- nota: estes são EXEMPLOS. Para projeto real, inserir dados reais do cliente.
