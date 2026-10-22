# Auditoria de conversão brasileira — Rei das Vendas

Data: 22/10/2026. A: https://pt.squarespace.com/design-de-sites. B: https://reidasvendas.com.br. Repositório e projeto Vercel existentes preservados. Stack verificada: React, TypeScript, Vite, pré-render estático de 58 URLs indexáveis e /obrigado noindex. Não houve migração de plataforma.

## 1. Veredito executivo

O gargalo comercial é demonstrar a entrega e facilitar uma decisão local sem prometer faturamento. A implementação organiza dor, método, projetos verificáveis, oferta, preço, objeções e contato. Principal risco técnico remanescente: atribuição e resposta comercial sem dados de GA4/CRM; o rate limit do endpoint é por instância. Principal oportunidade: mensagem local clara, preços públicos e WhatsApp contextual, sem exigir auditoria de quem quer implantação.

Notas editoriais de B após revisão (julgamento, não taxa medida): clareza 8/10; hierarquia 8; contato 8; prova documental 7; oferta 8; confiança regional 7; instrumentação validável 7. Conversão real, LGPD jurídica e INP de campo: não pontuados. Não há base para dizer “melhor site de Franca” ou garantir aumento de vendas.

O desempenho mobile de B está à frente de A **nesta amostra de laboratório**. A apresenta processo e redução de risco mais extensos. Não foi demonstrada superioridade de conversão, tráfego ou resultado financeiro.

## 2. Scorecard comparativo

Medições públicas antes desta revisão: Lighthouse 13.5, Chromium 153, mobile simulado, mesma máquina/proxy. Uma execução por perfil público; não é p75 nem reprodução de aparelho brasileiro. JSONs completos comprimidos e resumo: `auditoria/2026-10-22/`. Local final: três execuções isoladas, sem proxy de rede pública, portanto não comparar seu tempo diretamente com o tempo remoto de A.

| Dimensão | A pública | B pública anterior | B final local / gap | Impacto / prioridade | Evidência |
|---|---|---|---|---|---|
| Proposta | Líder em design de sites | Seu negócio merece ser encontrado | Da visita ao contato; mecanismo explícito | Decisão / P0 | DOM público; CalmHero.tsx |
| Hierarquia | Demonstração visual extensa | Hero com formulário | Seções comerciais ordenadas | Clareza / P0 | Home.tsx |
| CTA | Comece agora | Planejar contato | Planejar meu projeto; WhatsApp final | Atrito / P0 | CalmHero, MicroQuiz |
| Prova | Plataforma e exemplos | Projetos reais | Projetos e repositórios, sem números sem laudo | Confiança / P1 | Home, Portfolio |
| Oferta / preço | Link a preços | Duas portas | R$ 1.497 / 3.297 / 5.497; auditoria separada | Qualificação / P0 | growth.ts, Home |
| Redução de risco | Teste grátis, sem cartão, cancelar | Garantia existente | Escopo, propriedade e FAQ; garantia preservada | Risco / P1 | commercial.ts |
| Mobile UX | Hero observado | 6 larguras testadas | 320–1440; sticky após hero | Contato / P0 | e2e |
| Performance mobile | 28 | 91 | 99 / 99 / 99 | Abertura / P0 | LHR |
| Performance desktop | 56 | 92 | 100 | Abertura / P1 | LHR |
| LCP mobile | 14,268 s | 1,712 s | 1,806–1,966 s | Conteúdo principal / P0 | largest-contentful-paint |
| INP | Não medido | Não medido | RUM condicionado ao consentimento | Toque / P1 | businessTracking.ts |
| CLS mobile | 0 | 0 | 0 nas três execuções | Estabilidade / P0 | LHR |
| Resposta inicial | 324 ms | 119 ms | Não atribuir rede local à produção | Rede / P1 | server-response-time; não p75 TTFB |
| SEO mobile | 92 | 100 | 100 | Descoberta / P0 | LHR |
| Canonical | Inspecionada | Limpa | Limpa mesmo com campanha | Duplicação / P0 | e2e/commercial.spec.ts |
| Hreflang | Não auditado globalmente | Autorref e x-default | Removidos: não há URLs traduzidas | Consistência / P1 | index, prerender |
| Schema | Não validado externamente | Organização e páginas | Sem endereço/geo não confirmados; FAQ visível | Confiança / P0 | index, App, commercial |
| Conteúdo | Plataforma global | Regional | Franca sem endereço inventado ou doorway | Relevância / P1 | Home |
| Acessibilidade mobile | 96 | 100 | 100; axe nos fluxos | Uso / P0 | LHR e e2e |
| LGPD | Não auditada juridicamente | Aceitar/rejeitar | Finalidades, personalizar, revogar | Privacidade / P0 | consent, CookieConsent |
| Tracking | Sem acesso à conta | IDs não demonstrados | Helper + testes; DebugView pendente | Atribuição / P1 | analytics.test |
| Segurança | HSTS / nosniff observados | Headers e CSP | script-src sem unsafe-inline | Risco / P0 | vercel.json; headers |
| Confiança local | Sem foco Franca | Projetos publicados | Contato real e provas verificáveis | Contato / P1 | BRAND, GitHub |
| Velocidade de decisão | Processo extenso | Preços publicados | FAQ e duas portas | Qualificação / P1 | Home |

