# Rei das Vendas

Landing pública do Rei das Vendas para negócios locais: vídeo, site, criativos e otimização do Perfil da Empresa no Google em um fluxo concentrado de entrega.

## Stack

- Next.js 15 App Router
- React 19 + TypeScript strict
- Tailwind CSS 4
- Framer Motion 11
- Plausible Analytics
- Vercel

## Ambiente

Copie `.env.example` para `.env.local` e configure os canais oficiais. Nenhum contato é hardcoded em componente.

## Validação

```bash
npm install
npm run validate
npm run typecheck
npm run build
```

O gate de integridade bloqueia placeholders, claims não verificados marcados como tal, armadilhas conhecidas do App Router e inconsistências de prazo.
