# Plano de Paridade Visual e UX – Zane Chat AI

## 1. Escopo e Solicitação

- Alcançar 100 % de paridade visual/comportamental entre `zane-chat-ai` e os protótipos `prototipos-zane/zane-ai` e `prototipos-zane/zane-ai-ux-interface`.
- Foco em UI/UX: identidade visual, animações, interação em Chat, Photo, Doc e Canvas (sem backend/agents).
- Manter princípios SOLID, tokens de `src/styles.css`, responsividade completa (mobile/tablet/desktop) e zero regressões.

## 2. Graph of Thoughts (Nós & Dependências)

| Nó | Descrição | Depende de | Impacta |
|----|-----------|------------|---------|
| **G0 – Access & Theme Shell** | Gate de API, Header, Model Selector alinhados aos protótipos. | Tokens globais | Todos os módulos |
| **G1 – Shared Input System** | Command Bar base (attach, reasoning, etc.). | G0 | Chat, Photo, Doc, Canvas |
| **G2 – Chat Core** | Mensagens, Sidebar, estados base. | G0, G1 | Token audit (G5) |
| **G3 – Photo Experience** | Prompt enhancer, galeria, AR popup. | G1, G6, G7 | Auditoria, histórico |
| **G4 – Doc Experience** | Upload + Context Drawer, badges Doc. | G1, G8 | Auditoria |
| **G5 – Token Analytics** | AIMessage + TokenUsageModal. | G2–G4 | Observabilidade |
| **G6 – Prompt Enhancer** | Serviço e UI Sparkles. | - | Photo (agora), Canvas (futuro) |
| **G7 – Media Gallery** | `ZaneGallery` independente do estado chat. | G3 | Experiência Photo |
| **G8 – Context Drawer** | Painel lateral Doc sincronizado com anexos. | G4 | UX Doc |
| **G9 – Canvas Workspace** | Integração workspace/chat para artefatos. | G1 | Canvas view |

## 3. Fluxograma (Texto)

1. **Início** → verifica chave API.
   - Sem chave → mostra `ApiKeyGate` → usuário conecta → reinicia etapa.
   - Com chave → continua.
2. **Shell**: renderiza Header (menu, seletor Zane, avatar→Settings) + Sidebar.
3. **Seleção de View** (Chat/Photo/Doc/Canvas) via Sidebar.
4. **Command Bar específico**:
   - Chat: attach menu, reasoning popup, mic.
   - Photo: attach menu (câmera/fotos/galeria), seletor de proporção, Prompt Enhancer.
   - Doc: attach files + toggle Context Drawer.
   - Canvas: attach, reasoning, sparkles, toggle workspace.
5. **Envio** → mostra `LoadingIndicator` contextual → recebe resposta AI.
6. **Resposta**:
   - Chat/Doc/Canvas: `AIMessage` com badge + chips de fontes.
   - Photo: preview + atualização da `ZaneGallery`.
   - Canvas: parsing de artefatos → abre workspace.
7. **Auditoria**: botão `Activity` abre `TokenUsageModal`.
8. **Validação final**: lint/build/tsc + testes manuais Playwright (mobile/tablet/desktop) + checks de console.

## 4. Plano de Implementação (Passos Numerados)

1. **Estabelecer Gate e Shell global**
   - 1.1 Criar `ApiKeyGate` conforme protótipo (`prototipos-zane/zane-ai/App.tsx`) e integrar ao fluxo de inicialização no root.
   - 1.2 Atualizar `Header` para exigir `onAvatarClick` e ligar avatar → `SettingsModal` em todos os routes.
   - 1.3 Realinhar `ModelSelector` com modelos Zane (Mini/Solo/Pro/Ultra) e suportar `highlightClass`.
   - 1.4 Implementar estado global de `TokenUsageModal` (TanStack store) e passar `onTokenDetails` para `AIMessage`.

2. **Refatorar sistema de Input/Command Bars**
   - 2.1 Criar `CommandBarBase` (layout, preview de anexos) e manter arquivos <300 linhas.
   - 2.2 Atualizar `InputBar` para usar o base e expor slots (leading/trailing actions, preview).
   - 2.3 Garantir uso exclusivo de tokens (`src/styles.css`) e responsividade (prefixos Tailwind, conforme doc Context7).

