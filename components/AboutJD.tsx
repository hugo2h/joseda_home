'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — Editorial Split 50/50 (monocromo)
// Izquierda: párrafo blanco gigante. Derecha: imagen B&N alta con parallax.
// Abajo: estadísticas en una línea horizontal, separadas por barras, monospace.
// ─────────────────────────────────────────────────────────────────────────────
const STATS: [string, string][] = [
  ['17M+',  'Personas alcanzadas'],
  ['100K+', 'Suscriptores'],
  ['8+',    'Años de experiencia'],
];

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  // Parallax sutil sobre la imagen
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding   : 'clamp(6rem, 16vh, 12rem) 6vw',
        background: 'transparent',
      }}
    >
      {/* Overline */}
      <p style={{
        fontFamily   : 'monospace',
        fontSize     : '0.75rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color        : '#71717a',
        marginBottom : 'clamp(3rem, 8vh, 6rem)',
      }}>
        02 / Sobre mí
      </p>

      {/* ── Split 50/50 ── */}
      <div
        className="about-split"
        style={{
          display            : 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap                : 'clamp(2rem, 6vw, 6rem)',
          alignItems         : 'center',
        }}
      >
        {/* Izquierda — párrafo gigante blanco */}
        <div>
          <p style={{
            fontFamily   : 'var(--sans)',
            fontSize     : 'clamp(1.75rem, 3.2vw, 3rem)',
            fontWeight   : 500,
            lineHeight   : 1.25,
            letterSpacing: '-0.03em',
            color        : '#ffffff',
          }}>
            Combino pedagogía y tecnología para transformar la educación.
            Ayudo a docentes a integrar la IA, recuperar su tiempo y liderar
            el cambio en las aulas.
          </p>
        </div>

        {/* Derecha — imagen alta B&N con parallax */}
        <div
          ref={imageRef}
          style={{
            position    : 'relative',
            width       : '100%',
            aspectRatio : '3 / 4',
            overflow    : 'hidden',
          }}
        >
          <motion.div style={{ position: 'absolute', inset: '-10% 0', y }}>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80"
              alt="Retrato de José David"
              fill
              sizes="(max-width: 768px) 90vw, 600px"
              style={{
                objectFit     : 'cover',
                objectPosition: 'center top',
                filter        : 'grayscale(100%) contrast(1.05)',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Estadísticas en una línea, separadas por barras, monospace ── */}
      <div
        className="about-stats"
        style={{
          marginTop    : 'clamp(4rem, 10vh, 8rem)',
          display      : 'flex',
          flexWrap     : 'wrap',
          alignItems   : 'baseline',
          gap          : 'clamp(1rem, 3vw, 2.5rem)',
          fontFamily   : 'monospace',
        }}
      >
        {STATS.map(([num, label], i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(1rem, 3vw, 2.5rem)' }}>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{
                fontSize     : 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight   : 600,
                color        : '#ffffff',
                letterSpacing: '-0.02em',
              }}>
                {num}
              </span>
              <span style={{
                fontSize     : '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color        : '#71717a',
              }}>
                {label}
              </span>
            </span>
            {i < STATS.length - 1 && (
              <span style={{ color: '#3f3f46', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 200 }}>/</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
