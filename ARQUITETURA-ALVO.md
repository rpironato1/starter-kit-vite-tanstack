# Arquitetura Alvo — Zane Chat AI

> Atualizado em **02/12/2025**. Documento-guia para agentes e desenvolvedores estruturarem o projeto alinhado ao AGENTS.md, Context7 (React/TanStack) e objetivos de modularização em baixo nível. Os protótipos em `prototipos-zane/*` são **somente base conceitual**: não serão modificados e servem apenas para referência ao reimplementar cada domínio seguindo esta arquitetura.

---

## 1. Princípios Norteadores (Context7 + AGENTS)
- **SOLID em todas as camadas**: cada módulo possui responsabilidade única, aberto para extensão e fechado para modificação cruzada.
- **Microserviços e micro-módulos**: cada domínio (Chat, Photo, Doc, Canvas, Settings) contém seus próprios componentes, hooks, serviços e contratos oRPC/Edge Functions.
- **State mínimo e local** (React.dev “Choosing the State Structure”): evitar duplicação, profundidade excessiva e dependências cíclicas.
- **Árvore de dependências previsível** (React.dev “Understanding your UI as a tree”): imports fluem de cima para baixo; domínios não importam outros domínios diretamente.
- **Design tokens e responsividade obrigatórios**: UI só usa tokens definidos em `src/styles.css` e `tailwind.config.ts`, com layouts mobile/tablet/desktop.
- **Fluxo CRUD completo**: mesmo em modo visual, os módulos expõem interfaces Create/Read/Update/Delete prontas para integração com Supabase/Edge Functions.
- **Blast radius controlado (“bomba na caixa”)**: qualquer falha deve ficar confinada ao domínio responsável. Por isso cada funcionalidade possui infraestrutura própria (edge function, worker, testes e logs) sem compartilhamento implícito.

---

## 2. Vista em Camadas
```
┌───────────────────────────────────────────────────────────────────────┐
│ Camada 0 – Infraestrutura compartilhada                               │
│  • styles.css / tailwind.config.ts (tokens)                            │
│  • contexts globais (Theme, I18n, ApiAccess, TokenUsage)               │
│  • lib/, utils/, integrations/ (TanStack Query, logger, etc.)          │
├───────────────────────────────────────────────────────────────────────┤
│ Camada 1 – App Shell                                                   │
│  • src/app/(router|providers|layout)                                   │
│  • TanStack Router, entrypoints, error boundaries                      │
├───────────────────────────────────────────────────────────────────────┤
│ Camada 2 – Domínios (micro módulos)                                    │
│  • domains/chat, domains/photo, domains/doc, domains/canvas, settings  │
│  • cada domínio contém components/, hooks/, services/, orpc/, tests/   │
├───────────────────────────────────────────────────────────────────────┤
│ Camada 3 – Edge Functions / Supabase (por domínio)                     │
│  • supabase/functions/<domínio> – não compartilhadas (cada caixa)      │
│  • supabase/migrations – schema por domínio                            │
│  • Cloudflare Workers / TanStack Start SSR – execução low-latency      │
└───────────────────────────────────────────────────────────────────────┘
```

Fluxo de dados: **Usuário → App Shell → Domínio X → (Hooks + Serviços locais) → oRPC/Edge Function do domínio → Resposta renderizada com tokens**.

---

## 3. Estrutura de Diretórios Recomendada
```
src/
  app/
    router.tsx
    providers/
    layouts/
  shared/
    components/   (UI primitives reutilizáveis)
    hooks/        (ex.: useMediaQuery)
    services/     (ex.: promptEnhancer genérico)
    types/
  domains/
    chat/
      components/
      hooks/
      services/
      orpc/
      tests/
    photo/
      ... mesmas subpastas ...
    doc/
    canvas/
    settings/
  contexts/       (providers globais)
  integrations/
    tanstack-query/
    orpc/
  lib/
  utils/
```
- Cada domínio exporta apenas seus pontos públicos (`domains/chat/index.ts`). Aplicar **Dependency Inversion**: App Shell consome interfaces do domínio sem acessar arquivos internos.
- **Proibição de importação cruzada entre domínios**. Comunicação indireta via contexts globais ou shared services.
- Arquivos `.tsx` limitados a 300 linhas; lógica complexa vai para hooks/serviços.
- Protótipos conceituais podem ser consultados como blueprint, porém nunca importados diretamente; toda implementação final precisa viver dentro das pastas descritas acima para manter isolamento.

---

