'use client';

import { memo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — "Cosmos" full-viewport storytelling
//
//  Fase A  · 6 fotos GRANDES dispersas por TODO el viewport (no esquina).
//            Drag libre. Entrada con animación de "caída" escalonada.
//  Fase B  · Las fotos caen y hacen snap a una cuadrícula 3×2 que ocupa
//            TODA la pantalla (efecto galería full-screen, no widget).
//  Fase C  · Una foto a la vez se convierte en protagonista (izquierda,
//            escala real) mientras el texto del relato aparece a la derecha
//            palabra a palabra.
//
//  Rendimiento: sticky CSS · will-change: transform · opacity (sin blur).
//  Fotos: clamp(220px, 28vw, 420px) — sin marco polaroid, full-bleed.
// ─────────────────────────────────────────────────────────────────────────────

interface Photo {
  id: string; image: string; kicker: string; caption: string; story: string;
  sx: number; sy: number; srot: number;
}

// ── Cuadrícula 3×2 a PANTALLA COMPLETA ──────────────────────────────────────
// Columnas: izquierda (16.5%), centro (50%), derecha (83.5%)
// Filas: superior (23%), inferior (67%)
const GRID_COLS = [16.5, 50, 83.5];
const GRID_ROWS = [23, 67];

const PHOTOS: Photo[] = [
  { id: 'inicios',   image: '/images/pasado-1.jpg',            kicker: 'Capítulo 01', caption: 'Los inicios',            story: 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro.',  sx:  8, sy: 10, srot:  -9 },
  { id: 'rural',     image: '/images/pasado-2.jpg',            kicker: 'Capítulo 02', caption: 'Maestro rural',          story: 'Del aula de un pueblo a una comunidad de docentes de toda España.',                   sx: 55, sy:  6, srot:   6 },
  { id: 'escenario', image: '/images/ponencia-1.jpg',          kicker: 'Capítulo 03', caption: 'Sobre el escenario',     story: 'Ponente nacional e internacional en educación e Inteligencia Artificial.',            sx: 84, sy: 14, srot:  -5 },
  { id: 'impacto',   image: '/images/ponencia-8.jpg',          kicker: 'Capítulo 04', caption: '17 millones de impacto', story: 'Mis contenidos y recursos han llegado a millones de docentes y familias.',            sx:  9, sy: 62, srot:   7 },
  { id: 'formacion', image: '/images/ponencia-5.jpg',          kicker: 'Capítulo 05', caption: 'Formando docentes',      story: 'Talleres y mentorías para equipos que quieren liderar el cambio en sus aulas.',       sx: 46, sy: 72, srot:  -3 },
  { id: 'google',    image: '/images/jose-david-contacto.jpg', kicker: 'Capítulo 06', caption: 'Reconocimiento Google',  story: 'Google Certified Innovator & Trainer. Tecnología con propósito.',                      sx: 80, sy: 76, srot:   5 },
];

const GRID_POS = PHOTOS.map((_, i) => ({
  gx: GRID_COLS[i % 3],
  gy: GRID_ROWS[Math.floor(i / 3)],
}));

// Protagonista: lado izquierdo del viewport, escala real (1.0).
// Las fotos ya son grandes — no hace falta escalar más.
const PROTA = { x: 25, y: 44, scale: 1.05 };

// Ventanas de snap escalonadas (foto por foto)
const snapStart = (i: number) => 0.13 + i * 0.04;
const snapEnd   = (i: number) => snapStart(i) + 0.08;

const STORY_START = 0.44;
const STORY_END   = 0.97;

const stopLenis  = () => (window as unknown as { lenis?: { stop?:  () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [stage, setStage]     = useState({ w: 1440, h: 900 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.08 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const m = () => setStage({ w: window.innerWidth, h: window.innerHeight });
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  const introOpacity  = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]);
  const gridOpacity   = useTransform(scrollYProgress, [0.12, 0.30], [0, 1]);
  const railScale     = useTransform(scrollYProgress, [STORY_START, STORY_END], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '800vh', background: '#000000' }}
    >
      <div
        ref={stageRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* ① Texto de intro */}
        <motion.div style={{ opacity: introOpacity }} className="about-intro">
          <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#71717a', marginBottom: '0.9rem' }}>
            02 / Sobre mí
          </p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff', marginBottom: '1.1rem' }}>
            Una vida en fotos.
          </h2>
          <p style={{ fontFamily: 'monospace', fontSize: '0.78rem', letterSpacing: '0.1em', color: '#52525b' }}>
            Arrastra · haz scroll para la historia
          </p>
        </motion.div>

        {/* ② Contornos del grid (pantalla completa) */}
        <motion.div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, opacity: gridOpacity, pointerEvents: 'none' }}
        >
          {GRID_POS.map((pos, i) => (
            <GridOutline key={i} gx={pos.gx} gy={pos.gy} />
          ))}
        </motion.div>

        {/* ③ Fotos grandes dispersas → grid → protagonista */}
        {PHOTOS.map((photo, i) => (
          <PhotoLayer
            key={photo.id}
            photo={photo}
            index={i}
            total={PHOTOS.length}
            gridPos={GRID_POS[i]}
            progress={scrollYProgress}
            stage={stage}
            entered={entered}
            constraintsRef={stageRef}
          />
        ))}

        {/* ④ Texto del relato */}
        {PHOTOS.map((photo, i) => (
          <StoryText
            key={photo.id}
            photo={photo}
            index={i}
            total={PHOTOS.length}
            progress={scrollYProgress}
          />
        ))}

        {/* ⑤ Barra de progreso */}
        <div className="about-rail" aria-hidden="true">
          <motion.div className="about-rail__fill" style={{ scaleY: railScale }} />
        </div>
      </div>
    </section>
  );
}