## 3. Análise forense por evidência

| Sintoma / causa | Evidência | Impacto | Correção funcional | Validação |
|---|---|---|---|---|
| Texto livre do briefing em query GET | CalmHero anterior; objetivo | URL pode entrar em histórico/analytics | brief.ts: sessionStorage essencial 30 min; router state | e2e: objetivo ausente na URL e presente no WhatsApp |
| Consentimento binário sem finalidade | CookieConsent anterior | Pouco controle | consent.ts v2: analytics/marketing separados, expiração180 dias, rejeição igual | testes unitários + navegador |
| Campanhas contaminam dimensões | analytics.ts | PII/duplicação | whitelist UTM; IDs Ads só com marketing; URL de evento sem query | analytics.test.ts |
| Scripts permissivos | CSP script-src unsafe-inline anterior | Aumenta superfície | Scripts próprios e fornecedores autorizados, sem execução inline | vercel.json; validar produção após release |
| Hreflang sem tradução real | index/prerender anteriores | Sinal internacional sem destino | Remover alternates até existirem páginas traduzidas | validate-production.mjs |
| LocalBusiness com localização não confirmada | index anterior | Informação indevida | Organization; área atendida sem endereço/geo | teste de JSON-LD |
| Sem CTA inferior contextual | Home anterior | Percurso mobile longo | StickyMobileCTA: após hero; some no footer/banner | e2e/commercial.spec.ts |
| Prova pode ser confundida com promessa | Cards sem laudo | Credibilidade | Links reais, sem velocímetro inventado nem resultados financeiros | revisão de copy / fontes |
| Mídia abaixo da dobra mais pesada | WebP originais | Transferência | AVIF com hash + WebP fallback; 325.958B versus399.032B nos12 arquivos | pipeline, browser e comparação visual |
| Fonte não satisfazia direção | Decisão do dono | Confiança subjetiva | Sora self-host display, system-ui corpo; ouro contido | fonts.css / commerce.css |
| Movimento contínuo dispensável | CSS anterior | Atenção/custo | Reveal260ms uma vez; conteúdo visível sem JS | useSectionReveals; reduced motion |

Não foram observados LCP lazy, imagem sem reserva no hero, jQuery no caminho inicial, autoplay de vídeo, pop-up de entrada ou carrossel automático no build final. Isso não certifica todos os possíveis fornecedores futuros. Não há replay/heatmap instalado nesta revisão; se for adicionado, mascarar PII antes de ativar. Cache, Brotli, HTTP/2 e headers públicos anteriores constam nos arquivos; `x-vercel-id` observado não prova edge brasileiro. Não foi provado HTTP/3, edge Brasil, cadeia mundial de redirecionamento, malware, backup restaurável nem WCAG integral.

## 4. Gap matrix priorizada

