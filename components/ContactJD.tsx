'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// ─────────────────────────────────────────────────────────────────────────────
// ContactJD — tarjeta de contacto con foto de perfil
// NeuralCanvas SVG eliminado; derecha sustituida por imagen real.
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactJD() {
  const sectionRef = useRef<HTMLElement>(null);

  // Fade-in al entrar en viewport (GSAP IntersectionObserver)
  useIsomorphicLayoutEffect(() => {
    let io: IntersectionObserver | null = null;
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 50 });

    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io?.disconnect();
        io = null;
        gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' });
      },
      { rootMargin: '-10% 0px 0px 0px' },
    );
    io.observe(el);

    return () => { io?.disconnect(); io = null; };
  }, []);

  const handleContact = () => {
    const subject = encodeURIComponent('Consulta desde jose-david.com');
    window.location.href = `mailto:hola@jose-david.com?subject=${subject}`;
  };

  return (
    <section ref={sectionRef} className="ct-section" id="contact">

      <div className="ct-card">

        {/* ── Topbar decorativa ── */}
        <div className="ct-topbar">
          <span className="ct-topbar-label">contacto</span>
          <div className="ct-dots" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1.5" y1="6" x2="10.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="ct-body">

          {/* ── Columna izquierda: texto + CTA ── */}
          <div className="ct-left">
            <p className="ct-overline">05 — Contacto</p>
            <h2 className="ct-title">
              Hablemos de tu<br />
              <em>próximo proyecto.</em>
            </h2>
            <p className="ct-sub">
              Contrataciones, conferencias<br className="ct-br" />
              y formaciones para equipos docentes.
            </p>

            <button
              className="ct-btn"
              type="button"
              onClick={handleContact}
              aria-label="Contactar con José David"
            >
              <span className="ct-btn-text">escríbeme&nbsp;→</span>
            </button>
          </div>

          {/* ── Columna derecha: foto de perfil ── */}
          <div className="ct-canvas ct-photo">
            <Image
              src="/images/jose-david-contacto.jpg"
              alt="José David Pérez Ibáñez dando formación"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="ct-photo-img"
            />
            {/* Overlay izquierdo — funde suavemente con la columna de texto */}
            <div
              aria-hidden="true"
              className="ct-photo-overlay"
            />
          </div>

        </div>
      </div>

    </section>
  );
}
