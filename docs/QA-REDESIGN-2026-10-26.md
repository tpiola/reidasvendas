# Redesign e restauração da marca — 26/10/2026

Pedido do dono: restaurar o logo antigo e melhorar design, animações e copy comercial no site existente.

## Identidade

- Repositório: https://github.com/tpiola/reidasvendas; produção: main.
- Vercel: reidasvendas, prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL; equipe team_X4bKucsxm1xNovRCzLleI3JC.
- Domínio: https://www.reidasvendas.com.br. Vercel confirma www sem redirect e apex com 308 para www.
- Base: c872fd990cd79f4820aff0ddf497ae98352b878f.
- Coroa original: 7a007ab:apps/web/public/logo-mark.svg, recuperada byte a byte em public/logo/original-mark.svg.

## Alterações

Home clara com tipografia Sora local preservada, hierarquia de oferta, CTA de briefing, serviços com ilustrações próprias, portfólio com links reais, comparação interativa, planos preservados e fechamento pelo WhatsApp. Identidade original no cabeçalho, rodapé, hero, favicon e ícones. Capas de portfólio identificam os projetos; não são screenshots ou resultados comerciais.

Motion: entrada breve, órbitas ao redor da coroa, microinterações nos serviços e ações, feedback nas abas, fluxo e FAQ. Controle por teclado e pausa. Órbitas param fora da viewport e com aba oculta; preferência reduzida interrompe movimento e oculta o controle. Sem vídeo, canvas ou dependência nova.

## Verificação executada

| Comando | Resultado |
|---|---|
| pnpm check | aprovado |
| pnpm lint | aprovado |
| pnpm test | 59 aprovados |
| pnpm build | 60 entradas, aprovado |
| PLAYWRIGHT_CHROMIUM_EXECUTABLE=/tmp/chromium pnpm e2e | 35 aprovados; 50 rotas; seis larguras; oito jornadas axe |
| pnpm budget | aprovado; home JS moderno 149.863 B gzip, CSS 19.830 B gzip |
| CHROME_PATH=/tmp/chromium pnpm exec lhci autorun (config local equivalente) | nove execuções mobile, todos os portões aprovados |
| pnpm audit --prod | nenhuma vulnerabilidade conhecida |
| git diff --check | aprovado |

Screenshots locais gerados e inspecionados em 390 e 1440 px. Corrigidos contraste em dois textos pequenos e quebra do H1 mobile. Teste novo cobre pausa/retomada por teclado e mudança dinâmica de preferência de movimento. Uma falha inicial do teste foi corrigida: o locator original selecionava o botão pelo nome anterior à mudança de estado.

O download direto de Chromium do Playwright retornou arquivo truncado. Para QA local foi usado Chromium 153 distribuído por @sparticuz/chromium, instalado fora do repositório. A configuração do projeto/CI não foi alterada. O servidor é iniciado junto com os testes no mesmo processo/namespace. Lighthouse 12.6.1, 390×844, throttling simulado. Resultados são laboratório, não CWV de campo nem prova de conversão.

A auditoria completa retorna oito avisos herdados, todos transitivos de @lhci/cli: tmp, uuid, extract-zip, basic-ftp, zod e body-parser. extract-zip ainda sem versão corrigida na fonte auditada. Não foram alteradas dependências para forçar majors incompatíveis durante um redesign. A ferramenta é usada apenas em QA local/CI com entradas controladas; não integra a aplicação publicada. Nenhum servidor LHCI é exposto em produção e nenhum arquivo externo não confiável foi processado. A atualização da cadeia de QA continua pendente.

## Limites preservados

Nenhum dado de vendas, cliente, depoimento ou garantia inventado. Preços, condições, APIs, autenticação, consentimento, analytics, integrações e rotas existentes preservados. Não foram enviados contatos ou mensagens reais. Pagamento e contas externas mantêm as limitações documentadas na revisão anterior. A publicação só é considerada confirmada após deployment READY no projeto canônico e inspeção do domínio público.