| Prazo | Tarefa / dono | Esforço | Impacto1–5 | Risco1–5 | Dependência | Aceite / evidência |
|---|---|---|---|---|---|---|
| P0 24–72h | Publicar revisão / engenharia | M | 5 | 2 | Portões verdes | SHA igual no GitHub, Vercel e assets públicos |
| P0 | Confirmar IDs/contas de mensuração / tráfego | S | 5 | 2 | Acesso real | DebugView sem PII; tags só após consentimento |
| P0 | Validar termos comerciais / dono | S | 4 | 1 | Condições reais | Prazo, pagamento e suporte aprovados na proposta |
| P1 1–2sem | GA4/GSC e dashboard / tráfego | M | 5 | 2 | Permissões read-only/exports | Funil por origem sem PII; indexação revisada |
| P1 | Provas autorizadas / dono | M | 5 | 2 | Clientes e laudos | Link, autorização, período e método por métrica |
| P1 | Retenção CRM e privacidade / responsável | M | 4 | 3 | Operação real | Prazos por finalidade e canal de direitos |
| P1 | Rate limit durável / backend | M | 4 | 2 | Armazenamento/WAF existente | Limite entre instâncias, logs sem briefing |
| P1 | Android/iOS reais, zoom200%, leitor / QA | M | 4 | 1 | Aparelhos | Evidência gravada; nenhuma ação bloqueada |
| P2 30dias | RUM e testes comerciais / CRO | L | 5 | 2 | Volume e consentimento | p75, hipótese e critério pré-definidos |
| P2 | Exigir CI no branch/promover só após QA / DevOps | M | 4 | 3 | Configuração GitHub/Vercel | Falha de budget bloqueia promoção comprovadamente |

## 5. Blueprint e copy

Sequência implementada: header mínimo; hero com formulário de um campo; dor; método; demonstração do percurso (ilustrativa, não dashboard de resultado); projetos; evidência GitHub; duas portas/preços; segmentos; comparação; simulador explicitamente hipotético; FAQ; qualificação/WhatsApp; footer com redes e privacidade. Não foi instalado exit intent: contato permanece disponível sem interrupção. Follow-up não é enviado automaticamente; exige CRM e autorização do contato.

| Copy | Decisão / objeção | Trade-off |
|---|---|---|
| Da visita ao contato. Com um caminho claro. | Explica a transformação sem faturamento garantido | Menos agressiva; precisa de subheadline concreta |
| Sites, páginas e catálogos para empresas de Franca e região | Identifica público e entrega | Limita apelo a quem busca software complexo |
| Planejar meu projeto | Permite começar sem compromisso de compra | Não representa lead concluído; medir etapa seguinte |
| Ver projetos reais | Prova verificável antes de contato | Saída para exploração pode reduzir clique imediato |
| A partir de R$1.497 | Remove medo de preço oculto | Filtra orçamento; escopo maior tem outra faixa |
| Não inclua dados pessoais ou sensíveis | Reduz exposição no briefing | Menos personalização antes de conversa |

Alternativas para teste futuro: “Um site que facilita o próximo contato com sua empresa”; CTA “Quero organizar meu site”. Hipóteses de clareza, não vencedores comprovados. Sem urgência, vagas, depoimentos ou ganhos inventados.

## 6. Design system completo

Fontes: Sora600/700 nos títulos, system-ui400/600/700 no corpo. WOFF2 locais Latin25.284B + LatinExt12.156B; preload apenas Latin; swap; licença OFL incluída. Não carregar Google Fonts em produção.

```css
:root{--color-bg:#fff;--color-surface:#f8fafc;--color-surface-dark:#0b0f19;--color-text:#0f172a;--color-muted:#475569;--color-border:#e2e8f0;--color-primary:#c8a24a;--color-primary-hover:#b8913b;--color-on-primary:#0b0f19;--color-secondary:#0f766e;--color-danger:#dc2626;--color-info:#2563eb}
```

Implementação completa: `src/tokens.css`, `fonts.css`, `commerce.css`, componentes existentes. Container1200px; base4/8px; padding20px; seções64–96px mobile/96px desktop; títulos1.1, corpo1.6; cards14–16px/borda1px; botão48px/radius10px. Ouro com texto preto em CTA, links informativos azuis; coroa ouro sobre escuro e preta sobre claro. Foco3px; hover160ms; disabled sem ação. Form label externo, erro textual e aviso de dados; FAQ nativa; media com dimensão; sem vídeo pesado. Estilo inline permanece permitido na CSP por necessidade do React; scripts inline executáveis não.

## 7. Logo e identidade

Coroa geométrica de três picos, centro ascendente e seta em espaço negativo, base sólida. SVG original em `BrandMark.tsx`; variações em `public/brand`: primary, light, monochrome-black, monochrome-white, avatar e wordmark-horizontal. Favicon simplificado usa o mesmo símbolo, sem joias/contorno medieval. Nome tiposetado manualmente; SVG de wordmark depende de Sora instalada ou exportação em curvas no software de design. Ícones de app existentes atualizados.

