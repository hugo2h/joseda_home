'use client';

import { useRef } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Magnetic from '@/components/Magnetic';

// ── 01 · HERO — vídeo cinematográfico + interactividad al cursor (§5.2) ──
// Vídeo en loop con fundido a negro 0.6 s antes del corte (seamless).
// Interactividad: parallax suave del contenido, brillo que sigue al ratón,
// letras de "JOSEDA" reactivas al hover y CTAs magnéticos.
const TITULO = 'JOSEDA';

export default function Hero() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const seamRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);

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

  // Parallax + brillo que sigue al puntero/dedo (throttle con rAF).
  // Funciona tanto con ratón (desktop) como con tacto (móvil): al deslizar
  // el dedo por el hero, el contenido se mueve y aparece el brillo.
  const moveTo = (clientX: number, clientY: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    const px = (x / r.width) - 0.5;   // -0.5 … 0.5
    const py = (y / r.height) - 0.5;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(420px circle at ${x}px ${y}px, rgba(124,58,237,0.20), rgba(214,53,149,0.10) 40%, transparent 70%)`;
        glowRef.current.style.opacity = '1';
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${px * -14}px, ${py * -10}px, 0)`;
      }
    });
  };

  const handleMouseMove  = (e: React.MouseEvent) => moveTo(e.clientX, e.clientY);
  const handleTouchMove  = (e: React.TouchEvent) => { const t = e.touches[0]; if (t) moveTo(t.clientX, t.clientY); };

  const reset = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (contentRef.current) contentRef.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
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
      {/* Vídeo de fondo */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay muted playsInline preload="auto"
          poster="/images/jd-stage.jpg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="hero-video"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.85 }}
        >
          <source src="/videos/hero.mp4.mp4" type="video/mp4" />
        </video>

        {/* Crossfade del loop */}
        <div ref={seamRef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0,
            transition: 'opacity 0.6s ease', pointerEvents: 'none' }} />

        {/* Velos de legibilidad */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.08) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)' }} />

        {/* Brillo que sigue al cursor (reacción tipo MAV) */}
        <div ref={glowRef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
      </div>

      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes ken-burns { from { transform: scale(1.0); } to { transform: scale(1.09); } }
        @keyframes scroll-cue { 0%,100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(7px); opacity: 1; } }

        .hero-content { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); will-change: transform; }
        .hero-content > * { animation: hero-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-content > *:nth-child(1) { animation-delay: 0.05s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.18s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.32s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.46s; }
        .hero-content > *:nth-child(5) { animation-delay: 0.60s; }
        .hero-video { animation: ken-burns 22s ease-out forwards; }
        .hero-cue   { animation: scroll-cue 1.8s ease-in-out infinite; }

        /* Letras de JOSEDA reactivas al cursor */
        .jd-letter {
          display: inline-block; cursor: default;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease, text-shadow 0.3s ease;
        }
        .jd-letter:hover {
          transform: translateY(-0.09em) scale(1.04);
          color: var(--brand-magenta);
          text-shadow: 0 8px 30px rgba(214,53,149,0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-content, .hero-content > *, .hero-video, .hero-cue, .jd-letter { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div ref={contentRef} className="container hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
        <SectionEyebrow number="01" text="Inicio" />

        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(3.5rem, 14vw, 8rem)', fontWeight: 800,
          letterSpacing: '-0.05em', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
          {TITULO.split('').map((ch, i) => (
            <span key={i} className="jd-letter">{ch}</span>
          ))}
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
          <Magnetic><CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton></Magnetic>
          <Magnetic><CTAButton variant="secondary" href="/contacto" arrow={false}>Hablemos</CTAButton></Magnetic>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 'clamp(1.25rem, 4vh, 2.5rem)', left: '50%',
        transform: 'translateX(-50%)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
        <svg className="hero-cue" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
