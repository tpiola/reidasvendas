#!/usr/bin/env bash
# ═══════════════════════════════════════════
# build-output-root.sh — Cria .vercel/output
# na raiz do monorepo (onde Vercel espera)
# ═══════════════════════════════════════════
set -euo pipefail

MONOREPO="/opt/data/projects/reidasvendas"
cd "$MONOREPO"

echo "→ Gerando Build Output API na raiz do monorepo..."

# Cria estrutura
OUTPUT=".vercel/output"
rm -rf "$OUTPUT"
mkdir -p "$OUTPUT/static" "$OUTPUT/functions/apps/web/api"

# Config
cat > "$OUTPUT/config.json" << 'CONFIG'
{
  "version": 3,
  "routes": [
    { "src": "^/api/generate-site$", "dest": "/apps/web/api/generate-site" },
    { "src": "^/api/deploy-site$", "dest": "/apps/web/api/deploy-site" },
    { "src": "^/api/lead$", "dest": "/apps/web/api/lead" },
    { "src": "^/api/chat$", "dest": "/apps/web/api/chat" },
    { "src": "^/api/create-checkout-session$", "dest": "/apps/web/api/create-checkout-session" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
CONFIG
echo "  ✓ config.json"

# Static files from apps/web/dist
cp -r apps/web/dist/* "$OUTPUT/static/"
echo "  ✓ static/ (apps/web/dist)"

# Compile and place API functions
for tsfile in apps/web/api/*.ts; do
  basename=$(basename "$tsfile" .ts)
  func_dir="$OUTPUT/functions/apps/web/api/${basename}.func"
  mkdir -p "$func_dir"

  npx esbuild "$tsfile" \
    --bundle --platform=node --target=node22 --format=cjs \
    --outfile="$func_dir/index.js" \
    --external:node:* --external:@vercel/* \
    --allow-overwrite 2>&1 | tail -1

  # Fix: esbuild wraps handler in getter, Vercel needs direct reference
  sed -i 's/default: () => handler/default: handler/g' "$func_dir/index.js"

  # Also fix: replace the whole __export/module.exports with a direct export
  # The esbuild getter pattern causes Vercel to pass undefined req/res
  sed -i 's/module\.exports = __toCommonJS(generate_site_exports);/module.exports = { default: handler };/' "$func_dir/index.js"
  sed -i 's/module\.exports = __toCommonJS(lead_exports);/module.exports = { default: handler };/' "$func_dir/index.js"
  sed -i 's/module\.exports = __toCommonJS(chat_exports);/module.exports = { default: handler };/' "$func_dir/index.js"
  sed -i 's/module\.exports = __toCommonJS(deploy_site_exports);/module.exports = { default: handler };/' "$func_dir/index.js"
  sed -i 's/module\.exports = __toCommonJS(create_checkout_session_exports);/module.exports = { default: handler };/' "$func_dir/index.js"

  cat > "$func_dir/.vc-config.json" << FUNCCONFIG
{ "runtime": "nodejs22.x", "handler": "index.js", "launcherType": "NodeJs", "shouldAddHelpers": true }
FUNCCONFIG

  echo "  ✓ api/${basename}"
done

echo ""
echo "✓ Build Output API v3 gerado na raiz"
du -sh "$OUTPUT"
