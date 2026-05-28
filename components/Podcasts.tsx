'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from '@/lib/gsap-setup';

// ─── Datos ────────────────────────────────────────────────────────────────────
const PODCASTS = [
  {
    id    : 'tribu-de-profes',
    num   : '01',
    name  : 'Tribu de Profes',
    summary: 'El podcast para docentes que quieren transformar su práctica educativa con IA y tecnología.',
    sector: 'Educación · IA · Comunidad docente',
    accent: '#38bdf8',
    photo : '/jd-stage.jpg',
  },
  {
    id    : 'vamos-a-clase',
    num   : '02',
    name  : '¡Vamos a clase!',
    summary: 'Recursos, estrategias y herramientas prácticas para el día a día en el aula.',
    sector: 'Educación · Recursos didácticos',
    accent: '#34d399',
    photo : '/jd-formacion.jpg',
  },
  {
    id    : 'google-edu',
    num   : '03',
    name  : 'Google Edu Podcast',
    summary: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    sector: 'EdTech · Google · Innovación educativa',
    accent: '#fbbf24',
    photo : '/jd-ponente.jpg',
  },
  {
    id    : 'leocuentos',
    num   : '04',
    name  : 'LEOcuentos',
    summary: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    sector: 'Literatura infantil · Lectura · Primaria',
    accent: '#f472b6',
    photo : '/jd-auditorio.jpg',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Podcasts — Split Layout 50/50 + Horizontal Reveal (Aristide Benoist style)
// ─────────────────────────────────────────────────────────────────────────────
export default function Podcasts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.podcast-panel');

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
          display: 'flex',
          width  : `${PODCASTS.length * 100}vw`,
          height : '78vh',
        }}
        className="podcasts-container"
      >
        {PODCASTS.map((p, i) => (
          <div
            key={p.id}
            className="podcast-panel"
            style={{
              width    : '100vw',
              height   : '100%',
              flexShrink: 0,
              display  : 'grid',
              /* Foto a la derecha en paneles pares para alternar ritmo visual */
              gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* ── Lado A: Contenido ── */}
            <div style={{
              display       : 'flex',
              flexDirection : 'column',
              justifyContent: 'center',
              padding       : '5vw 4vw',
              order         : i % 2 === 0 ? 1 : 2,
            }}>
              {/* Sector pill */}
              <div style={{
                display      : 'inline-flex',
                alignSelf    : 'flex-start',
                padding      : '0.22rem 0.8rem',
                borderRadius : '9999px',
                background   : 'rgba(255,255,255,0.05)',
                border       : `1px solid ${p.accent}35`,
                fontSize     : '0.68rem',
                color        : p.accent,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom : '2rem',
              }}>
                {p.sector}
              </div>

              {/* Número decorativo */}
              <div style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(0.7rem, 1.2vw, 1rem)',
                fontWeight   : 300,
                color        : 'rgba(255,255,255,0.22)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom : '0.6rem',
              }}>
                Ep. {p.num}
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
              }}>
                {p.name}
              </h3>

              {/* Separador */}
              <div style={{
                width       : '3rem',
                height      : '1px',
                background  : `${p.accent}70`,
                marginBottom: '1.75rem',
              }} />

              {/* Descripción */}
              <p style={{
                fontSize    : '0.93rem',
                lineHeight  : 1.82,
                color       : 'rgba(255,255,255,0.48)',
                maxWidth    : '44ch',
                marginBottom: '2.75rem',
              }}>
                {p.summary}
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
                    btn.style.borderColor = p.accent;
                    btn.style.color = p.accent;
                    btn.style.background = `${p.accent}10`;
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = 'rgba(255,255,255,0.22)';
                    btn.style.color = '#ffffff';
                    btn.style.background = 'transparent';
                  }}
                >
                  Escuchar
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>

            {/* ── Lado B: Foto B&W ── */}
            <div style={{
              position : 'relative',
              overflow : 'hidden',
              borderLeft: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderRight: i % 2 !== 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              order    : i % 2 === 0 ? 2 : 1,
            }}>
              <Image
                src={p.photo}
                alt={p.name}
                fill
                sizes="50vw"
                style={{
                  objectFit    : 'cover',
                  objectPosition: 'center top',
                  filter       : 'grayscale(100%) contrast(1.06) brightness(0.80)',
                }}
                priority={i === 0}
              />
              {/* Overlay */}
              <div style={{
                position  : 'absolute',
                inset     : 0,
                background: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />
              {/* Número decorativo sobre foto */}
              <div style={{
                position     : 'absolute',
                top          : '2rem',
                right        : '2.5rem',
                fontSize     : 'clamp(6rem, 14vw, 12rem)',
                fontWeight   : 100,
                color        : 'rgba(255,255,255,0.08)',
                lineHeight   : 1,
                fontFamily   : 'var(--serif)',
                userSelect   : 'none',
                pointerEvents: 'none',
                letterSpacing: '-0.04em',
              }}>
                {p.num}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
