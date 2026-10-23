# Rei das Vendas — estratégia de aquisição e conteúdo

Data: 23 de outubro de 2026. Domínio canônico: https://www.reidasvendas.com.br. WhatsApp: (16) 99233-3344. Região: Franca/SP, região e projetos remotos no Brasil.

## Promessa e mecanismo

**Conectamos marketing, tecnologia e operação comercial para sua empresa enxergar e corrigir o caminho até a venda.**

O diferencial de rigor clínico significa observar evidências, separar sintoma de causa, registrar lacunas e acompanhar a resposta de uma intervenção. Na linguagem do cliente: primeiro entendemos onde a oportunidade se perde; depois definimos o que fazer, quem executa e como avaliar. Não deve sugerir diagnóstico médico, superioridade comprovada ou credenciais ainda não verificadas.

O usuário pediu agência completa de marketing digital; essa definição prevalece sobre a regra de uma habilidade que evita a palavra agência. A descrição comercial será **agência de marketing digital e tecnologia comercial para negócios locais**. Os termos técnicos precisam vir acompanhados do problema que resolvem.

Hero: **Sua próxima venda precisa de caminho.**

Complemento: Sites rápidos, anúncios, conteúdo e processo comercial conectados. Primeiro identificamos o que trava a venda. Depois construímos o que sua operação precisa para avançar.

Não usar garantia de faturamento, primeira posição, número de clientes, prêmio, tempo de mercado, disponibilidade, preço ou prazo sem evidência. Não afirmar que o site converte mais antes de medir. Evitar referência farmacêutica no hero: aumenta explicação e pode confundir a categoria. Ela pode aparecer na história do responsável após confirmar identidade, formação e autorização.

## Arquitetura de mensagem e navegação

| Página | Pergunta respondida | Conteúdo decisivo | Ação principal |
|---|---|---|---|
| Home | O que vocês resolvem? | Oferta conectada, dores, método e serviços | Conversar sobre a operação |
| Método | Como será o trabalho? | Cinco etapas, entregáveis e critérios | Entender o diagnóstico |
| Diagnóstico | Por onde começar? | O que analisamos, dados necessários, limites | Solicitar análise |
| Serviços | O que devo contratar? | Problema, escopo, dependências e limites | Conversar sobre o serviço |
| Resultados | Como vocês avaliam retorno? | Definições, contexto, atribuição e limites | Conhecer o método |
| Cases | Existe prova? | Casos autorizados ou ausência explícita | Entender critérios de prova |
| Blog e guia | O que posso aplicar? | Conteúdo original e exemplos identificados | Próxima leitura ou diagnóstico |
| FAQ | O que falta esclarecer? | Prazo, custo, propriedade e responsabilidade | Falar com especialista |
| WhatsApp | Como funciona o próximo passo? | Mensagem contextual e atendimento humano | Conversa sobre necessidade |

Navegação principal: Serviços, Método, Conteúdo, Sobre, Contato e CTA. Diagnóstico pode ser o CTA secundário ou link de serviço. Rodapé crawlável inclui todas as páginas institucionais, legais, telefone e preferências de cookies. Não usar selo que sugira certificação LGPD. Preferir link **Privacidade e suas escolhas**.

## Rotas e indexação

Institucionais: `/`, `/metodo`, `/diagnostico`, `/servicos`, `/resultados`, `/cases`, `/blog`, `/faq`, `/sobre`, `/contato`, `/privacidade`, `/termos`, `/obrigado`.

Serviços: `/servicos/criacao-de-sites-franca`, `/servicos/gestao-de-trafego-franca`, `/servicos/social-media-franca`, `/servicos/seo-local-franca`, `/servicos/implantacao-crm-franca`, `/servicos/automacao-de-follow-up-franca`, `/servicos/consultoria-comercial-franca`, `/servicos/diagnostico-de-funil-franca`.

Modelo escalável: `/servicos/[slug]`, `/cases/[slug]`, `/blog/[slug]`, `/guia/[slug]`. Não criar página vazia para cada combinação de cidade e serviço. Expandir quando houver oferta atendida, contexto local e informação própria. Padrão de caso: `/cases/[segmento]-[problema-ou-resultado-verificado]-[cidade]`. Um número no slug exige resultado documentado e autorização.

