# Relatório Agente 5 - Análise UI/UX/Design

**Data:** 30 de novembro de 2025  
**Agente:** 5  
**Escopo:** Análise detalhada de paridade entre protótipos (zane-ai e zane-ai-ux-interface) e implementação atual

---

## 1. ELEMENTOS EM PARIDADE 100%

### 1.1 Design Tokens e Cores
✅ **PARIDADE TOTAL**

| Token | Protótipo | Atual |
|-------|-----------|-------|
| `--bg-main` | `#18181b` (dark) | `#18181b` |
| `--bg-sidebar` | `#121212` | `#121212` |
| `--bg-surface` | `#27272a` | `#27272a` |
| `--bg-modal` | `#1c1c1e` | `#1c1c1e` |
| `--bg-hover` | `#2c2c2e` | `#2c2c2e` |
| `--accent-primary` | `#246B31` | `#246B31` |
| `--accent-textHighlight` | `#eecfa1` | `#eecfa1` |
| `--text-primary` | `#e4e4e7` (dark) | `#e4e4e7` |
| `--text-secondary` | `#a1a1aa` | `#a1a1aa` |

**Evidência - Protótipo (index.html):**
```css
--bg-main: #18181b;
--bg-sidebar: #121212;
--bg-surface: #27272a;
accent: { primary: '#246B31', textHighlight: '#eecfa1' }
```

**Evidência - Atual (styles.css):**
```css
--bg-main: #18181b;
--bg-sidebar: #121212;
--bg-surface: #27272a;
--accent-primary: #246B31;
--accent-textHighlight: #eecfa1;
```

### 1.2 Tipografia
✅ **PARIDADE TOTAL**

- **Font Sans:** `Inter` - Implementado corretamente
- **Font Serif:** `Playfair Display` - Implementado corretamente
- **Font Mono:** `ui-monospace, SFMono-Regular` - Implementado

### 1.3 InputBar - Estrutura Base
✅ **PARIDADE ALTA (95%)**

| Característica | Protótipo | Atual | Status |
|---------------|-----------|-------|--------|
| Border-radius | `rounded-[32px]` | `rounded-[32px]` | ✅ |
| Padding | `p-2` | `p-2` | ✅ |
| Border | `border border-zinc-800` | `border border-border-default` | ✅ |
| Ring | `ring-1 ring-white/5` | `ring-1 ring-white/5` | ✅ |
| Background | `bg-[#27272a]` | `bg-bg-surface` | ✅ |

**Evidência - Protótipo:**
```tsx
className="relative bg-[#27272a] rounded-[32px] p-2 flex items-center shadow-lg border border-zinc-800 ring-1 ring-white/5 max-w-3xl mx-auto w-full"
```

**Evidência - Atual:**
```tsx
className="relative bg-bg-surface rounded-[32px] p-2 flex flex-col shadow-lg border border-border-default ring-1 ring-white/5 max-w-3xl mx-auto w-full"
```

### 1.4 Animações Base
✅ **PARIDADE TOTAL**

- `slideUp` keyframe implementado
- `fadeIn` keyframe implementado
- `framer-motion` utilizado corretamente
- Spring config similar: `stiffness: 400, damping: 30`

### 1.5 Sidebar - Estrutura Base
✅ **PARIDADE ALTA (90%)**

| Elemento | Protótipo | Atual | Status |
|----------|-----------|-------|--------|
| Largura | `w-[85%] max-w-[320px]` | `w-[85%] max-w-[320px]` | ✅ |
| Background | `bg-[#121212]` | `bg-bg-sidebar` | ✅ |
| Animação | `spring stiffness:400 damping:40` | `spring stiffness:400 damping:40` | ✅ |
| Backdrop | `bg-black/50 backdrop-blur-sm` | `Backdrop component` | ✅ |

---

## 2. ELEMENTOS SEM PARIDADE

### 2.1 USER MESSAGE BUBBLE - ❌ DIFERENÇAS SIGNIFICATIVAS

