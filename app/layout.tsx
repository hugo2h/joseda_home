import type { Metadata } from 'next';
import './globals.css';

import MarqueeBackground    from '@/components/MarqueeBackground';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ConfettiBackground   from '@/components/ui/confetti-background';
import CustomCursor         from '@/components/ui/custom-cursor';

export const metadata: Metadata = {
  title      : 'José David — Educación & IA',
  description: 'Maestro, Ingeniero y formador de docentes. Te ayudo a integrar la IA, mejorar tu competencia digital y optimizar tus clases para que recuperes tu tiempo.',
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

        {/* Campo de partículas 3D sutil — fijo, detrás del scroll-viewport */}
        <ConfettiBackground />

        {/* Vignette "vacío espacial" — profundidad global, fija sobre todo */}
        <div className="space-void" aria-hidden="true" />

        {/* Cursor personalizado (cambia a "Drag" sobre las fotos) */}
        <CustomCursor />

        {/* Motor de scroll global — Lenis sobre window */}
        <SmoothScrollProvider>
          {/* Contenedores obligatorios del motor de scroll */}
          <div className="scroll-viewport">
            <div className="content-flow">
              {children}
            </div>
          </div>
        </SmoothScrollProvider>

      </body>
    </html>
  );
}
