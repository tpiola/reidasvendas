# Verificação da versão Obsidian Editorial

Data: 22/10/2026. Repositório: tpiola/reidasvendas. Branch de produção: main.
Projeto Vercel preservado: reidasvendas, prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL, time thiagopiola.
Domínio: https://reidasvendas.com.br.

## Escopo entregue

Home com implantação e auditoria em caminhos distintos, preços publicados, comparação de jornadas, simulador com premissas editáveis, portfólio, fontes públicas dos projetos e qualificação de três escolhas para WhatsApp. Header com uma única navegação responsiva. Marca geométrica em SVG. Conteúdo inicial renderizado com os mesmos componentes React usados pelo cliente, sem cortina de carregamento; hidratação reaproveita esse HTML. URLs de diagnóstico e catálogo com parâmetros que alteram a interface mantêm montagem de cliente para evitar incompatibilidade com HTML estático.

Pré-render: 59 páginas, 58 URLs indexáveis no sitemap e /obrigado com noindex. Página 404 própria adicional. /obrigado não confirma uma transação que não foi consultada. As imagens do portfólio têm variantes responsivas, dimensões e carregamento adiado.

## Portão de qualidade

| Verificação | Resultado |
| --- | --- |
| pnpm check | 8 tarefas aprovadas |
| pnpm lint | 8 tarefas aprovadas |
| pnpm test | 50 testes aprovados: 42 do site e 8 dos demais pacotes |
| pnpm build | 4 tarefas aprovadas; pré-render e validação de produção aprovados |
| Playwright | 20 testes aprovados em 2,3 minutos |
| Navegação completa | 58 URLs com status 200, um H1, schema JSON válido e sem erro de JavaScript |
| Acessibilidade automática | Nenhuma violação séria ou crítica nas seis jornadas auditadas |
| Responsividade | 390, 768 e 1440 px; sem overflow horizontal |
| Conteúdo sem JavaScript | Home, planos, campanha, portfólio e vertical de clínicas visíveis |
| Preços | R$ 1.497, R$ 3.297, R$ 5.497; campanha R$ 1.048, R$ 2.308, R$ 3.848 |
| Validade da campanha | Desconto encerrado após 27/11/2026 às 23h59, horário de Brasília |
| WhatsApp | Escolhas, oferta, preço e origem preservados na mensagem preparada |
| Consentimento | Recusa de analytics impede requisições às tags de medição |
| Imagens | Dimensões e atributo loading presentes no HTML gerado |
| Segurança de configuração | nosniff, SAMEORIGIN, HSTS e redirects legados 301 verificados |

Comandos de navegador utilizam o artefato já construído: RDV_SKIP_BUILD=1 pnpm --filter web exec playwright test --workers=2. Ambiente: Chromium headless em Linux; os tamanhos móveis são emulação de viewport. O executável alternativo é opcional na configuração de testes.

## Dependências

Correções aplicadas: Vite 6.4.4, Vitest 4.1.12 e Storybook 8.6.19. Auditoria após as atualizações: zero alertas críticos, moderados ou baixos; permanece um alerta alto em braces, sem versão corrigida publicada. A dependência está na cadeia de ferramentas do monorepo; o site público é publicado como arquivos estáticos. O alerta não deve ser confundido com ausência de risco: revisar quando houver correção upstream.

Referência: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm.

## Evidência de trabalho

- Sentinela Saúde Ambiental: https://github.com/tpiola/sentinela-saude-ambiental — páginas de serviços e localidades em site/src/app.
- SaúdeGPT: https://github.com/tpiola/saudegpt — documentação e organização de conteúdo pedagógico.
- Thiago Piola: https://github.com/tpiola/thiagopiola — documentação de produto e integrações.
- SPES: https://github.com/tpiola/spes — portal editorial e documentação de qualidade.

As fontes foram consultadas nesta execução. Código público e projetos próprios são evidência de trabalho; não demonstram, por si, aumento de faturamento ou taxa de conversão. O simulador apresenta hipótese de receita bruta incremental, com taxas de contato e fechamento editáveis, sem promessa de resultado.

## Limites da verificação

A bateria não equivale a certificação de todos os navegadores ou a teste em um iPhone físico. O envio da mensagem depende da confirmação do visitante no WhatsApp. A efetividade dos headers, redirects e arquivo publicado deve ser conferida no domínio após o deployment. Resultados quantitativos dos projetos continuam a instrumentar.

## Medição de laboratório móvel

Lighthouse 13.5.0, execução isolada no artefato de produção local, perfil móvel padrão: desempenho 69; acessibilidade 100; boas práticas 100; SEO 100. LCP 2,4 s, FCP 2,2 s, CLS 0, TBT 1.720 ms. Esta medição ainda indica trabalho na inicialização do JavaScript. Não é uma nota 10/10 nem dado de usuários reais. A medição anterior tinha TBT 3.520 ms; a redução não elimina a necessidade de otimizar o caminho crítico.
