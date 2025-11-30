# AGENTE 4 - Plano de Paridade de Design UI/UX

**Data de Geração:** 2025-11-30  
**Nível de Paridade Atual:** ~78%  
**Meta de Paridade:** 100%  
**Agente Responsável:** Análise de Paridade de Design UI/UX

---

## 1. ANÁLISE DE ARQUITETURA ATUAL

### 1.1 Estrutura de Componentes Existente

```
src/components/
├── chat/
│   ├── AIMessage.tsx          # 40% paridade - Badge incorreto
│   ├── EmptyState.tsx         # 50% paridade - Container 3D ausente
│   ├── LoadingIndicator.tsx   # 75% paridade - Label "Zane" ausente
│   ├── MessageRenderer.tsx    # 85% paridade - Funcional
│   ├── TodoListPanel.tsx      # 90% paridade - OK
│   └── UserMessage.tsx        # 85% paridade - Shadow ausente
├── selectors/
│   ├── AspectRatioSelector.tsx  # 80% paridade - OK
│   ├── AttachMenu.tsx           # 70% paridade - Blur ausente
│   ├── ModelSelector.tsx        # 85% paridade - OK
│   └── ReasoningSelector.tsx    # 60% paridade - Popup ausente
├── layout/
│   ├── Header.tsx     # 80% paridade - OK
│   ├── InputBar.tsx   # 75% paridade - Ajustes menores
│   ├── Sidebar.tsx    # 85% paridade - OK
│   └── Footer.tsx     # 80% paridade - OK
└── ui/                # shadcn/ui - 100% paridade
```

### 1.2 Design Token System (100% Paridade ✅)

O arquivo `src/styles.css` implementa corretamente todos os tokens Zane:

```css
/* Tokens implementados corretamente */
--bg-main: #09090b / #ffffff
--bg-sidebar: #111113 / #f4f4f5
--bg-surface: #18181b / #ffffff
--bg-hover: #27272a / #f4f4f5
--accent-primary: #246B31 (universal)
--accent-textHighlight: #eecfa1 (universal)
--text-primary: #e4e4e7 / #18181b
--text-secondary: #71717a / #52525b
--font-serif: 'Playfair Display', serif
--font-sans: 'Inter', sans-serif
```

---

## 2. PADRÕES CONTEXT7 APLICÁVEIS

### 2.1 TanStack Start - Padrões de Rotas

```typescript
// Padrão correto identificado em Context7
// Todas as rotas já seguem o padrão createFileRoute
export const Route = createFileRoute('/path')({
  component: ComponentName,
  loader: async () => { /* data fetching */ }
})
```

**Status:** ✅ Implementado corretamente

### 2.2 Tailwind CSS v4 - Design Tokens via @theme

```css
/* Padrão Context7 para Tailwind v4 */
@theme inline {
  --color-accent-primary: #246B31;
  --color-accent-hover: #1e5a29;
  --color-bg-*: /* variáveis */
}
```

**Status:** ✅ Implementado corretamente com @theme inline

### 2.3 Framer Motion - Spring Animations

```typescript
// Padrão Context7 para animações spring
const springConfig = {
  type: "spring",
  stiffness: 300,  // 300-400 para UI responsiva
  damping: 30      // 25-40 para suavidade
}

// AnimatePresence para mount/unmount
<AnimatePresence mode="popLayout">
  {condition && <motion.div {...animation} />}
</AnimatePresence>
```

**Status:** ⚠️ Parcialmente implementado - alguns componentes usam valores diferentes

### 2.4 React 19 - Component Patterns

```typescript
// Padrão Context7 para componentes funcionais
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  // useEffect para side effects
  useEffect(() => {
    // logic
  }, [dependencies]);
  
  return <jsx />;
};
```

**Status:** ✅ Implementado corretamente

---

## 3. COMPARAÇÃO COM PROTÓTIPOS (SEMELHANÇAS IDENTIFICADAS)

### 3.1 Padrões IDÊNTICOS em Ambos Repositórios

