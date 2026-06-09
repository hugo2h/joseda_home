'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 07 · TESTIMONIOS — fila única en movimiento continuo + lightbox (§5.2) ──
// Capturas reales de mensajes de docentes (nombres ocultos por privacidad).
// Marquee infinito que NO se detiene al pasar el ratón. Clic para ampliar y leer.
// Dimensiones reales de cada captura → reservan el ancho/alto correctos al
// instante (sin esto, en móvil las tarjetas colapsaban a 0 hasta cargar).
const SHOTS = [
  { src: '/images/testimonios/testimonio-01.png',  w: 1024, h: 340 },
  { src: '/images/testimonios/testimonio-02.png',  w: 1024, h: 627 },
  { src: '/images/testimonios/testimonio-03.webp', w: 1024, h: 557 },
  { src: '/images/testimonios/testimonio-04.webp', w: 1024, h: 545 },
  { src: '/images/testimonios/testimonio-05.webp', w: 1024, h: 341 },
  { src: '/images/testimonios/testimonio-06.png',  w: 1024, h: 660 },
  { src: '/images/testimonios/testimonio-08.webp', w: 1024, h: 501 },
  { src: '/images/testimonios/testimonio-09.webp', w: 1024, h: 629 },
];

export default function Testimonials() {
  const [open, setOpen] = useState<string | null>(null);
  const loop = [...SHOTS, ...SHOTS];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <section className="section" style={{ background: 'var(--bg-deep)', overflow: 'hidden' }}>
      <div className="container">
        <SectionEyebrow number="07" text="Testimonios" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '22ch', marginBottom: '0.75rem' }}>
          Esto cuentan quienes ya han pasado por aquí.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
          Mensajes reales de docentes. Nombres ocultos por privacidad · <span style={{ color: 'var(--eyebrow-color)' }}>toca una captura para ampliarla</span>.
        </p>
      </div>

      {/* Fila única en movimiento continuo */}
      <div className="twall">
        <div className="twall__track">
          {loop.map((shot, i) => (
            <button key={`${shot.src}-${i}`} type="button" className="twall__card" onClick={() => setOpen(shot.src)}
              aria-label="Ampliar testimonio">
              <img src={shot.src} alt="Testimonio de un docente" width={shot.w} height={shot.h}
                loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Testimonio ampliado"
          onClick={() => setOpen(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(5,5,5,0.88)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(1rem, 5vw, 3rem)', animation: 'tlb-in 0.25s ease' }}>
          <img src={open} alt="Testimonio de un docente (ampliado)"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 'min(900px, 96vw)', maxHeight: '90vh', width: 'auto', height: 'auto',
              objectFit: 'contain', borderRadius: 14, boxShadow: '0 40px 100px rgba(0,0,0,0.7)', background: '#fff' }} />
          <button type="button" aria-label="Cerrar" onClick={() => setOpen(null)}
            style={{ position: 'absolute', top: 'clamp(1rem,3vw,2rem)', right: 'clamp(1rem,3vw,2rem)',
              width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.3rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
        </div>
      )}

      <style>{`
        @keyframes twall-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes tlb-in     { from { opacity: 0; } to { opacity: 1; } }
        .twall {
          display: flex; overflow: hidden; width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        }
        .twall__track {
          display: flex; flex-shrink: 0; gap: clamp(16px, 2.2vw, 28px);
          padding-right: clamp(16px, 2.2vw, 28px); min-width: max-content;
          animation: twall-left 55s linear infinite; will-change: transform;
        }
        .twall__card {
          height: clamp(240px, 40vh, 330px); flex-shrink: 0; padding: 0; border: none; cursor: pointer;
          background: #fff; border-radius: 16px; overflow: hidden; display: block;
          box-shadow: 0 18px 50px rgba(0,0,0,0.45);
          transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .twall__card:hover { transform: scale(1.025); box-shadow: 0 26px 65px rgba(0,0,0,0.6); }
        .twall__card img { height: 100%; width: auto; display: block; }
        @media (prefers-reduced-motion: reduce) { .twall__track { animation: none !important; } }
      `}</style>
    </section>
  );
}
