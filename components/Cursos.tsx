'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Datos ────────────────────────────────────────────────────────────────────
const CURSOS = [
  {
    id   : 1,
    num  : '01',
    title: 'Cursos Online para Docentes',
    sub  : 'Formación online práctica y actualizada para integrar la Inteligencia Artificial en el aula. Aprende a automatizar tareas, crear recursos y recuperar tu tiempo sin perder calidad educativa.',
    cta  : 'Ver cursos',
    photo: '/jd-auditorio.jpg',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Formaciones y Mentorías',
    sub  : 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    cta  : 'Solicitar formación',
    photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id   : 3,
    num  : '03',
    title: 'Comunidad Tribu de Profes',
    sub  : 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    cta  : 'Unirse a la tribu',
    photo: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Cursos — Acordeón vertical minimalista monocromo (B&N)
// Líneas full-width, border-b zinc-800, título + número. Al abrir: imagen B&N +
// descripción. Cero color de acento.
// ─────────────────────────────────────────────────────────────────────────────
export default function Cursos() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="cursos" style={{ background: 'transparent', padding: 'clamp(6rem, 14vh, 11rem) 6vw' }}>
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
          03 / Cursos
        </p>
        <h2 style={{
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2.8rem, 8vw, 7rem)',
          fontWeight   : 800,
          letterSpacing: '-0.045em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Aprende. Transforma.
        </h2>
      </div>

      {/* ── Acordeón ── */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CURSOS.map((c) => {
          const isOpen = openId === c.id;
          return (
            <motion.div
              key={c.id}
              layout
              onClick={() => setOpenId(isOpen ? null : c.id)}
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
                  {c.num}
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
                  {c.title}
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
                      className="curso-body"
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
                          src={c.photo}
                          alt={c.title}
                          fill
                          sizes="(max-width: 768px) 90vw, 600px"
                          style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)' }}
                        />
                      </div>

                      {/* Descripción + CTA */}
                      <div>
                        <p style={{
                          fontSize    : 'clamp(1rem, 1.4vw, 1.25rem)',
                          lineHeight  : 1.7,
                          color       : '#a1a1aa',
                          maxWidth    : '46ch',
                          marginBottom: '2.5rem',
                        }}>
                          {c.sub}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display      : 'inline-flex',
                            alignItems   : 'center',
                            gap          : '0.6rem',
                            padding      : '0.9rem 2.2rem',
                            background   : '#ffffff',
                            color        : '#000000',
                            fontSize     : '0.8rem',
                            fontWeight   : 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            border       : 'none',
                            cursor       : 'pointer',
                            transition   : 'opacity 0.2s',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.82'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                        >
                          {c.cta}
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
