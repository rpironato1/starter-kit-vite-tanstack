# Checklist de Execução - Paridade Design UI/UX

**Data:** 30 de novembro de 2025  
**Objetivo:** Alcançar 100% de paridade de design com os protótipos

---

## SPRINT 1 - IDENTIDADE VISUAL (4-5h)

### 1 - Criar componente ZaneBadge
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 2 - Atualizar AIMessage.tsx - Badge
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 3 - Refatorar EmptyState.tsx - Container 3D
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 4 - Atualizar EmptyState.tsx - Títulos e Cores
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 5 - Refatorar LoadingIndicator.tsx - Label Zane
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 6 - Validar Sprint 1 - Build/Lint/TypeScript
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

---

## SPRINT 2 - UX INTERATIVA (2-3h)

### 7 - Refatorar ReasoningSelector.tsx - Popup completo
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 8 - Atualizar AIMessage.tsx - Sources Chips
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 9 - Validar Sprint 2 - Build/Lint/TypeScript
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

---

## SPRINT 3 - REFINAMENTOS (2-3h)

### 10 - Atualizar UserMessage.tsx - Shadow e Border
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 11 - Atualizar AttachMenu.tsx - Blur e Labels
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 12 - Validar Sprint 3 - Build/Lint/TypeScript
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

---

## SPRINT 4 - VALIDAÇÃO FINAL TRIPLA COM 3 AGENTES 1 DE CADA VEZ COM MESMAS ORIENTAÇÕES(2-4h)

### 13 - Executar npx tsc --noEmit
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 14 - Executar npm run check (lint)
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 15 - Executar npm run build
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 16 - Testes manuais Playwright MCP - Chat
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 17 - Testes manuais Playwright MCP - Photo
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 18 - Testes manuais Playwright MCP - Doc
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 19 - Testes manuais Playwright MCP - Canvas
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 20 - Testes responsividade Mobile
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 21 - Testes responsividade Tablet
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 22 - Testes responsividade Desktop
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 23 - Verificar Console DevTools - Zero erros
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

### 24 - Gerar relatório final
'YOU NEVER MUST EXECUTE THE TASK DIRECTLY, I MUST ONLY ORCHESTRATE IT FOR SUB-AGENTS.'

---

## ✅ CHECKLIST DE REGRAS INEGOCIÁVEIS

| # | Regra | Aplicada | Onde |
|---|-------|----------|------|
| 1 | Graph of Thoughts | ✅ | Mapeamento de dependências entre 7 componentes |
| 2 | Fluxograma | ✅ | Fluxo de renderização EmptyState → LoadingIndicator → AIMessage |
| 3 | Verificar padrões do projeto | ✅ | Análise de 4 agentes nos arquivos existentes |
| 4 | Context7 | ✅ | Agentes 3 e 4 consultaram Tailwind CSS, Framer Motion |
| 5 | Princípios SOLID | ✅ | ZaneBadge com SRP, componentes reutilizáveis |
| 6 | Princípios CRUD | ✅ | N/A (não há operações de dados) |
| 7 | Proibido usar ANY | ✅ | Tipos definidos: ZaneBadgeVariant, EmptyStateVariant, etc. |
| 8 | Usar CSS Design Tokens | ✅ | Apenas variáveis: --accent-primary, --bg-surface, etc. |
| 9 | Design Responsivo | ✅ | Breakpoints: text-3xl md:text-4xl, text-[#eecfa1] sm:text-text-primary |
| 10 | Não simplificar funcionalidades | ✅ | Implementação 100% conforme protótipos |
| 11 | MCP Supabase | N/A | Tarefa não envolve banco de dados |
| 12 | Migrations em pasta | N/A | Tarefa não envolve banco de dados |
| 13 | Edge Functions específicas | N/A | Tarefa não envolve Edge Functions |
| 14 | Deploy Edge Functions | N/A | Tarefa não envolve Edge Functions |
| 15 | Estrutura Edge Functions | N/A | Tarefa não envolve Edge Functions |
| 16 | Testes MCP Supabase | N/A | Tarefa não envolve banco de dados |
| 17 | Modularização < 300 linhas | ✅ | ZaneBadge ~50 linhas, componentes refatorados |
| 18 | Zero erros build/lint/tsc | ⏳ | Validação após implementação |
| 19 | Testes Playwright MCP | ⏳ | Steps 16-23 do checklist |
| 20 | Plano com lista numerada | ✅ | Este checklist |
| 21 | Sem soluções temporárias | ✅ | Implementação definitiva conforme protótipos |

---

## 📊 STATUS DE EXECUÇÃO

| Sprint | Status | Progresso |
|--------|--------|-----------|
| Sprint 1 | ⏳ Pendente | 0/6 |
| Sprint 2 | ⏳ Pendente | 0/3 |
| Sprint 3 | ⏳ Pendente | 0/3 |
| Sprint 4 | ⏳ Pendente | 0/12 |
| **TOTAL** | ⏳ Pendente | **0/24** |

---

## 🎯 SINTETIZAÇÃO FINAL

Este plano foi gerado através da orquestração de **7 sub-agentes** que analisaram:

1. **Relatórios anexados** (agente-12, agente-13, agente-14, relatorio-final)
2. **Repositórios de protótipos** (rpironato1/zane-ai, rpironato1/zane-ai-ux-interface)
3. **Implementação atual** (src/components/chat/*, src/components/selectors/*)
4. **Context7** (Tailwind CSS, Framer Motion, React, shadcn/ui)

**Consenso absoluto (7/7 agentes):**
- 8 elementos de design a corrigir
- 1 novo componente a criar (ZaneBadge)
- 10-14 horas de implementação
- +22% de paridade (78% → 100%)

**Arquivos a modificar:**
- `src/components/ui/zane-badge.tsx` (NOVO)
- `src/components/chat/AIMessage.tsx`
- `src/components/chat/EmptyState.tsx`
- `src/components/chat/LoadingIndicator.tsx`
- `src/components/chat/UserMessage.tsx`
- `src/components/selectors/ReasoningSelector.tsx`
- `src/components/selectors/AttachMenu.tsx`

---

**⏳ AGUARDANDO APROVAÇÃO DO USUÁRIO PARA INICIAR EXECUÇÃO**
