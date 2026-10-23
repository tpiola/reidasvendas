# Publicação e operação — Rei das Vendas

## Identidade e decisão

- Repositório existente: `https://github.com/tpiola/reidasvendas`.
- Produção: branch `main`.
- Projeto Vercel existente: `reidasvendas` / `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL`.
- Time existente: `thiagopiola` / `team_X4bKucsxm1xNovRCzLleI3JC`.
- URL canônica solicitada em 23/10/2026: `https://www.reidasvendas.com.br`.
- URL secundária: `https://reidasvendas.com.br` → principal, permanente, preservando caminho e parâmetros.
- Backup anterior: branch `backup/pre-rebuild-2026-10-23`, commit `33d3bb5f45b10a1eea3f5f5fa65ecef82936edc4`.

O código antigo foi substituído por solicitação explícita do dono, preservando histórico Git, identidade remota e possibilidade de recuperação. Não criar outro repositório nem projeto para publicar.

## Stack e decisões

Next.js App Router + TypeScript strict + React Server Components dão HTML rastreável, páginas estáticas e endpoints de integração na mesma implantação. Interatividade fica em ilhas de cliente. A escolha tem mais runtime e JS de base que Astro; Astro seria competitivo para conteúdo quase estático. Nuxt exigiria ecossistema Vue; Remix prioriza outro modelo de rotas/dados. CMS headless pode alimentar os modelos atuais futuramente, com custo editorial e operacional adicional.

Não habilitar flags experimentais para obter nota de laboratório. ISR só faz sentido quando existir fonte externa com atualização: estabelecer `revalidate` e invalidação autenticada no modelo correspondente. Conteúdo local versionado já recebe build estático e cache da CDN. `proxy.ts`, nome atual no Next 16, substitui o antigo `middleware.ts`; não manter ambos.

## Configuração do projeto existente

| Campo              | Valor                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| Framework Preset   | Next.js                                                                      |
| Root Directory     | raiz do repositório; remover o caminho legado `apps/web` se estiver definido |
| Build Command      | `pnpm build`                                                                 |
| Install Command    | `pnpm install --frozen-lockfile`                                             |
| Output Directory   | padrão Next.js; limpar o antigo `apps/web/dist`                              |
| Node.js            | 22.x ou 24.x compatível com a versão instalada                               |
| Região de funções  | `gru1`, próxima de Franca/SP; a CDN continua global                          |
| Branch de produção | `main`                                                                       |
| Preview            | branches de trabalho no mesmo projeto; manter proteção existente             |

A região brasileira reduz a distância de requisições dinâmicas locais; o resultado depende da localização do CRM/Redis. Se os dados estiverem em outro continente, medir a cadeia inteira antes de mudar a região.

### Domínio: ordem evita loop

Concluído em 23/10/2026: www direto em produção e apex→www308, confirmados no painel, API e HTTP público. Runtime publicado no merge5aaaa14 / deployment dpl_BtLc73GHj7HnRSRKhKYZNCiV5Lxi. As instruções abaixo documentam a ordem para futuras reconstruções/rollback.

Na auditoria de 23/10/2026, o projeto tinha **www → apex, 307**. É o inverso da nova decisão. Uma regra de domínio é processada antes do código; publicar apenas o novo `proxy.ts` sem removê-la gera loop.

1. No projeto confirmado, remover o destino de redirecionamento do domínio `www.reidasvendas.com.br`.
2. Verificar que `www` serve o deployment do mesmo projeto, com certificado válido.
3. Configurar `reidasvendas.com.br` → `www.reidasvendas.com.br`, 308.
4. Conferir ambos os domínios, preservação de query, ausência de loop e canonical.
5. Manter o DNS existente se já verificado; não trocar nameservers ou comprar domínio.

O `proxy.ts` implementa correção de host/HTTPS defensiva apenas nos dois hosts de produção. Não redireciona `localhost`, preview ou outros hosts para produção. `trailingSlash: false` usa a normalização do Next. Não há painel administrativo publicado: URL administrativa inexistente retorna 404; isso não é uma implementação de autenticação.

## Variáveis e credenciais

Use `.env.example` como inventário. Criar variáveis de produção e preview separadamente no painel autenticado Vercel, com secrets server-only e sem imprimir os valores. `NEXT_PUBLIC_*` entram no bundle: nunca colocar tokens nesses campos. Não commitar `.env.local` ou arquivos baixados da Vercel.

