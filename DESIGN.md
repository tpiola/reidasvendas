---
version: "alpha"
name: "Rei das Vendas — Dossiê Operacional"
description: "Sistema visual e editorial do Rei das Vendas para organizar decisões comerciais."
colors:
  primary: "#152023"
  surface: "#FAF8F2"
  titanium: "#516064"
  mineral: "#F2EFE7"
  oxide: "#B54122"
  success: "#2E6548"
  danger: "#9D372A"
  on-primary: "#F2EFE7"
  on-oxide: "#FAF8F2"
typography:
  display:
    fontFamily: "Barlow Condensed"
    fontSize: "clamp(3.25rem, 7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Barlow Condensed"
    fontSize: "clamp(2.5rem, 5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Archivo"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  editorial: "2px"
  control: "8px"
  group: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  5xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.on-oxide}"
    typography: "{typography.label}"
    rounded: "{rounded.editorial}"
    padding: "18px 24px"
  button-primary-hover:
    backgroundColor: "#92351C"
    textColor: "{colors.on-oxide}"
  surface-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.editorial}"
---

## Overview

O Rei das Vendas deve parecer uma unidade externa de projeto: incisiva, precisa e estável. A referência material combina dossiê de trabalho, mapa operacional e oficina bem organizada. Não é agência criativa, curso, marketplace de modelos nem SaaS genérico.

## Colors

Azul-grafite sustenta autoridade e foco. Mineral cria leitura e pausa. Óxido sinaliza decisão em uma área pequena; não funciona como decoração. Uma cor temática pode representar cada cliente, mas não substitui a base institucional.

## Typography

Barlow Condensed cria a voz curta e usinada; Archivo organiza interface, leitura e ação. Títulos são curtos e decisivos. Texto corrido fica entre 45 e 65 caracteres por linha. Monospace fica restrita a dados técnicos reais.

## Layout

Grid editorial amplo, ritmo alternando grupos densos e pausas generosas. A home prioriza tese, diagnóstico, método e poucos projetos. A biblioteca completa vive em rota própria e é filtrada por objetivo, não por estética de template.

## Elevation & Depth

Profundidade vem de contraste, bordas finas e sobreposição funcional. Evitar glassmorphism, brilhos contínuos, partículas e sombras decorativas. Motion orienta causa, decisão ou mudança de estado.

## Motion & Timing (controle)

- Easing consistente (ex: cubic-bezier 0.16,1,0.3,1); nunca linear puro.
- Durações: entrada 0.6-0.9s, hover 0.2-0.3s, transição de página 0.4-0.5s. Sentimento "caro".
- Stagger em cascata 50-90ms. Um "momento wow" por página, o resto contido.
- `prefers-reduced-motion` respeitado (desliga/atrofia animações). Mobile-first.
- Motion não atrasa acesso a telefone/WhatsApp/agendamento.

## QA de precisão (antes de qualquer entrega)

- Pixel-perfect em 1440/1024/768/390/320 (sem overflow/clip/CLS).
- CWV campo p75: LCP≤2.5s, INP≤200ms, CLS≤0.1. Lighthouse ≥ 95.
- Animações 60fps; console sem erros JS.
- Agendar WhatsApp, formulário e telefone testados ponta-a-ponta.
- Título único por página, 1 h1, alt text, schema JSON-LD válido.

## Anti-AI-slop (regra de qualidade)

- Nunca usar frases genéricas: "padrão premium", "performance obsessiva", "transformam negócios", "diagnóstico preciso", "estratégia sob medida", "Resultados: Em breve".
- Substituir por observação específica, prova real ou decisão visual com intenção.
- Copy só pode pertencer àquele negócio (teste: apague o nome, se serve a 5 concorrentes, está genérico).

## Shapes

Raios discretos. Controles podem usar 8 px; superfícies institucionais preferem 0–2 px. Círculos são reservados a ícones e indicadores legítimos.

## Components

Botões têm alvo mínimo de 44 px, foco visível e verbo específico. Cards existem apenas quando o conteúdo é uma unidade acionável. Formulários registram origem e UTMs antes de abrir WhatsApp.

## Do's and Don'ts

- Usar provas reais, escopo transparente e linguagem verificável.
- Projetar primeiro para 390 px e conexão limitada.
- Tratar Google Business Profile, Maps, site e WhatsApp como um sistema.
- Não inventar métricas, avaliações, clientes, selos ou garantias.
- Não chamar arquiteturas demonstrativas de templates na comunicação pública.
- Não repetir badges, gradientes, pills e grids de cards como gramática padrão.
