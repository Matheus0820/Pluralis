'use client';

import React from 'react';
import {
  MdAnalytics,
  MdDownload,
  MdShield,
  MdCheckCircle,
  MdPrint,
  MdDateRange,
  MdHistory,
  MdSchool,
  MdPictureAsPdf
} from 'react-icons/md';

export default function RelatoriosPage() {
  const registrosAuditoria = [
    {
      id: 'AUD-8821',
      acao: 'Adaptação Curricular Gerada (TEA)',
      docente: 'Prof. Carlos Alberto (Matemática)',
      escola: 'Colégio Alpha',
      data: '17/10/2026 14:32:10',
      status: 'Conforme LBI Art. 28',
      hash: '9f8a...3b21',
    },
    {
      id: 'AUD-8820',
      acao: 'Trilha DUA Concluída',
      docente: 'Profa. Mariana Costa (História)',
      escola: 'Colégio Alpha',
      data: '17/10/2026 11:15:44',
      status: 'Certificado Válido',
      hash: '7c4e...81da',
    },
    {
      id: 'AUD-8819',
      acao: 'Adaptação Curricular Gerada (Deficiência Visual)',
      docente: 'Profa. Helena Prado (Português)',
      escola: 'Colégio Alpha',
      data: '16/10/2026 16:48:02',
      status: 'Conforme LBI Art. 28',
      hash: '3a1f...99bc',
    },
    {
      id: 'AUD-8818',
      acao: 'Revisão Técnica Pedagógica por AEE',
      docente: 'Coord. Lúcia Santos (AEE)',
      escola: 'Colégio Alpha',
      data: '16/10/2026 10:22:15',
      status: 'Parecer Homologado',
      hash: '5d2c...10ea',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MdAnalytics className="text-indigo-600" size={28} />
            Relatórios Executivos & Auditoria LBI / LGPD
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Geração de relatórios probatórios de adaptação razoável para órgãos reguladores, MEC, Promotoria da Educação e conselhos tutelares.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors">
            <MdPrint size={16} />
            <span>Imprimir</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm">
            <MdPictureAsPdf size={16} />
            <span>Exportar Relatório em PDF</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards for Compliance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
            <MdShield size={22} />
            <span className="text-xs font-bold uppercase tracking-wider">Segurança Jurídica</span>
          </div>
          <div className="text-2xl font-black text-slate-900">100% Blindagem</div>
          <p className="text-xs text-slate-500 mt-1">
            Todos os materiais possuem registros criptografados de conformidade com a Lei 13.146/15.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
            <MdSchool size={22} />
            <span className="text-xs font-bold uppercase tracking-wider">Adesão do Corpo Docente</span>
          </div>
          <div className="text-2xl font-black text-slate-900">87.5% Ativos</div>
          <p className="text-xs text-slate-500 mt-1">
            Docentes capacitados com plano de aula adaptado ativo no bimestre letivo.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2.5 text-teal-600 mb-2">
            <MdCheckCircle size={22} />
            <span className="text-xs font-bold uppercase tracking-wider">Total de Adaptações Homologadas</span>
          </div>
          <div className="text-2xl font-black text-slate-900">148 Planos</div>
          <p className="text-xs text-slate-500 mt-1">
            Registros prontos para apresentação perante auditorias de fiscalização.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Trilha de Auditoria e Rastreabilidade</h3>
            <p className="text-xs text-slate-500">Histórico de ações pedagógicas imutáveis com carimbo de tempo</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            <MdDateRange size={16} />
            <span>Ano Letivo 2026</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">ID / Hash</th>
                <th className="py-3.5 px-6">Ação Realizada</th>
                <th className="py-3.5 px-6">Docente Responsável</th>
                <th className="py-3.5 px-6">Carimbo de Data/Hora</th>
                <th className="py-3.5 px-6">Status LBI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrosAuditoria.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-mono text-slate-600">
                    <span className="font-semibold text-slate-800">{item.id}</span>
                    <span className="block text-[10px] text-slate-400">{item.hash}</span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-800">{item.acao}</td>
                  <td className="py-4 px-6 text-slate-600">{item.docente}</td>
                  <td className="py-4 px-6 text-slate-500">{item.data}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <MdCheckCircle size={12} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
