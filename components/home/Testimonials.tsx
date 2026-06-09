'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 07 · TESTIMONIOS — carrusel coverflow de capturas reales (§5.2) ──
// Capturas reales de mensajes de docentes (nombres ocultos por privacidad),
// recogidas de jose-david.com. Tarjeta central destacada + laterales asomando.
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

const N = SHOTS.length;
const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: number) => setI((p) => (p + dir + N) % N), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % N), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Distancia circular de cada tarjeta a la activa (-N/2 … N/2)
  const dist = (idx: number) => {
    let d = idx - i;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  return (
    <section className="section" style={{ background: 'var(--bg-deep)', overflow: 'hidden' }}>
      <div className="container">
        <SectionEyebrow number="07" text="Testimonios" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '22ch', marginBottom: '0.75rem' }}>
          Esto cuentan quienes ya han pasado por aquí.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
          Mensajes reales de docentes. Nombres ocultos por privacidad.
        </p>
      </div>

      {/* Carrusel coverflow (full-bleed para que asomen los laterales) */}
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
        <div style={{ position: 'relative', height: 'clamp(320px, 52vh, 440px)',
          ['--gap' as string]: 'clamp(155px, 34vw, 300px)' }}>
          {SHOTS.map((src, idx) => {
            const d = dist(idx);
            const ad = Math.abs(d);
            const visible = ad <= 1;
            const center = d === 0;
            return (
              <button
                key={src} type="button" aria-hidden={!center} tabIndex={center ? 0 : -1}
                aria-label={center ? `Testimonio ${idx + 1}` : `Ver testimonio ${idx + 1}`}
                onClick={() => { if (!center && visible) setI(idx); }}
                style={{
                  position: 'absolute', top: 0, left: '50%', margin: 0, padding: 0, border: 'none',
                  width: 'clamp(280px, 80vw, 500px)', height: '100%',
                  background: '#fff', borderRadius: 16, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: center ? 'default' : (visible ? 'pointer' : 'default'),
                  transform: `translateX(calc(-50% + ${d} * var(--gap))) scale(${center ? 1 : 0.82})`,
                  opacity: center ? 1 : (ad === 1 ? 0.45 : 0),
                  filter: center ? 'none' : 'blur(1.5px)',
                  boxShadow: center ? '0 30px 80px rgba(0,0,0,0.55)' : '0 16px 40px rgba(0,0,0,0.4)',
                  zIndex: 30 - ad,
                  pointerEvents: visible ? 'auto' : 'none',
                  transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, filter 0.6s ease, box-shadow 0.6s ease',
                }}
              >
                <img src={src} alt={`Testimonio de un docente (${idx + 1})`} loading={idx < 2 ? 'eager' : 'lazy'}
                  style={{ maxWidth: '92%', maxHeight: '88%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
              </button>
            );
          })}

          {/* Flechas */}
          <button type="button" aria-label="Testimonio anterior" onClick={() => go(-1)} className="tcar-arrow" style={{ left: 'clamp(0.5rem, 3vw, 2.5rem)' }}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" aria-label="Testimonio siguiente" onClick={() => go(1)} className="tcar-arrow" style={{ right: 'clamp(0.5rem, 3vw, 2.5rem)' }}>
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Puntos */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', marginTop: 'clamp(1.75rem, 4vh, 2.75rem)' }}>
          {SHOTS.map((_, idx) => (
            <button key={idx} type="button" aria-label={`Ir al testimonio ${idx + 1}`} aria-current={idx === i}
              onClick={() => setI(idx)}
              style={{ width: idx === i ? 26 : 9, height: 9, borderRadius: 9999, border: 'none', cursor: 'pointer', padding: 0,
                background: idx === i ? 'var(--eyebrow-color)' : 'rgba(255,255,255,0.25)', transition: 'width 0.3s, background 0.3s' }} />
          ))}
        </div>
      </div>

      <style>{`
        .tcar-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 40;
          width: 46px; height: 46px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: rgba(20,20,20,0.6); color: #fff;
          border: 1px solid var(--border-subtle); backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s;
        }
        .tcar-arrow:hover { background: rgba(20,20,20,0.92); transform: translateY(-50%) scale(1.08); }
        @media (max-width: 520px) { .tcar-arrow { width: 38px; height: 38px; } }
      `}</style>
    </section>
  );
}
