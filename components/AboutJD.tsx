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
// AboutJD — Experiencia de storytelling "Cosmos".
//
//  Fase A (flotación) · Las fotos caen al centro con rotaciones aleatorias y se
//                       pueden arrastrar libremente (drag + dragConstraints).
//  Fase B (relato)    · `useScroll` de Framer dirige el progreso: las fotos hacen
//                       SNAP a una cuadrícula 3×2 (tipo perfil de Instagram) y,
//                       una a una, pasan a protagonista mientras el texto aparece
//                       palabra a palabra (stagger). El resto se atenúa/desenfoca.
//
//  Rendimiento: sticky CSS (sin pin JS) + `will-change: transform` en las capas
//  animadas (GPU). next/image con `sizes` + `quality={100}`. La carta visual va
//  envuelta en React.memo para que el scroll del relato no la re-renderice.
//  Estrictamente B&N.
// ─────────────────────────────────────────────────────────────────────────────

interface Photo {
  id     : string;
  image  : string;
  kicker : string;
  caption: string;
  story  : string;
  gx: number; gy: number;                 // celda de la cuadrícula (% escenario)
  sx: number; sy: number; srot: number;   // dispersión inicial (% + rotación)
}

const PROTA = { x: 33, y: 50, scale: 1.72 };

const SNAP_START  = 0.14;
const SNAP_END    = 0.30;
const STORY_START = 0.34;
const STORY_END   = 0.96;

