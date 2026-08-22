# Governança do Projeto

## Identidade canônica

| Recurso | Valor oficial |
|---|---|
| Repositório GitHub | `tpiola/reidasvendas` |
| Branch de produção | `main` |
| Projeto Vercel | `reidasvendas` |
| ID do projeto Vercel | `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL` |
| Equipe Vercel | `thiagopiola` |
| Domínio público | `reidasvendas.com.br` |
| Alias canônico | `www.reidasvendas.com.br` → `reidasvendas.com.br` |
| Diretório da aplicação | `apps/web` |

Nenhum segundo projeto Vercel deve acompanhar este repositório. Ambientes temporários são previews do projeto canônico, nunca projetos permanentes paralelos.

## Controles de mudança

1. Criar branch curta a partir de `main`.
2. Abrir pull request em modo draft durante a implementação.
3. Exigir CI verde antes do merge.
4. Validar o preview Vercel.
5. Fazer squash merge com mensagem objetiva.
6. Confirmar produção e remover a branch.

## Proteção da produção

A branch `main` deve exigir pull request e os checks de qualidade, testes, build e E2E. Force push e exclusão da branch devem permanecer bloqueados.

## Domínio e deploy

Os domínios `reidasvendas.com.br` e `www.reidasvendas.com.br` pertencem somente ao projeto Vercel `reidasvendas`. O endereço sem `www` é canônico; `www` deve redirecionar para ele. URLs `.vercel.app` são técnicas e não devem ser divulgadas como domínio institucional.

## Higiene

Branches integradas ou abandonadas devem ser removidas após verificação. Documentos temporários de execução não permanecem na raiz do repositório; decisões duráveis ficam em `docs/`.
