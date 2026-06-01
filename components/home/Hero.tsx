'use client';

import { useRef } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';

// ── 01 · HERO — vídeo cinematográfico de fondo (loop seamless) + CTA (§5.2) ──
// Réplica del manejo de vídeo del proyecto original: loop manual con fundido a
// negro 0.6 s antes del final para que el corte del bucle no se note.
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seamRef  = useRef<HTMLDivElement>(null);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    const s = seamRef.current;
    if (!v || !s || !v.duration) return;
    s.style.opacity = v.duration - v.currentTime < 0.6 ? '1' : '0';
  };

  const handleEnded = () => {
    const v = videoRef.current;
    const s = seamRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play();
    if (s) requestAnimationFrame(() => { s.style.opacity = '0'; });
  };

  return (
    <section
      style={{
        position      : 'relative',
        minHeight     : '95svh',
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        overflow      : 'hidden',
        paddingBlock  : 'clamp(3rem, 8vh, 6rem)',
      }}
    >
      {/* Vídeo de fondo — mismo clip del proyecto original */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay muted playsInline preload="auto"
          poster="/images/jd-stage.jpg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.85 }}
        >
          <source src="/videos/hero.mp4.mp4" type="video/mp4" />
        </video>

        {/* Capa de crossfade — funde a negro 0.6 s en el punto de loop */}
        <div ref={seamRef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0,
            transition: 'opacity 0.6s ease', pointerEvents: 'none' }} />

        {/* Velo de legibilidad (suave, deja ver el vídeo a la derecha) */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.08) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(120% 90% at 100% 0%, rgba(124,58,237,0.22) 0%, rgba(190,24,93,0.10) 40%, transparent 70%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
        <SectionEyebrow number="01" text="Inicio" />

        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(3.5rem, 14vw, 8rem)', fontWeight: 800,
          letterSpacing: '-0.05em', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
          JOSEDA
        </h1>

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', fontWeight: 600,
          letterSpacing: '-0.025em', lineHeight: 1.08, color: '#fff', maxWidth: '18ch', marginBottom: '1.5rem' }}>
          Educación + Inteligencia Artificial, con criterio docente.
        </h2>

        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)',
          maxWidth: '46ch', marginBottom: '2.5rem' }}>
          Ayudo a docentes y centros a usar la IA con método para enseñar mejor y recuperar su tiempo.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
          <CTAButton variant="secondary" href="/contacto" arrow={false}>Hablemos</CTAButton>
        </div>
      </div>
    </section>
  );
}
