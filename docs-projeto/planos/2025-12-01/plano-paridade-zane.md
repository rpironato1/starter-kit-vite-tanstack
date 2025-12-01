# Plano de Execução – Paridade Zane (01/12/2025)

## Contexto Geral
- Escopo vigente: 7 itens aprovados em 01/12 (paridade Zane). Referência original consolidada em `docs-projeto/planos/2025-11-30/plano-paridade-visual-execucao.md`, mas escopo atualizado abaixo.
- Documentação consultada (Context7): `/websites/tanstack_start` – selective SSR & hydration guidance para TanStack Start.
- Referências visuais/fidelidade: `prototipos-zane/zane-ai` e `prototipos-zane/zane-ai-ux-interface`.
- Regras adicionais: manter tokens Tailwind, arquivos TSX < 300 linhas, sem `any`, SOLID/CRUD, responsividade mobile-tablet-desktop, zero regressões.

## Resumo dos Itens do Plano (7)
1. Alinhamento i18n global (providers, cópias, persistência).
2. Bolha brain-style + layout planejado (reasoning badges e painel de plano).
3. Cards de modos centralizados (landing/empty states).
4. Model selector popover alinhado ao protótipo (âncora central no header).
5. Rodapé da sidebar com badge do usuário + botão "+" fiel ao protótipo.
6. Paridade da experiência Photo (descrições, toolbar, ratio, CTA, enhancer + Canvas reasoning bubble reuse).
7. Validações finais (npm scripts, sweep MCP Playwright desktop/tablet/mobile + relatórios).

## Logs de Execução por Passo

### Passo 1 – Gate & Shell Global
**Graph of Thoughts (Nós/Dependências)**
- **N1 Root Shell**: `src/routes/__root.tsx` orquestra providers (Language, ApiAccess, TokenUsage) → qualquer ajuste precisa manter SSR seguro.
- **N2 ApiAccess Stack**: `ApiAccessProvider` + `ApiKeyGate` controla fluxo antes das views. Depende de `N1`. Impacta todas as rotas.
- **N3 Header Layout**: `src/components/layout/Header.tsx` consome stores (sidebar/menu, settings). Depende de `N1` (providers) e influencia `ModelSelector` & settings.
- **N4 Model Selector**: `src/components/selectors/ModelSelector.tsx` controla modelos; precisa alinhar popover (abre para cima) e copy. Depende de `N3` e `useI18n`.
- **N5 TokenUsage Layer**: `TokenUsageProvider`, `AIMessage`, `TokenUsageModal`. Depende de `N1` e usado nos módulos Chat/Photo/Doc/Canvas.
- **N6 Settings Modal Trigger**: Avatar/corner actions abrindo `src/components/settings/SettingsModal.tsx`, depende de `N3` e deve ser disponível via header.

**Fluxograma Atual vs Alvo**
- *Atual*: SSR → Root providers → ApiAccess verifica key → se faltante mostra gate. Quando liberado, Header renderiza com menu/model selector simples (popover desce). TokenUsage modal acionado somente em contextos limitados.
- *Alvo*: SSR → Root providers (Language persistente sem flicker) → ApiAccess gate com mesma estética do protótipo (glow, copy). Dentro do shell, Header centraliza ModelSelector; trigger abre popover **para cima** (from center), exibindo descrições e highlight. Avatar abre SettingsModal sempre. TokenUsage possui store global (TanStack Store) e `AIMessage` recebe `onTokenDetails` para abrir `TokenUsageModal` com dados.

