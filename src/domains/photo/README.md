# Domínio: Photo

Base estrutural para isolar componentes, hooks e serviços relacionados ao fluxo de fotos.  
As subpastas seguem o mesmo contrato do domínio Chat e servirão para o Strangler Fig quando migrarmos cada funcionalidade.

- `services/promptEnhancer.ts`: mantém o enriquecimento semântico do prompt.
- `services/photoRenderAgent.ts`: orquestra a simulação de geração de imagem e é consumido por `usePhotoExperience`.