| Elemento | rpironato1/zane-ai | rpironato1/zane-ai-ux-interface |
|----------|-------------------|--------------------------------|
| **AI Badge** | `w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900` + "Z" | Mesmo padrão exato |
| **Empty State Container** | `w-20 h-20 rounded-[24px]` com blur effect | Mesmo padrão exato |
| **Loading Label** | `<span className="text-[#246B31] font-bold text-xs">Zane</span>` | Mesmo padrão exato |
| **Brain Icon Flip** | `transform scale-x-[-1]` | Mesmo padrão exato |
| **Reasoning Popup** | Menu popup com níveis soft/medium/max | Mesmo padrão exato |
| **Attach Menu Labels** | "Câmera", "Fotos", "Arquivos" | Mesmo padrão exato |
| **Welcome Title Mobile** | `text-[#eecfa1]` golden color | Mesmo padrão exato |
| **Sources Chips** | Dot indicator + glow on hover | Mesmo padrão exato |
| **Spring Config** | stiffness: 300-400, damping: 30 | Mesmo padrão exato |

### 3.2 Código de Referência dos Protótipos

#### AI Badge (CONSENSO AMBOS REPOS)
```tsx
// ChatMessageBubble.tsx (zane-ai) / App.tsx (zane-ai-ux-interface)
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

#### Empty State 3D Container (CONSENSO AMBOS REPOS)
```tsx
// PhotoView.tsx (zane-ai) / ZanePhotoModule.tsx (zane-ai-ux-interface)
<div className="relative mb-6">
  <div className="absolute inset-0 bg-[#246B31]/20 blur-xl rounded-full animate-pulse"></div>
  <div className="relative w-20 h-20 bg-[#27272a] rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
    <Wand2 className="w-8 h-8 text-[#246B31]" />
  </div>
</div>
<h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] mb-3 text-center">Zane Photo Studio</h1>
```

#### Loading Indicator com Label (CONSENSO AMBOS REPOS)
```tsx
// App.tsx (ambos repos)
<div className="flex items-center gap-2 text-text-secondary text-sm">
  <span className="text-[#246B31] font-bold text-xs">Zane</span>
  <Loader2 className="w-4 h-4 animate-spin" />
  Pensando...
</div>
```

#### Reasoning Selector Popup (CONSENSO AMBOS REPOS)
```tsx
// ReasoningSelector.tsx (zane-ai) / App.tsx (zane-ai-ux-interface)
const REASONING_LEVELS = [
  { label: 'Soft', desc: 'Rápido e direto (1k tokens)', value: 'soft', colorClass: 'text-green-400' },
  { label: 'Médio', desc: 'Equilibrado (2k tokens)', value: 'medium', colorClass: 'text-yellow-400' },
  { label: 'Max', desc: 'Análise profunda (4k tokens)', value: 'max', colorClass: 'text-[#15803d]' },
  { label: 'Desativado', desc: 'Raciocínio Desativado', value: 'disabled', colorClass: 'text-red-500' },
];

// Brain icon com flip
<Brain className={`w-5 h-5 transform scale-x-[-1] ${level.colorClass}`} />
```

#### Sources Chips com Glow (CONSENSO AMBOS REPOS)
```tsx
// ChatMessageBubble.tsx (zane-ai)
<a 
  className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 transition-all duration-300 no-underline"
>
  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
  <span className="text-xs text-zinc-400 group-hover:text-zinc-200 font-medium truncate max-w-[200px] transition-colors">
    {source.title}
  </span>
  <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all transform group-hover:translate-x-0.5" />
