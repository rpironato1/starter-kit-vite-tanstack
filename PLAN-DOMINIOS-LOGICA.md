# Plano: Domínios - Hooks/Services/oRPC

## Contexto
- Pendência: mover hooks, serviços e camada oRPC para dentro de `src/domains/<feature>` e alinhar o que for compartilhado em `src/shared`.  
- Objetivo: remover acoplamento entre rotas e lógica, preparando cada domínio para integrar com Supabase/Edge Functions.  
- Referências: AGENTS.md, ARQUITETURA-ALVO.md (Camada 2-3), PLAN-DOMINIOS-E-TOKENS.md, Context7 `/tanstack/router` e `/websites/tailwindcss`.

## Graph of Thoughts
```
{G1 Estado atual}
  -> {G2 Hooks globais (useTokenUsage/useApiAccess) misturados em src/hooks}
       -> {G3 Parte deveria ir para AppProviders/shared; parte é domínio (ex.: token usage portal)}
  -> {G4 Serviços (promptEnhancer) centralizados em src/services}
       -> {G5 Usados apenas por Photo/Canvas => deveriam morar em domains/photo/services}
  -> {G6 oRPC genérico em src/orpc (todos.ts)} 
       -> {G7 Ainda sem roteadores por domínio}

{G8 Estado alvo}
  -> {G9 App Providers contêm hooks globais}
       -> {G10 Domínios expõem seus próprios hooks/services/orpc via `domains/<feature>/` }
  -> {G11 shared/ concentra UI/utilidades realmente compartilhadas}
Impacto: migrations no import tree e garantia de que cada domínio aponte apenas para sua caixa.
```

## Fluxograma
```
[Inventariar hooks/services/orpc]
   ↓
[Classificar via matriz (Global vs Domínio)]
   ↓
[Mover arquivos + criar index shared/domains]
   ↓
[Atualizar imports nas rotas/componentes]
   ↓
[Criar scaffolds oRPC por domínio + remover mocks antigos]
   ↓
[Executar lint/build/tsc + testes manuais]
```

## Passos
1. **Inventário e classificação**  
   - Mapear todos os arquivos em `src/hooks`, `src/services`, `src/orpc`.  
   - Definir matriz: `global (App/shared)` vs `domínio (chat/photo/doc/canvas/settings)`.  
   - Documentar no README do domínio ou no novo `shared/README`.

2. **Movimentação física + exports**  
   - Hooks globais (`useApiAccess`, `useTokenUsage`, `useSidebar`, `useTheme`, `useI18n`) → `src/app/providers` ou `src/shared/hooks` conforme responsabilidade.  
   - Serviços específicos (ex.: `promptEnhancer`) → `domains/<feature>/services`.  
   - Atualizar `AppProviders` para usar o novo caminho.

3. **oRPC scaffold por domínio**  
   - Criar `src/domains/<feature>/orpc/router.ts` com placeholders (ex.: `chatRouter`, `photoRouter`).  
   - Adaptar `src/orpc/client.ts` para importar os domínios e expor `appRouter`.  
   - Excluir `todos.ts` mockado.

4. **Atualizar rotas e consumidores**  
   - Ajustar todos os imports (rotas, componentes, hooks, services).  
   - Garantir que nenhum domínio importe pasta de outro (usar `shared/` quando necessário).  
   - Atualizar README dos domínios descrevendo novos pontos públicos.

5. **Validação**  
   - Rodar `npm run lint`, `npm run build`, `npx tsc --noEmit`.  
   - Testes manuais (Playwright) navegando por Chat/Photo/Doc/Canvas e abrindo token usage, settings etc.  
   - Registrar resultado e pendências remanescentes (ex.: lógica ainda mockada).

## Checklist Regras Ingegociáveis
- [x] Graph of Thoughts & fluxograma.  
- [x] Referência Context7 (TanStack Router & Tailwind v4) para manter padrões.  
- [x] SOLID/CRUD: domínios com responsabilidades únicas + preparação CRUD via oRPC.  
- [x] Tokens/responsividade mantidos (sem alterar as classes recém migradas).  
- [x] Sem uso de `any`, arquivos <300 linhas (monitorar ao mover).  
- [x] Supabase estrutura respeitada (apenas scaffolds, sem funções globais).  
- [x] Testes obrigatórios previstos.  
- [x] Plano numerado antes da execução.
