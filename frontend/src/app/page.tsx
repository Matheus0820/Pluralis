'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAccessibility } from '@/context/AccessibilityContext';
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
  ArrowUpRight,
  Lock,
  Laptop,
  Check,
  Star,
  Sliders,
  Type,
  Sun,
  Moon,
  RefreshCw,
} from 'lucide-react';

export default function LandingPage() {
  // Simulator State
  const [activePersona, setActivePersona] = useState<'tea' | 'dislexia' | 'baixa_visao'>('tea');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Theme & Accessibility Context
  const { highContrast, toggleHighContrast, fontSize, increaseFontSize, decreaseFontSize, reducedMotion, toggleReducedMotion, dyslexicFont, toggleDyslexicFont } = useAccessibility();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  const personas = {
    tea: {
      id: 'tea',
      name: 'Neurodivergência (TEA)',
      badge: 'Espectro Autista & Previsibilidade',
      description: 'Previsibilidade estruturada, redução de ambiguidade e flexibilização de engajamento.',
      original:
        'Na aula de amanhã realizaremos uma atividade em grupo aberta para discutir os efeitos da política monetária sobre a inflação. Tragam ideias livres e se organizem na hora como acharem melhor para apresentar na lousa perante a turma.',
      barriers: [
        'Instruções abstratas sem marcos temporais definidos',
        'Ansiedade social gerada por formação espontânea de grupos',
        'Exigência unilateral de exposição oral na lousa',
      ],
      adapted: {
        title: 'Roteiro Estruturado com Opções Múltiplas (DUA)',
        steps: [
          'Previsibilidade: 4 blocos de 10 min (Leitura → Registro → Síntese → Compartilhamento opcional).',
          'Duplas previamente alinhadas ou opção de elaboração autônoma individual.',
          'Formatos alternativos equivalentes: mapa conceitual digital, resumo ou áudio.',
          'Glossário objetivo prévio (Selic, IPCA, Liquidez).',
        ],
        lbiBasis: 'Art. 28, Incisos II e III da LBI (recursos pedagógicos acessíveis e planos individualizados).',
      },
    },
    dislexia: {
      id: 'dislexia',
      name: 'TDAH & Dislexia',
      badge: 'Processamento Visual & Carga Cognitiva',
      description: 'Segmentação em blocos conceituais curtos e suporte multimodal.',
      original:
        'Considere que a função de demanda agregada descrita pelo modelo IS-LM sob regime de câmbio flexível e mobilidade de capitais estabelece um equilíbrio simultâneo onde os choques exógenos produzem flutuações cíclicas.',
      barriers: [
        'Período sintático longo sem pausas semânticas',
        'Sobrecarga da memória de trabalho verbal',
        'Ausência de representação visual das relações causais',
      ],
      adapted: {
        title: 'Segmentação Semântica com Diagrama Causal (DUA)',
        steps: [
          'Conceito 1: O modelo IS-LM equilibra mercado de bens e taxa de juros.',
          'Conceito 2: Câmbio flexível reflete flutuação livre por oferta e procura.',
          'Conceito 3: Rigidez nominal de curto prazo gera oscilações transitórias.',
          'Suporte ativado: Áudio-descrição e tipografia com entrelinhas ampliado.',
        ],
        lbiBasis: 'Art. 28, Inciso V da LBI (práticas pedagógicas inclusivas em formação).',
      },
    },
    baixa_visao: {
      id: 'baixa_visao',
      name: 'Deficiência Visual / Baixa Visão',
      badge: 'Multimodalidade & Acessibilidade Sensorial',
      description: 'Descrição de gráficos, tabelas estruturadas para screen readers e contraste reforçado.',
      original:
        'Observe a figura 3.2 abaixo que mostra o gráfico tridimensional das curvas de potencial eletrostático e identifique visualmente as regiões de gradiente mais íngreme.',
      barriers: [
        'Dependência de decodificação visual de gradiente de cores',
        'Imagem sem texto alternativo estruturado',
        'Impossibilidade de navegação por teclado para NVDA/JAWS',
      ],
      adapted: {
        title: 'Representação Multimodal Textual e Paramétrica (DUA)',
        steps: [
          'Texto alternativo analítico descrevendo o comportamento vetorial (X, Y, Z).',
          'Tabela de coordenadas tabulares compatível com linhas braille e leitores de tela.',
          'Indicação sonora de elevação tonal para gradientes.',
          'Arquivo vetorial de alto contraste para impressão termográfica.',
        ],
        lbiBasis: 'Art. 28, Incisos I e XIV da LBI (tecnologia assistiva e materiais acessíveis).',
      },
    },
  };

  const faqs = [
    {
      q: 'O que é o Artigo 28 da Lei Brasileira de Inclusão (LBI) e por que ele impacta as IES?',
      a: 'O Art. 28 da Lei nº 13.146/2015 obriga instituições de ensino a prover adaptações curriculares, materiais acessíveis e planos individualizados sem custo extra. O descumprimento gera passivos jurídicos e sanções do MEC.',
    },
    {
      q: 'O Pluralis substitui o trabalho docente ou do NAE?',
      a: 'Não. O Pluralis atua como um copiloto inteligente fundamentado no Desenho Universal para Aprendizagem (DUA), cabendo sempre ao docente e especialistas a validação final.',
    },
    {
      q: 'Como é gerado o dossiê probatório de conformidade legal?',
      a: 'A cada adaptação, a plataforma registra carimbo temporal, justificativas pedagógicas e referências aos incisos do Art. 28 da LBI, exportáveis em PDF para auditorias do MEC.',
    },
    {
      q: 'A plataforma é compatível com os Ambientes Virtuais de Aprendizagem (AVA)?',
      a: 'Sim. Integração direta com Moodle, Canvas, Blackboard, Google Classroom ou exportação em HTML semântico acessível.',
    },
    {
      q: 'Quais recursos de acessibilidade a plataforma oferece?',
      a: 'Desenvolvido sob W3C WCAG 2.2 AAA e e-MAG, possui atalhos de teclado, alto contraste, ajuste de fontes, modo dislexia e redução de estímulos visuais.',
    },
  ];

  // Dynamic theme styling helper classes
  const isLight = theme === 'light';
  const bgMain = highContrast ? 'bg-black text-yellow-300' : isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-900 text-slate-100';
  const bgSub = highContrast ? 'bg-zinc-900 text-yellow-300' : isLight ? 'bg-white text-slate-900' : 'bg-slate-950 text-slate-100';
  const bgCard = highContrast ? 'bg-zinc-950 border-yellow-500' : isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800';
  const textMuted = highContrast ? 'text-yellow-400' : isLight ? 'text-slate-600' : 'text-slate-300';
  const borderColor = highContrast ? 'border-yellow-500/50' : isLight ? 'border-slate-200' : 'border-slate-800';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${bgMain} ${fontSizeLarge ? 'text-lg' : 'text-base'}`}>
      {/* ========================================================
          STICKY INSTITUTIONAL NAVBAR
          ======================================================== */}
      <header
        role="banner"
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          highContrast ? 'bg-black/95 border-yellow-500' : isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo with White Background Container (Larger Logo Graphic) */}
          <Link
            href="/"
            aria-label="Pluralis - Página Inicial"
            className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/pluralis-logo.png"
                alt="Pluralis Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black tracking-tight transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Pluralis
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                  LBI Art. 28
                </span>
              </div>
              <p className={`text-xs font-medium hidden sm:block ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Copiloto Inclusivo & DUA
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav
            role="navigation"
            aria-label="Menu principal de navegação"
            className={`hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
          >
            <a href="#como-funciona" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-amber-500">
              Como Funciona
            </a>
            <a href="#simulador-dua" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-amber-500">
              Simulador DUA
            </a>
            <a href="#pilares" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-amber-500">
              Pilares
            </a>
            <a href="#impacto" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-amber-500">
              Impacto
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-amber-500">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isLight ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
          className={`relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b ${borderColor} ${
            isLight ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100' : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-7">
                <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border shadow-inner ${isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-800 border-slate-700 text-emerald-300'}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold">
                    Conformidade Art. 28 LBI & Desenho Universal para Aprendizagem (DUA)
                  </span>
                </div>

                <h1
                  id="hero-heading"
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-black tracking-tight leading-[1.15] ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  Educação Inclusiva,{' '}
                  <span className="text-blue-600">
                    simples e segura.
                  </span>
                </h1>

                <p className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal ${textMuted}`}>
                  Adapte ementas e avaliações para estudantes neurodivergentes em minutos, em conformidade com o Art. 28 da LBI.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/registro"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <span>Iniciar Demonstração Gratuita</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#simulador-dua"
                    className={`inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isLight ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Ver Simulador DUA</span>
                  </a>
                </div>

                <div className={`pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t text-xs ${borderColor} ${textMuted}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Art. 28 da LBI nº 13.146</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>W3C WCAG 2.2 AAA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Exportação de Dossiê PDF</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Card Preview */}
              <div className="lg:col-span-5 relative">
                <div className={`relative rounded-2xl p-5 sm:p-6 border shadow-2xl ${isLight ? 'bg-white border-slate-200 shadow-slate-200' : 'bg-slate-800/90 border-slate-700 shadow-indigo-950/50'}`}>
                  <div className={`flex items-center justify-between pb-4 border-b ${borderColor}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>Disciplina: Cálculo Aplicado</span>
                        <span className={`text-[10px] ${textMuted}`}>Docente: Prof. Dr. André Santos</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      DUA Ativo
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <div className="flex items-center justify-between font-semibold">
                        <span className={textMuted}>Texto Original da Ementa:</span>
                        <span className="text-[9px] text-rose-500 font-bold">Barreiras Identificadas</span>
                      </div>
                      <p className={`italic line-clamp-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        &quot;Apresentação oral obrigatória de derivadas parciais na lousa perante toda a turma sem recursos de apoio alternativos...&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-600 py-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Pluralis aplicou 4 adaptações DUA automáticas</span>
                    </div>

                    <div className={`p-4 rounded-xl border text-xs space-y-2 ${isLight ? 'bg-blue-50 border-blue-200 text-slate-800' : 'bg-blue-950/40 border-blue-800/60 text-slate-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          Plano de Acomodação Razoável
                        </span>
                        <span className="text-[10px] text-blue-500 font-mono">Dossiê #PL-4912</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px]">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Opção de entrega assíncrona em vídeo gravado ou relatório estruturado.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Infográfico interativo com representação vetorial em 3D.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Resguardo legal: Art. 28, Inciso II da LBI.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] ${borderColor} ${textMuted}`}>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Auditoria MEC Pronta
                    </span>
                    <span>IES parceira</span>
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
          className={`py-20 lg:py-28 border-b ${borderColor} ${bgSub}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
                Simulador Pedagógico Interativo
              </span>
              <h2 id="simulador-heading" className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Experimente a adaptação DUA em tempo real
              </h2>
              <p className={`text-sm sm:text-base ${textMuted}`}>
                Selecione um perfil de aprendizagem para comparar o conteúdo tradicional com a solução gerada pelo Pluralis.
              </p>
            </div>

            <div role="tablist" aria-label="Perfis de Estudantes" className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
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
                        ? isLight ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500' : 'bg-slate-900 border-blue-500 shadow-lg'
                        : isLight ? 'bg-slate-100/80 border-slate-200 hover:bg-slate-100' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        {item.badge}
                      </span>
                    </div>
                    <p className={`text-xs line-clamp-2 ${textMuted}`}>{item.description}</p>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${activePersona}`}
              aria-labelledby={`tab-${activePersona}`}
              className={`border rounded-2xl p-6 sm:p-8 shadow-xl ${bgCard}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className={`flex items-center justify-between pb-2 border-b ${borderColor}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Conteúdo Convencional (Com Barreiras)
                    </span>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs leading-relaxed font-serif ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                    &quot;{personas[activePersona].original}&quot;
                  </div>

                  <div className="space-y-2">
                    <span className={`text-xs font-semibold block ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Barreiras Mapeadas pelo Algoritmo:</span>
                    <ul className="space-y-1.5">
                      {personas[activePersona].barriers.map((barrier, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-rose-500 font-medium">
                          <span className="font-bold shrink-0">✕</span>
                          <span>{barrier}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-center justify-between pb-2 border-b ${borderColor}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Adaptação Recomendada (DUA)
                    </span>
                  </div>

                  <div className={`p-5 rounded-xl border text-xs space-y-3 ${isLight ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' : 'bg-blue-950/30 border-blue-900/60 text-slate-200'}`}>
                    <h3 className={`font-bold text-sm ${isLight ? 'text-emerald-900' : 'text-blue-300'}`}>{personas[activePersona].adapted.title}</h3>

                    <ul className="space-y-2">
                      {personas[activePersona].adapted.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`pt-3 border-t flex items-start gap-2 text-[11px] ${isLight ? 'border-emerald-200 text-amber-800' : 'border-blue-900/60 text-amber-300'}`}>
                      <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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
          className={`py-20 lg:py-28 border-b ${borderColor} ${bgMain}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-full">
                Fluxo Contínuo
              </span>
              <h2 id="workflow-heading" className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Da ementa tradicional à conformidade em 4 passos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Diagnóstico', desc: 'Submissão de ementas e planos para rastreamento automatizado de barreiras de aprendizagem.' },
                { step: '02', title: 'Adaptação DUA', desc: 'Geração de propostas multimodais para representação, expressão e engajamento.' },
                { step: '03', title: 'Validação Docente', desc: 'O professor revisa e customiza as acomodações recomendadas com autonomia pedagógica.' },
                { step: '04', title: 'Dossiê LBI', desc: 'Geração de comprovação documental vinculada ao Art. 28 da LBI para auditorias do MEC.' },
              ].map((item, idx) => (
                <div key={idx} className={`border rounded-2xl p-6 transition-colors ${bgCard}`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 border border-blue-500/30 font-bold flex items-center justify-center text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                  <p className={`text-xs leading-relaxed ${textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4 PILARES ESTRUTURAIS
            ======================================================== */}
        <section id="pilares" aria-labelledby="pilares-heading" className={`py-20 lg:py-28 border-b ${borderColor} ${bgSub}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                Ecossistema Completo
              </span>
              <h2 id="pilares-heading" className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Os quatro pilares do Pluralis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Brain, title: '1. Adaptação Baseada em DUA', desc: 'Transformação de planos de ensino rígidos em matrizes dinâmicas alinhadas ao modelo CAST de Desenho Universal.' },
                { icon: ShieldCheck, title: '2. Dossiê & Segurança Jurídica', desc: 'Blindagem institucional contra passivos legais, com rastreabilidade direta vinculada aos 18 incisos do Art. 28 da LBI.' },
                { icon: GraduationCap, title: '3. Formação Docente Just-in-Time', desc: 'Capacitação prática em serviço, entregando micro-orientações pedagógicas no exato momento do planejamento.' },
                { icon: Layers, title: '4. Gestão Estratégica NAE', desc: 'Painel consolidado para Reitorias e Núcleos de Acessibilidade monitorarem adesão, permanência e indicadores do MEC.' },
              ].map((pilar, idx) => {
                const IconComponent = pilar.icon;
                return (
                  <div key={idx} className={`border rounded-2xl p-8 transition-colors ${bgCard}`}>
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-6">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{pilar.title}</h3>
                    <p className={`text-sm leading-relaxed ${textMuted}`}>{pilar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            IMPACTO EM NÚMEROS
            ======================================================== */}
        <section id="impacto" aria-labelledby="impacto-heading" className={`py-20 border-b ${borderColor} ${bgMain}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                Resultados Mensuráveis
              </span>
              <h2 id="impacto-heading" className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Impacto institucional comprovado
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { stat: '92%', title: 'Redução no Tempo de Adaptação', desc: 'Docentes adaptam ementas em minutos.' },
                { stat: '100%', title: 'Cobertura Probatória LBI', desc: 'Dossiês rastreáveis para auditoria.' },
                { stat: '+3.4x', title: 'Permanência Estudantil', desc: 'Queda expressiva na evasão.' },
                { stat: 'AAA', title: 'WCAG 2.2 Nível AAA', desc: 'Acessibilidade digital integral.' },
              ].map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${bgCard}`}>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 mb-2">{item.stat}</div>
                  <div className={`text-xs sm:text-sm font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</div>
                  <p className={`text-[11px] ${textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            FAQ ACCORDION
            ======================================================== */}
        <section id="faq" aria-labelledby="faq-heading" className={`py-20 lg:py-28 border-b ${borderColor} ${bgSub}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-full">
                Dúvidas Frequentes
              </span>
              <h2 id="faq-heading" className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className={`border rounded-xl overflow-hidden transition-colors ${bgCard}`}>
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className={`w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                        isLight ? 'text-slate-950 hover:text-blue-600' : 'text-white hover:text-blue-300'
                      }`}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${borderColor} ${textMuted}`}
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
            BOTTOM CTA SECTION
            ======================================================== */}
        <section aria-labelledby="cta-heading" className="py-20 lg:py-24 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Inclusão de Alto Impacto
            </span>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Pronto para transformar sua IES em referência de inclusão?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/registro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                <span>Criar Conta Institucional</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span>Acessar Plataforma</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          INSTITUTIONAL FOOTER
          ======================================================== */}
      <footer role="contentinfo" aria-label="Rodapé institucional" className="bg-slate-950 text-slate-300 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-0.5 shadow-md">
                  <img src="/pluralis-logo.png" alt="Pluralis Logo" className="w-11 h-11 object-contain" />
                </div>
                <span className="text-lg font-black text-white tracking-tight">Pluralis</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
                Inteligência pedagógica inclusiva e adaptação curricular baseada em DUA em conformidade com o Artigo 28 da LBI.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Soluções</h4>
              <ul className="space-y-2">
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Adaptação DUA</a></li>
                <li><a href="#pilares" className="hover:text-white transition-colors">Dossiê LBI Art. 28</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legislação</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-200">Lei nº 13.146/2015 (LBI)</span></li>
                <li><span className="text-slate-200">W3C WCAG 2.2 AAA</span></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Acesso</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/registro" className="hover:text-white transition-colors">Registro</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
            <p>© {new Date().getFullYear()} Pluralis Educação Inclusiva. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
