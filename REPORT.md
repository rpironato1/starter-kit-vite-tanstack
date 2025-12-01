# Zane Chat AI — Auditoria de Código

Relatório detalhado da análise 100% do diretório `src`, cobrindo aderência a SOLID, CRUD, design tokens, responsividade e regras do `AGENTS.md`. Conteúdo obtido com suporte à documentação oficial React (Context7) e dividido entre camadas de frontend e backend para facilitar o foco atual solicitado.

---

## Panorama Geral

- **Cobertura total**: rotas, componentes, hooks, contexts, libs, serviços, estilos, tipos e ORPC foram inspecionados. Nenhum arquivo em `src` ficou de fora.
- **Referência técnica**: diretrizes de arquitetura/state management do React (Context7) fundamentaram o checklist de SOLID e modularização.
- **Mapeamento em Nós** (Graph of Thoughts):
  1. **N1 Router/Shell** – `src/router.tsx`, `routes/*`, `routeTree.gen.ts`.
  2. **N2 Layout/UI-base** – `components/layout`, `components/ui`, `components/selectors`, `components/modals`, `components/gates`.
  3. **N3 State/Integrations** – `contexts`, `hooks`, `integrations/tanstack-query`, `env.ts`.
  4. **N4 Domínios** – `components/chat|photo|doc|canvas|settings`, rotas correspondentes.
  5. **N5 Serviços/Utils** – `services`, `orpc`, `lib`, `utils`, `types`.
  6. **N6 Design Tokens** – `styles.css`, `tailwind.config.ts`.
- **Fluxograma**: Usuário → Rotas (N1) → Layout/Providers (N2+N3) → Workspaces (N4) → Serviços/Utils (N5) → Rendering com tokens (N6).
- **Varreduras automáticas**: `rg --files`, `rg 'any'`, contagem de linhas via PowerShell, busca por cores hardcoded, TODOs e comentários remanescentes.

---

## Seção Frontend (Foco Atual)

### Rotas e Workspaces
- `src/routes/index.tsx`, `doc.tsx`, `photo.tsx`, `canvas.tsx` vão de 306 a 384 linhas ➜ violam regra de arquivo `.tsx` < 300 linhas e concentram UI + estado + mocks (violação SRP e dificultam OCP).
- `doc.tsx` usa `useEffect` sem dependências para scroll; novas mensagens não rolam automaticamente.
- Comentários grandes (“REPLACED …”) ainda no corpo das rotas, confundindo manutenção.
- `CanvasPage` mantém `console.log` (linha 192) e depende de `parseArtifactFromMessage` para abrir workspace sem validar preview.

### Componentes Principais
- `CanvasWorkspace` (`components/canvas/CanvasWorkspace.tsx:28`) guarda uma cópia interna do artefato com `useState(initialArtifact)` e nunca sincroniza com `activeArtifact` futuro. Resultado: ao selecionar outro snippet, o workspace continua mostrando o primeiro até recarregar.
- O mesmo workspace renderiza `iframe` apenas para conteúdo HTML, mas também marca `react`, `tsx`, `jsx` como "previewable". Isso falha em produção (necessaria compilação/bundler).
- `CanvasInputArea`, `PhotoInputArea`, `DocInputArea` ignoram i18n → placeholders fixos em PT.
- `ModelSelector` (417 linhas), `ReasoningSelector` (305) e `PhotoInputArea` (307) ultrapassam o limite de 300 linhas e centralizam lógica de estado/animação/layout. Precisam de hooks e subcomponentes.
- Componentes antigos (`PhotoToolbar`, `PhotoCommandBar`, `DocCommandBar`, `CanvasCommandBar`) permanecem no repo sem uso real; apenas citados em comentários. Violam SOLID (código morto) e confundem padrões.
- `TokenUsageProvider` mistura store com UI ao renderizar `TokenUsageModal` dentro do provider (`hooks/useTokenUsage.tsx:58`). Provider deve apenas orquestrar estado; modais ficam na árvore principal.

### Design Tokens e Responsividade
- Diversos hex codes externos aos tokens: `text-[#eecfa1]` (`components/chat/EmptyState.tsx` e `canvas/CanvasCommandBar.tsx`), `bg-[#77f0c5]/20` (ApiKeyGate), `bg-[#1e1e1e]` (CodeEditor) e `text-[#15803d]` (ReasoningSelector). Devem usar `text-accent-textHighlight`, `bg-bg-surface`, etc., como definido em `styles.css`.
- `CanvasWorkspace` fica `fixed inset-0` mesmo em desktop; apenas `md:basis` parcial. Necessário layout responsivo claro (painel lateral em desktop, overlay em mobile).
- Comentários/strings continuam apenas em português (`DocInputArea`, `CanvasInputArea`), quebrando consistência com `LanguageProvider`.

