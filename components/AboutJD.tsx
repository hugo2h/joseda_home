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
// AboutJD — Storytelling Cosmos / "Instagram Grid Drop"
//
//  Fase A  · Fotos dispersas en la parte superior, arrastrables (drag).
//  Fase B  · Al hacer scroll, las fotos caen una a una al grid (efecto snap).
//            Un perfil B&N de Instagram aparece sobre el grid.
//  Fase C  · Cada foto es "recogida" del grid y ampliada a protagonista;
//            el texto de la historia aparece palabra a palabra al lado.
//
//  Rendimiento:
//  • Sticky CSS puro (sin pin JS).
//  • will-change: transform en todas las capas animadas (GPU).
//  • CERO filter:blur — las fotos inactivas usan opacity 0.6→1.
//  • React.memo en PhotoCard e InstagramHeader (sin re-renders de scroll).
//  • Stagger de texto via variantes Framer (no layoutId).
// ─────────────────────────────────────────────────────────────────────────────

interface Photo {
  id: string; image: string; kicker: string; caption: string; story: string;
  sx: number; sy: number; srot: number;   // posición de dispersión (% escenario)
}

// ── Cuadrícula 3×2, en el lado izquierdo del escenario ─────────────────────
const GRID_COLS = [10, 24, 38];   // % left
const GRID_ROWS = [62, 80];       // % top

const PHOTOS: Photo[] = [
  { id: 'inicios',   image: '/images/pasado-1.jpg',            kicker: 'Capítulo 01', caption: 'Los inicios',            story: 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro.',  sx:  7, sy:  8, srot: -7 },
  { id: 'rural',     image: '/images/pasado-2.jpg',            kicker: 'Capítulo 02', caption: 'Maestro rural',          story: 'Del aula de un pueblo a una comunidad de docentes de toda España.',                   sx: 52, sy:  5, srot:  5 },
  { id: 'escenario', image: '/images/ponencia-1.jpg',          kicker: 'Capítulo 03', caption: 'Sobre el escenario',     story: 'Ponente nacional e internacional en educación e Inteligencia Artificial.',            sx: 76, sy: 12, srot: -4 },
  { id: 'impacto',   image: '/images/ponencia-8.jpg',          kicker: 'Capítulo 04', caption: '17 millones de impacto', story: 'Mis contenidos y recursos han llegado a millones de docentes y familias.',            sx: 22, sy: 22, srot:  6 },
  { id: 'formacion', image: '/images/ponencia-5.jpg',          kicker: 'Capítulo 05', caption: 'Formando docentes',      story: 'Talleres y mentorías para equipos que quieren liderar el cambio en sus aulas.',       sx: 63, sy: 19, srot: -3 },
  { id: 'google',    image: '/images/jose-david-contacto.jpg', kicker: 'Capítulo 06', caption: 'Reconocimiento Google',  story: 'Google Certified Innovator & Trainer. Tecnología con propósito.',                      sx: 40, sy: 10, srot:  4 },
];

const GRID_POS = PHOTOS.map((_, i) => ({
  gx: GRID_COLS[i % 3],
  gy: GRID_ROWS[Math.floor(i / 3)],
}));

// Posición protagonista: se "recoge" del grid y sube a la zona central izquierda.
const PROTA = { x: 28, y: 40, scale: 1.68 };

// Ventanas de snap escalonadas: cada foto cae al grid en su propio hueco.
const snapStart = (i: number) => 0.14 + i * 0.04;   // 0.14, 0.18, 0.22, 0.26, 0.30, 0.34
const snapEnd   = (i: number) => snapStart(i) + 0.07;// 0.21, 0.25, 0.29, 0.33, 0.37, 0.41

const STORY_START = 0.45;
const STORY_END   = 0.96;

const stopLenis  = () => (window as unknown as { lenis?: { stop?:  () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [stage, setStage]     = useState({ w: 1280, h: 800 });

  // useScroll de Framer lee el scroll de window (Lenis lo mueve) sin conflictos.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.1 },
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

  const introOpacity   = useTransform(scrollYProgress, [0, 0.10, 0.16], [1, 1, 0]);
  const profileOpacity = useTransform(scrollYProgress, [0.14, 0.34], [0, 1]);
  const railScale      = useTransform(scrollYProgress, [STORY_START, STORY_END], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '720vh', background: '#000000' }}
    >
      {/* Escenario anclado con sticky CSS (máximo rendimiento, sin pin JS) */}
      <div
        ref={stageRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* ① Intro (se desvanece al empezar el snap) */}
        <motion.div style={{ opacity: introOpacity }} className="about-intro">
          <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#71717a', marginBottom: '1rem' }}>
            02 / Sobre mí
          </p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff', marginBottom: '1.25rem' }}>
            Una vida en fotos.
          </h2>
          <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '0.1em', color: '#52525b' }}>
            Arrastra las fotos · haz scroll para ver la historia
          </p>
        </motion.div>

        {/* ② Perfil Instagram B&N (aparece cuando las fotos llegan al grid) */}
        <motion.div
          aria-hidden="true"
          style={{ position: 'absolute', left: 0, top: 0, width: '46%', height: '55%', opacity: profileOpacity, pointerEvents: 'none' }}
        >
          <InstagramHeader />
        </motion.div>

        {/* ③ Contornos de celda del grid (guías de posicionamiento) */}
        <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: profileOpacity, pointerEvents: 'none' }}>
          {GRID_POS.map((pos, i) => (
            <GridCell key={i} gx={pos.gx} gy={pos.gy} />
          ))}
        </motion.div>

        {/* ④ Fotos animadas */}
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

        {/* ⑤ Paneles de texto del relato */}
        {PHOTOS.map((photo, i) => (
          <StoryText key={photo.id} photo={photo} index={i} total={PHOTOS.length} progress={scrollYProgress} />
        ))}

        {/* ⑥ Barra de progreso del relato */}
        <div className="about-rail" aria-hidden="true">
          <motion.div className="about-rail__fill" style={{ scaleY: railScale }} />
        </div>
      </div>
    </section>
  );
}