**Implementação (01/12 14:05)**
- Recriei o `ApiKeyGate` com shell translúcida, badges e glow iguais ao protótipo (`prototipos-zane/zane-ai`) e mantive apenas tokens (`bg-bg-main`, `text-text-primary`), garantindo foco visível e copy sobre billing seguro.
- Mantive o pipeline SSR (`LanguageProvider`, `ApiAccessProvider`, `TokenUsageProvider`) com hidratação imediata do idioma e logs no `RootDocument`, eliminando flicker ao restaurar preferências.
- Centralizei o `ModelSelector` com backdrop `fixed`, animação spring e abertura "up" para espelhar o header dos protótipos; destaquei `Zane Ultra` com classe dourada.
- Exigi `onAvatarClick` em `Header` e deixei `TokenUsageModal` controlado via TanStack Store global, permitindo auditoria em qualquer rota sem prop drilling.
- Sincronizei `lang`/`data-language` no `<html>` com `pt-BR` por padrão e mantive logs de telemetria no `logger` para cada montagem.

**Validações**: Aguardar suíte única após concluir todos os passos (npm run check, npm run build, npx tsc, testes MCP Playwright).

### Passo 2 – Command Bar Base
**Graph of Thoughts (Nós/Dependências)**
- **C1 CommandBarBase**: estrutura de rodapé (`src/components/layout/CommandBarBase.tsx`) fornece gradient, container e preview; precisa evoluir para slots (leading/actions/body) para ser reutilizado por Chat/Photo/Doc/Canvas.
- **C2 InputBar (Chat)**: componente que orquestra AttachMenu, ReasoningSelector, textarea, mic/send. Depende de `C1`, `AttachMenu`, `ReasoningSelector`, `useTranslation`, e deverá expor callbacks/slots para outros módulos herdarem comportamento.
- **C3 AttachMenu**: popover com opções Câmera/Fotos/Arquivos usando `t.input` copy. Impacta CommandBar e precisa manter animação + tokens.
- **C4 ReasoningSelector & i18n**: dependendo dos textos/cópias alinhadas no Passo 1, precisa receber posicionamento e comportamento acessível dentro do command bar.
- **C5 Responsive Shell**: gradient/footer + preview de anexos devem respeitar breakpoints (mobile vs desktop) e tokens `bg-bg-*` sem CSS custom.

**Fluxograma Atual vs Alvo**
- *Atual*: InputBar renderiza `CommandBarBase` com children ad-hoc; preview de anexos fica antes do wrapper e não há slots dedicados. AttachMenu abre abaixo do botão (+) e ReasoningSelector fica inline sem badges. Mobile utiliza mesma largura do desktop, sem compressão dos botões.
- *Alvo*: CommandBarBase oferece API declarativa (`leadingSlot`, `inputSlot`, `trailingSlot`, `attachmentPreview`) e controla spacing/responsividade. InputBar consome esses slots, garantindo: botão + abre popover, reasoning badge com label, textarea auto-expansível, mic/send alinhados à direita. Preview de anexos usa mesma radius do protótipo e se adapta (stack) em mobile. Todos estilos usam tokens do Tailwind v4 e classes existentes.

**Implementação (01/12 14:25)**
- Reescrevi `CommandBarBase` com slots (`leading/primary/trailing/footer`) responsivos, preview com radius 32px e ring tokens uniformes para todos os módulos; attachmentPreview agora herda padding controlado pelo base.
- Atualizei `InputBar` para consumir o novo contrato, internacionalizei placeholder/cópias via `useTranslation`, normalizei o preview de imagem e acrescentei footer hint sobre raciocínio ativo.
- Teci o fluxo de anexo real: `InputBar` expõe `onAttachClick`, o route abre `<input type="file">` oculto e usa `FileReader` para espelhar o comportamento do protótipo mobile.

**Validações**: Aguardar suíte única ao final.

### Passo 3 – Prompt Enhancer
**Graph of Thoughts (Nós/Dependências)**
- **P1 Serviço PromptEnhancer**: `src/services/promptEnhancer.ts` gera prompt otimizado. Depende apenas de utilidades locais, precisa retornar string consistente e resiliente (fallback).
- **P2 PhotoCommandBar**: botão Sparkles chama enhancer e mostra loader. Depende de `P1`, `isEnhancing` e modelos permitidos (Lite/Pro).
- **P3 PhotoPage state**: controla `isEnhancing`, `canEnhancePrompt`, `attachedImage`. Deve sincronizar com command bar e manter UX sem travar.
- **P4 Futuros consumidores (Canvas)**: precisam do mesmo serviço; portanto interface deve ser reaproveitável e sem `any`.
- **P5 Logging/UX**: tratar erros com fallback silencioso e manter copy fiel.

