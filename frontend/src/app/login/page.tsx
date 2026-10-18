'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { MdArrowForward, MdErrorOutline } from 'react-icons/md';
import { api } from '@/services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const resultado = await api.login(email, senha);
      localStorage.setItem('pluralis_token', resultado.accessToken);
      localStorage.setItem('pluralis_usuario', JSON.stringify(resultado.usuario));
      const destino = new URLSearchParams(window.location.search).get('callbackUrl');
      const urlDestino = destino ? new URL(destino, window.location.origin) : null;
      window.location.assign(
        urlDestino?.origin === window.location.origin ? urlDestino.href : '/dashboard',
      );
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível entrar. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50 px-4 py-8 flex flex-col items-center justify-center focus:outline-none">
      <section className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" aria-labelledby="login-title">
        <Link href="/" className="block w-fit mx-auto mb-8" aria-label="Voltar à página inicial">
          <Image src="/pluralis-logo.png" alt="Pluralis — Acessibilidade Pedagógica" width={170} height={60} priority className="h-12 w-auto" />
        </Link>
        <h1 id="login-title" className="text-2xl font-bold text-slate-900 text-center">Acesse sua conta</h1>
        <p className="text-sm text-slate-600 text-center mt-2 mb-7">Entre para continuar seu trabalho de inclusão pedagógica.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">E-mail</label>
            <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600" />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-slate-800 mb-1.5">Senha</label>
            <input id="senha" type="password" autoComplete="current-password" required value={senha} onChange={(event) => setSenha(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus-visible:ring-4 focus-visible:ring-orange-600" />
          </div>
          {erro && <p role="alert" className="flex items-start gap-2 text-sm text-red-700"><MdErrorOutline size={20} aria-hidden="true" />{erro}</p>}
          <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-orange-600">
            {loading ? 'Entrando…' : 'Entrar'} {!loading && <MdArrowForward aria-hidden="true" />}
          </button>
        </form>
        <p className="text-sm text-slate-600 text-center mt-6">Ainda não tem conta? <Link href="/registro" className="font-semibold text-blue-900 underline">Cadastre-se</Link></p>
      </section>
    </main>
  );
}
