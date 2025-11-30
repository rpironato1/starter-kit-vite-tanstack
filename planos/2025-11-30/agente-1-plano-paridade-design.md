# Plano de Paridade de Design UI/UX

**AGENTE 1 - Análise de Paridade de Design**
**Data:** 2025-11-30
**Repositórios de Referência:** `rpironato1/zane-ai` + `rpironato1/zane-ai-ux-interface`

---

## 📊 Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Paridade Atual** | ~78% |
| **Paridade Esperada** | 95%+ |
| **Componentes Críticos** | 5 |
| **Tempo Estimado Total** | 14-18h |

---

## 🎯 Componentes a Modificar

### 1. AIMessage.tsx - Badge e Sources

| Aspecto | Estado Atual | Estado Esperado | Paridade |
|---------|--------------|-----------------|----------|
| Badge Shape | `rounded-full px-3 py-1` (pill) | `w-5 h-5 rounded-md` (quadrado) | ❌ 30% |
| Badge Text | "Zane AI" | "Z" (letra única) | ❌ 20% |
| Badge Gradient | `from-accent-primary to-emerald-600` | `from-accent-primary to-emerald-900` | ⚠️ 80% |
| Badge Glow | Ausente | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` | ❌ 0% |
| Sources Dot | Ausente | `w-1.5 h-1.5 rounded-full bg-accent-primary` | ❌ 0% |
| Sources Hover Glow | Ausente | `shadow-[0_0_8px_rgba(36,107,49,0.8)]` | ❌ 0% |

**Arquivo:** `src/components/chat/AIMessage.tsx`

**Código Atual (linhas 60-63):**
```tsx
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>
```

**Código Corrigido:**
```tsx
<div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
  Z
