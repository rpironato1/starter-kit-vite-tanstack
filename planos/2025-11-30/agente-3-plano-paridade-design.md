# Plano de Paridade de Design UI/UX - Agente 3

**Data:** 30 de novembro de 2025  
**Agente:** 3 - Análise de Paridade de Design  
**Repositórios de Referência:**
- `rpironato1/zane-ai`
- `rpironato1/zane-ai-ux-interface`

---

## 1. BEST PRACTICES DE CONTEXT7 APLICÁVEIS

### 1.1 Tailwind CSS v3 - Design Tokens

**Padrões identificados:**
```javascript
// Configuração de tema estendido para design tokens
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
```

**Aplicação no projeto:**
- Usar `theme()` function para acessar valores de design tokens
- Utilizar variantes responsivas como `md:text-4xl`
- Aplicar valores arbitrários com `[]` quando necessário: `rounded-[24px]`, `text-[9px]`

### 1.2 Framer Motion - Animações Spring

**Padrões identificados:**
```jsx
// Spring animation com visualDuration
<motion.div
  animate={{ rotateX: 90 }}
  transition={{
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25
  }}
/>

// AnimatePresence com LayoutGroup
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
      {items.map(item => (
        <motion.li layout key={item.id} />
      ))}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>

// Variantes para exit animations
const modalVariants = {
  visible: { opacity: 1, transition: { when: "beforeChildren" } },
  hidden: { opacity: 0, transition: { when: "afterChildren" } }
}
```

**Aplicação no projeto:**
- Usar `spring` transitions com `stiffness: 400, damping: 40` para Sidebar
- Implementar `AnimatePresence` para popups/menus
- CSS fallback para browsers sem suporte a `linear()`

### 1.3 shadcn/ui - Padrões de Componentes

**Padrões identificados:**
```tsx
// DropdownMenu com Dialog
<DropdownMenu modal={false}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="start">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>Profile</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Aplicação no projeto:**
- Usar `modal={false}` para permitir dialogs dentro de dropdowns
- Padrão `asChild` para composição
- Separadores e grupos para organização visual

### 1.4 React - Composição de Componentes

**Padrões identificados:**
```javascript
// Evitar factory patterns que criam componentes dinamicamente
// ❌ Factory function creating components  
function createComponent(defaultValue) {  
  return function Component() { /* ... */ };  
}

// ✅ Componente estático com props
function Component({ defaultValue }) {
  return /* ... */;
}

// Custom hooks para reutilização de lógica
export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}
```

**Aplicação no projeto:**
- Criar componentes puros e reutilizáveis
- Extrair lógica em custom hooks
- Evitar mutação de estado global

---

## 2. LISTA DE COMPONENTES A MODIFICAR

### Prioridade CRÍTICA (P1)

| # | Componente | Arquivo | Paridade Atual | Meta |
|---|------------|---------|----------------|------|
| 1 | AI Message Badge | `src/components/chat/AIMessage.tsx` | 40% | 100% |
| 2 | EmptyState Container | `src/components/chat/EmptyState.tsx` | 50% | 100% |
| 3 | LoadingIndicator | `src/components/chat/LoadingIndicator.tsx` | 75% | 100% |
| 4 | ReasoningSelector | `src/components/selectors/ReasoningSelector.tsx` | 60% | 100% |

### Prioridade ALTA (P2)

| # | Componente | Arquivo | Paridade Atual | Meta |
|---|------------|---------|----------------|------|
| 5 | Sources Chips | `src/components/chat/AIMessage.tsx` | 30% | 100% |
| 6 | UserMessage | `src/components/chat/UserMessage.tsx` | 85% | 100% |
| 7 | AttachMenu | `src/components/selectors/AttachMenu.tsx` | 70% | 100% |

---

## 3. CORREÇÕES DETALHADAS COM PADRÕES CONTEXT7

### 3.1 🔴 AI Message Badge - CRÍTICO

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Pill `rounded-full px-3 py-1` com texto "Zane AI"
- Protótipo: Quadrado `w-5 h-5 rounded-md` com letra "Z" + label separado

**Código Atual:**
```tsx
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>
```

**Código Correto (Padrão Protótipos):**
```tsx
// Componente ZaneBadge seguindo padrões shadcn/ui
interface ZaneBadgeProps {
  variant?: 'default' | 'photo' | 'doc' | 'canvas';
  showLabel?: boolean;
}

