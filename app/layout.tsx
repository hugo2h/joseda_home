import type { Metadata } from 'next';
import './globals.css';

import { MinimizeProvider }  from '@/context/MinimizeContext';
import MinimizedShell        from '@/components/MinimizedShell';
import SocialModal           from '@/components/SocialModal';
import MarqueeBackground     from '@/components/MarqueeBackground';

export const metadata: Metadata = {
  title: 'José David — Educación & IA',
  description:
    'Maestro, Ingeniero y formador de docentes. Te ayudo a integrar la IA, mejorar tu competencia digital y optimizar tus clases para que recuperes tu tiempo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <MinimizeProvider>

          <div aria-hidden="true" className="bg-lights" style={{ zIndex: 0 }} />

          <MinimizedShell>
            <div
              id="mq-text-wrapper"
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
            >
              <MarqueeBackground />
            </div>
            {children}
          </MinimizedShell>

          <SocialModal />

        </MinimizeProvider>
      </body>
    </html>
  );
}
