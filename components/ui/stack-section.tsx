'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// StackSection — transición 3D estilo Apple/Tesla.
// La sección se ancla (sticky) mientras la siguiente sube y se superpone; al ser
// cubierta, la sección anterior retrocede en profundidad (scale + opacity).
// ─────────────────────────────────────────────────────────────────────────────
export default function StackSection({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Permanece a tamaño completo la mayor parte del recorrido; retrocede al final
  // (cuando la siguiente sección la cubre).
  const scale   = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4]);

  return (
    <div ref={ref} id={id} style={{ position: 'relative', minHeight: '150vh' }}>
      <motion.div
        style={{
          position       : 'sticky',
          top            : 0,
          minHeight      : '100vh',
          display        : 'flex',
          flexDirection  : 'column',
          justifyContent : 'center',
          background     : '#000000',
          borderTop      : '1px solid #18181b',
          overflow       : 'hidden',
          scale,
          opacity,
          transformOrigin: 'center top',
          willChange     : 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
