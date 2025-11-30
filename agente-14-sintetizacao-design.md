# Design System Specs - Agente 14

**Data:** 30 de novembro de 2025  
**Síntese:** Consolidação dos relatórios dos Agentes 1-11  
**Objetivo:** Especificações visuais precisas para paridade de design

---

## CORES - ESTADO ATUAL vs PROTÓTIPO

### Cores de Background

| Token | Atual (Dark) | Protótipo (Dark) | Atual (Light) | Protótipo (Light) | Status |
|-------|--------------|------------------|---------------|-------------------|--------|
| `--bg-main` | `#18181b` | `#18181b` | `#f4f4f5` | `#f4f4f5` | ✅ 100% |
| `--bg-sidebar` | `#121212` | `#121212` | `#ffffff` | `#ffffff` | ✅ 100% |
| `--bg-surface` | `#27272a` | `#27272a` | `#ffffff` | `#ffffff` | ✅ 100% |
| `--bg-modal` | `#1c1c1e` | `#1c1c1e` | `#ffffff` | `#ffffff` | ✅ 100% |
| `--bg-hover` | `#2c2c2e` | `#2c2c2e` | `#e4e4e7` | `#e4e4e7` | ✅ 100% |

### Cores de Texto

| Token | Atual (Dark) | Protótipo (Dark) | Atual (Light) | Protótipo (Light) | Status |
|-------|--------------|------------------|---------------|-------------------|--------|
| `--text-primary` | `#e4e4e7` | `#e4e4e7` | `#18181b` | `#18181b` | ✅ 100% |
| `--text-secondary` | `#a1a1aa` | `#a1a1aa` | `#71717a` | `#71717a` | ✅ 100% |

### Cores de Acento

| Token | Atual | Protótipo | Status |
|-------|-------|-----------|--------|
| `--accent-primary` | `#246B31` | `#246B31` | ✅ 100% |
| `--accent-hover` | `#1e5a29` | `#1e5a29` | ✅ 100% |
| `--accent-textHighlight` | `#eecfa1` | `#eecfa1` | ✅ 100% |

### Cores de Borda

| Token | Atual (Dark) | Protótipo (Dark) | Status |
|-------|--------------|------------------|--------|
| `--border-default` | `#3f3f46` | `#3f3f46` | ✅ 100% |

### Cores Específicas de Componentes

| Contexto | Atual | Protótipo | Status |
|----------|-------|-----------|--------|
| AI Badge gradient start | `from-accent-primary` | `from-accent-primary` | ✅ |
| AI Badge gradient end | `to-emerald-600` | `to-emerald-900` | ❌ Diferente |
| Reasoning Soft | `text-blue-400` | `text-green-400` | ❌ Diferente |
| Reasoning Medium | `text-amber-400` | `text-yellow-400` | ⚠️ Similar |
| Reasoning Max | `text-red-400` | `text-[#15803d]` | ❌ Diferente |
| Empty State Title Mobile | `text-text-primary` | `text-[#eecfa1]` | ❌ Falta dourado |

---

## TIPOGRAFIA

