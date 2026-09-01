#!/usr/bin/env bash
# ═══════════════════════════════════════════
# build-vercel-output.sh — Rei das Vendas
# Gera estrutura Build Output API v3 para
# SPA (Vite) + Serverless Functions (api/)
# ═══════════════════════════════════════════

set -euo pipefail

cd "$(dirname "$0")"
OUTPUT_DIR=".vercel/output"
STATIC_DIR="${OUTPUT_DIR}/static"
FUNCTIONS_DIR="${OUTPUT_DIR}/functions"

echo "→ Build outputs em ${OUTPUT_DIR}"

# Limpa output anterior
rm -rf "${OUTPUT_DIR}"
mkdir -p "${STATIC_DIR}" "${FUNCTIONS_DIR}"

# 1. Config
cat > "${OUTPUT_DIR}/config.json" << 'CONFIGEOF'
{
  "version": 3,
  "routes": [
    {
      "src": "^/api/generate-site$",
      "dest": "/api/generate-site"
    },
    {
      "src": "^/api/deploy-site$",
      "dest": "/api/deploy-site"
    },
    {
      "src": "^/api/lead$",
      "dest": "/api/lead"
    },
    {
      "src": "^/api/chat$",
      "dest": "/api/chat"
    },
    {
      "src": "^/api/health$",
      "dest": "/api/health"
    },
    {
      "src": "^/api/leads$",
      "dest": "/api/leads"
    },
    {
      "src": "^/api/leads/stats$",
      "dest": "/api/leads/stats"
    },
    {
      "src": "^/api/leads/verticals$",
      "dest": "/api/leads/verticals"
    },
    {
      "src": "^/api/leads/([^/]+)$",
      "dest": "/api/leads/$1"
    },
    {
      "src": "^/api/create-checkout-session$",
      "dest": "/api/create-checkout-session"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "overrides": {
    "index.html": {
      "path": "index.html"
    }
  }
}
CONFIGEOF
echo "  ✓ config.json"

# 2. Static files — copia do dist/
cp -r dist/* "${STATIC_DIR}/"
echo "  ✓ static/ (" "$(du -sh "${STATIC_DIR}" | cut -f1)" ")"

# 3. Compila e empacota funções serverless
compile_function() {
  local api_name="$1"
  local src_path="api/${api_name}.ts"
  local func_dir="${FUNCTIONS_DIR}/api/${api_name}.func"

  if [ ! -f "${src_path}" ]; then
    echo "  ✗ ${src_path} não encontrado, pulando"
    return
  fi

  mkdir -p "${func_dir}"

  # Compila TypeScript → JavaScript (CJS para compatibilidade Vercel)
  npx esbuild "${src_path}" \
    --bundle \
    --platform=node \
    --target=node22 \
    --format=cjs \
    --outfile="${func_dir}/index.js" \
    --external:node:* \
    --external:@vercel/* \
    --allow-overwrite \
    2>&1 | tail -3

  # .vc-config.json
  cat > "${func_dir}/.vc-config.json" << FUNCCONFIG
{
  "runtime": "nodejs22.x",
  "handler": "index.js",
  "launcherType": "NodeJs",
  "shouldAddHelpers": true
}
FUNCCONFIG

  # Copia dataset JSON (dados de prospecção) para dentro da function
  if [ -d "api/data" ]; then
    cp -r api/data "${func_dir}/data"
  fi

  echo "  ✓ api/${api_name}"
}

echo "→ Compilando serverless functions..."
compile_function "generate-site"
compile_function "deploy-site"
compile_function "lead"
compile_function "chat"
compile_function "create-checkout-session"
compile_function "health"
compile_function "leads"

echo ""
echo "✓ Build Output API v3 gerado em ${OUTPUT_DIR}"
echo "  Static:     $(find ${STATIC_DIR} -type f | wc -l) arquivos"
echo "  Functions:  $(find ${FUNCTIONS_DIR} -name "index.js" | wc -l)"
du -sh "${OUTPUT_DIR}"
