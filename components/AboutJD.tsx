'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import gsap, { ScrollTrigger } from '@/lib/gsap-setup';

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — Experiencia de storytelling "Cosmos".
//
//  Fase 1 (flotación)  · Las fotos "caen" al centro con rotaciones aleatorias y
//                        pueden arrastrarse libremente (drag + snap-to-origin).
//  Fase 2 (snap a grid)· Al hacer scroll, GSAP ScrollTrigger ancla la sección y
//                        las fotos se recolocan en una cuadrícula tipo Instagram.
//  Fase 3 (relato)     · Cada foto se convierte en protagonista (se agranda y
//                        centra) mientras el resto se atenúa/desenfoca y aparece
//                        su bloque de texto con un fade-in.
//
//  Motor: GSAP ScrollTrigger (pin + scrub) alimenta un MotionValue `progress`
//  que dirige todas las transformaciones de Framer Motion. Integrado con el
//  Lenis existente (SmoothScrollProvider ya enlaza Lenis ↔ ScrollTrigger).
//  Estrictamente B&N.
// ─────────────────────────────────────────────────────────────────────────────

interface Photo {
  id     : string;
  image  : string;
  kicker : string;
  caption: string;
  story  : string;
  gx: number; gy: number;            // celda en la cuadrícula (% del escenario)
  sx: number; sy: number; srot: number; // dispersión inicial (% + rotación)
}

// Protagonista: destino común al que viaja la foto activa.
const PROTA = { x: 33, y: 50, scale: 1.72 };

// Marcadores de progreso (0 → 1) de la línea de tiempo.
const SNAP_START  = 0.14;   // empieza a ordenarse
const SNAP_END    = 0.30;   // cuadrícula formada
const STORY_START = 0.34;   // primer protagonista
const STORY_END   = 0.96;   // último protagonista resuelto

const PHOTOS: Photo[] = [
  { id: 'inicios',   image: '/images/pasado-1.jpg',            kicker: 'Capítulo 01', caption: 'Los inicios',            story: 'Empecé en un aula pequeña, convencido de que enseñar también es diseñar el futuro.', gx: 22, gy: 36, sx: 30, sy: 40, srot: -8 },
  { id: 'rural',     image: '/images/pasado-2.jpg',            kicker: 'Capítulo 02', caption: 'Maestro rural',          story: 'Del aula de un pueblo a una comunidad de docentes de toda España.',                  gx: 36, gy: 36, sx: 55, sy: 28, srot:  6 },
  { id: 'escenario', image: '/jd-ponente.jpg',                 kicker: 'Capítulo 03', caption: 'Sobre el escenario',     story: 'Ponente nacional e internacional en educación e Inteligencia Artificial.',           gx: 50, gy: 36, sx: 44, sy: 64, srot: -5 },
  { id: 'impacto',   image: '/images/ponencia-8.jpg',          kicker: 'Capítulo 04', caption: '17 millones de impacto', story: 'Mis contenidos y recursos han llegado a millones de docentes y familias.',           gx: 22, gy: 64, sx: 63, sy: 50, srot:  7 },
  { id: 'formacion', image: '/jd-formacion.jpg',               kicker: 'Capítulo 05', caption: 'Formando docentes',      story: 'Talleres y mentorías para equipos que quieren liderar el cambio en sus aulas.',      gx: 36, gy: 64, sx: 38, sy: 30, srot:  4 },
  { id: 'google',    image: '/images/jose-david-contacto.jpg', kicker: 'Capítulo 06', caption: 'Reconocimiento Google',  story: 'Google Certified Innovator & Trainer. Tecnología con propósito.',                     gx: 50, gy: 64, sx: 52, sy: 68, srot: -6 },
];

