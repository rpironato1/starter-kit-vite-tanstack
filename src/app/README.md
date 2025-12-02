# App Shell

Camada responsável por orquestrar TanStack Router, providers globais e layouts.

- `router.tsx`: instancia o router com integração TanStack Query/SSR.
- `shell/RootComponent.tsx`: aplica `AppProviders` e expõe `<Outlet />`.
- `shell/RootDocument.tsx`: define a estrutura `<html>`/`<body>` e injeta devtools.
- `providers/`: composição de contexts globais (Language, ApiAccess, TokenUsage, etc.).

Os domínios nunca importam diretamente hooks/contexts globais; em vez disso, consomem APIs expostas pelo App Shell.
