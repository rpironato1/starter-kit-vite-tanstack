# Plano Sintetizado de Paridade de Design UI/UX

**Agente:** 7  
**Data:** 30 de novembro de 2025  
**Objetivo:** Plano de ação executável com código pronto para implementação

---

## 📋 Sumário Executivo

Este documento consolida os elementos de consenso de 4 agentes de análise em um plano de ação com código pronto para copiar e implementar.

**Tempo Total Estimado:** 9-12 horas  
**Arquivos a Modificar:** 6

---

## FASE 1 - IDENTIDADE VISUAL (4-5h)

### 1.1 AIMessage Badge Redesign

**Arquivo:** `src/components/chat/AIMessage.tsx`

**Mudança:** Substituir badge pill por badge quadrado com letra "Z"

**CÓDIGO ATUAL (linhas 62-66):**
```tsx
{/* Header with Zane AI badge */}
<div className="mb-2">
  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
    Zane AI
  </span>
</div>
```

**CÓDIGO NOVO:**
```tsx
{/* Header with Zane AI badge */}
<div className="mb-2 flex items-center gap-2">
  {/* Badge quadrado com "Z" */}
  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    <span className="font-serif font-bold text-[9px] text-white">Z</span>
  </div>
  {/* Label separado */}
  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
    Zane
  </span>
</div>
```

**Impacto Visual:**
- Badge quadrado `w-5 h-5` com `rounded-md`
- Letra "Z" centralizada com `font-serif font-bold text-[9px]`
- Gradient diagonal `from-accent-primary to-emerald-900`
- Glow effect verde `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- Label separado em uppercase `text-[11px]`

---

### 1.2 EmptyState Container 3D

**Arquivo:** `src/components/chat/EmptyState.tsx`

**Mudança:** Container de ícone com efeito 3D, blur layer e dimensões corretas

**CÓDIGO ATUAL (linhas 52-62):**
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

**CÓDIGO NOVO:**
```tsx
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="relative mb-6"
>
  {/* Container 3D com blur layer */}
  <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/5 bg-bg-surface shadow-2xl">
    {/* Blur layer animado */}
    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-accent-primary/20 to-emerald-900/20 blur-xl animate-pulse" />
    {/* Ícone interno */}
    <Icon
      className={`relative z-10 h-8 w-8 ${config.iconClassName ?? "text-text-secondary"}`}
      strokeWidth={1.5}
    />
  </div>
</motion.div>
```

**Impacto Visual:**
- Container `w-20 h-20` com `rounded-[24px]`
- Background `bg-bg-surface` com `shadow-2xl`
- Border sutil `border border-white/5`
- Blur layer com `blur-xl animate-pulse`
- Ícone interno reduzido para `w-8 h-8`

---

### 1.3 EmptyState Títulos e Cores

**Arquivo:** `src/components/chat/EmptyState.tsx`

**Mudança:** Títulos atualizados e cor dourada mobile

**CÓDIGO ATUAL (variantConfigs):**
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

**CÓDIGO NOVO:**
```tsx
const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
  chat: {
    icon: MessageSquare,
    title: "Como posso te ajudar esta noite?",
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

**ATUALIZAR TÍTULO H1:**

**CÓDIGO ATUAL:**
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

**CÓDIGO NOVO:**
```tsx
<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="mb-3 font-serif text-3xl text-[#eecfa1] md:text-4xl md:text-text-primary"
>
  {title}
</motion.h1>
```

**Impacto Visual:**
- Títulos atualizados conforme design reference
- Tamanho `text-3xl md:text-4xl`
- Cor mobile: `text-[#eecfa1]` (dourado)
- Cor desktop: `md:text-text-primary`

---

### 1.4 LoadingIndicator Label Zane

**Arquivo:** `src/components/chat/LoadingIndicator.tsx`

**Mudança:** Adicionar label "Zane" antes do texto de status

**CÓDIGO ATUAL:**
```tsx
export function LoadingIndicator({
  variant = "default",
  text,
}: LoadingIndicatorProps) {
  const isReasoning = variant === "reasoning";
  const displayText = text ?? (isReasoning ? "Raciocinando..." : "Pensando...");
  const Icon = isReasoning ? Brain : Loader2;

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
}
```

**CÓDIGO NOVO:**
```tsx
type LoadingVariant = "default" | "reasoning" | "photo" | "doc" | "canvas";

interface LoadingIndicatorProps {
  variant?: LoadingVariant;
  text?: string;
}

const variantTexts: Record<LoadingVariant, string> = {
  default: "está pensando...",
  reasoning: "está raciocinando...",
  photo: "está criando...",
  doc: "está analisando...",
  canvas: "está gerando...",
};

export function LoadingIndicator({
  variant = "default",
  text,
}: LoadingIndicatorProps) {
  const isReasoning = variant === "reasoning";
  const displayText = text ?? variantTexts[variant];
  const Icon = isReasoning ? Brain : Loader2;

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
      <div className="flex items-center gap-1.5 text-sm">
        <span className="font-bold text-xs text-accent-primary">Zane</span>
        <span>{displayText}</span>
      </div>
    </motion.div>
  );
}
```

**Impacto Visual:**
- Label "Zane" em `font-bold text-xs text-accent-primary`
- Textos diferenciados por módulo
- Suporte a variantes: default, reasoning, photo, doc, canvas

---

## FASE 2 - UX DE INTERAÇÃO (3-4h)

### 2.1 ReasoningSelector Popup Completo

**Arquivo:** `src/components/selectors/ReasoningSelector.tsx`

**Mudança:** Popup abre acima, cores corretas, brain icon espelhado

**ATUALIZAR REASONING_LEVELS:**
```tsx
const REASONING_LEVELS = {
  off: {
    label: "Desativado",
    description: "Respostas rápidas",
    color: "text-text-secondary",
    bgColor: "bg-text-secondary",
    icon: Zap,
  },
  soft: {
    label: "Soft",
    description: "Análise básica",
    color: "text-green-400",
    bgColor: "bg-green-400",
    icon: Brain,
  },
  medium: {
    label: "Médio",
    description: "Análise detalhada",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400",
    icon: Brain,
  },
  max: {
    label: "Max",
    description: "Análise profunda",
    color: "text-[#15803d]",
    bgColor: "bg-[#15803d]",
    icon: Sparkles,
  },
} as const;
```

**ATUALIZAR DropdownSelector POPUP (motion.div):**

**CÓDIGO ATUAL:**
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

**CÓDIGO NOVO:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 8, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 8, scale: 0.95 }}
  transition={springConfig}
  className={cn(
    "absolute bottom-full left-0 mb-4 z-50",
    "min-w-[220px] p-2 rounded-xl",
    "bg-[var(--bg-surface)] border border-zinc-700/50",
    "shadow-lg shadow-black/20 backdrop-blur-xl",
  )}
