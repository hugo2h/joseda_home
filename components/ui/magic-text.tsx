'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// MagicText — revelado palabra a palabra al hacer scroll.
// Monocromo: cada palabra pasa de zinc-800 (#27272a) → blanco puro.
// Tipografía gigante, peso black, tracking negativo.
// ─────────────────────────────────────────────────────────────────────────────
interface MagicTextProps {
  text: string;
}

export function MagicText({ text }: MagicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.2'],
  });

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      style={{
        display       : 'flex',
        justifyContent: 'flex-start',
        padding       : 'clamp(8rem, 22vh, 16rem) 6vw',
      }}
    >
      <p
        style={{
          display      : 'flex',
          flexWrap     : 'wrap',
          maxWidth     : '1400px',
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2.2rem, 6.5vw, 6rem)',
          fontWeight   : 800,
          lineHeight   : 1.05,
          letterSpacing: '-0.045em',
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
}: {
  children: string;
  progress: MotionValue<number>;
  range   : [number, number];
}) {
  const color = useTransform(progress, range, ['#27272a', '#ffffff']);

  return (
    <motion.span style={{ marginRight: '0.28em', marginTop: '0.05em', color }}>
      {children}
    </motion.span>
  );
}

export default MagicText;
