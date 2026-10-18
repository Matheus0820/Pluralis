import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';
import { SkipLink } from '@/components/accessibility/SkipLink';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pluralis - Inteligência Pedagógica Inclusiva & Gestão DUA',
  description:
    'Plataforma para adaptação curricular multissensorial, dossiê probatório em conformidade com o Art. 28 da LBI e formação continuada para Ensino Superior.',
  keywords: [
    'Educação Inclusiva',
    'DUA',
    'Desenho Universal para Aprendizagem',
    'LBI',
    'Lei Brasileira de Inclusão',
    'Acessibilidade Pedagógica',
    'Ensino Superior',
  ],
  authors: [{ name: 'Pluralis Inclusão & Tecnologia' }],
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <AccessibilityProvider>
          {/* Accessible Skip Link for Keyboard Navigation */}
          <SkipLink />

          {/* Global Accessibility Toolbar on all pages */}
          <AccessibilityToolbar />

          {/* App Body */}
          <div className="flex flex-col min-h-[calc(100vh-36px)]">
            {children}
          </div>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
