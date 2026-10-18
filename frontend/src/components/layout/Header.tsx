'use client';

import React from 'react';
import {
  MdNotificationsNone,
  MdHelpOutline,
  MdAccountCircle,
  MdAccessibility,
  MdContrast
} from 'react-icons/md';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [highContrast, setHighContrast] = React.useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('high-contrast');
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Title / Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 font-normal">{subtitle}</p>}
      </div>

      {/* Accessibility & Action Bar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Accessibility Toolbar */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button
            onClick={toggleHighContrast}
            title="Alternar Alto Contraste (Acessibilidade)"
            aria-label="Alternar Alto Contraste"
            className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              highContrast
                ? 'bg-slate-900 text-yellow-300 shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MdContrast size={16} />
            <span className="hidden sm:inline">Contraste</span>
          </button>
        </div>

        {/* Notifications */}
        <button
          className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors relative"
          aria-label="Notificações do Sistema"
          title="Notificações"
        >
          <MdNotificationsNone size={22} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
        </button>

        {/* Help */}
        <button
          className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors hidden sm:block"
          aria-label="Central de Ajuda e Suporte"
          title="Central de Ajuda"
        >
          <MdHelpOutline size={22} />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <MdAccountCircle size={26} />
          </div>
        </div>
      </div>
    </header>
  );
};
