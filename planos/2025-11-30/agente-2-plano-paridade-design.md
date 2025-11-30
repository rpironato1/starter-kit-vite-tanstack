# Plano de Paridade de Design UI/UX - Agente 2

**Data:** 30 de novembro de 2025  
**Agente:** 2 - Análise de Paridade de Design  
**Repositórios de Referência:**
- `rpironato1/zane-ai` (Repo A)
- `rpironato1/zane-ai-ux-interface` (Repo B)
- `zane-chat-ai` (Workspace atual)

---

## Resumo Executivo

Este plano consolida a análise comparativa entre a implementação atual e os dois repositórios de protótipos, focando **exclusivamente nas semelhanças entre os repos A e B**. Elementos que existem em apenas um repositório foram descartados conforme as regras estabelecidas.

**Paridade Atual Estimada:** ~78%  
**Meta:** 100% de paridade idêntica

---

## 1. ANÁLISE DO ESTADO ATUAL

### 1.1 AIMessage.tsx

**Implementação Atual:**
```tsx
// Badge atual - PILL format
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Formato badge | Pill `rounded-full` | Quadrado `w-5 h-5 rounded-md` | ❌ |
| Conteúdo badge | Texto "Zane AI" | Letra "Z" apenas | ❌ |
| Gradient end | `to-emerald-600` | `to-emerald-900` | ❌ |
| Glow effect | Ausente | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` | ❌ |
| Font badge | `text-xs font-medium` | `font-serif font-bold text-[9px]` | ❌ |
| Label separado | Incluso no pill | `text-[11px] font-bold text-zinc-500 tracking-wider uppercase` | ❌ |
| Sources dot | Ausente | `w-1.5 h-1.5 rounded-full bg-zinc-600` com glow | ❌ |
| Sources bg | `bg-accent-primary/10` | `bg-zinc-900/50` | ❌ |
| ExternalLink | Sempre visível | `opacity-0 group-hover:opacity-100` | ❌ |

**Paridade Atual:** ~40%

---

### 1.2 EmptyState.tsx

