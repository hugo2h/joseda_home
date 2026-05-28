'use client';

import { useRef } from 'react';
import gsap from '@/lib/gsap-setup';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

const EMAIL = 'hola@jose-david.com';

// ─────────────────────────────────────────────────────────────────────────────
// ContactJD — minimalista monocromo: "Hablemos." gigante centrado + mailto
// subrayado. Cero color de acento.
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactJD() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');
    gsap.set(targets, { opacity: 0, y: 40 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        gsap.to(targets, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 });
      },
      { rootMargin: '-12% 0px 0px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding       : 'clamp(8rem, 22vh, 16rem) 5vw',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        textAlign     : 'center',
        background    : 'transparent',
      }}
    >
      {/* Overline */}
      <p data-reveal style={{
        fontFamily   : 'monospace',
        fontSize     : '0.75rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color        : '#71717a',
        marginBottom : 'clamp(2rem, 5vh, 3.5rem)',
      }}>
        05 / Contacto
      </p>

      {/* Título gigante */}
      <h2 data-reveal style={{
        fontFamily   : 'var(--sans)',
        fontSize     : 'clamp(4.5rem, 18vw, 16rem)',
        fontWeight   : 800,
        letterSpacing: '-0.05em',
        lineHeight   : 0.9,
        color        : '#fff',
        marginBottom : 'clamp(2.5rem, 6vw, 4.5rem)',
      }}>
        Hablemos.
      </h2>

      {/* Email subrayado */}
      <a
        data-reveal
        href={`mailto:${EMAIL}?subject=${encodeURIComponent('Consulta desde jose-david.com')}`}
        style={{
          fontFamily     : 'var(--sans)',
          fontSize       : 'clamp(1.25rem, 4vw, 2.75rem)',
          fontWeight     : 400,
          letterSpacing  : '-0.02em',
          color          : '#ffffff',
          textDecoration : 'underline',
          textUnderlineOffset: '0.18em',
          textDecorationThickness: '1px',
          wordBreak      : 'break-word',
          transition     : 'color 0.3s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#a1a1aa'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
      >
        {EMAIL}
      </a>
    </section>
  );
}
