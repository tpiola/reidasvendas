---
version: "alpha"
name: "The Sovereign Standard"
description: "Sistema visual e editorial do Rei das Vendas para presença digital de negócios locais."
colors:
  primary: "#030303"
  surface: "#0B0B0C"
  titanium: "#A7A8AA"
  mineral: "#F5F2EA"
  gold: "#B89A5E"
  success: "#42C77A"
  danger: "#E05D5D"
  on-primary: "#F5F2EA"
  on-gold: "#030303"
typography:
  display:
    fontFamily: "Georgia"
    fontSize: "clamp(3rem, 7vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  heading:
    fontFamily: "Georgia"
    fontSize: "clamp(2.5rem, 5vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.18em"
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
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.editorial}"
    padding: "18px 24px"
  button-primary-hover:
    backgroundColor: "#D0B878"
    textColor: "{colors.on-gold}"
  surface-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.editorial}"
---

## Overview

O Rei das Vendas deve parecer uma unidade externa de tecnologia: independente, precisa e estável. A referência material é uma combinação de painel técnico, documento executivo e hospitalidade de primeira classe. Não é agência criativa, curso, marketplace de templates nem SaaS genérico.

## Colors

Preto profundo sustenta autoridade e foco. Mineral cria pausas editoriais e legibilidade. Ouro fosco sinaliza decisão, nunca decoração em excesso. Uma cor temática pode representar cada cliente, mas não substitui a base institucional.

## Typography

Display serif comunica autoridade; Geist organiza interface, leitura e ação. Títulos são curtos e decisivos. Texto corrido deve permanecer abaixo de 65 caracteres por linha. Monospace fica restrita a dados técnicos reais.

## Layout

Grid editorial amplo, ritmo alternando grupos densos e pausas generosas. A home prioriza tese, diagnóstico, método e poucos projetos. A biblioteca completa vive em rota própria e é filtrada por objetivo, não por estética de template.

## Elevation & Depth

Profundidade vem de contraste, bordas finas e sobreposição funcional. Evitar glassmorphism, brilhos contínuos, partículas e sombras decorativas. Motion orienta causa, decisão ou mudança de estado.

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