## 4. Microserviços e oRPC/Edge Functions
- **orpc/** contém roteadores independentes (`domains/<feature>/orpc/router.ts`) com contratos Zod. Cada função implementa CRUD mínimo para o domínio.
- **Supabase/Edge Functions**: um diretório por domínio (`supabase/functions/chat-*`). Nunca reutilizar edge functions entre features; compartilhar apenas utilitários em `supabase/functions/<domínio>/utils`.
- **Cloudflare Workers / TanStack Start SSR**: quando o domínio exigir baixa latência ou proximidade do usuário (streaming, prefetch, manipulação de mídia), criamos um worker dedicado (`workers/chat-infer`, `workers/photo-render`). Cada worker consome apenas os contratos do domínio e nunca manipula dados de outro domínio diretamente.
- Pipeline: `domains/*/services/client.ts` → `orpc` → `Edge Function` → `Supabase/Worker` → `migrations`. Testes do domínio validam adapters e mocks antes de tocar o backend real.

---

## 5. Modularização em Baixo Nível
- **Sem import “estrela”**: se um helper é usado em muitos lugares, mover para `shared/` explicitamente. Cada domínio opera com dependências locais para evitar erros em cascata.
- **Controle granular**: botões/menus recebem componentes específicos (`domains/chat/components/SidebarButton.tsx`). Alterações se restringem ao módulo.
- **Responsividade local**: cada domínio possui `layout.config.ts` descrevendo breakpoints e tokens usados; testes Playwright manuais validam o módulo isoladamente.
- **Falhas contidas**: cada domínio possui logs, circuit breakers e retries próprios; se `domains/photo` cair, a degradação ocorre apenas ali e os demais domínios continuam operando.

---

## 6. Diagramas de Fluxo
### 6.1 Fluxo Geral
```
[Evento Usuário]
   ↓
[TanStack Router (App Shell)]
   ↓
[Domínio N Container]
   ↓
[Hook local] ──> [Serviço local] ──> [oRPC/Edge Function opcional]
   ↓                                   ↑
[Componentes Presentacionais] ← [Contextos/Tokens Compartilhados]
```

### 6.2 Dependência por Domínio (ex.: Chat)
```
domains/chat/
   components ─> hooks ─> services ─> orpc ─> edge function
        ↑             ↓             ↘
    tests (Vitest)    ↘ shared utils ↗
```
Os testes cobrem cada seta, garantindo que regressões fiquem confinadas ao domínio.

---

## 7. Testes e Validação
- **Unitários**: componentes/hook/service dentro do domínio (Vitest + Testing Library).
- **Integração**: containers de rota montados com TanStack Router e providers reais.
- **Contratos**: testes de orpc + schemas para cada operação CRUD.
- **Playwright MCP manual**: checklist responsivo após alterações por domínio.
- **Pipeline obrigatório**: `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test` → testes manuais Playwright + validações Supabase quando aplicável.
- **Protótipos conceituais**: utilizar apenas como referência durante a modelagem dos testes. Suites oficiais devem apontar para Supabase/Workers reais, nunca para `JsonPostgres` ou mocks permanentes.

---

## 8. Operacionalização
1. **Criar domínio novo** → `domains/<feature>` com subpastas padrão e tokens definidos.
2. **Adicionar funcionalidade** → atualizar somente o domínio correspondente; se precisar de recurso comum, extrair para `shared/` antes.
3. **Edge Functions/Workers** → criar pasta única por funcionalidade, migrations correspondentes, testes Supabase e, quando necessário, um worker/TanStack Start SSR exclusivo para baixa latência.
4. **Migrações entre plataformas** → quando precisar mover uma funcionalidade de Supabase para Cloudflare (ou o inverso), duplicar a caixa no destino, validar naquele domínio e só então apontar o tráfego, mantendo rollback simples.
5. **Revisão** → checar se imports respeitam limites, arquivos <300 linhas, ausência de `any` e tokens corretos.

---

## 9. Benefícios vs Objetivos
| Objetivo | Como a arquitetura atende |
|----------|--------------------------|
| 1. Modularização baixo nível | Domínios isolados + subpastas específicas evitam refactors globais. |
| 2. Controle granular | Botões/comportamentos vivem em componentes dedicados dentro do domínio. |
| 3. Manutenção fácil | SOLID + testes por camada expõem regressões no próprio módulo. |
| 4. Escalabilidade | Microserviços independentes permitem evoluir um ponto sem afetar outros. |
| 5. Organização | Estrutura `app/shared/domains` mantém limites claros, reforçando onboarding e automação de agentes. |
| 6. Migração controlada | Caixas independentes (Supabase/Workers) permitem mover workloads sem tocar o restante do produto. |

---

## 10. Estratégia Supabase × Cloudflare/TanStack Start
- **Supabase (SQL + Edge Functions)**: utilizar para dados críticos (perfis, memórias, documentos, auditoria de tokens). Cada função vive em `supabase/functions/<domínio>` com migrations específicas, RLS e logs.
- **TanStack Start SSR**: loaders/actions decidem, por request, se o fluxo segue para Supabase Edge Function ou para um worker. Também habilitam streaming server-side e controle de cache.
- **Cloudflare Workers**: empacotam agentes (Gemini, Anthropic futuro), pipelines de imagem ou outras rotinas que exigem latência mínima. Cada worker pertence a um único domínio para manter blast radius contido.
- **Caixa preta por domínio**: Edge Function + Worker + testes + observabilidade formam uma caixa isolada. Falhas explodem dentro da caixa e nunca propagam para outros domínios.
- **Escala futura**: quando surgir necessidade de mover lógica de uma plataforma para outra, construir a nova caixa paralelamente, testar e redirecionar apenas o domínio impactado.

---

> Este documento deve ser consultado antes de criar novas features, reorganizar arquivos ou introduzir integrações. Qualquer mudança estrutural precisa manter o grafo, os fluxos descritos aqui e o princípio de confinamento de falhas (“bomba na caixa”).
*** End Patch***