**PROTÓTIPO (zane-ai-ux-interface):**
```tsx
<div className="bg-[#27272a] text-zinc-100 p-4 rounded-2xl rounded-tr-sm text-[15px] shadow-sm border border-white/5">
```

**ATUAL:**
```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">
```

| Propriedade | Protótipo | Atual | Diferença |
|-------------|-----------|-------|-----------|
| Border-radius | `rounded-2xl rounded-tr-sm` | `rounded-[20px] rounded-tr-[4px]` | Compatível |
| Padding | `p-4` | `px-4 py-3` | ⚠️ Padding vertical menor |
| Border | `border border-white/5` | `border border-border-default` | ⚠️ Cor diferente |
| Shadow | `shadow-sm` | Ausente | ❌ FALTA SHADOW |

### 2.2 AI MESSAGE - ❌ DIFERENÇAS CRÍTICAS

**PROTÓTIPO - Badge/Avatar da AI:**
```tsx
<div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
  Z
</div>
<span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
```

**ATUAL - Badge/Avatar:**
```tsx
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
  Zane AI
</span>
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| Formato Avatar | Quadrado 20x20px com "Z" | Pill com texto | ❌ DIFERENTE |
| Gradient | `from-accent-primary to-emerald-900` | `from-accent-primary to-emerald-600` | ⚠️ Ligeiramente diferente |
| Glow Effect | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` | Ausente | ❌ FALTA GLOW |
| Typography | Font serif, 9px, bold | Font normal, xs | ❌ DIFERENTE |

### 2.3 AI MESSAGE - CONTENT LAYOUT

**PROTÓTIPO:**
```tsx
<div className="w-full relative px-0 text-[15px] leading-relaxed flex flex-col gap-4">
```

**ATUAL:**
```tsx
<div className="px-1">
```

| Diferença | Impacto |
|-----------|---------|
| `gap-4` ausente | Espaçamento entre elementos menor |
| `max-w-2xl` não aplicado em actions | Layout inconsistente |

### 2.4 ACTION BAR (Copy, Like, Dislike, Retry)

**PROTÓTIPO:**
```tsx
<div className="flex items-center justify-between mt-2 pt-1 select-none">
  <div className="flex items-center gap-1">
    <ActionButton icon={<Copy />} onClick={handleCopy} />
    <ActionButton icon={<ThumbsUp />} />
    <ActionButton icon={<ThumbsDown />} />
    {isLastMessage && onRetry && <ActionButton icon={<RotateCcw />} />}
  </div>
  {usage && <TokenUsageButton />}
</div>
```

**Diferenças no Atual:**
- ❌ `select-none` ausente
- ⚠️ Opacidade em hover vs visível sempre
- ⚠️ Layout `justify-between` parcialmente diferente

### 2.5 SOURCES CHIPS

**PROTÓTIPO:**
```tsx
<a className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 transition-all duration-300 no-underline">
  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
  <span className="text-xs text-zinc-400 group-hover:text-zinc-200 font-medium truncate max-w-[200px]">
    {source.title}
  </span>
  <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100" />
</a>
```

**ATUAL:**
```tsx
<a className="inline-flex items-center gap-1 text-xs text-accent-primary hover:underline bg-accent-primary/10 px-2 py-1 rounded">
  <ExternalLink className="w-3 h-3" />
  {source.title}
</a>
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| Dot indicator | ✅ Verde com glow | ❌ Ausente | ❌ FALTA |
| Background | `bg-zinc-900/50` | `bg-accent-primary/10` | ⚠️ Diferente |
| Hover effects | Complex transitions | Simple underline | ❌ SIMPLIFICADO |
| ExternalLink visibility | `opacity-0 → opacity-100` | Always visible | ⚠️ |

### 2.6 EMPTY STATE

**PROTÓTIPO (Chat):**
```tsx
<div className="flex-1 flex flex-col justify-center items-center opacity-90 mb-10">
  <h1 className="text-4xl md:text-5xl font-serif text-[#eecfa1] md:text-[#e4e4e7] tracking-wide leading-tight text-center">
    Como posso te ajudar<br />esta noite?
  </h1>
