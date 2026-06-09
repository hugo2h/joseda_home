import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CookieBanner from '@/components/CookieBanner';

const SITE_URL = 'https://joseda.education';
const DESCRIPTION =
  'Ayudo a docentes y centros a usar la inteligencia artificial con método: enseñar mejor y recuperar su tiempo. Cursos, formaciones, ponencias y el boletín EDU + IA.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default : 'Joseda — Educación + IA con criterio docente',
    template : '%s · Joseda',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type    : 'website',
    locale  : 'es_ES',
    siteName: 'Joseda',
    title   : 'Joseda — Educación + IA con criterio docente',
    description: DESCRIPTION,
    url     : SITE_URL,
    images  : [{ url: '/images/logo-joseda-white.png', width: 1852, height: 432, alt: 'Joseda · Educación + IA' }],
  },
  twitter: {
    card       : 'summary_large_image',
    title      : 'Joseda — Educación + IA con criterio docente',
    description: DESCRIPTION,
    images     : ['/images/logo-joseda-white.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans" style={{ background: 'var(--bg-primary)' }}>
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
