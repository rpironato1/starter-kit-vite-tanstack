# GEMINI.md — Project Bible & Operational Guide

> **Versão:** 1.0.0
> **Status:** Active Foundation
> **Contexto:** Zane Chat AI (Migration from Google AI Studio Prototypes to High-Performance Stack)

Este documento é a fonte única da verdade para o desenvolvimento do projeto **Zane Chat AI**. Ele consolida a arquitetura, regras inegociáveis e fluxos de trabalho para Agentes e Desenvolvedores.

---

## 1. Arquitetura do Projeto

### 1.1. Visão Geral & Stack Atual
O projeto é uma aplicação web de alta performance focada em UI/UX rica e arquitetura type-safe, com um backend de IA agêntico avançado.

*   **Frontend Framework:** TanStack Start (Server-Side Rendering & Client Hydration).
*   **Core Library:** React 19 + Vite 7.
*   **Linguagem:** TypeScript 5.7 (Strict Mode).
*   **Roteamento:** TanStack Router (File-based routing em `src/routes`).
*   **Gerenciamento de Estado:**
    *   **Global/UI:** TanStack Store (Atomic & Derived Stores).
    *   **Server/Async:** TanStack Query (via integração oRPC).
*   **Estilização:**
    *   Tailwind CSS v4 (Engine nativa).
    *   **Design Tokens:** Variáveis CSS nativas em `src/styles.css` (sem `tailwind.config.js` complexo).
    *   **Animações:** Framer Motion (Spring physics).
    *   **Ícones:** Lucide React.
*   **API & Comunicação:**
    *   **Protocolo:** oRPC (End-to-end type safety).
    *   **Validação:** Zod v4.
    *   **Client:** Isomórfico (funciona no Server e Client).
*   **Infraestrutura:**
    *   **Runtime:** Cloudflare Workers (Edge) / Supabase Edge Functions.
    *   **Deploy:** Wrangler / Supabase CLI.

### 1.2. Arquitetura de IA (Zane Swarm)
Baseada nos protótipos `prototipos-zane/zane-ai`:

*   **Provider:** Google Gemini API (via `@google/genai` SDK).
*   **Orquestração:** Custom Agentic System (sem frameworks de terceiros).
    *   **Planner:** Agente de planejamento estratégico com Thinking Budget.
    *   **Swarm Search:** Workers paralelos para pesquisa (Google Search Tool).
    *   **Visual Swarm:** Multi-critics para análise de imagem (Precision, Creative, Technical).
    *   **Judge:** Agente final que sintetiza o dossiê de execução.
*   **Auditoria:** Rastreamento granular de tokens (Input, Output, Thinking, Cache) por etapa.
*   **Distribuição Híbrida:** A lógica será distribuída estrategicamente entre **Cloudflare Workers** (Server Functions do TanStack Start) para operações leves/SSR e **Supabase Edge Functions** para tarefas de longa duração ou pesadas em banco de dados.

### 1.3. Gap Analysis & Objetivos (Current vs. Target)

| Camada | Estado Atual (Prototype FE) | Estado Alvo (Production) |
|--------|-----------------------------|--------------------------|
| **AI Logic** | Mocked (`setTimeout`) | **Portar `ZaneProAgent`** para arquitetura Híbrida (CF Workers/Supabase) |
| **Data Layer** | Inexistente/Local | **Supabase** (PostgreSQL) com Schemas `prototipos-zane/backend/schemas` |
| **Auth** | N/A | **Supabase Auth** |
| **Canvas** | UI Only | **Sandboxed Execution** + Artifact Persistence |
| **Settings** | LocalStorage | **Synced User Preferences** (DB) |

### 1.3. Regras de Arquitetura (Inegotiaveis)
Baseado em `@AGENTS.md`:

1.  **SOLID & CRUD:** Toda implementação deve respeitar princípios SOLID e operações CRUD padronizadas.
2.  **Type Safety:** **PROIBIDO `any`**. Uso estrito de TypeScript e Zod.
3.  **Modularização:**
    *   Arquivos `.tsx` < 300 linhas.
    *   Funções Edge < 200 linhas (preferencialmente).
    *   Modularização por domínio (`src/components/chat`, `src/components/canvas`).
4.  **Estilização:**
    *   **PROIBIDO** hardcoded CSS/Hex colors no JSX.
    *   **OBRIGATÓRIO** usar tokens semânticos (`bg-surface`, `text-primary`) definidos em `src/styles.css`.
5.  **Performance:**
    *   Zero erros de lint/build.
    *   Responsividade total (Mobile/Tablet/Desktop).

---

## 2. Fluxo de Planejamento (Plan Zane)

Todo trabalho deve começar com um plano explícito. **Jamais execute código sem um plano aprovado.**

### Metodologia: Graph of Thoughts + Fluxogramas

1.  **Entendimento Profundo:**
    *   Ler solicitação completa.
    *   Ler arquivos afetados (`read_file`).
    *   Consultar documentação externa via **Context7** (obrigatório para novas libs/patterns).

