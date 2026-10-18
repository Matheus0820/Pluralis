import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pluralis - Plataforma de Acessibilidade Pedagógica',
  description: 'B2B SaaS de adaptação curricular com IA generativa ética, capacitação docente e conformidade legal LBI.',
  icons: {
    icon: '/pluralis-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