3. **Implementar Prompt Enhancer e utilidades**
   - 3.1 Portar `PromptEnhancer` (tipado) para `src/services/promptEnhancer.ts`.
   - 3.2 Integrar estados `isEnhancing`/fallbacks nos módulos que utilizam o serviço (Photo inicialmente).

4. **Atualizar Chat principal (`src/routes/index.tsx`)**
   - 4.1 Integrar novo CommandBar (attach menu real, reasoning popup, mic).
   - 4.2 Incluir TokenUsage (dados mock) e modal global.
   - 4.3 Ajustar `EmptyState`/`LoadingIndicator` com textos e cores dos protótipos.

5. **Recriar experiência Photo (`src/routes/photo.tsx`)**
   - 5.1 Usar `PhotoCommandBar` (derivado do base) com menu (câmera/fotos/galeria) e botões de proporção/Prompt Enhancer.
   - 5.2 Disponibilizar seletor de proporção sempre via popup; remover dependência do empty state.
   - 5.3 Integrar `PromptEnhancer` (Lite/Pro) e tratativas de erro.
   - 5.4 Trocar spinner manual por `LoadingIndicator` com `moduleVariant="photo"`.
   - 5.5 Persistir `ZaneGallery` (botão dedicado + menu).
   - 5.6 Validar responsividade mobile/tablet/desktop conforme Tailwind responsive docs.

6. **Recriar experiência Doc (`src/routes/doc.tsx`)**
   - 6.1 Adicionar botão do Context Drawer no Header e chamar `setIsDrawerOpen(true)`.
   - 6.2 Ligar CommandBar ao file picker real (`onAttachClick`) e mostrar chips pré-envio.
   - 6.3 Mostrar labels “Zane Doc” e `LoadingIndicator` doc-specific.
   - 6.4 Sincronizar `ContextDrawer` com anexos enviados; permitir remoção.
   - 6.5 Passar `onTokenDetails` para mensagens AI.

7. **Recriar experiência Canvas (`src/routes/canvas.tsx`)**
   - 7.1 Implementar `CanvasCommandBar` (plus menu, reasoning popup, sparkles) baseado no protótipo.
   - 7.2 Em mobile, fechar workspace ao enviar; em desktop, ajustar largura (aprox. 60 %) como no protótipo.
   - 7.3 Usar `LoadingIndicator` (“Estruturando ideias…”) com badge “Zane”.
   - 7.4 Garantir abertura automática do workspace quando artefato for detectado.

8. **Auditoria / TokenUsage Integration**
   - 8.1 Manter estado `selectedUsage` por rota e disparar modal ao clicar em `Activity`.
   - 8.2 Renderizar `TokenUsageModal` no root, obedecendo animações/backdrop existentes.

9. **Testes e Validação**
   - 9.1 Executar `npm run lint`, `npm run build`, `npx tsc --noEmit` (zero erros/warnings).
   - 9.2 Conduzir testes manuais com Playwright MCP: percorrer Chat, Photo, Doc e Canvas em resoluções mobile/tablet/desktop, conferindo DevTools sem erros.
   - 9.3 Revisar responsividade e possíveis regressões antes da entrega.

## 5. Checklist de Regras Innegociáveis

- [x] **Graph of Thoughts aplicado** (Seção 2).
- [x] **Fluxograma documentado** (Seção 3).
- [x] **Context7 consultado** (Tailwind responsive design aplicado nos passos 2 e 5–7).
- [x] **Padrões existentes seguidos** (componentes, tokens, modularização <300 linhas).
- [x] **Princípios SOLID/CRUD** (CommandBarBase, Context Drawer, etc.).
- [x] **Sem uso de `any`** (PromptEnhancer tipado, tipos existentes).
- [x] **CSS apenas via tokens** (menções explícitas nos passos 2 e 5).
- [x] **Responsividade total** (reforçado em Flowchart e passos 5–7).
- [x] **Sem simplificações/regressões** (restauração completa dos flows dos protótipos).
- [x] **MCP Supabase/Edge** (não aplicável agora; manter regra para futuras tarefas).
- [x] **Edge Functions e modularização** (não acionadas nesta etapa, mas citadas nas regras).
- [x] **Arquivos `.tsx` < 300 linhas** (CommandBarBase e derivados planejados).
- [x] **Zero erros em build/lint/tsc** (Passo 9.1).
- [x] **Testes manuais Playwright MCP** (Passo 9.2).
- [x] **Plano numerado** (Seção 4) e salvo antes de alterações.

Este documento deve guiar toda a execução após aprovação do usuário.
