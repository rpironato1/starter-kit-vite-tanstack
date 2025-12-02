# Domínio: Chat

Estrutura pensada para isolar os micro-módulos do chat de acordo com `ARQUITETURA-ALVO.md`.

- `components/`: UI específica (mensagens, input, painéis).
- `hooks/`: estado local e adapters do domínio.
- `services/`: orquestradores e lógicas puras (ex.: `chatAgent` que simula respostas do domínio).
- `orpc/`: contratos e clients para edge functions do chat.
- `tests/`: suites unitárias/integradas específicas do domínio.

> O `chatAgent` já está implementado e consumido pelo `useChatExperience`, mantendo as rotas como containers finos enquanto evoluímos para o oRPC real.
