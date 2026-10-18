'use client';

import React from 'react';
import {
  MdSchool,
  MdPlayCircleOutline,
  MdCheckCircle,
  MdTimer,
  MdBookmarkBorder,
  MdStar,
  MdArrowForward
} from 'react-icons/md';

export default function CapacitacaoPage() {
  const trilhas = [
    {
      id: '1',
      title: 'Fundamentos da LBI e Adaptação Razoável',
      descricao: 'Aspectos legais, obrigações institucionais da Lei 13.146/2015 e critérios práticos de adaptação sem prejuízo curricular.',
      progresso: 100,
      totalAulas: 8,
      concluidas: 8,
      duracao: '4h 30min',
      status: 'Concluído',
      nivel: 'Essencial',
    },
    {
      id: '2',
      title: 'Desenho Universal para a Aprendizagem (DUA) na Prática',
      descricao: 'Estratégias de múltiplos meios de representação, engajamento e expressão para turmas heterogêneas.',
      progresso: 65,
      totalAulas: 12,
      concluidas: 8,
      duracao: '6h 00min',
      status: 'Em Andamento',
      nivel: 'Intermediário',
    },
    {
      id: '3',
      title: 'Manejo e Metodologias para Alunos com TEA',
      descricao: 'Estruturação de rotinas visuais, antecipação, redução de sobrecarga sensorial e comunicação aumentativa alternativa.',
      progresso: 30,
      totalAulas: 10,
      concluidas: 3,
      duracao: '5h 15min',
      status: 'Em Andamento',
      nivel: 'Prático',
    },
    {
      id: '4',
      title: 'Acessibilidade Digital: Leitores de Tela e Braille',
      descricao: 'Como estruturar documentos do Word, PDFs e atividades no Google Classroom para estudantes cegos e com baixa visão.',
      progresso: 0,
      totalAulas: 6,
      concluidas: 0,
      duracao: '3h 45min',
      status: 'Não Iniciado',
      nivel: 'Técnico',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MdSchool className="text-indigo-600" size={28} />
            Programa de Capacitação Docente Continuada
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Trilhas pedagógicas orientadas para certificar os educadores em práticas inclusivas e cumprimento das metas de acessibilidade escolar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-xs text-xs">
            <span className="text-slate-500">Horas Certificadas: </span>
            <span className="font-bold text-indigo-600">18h 30min</span>
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trilhas.map((trilha) => (
          <div
            key={trilha.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {trilha.nivel}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MdTimer size={16} />
                  <span>{trilha.duracao}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                {trilha.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {trilha.descricao}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600">
                    {trilha.concluidas} de {trilha.totalAulas} aulas concluídas
                  </span>
                  <span className="text-indigo-600">{trilha.progresso}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${trilha.progresso}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {trilha.progresso === 100 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <MdCheckCircle size={18} />
                    <span>Certificado Emitido</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Próxima aula disponível</span>
                )}

                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors">
                  <MdPlayCircleOutline size={16} />
                  <span>{trilha.progresso === 0 ? 'Iniciar Trilha' : 'Continuar Aula'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
