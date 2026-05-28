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
    tags : ['IA en educación', 'automatización', 'recursos digitales'],
    accent: '#38bdf8',
    cta  : 'Ver cursos',
    photo: '/jd-auditorio.jpg',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Formaciones y Mentorías',
    sub  : 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    tags : ['conferencias', 'talleres', 'mentoría docente'],
    accent: '#a78bfa',
    cta  : 'Solicitar formación',
    photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id   : 3,
    num  : '03',
    title: 'Comunidad Tribu de Profes',
    sub  : 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    tags : ['comunidad', 'networking', 'recursos compartidos'],
    accent: '#34d399',
    cta  : 'Unirse a la tribu',
    photo: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Cursos — Acordeón vertical estilo Aristide Benoist (Framer Motion)
// ─────────────────────────────────────────────────────────────────────────────
export default function Cursos() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="cursos" style={{ background: 'transparent', padding: '6rem 5vw 7rem' }}>
      {/* ── Cabecera ── */}
      <div style={{ marginBottom: '3.5rem', maxWidth: '900px' }}>
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
          fontSize     : 'clamp(2.5rem, 6vw, 5.5rem)',
          fontWeight   : 300,
          letterSpacing: '-0.03em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Aprende.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Transforma.</em>
        </h2>
      </div>

      {/* ── Acordeón ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {CURSOS.map((c) => {
          const isOpen = openId === c.id;
          return (
            <motion.div
              key={c.id}
              layout
              onClick={() => setOpenId(isOpen ? null : c.id)}
              style={{
                borderTop : '1px solid rgba(255,255,255,0.1)',
                padding   : '1.75rem 0',
                cursor    : 'pointer',
                overflow  : 'hidden',
              }}
              transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
            >
              {/* ── Cabecera del item ── */}
              <motion.div
                layout="position"
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
              >
                {/* Miniatura */}
                <motion.div
                  layout
                  style={{
                    position    : 'relative',
                    width       : isOpen ? 92 : 64,
                    height      : isOpen ? 92 : 64,
                    borderRadius: '0.85rem',
                    overflow    : 'hidden',
                    flexShrink  : 0,
                    border      : `1px solid ${c.accent}40`,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={c.photo}
                    alt={c.title}
                    fill
                    sizes="92px"
                    style={{ objectFit: 'cover', filter: 'grayscale(60%) brightness(0.9)' }}
                  />
                </motion.div>

                {/* Número */}
                <span style={{
                  fontFamily   : 'var(--serif)',
                  fontSize     : '0.9rem',
                  color        : c.accent,
                  letterSpacing: '0.1em',
                  width        : '2rem',
                  flexShrink   : 0,
                }}>
                  {c.num}
                </span>

                {/* Título */}
                <h3 style={{
                  flex         : 1,
                  fontFamily   : 'var(--serif)',
                  fontSize     : 'clamp(1.25rem, 3vw, 2.4rem)',
                  fontWeight   : 300,
                  letterSpacing: '-0.02em',
                  color        : isOpen ? '#fff' : 'rgba(255,255,255,0.72)',
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
                    fontSize  : '1.6rem',
                    fontWeight: 200,
                    color     : c.accent,
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
                    <div style={{ paddingLeft: 'calc(64px + 1.5rem)', paddingTop: '1.5rem' }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
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

                      {/* Descripción */}
                      <p style={{
                        fontSize    : '0.95rem',
                        lineHeight  : 1.8,
                        color       : 'rgba(255,255,255,0.55)',
                        maxWidth    : '52ch',
                        marginBottom: '2rem',
                      }}>
                        {c.sub}
                      </p>

                      {/* CTA */}
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display      : 'inline-flex',
                          alignItems   : 'center',
                          gap          : '0.6rem',
                          padding      : '0.85rem 2rem',
                          borderRadius : '9999px',
                          background   : c.accent,
                          color        : '#0a0a0a',
                          fontSize     : '0.8rem',
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
                        {c.cta}
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        {/* Línea de cierre */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
      </div>
    </section>
  );
}
