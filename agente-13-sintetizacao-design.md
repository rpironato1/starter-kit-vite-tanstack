# Relatório de Síntese para Implementação - Agente 13

**Data:** 30 de novembro de 2025  
**Sintetizado de:** Relatórios dos Agentes 1-11  
**Objetivo:** Transformar análises em TAREFAS acionáveis

---

## Dashboard de Paridade

| Categoria | Paridade | Status | Notas |
|-----------|----------|--------|-------|
| Design Tokens | 100% | ✅ | Completamente implementado |
| Tipografia | 100% | ✅ | Inter + Playfair Display |
| Componentes UI Base | 95% | ✅ | Buttons, Switch, Modal, Backdrop |
| Sidebar | 95% | ✅ | Animações spring corretas |
| Input Bar | 90% | 🟡 | Faltam menus popup |
| Settings Modal | 98% | ✅ | Navigation stack completo |
| Canvas Module | 92% | ✅ | Split view funcional |
| Doc Module | 88% | 🟡 | ContextDrawer OK |
| Photo Module | 88% | 🟡 | Gallery OK, EmptyState não |
| Chat Module | 72% | 🔴 | AIMessage, EmptyState críticos |
| Selectors | 68% | 🔴 | Reasoning/Attach precisam popup |
| Animações | 90% | 🟡 | Falta container 3D empty state |

**PARIDADE GERAL: ~85%**

---

## BACKLOG DE CORREÇÕES

### SPRINT 1 - CRÍTICO (Alta visibilidade, alto impacto)

- [ ] **Issue 1: [AIMessage] Badge Zane AI** → Mudar de pill para quadrado 20x20 com "Z"
  - Atual: `<span className="rounded-full bg-gradient-to-r px-3 py-1">Zane AI</span>`
  - Correto: Quadrado `w-5 h-5 rounded-md` com letra "Z" + label separado
  - Adicionar gradient: `from-accent-primary to-emerald-900` (não emerald-600)
  - Adicionar glow: `shadow-[0_0_10px_rgba(36,107,49,0.4)]`

- [ ] **Issue 2: [EmptyState] Container 3D com Blur** → Implementar em TODAS as views
  ```tsx
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full animate-pulse" />
    <div className="relative w-20 h-20 bg-bg-surface rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
      <Icon className="w-8 h-8 text-accent-primary" />
    </div>
  </div>
  ```

- [ ] **Issue 3: [EmptyState] Títulos e Cores** → Ajustar textos e cor dourada
  - Chat: "Como posso te ajudar\nesta noite?" (2 linhas)
  - Photo: "Zane Photo Studio"
  - Doc: "Zane Doc"
  - Canvas: "Zane Canvas"
  - Cor: `text-[#eecfa1]` (accent-textHighlight) no mobile
  - Tamanho: `text-4xl md:text-5xl font-serif`

- [ ] **Issue 4: [ReasoningSelector] Popup Menu** → Criar menu dropdown flutuante
  - Posição: `absolute bottom-full left-0 mb-4`
  - Background: `bg-[#1f1f22] border-zinc-800 rounded-2xl`
  - Header: "Nível de Raciocínio" uppercase
  - Níveis com descrição e tokens: "(1k/2k/4k tokens)"
  - Brain icon espelhado: `transform scale-x-[-1]`

- [ ] **Issue 5: [LoadingIndicator] Label Zane** → Adicionar branding
  - Adicionar: `<span className="text-accent-primary font-bold text-xs">Zane</span>`
  - Antes do Loader2 spinner
  - Textos por view: "Criando sua obra de arte...", "Lendo documentos..."

### SPRINT 2 - IMPORTANTE (Consistência visual)

- [ ] **Issue 6: [AIMessage] Sources Chips** → Redesenhar com efeitos
  - Adicionar dot indicator: `w-1.5 h-1.5 rounded-full bg-zinc-600`
  - Dot glow on hover: `group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)]`
  - Background: `bg-zinc-900/50` (não accent-primary/10)
  - Border: `border-white/5 hover:border-white/10`
  - ExternalLink: `opacity-0 group-hover:opacity-100`

