'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// ExpandableGallery — galería de acordeón horizontal expandible (estilo Aristide
// Benoist). Franjas verticales finas en estado inactivo; al hacer clic, la franja
// se expande a pantalla completa y las demás colapsan. Estrictamente B&N.
// ─────────────────────────────────────────────────────────────────────────────
export interface GalleryItem {
  id         : string;
  num        : string;
  title      : string;
  subtitle   : string;
  description: string;
  cta        : string;
  image      : string;
}

const EASE = [0.4, 0, 0.2, 1] as const;

export default function ExpandableGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive]     = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const anyActive = active !== null;

  // ── MÓVIL: pila de tarjetas completas (imagen + texto + CTA siempre visibles) ──
  if (isMobile) {
    return <MobileStack items={items} />;
  }

  // ── ESCRITORIO: acordeón horizontal expandible ──
  return (
    <div
      style={{
        display       : 'flex',
        flexDirection : 'row',
        justifyContent: 'center',
        gap           : '0.75rem',
        height        : 'min(70vh, 660px)',
        width         : '100%',
      }}
    >
      {items.map((item) => {
        const isActive  = active === item.id;
        const collapsed = anyActive && !isActive;

        const animate = isMobile
          ? {
              height : isActive ? '68vh' : collapsed ? 0 : '15vh',
              opacity: collapsed ? 0 : 1,
            }
          : {
              flexGrow  : isActive ? 1 : 0,
              flexBasis : isActive ? '0%' : collapsed ? '0px' : '18vw',
              opacity   : collapsed ? 0 : 1,
            };

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={animate}
            transition={{ duration: 0.7, ease: EASE }}
            onClick={() => { if (!isActive) setActive(item.id); }}
            style={{
              position  : 'relative',
              overflow  : 'hidden',
              cursor    : isActive ? 'default' : 'pointer',
              minWidth  : 0,
              width     : isMobile ? '100%' : undefined,
              flexShrink: 0,
              willChange: 'transform, flex-basis',   // anima en GPU, no en CPU
            }}
          >
            {/* ── Imagen de fondo B&N ──
                 object-fit: cover en ambos estados → cubre TODO el contenedor
                 sin dejar espacios vacíos. En activo se ancla arriba
                 (object-position: center top) para preservar el rostro. */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              quality={100}
              priority={isActive}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit     : 'cover',
                objectPosition: isActive ? 'center 20%' : 'center',
                filter        : isActive
                  ? 'grayscale(100%) brightness(0.92)'
                  : 'grayscale(100%) brightness(0.32)',
                transition    : 'filter 0.7s ease',
                willChange    : 'filter',
              }}
            />

            {/* ── Velo ──
                 Activo: oscurece solo la banda inferior para el texto, dejando
                 el punto focal (parte superior) totalmente visible. */}
            <div
              aria-hidden="true"
              style={{
                position  : 'absolute',
                inset     : 0,
                background: isActive
                  ? 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 24%, rgba(0,0,0,0) 48%)'
                  : 'rgba(0,0,0,0.25)',
                transition: 'background 0.7s ease',
              }}
            />

            {/* ── Etiqueta inactiva ── */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position      : 'absolute',
                    inset         : 0,
                    display       : 'flex',
                    flexDirection : 'column',
                    alignItems    : 'center',
                    justifyContent: 'space-between',
                    padding       : isMobile ? '1.25rem 1.5rem' : '1.5rem 0',
                    pointerEvents : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#a1a1aa' }}>
                    {item.num}
                  </span>

                  {isMobile ? (
                    <span style={{
                      fontSize     : 'clamp(1.1rem, 5vw, 1.6rem)',
                      fontWeight   : 600,
                      letterSpacing: '-0.02em',
                      color        : '#ffffff',
                      textAlign    : 'center',
                    }}>
                      {item.title}
                    </span>
                  ) : (
                    <span style={{
                      writingMode  : 'vertical-rl',
                      transform    : 'rotate(180deg)',
                      whiteSpace   : 'nowrap',
                      fontSize     : 'clamp(1.1rem, 1.5vw, 1.65rem)',
                      fontWeight   : 600,
                      letterSpacing: '-0.01em',
                      color        : '#ffffff',
                    }}>
                      {item.title}
                    </span>
                  )}

                  <span aria-hidden="true" style={{ fontFamily: 'monospace', fontSize: '0.72rem', opacity: 0 }}>
                    {item.num}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Contenido activo ── */}
            <AnimatePresence>
              {isActive && (
                <>
                  {/* Botón cerrar */}
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    onClick={(e) => { e.stopPropagation(); setActive(null); }}
                    aria-label="Cerrar"
                    style={{
                      position     : 'absolute',
                      top          : 'clamp(1.25rem, 3vw, 2.5rem)',
                      right        : 'clamp(1.25rem, 3vw, 2.5rem)',
                      width        : 48,
                      height       : 48,
                      display      : 'flex',
                      alignItems   : 'center',
                      justifyContent: 'center',
                      background   : 'transparent',
                      border       : '1px solid rgba(255,255,255,0.4)',
                      borderRadius : '50%',
                      color        : '#fff',
                      fontSize     : '1.1rem',
                      cursor       : 'pointer',
                      zIndex       : 3,
                      transition   : 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => { const b = e.currentTarget; b.style.background = '#fff'; b.style.color = '#000'; }}
                    onMouseLeave={(e) => { const b = e.currentTarget; b.style.background = 'transparent'; b.style.color = '#fff'; }}
                  >
                    ✕
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                    style={{
                      position      : 'absolute',
                      inset         : 0,
                      display       : 'flex',
                      flexDirection : 'column',
                      justifyContent: 'flex-end',
                      padding       : 'clamp(2rem, 5vw, 5rem)',
                      zIndex        : 2,
                    }}
                  >
                    <span style={{
                      fontFamily   : 'monospace',
                      fontSize     : '0.75rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color        : '#a1a1aa',
                      marginBottom : '1.25rem',
                    }}>
                      {item.num} / {item.subtitle}
                    </span>

                    <h3 style={{
                      fontFamily   : 'var(--sans)',
                      fontSize     : 'clamp(2.5rem, 6vw, 6rem)',
                      fontWeight   : 800,
                      letterSpacing: '-0.04em',
                      lineHeight   : 0.95,
                      color        : '#ffffff',
                      marginBottom : '1.5rem',
                      maxWidth     : '16ch',
                    }}>
                      {item.title}
                    </h3>

                    <p style={{
                      fontSize    : 'clamp(1rem, 1.5vw, 1.3rem)',
                      lineHeight  : 1.65,
                      color       : 'rgba(255,255,255,0.75)',
                      maxWidth    : '52ch',
                      marginBottom : '2.5rem',
                    }}>
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        alignSelf    : 'flex-start',
                        display      : 'inline-flex',
                        alignItems   : 'center',
                        gap          : '0.6rem',
                        padding      : '0.95rem 2.4rem',
                        background   : '#ffffff',
                        color        : '#000000',
                        fontSize     : '0.8rem',
                        fontWeight   : 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border       : 'none',
                        cursor       : 'pointer',
                        transition   : 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                    >
                      {item.cta}
                      <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MobileStack — pila vertical de tarjetas completas para móvil.
// Imagen + subtítulo + título + descripción + CTA, todo visible sin interacción.
// ─────────────────────────────────────────────────────────────────────────────
function MobileStack({ items }: { items: GalleryItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%' }}>
      {items.map((item) => (
        <article
          key={item.id}
          style={{
            position : 'relative',
            overflow : 'hidden',
            border   : '1px solid rgba(255,255,255,0.10)',
            background: '#0a0a0a',
          }}
        >
          {/* ── Imagen ── */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              quality={90}
              sizes="100vw"
              style={{
                objectFit     : 'cover',
                objectPosition: 'center 25%',
                filter        : 'grayscale(100%)',
              }}
            />
            <span style={{
              position  : 'absolute',
              top       : '1rem',
              left      : '1rem',
              fontFamily: 'monospace',
              fontSize  : '0.72rem',
              letterSpacing: '0.15em',
              color     : '#ffffff',
              textShadow: '0 1px 10px rgba(0,0,0,0.85)',
            }}>
              {item.num}
            </span>
            {/* Fundido inferior para empalmar con el bloque de texto */}
            <div
              aria-hidden="true"
              style={{
                position  : 'absolute',
                inset     : 0,
                background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 40%)',
              }}
            />
          </div>

          {/* ── Texto ── */}
          <div style={{ padding: '1.1rem 1.4rem 1.7rem' }}>
            <span style={{
              display      : 'block',
              fontFamily   : 'monospace',
              fontSize     : '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color        : '#a1a1aa',
              marginBottom : '0.7rem',
            }}>
              {item.subtitle}
            </span>

            <h3 style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(1.6rem, 7vw, 2.3rem)',
              fontWeight   : 800,
              letterSpacing: '-0.03em',
              lineHeight   : 1,
              color        : '#ffffff',
              marginBottom : '0.9rem',
            }}>
              {item.title}
            </h3>

            <p style={{
              fontSize    : '1rem',
              lineHeight  : 1.6,
              color       : 'rgba(255,255,255,0.72)',
              marginBottom: '1.5rem',
            }}>
              {item.description}
            </p>

            <button
              type="button"
              style={{
                display      : 'inline-flex',
                alignItems   : 'center',
                gap          : '0.5rem',
                padding      : '0.85rem 1.9rem',
                background   : '#ffffff',
                color        : '#000000',
                fontSize     : '0.78rem',
                fontWeight   : 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border       : 'none',
                cursor       : 'pointer',
              }}
            >
              {item.cta}
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
