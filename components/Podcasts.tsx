'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Datos ────────────────────────────────────────────────────────────────────
const PODCASTS = [
  {
    id    : 'tribu-de-profes',
    num   : '01',
    name  : 'Tribu de Profes',
    summary: 'El podcast para docentes que quieren transformar su práctica educativa con IA y tecnología.',
    sector: 'Educación · IA · Comunidad docente',
    photo : '/jd-stage.jpg',
  },
  {
    id    : 'vamos-a-clase',
    num   : '02',
    name  : '¡Vamos a clase!',
    summary: 'Recursos, estrategias y herramientas prácticas para el día a día en el aula.',
    sector: 'Educación · Recursos didácticos',
    photo : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id    : 'google-edu',
    num   : '03',
    name  : 'Google Edu Podcast',
    summary: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    sector: 'EdTech · Google · Innovación educativa',
    photo : 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id    : 'leocuentos',
    num   : '04',
    name  : 'LEOcuentos',
    summary: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    sector: 'Literatura infantil · Lectura · Primaria',
    photo : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Podcasts — Acordeón vertical minimalista monocromo (B&N)
// ─────────────────────────────────────────────────────────────────────────────
export default function Podcasts() {
  const [openId, setOpenId] = useState<string | null>('tribu-de-profes');

  return (
    <section id="podcasts" style={{ background: 'transparent', padding: 'clamp(6rem, 14vh, 11rem) 6vw' }}>
      {/* ── Cabecera ── */}
      <div style={{ marginBottom: 'clamp(3rem, 8vh, 6rem)' }}>
        <p style={{
          fontFamily   : 'monospace',
          fontSize     : '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color        : '#71717a',
          marginBottom : '1.5rem',
        }}>
          04 / Podcasts
        </p>
        <h2 style={{
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2.8rem, 8vw, 7rem)',
          fontWeight   : 800,
          letterSpacing: '-0.045em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Voces que inspiran.
        </h2>
      </div>

      {/* ── Acordeón ── */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PODCASTS.map((p) => {
          const isOpen = openId === p.id;
          return (
            <motion.div
              key={p.id}
              layout
              onClick={() => setOpenId(isOpen ? null : p.id)}
              style={{
                borderBottom: '1px solid #27272a',
                padding     : 'clamp(1.5rem, 3vw, 2.5rem) 0',
                cursor      : 'pointer',
                overflow    : 'hidden',
              }}
              transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
            >
              {/* ── Cabecera del item ── */}
              <motion.div
                layout="position"
                style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(1rem, 3vw, 2.5rem)' }}
              >
                {/* Número */}
                <span style={{
                  fontFamily   : 'monospace',
                  fontSize     : '0.9rem',
                  color        : '#71717a',
                  flexShrink   : 0,
                }}>
                  {p.num}
                </span>

                {/* Título */}
                <h3 style={{
                  flex         : 1,
                  fontFamily   : 'var(--sans)',
                  fontSize     : 'clamp(1.5rem, 4vw, 3.5rem)',
                  fontWeight   : 600,
                  letterSpacing: '-0.03em',
                  color        : isOpen ? '#fff' : '#a1a1aa',
                  lineHeight   : 1.05,
                  transition   : 'color 0.3s',
                }}>
                  {p.name}
                </h3>

                {/* Indicador +/− */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontSize  : '1.8rem',
                    fontWeight: 200,
                    color     : isOpen ? '#fff' : '#71717a',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  +
                </motion.span>
              </motion.div>

              {/* ── Cuerpo expandible ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="podcast-body"
                      style={{
                        display            : 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap                : 'clamp(2rem, 5vw, 4rem)',
                        alignItems         : 'center',
                        paddingTop         : 'clamp(2rem, 4vw, 3rem)',
                      }}
                    >
                      {/* Imagen B&N */}
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                        <Image
                          src={p.photo}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 90vw, 600px"
                          style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)' }}
                        />
                      </div>

                      {/* Sector + descripción + CTA */}
                      <div>
                        <p style={{
                          fontFamily   : 'monospace',
                          fontSize     : '0.7rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color        : '#71717a',
                          marginBottom : '1.25rem',
                        }}>
                          {p.sector}
                        </p>

                        <p style={{
                          fontSize    : 'clamp(1rem, 1.4vw, 1.25rem)',
                          lineHeight  : 1.7,
                          color       : '#a1a1aa',
                          maxWidth    : '46ch',
                          marginBottom: '2.5rem',
                        }}>
                          {p.summary}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display      : 'inline-flex',
                            alignItems   : 'center',
                            gap          : '0.6rem',
                            padding      : '0.9rem 2.2rem',
                            background   : 'transparent',
                            color        : '#fff',
                            fontSize     : '0.8rem',
                            fontWeight   : 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            border       : '1px solid #52525b',
                            cursor       : 'pointer',
                            transition   : 'background 0.2s, color 0.2s, border-color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = '#ffffff';
                            b.style.color = '#000000';
                            b.style.borderColor = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = 'transparent';
                            b.style.color = '#fff';
                            b.style.borderColor = '#52525b';
                          }}
                        >
                          Escuchar
                          <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
