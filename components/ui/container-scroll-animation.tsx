'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// ContainerScroll — tarjeta 3D que se endereza al hacer scroll (Aceternity style)
// ─────────────────────────────────────────────────────────────────────────────
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children      : ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scaleDimensions = (): [number, number] => (isMobile ? [0.8, 0.95] : [1.04, 1]);

  const rotate    = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div
      ref={containerRef}
      style={{
        height        : isMobile ? '90vh' : '110vh',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        position       : 'relative',
        padding        : isMobile ? '2rem 0' : '4rem 0',
      }}
    >
      <div
        style={{
          width      : '100%',
          position   : 'relative',
          perspective : '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  titleComponent,
}: {
  translate     : MotionValue<number>;
  titleComponent: ReactNode;
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
        maxWidth  : '1100px',
        margin    : '0 auto',
        textAlign : 'center',
        marginBottom: '2.5rem',
      }}
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate   : MotionValue<number>;
  scale    : MotionValue<number>;
  translate: MotionValue<number>;
  children : ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX     : rotate,
        scale,
        boxShadow   :
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        maxWidth     : '1100px',
        margin       : '0 auto',
        height       : 'clamp(22rem, 60vh, 40rem)',
        width        : '90%',
        borderRadius : '1.75rem',
        padding      : '0.5rem',
        background   : 'linear-gradient(180deg, rgba(56,189,248,0.12), rgba(255,255,255,0.04))',
        border       : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          height      : '100%',
          width       : '100%',
          overflow    : 'hidden',
          borderRadius : '1.4rem',
          background   : '#0a0a0f',
          position     : 'relative',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default ContainerScroll;
