'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ModulosScrollSpy — sticky layout: ruta de puntos a la izquierda +
// tarjetas apiladas a la derecha. El índice activo avanza con el scroll.
// ─────────────────────────────────────────────────────────────────────────────
export type Modulo = { icon: ReactNode; title: string; body: string };

export default function ModulosScrollSpy({ modulos }: { modulos: Modulo[] }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableH = container.clientHeight - window.innerHeight;
      const scrolled = -rect.top;
      if (scrollableH <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableH));
      setActive(Math.round(progress * (modulos.length - 1)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modulos.length]);

  const scrollToIndex = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollableH = container.clientHeight - window.innerHeight;
    const target = container.getBoundingClientRect().top + window.scrollY + (i / (modulos.length - 1)) * scrollableH;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} style={{ height: `${modulos.length * 85}svh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: '4.5rem', height: 'calc(100svh - 4.5rem)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 'clamp(2rem,5vw,4rem)', width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem,5vw,4rem)', alignItems: 'center' }}>

          {/* Ruta de puntos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flexShrink: 0, alignItems: 'center' }}>
            {/* Línea superior */}
            <div style={{ width: 2, flex: 1, background: 'var(--border-subtle)', minHeight: 24, borderRadius: 1 }} />
            {modulos.map((m, i) => (
              <button
                key={i} type="button" onClick={() => scrollToIndex(i)} aria-label={`Ir a ${m.title}`}
                style={{ width: i === active ? 12 : 8, height: i === active ? 12 : 8, borderRadius: '50%',
                  background: i === active ? 'var(--eyebrow-color)' : 'var(--border-subtle)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0, flexShrink: 0,
                  boxShadow: i === active ? '0 0 10px rgba(181,159,229,0.5)' : 'none' }}
              />
            ))}
            <div style={{ width: 2, flex: 1, background: 'var(--border-subtle)', minHeight: 24, borderRadius: 1 }} />
          </div>

          {/* Tarjeta activa */}
          <div key={active} style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 16, padding: 'clamp(1.5rem,4vw,2.5rem)',
            animation: 'modulo-in 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>
            <style>{`@keyframes modulo-in { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ display: 'inline-flex', background: 'rgba(94,45,214,0.18)', padding: '0.7rem', borderRadius: 10, color: 'var(--eyebrow-color)' }} aria-hidden="true">
                {modulos[active].icon}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--eyebrow-color)' }}>
                Módulo {String(active + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.3rem,3vw,1.9rem)', fontWeight: 700,
              letterSpacing: '-0.025em', color: '#fff', marginBottom: '0.85rem' }}>
              {modulos[active].title}
            </h3>
            <p style={{ fontSize: 'clamp(0.95rem,1.6vw,1.05rem)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '56ch' }}>
              {modulos[active].body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