| Propriedade | Atual | Protótipo | Status |
|-------------|-------|-----------|--------|
| Font Sans | `Inter, ui-sans-serif, system-ui, sans-serif` | `Inter, sans-serif` | ✅ 100% |
| Font Serif | `Playfair Display, ui-serif, Georgia, serif` | `Playfair Display, serif` | ✅ 100% |
| Font Mono | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` | `ui-monospace` | ✅ 100% |
| Body text | `text-[15px]` | `text-[15px]` | ✅ 100% |
| Input placeholder | `text-lg` (18px) | `text-lg` (18px) | ✅ 100% |
| Labels small | `text-xs` (12px) | `text-xs` (12px) | ✅ 100% |
| Labels tiny | `text-[10px]` / `text-[11px]` | `text-[10px]` / `text-[11px]` | ✅ 100% |
| Empty State Title | `text-2xl sm:text-3xl` | `text-4xl md:text-5xl` | ❌ MENOR |
| AI Badge "Z" | N/A | `font-serif font-bold text-[9px]` | ❌ AUSENTE |
| AI Badge Label | `text-xs font-medium` | `text-[11px] font-bold tracking-wider uppercase` | ❌ Diferente |

---

## ESPAÇAMENTOS

### Padding

| Elemento | Atual | Protótipo | Status |
|----------|-------|-----------|--------|
| Button sm | `px-3 py-2` | `px-3 py-2` | ✅ 100% |
| Button md | `px-4 py-3` | `px-4 py-3` | ✅ 100% |
| Button lg | `px-6 py-3.5` | `px-6 py-3.5` | ✅ 100% |
| Icon sm | `p-1.5` | `p-1.5` | ✅ 100% |
| Icon md | `p-2.5` | `p-2.5` | ✅ 100% |
| Icon lg | `p-3` | `p-3` | ✅ 100% |
| Input Bar inner | `p-2` | `p-2` | ✅ 100% |
| InputBar container | `p-4 pb-6` | `p-4 pb-6` | ✅ 100% |
| Sidebar item | `p-3` | `p-3` | ✅ 100% |
| User bubble | `px-4 py-3` | `p-4` | ⚠️ Vertical menor |
| Settings item | `p-4` | `p-3` | ⚠️ Maior |
| Modal content | `p-4 space-y-6` | `p-4 space-y-6` | ✅ 100% |

### Gap

| Contexto | Atual | Protótipo | Status |
|----------|-------|-----------|--------|
| Inline icon groups | `gap-1` | `gap-1` | ✅ 100% |
| Button groups | `gap-2` | `gap-2` | ✅ 100% |
| Menu items | `gap-3` | `gap-3` | ✅ 100% |
| AI Message content | `px-1` | `gap-4` | ❌ Falta gap |
| Message list | `space-y-6` | `space-y-8` (Photo) | ⚠️ Diferente |

### Scroll Area Padding

| Propriedade | Atual | Protótipo | Status |
|-------------|-------|-----------|--------|
| pt (header clearance) | `pt-20` (80px) | `pt-20` (80px) | ✅ 100% |
| pb (input clearance) | `pb-32` (128px) | `pb-32` (128px) | ✅ 100% |
| px mobile | `px-4` (16px) | `px-4` (16px) | ✅ 100% |
| px desktop | `md:px-0` (0px) | `md:px-6` (24px) | ❌ Diferente |

---

## BORDER RADIUS

| Elemento | Atual | Protótipo | Status |
|----------|-------|-----------|--------|
| Button padrão | `rounded-xl` (12px) | `rounded-xl` (12px) | ✅ 100% |
| Button pill | `rounded-full` | `rounded-full` | ✅ 100% |
| Input bar container | `rounded-[32px]` | `rounded-[32px]` | ✅ 100% |
| Card/Surface | `rounded-xl` / `rounded-2xl` | `rounded-xl` / `rounded-2xl` | ✅ 100% |
| Modal | `rounded-2xl` | `rounded-2xl` | ✅ 100% |
| Dropdown | `rounded-xl` / `rounded-2xl` | `rounded-2xl` | ⚠️ Menor |
| Avatar | `rounded-full` | `rounded-full` | ✅ 100% |
| User bubble main | `rounded-[20px]` | `rounded-2xl` (16px) | ⚠️ Maior |
| User bubble corner | `rounded-tr-[4px]` | `rounded-tr-sm` (2px) | ⚠️ Similar |
| AI Badge | `rounded-full` | `rounded-md` (6px) | ❌ Diferente |
| Empty state icon container | N/A (sem container) | `rounded-[24px]` | ❌ AUSENTE |
| Sidebar item | `rounded-xl` | `rounded-xl` | ✅ 100% |
| Gallery top | `rounded-t-[32px]` | `rounded-t-[32px]` | ✅ 100% |
| Attach Menu | `rounded-xl` | `rounded-2xl` | ⚠️ Menor |

---

## SHADOWS

| Elemento | Atual | Protótipo | Status |
|----------|-------|-----------|--------|
| Button primary | `shadow-lg shadow-green-900/10` | `shadow-lg shadow-green-900/10` | ✅ 100% |
| FAB | `shadow-lg shadow-green-900/20` | `shadow-lg shadow-green-900/20` | ✅ 100% |
| Modal | `shadow-2xl` | `shadow-2xl` | ✅ 100% |
| Dropdown | `shadow-xl` / `shadow-2xl` | `shadow-xl` / `shadow-2xl` | ✅ 100% |
| Input bar | `shadow-lg` | `shadow-lg` | ✅ 100% |
| User bubble | Ausente | `shadow-sm` | ❌ FALTA |
| AI Badge glow | Ausente | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` | ❌ FALTA |
| Sources chip dot glow | Ausente | `shadow-[0_0_8px_rgba(36,107,49,0.8)]` (hover) | ❌ FALTA |
| Empty state icon container | Ausente | `shadow-2xl` | ❌ FALTA |

