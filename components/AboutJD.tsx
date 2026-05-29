'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — Scroll Storytelling lineal (estilo Apple).
// Retrato fijo (sticky) en el centro; los bloques de texto entran y salen con
// fade mientras se hace scroll, creando un viaje narrativo inmersivo. B&N.
// ─────────────────────────────────────────────────────────────────────────────
const STORY: { kicker: string; title: string; text: string }[] = [
  {
    kicker: '02 / Sobre mí',
    title : 'De maestro rural a ingeniero',
    text  : 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro. Esa convicción me llevó a unir la pedagogía con la ingeniería.',
  },
  {
    kicker: 'Impacto',
    title : 'Más de 17 millones de impacto',
    text  : 'Mis recursos, formaciones y contenidos han llegado a millones de docentes y familias, transformando la forma en que se enseña con tecnología.',
  },
  {
    kicker: 'Propósito',
    title : 'Tecnología con propósito',
    text  : 'Ayudo a docentes a integrar la Inteligencia Artificial para recuperar su tiempo, mejorar su enseñanza y liderar el cambio en las aulas.',
  },
];

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Sutil zoom del retrato durante todo el recorrido
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        height  : `${STORY.length * 100}vh`,
        background: '#000000',
      }}
    >
      {/* ── Retrato fijo centrado ── */}
      <div style={{
        position      : 'sticky',
        top           : 0,
        height        : '100vh',
        overflow      : 'hidden',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
      }}>
        <motion.div style={{ position: 'absolute', inset: 0, scale: imgScale }}>
          <Image
            src="/images/jose-david-contacto.jpg"
            alt="José David Pérez Ibáñez"
            fill
            sizes="100vw"
            priority
            style={{
              objectFit     : 'cover',
              objectPosition: 'center 18%',
              filter        : 'grayscale(100%) contrast(1.05) brightness(0.55)',
            }}
          />
        </motion.div>

        {/* Velo para legibilidad */}
        <div aria-hidden="true" style={{
          position  : 'absolute',
          inset     : 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* ── Bloques narrativos superpuestos ── */}
        <div style={{
          position  : 'relative',
          zIndex    : 1,
          width     : '100%',
          maxWidth  : '1100px',
          padding   : '0 6vw',
          textAlign : 'center',
        }}>
          {STORY.map((block, i) => (
            <StoryBlock
              key={block.title}
              progress={scrollYProgress}
              index={i}
              total={STORY.length}
            >
              <span style={{
                fontFamily   : 'monospace',
                fontSize     : '0.75rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color        : '#a1a1aa',
              }}>
                {block.kicker}
              </span>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.5rem, 8vw, 7rem)',
                fontWeight   : 800,
                letterSpacing: '-0.045em',
                lineHeight   : 0.98,
                color        : '#ffffff',
                margin       : '1.25rem 0 1.5rem',
              }}>
                {block.title}
              </h2>
              <p style={{
                fontSize  : 'clamp(1.05rem, 2vw, 1.5rem)',
                lineHeight: 1.6,
                color     : 'rgba(255,255,255,0.8)',
                maxWidth  : '40ch',
                margin    : '0 auto',
              }}>
                {block.text}
              </p>
            </StoryBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bloque que aparece y desaparece según el progreso de scroll ───────────────
function StoryBlock({
  children,
  progress,
  index,
  total,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  index   : number;
  total   : number;
}) {
  const seg   = 1 / total;
  const start = index * seg;
  const end   = start + seg;
  const fade  = seg * 0.28;

  const opacity = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [60, 0, 0, -60],
  );

  return (
    <div
      style={{
        position : 'absolute',
        left     : 0,
        right    : 0,
        top      : '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <motion.div style={{ opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
}