>
  {/* Header */}
  <div className="px-3 py-2 border-b border-zinc-700/30 mb-1">
    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
      Nível de Raciocínio
    </span>
  </div>
```

**ATUALIZAR ÍCONE BRAIN (espelhado):**
```tsx
<LevelIcon 
  className={cn(
    "size-4", 
    config.color,
    level !== "off" && level !== "max" && "scale-x-[-1]"
  )} 
/>
```

**ATUALIZAR INDICADOR SELECIONADO:**
```tsx
{isSelected && (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("size-2 rounded-full", config.bgColor)}
  />
)}
```

**Impacto Visual:**
- Popup abre acima do botão (`bottom-full mb-4`)
- Header "NÍVEL DE RACIOCÍNIO" uppercase
- Brain icon espelhado `scale-x-[-1]`
- Cores: soft=green-400, medium=yellow-400, max=#15803d
- Backdrop blur adicionado

---

### 2.2 Sources Chips com Dot e Glow

**Arquivo:** `src/components/chat/AIMessage.tsx`

**Mudança:** Chips redesenhados com dot, glow hover e ExternalLink animado

**CÓDIGO ATUAL (linhas 99-116):**
```tsx
{/* Sources Chips */}
{sources && sources.length > 0 && (
  <div className="mt-3 pt-3 border-t border-border-default">
    <p className="text-xs text-text-secondary mb-2">Fontes:</p>
    <div className="flex flex-wrap gap-2">
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
    </div>
  </div>
)}
```

**CÓDIGO NOVO:**
```tsx
{/* Sources Chips */}
{sources && sources.length > 0 && (
  <div className="mt-3 pt-3 border-t border-border-default">
    <p className="text-xs text-text-secondary mb-2">Fontes:</p>
    <div className="flex flex-wrap gap-2">
      {sources.map((source, idx) => (
        <a
          key={`source-${source.title}-${idx}`}
          href={source.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-zinc-900/50 px-3 py-1.5 text-xs text-text-primary transition-all duration-200 hover:shadow-[0_0_8px_rgba(36,107,49,0.8)]"
        >
          {/* Dot indicator */}
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
          <span className="truncate max-w-[120px]">{source.title}</span>
          {/* ExternalLink com fade in */}
          <ExternalLink className="h-3 w-3 text-text-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </a>
      ))}
    </div>
  </div>
)}
```

**Impacto Visual:**
- Dot indicator `w-1.5 h-1.5 rounded-full`
- Background `bg-zinc-900/50`
- Border radius `rounded-full`
- Glow hover `shadow-[0_0_8px_rgba(36,107,49,0.8)]`
- ExternalLink aparece apenas no hover

---

## FASE 3 - REFINAMENTOS (2-3h)

### 3.1 UserMessage Shadow

**Arquivo:** `src/components/chat/UserMessage.tsx`

**Mudança:** Adicionar shadow sutil e border atualizado

**CÓDIGO ATUAL:**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">
```

**CÓDIGO NOVO:**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-white/5 shadow-sm">
```

**Impacto Visual:**
- Shadow sutil `shadow-sm`
- Border atualizado para `border-white/5`

---

### 3.2 AttachMenu Blur e Labels

**Arquivo:** `src/components/selectors/AttachMenu.tsx`

**Mudança:** Backdrop blur, radius e labels atualizados

**ATUALIZAR menuItems:**
```tsx
const menuItems: { type: AttachType; icon: typeof Camera; label: string }[] = [
  { type: "camera", icon: Camera, label: "Câmera" },
  { type: "gallery", icon: Image, label: "Fotos" },
  { type: "files", icon: FileText, label: "Arquivos" },
  { type: "folder", icon: FolderOpen, label: "Pasta" },
  { type: "link", icon: Link2, label: "Link" },
];
```

**ATUALIZAR CONTAINER motion.div:**

**CÓDIGO ATUAL:**
```tsx
className={cn(
  "absolute bottom-full mb-2 left-0 origin-bottom",
  "min-w-[200px] rounded-xl p-1.5",
  "bg-white dark:bg-zinc-800",
  "border border-zinc-200 dark:border-zinc-700",
  "shadow-lg dark:shadow-zinc-900/50",
  className,
)}
```

**CÓDIGO NOVO:**
```tsx
className={cn(
  "absolute bottom-full mb-2 left-0 origin-bottom",
  "min-w-[200px] rounded-2xl p-2",
  "bg-zinc-900/80 backdrop-blur-xl",
  "border border-zinc-700/50",
  "shadow-xl shadow-black/30",
  className,
)}
```

**ATUALIZAR BOTÕES:**
```tsx
<button
  type="button"
  onClick={() => handleSelect(type)}
  className={cn(
    "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl",
    "text-sm text-zinc-200",
    "hover:bg-zinc-700/50",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
  )}
>
  <Icon className="size-5 text-zinc-400" />
  <span>{label}</span>
</button>
```

**Impacto Visual:**
- Backdrop blur `backdrop-blur-xl`
- Radius maior `rounded-2xl`
- Labels simplificados: "Câmera", "Fotos", "Arquivos"
- Background com transparência `bg-zinc-900/80`

---

## 📊 Checklist de Implementação

| # | Componente | Arquivo | Prioridade | Tempo |
|---|------------|---------|------------|-------|
| 1 | AIMessage Badge | AIMessage.tsx | Alta | 30min |
| 2 | EmptyState Container | EmptyState.tsx | Alta | 1h |
| 3 | EmptyState Títulos | EmptyState.tsx | Alta | 30min |
| 4 | LoadingIndicator | LoadingIndicator.tsx | Média | 45min |
| 5 | ReasoningSelector | ReasoningSelector.tsx | Alta | 1.5h |
| 6 | Sources Chips | AIMessage.tsx | Média | 45min |
| 7 | UserMessage | UserMessage.tsx | Baixa | 15min |
| 8 | AttachMenu | AttachMenu.tsx | Baixa | 30min |

---

## 🧪 Testes de Validação

Após cada implementação, validar:

```bash
# 1. TypeScript - ZERO errors
npx tsc --noEmit

# 2. Lint + Format
npm run check

# 3. Build verification
npm run build

# 4. Visual testing (dev server)
npm run dev
```

### Checklist Visual:

- [ ] AIMessage: Badge "Z" aparece com glow verde
- [ ] EmptyState: Container 3D com blur pulsante
- [ ] EmptyState: Títulos corretos por módulo
- [ ] EmptyState: Cor dourada no mobile
- [ ] LoadingIndicator: "Zane está pensando..."
- [ ] ReasoningSelector: Popup abre acima
- [ ] ReasoningSelector: Cores soft/medium/max corretas
- [ ] Sources: Dots verdes e glow no hover
- [ ] UserMessage: Shadow sutil visível
- [ ] AttachMenu: Blur backdrop e labels corretos

---

## 📁 Arquivos Modificados

```
src/components/chat/AIMessage.tsx
src/components/chat/EmptyState.tsx
src/components/chat/LoadingIndicator.tsx
src/components/chat/UserMessage.tsx
src/components/selectors/ReasoningSelector.tsx
src/components/selectors/AttachMenu.tsx
```

---

## 🎯 Conclusão

Este plano sintetiza o consenso de 4 agentes em 8 itens de ação com código pronto para implementação. A prioridade é dada aos elementos de identidade visual (Fase 1) que definem a marca Zane, seguidos pelos elementos de UX interativa (Fase 2) e refinamentos finais (Fase 3).

**Tempo Total:** 9-12 horas  
**Impacto:** Alto - Alinhamento completo com design reference
