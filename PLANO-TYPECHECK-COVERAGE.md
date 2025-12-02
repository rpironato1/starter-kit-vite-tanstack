# Plano: Cobertura Máxima do Typecheck (`tsc --noEmit`)

> **Data:** 02/12/2025  
> **Objetivo:** Garantir que `npx tsc --noEmit` capture o máximo de erros possíveis, cobrindo app, testes, configs e tooling, alinhado ao stack TanStack Start + Vite + React 19 e às regras do projeto.

---

## Contexto Atual
- `tsconfig.json` único inclui apenas `src/**/*`, `vite.config.ts`, `env.d.ts`; exclui `prototipos-zane`.
- `compilerOptions`: `strict: true`, `skipLibCheck: true`, `noEmit: true`, bundler mode, alias `@/*`.
- Scripts: `npm run build` executa `vite build && tsc --noEmit`; não há script dedicado para typecheck de testes/tooling.
- Stack: TanStack Start/Router, oRPC + Zod, Tailwind 4, Vitest (jsdom), React Compiler, Cloudflare Workers.
- Risco atual: áreas fora do `include` (tests, scripts, mocks), bibliotecas ignoradas por `skipLibCheck`, ausência de `exactOptionalPropertyTypes`/`noUncheckedIndexedAccess` e tipos específicos (Vitest, React Compiler transforms) não verificados.

---

## Graph of Thoughts (nós/dependências)
```
{Código fonte React + TanStack routes}
  -> usa {tsconfig.app (novo)} -> depende de {tsconfig.base}
{Testes Vitest + utils de teste}
  -> usa {tsconfig.test (novo)} -> depende de {tsconfig.base} + {tipos vitest/jsdom}
{Tooling Vite/Wrangler/scripts}
  -> usa {tsconfig.tooling (novo)} -> depende de {tsconfig.base}
{oRPC schemas + Zod}
  -> gera tipos checados por {tsconfig.app} e {tsconfig.test}
{Build pipeline npm scripts}
  -> orquestra {tsc -b} -> falha se qualquer projeto reference quebrar
```

---

## Fluxograma de Verificação (alvo final)
```
[Salvar código] 
   ↓ (pre-check opcional)
[npm run typecheck] -> executa [tsc -b tsconfig.json] com refs (app+test+tooling)
   ↓
[Vitest type-only checks] -> garante ambientes jsdom/globals
   ↓
[Vite build] -> garante compatibilidade bundler/moduleResolution
   ↓
[Relatório único] -> erros de tipos sem ignorar libs (skipLibCheck=false)
```

---

## Plano Sequencial (numerado)
1. Mapear cobertura atual: localizar pastas de testes, scripts, mocks e entradas TanStack Start (rotas, loaders, actions) para garantir inclusão no typecheck.
2. Criar `tsconfig.base.json` com opções comuns estritas (inspirado no Context7/TypeScript strict): `strict: true`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `useUnknownInCatchVariables`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `alwaysStrict`, `noEmit: true`, `moduleResolution: bundler`, `jsx: react-jsx`, `target/lib` atuais, `paths` e `types` mínimos.
3. Criar `tsconfig.app.json` extendendo `tsconfig.base.json`, incluindo `src/**/*`, rotas TanStack, arquivos de runtime (por ex. `src/entry-client.tsx`, `src/entry-server.tsx` se existirem) e mantendo exclusões necessárias (`prototipos-zane`). Remover/ajustar `skipLibCheck` para `false`, avaliando impactos e mapeando libs que exigirem `types` adicionais.
4. Criar `tsconfig.test.json` para Vitest/jsdom: incluir `src/**/*`, pastas de teste (`**/*.test.ts(x)`, mocks), adicionar `types: ["vitest/globals", "vite/client"]`, `isolatedModules: false` para testes de integração de tipos, e garantir que `moduleDetection` esteja alinhado ao bundler.
5. Criar `tsconfig.tooling.json` para arquivos de configuração (por ex. `vite.config.ts`, `vitest.setup.ts`, `wrangler.jsonc` tipado via `@cloudflare/workers-types`, scripts de migração locais) garantindo `types` específicos e `module` adequado (NodeNext ou bundler conforme necessário).
6. Ajustar `tsconfig.json` raiz para usar `references` apontando para `tsconfig.app.json`, `tsconfig.test.json` e `tsconfig.tooling.json`, tornando-o entrypoint para `tsc -b` e removendo `include`/`exclude` diretos para evitar lacunas.
7. Revisar dependências de tipos: assegurar instalação/uso de `@types/node`, `@types/testing-library__dom`/`react`, `@types/react-dom`, eventuais tipos de Cloudflare Workers e ORPC (se gerarem d.ts) para permitir `skipLibCheck: false` sem erros; mapear libs que exigirem patches.
8. Endurecer checagens em código: eliminar `any` residuais substituindo por tipos inferidos/ Zod infer types; ajustar funções com retornos implícitos para `noImplicitReturns`; corrigir acessos opcionais conforme `exactOptionalPropertyTypes`/`noUncheckedIndexedAccess`; garantir `override` em classes/extends se existirem.
9. Atualizar scripts npm: adicionar `typecheck` rodando `tsc -b`, ajustar `build` para depender de `npm run typecheck` (já roda `tsc --noEmit`, trocar para `npm run typecheck` para evitar duplicidade), e opcionalmente `check:types` para CI.
10. Criar rotina de validação manual: executar `npm run typecheck`, `npm run lint`, `npm run build`, `npx tsc --noEmit` (para garantir compatibilidade direta), e testes manuais/Playwright MCP focados em fluxos afetados (rotas, formulários oRPC) verificando ausência de erros de console.
11. Documentar decisões: registrar no README/REPORT seção curta descrevendo nova topologia de tsconfigs e flags estritas habilitadas, orientando contribuições futuras (como adicionar novos paths a `references`).

---

## Critérios de Aceite
- `tsc -b` falha ao detectar qualquer uso não tipado, acessos opcionais inseguros ou libs sem tipos; `skipLibCheck` desativado.
- Todos os alvos (app, testes, tooling) cobertos por `references`; `npx tsc --noEmit` sem warnings.
- Nenhum arquivo `.tsx` >300 linhas e sem `any`; responsividade e tokens mantidos ao tocar arquivos de UI.
- Build (`npm run build`) e lint (`npm run lint`) passam sem warnings; console do navegador limpo nas rotas tocadas.