Prompt de refinamento: “Símbolo vetorial de coroa comercial de três picos com seta ascendente central e base sólida, flat, geométrico, poucos nós, legível em16px, ouro#C8A24A sobre#0B0F19, preto sobre branco, sem texto, sem personagem, castelo, joia, escudo, brilho, casino, banco ou3D.” Exportar SVG, PNG16/32/180/512 e lockup; nenhuma imagem de IA foi usada como prova. Ouro sobre branco não é cor de texto importante.

## 8. Prompts de imagens

Direção comum: empresa brasileira contemporânea, luz natural, branco/cinza/preto, ouro discreto, sem texto gerado, identidade falsa, métricas inventadas, luxo vazio, neon ou stock americano genérico. Exportar AVIF/WebP com dimensões; JPG se necessário; hero não lazy; demais lazy. Não substituir screenshots verdadeiros por mockup com resultado fictício.

| Uso | Prompt executável | Formato |
|---|---|---|
| Hero | Mesa minimalista brasileira, notebook e smartphone com áreas neutras para screenshot real, espaço negativo amplo, luz suave, nenhum gráfico numérico |16:9 1600×900; mobile4:5 |
| Dor | Smartphone com formulário visualmente longo, interface abstrata sem texto e sem números, problema resolvível, ambiente neutro |3:2 1200×800 |
| Método | Quatro cartões vetoriais: busca, site, conversa, contato; setas simples, sem texto |16:9 SVG |
| Cases | Moldura limpa de notebook e celular para inserir screenshots reais posteriormente, sem marcas falsas |4:3 1200×900 |
| OG | Fundo escuro plano, símbolo SVG real dourado aplicado em design, título manual, sem brilho |1200×630 |
| Ícones | Vetores24px stroke2, busca/chat/segurança/mapa/processo, currentColor |SVG24×24 |
| Fundo | Textura quase imperceptível cinza, sem partículas nem ruído animado |1600×900 |
| Mockup | Device frontal neutro com tela vazia para captura real, perspectiva mínima |4:3 |
| Avatar | Ilustração editorial neutra explicitamente ilustrativa, nunca depoimento |1:1 512×512 |
| FAQ/CTA | Detalhe de espaço de trabalho simples brasileiro, sem pessoa nem texto |3:2 |

Não foram gerados assets decorativos novos sem necessidade de conversão. O hero funcional leve e os screenshots reais têm preferência.

## 9. Animações

| Elemento | Trigger / duração | Reduced motion | Efeito técnico |
|---|---|---|---|
| Seções | IO após dobra; uma vez260ms; cubic-bezier(.22,1,.36,1) | Estático | transform12px+opacity; sem ocultar conteúdo inicial |
| CTA | hover160ms; active imediato | Sem deslocamento relevante | transform; sem layout |
| Sticky | Hero saiu;220ms | Sem slide | Fixado, safe-area; escondido no footer/banner |
| FAQ | Native details | Nativo | Teclado sem biblioteca |
| Logo | Estático prioritário | Estático | Sem atrasar leitura |

Arquivos completos: `useSectionReveals.ts`, `StickyMobileCTA.tsx`, `commerce.css`. Sem scroll-jacking, pin, partículas, 3D, autoplay/carrossel ou H1 escondido. Não há contador numérico sem laudo.

## 10. Código funcional e pipeline

O código completo está no mesmo commit, sem placeholders. Entradas revisáveis:

| Requisito | Arquivo executável |
|---|---|
| head, fonte preload, canonical e schema base | apps/web/index.html |
| @font-face swap e subconjuntos | apps/web/src/fonts.css |
| skip link, foco, scroll-margin | App.tsx, index.css, commerce.css |
| hero funcional com validação | CalmHero.tsx, brief.ts |
| WhatsApp contextual | MicroQuiz.tsx, StickyMobileCTA.tsx |
| imagens picture/srcset/lazy/dimensões | Home.tsx, portfolio-media.json |
| pipeline AVIF reproduzível | scripts/portfolio-media.py (Pillow>=11.3) |
| Consent Mode básico e eventos | analytics.ts, consent.ts, businessTracking.ts |
| preferências e revogação | CookieConsent.tsx, SiteFooter.tsx |
| FAQ visível + JSON-LD correspondente | commercial.ts, CommercialSections.tsx, App.tsx, prerender-growth.mjs |
| headers | vercel.json |
| orçamento Lighthouse | scripts/assert-lighthouse.mjs, .github/workflows/ci.yml |

