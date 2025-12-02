# Relatório de Progresso – 02/12/2025

## 1. Status Atual
- **Arquitetura de domínios**: componentes de Photo, Doc, Canvas e Settings migrados para `src/domains/<feature>/components`, com `index.ts` expondo APIs internas. (`src/domains/*/components`)
- **Hooks de experiência por domínio**: extraí toda a lógica de Chat, Photo, Doc e Canvas para `useChatExperience`, `usePhotoExperience`, `useDocExperience` e `useCanvasExperience` em `src/domains/<feature>/hooks`, mantendo as rotas apenas como containers finos.
- **Providers globais**: `useApiAccess` e `useTokenUsage` movidos para `src/app/providers/`, integrados ao `AppProviders`. (`src/app/providers/AppProviders.tsx`, `api-access.tsx`, `token-usage.tsx`)
- **Shared hooks**: `useTranslation`, `useTheme`, `useSidebar` residem em `src/shared/hooks/*`; imports atualizados em layouts, seletores e domínios.
- **Serviços do domínio**: `promptEnhancer` agora em `src/domains/photo/services/promptEnhancer.ts`, consumido apenas pelo domínio Photo.
- **Agentes simulados por domínio**: `chatAgent`, `docAnalyzer`, `photoRenderAgent` e `canvasBuilder` moram em `src/domains/<feature>/services` e alimentam os hooks (`use<Feature>Experience`), deixando rotas/containers sem side effects.
- **Shared layer**: `PrototypeInputContainer` migrado para `src/shared/components`, consumido por todos os domínios de input mantendo fronteira de importação.
- **oRPC**: routers placeholders criados para cada domínio (`src/domains/*/orpc/router.ts`) e agregados em `src/orpc/router/index.ts`, substituindo o mock `todos.ts`.
- **Tokens Tailwind v4**: `src/styles.css` usa `@theme` / `@theme dark`, removendo `:root`/`.dark` e ajustando componentes dependentes (`ReasoningSelectorInline`).
- **Planos registrados**: `PLAN-DOMINIOS-E-TOKENS.md` e `PLAN-DOMINIOS-LOGICA.md` documentam as etapas executadas e as próximas fases.
- **Testes**: `npm run lint`, `npm run build` (inclui `npm run typecheck`), `npx tsc --noEmit` e testes manuais (Playwright) cobrindo Chat → Photo → Doc → Canvas. Console limpo e UI estável.

## 2. Entregas Restantes
1. **oRPC real + Supabase**  
   - Implementar contratos e handlers em `src/domains/<feature>/orpc/router.ts` conectando cada um aos respectivos diretórios `supabase/functions/<feature>` e migrations.
2. **Shared Layer (fase 2)**  
   - Revisar demais componentes compartilháveis (ex.: `CommandBarBase`, `InputBar`) e movê-los para `src/shared`, garantindo lint/import-boundaries.
3. **Testes unitários e integração**  
   - Criar suites por domínio (`domains/<feature>/tests`) e validar serviços/hook isoladamente.
4. **Documentação e automação**  
   - Atualizar READMEs dos domínios com contratos expostos e fluxos de dados.  
   - Configurar lint rules/import-boundaries garantindo ausência de imports cruzados não autorizados.

## 3. Próximos Passos Prioritários
1. **Domínios: agentes + integrações**  
   - Evoluir os serviços recém-criados para dialogar com oRPC/Supabase (transição do mock para handlers reais).  
   - Reaproveitar utilidades em `shared/` sempre que mais de um domínio consumir a mesma função.
2. **Conectar oRPC + Supabase**  
   - Definir contratos reais por domínio em `domains/<feature>/orpc/router.ts`, criar migrations em `supabase/migrations` e ligar com `supabase/functions/<feature>`.
3. **Implementar oRPC conectado ao Supabase**  
   - Definir contratos CRUD mínimos (ex.: `chat.sendMessage`) com Zod.  
   - Criar migrations iniciais em `supabase/migrations` e stubs nas funções dedicadas.  
   - Atualizar `orpc/client.ts`/rotas para chamar os novos endpoints (mesmo que retornem mocks controlados).
4. **Testes e observabilidade**  
   - Adicionar suites Vitest para hooks/serviços migrados.  
   - Manter o checklist obrigatório (`npm run lint`, `npm run build`, `npx tsc --noEmit`, Playwright manual) após cada refactor estrutural.

> Com essas etapas, os domínios recebem a fundação completa (hooks, serviços, contratos) e ficam prontos para integrar com Supabase/Edge Functions sem regressões.
