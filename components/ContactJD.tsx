'use client';

import { useRef } from 'react';
import gsap from '@/lib/gsap-setup';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

const EMAIL = 'hola@jose-david.com';

const SOCIAL = [
  { label: 'YouTube',   href: 'https://youtube.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn',  href: 'https://linkedin.com' },
  { label: 'Podcast',   href: '#podcasts' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ContactJD — ultra minimalista: título enorme, email gigante reactivo, redes
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
        gsap.to(targets, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12 });
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
        padding       : 'clamp(6rem, 14vh, 11rem) 5vw',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'flex-start',
        background    : 'transparent',
      }}
    >
      {/* Overline */}
      <p data-reveal style={{
        fontSize     : '0.72rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color        : 'var(--accent)',
        marginBottom : '1.5rem',
      }}>
        05 — Contacto
      </p>

      {/* Título enorme */}
      <h2 data-reveal style={{
        fontFamily   : 'var(--serif)',
        fontSize     : 'clamp(4rem, 16vw, 14rem)',
        fontWeight   : 300,
        letterSpacing: '-0.04em',
        lineHeight   : 0.9,
        color        : '#fff',
        marginBottom : 'clamp(2.5rem, 6vw, 5rem)',
      }}>
        Hablemos<span style={{ color: 'var(--accent)' }}>.</span>
      </h2>

      {/* Email gigante */}
      <a
        data-reveal
        href={`mailto:${EMAIL}?subject=${encodeURIComponent('Consulta desde jose-david.com')}`}
        style={{
          fontFamily    : 'var(--serif)',
          fontSize      : 'clamp(1.6rem, 6vw, 4.5rem)',
          fontWeight    : 300,
          letterSpacing : '-0.02em',
          color         : 'rgba(255,255,255,0.6)',
          textDecoration: 'none',
          display       : 'inline-block',
          transition    : 'color 0.3s, transform 0.3s',
          wordBreak     : 'break-word',
        }}
        onMouseEnter={(e) => {
          const a = e.currentTarget as HTMLAnchorElement;
          a.style.color = '#fff';
          a.style.transform = 'translateX(0.5rem)';
        }}
        onMouseLeave={(e) => {
          const a = e.currentTarget as HTMLAnchorElement;
          a.style.color = 'rgba(255,255,255,0.6)';
          a.style.transform = 'translateX(0)';
        }}
      >
        {EMAIL}&nbsp;→
      </a>

      {/* Redes sociales */}
      <div data-reveal style={{
        display   : 'flex',
        gap       : '2rem',
        flexWrap  : 'wrap',
        marginTop : 'clamp(3rem, 8vw, 6rem)',
      }}>
        {SOCIAL.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              fontSize     : '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color        : 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition   : 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
