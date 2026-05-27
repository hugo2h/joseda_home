'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// ─── Podcasts ──────────────────────────────────────────────────────────────
const PODCASTS = [
  {
    id     : 'tribu-de-profes',
    name   : 'Tribu de Profes',
    summary: 'El podcast para docentes que quieren transformar su práctica educativa con IA y tecnología.',
    sector : 'Educación / IA / Comunidad docente',
    bg     : '#0c2340',
  },
  {
    id     : 'vamos-a-clase',
    name   : '¡Vamos a clase!',
    summary: 'Recursos, estrategias y herramientas prácticas para el día a día en el aula.',
    sector : 'Educación / Recursos didácticos',
    bg     : '#0a3030',
  },
  {
    id     : 'google-edu',
    name   : 'Google Edu Podcast',
    summary: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    sector : 'EdTech / Google / Innovación educativa',
    bg     : '#1a1030',
  },
  {
    id     : 'leocuentos',
    name   : 'LEOcuentos',
    summary: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    sector : 'Literatura infantil / Lectura / Primaria',
    bg     : '#200a10',
  },
];

// ─── Slide geometry ────────────────────────────────────────────────────────
const SLIDE_SIZE = 400;

// ─── PRow ──────────────────────────────────────────────────────────────────
interface PRowProps {
  podcast     : typeof PODCASTS[number];
  index       : number;
  onMouseEnter: () => void;
  svRoot      : React.RefObject<Element | null>;
  reduceMotion: boolean;
}

function PRow({ podcast, index, onMouseEnter, svRoot, reduceMotion }: PRowProps) {
  return (
    <motion.div
      className="p-row"
      onMouseEnter={onMouseEnter}
      style={{ cursor: 'default' }}
      role="listitem"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.60, ease: 'easeOut', delay: index * 0.10 }}
      viewport={{
        once  : true,
        margin: '-50px',
        root  : svRoot as React.RefObject<Element>,
      }}
    >
      <span className="p-name">{podcast.name}</span>
      <div className="p-row-meta">
        <span className="p-sector">{podcast.sector}</span>
        <span className="p-summary">{podcast.summary}</span>
      </div>
    </motion.div>
  );
}