const PHOTOS: Photo[] = [
  { id: 'inicios',   image: '/images/pasado-1.jpg',            kicker: 'Capítulo 01', caption: 'Los inicios',            story: 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro.', gx: 22, gy: 36, sx: 30, sy: 40, srot: -8 },
  { id: 'rural',     image: '/images/pasado-2.jpg',            kicker: 'Capítulo 02', caption: 'Maestro rural',          story: 'Del aula de un pueblo a una comunidad de docentes de toda España.',                  gx: 36, gy: 36, sx: 55, sy: 28, srot:  6 },
  { id: 'escenario', image: '/images/ponencia-1.jpg',          kicker: 'Capítulo 03', caption: 'Sobre el escenario',     story: 'Ponente nacional e internacional en educación e Inteligencia Artificial.',           gx: 50, gy: 36, sx: 44, sy: 64, srot: -5 },
  { id: 'impacto',   image: '/images/ponencia-8.jpg',          kicker: 'Capítulo 04', caption: '17 millones de impacto', story: 'Mis contenidos y recursos han llegado a millones de docentes y familias.',           gx: 22, gy: 64, sx: 63, sy: 50, srot:  7 },
  { id: 'formacion', image: '/images/ponencia-5.jpg',          kicker: 'Capítulo 05', caption: 'Formando docentes',      story: 'Talleres y mentorías para equipos que quieren liderar el cambio en sus aulas.',      gx: 36, gy: 64, sx: 38, sy: 30, srot:  4 },
  { id: 'google',    image: '/images/jose-david-contacto.jpg', kicker: 'Capítulo 06', caption: 'Reconocimiento Google',  story: 'Google Certified Innovator & Trainer. Tecnología con propósito.',                     gx: 50, gy: 64, sx: 52, sy: 68, srot: -6 },
];

const stopLenis  = () => (window as unknown as { lenis?: { stop?:  () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [stage, setStage]     = useState({ w: 1280, h: 800 });

  // Progreso 0→1 dirigido por el scroll suave (Lenis mueve el window).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Entrada: dispara la "caída" al ver la sección.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Medir el escenario (100vw × 100vh) para offsets en px.
  useEffect(() => {
    const measure = () => setStage({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0]);
  const railScale    = useTransform(scrollYProgress, [STORY_START, STORY_END], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '640vh', background: '#000000' }}
    >
      {/* Escenario fijo (sticky CSS — sin pin JS, máximo rendimiento) */}
      <div
        ref={stageRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Intro */}
        <motion.div style={{ opacity: introOpacity }} className="about-intro">
          <p style={{
            fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#71717a', marginBottom: '1rem',
          }}>
            02 / Sobre mí
          </p>
          <h2 style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95,
            color: '#fff', marginBottom: '1.25rem',
          }}>
            Una vida en fotos.
          </h2>
          <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.1em', color: '#52525b' }}>
            Arrastra las fotos · haz scroll para revivir la historia
          </p>
        </motion.div>

        {/* Capa de fotos (flotación → grid → protagonista) */}
        {PHOTOS.map((photo, i) => (
          <PhotoLayer
            key={photo.id}
            photo={photo}
            index={i}
            total={PHOTOS.length}
            progress={scrollYProgress}
            stage={stage}
            entered={entered}
            constraintsRef={stageRef}
          />
        ))}

        {/* Capa de texto (storytelling con stagger) */}
        {PHOTOS.map((photo, i) => (
          <StoryText key={photo.id} photo={photo} index={i} total={PHOTOS.length} progress={scrollYProgress} />
        ))}

        {/* Línea-guía de progreso del relato */}
        <div className="about-rail" aria-hidden="true">
          <motion.div className="about-rail__fill" style={{ scaleY: railScale }} />
        </div>
      </div>
    </section>
  );
}

// ─── Carta visual (memoizada: depende solo de `photo`, no del scroll) ──────────
const PhotoCard = memo(function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div style={{ transform: 'translate(-50%, -50%)', width: 'clamp(110px, 12vw, 178px)' }}>
      <div style={{ background: '#fff', padding: '0.6rem 0.6rem 1.9rem', boxShadow: '0 24px 55px rgba(0,0,0,0.65)' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5' }}>
          <Image
            src={photo.image}
            alt={photo.caption}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
            style={{ objectFit: 'cover', filter: 'grayscale(100%)', pointerEvents: 'none' }}
          />
        </div>
        <p style={{
          fontFamily: 'monospace', fontSize: '0.62rem', letterSpacing: '0.04em',
          color: '#111', textAlign: 'center', marginTop: '0.55rem',
        }}>
          {photo.caption}
        </p>
      </div>
    </div>
  );
});

// ─── Foto: caída + drag + snap-to-grid + protagonista ──────────────────────────
function PhotoLayer({
  photo, index, total, progress, stage, entered, constraintsRef,
}: {
  photo         : Photo;
  index         : number;
  total         : number;
  progress      : MotionValue<number>;
  stage         : { w: number; h: number };
  entered       : boolean;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const seg = (STORY_END - STORY_START) / total;
  const s0  = STORY_START + index * seg;
  const s1  = s0 + seg;
  const f   = seg * 0.3;

  const dxS = ((photo.sx - photo.gx) / 100) * stage.w;
  const dyS = ((photo.sy - photo.gy) / 100) * stage.h;
  const dxP = ((PROTA.x  - photo.gx) / 100) * stage.w;
  const dyP = ((PROTA.y  - photo.gy) / 100) * stage.h;

  const x = useTransform(progress,
    [0, SNAP_START, SNAP_END, s0, s0 + f, s1 - f, s1, 1],
    [dxS, dxS, 0, 0, dxP, dxP, 0, 0]);
  const y = useTransform(progress,
    [0, SNAP_START, SNAP_END, s0, s0 + f, s1 - f, s1, 1],
    [dyS, dyS, 0, 0, dyP, dyP, 0, 0]);
  const rotate = useTransform(progress,
    [0, SNAP_START, SNAP_END, 1],
    [photo.srot, photo.srot, 0, 0]);
  const scale = useTransform(progress,
    [0, SNAP_END, s0, s0 + f, s1 - f, s1, 1],
    [1, 1, 1, PROTA.scale, PROTA.scale, 1, 1]);
  const opacity = useTransform(progress,
    [0, SNAP_END, STORY_START, s0, s0 + f, s1 - f, s1, 1],
    [1, 1, 0.16, 0.16, 1, 1, 0.16, 0.16]);
  const blurPx = useTransform(progress,
    [0, SNAP_END, STORY_START, s0, s0 + f, s1 - f, s1, 1],
    [0, 0, 2, 2, 0, 0, 2, 2]);
  const filter  = useTransform(blurPx, (b) => `grayscale(100%) blur(${b}px)`);
  const zIndex  = useTransform(progress, [s0, (s0 + s1) / 2, s1], [2, 40, 2]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={entered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 90, damping: 14 }}
      style={{ position: 'absolute', left: `${photo.gx}%`, top: `${photo.gy}%`, zIndex }}
    >
      {/* Drag libre con retorno elástico al sitio */}
      <motion.div
        data-cursor="drag"
        drag
        dragConstraints={constraintsRef}
        dragSnapToOrigin
        dragElastic={0.18}
        dragMomentum={false}
        onDragStart={stopLenis}
        onDragEnd={startLenis}
        whileDrag={{ scale: 1.06, zIndex: 60 }}
        style={{ cursor: 'grab' }}
      >
        {/* Animación de scroll (snap / protagonista) — en GPU */}
        <motion.div style={{ x, y, rotate, scale, opacity, filter, willChange: 'transform, filter' }}>
          <PhotoCard photo={photo} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Texto del relato (fade-in + stagger palabra a palabra) ────────────────────
const wordsContainer = {
  hidden: {},
  show  : { transition: { staggerChildren: 0.045 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  show  : { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
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
  const f   = seg * 0.28;

  const opacity = useTransform(progress, [s0, s0 + f, s1 - f, s1], [0, 1, 1, 0]);
  const y       = useTransform(progress, [s0, s1], [44, -44]);

  // Activo cuando el progreso entra en el segmento → dispara el stagger.
  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => {
    const isIn = v >= s0 && v <= s1;
    setActive((prev) => (prev === isIn ? prev : isIn));
  });

  const words = photo.story.split(' ');

  return (
    <motion.div className="about-story" style={{ opacity, y }}>
      <span style={{
        fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#a1a1aa',
      }}>
        {photo.kicker}
      </span>
      <h3 style={{
        fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4.5vw, 4rem)',
        fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
        color: '#fff', margin: '0.9rem 0 1.1rem',
      }}>
        {photo.caption}
      </h3>
      <motion.p
        variants={wordsContainer}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', lineHeight: 1.6,
          color: 'rgba(255,255,255,0.78)', maxWidth: '34ch',
        }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.28em' }}>
            {w}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