// ─── Perfil Instagram B&N (memo: nunca se re-renderiza durante el scroll) ─────
const InstagramHeader = memo(function InstagramHeader() {
  return (
    <div style={{ padding: '2.8vh 3vw 0', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#fff' }}>
      {/* Avatar + nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1vw', marginBottom: '1.4vh' }}>
        <div style={{ width: 'clamp(42px, 5.2vw, 70px)', height: 'clamp(42px, 5.2vw, 70px)', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(255,255,255,0.32)' }}>
          <Image
            src="/images/jose-david-contacto.jpg"
            alt="joseda.education"
            width={70} height={70}
            quality={100}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'grayscale(100%)', width: '100%', height: '100%' }}
          />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 'clamp(0.6rem, 0.9vw, 0.85rem)', letterSpacing: '-0.01em', marginBottom: '0.25vh' }}>
            joseda.education ✓
          </p>
          <div style={{ display: 'flex', gap: '1vw', fontSize: 'clamp(0.45rem, 0.62vw, 0.6rem)', color: 'rgba(255,255,255,0.55)' }}>
            <span><strong style={{ color: '#fff' }}>510</strong> publicaciones</span>
            <span><strong style={{ color: '#fff' }}>31K</strong> seguidores</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 'clamp(0.42rem, 0.56vw, 0.56rem)', color: 'rgba(255,255,255,0.4)', marginBottom: '1.2vh', lineHeight: 1.45, maxWidth: '30ch' }}>
        Profe de profes, enseñando IA desde 2008 · +15.000 docentes han recuperado sus tardes
      </p>

      {/* Histórias (círculos) */}
      <div style={{ display: 'flex', gap: '0.7vw', marginBottom: '1.1vh' }}>
        {['Formaciones', 'Pódcast', 'IA', 'Cursos'].map((label) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2vh' }}>
            <div style={{ width: 'clamp(22px, 2.6vw, 38px)', height: 'clamp(22px, 2.6vw, 38px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.04)' }} />
            <span style={{ fontSize: 'clamp(0.34rem, 0.43vw, 0.43rem)', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Pestaña de cuadrícula activa */}
      <div style={{ display: 'flex', gap: '1.4vw', paddingTop: '0.7vh', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="5" height="5" fill="rgba(255,255,255,0.9)" rx="0.4" />
          <rect x="7" y="0" width="5" height="5" fill="rgba(255,255,255,0.28)" rx="0.4" />
          <rect x="0" y="7" width="5" height="5" fill="rgba(255,255,255,0.28)" rx="0.4" />
          <rect x="7" y="7" width="5" height="5" fill="rgba(255,255,255,0.28)" rx="0.4" />
        </svg>
      </div>
    </div>
  );
});

// ─── Celda de grid (contorno de referencia debajo de cada foto) ──────────────
const GridCell = memo(function GridCell({ gx, gy }: { gx: number; gy: number }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${gx}%`, top: `${gy}%`,
      transform: 'translate(-50%, -50%)',
      width: 'clamp(100px, 11vw, 168px)',
      aspectRatio: '4 / 5',
      border: '1px solid rgba(255,255,255,0.14)',
      background: 'rgba(255,255,255,0.03)',
    }} />
  );
});

// ─── Foto: scatter → grid (staggered) → protagonista ─────────────────────────
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
  const f   = seg * 0.3;
  const ss  = snapStart(index);
  const se  = snapEnd(index);

  // Offsets en px desde la celda del grid hacia dispersión / protagonista.
  const dxS = ((photo.sx  - gridPos.gx) / 100) * stage.w;
  const dyS = ((photo.sy  - gridPos.gy) / 100) * stage.h;
  const dxP = ((PROTA.x   - gridPos.gx) / 100) * stage.w;
  const dyP = ((PROTA.y   - gridPos.gy) / 100) * stage.h;

  // ── Transforms (sin blur, solo opacity) ──────────────────────────────────
  const x = useTransform(progress,
    [0,   ss,  se, s0,  s0 + f, s1 - f, s1, 1],
    [dxS, dxS,  0,  0,    dxP,    dxP,  0,  0]);
  const y = useTransform(progress,
    [0,   ss,  se, s0,  s0 + f, s1 - f, s1, 1],
    [dyS, dyS,  0,  0,    dyP,    dyP,  0,  0]);
  const rotate = useTransform(progress,
    [0,   ss,          se, 1],
    [photo.srot, photo.srot, 0, 0]);
  const scale = useTransform(progress,
    [0,  se, s0, s0 + f,       s1 - f,       s1, 1],
    [1,   1,  1, PROTA.scale,  PROTA.scale,   1,  1]);

  // Inactiva → opacity 0.6 (sin blur — esto es lo que causa el lag).
  const opacity = useTransform(progress,
    [0,  se, s0 - 0.02, s0, s0 + f, s1 - f, s1,  1],
    [1,   1,       0.6, 0.6,      1,      1, 0.6, 0.6]);

  const zIndex = useTransform(progress, [s0, (s0 + s1) / 2, s1], [2, 40, 2]);

  return (
    // Base: posición de celda del grid. Entrada "caída desde arriba".
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={entered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 80, damping: 13 }}
      style={{ position: 'absolute', left: `${gridPos.gx}%`, top: `${gridPos.gy}%`, zIndex }}
    >
      {/* Drag libre con snap-to-origin — no interfiere con el scroll */}
      <motion.div
        data-cursor="drag"
        drag
        dragConstraints={constraintsRef}
        dragSnapToOrigin
        dragElastic={0.14}
        dragMomentum={false}
        onDragStart={stopLenis}
        onDragEnd={startLenis}
        whileDrag={{ scale: 1.08, zIndex: 60 }}
        style={{ cursor: 'grab' }}
      >
        {/* Scroll transforms — will-change para GPU */}
        <motion.div style={{ x, y, rotate, scale, opacity, willChange: 'transform, opacity' }}>
          <PhotoCard photo={photo} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Carta polaroid (memo: no re-renderiza durante el scroll) ─────────────────
const PhotoCard = memo(function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div style={{ transform: 'translate(-50%, -50%)', width: 'clamp(100px, 11vw, 168px)' }}>
      <div style={{ background: '#fff', padding: '0.5rem 0.5rem 1.8rem', boxShadow: '0 20px 48px rgba(0,0,0,0.7)' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5' }}>
          <Image
            src={photo.image}
            alt={photo.caption}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
            style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'grayscale(100%)', pointerEvents: 'none' }}
          />
        </div>
        <p style={{ fontFamily: 'monospace', fontSize: '0.56rem', letterSpacing: '0.04em', color: '#111', textAlign: 'center', marginTop: '0.4rem' }}>
          {photo.caption}
        </p>
      </div>
    </div>
  );
});

// ─── Texto del relato: aparece palabra a palabra (sin layoutId) ──────────────
const wordsContainer = {
  hidden: {},
  show  : { transition: { staggerChildren: 0.048 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  show  : { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.4, 0, 0.2, 1] as const } },
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
  const y       = useTransform(progress, [s0, s1], [38, -38]);

  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => {
    const isIn = v >= s0 && v <= s1;
    setActive((prev) => (prev === isIn ? prev : isIn));
  });

  const words = photo.story.split(' ');

  return (
    <motion.div className="about-story" style={{ opacity, y }}>
      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a1a1aa', display: 'block', marginBottom: '0.6rem' }}>
        {photo.kicker}
      </span>
      <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 4vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', margin: '0 0 1rem' }}>
        {photo.caption}
      </h3>
      <motion.p
        variants={wordsContainer}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', maxWidth: '32ch' }}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.3em' }}>
            {w}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}
