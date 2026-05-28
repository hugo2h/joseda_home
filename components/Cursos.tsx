'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from '@/lib/gsap-setup';

// ─── Datos ────────────────────────────────────────────────────────────────────
const CURSOS = [
  {
    id   : 1,
    num  : '01',
    title: 'Cursos Online\npara Docentes',
    sub  : 'Formación online práctica y actualizada para integrar la Inteligencia Artificial en el aula. Aprende a automatizar tareas, crear recursos y recuperar tu tiempo sin perder calidad educativa.',
    tags : ['IA en educación', 'automatización', 'recursos digitales'],
    accent: '#38bdf8',
    cta  : 'Ver cursos',
    photo: '/jd-auditorio.jpg',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Formaciones\ny Mentorías',
    sub  : 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    tags : ['conferencias', 'talleres', 'mentoría docente'],
    accent: '#a78bfa',
    cta  : 'Solicitar formación',
    photo: '/jd-ponente.jpg',
  },
  {
    id   : 3,
    num  : '03',
    title: 'Comunidad\nTribu de Profes',
    sub  : 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    tags : ['comunidad', 'networking', 'recursos compartidos'],
    accent: '#34d399',
    cta  : 'Unirse a la tribu',
    photo: '/jd-formacion.jpg',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Cursos — Split Layout 50/50 + Horizontal Reveal (Aristide Benoist style)
// ─────────────────────────────────────────────────────────────────────────────
export default function Cursos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.curso-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease    : 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          pin    : true,
          scrub  : 1,
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
          width  : `${CURSOS.length * 100}vw`,
          height : '78vh',
        }}
        className="cursos-container"
      >
        {CURSOS.map((c) => (
          <div
            key={c.id}
            className="curso-panel"
            style={{
              width    : '100vw',
              height   : '100%',
              flexShrink: 0,
              display  : 'grid',
              gridTemplateColumns: '1fr 1fr',
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* ── Lado A: Foto B&W ── */}
            <div style={{
              position : 'relative',
              overflow : 'hidden',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Image
                src={c.photo}
                alt={c.title.replace('\n', ' ')}
                fill
                sizes="50vw"
                style={{
                  objectFit    : 'cover',
                  objectPosition: 'center top',
                  filter       : 'grayscale(100%) contrast(1.08) brightness(0.82)',
                  transition   : 'filter 0.6s ease',
                }}
                priority={c.id === 1}
              />
              {/* Overlay gradiente sutil */}
              <div style={{
                position  : 'absolute',
                inset     : 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />
              {/* Número decorativo sobre foto */}
              <div style={{
                position     : 'absolute',
                bottom       : '2rem',
                left         : '2.5rem',
                fontSize     : 'clamp(6rem, 14vw, 12rem)',
                fontWeight   : 100,
                color        : 'rgba(255,255,255,0.10)',
                lineHeight   : 1,
                fontFamily   : 'var(--serif)',
                userSelect   : 'none',
                pointerEvents: 'none',
                letterSpacing: '-0.04em',
              }}>
                {c.num}
              </div>
            </div>

            {/* ── Lado B: Contenido ── */}
            <div style={{
              display       : 'flex',
              flexDirection : 'column',
              justifyContent: 'center',
              padding       : '5vw 4vw',
              position      : 'relative',
            }}>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding      : '0.22rem 0.75rem',
                      borderRadius : '9999px',
                      background   : 'rgba(255,255,255,0.05)',
                      border       : `1px solid ${c.accent}35`,
                      fontSize     : '0.68rem',
                      color        : c.accent,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Título */}
              <h3 style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(2rem, 4.5vw, 4.5rem)',
                fontWeight   : 300,
                letterSpacing: '-0.03em',
                color        : '#ffffff',
                marginBottom : '1.5rem',
                lineHeight   : 0.95,
                whiteSpace   : 'pre-line',
              }}>
                {c.title}
              </h3>

              {/* Separador */}
              <div style={{
                width       : '3rem',
                height      : '1px',
                background  : `${c.accent}80`,
                marginBottom: '1.75rem',
              }} />

              {/* Descripción */}
              <p style={{
                fontSize    : '0.93rem',
                lineHeight  : 1.82,
                color       : 'rgba(255,255,255,0.48)',
                maxWidth    : '46ch',
                marginBottom: '2.75rem',
              }}>
                {c.sub}
              </p>

              {/* CTA */}
              <div>
                <button
                  type="button"
                  style={{
                    display      : 'inline-flex',
                    alignItems   : 'center',
                    gap          : '0.6rem',
                    padding      : '0.9rem 2.2rem',
                    borderRadius : '9999px',
                    background   : 'transparent',
                    color        : '#ffffff',
                    fontSize     : '0.8rem',
                    fontWeight   : 500,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    border       : '1px solid rgba(255,255,255,0.22)',
                    cursor       : 'pointer',
                    transition   : 'border-color 0.25s, color 0.25s, background 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = c.accent;
                    btn.style.color = c.accent;
                    btn.style.background = `${c.accent}10`;
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = 'rgba(255,255,255,0.22)';
                    btn.style.color = '#ffffff';
                    btn.style.background = 'transparent';
                  }}
                >
                  {c.cta}
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
