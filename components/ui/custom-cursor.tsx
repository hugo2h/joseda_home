'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// CustomCursor — cursor personalizado monocromo.
// · Punto fino que sigue al ratón con un ligero retraso (spring).
// · Al pasar sobre elementos [data-cursor="drag"] (las fotos del Sobre Mí),
//   se expande a un disco con la etiqueta "DRAG".
// · Sobre enlaces / botones se expande a un anillo sutil.
// Se desactiva en dispositivos táctiles (sin puntero fino).
// ─────────────────────────────────────────────────────────────────────────────
type Variant = 'default' | 'drag' | 'link';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [visible, setVisible] = useState(false);

  // Posición cruda → spring para suavizado
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    // Solo en punteros finos (ratón / trackpad)
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor="drag"]'))      setVariant('drag');
      else if (target?.closest('a, button, [role="button"]')) setVariant('link');
      else                                               setVariant('default');
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const isDrag = variant === 'drag';
  const isLink = variant === 'link';

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position      : 'fixed',
        top           : 0,
        left          : 0,
        x             : sx,
        y             : sy,
        translateX     : '-50%',
        translateY     : '-50%',
        zIndex        : 9999,
        pointerEvents : 'none',
        mixBlendMode  : isDrag ? 'normal' : 'difference',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{
          width      : isDrag ? 72 : isLink ? 44 : 10,
          height     : isDrag ? 72 : isLink ? 44 : 10,
          background : isDrag ? '#ffffff' : isLink ? 'transparent' : '#ffffff',
          border     : isLink ? '1px solid #ffffff' : '1px solid transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          borderRadius  : '50%',
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          {isDrag && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily   : 'monospace',
                fontSize     : '0.6rem',
                fontWeight   : 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color        : '#000000',
              }}
            >
              Drag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
