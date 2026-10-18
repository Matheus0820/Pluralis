'use client';

import React, { useState } from 'react';
import {
  MdSettings,
  MdSave,
  MdAccessibility,
  MdShield,
  MdNotifications,
  MdCheckCircle,
  MdVisibility,
  MdFormatSize
} from 'react-icons/md';

export default function ConfiguracoesPage() {
  const [salvo, setSalvo] = useState(false);
  const [fonteAmpliada, setFonteAmpliada] = useState(false);
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [leitorAutomatico, setLeitorAutomatico] = useState(false);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <MdSettings className="text-indigo-600" size={28} />
          Configurações da Plataforma & Acessibilidade
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Gerencie as preferências institucionais, recursos assistivos e parâmetros de privacidade e conformidade.
        </p>
      </div>

      <form onSubmit={handleSalvar} className="space-y-6">
        {/* Accessibility Features Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <MdAccessibility className="text-indigo-600" size={20} />
            Recursos de Acessibilidade do Sistema (WCAG 2.1 AA)
          </h3>

          <div className="space-y-4 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <MdFormatSize size={22} className="text-slate-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Tipografia Aumentada por Padrão</p>
                  <p className="text-xs text-slate-500">Aumenta o tamanho da escala de fontes em todos os painéis</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={fonteAmpliada}
                onChange={(e) => setFonteAmpliada(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <MdVisibility size={22} className="text-slate-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Otimização para Leitores de Tela (NVDA / JAWS)</p>
                  <p className="text-xs text-slate-500">Ativa tags ARIA extras e descrições detalhadas de botões</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={leitorAutomatico}
                onChange={(e) => setLeitorAutomatico(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Institution Info Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <MdShield className="text-indigo-600" size={20} />
            Dados da Instituição de Ensino
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Nome da Instituição
              </label>
              <input
                type="text"
                defaultValue="Colégio Integrado Pluralis"
                className="w-full text-sm rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Código INEP / Censo Escolar
              </label>
              <input
                type="text"
                defaultValue="35198234"
                className="w-full text-sm rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <MdNotifications className="text-indigo-600" size={20} />
            Alertas de Auditoria e Prazos Pedagógicos
          </h3>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-800">Alertas de Renovação de PEI</p>
              <p className="text-xs text-slate-500">Notificar coordenação quando o plano individualizado de um aluno expirar</p>
            </div>
            <input
              type="checkbox"
              checked={notificacoesEmail}
              onChange={(e) => setNotificacoesEmail(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between">
          <div>
            {salvo && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <MdCheckCircle size={18} />
                <span>Preferências salvas com sucesso!</span>
              </span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <MdSave size={18} />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
