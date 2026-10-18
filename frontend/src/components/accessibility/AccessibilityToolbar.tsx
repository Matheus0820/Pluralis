'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import {
  Sun,
  Moon,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Eye,
  Sliders,
  HelpCircle,
  X,
  Keyboard,
  Check,
} from 'lucide-react';

export const AccessibilityToolbar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const {
    highContrast,
    fontSize,
    dyslexicFont,
    reducedMotion,
    grayscale,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleDyslexicFont,
    toggleReducedMotion,
    toggleGrayscale,
    resetAll,
  } = useAccessibility();

  const [expanded, setExpanded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const fontPercentageMap = {
    sm: '90%',
    md: '100%',
    lg: '115%',
    xl: '130%',
  };

  return (
    <>
      {/* Top Banner Toolbar or Compact Widget */}
      <aside
        aria-label="Barra de ferramentas de acessibilidade"
        className={`w-full bg-slate-900 border-b border-slate-800 text-slate-200 text-xs transition-all ${
          compact ? 'py-1.5 px-4' : 'py-2 px-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Quick Access Label & Status */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full text-[11px]">
              <Eye className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>Acessibilidade</span>
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Alt+1: Conteúdo | Alt+C: Contraste | Alt++: Fonte
            </span>
          </div>

          {/* Controls Group */}
          <div
            role="toolbar"
            aria-label="Controles de adaptação visual e motora"
            className="flex items-center gap-1.5 flex-wrap"
          >
            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              aria-label={highContrast ? 'Desativar Alto Contraste (Alt+C)' : 'Ativar Alto Contraste (Alt+C)'}
              title="Alto Contraste (Alt+C)"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {highContrast ? <Sun className="w-3.5 h-3.5 text-slate-950" /> : <Moon className="w-3.5 h-3.5 text-amber-400" />}
              <span>Contraste</span>
            </button>

            {/* Font Size Adjusters */}
            <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded overflow-hidden">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={fontSize === 'sm'}
                aria-label="Diminuir tamanho da fonte (Alt+-)"
                title="Diminuir fonte (Alt+-)"
                className="px-2 py-1 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={resetFontSize}
                aria-label={`Tamanho da fonte atual: ${fontPercentageMap[fontSize]}. Clique para restaurar 100%`}
                title="Restaurar tamanho padrão da fonte (Alt+0)"
                className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 hover:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {fontPercentageMap[fontSize]}
              </button>
              <button
                type="button"
                onClick={increaseFontSize}
                disabled={fontSize === 'xl'}
                aria-label="Aumentar tamanho da fonte (Alt++)"
                title="Aumentar fonte (Alt++)"
                className="px-2 py-1 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dyslexia-friendly Font */}
            <button
              type="button"
              onClick={toggleDyslexicFont}
              aria-pressed={dyslexicFont}
              aria-label={dyslexicFont ? 'Desativar modo dislexia' : 'Ativar modo leitura facilitada para dislexia'}
              title="Tipografia amigável para Dislexia"
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                dyslexicFont
                  ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dislexia</span>
            </button>

            {/* Reduced Motion */}
            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={reducedMotion}
              aria-label={reducedMotion ? 'Ativar animações normais' : 'Reduzir animações e transições'}
              title="Redução de Movimento"
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                reducedMotion
                  ? 'bg-blue-600 text-white border-blue-500 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{reducedMotion ? 'Sem Animação' : 'Movimento'}</span>
            </button>

            {/* Grayscale Mode */}
            <button
              type="button"
              onClick={toggleGrayscale}
              aria-pressed={grayscale}
              aria-label={grayscale ? 'Desativar escala de cinza' : 'Ativar modo monocromático'}
              title="Modo Monocromático (Escala de cinza)"
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                grayscale
                  ? 'bg-zinc-300 text-zinc-950 border-zinc-200 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Preto & Branco</span>
            </button>

            {/* Help & Shortcuts Guide */}
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              aria-label="Abrir guia de acessibilidade e atalhos de teclado (Alt+A)"
              title="Atalhos e Diretrizes (Alt+A)"
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ajuda</span>
            </button>

            {/* Reset All */}
            {(highContrast || fontSize !== 'md' || dyslexicFont || reducedMotion || grayscale) && (
              <button
                type="button"
                onClick={resetAll}
                aria-label="Restaurar todas as configurações visuais para o padrão"
                title="Restaurar configurações padrão"
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-rose-950/80 text-rose-300 border border-rose-800/80 hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Restaurar</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Accessible Shortcuts Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-amber-400" />
                <h2 id="a11y-modal-title" className="text-base font-bold text-white">
                  Guia de Acessibilidade & Atalhos (WCAG 2.2 / LBI)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                aria-label="Fechar guia de acessibilidade"
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                O <strong>Pluralis</strong> foi desenvolvido em estrita conformidade com o Artigo 28 da Lei Brasileira de Inclusão (LBI nº 13.146/2015) e as diretrizes internacionais W3C WCAG 2.2 nível AAA.
              </p>

              <div>
                <h3 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] mb-2">
                  Atalhos Globais do Teclado
                </h3>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-300">Pular para Conteúdo Principal</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + 1</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-300">Alternar Alto Contraste</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + C</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-300">Aumentar Tamanho da Fonte</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + +</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-300">Diminuir Tamanho da Fonte</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + -</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-300">Restaurar Tamanho da Fonte</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + 0</kbd>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-300">Abrir / Fechar este Guia</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300">Alt + A</kbd>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-1.5">
                <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Garantias de Acessibilidade Pluralis
                </h4>
                <ul className="text-slate-300 text-[11px] list-disc list-inside space-y-1">
                  <li>Total compatibilidade com leitores de tela NVDA, JAWS e VoiceOver.</li>
                  <li>Hierarquia semântica de cabeçalhos (H1 a H4) sem saltos estruturais.</li>
                  <li>Foco visível aprimorado com anel de alto contraste.</li>
                  <li>Suporte a tipografia aberta e espaçamento ampliado para pessoas com dislexia.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
