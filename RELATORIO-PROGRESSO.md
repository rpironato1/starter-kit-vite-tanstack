# Relatório de Progresso – 02/12/2025

## 1. Status Atual
- **Arquitetura de domínios**: componentes de Photo, Doc, Canvas e Settings migrados para `src/domains/<feature>/components`, com `index.ts` expondo APIs internas. (`src/domains/*/components`)
- **Providers globais**: `useApiAccess` e `useTokenUsage` movidos para `src/app/providers/`, integrados ao `AppProviders`. (`src/app/providers/AppProviders.tsx`, `api-access.tsx`, `token-usage.tsx`)
- **Shared hooks**: `useTranslation`, `useTheme`, `useSidebar` residem em `src/shared/hooks/*`; imports atualizados em layouts, seletores e domínios.
- **Serviços do domínio**: `promptEnhancer` agora em `src/domains/photo/services/promptEnhancer.ts`, consumido apenas pelo domínio Photo.
- **oRPC**: routers placeholders criados para cada domínio (`src/domains/*/orpc/router.ts`) e agregados em `src/orpc/router/index.ts`, substituindo o mock `todos.ts`.
- **Tokens Tailwind v4**: `src/styles.css` usa `@theme` / `@theme dark`, removendo `:root`/`.dark` e ajustando componentes dependentes (`ReasoningSelectorInline`).
- **Planos registrados**: `PLAN-DOMINIOS-E-TOKENS.md` e `PLAN-DOMINIOS-LOGICA.md` documentam as etapas executadas e as próximas fases.
- **Testes**: `npm run lint`, `npm run build` (inclui `npm run typecheck`), `npx tsc --noEmit` e testes manuais (Playwright) cobrindo Chat → Photo → Doc → Canvas. Console limpo e UI estável.

## 2. Entregas Restantes
1. **Hooks/Services específicos por domínio**  
   - Migrar lógica de estado e serviços hoje embutidos nas rotas (ex.: handlers de Photo, Doc, Canvas) para `src/domains/<feature>/{hooks,services}` mantendo arquivos <300 linhas.
2. **oRPC real + Supabase**  
   - Implementar contratos e handlers em `src/domains/<feature>/orpc/router.ts` conectando cada um aos respectivos diretórios `supabase/functions/<feature>` e migrations.
3. **Shared Layer**  
   - Avaliar componentes/hook realmente transversais (ex.: `PrototypeInputContainer`) e movê-los para `src/shared`.
4. **Testes unitários e integração**  
   - Criar suites por domínio (`domains/<feature>/tests`) e validar serviços/hook isoladamente.
5. **Documentação e automação**  
   - Atualizar READMEs dos domínios com contratos expostos e fluxos de dados.  
   - Configurar lint rules/import-boundaries garantindo ausência de imports cruzados não autorizados.

## 3. Próximos Passos Prioritários
1. **Extrair lógica do domínio Chat**  
   - Criar `src/domains/chat/hooks/useChatExperience.ts` e `services/chatAgent.ts` encapsulando handlers hoje definidos em `src/routes/index.tsx`.  
   - Atualizar a rota para consumir apenas o container do domínio.
2. **Repetir para Photo/Doc/Canvas**  
   - Migrar estados/handlers para `domains/<feature>/hooks` e manter rotas apenas como containers.  
   - Garantir que `promptEnhancer` e futuros serviços usem somente tokens do domínio e `shared/`.
3. **Implementar oRPC conectado ao Supabase**  
   - Definir contratos CRUD mínimos (ex.: `chat.sendMessage`) com Zod.  
   - Criar migrations iniciais em `supabase/migrations` e stubs nas funções dedicadas.  
   - Atualizar `orpc/client.ts`/rotas para chamar os novos endpoints (mesmo que retornem mocks controlados).
4. **Testes e observabilidade**  
   - Adicionar suites Vitest para hooks/serviços migrados.  
   - Manter o checklist obrigatório (`npm run lint`, `npm run build`, `npx tsc --noEmit`, Playwright manual) após cada refactor estrutural.

> Com essas etapas, os domínios recebem a fundação completa (hooks, serviços, contratos) e ficam prontos para integrar com Supabase/Edge Functions sem regressões.