```bash
PATH=/tmp/rdv-bin:$PATH pnpm check
PATH=/tmp/rdv-bin:$PATH pnpm lint
PATH=/tmp/rdv-bin:$PATH pnpm test
PATH=/tmp/rdv-bin:$PATH pnpm build
# Em CI usa pnpm9.15.0 instalado por pnpm/action-setup, não o caminho temporário acima.
```

Não adicionar preload de imagem ao hero textual: criaria download inútil. Imagens de portfólio ficam fora da dobra com dimensões reservadas. Links e botões nativos; eventos não contêm o texto digitado. Sem JavaScript o formulário abre a rota de implantação, mas não transporta o briefing livre: trade-off de privacidade explícito.

## 11. Tracking e atribuição

Modo básico: nenhum script Google até consentimento e ID real configurado; quatro flags denied por padrão antes do carregamento; analytics e anúncios separados. Marketing desabilitado por padrão. Sem IDs de produção inventados. Testes usam mocks, não são DebugView.

| Evento | Trigger / parâmetros | Estado |
|---|---|---|
| page_view | Entrada/rota; path e location sem query | Implementado condicionado |
| scroll_depth_25/50/75/90 | Uma vez por rota, passive+RAF | Implementado |
| cta_click / whatsapp_click / phone_click / email_click | Ação voluntária; location,label,cta_text | Implementado nos caminhos existentes |
| form_start / form_submit / form_error | Foco, rascunho válido, erro; form_id | Implementado; submit não significa venda |
| faq_expand / pricing_view | Abrir FAQ / preço em viewport | Implementado |
| web_vital | LCP/INP/CLS/FCP/TTFB após consentir | Implementado; CLS enviado×1000 |
| lead_qualificado / agendamento_confirmado | Confirmação real CRM/backend | Pendente de integração real |
| purchase / begin_checkout | Checkout real e pedido validado | Não disparar neste site sem fluxo |
| video_* / gallery_open / exit_intent_show | Só quando feature real existir | Não fabricar eventos |

GTM sugerido: `TRG — rdv — evento`, `GA4 — rdv — evento`; um proprietário de page_view para evitar duplicação; manter somente GTM ou GA direto conforme configuração. Dashboard: sessão→scroll50→CTA→form_start→rascunho→WhatsApp→qualificado→venda. UTMs são whitelist; gclid/gbraid/wbraid/gclsrc só se marketing permitido; _gl/_up/_gs não persistidos. IDs e PII não vão para mensagens analíticas. Server-side só após justificar volume, consentimento e integração real, não como bypass.

QA pendente da conta: DebugView, Ads conversion/Meta se houver campanhas, deduplicação e mudança de preferências com fornecedores reais. Enviar export ou conceder acesso de leitura para verificar; não publicar credenciais no repositório.

## 12. SEO

Home: title comercial atual no head; proposta local no H1; um H1 por URL. /planos passa a “Planos e preços: site, catálogo e auditoria | Rei das Vendas”. Canonical gerada sem query. Sem hreflang até existirem variantes reais. Organization/WebPage/FAQPage apenas quando conteúdo visível correspondente; sem endereço físico, avaliações, receita ou telefone fictícios. Dados reais de contato mantidos da configuração existente.

58 URLs no sitemap; /obrigado noindex; robots e redirects legados mantidos. Plano local: conteúdo útil sobre contratação, atendimento e projetos em Franca; não replicar páginas de cidade mudando só o nome. Links descritivos para serviços, planos, casos e contato. Query de campanha preservada apenas conforme consentimento para atribuição; não bloquear tudo no robots a ponto de impedir leitura da canonical. Search Console, Rich Results externo, cobertura e duplicatas indexadas ainda exigem conta/ferramenta específica.

## 13. LGPD

Implementado: aceitar/rejeitar/personalizar com acesso equivalente; analytics opcional, marketing indisponível sem ativação; política versionada; decisão local com datas/expiração e histórico limitado a10 registros; botão footer para revogar; apagar armazenamento opcional e recarregar ao retirar analytics carregado. Registro local não é prova central certificada. Rascunho essencial30min, sem briefing na URL, excluído no encaminhamento voluntário. Política informa Vercel/possível processamento internacional, Google condicional e saída ao WhatsApp.

Pendente: responsável aprovar retenção por finalidade no CRM, subprocessadores reais, contratos, atendimento de direitos e eventual encarregado. Nenhum heatmap/replay ativo; se houver, mascarar inputs e bloquear até finalidade autorizada. Conformidade jurídica integral não é atestada por banner nem Lighthouse. Antes de ativar anúncios, testar retirada de marketing com analytics mantido, limpeza de cookies de fornecedores e regras de cada tag.

