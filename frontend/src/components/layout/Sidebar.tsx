'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdDashboard,
  MdAutoAwesome,
  MdSchool,
  MdForum,
  MdAnalytics,
  MdSettings,
  MdMenu,
  MdClose,
  MdLogout,
  MdAccessibilityNew
} from 'react-icons/md';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboard },
  { name: 'Adaptação de Material (IA)', href: '/dashboard/adaptar', icon: MdAutoAwesome },
  { name: 'Capacitação Docente', href: '/dashboard/capacitacao', icon: MdSchool },
  { name: 'Fórum Interdisciplinar', href: '/dashboard/forum', icon: MdForum },
  { name: 'Relatórios & Auditoria', href: '/dashboard/relatorios', icon: MdAnalytics },
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: MdSettings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-indigo-900 text-white shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label={isOpen ? 'Fechar Menu Lateral' : 'Abrir Menu Lateral'}
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navegação Principal"
      >
        <div>
          {/* Brand Logo & Name */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-md">
              <MdAccessibilityNew size={24} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">Pluralis</span>
              <p className="text-xs text-indigo-300 font-medium tracking-wide">Acessibilidade Pedagógica</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" role="navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile summary */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-700/60 border border-indigo-500/40 flex items-center justify-center text-sm font-semibold text-indigo-100">
                PD
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-200">Prof. Docente</p>
                <p className="text-xs text-slate-400">Escola Modelo</p>
              </div>
            </div>
            <button
              title="Encerrar Sessão"
              aria-label="Encerrar Sessão"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MdLogout size={20} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
