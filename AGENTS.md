# AGENTS.md — Guia para Agentes

Este arquivo orienta agentes e assistentes que trabalham neste repositório. Ele define regras inegociáveis, metodologia de trabalho, e diretrizes práticas verificadas no código-fonte. O escopo deste arquivo é todo o repositório.

- Escopo: todo o diretório do projeto (raiz).
- Precedência: siga instruções diretas do usuário/sistema; em seguida, siga este AGENTS.md. Regras mais específicas em diretórios aninhados (se existirem) têm precedência local.
- Padrão: mantenha consistência de estilo do código existente e evite alterações desnecessárias.

---

## REGRAS INEGOCIÁVEIS DO PROJETO

**VOCÊ DEVE USAR GRAPH OF THOUGHTS PARA MAPEAR NÓS, DEPENDÊNCIAS QUE ESTÃO INTERLIGADAS E SERÃO AFETADAS COM SUAS MODIFICAÇÕES**  
**VOCÊ DEVE USAR FLUXOGRAMA PARA ENTENDER O FLUXO E COMPORTAMENTO DAS FUNCIONALIDADES QUE ESTÁ MODIFICANDO, ENTREGANDO 100% FUNCIONAL PARA OS USUÁRIOS.**
**VOCÊ DEVE SEMPRE VERIFICAR PADRÕES DO PROJETO PARA SEGUIR, SEMPRE VERIFIQUE OUTRAS FUNCIONALIDAES QUE ESTÃO BEM IMPLEMENTADAS E BASEIE-SE EM SEUS PADRÕES.**    
**VOCÊ DEVE USAR MCP CONTEXT7 PARA OBTER DOCUMENTAÇÃO PADRÃO E EXEMPLOS SEMPRE QUE FOR PLANEJAR TAREFAS, DEVE CONSULTAR CONTEXT7 NO PLANEJAMENTO DE TAREFAS E SEGUIR PADRÕES.**  
**VOCÊ DEVE SEGUIR PRINCIPIOS SOLID PARA O PROJETO, RIGOROSAMENTE**
**VOCÊ DEVE SEGUIR PRINCIPIOS CRUD PARA O PROJETO, RIGOROSAMENTE**
**VOCÊ NÃO DEVE USAR ANY PROIBIDO USAR ANY COLOCAR CORRETAMENTE CONFORME CONTEXT7** 
**VOCÊ DEVE USAR APENAS CSS DESIGN TOKENS JÁ CONFIGURADOS EM 'src/index.css' e 'tailwind.config.ts' PROIBIDO CUSTOMIZAÇÃO CSS HARDECODED.**
**VOCÊ DEVE SEMPRE CRIAR PÁGINAS COM DESIGNS RESPONSIVOS, COM PERFEITO USO EM MOBILE, TABLET, E DESKTOP**
**VOCÊ NÃO DEVE SIMPLIFICAR FUNCIONALIDADES, NÃO DEVE REGREDIR FUNCIONALIDADES. TODA LINHA DE CÓDIGO QUE REMOVER, DEVE SER PROFUNDAMENTE ANALISADO OS IMPACTOS DE REMOÇÃO** 
**VOCÊ DEVE USAR MCP SUPABASE PARA TAREFAS ENVOLVENDO SUPABASE E BANCO DE DADOS (EDGE FUNCTIONS, MIGRATIONS, E OUTRAS)** 
**VOCÊ DEVE SALVAR TODA MIGRATIONS EM 'supabase\migrations' PROIBIDO APLICAR MIGRATIONS SEM CRIAR NA PASTA ANTES.** 
**VOCÊ NÃO DEVE REUTILIZAR EDGE FUNCTIONS ATUAIS, DEVE SEMPRE CRIAR UMA EDGE FUNCTION ESPECÍFICA PARA CADA FUNCIONALIDADE**
**VOCÊ DEVE SEMPRE REALIZAR DEPLOY DE EDGE FUNCTIONS QUE FORAM CRIADAS/MODIFICADAS USANDO SEMPRE 'npx supabase'**
**VOCÊ DEVE OBEDECER A ESTRUTURA DE EDGE FUNCTIONS DO PROJETO, PROIBIDO USAR '_shared', EDGE FUNCTIONS COM < 200 LINHAS MANTER EM 'index.ts', ENTRE 200-400 LINHAS AVALIAR MODULARIZAÇÃO SEMPRE PRIORIZAR MODULARIZAÇÃO E, > 400 LINHAS MODULARIZAR OBRIGATÓRIO DENTRO DE CADA PASTA DA EDGE FUNCTION.** 
**VOCÊ DEVE EXECUTAR TESTES NO BANCO DE DADOS TODA VEZ QUE EFETUAR ALTERAÇÕES, MIGRAÇÕES E QUALQUER OUTRA TAREFA NO BANCO DE DADOS VIA MCP SUPABASE** 
**VOCÊ DEVE MODULARIZAR ARQUIVOS "*.tsx" SEGUINDO PADRÕES DO PROJETO E DAS STACKS ENVOLVIDAS. PROIBIDO CRIAR ARQUIVOS "*.tsx" COM + 300 LINHAS.**
**VOCÊ DEVE ENTREGAR COM ZERO ERROS E WARNINGS DE BUILD, ZERO ERROS E WARNINGS DE LINT, ZERO ERROS E WARNINGS --noEmit, CONSOLE DEVTOOLS ZERO ERROS ZERO WARNINGS**  
**VOCÊ DEVE ENTREGAR TAREFA 100% TESTADA COM PLAYWRIGHT MCP TESTES MANUAIS PROIBIDO CRIAR SCRIPTS E2E DE TESTES, EXCETO POR AUTORIZAÇÃO CLARA DO USUÁRIO**  
**VOCÊ DEVE CRIAR ARQUIVOS DE PLANOS SEMPRE COM LISTA NUMERADA SEQUENCIAL DE TODOS OS PASSOS QUE VOCÊ DEVERÁ EXECUTAR PARA ENTREGAR A TAREFA 100% BEM SUCEDIDA.**
**VOCÊ NÃO DEVE CRIAR SOLUÇÕES TEMPORÁRIAS, SOLUÇÕES 'TAMPÃO', SIMPLIFICAÇÕES. AS SOLUÇÕES DEVEM SEMPRE RESOLVER DEFINITIVAMENTE PROBLEMAS DE FORMA ABRANGENTE**


