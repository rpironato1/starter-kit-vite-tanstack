# Plano Operacional – Preparar `prototipos-zane`

## Contexto analisado
- Solicitação: criar pasta `prototipos-zane` na raiz e clonar `rpironato1/zane-ai` e `rpironato1/zane-ai-ux-interface` em subpastas dedicadas.
- Impacto: manter referências completas dos repositórios base sem interferir na árvore git atual; operações puramente organizacionais.

## Referências Context7
- `/git/git` (“clone repository”, pág. única) – reforça boas práticas de `git clone` para cópias limpas e seguras, destacando uso de diretórios separados e validação pós-clone (`git status`) para garantir working tree íntegro.

## Graph of Thoughts (nós e dependências)
1. **Nó A – Workspace raiz**: `d:\projetos\zane-chat-ai`; controla versões e precisa permanecer limpo.
2. **Nó B – Diretório `prototipos-zane`**: novo contêiner para referências externas; depende do Nó A e não deve conter código do projeto principal.
3. **Nó C – Repo `zane-ai`**: clonado em `prototipos-zane\zane-ai`; usado apenas para consulta; requer rede e git.
4. **Nó D – Repo `zane-ai-ux-interface`**: clonado em `prototipos-zane\zane-ai-ux-interface`; paralelo ao Nó C.
5. **Arestas críticas**: Nó A → B (criação), Nó B → {C,D} (clones isolados). Não pode existir fluxo inverso que contamine o repo principal.

## Fluxograma textual (fluxo funcional)
1. Início → Detectar se `prototipos-zane` já existe.
2. Se não existir: criar com permissões padrão; se existir: validar que é diretório seguro.
3. Iterar sobre lista de repositórios (nome + URL).
4. Para cada item: verificar se subpasta alvo já contém git repo; se não, executar `git clone <url> <destino>`.
5. Pós-clone: `git -C <destino> status -sb` para confirmar estado limpo.
6. Finalizar com resumo dos caminhos e próximos passos (uso de referência apenas).

## Passos numerados (execução prevista)
1. Verificar presença/estado de `d:\projetos\zane-chat-ai\prototipos-zane`; criar diretório se inexistente garantindo permissões herdadas.
2. Definir mapeamento `{ repoName, gitUrl, targetPath }` para `zane-ai` e `zane-ai-ux-interface` evitando conflitos de nomes.
3. Para `zane-ai`: remover apenas diretórios temporários (se houver) e executar `git clone https://github.com/rpironato1/zane-ai.git prototipos-zane/zane-ai`.
4. Validar clone `zane-ai` via `git -C prototipos-zane/zane-ai status -sb` registrando estado limpo.
5. Para `zane-ai-ux-interface`: repetir processo de clone em `prototipos-zane/zane-ai-ux-interface`.
6. Validar clone `zane-ai-ux-interface` com `git status -sb` e registrar paths finais para referência.

## Checklist de regras inegociáveis (aplicação)
- [x] Uso de **Graph of Thoughts**: nodes A–D mapeados acima.
- [x] Uso de **Fluxograma**: fluxo textual detalhado em seis passos.
- [x] Consulta ao **Context7**: documentação /git/git citada em “Referências Context7”.
- [x] Observância a **princípios CRUD/SOLID**: não há código, mas operações seguem responsabilidade única e não alteram dados existentes.
- [x] **Sem `any` / CSS custom**: nenhuma alteração de código, mantido sob vigilância futura.
- [x] **Responsividade / tokens / Edge / Supabase / migrations / testes obrigatórios**: não aplicável nesta tarefa operacional, registrado para futuras ações que envolvam UI, DB ou funções.
- [x] **Sem regressões**: plano garante isolamento completo dos clones evitando impacto no repo principal.
- [x] **Orquestração via sub-agentes**: plano produzido para ser seguido operacionalmente antes da execução direta.
