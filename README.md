# Projeto V-Card — Cartão de Visita Digital com QR Code

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Uma solução simples e modular para criar cartões de visita digitais acessíveis via QR Code, registrar acessos e exibir estatísticas em um painel local. Este repositório agrupa três subprojetos:

- site-desenvolve-demo/ — Frontend (cartão digital)
- card-tracker/ — Backend (redirecionamento + registro)
- local-stats-viewer/ — Dashboard local (visualização das estatísticas)

--- 

Índice
- [Projeto V-Card — Cartão de Visita Digital com QR Code](#projeto-v-card--cartão-de-visita-digital-com-qr-code)
  - [Visão Geral](#visão-geral)
  - [Principais Recursos](#principais-recursos)
  - [Arquitetura](#arquitetura)
  - [Tecnologias](#tecnologias)
  - [Estrutura do Repositório](#estrutura-do-repositório)
  - [Requisitos](#requisitos)
  - [Instalação e Execução (modo desenvolvimento)](#instalação-e-execução-modo-desenvolvimento)
  - [Configuração recomendada (.env)](#configuração-recomendada-env)
  - [Fluxo de Funcionamento](#fluxo-de-funcionamento)
  - [Infraestrutura \& Produção (Deploy)](#infraestrutura--produção-deploy)
    - [Frontend (Vercel)](#frontend-vercel)
    - [Backend (Render)](#backend-render)
    - [API de Estatísticas](#api-de-estatísticas)
  - [Testes e Validação](#testes-e-validação)
  - [Possíveis Melhorias](#possíveis-melhorias)
  - [Autor](#autor)

---

Visão Geral
----------
O Projeto V-Card permite:
- Gerar um cartão de visita digital (frontend) acessível por QR Code.
- Utilizar um backend simples para interceptar o acesso via QR Code, registrar metadados (data/hora, user agent, IP aproximado) e redirecionar para o cartão.
- Exibir os acessos em um dashboard local para análise.

O foco é didático: integração entre frontend, backend e painel, armazenamento simples (JSON local) e fácil deploy do frontend.

Principais Recursos
-------------------
- Redirecionamento via QR Code
- Registro de acessos com timestamp e informações do cliente
- Dashboard local para visualização das estatísticas
- Projeto modular — cada componente roda independentemente

Arquitetura
----------
1. Frontend: cartão digital (React + TypeScript)
2. Backend: endpoint de rastreamento que registra acessos e redireciona
3. Dashboard: lê os arquivos/JSON gerados pelo backend e exibe métricas

A comunicação é feita por rotas HTTP entre frontend e backend; o dashboard lê os dados gerados pelo backend.

Tecnologias
-----------
Frontend
- React, TypeScript, Vite
- Tailwind CSS
- shadcn/ui (componentes)

Backend
- Node.js, Express
- Armazenamento local em JSON (arquivo)

Dashboard
- SPA simples (React ou alternativa leve) que lê os JSONs produzidos pelo backend

Outros
- Git / GitHub
- GitHub Actions (pipeline)
- Vercel (sugestão para deploy do frontend)

Estrutura do Repositório
------------------------
- site-desenvolve-demo/ — frontend do cartão digital
  - src/main.tsx, src/App.tsx, etc.
  - vite.config.ts, tsconfig.json, tailwind.config.ts
- card-tracker/ — backend de rastreamento e redirecionamento
  - src/index.ts (ou server.js)
  - storage/ (arquivos JSON de acessos)
- local-stats-viewer/ — dashboard local para exibir estatísticas

Requisitos
----------
- Node.js v18+ recomendado
- npm, yarn ou pnpm
- Git
- Navegador moderno

Instalação e Execução (modo desenvolvimento)
-------------------------------------------

1. Clone o repositório
```bash
git clone https://github.com/FabioOMorais/projeto-v-card.git
cd projeto-v-card
```

2. Rodar o Frontend (site-desenvolve-demo)
```bash
cd site-desenvolve-demo
npm install
npm run dev
# Ou: pnpm install && pnpm dev
# Frontend típico: http://localhost:5173
```

3. Rodar o Backend (card-tracker)
```bash
cd ../card-tracker
npm install
npm run dev
# Ou: pnpm install && pnpm dev
# Porta padrão sugerida: http://localhost:3000
```

4. Rodar o Dashboard (local-stats-viewer)
```bash
cd ../local-stats-viewer
npm install
npm run dev
# Ou: pnpm install && pnpm dev
# Normalmente: http://localhost:5174  (ou outra porta definida no projeto)
```

Observações
- Ajuste as portas conforme necessário. Se um dos subprojetos já define outra porta, alinhe as variáveis de ambiente.
- Alguns recursos (ex.: leitura direta de arquivos JSON) podem exigir que o dashboard e o backend estejam na mesma máquina ou que exista uma rota para expor os dados via HTTP para o dashboard.

Configuração recomendada (.env)
-------------------------------
Sugerimos usar variáveis de ambiente para portas, URLs e caminhos de armazenamento. Exemplo (arquivo .env no card-tracker):
```
PORT=3000
BASE_URL=http://localhost:3000
STORAGE_PATH=./storage/accesses.json
REDIRECT_URL=http://localhost:5173  # URL base do cartão digital
```

Fluxo de Funcionamento
----------------------
1. Gera-se um QR Code apontando para uma rota do card-tracker (ex.: https://meuservidor/track/<id>).
2. Usuário escaneia o QR Code no celular.
3. O card-tracker recebe a requisição:
   - Registra: timestamp, user agent, IP (quando possível), id do cartão, e outros metadados.
   - Persiste o registro em arquivo JSON (ou outro storage definido).
   - Redireciona o usuário para o cartão digital hospedado no frontend.
4. O dashboard (local-stats-viewer) lê os registros e exibe:
   - Total de acessos
   - Acessos por dia/hora
   - Navegadores/dispositivos mais usados
   - Filtros por cartão/id

## Infraestrutura & Produção (Deploy)

O projeto possui deploy real em produção, com separação entre frontend e backend, simulando uma arquitetura profissional em nuvem.

---

### Frontend (Vercel)

O cartão de visita digital (frontend) está publicado em produção no Vercel: https://projeto-cartao-fb.vercel.app


Principais características:
- Deploy automático a partir do GitHub
- CDN global
- Alta performance e otimização para aplicações React

---

### Backend (Render)

O servidor de rastreamento de acessos está publicado em produção no Render


Rota principal de redirecionamento via QR Code: https://card-tracker-iluk.onrender.com/r/vcard


Funções do backend:
- Registrar acessos dos usuários
- Identificar dispositivo e navegador
- Armazenar logs em arquivo `logs.json`
- Redirecionar automaticamente para o frontend

---

### API de Estatísticas

O backend disponibiliza uma API REST para consulta dos dados registrados


Essa API retorna, em formato JSON:
- Total de acessos
- Acessos do dia
- Último acesso registrado
- Média de acessos por dia
- Pico de acessos por hora
- Distribuição por dispositivo
- Distribuição por navegador
- Acessos organizados por data

Essa API pode ser consumida diretamente pelo dashboard local (`local-stats-viewer`).


Testes e Validação
------------------
- Testes manuais: escanear QR Code em diferentes dispositivos e validar o registro.
- Validação de logs: confirmar que o backend cria/atualiza o arquivo de storage corretamente.
- Teste de integração: rodar os três módulos locais e validar o fluxo completo.

Possíveis Melhorias
-------------------
- Persistência em banco de dados (SQLite, Postgres, MongoDB)
- Autenticação e painel multiusuário
- Exportar relatórios (CSV/JSON/PDF)
- Hospedar backend em nuvem com API segura
- Gerar múltiplos cartões dinamicamente via interface administrativa
- Métricas em tempo real (WebSockets)

Autor
-----
Projeto Integrador desenvolvido por:

Fabio O. Morais  
GitHub: https://github.com/FabioOMorais