## 14. Acessibilidade

Automação: axe nos fluxos, Lighthouse100 local, menu/FAQ/inputs nativos, labels e erros textuais, foco visível, skip link, reduced motion, alvos principais48px, reflow equivalente a viewport200% em teste. Conteúdo crítico visível sem JS. Native details/summary expõe estado sem adicionar aria-expanded manual redundante.

Pendente manual: zoom real200% do navegador, leitores NVDA/VoiceOver, Android/iOS físicos e revisão editorial completa de alternativas. Nota100 automatizada não comprova WCAG2.2AA integral. Não há vídeo que exija legenda nesta entrega.

## 15. Segurança

HSTS, nosniff, SAMEORIGIN/frame-ancestors self, strict-origin-when-cross-origin, camera/microphone/geolocation desativados, CSP com object-src none e form-action self em vercel.json. Scripts externos somente autorizados quando integração real/consentida. SRI não serve para bundles próprios versionados nem containers GTM mutáveis; não inventar hash de fornecedor.

api/lead.ts existente limita corpo16KB, valida origem, honeypot, entradas e idempotência; limite6/10min em memória por instância não substitui rate limit global. Dependências: pnpm audit registra1high em braces sem correção publicada observada; não houve remoção cega da cadeia de ferramentas. Ver relatório/lock para rastrear; sem prova de exploração em runtime. Backups/restauração, WAF e monitoramento de malware precisam evidência operacional. Sem checkout ativo a certificar PCI.

## 16. Roadmap30dias

Semana1: publicação verificada, controle de tags, copy/oferta e QA de contato. Semana2: autorizações de provas, DebugView/CRM, retenção e políticas revisadas pelo responsável. Semana3: p75RUM, Search Console, aparelhos reais, leitor de tela, limites duráveis. Semana4: teste de headline/CTA com hipótese e tamanho amostral definidos; dashboard do clique à venda; promover apenas mudanças sustentadas por evidência.

## 17. KPIs

Metas, não resultados comerciais: performance>=90, accessibility/best-practices/SEO>=95; LCP<=2,5s, INP<=500ms ideal200, CLS<=0,1 ideal0,05, TTFB<=800ms; FCP<=2s; inicial<=1,5MB, JS comprimido<=250KB ideal170, CSS<=100KB, fontes<=120KB. CLS0 em laboratório não é garantia permanente.

Hipóteses iniciais de funil: CTR CTA3–8%, scroll50>=50%, form_start→submit>=40% para formulário curto. Recalibrar por origem; não tratar como promessa. Medir WhatsApp→resposta→qualificado→venda, CPL e prazo de resposta. Alvo: zero erro crítico de console/axe e nenhuma PII em eventos. Taxa de rejeição/consentimento não é otimizada com dark pattern.

## 18. QA e limites

- Executados: check, lint,57 testes unitários, build estático; três Lighthouse mobile99/100/100/100; desktop100/100/100/100. LCP1,806–1,966s e CLS0 locais.
- Playwright:30 cenários;58 URLs, preços, consentimento/revogação, WhatsApp preparado sem envio, tecladoFAQ, canonical com campanha, reflow, semJS, múltiplas larguras e axe. Última execução de release:30 aprovados em48,5s.
- Produção: verificar SHA/READY/domínio,58 status200, bundles idênticos, headers/CSP e nova mensagem; não confundir preview com domínio.
- Pendentes: GA4 DebugView, GSC, INP de campo, aparelho4G real, zoom real, leitor manual, checkout/CRM ausentes. Não marcar como aprovado o que não foi testado.
- Ambiente: Chromium153 empacotado porque download padrão falhou; execução como root com no-sandbox. Testes públicos via proxy/CA do ambiente; curl validaTLS separadamente. Isso não é configuração recomendada de desktop do usuário.

## 19. Entrega e fontes

Implementação, backlog, copy, schemas, plano de tracking/testes e evidência completa estão neste repositório. Scripts podem ser executados pela equipe sem preencher placeholders no código de produção. IDs reais de contas, acesso a dashboards, autorização de métricas e condições comerciais ainda são dados do negócio e não podem ser inferidos.

Fontes primárias: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic ; https://web.dev/articles/vitals ; https://developers.google.com/search/docs/specialty/international/localized-versions ; https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes . Evidência de interface A é inspeção pública e LHR; resultado de vendas de A não está disponível. Não se copiou sua linguagem visual.
