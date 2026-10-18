# Matriz de Rastreabilidade de Requisitos — Projeto Pluralis

**Plataforma B2B SaaS de Gestão de Acessibilidade Pedagógica e Capacitação Docente**  
**Versão:** 1.0.0 — Marco de Engenharia & Arquitetura  
**Data:** 17 de Outubro de 2026  
**Autoria / Engenharia:** Equipe Pluralis & Matheus0820  

---

## 1. Visão Geral e Propósito

Esta **Matriz de Rastreabilidade de Requisitos (RTM)** estabelece o vínculo bidirecional entre as bases legais e pedagógicas (Lei Brasileira de Inclusão nº 13.146/2015, DUA, WCAG 2.2, LGPD), os Requisitos Funcionais (RF), Requisitos Não Funcionais (RNF), Papéis de Usuário (RBAC), Entidades de Dados (Prisma), Módulos do Backend (NestJS), Interfaces/Telas (Next.js) e seus respectivos status de atendimento.

---

## 2. Perfis de Acesso e Matriz de Permissões (RBAC)

De acordo com o modelo de governança para Instituições de Ensino Superior (IES) e redes de ensino:

| Papel (Role) | Descrição e Atribuições | Escopo de Acesso |
| :--- | :--- | :--- |
| **GESTOR** | Direção acadêmica, reitoria, compliance institucional e auditoria jurídica. | Visualização de métricas globais da IES, relatórios probatórios LBI/MEC, auditoria de compliance, gestão de usuários e alocação orçamentária. |
| **PROFESSOR** | Docentes de disciplinas regulares de graduação/pós-graduação e educação básica. | Workspace de adaptação curricular com IA, biblioteca de prompts, trilhas de capacitação continuada, solicitação de parecer ao NAI e fórum. |
| **NAI** | Especialistas do Núcleo de Acessibilidade e Inclusão (AEE, psicopedagogos, audiodescritores). | Validação técnica/pedagógica de materiais gerados, homologação de adaptações, moderação do fórum interdisciplinar e consultoria assistiva. |

---

## 3. Matriz de Rastreabilidade Completa (Legal ↔ Funcional ↔ Técnico)

| Código | Requisito / Necessidade | Base Legal / Pedagógica | Papel Atendido | Backend (NestJS) | Entidade (Prisma) | Frontend (Next.js) | Status Atual | Ação Corretiva Planejada |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AUTH-01** | Autenticação Híbrida (E-mail/Senha + Google OAuth) | LGPD Art. 6º, 46 | Todos (Gestor, Professor, NAI) | `AuthModule`, `AuthService`, `JwtStrategy`, `GoogleStrategy` | `Usuario`, `Instituicao` | `/login`, `/registro`, `useAuth` | Pendente Tela Dedicada | Criar tela de login com formulário e Google OAuth; configurar middleware de rotas privadas. |
| **AUTH-02** | Controle de Acesso Baseado em Papéis (RBAC) | LGPD & Governança IES | Gestor, Professor, NAI | `@Roles()` Decorator, `RolesGuard` | `Usuario.cargo` (Enum) | Componentes de rota por Role | Parcial (Backend) | Implementar Guards por Role no frontend e visões customizadas para cada papel. |
| **RF01** | Módulos e Trilhas de Capacitação Docente | LBI Art. 28, Inciso X (Formação continuada) | Professor, NAI | `CapacitacaoModule`, `CapacitacaoController` | `Trilha`, `Aula`, `Certificado` | `/dashboard/capacitacao` | Template Parcial | Conectar ao banco via Prisma e permitir emissão real de certificados em serviço. |
| **RF02** | Motor de Adaptação de Materiais com IA Generativa | LBI Art. 28, Inciso V; Princípios DUA | Professor, NAI | `MaterialModule`, `IaModule`, `IaService` | `Material`, `Adaptacao` | `/dashboard/adaptar` | Simulado | Integrar pipeline da IA com sanitização LGPD de dados sensíveis do aluno. |
| **RF03** | Biblioteca de Prompts Prontos para IA Externa | DUA & Acessibilidade Prática | Professor, NAI | `PromptModule`, `PromptController` | `PromptIA` | `/dashboard/prompts` | Ausente | Criar página `/dashboard/prompts` com busca e botão de cópia rápida. |
| **RF04** | Revisão, Edição e Homologação Humana Obrigatória | Resolução Ética IA / RNF10 | Professor, NAI | `MaterialService.revisar()`, `homologar()` | `Material.status_revisao` | `/dashboard/adaptar` | Pendente Trava RNF10 | Implementar editor lado a lado com checkbox obrigatório antes de salvar/publicar. |
| **RF05** | Repositório & Compartilhamento de Materiais Inclusivos | DUA (Múltiplos meios de representação) | Todos | `MaterialModule.findPublicos()` | `Material.publico` | `/dashboard/materiais` | Em Estruturação | Criar catálogo pesquisável por disciplina e tipo de deficiência. |
| **RF06** | Envio de Sugestões de Melhoria e Denúncia de Inadequação | WCAG 2.2 / Compliance | Todos | `FeedbackModule`, `ReportController` | `ReportMaterial` | Modal Global "Sugerir Melhoria" | Pendente | Inserir botão de reporte acessível em todos os materiais adaptados. |
| **RF07** | Fórum Interdisciplinar Docente ↔ Especialistas AEE/NAI | LBI Art. 28; Gestão Democrática | Professor, NAI | `ForumModule`, `ForumController` | `TopicoForum`, `RespostaForum` | `/dashboard/forum` | Template Parcial | Conectar respostas e curtidas ao banco Prisma em tempo real. |
| **RNF01** | Trilha Probatória de Auditoria e Conformidade LBI | LBI Art. 28; LGPD Art. 37 | Gestor, NAI | `AuditoriaModule`, `AuditoriaService` | `LogAuditoria` | `/dashboard/relatorios` | Template Parcial | Exportação de relatório probatório em PDF com carimbo de tempo e hash para MEC. |
| **RNF02** | Acessibilidade Digital Estrita (WCAG 2.2 AA / NBR 17225) | Decreto Federal nº 9.404/2018 | Todos | Middleware e Sanitizers | N/A | Componentes UI com alto contraste e ARIA | Conforme | Preservar paleta (`bg-blue-900`, `bg-orange-600`, `bg-slate-50`) e foco visível. |
| **RNF03** | Identidade Visual Oficial com Logotipo do Projeto | Manual de Marca Pluralis | Todos | N/A | N/A | Header, Sidebar, Landing Page, Favicon | Incorreto | Substituir ícones genéricos pelo logotipo oficial presente em `docs/identidade-visual/`. |