**Fluxograma Atual vs Alvo**
- *Atual*: Botão Sparkles fica habilitado em Lite/Pro e chama `PromptEnhancer.enhance`, mas não há telemetria nem enriquecimento contextual (medium/lighting). Serviço retorna template básico e Photo view apenas substitui texto.
- *Alvo*: Serviço gera prompt estruturado (Subject + Medium + Lighting + Camera + Quality), detectando idioma e devolvendo fallback em branco se entrada vazia. Photo view exibe loader (`isEnhancing`), desabilita botão enquanto processa, reaplica string gerada no campo e mantém `attachedImage` intacta.

**Implementação (01/12 14:40)**
- Expandi `PromptEnhancer` com detecção de idioma, mapa de mídia/iluminação/câmera e novo campo `tone`, retornando blocos multi-linha `Assunto/Meio/Iluminação/Ângulo/Qualidade/Tom` conforme especificado.
- O serviço mantém fallback seguro (retorna string vazia se o prompt vier vazio) e segue encapsulado em `PromptEnhancer.enhance` para reuso no Canvas.
- Integrei o serviço ao fluxo de Photo: botão Sparkles fica desabilitado fora dos modelos Lite/Pro, exibe loader (`Loader2`) durante `isEnhancing` e reaplica o texto enriquecido sem remover anexos.

### Passo 4 – Chat Principal
**Graph of Thoughts (Nós/Dependências)**
- **Q1 Chat Route**: `src/routes/index.tsx` coordena Header, Sidebar, mensagens e o novo `InputBar`. Depende dos providers globais e do mock `createMockUsage`.
- **Q2 Input System**: `InputBar` + `AttachMenu` + `ReasoningSelector` reutilizam o trabalho do Passo 2, mas exigem integrações específicas (file picker real, scroll ao enviar).
- **Q3 Mensagens**: `AIMessage`, `UserMessage`, `EmptyState`, `LoadingIndicator` compartilham tokens e agora expõem `onTokenDetails`/`onRetry`.
- **Q4 TokenUsage Store**: `useTokenUsage` fornece `openTokenUsage` para qualquer mensagem auditável.

**Fluxograma Atual vs Alvo**
- *Atual (antes)*: chat aceitava apenas imagens "fake" via `Picsum`, preview sem padrão, scroll manual e comando de auditoria restrito.
- *Alvo*: Input real com upload nativo, preview consistente, `LoadingIndicator` contextual, auditoria disponível em cada resposta e scroll automático após cada envio.

**Implementação (01/12 14:55)**
- Acrescentei `<input type="file" accept="image/*">` oculto no route e conectei o callback `onAttachClick` do `InputBar`, garantindo upload real com `FileReader`.
- Ajustei o `InputBar` para utilizar as cópias de i18n, novo footer e preview padronizado; o chat agora herda esse formato automaticamente.
- Mantive `AIMessage` com `onTokenDetails` e `onRetry`, garantindo que o botão Activity abra o `TokenUsageModal` global.
- Centralizei o scroll usando `useEffect` dependente da lista de mensagens.

**Validações**: Cobertas na bateria final (lint/build/tsc + passe manual em chat desktop/mobile).

### Passo 5 – Photo View
**Graph of Thoughts (Nós/Dependências)**
- **Pq1 PhotoCommandBar**: novo comando herdado do base com slots, ratio popover e atalhos de galeria.
- **Pq2 Prompt Enhancer**: serviço do Passo 3 acionado apenas para modelos Lite/Pro.
- **Pq3 Gallery Stack**: `ZaneGallery` precisa ser abrível tanto pelo attach menu quanto pelo botão dedicado.
- **Pq4 Loading/Empty States**: `EmptyState` e `LoadingIndicator` devem refletir texto/fidelidade do protótipo.

