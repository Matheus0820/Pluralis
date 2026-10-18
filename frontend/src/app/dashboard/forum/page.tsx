'use client';

import React, { useState } from 'react';
import {
  MdForum,
  MdAddComment,
  MdThumbUp,
  MdModeComment,
  MdSearch,
  MdTag,
  MdCheckCircleOutline,
  MdPerson
} from 'react-icons/md';

export default function ForumPage() {
  const [busca, setBusca] = useState('');

  const topicos = [
    {
      id: '1',
      titulo: 'Estratégia para avaliação de história para aluno com dislexia severa',
      autor: 'Profa. Mariana Costa (História)',
      categoria: 'Avaliação & Provas',
      respostas: 7,
      curtidas: 15,
      resolvido: true,
      tempo: 'Há 1 dia',
      conteudo: 'Gostaria de trocar ideias sobre como aplicar provas de interpretação histórica sem focar exclusivamente na ortografia e decodificação rápida do texto...',
    },
    {
      id: '2',
      titulo: 'Recursos sensoriais de baixo custo para o laboratório de ciências',
      autor: 'Prof. Roberto Dias (Ciências)',
      categoria: 'Práticas Inclusivas',
      respostas: 12,
      curtidas: 24,
      resolvido: false,
      tempo: 'Há 2 dias',
      conteudo: 'Estamos montando um kit tátil para modelos celulares usando argila e texturas diferenciadas para alunos cegos. Alguém já testou materiais similares?',
    },
    {
      id: '3',
      titulo: 'Como alinhar o PEI (Plano de Ensino Individualizado) com os professores especialistas de AEE',
      autor: 'Coord. Lúcia Santos',
      categoria: 'Gestão Escolar & AEE',
      respostas: 19,
      curtidas: 38,
      resolvido: true,
      tempo: 'Há 4 dias',
      conteudo: 'Criamos um fluxo quinzenal de alinhamento com a equipe de Atendimento Educacional Especializado. Compartilho aqui a planilha modelo que tem funcionado...',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MdForum className="text-indigo-600" size={28} />
            Fórum Interdisciplinar de Práticas Inclusivas
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Espaço colaborativo para troca de experiências, mediação de casos pedagógicos e apoio entre professores regulares e especialistas em AEE.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer">
          <MdAddComment size={18} />
          <span>Novo Tópico de Discussão</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch size={20} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar dúvidas pedagógicas, deficiências, matérias ou orientações..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
            Todas as Categorias
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
            Mais Populares
          </button>
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {topicos.map((topico) => (
          <div
            key={topico.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <MdTag size={12} />
                    {topico.categoria}
                  </span>
                  {topico.resolvido && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <MdCheckCircleOutline size={14} />
                      Solucionado
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{topico.tempo}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer">
                  {topico.titulo}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {topico.conteudo}
                </p>

                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <MdPerson size={14} />
                  </div>
                  <span>Postado por: <strong className="text-slate-700">{topico.autor}</strong></span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                    <MdThumbUp size={16} />
                    <span>{topico.curtidas}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                    <MdModeComment size={16} />
                    <span>{topico.respostas}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
