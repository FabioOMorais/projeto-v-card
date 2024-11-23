# Cartão de Visita — Desenvolve SP

Site institucional (cartão de visita) construído com React + TypeScript e Vite, focado em performance, componentização, responsividade e boa experiência de desenvolvedor.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Visite o repositório: https://github.com/FabioOMorais/site-desenvolve

---

## Sumário

- Visão Geral
- Tecnologias
- Pré-requisitos
- Instalação
- Scripts úteis
- Estrutura do projeto
- Componentes principais
- Estilos e design system
- Testes e qualidade de código
- Build e deploy
- CI / GitHub Actions
- Como contribuir
- FAQ e solução de problemas
- Licença e contatos

---

## Visão Geral

Este projeto é um site institucional de apresentação (cartão de visita) para o projeto Desenvolve SP. Ele é intencionalmente leve e otimizado para carregamento rápido, com foco em:

- Layout responsivo para desktop e mobile
- Componentização reutilizável
- Otimização de mídia (vídeos leves no `public/`)
- Acessibilidade básica (semântica HTML, foco, contraste)

Objetivo: ser uma base simples e moderna para apresentar serviços, programas ou pessoal técnico.

---

## Tecnologias

- React + TypeScript
- Vite (bundler / dev server)
- Tailwind CSS
- shadcn/ui (componentes UI)
- GitHub Actions (deploy/CI)
- Vercel (deploy)
- Testes (Jest / Testing Library ou Vitest — conforme configuração)
- Node.js (compatível com LTS)

---

## Pré-requisitos

- Node.js v18+ (recomendado) ou compatível com Vite
- npm (ou yarn/pnpm)
- Git

---

## Instalação (local)

Clone o repositório e instale dependências:

```bash
git clone https://github.com/FabioOMorais/site-desenvolve.git
cd site-desenvolve
npm install
```

Executar em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra http://localhost:5173 (ou a porta indicada pelo Vite).

---

## Scripts sugeridos

Falta adaptar conforme o package.json. Exemplos comuns:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Estrutura do projeto

Principais pontos para navegar pelo código:

- Entrada do app: `src/main.tsx`
- Componente raiz: `src/App.tsx`
- Estilos globais: `src/index.css`, `src/App.css`
- Componentes: `src/components/`
  - Exemplos: `Hero.tsx`, `FinancingCard.tsx`, `HoverVideoCard.tsx`, `InfoSection.tsx`, `NavLink.tsx`, `ProcessStep.tsx`, `ResourceCard.tsx`
- Assets públicos: `public/` (vídeos, `robots.txt`, imagens)
- Configurações:
  - `vite.config.ts`
  - `tailwind.config.ts`
  - `tsconfig.json`
- Pipeline de deploy: `.github/workflows/deploy.yml`
- Metadados e dependências: `package.json`

Sugestão: documentar componentes complexos com um comentário JSDoc ou MDX/Storybook para facilitar manutenção.

---

## Componentes e responsabilidades

- Hero: seção principal com título, subtítulo e CTA
- HoverVideoCard: cartão com vídeo preview (usar versões otimizadas / poster)
- FinancingCard, ResourceCard: cards reutilizáveis para exibir informações
- NavLink: navegação com controle de foco/estado ativo
- ProcessStep: passos do processo / timeline

Observações:
- Evite carregar vídeos pesados na home; prefira poster + play on demand.
- Extraia lógicas complexas para hooks em `src/hooks/`.

---

## Estilos e design system

- Tailwind CSS para utilitários e responsividade
- shadcn/ui para primitives & componentes acessíveis
- Recomenda-se:
  - Configurar tokens (cores, espaçamentos) no `tailwind.config.ts`
  - Usar classes utilitárias e componentes atômicos para manter consistência
  - Garantir contraste e acessibilidade de foco (outline visível)

---

## Testes e qualidade de código

- Faça testes unitários para componentes críticos (Vitest/Jest + Testing Library)
- Rodar checagem de tipos:
  ```bash
  npm run typecheck
  ```
- Lint e formatação:
  ```bash
  npm run lint
  npm run format
  ```

Se não existir configuração de ESLint/Prettier/TypeScript strict, recomendo adicioná-las para manter a qualidade.

---

## Build e deploy

Build de produção:

```bash
npm run build
```

Preview local do build:

```bash
npm run preview
```

Deploy sugerido:
- GitHub Pages, Netlify, Vercel ou GitHub Actions para publicar o build do diretório `dist`.
- O repositório já possui um workflow: `.github/workflows/deploy.yml`. Verifique as variáveis/segredos necessários (ex.: GH_TOKEN, ACTIONS_PAT, ou configurações do provider).

Exemplo rápido (Vercel/Netlify): apontar a raiz para o comando `npm run build` e pasta de publicação `dist`.

---

## CI / GitHub Actions

- Verifique `.github/workflows/deploy.yml` para entender o fluxo atual.
- Recomendações:
  - Adicionar job de lint + typecheck + tests antes do deploy.
  - Lock de node-version para consistência.
  - Usar cache de dependências (actions/cache) para acelerar runs.

---

## Como contribuir

1. Fork e clone o repositório
2. Crie uma branch de feature/bugfix:
   ```bash
   git checkout -b feat/descricao-curta
   ```
3. Faça commits claros e pequenos
4. Abra um Pull Request detalhando mudanças e screenshots/preview se aplicável

Guia rápido de PR:
- Descreva objetivo e comportamento
- Liste comandos para rodar localmente
- Inclua screenshots/gifs quando alterar UI
- Referencie issue(s) relacionadas, se houver

---

## FAQ e solução de problemas

- Erro ao instalar dependências:
  - Remova node_modules e package-lock.json e tente novamente:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
- Problemas de CSS não aplicando:
  - Verifique se `index.css` importa `tailwind` e se `tailwind.config.ts` inclui os paths corretos `content`.
- Vídeos com autoplay bloqueado:
  - Navegadores bloqueiam autoplay com som; use `muted` ou poster + play on demand.

---

## Próximos passos sugeridos (opcionais)

- Adicionar Storybook para documentar componentes visualmente
- Configurar testes visuais / Percy ou Chromatic
- Melhorar a pipeline CI: lint -> tests -> build -> deploy
- Otimizar imagens e vídeos (WebP / AVIF / MP4 H.264/HEVC com bitrate controlado)

---

## Licença

Adicione a licença apropriada no repositório (ex.: MIT). Se já existir, atualize esta seção conforme aplicável.

---

## Contato

Desenvolvedor / Maintainer: Fabio O. Morais  
Repositório: https://github.com/FabioOMorais/site-desenvolve
