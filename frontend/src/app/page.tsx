import Image from 'next/image';
import Link from 'next/link';
import {
  MdAutoAwesome,
  MdSchool,
  MdShield,
  MdArrowForward,
  MdCheckCircle,
  MdGroups
} from 'react-icons/md';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Pluralis — página inicial">
            <Image src="/pluralis-logo.png" alt="Pluralis — Acessibilidade Pedagógica" width={150} height={52} priority className="h-11 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#solucao" className="hover:text-white transition-colors">A Solução</a>
            <a href="#recursos" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#lbi" className="hover:text-white transition-colors">Conformidade LBI</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20"
            >
              <span>Acessar Plataforma</span>
              <MdArrowForward size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-8">
          <MdShield size={16} />
          <span>B2B SaaS em Conformidade com a Lei Brasileira de Inclusão nº 13.146/2015</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.15] mb-6">
          A plataforma definitiva de <span className="bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">acessibilidade curricular</span> para redes de ensino
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Capacite seus professores, adapte materiais pedagógicos em segundos com IA ética e garanta 100% de conformidade jurídica para sua instituição.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <MdAutoAwesome size={18} />
            <span>Experimentar Adaptação IA</span>
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            <MdSchool size={18} />
            <span>Trilhas de Capacitação</span>
          </Link>
        </div>

        {/* Feature Cards Showcase */}
        <div id="recursos" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
              <MdAutoAwesome size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Adaptação Curricular Ágil</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforme textos, listas de exercícios e atividades para TEA, baixa visão, TDAH e dislexia com base no Desenho Universal para a Aprendizagem (DUA).
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center mb-4">
              <MdSchool size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Capacitação Contínua Docente</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trilhas práticas de formação rápida em serviço para empoderar os educadores da sala regular e fortalecer a parceria com o AEE.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
              <MdShield size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Conformidade e Rastreabilidade</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Relatórios probatórios automáticos e auditáveis prontos para órgãos de regulação, Ministério Público e famílias.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Pluralis Tecnologias Educacionais Inclusivas. Todos os direitos reservados.</p>
        <p className="mt-1">Desenvolvido em estrita conformidade com a LGPD e a Lei Brasileira de Inclusão.</p>
      </footer>
    </div>
  );
}
