# Shared Layer

Espaço reservado para componentes, hooks, serviços e tipos reutilizáveis entre domínios.  
Qualquer recurso colocado aqui precisa ser verdadeiramente cross-domain e documentado para evitar dependências indevidas.

## Componentes atuais

- `PrototypeInputContainer`: wrapper de layout usado pelos módulos de Chat, Photo, Doc e Canvas para manter o input “pill” dos protótipos.
- `CommandBarBase`: container flexível com slots para leading/primary/trailing/footer utilizado pelos CommandBars legados e por componentes que sigam o padrão dos protótipos.
- `InputBar`: implementação genérica (legada) do input principal baseado em `CommandBarBase`, mantida aqui para reuso controlado.
