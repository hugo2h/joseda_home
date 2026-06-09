'use client';

import { useRef, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic — el elemento hijo se desplaza suavemente hacia el cursor al pasar
// por encima (efecto "imán"), y vuelve a su sitio al salir. Respeta
// prefers-reduced-motion. Pensado para CTAs y elementos interactivos del hero.
// ─────────────────────────────────────────────────────────────────────────────
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
