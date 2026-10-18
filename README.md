# Pluralis — Plataforma B2B SaaS de Gestão de Acessibilidade Pedagógica

<div align="center">
  <img src="docs/identidade-visual/pluralis-logo.svg" alt="Pluralis Logo" width="160" />
  <p><strong>Educação Inclusiva, Ética, Acessível e Conforme à Lei Brasileira de Inclusão (LBI).</strong></p>
</div>

---

## 📌 Visão Geral

O **Pluralis** é uma plataforma B2B SaaS desenvolvida para redes de ensino públicas e privadas, faculdades e escolas regulares que necessitam atender às exigências legais da **Lei Brasileira de Inclusão (LBI - Lei nº 13.146/2015)** e do **Desenho Universal para a Aprendizagem (DUA)**.

A plataforma soluciona a sobrecarga dos professores do ensino regular e os gargalos do Atendimento Educacional Especializado (AEE), integrando:
1. **Motor de IA Ética para Adaptação Curricular:** Geração e adequação instantânea de atividades, textos e planos de aula para estudantes com TEA, TDAH, deficiência visual, auditiva, dislexia e altas habilidades.
2. **Capacitação Docente Continuada:** Microcursos práticos e trilhas de formação com certificação direta em serviço.
3. **Fórum Interdisciplinar:** Rede colaborativa entre docentes da sala regular e especialistas em AEE.
4. **Trilha de Auditoria & Segurança Jurídica:** Registro probatório e imutável de todas as adaptações e medidas de acessibilidade razoável adotadas pela instituição.

---

## 🛠️ Stack Tecnológica

### Frontend
- **Framework:** Next.js 14 (App Router) & React 18
- **Estilização:** Tailwind CSS (Sistema de Design com paleta Royal Indigo, Emerald e Teal)
- **Ícones Profissionais:** Google Material Icons via `react-icons` (`react-icons/md`)
- **Acessibilidade:** Padrões WCAG 2.1 AA, modo de alto contraste e sanitização com DOMPurify
- **Tipagem:** TypeScript rigoroso

### Backend
- **Framework:** NestJS (Node.js) com arquitetura modular desacoplada
- **ORM & Banco de Dados:** Prisma ORM com PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens) com Passport Strategy e bcrypt
- **IA Generativa:** Módulo `IaService` com integração OpenAI / Claude e fallback pedagógico robusto
- **Auditoria:** Módulo dedicado `AuditoriaService` gravando carimbo de tempo, IP e conformidade legal

### DevOps & Infraestrutura
- **Containers:** Docker & Docker Compose
- **Orquestração:** Configuração pronta com PostgreSQL, Backend NestJS e Frontend Next.js

---

## 📁 Estrutura do Repositório

```bash
Pluralis/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Modelagem relacional completa (Usuários, Materiais, Auditoria, Fórum, Cursos)
│   │   └── seed.ts             # Dados iniciais para demonstração
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/           # Login, registro e guards JWT
│   │   │   ├── material/       # Gestão e adaptação de conteúdo
│   │   │   ├── ia/             # Integração LLM e diretrizes DUA/BNCC
│   │   │   ├── auditoria/      # Trilha probatória LBI / LGPD
│   │   │   ├── capacitacao/    # Cursos e trilhas docentes
│   │   │   └── forum/          # Discussões e apoio multidisciplinar
│   │   ├── prisma/             # Serviço de conexão do banco
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                    # Landing Page institucional
│   │   │   ├── globals.css
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx                # Visão geral e métricas
│   │   │       ├── adaptar/page.tsx        # Motor de IA de adaptação de material
│   │   │       ├── capacitacao/page.tsx    # Trilhas e aulas de capacitação
│   │   │       ├── forum/page.tsx          # Comunidade docente e AEE
│   │   │       ├── relatorios/page.tsx     # Auditoria e exportação PDF probatória
│   │   │       └── configuracoes/page.tsx  # Recursos assistivos e WCAG
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Header.tsx              # Barra superior com acessibilidade (alto contraste)
│   │   │       └── Sidebar.tsx             # Menu lateral com ícones do Google Icons
│   │   ├── services/api.ts
│   │   └── types/index.ts
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- Docker & Docker Compose (opcional para ambiente conteinerizado)
- PostgreSQL (caso execute localmente sem Docker)

### Opção 1: Executando com Docker Compose (Recomendado)

Na raiz do projeto, execute:
```bash
docker-compose up --build
```
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)
- **PostgreSQL:** Porta 5432

### Opção 2: Executando Localmente

#### 1. Backend (NestJS)
```bash
cd backend
npm install
# Configure o arquivo .env com sua conexão DATABASE_URL e JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed # Carrega dados de demonstração
npm run start:dev
```

#### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000).

---

## ⚖️ Conformidade Legal & Pedagógica

- **LBI (Lei nº 13.146/2015, Art. 28):** Proibição de sobretaxa em mensalidades para estudantes com deficiência e garantia de recursos adaptados no ensino regular.
- **Lei Berenice Piana (Lei nº 12.764/2012):** Proteção dos direitos da pessoa com Transtorno do Espectro Autista.
- **DUA (Desenho Universal para a Aprendizagem):** Flexibilidade na apresentação da informação, no engajamento dos alunos e na expressão do conhecimento.
- **LGPD (Lei nº 13.709/2018):** Minimização e pseudonimização dos dados de estudantes, com armazenamento seguro de trilha probatória.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de impacto social pela equipe Pluralis.
