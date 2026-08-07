#!/usr/bin/env node
/**
 * Gate de validação do Rei das Vendas.
 * Falha (exit 1) em violação de prazo, dado não verificado, env hardcoded
 * ou armadilha conhecida do App Router.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.argv[2] ?? process.cwd();
const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'out', 'scripts']);
const EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.json', '.md']);

const RULES = [
  { id: 'PRAZO_DIAS_UTEIS', re: /dias?\s+[úu]teis/i, msg: 'Menção a "dias úteis" contradiz a promessa de mesmo dia.' },
  { id: 'PRAZO_N_DIAS', re: /\b\d+\s*(a\s*\d+\s*)?dias?\b(?!\s*de\s*(suporte|garantia))/i, msg: 'Prazo em dias. Use "mesmo dia", "hoje" ou "24h".' },
  { id: 'PRAZO_SEMANAS', re: /\b\d+\s*(a\s*\d+\s*)?semanas?\b/i, msg: 'Prazo em semanas fora da comparação com agência.', allow: [/Comparison/i, /constants/i] },
  { id: 'METRICA_NAO_VERIFICADA', re: /verified\s*:\s*false/, msg: 'Métrica com verified:false não pode ir para produção.' },
  { id: 'DEPOIMENTO_PLACEHOLDER', re: /\[\s*Nome\s*\]|\[\s*tipo de neg[óo]cio\s*\]|Lorem ipsum/i, msg: 'Depoimento fictício. Remova a seção ou use dado real.' },
  { id: 'WHATSAPP_HARDCODED', re: /5516999999999|55\d{10,11}(?![\w])/, msg: 'WhatsApp hardcoded. Use NEXT_PUBLIC_WHATSAPP_NUMBER.', allow: [/\.env/, /README/i, /\.md$/] },
  { id: 'DOMINIO_HARDCODED', re: /https?:\/\/(www\.)?sriacash\.com/, msg: 'Domínio hardcoded. Use NEXT_PUBLIC_SITE_URL.', allow: [/\.env/, /\.md$/] },
  { id: 'SSR_FALSE_EM_SERVER', re: /ssr\s*:\s*false/, msg: 'dynamic({ssr:false}) só é permitido em arquivo com "use client".', check: (src) => !/^['"]use client['"]/m.test(src) },
  { id: 'NEXT_METADATA_INEXISTENTE', re: /from\s+['"]next\/metadata['"]/, msg: "O módulo 'next/metadata' não existe. Use import type { Metadata } from 'next'." },
  { id: 'XSS_HEADER_DEPRECADO', re: /X-XSS-Protection['"]?\s*,?\s*value:\s*['"]1/, msg: 'X-XSS-Protection: 1 está deprecado. Remova ou use 0.' },
  { id: 'ROLE_BUTTON_REDUNDANTE', re: /<button[^>]*role=["']button["']/, msg: 'role="button" em <button> atrapalha leitores de tela.' },
  { id: 'VH_NO_HERO', re: /min-h-screen|100vh/, msg: 'Use 100svh — 100vh corta o CTA no Safari iOS.', allow: [/\.md$/] },
  { id: 'CSP_UNSAFE', re: /script-src[^;]*unsafe-(inline|eval)/, msg: "script-src com 'unsafe-inline'/'unsafe-eval' anula a CSP. Use nonce." },
  { id: 'FETURBULENCE', re: /feTurbulence/, msg: 'Grão via feTurbulence em elemento fixed repinta a cada frame. Use PNG base64.' },
];

const REQUIRED = ['app/politica-de-privacidade/page.tsx', 'app/not-found.tsx', 'app/sitemap.ts', 'lib/constants.ts', '.env.example'];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry) || (entry.startsWith('.') && entry !== '.env.example')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXT.has(extname(entry)) || entry === '.env.example') out.push(full);
  }
  return out;
}

const problems = [];
for (const path of REQUIRED) {
  if (!existsSync(join(ROOT, path))) problems.push({ file: path, line: 0, id: 'ARQUIVO_AUSENTE', msg: 'Arquivo obrigatório não gerado.' });
}
for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  const rel = file.replace(ROOT + '/', '');
  const lines = src.split('\n');
  for (const rule of RULES) {
    if (rule.allow?.some((a) => a.test(rel))) continue;
    if (rule.check && !rule.check(src)) continue;
    lines.forEach((line, i) => {
      const t = line.trimStart();
      if (t.startsWith('//') || t.startsWith('*')) return;
      if (rule.re.test(line)) problems.push({ file: rel, line: i + 1, id: rule.id, msg: rule.msg, snippet: t.slice(0, 90) });
    });
  }
}

if (problems.length === 0) {
  console.log('\x1b[32m✓ validate.mjs — nenhuma violação encontrada.\x1b[0m');
  process.exit(0);
}
console.error(`\x1b[31m✗ ${problems.length} violação(ões):\x1b[0m\n`);
for (const p of problems) {
  console.error(`  [${p.id}] ${p.file}:${p.line}\n    ${p.msg}`);
  if (p.snippet) console.error(`    → ${p.snippet}`);
  console.error('');
}
process.exit(1);