---

## ANIMAÇÕES

### Spring Configurations

| Componente | Atual Stiffness | Atual Damping | Protótipo Stiffness | Protótipo Damping | Status |
|------------|-----------------|---------------|---------------------|-------------------|--------|
| Sidebar | 400 | 40 | 400 | 40 | ✅ 100% |
| Modal/Sheet | 300 | 25 | 300 | 25 | ✅ 100% |
| Dropdown | 350 | 25 | 350 | 25 | ✅ 100% |
| Messages | 300 | 30 | 300 | 30 | ✅ 100% |
| Toggle | 700 | 30 | 700 | 30 | ✅ 100% |
| Context Drawer | 300 | 30 | 300 | 30 | ✅ 100% |

### CSS Keyframes

| Animation | Atual | Protótipo | Status |
|-----------|-------|-----------|--------|
| `slideUp` | `translateY(100%) → 0, 0.4s` | `translateY(100%) → 0, 0.4s` | ✅ 100% |
| `fadeIn` | `opacity: 0 → 1, 0.2s` | `opacity: 0 → 1, 0.2s` | ✅ 100% |
| `pulse-glow` | Implementado | Implementado | ✅ 100% |
| `slide-in-from-bottom-2` | Ausente | Usado em menus | ⚠️ Considerar |

### Transition Durations

| Tipo | Atual | Protótipo | Status |
|------|-------|-----------|--------|
| Colors | `transition-colors` | `transition-colors` | ✅ 100% |
| Transform | `duration-300` | `duration-300` | ✅ 100% |
| Dropdown exit | `0.15s` | `0.15s` | ✅ 100% |
| Modal exit | `0.2s` | `0.2s` | ✅ 100% |
| Backdrop | `0.2s` | `0.2s` | ✅ 100% |

---

## COMPONENTES CRÍTICOS

### AI Message Badge

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Formato | Pill `rounded-full px-3 py-1` | Quadrado `w-5 h-5 rounded-md` | Mudar para quadrado 20x20 |
| Conteúdo | Texto "Zane AI" | Letra "Z" em serif | Usar letra "Z" apenas |
| Gradient | `from-accent-primary to-emerald-600` | `from-accent-primary to-emerald-900` | Escurecer o verde final |
| Glow | Ausente | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` | Adicionar glow shadow |
| Font | `text-xs font-medium` | `font-serif font-bold text-[9px]` | Ajustar tipografia |
| Label separado | Incluso no pill | `text-[11px] font-bold text-zinc-500 tracking-wider uppercase` "ZANE AI" | Separar label |

**Código esperado:**
```tsx
<div className="flex items-center gap-2 pl-1 select-none">
  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-accent-primary to-emerald-900 flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-[0_0_10px_rgba(36,107,49,0.4)]">
    Z
  </div>
  <span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">Zane AI</span>