const stopLenis  = () => (window as unknown as { lenis?: { stop?:  () => void } }).lenis?.stop?.();
const startLenis = () => (window as unknown as { lenis?: { start?: () => void } }).lenis?.start?.();

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [stage, setStage]     = useState({ w: 1280, h: 800 });

  // Progreso 0→1 dirigido por GSAP ScrollTrigger (scrub).
  const progress = useMotionValue(0);

  // ── Entrada: dispara la animación de "caída" al ver la sección ──
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

  // ── Medir el escenario (100vw × 100vh) para calcular offsets en px ──
  useEffect(() => {
    const measure = () => setStage({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ── GSAP ScrollTrigger: ancla el escenario y dirige `progress` ──
  useEffect(() => {
    const section = sectionRef.current;
    const stageEl = stageRef.current;
    if (!section || !stageEl) return;

    const st = ScrollTrigger.create({
      trigger : section,
      start   : 'top top',
      end     : 'bottom bottom',
      pin     : stageEl,
      pinSpacing: false,
      scrub   : 1,
      onUpdate: (self) => progress.set(self.progress),
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      st.kill();
    };
  }, [progress]);

  // Intro: se desvanece al empezar a ordenar las fotos.
  const introOpacity = useTransform(progress, [0, 0.1, 0.16], [1, 1, 0]);
  // Guía de progreso (línea) que avanza durante el relato.
  const railScale = useTransform(progress, [STORY_START, STORY_END], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '640vh', background: '#000000' }}
    >
      {/* ── Escenario anclado (pin GSAP) ── */}
      <div
        ref={stageRef}
        style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
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
            progress={progress}
            stage={stage}
            entered={entered}
          />
        ))}

        {/* Capa de texto (storytelling) */}
        {PHOTOS.map((photo, i) => (
          <StoryText key={photo.id} photo={photo} index={i} total={PHOTOS.length} progress={progress} />
        ))}

        {/* Línea-guía de progreso del relato */}
        <div className="about-rail" aria-hidden="true">
          <motion.div className="about-rail__fill" style={{ scaleY: railScale }} />
        </div>
      </div>
    </section>
  );
}

// ─── Foto: caída + drag + snap-to-grid + protagonista ──────────────────────────
function PhotoLayer({
  photo, index, total, progress, stage, entered,
}: {
  photo   : Photo;
  index   : number;
  total   : number;
  progress: MotionValue<number>;
  stage   : { w: number; h: number };
  entered : boolean;
}) {
  const seg = (STORY_END - STORY_START) / total;
  const s0  = STORY_START + index * seg;
  const s1  = s0 + seg;
  const f   = seg * 0.3;

  // Offsets (px) desde la celda de la cuadrícula (base CSS) a dispersión/protagonista.
  const dxS = ((photo.sx  - photo.gx) / 100) * stage.w;
  const dyS = ((photo.sy  - photo.gy) / 100) * stage.h;
  const dxP = ((PROTA.x   - photo.gx) / 100) * stage.w;
  const dyP = ((PROTA.y   - photo.gy) / 100) * stage.h;

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
    [0, 0, 3, 3, 0, 0, 3, 3]);
  const filter  = useTransform(blurPx, (b) => `grayscale(100%) blur(${b}px)`);
  const zIndex  = useTransform(progress, [s0, (s0 + s1) / 2, s1], [2, 40, 2]);

  return (
    // Base: celda de la cuadrícula (left/top %). Aquí va la entrada "caída".
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={entered ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 90, damping: 14 }}
      style={{ position: 'absolute', left: `${photo.gx}%`, top: `${photo.gy}%`, zIndex }}
    >
      {/* Drag: arrastre libre con retorno elástico al sitio */}
      <motion.div
        data-cursor="drag"
        drag
        dragSnapToOrigin
        dragElastic={0.18}
        dragMomentum={false}
        onDragStart={stopLenis}
        onDragEnd={startLenis}
        whileDrag={{ scale: 1.06, zIndex: 60 }}
        style={{ cursor: 'grab' }}
      >
        {/* Animación de scroll (snap / protagonista) */}
        <motion.div style={{ x, y, rotate, scale, opacity, filter, willChange: 'transform' }}>
          {/* Carta polaroid — centrada sobre el punto de la celda */}
          <div style={{ transform: 'translate(-50%, -50%)', width: 'clamp(110px, 12vw, 178px)' }}>
            <div style={{ background: '#fff', padding: '0.6rem 0.6rem 1.9rem', boxShadow: '0 24px 55px rgba(0,0,0,0.65)' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5' }}>
                <Image
                  src={photo.image}
                  alt={photo.caption}
                  fill
                  sizes="180px"
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Texto del relato (fade-in junto a la foto protagonista) ───────────────────
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
      <p style={{
        fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', lineHeight: 1.6,
        color: 'rgba(255,255,255,0.78)', maxWidth: '34ch',
      }}>
        {photo.story}
      </p>
    </motion.div>
  );
}