- [ ] **Issue 7: [UserMessage] Ajustes finos**
  - Adicionar: `shadow-sm`
  - Border: `border-white/5` (não border-default)

- [ ] **Issue 8: [AttachMenu] Popup melhorado**
  - Adicionar: `backdrop-blur-xl`
  - Border-radius: `rounded-2xl` (não rounded-xl)
  - Width: `w-[220px]` (não min-w-[200px])
  - Labels: "Câmera", "Fotos", "Arquivos" (pt-BR)

- [ ] **Issue 9: [ModelSelector] Posição alternativa**
  - Considerar dropdown inline abaixo do header
  - Em vez de modal centralizado
  - Animation: `animate-in slide-in-from-top-3`

- [ ] **Issue 10: [ReasoningSelector] Cores corretas**
  - Soft: `text-green-400` (não blue-400)
  - Medium: `text-yellow-400` (não amber-400)
  - Max: `text-[#15803d]` (não red-400)

### SPRINT 3 - MELHORIAS (Polish)

- [ ] **Issue 11: [AIMessage] Actions visibility**
  - Mudar para sempre visível (opacidade baixa)
  - Remover: `opacity-0 group-hover:opacity-100`
  - Adicionar: `opacity-60 hover:opacity-100`

- [ ] **Issue 12: [ZaneGallery] Footer text**
  - Adicionar: "Fim da galeria" ou "{n} imagens"

- [ ] **Issue 13: [Settings] Textos pt-BR**
  - "Settings" → "Configurações"
  - "Profile" → "Perfil"
  - "Plan" → "Plano"
  - "Memory" → "Memória"

- [ ] **Issue 14: [Header] Altura consistente**
  - Considerar: `h-[72px]` (protótipo) vs `h-16` (atual 64px)

- [ ] **Issue 15: [Desktop] Padding horizontal**
  - Mudar: `md:px-0` para `md:px-6`
  - No container de scroll do chat

- [ ] **Issue 16: [Message Entry] Scale animation**
  - Adicionar: `scale: 0.95` no initial state
  - Ajustar: `y: 20` para `y: 30-50`

---

## COMPONENTES A CRIAR/REFATORAR

### Novos Componentes

| Componente | Descrição | Prioridade |
|------------|-----------|------------|
| `ReasoningPopup` | Menu flutuante com níveis explicados | 🔴 Alta |
| `ZaneBadge` | Badge "Z" quadrado com glow | 🔴 Alta |
| `EmptyStateContainer` | Container 3D com blur para ícones | 🔴 Alta |
| `SourceChip` | Chip de fonte com dot e animações | 🟡 Média |
| `FormInput` | Input estilo Zane com label/icon/counter | 🟡 Média |
| `CustomDropdown` | Dropdown select estilizado | 🟡 Média |
| `AlertModal` | Modal de confirmação standalone | 🟢 Baixa |

### Refatorações

| Componente | Mudança | Arquivo |
|------------|---------|---------|
| `AIMessage` | Badge quadrado + sources | `src/components/chat/AIMessage.tsx` |
| `EmptyState` | Container 3D + textos | `src/components/chat/EmptyState.tsx` |
| `LoadingIndicator` | Label Zane + variantes | `src/components/chat/LoadingIndicator.tsx` |
| `UserMessage` | Shadow + border | `src/components/chat/UserMessage.tsx` |
| `ReasoningSelector` | Popup + cores + flip icon | `src/components/selectors/ReasoningSelector.tsx` |
| `AttachMenu` | Blur + labels pt-BR | `src/components/selectors/AttachMenu.tsx` |
| `ModelSelector` | Posição dropdown (opcional) | `src/components/selectors/ModelSelector.tsx` |

---

## ARQUIVOS A MODIFICAR

### Alta Prioridade
```
src/components/chat/AIMessage.tsx          → Badge + Sources
src/components/chat/EmptyState.tsx         → Container 3D + Textos + Cores
src/components/chat/LoadingIndicator.tsx   → Label Zane + Variantes
src/components/chat/UserMessage.tsx        → Shadow + Border
src/components/selectors/ReasoningSelector.tsx → Popup Menu + Cores + Icon flip
```

