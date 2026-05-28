'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// ─────────────────────────────────────────────────────────────────────────────
// HeroJD — plano cinematográfico con vídeo + blur text reveal (Aristide style)
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroJD() {
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  // Blur text reveal secuencial
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay   : 0.4,
        defaults: { ease: 'power3.out' },
      });

      tl.from(titleRef.current, {
        filter  : 'blur(24px)',
        opacity : 0,
        y       : 30,
        duration: 1.6,
      })
      .from(subtitleRef.current, {
        filter  : 'blur(12px)',
        opacity : 0,
        y       : 20,
        duration: 1.2,
      }, '-=0.9')
      .from(labelRef.current, {
        opacity : 0,
        y       : 14,
        duration: 0.8,
      }, '-=0.8')
      .from(ctaRef.current, {
        opacity : 0,
        y       : 14,
        duration: 0.8,
      }, '-=0.55');
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector<HTMLElement>(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      style={{
        position      : 'relative',
        width         : '100%',
        height        : '100vh',
        overflow      : 'hidden',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Vídeo de fondo ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/videos/hero.mp4.mp4"
        style={{
          position      : 'absolute',
          inset         : 0,
          width         : '100%',
          height        : '100%',
          objectFit     : 'cover',
          objectPosition: '50% 70%',
          filter        : 'brightness(0.75)',
          zIndex        : 0,
        }}
      />

      {/* ── Gradiente inferior para legibilidad del texto ── */}
      <div
        aria-hidden="true"
        style={{
          position  : 'absolute',
          inset     : 0,
          zIndex    : 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* ── Bloque de texto centrado ── */}
      <div
        style={{
          position  : 'relative',
          zIndex    : 2,
          textAlign : 'center',
          padding   : '0 1.5rem',
          maxWidth  : '960px',
          width     : '100%',
        }}
      >
        {/* Label */}
        <p
          ref={labelRef}
          style={{
            fontSize     : '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color        : 'rgba(255,255,255,0.45)',
            marginBottom : '1.25rem',
            fontFamily   : 'var(--sans)',
          }}
        >
          01 — Inicio
        </p>

        {/* Título principal — gigante */}
        <h1
          ref={titleRef}
          style={{
            fontSize     : 'clamp(3.5rem, 13vw, 10rem)',
            fontWeight   : 200,
            letterSpacing: '-0.03em',
            lineHeight   : 0.9,
            color        : '#ffffff',
            marginBottom : '1.5rem',
            fontFamily   : 'var(--serif, serif)',
          }}
        >
          JOSÉ DAVID
        </h1>

        {/* Subtítulo */}
        <h2
          ref={subtitleRef}
          style={{
            fontSize     : 'clamp(0.9rem, 2.2vw, 1.35rem)',
            fontWeight   : 300,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color        : 'rgba(255,255,255,0.65)',
            marginBottom : '2.75rem',
            fontFamily   : 'var(--sans)',
          }}
        >
          Educación &amp; Inteligencia Artificial
        </h2>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            type="button"
            onClick={() => scrollTo('#cursos')}
            style={{
              padding       : '0.85rem 2.2rem',
              borderRadius  : '9999px',
              background    : '#ffffff',
              color         : '#0a0a0a',
              fontSize      : '0.83rem',
              fontWeight    : 600,
              letterSpacing : '0.05em',
              border        : 'none',
              cursor        : 'pointer',
              textTransform : 'uppercase',
              transition    : 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            Descubrir cursos
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            style={{
              padding       : '0.85rem 2.2rem',
              borderRadius  : '9999px',
              background    : 'rgba(255,255,255,0.1)',
              color         : '#ffffff',
              fontSize      : '0.83rem',
              fontWeight    : 400,
              letterSpacing : '0.05em',
              border        : '1px solid rgba(255,255,255,0.22)',
              cursor        : 'pointer',
              textTransform : 'uppercase',
              transition    : 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
          >
            Contratar&nbsp;→
          </button>
        </div>
      </div>

      {/* ── Indicador de scroll ── */}
      <div
        style={{
          position      : 'absolute',
          bottom        : '2.25rem',
          left          : '50%',
          transform     : 'translateX(-50%)',
          zIndex        : 2,
          display       : 'flex',
          flexDirection : 'column',
          alignItems    : 'center',
          gap           : '0.5rem',
        }}
      >
        <div className="scroll-line" style={{ height: '48px' }} />
        <span
          style={{
            fontSize     : '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color        : 'rgba(255,255,255,0.3)',
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