**Implementação Atual:**
```tsx
// Ícone direto sem container
<Icon className={`size-16 animate-pulse-glow sm:size-20 ${config.iconClassName ?? "text-text-secondary"}`} strokeWidth={1.5} />

// Título simples
<h1 className="mb-3 font-serif text-2xl text-text-primary sm:text-3xl">{title}</h1>
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Container ícone | Ausente (ícone direto) | `w-20 h-20 bg-[#27272a] rounded-[24px] border border-white/5 shadow-2xl` | ❌ |
| Blur effect | `animate-pulse-glow` no ícone | `absolute inset-0 blur-xl animate-pulse` separado atrás do container | ❌ |
| Ícone size | `size-16 sm:size-20` | `w-8 h-8` dentro do container | ❌ |
| Título Chat | "Como posso ajudar?" | "Como posso te ajudar\nesta noite?" (2 linhas) | ❌ |
| Título Photo | "Crie imagens incríveis" | "Zane Photo Studio" | ❌ |
| Título Doc | "Analise documentos" | "Zane Doc" | ❌ |
| Título Canvas | "Crie artefatos" | "Zane Canvas" | ❌ |
| Título size | `text-2xl sm:text-3xl` | `text-3xl md:text-4xl` | ❌ |
| Título cor mobile | `text-text-primary` | `text-[#eecfa1]` (dourado) | ❌ |

**Paridade Atual:** ~50%

---

### 1.3 LoadingIndicator.tsx

**Implementação Atual:**
```tsx
<motion.div className="flex items-center gap-2 text-text-secondary">
  <Icon className={`size-4 ${isReasoning ? "animate-pulse" : "animate-spin"}`} />
  <span className="text-sm">{displayText}</span>
</motion.div>
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Label "Zane" | Ausente | `<span className="text-accent-primary font-bold text-xs">Zane</span>` | ❌ |
| Texto Chat | "Pensando..." | "Pensando..." | ✅ |
| Texto Photo | Genérico | "Criando sua obra de arte..." | ❌ |
| Texto Doc | Genérico | "Lendo documentos e analisando..." | ❌ |
| Texto Canvas | Genérico | "Estruturando ideias..." | ❌ |

**Paridade Atual:** ~75%

---

### 1.4 UserMessage.tsx

**Implementação Atual:**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Shadow | Ausente | `shadow-sm` | ❌ |
| Border color | `border-border-default` | `border border-white/5` | ⚠️ |
| Padding | `px-4 py-3` | `p-4` | ⚠️ |
| Max-width | `md:max-w-md` | `md:max-w-[65%]` ou `md:max-w-[75%]` | ⚠️ |

**Paridade Atual:** ~85%

---

### 1.5 ReasoningSelector.tsx

**Implementação Atual:**
```tsx
// Dropdown variant com botão trigger
<button onClick={() => setIsOpen(!isOpen)} className={cn(
  "flex items-center gap-2 px-3 py-2 rounded-lg",
  "bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]",
)}>
  <Icon className={cn("size-4", selected.color)} />
  <span className={selected.color}>{selected.label}</span>
  <ChevronDown />
</button>
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Tipo de interação | Dropdown com ChevronDown | Popup menu flutuante bottom-full | ⚠️ |
| Brain flip | Normal | `transform scale-x-[-1]` (espelhado) | ❌ |
| Popup position | `top-full mt-2` | `bottom-full mb-4` | ❌ |
| Popup bg | `bg-[var(--bg-surface)]` | `bg-[#1f1f22]` | ⚠️ |
| Popup border | `border-zinc-700/50` | `border border-zinc-800` | ⚠️ |
| Popup radius | `rounded-xl` | `rounded-2xl` | ⚠️ |
| Header texto | Ausente | "Nível de Raciocínio" uppercase | ❌ |
| Soft color | `text-blue-400` | `text-green-400` | ❌ |
| Medium color | `text-amber-400` | `text-yellow-400` | ⚠️ |
| Max color | `text-red-400` | `text-[#15803d]` (verde escuro) | ❌ |
| Descrições | Simples | Com tokens "(1k/2k/4k tokens)" | ❌ |

**Paridade Atual:** ~60%

---

### 1.6 AttachMenu.tsx

**Implementação Atual:**
```tsx
<motion.div
  className={cn(
    "absolute bottom-full mb-2 left-0 origin-bottom",
    "min-w-[200px] rounded-xl p-1.5",
    "bg-white dark:bg-zinc-800",
    "border border-zinc-200 dark:border-zinc-700",
  )}
>
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Backdrop blur | Ausente | `backdrop-blur-xl` (opcional em alguns views) | ⚠️ |
| Width | `min-w-[200px]` | `w-[220px]` ou específico | ⚠️ |
| Border radius | `rounded-xl` | `rounded-2xl` | ⚠️ |
| Item padding | `px-3 py-2.5 rounded-lg` | `p-3 rounded-xl` | ⚠️ |
| Labels | "Tirar foto", "Escolher da galeria", "Enviar arquivo" | "Câmera", "Fotos", "Arquivos" | ⚠️ |
| Grid layout | Lista vertical | Depende do contexto (grid 3 cols ou lista) | ⚠️ |

**Paridade Atual:** ~70%

---

### 1.7 InputBar.tsx

**Implementação Atual:**
```tsx
<div className="relative bg-bg-surface rounded-[32px] p-2 flex flex-col shadow-lg border border-border-default ring-1 ring-white/5 max-w-3xl mx-auto w-full">
```

**Problemas Identificados:**
| Aspecto | Atual | Esperado (Consenso A+B) | Status |
|---------|-------|-------------------------|--------|
| Container radius | `rounded-[32px]` | `rounded-[32px]` | ✅ |
| Padding | `p-2` | `p-2` | ✅ |
| Ring | `ring-1 ring-white/5` | `ring-1 ring-white/5` | ✅ |
| Shadow | `shadow-lg` | `shadow-lg` ou `shadow-2xl` | ✅ |
| Border | `border-border-default` | `border border-zinc-800` | ⚠️ |
| Brain cycling | Inline cycle | Popup menu (como ReasoningSelector) | ⚠️ |

**Paridade Atual:** ~90%

---

### 1.8 styles.css (Design Tokens)

**Status:** ✅ 100% em paridade

| Token | Atual | Protótipo | Status |
|-------|-------|-----------|--------|
| `--bg-main` | `#18181b` | `#18181b` | ✅ |
| `--bg-sidebar` | `#121212` | `#121212` | ✅ |
| `--bg-surface` | `#27272a` | `#27272a` | ✅ |
| `--bg-modal` | `#1c1c1e` | `#1c1c1e` | ✅ |
| `--bg-hover` | `#2c2c2e` | `#2c2c2e` | ✅ |
| `--accent-primary` | `#246B31` | `#246B31` | ✅ |
| `--accent-textHighlight` | `#eecfa1` | `#eecfa1` | ✅ |
| `--text-primary` | `#e4e4e7` | `#e4e4e7` | ✅ |
| `--text-secondary` | `#a1a1aa` | `#a1a1aa` | ✅ |
| `--border-default` | `#3f3f46` | `#3f3f46` | ✅ |
| `--font-sans` | Inter | Inter | ✅ |
| `--font-serif` | Playfair Display | Playfair Display | ✅ |

---

## 2. COMPARAÇÃO COM PROTÓTIPOS (CONSENSO A+B)

### 2.1 Elementos Idênticos em Ambos Repos

Os seguintes elementos aparecem de forma **idêntica ou muito similar** em ambos os repositórios e devem ser implementados:

#### AI Message Badge
```tsx
// CONSENSO: Ambos repos usam quadrado com "Z"
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

#### Empty State Container 3D
```tsx
// CONSENSO: Ambos repos usam container 3D com blur
<div className="relative mb-6">
  <div className="absolute inset-0 bg-[cor]/20 blur-xl rounded-full animate-pulse" />
  <div className="relative w-20 h-20 bg-[#27272a] rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
    <Icon className="w-8 h-8 text-[cor]" />
  </div>
</div>
<h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] mb-3 text-center">{titulo}</h1>
```

#### Reasoning Selector Popup
```tsx
// CONSENSO: Ambos repos usam popup flutuante com descrições
<div className="absolute bottom-full left-0 mb-4 bg-[#1f1f22] border border-zinc-800 p-1.5 rounded-2xl shadow-xl min-w-[240px] animate-in slide-in-from-bottom-2 z-50">
  <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nível de Raciocínio</div>
  {levels.map((level) => (
    <button className="w-full flex items-start justify-between p-2.5 rounded-xl transition-colors">
      <div className="flex items-start gap-3">
        <Brain className={`w-4 h-4 transform scale-x-[-1] ${level.colorClass}`} />
        <div className="text-left">
          <div className="text-xs font-medium">{level.label}</div>
          <div className="text-[10px] text-zinc-500 leading-tight">{level.desc}</div>
        </div>
      </div>
      {selected && <Check className="w-3 h-3 text-[#246B31]" />}
    </button>
  ))}
