'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  Award,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
  Volume2,
  Eye,
  HelpCircle,
  HeartHandshake,
  ArrowUpRight,
  Lock,
  Laptop,
  Check,
  ExternalLink,
  ChevronRight,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  // Simulator State
  const [activePersona, setActivePersona] = useState<'tea' | 'dislexia' | 'baixa_visao'>('tea');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const personas = {
    tea: {
      id: 'tea',
      name: 'Neurodivergência (TEA)',
      badge: 'Espectro Autista & Previsibilidade',
      color: 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40',
      tagBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      description: 'Adaptação focada em previsibilidade, redução de ambiguidade e flexibilização de engajamento.',
      original:
        'Na aula de amanhã realizaremos uma atividade em grupo aberta para discutir os efeitos da política monetária sobre a inflação. Tragam ideias livres e se organizem na hora como acharem melhor para apresentar na lousa perante a turma.',
      barriers: [
        'Instruções abstratas sem marcos de tempo definidos',
        'Ansiedade social gerada pela formação livre de grupos de última hora',
        'Exigência unilateral de exposição oral na lousa',
      ],
      adapted: {
        title: 'Roteiro Estruturado com Opções Múltiplas de Expressão (DUA)',
        steps: [
          'Previsibilidade da dinâmica: 4 blocos de 10 min (Leitura guiada → Registro individual → Síntese da dupla → Compartilhamento opcional).',
          'Duplas previamente alinhadas ou opção de elaboração individual autônoma.',
          'Formatos alternativos de entrega aceitos com equivalência pedagógica: mapa conceitual digital, resumo escrito ou áudio gravado.',
          'Glossário objetivo prévio com definições de Taxa Selic, IPCA e Liquidez.',
        ],
        lbiBasis: 'Atendimento ao Art. 28, Incisos II e III da LBI (recursos pedagógicos acessíveis e planos de atendimento individualizado).',
      },
    },
    dislexia: {
      id: 'dislexia',
      name: 'TDAH & Dislexia',
      badge: 'Processamento Visual & Carga Cognitiva',
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40',
      tagBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
      description: 'Segmentação em blocos conceituais curtos, suporte multimodal e redução da sobrecarga leitora.',
      original:
        'Considere que a função de demanda agregada descrita pelo modelo IS-LM sob regime de câmbio flexível e mobilidade de capitais estabelece um equilíbrio simultâneo onde os choques exógenos produzem flutuações cíclicas de curto prazo decorrentes da rigidez nominal.',
      barriers: [
        'Período sintático excessivamente longo sem pausas semânticas',
        'Sobrecarga severa da memória de trabalho verbal',
        'Ausência de representação gráfica ou visual das relações de causa e efeito',
      ],
      adapted: {
        title: 'Segmentação Semântica com Diagrama Causal de Apoio (DUA)',
        steps: [
          'Ideia-Chave 1: O modelo IS-LM estuda onde o mercado de bens e a taxa de juros se equilibram ao mesmo tempo.',
          'Ideia-Chave 2: Câmbio flexível significa que o preço do dólar flutua livremente de acordo com oferta e procura.',
          'Ideia-Chave 3: Em curto prazo, salários não mudam de imediato, gerando oscilações transitórias na economia.',
          'Recursos de apoio ativados: áudio-descrição do conceito e tipografia com entrelinhas ampliado.',
        ],
        lbiBasis: 'Art. 28, Inciso V da LBI (adoção de práticas pedagógicas inclusivas em programas de formação).',
      },
    },
    baixa_visao: {
      id: 'baixa_visao',
      name: 'Deficiência Visual / Baixa Visão',
      badge: 'Multimodalidade & Acessibilidade Sensorial',
      color: 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40',
      tagBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      description: 'Descrição de gráficos, tabelas estruturadas para screen reader e contraste reforçado.',
      original:
        'Observe a figura 3.2 abaixo que mostra o gráfico tridimensional das curvas de nível de potencial eletrostático e identifique visualmente as regiões de gradiente mais íngreme onde as linhas de campo convergem.',
      barriers: [
        'Dependência exclusiva de decodificação visual de gradiente de cores',
        'Imagem sem texto alternativo (alt-text) estruturado',
        'Impossibilidade de navegação por teclado para usuários de NVDA ou JAWS',
      ],
      adapted: {
        title: 'Representação Multimodal Textual e Paramétrica (DUA)',
        steps: [
          'Texto alternativo analítico descrevendo o comportamento vetorial nos eixos X, Y e Z.',
          'Tabela de coordenadas tabulares com pontos de inflexão, compatível com linhas braille e leitores de tela.',
          'Indicação sonora de elevação tonal para representação auditiva de gradientes ascendentes.',
          'Arquivo vetorial de alto contraste exportável para impressão em relevo termográfico.',
        ],
        lbiBasis: 'Art. 28, Incisos I e XIV da LBI (acesso a recursos de tecnologia assistiva e materiais didáticos acessíveis).',
      },
    },
  };

  const faqs = [
    {
      q: 'O que é o Artigo 28 da Lei Brasileira de Inclusão (LBI) e por que ele impacta as IES?',
      a: 'O Artigo 28 da Lei nº 13.146/2015 estabelece que todas as instituições de ensino, públicas e privadas, têm o dever legal de prover adaptações curriculares razoáveis, materiais pedagógicos acessíveis e planos de atendimento individualizado para estudantes com deficiência e neurodivergentes, sem cobrança de taxa extra. O não cumprimento acarreta passivos jurídicos e sanções regulatórias do MEC.',
    },
    {
      q: 'O Pluralis substitui o trabalho do professor ou do Núcleo de Acessibilidade (NAE)?',
      a: 'Não. O Pluralis atua como um copiloto e acelerador inteligente. Ele gera propostas fundamentadas nos 3 princípios do Desenho Universal para Aprendizagem (DUA), cabendo sempre ao docente titular e aos especialistas do NAE a mediação, validação e refinamento final com base na sua autoridade pedagógica.',
    },
    {
      q: 'Como é gerado o dossiê probatório de conformidade legal?',
      a: 'A cada plano de aula, ementa ou avaliação submetida e adaptada, a plataforma gera um registro com carimbo temporal, justificativas pedagógicas detalhadas, referências aos incisos específicos do Art. 28 da LBI e histórico de aprovação docente, pronto para exportação em PDF e arquivamento oficial para auditorias e fiscalizações.',
    },
    {
      q: 'A plataforma é compatível com os principais Ambientes Virtuais de Aprendizagem (AVA)?',
      a: 'Sim. Os conteúdos gerados e adaptados no Pluralis podem ser integrados diretamente via formatos universais compatíveis com Moodle, Canvas, Blackboard, Google Classroom ou exportados em HTML semântico com total suporte a leitores de tela.',
    },
    {
      q: 'Quais recursos de acessibilidade a própria plataforma oferece aos seus usuários?',
      a: 'O Pluralis foi desenvolvido sob diretrizes rigorosas da W3C WCAG 2.2 nível AAA e e-MAG brasileiro. Conta com atalhos de teclado (Alt+1, Alt+C, Alt++), modo de alto contraste de alto desempenho, ajuste escalável de fontes, fontes otimizadas para pessoas com dislexia, modo monocromático e redução de estímulos visuais em conformidade com as melhores práticas de neurodesign.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* ========================================================
          STICKY INSTITUTIONAL NAVBAR
          ======================================================== */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            aria-label="Pluralis Educação Inclusiva - Página Inicial"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-400 group-hover:text-amber-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  Pluralis
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
                  LBI Art. 28
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Inteligência Pedagógica Inclusiva & DUA
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            role="navigation"
            aria-label="Menu principal de navegação"
            className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-slate-300"
          >
            <a
              href="#como-funciona"
              className="hover:text-white transition-colors focus:outline-none focus:text-amber-400"
            >
              Como Funciona
            </a>
            <a
              href="#simulador-dua"
              className="hover:text-white transition-colors focus:outline-none focus:text-amber-400"
            >
              Simulador DUA
            </a>
            <a
              href="#pilares"
              className="hover:text-white transition-colors focus:outline-none focus:text-amber-400"
            >
              Pilares da Plataforma
            </a>
            <a
              href="#impacto"
              className="hover:text-white transition-colors focus:outline-none focus:text-amber-400"
            >
              Impacto & Números
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors focus:outline-none focus:text-amber-400"
            >
              Perguntas Frequentes
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <span>Acessar Plataforma</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================
          MAIN CONTENT
          ======================================================== */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"
        >
          {/* Subtle Background Glow Spheres */}
          <div
            aria-hidden="true"
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full"
          />
          <div
            aria-hidden="true"
            className="absolute -top-10 right-10 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-7">
                {/* Live Compliance Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-300">
                    Conformidade Art. 28 da LBI & DUA Multissensorial
                  </span>
                </div>

                {/* Primary Heading */}
                <h1
                  id="hero-heading"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.18]"
                >
                  Transforme a prática pedagógica em uma experiência{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                    verdadeiramente inclusiva.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  Capacite os docentes da sua Instituição de Ensino Superior a adaptar planos de aula,
                  avaliações e metodologias para estudantes neurodivergentes e com deficiências, gerando{' '}
                  <strong className="text-white font-semibold">dossiês probatórios automáticos</strong>{' '}
                  com total respaldo legal e pedagógico.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/registro"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <span>Iniciar Demonstração Gratuita</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#simulador-dua"
                    className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/90 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ver Simulador DUA ao Vivo</span>
                  </a>
                </div>

                {/* Trust Verification Checklist */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Art. 28 LBI nº 13.146</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Diretrizes WCAG 2.2 AAA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Exportação de Dossiê Legal</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Card Preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-5 sm:p-6 border border-slate-700/80 shadow-2xl shadow-indigo-950/50">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Disciplina: Teoria das Probabilidades
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Docente: Profª. Drª. Camila Duarte
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                      DUA Adaptado
                    </span>
                  </div>

                  {/* Visual Transformation Simulation */}
                  <div className="mt-4 space-y-3.5">
                    {/* Step 1: Input text */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-400 font-semibold">
                        <span>Texto Original da Ementa:</span>
                        <span className="text-[9px] text-rose-400">Barreiras Detectadas (TEA / TDAH)</span>
                      </div>
                      <p className="text-slate-300 italic line-clamp-2">
                        &quot;Apresentação espontânea em seminário sem notas de apoio e discussão de Teorema de Bayes...&quot;
                      </p>
                    </div>

                    {/* Step 2: Live Transformation Arrow */}
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 py-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Motor Pluralis aplicou 4 diretrizes DUA</span>
                    </div>

                    {/* Step 3: Resulting Adapted Material */}
                    <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Plano de Acomodação Razoável
                        </span>
                        <span className="text-[10px] text-blue-400 font-mono">Dossiê #PL-8921</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-200">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>Matriz de Bayes fracionada em infográfico interativo.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>Opção de envio assíncrono em vídeo ou texto sintetizado.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>Justificativa jurídica vinculada ao Art. 28, II da LBI.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer with verification indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Validado juridicamente
                    </span>
                    <span>IES: Universidade Exemplo</span>
                  </div>
                </div>

                {/* Floating Decorative Metric Pill */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute -bottom-5 -left-5 bg-slate-900 border border-slate-700/80 rounded-xl p-3 shadow-xl items-center gap-3 animate-float-slow"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Nota Máxima no MEC
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Critérios de acessibilidade pedagógica
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE DUA SIMULATOR COMPONENT
            ======================================================== */}
        <section
          id="simulador-dua"
          aria-labelledby="simulador-heading"
          className="py-20 lg:py-28 bg-slate-950 border-b border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full">
                Simulador Pedagógico Interativo
              </span>
              <h2
                id="simulador-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Veja a transformação DUA acontecendo em tempo real
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Selecione um perfil de aprendizagem abaixo para comparar o conteúdo acadêmico tradicional com a adaptação metodológica gerada pelo Pluralis.
              </p>
            </div>

            {/* Persona Selector Tabs */}
            <div
              role="tablist"
              aria-label="Perfis de Estudantes para Simulação DUA"
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
            >
              {(Object.keys(personas) as Array<keyof typeof personas>).map((key) => {
                const item = personas[key];
                const isSelected = activePersona === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    id={`tab-${key}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${key}`}
                    onClick={() => setActivePersona(key)}
                    className={`p-4 rounded-xl text-left transition-all border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isSelected
                        ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{item.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagBg}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Live Comparison Panel */}
            <div
              role="tabpanel"
              id={`panel-${activePersona}`}
              aria-labelledby={`tab-${activePersona}`}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Traditional Content & Detected Obstacles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Conteúdo Convencional (Barreiras Atitudinais & Pedagógicas)
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-serif">
                    &quot;{personas[activePersona].original}&quot;
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Barreiras Mapeadas pelo Algoritmo:
                    </span>
                    <ul className="space-y-1.5">
                      {personas[activePersona].barriers.map((barrier, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-rose-300">
                          <span className="text-rose-500 font-bold shrink-0">✕</span>
                          <span>{barrier}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Pluralis DUA Solution & Legal Basis */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Adaptação Recomendada (Desenho Universal para Aprendizagem)
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-900/60 text-xs space-y-3">
                    <h3 className="font-bold text-blue-300 text-sm">
                      {personas[activePersona].adapted.title}
                    </h3>

                    <ul className="space-y-2">
                      {personas[activePersona].adapted.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-200 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Legal Compliance Seal */}
                    <div className="pt-3 border-t border-blue-900/60 flex items-start gap-2 text-[11px] text-amber-300">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Fundamento Jurídico:</strong> {personas[activePersona].adapted.lbiBasis}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            COMO FUNCIONA O PLURALIS (4-STEP WORKFLOW)
            ======================================================== */}
        <section
          id="como-funciona"
          aria-labelledby="workflow-heading"
          className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full">
                Fluxo Contínuo de Trabalho
              </span>
              <h2
                id="workflow-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Da ementa tradicional à conformidade legal em 4 passos
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                O Pluralis integra-se suavemente à rotina acadêmica dos seus docentes sem criar sobrecarga burocrática.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative group hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2">Diagnóstico de Barreiras</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O docente submete a ementa, plano de aula ou atividade avaliativa. O sistema rastreia barreiras pedagógicas, atitudinais e sensoriais.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative group hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2">Adaptação Multimodal DUA</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A plataforma gera propostas de representação, expressão e engajamento personalizadas para neurodivergências e deficiências.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative group hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 font-bold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2">Validação Docente</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O professor revisa, customiza com sua autoridade pedagógica e aprova as acomodações recomendadas para seus alunos.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative group hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-2">Dossiê Probatório LBI</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Geração automática de comprovação documental com respaldo no Art. 28 da LBI, pronta para auditorias do MEC e fiscalização.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4 PILARES ESTRUTURAIS
            ======================================================== */}
        <section
          id="pilares"
          aria-labelledby="pilares-heading"
          className="py-20 lg:py-28 bg-slate-950 border-b border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
                Solução Integral para IES
              </span>
              <h2
                id="pilares-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Os quatro pilares do ecossistema Pluralis
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Uma arquitetura completa desenhada especificamente para atender às exigências do Ensino Superior brasileiro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pilar 1 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  1. Adaptação Curricular Baseada em DUA
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Transformação de planos de ensino rígidos em matrizes dinâmicas com múltiplos meios de apresentação de conteúdos, formas flexíveis de avaliação e estratégias ativas de motivação estudantil.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                  <span>Conformidade com o modelo CAST de Desenho Universal</span>
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  2. Dossiê Probatório & Segurança Jurídica
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Proteção institucional contra riscos de passivos trabalhistas e denúncias do Ministério Público. Cada adaptação gera rastro de auditoria com vínculo direto aos 18 incisos do Art. 28 da LBI.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <span>Exportação instantânea de laudos probatórios em PDF</span>
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  3. Formação Docente Contínua Just-in-Time
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Capacitação prática em serviço. Em vez de cursos teóricos longos, o professor recebe micro-orientações pedagógicas no momento exato em que está planejando sua aula ou avaliação.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <span>Micro-learning integrado ao fluxo de trabalho</span>
                </div>
              </div>

              {/* Pilar 4 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  4. Painel de Gestão Estratégica do NAE
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Visão consolidada para Reitorias, Pró-Reitorias e Núcleos de Acessibilidade. Acompanhe taxas de adesão docente, índices de atendimento e indicadores de permanência estudantil.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span>Métricas auditáveis para instrumentos do MEC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            IMPACTO EM NÚMEROS
            ======================================================== */}
        <section
          id="impacto"
          aria-labelledby="impacto-heading"
          className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800/60 px-3 py-1 rounded-full">
                Resultados Mensuráveis
              </span>
              <h2
                id="impacto-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Impacto institucional concreto e escalável
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400 mb-2">
                  92%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  Redução no Tempo de Adaptação
                </div>
                <p className="text-[11px] text-slate-400">
                  Docentes adaptam ementas em minutos com auxílio do copiloto DUA.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 mb-2">
                  100%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  Cobertura Probatória LBI
                </div>
                <p className="text-[11px] text-slate-400">
                  Dossiês rastreáveis para blindagem jurídica contra autuações.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo-400 mb-2">
                  +3.4x
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  Permanência Estudantil
                </div>
                <p className="text-[11px] text-slate-400">
                  Queda expressiva na evasão de estudantes neurodivergentes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 mb-2">
                  AAA
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  Padrão W3C WCAG 2.2
                </div>
                <p className="text-[11px] text-slate-400">
                  Acessibilidade digital integral em toda a interface do sistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            DEPOIMENTOS & PROVA SOCIAL
            ======================================================== */}
        <section
          aria-labelledby="depoimentos-heading"
          className="py-20 lg:py-28 bg-slate-950 border-b border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full">
                Vozes da Comunidade Acadêmica
              </span>
              <h2
                id="depoimentos-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                O que dizem os gestores e docentes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &quot;O Pluralis tirou o Núcleo de Acessibilidade da posição de apenas &apos;apagar incêndios&apos; para um papel consultivo estratégico. Nossos professores agora têm autonomia técnica para criar aulas acessíveis.&quot;
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <strong className="text-white text-xs block">Dra. Renata Vasconcellos</strong>
                  <span className="text-[11px] text-slate-400">Coordenadora do NAE - IES Sudeste</span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &quot;A segurança jurídica que o dossiê probatório do Pluralis oferece perante as comissões de recredenciamento do MEC não tem preço. Cumprimos o Art. 28 da LBI com tranquilidade e transparência.&quot;
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <strong className="text-white text-xs block">Prof. Marcos Antonio Lima</strong>
                  <span className="text-[11px] text-slate-400">Pró-Reitor de Graduação</span>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &quot;Como docente de Exatas, sempre tive dificuldade em saber como adaptar avaliações para estudantes autistas. As recomendações práticas do Pluralis foram um divisor de águas na minha sala de aula.&quot;
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800">
                  <strong className="text-white text-xs block">Dr. Roberto Siqueira</strong>
                  <span className="text-[11px] text-slate-400">Professor Titular de Cálculo e Engenharia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FAQ ACCORDION (FULLY ACCESSIBLE)
            ======================================================== */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full">
                Tire suas Dúvidas
              </span>
              <h2
                id="faq-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Perguntas Frequentes
              </h2>
              <p className="text-sm text-slate-400">
                Respostas diretas sobre conformidade legal, metodologia DUA e adoção do Pluralis.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-150"
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            FINAL CALL TO ACTION (BOTTOM CTA)
            ======================================================== */}
        <section
          aria-labelledby="cta-heading"
          className="py-20 lg:py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none"
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Inclusão de Alto Impacto para sua IES
            </span>

            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Pronto para transformar sua instituição em referência de inclusão e legalidade?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal">
              Crie sua conta agora mesmo ou acesse o painel institucional para iniciar a modernização das suas práticas pedagógicas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/registro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                <span>Criar Conta Institucional</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span>Acessar com E-mail e Senha</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          INSTITUTIONAL FOOTER
          ======================================================== */}
      <footer
        role="contentinfo"
        aria-label="Rodapé institucional Pluralis"
        className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-black text-white tracking-tight">Pluralis</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Plataforma de inteligência pedagógica inclusiva, adaptação curricular baseada em DUA e geração de dossiês probatórios em conformidade com o Artigo 28 da LBI para o Ensino Superior.
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5" />
                <span>Padrão W3C WCAG 2.2 AAA & e-MAG</span>
              </div>
            </div>

            {/* Col 2: Soluções */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Soluções</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#como-funciona" className="hover:text-white transition-colors">
                    Adaptação DUA
                  </a>
                </li>
                <li>
                  <a href="#pilares" className="hover:text-white transition-colors">
                    Dossiê LBI Art. 28
                  </a>
                </li>
                <li>
                  <a href="#pilares" className="hover:text-white transition-colors">
                    Formação Docente
                  </a>
                </li>
                <li>
                  <a href="#pilares" className="hover:text-white transition-colors">
                    Gestão NAE
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Legislação & Conformidade */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Legislação & Normas
              </h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-slate-300">Lei nº 13.146/2015 (LBI)</span>
                </li>
                <li>
                  <span className="text-slate-300">Diretrizes DUA (CAST)</span>
                </li>
                <li>
                  <span className="text-slate-300">W3C WCAG 2.2 Nível AAA</span>
                </li>
                <li>
                  <span className="text-slate-300">Normas e-MAG Brasil</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Acesso Rápido */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Acesso Rápido</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Acesso Docente / NAE
                  </Link>
                </li>
                <li>
                  <Link href="/registro" className="hover:text-white transition-colors">
                    Cadastrar Instituição
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Painel Administrativo
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} Pluralis Educação Inclusiva. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Desenvolvido com foco rigoroso em neurodiversidade e acessibilidade.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
