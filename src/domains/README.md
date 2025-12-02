# Domains Layer

Cada subdiretório em `src/domains` representa um micro-módulo independente (Chat, Photo, Doc, Canvas, Settings).

Estrutura padrão:
```
domains/<feature>/
  components/
  hooks/
  services/
  orpc/
  tests/
```

- **components**: UI específica do domínio (máx. 300 linhas por arquivo).
- **hooks**: estado/container local sem importar outros domínios.
- **services**: lógicas puras e adapters para oRPC/Supabase.
- **orpc**: contratos, schemas e clients dedicados.
- **tests**: suites unitárias/integradas do domínio.

Essa organização garante o “blast radius” contido descrito em `ARQUITETURA-ALVO.md`.