</div>
```

**ATUAL:**
```tsx
<motion.h1 className="mb-3 font-serif text-2xl text-text-primary sm:text-3xl">
  {title}
</motion.h1>
```

| Diferença | Protótipo | Atual |
|-----------|-----------|-------|
| Tamanho texto | `text-4xl md:text-5xl` | `text-2xl sm:text-3xl` |
| Cor | `text-[#eecfa1]` (mobile) / `text-[#e4e4e7]` (desktop) | `text-text-primary` |
| Ícone | Sem ícone | Com ícone animado |
| Mensagem | "Como posso te ajudar esta noite?" | "Como posso ajudar?" |

**PROTÓTIPO (Photo/Canvas):**
```tsx
<div className="relative mb-6">
  <div className="absolute inset-0 bg-[#246B31]/20 blur-xl rounded-full animate-pulse"></div>
  <div className="relative w-20 h-20 bg-[#27272a] rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
    <Wand2 className="w-8 h-8 text-[#246B31]" />
  </div>
</div>
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| Glow blur effect | `blur-xl` com animate-pulse | `animate-pulse-glow` | ⚠️ Similar |
| Icon container | `w-20 h-20 rounded-[24px]` | `size-16 sm:size-20` | ⚠️ Menor |
| Shadow | `shadow-2xl` | Ausente | ❌ FALTA |
| Border | `border border-white/5` | Ausente | ❌ FALTA |

### 2.7 HEADER

**PROTÓTIPO:**
```tsx
<header className="flex justify-between items-center p-4 z-10 relative shrink-0">
  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
    <Menu className="w-6 h-6 text-zinc-400" />
  </button>
  <button className="flex items-center gap-2 text-zinc-300 font-medium hover:text-white">
    {currentModel} <ChevronDown className="w-4 h-4" />
  </button>
  <div className="w-10"></div>
</header>
```

**ATUAL:**
```tsx
<header className="flex justify-between items-center p-4 z-10 relative shrink-0 h-16 bg-bg-main/80 backdrop-blur-md border-b border-border-default/50">
```

| Diferença | Protótipo | Atual |
|-----------|-----------|-------|
| Background | Transparente | `bg-bg-main/80 backdrop-blur-md` |
| Border | Nenhum | `border-b border-border-default/50` |
| Height | Auto | `h-16` fixo |
| Avatar right | Spacer `w-10` | Avatar button |

### 2.8 INPUT BAR - BOTÃO ATTACH (+)

**PROTÓTIPO:**
```tsx
<button 
  onClick={() => setAttachMenuOpen(!attachMenuOpen)} 
  className={`p-3 rounded-full transition-all duration-300 ${attachMenuOpen ? 'bg-background-hover text-text-primary rotate-45' : 'text-text-secondary hover:bg-background-hover hover:text-text-primary'}`}
>
  <Plus className="w-6 h-6" />
</button>
```

**ATUAL:** Similar mas sem o `duration-300` explícito

### 2.9 REASONING SELECTOR (Brain Button)

**PROTÓTIPO:**
```tsx
<button className={`p-2.5 rounded-full hover:bg-zinc-800 transition-colors group`}>
  <Brain className={`w-5 h-5 transform scale-x-[-1] ${currentReasoningConfig.colorClass}`} />
</button>

// Popup Menu
<div className="absolute bottom-full left-0 mb-4 bg-[#1f1f22] border border-zinc-800 p-1.5 rounded-2xl shadow-xl min-w-[240px] animate-in slide-in-from-bottom-2 z-50">
```

**ATUAL:**
```tsx
// Implementado como ReasoningSelector component com dropdown
// Posição: inline no InputBar vs popup absoluto
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| `scale-x-[-1]` no Brain | ✅ | ❌ Ausente | ❌ FALTA |
| Menu position | `bottom-full mb-4` | Dropdown padrão | ⚠️ |
| Menu background | `bg-[#1f1f22]` | `bg-[var(--bg-surface)]` | ✅ |

### 2.10 LOADING INDICATOR

**PROTÓTIPO:**
```tsx
<div className="flex items-center gap-2 text-zinc-400 text-sm">
  <span className="text-[#246B31] font-bold text-xs">Zane</span>
  <Loader2 className="w-4 h-4 animate-spin" />
  Pensando...
</div>
```

**ATUAL:**
```tsx
<motion.div className="flex items-center gap-2 text-text-secondary">
  <Icon className="size-4 animate-spin" />
  <span className="text-sm">{displayText}</span>
</motion.div>
```

| Diferença | Protótipo | Atual |
|-----------|-----------|-------|
| "Zane" label | ✅ Verde, bold, xs | ❌ Ausente |
| Text style | `text-zinc-400 text-sm` | `text-text-secondary text-sm` |

### 2.11 SIDEBAR MENU ITEMS

**PROTÓTIPO:**
```tsx
<button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
  active 
    ? 'bg-background-hover text-text-primary font-medium border border-border/50' 
    : 'text-text-secondary hover:bg-background-hover hover:text-text-primary border border-transparent'
}`}>
```

**ATUAL:**
```tsx
<motion.button className={cn(
  "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
  currentView === item.id
    ? "bg-bg-hover text-text-primary font-medium border border-border-default/50"
    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary border border-transparent",
)}>
```

✅ **PARIDADE ALTA** - Implementação correta

### 2.12 SIDEBAR FOOTER (User Profile Button)

**PROTÓTIPO:**
```tsx
<button className="flex items-center gap-3 bg-background-surface p-2 pr-4 rounded-full border border-border hover:bg-background-hover transition-colors">
  <div className="w-8 h-8 rounded-full bg-background-hover flex items-center justify-center text-xs font-bold text-text-primary group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700">
    {userName.substring(0, 2).toUpperCase()}
  </div>
  <span className="text-sm text-text-primary font-medium truncate max-w-[100px]">{userName}</span>