</div>
```

#### Loading com Label Zane
```tsx
// CONSENSO: Ambos repos mostram "Zane" antes do spinner
<div className="flex items-center gap-2 text-zinc-400 text-sm">
  <span className="text-[cor-modulo] font-bold text-xs">Zane</span>
  <Loader2 className="w-4 h-4 animate-spin" />
  {textoContextual}
</div>
```

#### Sources Chips com Dot
```tsx
// CONSENSO: Ambos repos usam dot indicator com glow
<a className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 transition-all duration-300">
  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
  <span className="text-xs text-zinc-400 group-hover:text-zinc-200 font-medium truncate max-w-[200px]">{source.title}</span>
  <ExternalLink className="w-3 h-3 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all" />
</a>
```

---

## 3. LISTA DE MODIFICAÇÕES NECESSÁRIAS

### P1 - CRÍTICO (Alta visibilidade, alto impacto)

#### 3.1 AIMessage Badge Redesign
**Arquivo:** `src/components/chat/AIMessage.tsx`  
**Impacto:** Alto - Identidade visual da IA

**Código de Correção:**
```tsx
// REMOVER (linhas ~55-58):
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>

// SUBSTITUIR POR:
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

#### 3.2 EmptyState Container 3D + Títulos
**Arquivo:** `src/components/chat/EmptyState.tsx`  
**Impacto:** Alto - Primeira impressão do usuário

