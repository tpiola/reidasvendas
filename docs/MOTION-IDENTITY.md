# Movimento e explicação da assinatura

## Objetivo

`CommercialFlow` explica o caminho diagnóstico → estrutura/publicação → leads/WhatsApp → otimização/manutenção. A mudança de etapa é manual. `BeforeAfter` permite comparar duas estruturas conceituais, sem se apresentar como case, prova social ou resultado comercial.

O processo ilustrado não altera condições, preços ou garantia. Entregas e manutenção dependem do escopo contratado. Clique em WhatsApp não é lead confirmado, mensagem enviada ou venda.

## Componentes

Exportações de `components/CommercialFlow.tsx`: `CommercialFlow` e `BeforeAfter`, sem props obrigatórias. O módulo importa `styles/commercial-flow.css`, permitido pelo App Router. Os componentes contêm h3; a página integra seu h2 externo. Usam apenas React já instalado. SVGs são inline, decorativos e sem recursos externos. Logo aprovado permanece intacto.

## Decisões de movimento

- Frequência ocasional; propósito: explicação e indicação de estado.
- Sem autoplay, intervalo, animação de scroll, parallax, contador, montagem em escala, biblioteca de motion ou captura de viewport.
- Texto muda imediatamente. Diagrama mantém dimensões; apenas opacidade do módulo ilustrativo tem transição de `--dur-fast` (180 ms) com `--ease-out` existente.
- Microinteração na seta: `transform: translate(2px, -2px)`, apenas em ponteiro fino com hover e sem preferência por movimento reduzido.
- Teclado desliga transição e hover de seta imediatamente. `prefers-reduced-motion: reduce` remove movimento e transição.
- Não se anima altura, largura, margem, posição de layout, preço, dados de compra ou métricas.
- Textos e pictogramas ativos trocam sem crossfade de conteúdo; estados intermediários não impedem interação.

## Acessibilidade

- Controles são `<button type="button">` nativos com `aria-pressed` e `aria-controls`; sequência do fluxo é lista ordenada.
- Todos os botões são acessíveis por Tab. Enter/Espaço selecionam. No stepper, setas, Home e End selecionam a etapa e movem o foco correspondente. Não há captura de teclado fora do stepper.
- O painel usa anúncio `aria-live="polite"`, sem roubar foco. A cópia HTML descreve a informação completa; SVG decorativo é `aria-hidden` e `focusable=false`.
- Foco segue o contorno visível global, sem animação. Alvos têm mínimo 48 px no comparador e 76 px no stepper mobile.
- Colunas usam `minmax(0, 1fr)`. Mobile empilha a explicação após ilustração; stepper mantém duas colunas e quebra rótulos sem rolagem horizontal.

## Verificação de integração

Rodar `pnpm check` e lint no módulo; o coordenador roda portão completo após integrar a página. Conferir a 320, 390, 768 e 1440 px; usar Tab, Enter, Espaço, setas, Home e End; selecionar rapidamente as quatro etapas; conferir disclosures e foco. Com movimento reduzido, estados devem mudar sem transição. Confirmar ausência de overflow, layout deslocado e afirmações de resultado. Controles não geram eventos de lead ou compra.

A altura mínima de texto mobile preserva o ritmo entre etapas; não há altura fixa nem conteúdo cortado. Não se promete ausência de layout shift de conteúdo sob todas as traduções futuras: novos textos devem passar pela mesma inspeção de tamanhos.

## Evidência desta implementação

- `pnpm exec prettier --write components/CommercialFlow.tsx styles/commercial-flow.css docs/MOTION-IDENTITY.md`: concluído.
- `pnpm exec eslint components/CommercialFlow.tsx`: exit 0, sem mensagens.
- `pnpm check`: exit 0 após correção independente da tipagem de tracking; sem erro nestes componentes.
- Inspeção visual, teclado no navegador e mobile: pendentes do portão integrado; nenhum servidor paralelo iniciado durante a edição coordenada.

Autoria deste módulo: Codex `/root/brand`; integração e publicação pelo coordenador. Nenhum commit ou deploy feito pelo subagente.

## Integração final do hub

Além dos dois módulos ilustrativos, o hub usa progresso de leitura com transform, reveal por IntersectionObserver e stagger limitado, compactação visual do logo no header e parallax de até 12px apenas na coroa decorativa. O evento de scroll é passivo e compartilha uma chamada rAF; reduced-motion remove deslocamento. O feed editorial tem scroll-snap e controles anterior/próximo, sem autoplay. Os números de preço não são animados: precisão e leitura têm prioridade sobre efeito. O pricing é HTML de servidor; apenas radios de ciclo recebem JS, com fallback CSS :has para manter preços corretos sem JavaScript. Não foi criada prova numérica animada sem dados reais.
