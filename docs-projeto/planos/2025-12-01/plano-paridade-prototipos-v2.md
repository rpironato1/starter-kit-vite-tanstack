# Plano de Paridade com Protótipos - Zane Chat AI

**Data:** 01/12/2025  
**Versão:** 2.0  
**Autor:** GitHub Copilot (Claude Opus 4.5)

---

## 📋 Resumo Executivo

Este plano detalha as correções necessárias para alinhar o projeto `zane-chat-ai` com os protótipos de referência localizados em `prototipos-zane/zane-ai` e `prototipos-zane/zane-ai-ux-interface`.

### Protótipos Analisados
| Protótipo | Caminho | Funcionalidades Principais |
|-----------|---------|---------------------------|
| zane-ai | `prototipos-zane/zane-ai/` | Sistema i18n completo, Backend repositories, TodoListPanel |
| zane-ai-ux-interface | `prototipos-zane/zane-ai-ux-interface/` | Interface simplificada, ZanePhotoModule |

---

## 🔍 Diferenças Identificadas

### 1. Sistema de Tradução i18n
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Sistema i18n | ✅ `utils/i18n.ts` com pt-BR e en-US | ❌ Não existe | 🔴 CRÍTICO |
| Hook useTranslation | ✅ Integrado aos componentes | ❌ Não existe | 🔴 CRÍTICO |
| Textos | ✅ Dinâmicos via `t.welcome.line1` | ❌ Hardcoded | 🔴 CRÍTICO |

### 2. Indicador de Raciocínio na Caixa de Chat
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Ícones | Brain/Zap/Activity/CircleOff | Brain/Zap/CircleOff/Sparkles | 🟡 AJUSTE |
| Posição dropdown | `bottom-16 left-12` (acima) | `bottom-full` (acima) | ✅ OK |
| Indicador ativo | Ponto verde no botão | Cor do ícone muda | ✅ OK |

### 3. Descrições Centralizadas nos Modos
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Chat | "Como posso te ajudar\nesta noite?" | "Olá! Como posso ajudar?" | 🟡 AJUSTE |
| Photo | Descrição com modelo dinâmico | ✅ Igual | ✅ OK |
| Doc | ✅ Centralizado | ✅ Centralizado | ✅ OK |
| Canvas | ✅ Centralizado | ✅ Centralizado | ✅ OK |

### 4. Seleção de Modelos (ModelSelector)
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Posição | `absolute top-16 left-1/2` (dropdown) | `fixed top-1/2 left-1/2` (modal central) | 🔴 CRÍTICO |
| Header | ❌ Sem header | ✅ "Select Model" + botão X | 🔴 CRÍTICO |
| Backdrop | Blur simples | Blur + escurecimento | 🟡 AJUSTE |

### 5. Botão Nova Conversa (+) na Sidebar
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Posição | INFERIOR (ao lado do badge usuário) | SUPERIOR (ao lado de "Menu") | 🔴 CRÍTICO |
| Layout footer | `[Avatar+Nome] ... [+ Btn]` | `[Avatar+Nome → ChevronRight]` | 🔴 CRÍTICO |
| Header sidebar | Sem botão | Com botão | 🔴 CRÍTICO |

### 6. Zane Photo - Descrição e Funcionalidades
| Aspecto | Protótipo | Projeto Atual | Status |
|---------|-----------|---------------|--------|
| Descrição | "Use o poder do {currentModel}..." | "Use o poder do Zane..." | 🟡 AJUSTE |
| AspectRatio | Na InputBar (botão com ícone) | ✅ Na InputBar + EmptyState | ✅ OK (extra) |
| Botão proporção | Ícones específicos por ratio | ✅ Igual | ✅ OK |

---