## METODOLOGIA DE TRABALHO PARA PLANOS

```plaintext
Fluxo de planejamento
↓
Execução estruturada
↓
Validação final
```

### Sequência de Execução

1. **VOCÊ DEVE LER TODA A MINHA SOLICITAÇÃO ENVIADA, jamais leia partes, deve sempre ler totalmente**
2. **Estruture minha solicitação**
3. **Leia os arquivos/funções que serão afetados/modificados (leitura de código, funções supabase, SQL, Hooks, integrations, types, tudo que será afetado com a tarefa). Mapeie padrões atuais do projeto que estão corretos e funcionais para seguir esses padrões** 
4. **Usar graph of thougts para mapear nós, dependências, encadeamentos de funcionalidades, impacto do que você deverá criar/modificar. Proibido gerar erros em cascata**
5. **Usar fluxograma para entender os fluxos de funcionamento, como deve se comportar, e se as mudanças quebrarão/corrigirão os fluxos que serão afetados pela tarefa**
6. **Raciocine: Se eu mexer em arquivo 'X', vai afetar quais arquivos/funcionalidades? Se eu modificar arquivo 'X' para consetar arquivo 'Z', vai quebrar o arquivo 'Y'? Não posso fazer isso, devo corrigir arquivo 'X', que fará funcionar arquivo/funcionalidade 'Z' e MANTERÁ funcional o arquivo/funcionalidade 'Y'. Se eu remover/refatorar uma linha do arquivo 'X' qual o impacto que isso causará? quais funcionalidaes vou quebrar ? preciso ver tudo que depende diretamente e indiretamente desta funcionalidade antes de mexer, jamais posso modificar 'X' só para fazer 'Y' funcionar, devo modificar 'X' para que 'Y' e 'Z' funcionem corretamente, se 'Z' funciona normal, NÃO posso quebrar essa funcionalidade. Vou mexer em 'X', qual o comportamento esperado quando eu mexer e entregar funcional?**
7. **Consultar context7 para obter padrões, como fazer, o que fazer**
8. **Elaborar Plano usando todas as informações colhidas, seguindo rigorosamente minhas regras inegociáveis, explicar suas decisões e entregar fundamentada.**
9. **verificar se seguiu minhas regras inegociáveis. Deve elaborar checklist com check para marcar todas as minhas regras inegociáveis, analisar se o plano seguiu cada regra inegociável, para cada regra seguida, você marca como check confirmando. Se não seguiu alguma regra volte ao passo 1 obrigatório. Deve apresentar ao usuário esse checklist e mostrar aonde cada regra foi aplicada e seguida.**
10. **Apresentar o plano. VOCÊ DEVE APRESENTAR O PLANO SOMENTE QUANDO REALIZAR TODAS AS ETAPAS ANTERIORES.**