| Finalidade             | Variáveis                                                                           | Verificação necessária                                       |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Canônico               | `NEXT_PUBLIC_SITE_URL`                                                              | deve ser exatamente a origem www HTTPS                       |
| GA4                    | `NEXT_PUBLIC_GA4_ID`                                                                | ID real, fluxo web, consentimento, DebugView                 |
| Search Console         | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` quando usar meta                             | propriedade domínio exige DNS; meta é alternativa URL-prefix |
| Meta Pixel             | `NEXT_PUBLIC_META_PIXEL_ID`                                                         | pixel pertencente à empresa e Test Events                    |
| Meta domínio           | `NEXT_PUBLIC_META_DOMAIN_VERIFICATION`                                              | meta/DNS realmente reconhecido no Business Manager           |
| Meta CAPI              | `META_CAPI_ACCESS_TOKEN`, `META_GRAPH_VERSION`                                      | versão suportada no app Meta; deduplicação e consentimento   |
| CAPI em teste          | `META_CAPI_TEST_EVENT_CODE`                                                         | remover o código de teste na publicação de campanhas         |
| Contato                | `WHATSAPP_NUMBER`                                                                   | `5516992333344`, titularidade e atendimento humano           |
| CRM                    | `CRM_API_URL`, `CRM_API_KEY`                                                        | contrato POST e retorno real com `id` ou `lead_id`           |
| Anti-spam              | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RATE_LIMIT_SALT`             | serviço durável configurado; salt longo e aleatório          |
| Monitoramento opcional | `SENTRY_DSN`                                                                        | implementar SDK antes de declarar captura ativa              |
| Vercel RUM opcional    | `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS`                                               | enable no projeto e renderização submetida ao consentimento  |
| Controlador            | `BUSINESS_LEGAL_NAME`, `BUSINESS_CNPJ`, `BUSINESS_ADDRESS`, `PRIVACY_CONTACT_EMAIL` | dados verdadeiros e finalidade/retencão aprovadas            |

`VERCEL_ANALYTICS_ID` não é exigido pelos SDKs padrão Vercel Analytics/Speed Insights. Não inventar esse ID nem afirmar que monitoramento está ativo só por existir componente. A grafia usual de Sentry é `SENTRY_DSN`; a variável `SENTORY_DSN` mencionada no briefing não é um padrão do fornecedor.

`node scripts/check-readiness.mjs` informa presença de configuração, sem revelar valores. `--strict` falha se faltar algum grupo. Presença não prova propriedade, entrega, permissões ou mensuração válida. Produção pode servir o site e o WhatsApp com tags não configuradas; o formulário server-side deve retornar indisponibilidade real se CRM/rate limit não estiverem prontos.

## Pré-publicação

- [ ] Confirmar novamente `origin`, branch e HEAD; reconciliar se remoto avançou.
- [ ] Ler diff e riscos; nenhum segredo, dado de lead ou screenshot pessoal no commit.
- [ ] Executar `pnpm check`, `pnpm lint`, `pnpm test`, `pnpm build` e `pnpm e2e`.
- [ ] Verificar no navegador 320/375/390/414/768/1440 px, teclado e movimento reduzido.
- [ ] Confirmar destinatário WhatsApp, formulário, erro de backend e página de obrigado sem confirmação fictícia.
- [ ] Aceitar/rejeitar/configurar/revogar cookies; testar nenhuma tag antes da autorização.
- [ ] Auditar rotas antigas: redirects explicitamente mapeados e 404 úteis para conteúdo removido.
- [ ] Conferir canonical, título/H1, sitemap, robots, OG e JSON-LD.
- [ ] Concluir dados do controlador e revisão das políticas antes de coleta ativa de leads.
- [ ] Corrigir regra de domínio antiga; evitar loop www/apex.
- [ ] Executar Lighthouse mobile em build de produção; arquivar JSON, versão, URL e condições.
- [ ] Revisar vulnerabilidades reais com `pnpm audit`; não interpretar versão fixada como prova de ausência de risco.

O workflow `.github/workflows/quality.yml` executa checks, testes, build, navegador e Lighthouse. Ele **não** publica e não contém secrets. Habilitar checks exigidos na proteção da branch e Deployment Checks na Vercel é uma configuração externa: a presença do YAML não garante que um deploy aguarde a aprovação dos testes.

## Publicação e rollback

Preferir a integração Git existente. Se usar a CLI, inspecionar o projeto antes e passar explicitamente o mesmo escopo/projeto. Nenhuma operação pode criar projeto implicitamente.

