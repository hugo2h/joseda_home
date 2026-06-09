'use client';

import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// template.tsx — se re-monta en CADA navegación, así que la animación de entrada
// se reproduce al cambiar de sección (transición estilo Dennis Snellenberg, en
// clave Joseda: cortina negra con filo de gradiente que sube revelando la página).
// Respeta prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="route-curtain" aria-hidden="true" />
      <div className="route-content">{children}</div>

      <style>{`
        @keyframes curtain-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes content-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .route-curtain {
          position: fixed; inset: 0; z-index: 1500; pointer-events: none;
          background: #0A0A0A;
          border-bottom: 2px solid transparent;
          border-image: var(--brand-gradient) 1;
          transform: translateY(0);
          animation: curtain-up 0.7s cubic-bezier(0.76, 0, 0.24, 1) 0.05s forwards;
        }
        .route-content { animation: content-in 0.5s ease 0.35s both; }
        @media (prefers-reduced-motion: reduce) {
          .route-curtain { display: none; }
          .route-content { animation: none; }
        }
      `}</style>
    </>
  );
}
