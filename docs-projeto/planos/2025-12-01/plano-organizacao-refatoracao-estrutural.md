# Plano — Organização e Refatoração Estrutural (Zane Chat AI)

## Contexto e constatações validadas
- Rotas acima de 300 linhas e com UI + estado acoplados: `src/routes/index.tsx` (306), `doc.tsx` (367), `photo.tsx` (384), `canvas.tsx` (340) — viola SRP/OCP e regra local de <300 linhas.
- Seletores e inputs superdimensionados: `components/selectors/ModelSelector.tsx` (354), `ReasoningSelector.tsx` (305), `photo/PhotoInputArea.tsx` (307) — centralizam lógica+layout.
- `CanvasWorkspace` mantém estado interno derivado só do `initialArtifact`, sem reagir a `activeArtifact`; preview marca `react/tsx/jsx` como previewáveis sem pipeline de build e há `console.log` em `routes/canvas.tsx`.
- Providers com UI acoplada: `hooks/useTokenUsage.tsx` renderiza modal dentro do provider (store + view no mesmo nível).
- Tokens quebrados: hex fora dos tokens (`text-[#eecfa1]`, `bg-[#77f0c5]/20`, `bg-[#1e1e1e]`, `text-[#15803d]`) em componentes como `chat/EmptyState.tsx` e `canvas/CanvasCommandBar.tsx`.
- Strings/PT fixas em inputs (`CanvasInputArea`, `PhotoInputArea`, `DocInputArea`) ignoram i18n.

## Graph of Thoughts (nós e dependências)
- N1 Router/Shell → controla carregamento das páginas e providers globais.
- N2 Layout/UI-base (`components/layout`, `components/ui`) → compartilham tokens e padrões de animação.
- N3 Estado/Providers (`contexts/*`, `hooks/*`) → abastecem rotas com stores (TokenUsage, ApiAccess, Language, Theme).
- N4 Workspaces (rotas doc/photo/canvas/index + componentes específicos) → consomem N2 e N3, exibem UI principal.
- N5 Seletores/Inputs (ModelSelector, ReasoningSelector, *InputArea) → plugam-se em N4 para capturar parâmetros de uso.
- N6 Design Tokens (`styles.css`, `tailwind.config.ts`) → normalizam cores/tipografia para todos os nós.
- Dependência crítica: ajustar N3 e N5 antes de dividir N4, para evitar repetições e garantir SOLID ao redistribuir responsabilidades.

## Fluxograma de funcionamento alvo
Usuário → Router/Providers (N1+N3) → Layout Base (N2) → Workspace selecionado (N4) → Seletores/Inputs (N5) → Serviços/Mocks (atual) → Renderização com tokens (N6) → Modais/Feedback (TokenUsage/API gates).

## Passos sequenciais (numerados) para execução
1. Revalidar escopo com AGENTS.md e tokens de `styles.css`/`tailwind.config.ts`; fotografar estado base (lint/build/tsc) sem alterações.
2. Definir contractos SOLID/CRUD para workspaces: inputs separados de containers, handlers side-effect free, sem `any`, mantendo tokens e animações existentes.
3. Refatorar rotas `index.tsx`, `doc.tsx`, `photo.tsx`, `canvas.tsx` em container hooks + componentes presentacionais para ficar <300 linhas e preservar comportamento/animações.
4. Quebrar seletores/inputs extensos (`ModelSelector`, `ReasoningSelector`, `PhotoInputArea`) em subcomponentes/hook de estado (ex.: `useModelSelector`) mantendo o layout atual.
5. Corrigir `CanvasWorkspace`: sincronizar `activeArtifact` via `useEffect` controlado, limitar preview a HTML seguro, remover `console.log` e manter responsividade (painel lateral desktop, overlay mobile).
6. Separar responsabilidades dos providers (`useTokenUsage`, `ApiAccessProvider`): provider apenas com store/context; mover modais/overlays para camada de layout/root.
7. Substituir hex codes por design tokens e alinhar classes utilitárias existentes às variáveis (`text-accent-textHighlight`, `bg-bg-surface`, etc.), sem alterar estética.
8. Internacionalizar placeholders/strings dos inputs usando `LanguageProvider`/hooks de tradução para manter consistência bilingue.
9. Remover ou arquivar componentes mortos (`PhotoToolbar`, `PhotoCommandBar`, `DocCommandBar`, `CanvasCommandBar` se não usados) garantindo nenhuma referência quebrada.
10. Registrar TODOs como issues ou notas curtas externas; limpar comentários prolixos mantendo apenas os necessários para trechos complexos.
11. Revalidar fluxos CRUD simulados: estruturar adapters/ports para futura integração (Supabase/ORPC) sem mocks inline e sem alterar UI atual.
12. Rodar `npm run lint`, `npm run build`, `npx tsc --noEmit` e testes manuais Playwright MCP (mobile/tablet/desktop), garantindo zero warnings/erros e sem regressão visual.
