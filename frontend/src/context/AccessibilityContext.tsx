'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type FontSizeLevel = 'sm' | 'md' | 'lg' | 'xl';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: FontSizeLevel;
  dyslexicFont: boolean;
  reducedMotion: boolean;
  grayscale: boolean;
  guideOpen: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: FontSizeLevel) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleDyslexicFont: () => void;
  toggleReducedMotion: () => void;
  toggleGrayscale: () => void;
  setGuideOpen: (open: boolean) => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'pluralis_a11y_prefs';

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSizeLevel>('md');
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.highContrast === 'boolean') setHighContrast(parsed.highContrast);
        if (['sm', 'md', 'lg', 'xl'].includes(parsed.fontSize)) setFontSizeState(parsed.fontSize);
        if (typeof parsed.dyslexicFont === 'boolean') setDyslexicFont(parsed.dyslexicFont);
        if (typeof parsed.reducedMotion === 'boolean') setReducedMotion(parsed.reducedMotion);
        if (typeof parsed.grayscale === 'boolean') setGrayscale(parsed.grayscale);
      } else {
        // Check system preference for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setReducedMotion(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save preferences whenever they change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ highContrast, fontSize, dyslexicFont, reducedMotion, grayscale })
      );
    } catch {
      // Ignore storage errors
    }
  }, [highContrast, fontSize, dyslexicFont, reducedMotion, grayscale, mounted]);

  // Synchronize CSS classes on document.documentElement
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // High Contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size classes
    root.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');
    root.classList.add(`font-size-${fontSize}`);

    // Dyslexic Font
    if (dyslexicFont) {
      root.classList.add('font-dyslexic');
    } else {
      root.classList.remove('font-dyslexic');
    }

    // Reduced Motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Grayscale
    if (grayscale) {
      root.classList.add('grayscale-mode');
    } else {
      root.classList.remove('grayscale-mode');
    }
  }, [highContrast, fontSize, dyslexicFont, reducedMotion, grayscale]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  const setFontSize = useCallback((size: FontSizeLevel) => {
    setFontSizeState(size);
  }, []);

  const increaseFontSize = useCallback(() => {
    setFontSizeState((current) => {
      if (current === 'sm') return 'md';
      if (current === 'md') return 'lg';
      if (current === 'lg') return 'xl';
      return 'xl';
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeState((current) => {
      if (current === 'xl') return 'lg';
      if (current === 'lg') return 'md';
      if (current === 'md') return 'sm';
      return 'sm';
    });
  }, []);

  const resetFontSize = useCallback(() => {
    setFontSizeState('md');
  }, []);

  const toggleDyslexicFont = useCallback(() => {
    setDyslexicFont((prev) => !prev);
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

  const toggleGrayscale = useCallback(() => {
    setGrayscale((prev) => !prev);
  }, []);

  const resetAll = useCallback(() => {
    setHighContrast(false);
    setFontSizeState('md');
    setDyslexicFont(false);
    setReducedMotion(false);
    setGrayscale(false);
  }, []);

  // Keyboard shortcut listener (WCAG 2.2 compliant)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + C: Toggle high contrast
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        toggleHighContrast();
      }
      // Alt + A: Open shortcuts guide
      else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setGuideOpen((prev) => !prev);
      }
      // Alt + + or Alt + =: Increase font
      else if (e.altKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        increaseFontSize();
      }
      // Alt + -: Decrease font
      else if (e.altKey && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        decreaseFontSize();
      }
      // Alt + 0: Reset font
      else if (e.altKey && e.key === '0') {
        e.preventDefault();
        resetFontSize();
      }
      // Alt + 1: Jump to main content
      else if (e.altKey && e.key === '1') {
        e.preventDefault();
        const main = document.getElementById('main-content');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleHighContrast, increaseFontSize, decreaseFontSize, resetFontSize]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        dyslexicFont,
        reducedMotion,
        grayscale,
        guideOpen,
        toggleHighContrast,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleDyslexicFont,
        toggleReducedMotion,
        toggleGrayscale,
        setGuideOpen,
        resetAll,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
  }
  return context;
};