2.  **Mapeamento de Dependências (GoT):**
    *   Identificar Nós: Arquivos A, B, C.
    *   Raciocinar: "Se eu mudar A, quebra B? O C depende da interface de A?"
    *   Prevenir erros em cascata.

3.  **Fluxo Lógico:**
    *   Criar fluxograma mental ou escrito do comportamento esperado.
    *   Ex: `User Click -> Store Update -> UI Re-render -> API Call`.

4.  **Checklist de Regras Inegociáveis:**
    *   [ ] Segue SOLID?
    *   [ ] Mantém responsividade?
    *   [ ] Não usa `any`?
    *   [ ] Usa Design Tokens?

5.  **Output do Plano:**
    *   Lista numerada sequencial de passos atômicos.
    *   Checklist de validação de regras.

---

## 3. Fluxo de Execução (Orquestrador Zane)

A execução deve ser cirúrgica e validada a cada passo.

### Ciclo de Desenvolvimento

1.  **Leitura do Plano:** Carregar o contexto do plano aprovado.
2.  **Execução Atômica:**
    *   Implementar passo X.
    *   Não "simplificar" ou criar soluções "tampão". Resolver definitivamente.
    *   Seguir convenções de código existentes (`.cursorrules`, `biome.json`).
3.  **Correção Iterativa:**
    *   Encontrou erro? **PARE.**
    *   Consulte **Context7** ou documentação.
    *   Replaneje a correção (Mini-GoT).
    *   Aplique a correção.
4.  **Verificação Estática (Obrigatória a cada iteração maior):**
    ```bash
    npm run lint        # Zero erros
    npm run build       # Zero erros
    npx tsc --noEmit    # Zero erros
    ```

---

## 4. Fluxo de Testes (Test Zane)

A qualidade é garantida por testes manuais assistidos e verificações automatizadas.

### Protocolo de Testes

1.  **Testes de Infraestrutura (Supabase/DB):**
    *   Usar MCP Supabase para validar Migrations e Edge Functions.
    *   Nunca commitar migration sem testar `up` e `down` (quando aplicável).

2.  **Agentic Testing (Playwright MCP):**
    *   **NÃO** criar scripts E2E (`spec.ts`) salvo se explicitamente pedido.
    *   **USAR** ferramentas de navegador (`browser_navigate`, `browser_click`, `browser_take_screenshot`) para testar manualmente a aplicação rodando.
    *   **Cenários:**
        *   Fluxo feliz (Happy Path).
        *   Fluxo de erro (Error Handling).
        *   Responsividade (Redimensionar browser e verificar quebras).
        *   Console do navegador (Verificar logs de erro/warning).

3.  **Critérios de Aceite:**
    *   Funcionalidade 100% operante conforme pedido.
    *   Zero regressões em funcionalidades vizinhas.
    *   Zero erros no console.
    *   Design fiel (Pixel Perfect) em relação aos tokens.

## 5. Ferramentas e MCPs Obrigatórios (Inegotiavel)

O uso de **Model Context Protocol (MCP)** é **OBRIGATÓRIO** para garantir a segurança, padronização e eficiência das operações.

### 5.1. Ferramentas de Infraestrutura (Supabase)
**PROIBIDO USAR CLI DIRETAMENTE** (ex: `npx supabase *`, `supabase *`) salvo se explicitamente autorizado.

*   **MCP Supabase:** Deve ser usado para **todas** as interações com banco de dados e edge functions.
    *   Criar Migrations.
    *   Aplicar Migrations (`up`/`down`).
    *   Deploy de Edge Functions.
    *   Invocar/Testar Edge Functions.
    *   Consultar dados SQL.

### 5.2. Ferramentas de Teste (Playwright)
**PROIBIDO USAR CLI DIRETAMENTE** (ex: `npx playwright *`) salvo se explicitamente autorizado.

*   **MCP Playwright (Agentic Testing):** Deve ser usado para validar todas as entregas de UI.
    *   `browser_navigate`: Acessar rotas.
    *   `browser_click`: Interagir com botões/links.
    *   `browser_take_screenshot`: Validar visualmente.
    *   `browser_console_messages`: Garantir zero erros no console.
*   **Responsividade:** Testar redimensionando o viewport (`browser_resize`) para Mobile (375px), Tablet (768px) e Desktop (1440px).

### 5.3. Ferramentas de Documentação (Context7)
**OBRIGATÓRIO** consultar antes de qualquer implementação técnica nova.

*   `resolve-library-id`: Encontrar libs compatíveis.
*   `get-library-docs`: Obter padrões de código e exemplos.

### 5.4. Ferramentas de Sistema
*   `run_shell_command`: Permitido apenas para comandos de build local (`npm run build`, `npm run lint`, `tsc`), instalação de pacotes (`npm install`) e gestão de git.
*   `write_file` / `read_file` / `replace`: Manipulação de código-fonte.
