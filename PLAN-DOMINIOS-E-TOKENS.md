# Plano: Domínios & Tokens (Fase 2)

## Contexto
- Objetivo desta fase:  
  1. Migrar os módulos de Photo, Doc, Canvas e Settings para a camada `src/domains/<feature>` seguindo a arquitetura alvo.  
  2. Converter os design tokens atuais de `src/styles.css` para o padrão Tailwind CSS v4 (`@theme` + overrides), preservando o comportamento visual.
- Referências obrigatórias: `ARQUITETURA-ALVO.md`, `PLANO-ANALISE-ARQUITETURA-GAP.md`, AGENTS.md, Context7 `/tanstack/router` e `/websites/tailwindcss`.

## Graph of Thoughts
```
{N1 Estado atual}
  -> {N2 Domínios Photo/Doc/Canvas/Settings ainda em src/components}
       -> {N3 Risco: acoplamento entre rotas e UI + blast radius}
  -> {N4 Tokens definidos em :root (CSS vars) sem @theme}
       -> {N5 Tailwind classes bg-bg-main etc dependem de custom props}

{N6 Estado alvo}
  -> {N7 Estrutura domains/<feature> com components/hooks/services/orpc/tests}
       -> {N8 Imports centralizados em domains/<feature>/components}
  -> {N9 Tokens descritos via @theme/@variant dark}
       -> {N10 Compatibilidade com Tailwind v4 e manutenção responsiva}

Impacto: mover componentes exige atualizar rotas e consumidores; atualizar tokens requer mapear uso e validar temas claro/escuro.
```

## Fluxograma de Trabalho
```
[Mapear componentes por domínio]
   ↓
[Mover arquivos -> domains/<feature>/components + exports]
   ↓
[Atualizar imports (rotas, outros componentes)]
   ↓
[Validar build/lint/tsc]
   ↓
[Inventariar tokens usados + classes dependentes]
   ↓
[Converter tokens para @theme (@theme dark) mantendo variáveis necessárias]
   ↓
[Revalidar build/lint/tsc + testes manuais (Playwright)]
```

## Passos Planejados
1. **Inventário e migração de componentes por domínio**  
   - Levantar arquivos de `src/components/{photo,doc,canvas,settings}` e mover para `src/domains/<feature>/components`.  
   - Criar `index.ts` por domínio exportando componentes e tipos.  
   - Ajustar rotas (`src/routes/photo.tsx`, `doc.tsx`, `canvas.tsx`, `index.tsx`, etc.) e quaisquer consumidores para apontar para os novos caminhos.  
   - Garantir que nenhum domínio importe diretamente arquivos de outro domínio (usar `shared/` se necessário).  
   - Atualizar READMEs/domínio se surgirem novas estruturas.

2. **Conversão dos design tokens para Tailwind v4 (`@theme`)**  
   - Mapear todos os tokens atuais (`--bg-main`, `--text-primary`, etc.) e identificar onde são usados nas classes (`bg-bg-main`, `text-text-primary`, CSS custom).  
   - Definir bloco `@theme { ... }` com as cores, fontes, raios, etc., mantendo nomenclatura `--color-*`, `--font-*`, `--radius-*`.  
   - Definir `@theme dark { ... }` (ou ajustes com `.dark`) para os tokens de modo escuro.  
   - Preservar CSS vars necessárias para componentes que usam `var(--bg-main)` diretamente (opcionalmente mantendo `:root` como fallback).  
   - Rodar `npm run lint`, `npm run build`, `npx tsc --noEmit` e testes manuais Playwright para garantir zero regressões visuais/funcionais.

## Checklist das Regras Inegociáveis
- [x] Graph of Thoughts e Fluxograma presentes (acima).  
- [x] Context7 consultado para TanStack Router e Tailwind v4 (planos referenciam seções corretas).  
- [x] SOLID + CRUD garantidos via isolamento por domínio (Passo 1).  
- [x] Tokens/Responsividade tratados no Passo 2.  
- [x] Sem `any` novos / arquivos < 300 linhas monitorados durante migração.  
- [x] Estrutura Supabase/Edge Functions preservada (sem alterações nesta fase).  
- [x] Testes obrigatórios (lint/build/tsc/Playwright) previstos ao final de cada passo.  
- [x] Plano numerado pronto antes da execução (esta seção).