</div>
```

**Sources Chips - Código Atual (linhas 103-116):**
```tsx
{sources.map((source, idx) => (
  <a
    key={`source-${source.title}-${idx}`}
    href={source.uri}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-xs text-accent-primary hover:underline bg-accent-primary/10 px-2 py-1 rounded"
  >
    <ExternalLink className="w-3 h-3" />
    {source.title}
  </a>
))}
```

**Sources Chips - Código Corrigido:**
```tsx
{sources.map((source, idx) => (
  <a
    key={`source-${source.title}-${idx}`}
    href={source.uri}
    target="_blank"
    rel="noopener noreferrer"
    className="group/source inline-flex items-center gap-2 text-xs text-accent-primary bg-accent-primary/10 px-2.5 py-1.5 rounded-lg border border-accent-primary/20 transition-all hover:bg-accent-primary/15"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary transition-shadow group-hover/source:shadow-[0_0_8px_rgba(36,107,49,0.8)]" />
    <ExternalLink className="w-3 h-3" />
    {source.title}
  </a>
))}
```

---

### 2. EmptyState.tsx - Container 3D e Textos

| Aspecto | Estado Atual | Estado Esperado | Paridade |
|---------|--------------|-----------------|----------|
| Container | Ícone direto (`size-16`) | Container 3D `w-20 h-20 rounded-[24px]` | ❌ 40% |
| Blur Layer | Ausente | `blur-xl` layer behind | ❌ 0% |
| Container Shadow | Ausente | `shadow-2xl` | ❌ 0% |
| Container BG | Ausente | `bg-[#27272a]` | ❌ 0% |
| Título Chat | "Como posso ajudar?" | "Olá! Como posso ajudar?" | ⚠️ 85% |
| Título Photo | "Crie imagens incríveis" | "Zane Photo Studio" | ❌ 30% |
| Título Doc | "Analise documentos" | "Zane Doc" | ❌ 30% |
| Título Canvas | "Crie artefatos" | "Zane Canvas" | ❌ 30% |
| Cor Título Mobile | `text-text-primary` | `text-[#eecfa1]` (dourado) | ❌ 0% |

**Arquivo:** `src/components/chat/EmptyState.tsx`

**Código Atual (linhas 30-40):**
```tsx
const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
  chat: {
    icon: MessageSquare,
    title: "Como posso ajudar?",
    subtitle: "Faça uma pergunta para começar",
  },
  photo: {
    icon: Wand2,
    title: "Crie imagens incríveis",
    subtitle: "Descreva a imagem que você quer criar",
    iconClassName: "text-accent-primary",
  },
  doc: {
    icon: BookOpen,
    title: "Analise documentos",
    subtitle: "Faça upload ou cole texto para análise",
  },
  canvas: {
    icon: LayoutGrid,
    title: "Crie artefatos",
    subtitle: "Peça para gerar código, diagramas ou mais",
  },
};
```

**Código Corrigido (variantConfigs):**
```tsx
const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
  chat: {
    icon: MessageSquare,
    title: "Olá! Como posso ajudar?",
    subtitle: "Faça uma pergunta para começar",
  },
  photo: {
    icon: Wand2,
    title: "Zane Photo Studio",
    subtitle: "Descreva a imagem que você quer criar",
    iconClassName: "text-accent-primary",
  },
  doc: {
    icon: BookOpen,
    title: "Zane Doc",
    subtitle: "Faça upload ou cole texto para análise",
  },
  canvas: {
    icon: LayoutGrid,
    title: "Zane Canvas",
    subtitle: "Peça para gerar código, diagramas ou mais",
  },
};
```

**Container Ícone - Código Atual (linhas 56-66):**
```tsx
<motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="mb-6"
>
  <Icon
    className={`size-16 animate-pulse-glow sm:size-20 ${config.iconClassName ?? "text-text-secondary"}`}
    strokeWidth={1.5}
  />
</motion.div>
```

**Container Ícone - Código Corrigido:**
```tsx
<motion.div
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="relative mb-6"
>
  {/* Blur layer */}
  <div className="absolute inset-0 w-20 h-20 rounded-[24px] bg-accent-primary/20 blur-xl" />
  
  {/* Container 3D */}
  <div className="relative w-20 h-20 rounded-[24px] bg-[#27272a] shadow-2xl flex items-center justify-center border border-white/5">
    <Icon
      className={cn(
        "size-10 animate-pulse-glow",
        config.iconClassName ?? "text-text-secondary"
      )}
      strokeWidth={1.5}
    />
  </div>
</motion.div>
```

**Título - Código Atual (linhas 68-75):**
```tsx
<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="mb-3 font-serif text-2xl text-text-primary sm:text-3xl"
>
  {title}
</motion.h1>
```

**Título - Código Corrigido:**
```tsx
<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="mb-3 font-serif text-2xl text-[#eecfa1] sm:text-3xl sm:text-text-primary"
>
  {title}
</motion.h1>
```

**Import adicional necessário:**
```tsx
import { cn } from "@/lib/utils";
```

---

### 3. LoadingIndicator.tsx - Label Zane

| Aspecto | Estado Atual | Estado Esperado | Paridade |
|---------|--------------|-----------------|----------|
| Label "Zane" | Ausente | `<span className="text-accent-primary font-bold text-xs">Zane</span>` | ❌ 0% |
| Estrutura | Ícone + texto único | "Zane" label + ícone + texto | ❌ 50% |
| Badge wrapper | Ausente | Container com `bg-bg-surface rounded-lg px-3 py-1.5` | ⚠️ 60% |

**Arquivo:** `src/components/chat/LoadingIndicator.tsx`

**Código Atual (linhas 16-27):**
```tsx
return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-2 text-text-secondary"
  >
    <Icon
      className={`size-4 ${isReasoning ? "animate-pulse" : "animate-spin"}`}
    />
    <span className="text-sm">{displayText}</span>
  </motion.div>
);
```

**Código Corrigido:**
```tsx
return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-2"
  >
    {/* Zane Badge */}
    <div className="flex items-center gap-1.5 bg-bg-surface rounded-lg px-3 py-1.5 border border-border-default">
      <span className="text-accent-primary font-bold text-xs">Zane</span>
      <Icon
        className={`size-3.5 text-text-secondary ${isReasoning ? "animate-pulse" : "animate-spin"}`}
      />
      <span className="text-xs text-text-secondary">{displayText}</span>
    </div>
  </motion.div>
);
```

---

### 4. UserMessage.tsx - Shadow e Border

| Aspecto | Estado Atual | Estado Esperado | Paridade |
|---------|--------------|-----------------|----------|
| Shadow | Ausente | `shadow-sm` | ❌ 0% |
| Border | `border border-border-default` | `border border-white/5` | ⚠️ 70% |

**Arquivo:** `src/components/chat/UserMessage.tsx`

**Código Atual (linha 21):**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">
```

**Código Corrigido:**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-white/5 shadow-sm">
```

---

### 5. ReasoningSelector.tsx - Popup Position e Icon Flip

| Aspecto | Estado Atual | Estado Esperado | Paridade |
|---------|--------------|-----------------|----------|
| Popup Position | `top-full mt-2` (abre para baixo) | `bottom-full mb-2` (abre para cima) | ❌ 40% |
| Brain Icon Flip | Normal | `transform scale-x-[-1]` | ❌ 0% |
| Button Colors | Cores inconsistentes | Cores consistentes com protótipo | ⚠️ 75% |

**Arquivo:** `src/components/selectors/ReasoningSelector.tsx`

**DropdownSelector - Código Atual (linhas 133-145):**
```tsx
<motion.div
  initial={{ opacity: 0, y: -8, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -8, scale: 0.95 }}
  transition={springConfig}
  className={cn(
    "absolute top-full left-0 mt-2 z-50",
    "min-w-[200px] p-1 rounded-xl",
    "bg-[var(--bg-surface)] border border-zinc-700/50",
    "shadow-lg shadow-black/20",
  )}
>
```

**DropdownSelector - Código Corrigido:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 8, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 8, scale: 0.95 }}
  transition={springConfig}
  className={cn(
    "absolute bottom-full left-0 mb-2 z-50",
    "min-w-[200px] p-1 rounded-xl",
    "bg-[var(--bg-surface)] border border-zinc-700/50",
    "shadow-lg shadow-black/20",
  )}
