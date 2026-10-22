# Revisão visual clara — 22/10/2026

Solicitação: trocar a tipografia condensada e a estética escura, adotar espaços mais amplos inspirados na referência pública https://www.meta.ai/, formulário na abertura, coroa dourada, redes sociais e animações durante o scroll. Referência observada no navegador: abertura centralizada, campo amplo, navegação discreta, seções alternadas e superfícies claras. A aplicação usa conteúdo e identidade próprios; não tem vínculo com a Meta.

## Entrega

- Tipografia de sistema sem condensação, sem carregar fonte externa na abertura.
- Home clara e centralizada, formulário de objetivo funcional e rotas comerciais preservadas.
- Coroa dourada no cabeçalho, abertura, rodapé, favicon e ícones.
- Links existentes de Instagram e LinkedIn com espaço e rótulos na abertura e no rodapé.
- Animações nativas de scroll em títulos, demonstração e imagens; empilhamento no desktop e leitura linear no celular. Conteúdo sempre visível; preferência por movimento reduzido respeitada.
- Nova camada de cores para catálogo, contato e portfólio. Correções de contraste em componentes legados.

## Verificação

| Comando ou cenário | Resultado |
| --- | --- |
| pnpm check | Aprovado |
| pnpm lint | Aprovado |
| pnpm test | 50 testes aprovados |
| pnpm build | Aprovado; 59 páginas pré-renderizadas, 58 no sitemap |
| Playwright completo final | 25 testes aprovados em 1,1 minuto |
| Viewports | 320, 375, 390, 414, 768, 1440; sem overflow horizontal |
| Axe | Sem violações sérias ou críticas nas seis jornadas; teste adicional com movimento normal aprovado |
| Brief | Objetivo preservado até a mensagem preparada no WhatsApp; sem envio automático |
| Navegação | 58 rotas com H1, canonical, schema legível e sem erros de runtime |
| Privacidade | Recusa impede tags de analytics |
| Preços e conteúdo sem JS | Aprovados |

A validação visual incluiu screenshots da abertura no celular e desktop, rodapé, catálogo e portfólio. Rodadas intermediárias detectaram estilos escuros legados com contraste insuficiente; corrigidos antes da aprovação final. O navegador oficial de teste não pôde ser baixado pelo CDN nesta execução; foi usado Chromium 153 do pacote @sparticuz/chromium, apenas no ambiente de teste e sem nova dependência de produção. Emulação não equivale a teste em aparelho físico. Métricas Lighthouse da direção visual anterior são históricas e não certificam esta revisão. O alerta de dependência braces previamente documentado permanece.
