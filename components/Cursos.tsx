'use client';

import { useRef, useEffect } from 'react';
import gsap from '@/lib/gsap-setup';

// ─── Datos ────────────────────────────────────────────────────────────────────
const CURSOS = [
  {
    id   : 1,
    num  : '01',
    title: 'Cursos Online para Docentes',
    sub  : 'Formación online práctica y actualizada para integrar la Inteligencia Artificial en el aula. Aprende a automatizar tareas, crear recursos y recuperar tu tiempo sin perder calidad educativa.',
    tags : ['IA en educación', 'automatización', 'recursos digitales'],
    color : 'rgba(56,189,248,0.08)',
    accent: '#38bdf8',
    cta  : 'Ver cursos',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Formaciones y Mentorías',
    sub  : 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    tags : ['conferencias', 'talleres', 'mentoría docente'],
    color : 'rgba(167,139,250,0.08)',
    accent: '#a78bfa',
    cta  : 'Solicitar formación',
  },
  {
    id   : 3,
    num  : '03',
    title: 'Comunidad Tribu de Profes',
    sub  : 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    tags : ['comunidad', 'networking', 'recursos compartidos'],
    color : 'rgba(52,211,153,0.08)',
    accent: '#34d399',
    cta  : 'Unirse a la tribu',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Cursos — Horizontal Reveal (Aristide Benoist style)
// containerRef apunta al flex-row (N×100vw) → offsetWidth = N×vw = end correcto
// ─────────────────────────────────────────────────────────────────────────────
export default function Cursos() {
  const containerRef = useRef<HTMLDivElement>(null);   // flex row — N × 100vw

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.curso-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease    : 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin    : true,
          scrub  : 1,
          // Sin scroller — GSAP usa window (Lenis integrado vía gsap.ticker)
          end    : () => '+=' + containerRef.current!.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cursos"
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
            03 — Cursos
          </p>
          <h2 style={{
            fontFamily   : 'var(--serif)',
            fontSize     : 'clamp(2.5rem, 6vw, 6rem)',
            fontWeight   : 300,
            letterSpacing: '-0.03em',
            lineHeight   : 0.95,
            color        : '#fff',
          }}>
            Aprende.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Transforma.</em>
          </h2>
        </div>
        <p style={{
          maxWidth : '320px',
          fontSize : '0.88rem',
          lineHeight: 1.75,
          color    : 'var(--muted)',
          flexShrink: 0,
        }}>
          Formación de alto impacto para docentes que quieren integrar la IA con criterio pedagógico.
        </p>
      </div>

      {/* ── Flex row — trigger + pin de GSAP ── */}
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          width  : `${CURSOS.length * 100}vw`,    // N × 100vw → offsetWidth correcto para `end`
          height : '70vh',
        }}
        className="cursos-container"
      >
        {CURSOS.map((c) => (
          <div
            key={c.id}
            className="curso-panel"
            style={{
              width         : '100vw',
              height        : '100%',
              flexShrink    : 0,
              display       : 'flex',
              flexDirection : 'column',
              justifyContent: 'center',
              padding       : '5vw',
              position      : 'relative',
              background    : c.color,
              borderRight   : '1px solid rgba(255,255,255,0.05)',
              boxSizing     : 'border-box',
            }}
          >
            {/* Número decorativo */}
            <div style={{
              position     : 'absolute',
              bottom       : '1.5rem',
              right        : '5vw',
              fontSize     : 'clamp(8rem, 22vw, 18rem)',
              fontWeight   : 100,
              color        : 'rgba(255,255,255,0.04)',
              lineHeight   : 1,
              fontFamily   : 'var(--serif)',
              userSelect   : 'none',
              pointerEvents: 'none',
            }}>
              {c.num}
            </div>

            {/* Contenido */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding      : '0.22rem 0.75rem',
                      borderRadius : '9999px',
                      background   : 'rgba(255,255,255,0.06)',
                      border       : `1px solid ${c.accent}40`,
                      fontSize     : '0.7rem',
                      color        : c.accent,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(2.2rem, 5vw, 5rem)',
                fontWeight   : 300,
                letterSpacing: '-0.025em',
                color        : '#ffffff',
                marginBottom : '1.25rem',
                lineHeight   : 1,
              }}>
                {c.title}
              </h3>

              <p style={{
                fontSize    : '0.95rem',
                lineHeight  : 1.8,
                color       : 'rgba(255,255,255,0.52)',
                maxWidth    : '52ch',
                marginBottom: '2.5rem',
              }}>
                {c.sub}
              </p>

              <button
                type="button"
                style={{
                  display      : 'inline-flex',
                  alignItems   : 'center',
                  gap          : '0.5rem',
                  padding      : '0.85rem 2rem',
                  borderRadius : '9999px',
                  background   : c.accent,
                  color        : '#0a0a0a',
                  fontSize     : '0.82rem',
                  fontWeight   : 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border       : 'none',
                  cursor       : 'pointer',
                  transition   : 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                {c.cta}&nbsp;→
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
