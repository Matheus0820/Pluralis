'use client';

import React, { useState } from 'react';
import {
  MdAutoAwesome,
  MdCheckCircle,
  MdContentCopy,
  MdDownload,
  MdTune,
  MdLightbulbOutline,
  MdGavel,
  MdRefresh,
  MdErrorOutline,
  MdDone
} from 'react-icons/md';

export default function AdaptarMaterialPage() {
  const [conteudoOriginal, setConteudoOriginal] = useState(
    'O ciclo da água é o movimento contínuo da água na Terra. Ele envolve a evaporação da água dos oceanos e rios devido ao calor do Sol, a condensação do vapor formando nuvens na atmosfera, a precipitação como chuva ou neve, e a infiltração da água no solo alimentando os lençóis freáticos.'
  );
  const [tipoDeficiencia, setTipoDeficiencia] = useState('TEA');
  const [nivelEducacional, setNivelEducacional] = useState('Ensino Fundamental II');
  const [grauApoio, setGrauApoio] = useState('Nível 1 (Leve / Suporte Regular)');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adaptacaoResultado, setAdaptacaoResultado] = useState<any | null>(null);

  const handleAdaptar = () => {
    setIsLoading(true);
    setAdaptacaoResultado(null);

    // Simulate pedagogical AI synthesis engine
    setTimeout(() => {
      setAdaptacaoResultado({
        conteudoAdaptado: `### Roteiro Visual & Sequencial: O Ciclo da Água

**1. Evaporação (A água sobe)**
- O calor do Sol esquenta rios e mares.
- A água vira vapor invisível e sobe para o ar.

**2. Condensação (A água se junta)**
- Lá no alto, o vapor esfria.
- Gotinhas de água se juntam e formam as **nuvens**.

**3. Precipitação (A água cai)**
- As nuvens ficam muito pesadas.
- A água cai em forma de **chuva** (ou neve em locais frios).

**4. Infiltração (A água volta)**
- A chuva rega as plantas e entra na terra.
- Alimenta os rios subterrâneos e corre de volta ao mar.`,
        orientacoesDocente: [
          'Utilize cards físicos com ilustrações para cada uma das 4 etapas.',
          'Evite metáforas abstratas; utilize linguagem literal e direta.',
          'Permita tempo adicional para processamento entre uma etapa e outra.',
          'Proponha uma atividade prática sensorial com água morna e espelho para demonstrar o vapor.'
        ],
        recursosSugeridos: [
          'Cartões Visuais em Sequência (PECS)',
          'Mapa mental com setas direcionais coloridas',
          'Recurso tátil de temperatura (quente / frio)'
        ],
        justificativaPedagogica: 'Adaptação estruturada de acordo com o Desenho Universal para a Aprendizagem (DUA) e diretrizes da LBI (Lei 13.146/2015), fragmentando conceitos abstratos em marcos factuais e previsíveis para alunos com TEA.',
        confiabilidade: 98
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleCopy = () => {
    if (!adaptacaoResultado) return;
    navigator.clipboard.writeText(adaptacaoResultado.conteudoAdaptado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <MdAutoAwesome className="text-indigo-600" size={28} />
          Motor de Adaptação Curricular com IA Ética
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Insira o plano de aula, texto ou atividade e selecione a necessidade pedagógica do educando para gerar adaptações imediatas alinhadas ao DUA e à LBI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Parameters & Original Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <MdTune className="text-indigo-600" size={20} />
              Parâmetros de Adaptação
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Perfil do Educando (Necessidade Específica)
              </label>
              <select
                value={tipoDeficiencia}
                onChange={(e) => setTipoDeficiencia(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="TEA">Transtorno do Espectro Autista (TEA)</option>
                <option value="TDAH">TDAH / Dificuldade de Foco e Atenção</option>
                <option value="VISUAL">Deficiência Visual (Baixa Visão / Leitor de Tela)</option>
                <option value="AUDITIVA">Deficiência Auditiva / Tradução Libras / Visual</option>
                <option value="INTELECTUAL">Deficiência Intelectual / Linguagem Simplificada</option>
                <option value="DISLEXIA">Dislexia / Processamento Fonológico</option>
                <option value="ALTAS_HABILIDADES">Altas Habilidades / Superdotação (Aprofundamento)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Etapa de Ensino
                </label>
                <select
                  value={nivelEducacional}
                  onChange={(e) => setNivelEducacional(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Ensino Fundamental I">Fundamental I</option>
                  <option value="Ensino Fundamental II">Fundamental II</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="Ensino Superior">Ensino Superior / EJA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Nível de Suporte
                </label>
                <select
                  value={grauApoio}
                  onChange={(e) => setGrauApoio(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Nível 1 (Leve / Suporte Regular)">Suporte Nível 1</option>
                  <option value="Nível 2 (Moderado / Suporte Substancial)">Suporte Nível 2</option>
                  <option value="Nível 3 (Intensivo)">Suporte Nível 3</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Conteúdo Original do Professor
              </label>
              <textarea
                rows={7}
                value={conteudoOriginal}
                onChange={(e) => setConteudoOriginal(e.target.value)}
                placeholder="Cole aqui o texto, objetivo da aula, questões ou atividade..."
                className="w-full text-sm rounded-xl border border-slate-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed text-slate-800"
              />
            </div>

            <button
              onClick={handleAdaptar}
              disabled={isLoading || !conteudoOriginal.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processando Diretrizes DUA & BNCC...</span>
                </>
              ) : (
                <>
                  <MdAutoAwesome size={20} />
                  <span>Gerar Adaptação Acessível</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output: Results & Guidance */}
        <div className="lg:col-span-7 space-y-6">
          {adaptacaoResultado ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Output Actions Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <MdCheckCircle size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Material Adaptado com Sucesso</h3>
                    <p className="text-xs text-slate-500">Índice de conformidade DUA: {adaptacaoResultado.confiabilidade}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
                    title="Copiar texto adaptado"
                  >
                    {copied ? <MdDone size={16} className="text-emerald-600" /> : <MdContentCopy size={16} />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={handleAdaptar}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
                    title="Gerar nova versão"
                  >
                    <MdRefresh size={16} />
                    <span>Regerar</span>
                  </button>
                </div>
              </div>

              {/* Adapted Text Output */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Versão Adaptada para o Educando
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-sans leading-relaxed whitespace-pre-line text-slate-800">
                  {adaptacaoResultado.conteudoAdaptado}
                </div>
              </div>

              {/* Teacher Guidance Accordion / Box */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <MdLightbulbOutline className="text-indigo-600" size={18} />
                  Orientações Pedagógicas para Aplicação em Sala
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {adaptacaoResultado.orientacoesDocente.map((ori: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{ori}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal and Technical Justification */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <MdGavel className="text-slate-500 shrink-0 mt-0.5" size={18} />
                <p>
                  <strong>Justificativa Legal e Ética: </strong>
                  {adaptacaoResultado.justificativaPedagogica}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <MdAutoAwesome size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Aguardando Parâmetros</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Defina o perfil pedagógico e clique no botão para gerar o plano adaptado, atividades diferenciadas e orientações docentes.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <MdCheckCircle size={16} className="text-emerald-500" />
                <span>Compatível com Leis Federais 13.146/15 e 12.764/12</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