export function ZaneBadge({ variant = 'default', showLabel = true }: ZaneBadgeProps) {
  const colorClasses = {
    default: 'from-accent-primary to-emerald-900',
    photo: 'from-accent-primary to-emerald-900', 
    doc: 'from-blue-500 to-blue-700',
    canvas: 'from-purple-500 to-purple-700',
  };
  
  const labelText = {
    default: 'Zane AI',
    photo: 'Zane Photo',
    doc: 'Zane Doc',
    canvas: 'Zane Canvas',
  };

  return (
    <div className="flex items-center gap-2 pl-1 select-none">
      {/* Badge quadrado com "Z" */}
      <div className={cn(
        "w-5 h-5 rounded-md flex items-center justify-center",
        "bg-gradient-to-br",
        colorClasses[variant],
        "text-white font-serif font-bold text-[9px]",
        "shadow-[0_0_10px_rgba(36,107,49,0.4)]" // Glow effect
      )}>
        Z
      </div>
      
      {/* Label separado */}
      {showLabel && (
        <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">
          {labelText[variant]}
        </span>
      )}
    </div>
  );
}
```

**Design Tokens Necessários:**
```css
/* Glow shadow personalizado */
shadow-[0_0_10px_rgba(36,107,49,0.4)]

/* Gradient correto */
bg-gradient-to-br from-accent-primary to-emerald-900
```

---

### 3.2 🔴 EmptyState Container 3D - CRÍTICO

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Ícone direto sem container
- Protótipo: Container 3D com blur pulsante atrás

**Código Atual:**
```tsx
<Icon
  className={`size-16 animate-pulse-glow sm:size-20 ${config.iconClassName ?? "text-text-secondary"}`}
  strokeWidth={1.5}
/>
```

**Código Correto (Padrão Protótipos):**
```tsx
interface EmptyStateContainerProps {
  icon: ElementType;
  iconColor?: string;
  blurColor?: string;
}

function EmptyStateIconContainer({ 
  icon: Icon, 
  iconColor = 'text-accent-primary',
  blurColor = 'bg-accent-primary/20'
}: EmptyStateContainerProps) {
  return (
    <div className="relative mb-6">
      {/* Blur background layer - pulsante */}
      <div className={cn(
        "absolute inset-0 blur-xl rounded-full animate-pulse",
        blurColor
      )} />
      
      {/* Container 3D principal */}
      <div className={cn(
        "relative w-20 h-20",
        "bg-bg-surface", // #27272a
        "rounded-[24px]",
        "flex items-center justify-center",
        "border border-white/5",
        "shadow-2xl"
      )}>
        <Icon className={cn("w-8 h-8", iconColor)} />
      </div>
    </div>
  );
}
```

**Configurações por Módulo (AMBOS REPOS):**
```tsx
const moduleConfigs = {
  chat: {
    icon: MessageSquare,
    iconColor: 'text-accent-primary',
    blurColor: 'bg-accent-primary/20',
    title: 'Como posso te ajudar\nesta noite?',
    titleClass: 'text-[#eecfa1] sm:text-text-primary', // Dourado no mobile
  },
  photo: {
    icon: Wand2,
    iconColor: 'text-accent-primary', // Verde #246B31
    blurColor: 'bg-accent-primary/20',
    title: 'Zane Photo Studio',
    titleClass: 'text-[#eecfa1]',
  },
  doc: {
    icon: FileText,
    iconColor: 'text-blue-500',
    blurColor: 'bg-blue-500/10',
    title: 'Zane Doc',
    titleClass: 'text-[#eecfa1]',
  },
  canvas: {
    icon: LayoutGrid,
    iconColor: 'text-purple-500',
    blurColor: 'bg-purple-500/10',
    title: 'Zane Canvas',
    titleClass: 'text-[#eecfa1]',
  },
};
```

**Título Responsivo (CONSENSO):**
```tsx
<h1 className={cn(
  "font-serif",
  "text-4xl md:text-5xl", // Maior que atual text-2xl
  "text-center",
  "whitespace-pre-line", // Para quebra de linha em "esta noite?"
  config.titleClass
)}>
  {config.title}
</h1>
```

---

### 3.3 🔴 LoadingIndicator com Branding - CRÍTICO

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Apenas spinner + "Pensando..."
- Protótipo: Label "Zane" verde + spinner + texto contextual

**Código Atual:**
```tsx
<span className="text-sm">{displayText}</span>
```

**Código Correto (Padrão Protótipos):**
```tsx
interface LoadingIndicatorProps {
  variant?: 'chat' | 'photo' | 'doc' | 'canvas';
  isReasoning?: boolean;
}

