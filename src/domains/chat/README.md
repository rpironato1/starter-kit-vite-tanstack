# Domínio: Chat

Estrutura pensada para isolar os micro-módulos do chat de acordo com `ARQUITETURA-ALVO.md`.

- `components/`: UI específica (mensagens, input, painéis).
- `hooks/`: estado local e adapters do domínio.
- `services/`: orquestradores e lógicas puras (ex.: prompt enhancer futuro).
- `orpc/`: contratos e clients para edge functions do chat.
- `tests/`: suites unitárias/integradas específicas do domínio.

> Nesta etapa inicial apenas componentes foram migrados; as demais pastas servem como base para a próxima fase do Strangler Fig.
