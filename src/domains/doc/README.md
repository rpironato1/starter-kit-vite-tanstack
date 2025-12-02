# Domínio: Doc

Estrutura inicial para comportar componentes, hooks, serviços e contratos do fluxo de documentos.  
Enquanto as implementações ainda residem em `src/components/doc`, este diretório já define o contorno para a migração gradual.

- `services/docAnalyzer.ts`: centraliza a lógica agentica mockada (planos, usage e simulação de resposta) e é consumido por `useDocExperience`.
- `hooks/useDocExperience.ts`: mantém apenas estado/UI e delega análise para o serviço, facilitando a troca futura por oRPC/Supabase.
