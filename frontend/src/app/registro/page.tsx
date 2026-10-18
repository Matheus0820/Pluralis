'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { api } from '@/services/api';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';

export default function RegistroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [iesId, setIesId] = useState('');
  const [outraIes, setOutraIes] = useState('');
  const [instituicoes, setInstituicoes] = useState<{ id: string; nome: string }[]>([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.listarInstituicoes()
      .then((lista) => {
        if (lista && lista.length > 0) {
          setInstituicoes(lista);
          setIesId(lista[0].id);
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const selectedIes = iesId === 'outra' ? outraIes.trim() : iesId;
      const resultado = await api.registrar({
        nome,
        email,
        senha,
        iesId: selectedIes || undefined,
      });
      localStorage.setItem('pluralis_token', resultado.accessToken);
      localStorage.setItem('pluralis_usuario', JSON.stringify(resultado.usuario));
      window.location.assign('/dashboard');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível criar a conta.');
      setLoading(false);
    }
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50 px-4 py-8 flex flex-col items-center justify-center focus:outline-none">
      <div className="w-full max-w-md mb-4 flex justify-end">
        <AccessibilityToolbar compact />
      </div>
      <section className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" aria-labelledby="registro-title">
        <Link href="/" className="block w-fit mx-auto mb-8" aria-label="Voltar à página inicial">
          <Image src="/pluralis-logo.png" alt="Pluralis — Acessibilidade Pedagógica" width={170} height={60} priority className="h-12 w-auto" />
        </Link>
        <h1 id="registro-title" className="text-2xl font-bold text-slate-900 text-center">Criar conta</h1>
        <p className="text-sm text-slate-600 text-center mt-2 mb-7">Cadastre-se com os dados da sua instituição.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="nome" className="block text-sm font-semibold text-slate-800 mb-1.5">Nome completo</label><input id="nome" autoComplete="name" required value={nome} onChange={(event) => setNome(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600" /></div>
          <div><label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">E-mail</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600" /></div>
          <div>
            <label htmlFor="ies" className="block text-sm font-semibold text-slate-800 mb-1.5">Instituição de Ensino Superior (IES)</label>
            {instituicoes.length > 0 ? (
              <select
                id="ies"
                value={iesId}
                onChange={(event) => setIesId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600 bg-white"
              >
                {instituicoes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.nome}
                  </option>
                ))}
                <option value="outra">Outra instituição...</option>
              </select>
            ) : (
              <input
                id="ies"
                placeholder="Ex: Universidade Federal..."
                value={iesId}
                onChange={(event) => setIesId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600"
              />
            )}
          </div>
          {iesId === 'outra' && (
            <div>
              <label htmlFor="outra-ies" className="block text-sm font-semibold text-slate-800 mb-1.5">Nome da instituição</label>
              <input
                id="outra-ies"
                required
                placeholder="Nome da faculdade ou universidade"
                value={outraIes}
                onChange={(event) => setOutraIes(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600"
              />
            </div>
          )}
          <div><label htmlFor="senha" className="block text-sm font-semibold text-slate-800 mb-1.5">Senha</label><input id="senha" type="password" autoComplete="new-password" minLength={6} required value={senha} onChange={(event) => setSenha(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600" /><p className="text-xs text-slate-500 mt-1">Mínimo de 6 caracteres.</p></div>
          {erro && <p role="alert" className="flex items-start gap-2 text-sm text-red-700"><MdErrorOutline size={20} aria-hidden="true" />{erro}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-orange-600">{loading ? 'Criando conta…' : 'Criar conta'}</button>
        </form>
        <p className="text-sm text-slate-600 text-center mt-6">Já possui conta? <Link href="/login" className="font-semibold text-blue-900 underline">Entrar</Link></p>
      </section>
    </main>
  );
}
