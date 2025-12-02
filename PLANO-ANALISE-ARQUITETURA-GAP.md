# Plano de Análise: Lacunas para Arquitetura Ideal

## Contexto
- Solicitação: comparar o estado atual do repositório com o alvo descrito em `PLANO-ARQUITETURA-IDEAL.md` e orientar o ponto de partida rumo ao padrão enterprise.
- Referências obrigatórias: AGENTS.md, ARQUITETURA-ALVO.md, práticas React/TanStack Router (Context7 `/tanstack/router`, seção *project structure*), Tailwind CSS v4 docs (Context7 `/websites/tailwindcss`, tópicos *functions-and-directives* e *upgrade guide*).
- Restrições: manter SOLID/CRUD, tokens definidos via Tailwind CSS v4 (expostos em `src/styles.css` com `@theme`/`@utility`), zero `any`, responsividade e blast radius por domínio.

## Graph of Thoughts
```
{G1 Documento alvo}
  -> {G2 Camadas Planejadas (Infra, App Shell, Domínios, Edge)}
       -> {G3 Estrutura `src/app|shared|domains`}
            -> {G4 Supabase/Workers por domínio}
                 -> {G5 Ciclo de Qualidade (lint, build, typecheck, Playwright, Supabase tests)}
{G6 Estado atual}
  -> {G7 Pastas raiz (components, hooks, routes, services, etc.)}
       -> {G8 Rotas TanStack centralizadas}
            -> {G9 Ausência de domínios isolados/shared central}
                 -> {G10 Risco de regressão cruzada}
Impacto: migrar de G6→G2 requer sequenciar transformação estrutural antes de tocar lógica, garantindo isolamento por domínios e contratos oRPC/Supabase.
```

## Fluxograma de Trabalho
```
[Revisar documentação alvo + Context7]
   ↓
[Mapear estrutura atual (src, supabase, workers)]
   ↓
[Identificar lacunas por camada]
   ↓
[Priorizar migração: Infra → Shell → Domínios → Edge]
   ↓
[Definir quick wins + roadmap de refactors controlados]
   ↓
[Validar com checklist inegociável + riscos]
```

## Passos Planejados (numerados)
1. **Consolidar requisitos**: reread AGENTS.md, PLANO-ARQUITETURA-IDEAL.md e referências TanStack Router (Context7) para capturar padrões mandatórios (SOLID, CRUD, domínios isolados, tokens, limites de linhas).
2. **Inventariar estado atual**: levantar estrutura real (`src`, `supabase`, `workers`, `routes`) e mapear onde App Shell, domínios, shared e edge functions não seguem o blueprint.
3. **Mapear lacunas por camada**: comparar Infra (tokens/contexts), App Shell (router/providers), Domínios (subpastas, contratos), Edge/Supabase (migrations, funções dedicadas) e Qualidade (testes, observabilidade).
4. **Priorizar ações iniciais**: definir ordem recomendada (ex.: criar `src/app` e `src/domains`, extrair shared primitives, estabelecer roteiros de migração por domínio) alinhada a práticas enterprise (strangler fig, trunk-based, feature toggles).
5. **Detalhar riscos/regressões**: listar impactos potenciais (ex.: rotas gigantes >300 linhas, acoplamento, ausência de contratos), propondo mitigação (tests, adapters temporários).
6. **Produzir relatório ao usuário**: entregar análise apontando gaps, quick wins, roadmap inicial e referências Context7/SOLID/CRUD, incluindo checklist dos requisitos inegociáveis seguidos durante o plano.

## Checklist das Regras Innegociáveis (Plano)
- [x] **Graph of Thoughts**: seção dedicada identifica nós G1-G10, impactos e dependências.
- [x] **Fluxograma**: fluxograma ASCII descreve sequência de execução.
- [x] **Consulta Context7**: referência explícita ao `/tanstack/router` para padrões de estrutura TanStack.
- [x] **Princípios SOLID/CRUD**: citados em Contexto e integrados aos passos 1-5.
- [x] **Tokens/Responsividade**: lembrados no Contexto e a serem conferidos nos passos 2-4.
- [x] **Sem `any` / Arquivos <300 linhas**: reforçados nos requisitos (passo 1).
- [x] **Supabase/Edge Functions dedicadas**: cobertas no passo 3 ao comparar camada 3.
- [x] **Testes (lint/build/tsc/Playwright/Supabase)**: previstos em G5 e passos 5-6.
- [x] **Plano numerado completo antes da execução**: seção "Passos Planejados" contém lista sequencial.

---

## Prioridades e Quick Wins (Passo 4)

### Mini Graph of Thoughts – Sequência recomendada
```
{P1 Infra compartilhada pronta}
  -> {P2 App Shell modularizado}
       -> {P3 Domínio piloto (Chat) estrangulado}
            -> {P4 Repetição para demais domínios}
                 -> {P5 Edge Functions + Supabase}
                      -> {P6 Qualidade contínua}
```

1. **Infra + Providers Comuns**  
   - Criar `src/app/` com `providers/` (Theme, Language, ApiAccess, TokenUsage) e `layouts/` para concentrar o shell descrito em ARQUITETURA-ALVO §2.  
   - Extrair estilos globais para `src/styles.css` usando `@theme`/`@utility` (Tailwind v4) com tokens nomeados; preparar `@reference` para futuros CSS Modules.  
   - Benefício: estabelece limite claro entre Camada 0 e os domínios antes de qualquer refactor funcional.

