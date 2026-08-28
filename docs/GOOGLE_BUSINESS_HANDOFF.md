# Google Business Profile — handoff operacional

Este documento separa o que já está implementado no site do que exige autenticação e validação do proprietário no Google.

## Identidade pública proposta

- Nome: Rei das Vendas
- Posicionamento: infraestrutura digital para negócios locais e profissionais liberais
- Telefone: +55 16 99233-3344
- Site: https://reidasvendas.com.br/
- E-mail: contato@reidasvendas.com.br
- Base de atendimento: Franca, SP

O nome publicado no perfil deve corresponder ao nome usado no mundo real. Não acrescentar termos como “melhor agência”, “top 1”, cidade, serviços ou palavras-chave ao nome se eles não fizerem parte da identidade real da empresa.

## Categoria e área de atendimento

A categoria principal deve ser escolhida entre as opções disponíveis no painel do Google que descrevam a atividade principal real. Categorias secundárias só entram quando o serviço é efetivamente prestado. Se não houver atendimento presencial no endereço, ocultar o endereço e configurar Franca e as áreas reais atendidas como área de serviço, sem extrapolar a capacidade operacional.

## Conteúdo do perfil

- Descrição: explicar em linguagem natural que a empresa cria e opera sites, lojas, aplicativos, produtos digitais e automações para negócios locais.
- Serviços: cadastrar apenas ofertas disponíveis, agrupadas como presença, comércio, atendimento, produto, distribuição e operação.
- Fotos: usar logotipo oficial, capturas reais de projetos, ambiente e equipe próprios. Não usar imagens geradas, bancos genéricos, texto promocional sobreposto ou montagens que confundam o cliente.
- Publicações: alternar projetos reais, guias úteis e novas soluções, sempre com destino canônico no site.
- Avaliações: solicitar feedback sem incentivo, filtro, pressão ou texto pré-escrito; responder com contexto e sem expor dados pessoais.

## Implementado no site

- `ProfessionalService` e `Organization` em JSON-LD, com telefone, e-mail, localidade e área atendida.
- metadados geográficos de Franca/SP.
- canonical determinístico no domínio apex.
- sitemap, robots e páginas de serviço indexáveis.
- NAP digital consistente no contato e no rodapé.

## Ação que exige o proprietário

1. Confirmar propriedade do perfil e do domínio no Search Console.
2. Validar o nome, a categoria e a área real de atendimento no painel.
3. Enviar as fotos originais e concluir eventual verificação por vídeo.
4. Vincular o site e acompanhar indexação, ações no perfil e consultas locais.

Nenhuma dessas quatro etapas pode ser automatizada no repositório sem uma sessão autenticada e autorização do proprietário.