**Código de Correção:**
```tsx
// REMOVER estrutura atual do ícone (linhas ~55-63):
<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mb-6">
  <Icon className={`size-16 animate-pulse-glow sm:size-20 ${config.iconClassName ?? "text-text-secondary"}`} strokeWidth={1.5} />
</motion.div>

// SUBSTITUIR POR:
<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative mb-6">
  {/* Blur effect atrás do container */}
  <div className={`absolute inset-0 ${config.blurColor ?? 'bg-accent-primary/20'} blur-xl rounded-full animate-pulse`} />
  {/* Container 3D */}
  <div className="relative w-20 h-20 bg-bg-surface rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
    <Icon className={`w-8 h-8 ${config.iconClassName ?? 'text-accent-primary'}`} strokeWidth={1.5} />
  </div>
</motion.div>

// ATUALIZAR variantConfigs:
const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
  chat: {
    icon: MessageSquare,
    title: "Como posso te ajudar\nesta noite?",
    subtitle: "Faça uma pergunta para começar",
    iconClassName: "text-accent-primary",
    blurColor: "bg-accent-primary/20",
  },
  photo: {
    icon: Wand2,
    title: "Zane Photo Studio",
    subtitle: "Imagine, descreva e crie. Use o poder da IA para dar vida às suas ideias.",
    iconClassName: "text-accent-primary",
    blurColor: "bg-accent-primary/20",
  },
  doc: {
    icon: BookOpen,
    title: "Zane Doc",
    subtitle: "Faça upload de documentos de texto ou código e converse com eles.",
    iconClassName: "text-blue-500",
    blurColor: "bg-blue-500/10",
  },
  canvas: {
    icon: LayoutGrid,
    title: "Zane Canvas",
    subtitle: "Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.",
    iconClassName: "text-purple-500",
    blurColor: "bg-purple-500/10",
  },
};

// ATUALIZAR título para usar cor dourada e tamanho maior:
<h1 className="mb-3 font-serif text-3xl md:text-4xl text-[#eecfa1] md:text-text-primary text-center whitespace-pre-line">
  {title}
</h1>
```

#### 3.3 ReasoningSelector Popup Menu
**Arquivo:** `src/components/selectors/ReasoningSelector.tsx`  
**Impacto:** Alto - UX de configuração

**Código de Correção:**
```tsx
// ATUALIZAR REASONING_LEVELS com cores corretas:
const REASONING_LEVELS = {
  off: {
    label: "Desativado",
    description: "Raciocínio Desativado",
    color: "text-text-secondary",
    icon: Zap,
  },
  soft: {
    label: "Soft",
    description: "Rápido e direto (1k tokens)",
    color: "text-green-400", // ERA: text-blue-400
    icon: Brain,
  },
  medium: {
    label: "Médio",
    description: "Equilibrado (2k tokens)",
    color: "text-yellow-400", // ERA: text-amber-400
    icon: Brain,
  },
  max: {
    label: "Max",
    description: "Análise profunda (4k tokens)",
    color: "text-[#15803d]", // ERA: text-red-400
    icon: Sparkles,
  },
} as const;

// ADICIONAR transform scale-x-[-1] ao ícone Brain:
<LevelIcon className={cn("size-4 transform scale-x-[-1]", config.color)} />

// ATUALIZAR popup position e styling no DropdownSelector:
<motion.div
  className={cn(
    "absolute bottom-full left-0 mb-4 z-50", // ERA: top-full mt-2
    "min-w-[240px] p-1.5 rounded-2xl", // ERA: min-w-[200px] rounded-xl
    "bg-[#1f1f22] border border-zinc-800", // ERA: bg-[var(--bg-surface)] border-zinc-700/50
    "shadow-xl",
  )}
>
  {/* ADICIONAR header */}
  <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
    Nível de Raciocínio
  </div>
  {/* levels... */}
</motion.div>
```

#### 3.4 LoadingIndicator Label Zane
**Arquivo:** `src/components/chat/LoadingIndicator.tsx`  
**Impacto:** Médio - Feedback visual durante loading

**Código de Correção:**
```tsx
// ADICIONAR prop para variante de módulo:
interface LoadingIndicatorProps {
  variant?: "default" | "reasoning";
  text?: string;
  module?: "chat" | "photo" | "doc" | "canvas"; // NOVO
}

// ADICIONAR mapeamento de textos e cores por módulo:
const moduleConfig = {
  chat: { color: "text-accent-primary", text: "Pensando..." },
  photo: { color: "text-accent-primary", text: "Criando sua obra de arte..." },
  doc: { color: "text-blue-400", text: "Lendo documentos e analisando..." },
  canvas: { color: "text-purple-400", text: "Estruturando ideias..." },
};

// ATUALIZAR render para incluir label "Zane":
export function LoadingIndicator({ variant = "default", text, module = "chat" }: LoadingIndicatorProps) {
  const config = moduleConfig[module];
  const isReasoning = variant === "reasoning";
  const displayText = text ?? (isReasoning ? "Raciocinando..." : config.text);
  const Icon = isReasoning ? Brain : Loader2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 text-text-secondary"
    >
      <span className={cn("font-bold text-xs", config.color)}>Zane</span>
      <Icon className={`size-4 ${isReasoning ? "animate-pulse" : "animate-spin"}`} />
      <span className="text-sm">{displayText}</span>
    </motion.div>
  );
}
```

