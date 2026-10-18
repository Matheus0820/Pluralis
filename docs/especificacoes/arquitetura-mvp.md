# Contexto do Projeto e Identidade Visual

Você é um Engenheiro de Software Sênior e Arquiteto de Soluções, especialista em acessibilidade (WCAG 2.2, ABNT NBR 17225), segurança da informação (LGPD) e design de arquitetura de software.
Seu objetivo é desenvolver a arquitetura e o código inicial do MVP de uma plataforma B2B SaaS chamada **Pluralis**, voltada para a gestão de acessibilidade pedagógica e capacitação docente no ensino superior.

**Stack Tecnológica Obrigatória:**

* **Frontend:** Next.js (React) com Tailwind CSS.
* **Backend:** Node.js com NestJS.
* **Banco de Dados:** PostgreSQL (utilizando Prisma ORM).
* **Autenticação:** Implementar autenticação híbrida (Login convencional com E-mail/Senha E Login Social via Google usando Passport.js ou Auth.js/NextAuth).

**Padrões de Arquitetura Exigidos (Crítico):**

1. **Monolito Modular:** O backend em NestJS deve ser estruturado como um monolito modular, dividido por domínios de negócio claros (ex: `AuthModule`, `MaterialModule`, `ForumModule`, `CapacitacaoModule`).
2. **Separação de Responsabilidades (SoC):**
   * **No Backend:** Isole estritamente as camadas. Controladores (`Controllers`) lidam apenas com HTTP/Rotas; Regras de negócio ficam nos Serviços (`Services`); Acesso a dados fica em Repositórios/DAOs (`PrismaService` isolado). Nenhuma regra de negócio deve vazar para os controladores.
   * **No Frontend:** Separe rigorosamente a lógica de apresentação da lógica de estado/negócio. Use *Custom Hooks* para chamadas de API e estado local. Mantenha os componentes React "burros" (focados apenas em renderização da UI).

**Identidade Visual Rigorosa (Tailwind CSS):**

* Primária (Navegação/Headers): Azul Institucional (`bg-blue-900` / `#1E3A8A`)
* Ação/Destaque (Botões principais): Laranja Acessível (`bg-orange-600` / `#EA580C`)
* Fundo (Telas): Cinza Off-White (`bg-slate-50` / `#F8FAFC`) para conforto visual de neurodivergentes.
* Texto: Carvão (`text-slate-900` / `#0F172A`).

# 1. Requisitos Funcionais (RF) Exigidos

A aplicação deve ser estruturada para atender aos seguintes requisitos funcionais levantados no projeto:

* **RF01:** A plataforma deve oferecer materiais e módulos de capacitação sobre educação inclusiva.
* **RF02:** A plataforma deve permitir que o professor informe um conteúdo didático e selecione estratégias para gerar materiais adaptados (textos curtos, áudio, etc.) com auxílio de IA Generativa.
* **RF03:** A plataforma deve disponibilizar prompts prontos para uso em ferramentas de IA externas.
* **RF04:** A plataforma deve permitir que professores revisem, editem e corrijam os materiais produzidos pela IA antes de utilizá-los.
* **RF05:** A plataforma deve permitir publicação, compartilhamento e consulta de materiais inclusivos.
* **RF06:** Usuários devem poder enviar sugestões de melhoria e reportar materiais inadequados.
* **RF07:** Espaço de colaboração/fórum para troca de experiências entre docentes.

# 2. Modelagem de Dados (PostgreSQL + Prisma)

Crie os schemas do Prisma considerando as entidades sob a ótica da separação de domínios:

1. `Instituicao (IES)`: id, nome, cnpj, data_cadastro.
2. `Usuario`: id, ies_id (FK), nome, email, senha_hash (nula se usar apenas Google), google_id (opcional), cargo (Gestor, Professor, NAI).
3. `Material`: id, usuario_id (FK), titulo, conteudo_original, conteudo_adaptado, url_audio (opcional), status_revisao (Pendente, Aprovado), data_criacao, publico (boolean para RF05).
4. `PromptIA`: id, titulo, descricao, template_prompt (RF03).
5. `TopicoForum`: id, usuario_id (FK), titulo, conteudo, categoria (RF07).
6. `LogAuditoria`: id, usuario_id, acao, ip_hash, data (Para compliance LGPD).

# 3. Telas e Interface (Next.js + Tailwind)

Com base nos RFs e no princípio de SoC, crie os componentes React isolando a camada de API/Hooks.

1. **Tela de Login:** Formulário tradicional e botão de destaque "Entrar com o Google".
2. **Dashboard / Capacitação (RF01):** Tela com "Trilhas de Aprendizagem" contendo cards visuais (com `alt` descritivos).
3. **Workspace de Adaptação de Material (RF02 e RF04):**
   * Formulário base para inserção de texto e seleção de tipo de adaptação.
   * Editor lado a lado (Original vs Adaptado).
   * *Regra Crítica de Segurança (RNF10):* Banner de alerta ("Conteúdo gerado por IA. Revisão humana obrigatória"). Botão "Salvar" bloqueado até o checkbox de confirmação ser marcado.
4. **Biblioteca de Prompts (RF03):** Cards com comandos prontos e botão "Copiar".
5. **Comunidade (RF05 e RF07):** Feed estilo fórum e botão global "Sugerir Melhoria" (RF06).

# 4. Requisitos de Segurança e Acessibilidade (DevSecOps e UI)

**Acessibilidade (Frontend):**
* Uso de tags semânticas HTML5 e navegação total via teclado (`Tab`, `Enter`, `Esc`). 
* Uso rigoroso de `aria-labels` e `role`.
* Foco visível padronizado (`focus:outline-none focus:ring-4 focus:ring-orange-600`).

**Segurança e LGPD (Backend):**
* **Rate Limiting:** Use `@nestjs/throttler` nas rotas sensíveis (Login e Geração via IA).
* **Hash de Senhas:** Use `Bcrypt` ou `Argon2` (isolado em um `AuthService`).
* **XSS Protection:** Use `DOMPurify` no frontend ao renderizar conteúdos de texto rico.
* **Privacidade na IA:** O "System Prompt" da IA deve instruir explicitamente: *"Ignore, anonimize e remova qualquer nome próprio de aluno ou dado de saúde sensível mencionado no texto original antes de adaptar"*.

# Entregáveis Solicitados à IA Generativa:

Por favor, analise as instruções acima e forneça:

1. A **estrutura de diretórios detalhada**, demonstrando claramente a organização de Monolito Modular no NestJS e a aplicação do padrão SoC no frontend Next.js.
2. O arquivo `schema.prisma` completo com seus relacionamentos.
3. O código estrutural do módulo de Adaptação de Material do backend (`MaterialModule`, `MaterialController`, `MaterialService`), evidenciando a Separação de Responsabilidades.
4. O código do componente da tela "Workspace de Adaptação de Material" no Next.js, incluindo o *Custom Hook* separado da UI, e aplicando Tailwind e regras de acessibilidade.