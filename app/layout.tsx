import type { Metadata } from 'next';
import './globals.css';

import MarqueeBackground from '@/components/MarqueeBackground';

export const metadata: Metadata = {
  title: 'José David — Educación & IA',
  description:
    'Maestro, Ingeniero y formador de docentes. Te ayudo a integrar la IA, mejorar tu competencia digital y optimizar tus clases para que recuperes tu tiempo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">

        {/* Textura de fondo decorativa — fija, detrás de todo */}
        <div
          id="mq-text-wrapper"
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          <MarqueeBackground />
        </div>

        {children}

      </body>
    </html>
  );
}