### Média Prioridade
```
src/components/selectors/AttachMenu.tsx    → Blur + Labels
src/components/selectors/ModelSelector.tsx → Posição (opcional)
src/components/photo/ZaneGallery.tsx       → Footer text
src/routes/index.tsx                       → Padding desktop
src/routes/photo.tsx                       → EmptyState config
src/routes/doc.tsx                         → EmptyState config
src/routes/canvas.tsx                      → EmptyState config
```

### Baixa Prioridade
```
src/components/layout/Header.tsx           → Altura (opcional)
src/components/settings/MainView.tsx       → Textos pt-BR
src/components/settings/SettingsModal.tsx  → Título pt-BR
src/styles.css                             → Adicionar keyframes se necessário
```

---

## ESTIMATIVA DE ESFORÇO

| Categoria | Esforço | Tempo Estimado |
|-----------|---------|----------------|
| AIMessage Badge | Médio | 2-3h |
| EmptyState Container 3D | Médio | 2-4h |
| EmptyState Textos/Cores | Pequeno | 1h |
| ReasoningSelector Popup | Grande | 4-6h |
| LoadingIndicator Variantes | Pequeno | 1-2h |
| Sources Chips | Médio | 2-3h |
| UserMessage Ajustes | Pequeno | 30min |
| AttachMenu Melhorias | Pequeno | 1h |
| Textos pt-BR | Pequeno | 1h |
| **TOTAL SPRINT 1** | - | **10-16h** |
| **TOTAL SPRINT 2** | - | **8-12h** |
| **TOTAL SPRINT 3** | - | **4-6h** |

---

## DEPENDÊNCIAS

### Ordem de Implementação

```
1. EmptyState Container 3D (base reutilizável)
   ↓
2. EmptyState Textos/Cores (usa container)
   ↓
3. AIMessage Badge (componente isolado)
   ↓
4. LoadingIndicator Variantes (componente isolado)
   ↓
5. ReasoningSelector Popup (complexo, isolado)
   ↓
6. Sources Chips (dentro de AIMessage)
   ↓
7. Ajustes menores (paralelo)
```

### Sem Dependências (podem ser paralelos)
- UserMessage shadow/border
- AttachMenu blur/labels
- ZaneGallery footer
- Textos pt-BR
- Desktop padding

---

## TOKENS/VALORES DE REFERÊNCIA

### Cores Críticas
```css
--accent-primary: #246B31
--accent-textHighlight: #eecfa1 /* Dourado para títulos mobile */
--emerald-900: /* Para gradiente AI badge */
--green-400: /* Reasoning soft */
--yellow-400: /* Reasoning medium */
```

### Shadows Críticos
```css
shadow-[0_0_10px_rgba(36,107,49,0.4)]  /* AI Badge glow */
shadow-[0_0_8px_rgba(36,107,49,0.8)]   /* Sources dot hover */
shadow-2xl                              /* EmptyState container */
shadow-sm                               /* UserMessage */
```

### Border Radius
```css
rounded-[24px]   /* EmptyState container */
rounded-md       /* AI Badge (w-5 h-5) */
rounded-2xl      /* Popups, Cards */
```

---

## CHECKLIST DE VALIDAÇÃO

Após implementação, verificar:

- [ ] Badge Zane AI é quadrado com "Z" e glow verde
- [ ] Empty states têm container 3D com blur pulsante
- [ ] Títulos empty state são dourados no mobile
- [ ] Reasoning selector abre popup com descrições
- [ ] Brain icon está espelhado horizontalmente
- [ ] Loading mostra "Zane" em verde antes do spinner
- [ ] Sources chips têm dot verde com glow no hover
- [ ] User message tem shadow-sm
- [ ] Attach menu tem backdrop-blur-xl

---

*Relatório sintetizado pelo Agente 13*  
*Fontes: 11 relatórios de análise UI/UX/Design*  
*Total de issues identificadas: 47 | Priorizadas: 16*
