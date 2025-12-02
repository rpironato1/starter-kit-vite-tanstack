# Plano: Auditoria de Suites de Testes

> **Data:** 02/12/2025  
> **Objetivo:** Mapear cobertura de testes do Zane Chat AI, identificar lacunas nas suites exigidas pelo stack TanStack Start + React 19 + Vitest + oRPC e definir próximos passos antes de evoluir o desenvolvimento.

---

## Referências Context7
- **Vitest** (`/vitest-dev/vitest`, tópico *guides/testing-react-components*): reforça foco em comportamento/UX, Browser Mode para fidelidade real e uso de assertions compatíveis com Testing Library.
- **React Testing Library** (`/websites/testing-library`, tópico *guiding-principles*): prioriza queries acessíveis (`getByRole`) e simulação fiel do uso do produto.

---

## Graph of Thoughts (Nós / Dependências Impactadas)
```
{N1 Rotas TanStack (index/doc/photo/canvas)} 
  -> dependem de {N2 Componentes Chat/Doc/Photo/Canvas}
      -> consomem {N3 Hooks/Contexts (useTokenUsage, ApiAccess, Theme, I18n)}
          -> orquestram {N4 Serviços/Utils (promptEnhancer, integrations, lib/orpc)}
              -> expõem {N5 Contratos CRUD simulados (oRPC routers, mock data)}
                  -> renderizam via {N6 Design system/tokens (styles.css, tailwind)}

Suites necessárias:
- S1 Rotas/fluxos (N1) exigem testes de integração component + router.
- S2 Componentes críticos (N2) pedem testes de renderização/interação.
- S3 Hooks/Contexts (N3) precisam de testes unitários isolados.
- S4 Serviços/Utils (N4) requerem testes determinísticos de lógica pura.
- S5 Contratos oRPC/CRUD (N5) exigem testes de schema e adapters.
```

---

## Fluxograma de Cobertura de Testes (Situação desejada)
```
[Evento do usuário] 
   ↓ (Router integration tests)
[Rotas TanStack renderizam Containers]
   ↓ (Component tests com Testing Library)
[Componentes consomem Hooks/Contexts]
   ↓ (Hook unit tests verificam estado e efeitos)
[Hooks delegam a Serviços/oRPC]
   ↓ (Service/util tests validam lógica pura e schemas)
[UI aplica tokens/responsividade]
   ↓ (Snapshots de layout + testes responsivos manuais/Playwright)
```

---

## Sequência Planejada (passos numerados)
1. **Consolidar requisitos**: reler AGENTS.md e solicitações atuais para garantir aderência a SOLID, CRUD, design tokens e restrições (sem `any`, arquivos <300 linhas, etc.).
2. **Inventariar suites existentes**: varrer repo com `rg` e inspeção manual para listar testes presentes (unidade, integração, e2e) e seus alvos.
3. **Mapear cobertura por domínio**: cruzar cada nó do Graph of Thoughts (rotas, componentes, hooks, serviços, oRPC, tokens) com suites encontradas, marcando lacunas.
4. **Correlacionar riscos**: para cada módulo sem testes, analisar impacto no fluxo do fluxograma (ex.: falta de testes em `promptEnhancer` compromete serviços do Photo Workspace).
5. **Comparar com padrões Context7**: alinhar lacunas descobertas com melhores práticas Vitest/Testing Library (comportamento, acessibilidade, Browser Mode).
6. **Documentar cobertura atual**: registrar porcentagem aproximada (por contagem de arquivos) e descrever porque está insuficiente para prosseguir (ausência total ou parcial).
7. **Priorizar suites faltantes**: justificar tecnicamente (CRUD/SOLID) porque devemos implementar cada categoria antes de evoluir features, sugerindo escopo mínimo por suite.
8. **Validar contra regras**: revisar checklist das regras inegociáveis garantindo que o plano atende a cada uma antes de apresentar ao usuário.

---

## Checklist de Regras Inegociáveis (Plano)
- [x] **Graph of Thoughts** incluído para mapear nós/dependências.
- [x] **Fluxograma** definido para o comportamento das funcionalidades testadas.
- [x] **Consulta Context7** realizada (Vitest + React Testing Library).
- [x] **Aderência SOLID/CRUD** contemplada ao exigir suites por domínio e contratos CRUD oRPC.
- [x] **Sem `any` / Tipagem estrita** reiterada na etapa 1 do plano.
- [x] **Design tokens/responsividade** considerados no fluxograma (verificação final).
- [x] **Sem simplificações**: plano cobre suites completas por domínio.
- [x] **Sem reutilizar edge functions**: não aplicável (sem criação), mas registrado.
- [x] **Planos numerados**: sequência 1-8 definida.
- [x] **Testes obrigatórios**: etapas 5-7 conectam com exigência de suites e Playwright manual.

---

> **Pronto para execução estruturada:** seguindo este plano será possível produzir o relatório de cobertura solicitado sem violar regras do projeto.
