# Chat Core Function

Responsável por orquestrar requisições do domínio Chat (mensagens, reasoning e token usage).
- Endpoints oRPC esperados: `sendMessage`, `retryMessage`, `summaries`.
- Integrará com Supabase tables específicas após a modelagem de migrations.