---

## 4. Mapeamento de Entidades do Prisma (Modelo de Dados)

| Entidade | Propósito no Domínio | Relacionamentos Chave | Rastreabilidade de Requisitos |
| :--- | :--- | :--- | :--- |
| `Instituicao` | IES contratante do SaaS B2B | 1:N com `Usuario` | Gestão Multi-Tenant / LBI |
| `Usuario` | Agente acadêmico (Gestor, Professor, NAI) | N:1 com `Instituicao`, 1:N com `Material`, 1:N com `TopicoForum` | AUTH-01, AUTH-02 |
| `Material` | Conteúdos didáticos originais e adaptados | N:1 com `Usuario`, 1:N com `LogAuditoria` | RF02, RF04, RF05 |
| `PromptIA` | Templates parametrizados de prompts inclusivos | 1:N com categorias de deficiência | RF03 |
| `TopicoForum` | Discussões colaborativas entre docentes e AEE | N:1 com `Usuario`, 1:N com `RespostaForum` | RF07 |
| `LogAuditoria` | Evidência probatória imutável (carimbo, IP anonimizado, hash) | N:1 com `Usuario`, N:1 com `Material` | RNF01, LGPD Compliance |

---

## 5. Próximos Passos Prioritários no Ciclo de Vida do MVP

1. **Submissão Segura ao Git Remote (`origin/main`)** com o estado auditado.
2. **Implementação do Módulo de Autenticação Híbrida & Proteção de Rotas:**
   - Criação da tela `/login` e `/registro` com OAuth Google e senha.
   - Guard de autenticação no frontend (Next.js Middleware) redirecionando usuários não autenticados.
   - Rotas segmentadas de acordo com a Role (`GESTOR`, `PROFESSOR`, `NAI`).
3. **Substituição da Marca pelo Logotipo Oficial de `docs/identidade-visual/`:**
   - Vetorização e importação do `pluralis-logo.svg` em cabeçalhos, barras laterais e favicon.
4. **Enriquecimento dos Templates das Páginas:**
   - Adequação rigorosa à paleta de cores institucional (`bg-blue-900`, `bg-orange-600`, `bg-slate-50`).
   - Workspace com visualização lado a lado e confirmação humana obrigatória (RNF10).
   - Inclusão da Biblioteca de Prompts (RF03).
5. **Integração Total Ponta a Ponta:**
   - Conexão das chamadas do frontend com as rotas reais do backend NestJS e banco PostgreSQL.