## 🧠 Graph of Thoughts - Mapeamento de Dependências

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SISTEMA i18n (NOVO)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ Arquivos novos:                                                             │
│ ├── src/lib/i18n.ts           (objeto de traduções)                        │
│ ├── src/hooks/useI18n.ts      (hook useTranslation)                        │
│ └── src/contexts/LanguageContext.tsx (provider opcional)                   │
│                                                                             │
│ COMPONENTES AFETADOS:                                                       │
│ ├── EmptyState.tsx            (títulos e subtítulos)                       │
│ ├── Sidebar.tsx               (labels do menu)                             │
│ ├── ModelSelector.tsx         (descrições dos modelos)                     │
│ ├── ReasoningSelector.tsx     (labels dos níveis)                          │
│ ├── AttachMenu.tsx            (labels de anexo)                            │
│ ├── SettingsModal.tsx         (todas as labels)                            │
│ └── __root.tsx                (provider de idioma)                         │
│                                                                             │
│ ⚠️ IMPACTO: ALTO - Muitos componentes precisarão de atualização           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    ModelSelector - POSICIONAMENTO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Arquivo: src/components/selectors/ModelSelector.tsx                         │
│                                                                             │
│ MUDANÇAS NECESSÁRIAS:                                                       │
│ ├── Remover header "Select Model" + botão X                                │
│ ├── Mudar de `fixed top-1/2` para `absolute top-16`                        │
│ ├── Manter `left-1/2 -translate-x-1/2` (centralizado horizontalmente)      │
│ └── Ajustar animação de entrada (y: -20 para baixo)                        │
│                                                                             │
│ COMPONENTES AFETADOS: NENHUM (componente isolado)                          │
│ ⚠️ IMPACTO: BAIXO - Mudança isolada                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    Sidebar - POSIÇÃO BOTÃO +                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ Arquivo: src/components/layout/Sidebar.tsx                                  │
│                                                                             │
│ MUDANÇAS NECESSÁRIAS:                                                       │
│ ├── Remover botão + do header                                              │
│ ├── Remover título "Menu" do header                                        │
│ ├── Adicionar botão + ao lado do badge usuário no footer                   │
│ └── Remover ChevronRight do badge usuário                                  │
│                                                                             │
│ COMPONENTES AFETADOS: NENHUM (componente isolado)                          │
│ ⚠️ IMPACTO: BAIXO - Mudança isolada                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    EmptyState - TEXTOS DINÂMICOS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Arquivo: src/components/chat/EmptyState.tsx                                 │
│                                                                             │
│ MUDANÇAS NECESSÁRIAS:                                                       │
│ ├── Chat: Alterar título para "Como posso te ajudar\nesta noite?"          │
│ ├── Chat: Remover ou ocultar subtítulo                                     │
│ ├── Photo: Alterar descrição para usar modelo dinâmico                     │
│ └── Integrar com sistema i18n (se implementado)                            │
│                                                                             │
│ COMPONENTES AFETADOS: index.tsx, photo.tsx, doc.tsx, canvas.tsx            │
│ ⚠️ IMPACTO: MÉDIO - Afeta várias rotas                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Fluxograma - Comportamento Esperado