// ─── Contorno de celda del grid ───────────────────────────────────────────────
// Dimensiones aproximadas del polaroid: width × (ancho*1.25 + 48px strip)
// ≈ 3 : 4 con el strip extra de la franja inferior.
const GridOutline = memo(function GridOutline({ gx, gy }: { gx: number; gy: number }) {
  return (
    <div
      style={{
        position      : 'absolute',
        left          : `${gx}%`,
        top           : `${gy}%`,
        transform     : 'translate(-50%, -50%)',
        width         : 'clamp(170px, 19vw, 290px)',
        aspectRatio   : '3 / 4',
        border        : '1px solid rgba(255,255,255,0.08)',
        background    : 'rgba(255,255,255,0.02)',
      }}
    />
  );
});

// ─── Foto: caída + drag + snap a grid + protagonista ─────────────────────────
function PhotoLayer({
  photo, index, total, gridPos, progress, stage, entered, constraintsRef,
}: {
  photo         : Photo;
  index         : number;
  total         : number;
  gridPos       : { gx: number; gy: number };
  progress      : MotionValue<number>;
  stage         : { w: number; h: number };
  entered       : boolean;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const seg = (STORY_END - STORY_START) / total;
  const s0  = STORY_START + index * seg;
  const s1  = s0 + seg;
  const f   = seg * 0.28;
  const ss  = snapStart(index);
  const se  = snapEnd(index);

  const dxS = ((photo.sx  - gridPos.gx) / 100) * stage.w;
  const dyS = ((photo.sy  - gridPos.gy) / 100) * stage.h;
  const dxP = ((PROTA.x   - gridPos.gx) / 100) * stage.w;
  const dyP = ((PROTA.y   - gridPos.gy) / 100) * stage.h;

  const x = useTransform(progress,
    [0,   ss,  se, s0,  s0 + f, s1 - f, s1, 1],
    [dxS, dxS,  0,  0,    dxP,    dxP,  0,  0]);
  const y = useTransform(progress,
    [0,   ss,  se, s0,  s0 + f, s1 - f, s1, 1],
    [dyS, dyS,  0,  0,    dyP,    dyP,  0,  0]);
  const rotate = useTransform(progress,
    [0,          ss,          se, 1],
    [photo.srot, photo.srot,   0, 0]);
  const scale = useTransform(progress,
    [0,  se, s0,  s0 + f,     s1 - f,     s1, 1],
    [1,   1,  1, PROTA.scale, PROTA.scale,  1,  1]);

  // Inactiva: opacity 0.18 (dramático contraste vs protagonista).
  const opacity = useTransform(progress,
    [0,  se, s0 - 0.02, s0,  s0 + f, s1 - f, s1,  1],
    [1,   1,       0.18, 0.18,     1,       1, 0.18, 0.18]);

  const zIndex = useTransform(progress, [s0, (s0 + s1) / 2, s1], [2, 50, 2]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={entered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 + index * 0.1, type: 'spring', stiffness: 75, damping: 14 }}
      style={{ position: 'absolute', left: `${gridPos.gx}%`, top: `${gridPos.gy}%`, zIndex }}
    >
      <motion.div
        data-cursor="drag"
        drag
        dragConstraints={constraintsRef}
        dragSnapToOrigin
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={stopLenis}
        onDragEnd={startLenis}
        whileDrag={{ scale: 1.06, zIndex: 60 }}
        style={{ cursor: 'grab' }}
      >
        <motion.div style={{ x, y, rotate, scale, opacity, willChange: 'transform, opacity' }}>
          <PhotoCard photo={photo} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Foto: marco polaroid (fondo blanco, borde superior/lateral fino, franja inferior para pie) ──
const PhotoCard = memo(function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div
      style={{
        transform  : 'translate(-50%, -50%)',
        width      : 'clamp(170px, 19vw, 290px)',
        willChange : 'transform',
        background : '#ffffff',
        padding    : '10px 10px 38px',
        boxShadow  : '0 36px 90px rgba(0,0,0,0.95), 0 8px 24px rgba(0,0,0,0.55)',
      }}
    >
      <div
        style={{
          position  : 'relative',
          width     : '100%',
          aspectRatio: '4 / 5',
          overflow  : 'hidden',
          background: '#d4d4d4',
        }}
      >
        <Image
          src={photo.image}
          alt={photo.caption}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 26vw"
          draggable={false}
          style={{
            objectFit     : 'cover',
            objectPosition: 'center 20%',
            filter        : 'grayscale(100%) contrast(1.08)',
            pointerEvents : 'none',
          }}
        />
      </div>
      {/* Pie de foto — franja blanca inferior estilo polaroid */}
      <p style={{
        fontFamily   : 'monospace',
        fontSize     : '0.56rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color        : '#7a7a7a',
        textAlign    : 'center',
        marginTop    : '10px',
        lineHeight   : 1.2,
        userSelect   : 'none',
        overflow     : 'hidden',
        whiteSpace   : 'nowrap',
        textOverflow : 'ellipsis',
      }}>
        {photo.caption}
      </p>
    </div>
  );
});

