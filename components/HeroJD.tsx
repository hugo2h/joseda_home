'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Props — todos opcionales con valores por defecto
// ─────────────────────────────────────────────────────────────────────────────
interface HeroProps {
  label?:       string;
  line1Normal?: string;
  line1Accent?: string;
  line2Normal?: string;
  line2Accent?: string;
  sub?:         string;
  stamp?:       string;
}

// Proximity hover
const LIFT_RADIUS = 95;
const MAX_LIFT    = -7;

// ─────────────────────────────────────────────────────────────────────────────
// HeroJD
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroJD({
  label       = '01 — Inicio',
  line1Normal = 'Transforma tu forma de ',
  line1Accent = 'enseñar',
  line2Normal = 'con Inteligencia ',
  line2Accent = 'Artificial.',
  sub         = 'Soy José David. Maestro, Ingeniero y formador de docentes. Te ayudo a integrar la IA, mejorar tu competencia digital y optimizar tus clases para que recuperes tu tiempo.',
  stamp       = 'José David — Educación & IA',
}: HeroProps = {}) {

  const TOTAL      = line1Normal.length + line1Accent.length + line2Normal.length + line2Accent.length;
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>(Array.from({ length: TOTAL }, () => null));

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {

      // ── Entrance animation ────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Fondo: zoom-out cinematográfico (scale 1.05 → 1, opacity 0 → 1)
      const bgWrap = sectionRef.current?.querySelector<HTMLElement>('.hero-bg-wrap');
      if (bgWrap) {
        tl.from(bgWrap, {
          scale  : 1.05,
          opacity: 0,
          duration: 1.2,
          ease   : 'power2.out',
        }, 0);
      }

      // Texto: secuencia existente, ligeramente retrasada para que el fondo
      // ya esté visible cuando aparecen las letras
      tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from([line1Ref.current, line2Ref.current], { y: '110%', duration: 1.05, stagger: 0.13 }, 0.45)
        .from(subRef.current,  { y: 18, opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.9);

      // ── Scroll pin + text parallax ────────────────────────────────────────
      if (sv && innerRef.current) {
        const wraps        = Array.from(innerRef.current.querySelectorAll('.reveal-wrap'));
        const textElements = [labelRef.current, subRef.current, ...wraps].filter(Boolean);

        gsap.timeline({
          scrollTrigger: {
            trigger      : sectionRef.current,
            scroller     : sv,
            start        : 'top top',
            end          : '+=70%',
            pin          : true,
            pinSpacing   : true,
            pinType      : 'transform',
            anticipatePin: 1,
            scrub        : 1.5,   // era 2.5 — más reactivo al inicio del scroll
          },
        }).fromTo(
          textElements,
          { y: 0, opacity: 1, scale: 1, immediateRender: false },
          {
            y              : -8,
            opacity        : 0,
            scale          : 1.06,
            ease           : 'power1.in',
            stagger        : { each: 0.16, from: 'start' },
            transformOrigin: 'center center',
          },
        );
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // ── Character proximity hover wave ──────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      const r    = el.getBoundingClientRect();
      const dist = Math.hypot(
        e.clientX - (r.left + r.width  / 2),
        e.clientY - (r.top  + r.height / 2),
      );
      if (dist < LIFT_RADIUS) {
        const t = 1 - dist / LIFT_RADIUS;
        gsap.to(el, { y: MAX_LIFT * t * t, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
      } else {
        gsap.to(el, { y: 0, duration: 0.7, ease: 'elastic.out(1.1,0.45)', overwrite: 'auto' });
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (el) gsap.to(el, { y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
    });
  }, []);

  // ── Per-character <span> builder ─────────────────────────────────────────
  function chars(text: string, startIdx: number, isEm = false) {
    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < text.length) {
      if (text[i] === ' ') {
        const idx = startIdx + i;
        result.push(
          //   = non-breaking space: nunca colapsa en display:inline-block
          <span key={idx} ref={(el) => { charRefs.current[idx] = el; }} className="hero-char hero-char--space" aria-hidden="true">
            {' '}
          </span>,
        );
        i++;
      } else {
        const wordStart = i;
        while (i < text.length && text[i] !== ' ') i++;
        const wordSpans = text.slice(wordStart, i).split('').map((ch, j) => {
          const idx = startIdx + wordStart + j;
          return (
            <span
              key={idx}
              ref={(el) => { charRefs.current[idx] = el; }}
              className="hero-char"
              data-em={isEm ? 'true' : undefined}
              style={isEm ? { fontStyle: 'italic' } : undefined}
            >
              {ch}
            </span>
          );
        });
        result.push(
          <span
            key={`w${wordStart}`}
            className={
              isEm
                ? 'inline-block whitespace-nowrap hover:text-white transition-colors duration-300 cursor-default'
                : undefined
            }
            style={
              isEm
                ? { color: 'var(--accent, #38bdf8)' }
                : { display: 'inline-block', whiteSpace: 'nowrap' }
            }
          >
            {wordSpans}
          </span>,
        );
      }
    }
    return result;
  }

  // ── JSX ──────────────────────────────────────────────────────────────────
  return (
    <section className="hero" id="inicio" ref={sectionRef}>

      {/* ── Fondo fotográfico + overlays ── */}
      <div className="hero-bg-wrap" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-img"
          style={{ objectFit: 'cover' }}
        />
        {/* Overlay oscuro con degradado diagonal — legibilidad premium */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            inset     : 0,
            background: 'linear-gradient(135deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.52) 48%, rgba(5,5,5,0.78) 100%)',
          }}
        />
        {/* Glow de acento centrado */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            inset     : 0,
            background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(56,189,248,0.09) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Bloque de texto — centrado, z:1 ── */}
      <div className="hero-inner" ref={innerRef}>
        <p className="hero-label" ref={labelRef}>{label}</p>

        <h1
          className="hero-headline font-display font-light"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Línea 1 */}
          <span className="reveal-wrap">
            <span className="reveal-inner" ref={line1Ref}>
              {chars(line1Normal, 0)}
              {chars(line1Accent, line1Normal.length, true)}
            </span>
          </span>

          {/* Línea 2 */}
          <span className="reveal-wrap">
            <span className="reveal-inner" ref={line2Ref}>
              {chars(line2Normal, line1Normal.length + line1Accent.length)}
              {chars(line2Accent, line1Normal.length + line1Accent.length + line2Normal.length)}
            </span>
          </span>
        </h1>

        <p className="hero-sub" ref={subRef}>{sub}</p>
      </div>

      {/* ── Indicadores ── */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span style={{
          fontSize     : '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color        : 'var(--muted)',
        }}>
          Scroll
        </span>
      </div>
      <span className="hero-stamp">{stamp}</span>

    </section>
  );
}
