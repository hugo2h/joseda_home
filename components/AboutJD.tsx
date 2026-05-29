'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — Canvas interactivo "Cosmos / Instagram Board".
// Mesa de fotos polaroid arrastrables (física de drag); al hacer scroll, cada
// foto se enfoca de cerca junto a su historia mientras el resto se difumina.
// Estrictamente B&N.
// ─────────────────────────────────────────────────────────────────────────────
interface Photo {
  id     : string;
  image  : string;
  kicker : string;
  caption: string;
  story  : string;
  x      : number;   // % left inicial
  y      : number;   // % top inicial
  rotate : number;   // rotación base
}

const PHOTOS: Photo[] = [
  { id: 'inicios',   image: '/images/pasado-1.jpg',           kicker: 'Capítulo 01', caption: 'Los inicios',            story: 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro.',          x: 8,  y: 20, rotate: -7 },
  { id: 'rural',     image: '/images/pasado-2.jpg',           kicker: 'Capítulo 02', caption: 'Maestro rural',          story: 'Del aula de un pueblo a una comunidad de docentes de toda España.',                            x: 67, y: 13, rotate:  5 },
  { id: 'escenario', image: '/jd-ponente.jpg',                kicker: 'Capítulo 03', caption: 'Sobre el escenario',     story: 'Ponente nacional e internacional en educación e Inteligencia Artificial.',                     x: 23, y: 50, rotate:  4 },
  { id: 'impacto',   image: '/images/ponencia-8.jpg',         kicker: 'Capítulo 04', caption: '17 millones de impacto', story: 'Mis contenidos y recursos han llegado a millones de docentes y familias.',                     x: 73, y: 49, rotate: -5 },
  { id: 'formacion', image: '/jd-formacion.jpg',              kicker: 'Capítulo 05', caption: 'Formando docentes',      story: 'Talleres y mentorías para equipos que quieren liderar el cambio en sus aulas.',                x: 45, y: 28, rotate: -3 },
  { id: 'google',    image: '/images/jose-david-contacto.jpg', kicker: 'Capítulo 06', caption: 'Reconocimiento Google',  story: 'Google Certified Innovator & Trainer. Tecnología con propósito.',                               x: 54, y: 60, rotate:  6 },
];

const stopLenis  = () => (window as unknown as { lenis?: { stop?: () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const deskRef    = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // El tablero se difumina y atenúa al pasar de la zona de juego a la narrativa
  const boardOpacity = useTransform(scrollYProgress, [0.12, 0.22], [1, 0.18]);
  const blurPx       = useTransform(scrollYProgress, [0.12, 0.22], [0, 7]);
  const boardFilter  = useTransform(blurPx, (b) => `grayscale(100%) blur(${b}px)`);
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const focusOpacity = useTransform(scrollYProgress, [0.16, 0.24], [0, 1]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position  : 'relative',
        height    : `${40 + PHOTOS.length * 62}vh`,
        background: '#000000',
      }}
    >
      {/* ── Mesa fija ── */}
      <div
        ref={deskRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Intro */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="about-intro"
        >
          <p style={{
            fontFamily   : 'monospace',
            fontSize     : '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color        : '#71717a',
            marginBottom : '1rem',
          }}>
            02 / Sobre mí
          </p>
          <h2 style={{
            fontFamily   : 'var(--sans)',
            fontSize     : 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight   : 800,
            letterSpacing: '-0.045em',
            lineHeight   : 0.95,
            color        : '#fff',
            marginBottom : '1.25rem',
          }}>
            Una vida en fotos.
          </h2>
          <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.1em', color: '#52525b' }}>
            Arrastra las fotos · haz scroll para revivir la historia
          </p>
        </motion.div>

        {/* Tablero de polaroids arrastrables */}
        <motion.div
          style={{ position: 'absolute', inset: 0, opacity: boardOpacity, filter: boardFilter }}
        >
          {PHOTOS.map((photo, i) => (
            <Polaroid key={photo.id} photo={photo} index={i} entered={entered} deskRef={deskRef} />
          ))}
        </motion.div>

        {/* Capa de enfoque narrativo (scroll) */}
        <motion.div
          style={{ position: 'absolute', inset: 0, opacity: focusOpacity, pointerEvents: 'none' }}
        >
          {PHOTOS.map((photo, i) => (
            <FocusItem key={photo.id} photo={photo} index={i} total={PHOTOS.length} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Polaroid arrastrable ──────────────────────────────────────────────────────
function Polaroid({
  photo,
  index,
  entered,
  deskRef,
}: {
  photo  : Photo;
  index  : number;
  entered: boolean;
  deskRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      data-cursor="drag"
      drag
      dragConstraints={deskRef}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={stopLenis}
      onDragEnd={startLenis}
      initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
      animate={entered ? { opacity: 1, scale: 1, rotate: photo.rotate } : {}}
      transition={{ delay: 0.15 + index * 0.12, type: 'spring', stiffness: 110, damping: 13 }}
      whileDrag={{ scale: 1.07, zIndex: 50 }}
      style={{
        position  : 'absolute',
        left      : `${photo.x}%`,
        top       : `${photo.y}%`,
        width     : 'clamp(140px, 15vw, 230px)',
        cursor    : 'grab',
        zIndex    : 10,
        willChange: 'transform',
      }}
    >
      <div style={{
        background: '#ffffff',
        padding   : '0.7rem 0.7rem 2.2rem',
        boxShadow : '0 24px 55px rgba(0,0,0,0.65)',
      }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5' }}>
          <Image
            src={photo.image}
            alt={photo.caption}
            fill
            sizes="230px"
            draggable={false}
            style={{ objectFit: 'cover', filter: 'grayscale(100%)', pointerEvents: 'none' }}
          />
        </div>
        <p style={{
          fontFamily   : 'monospace',
          fontSize     : '0.7rem',
          letterSpacing: '0.04em',
          color        : '#111111',
          textAlign    : 'center',
          marginTop    : '0.65rem',
        }}>
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Foto enfocada + historia (driven by scroll) ──────────────────────────────
function FocusItem({
  photo,
  index,
  total,
  progress,
}: {
  photo   : Photo;
  index   : number;
  total   : number;
  progress: MotionValue<number>;
}) {
  const seg   = 0.8 / total;
  const start = 0.2 + index * seg;
  const end   = start + seg;
  const fade  = seg * 0.3;

  const opacity = useTransform(progress, [start, start + fade, end - fade, end], [0, 1, 1, 0]);
  const y       = useTransform(progress, [start, end], [50, -50]);

  return (
    <motion.div
      className="about-focus"
      style={{
        position      : 'absolute',
        inset         : 0,
        opacity,
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        gap           : 'clamp(2rem, 5vw, 5rem)',
        padding       : '0 6vw',
      }}
    >
      {/* Foto grande (polaroid des-rotada) */}
      <motion.div style={{ y, position: 'relative', flexShrink: 0 }}>
        <div style={{
          background: '#ffffff',
          padding   : '0.9rem 0.9rem 3rem',
          boxShadow : '0 30px 70px rgba(0,0,0,0.7)',
        }}>
          <div style={{ position: 'relative', width: 'min(38vw, 420px)', aspectRatio: '4 / 5' }}>
            <Image
              src={photo.image}
              alt={photo.caption}
              fill
              sizes="420px"
              style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>
          <p style={{
            fontFamily   : 'monospace',
            fontSize     : '0.8rem',
            letterSpacing: '0.05em',
            color        : '#111111',
            textAlign    : 'center',
            marginTop    : '0.9rem',
          }}>
            {photo.caption}
          </p>
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div style={{ y, maxWidth: '38ch' }}>
        <span style={{
          fontFamily   : 'monospace',
          fontSize     : '0.75rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color        : '#a1a1aa',
        }}>
          {photo.kicker}
        </span>
        <h3 style={{
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2rem, 5vw, 4.5rem)',
          fontWeight   : 800,
          letterSpacing: '-0.04em',
          lineHeight   : 1,
          color        : '#ffffff',
          margin       : '1rem 0 1.25rem',
        }}>
          {photo.caption}
        </h3>
        <p style={{
          fontSize  : 'clamp(1rem, 1.6vw, 1.35rem)',
          lineHeight: 1.6,
          color     : 'rgba(255,255,255,0.78)',
        }}>
          {photo.story}
        </p>
      </motion.div>
    </motion.div>
  );
}
