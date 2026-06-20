#!/usr/bin/env bash
# ═══════════════════════════════════════════
# build-api.sh — Compila API TypeScript → JS
# para deploy Vercel (Vite SPA + functions)
# ═══════════════════════════════════════════
set -euo pipefail

cd /opt/data/projects/reidasvendas/apps/web
API_DIR="api"

echo "→ Compilando API TypeScript → JavaScript..."

for tsfile in ${API_DIR}/*.ts; do
  basename=$(basename "$tsfile" .ts)
  echo -n "  ${basename}.ts → "

  npx esbuild "$tsfile" \
    --bundle \
    --platform=node \
    --target=node22 \
    --format=cjs \
    --outfile="${API_DIR}/${basename}.js" \
    --external:node:* \
    --external:@vercel/* \
    --allow-overwrite \
    2>&1 | grep -v "Done"

  echo "✓ ${basename}.js  ($(wc -c < "${API_DIR}/${basename}.js") bytes)"
done

echo ""
echo "→ API compiladas:"
ls -lh ${API_DIR}/*.js 2>/dev/null

echo ""
echo "✓ Pronto para deploy na Vercel!"
