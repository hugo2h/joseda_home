'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 07 · TESTIMONIOS — carrusel de capturas reales (§5.2) ──
// Capturas reales de mensajes de docentes (nombres ocultos por privacidad),
// recogidas de jose-david.com. Para añadir más: suelta el archivo en
// /public/images/testimonios y añádelo al array.
const SHOTS = [
  '/images/testimonios/testimonio-01.png',
  '/images/testimonios/testimonio-02.png',
  '/images/testimonios/testimonio-03.webp',
  '/images/testimonios/testimonio-04.webp',
  '/images/testimonios/testimonio-05.webp',
  '/images/testimonios/testimonio-06.png',
  '/images/testimonios/testimonio-07.png',
  '/images/testimonios/testimonio-08.webp',
  '/images/testimonios/testimonio-09.webp',
];

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setI((prev) => (prev + dir + SHOTS.length) % SHOTS.length);
  }, []);

  // Autoplay (pausa al hover/focus)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % SHOTS.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section className="section" style={{ background: 'var(--bg-deep)' }}>
      <div className="container">
        <SectionEyebrow number="07" text="Testimonios" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '22ch', marginBottom: '0.75rem' }}>
          Esto cuentan quienes ya han pasado por aquí.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>
          Mensajes reales de docentes. Nombres ocultos por privacidad.
        </p>

        {/* Carrusel */}
        <div
          role="group" aria-roledescription="carrusel" aria-label="Testimonios de docentes"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); }}
          style={{ position: 'relative' }}
        >
          {/* Escenario */}
          <div style={{ position: 'relative', height: 'clamp(320px, 52vh, 470px)' }}>
            {SHOTS.map((src, idx) => (
              <div key={src} aria-hidden={idx !== i}
                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: idx === i ? 1 : 0, transform: idx === i ? 'scale(1)' : 'scale(0.97)',
                  transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                  pointerEvents: idx === i ? 'auto' : 'none' }}>
                <img src={src} alt={`Testimonio ${idx + 1} de 9`} loading={idx === 0 ? 'eager' : 'lazy'}
                  style={{ maxWidth: 'min(640px, 92%)', maxHeight: '100%', width: 'auto', height: 'auto',
                    objectFit: 'contain', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.5)', background: '#fff', display: 'block' }} />
              </div>
            ))}

            {/* Flechas */}
            <button type="button" aria-label="Testimonio anterior" onClick={() => go(-1)} className="tcar-arrow" style={{ left: 0 }}>
              <ChevronLeft size={22} />
            </button>
            <button type="button" aria-label="Testimonio siguiente" onClick={() => go(1)} className="tcar-arrow" style={{ right: 0 }}>
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Puntos */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', marginTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
            {SHOTS.map((_, idx) => (
              <button key={idx} type="button" aria-label={`Ir al testimonio ${idx + 1}`} aria-current={idx === i}
                onClick={() => setI(idx)}
                style={{ width: idx === i ? 26 : 9, height: 9, borderRadius: 9999, border: 'none', cursor: 'pointer', padding: 0,
                  background: idx === i ? 'var(--eyebrow-color)' : 'rgba(255,255,255,0.25)', transition: 'width 0.3s, background 0.3s' }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tcar-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
          width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: rgba(10,10,10,0.55); color: #fff;
          border: 1px solid var(--border-subtle); backdrop-filter: blur(6px);
          transition: background 0.2s, transform 0.2s;
        }
        .tcar-arrow:hover { background: rgba(10,10,10,0.85); }
        @media (max-width: 520px) { .tcar-arrow { width: 38px; height: 38px; } }
      `}</style>
    </section>
  );
}
