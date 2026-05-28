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
    photo : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id    : 'google-edu',
    num   : '03',
    name  : 'Google Edu Podcast',
    summary: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    sector: 'EdTech · Google · Innovación educativa',
    accent: '#fbbf24',
    photo : 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id    : 'leocuentos',
    num   : '04',
    name  : 'LEOcuentos',
    summary: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    sector: 'Literatura infantil · Lectura · Primaria',
    accent: '#f472b6',
    photo : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Podcasts — Acordeón vertical estilo Aristide Benoist (Framer Motion)
// ─────────────────────────────────────────────────────────────────────────────
export default function Podcasts() {
  const [openId, setOpenId] = useState<string | null>('tribu-de-profes');

  return (
    <section id="podcasts" style={{ background: 'transparent', padding: '6rem 5vw 7rem' }}>
      {/* ── Cabecera ── */}
      <div style={{ marginBottom: '3.5rem', maxWidth: '900px' }}>
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
          fontSize     : 'clamp(2.5rem, 6vw, 5.5rem)',
          fontWeight   : 300,
          letterSpacing: '-0.03em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Voces que{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>inspiran.</em>
        </h2>
      </div>

      {/* ── Acordeón ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {PODCASTS.map((p) => {
          const isOpen = openId === p.id;
          return (
            <motion.div
              key={p.id}
              layout
              onClick={() => setOpenId(isOpen ? null : p.id)}
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
                    border      : `1px solid ${p.accent}40`,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="92px"
                    style={{ objectFit: 'cover', filter: 'grayscale(60%) brightness(0.9)' }}
                  />
                </motion.div>

                {/* Número */}
                <span style={{
                  fontFamily   : 'var(--serif)',
                  fontSize     : '0.9rem',
                  color        : p.accent,
                  letterSpacing: '0.1em',
                  width        : '2rem',
                  flexShrink   : 0,
                }}>
                  {p.num}
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
                  {p.name}
                </h3>

                {/* Indicador +/− */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontSize  : '1.6rem',
                    fontWeight: 200,
                    color     : p.accent,
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
                      {/* Sector */}
                      <div style={{
                        display      : 'inline-flex',
                        padding      : '0.22rem 0.8rem',
                        borderRadius : '9999px',
                        background   : 'rgba(255,255,255,0.05)',
                        border       : `1px solid ${p.accent}35`,
                        fontSize     : '0.68rem',
                        color        : p.accent,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom : '1.5rem',
                      }}>
                        {p.sector}
                      </div>

                      {/* Descripción */}
                      <p style={{
                        fontSize    : '0.95rem',
                        lineHeight  : 1.8,
                        color       : 'rgba(255,255,255,0.55)',
                        maxWidth    : '50ch',
                        marginBottom: '2rem',
                      }}>
                        {p.summary}
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
                          background   : 'transparent',
                          color        : '#fff',
                          fontSize     : '0.8rem',
                          fontWeight   : 500,
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          border       : `1px solid ${p.accent}80`,
                          cursor       : 'pointer',
                          transition   : 'background 0.2s, color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          const b = e.currentTarget as HTMLButtonElement;
                          b.style.background = p.accent;
                          b.style.color = '#0a0a0a';
                        }}
                        onMouseLeave={(e) => {
                          const b = e.currentTarget as HTMLButtonElement;
                          b.style.background = 'transparent';
                          b.style.color = '#fff';
                        }}
                      >
                        Escuchar
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
