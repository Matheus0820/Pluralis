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
  Eye,
  Sliders,
  HelpCircle,
  X,
  Keyboard,
  ChevronDown,
  ChevronUp,
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

  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const fontPercentageMap = {
    sm: '90%',
    md: '100%',
    lg: '115%',
    xl: '130%',
  };

  const hasActiveModifiers = highContrast || fontSize !== 'md' || dyslexicFont || reducedMotion || grayscale;

  return (
    <>
      {/* Sleek Minimalist Accessibility Bar */}
      <aside
        aria-label="Barra de Acessibilidade Rápida"
        className="w-full bg-slate-950/95 border-b border-slate-800/80 text-slate-300 text-xs py-1.5 px-4 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2.5 py-0.5 rounded-full text-[11px]">
              <Eye className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>Acessibilidade</span>
            </span>
            {hasActiveModifiers && (
              <span className="text-[10px] text-amber-400 font-medium hidden md:inline">
                (Modificações ativas)
              </span>
            )}
          </div>

          {/* Right Controls: Compact Toggle & Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Contrast Button */}
            <button
              type="button"
              onClick={toggleHighContrast}
              aria-pressed={highContrast}
              aria-label={highContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Contraste</span>
            </button>

            {/* Quick Font Size Toggle */}
            <div className="hidden sm:inline-flex items-center bg-slate-900 border border-slate-800 rounded-md overflow-hidden">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={fontSize === 'sm'}
                aria-label="Diminuir fonte"
                className="px-2 py-1 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={resetFontSize}
                aria-label={`Tamanho atual: ${fontPercentageMap[fontSize]}. Clique para restaurar`}
                className="px-2 py-1 text-[11px] font-mono font-medium text-slate-300 hover:bg-slate-800"
              >
                {fontPercentageMap[fontSize]}
              </button>
              <button
                type="button"
                onClick={increaseFontSize}
                disabled={fontSize === 'xl'}
                aria-label="Aumentar fonte"
                className="px-2 py-1 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>

            {/* Expand / Collapse Menu for Other Options */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Mais opções de acessibilidade"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span>Mais Opções</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Help / Shortcuts */}
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              aria-label="Guia de atalhos e acessibilidade"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Ajuda e Atalhos (Alt+A)"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Expandable Panel for Advanced A11y Options */}
        {isOpen && (
          <div className="max-w-7xl mx-auto pt-3 pb-2 mt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Dyslexia Toggle */}
              <button
                type="button"
                onClick={toggleDyslexicFont}
                aria-pressed={dyslexicFont}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors border ${
                  dyslexicFont
                    ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Fonte Dislexia</span>
              </button>

              {/* Reduced Motion Toggle */}
              <button
                type="button"
                onClick={toggleReducedMotion}
                aria-pressed={reducedMotion}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors border ${
                  reducedMotion
                    ? 'bg-blue-600 text-white border-blue-500 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Reduzir Movimento</span>
              </button>

              {/* Grayscale Mode */}
              <button
                type="button"
                onClick={toggleGrayscale}
                aria-pressed={grayscale}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors border ${
                  grayscale
                    ? 'bg-zinc-300 text-zinc-950 border-zinc-200 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>Monocromático</span>
              </button>
            </div>

            {hasActiveModifiers && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs text-rose-300 bg-rose-950/60 border border-rose-800 hover:bg-rose-900 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar Padrão</span>
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Help Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-amber-400" />
                <h2 id="a11y-modal-title" className="text-sm font-bold text-white">
                  Atalhos & Acessibilidade (LBI / WCAG 2.2)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-300">
              <p>O Pluralis atende integralmente ao Art. 28 da Lei Brasileira de Inclusão (Lei 13.146/2015).</p>
              <ul className="space-y-1.5 font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                <li><strong className="text-amber-400">Alt + C:</strong> Alternar Alto Contraste</li>
                <li><strong className="text-amber-400">Alt + + / -:</strong> Ajustar tamanho da fonte</li>
                <li><strong className="text-amber-400">Alt + 0:</strong> Restaurar fonte padrão</li>
                <li><strong className="text-amber-400">Alt + 1:</strong> Ir para o conteúdo principal</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
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
