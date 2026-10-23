# Rei das Vendas — identidade de conversão

## Conceito

Coroa de conversão construída em quatro módulos: duas hastes laterais, um eixo central que funciona como seta ascendente e uma base sólida. A leitura primária é direção comercial; a coroa comunica responsabilidade pela operação. Sem joias, brilho, textura, gradiente ou emblema medieval.

O desenho usa uma grade 128 × 112. A seta ocupa o eixo x=64; as laterais são simétricas. O espaço entre módulos permanece aberto em pequenas aplicações. A marca é proposta visual original; não foi feita busca de anterioridade ou registro no INPI. [VERIFICAR] disponibilidade de registro antes de investimento em sinalização.

## Arquivos

- `simbolo.svg`: símbolo principal em dourado.
- `mono.svg`: símbolo monocromático com `currentColor`; funciona em SVG inline. Para uso por `<img>`, definir a cor de preenchimento no próprio SVG na exportação.
- `favicon.svg`: versão simplificada, fundo midnight, bordas discretamente arredondadas.
- `lockup-claro.svg`: símbolo dourado e nome midnight, fundo transparente, indicado para ivory/branco.
- `lockup-escuro.svg`: símbolo dourado e nome ivory, fundo transparente, indicado para midnight.
- `apple-touch-icon.png`: 180 × 180.
- `icon-192.png`, `icon-512.png`: ícones de aplicação.
- `maskable-512.png`: 512 × 512; marca dentro da zona segura central de 80%.
- `og-1200x630.png`: imagem de compartilhamento 1200 × 630, texto convertido em curvas.
- `og-1200x630.svg`: fonte vetorial editável do compartilhamento.
- `paleta.json` e `tokens.css`: tokens oficiais.

Arquivos `*-qa.png` são apenas renderizações de inspeção; não são necessários em produção.

## Cores

| Token | Hex | Uso |
|---|---|---|
| midnight | #101920 | Fundo principal, texto em superfícies claras |
| graphite | #202C34 | Superfície secundária escura |
| gold | #C8A46B | Marca, destaque sobre midnight |
| gold-light | #E8D4AD | Ênfase suave, contraste em fundo escuro |
| gold-dark | #89652D | Destaque textual sobre ivory/branco |
| ivory | #F5F1E8 | Superfície clara e texto principal escuro |
| white | #FFFFFF | Contraste e interface |
| muted | #63717C | Texto secundário em superfície clara |
| whatsapp-green | #168246 | WhatsApp com texto branco, confirmar contraste no componente final |
| success | #176F4B | Confirmação sem depender apenas de cor |
| danger | #AE352F | Erros com ícone e mensagem |

Dourado principal é cor de marca e não deve ser usado como texto pequeno sobre ivory ou branco. Usar gold-dark no texto claro. Confirmar WCAG por par real de primeiro plano/fundo, incluindo hover, desabilitado e foco.

## Tipografia

A wordmark foi convertida para curvas a partir de Nimbus Sans Bold (URW Base35). Não exige fonte externa no navegador; todas as letras são paths SVG. A fonte de aplicação sugerida é Manrope variável em WOFF2 local, subset Latin com acentos brasileiros, usando apenas os intervalos necessários de peso (400–700). Alternativa sem requisição adicional: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Exibir com `font-display: swap`; obter WOFF2 de fonte licenciada e guardar licença no repositório. [VERIFICAR] arquivo final e licença Manrope antes de declarar self-hosting ativo.

Não usar a wordmark como fonte de títulos. O nome comercial deve continuar presente em texto real no HTML ou nome acessível do logotipo.

## Regras de uso

- Área de proteção: ao menos 16 unidades do viewBox em todos os lados do símbolo, equivalente à altura da base e seu respiro. No lockup, manter margem externa equivalente a metade da altura do símbolo.
- Símbolo web mínimo recomendado: 28 px de altura. Em 16–24 px, usar favicon simplificado. Impressão: símbolo ao menos 8 mm de altura; lockup ao menos 45 mm de largura, sujeito à prova física.
- Lockup em cabeçalho: largura recomendada 180–230 px; respeitar proporção. Em telas estreitas pode-se usar símbolo com nome comercial acessível.
- WhatsApp/app: ícone em fundo midnight; manter o símbolo dentro da zona segura; não usar texto miúdo no avatar.
- Cartão: lockup em uma face, nome da pessoa e contato em texto separado. Não adicionar slogans à wordmark.
- Uniforme: versão monocromática por bordado, sem estreitar os vazios. Solicitar prova de linha.
- Apresentação: lockup escuro em midnight ou claro em ivory; respeitar área de proteção.
- Proibido: esticar, inclinar, girar, contornar, adicionar sombra/brilho, trocar proporções, fechar os intervalos entre módulos, aplicar sobre imagem ocupada, usar dourado claro sobre branco em texto, adicionar joias/cifrão/foguete.

## Exportação

SVGs de lockup e OG já possuem texto em outlines. Não há dependência de `<text>`, fontes, scripts ou imagens externas. Para PDF/impressão, abrir o SVG no Illustrator/Inkscape, manter proporções, exportar PDF vetorial e converter para o perfil CMYK fornecido pela gráfica. Não anunciar CMYK específico sem conversão e prova. Para PNG, exportar do SVG em dimensões-alvo, sem ampliar um PNG prévio. Apple e PWA foram exportados do vetor em resolução nativa.

## Critério visual

A identidade mantém alto contraste, formas duras e espaço aberto. O dourado serve como sinal de direção, não como decoração de luxo. No site, usar a marca ao lado de copy específica, entregas claras e provas verificadas. O logo sozinho não comprova autoridade ou resultados.