</div>
```

---

### Empty State (Chat/Photo/Doc/Canvas)

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Icon wrapper | Ícone direto `size-16 sm:size-20` | Container 3D `w-20 h-20 bg-[#27272a] rounded-[24px]` | Adicionar container |
| Blur effect | `animate-pulse-glow` no ícone | `absolute inset-0 blur-xl animate-pulse` separado | Criar layer blur atrás |
| Shadow container | Ausente | `shadow-2xl` | Adicionar shadow |
| Border container | Ausente | `border border-white/5` | Adicionar border sutil |
| Icon size interno | N/A | `w-8 h-8` | Reduzir ícone dentro do container |
| Título Chat | "Como posso ajudar?" (1 linha) | "Como posso te ajudar\nesta noite?" (2 linhas) | Ajustar texto + quebra |
| Título tamanho | `text-2xl sm:text-3xl` | `text-4xl md:text-5xl` | Aumentar tamanho |
| Título cor mobile | `text-text-primary` | `text-[#eecfa1]` (dourado) | Adicionar cor dourada |
| Título Photo | "Crie imagens incríveis" | "Zane Photo Studio" | Trocar texto |
| Título Doc | "Analise documentos" | "Zane Doc" | Trocar texto |
| Título Canvas | "Crie artefatos" | "Zane Canvas" | Trocar texto |
| Cor ícone por módulo | Genérico | Photo=verde, Doc=azul, Canvas=roxo | Manter cores específicas |

**Código esperado (Photo):**
```tsx
<div className="relative mb-6">
  <div className="absolute inset-0 bg-[#246B31]/20 blur-xl rounded-full animate-pulse" />
  <div className="relative w-20 h-20 bg-[#27272a] rounded-[24px] flex items-center justify-center border border-white/5 shadow-2xl">
    <Wand2 className="w-8 h-8 text-[#246B31]" />
  </div>
</div>
<h1 className="font-serif text-3xl md:text-4xl text-[#eecfa1] mb-3 text-center">Zane Photo Studio</h1>
```

---

### User Message Bubble

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Padding | `px-4 py-3` | `p-4` | Aumentar padding vertical |
| Border color | `border-border-default` | `border-white/5` | Usar white/5 para dark mode |
| Shadow | Ausente | `shadow-sm` | Adicionar shadow-sm |
| Max-width desktop | `md:max-w-md` | `md:max-w-[65%]` | Usar porcentagem |

---

### Loading Indicator

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Label "Zane" | Ausente | `<span className="text-accent-primary font-bold text-xs">Zane</span>` | Adicionar label verde |
| Texto Chat | "Pensando..." | "Pensando..." | ✅ OK |
| Texto Photo | Genérico | "Criando sua obra de arte..." | Customizar por módulo |
| Texto Doc | Genérico | "Lendo documentos e analisando..." | Customizar por módulo |
| Texto Canvas | Genérico | "Estruturando ideias..." | Customizar por módulo |

---

### Sources Chips (AI Message)

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Dot indicator | Ausente | `w-1.5 h-1.5 rounded-full bg-zinc-600` | Adicionar dot |
| Dot hover | Ausente | `group-hover:bg-accent-primary group-hover:shadow-[0_0_8px_rgba(36,107,49,0.8)]` | Adicionar glow |
| Background | `bg-accent-primary/10` | `bg-zinc-900/50` | Mudar background |
| Border | Ausente | `border border-white/5 hover:border-white/10` | Adicionar border |
| ExternalLink | Always visible | `opacity-0 group-hover:opacity-100` | Esconder por default |
| Transition | Simples | `transition-all duration-300` | Melhorar transition |

---

### Reasoning Selector

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Tipo | Ciclo inline no botão | Popup dropdown com níveis | Implementar popup menu |
| Brain flip | Normal | `transform scale-x-[-1]` | Adicionar espelhamento |
| Popup position | N/A | `absolute bottom-full left-0 mb-4` | Posicionar acima |
| Popup background | N/A | `bg-[#1f1f22]` | Usar cor correta |
| Popup border | N/A | `border border-zinc-800 rounded-2xl` | Adicionar border |
| Header | Ausente | "Nível de Raciocínio" uppercase | Adicionar header |
| Soft color | `text-blue-400` | `text-green-400` | Corrigir cor |
| Max color | `text-red-400` | `text-[#15803d]` (verde escuro) | Corrigir cor |
| Descriptions | Genéricas | "(1k/2k/4k tokens)" | Adicionar tokens |

---

### Model Selector

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Posição | Modal centralizado | Dropdown abaixo do header | Considerar mudar para dropdown |
| Animation | `framer-motion scale/y` | `slide-in-from-top-3` | Similar, aceitar |
| Width | `max-w-md` | `max-w-sm` | Reduzir largura |

---

### Attach Menu

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Position | `bottom-full mb-2` | `bottom-20 left-4` ou `bottom-full mb-4` | Ajustar margin |
| Width | `min-w-[200px]` | `w-[220px]` | Definir largura fixa |
| Border radius | `rounded-xl` | `rounded-2xl` | Aumentar radius |
| Backdrop blur | Ausente | `backdrop-blur-xl` | Adicionar blur |
| Item padding | `px-3 py-2.5 rounded-lg` | `p-3 rounded-xl` | Ajustar padding/radius |
| Labels | "Tirar foto", "Escolher da galeria", "Enviar arquivo" | "Câmera", "Fotos", "Arquivos" | Simplificar labels |

---

### Header

| Aspecto | ATUAL | PROTÓTIPO | CORREÇÃO |
|---------|-------|-----------|----------|
| Height | `h-16` (64px) | ~72px implícito | Considerar aumentar para 72px |
| Background | `bg-bg-main/80 backdrop-blur-md` | Transparente | Avaliar remover background |
| Border | `border-b border-border-default/50` | Nenhum | Avaliar remover border |

---

## CHECKLIST DE PARIDADE VISUAL

### Prioridade CRÍTICA 🔴

- [ ] Redesenhar AI Message Badge (quadrado com "Z" + glow)
- [ ] Implementar Empty State container 3D com blur effect
- [ ] Adicionar título dourado (`text-[#eecfa1]`) nos Empty States mobile
- [ ] Aumentar tamanho do título Empty State para `text-4xl md:text-5xl`
- [ ] Criar Reasoning Selector popup menu
- [ ] Adicionar `transform scale-x-[-1]` ao ícone Brain
- [ ] Corrigir cores do Reasoning (soft=green, max=#15803d)
- [ ] Adicionar `shadow-sm` ao User Message bubble

### Prioridade ALTA 🟡

- [ ] Trocar textos Empty State ("Zane Photo Studio", "Zane Doc", "Zane Canvas")
- [ ] Adicionar label "Zane" verde no LoadingIndicator
- [ ] Implementar textos de loading por módulo
- [ ] Redesenhar Sources Chips com dot indicator e glow
- [ ] Adicionar glow shadow no AI Badge
- [ ] Ajustar padding horizontal desktop para `md:px-6`
- [ ] Adicionar border `border-white/5` no User Message
- [ ] Implementar `backdrop-blur-xl` no Attach Menu

### Prioridade MÉDIA 🟢

- [ ] Ajustar gradient AI Badge para `to-emerald-900`
- [ ] Aumentar border radius do Attach Menu para `rounded-2xl`
- [ ] Simplificar labels do Attach Menu ("Câmera", "Fotos", "Arquivos")
- [ ] Adicionar AI Message content `gap-4`
- [ ] Considerar Model Selector como dropdown inline
- [ ] Avaliar remoção de background/border do Header
- [ ] Ajustar altura Header para 72px

### Prioridade BAIXA ⚪

- [ ] Adicionar footer "Fim da galeria" na ZaneGallery
- [ ] Implementar aria-roles completos nos seletores
- [ ] Adicionar focus-visible rings em todos componentes interativos
- [ ] Considerar animação `slide-in-from-bottom-2` em menus

---

## MÉTRICAS CONSOLIDADAS

| Categoria | Paridade |
|-----------|----------|
| **Design Tokens (Cores)** | 100% |
| **Tipografia Base** | 100% |
| **Espaçamentos Base** | 95% |
| **Border Radius** | 90% |
| **Shadows** | 80% |
| **Animações Spring** | 100% |
| **Animações CSS** | 95% |
| **AI Message** | 40% |
| **User Message** | 85% |
| **Empty States** | 50% |
| **Loading Indicator** | 75% |
| **Sources Chips** | 30% |
| **Reasoning Selector** | 60% |
| **Attach Menu** | 70% |
| **Header** | 85% |
| **Sidebar** | 100% |
| **Input Bar** | 90% |
| **Settings Modal** | 98% |
| **Canvas Workspace** | 95% |
| **Photo Module** | 88% |
| **Doc Module** | 88% |

### **PARIDADE VISUAL GERAL: ~78%**

### Para atingir 95%+:
1. Corrigir AI Badge (impacto: +8%)
2. Corrigir Empty States (impacto: +6%)
3. Implementar Reasoning popup (impacto: +3%)
4. Ajustar Sources Chips (impacto: +2%)
5. Correções menores (impacto: +3%)

---

*Relatório gerado pelo Agente 14 - Sintetização de Design System*  
*Fonte: Consolidação dos relatórios dos Agentes 1-11*
