# Plano: Documento da Arquitetura Alvo

> **Data:** 02/12/2025  
> **Objetivo:** Desenhar e documentar em Markdown a arquitetura ideal (SOLID + micro módulos) para o Zane Chat AI, assegurando modularização em baixo nível e alinhamento com Context7 (React/TanStack) antes de gerar o artefato final.

---

## Referências Context7
- **React Dev – Project Structure & Thinking in React** (`/websites/react_dev`, tópicos *project-structure*, *thinking-in-react*, *understanding-your-ui-as-a-tree*). Reforçam divisão em componentes pequenos, árvores de dependência claras e estado minimalista.
- Princípios mapeados: quebrar UI em hierarquias alinhadas ao modelo de dados, evitar duplicidade de estado e manter dependências organizadas em árvores previsíveis.

---

## Graph of Thoughts (Nós / Dependências)
```
{N1 Router/App Shell}
  -> orquestra {N2 Domínios (Chat, Doc, Photo, Canvas, Settings)}
       -> compostos por {N3 Camadas locais: components, hooks, stores, services}
            -> dependem de {N4 Infra comum: contexts, design tokens, orpc, integrations}
                 -> persistem/expõem dados via {N5 Edge Functions/Supabase futuros}
```
Impacto do trabalho: o arquivo Markdown precisa representar esse grafo e documentar responsabilidades, limites e dependências para evitar acoplamento cruzado.

---

## Fluxograma Alvo
```
[Entrada Usuário]
   ↓ (TanStack Router decide domínio)
[Domínio X Container]
   ↓
[Hooks locais manipulam estado + serviços]
   ↓
[Componentes presentacionais aplicam tokens]
   ↓
[Serviços/ORPC opcionais → Edge Functions futuros]
```
O documento final deve ilustrar visualmente (diagramas ASCII) e textualmente como esse fluxo se mantém isolado por domínio.

---

## Passos Planejados (numerados)
1. **Coletar contexto atual**: revisar estrutura real (`src/*`, `AGENTS.md`, relatórios existentes) para garantir que o desenho reflita diretórios vigentes e regras (arquivos <300 linhas, sem `any`, etc.).
2. **Definir camadas macro**: mapear responsabilidades de App Shell, domínios e infraestrutura comum, apontando relação com SOLID/CRUD.
3. **Detalhar micro módulos**: para cada domínio, descrever subpastas (components, hooks, services, tests) e como evitam importações em massa.
4. **Especificar contratos e comunicações**: documentar como orpc, serviços e futuros edge functions se conectam mantendo microserviços independentes.
5. **Desenhar diagramas**: criar figuras ASCII (grafos e fluxos) mostrando caminhos de dados e dependências.
6. **Redigir guidelines operacionais**: adicionar seção com regras práticas (quando criar novo módulo, como versionar tokens, etc.).
7. **Verificar aderência às regras**: conferir checklist das inegociáveis (Graph of Thoughts, fluxograma, Context7, SOLID, CRUD, tokens, responsividade, testes).
8. **Salvar documento final**: gerar `ARQUITETURA-ALVO.md` na raiz consolidando tudo acima.

---

## Checklist das Regras Innegociáveis (Plano)
- [x] Graph of Thoughts incluído.
- [x] Fluxograma definido.
- [x] Consulta Context7 registrada.
- [x] SOLID/CRUD considerados (etapas 2-4).
- [x] Modularização em baixo nível abordada (etapa 3).
- [x] Design tokens/responsividade contemplados (etapas 2, 6).
- [x] Testes/Playwright lembrados (etapa 6 alude aos loops de validação).
- [x] Plano numerado concluído antes de executar.

---

> Com o plano aprovado, próximo passo é produzir o documento `ARQUITETURA-ALVO.md` seguindo as etapas listadas.