### Hooks e Contexts
- `useTheme`/`LanguageProvider` bem estruturados, mas `useTokenUsage` e `ApiAccessProvider` misturam renderização e providers (colocam UI de loading/gate dentro do provider). Precisa separar estado e apresentação.
- Nenhum hook integra fluxos reais de dados — tudo simulado com `setTimeout` e arrays locais.

### TODOs, Comentários e Logs
- `rg TODO` retornou 12 itens em Settings (MainView, PlanView, PrivacyView, etc.), todos sem rastreio (issues).
- Comentários verborrágicos (ex.: `photo.tsx` descrevendo remoção do toolbar) deveriam estar no histórico do Git, não no código.
- `console.log` residual em `CanvasPage` (linha 192) e outros locais reduz confiabilidade em produção.

### Conclusão Frontend
- Violação contínua de SRP/OCP devido a arquivos gigantes, lógica de estado acoplada à UI e mocks inline.
- Responsividade parcial (workspaces e modais sobrepõem telas menores).
- Design tokens aplicados de forma inconsistente.
- Faltam fluxos CRUD reais, testes e modularização antes de evoluir features.

### Recomendações Frontend
1. **Refatorar rotas** em “container hooks” + componentes presentacionais, garantindo <300 linhas e separando responsabilidade (mensagens / sidebars / input).  
2. **Sincronizar `CanvasWorkspace`** com `activeArtifact`, ajustar preview para HTML apenas e remover `console.log`.  
3. **Padronizar tokens**: substituir todo hex por `text-accent-*`, `bg-bg-*`, `text-text-*` conforme `styles.css`.  
4. **Eliminar componentes obsoletos** (`PhotoToolbar`, `DocCommandBar`, etc.) ou realocá-los se ainda fizerem sentido.  
5. **Internacionalizar placeholders/strings** usando `useTranslation`.  
6. **Separar estado/visual** no `TokenUsageProvider` e `ApiAccessProvider` (provider gerencia store; overlays vivem em App root).  
7. **Documentar TODOs** como issues e remover comentários longos dentro do JSX.  
8. **Planejar testes** (lint/build/tsc + Playwright manual) após ajustes estruturais exigidos pelo AGENTS.md.

---

## Seção Backend / Infra (Separada do Foco Atual)

> _Manter isolado, conforme pedido. Não priorizar agora, mas registrar observações._

- **ORPC/TanStack**: `src/orpc/router/todos.ts` expõe apenas `listTodos` e `addTodo` com array em memória; não há `update/delete`, tampouco integração real com Supabase. `OpenAPIHandler` e `RPCHandler` estão configurados (`routes/api.$.ts`, `api.rpc.$.ts`), mas nenhuma rota do app consome esses endpoints.
- **Serviços**: inexistem adaptadores de dados para chat/doc/photo/canvas → todo CRUD real está ausente.
- **Env**: `env.ts` aceita só `SERVER_URL`/`VITE_APP_TITLE`, sem chaves de API, Supabase ou drivers.
- **Supabase/DB**: sem migrations novas, sem Edge Functions conectando recursos; requisitos do AGENTS.md para usar MCP Supabase não foram exercidos.

---

## Checklist de Conformidade (Regras do AGENTS.md)
- ✅ Uso de Context7 antes do planejamento/executado.
- ✅ Graph of Thoughts + Fluxograma documentados.
- ✅ Regras SOLID/CRUD avaliadas para todo `src`.
- ✅ Design tokens auditados contra `styles.css`.
- ✅ Busca por `any`, TODOs, arquivos >300 linhas e cores hardcoded.
- ✅ Sem alterações de código neste relatório; apenas documentação.

---

## Próximos Passos Sugeridos
1. **Planejar refatoração modular** (por workspace) com hooks/container/presentational, resolvendo arquivos gigantes e tokens.
2. **Implementar sincronização de artifacts** e corrigir previews/console logs.
3. **Padronizar textos/tokens** e remover componentes obsoletos/comentários.
4. **Só depois**: conectar fluxos CRUD reais (Supabase/ORPC), criar migrations e rodar os testes exigidos (lint/build/tsc + Playwright manual).

> Este relatório foi salvo integralmente conforme solicitado. Ajustes futuros devem seguir as mesmas diretrizes do AGENTS.md antes de qualquer implementação.
