'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// MagicText — revelado palabra a palabra al hacer scroll (Aceternity style)
// Cada palabra pasa de tenue → brillante según el progreso de scroll.
// ─────────────────────────────────────────────────────────────────────────────
interface MagicTextProps {
  text  : string;
  accent?: string;
}

export function MagicText({ text, accent = 'var(--accent)' }: MagicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      style={{
        display       : 'flex',
        justifyContent: 'center',
        padding       : '14vh 6vw',
      }}
    >
      <p
        style={{
          display      : 'flex',
          flexWrap     : 'wrap',
          maxWidth     : '1100px',
          fontFamily   : 'var(--serif)',
          fontSize     : 'clamp(1.8rem, 5vw, 4.25rem)',
          fontWeight   : 300,
          lineHeight   : 1.18,
          letterSpacing: '-0.02em',
        }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end   = start + 1 / words.length;
          return (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[start, end]}
              accent={accent}
              highlight={/IA|Inteligencia|Artificial|tiempo|cambio/i.test(word)}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  highlight,
}: {
  children : string;
  progress : MotionValue<number>;
  range    : [number, number];
  accent   : string;
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const baseColor = highlight ? accent : '#ffffff';

  return (
    <span style={{ position: 'relative', marginRight: '0.28em', marginTop: '0.12em' }}>
      {/* Sombra tenue de fondo */}
      <span style={{ position: 'absolute', inset: 0, opacity: 0.12, color: baseColor }}>
        {children}
      </span>
      {/* Palabra que se ilumina */}
      <motion.span style={{ opacity, color: baseColor }}>
        {children}
      </motion.span>
    </span>
  );
}

export default MagicText;
