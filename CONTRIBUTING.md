# Contribuindo

## Fluxo oficial

- `main`: produção, sempre estável e protegida;
- `feat/*`: funcionalidades;
- `fix/*`: correções;
- `chore/*`: manutenção, infraestrutura e governança;
- branches devem ser curtas e removidas após o merge.

Não existe branch permanente de integração. Toda alteração entra por pull request com CI aprovado.

## Commits

Use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `test: ...`
- `ci: ...`

## Antes de abrir um PR

```bash
pnpm install --frozen-lockfile
pnpm ci
```

O PR deve explicar objetivo, risco, evidência de teste e plano de rollback quando afetar produção.