1. Gerar preview no mesmo projeto e testar o commit exato.
2. Para release pela CLI, criar build de produção sem atribuir domínio (`--prod --skip-domain`), testar e promover esse build. Preview usa variáveis diferentes de produção.
3. Confirmar `projectId`, time, commit, READY e domínios. URL aberta sozinha não confirma identidade.
4. Em falha material, usar rollback para deployment conhecido do mesmo projeto. O retorno à versão antiga exige restaurar também a orientação correta de domínio, pois domínio é configuração externa ao commit.
5. Rollback da Vercel pode desativar atribuição automática até promoção futura: conferir comportamento no painel.

## Pós-publicação

- [ ] `www` 200 HTTPS; apex 308; caminhos e UTMs preservados; sem loop.
- [ ] Headers no documento, APIs e resposta 404; CSP sem quebrar formulário ou consentimento.
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt`, manifest e favicon acessíveis.
- [ ] `/obrigado`, preview e endpoints não indexáveis; URLs de API não aparecem no sitemap.
- [ ] Enviar sitemap no Search Console, inspecionar home/serviço/artigo, verificar canonical escolhido pelo Google.
- [ ] GA4 DebugView: consent mode negado antes da escolha; eventos limpos após opt-in; nenhum telefone/nome em URL ou analytics.
- [ ] Meta Test Events: Lead/Contact/Schedule somente quando ação e consentimento existirem, deduplicados por `event_id`.
- [ ] Testar envio real ao CRM com dado autorizado de teste e apagar o registro conforme política.
- [ ] Conferir logs sem PII, falhas 4xx/5xx, custo, rate limit e proteção WAF habilitada no plano.
- [ ] Ativar uptime externo em home e jornada de contato; destino de alerta aprovado pelo dono.

## Medição e operação

Lighthouse é laboratório: metas mobile performance ≥90, LCP ≤2.000 ms, CLS ≤0,1; avisos para bytes >1,6 MB e resposta >800 ms. Rodar três vezes e avaliar mediana. Testar também com consentimento aceito, porque terceiros mudam o custo.

Metas de campo p75: LCP ≤2,5 s, INP ≤200 ms e CLS ≤0,1. CrUX precisa amostra suficiente e janela histórica; não pode ser certificado no dia do deploy. Speed Insights/RUM também precisa tráfego real, tratamento de dados e dashboard. Um score Lighthouse não prova conversão, faturamento, SEO ou experiência de todos os usuários.

Rotina semanal: qualidade dos leads por origem → atendimento → agendamento → proposta → venda. Revisão mensal: CWV, Search Console, rotas com erro, links, consentimento, conteúdo e dependências. Revisão trimestral: acessos mínimos, fornecedores, retenção e restauração do backup.

## Fontes técnicas

- Next Proxy: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- Configuração Next: https://nextjs.org/docs/app/api-reference/config/next-config-js
- Imagens: https://nextjs.org/docs/app/api-reference/components/image
- Headers e cache: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
- Deployments: https://vercel.com/docs/deployments
- Proteção e checks: https://vercel.com/docs/deployment-checks
- Domínios: https://vercel.com/docs/domains

Consultadas para esta implantação em 23/10/2026. Validar novamente quando atualizar a versão do framework ou o projeto.

## Evolução de assinaturas — 23/10/2026

O mesmo projeto agora recebe `/planos`, módulos de presença digital, revisão `/checkout`, onboarding e atendimento ao cliente. Não criar projeto novo. Removida a regra histórica `/planos`→`/servicos`. APIs de pagamento documentadas em `PAGAMENTOS.md`; proposta comercial em `ASSINATURAS-ESTRATEGIA.md`.

Ativar cobrança exige primeiro validar preços/condições, identidade e contrato; alterar a fonte de oferta de proposal para approved; configurar flags OFFER/TERMS, TERMS_VERSION, Stripe test/live/PriceIDs/webhook e Redis; executar sandbox com callbacks duplicados/fora de ordem e conciliação de valores; configurar portal/dunning e processo fiscal; só então testar produção de forma controlada. Não mudar a chave de teste para live como se isso concluísse a validação. GA4/Meta/CRM continuam dependentes das contas reais.

As páginas de checkout, onboarding e atendimento são noindex e ficam fora do sitemap. Permanecem rastreáveis para permitir a leitura de noindex; robots.txt não é proteção de dados nem autenticação. Nenhum identificador de sessão na URL confirma pagamento. Preview mantém proteção e noindex. O código de pagamento sem secrets responde indisponível, e o CTA WhatsApp permanece útil.