>
```

**Brain Icon - Código Atual (linha 38):**
```tsx
icon: Brain,
```

**Nota:** Adicionar `transform scale-x-[-1]` ao renderizar o ícone Brain:

**Na linha 115 (botão principal):**
```tsx
<Icon className={cn("size-4", selected.color, value !== "off" && "scale-x-[-1]")} />
```

**Na linha 154 (menu dropdown):**
```tsx
<LevelIcon className={cn("size-4", config.color, level !== "off" && config.icon === Brain && "scale-x-[-1]")} />
```

---

## 📋 Checklist de Implementação

### Sprint 1: Componentes de Chat (8-10h)

- [ ] **AIMessage.tsx**
  - [ ] Substituir badge pill por quadrado 20x20
  - [ ] Trocar "Zane AI" por "Z"
  - [ ] Ajustar gradient para `to-emerald-900`
  - [ ] Adicionar glow shadow no badge
  - [ ] Adicionar dot indicator nos Sources
  - [ ] Adicionar hover glow nos Sources

- [ ] **EmptyState.tsx**
  - [ ] Adicionar import do `cn`
  - [ ] Atualizar títulos (Chat, Photo, Doc, Canvas)
  - [ ] Criar container 3D com blur layer
  - [ ] Adicionar shadow-2xl e border
  - [ ] Cor dourada `#eecfa1` para títulos mobile

- [ ] **LoadingIndicator.tsx**
  - [ ] Adicionar label "Zane" em destaque
  - [ ] Criar container com bg-bg-surface
  - [ ] Ajustar tamanhos de ícone e texto

### Sprint 2: Mensagem do Usuário (2-3h)

- [ ] **UserMessage.tsx**
  - [ ] Adicionar `shadow-sm`
  - [ ] Trocar border para `border-white/5`