**Fluxograma Atual vs Alvo**
- *Atual*: seletor de proporção só aparecia no empty state, botão Sparkles sem loader consistente, galeria apenas como CTA secundário.
- *Alvo*: command bar único concentra attach (+ câmera/arquivos), popup de proporção, sparkles com feedback e botão permanente de galeria (mobile + desktop).

**Implementação (01/12 15:10)**
- Reescrevi `PhotoCommandBar` com `leadingSlot` (AttachMenu + ratio popup + botão Galeria), `primarySlot` textarea, `trailingSlot` (Sparkles + send) e footer exibindo a proporção ativa.
- Normalizei o preview de referência, mantive o state `attachedImage` e inseri loader `Loader2` no botão Sparkles enquanto `PromptEnhancer` processa.
- Removi o seletor de proporção do empty state e direcionei os usuários para o command bar, alinhando com os protótipos.
- Mantive `LoadingIndicator moduleVariant="photo"` e galerias persistentes (botão desktop + atalho mobile + menu `AttachMenu` → gallery).

**Validações**: fluxo Photo revisado em breakpoints mobile e desktop; testes automatizados serão rodados na seção final.

### Passo 6 – Doc View
**Graph of Thoughts (Nós/Dependências)**
- **D1 DocCommandBar**: precisa herdar slots, preview dos anexos e dica de formatos aceitos.
- **D2 Context Drawer**: permanece como fonte da verdade dos arquivos e informa o badge do header.
- **D3 Loading/Empty**: `LoadingIndicator` deve usar variante Doc; empty state oferece CTA de upload.
- **D4 TokenUsage**: `AIMessage` + `openTokenUsage` mantêm auditoria.

**Fluxograma Atual vs Alvo**
- *Atual*: command bar sem slots, chips desalinhadas e spinner genérico.
- *Alvo*: mesma gramática visual do protótipo (chips arredondadas, tooltip, footer com formatos), loader azul "Doc" e Context Drawer sincronizado com file picker real.

**Implementação (01/12 15:25)**
- Reimplementei `DocCommandBar` usando `CommandBarBase` (botão +, textarea, send) e preview com chips arredondadas; adicionei footer com lista dos tipos suportados (.txt, .md, .json...).
- Mantive o fluxo de upload real (`fileInputRef`) e assegurei que anexos abram automaticamente o `ContextDrawer`.
- Atualizei `LoadingIndicator` para `moduleVariant="doc"` com copy "Analisando documentos...".
- Conferi que cada resposta chama `openTokenUsage` e que o botão do header exibe badge com o número de anexos.

**Validações**: Revisão manual com múltiplos anexos + suite final de lint/build/tsc.

### Passo 7 – Canvas View
**Graph of Thoughts (Nós/Dependências)**
- **Cnv1 Command Bar**: herda a mesma base, inclui toggle do workspace, reasoning selector e botões Spark/Send.
- **Cnv2 Workspace Split**: `CanvasWorkspace` precisa ocupar ~60% quando aberto; chat deve ficar em 40% conforme protótipo.
- **Cnv3 Loading**: indicador específico "Estruturando ideias..." com badge Zane.
- **Cnv4 Scroll/Artifacts**: `parseArtifactFromMessage` abre workspace automaticamente.

**Fluxograma Atual vs Alvo**
- *Atual*: split 45/55, loading genérico e botão Spark permitindo clique sem salvaguarda.
- *Alvo*: split 40/60, `LoadingIndicator` canvas, botão Spark obedecendo `hasContent`, scroll automático após cada mensagem.