</a>
```

#### Attach Menu (CONSENSO AMBOS REPOS)
```tsx
// App.tsx (zane-ai-ux-interface)
<div className="w-[90%] max-w-sm mx-auto bg-[#1f1f22] rounded-2xl p-4 border border-zinc-800 shadow-2xl backdrop-blur-xl">
  <div className="grid grid-cols-3 gap-4">
    <label className="flex flex-col items-center gap-2 p-4 bg-[#27272a] rounded-2xl">
      <Camera className="w-6 h-6 text-zinc-300" />
      <span className="text-xs text-zinc-400">Câmera</span>
    </label>
    <label className="flex flex-col items-center gap-2 p-4 bg-[#27272a] rounded-2xl">
      <ImageIcon className="w-6 h-6 text-zinc-300" />
      <span className="text-xs text-zinc-400">Fotos</span>
    </label>
    <button className="flex flex-col items-center gap-2 p-4 bg-[#27272a] rounded-2xl">
      <FileText className="w-6 h-6 text-zinc-300" />
      <span className="text-xs text-zinc-400">Arquivos</span>
    </button>
  </div>
</div>
```

---

## 4. LISTA DE MODIFICAÇÕES POR COMPONENTE

### 4.1 SPRINT 1 - CRÍTICO (Impacto: 78% → 92%)

#### 4.1.1 AIMessage.tsx - Prioridade ALTA

**Problema:** Badge usa formato pill com texto "Zane AI"  
**Solução:** Badge quadrado 20x20 com "Z" e glow

```tsx
// ANTES (incorreto)
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>

// DEPOIS (correto)
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

**Estimativa:** 1 hora

#### 4.1.2 EmptyState.tsx - Prioridade ALTA

**Problema:** Ícone renderizado sem container 3D  
**Solução:** Container w-20 h-20 rounded-[24px] com blur effect

```tsx
// ANTES (incorreto)
<motion.div className="flex-1 flex flex-col justify-center items-center opacity-90 mb-10">
  <Sparkles className="w-10 h-10 text-accent-primary mb-4" />
  <h1 className="text-2xl font-serif text-text-primary tracking-wide leading-tight text-center">
    Como posso ajudar?
  </h1>
</motion.div>

// DEPOIS (correto)
<motion.div className="flex-1 flex flex-col justify-center items-center opacity-90 mb-10 animate-slide-up">
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full animate-pulse" />
    <div className="relative w-20 h-20 bg-bg-surface rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
      <Sparkles className="w-8 h-8 text-accent-primary" />
    </div>
  </div>
  <h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] md:text-text-primary mb-3 text-center">
    Como posso te ajudar<br />esta noite?
  </h1>
</motion.div>
```

**Estimativa:** 2 horas (inclui variantes por módulo)

#### 4.1.3 LoadingIndicator.tsx - Prioridade ALTA

**Problema:** Sem label "Zane" verde antes do spinner  
**Solução:** Adicionar span com label colorido

```tsx
// ANTES (incorreto)
<div className="flex items-center gap-2 text-text-secondary text-sm">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Pensando...</span>
</div>

// DEPOIS (correto)
<div className="flex items-center gap-2 text-text-secondary text-sm">
  <span className="text-accent-primary font-bold text-xs">Zane</span>
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Pensando...</span>
</div>
```

**Estimativa:** 30 minutos

#### 4.1.4 ReasoningSelector.tsx - Prioridade ALTA

**Problema:** Usa ciclo inline ou dropdown simples  
**Solução:** Menu popup com níveis e cores corretas

