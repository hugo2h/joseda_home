'use client';

import { memo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — "Cosmos" parallax drift
//
//  Las fotos NO se ordenan en una rejilla. Flotan dispersas por TODO el viewport
//  y DERIVAN hacia arriba a velocidades distintas según su profundidad (parallax)
//  mientras haces scroll — sensación de flotar por el espacio.
//
//  · Cada tarjeta tiene `depth` (0.3 lejos/lento … 1.4 cerca/rápido) que controla
//    velocidad de deriva, escala base, opacidad y z-index.
//  · Marcos blancos tipo foto impresa, fondo negro puro.
//  · Titulares centrados que hacen crossfade conforme avanza el relato.
//  · Drag libre en escritorio (desactivado en táctil para no romper el scroll).
//
//  Rendimiento: sticky CSS · will-change: transform · transforms numéricos en px
//  (interpolación barata) · React.memo en la tarjeta visual. CERO blur.
// ─────────────────────────────────────────────────────────────────────────────

interface Card {
  id   : string;
  image: string;
  x    : number;   // % horizontal del centro de la tarjeta
  y    : number;   // % vertical del centro (posición inicial)
  w    : number;   // ancho en vw
  depth: number;   // multiplicador de parallax / escala / z
  rot  : number;   // rotación base (deg)
  op   : number;   // opacidad base (profundidad atmosférica)
  ar   : string;   // aspect-ratio CSS
}

// Constelación dispersa por todo el viewport con variedad de profundidad.
const CARDS: Card[] = [
  { id: 'c1', image: '/images/pasado-1.jpg',            x: 13, y: 21, w: 12, depth: 0.50, rot:  -7, op: 0.62, ar: '4 / 5' },
  { id: 'c2', image: '/images/ponencia-1.jpg',          x: 85, y: 17, w: 15, depth: 0.80, rot:   6, op: 0.86, ar: '3 / 2' },
  { id: 'c3', image: '/images/pasado-2.jpg',            x: 25, y: 76, w: 11, depth: 1.10, rot:   5, op: 0.95, ar: '4 / 5' },
  { id: 'c4', image: '/images/ponencia-8.jpg',          x: 72, y: 80, w: 17, depth: 0.95, rot:  -5, op: 0.90, ar: '3 / 2' },
  { id: 'c5', image: '/images/ponencia-5.jpg',          x: 49, y: 58, w: 20, depth: 1.40, rot:   2, op: 1.00, ar: '4 / 5' },
  { id: 'c6', image: '/images/jose-david-contacto.jpg', x: 93, y: 60, w:  9, depth: 0.35, rot:   9, op: 0.50, ar: '4 / 5' },
  { id: 'c7', image: '/images/pasado-3.jpg',            x:  6, y: 60, w:  9, depth: 0.40, rot: -10, op: 0.55, ar: '3 / 4' },
  { id: 'c8', image: '/images/ponencia-10.jpg',         x: 63, y: 25, w: 10, depth: 0.55, rot:   4, op: 0.70, ar: '3 / 2' },
  { id: 'c9', image: '/images/ponencia-3.jpg',          x: 37, y: 13, w:  8, depth: 0.45, rot:  -4, op: 0.60, ar: '4 / 5' },
];

// Hitos del relato (titulares centrados con crossfade).
interface Beat { kicker: string; title: string[]; body: string; }
const BEATS: Beat[] = [
  { kicker: '02 — Sobre mí',    title: ['Una vida', 'en fotos.'],          body: 'Maestro, ingeniero y formador de docentes. Enseñar, para mí, es diseñar el futuro.' },
  { kicker: 'Trayectoria',      title: ['Del aula rural', 'al escenario.'], body: 'De la clase de un pueblo a una comunidad de docentes de toda España.' },
  { kicker: 'Impacto',          title: ['17 millones', 'de personas.'],     body: 'Mis contenidos y recursos han llegado a millones de docentes y familias.' },
  { kicker: 'Reconocimiento',   title: ['Google Innovator', '& Trainer.'],  body: 'Ponente nacional e internacional en educación e Inteligencia Artificial.' },
];

const stopLenis  = () => (window as unknown as { lenis?: { stop?:  () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const [vh, setVh]         = useState(900);
  const [canDrag, setCanDrag] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    setCanDrag(window.matchMedia('(pointer: fine)').matches);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '480vh', background: '#000000' }}
    >
      <div
        ref={stageRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* ① Constelación de fotos a la deriva */}
        {CARDS.map((card) => (
          <ParallaxCard
            key={card.id}
            card={card}
            vh={vh}
            canDrag={canDrag}
            progress={scrollYProgress}
            constraintsRef={stageRef}
          />
        ))}

        {/* ② Velo radial central para legibilidad del titular */}
        <div
          aria-hidden="true"
          style={{
            position      : 'absolute',
            inset         : 0,
            zIndex        : 30,
            pointerEvents : 'none',
            background    : 'radial-gradient(60vw 52vh at 50% 44%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* ③ Titulares del relato (crossfade) */}
        <div
          style={{
            position      : 'absolute',
            inset         : 0,
            zIndex        : 40,
            display       : 'flex',
            flexDirection : 'column',
            alignItems    : 'center',
            justifyContent: 'center',
            textAlign     : 'center',
            pointerEvents : 'none',
            padding       : '0 6vw',
          }}
        >
          {BEATS.map((beat, i) => (
            <BeatText key={i} beat={beat} index={i} total={BEATS.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* ④ Pista inferior */}
        <div
          style={{
            position     : 'absolute',
            left         : 0, right: 0, bottom: '3.5vh',
            zIndex       : 41,
            textAlign    : 'center',
            fontFamily   : 'monospace',
            fontSize     : '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color        : '#52525b',
            pointerEvents: 'none',
          }}
        >
          {canDrag ? 'Arrastra las fotos · scroll para la historia' : 'Scroll para la historia'}
        </div>
      </div>
    </section>
  );
}

// ─── Tarjeta con deriva parallax + drag ───────────────────────────────────────
function ParallaxCard({
  card, vh, canDrag, progress, constraintsRef,
}: {
  card          : Card;
  vh            : number;
  canDrag       : boolean;
  progress      : MotionValue<number>;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Deriva vertical: las cercanas (depth alto) suben más → parallax de profundidad.
  const travel = -card.depth * 0.42 * vh;
  const y      = useTransform(progress, [0, 1], [0, travel]);
  // Rotación a la deriva, sutil y dependiente de la profundidad.
  const rotate = useTransform(progress, [0, 1], [card.rot, card.rot + (card.depth - 0.7) * 7]);

  const zIndex = Math.round(card.depth * 10);

  return (
    <div style={{ position: 'absolute', left: `${card.x}%`, top: `${card.y}%`, zIndex }}>
      <motion.div
        data-cursor="drag"
        drag={canDrag}
        dragConstraints={constraintsRef}
        dragSnapToOrigin
        dragElastic={0.14}
        dragMomentum={false}
        onDragStart={stopLenis}
        onDragEnd={startLenis}
        whileDrag={{ scale: 1.07, zIndex: 60 }}
        style={{ cursor: canDrag ? 'grab' : 'default' }}
      >
        <motion.div style={{ y, rotate, willChange: 'transform' }}>
          <Frame card={card} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Marco blanco tipo foto impresa ───────────────────────────────────────────
const Frame = memo(function Frame({ card }: { card: Card }) {
  return (
    <div
      style={{
        transform : 'translate(-50%, -50%)',
        width     : `clamp(90px, ${card.w}vw, ${Math.round(card.w * 17)}px)`,
        opacity   : card.op,
        background: '#ffffff',
        padding   : '7px',
        boxShadow : '0 34px 80px rgba(0,0,0,0.92), 0 8px 22px rgba(0,0,0,0.55)',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          position   : 'relative',
          width      : '100%',
          aspectRatio: card.ar,
          overflow   : 'hidden',
          background : '#d4d4d4',
        }}
      >
        <Image
          src={card.image}
          alt=""
          fill
          quality={100}
          sizes="(max-width: 768px) 40vw, 22vw"
          draggable={false}
          style={{
            objectFit     : 'cover',
            objectPosition: 'center 25%',
            filter        : 'grayscale(100%) contrast(1.06)',
            pointerEvents : 'none',
          }}
        />
      </div>
    </div>
  );
});

// ─── Titular del relato (crossfade + leve deriva vertical) ────────────────────
function BeatText({
  beat, index, total, progress,
}: {
  beat    : Beat;
  index   : number;
  total   : number;
  progress: MotionValue<number>;
}) {
  const seg  = 1 / total;
  const s0   = index * seg;
  const s1   = s0 + seg;
  const fade = seg * 0.26;

  const opacity = useTransform(progress, [s0, s0 + fade, s1 - fade, s1], [0, 1, 1, 0]);
  const y       = useTransform(progress, [s0, s1], [40, -40]);

  return (
    <motion.div
      style={{
        position : 'absolute',
        opacity,
        y,
        maxWidth : '46ch',
        textShadow: '0 2px 40px rgba(0,0,0,0.9)',
      }}
    >
      <span style={{
        display      : 'block',
        fontFamily   : 'monospace',
        fontSize     : '0.72rem',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color        : '#a1a1aa',
        marginBottom : '1.1rem',
      }}>
        {beat.kicker}
      </span>

      <h2 style={{
        fontFamily   : 'var(--sans)',
        fontSize     : 'clamp(2.6rem, 7vw, 6.5rem)',
        fontWeight   : 800,
        letterSpacing: '-0.045em',
        lineHeight   : 0.92,
        color        : '#ffffff',
        margin       : 0,
      }}>
        {beat.title.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>{line}</span>
        ))}
      </h2>

      <p style={{
        margin    : '1.4rem auto 0',
        maxWidth  : '34ch',
        fontSize  : 'clamp(1rem, 1.4vw, 1.25rem)',
        lineHeight: 1.6,
        color     : 'rgba(255,255,255,0.80)',
      }}>
        {beat.body}
      </p>
    </motion.div>
  );
}
