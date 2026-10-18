'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('pluralis_token')) {
      setAutenticado(true);
    } else {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  if (!autenticado) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <Header
          title="Painel de Gestão Pedagógica Inclusiva"
          subtitle="Acompanhamento de adaptações, diretrizes LBI e formação continuada"
        />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