```
                   ┌─────────────────────────────────┐
                   │     Usuário abre aplicação      │
                   └────────────────┬────────────────┘
                                    │
                                    ▼
                   ┌─────────────────────────────────┐
                   │      Detectar idioma (i18n)     │
                   │    [pt-BR | en-US] preferido    │
                   └────────────────┬────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│   Chat View   │          │  Photo View   │          │  Canvas View  │
└───────┬───────┘          └───────┬───────┘          └───────┬───────┘
        │                          │                          │
        ▼                          ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                     │
│   [Menu] ◄────────────► [Model Name ▼] ◄────────────► [Avatar]         │
│                              │                                          │
│                              ▼                                          │
│            ┌──────────────────────────────────┐                        │
│            │    Model Selector (DROPDOWN)     │ ◄─── EMERGE ACIMA      │
│            │    position: absolute top-16     │     (não modal central)│
│            │    Sem header "Select Model"     │                        │
│            └──────────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│  EmptyState   │          │  EmptyState   │          │  EmptyState   │
│  "Como posso  │          │ "Zane Photo   │          │ "Zane Canvas" │
│   te ajudar   │          │   Studio"     │          │               │
│  esta noite?" │          │ + AspectRatio │          │               │
│  (2 linhas)   │          │  (opcional)   │          │               │
└───────────────┘          └───────────────┘          └───────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                             INPUT BAR                                   │
│                                                                         │
│   [+] │ [Brain/Zap] │ [Textarea: "Chat com Zane"] │ [Mic] │ [Send]     │
│         │                                                               │
│         ▼                                                               │
│    ┌──────────────────────────┐                                        │
│    │ Reasoning Selector       │ ◄─── EMERGE PARA CIMA                  │
│    │ position: bottom-full    │      (menu dropdown)                   │
│    │ Ícones: Zap/Brain/       │                                        │
│    │         Sparkles/CircleOff│                                       │
│    └──────────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              SIDEBAR                                    │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │  (SEM header "Menu" + botão - apenas espaço ou logo opcional)   │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │  Menu Items:                                                     │  │
│   │  ├── [💬] Conversas                                             │  │
│   │  ├── [🖼️] Zane Photo                                            │  │
│   │  ├── [📄] Zane Doc                                              │  │
│   │  └── [⊞] Zane Canvas                                            │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │  Histórico Recente (accordion expandível)                        │  │
│   │  └── Lista de conversas anteriores                               │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                         FOOTER                                   │  │
│   │  ┌─────────────────────────────────────┐  ┌─────────────────┐  │  │
│   │  │ [Avatar] Nome do Usuário            │  │  [+ Nova Chat]  │  │  │
│   │  │ (clica para abrir Settings)         │  │  (botão verde)  │  │  │
│   │  └─────────────────────────────────────┘  └─────────────────┘  │  │
│   └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 Passos de Execução (Numerados Sequencialmente)

### FASE 1: Preparação e Análise (Já Concluída)
- [x] 1.1. Ler e analisar protótipos em `prototipos-zane/`
- [x] 1.2. Ler e analisar implementação atual em `src/`
- [x] 1.3. Mapear diferenças entre protótipos e projeto atual
- [x] 1.4. Criar Graph of Thoughts com dependências
- [x] 1.5. Criar fluxograma de comportamento esperado
- [x] 1.6. Consultar Context7 para padrões de i18n

### FASE 2: Sistema de Internacionalização (i18n)
- [ ] 2.1. Criar arquivo `src/lib/i18n.ts` com traduções pt-BR e en-US
- [ ] 2.2. Criar hook `src/hooks/useI18n.ts` com `useTranslation`
- [ ] 2.3. Criar context `src/contexts/LanguageContext.tsx` para provider de idioma
- [ ] 2.4. Integrar provider no `__root.tsx`
- [ ] 2.5. Atualizar EmptyState.tsx para usar i18n
- [ ] 2.6. Atualizar Sidebar.tsx para usar i18n
- [ ] 2.7. Atualizar ModelSelector.tsx para usar i18n
- [ ] 2.8. Atualizar ReasoningSelector.tsx para usar i18n
- [ ] 2.9. Atualizar AttachMenu.tsx para usar i18n
- [ ] 2.10. Atualizar componentes de Settings para usar i18n

### FASE 3: ModelSelector - Posicionamento
- [ ] 3.1. Modificar ModelSelector.tsx:
  - [ ] 3.1.1. Remover header "Select Model" e botão X
  - [ ] 3.1.2. Mudar posição de `fixed top-1/2` para `absolute top-16`
  - [ ] 3.1.3. Ajustar animação de entrada (y: -20 → y: 0)
  - [ ] 3.1.4. Manter centralização horizontal com `left-1/2 -translate-x-1/2`
- [ ] 3.2. Testar em todas as views (Chat, Photo, Doc, Canvas)

### FASE 4: Sidebar - Reposicionar Botão Nova Conversa
- [ ] 4.1. Modificar Sidebar.tsx:
  - [ ] 4.1.1. Remover botão + do header
  - [ ] 4.1.2. Remover título "Menu" do header (ou substituir por espaço/logo)
  - [ ] 4.1.3. Modificar footer para incluir botão + ao lado do badge
  - [ ] 4.1.4. Remover ChevronRight do badge usuário
  - [ ] 4.1.5. Ajustar layout footer para `flex items-center justify-between`
- [ ] 4.2. Testar navegação e interações

### FASE 5: EmptyState - Ajustar Textos
- [ ] 5.1. Modificar EmptyState.tsx:
  - [ ] 5.1.1. Chat: Alterar título para "Como posso te ajudar\nesta noite?"
  - [ ] 5.1.2. Chat: Tornar subtítulo opcional ou remover
  - [ ] 5.1.3. Manter ícone 3D (é uma melhoria sobre o protótipo)
- [ ] 5.2. Modificar photo.tsx:
  - [ ] 5.2.1. Passar modelo atual para descrição dinâmica
- [ ] 5.3. Testar em mobile e desktop

### FASE 6: ReasoningSelector - Ajustes Menores
- [ ] 6.1. Verificar ícones (opcional: adicionar Activity para "Médio")
- [ ] 6.2. Garantir que dropdown abre para cima corretamente
- [ ] 6.3. Testar indicador visual de nível ativo

### FASE 7: Validação e Testes
- [ ] 7.1. Executar `npm run check` (lint + format)
- [ ] 7.2. Executar `npm run build`
- [ ] 7.3. Executar `npx tsc --noEmit`
- [ ] 7.4. Testar com Playwright MCP:
  - [ ] 7.4.1. Testar Chat view (EmptyState, ModelSelector, ReasoningSelector)
  - [ ] 7.4.2. Testar Photo view (AspectRatio, ModelSelector)
  - [ ] 7.4.3. Testar Sidebar (navegação, botão +, badge usuário)
  - [ ] 7.4.4. Testar responsividade mobile/tablet/desktop
  - [ ] 7.4.5. Verificar console DevTools (zero erros/warnings)

---

## ✅ Checklist de Regras Inegociáveis

| Regra | Status | Onde Aplicada |
|-------|--------|---------------|
| Graph of Thoughts para mapear nós e dependências | ✅ | Seção "Graph of Thoughts" neste documento |
| Fluxograma para entender fluxos e comportamentos | ✅ | Seção "Fluxograma" neste documento |
| Verificar padrões do projeto para seguir | ✅ | Análise de componentes existentes |
| Usar MCP Context7 para documentação | ✅ | Consultado para react-i18next |
| Seguir princípios SOLID | ⏳ | Será aplicado na implementação |
| Seguir princípios CRUD | ⏳ | Será aplicado na implementação |
| NÃO usar `any` | ⏳ | Será validado com tsc --noEmit |
| Usar apenas CSS design tokens | ⏳ | Usar classes do Tailwind e tokens existentes |
| Designs responsivos (mobile/tablet/desktop) | ⏳ | Será testado com Playwright MCP |
| NÃO simplificar/regredir funcionalidades | ⏳ | Análise de impacto em cada mudança |
| Modularizar arquivos .tsx (< 300 linhas) | ⏳ | Será validado após implementação |
| ZERO erros de build/lint/noEmit | ⏳ | Validação final obrigatória |
| Testes com Playwright MCP | ⏳ | Fase 7 do plano |
| Plano com lista numerada sequencial | ✅ | Este documento |
| Soluções definitivas (não temporárias) | ⏳ | Implementação completa de i18n |

---

## 📊 Estimativa de Esforço

| Fase | Complexidade | Arquivos Afetados | Estimativa |
|------|--------------|-------------------|------------|
| FASE 2 (i18n) | Alta | ~10 arquivos | ~2-3 horas |
| FASE 3 (ModelSelector) | Baixa | 1 arquivo | ~30 min |
| FASE 4 (Sidebar) | Baixa | 1 arquivo | ~30 min |
| FASE 5 (EmptyState) | Baixa | 2 arquivos | ~30 min |
| FASE 6 (ReasoningSelector) | Muito Baixa | 1 arquivo | ~15 min |
| FASE 7 (Validação) | Média | - | ~1 hora |
| **TOTAL** | - | - | **~5-6 horas** |

---

## 🎯 Critérios de Sucesso

1. ✅ Sistema i18n funcional com suporte a pt-BR e en-US
2. ✅ ModelSelector aparece como dropdown abaixo do header (não modal central)
3. ✅ Botão + de nova conversa posicionado ao lado do badge do usuário na sidebar
4. ✅ Textos do EmptyState alinhados com protótipos
5. ✅ Zero erros de build, lint e TypeScript
6. ✅ Interface responsiva em mobile, tablet e desktop
7. ✅ Console DevTools sem erros ou warnings

---

## 📚 Referências

### Arquivos do Protótipo (Referência)
- `prototipos-zane/zane-ai/utils/i18n.ts` - Sistema de traduções
- `prototipos-zane/zane-ai/components/ModelSelector.tsx` - Dropdown de modelos
- `prototipos-zane/zane-ai/components/Sidebar.tsx` - Layout da sidebar
- `prototipos-zane/zane-ai/components/ReasoningSelector.tsx` - Seletor de raciocínio
- `prototipos-zane/zane-ai/components/PhotoView.tsx` - View de foto

### Arquivos do Projeto (A Modificar)
- `src/components/selectors/ModelSelector.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/chat/EmptyState.tsx`
- `src/components/selectors/ReasoningSelector.tsx`
- `src/routes/photo.tsx`
- `src/routes/__root.tsx`

---

**Próximo Passo:** Aguardar aprovação do usuário para iniciar a execução do plano.