// ─── Texto del relato: stagger palabra a palabra ──────────────────────────────
const wordsContainer = {
  hidden: {},
  show  : { transition: { staggerChildren: 0.046 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 16 },
  show  : { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const } },
};

function StoryText({
  photo, index, total, progress,
}: {
  photo   : Photo;
  index   : number;
  total   : number;
  progress: MotionValue<number>;
}) {
  const seg = (STORY_END - STORY_START) / total;
  const s0  = STORY_START + index * seg;
  const s1  = s0 + seg;
  const f   = seg * 0.26;

  const opacity = useTransform(progress, [s0, s0 + f, s1 - f, s1], [0, 1, 1, 0]);
  const y       = useTransform(progress, [s0, s1], [36, -36]);

  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => {
    const isIn = v >= s0 && v <= s1;
    setActive((prev) => (prev === isIn ? prev : isIn));
  });

  const words = photo.story.split(' ');

  return (
    <motion.div className="about-story" style={{ opacity, y }}>
      <span style={{
        display: 'block', fontFamily: 'monospace', fontSize: '0.72rem',
        letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a1a1aa',
        marginBottom: '0.7rem',
      }}>
        {photo.kicker}
      </span>
      <h3 style={{
        fontFamily   : 'var(--sans)',
        fontSize     : 'clamp(2rem, 4.5vw, 4.5rem)',
        fontWeight   : 800,
        letterSpacing: '-0.04em',
        lineHeight   : 1,
        color        : '#fff',
        margin       : '0 0 1.2rem',
      }}>
        {photo.caption}
      </h3>
      <motion.p
        variants={wordsContainer}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        style={{
          fontSize : 'clamp(1rem, 1.4vw, 1.25rem)',
          lineHeight: 1.65,
          color    : 'rgba(255,255,255,0.78)',
          maxWidth : '30ch',
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {w}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