const loadingTexts = {
  chat: 'Pensando...',
  photo: 'Criando sua obra de arte...',
  doc: 'Lendo documentos e analisando...',
  canvas: 'Estruturando ideias...',
};

const brandColors = {
  chat: 'text-accent-primary',
  photo: 'text-accent-primary',
  doc: 'text-blue-400',
  canvas: 'text-purple-400',
};

export function LoadingIndicator({ 
  variant = 'chat',
  isReasoning = false 
}: LoadingIndicatorProps) {
  const text = isReasoning ? 'Raciocinando...' : loadingTexts[variant];
  const brandColor = brandColors[variant];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-text-secondary"
    >
      {/* Label "Zane" com cor do módulo */}
      <span className={cn("font-bold text-xs", brandColor)}>
        Zane
      </span>
      
      {/* Spinner */}
      <Loader2 className="w-4 h-4 animate-spin" />
      
      {/* Texto contextual */}
      <span className="text-sm">{text}</span>
    </motion.div>
  );
}
```

---

### 3.4 🔴 ReasoningSelector Popup Menu - CRÍTICO

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Dropdown com ciclo inline
- Protótipo: Popup flutuante com header, descrições detalhadas e tokens

**Código Correto (Padrão shadcn/ui DropdownMenu):**
```tsx
const REASONING_LEVELS = [
  { 
    value: 'soft' as const, 
    label: 'Soft',
    desc: 'Rápido e direto (1k tokens)',
    tokens: '1k',
    colorClass: 'text-green-400' // CORRIGIDO: era blue-400
  },
  { 
    value: 'medium' as const,
    label: 'Médio',
    desc: 'Equilibrado (2k tokens)',
    tokens: '2k',
    colorClass: 'text-yellow-400' // Era amber-400
  },
  { 
    value: 'max' as const,
    label: 'Max',
    desc: 'Análise profunda (4k tokens)',
    tokens: '4k',
    colorClass: 'text-[#15803d]' // CORRIGIDO: era red-400
  },
  { 
    value: 'disabled' as const,
    label: 'Desativado',
    desc: 'Raciocínio Desativado',
    tokens: '0',
    colorClass: 'text-red-500'
  },
];

// Trigger com Brain espelhado
<button className="p-2.5 rounded-full hover:bg-zinc-800 transition-colors">
  <Brain className={cn(
    "w-5 h-5",
    "transform scale-x-[-1]", // ESPELHAMENTO HORIZONTAL
    currentLevelConfig.colorClass
  )} />
</button>