### P2 - IMPORTANTE (Consistência visual)

#### 3.5 AIMessage Sources Chips
**Arquivo:** `src/components/chat/AIMessage.tsx`  
**Impacto:** Médio - Indicação de fontes

**Código de Correção:**
```tsx
// SUBSTITUIR seção de sources (linhas ~97-110):
{sources && sources.length > 0 && (
  <div className="mt-4 pt-4 border-t border-white/5 w-full">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Fontes Consultadas</span>
      <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
    </div>
    <div className="flex flex-wrap gap-2">
      {sources.map((source, idx) => (
        <a
          key={`source-${source.title}-${idx}`}
          href={source.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 transition-all duration-300 no-underline"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
          <span className="text-xs text-zinc-400 group-hover:text-zinc-200 font-medium truncate max-w-[200px] transition-colors">
            {source.title}
          </span>
          <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all transform group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  </div>
)}
```

#### 3.6 UserMessage Shadow
**Arquivo:** `src/components/chat/UserMessage.tsx`  
**Impacto:** Baixo - Refinamento visual

**Código de Correção:**
```tsx
// ATUALIZAR classes do container (linha ~22):
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface p-4 border border-white/5 shadow-sm">
  {/* conteúdo */}
</div>

// ATUALIZAR max-width (linha ~15):
className="ml-auto max-w-[85%] md:max-w-[65%]"
```

#### 3.7 AttachMenu Melhorias
**Arquivo:** `src/components/selectors/AttachMenu.tsx`  
**Impacto:** Baixo - Consistência de menus

**Código de Correção:**
```tsx
// ATUALIZAR container classes:
<motion.div
  className={cn(
    "absolute bottom-full mb-4 left-0 origin-bottom", // mb-2 → mb-4
    "w-[220px] rounded-2xl p-1.5", // min-w-[200px] rounded-xl → w-[220px] rounded-2xl
    "bg-[#1f1f22] backdrop-blur-xl", // ADICIONAR backdrop-blur
    "border border-zinc-800", // border-zinc-700 → border-zinc-800
    "shadow-xl",
  )}
>

// ATUALIZAR labels dos itens:
const menuItems = [
  { type: "camera", icon: Camera, label: "Câmera" }, // ERA: "Tirar foto"
  { type: "gallery", icon: Image, label: "Fotos" }, // ERA: "Escolher da galeria"
  { type: "files", icon: FileText, label: "Arquivos" }, // ERA: "Enviar arquivo"
  // Remover folder e link se não existirem nos protótipos
];

// ATUALIZAR item classes:
<button
  className={cn(
    "flex w-full items-center gap-3 p-3 rounded-xl", // px-3 py-2.5 rounded-lg → p-3 rounded-xl
    "text-sm text-zinc-200",
    "hover:bg-zinc-800",
    "transition-colors duration-150",
  )}
>
```

### P3 - MELHORIAS (Polish)

#### 3.8 Action Buttons Visibility
**Arquivo:** `src/components/chat/AIMessage.tsx`  
**Impacto:** Baixo - Acessibilidade

**Código de Correção:**
```tsx
// ATUALIZAR visibility dos action buttons (linha ~118):
// ERA: "opacity-0 group-hover:opacity-100"
className="mt-3 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity duration-200"
```

---

## 4. IMPACTO EM DEPENDÊNCIAS

### Arquivos que Importam Componentes Modificados

| Componente | Importado Por | Ação Necessária |
|------------|---------------|-----------------|
| `AIMessage` | `src/routes/index.tsx`, `src/routes/canvas.tsx` | Nenhuma (interface mantida) |
| `EmptyState` | `src/routes/index.tsx`, `src/routes/photo.tsx`, `src/routes/doc.tsx`, `src/routes/canvas.tsx` | Verificar prop `variant` |
| `LoadingIndicator` | `src/routes/index.tsx`, `src/routes/photo.tsx`, `src/routes/doc.tsx`, `src/routes/canvas.tsx` | Adicionar prop `module` nos calls |
| `UserMessage` | `src/routes/index.tsx` | Nenhuma (interface mantida) |
| `ReasoningSelector` | `src/components/layout/InputBar.tsx` | Verificar integração popup |
| `AttachMenu` | `src/components/layout/InputBar.tsx` | Nenhuma (interface mantida) |

