'use client';

import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();
  const { setGuideOpen } = useAccessibility();

  const handleLogout = () => {
    localStorage.removeItem('pluralis_token');
    router.push('/login');
  };

  return (
    <header
      role="banner"
      className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between shadow-sm transition-colors"
    >
      <div className="flex-1 min-w-0 pr-4">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 truncate hidden sm:block">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* WCAG AAA Badge Button */}
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          title="Abrir guia de acessibilidade e normas LBI"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LBI Art. 28 / WCAG AAA</span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* User Badge & Logout */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-slate-800 leading-none">Prof. Coordenador</p>
            <p className="text-[11px] text-slate-500 mt-0.5">NAE Institucional</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair da conta"
            title="Sair do Pluralis"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
