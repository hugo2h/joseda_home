'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const PODCASTS = [
  {
    id    : 'tribu-de-profes',
    num   : '01',
    name  : 'Tribu de Profes',
    summary: 'El podcast para docentes que quieren transformar su práctica educativa con IA y tecnología.',
    sector: 'Educación · IA · Comunidad docente',
    color : 'rgba(56,189,248,0.10)',
    accent: '#38bdf8',
  },
  {
    id    : 'vamos-a-clase',
    num   : '02',
    name  : '¡Vamos a clase!',
    summary: 'Recursos, estrategias y herramientas prácticas para el día a día en el aula.',
    sector: 'Educación · Recursos didácticos',
    color : 'rgba(52,211,153,0.10)',
    accent: '#34d399',
  },
  {
    id    : 'google-edu',
    num   : '03',
    name  : 'Google Edu Podcast',
    summary: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    sector: 'EdTech · Google · Innovación educativa',
    color : 'rgba(251,191,36,0.10)',
    accent: '#fbbf24',
  },
  {
    id    : 'leocuentos',
    num   : '04',
    name  : 'LEOcuentos',
    summary: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    sector: 'Literatura infantil · Lectura · Primaria',
    color : 'rgba(244,114,182,0.10)',
    accent: '#f472b6',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Podcasts — Horizontal Reveal (Aristide Benoist style)
// containerRef apunta al flex-row (N×100vw) → offsetWidth = N×vw = end correcto
// ─────────────────────────────────────────────────────────────────────────────
export default function Podcasts() {
  const containerRef = useRef<HTMLDivElement>(null);   // flex row — N × 100vw

  useIsomorphicLayoutEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.podcast-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease    : 'none',
        scrollTrigger: {
          trigger : containerRef.current,
          pin     : true,
          scrub   : 1,
          scroller: '.scroll-viewport',
          end     : () => '+=' + containerRef.current!.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="podcasts"
      style={{ background: 'transparent', overflow: 'hidden' }}
    >
      {/* ── Cabecera ── */}
      <div style={{
        padding       : '5rem 5vw 3rem',
        display       : 'flex',
        alignItems    : 'flex-end',
        justifyContent: 'space-between',
        gap           : '2rem',
        borderTop     : '1px solid rgba(255,255,255,0.08)',
        borderBottom  : '1px solid rgba(255,255,255,0.08)',
      }}>
        <div>
          <p style={{
            fontSize     : '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color        : 'var(--accent)',
            marginBottom : '1rem',
          }}>
            04 — Podcasts
          </p>
          <h2 style={{
            fontFamily   : 'var(--serif)',
            fontSize     : 'clamp(2.5rem, 6vw, 6rem)',
            fontWeight   : 300,
            letterSpacing: '-0.03em',
            lineHeight   : 0.95,
            color        : '#fff',
          }}>
            Voces que<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>inspiran.</em>
          </h2>
        </div>
        <p style={{
          maxWidth : '320px',
          fontSize : '0.88rem',
          lineHeight: 1.75,
          color    : 'var(--muted)',
          flexShrink: 0,
        }}>
          Podcasts de educación e IA para docentes que quieren hacer la diferencia.
        </p>
      </div>

      {/* ── Flex row — trigger + pin de GSAP ── */}
      <div
        ref={containerRef}
        style={{
          display : 'flex',
          width   : `${PODCASTS.length * 100}vw`,   // N × 100vw → offsetWidth correcto para `end`
          height  : '70vh',
        }}
        className="podcasts-container"
      >
        {PODCASTS.map((p) => (
          <div
            key={p.id}
            className="podcast-panel"
            style={{
              width         : '100vw',
              height        : '100%',
              flexShrink    : 0,
              display       : 'flex',
              flexDirection : 'column',
              justifyContent: 'flex-end',
              padding       : '5vw',
              position      : 'relative',
              background    : p.color,
              borderRight   : '1px solid rgba(255,255,255,0.05)',
              boxSizing     : 'border-box',
            }}
          >
            {/* Número decorativo */}
            <div style={{
              position     : 'absolute',
              top          : '2.5rem',
              left         : '5vw',
              fontSize     : 'clamp(5rem, 18vw, 14rem)',
              fontWeight   : 100,
              color        : 'rgba(255,255,255,0.04)',
              lineHeight   : 1,
              fontFamily   : 'var(--serif)',
              userSelect   : 'none',
              pointerEvents: 'none',
            }}>
              {p.num}
            </div>

            {/* Contenido */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}>
              <div style={{
                display      : 'inline-block',
                padding      : '0.22rem 0.75rem',
                borderRadius : '9999px',
                background   : 'rgba(255,255,255,0.07)',
                border       : `1px solid ${p.accent}40`,
                fontSize     : '0.7rem',
                color        : p.accent,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom : '1.5rem',
              }}>
                {p.sector}
              </div>

              <h3 style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(2rem, 4vw, 4rem)',
                fontWeight   : 300,
                letterSpacing: '-0.02em',
                color        : '#ffffff',
                marginBottom : '1rem',
                lineHeight   : 1,
              }}>
                {p.name}
              </h3>

              <p style={{
                fontSize  : '0.92rem',
                lineHeight: 1.75,
                color     : 'rgba(255,255,255,0.55)',
                maxWidth  : '44ch',
              }}>
                {p.summary}
              </p>

              <button
                type="button"
                style={{
                  marginTop    : '2rem',
                  display      : 'inline-flex',
                  alignItems   : 'center',
                  gap          : '0.5rem',
                  padding      : '0.65rem 1.5rem',
                  borderRadius : '9999px',
                  background   : 'rgba(255,255,255,0.08)',
                  border       : `1px solid ${p.accent}60`,
                  color        : p.accent,
                  fontSize     : '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor       : 'pointer',
                  transition   : 'background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${p.accent}20`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
              >
                Escuchar&nbsp;→
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