### Estilos CSS Afetados

| Modificação | Arquivo CSS | Ação |
|-------------|-------------|------|
| Shadow glow AI badge | `src/styles.css` | Nenhuma (usa Tailwind arbitrary) |
| Container blur | `src/styles.css` | Nenhuma (usa Tailwind animate-pulse) |
| Cores reasoning | `src/styles.css` | Nenhuma (usa Tailwind colors) |

---

## 5. ORDEM DE IMPLEMENTAÇÃO

### Fase 1 - Identidade Visual (2-4h)
1. ✅ `AIMessage.tsx` - Badge quadrado com "Z" + glow
2. ✅ `EmptyState.tsx` - Container 3D + blur + títulos
3. ✅ `LoadingIndicator.tsx` - Label "Zane" + textos contextuais

### Fase 2 - UX de Interação (3-5h)
4. ⏳ `ReasoningSelector.tsx` - Popup menu + cores + flip icon
5. ⏳ `AIMessage.tsx` - Sources chips com dot indicator

### Fase 3 - Refinamentos (1-2h)
6. ⏳ `UserMessage.tsx` - Shadow + border
7. ⏳ `AttachMenu.tsx` - Labels + blur + radius
8. ⏳ `AIMessage.tsx` - Action buttons visibility

---

## 6. VALIDAÇÃO DE PARIDADE

### Checklist Pós-Implementação

- [ ] Badge Zane AI é quadrado 20x20 com letra "Z" em serif bold
- [ ] Badge tem gradient `from-accent-primary to-emerald-900`
- [ ] Badge tem glow verde `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- [ ] Label "ZANE AI" está separado em uppercase tracking-wider
- [ ] Empty states têm container 3D 80x80 com `rounded-[24px]`
- [ ] Container tem blur pulsante atrás
- [ ] Container tem `shadow-2xl` e `border border-white/5`
- [ ] Ícone dentro do container é 32x32
- [ ] Título empty state é dourado `text-[#eecfa1]` no mobile
- [ ] Título usa `text-3xl md:text-4xl font-serif`
- [ ] Chat diz "Como posso te ajudar\nesta noite?"
- [ ] Photo diz "Zane Photo Studio"
- [ ] Doc diz "Zane Doc"
- [ ] Canvas diz "Zane Canvas"
- [ ] LoadingIndicator mostra "Zane" em cor do módulo antes do spinner
- [ ] Textos de loading são contextuais por módulo
- [ ] ReasoningSelector abre popup `bottom-full mb-4`
- [ ] Popup tem header "Nível de Raciocínio" uppercase
- [ ] Brain icon está espelhado `transform scale-x-[-1]`
- [ ] Cores: soft=green-400, medium=yellow-400, max=#15803d
- [ ] Sources têm dot 6x6 com glow verde no hover
- [ ] Sources background é `bg-zinc-900/50`
- [ ] ExternalLink aparece apenas no hover com transition
- [ ] UserMessage tem `shadow-sm` e `border-white/5`

---

## 7. ESTIMATIVA DE ESFORÇO

| Item | Complexidade | Tempo Estimado |
|------|--------------|----------------|
| AI Badge redesign | Baixa | 30min |
| Empty State container 3D | Média | 1-2h |
| Empty State textos | Baixa | 30min |
| Reasoning popup | Média-Alta | 2-3h |
| Loading label Zane | Baixa | 30min |
| Sources chips | Média | 1h |
| User message shadow | Baixa | 15min |
| Attach menu ajustes | Baixa | 30min |
| **TOTAL** | - | **6-9h** |

---

## 8. RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Breaking changes em interfaces | Baixa | Alto | Manter assinaturas de props |
| Inconsistência entre dark/light mode | Média | Médio | Testar ambos temas |
| Performance do blur effect | Baixa | Baixo | Usar GPU-accelerated transforms |
| Acessibilidade do popup | Média | Médio | Adicionar aria-labels e keyboard nav |

---

*Plano gerado pelo Agente 2 - Análise de Paridade de Design*  
*Baseado na comparação com repos rpironato1/zane-ai e rpironato1/zane-ai-ux-interface*  
*Focado exclusivamente em elementos com consenso entre ambos repositórios*
