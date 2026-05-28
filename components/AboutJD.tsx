'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// BentoCard — tarjeta con efecto spotlight (radial-gradient sigue al ratón)
// ─────────────────────────────────────────────────────────────────────────────
function BentoCard({
  children,
  style = {},
  className = '',
}: {
  children : ReactNode;
  style    ?: React.CSSProperties;
  className?: string;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const spotRef  = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    spotRef.current.style.opacity    = '1';
    spotRef.current.style.background =
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(56,189,248,0.14), transparent 40%)`;
  };

  const onMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position  : 'relative',
        background: 'rgba(255,255,255,0.035)',
        border    : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem',
        overflow  : 'hidden',
        padding   : '2rem',
        ...style,
      }}
    >
      {/* Spotlight layer */}
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position    : 'absolute',
          inset       : 0,
          opacity     : 0,
          pointerEvents: 'none',
          transition  : 'opacity 0.35s ease',
          zIndex      : 0,
          borderRadius: 'inherit',
        }}
      />
      {/* Content on top of spotlight */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Logos tecnología
// ─────────────────────────────────────────────────────────────────────────────
const TECH_LOGOS = [
  { name: 'Google for Education', icon: '🎓' },
  { name: 'Google Certified',     icon: '✅' },
  { name: 'YouTube',              icon: '▶️'  },
  { name: 'ChatGPT / OpenAI',     icon: '🤖' },
  { name: 'Microsoft Education',  icon: '🪟' },
  { name: 'Canva Education',      icon: '🎨' },
];

// ─────────────────────────────────────────────────────────────────────────────
// AboutJD — Bento Grid asimétrico
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entrada en viewport
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll<HTMLElement>('.bento-card');
    gsap.set(cards, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        gsap.to(cards, {
          opacity : 1,
          y       : 0,
          duration: 0.85,
          ease    : 'power3.out',
          stagger : 0.1,
        });
      },
      { rootMargin: '-10% 0px 0px 0px' },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ padding: '7rem 5vw', background: 'transparent' }}>

      {/* Cabecera */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p style={{
          fontSize     : '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color        : 'var(--accent)',
          marginBottom : '1rem',
        }}>
          02 — Sobre Mí
        </p>
        <h2 style={{
          fontFamily   : 'var(--serif)',
          fontSize     : 'clamp(2.2rem, 5vw, 4.5rem)',
          fontWeight   : 300,
          letterSpacing: '-0.03em',
          lineHeight   : 1,
          color        : '#fff',
        }}>
          Maestro. Ingeniero.<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Formador.</em>
        </h2>
      </div>

      {/* ── Bento Grid ── */}
      <div style={{
        display            : 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows       : 'auto',
        gap                : '1rem',
      }}
        className="bento-grid"
      >

        {/* Tarjeta 1 — Biografía + foto (col-span-2) */}
        <BentoCard
          style={{ gridColumn: 'span 2', minHeight: '340px', display: 'flex', gap: '2rem', alignItems: 'center' }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize    : '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color       : 'var(--muted)',
              marginBottom: '1rem',
            }}>
              Quién soy
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
              <strong style={{ color: '#fff', fontWeight: 500 }}>Maestro de Primaria</strong> con mención en
              Psicopedagogía e <strong style={{ color: '#fff', fontWeight: 500 }}>Ingeniero de Telecomunicación</strong>.
            </p>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)' }}>
              Combino pedagogía y tecnología para transformar la educación con Inteligencia Artificial.
              Más de <strong style={{ color: 'var(--accent)', fontWeight: 500 }}>17 millones de personas</strong> han mejorado
              su práctica docente gracias a mis recursos.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['17M+', 'Personas alcanzadas'],
                ['100K+', 'Suscriptores YouTube'],
                ['8+', 'Años de experiencia'],
              ].map(([n, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 200, color: '#fff', lineHeight: 1, fontFamily: 'var(--serif)' }}>{n}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Foto */}
          <div style={{ flexShrink: 0, width: '160px', height: '200px', borderRadius: '0.75rem', overflow: 'hidden', position: 'relative' }}>
            <Image
              src="/images/jose-david-contacto.jpg"
              alt="José David Pérez Ibáñez"
              fill
              sizes="160px"
              style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
            />
          </div>
        </BentoCard>

        {/* Tarjeta 2 — YouTube (col-span-1) */}
        <BentoCard style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>▶️</div>
          <div>
            <div style={{
              fontSize    : 'clamp(2rem, 4vw, 3rem)',
              fontWeight  : 200,
              color       : '#fff',
              lineHeight  : 1,
              fontFamily  : 'var(--serif)',
            }}>
              100K+
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
              Suscriptores YouTube
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{
                display      : 'inline-block',
                padding      : '0.2rem 0.65rem',
                borderRadius : '9999px',
                background   : 'rgba(255,255,255,0.07)',
                border       : '1px solid rgba(255,255,255,0.12)',
                fontSize     : '0.68rem',
                color        : 'rgba(255,255,255,0.55)',
                letterSpacing: '0.06em',
              }}>
                Botón de Plata 🎖
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Tarjeta 3 — Premio (col-span-1) */}
        <BentoCard style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>🏆</div>
          <div>
            <div style={{
              fontSize    : '1.1rem',
              fontWeight  : 500,
              color       : '#fff',
              lineHeight  : 1.3,
              marginBottom: '0.4rem',
            }}>
              Premio Innovación Educativa
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Referente nacional en EdTech
            </div>
          </div>
        </BentoCard>

        {/* Tarjeta 4 — Google Certified (col-span-1) */}
        <BentoCard style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2rem', lineHeight: 1 }}>✅</div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', lineHeight: 1.3, marginBottom: '0.4rem' }}>
              Google Certified<br />Innovator & Trainer
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Google for Education
            </div>
          </div>
        </BentoCard>

        {/* Tarjeta 5 — Logos tecnologías (col-span-2) */}
        <BentoCard style={{ gridColumn: 'span 2' }}>
          <p style={{
            fontSize     : '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color        : 'var(--muted)',
            marginBottom : '1.25rem',
          }}>
            Tecnologías & plataformas
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {TECH_LOGOS.map(({ name, icon }) => (
              <div
                key={name}
                style={{
                  display     : 'flex',
                  alignItems  : 'center',
                  gap         : '0.5rem',
                  padding     : '0.45rem 1rem',
                  borderRadius: '9999px',
                  background  : 'rgba(255,255,255,0.05)',
                  border      : '1px solid rgba(255,255,255,0.09)',
                  fontSize    : '0.82rem',
                  color       : 'rgba(255,255,255,0.7)',
                  transition  : 'background 0.2s, color 0.2s',
                  cursor      : 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(56,189,248,0.12)';
                  (e.currentTarget as HTMLDivElement).style.color      = '#fff';
                  (e.currentTarget as HTMLDivElement).style.border     = '1px solid rgba(56,189,248,0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLDivElement).style.color      = 'rgba(255,255,255,0.7)';
                  (e.currentTarget as HTMLDivElement).style.border     = '1px solid rgba(255,255,255,0.09)';
                }}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