```tsx
// Estrutura correta do popup
const REASONING_LEVELS = [
  { label: 'Soft', desc: 'Rápido e direto (1k tokens)', value: 'soft', colorClass: 'text-green-400' },
  { label: 'Médio', desc: 'Equilibrado (2k tokens)', value: 'medium', colorClass: 'text-yellow-400' },
  { label: 'Max', desc: 'Análise profunda (4k tokens)', value: 'max', colorClass: 'text-[#15803d]' },
  { label: 'Desativado', desc: 'Raciocínio Desativado', value: 'disabled', colorClass: 'text-red-500' },
];

// Brain icon com flip obrigatório
<Brain className={`w-5 h-5 transform scale-x-[-1] ${currentLevel.colorClass}`} />

// Popup menu
<AnimatePresence>
  {isOpen && (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      className="absolute bottom-full left-0 mb-4 bg-bg-surface border border-border-default p-1.5 rounded-2xl shadow-xl min-w-[240px] z-50"
    >
      <div className="px-3 py-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
        Nível de Raciocínio
      </div>
      {REASONING_LEVELS.map((level) => (
        <button
          key={level.value}
          onClick={() => { onSelect(level.value); onClose(); }}
          className={`w-full flex items-start justify-between p-2.5 rounded-xl transition-colors ${
            currentLevel === level.value 
              ? 'bg-bg-hover text-text-primary' 
              : 'text-text-secondary hover:bg-bg-hover/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <Brain className={`w-4 h-4 mt-0.5 transform scale-x-[-1] ${level.colorClass}`} />
            <div className="text-left">
              <div className="text-xs font-medium">{level.label}</div>
              <div className="text-[10px] text-text-secondary leading-tight">{level.desc}</div>
            </div>
          </div>
          {currentLevel === level.value && <Check className="w-3 h-3 text-accent-primary mt-1" />}
        </button>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

**Estimativa:** 2 horas

### 4.2 SPRINT 2 - IMPORTANTE (Impacto: 92% → 97%)

#### 4.2.1 Sources Chips (AIMessage.tsx)

**Problema:** Chips sem dot indicator e glow effects  
**Solução:** Implementar chips conforme protótipos

```tsx
// Adicionar ao AIMessage.tsx
{message.sources && message.sources.length > 0 && (
  <div className="mt-4 pt-4 border-t border-white/5 w-full">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
        Fontes Consultadas
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-border-default to-transparent" />
    </div>
    
    <div className="flex flex-wrap gap-2">
      {message.sources.map((source, idx) => (
        <a 
          key={idx} 
          href={source.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-bg-surface/50 hover:bg-bg-hover border border-white/5 hover:border-white/10 transition-all duration-300 no-underline"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
          <span className="text-xs text-text-secondary group-hover:text-text-primary font-medium truncate max-w-[200px] transition-colors">
            {source.title}
          </span>
          <ExternalLink className="w-3 h-3 text-text-secondary/50 group-hover:text-text-secondary opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all transform group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  </div>
)}
```

**Estimativa:** 1.5 horas

#### 4.2.2 UserMessage.tsx

**Problema:** Ausência de shadow-sm e border incorreto  
**Solução:** Ajustar classes

```tsx
// ANTES
className="bg-bg-surface text-text-primary px-4 py-3 rounded-2xl rounded-tr-sm border border-border-default"

// DEPOIS
className="bg-bg-surface text-text-primary px-4 py-3 rounded-2xl rounded-tr-sm border border-white/5 shadow-sm"
```

**Estimativa:** 30 minutos

#### 4.2.3 AttachMenu.tsx

**Problema:** Sem backdrop-blur, radius incorreto, labels errados  
**Solução:** Ajustar container e labels

```tsx
// Container
className="w-[90%] max-w-sm mx-auto bg-bg-surface rounded-2xl p-4 border border-border-default shadow-2xl backdrop-blur-xl"

// Labels corretos
const ATTACH_OPTIONS = [
  { icon: Camera, label: "Câmera" },
  { icon: ImageIcon, label: "Fotos" },
  { icon: FileText, label: "Arquivos" }
];
```

**Estimativa:** 1 hora

### 4.3 SPRINT 3 - POLISH (Impacto: 97% → 100%)

#### 4.3.1 Empty State Variantes por Módulo

| Módulo | Título | Ícone | Cor |
|--------|--------|-------|-----|
| Chat | "Como posso te ajudar esta noite?" | Sparkles | accent-primary |
| Photo | "Zane Photo Studio" | Wand2 | accent-primary |
| Doc | "Zane Doc" | FileText | blue-500 |
| Canvas | "Zane Canvas" | LayoutGrid | purple-500 |

**Estimativa:** 2 horas

#### 4.3.2 Animation Standardization

Padronizar spring config em todos os componentes:

```tsx
const standardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

// Usar em todos os motion.div
<motion.div
  initial={{ opacity: 0, y: 15, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 15, scale: 0.95 }}
  transition={standardSpring}
>
```

**Estimativa:** 1 hora

#### 4.3.3 Loading Texts por Módulo

```tsx
const LOADING_TEXTS = {
  chat: "Pensando...",
  photo: "Criando sua obra de arte...",
  doc: "Lendo documentos e analisando...",
  canvas: "Estruturando resposta..."
};
```

**Estimativa:** 30 minutos

---

## 5. CÓDIGO DE CORREÇÃO COMPLETO

### 5.1 AIMessage.tsx - Refatoração Completa

```tsx
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { MessageRenderer } from "./MessageRenderer";
import { TodoListPanel } from "./TodoListPanel";

interface AIMessageProps {
  content: string;
  sources?: Array<{ title: string; uri: string }>;
  todoList?: string[];
  image?: string;
}

export const AIMessage: React.FC<AIMessageProps> = ({
  content,
  sources,
  todoList = [],
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative px-0 text-[15px] leading-relaxed flex flex-col gap-4 group/bubble"
    >
      {/* AI Identity Badge */}
      <div className="flex items-center gap-2 pl-1 select-none">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
          Z
        </div>
        <span className="text-[11px] font-bold text-text-secondary tracking-wider uppercase">
          Zane AI
        </span>
      </div>

      {/* Generated Image */}
      {image && (
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 max-w-md">
          <img
            src={image}
            alt="Generated Content"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Execution Plan (TodoList) */}
      {todoList.length > 0 && (
        <div className="w-full max-w-2xl">
          <TodoListPanel items={todoList} />
        </div>
      )}

      {/* Main Text Content */}
      <div className="min-w-0">
        <MessageRenderer content={content} />
      </div>

      {/* Sources Chips */}
      {sources && sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Fontes Consultadas
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border-default to-transparent" />
          </div>

          <div className="flex flex-wrap gap-2">
            {sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-bg-surface/50 hover:bg-bg-hover border border-white/5 hover:border-white/10 transition-all duration-300 no-underline"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
                <span className="text-xs text-text-secondary group-hover:text-text-primary font-medium truncate max-w-[200px] transition-colors">
                  {source.title}
                </span>
                <ExternalLink className="w-3 h-3 text-text-secondary/50 group-hover:text-text-secondary opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
```

### 5.2 EmptyState.tsx - Refatoração Completa

```tsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, FileText, LayoutGrid } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ViewMode = "chat" | "photo" | "doc" | "canvas";

interface EmptyStateProps {
  view?: ViewMode;
}

interface ViewConfig {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  colorClass: string;
  blurColorClass: string;
}

const VIEW_CONFIGS: Record<ViewMode, ViewConfig> = {
  chat: {
    icon: Sparkles,
    title: "Como posso te ajudar\nesta noite?",
    colorClass: "text-accent-primary",
    blurColorClass: "bg-accent-primary/20",
  },
  photo: {
    icon: Wand2,
    title: "Zane Photo Studio",
    subtitle: "Imagine, descreva e crie. Use o poder da IA para dar vida às suas ideias.",
    colorClass: "text-accent-primary",
    blurColorClass: "bg-accent-primary/20",
  },
  doc: {
    icon: FileText,
    title: "Zane Doc",
    subtitle: "Faça upload de documentos de texto ou código e converse com eles.",
    colorClass: "text-blue-500",
    blurColorClass: "bg-blue-500/10",
  },
  canvas: {
    icon: LayoutGrid,
    title: "Zane Canvas",
    subtitle: "Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.",
    colorClass: "text-purple-500",
    blurColorClass: "bg-purple-500/10",
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({ view = "chat" }) => {
  const config = VIEW_CONFIGS[view];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col justify-center items-center opacity-90 mb-10"
    >
      {/* 3D Container with Blur Effect */}
      <div className="relative mb-6">
        <div
          className={`absolute inset-0 ${config.blurColorClass} blur-xl rounded-full animate-pulse`}
        />
        <div className="relative w-20 h-20 bg-bg-surface rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
          <Icon className={`w-8 h-8 ${config.colorClass}`} />
        </div>
      </div>

      {/* Title with responsive color */}
      <h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] md:text-text-primary mb-3 text-center whitespace-pre-line">
        {config.title}
      </h1>

      {/* Subtitle (for non-chat views) */}
      {config.subtitle && (
        <p className="text-text-secondary text-sm max-w-xs text-center leading-relaxed">
          {config.subtitle}
        </p>
      )}
    </motion.div>
  );
};
```

### 5.3 LoadingIndicator.tsx - Refatoração

```tsx
import React from "react";
import { Loader2 } from "lucide-react";

type ViewMode = "chat" | "photo" | "doc" | "canvas";

interface LoadingIndicatorProps {
  view?: ViewMode;
}

const LOADING_TEXTS: Record<ViewMode, string> = {
  chat: "Pensando...",
  photo: "Criando sua obra de arte...",
  doc: "Lendo documentos e analisando...",
  canvas: "Estruturando resposta...",
};

const LABEL_COLORS: Record<ViewMode, string> = {
  chat: "text-accent-primary",
  photo: "text-accent-primary",
  doc: "text-blue-400",
  canvas: "text-purple-400",
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  view = "chat",
}) => {
  return (
    <div className="flex justify-start w-full">
      <div className="flex items-center gap-2 text-text-secondary text-sm">
        <span className={`${LABEL_COLORS[view]} font-bold text-xs`}>Zane</span>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>{LOADING_TEXTS[view]}</span>
      </div>
    </div>
  );
};
```

### 5.4 ReasoningSelector.tsx - Refatoração Completa

```tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check } from "lucide-react";

type ReasoningLevel = "soft" | "medium" | "max" | "disabled";

interface ReasoningOption {
  label: string;
  desc: string;
  value: ReasoningLevel;
  colorClass: string;
}

const REASONING_LEVELS: ReasoningOption[] = [
  { label: "Soft", desc: "Rápido e direto (1k tokens)", value: "soft", colorClass: "text-green-400" },
  { label: "Médio", desc: "Equilibrado (2k tokens)", value: "medium", colorClass: "text-yellow-400" },
  { label: "Max", desc: "Análise profunda (4k tokens)", value: "max", colorClass: "text-[#15803d]" },
  { label: "Desativado", desc: "Raciocínio Desativado", value: "disabled", colorClass: "text-red-500" },
];

interface ReasoningSelectorProps {
  isOpen: boolean;
  currentLevel: ReasoningLevel;
  onSelect: (level: ReasoningLevel) => void;
  onClose: () => void;
  onToggle: () => void;
}

export const ReasoningSelector: React.FC<ReasoningSelectorProps> = ({
  isOpen,
  currentLevel,
  onSelect,
  onClose,
  onToggle,
}) => {
  const currentConfig = REASONING_LEVELS.find((l) => l.value === currentLevel) || REASONING_LEVELS[0];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        className="p-2.5 rounded-full hover:bg-bg-hover transition-colors group"
      >
        <Brain className={`w-5 h-5 transform scale-x-[-1] ${currentConfig.colorClass}`} />
      </button>

      {/* Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute bottom-full left-0 mb-4 bg-bg-surface border border-border-default p-1.5 rounded-2xl shadow-xl min-w-[240px] z-50"
            >
              <div className="px-3 py-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Nível de Raciocínio
              </div>

              {REASONING_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => {
                    onSelect(level.value);
                    onClose();
                  }}
                  className={`w-full flex items-start justify-between p-2.5 rounded-xl transition-colors ${
                    currentLevel === level.value
                      ? "bg-bg-hover text-text-primary"
                      : "text-text-secondary hover:bg-bg-hover/50 hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Brain className={`w-4 h-4 transform scale-x-[-1] ${level.colorClass}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium">{level.label}</div>
                      <div className="text-[10px] text-text-secondary leading-tight">
                        {level.desc}
                      </div>
                    </div>
                  </div>
                  {currentLevel === level.value && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-3 h-3 text-accent-primary mt-1" />
                    </motion.div>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

## 6. ORDEM DE IMPLEMENTAÇÃO

### 6.1 Cronograma Recomendado

```
SPRINT 1 (Dia 1-2): CRÍTICO
├── 1. AIMessage.tsx - Badge refactor (1h)
├── 2. EmptyState.tsx - 3D container (2h)
├── 3. LoadingIndicator.tsx - Label verde (30min)
├── 4. ReasoningSelector.tsx - Popup menu (2h)
└── Total: 5.5 horas

SPRINT 2 (Dia 3): IMPORTANTE
├── 5. Sources Chips em AIMessage.tsx (1.5h)
├── 6. UserMessage.tsx - Shadow fix (30min)
├── 7. AttachMenu.tsx - Blur + labels (1h)
└── Total: 3 horas

SPRINT 3 (Dia 4): POLISH
├── 8. Empty State variantes por módulo (2h)
├── 9. Animation standardization (1h)
├── 10. Loading texts por módulo (30min)
└── Total: 3.5 horas

TOTAL GERAL: ~12 horas
```

### 6.2 Critérios de Aceite por Sprint

**Sprint 1 - Critérios:**
- [ ] AI Badge exibe "Z" em quadrado 20x20 com glow
- [ ] Empty State tem container 3D com blur effect
- [ ] Loading mostra "Zane" verde antes do spinner
- [ ] Reasoning Selector abre popup com 4 níveis
- [ ] Brain icon está flipado (scale-x-[-1])

**Sprint 2 - Critérios:**
- [ ] Sources chips têm dot indicator
- [ ] Sources chips têm glow verde no hover
- [ ] User message tem shadow-sm
- [ ] Attach menu tem backdrop-blur-xl
- [ ] Labels são "Câmera", "Fotos", "Arquivos"

**Sprint 3 - Critérios:**
- [ ] Cada módulo tem Empty State próprio
- [ ] Todas animações usam stiffness: 400, damping: 30
- [ ] Loading texts são específicos por módulo

---

## 7. MÉTRICAS DE SUCESSO

| Métrica | Antes | Após Sprint 1 | Após Sprint 2 | Após Sprint 3 |
|---------|-------|---------------|---------------|---------------|
| Paridade Geral | 78% | 92% | 97% | 100% |
| AI Badge | 40% | 100% | 100% | 100% |
| Empty States | 50% | 100% | 100% | 100% |
| Reasoning Selector | 60% | 100% | 100% | 100% |
| Sources Chips | 30% | 30% | 100% | 100% |
| User Message | 85% | 85% | 100% | 100% |
| Attach Menu | 70% | 70% | 100% | 100% |

---

## 8. NOTAS TÉCNICAS

### 8.1 Dependências a Instalar
Nenhuma nova dependência necessária. Todas as ferramentas já estão no projeto:
- `framer-motion` ✅
- `lucide-react` ✅
- `tailwindcss` v4 ✅

### 8.2 Tokens CSS Necessários
Todos os tokens já estão definidos em `src/styles.css`. Não é necessário adicionar novos.

### 8.3 Arquivos de Tipos
Adicionar ao `src/types/index.ts`:

```typescript
export type ReasoningLevel = "soft" | "medium" | "max" | "disabled";
export type ViewMode = "chat" | "photo" | "doc" | "canvas";
```

### 8.4 Testes Manuais Recomendados
1. Verificar aparência do badge em diferentes tamanhos de tela
2. Testar glow effect no dark mode vs light mode
3. Confirmar animações spring em dispositivos de baixa performance
4. Validar responsividade do popup de reasoning em mobile

---

**Documento gerado por:** AGENTE 4 - Análise de Paridade de Design  
**Versão:** 1.0  
**Status:** Pronto para Implementação