## METODOLOGIA DE TRABALHO PARA DESENVOLVIMENTO

```plaintext
Leitura do plano
↓
Execução rigorosa
↓
Correções iterativas
↓
Validação completa
↓
Entrega final
```

### Sequência de Execução

1. **Você deve ler Todo o plano/histórico anterior**
2. **Você deve iniciar a execução seguindo rigorosamente o plano. Você deve seguir rigorosamente TODAS as minhas regras inegociáveis sempre**
3. **Se encontrar problemas pelo caminho que façam você sair do plano VOCÊ DEVE:**
   - **VOCÊ DEVE Imediatamente consultar 'MCP Context7' ou 'Context7' ou 'Ferramenta context7' para aprender o que fazer, como fazer, como resolver.**
   - **Se envolver problemas complexos, VOCÊ DEVE aplicar graph of thougts, mapear nós, dependências para evitar erros em cascata corrigindo padronizado sem quebrar funcionalidades relacionadas. VOCÊ DEVE SEMPRE PLANEJAR CADA ALTERAÇÃO, JAMAIS ALTERE SEM PLANEJAR.**
   - **VOCÊ DEVE Sempre analisar o fluxo de cada função para entender como ela deve funcionar corretamente, isso ajuda você a tornar suas correções funcionais.**
4. **VOCÊ DEVE sempre executar após todas as tarefas:**
   ```bash
   # Validações obrigatórias
   npn run lint        # ZERO ERROS PERMITIDOS
   npm run build       # ZERO ERROS PERMITIDOS
   npx tsc --noEmit    # ZERO ERROS PERMITIDOS
   ```
   - **Testes completos no 'MCP supabase' em toda interação que for feita com supabase. (SQL, Edge functions, Hooks, tudo)**
   - **testes manuais com Playwright MCP testes de usabilidade agentic testing**
     - Usando os logins de teste ou logins fornecidos pelo usuário.
     - Navegando até as funcionalidades que foram modificadas
     - Testando 100% das funcionalidades, com interação total. VOCÊ DEVE INTERAGIR COM AS FUNCIONALIDADES, PROIBIDO ENTREGAR TRABALHO SEM TESTES INTERATIVOS
     - Analisando erros devtools de console - ZERO ERROS PERMITIDOS
     - Analisando regressões - ZERO REGRESSÕES PERMITIDAS
     - Analisando responsividade mobile, tablet, desktop - ZERO INTERFACES QUEBRADAS, 100% COMPONENTES CORRETAMENTE RENDERIZADOS, DISTRIBUIDOS, HARMÔNICOS.
5. **Se erros são encontrados nos testes, VOCÊ DEVE retornar ao passo 3 sempre, em loops de correções estruturadas e testes, até obter sucesso, é PROIBIDO PARAR NO MEIO DA TAREFA SEM COMPLETAR.**
6. **Se identificou totalmente funcional e atendeu aos critérios, poderá finalizar e gerar relatório completo conciso da sua tarefa.**

## CONFIGURAÇÕES E DADOS DE TESTE

### Configuração do Servidor
- **Servidor deve rodar porta 3027 obrigatório**

### **Comandos Proibidos (Usar mcps para as tarefas)**
- **EXCETO SE O USUÁRIO SOLICITAR O USO, SE O USUÁRIO SOLICITAR O USO, VOCÊ ESTÁ AUTORIZADO A USAR**
-  **VOCÊ NÃO DEVE USAR:** 
```bash
- 'npx supabase *'
- 'npx playwright *'
- 'yarn playwright *'
- 'supabase *'
```