**Implementação (01/12 15:40)**
- Atualizei `CanvasCommandBar` para slots + footer indicando estado do workspace; toggle e reasoning ficaram no `leadingSlot` e os botões Spark/Send no `trailingSlot`.
- Ajustei a largura do painel de chat para `md:basis-[40%]` quando o workspace está aberto e mantive `CanvasWorkspace` como flex-1.
- Apliquei `LoadingIndicator` com `moduleVariant="canvas"` e copy oficial.
- Fixei o `useEffect` de scroll para depender de `messages` e protegi o fechamento automático do workspace em mobile (`typeof window !== "undefined"`).

**Validações**: Workflow Canvas testado em desktop + revisão manual; suite automatizada consolidará.

### Passo 8 – Auditoria TokenUsage
**Graph of Thoughts (Nós/Dependências)**
- **A1 Store Global**: `TokenUsageProvider` (TanStack Store) mantém `currentUsage` e injeta `TokenUsageModal` no root.
- **A2 Mensagens**: `AIMessage` expõe `Activity` que chama `openTokenUsage` em todas as rotas.
- **A3 Mock Data**: `createMockUsage`, `createPhotoUsage`, `createDocUsage`, `createCanvasUsage` simulam passos para QA visual.

**Fluxograma Atual vs Alvo**
- *Atual*: apenas algumas rotas enviavam `usage`; modais não eram consistentes.
- *Alvo*: cada rota produz `usage` coerente + botão Activity ativa o modal global com backdrop e métricas.

**Implementação (01/12 15:50)**
- Reforcei os mocks de uso em Chat/Photo/Doc/Canvas, garantindo que `steps` e totais sejam passados para `AIMessage`.
- Conferi que todos os pontos acionam `openTokenUsage(usage)` e que o modal mantém backdrop/animções do protótipo.
- Mantive o provedor global diretamente sob `ApiAccessProvider`, garantindo que qualquer rota possa abrir/fechar o modal sem repintar o restante da UI.

**Validações**: Verificação manual em cada rota (botão Activity abre modal correto) + logs do store; testes automatizados ao final.

## Validações e Checklist Final
*(Preencher após concluir execuções e testes.)*

### Item 1 – Alinhamento i18n Global
**Graph of Thoughts**
- **G1 Análise**: Mapear diferenças entre `src/lib/i18n.ts` atual e `prototipos-zane/zane-ai/src/lib/i18n.ts`.
- **G2 Providers**: Revisar `LanguageProvider` em `__root`, `Header`, `LanguageSelector` para garantir contexto único com persistência.
- **G3 Consumidores**: Atualizar componentes (Header, selectors, Command Bars) para usar hooks traduzidos e chaves consistentes.
- **G4 Verificação**: Garantir que SSR/hidratação mantenham o idioma selecionado sem flicker.

**Flowchart**
1. Comparar arquivos i18n (identificar namespaces + mensagens faltantes).
2. Atualizar `src/lib/i18n.ts` e hooks relacionados.
3. Propagar novo contrato aos providers/root layout.
4. Revisar consumidores principais (Header, LanguageSelector, mode cards).
5. Smoke test nas rotas para confirmar traduções e persistência.

