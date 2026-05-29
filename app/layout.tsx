import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default : 'Joseda — Educación + IA con criterio docente',
    template : '%s · Joseda',
  },
  description:
    'Ayudo a docentes y centros a usar la inteligencia artificial con método: enseñar mejor y recuperar su tiempo. Cursos, formaciones, ponencias y el boletín EDU + IA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans" style={{ background: 'var(--bg-primary)' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
