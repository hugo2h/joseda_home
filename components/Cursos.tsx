'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ─── Datos de cursos ───────────────────────────────────────────────────────
const CURSOS = [
  {
    id   : 1,
    num  : '01',
    title: 'Cursos Online para Docentes',
    sub  : 'Formación online práctica y actualizada para integrar la Inteligencia Artificial en el aula. Aprende a automatizar tareas, crear recursos y recuperar tu tiempo sin perder calidad educativa.',
    tags : ['IA en educación', 'automatización', 'recursos digitales'],
    href : '#cursos',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Formaciones y Mentorías',
    sub  : 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    tags : ['conferencias', 'talleres', 'mentoría docente'],
    href : '#cursos',
  },
  {
    id   : 3,
    num  : '03',
    title: 'Comunidad Tribu de Profes',
    sub  : 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    tags : ['comunidad', 'networking', 'recursos compartidos'],
    href : '#cursos',
  },
] as const;

const LAYER_COUNT   = 5;
const MAX_FAN_ANGLE = -4;

// ─── Componente ────────────────────────────────────────────────────────────
export default function Cursos() {
  const reduceMotion     = useReducedMotion();
  const sectionRef       = useRef<HTMLElement>(null);
  const titleRef         = useRef<HTMLHeadingElement>(null);
  const textRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs        = useRef<(HTMLSpanElement | null)[]>([]);
  const layerRefs        = useRef<(HTMLDivElement | null)[][]>([]);
  // Scroll viewport ref para Framer Motion whileInView
  const scrollViewportRef = useRef<Element | null>(null);

  const getLayers = useCallback((i: number): HTMLDivElement[] =>
    (layerRefs.current[i] ?? []).filter((l): l is HTMLDivElement => l !== null),
  []);

  useIsomorphicLayoutEffect(() => {
    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {

      arrowRefs.current.forEach(a => {
        if (a) gsap.set(a, { opacity: 0, x: -10 });
      });

      layerRefs.current.forEach(layers => {
        if (!layers) return;
        layers.forEach((layer, idx) => {
          if (!layer) return;
          const isTop = idx === layers.filter(Boolean).length - 1;
          gsap.set(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0 });
        });
      });

      gsap.timeline({
        scrollTrigger: { trigger: '.work-header', scroller: scrollViewport, start: 'top 78%', once: true },
      })
        .from('.work-overline', { opacity: 0, y: 16, duration: 0.70, ease: 'power3.out' })
        .from('.work-title .reveal-inner', { y: '108%', duration: 1.05, ease: 'expo.out' }, '-=0.35')
        .from('.work-header-sub', { opacity: 0, y: 12, duration: 0.65, ease: 'power3.out' }, '-=0.55');

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // Inicializar ref del scroll viewport para Framer Motion whileInView
  useEffect(() => {
    scrollViewportRef.current = document.querySelector('.scroll-viewport');
  }, []);

  useEffect(() => {
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => p !== null);
    if (panels.length === 0) return;

    const equalize = () => {
      panels.forEach(p => { p.style.height = ''; });
      requestAnimationFrame(() => {
        const maxH = Math.max(...panels.map(p => p.offsetHeight));
        panels.forEach(p => { p.style.height = `${maxH}px`; });
      });
    };

    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  const handleCardEnter = useCallback((i: number) => {
    const text  = textRefs.current[i];
    const arrow = arrowRefs.current[i];

    if (text)  gsap.to(text,  { x: -20,    duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    if (arrow) gsap.to(arrow, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });

    const layers = getLayers(i);
    layers.forEach((layer, idx) => {
      const isTop = idx === layers.length - 1;
      gsap.set(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0 });
    });
  }, [getLayers]);

  const handleCardLeave = useCallback((i: number) => {
    const text  = textRefs.current[i];
    const arrow = arrowRefs.current[i];

    if (text)  gsap.to(text,  { x: 0,       duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    if (arrow) gsap.to(arrow, { opacity: 0, x: -10, duration: 0.3, ease: 'power2.in',  overwrite: 'auto' });

    const layers = getLayers(i);
    layers.forEach((layer, idx) => {
      const isTop = idx === layers.length - 1;
      gsap.to(layer, {
        rotate: 0, scale: 1, opacity: isTop ? 1 : 0,
        duration: 0.35, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }, [getLayers]);

  const handleImgEnter = useCallback((i: number) => {
    const layers  = getLayers(i);
    const total   = layers.length;
    const bgCount = total - 1;

    layers.forEach((layer, idx) => {
      const isTop  = idx === total - 1;
      const rotate = total > 1 ? (idx / (total - 1)) * MAX_FAN_ANGLE : 0;
      const opacity = isTop
        ? 1
        : bgCount > 1
          ? 0.15 + (idx / (bgCount - 1)) * 0.65
          : 0.65;

      gsap.to(layer, {
        rotate,
        opacity,
        scale    : 1,
        duration : 0.75,
        ease     : 'expo.out',
        overwrite: 'auto',
      });
    });
  }, [getLayers]);

  const handleImgLeave = useCallback((i: number) => {
    const layers = getLayers(i);
    layers.forEach((layer, idx) => {
      const isTop = idx === layers.length - 1;
      gsap.to(layer, {
        rotate: 0, scale: 1, opacity: isTop ? 1 : 0,
        duration: 0.55, ease: 'power2.out', overwrite: 'auto',
      });
    });
  }, [getLayers]);

  // Imágenes reales para la capa top; gradiente para las capas de fondo
  const PANEL_IMAGES = ['/jd-formacion.jpg', '/jd-auditorio.jpg', '/jd-ponente.jpg'];
  const PANEL_GRADIENTS = [
    'linear-gradient(135deg, #062850 0%, #0a4a7a 50%, #38bdf8 100%)',
    'linear-gradient(135deg, #063030 0%, #0a5050 50%, #06b6d4 100%)',
    'linear-gradient(135deg, #0a0630 0%, #1a0a60 50%, #818cf8 100%)',
  ];

  return (
    <section className="work" id="cursos" ref={sectionRef}>

      <div className="work-header">
        <p className="work-overline">03 — Cursos</p>
        <h2 className="work-title" ref={titleRef}>
          <span className="reveal-wrap">
            <span className="reveal-inner">Aprende con <em>propósito</em></span>
          </span>
        </h2>
        <p className="work-header-sub">
          Formación práctica para docentes que quieren integrar la IA en su aula
          y recuperar su tiempo sin perder calidad.
        </p>
      </div>

      <div className="work-panels">
        {CURSOS.map((p, i) => (
          <motion.div
            key={p.id}
            className="work-panel"
            ref={(el) => { panelRefs.current[i] = el; }}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={() => handleCardLeave(i)}
            style={{ cursor: 'default' }}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.13 }}
            viewport={{
              once  : true,
              margin: '-80px',
              root  : scrollViewportRef as React.RefObject<Element>,
            }}
          >
            <div
              className="panel-content"
              ref={(el) => { textRefs.current[i] = el; }}
            >
              <div className="panel-top-row">
                <span className="panel-num" aria-hidden="true">{p.num}</span>
              </div>
              <h3 className="panel-title">{p.title}</h3>
              <div className="panel-tags" aria-label="Áreas de formación">
                {p.tags.map((tag, ti) => (
                  <span key={ti} className="panel-tag">{tag}</span>
                ))}
              </div>
              <p className="panel-sub">{p.sub}</p>
            </div>

            <div
              className="panel-img-wrap"
              onMouseEnter={() => handleImgEnter(i)}
              onMouseLeave={() => handleImgLeave(i)}
              aria-hidden="true"
            >
              <div className="panel-img-stack">
                {Array.from({ length: LAYER_COUNT }, (_, layerIdx) => layerIdx).map((layerIdx) => (
                  <div
                    key={layerIdx}
                    className={`panel-img-layer${layerIdx === LAYER_COUNT - 1 ? ' panel-img-layer--top' : ''}`}
                    ref={(el) => {
                      if (!layerRefs.current[i]) layerRefs.current[i] = Array(LAYER_COUNT).fill(null);
                      layerRefs.current[i][layerIdx] = el;
                    }}
                    style={
                      layerIdx === LAYER_COUNT - 1
                        ? {
                            backgroundImage: `url(${PANEL_IMAGES[i]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : { background: PANEL_GRADIENTS[i] }
                    }
                  />
                ))}
              </div>
            </div>

            <span
              className="panel-arrow-ext"
              ref={(el) => { arrowRefs.current[i] = el; }}
              aria-hidden="true"
            >↗</span>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