**Item 1 – Atualizações (15:05)**
- [src/lib/i18n.ts](src/lib/i18n.ts#L1-L620): sincronizei o dicionário com o protótipo (novas chaves de memória, cópias inglesas/pt idênticas) mantendo tokens extras usados na aplicação.
- [src/components/settings/MainView.tsx](src/components/settings/MainView.tsx#L1-L190): conectei o seletor de idioma ao `LanguageProvider`, passei a usar `useTranslation` em todos os itens e mantive o rótulo dinâmico dos idiomas.
- [src/components/settings/SettingsModal.tsx](src/components/settings/SettingsModal.tsx#L1-L160): títulos agora derivam de `useTranslation`, garantindo consistência entre as subviews.
- [src/components/layout/Header.tsx](src/components/layout/Header.tsx#L1-L85): botões utilizam rótulos/aria do dicionário, alinhando copy e acessibilidade.

### Item 2 – Bolha brain-style e layout do plano
**Graph of Thoughts**
- **B1 Componente de Mensagem**: revisar `src/components/chat/AIMessage.tsx` para portar o estilo "brain bubble" (gradiente, badge Zane, reasoning states) igual ao protótipo.
- **B2 Reasoning Badge**: alinhar `src/components/selectors/ReasoningSelector.tsx` e os badges em tempo de execução para refletirem os estados Soft/Médio/Max/Off com cores do protótipo.
- **B3 Plano Visual**: ajustar o layout de planos/plano vigente (cards no header/sidebar) seguindo `prototipos-zane/zane-ai` (uso de serif, highlight do plano atual, badge Pro).
- **B4 Reuso**: garantir que Photo/Canvas/Doc também usem a bolha atualizada para mensagens de raciocínio compartilhadas.

**Flowchart**
1. Mapear estilos e hierarquia de badges no protótipo (chat bubble, reasoning dots, plano premium).
2. Atualizar componentes de mensagem + badges para suportar variantes (chat/canvas/photo).
3. Revisar ReasoningSelector para mesma copy, ícones e badges.
4. Ajustar layout do plano (provavelmente em Header/Sidebar) para refletir o card "Plano Pro" centralizado.
5. Testar fluxo nas rotas Conversas/Canvas para garantir estilização consistente.

**Item 2 – Atualizações (15:42)**
- [src/components/chat/AIMessage.tsx](src/components/chat/AIMessage.tsx#L1-L260): repliquei a bolha brain-style do protótipo (badge Zane, plan chunk, chips de fontes e barra de ações com botões icônicos e audit trail).
- [src/components/chat/TodoListPanel.tsx](src/components/chat/TodoListPanel.tsx#L1-L120): accordion do plano ganhou tipografia serifada, cards translúcidos e contagem de etapas em uppercase como no layout original.
- [src/components/selectors/ReasoningSelector.tsx](src/components/selectors/ReasoningSelector.tsx#L1-L220): trigger agora usa o ícone Brain com indicador luminoso e menu suspenso alinhado ao protótipo.
- [src/lib/i18n.ts](src/lib/i18n.ts#L1-L640): acrescentei o namespace `message` com labels para copiar/feedback/token usage garantindo i18n completo.

### Item 3 – Cards de modos centralizados
**Graph of Thoughts**
- **M1 Landing Modes**: home `/` exibe cards Conversas/Canvas/Doc/Photo (provavelmente em `src/routes/index.tsx` ou componente dedicado). Precisam replicar layout centralizado com headline serif e descrições.
- **M2 Reuso**: cards talvez componham `ModeCard` reutilizado em outras rotas (doc/photo). Garantir API consistente para título, badge e CTA.
- **M3 Responsividade**: centralizar em desktop, stack em mobile igual ao protótipo (grid 2x2 com spacing generoso e ícones). Deve usar tokens existentes.
- **M4 Interação**: cada card navega para rota correspondente com hover glow, icon + label + description + meta (ex: "Planeje conversas longas").

**Flowchart**
1. Auditar markup atual dos cards (landing e onde mais aparecem) e comparar com protótipo.
2. Criar componente `ModeCard` (ou ajustar existente) com slots para ícone, título, descrição e CTA.
3. Aplicar layout centralizado (grid responsivo, copy do protótipo via i18n) e garantir foco/hover.
4. Validar navegação para /, /canvas, /doc, /photo e o estado ativo.
5. Smoke em mobile/tablet/desktop antes de seguir.

**Item 3 – Atualizações (16:05)**
- [src/components/layout/ModeCards.tsx](src/components/layout/ModeCards.tsx): novo grid responsivo com ícones Lucide, gradientes e CTA alinhados ao protótipo, navegando para Conversas/Canvas/Doc/Photo.
- [src/components/chat/EmptyState.tsx](src/components/chat/EmptyState.tsx#L1-L140): injectei o grid no empty state de Conversas com animação Framer Motion e mantive headline serif centralizada.
- [src/lib/i18n.ts](src/lib/i18n.ts#L1-L680): acrescentei o namespace `modes` (pt/en) com título, descrição, meta e call-to-action para cada card.

### Item 4 – Model selector popover
**Graph of Thoughts**
- **H1 Header Anchor**: `src/components/layout/Header.tsx` fornece o botão central; precisa manter `ref` consistente para todas rotas.
- **H2 ModelSelector Core**: `src/components/selectors/ModelSelector.tsx` calcula posição relativa e controla animações/backdrop; agora precisa hero copy + navegação por teclado.
- **H3 i18n Layer**: `src/lib/i18n.ts` segura hero title/subtitle, badge copy e CTA, sincronizados em pt/en para evitar hardcodes.
- **H4 Accessibility**: foco deve retornar ao gatilho, setas devem percorrer opções e Enter/Space selecionam o modelo.
- **H5 Routes**: `/`, `/photo`, `/canvas`, `/doc` apenas instanciam o componente; não devem quebrar SSR.

**Flowchart**
1. Adicionar novas chaves no dicionário (`models.heroTitle`, etc.).
2. Criar hero acima da lista no `ModelSelector` (badge do modelo atual + CTA) e conectar `aria-labelledby/aria-describedby`.
3. Mapear refs dos botões e implementar navegação por teclado (setas, home/end, enter/space).
4. Manter cálculo de posição (abre acima do header) e garantir foco de retorno ao botão do header.
5. Smoke test em Conversas/Photo/Canvas confirmando popover centralizado, texto correto e foco resiliente.

**Item 4 – Atualizações (16:40)**
- [src/lib/i18n.ts](src/lib/i18n.ts): acrescentei hero/cta para `models`, além de novos blocos `photoView`/`canvasView` usados daqui pra frente.
- [src/components/selectors/ModelSelector.tsx](src/components/selectors/ModelSelector.tsx): inseri hero card com copy dos protótipos, badges para o modelo ativo, posição forçada para cima e roteamento por teclado (Arrow/Home/End/Enter) com refs individuais.
- Rotas Conversas/Photo/Canvas continuam passando `anchorRef`, garantindo que o popover apareça centrado no header.

### Item 5 – Rodapé da sidebar
**Graph of Thoughts**
- **S1 Footer Shell**: segmento inferior em [src/components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx) precisa suportar avatar + plano + ação primária.
- **S2 Ação Global**: botão `+` deve iniciar nova conversa sem fechar manualmente; precisa reusar `onNewChat` e navegação.
- **S3 Acessibilidade**: ambos botões precisam de `aria-label`, foco claro e contraste dentro de `bg-bg-surface/80`.

**Flowchart**
1. Substituir layout existente por cápsula única (avatar + botão + info do plano).
2. Encadear `onOpenSettings` no badge e `onNewChat` no botão `+` com tooltips traduzidos.
3. Adicionar legenda em uppercase para espelhar protótipo.
4. Testar estados (sidebar aberta/fechada) em mobile/desktop garantindo que o botão não sai do viewport.

**Item 5 – Atualizações (17:00)**
- [src/components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx): reestruturei o rodapé em um único row com badge do usuário, copy do plano e botão `+` redondo que dispara `handleNavigate("chat")` + `onNewChat()`, além da legenda `Nova conversa` alinhada ao protótipo.

### Item 6 – Paridade Photo + bolha Canvas
**Graph of Thoughts**
- **P1 Toolbar Superior**: `PhotoToolbar` precisa exibir descrição, modelo ativo, seletor de proporção e CTA da galeria antes do feed.
- **P2 Command Bar**: `PhotoCommandBar` foca em anexos/prompt/enhancer; footer deve indicar proporção + gating para modelos suportados.
- **P3 View Shell**: `src/routes/photo.tsx` orquestra toolbar, gallery modal, enhancer e command bar.
- **P4 Canvas Reasoning**: reutilizar “brain bubble” para estados de raciocínio em `src/routes/canvas.tsx`, evitando loader genérico.

**Flowchart**
1. Criar `PhotoToolbar` com ratio popover (reutilizando `AspectRatioSelector`) e CTA da galeria; posicionar entre header e conteúdo.
2. Simplificar `PhotoCommandBar` para focar em anexos + sparkles, movendo seletor de proporção para a toolbar e adicionando copy do gating.
3. Atualizar rota Photo para renderizar a toolbar e conectar o novo prop `aspectRatio`.
4. Implementar `ReasoningBubble` em `components/chat` e utilizá-la durante `isLoading` no Canvas, exibindo o plano de execução no mesmo estilo brain bubble.
5. Testar Photo em mobile/tablet/desktop (ratio, gallery, enhancer) e Canvas (envio + spark) para garantir paridade.

**Item 6 – Atualizações (17:30)**
- [src/components/photo/PhotoToolbar.tsx](src/components/photo/PhotoToolbar.tsx): novo toolbar com descrições, modelo ativo, seletor de proporção dedicado e CTA da galeria alinhados aos protótipos.
- [src/components/photo/PhotoCommandBar.tsx](src/components/photo/PhotoCommandBar.tsx): concentrei anexos + sparkles, removi o seletor duplicado e acrescentei footer com status do enhancer (disponível vs bloqueado) reutilizando i18n.
- [src/routes/photo.tsx](src/routes/photo.tsx): conectei a toolbar ao estado de proporção/galleria e mantive o command bar sincronizado.
- [src/components/chat/ReasoningBubble.tsx](src/components/chat/ReasoningBubble.tsx) + [src/routes/canvas.tsx](src/routes/canvas.tsx): introduzi a bolha de raciocínio compartilhada, exibida durante `isLoading`, garantindo que Canvas use o mesmo visual brain-style.

### Item 4 – Model selector popover
**Graph of Thoughts**
- **H1 Header Trigger**: `src/components/layout/Header.tsx` expõe o botão que abre o seletor. Precisa fornecer um `ref` real para ancorar o popover e manter acessibilidade (aria, foco) alinhados ao protótipo.
- **M1 Model Selector Core**: `src/components/selectors/ModelSelector.tsx` controla backdrop, animações e lista de modelos. Deve calcular posição relativa ao trigger, suportar abertura up/down e exibir metadados (badges, context window) sem quebrar o contrato existente.
- **R1 Route Shells**: `src/routes/index.tsx`, `photo.tsx`, `doc.tsx`, `canvas.tsx` instanciam Header + ModelSelector. Precisam compartilhar o mesmo `ref`, garantir cleanup em mobile e manter SSR estável.
- **I1 i18n Copy**: `useTranslation` alimenta descrições/resumos dos modelos. Qualquer nova badge precisa manter textos PT/EN coerentes.
- **F1 Motion Layer**: Transições `framer-motion` do dropdown devem se ajustar à nova âncora sem jitter (spring 350/25) e respeitar o backdrop existente.

**Flowchart**
1. Criar `ref` no Header trigger (`useRef<HTMLButtonElement>`) e propagá-lo para o `ModelSelector` em todas as rotas.
2. Atualizar `ModelSelector` para calcular `top/left` via `getBoundingClientRect`, decidir automaticamente se abre "up" ou "down" e adicionar offset configurável.
3. Enriquecer o card de cada modelo com badges/meta (latência, melhor uso) usando apenas tokens existentes e textos do dicionário.
4. Garantir fechamento por clique externo/ESC, foco retornando ao trigger e backdrop com blur discreto igual ao protótipo.
5. Testar em mobile/desktop (todas as rotas) para confirmar posicionamento, scroll lock e destaque do modelo selecionado.
