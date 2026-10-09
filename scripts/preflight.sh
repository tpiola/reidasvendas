#!/usr/bin/env bash
# Pré-voo obrigatório antes de editar o repositório.
#
# Só lê: faz `git fetch` (não altera arquivos de trabalho) e imprime o estado.
# Uso:
#   ./scripts/preflight.sh          # estado + avisos
#   ./scripts/preflight.sh --gate   # estado + portão de qualidade (check, lint, test)
#
# Este script não substitui docs/ESTADO-ATUAL.md nem docs/GOVERNANCA-AGENTES.md: ele só mostra
# onde você está. A política você lê da revisão impressa abaixo.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

aviso() { printf '  \033[33mAVISO\033[0m  %s\n' "$1"; }
falha() { printf '  \033[31mFALHA\033[0m  %s\n' "$1"; }
ok()    { printf '  \033[32mok\033[0m     %s\n' "$1"; }

echo "== Identidade =="
remote=$(git config --get remote.origin.url || echo "sem remote")
echo "  remote: $remote"
case "$remote" in
  *reidasvendas*) ok "repositório esperado" ;;
  *) falha "este não parece ser o tpiola/reidasvendas — não edite daqui" ;;
esac

echo
echo "== Sincronia com origin/main =="
if ! git fetch --quiet origin 2>/dev/null; then
  falha "sem rede ou sem acesso ao origin: política indisponível -> só inspeção estática"
else
  local_sha=$(git rev-parse --short HEAD)
  remote_sha=$(git rev-parse --short origin/main)
  behind=$(git rev-list --count HEAD..origin/main)
  ahead=$(git rev-list --count origin/main..HEAD)
  echo "  HEAD:        $local_sha"
  echo "  origin/main: $remote_sha"
  [ "$behind" -gt 0 ] && aviso "$behind commit(s) novo(s) no remoto: outra pessoa mexeu — reconcile antes de editar"
  [ "$ahead" -gt 0 ] && aviso "$ahead commit(s) seu(s) ainda não empurrado(s)"
  [ "$behind" -eq 0 ] && [ "$ahead" -eq 0 ] && ok "em sincronia"

  echo
  echo "== Trabalho recente de outros agentes (heurística de autor) =="
  git log --since="10 days ago" --format='  %h %ad %an — %s' --date=short origin/main | head -8
fi

echo
echo "== Estado local =="
dirty=$(git status --porcelain | wc -l | tr -d ' ')
if [ "$dirty" -gt 0 ]; then
  aviso "$dirty arquivo(s) modificado(s) aqui — pode ser trabalho alheio em andamento:"
  git status --short | head -10 | sed 's/^/         /'
else
  ok "árvore limpa"
fi

echo
echo "== Revisão de política (leia ESTE estado) =="
if git ls-files --error-unmatch docs/ESTADO-ATUAL.md >/dev/null 2>&1; then
  pol=$(git log -1 --format=%H -- docs/ESTADO-ATUAL.md)
  echo "  revisão: $pol"
  echo "  leia:    git show $pol:docs/ESTADO-ATUAL.md"
  echo "           git show $pol:docs/GOVERNANCA-AGENTES.md"
elif [ -f docs/ESTADO-ATUAL.md ]; then
  aviso "docs/ESTADO-ATUAL.md existe aqui mas não está versionado — commite o estado antes de confiar nele"
else
  falha "docs/ESTADO-ATUAL.md ausente -> não edite sem estabelecer a política"
fi

if [ "${1:-}" = "--gate" ]; then
  echo
  echo "== Portão de qualidade =="
  for cmd in check lint test; do
    echo "  -> pnpm $cmd"
    if pnpm "$cmd" >/tmp/preflight-$cmd.log 2>&1; then
      ok "pnpm $cmd"
    else
      falha "pnpm $cmd (saída em /tmp/preflight-$cmd.log)"
      tail -15 "/tmp/preflight-$cmd.log" | sed 's/^/         /'
      echo
      falha "portão vermelho: não commite, não empurre"
      exit 1
    fi
  done
fi

echo
echo "Lembretes: não reverter trabalho aprovado sem decisão registrada; preço e garantia do dono são"
echo "intocáveis; sem número inventado; não empurrar com portão vermelho."
