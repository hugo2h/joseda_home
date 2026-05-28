'use client';

import { useRef, useEffect } from 'react';
import gsap from '@/lib/gsap-setup';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicFooter — footer minimalista monocromo.
// Nombre/copyright a la izquierda, redes (Twitter/YouTube/LinkedIn) a la derecha.
// Tipografía pequeña, cero color de acento.
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL = [
  { label: 'Twitter',  href: 'https://twitter.com'  },
  { label: 'YouTube',  href: 'https://youtube.com'  },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function CinematicFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const items = footerRef.current!.querySelectorAll('[data-foot]');
      gsap.set(items, { opacity: 0, y: 20 });
      gsap.to(items, {
        opacity : 1,
        y       : 0,
        duration: 0.8,
        ease    : 'power2.out',
        stagger : 0.1,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position     : 'relative',
        background   : 'transparent',
        borderTop    : '1px solid #27272a',
        padding      : 'clamp(2.5rem, 6vh, 4rem) 6vw',
        display      : 'flex',
        alignItems   : 'center',
        justifyContent: 'space-between',
        gap          : '2rem',
        flexWrap     : 'wrap',
      }}
    >
      {/* Copyright — esquina inferior izquierda */}
      <p data-foot style={{
        fontFamily   : 'monospace',
        fontSize     : '0.72rem',
        letterSpacing: '0.08em',
        color        : '#52525b',
      }}>
        © {new Date().getFullYear()} José David Pérez Ibáñez
      </p>

      {/* Redes — esquina inferior derecha */}
      <div data-foot style={{ display: 'flex', gap: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
        {SOCIAL.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily    : 'monospace',
              fontSize      : '0.72rem',
              letterSpacing : '0.12em',
              textTransform : 'uppercase',
              color         : '#71717a',
              textDecoration: 'none',
              transition    : 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#71717a'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
