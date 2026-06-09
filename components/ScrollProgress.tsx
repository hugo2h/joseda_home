'use client';

import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ScrollProgress — barra fina superior que indica el progreso de lectura.
// Sutil, con el gradiente de marca. Se oculta arriba del todo.
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const top = window.scrollY || h.scrollTop || 0;
      setProgress(scrollable > 0 ? Math.min(1, top / scrollable) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 2000,
      transformOrigin: '0 0', transform: `scaleX(${progress})`,
      background: 'var(--brand-gradient)',
      opacity: progress > 0.005 ? 1 : 0, transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
    }} />
  );
}
