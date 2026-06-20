#!/usr/bin/env bash
# ═══════════════════════════════════════════
# deploy-direct.sh — Rei das Vendas
# Faz deploy direto via Vercel Deployments API
# (burl, sem framework detection)
# ═══════════════════════════════════════════
set -euo pipefail

cd /opt/data/projects/reidasvendas/apps/web

# Token
VERCEL_TOKEN=*** /opt/data/tokens/vercel-token)"

echo "→ Preparando arquivos para deploy..."

# Gera lista de arquivos no formato Vercel API
FILES_JSON=$(python3 << 'PYEOF'
import base64, json, os

static_dir = ".vercel/output/static"
functions_dir = ".vercel/output/functions"
files = []
total_bytes = 0

# Static files from dist/
for root, dirs, fnames in os.walk(static_dir):
    for fname in fnames:
        full_path = os.path.join(root, fname)
        rel_path = os.path.relpath(full_path, static_dir)
        with open(full_path, 'rb') as f:
            data = f.read()
        total_bytes += len(data)
        files.append({
            "file": rel_path,
            "data": base64.b64encode(data).decode('utf-8'),
            "encoding": "base64"
        })

# Function files
for root, dirs, fnames in os.walk(functions_dir):
    for fname in fnames:
        full_path = os.path.join(root, fname)
        # Get path relative to .vercel/output/
        rel_path = os.path.relpath(full_path, os.path.dirname(os.path.dirname(full_path)))
        with open(full_path, 'rb') as f:
            data = f.read()
        total_bytes += len(data)
        # .vc-config.json stays as-is, index.js is the handler
        files.append({
            "file": rel_path,
            "data": base64.b64encode(data).decode('utf-8'),
            "encoding": "base64"
        })

print(json.dumps({"files": files, "total": len(files), "totalBytes": total_bytes}))
PYEOF
)

TOTAL_FILES=$(echo "$FILES_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])")
TOTAL_BYTES=$(echo "$FILES_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['totalBytes'])")
echo "  → ${TOTAL_FILES} arquivos, $(numfmt --to=iec $TOTAL_BYTES)"

echo ""
echo "→ Enviando para Vercel Deployments API..."

RESPONSE=$(curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$FILES_JSON")

URL=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('url',''))" 2>/dev/null)
ERROR=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('error',{}).get('message',''))" 2>/dev/null)

if [ -n "$URL" ]; then
  echo "✅ Deploy concluído!"
  echo "  URL: https://$URL"
  echo "  Inspect: https://vercel.com/thiagoso/reidasvendas/$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")"
else
  echo "❌ Erro no deploy: $ERROR"
  echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -20
fi
