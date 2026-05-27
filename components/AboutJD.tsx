'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, Draggable);

// ─── Contenido de las ventanas ─────────────────────────────────────────────

const WIN_PERFIL = (
  <div>
    <p style={{ marginBottom: '0.75rem' }}>
      <span className="syn-blue">Maestro de Primaria</span> con mención en{' '}
      <span className="syn-green">Psicopedagogía</span> e{' '}
      <span className="syn-yellow">Ingeniero de Telecomunicación</span>.
    </p>
    <p>
      Combino la <span className="syn-green">pedagogía</span> y la{' '}
      <span className="syn-blue">tecnología</span> para transformar la educación
      con Inteligencia Artificial.
    </p>
  </div>
);

const WIN_HITOS = (
  <ol className="os-lines">
    <li><span className="os-ln">1</span>Premio Innovación Educativa 🏆</li>
    <li><span className="os-ln">2</span>100K suscriptores YouTube — Botón de Plata 🎖</li>
    <li><span className="os-ln">3</span>+17M personas ayudadas con contenido</li>
    <li><span className="os-ln">4</span>Google Certified Innovator &amp; Trainer</li>
  </ol>
);

const WIN_REDES = (
  <ol className="os-lines">
    <li>
      <span className="os-ln">1</span>
      <a href="https://www.youtube.com/@josedavidprofe" className="os-link" target="_blank" rel="noopener noreferrer">
        YouTube — @josedavidprofe ↗
      </a>
    </li>
    <li>
      <span className="os-ln">2</span>
      <a href="https://www.instagram.com/josedavidprofe" className="os-link" target="_blank" rel="noopener noreferrer">
        Instagram — @josedavidprofe ↗
      </a>
    </li>
    <li>
      <span className="os-ln">3</span>
      <a href="https://www.linkedin.com/in/josedavidprofe" className="os-link" target="_blank" rel="noopener noreferrer">
        LinkedIn ↗
      </a>
    </li>
    <li>
      <span className="os-ln">4</span>
      <a href="#podcasts" className="os-link">
        Podcast — Tribu de Profes ↗
      </a>
    </li>
  </ol>
);

// ─── Registro de ventanas ──────────────────────────────────────────────────
const WINDOWS: Array<{
  id      : string;
  title   : string;
  content : React.ReactNode;
  isPhoto?: boolean;
}> = [
  { id: 'mi-perfil',   title: 'mi-perfil.md',   content: WIN_PERFIL  },
  { id: 'hitos',       title: 'hitos.log',       content: WIN_HITOS   },
  { id: 'foto',        title: 'jose-david.jpg',  content: null, isPhoto: true },
  { id: 'redes',       title: 'redes-sociales',  content: WIN_REDES   },
];

// ─── Posiciones iniciales ──────────────────────────────────────────────────
const NAV = 'var(--nav-sw, 60px)';
const INIT_POS = [
  { top: '20px',  left: `calc(${NAV} + 2%)` },
  { top: '60px',  left: `calc(${NAV} + 42%)` },
  { top: '290px', left: `calc(${NAV} + 60%)` },
  { top: '280px', left: `calc(${NAV} + 4%)` },
];

// ─── Título ────────────────────────────────────────────────────────────────
const TITLE_WORDS = [
  { text: 'Educación',  accent: false },
  { text: 'con',        accent: false },
  { text: 'impacto.',   accent: true  },
];

const BTN_LABEL = 'sobre mí →';

function WaveButton() {
  return (
    <div className="about-os-cta-wrap">
      <a href="#about" className="about-os-cta" aria-label="Saber más sobre José David">
        {BTN_LABEL.split('').map((ch, i) => (
          <span
            key={i}
            className="wave-char"
            aria-hidden="true"
            style={{ animationDelay: `${i * 0.045}s` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </a>
    </div>
  );
}

// ─── Componente ────────────────────────────────────────────────────────────
export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const winRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const zCount     = useRef(10);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {

      gsap.from('.about-word-inner', {
        y        : '115%',
        duration : 0.8,
        stagger  : 0.07,
        ease     : 'power3.out',
        scrollTrigger: {
          trigger : titleRef.current,
          scroller: scrollViewport,
          start   : 'top 82%',
          once    : true,
        },
      });

      const windowEls = winRefs.current.filter((el): el is HTMLDivElement => el !== null);

      gsap.fromTo(
        windowEls,
        { scale: 0.6, opacity: 0, transformOrigin: 'center center' },
        {
          scale          : 1,
          opacity        : 1,
          transformOrigin: 'center center',
          duration       : 1.1,
          ease           : 'power3.out',
          stagger        : 0.15,
          scrollTrigger  : {
            trigger : sectionRef.current,
            scroller: scrollViewport,
            start   : 'top 70%',
            once    : true,
          },
          onComplete() {
            gsap.set(windowEls, { clearProps: 'transform,transformOrigin,scale,opacity' });
          },
        }
      );

    }, sectionRef);

    const draggables = winRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .flatMap((el) =>
        Draggable.create(el, {
          type                    : 'top,left',
          edgeResistance          : 0.65,
          allowNativeTouchScrolling: true,
          onPress() {
            zCount.current += 1;
            (this.target as HTMLElement).style.zIndex = String(zCount.current);
          },
          onDragStart() { (this.target as HTMLElement).style.cursor = 'grabbing'; },
          onDragEnd()   { (this.target as HTMLElement).style.cursor = ''; },
        })
      );

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
      draggables.forEach((d) => d.kill());
    };
  }, []);

  return (
    <section className="about-os" id="about" ref={sectionRef}>

      <div className="about-os-header">
        <p className="about-os-overline">02 — Sobre Mí</p>

        <h2
          className="about-os-title"
          ref={titleRef}
          aria-label="Educación con impacto."
        >
          {TITLE_WORDS.map(({ text, accent }, i) => (
            <span key={i} className="about-word-wrap" aria-hidden="true">
              {accent
                ? <em className="about-word-inner">{text}</em>
                : <span className="about-word-inner">{text}</span>}
            </span>
          ))}
        </h2>
      </div>

      <div className="about-os-stage">
        {WINDOWS.map(({ id, title, content, isPhoto }, i) => (
          <div
            key={id}
            ref={(el) => { winRefs.current[i] = el; }}
            className={`os-window os-window--${id}`}
            style={{
              top   : INIT_POS[i].top,
              left  : INIT_POS[i].left,
              zIndex: 10 + i,
            }}
          >
            <div className="os-glass" aria-hidden="true" />

            <div className="os-titlebar">
              <span className="os-wintitle">{title}</span>
              <div className="os-dots" aria-hidden="true">
                {/* Minimize (decorativo) */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="1.5" y1="6" x2="10.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {/* Maximize (decorativo) */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {/* Close (decorativo) */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="os-body">
              {isPhoto ? (
                <div className="os-photo-wrap">
                  <Image
                    src="/jd-stage.jpg"
                    alt="José David dando una ponencia ante un gran auditorio"
                    fill
                    sizes="(max-width: 768px) 70vw, 280px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority={false}
                  />
                </div>
              ) : (
                content
              )}
            </div>
          </div>
        ))}
      </div>

      <WaveButton />

    </section>
  );
}