// Popup Menu
<motion.div
  initial={{ opacity: 0, y: 15, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 15, scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  className={cn(
    "absolute bottom-full left-0 mb-4 z-50",
    "bg-[#1f1f22]", // Background específico
    "border border-zinc-800",
    "p-1.5 rounded-2xl",
    "shadow-xl",
    "min-w-[240px]"
  )}
>
  {/* Header */}
  <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
    Nível de Raciocínio
  </div>
  
  {/* Items */}
  {REASONING_LEVELS.map((level) => (
    <button
      key={level.value}
      onClick={() => handleSelect(level.value)}
      className={cn(
        "w-full flex items-start justify-between p-2.5 rounded-xl transition-colors",
        currentLevel === level.value 
          ? 'bg-zinc-800 text-white' 
          : 'text-zinc-400 hover:bg-[#2c2c2e] hover:text-zinc-200'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Brain className={cn("w-4 h-4 transform scale-x-[-1]", level.colorClass)} />
        </div>
        <div className="text-left">
          <div className="text-xs font-medium">{level.label}</div>
          <div className="text-[10px] text-zinc-500 leading-tight">{level.desc}</div>
        </div>
      </div>
      {currentLevel === level.value && (
        <Check className="w-3 h-3 text-[#246B31] mt-1" />
      )}
    </button>
  ))}
</motion.div>
```

---

### 3.5 🟡 Sources Chips - IMPORTANTE

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Sem dot indicator, ExternalLink sempre visível
- Protótipo: Dot com glow no hover, ExternalLink aparece no hover

**Código Correto:**
```tsx
{sources.map((source, idx) => (
  <a
    key={`source-${source.title}-${idx}`}
    href={source.uri}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group flex items-center gap-2",
      "pl-2 pr-3 py-1.5 rounded-lg",
      "bg-zinc-900/50", // CORRIGIDO: era accent-primary/10
      "hover:bg-zinc-800",
      "border border-white/5 hover:border-white/10",
      "transition-all duration-300",
      "no-underline"
    )}
  >
    {/* Dot indicator com glow */}
    <div className={cn(
      "w-1.5 h-1.5 rounded-full",
      "bg-zinc-600",
      "group-hover:bg-accent-primary",
      "group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)]",
      "transition-all"
    )} />
    
    {/* Title */}
    <span className={cn(
      "text-xs font-medium truncate max-w-[200px]",
      "text-zinc-400 group-hover:text-zinc-200",
      "transition-colors"
    )}>
      {source.title}
    </span>
    
    {/* ExternalLink - aparece no hover */}
    <ExternalLink className={cn(
      "w-3 h-3",
      "text-zinc-700 group-hover:text-zinc-400",
      "opacity-0 group-hover:opacity-100",
      "-ml-1 group-hover:ml-0",
      "transition-all",
      "transform group-hover:translate-x-0.5"
    )} />
  </a>
))}
```

---

### 3.6 🟡 UserMessage - IMPORTANTE

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Sem shadow, border `border-border-default`
- Protótipo: Com `shadow-sm`, border `border-white/5`

**Código Correto:**
```tsx
<div className={cn(
  "rounded-[20px] rounded-tr-[4px]",
  "bg-bg-surface",
  "px-4 py-3",
  "shadow-sm", // ADICIONADO
  "border border-white/5" // CORRIGIDO: era border-border-default
)}>
```

---

### 3.7 🟡 AttachMenu - IMPORTANTE

**Problema Identificado (CONSENSO AMBOS REPOS):**
- Atual: Sem `backdrop-blur-xl`, `rounded-xl`, labels longos
- Protótipo: Com blur, `rounded-2xl`, labels curtos

**Código Correto:**
```tsx
const menuItems = [
  { type: "camera", icon: Camera, label: "Câmera" },      // SIMPLIFICADO
  { type: "gallery", icon: Image, label: "Fotos" },       // SIMPLIFICADO
  { type: "files", icon: FileText, label: "Arquivos" },   // SIMPLIFICADO
];

<motion.div
  className={cn(
    "absolute bottom-full left-0 mb-4", // mb-4 em vez de mb-2
    "bg-[#1f1f22]",
    "backdrop-blur-xl", // ADICIONADO
    "border border-zinc-800",
    "p-2 rounded-2xl", // AUMENTADO: era rounded-xl
    "shadow-xl",
    "w-[220px]" // FIXO: era min-w-[200px]
  )}
>
  {menuItems.map(({ type, icon: Icon, label }) => (
    <button
      className={cn(
        "flex items-center gap-3",
        "p-3 rounded-xl", // p-3 rounded-xl
        "hover:bg-[#2c2c2e]",
        "transition-colors",
        "text-zinc-300 hover:text-white"
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  ))}
</motion.div>
```

---

## 4. NOVOS COMPONENTES A CRIAR

### 4.1 ZaneBadge
```
src/components/ui/zane-badge.tsx
```
- Reutilizável em AIMessage, LoadingIndicator
- Variantes: default, photo, doc, canvas
- Props: variant, showLabel, size

### 4.2 EmptyStateContainer
```
src/components/chat/EmptyStateContainer.tsx
```
- Container 3D com blur effect
- Usado em todos os Empty States
- Props: icon, iconColor, blurColor

### 4.3 ReasoningPopup
```
src/components/selectors/ReasoningPopup.tsx
```
- Menu popup flutuante
- Header com título
- Níveis com descrição e tokens

---

## 5. ORDEM DE IMPLEMENTAÇÃO

### Sprint 1 - CRÍTICO (10-16h)

```
Dia 1:
├── 1. [2h] Criar ZaneBadge component
│   └── Atualizar AIMessage.tsx para usar ZaneBadge
│
├── 2. [3h] Criar EmptyStateContainer component
│   └── Refatorar EmptyState.tsx com container 3D
│
└── 3. [1h] Atualizar EmptyState títulos e cores
    ├── Chat: "Como posso te ajudar\nesta noite?"
    ├── Photo: "Zane Photo Studio"
    ├── Doc: "Zane Doc"
    └── Canvas: "Zane Canvas"

Dia 2:
├── 4. [4h] Criar ReasoningPopup component
│   ├── Popup flutuante com AnimatePresence
│   ├── Header "Nível de Raciocínio"
│   ├── Brain icon espelhado
│   └── Cores corretas (green, yellow, #15803d)
│
└── 5. [2h] Atualizar LoadingIndicator
    ├── Adicionar label "Zane" colorido
    └── Textos por módulo
```

### Sprint 2 - IMPORTANTE (4-6h)

```
Dia 3:
├── 6. [2h] Sources Chips em AIMessage
│   ├── Dot indicator com glow
│   └── ExternalLink hover behavior
│
├── 7. [30min] UserMessage ajustes
│   ├── shadow-sm
│   └── border-white/5
│
└── 8. [1h] AttachMenu melhorias
    ├── backdrop-blur-xl
    ├── rounded-2xl
    └── Labels pt-BR curtos
```

### Sprint 3 - MELHORIAS (2-4h)

```
Dia 4:
├── 9. [1h] AI Message actions visibility
│   └── Mudar para sempre visível com opacidade baixa
│
├── 10. [30min] Desktop padding horizontal
│   └── md:px-6 em vez de md:px-0
│
└── 11. [1h] Textos pt-BR em Settings
```

---

## 6. VALIDAÇÕES DE BUILD/LINT

### Antes de cada commit:

```bash
# 1. TypeScript - ZERO erros
npx tsc --noEmit

# 2. Biome lint + format
npm run check

# 3. Build verification
npm run build
```

### Checklist Visual:

- [ ] Badge Zane AI é quadrado 20x20 com "Z" e glow verde
- [ ] Empty states têm container 3D `w-20 h-20 rounded-[24px]` com blur
- [ ] Título dourado `text-[#eecfa1]` no mobile
- [ ] Tamanho título `text-4xl md:text-5xl`
- [ ] Reasoning popup com header "Nível de Raciocínio"
- [ ] Brain icon espelhado `scale-x-[-1]`
- [ ] Cores reasoning: soft=green-400, medium=yellow-400, max=#15803d
- [ ] Loading mostra "Zane" antes do spinner
- [ ] Sources chips com dot verde e glow no hover
- [ ] User message com `shadow-sm`
- [ ] Attach menu com `backdrop-blur-xl`

---

## 7. TOKENS/VALORES DE REFERÊNCIA

### Cores Críticas
```css
--accent-primary: #246B31
--accent-textHighlight: #eecfa1  /* Dourado para títulos mobile */
--emerald-900: #064e3b           /* Para gradiente AI badge */
--green-400: #4ade80             /* Reasoning soft */
--yellow-400: #facc15            /* Reasoning medium */
--reasoning-max: #15803d         /* Reasoning max - verde escuro */
```

### Shadows
```css
/* AI Badge glow */
shadow-[0_0_10px_rgba(36,107,49,0.4)]

/* Sources dot hover */
shadow-[0_0_8px_rgba(36,107,49,0.8)]

/* EmptyState container */
shadow-2xl

/* UserMessage */
shadow-sm
```

### Border Radius
```css
rounded-[24px]   /* EmptyState container */
rounded-md       /* AI Badge (w-5 h-5) */
rounded-2xl      /* Popups, Cards, AttachMenu */
```

### Spring Configurations (Framer Motion)
```javascript
// Sidebar
{ type: "spring", stiffness: 400, damping: 40 }

// Modal/Sheet
{ type: "spring", stiffness: 300, damping: 25 }

// Dropdown/Popup
{ type: "spring", stiffness: 350, damping: 25 }

// Messages
{ type: "spring", stiffness: 300, damping: 30 }
```

---

## 8. ESTIMATIVA DE IMPACTO

| Sprint | Issues | Horas | Impacto Paridade |
|--------|--------|-------|------------------|
| Sprint 1 | 5 | 10-16h | +22% (78% → 92%) |
| Sprint 2 | 3 | 4-6h | +5% (92% → 97%) |
| Sprint 3 | 3 | 2-4h | +3% (97% → 100%) |
| **TOTAL** | **11** | **16-26h** | **+30%** |

---

## 9. ARQUIVOS MODIFICADOS

### Alta Prioridade
```
src/components/chat/AIMessage.tsx          → Badge + Sources
src/components/chat/EmptyState.tsx         → Container 3D + Textos + Cores
src/components/chat/LoadingIndicator.tsx   → Label Zane + Variantes
src/components/chat/UserMessage.tsx        → Shadow + Border
src/components/selectors/ReasoningSelector.tsx → Popup + Cores + Icon flip
```

### Novos Arquivos
```
src/components/ui/zane-badge.tsx           → Novo componente
src/components/chat/EmptyStateContainer.tsx → Novo componente
```

### Média Prioridade
```
src/components/selectors/AttachMenu.tsx    → Blur + Labels
src/routes/index.tsx                       → Padding desktop (md:px-6)
```

---

*Plano gerado pelo Agente 3 de Análise de Paridade de Design*  
*Baseado em Context7, protótipos GitHub e implementação atual*  
*Data: 30 de novembro de 2025*
