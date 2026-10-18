# Matriz de Rastreabilidade de Requisitos — Projeto Pluralis

**Plataforma B2B SaaS de Gestão de Acessibilidade Pedagógica e Capacitação Docente**  
**Versão:** 1.1.0 — Atualização de implementação do frontend e Docker
**Data:** 18 de Outubro de 2026
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
| **AUTH-01** | Autenticação Híbrida (E-mail/Senha + Google OAuth) | LGPD Art. 6º, 46 | Todos (Gestor, Professor, NAI) | `AuthModule`, `AuthService`, `JwtStrategy`, `GoogleStrategy` | `Usuario`, `Instituicao` | `/login`, `/registro`, `frontend/src/services/api.ts` | Parcial (login/registro por e-mail e senha implementados; integração Google pendente) | Configurar OAuth Google no frontend; validar fluxo ponta a ponta com backend. |
| **AUTH-02** | Controle de Acesso Baseado em Papéis (RBAC) | LGPD & Governança IES | Gestor, Professor, NAI | `@Roles()` Decorator, `RolesGuard` | `Usuario.cargo` (Enum) | Componentes de rota por Role | Parcial (Backend) | Implementar Guards por Role no frontend e visões customizadas para cada papel. |
| **AUTH-03** | Proteção de rotas privadas e encerramento de sessão | LGPD Art. 6º, 46 | Todos | JWT existente no backend | `Usuario` | `frontend/src/app/dashboard/layout.tsx`, `frontend/src/components/layout/Sidebar.tsx` | Parcial (guard client-side, logout e callback same-origin implementados; não há validação server-side) | Migrar token para cookie seguro validado no servidor; testar expiração, logout e retorno à rota em navegador. |
| **RF01** | Módulos e Trilhas de Capacitação Docente | LBI Art. 28, Inciso X (Formação continuada) | Professor, NAI | `CapacitacaoModule`, `CapacitacaoController` | `Trilha`, `Aula`, `Certificado` | `/dashboard/capacitacao` | Template Parcial | Conectar ao banco via Prisma e permitir emissão real de certificados em serviço. |
| **RF02** | Motor de Adaptação de Materiais com IA Generativa | LBI Art. 28, Inciso V; Princípios DUA | Professor, NAI | `MaterialModule`, `IaModule`, `IaService` | `Material`, `Adaptacao` | `/dashboard/adaptar` | Simulado | Integrar pipeline da IA com sanitização LGPD de dados sensíveis do aluno. |
| **RF03** | Biblioteca de Prompts Prontos para IA Externa | DUA & Acessibilidade Prática | Professor, NAI | `PromptModule`, `PromptController` | `PromptIA` | `/dashboard/prompts` | Ausente | Criar página `/dashboard/prompts` com busca e botão de cópia rápida. |
| **RF04** | Revisão, Edição e Homologação Humana Obrigatória | Resolução Ética IA / RNF10 | Professor, NAI | `MaterialService.revisar()`, `homologar()` | `Material.status_revisao` | `/dashboard/adaptar` | Pendente Trava RNF10 | Implementar editor lado a lado com checkbox obrigatório antes de salvar/publicar. |
| **RF05** | Repositório & Compartilhamento de Materiais Inclusivos | DUA (Múltiplos meios de representação) | Todos | `MaterialModule.findPublicos()` | `Material.publico` | `/dashboard/materiais` | Em Estruturação | Criar catálogo pesquisável por disciplina e tipo de deficiência. |
| **RF06** | Envio de Sugestões de Melhoria e Denúncia de Inadequação | WCAG 2.2 / Compliance | Todos | `FeedbackModule`, `ReportController` | `ReportMaterial` | Modal Global "Sugerir Melhoria" | Pendente | Inserir botão de reporte acessível em todos os materiais adaptados. |
| **RF07** | Fórum Interdisciplinar Docente ↔ Especialistas AEE/NAI | LBI Art. 28; Gestão Democrática | Professor, NAI | `ForumModule`, `ForumController` | `TopicoForum`, `RespostaForum` | `/dashboard/forum` | Template Parcial | Conectar respostas e curtidas ao banco Prisma em tempo real. |
| **RNF01** | Trilha Probatória de Auditoria e Conformidade LBI | LBI Art. 28; LGPD Art. 37 | Gestor, NAI | `AuditoriaModule`, `AuditoriaService` | `LogAuditoria` | `/dashboard/relatorios` | Template Parcial | Exportação de relatório probatório em PDF com carimbo de tempo e hash para MEC. |
| **RNF02** | Acessibilidade Digital Estrita (WCAG 2.2 AA / NBR 17225) | Decreto Federal nº 9.404/2018 | Todos | Middleware e Sanitizers | N/A | Componentes UI com alto contraste e ARIA | Conforme | Preservar paleta (`bg-blue-900`, `bg-orange-600`, `bg-slate-50`) e foco visível. |
| **RNF03** | Identidade Visual Oficial com Logotipo do Projeto | Manual de Marca Pluralis | Todos | N/A | N/A | Header, Sidebar, Landing Page, Favicon | Implementado parcialmente (logo PNG na landing, sidebar e favicon; login/registro usam logo) | Validar aplicação da identidade visual em todas as telas e substituir assets restantes quando necessário. |
| **RNF04** | Build Docker reproduzível e otimizado do frontend | Confiabilidade de entrega | Operação | Docker multi-stage | Lockfile npm | `frontend/Dockerfile`, `frontend/.dockerignore` | Implementado (instalação com `npm ci`, cache de dependências, exclusão de artefatos locais e telemetria desativada) | Confirmar build e execução da imagem no ambiente-alvo e acompanhar o tempo de build em CI. |

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

1. **Concluir autenticação e autorização:**
   - Integrar OAuth Google na interface e validar login/registro ponta a ponta.
   - Substituir o guard client-side por sessão em cookie seguro validada no servidor; testar expiração e logout no navegador.
   - Implementar restrições e visões por papel (`GESTOR`, `PROFESSOR`, `NAI`) no frontend.
2. **Concluir identidade visual e acessibilidade:**
   - Auditar todas as telas e aplicar a marca oficial e a paleta institucional de forma consistente.
   - Validar conformidade WCAG 2.2 AA com testes automatizados e avaliação manual.
3. **Completar funcionalidades do MVP:**
   - Implementar biblioteca de prompts (RF03) e revisão/homologação humana obrigatória (RF04).
   - Conectar capacitação, fórum, relatórios e materiais ao backend e persistência PostgreSQL; concluir as ações pendentes por requisito na matriz.
4. **Validar entrega Docker:**
   - Executar build e teste de inicialização da imagem no ambiente-alvo/CI, verificando também o tempo do build.
5. **Submeter alterações ao Git remoto (`origin/main`) após revisão e validação local.**