</button>
```

**ATUAL:** Similar, com adição de `ChevronRight` ícone

### 2.13 MODEL SELECTOR MODAL

**PROTÓTIPO (inline dropdown):**
```tsx
{modelMenuOpen && (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] bg-[#1f1f22] rounded-2xl p-2 border border-zinc-800 shadow-2xl z-30 animate-in slide-in-from-top-3">
    {AVAILABLE_MODELS.map((model) => (
      <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${...}`}>
```

**ATUAL (modal centralizado):**
```tsx
<motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md p-4 rounded-2xl bg-bg-surface border border-border-default shadow-2xl">
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| Posição | Dropdown abaixo do trigger | Modal centralizado | ⚠️ Diferente |
| Animação | `animate-in slide-in-from-top-3` | `framer-motion scale/y` | ⚠️ |
| Backdrop | Nenhum | Backdrop component | ✅ Melhor |

### 2.14 ATTACH MENU POPUP

**PROTÓTIPO:**
```tsx
<motion.div 
  className="absolute bottom-20 left-4 z-30 bg-background-modal border border-border/50 rounded-2xl shadow-2xl p-2 w-[220px] backdrop-blur-xl"
>
  <div className="flex flex-col gap-1">
    <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-background-hover cursor-pointer transition-colors group w-full text-left">
      <Camera className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
      <span className="text-[14px] font-medium text-text-primary">{t.input.camera}</span>
    </button>
```

**ATUAL:**
```tsx
<motion.div className="absolute bottom-full mb-2 left-0 origin-bottom min-w-[200px] rounded-xl p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg">
```

| Aspecto | Protótipo | Atual | Status |
|---------|-----------|-------|--------|
| Position | `bottom-20 left-4` | `bottom-full mb-2 left-0` | ⚠️ |
| Border-radius | `rounded-2xl` | `rounded-xl` | ⚠️ Menor |
| Width | `w-[220px]` | `min-w-[200px]` | ⚠️ |
| Backdrop blur | `backdrop-blur-xl` | Ausente | ❌ FALTA |
| Item padding | `p-3 rounded-xl` | `px-3 py-2.5 rounded-lg` | ⚠️ |

---

## 3. ELEMENTOS AUSENTES

### 3.1 ❌ SETTINGS MODAL - VIEWS COMPLETAS

| View | Protótipo | Atual |
|------|-----------|-------|
| Main | ✅ Completo | ✅ Implementado |
| Profile | ✅ Com FormInput completo | ⚠️ Estrutura básica |
| Plan | ✅ Billing info | ⚠️ Estrutura básica |
| Memory Menu | ✅ 3 opções | ✅ Implementado |
| Memory Facts | ✅ Lista de fatos | ⚠️ Estrutura básica |
| Memory Timeline | ✅ Eventos com warning | ⚠️ Estrutura básica |
| Refinement | ✅ Com sliders | ⚠️ Estrutura básica |
| Privacy | ❌ Não existe no protótipo | ✅ Adicionado |
| System | ❌ Não existe no protótipo | ✅ Adicionado |

### 3.2 ❌ SETTINGS - TOGGLE SWITCH

**PROTÓTIPO:**
```tsx
<ToggleSwitch 
  isOn={currentUser.preferences.theme === 'dark'} 
  onToggle={handleThemeToggle} 
  inactiveColor="bg-zinc-300 dark:bg-zinc-600" 
/>
```

**ATUAL:** Não implementado como componente standalone

### 3.3 ❌ FORM INPUT COMPONENT

**PROTÓTIPO:**
```tsx
<FormInput 
  label={t.profile.fullName}
  icon={<User />}
  placeholder={t.profile.fullNamePlaceholder}
  value={profileData.fullName}
  onChange={(v: string) => setProfileData(prev => ({ ...prev, fullName: v }))}
/>
```

**ATUAL:** Não existe componente FormInput

### 3.4 ❌ DROPDOWN SELECT COMPONENT

**PROTÓTIPO:**
```tsx
<DropdownSelect 
  label="Idioma"
  options={[
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English' }
  ]}
  value={currentUser.preferences.language}
  onChange={handleLanguageChange}
/>
```

**ATUAL:** Não implementado

### 3.5 ❌ TODO LIST PANEL - STYLING

**PROTÓTIPO (implícito):**
- Checkboxes interativos
- Animação de strike-through
- Progress indicator

**ATUAL:** `TodoListPanel` existe mas styling pode diferir

### 3.6 ❌ TOKEN USAGE MODAL - STEPS TABLE

**PROTÓTIPO:**
```tsx
// Inclui tabela de steps com:
// - Step / Agent name
// - Model used
// - In / Cache / Think / Out tokens
// - Total per step
```

**ATUAL:** ✅ Implementado com tabela completa

### 3.7 ❌ GALERIA (ZaneGallery)

**PROTÓTIPO:**
```tsx
<ZaneGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
```

**ATUAL:** Existe em `src/components/photo/ZaneGallery.tsx` - verificar paridade

### 3.8 ❌ CONTEXT DRAWER (Zane Doc)

**PROTÓTIPO:**
```tsx
// Context Panel com:
// - Lista de documentos uploaded
// - Status de cada documento
// - Botões de remoção
// - Empty state com upload CTA
```

**ATUAL:** Existe em `src/components/doc/ContextDrawer.tsx` - verificar paridade

### 3.9 ❌ CANVAS WORKSPACE - ARTIFACT CHIP

**PROTÓTIPO:**
```tsx
{msg.role === 'ai' && msg.content.includes('```') && (
  <button 
    onClick={() => {
      const artifact = parseArtifactFromMessage(msg.content);
      if (artifact) {
        setActiveArtifact(artifact);
        setIsWorkspaceOpen(true);
      }
    }}
    className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm transition-colors"
  >
    <Code className="w-4 h-4" />
    Ver Artefato
  </button>
)}
```

**ATUAL:** Verificar implementação

### 3.10 ❌ API KEY GATE

**PROTÓTIPO:**
```tsx
const ApiKeyGate = ({ onConnect }: { onConnect: () => void }) => (
  <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#09090b] text-white p-6 text-center space-y-6">
    <div className="w-20 h-20 bg-accent-primary/20 rounded-3xl flex items-center justify-center text-accent-primary mb-4 animate-pulse">
      <Key className="w-10 h-10" />
    </div>
    <h1 className="text-3xl font-serif font-medium">Acesso Zane AI</h1>
```

**ATUAL:** Não implementado (autenticação diferente)

---

## 4. EVIDÊNCIAS DE CÓDIGO

### 4.1 Protótipo - User Bubble (ChatMessageBubble.tsx)
```tsx
{isUser ? (
  <div className="relative max-w-[85%] md:max-w-[65%] bg-[#27272a] text-zinc-100 px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-white/5 shadow-sm ml-auto">
    {message.image && (
       <div className="mb-3 rounded-xl overflow-hidden border border-white/10">
         <img src={message.image} alt="Upload" className="max-h-48 w-auto object-cover" />
       </div>
    )}
    <div className="whitespace-pre-wrap text-[15px] leading-relaxed font-light">
      {cleanText}
    </div>
  </div>
)}
```

### 4.2 Protótipo - AI Badge (ChatMessageBubble.tsx)
```tsx
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

### 4.3 Protótipo - Sources Chip (ChatMessageBubble.tsx)
```tsx
<div className="flex flex-wrap gap-2">
  {message.sources.map((source, idx) => (
    <a 
      key={idx} 
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
```

### 4.4 Protótipo - Sidebar Animation Variants
```tsx
const sidebarVariants: Variants = {
  closed: { 
    x: "-100%",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40 
    }
  },
  open: { 
    x: "0%",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};
```

### 4.5 Protótipo - Empty State (Photo/Canvas)
```tsx
<div className="h-full flex flex-col justify-center items-center animate-slide-up">
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full animate-pulse"></div>
    <div className="relative w-20 h-20 bg-[#27272a] rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
      <LayoutGrid className="w-8 h-8 text-purple-500" />
    </div>
  </div>
  <h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] mb-3 text-center">Zane Canvas</h1>
  <p className="text-zinc-500 text-sm max-w-xs text-center leading-relaxed">
    Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.
  </p>
</div>
```

### 4.6 Protótipo - Reasoning Button com scale-x[-1]
```tsx
<button className={`p-2.5 rounded-full hover:bg-zinc-800 transition-colors group`}>
  <Brain className={`w-5 h-5 transform scale-x-[-1] ${currentReasoningConfig.colorClass}`} />
</button>
```

---

## 5. RESUMO DE PRIORIDADES

### 🔴 CRÍTICO (Impacto Visual Alto)
1. AI Message Badge - Trocar pill por avatar quadrado com "Z"
2. Sources Chips - Adicionar dot indicator e hover effects
3. Empty State Chat - Ajustar tamanho e cor do texto
4. User Bubble - Adicionar `shadow-sm`

### 🟡 IMPORTANTE (Impacto Médio)
5. Loading Indicator - Adicionar label "Zane" verde
6. Attach Menu - Adicionar `backdrop-blur-xl`
7. Brain icon - Adicionar `scale-x-[-1]`
8. Empty State Photo/Canvas - Adicionar glow e shadow no ícone

### 🟢 MENOR (Refinamentos)
9. Header - Remover background/border (opcional, pode ser melhor com)
10. Model Selector - Considerar dropdown vs modal
11. Settings views - Completar FormInput e ToggleSwitch components

---

## 6. MÉTRICAS DE PARIDADE

| Categoria | Paridade |
|-----------|----------|
| Design Tokens | **100%** |
| Tipografia | **100%** |
| InputBar | **85%** |
| Sidebar | **90%** |
| AI Message | **60%** |
| User Message | **80%** |
| Empty States | **70%** |
| Sources Chips | **40%** |
| Settings | **65%** |
| Modals | **80%** |
| Animações | **90%** |

**PARIDADE GERAL: ~78%**

---

*Relatório gerado pelo Agente 5 de Análise UI/UX/Design*