### Sprint 3: Seletor de Reasoning (4-5h)

- [ ] **ReasoningSelector.tsx**
  - [ ] Inverter direção do popup (`bottom-full`)
  - [ ] Ajustar animação de entrada (`y: 8` → `y: 0`)
  - [ ] Adicionar `scale-x-[-1]` ao ícone Brain
  - [ ] Verificar consistência de cores

---

## 🔗 Dependências Afetadas

| Componente Modificado | Dependências |
|-----------------------|--------------|
| AIMessage.tsx | MessageRenderer, TodoListPanel, TokenUsage types |
| EmptyState.tsx | Nenhuma (standalone) |
| LoadingIndicator.tsx | Nenhuma (standalone) |
| UserMessage.tsx | Nenhuma (standalone) |
| ReasoningSelector.tsx | Nenhuma (standalone) |

---

## ✅ Validações Necessárias

### Visuais
- [ ] Badge "Z" alinhado verticalmente
- [ ] Glow visível em fundo escuro
- [ ] Container 3D com profundidade perceptível
- [ ] Blur layer não interfere em outros elementos
- [ ] Cor dourada visível apenas em mobile
- [ ] Popup do Reasoning abre para cima sem overflow

### Funcionais
- [ ] Copiar mensagem ainda funciona
- [ ] Links de Sources abrem em nova aba
- [ ] Loading indicator anima corretamente
- [ ] Reasoning selector altera estado corretamente

### Responsividade
- [ ] Badge legível em telas pequenas
- [ ] Container 3D proporcional
- [ ] Título dourado apenas em `< sm:`
- [ ] Popup não sai da viewport

---

## 📊 Impacto na Paridade

| Componente | Paridade Atual | Paridade Após | Impacto |
|------------|----------------|---------------|---------|
| AIMessage Badge | 30% | 95% | +8% geral |
| AIMessage Sources | 30% | 90% | +2% geral |
| EmptyState Container | 40% | 95% | +6% geral |
| LoadingIndicator | 50% | 90% | +3% geral |
| UserMessage | 85% | 98% | +1% geral |
| ReasoningSelector | 60% | 92% | +2% geral |
| **TOTAL** | **78%** | **95%+** | **+22%** |

---

## 📁 Arquivos a Modificar

```
src/components/chat/AIMessage.tsx        # Badge + Sources
src/components/chat/EmptyState.tsx       # Container 3D + Títulos + Cores
src/components/chat/LoadingIndicator.tsx # Label Zane
src/components/chat/UserMessage.tsx      # Shadow + Border
src/components/selectors/ReasoningSelector.tsx # Popup + Icon flip
```

---

## 🚀 Ordem de Implementação Recomendada

1. **EmptyState.tsx** - Maior impacto visual, standalone
2. **AIMessage.tsx (Badge)** - Identidade visual principal
3. **LoadingIndicator.tsx** - Feedback imediato
4. **AIMessage.tsx (Sources)** - Complementa Badge
5. **UserMessage.tsx** - Correção simples
6. **ReasoningSelector.tsx** - Mais complexo, último

---

## 📝 Notas de Implementação

### Design Tokens Confirmados
```css
--accent-primary: #246B31
--accent-textHighlight: #eecfa1
--bg-surface: #27272a
```

### Shadows Padronizados
```css
/* Badge glow */
shadow-[0_0_10px_rgba(36,107,49,0.4)]

/* Sources hover glow */
shadow-[0_0_8px_rgba(36,107,49,0.8)]

/* Container 3D */
shadow-2xl

/* User message */
shadow-sm
```

### Referência dos Protótipos
- **zane-ai:** `ChatMessageBubble.tsx`, `PhotoView.tsx`, `ReasoningSelector.tsx`
- **zane-ai-ux-interface:** `ChatView.tsx`, `MessageBubble.tsx`

---

**Gerado por:** AGENTE 1 - Análise de Paridade de Design
**Status:** ✅ Pronto para execução