2. **Refinamento do App Shell**  
   - Migrar `src/router.tsx` e `src/routes/__root.tsx` para `src/app/router.tsx` e `src/app/shell.tsx`, separando HeadContent, error boundaries, devtools e contexts.  
   - Introduzir adaptadores de contexto (Dependency Inversion) para que domínios só importem contratos expostos por `src/app`.  
   - Benefício: evita que mudanças de roteamento afetem os domínios e habilita SSR/TanStack Start no futuro.

3. **Domínio Piloto (Chat) – Strangler Fig**  
   - Criar `src/domains/chat/{components,hooks,services,orpc,tests}` e mover gradualmente cada unidade (começando por componentes já existentes em `src/components/chat`).  
   - Implementar um container `domains/chat/ChatExperience.tsx` consumido pela rota atual, mantendo a UI existente como fallback até finalizar o domínio.  
   - Benefício: prova o modelo de domínio isolado com riscos controlados e serve de template para Photo/Doc/Canvas.

4. **Escalonar para Photo, Doc, Canvas, Settings**  
   - Repetir a extração seguindo o padrão do domínio piloto.  
   - Cada domínio ganha contratos próprios, evitando imports cruzados (usar `shared/` apenas quando estritamente necessário).

5. **Edge Functions / Supabase**  
   - Inicializar `supabase/migrations/` e `supabase/functions/<domínio>` mesmo que com mocks iniciais, garantindo caixa por domínio e versionamento de schema.  
   - Integrar oRPC específico (`domains/<feature>/orpc/router.ts`) e conectar com Supabase/Workers conforme ARQUITETURA-ALVO §4/§10.

6. **Qualidade Contínua**  
   - Configurar matrizes de validação: `npm run lint`, `npm run build`, `npx tsc --noEmit`, `npm run test`, testes manuais Playwright e verificações Supabase a cada iteração.  
   - Adicionar testes unitários/integrados por domínio e coverage mínima acordada, registrando resultados nos relatórios exigidos em AGENTS.md.

---

## Riscos, Impactos e Mitigação (Passo 5)

| Risco | Impacto no projeto | Mitigação proposta |
|-------|-------------------|--------------------|
| Rotas monolíticas (>300 linhas) durante a migração | Aumento de regressões e dificuldade de aplicar SOLID/CRUD | Aplicar Strangler Fig: mover blocos para `domains/<feature>` em fatias pequenas, garantindo testes unitários por fatia antes de desligar o código antigo. |
| Ausência de `supabase/` e edge functions dedicadas | Impossibilidade de cumprir regras inegociáveis (cada função por domínio, migrations versionadas) | Criar estrutura vazia imediatamente (migrations + functions) e ligar orpc com mocks temporários; rodar testes Supabase a cada alteração. |
| Providers globais definidos como hooks (ex.: `useApiAccess`) | Dificulta reuso e SSR, risco de importações circulares | Reescrever como contextos em `src/app/providers`, expondo apenas interfaces puras como manda o DIP. |
| Tokens Tailwind não normalizados via `@theme/@utility` | Inconsistência visual, risco de hardcode proibido | Consolidar tokens no início (Passo P1) e criar lint rule que impede uso de cores fora das custom properties. |
| Falta de testes automatizados | Zero detecção de regressões | Após isolar cada domínio, criar suites Vitest/Testing Library e incluir validação manual Playwright obrigatória antes de merge, conforme AGENTS.md. |
| Dependências cruzadas entre domínios | “Blast radius” aumenta e viola arquitetura-alvo | Definir boundaries e aplicar import-lint (ex.: eslint-plugin-boundaries) para garantir que cada domínio só consuma `shared/` ou APIs expostas. |

---

## Relatório Parcial de Execução (Passo 6)

- **Concluído**  
  - Passos 1‑3 executados: requisitos consolidados com Context7 (TanStack Router + Tailwind v4), inventário detalhado de `src/`/rotas/ausência de `supabase/`, e gap analysis por camada (Infra, App Shell, Domínios, Edge, Qualidade).  
  - Prioridades (Passo 4) definidas com sequência clara P1→P6 alinhada a práticas enterprise (strangler fig, app shell isolado, pipeline de qualidade).  
  - Riscos críticos mapeados e mitigados (Passo 5) mantendo foco nos princípios SOLID/CRUD, tokens e blast radius por domínio.

- **Pendente para próximas etapas**  
  - Execução das ações priorizadas (criação de `src/app`, `src/domains/chat`, inicialização de `supabase/`, etc.).  
  - Implementação dos testes e pipelines descritos no passo 6 do plano original (execução real de lint/build/tsc/tests/Playwright/Supabase).  
  - Relatórios futuros devem anexar evidências de cada migração (commits, testes, validações manuais) conforme AGENTS.md.

Este documento permanece como referência viva: antes de cada refactor estrutural, revisar as prioridades e riscos aqui descritos para garantir aderência total ao `ARQUITETURA-ALVO.md` e às regras inegociáveis.