// ─── Componente ────────────────────────────────────────────────────────────
export default function Podcasts() {
  const reduceMotion    = useReducedMotion() ?? false;
  const titleRef        = useRef<HTMLHeadingElement>(null);
  const modalRef        = useRef<HTMLDivElement>(null);
  const trackRef        = useRef<HTMLDivElement>(null);
  // Scroll viewport para Framer Motion whileInView
  const scrollViewportRef = useRef<Element | null>(null);

  const xModal  = useRef<((v: number) => void) | null>(null);
  const yModal  = useRef<((v: number) => void) | null>(null);
  const yTrack  = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    scrollViewportRef.current = document.querySelector('.scroll-viewport');
  }, []);

  useIsomorphicLayoutEffect(() => {
    let titleObserver: IntersectionObserver | null = null;

    const titleEl = titleRef.current;
    if (titleEl) {
      const lines = Array.from(titleEl.querySelectorAll<HTMLElement>('.reveal-inner'));
      if (lines.length > 0) {
        gsap.set(lines, { y: '110%' });

        titleObserver = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            titleObserver?.disconnect();
            titleObserver = null;
            gsap.to(lines, { y: '0%', duration: 1.15, stagger: 0.13, ease: 'expo.out' });
          },
          { rootMargin: '-18% 0px 0px 0px' }
        );
        titleObserver.observe(titleEl);
      }
    }

    const ctx = gsap.context(() => {
      const modalEl = modalRef.current;
      const trackEl = trackRef.current;

      if (modalEl) {
        gsap.set(modalEl, { xPercent: -50, yPercent: -52, scale: 0, opacity: 0 });
        xModal.current = gsap.quickTo(modalEl, 'x', { duration: 0.52, ease: 'power2.out' });
        yModal.current = gsap.quickTo(modalEl, 'y', { duration: 0.52, ease: 'power2.out' });
      }

      if (trackEl) {
        yTrack.current = gsap.quickTo(trackEl, 'y', { duration: 0.70, ease: 'expo.out' });
      }
    });

    return () => {
      titleObserver?.disconnect();
      titleObserver = null;
      ctx.revert();
      xModal.current = null;
      yModal.current = null;
      yTrack.current = null;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    let mx = e.clientX;
    let my = e.clientY;

    const shell = document.querySelector<HTMLElement>('.app-shell');
    if (shell) {
      const r = shell.getBoundingClientRect();
      const cssW = window.innerWidth - 16;
      const scale = r.width / cssW;

      if (scale < 0.999) {
        mx = (e.clientX - r.left) / scale;
        my = (e.clientY - r.top)  / scale;
      }
    }

    xModal.current?.(mx);
    yModal.current?.(my);
  };

  const handleListEnter = () => {
    gsap.to(modalRef.current, { scale: 1, opacity: 1, duration: 0.50, ease: 'expo.out' });
  };

  const handleListLeave = () => {
    gsap.to(modalRef.current, { scale: 0, opacity: 0, duration: 0.28, ease: 'power3.in' });
  };

  const handleSlideChange = (index: number) => {
    yTrack.current?.(-(index * SLIDE_SIZE));
  };

  return (
    <section
      className="portfolio"
      id="podcasts"
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >

      {/* ── Fondo fotográfico de podcasts ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <Image
          src="/images/podcast-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
        {/* Overlay oscuro con tinte profundo */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            inset     : 0,
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.78) 40%, rgba(5,5,5,0.92) 100%)',
          }}
        />
        {/* Degradado superior para unir con la sección anterior */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            top       : 0,
            left      : 0,
            right     : 0,
            height    : '120px',
            background: 'linear-gradient(to bottom, var(--bg, #050505), transparent)',
          }}
        />
      </div>

      <div className="portfolio-header" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <p className="portfolio-overline">04 — Podcasts</p>
          <h2 className="portfolio-title" ref={titleRef}>
            <span className="reveal-wrap"><span className="reveal-inner">Aprende</span></span>
            <span className="reveal-wrap"><span className="reveal-inner"><em>escuchando</em></span></span>
          </h2>
        </div>
        <p className="portfolio-sub">
          Podcasts sobre educación, inteligencia artificial y recursos para docentes.
          Disponibles en Spotify, iVoox y Apple Podcasts.
        </p>
      </div>

      <div
        className="portfolio-list"
        onMouseEnter={handleListEnter}
        onMouseLeave={handleListLeave}
        role="list"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {PODCASTS.map((p, i) => (
          <PRow
            key={p.id}
            podcast={p}
            index={i}
            onMouseEnter={() => handleSlideChange(i)}
            svRoot={scrollViewportRef}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      {/* Modal flotante */}
      <div
        ref={modalRef}
        className="pm-modal fixed top-0 left-0 overflow-hidden pointer-events-none z-[600]"
        style={{ width: SLIDE_SIZE, height: SLIDE_SIZE }}
      >
        <div ref={trackRef} className="flex flex-col" style={{ willChange: 'transform' }}>
          {PODCASTS.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: SLIDE_SIZE,
                height: SLIDE_SIZE,
                backgroundColor: p.bg,
              }}
            >
              {/* Placeholder — ícono de micrófono + nombre */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                color: 'rgba(255,255,255,0.7)',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent, #38bdf8)', opacity: 0.7 }}>
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  padding: '0 2rem',
                }}>
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón escuchar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full z-[999] flex items-center justify-center"
          style={{ background: 'var(--accent, #38bdf8)' }}
        >
          <span className="text-white text-[12px] font-medium tracking-tight select-none font-sans text-center leading-tight px-2">
            Escuchar
          </span>
        </div>

      </div>

    </section>
  );
}