Operacionais: `/go/whatsapp`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` opcional, endpoints de integração e relatório CSP. Obrigado e redirects de conversão ficam fora do sitemap e sem indexação. Rotas inexistentes retornam 404 real, nunca página genérica com status 200. Casas de cases vazias não geram slugs, schema de resultados nem avaliações.

Canonical absoluto no www, sem UTMs. Parâmetros de campanha continuam disponíveis para atribuição consentida, sem alterar canonical. Não gerar páginas indexáveis de filtros. Inicialmente listas curtas sem paginação; quando crescerem, URLs paginadas precisam apontar canonical para si e links normais de navegação. Breadcrumb em serviço e artigo: Início → categoria → página. Em guia: Início → Conteúdo → guia. Schema precisa refletir a tela.

Árvore de links: home apresenta método e serviço; método conduz diagnóstico; diagnóstico relaciona serviços; cada serviço aponta artigos úteis, FAQ e WhatsApp; artigo aponta serviço e outro conteúdo relacionado; casos futuros levam ao serviço e método. Evitar uma sequência obrigatória: o visitante com intenção alta deve conseguir falar pelo WhatsApp em qualquer etapa.

## Objeções locais e respostas

| Objeção | Resposta responsável | Página |
|---|---|---|
| Já paguei por site e não tive retorno | Separar visitas, oferta, contato e atendimento; conferir dados antes de reconstruir | Diagnóstico e método |
| Um fornecedor cobra muito menos | Comparar páginas, conteúdo, integrações, propriedade, manutenção e responsabilidades | Serviços e FAQ |
| Não quero ficar preso a uma agência | Definir propriedade dos ativos, acessos e saída no contrato | FAQ e proposta |
| Preciso vender agora | Explicar dependências, prazo de execução e limite do canal; sem garantia de demanda imediata | Diagnóstico |
| Não tenho equipe para atender mais leads | Ajustar aquisição à capacidade e organizar responsável/próxima ação | CRM e tráfego |
| Não tenho tempo de produzir conteúdo | Definir participação mínima e formatos viáveis; captação separada quando necessário | Social media |
| Quero primeira posição ou garantia de vendas | Recusar promessa fora de controle; combinar entregáveis e indicadores | SEO, tráfego e FAQ |
| Preciso de alguém que entenda Franca | Informação de região, contato humano e diagnóstico da operação real | Home, sobre e contato |

## Escolhas de conversão e trade-offs

| Escolha | Benefício esperado | Custo ou limite | Regra |
|---|---|---|---|
| WhatsApp principal | Familiaridade e contato simples | Clique não comprova conversa nem lead | Nomear intenção corretamente nos eventos |
| Formulário curto | Encaminhamento com contexto | Mais fricção e dados pessoais | Quatro campos, envio server-side e feedback honesto |
| Quiz local sem captura obrigatória | Ajuda o visitante a entender a operação | Resposta não é auditoria | Resultado descritivo; captura opcional |
| Calculadora | Explicita efeito de hipóteses | Pode ser lida como previsão | Mostrar fórmula e separar cenário de resultado |
| Banner de consentimento | Controle de finalidades | Ocupa tela e reduz medição | Recusar e aceitar com facilidade equivalente |
| Feed editorial modular | Renovação e caminho entre conteúdos | Pode imitar prova social | Tags de conteúdo, sem métricas/clientes fictícios |
| Personalização por campanha | Relevância da mensagem | Divergência, flicker e custo de manutenção | Variantes limitadas, sem nomes/atributos sensíveis |
| Animação curta | Direção de leitura e resposta de interação | CPU, foco e desconforto | Opacity/transform; movimento reduzido; conteúdo acessível sem JS |
| Sem chat automático inicial | Foco no canal comercial | Menos disponibilidade assíncrona | Só incluir bot com função, limites e responsável |
| Casos vazios | Transparência | Menos prova para compra | Mostrar método e critérios, nunca números substitutos |

## Funil e eventos

Descoberta: busca local, conteúdo, social e anúncios → página alinhada à intenção. Consideração: método, serviço, FAQ, guia e simulação. Decisão: diagnóstico, WhatsApp ou formulário. Pós-venda: confirmação real, onboarding, execução, revisão, avaliação e indicação após entrega.

Eventos de navegação e microconversão: `view_hero`, `click_cta_secundario`, `scroll_50`, `scroll_90`, `quiz_start`, `quiz_complete`, `calculator_use`, `form_start`. Conversões técnicas: `form_submit` somente envio confirmado; `lead_created` somente persistência/aceite no destino; `whatsapp_click` ou `click_cta_whatsapp` no clique; `contact_whatsapp` não pode significar resposta confirmada do atendente; `schedule_booked` só com confirmação do agendador; `purchase` só com venda confirmada. Não disparar `Lead` Meta ao carregar `/obrigado` por visita direta. Uma chave de deduplicação acompanha Lead enviado pelo browser e CAPI.

Score de priorização sugerido, não avaliação de valor pessoal: formulário recebido +5, solicitação contextual de diagnóstico +4, página de serviço +2, quiz concluído +2, calculadora +1. Score por navegação só com finalidade e consentimento apropriados; nunca usar dado sensível ou inferir renda. Sem consentimento, usar apenas o contexto enviado voluntariamente na solicitação. UTM orienta atribuição e roteamento, não qualidade automática do comprador. A equipe confirma necessidade, urgência, adequação e capacidade de execução em conversa.

CRM recebe campos mínimos: nome, telefone, empresa se necessário, desafio, serviço/intenção, página de entrada, origem/UTM quando permitida, consentimento com versão/data/finalidade e status. Identificador técnico não substitui consentimento. Não registrar texto completo de conversas ou PII em eventos, querystrings, logs e ferramentas de erro.

Recuperação: WhatsApp sem resposta recebe apenas retorno contextual adequado à solicitação; proposta parada segue próximo passo combinado; lead frio é encerrado ou reativado com motivo e permissão; formulário abandonado não gera mensagem porque não houve envio; pós-venda recebe atualização operacional e convite de avaliação após entrega; indicação é voluntária, sem enviar a terceiros dados de quem não autorizou contato. Cadência e SLA precisam ser confirmados pelo responsável antes da publicação.

## CTAs e microcopy

- **Falar com especialista no WhatsApp**: ação direta para intenção alta; não promete resposta instantânea.
- **Ver como trabalhamos**: compromisso pequeno, útil para reduzir dúvida antes da conversa. Usar “em 3 minutos” apenas se o conteúdo tiver duração real verificada.
- **Solicitar análise do meu funil**: intenção específica. Escopo e eventual custo precisam ser informados, sem sugerir diagnóstico gratuito não aprovado.
- **Simular oportunidade de venda**: ferramenta de planejamento com hipótese declarada. Não rotular saída como faturamento garantido.
- **Ler o guia de follow-up**: entrega imediata aberta. Só usar “baixar” se houver arquivo acessível funcionando.
- **Agendar análise do funil**: somente se existir agendador operacional; caso contrário, “Conversar sobre uma análise”.

Mensagem inicial recomendada para equipe: “Olá, aqui é [NOME] da Rei das Vendas. Vi que você quer conversar sobre [DESAFIO]. Qual é o seu serviço principal e como os clientes chegam hoje?” Mensagem automática, se configurada, informa recebimento e horário real, sem fingir atendimento humano ou prazo inexistente.

Formulário: “Não envie dados de clientes, informações sensíveis ou senhas.” Erro: “Não conseguimos confirmar o envio. Tente novamente ou fale pelo WhatsApp.” Sucesso só após confirmação. O contato comercial solicitado e o opt-in de conteúdo não devem ser confundidos; marketing fica opcional e desmarcado.

## Prova e critérios editoriais

Todo caso exige: autorização identificável, período, definição da métrica, baseline comparável, investimento, escopo e papel de outros fatores. Registrar fonte e responsável internamente. Publicar só o permitido; dados pessoais e dados comerciais sigilosos ficam fora. Não usar AggregateRating ou estrelas até existir avaliação real elegível. Exemplos didáticos são marcados como ilustrativos e não recebem tratamento de caso de cliente.

O arquivo `content.json` contém feed editorial, não prova social simulada. Quando houver caso validado, o modelo poderá receber `metric`, `source`, `period`, `baseline`, `authorization` e `lastVerifiedAt`. Um valor ausente permanece ausente, sem zeros que pareçam desempenho.

## Calendário inicial de oito semanas

| Semana | Peça densa | Slug | Serviço relacionado | CTA |
|---|---|---|---|---|
| 1 | Funil simples para PME | `/guia/funil-de-vendas-para-pme` | CRM | Organizar meu funil |
| 2 | Follow-up com contexto | `/blog/follow-up-que-converte` | Automação | Revisar minha rotina |
| 3 | Processo antes do CRM | `/blog/crm-para-pme` | CRM | Avaliar implantação |
| 4 | Indicadores para decidir | `/blog/indicadores-comerciais-para-pme` | Consultoria | Definir o que medir |
| 5 | Objeções sem pressão | `/blog/como-responder-objecoes-de-venda` | Consultoria | Revisar minha oferta |
| 6 | Busca e atendimento em Franca | `/blog/como-aumentar-conversao-em-franca` | SEO local | Revisar meu percurso |
| 7 | Automação com saída humana | `/blog/automacao-sem-perder-atendimento-humano` | Automação | Avaliar o que automatizar |
| 8 | Diagnóstico antes do investimento | `/blog/quando-fazer-diagnostico-comercial` | Diagnóstico | Solicitar conversa |

Cada peça tem title, meta description, Article/BlogPosting, links internos, CTA e evento em `content.json`. Os textos são explicações de método, não pesquisa empírica. Acrescentar observação de campo real só após coleta e revisão. Não usar data de publicação futura como conteúdo já publicado. Não atribuir autoria individual nem revisão profissional sem confirmação.

Rotina semanal: escolher uma pergunta recorrente real; reunir evidência permitida; escrever resposta direta e contexto; mostrar método aplicável; identificar exemplo ilustrativo; revisar limites; publicar checklist e CTA coerente; derivar formatos sociais sem duplicar páginas de busca; revisar sinais no período combinado. Evitar publicar grande volume de páginas locais quase iguais.

Modelo de artigo: situação observável → o que sabemos e o que falta → método → exemplo identificado → checklist → próximo passo específico. A resposta direta aparece no início, mas não há tamanho universal nem necessidade de fragmentar texto para IA.

## SEO e GEO: decisões sustentadas

Criar conteúdo útil e original, clareza da entidade e estrutura técnica rastreável. Schema deve representar informação visível. Organization e WebSite podem usar nome, URL e telefone conhecidos. ProfessionalService/LocalBusiness só deve incluir endereço e horários confirmados; não inventar para atender a um validador. Service por serviço, Article/BlogPosting nos textos, BreadcrumbList quando aplicável. FAQPage descreve FAQ real, sem promessa de rich result. VideoObject e SoftwareApplication ficam ausentes sem vídeo/produto real.

`llms.txt` é opcional e documental. Não é requisito para aparição no Google ou garantia de citação por IA. A orientação oficial consultada afirma que não ajuda nem prejudica ranking Google, que ignora esse arquivo para esse fim. O trabalho comercial relevante é informação útil, oferta compreensível, consistência cadastral, acesso técnico e prova real.

Checklist pós-deploy: resposta 200/404 correta; redirects legados para equivalente real; canonical www sem UTM; robots sem bloqueio acidental; sitemap só com URLs indexáveis; metadados únicos; schema validado; links internos funcionais; mobile e contato; domínio no Search Console; inspeção de páginas críticas; Perfil da Empresa com propriedade, elegibilidade, categoria e área de atendimento confirmadas; monitoramento de consultas e conversões com limites declarados.

Fontes oficiais consultadas em 23/10/2026:

- Google Search Central — otimização para recursos de IA: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide . Fonte primária; confirma base em SEO, conteúdo útil e ausência de efeito especial de llms.txt.
- Google Search Central — recursos de IA e site: https://developers.google.com/search/docs/appearance/ai-features . Fonte primária; contexto de elegibilidade e busca.
- Google Search Central — LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business . Fonte primária; propriedades e diretrizes de empresa local.
- Google Search Central — guia para desenvolvedores: https://developers.google.com/search/docs/fundamentals/get-started-developers . Fonte primária; estrutura técnica e acesso dos mecanismos de busca.

## Dados pendentes que impedem afirmações finais

CNPJ, razão social, endereço ou modelo de área de serviço, horário/SLA, identidade e credenciais do responsável, condições comerciais, preço, prazo, garantias reais, propriedade dos ativos no contrato, fotos reais e direitos de uso, casos autorizados, domínio/DNS e acessos às contas, IDs Google/Meta, CRM e sua política de retenção. Essas lacunas devem aparecer na documentação de entrega, não como placeholders publicados na interface.
