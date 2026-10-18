'use client';

import React from 'react';
import Link from 'next/link';
import {
  MdAutoAwesome,
  MdSchool,
  MdCheckCircle,
  MdHistory,
  MdTrendingUp,
  MdArrowForward,
  MdMenuBook,
  MdGroup,
  MdOutlineGavel,
  MdSecurity
} from 'react-icons/md';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Materiais Adaptados',
      value: '148',
      change: '+18% este mês',
      icon: MdAutoAwesome,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Docentes Capacitados',
      value: '42',
      change: '87% da equipe',
      icon: MdSchool,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      title: 'Índice de Acessibilidade',
      value: '94.2%',
      change: 'Conforme LBI / BNCC',
      icon: MdCheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Horas Poupadas (Docentes)',
      value: '312h',
      change: '~7.4h/docente/mês',
      icon: MdTrendingUp,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  const recentAdaptations = [
    {
      id: '1',
      title: 'História do Brasil: Período Regencial',
      studentNeed: 'Deficiência Visual (Leitor de Tela + Braille)',
      date: 'Há 25 minutos',
      status: 'Concluído',
      score: '98%',
    },
    {
      id: '2',
      title: 'Equações de 2º Grau e Geometria',
      studentNeed: 'Transtorno do Espectro Autista (TEA - Nível 1)',
      date: 'Há 2 horas',
      status: 'Concluído',
      score: '95%',
    },
    {
      id: '3',
      title: 'Biologia Celular: Mitose e Meiose',
      studentNeed: 'TDAH (Roteiro em Blocos Visuais)',
      date: 'Há 5 horas',
      status: 'Concluído',
      score: '92%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-4 border border-indigo-400/30">
            <MdSecurity size={16} />
            <span>Ambiente Seguro e Conforme à LGPD</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            Bem-vindo à Gestão Inclusiva Pluralis
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Transforme planos de aula em experiências pedagógicas plenamente acessíveis com o apoio de inteligência artificial ética alinhada à Lei Brasileira de Inclusão (LBI nº 13.146/2015).
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/adaptar"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-indigo-500/25"
            >
              <MdAutoAwesome size={18} />
              <span>Nova Adaptação com IA</span>
            </Link>
            <Link
              href="/dashboard/capacitacao"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all backdrop-blur-xs"
            >
              <MdSchool size={18} />
              <span>Cursos e Trilhas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">{stat.title}</span>
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Activities & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Adaptations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Adaptações Pedagógicas Recentes</h3>
              <p className="text-xs text-slate-500">Últimas gerações e adequações realizadas</p>
            </div>
            <Link
              href="/dashboard/relatorios"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              <span>Ver todas</span>
              <MdArrowForward size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentAdaptations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 mt-0.5">
                    <MdMenuBook size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">{item.studentNeed}</p>
                    <span className="text-xs text-slate-400 mt-1 inline-block">{item.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <MdCheckCircle size={14} />
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Guidance & LBI Compliance Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-100 text-indigo-900">
              <MdOutlineGavel size={22} className="text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">Conformidade Legal (LBI)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              A Lei Brasileira de Inclusão assegura que todas as instituições de ensino ofereçam adaptações curriculares razoáveis sem sobretaxa às famílias (Art. 28).
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Auditoria Legal LBI</span>
                <span className="font-bold text-emerald-600">100% Conforme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Rastreabilidade LGPD</span>
                <span className="font-bold text-emerald-600">Ativa & Criptografada</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Relatórios Periódicos</span>
                <span className="font-bold text-indigo-600">Prontos p/ Exportação</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/dashboard/forum"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold text-xs transition-colors"
            >
              <MdGroup size={18} />
              <span>Participar da Comunidade de Docentes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
