'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 07 · TESTIMONIOS — "Wall of love": dos filas en marquee + lightbox (§5.2) ──
// Capturas reales de mensajes de docentes (nombres ocultos por privacidad).
// Pausa al pasar el ratón. Clic en una captura para ampliarla y leerla.
const SHOTS = [
  '/images/testimonios/testimonio-01.png',
  '/images/testimonios/testimonio-02.png',
  '/images/testimonios/testimonio-03.webp',
  '/images/testimonios/testimonio-04.webp',
  '/images/testimonios/testimonio-05.webp',
  '/images/testimonios/testimonio-06.png',
  '/images/testimonios/testimonio-08.webp',
  '/images/testimonios/testimonio-09.webp',
];

const ROW_1 = SHOTS.slice(0, 4);
const ROW_2 = SHOTS.slice(4);

function Row({ imgs, dir, duration, onOpen }: {
  imgs: string[]; dir: 'left' | 'right'; duration: number; onOpen: (src: string) => void;
}) {
  const loop = [...imgs, ...imgs];
  return (
    <div className="twall" data-dir={dir}>
      <div className="twall__track" style={{ animationDuration: `${duration}s` }}>
        {loop.map((src, i) => (
          <button key={`${src}-${i}`} type="button" className="twall__card" onClick={() => onOpen(src)}
            aria-label="Ampliar testimonio">
            <img src={src} alt="Testimonio de un docente" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [open, setOpen] = useState<string | null>(null);

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

      {/* Muro: dos filas en direcciones opuestas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.85rem, 2vw, 1.25rem)' }}>
        <Row imgs={ROW_1} dir="left"  duration={48} onOpen={setOpen} />
        <Row imgs={ROW_2} dir="right" duration={58} onOpen={setOpen} />
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
        @keyframes twall-left  { from { transform: translateX(0); }      to { transform: translateX(-50%); } }
        @keyframes twall-right { from { transform: translateX(-50%); }   to { transform: translateX(0); } }
        @keyframes tlb-in      { from { opacity: 0; } to { opacity: 1; } }
        .twall {
          display: flex; overflow: hidden; width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .twall__track {
          display: flex; flex-shrink: 0; gap: clamp(14px, 2vw, 24px);
          padding-right: clamp(14px, 2vw, 24px); min-width: max-content;
          animation: twall-left linear infinite; will-change: transform;
        }
        .twall[data-dir="right"] .twall__track { animation-name: twall-right; }
        .twall:hover .twall__track { animation-play-state: paused; }
        .twall__card {
          height: clamp(180px, 26vh, 228px); flex-shrink: 0; padding: 0; border: none; cursor: pointer;
          background: #fff; border-radius: 14px; overflow: hidden; display: block;
          box-shadow: 0 14px 40px rgba(0,0,0,0.4);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .twall__card:hover { transform: translateY(-5px); box-shadow: 0 22px 55px rgba(0,0,0,0.6); }
        .twall__card img { height: 100%; width: auto; display: block; }
        @media (prefers-reduced-motion: reduce) { .twall__track { animation: none !important; } }
      `}</style>
    </section>
  );
}
