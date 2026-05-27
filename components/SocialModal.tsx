'use client';

import { useEffect, useRef }  from 'react';
import { gsap }               from 'gsap';
import { useMinimize }        from '@/context/MinimizeContext';

const LINKS = [
  {
    id   : 'youtube',
    label: 'youtube',
    value: '@josedavidprofe',
    href : 'https://www.youtube.com/@josedavidprofe',
    Icon : () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    id   : 'instagram',
    label: 'instagram',
    value: '@josedavidprofe',
    href : 'https://www.instagram.com/josedavidprofe',
    Icon : () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id   : 'email',
    label: 'email',
    value: 'hola@jose-david.com',
    href : 'mailto:hola@jose-david.com',
    Icon : () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
] as const;

const MONO: React.CSSProperties = {
  fontFamily: "'Courier New', 'Consolas', monospace",
  letterSpacing: '0.06em',
};

export default function SocialModal() {
  const { isMinimized, setMinimized } = useMinimize();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 18, scale: 0.96 });
    gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.50, ease: 'expo.out', delay: 0.20 });
  }, []);

  if (!isMinimized) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position       : 'fixed',
        bottom         : '4rem',
        right          : '4rem',
        zIndex         : 99999,
        width          : '288px',
        background     : 'rgba(5, 5, 5, 0.92)',
        backdropFilter : 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border         : '1px solid rgba(56, 189, 248, 0.12)',
        borderRadius   : '12px',
      }}
    >
      <div style={{
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'space-between',
        padding        : '10px 14px',
        borderBottom   : '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent, #38bdf8)',
            display: 'block', opacity: 0.7,
          }}/>
          <span style={{ ...MONO, fontSize: '10px', color: 'rgba(240,240,244,0.38)', textTransform: 'lowercase' }}>
            social-links
          </span>
        </div>

        <button
          onClick={() => setMinimized(false)}
          aria-label="Cerrar"
          style={{
            background : 'none',
            border     : 'none',
            color      : 'rgba(240,240,244,0.35)',
            cursor     : 'pointer',
            padding    : '4px',
            display    : 'flex',
            alignItems : 'center',
            transition : 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(240,240,244,0.90)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,240,244,0.35)'; }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <line x1="2"  y1="2"  x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="2"  x2="2"  y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: '14px 14px 10px' }}>
        <p style={{
          ...MONO,
          fontSize    : '10px',
          color       : 'rgba(240,240,244,0.22)',
          marginBottom: '12px',
        }}>
          <span style={{ color: 'var(--accent, #38bdf8)', opacity: 0.6 }}>$&nbsp;</span>
          connect --channel all
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {LINKS.map((link, idx) => (
            <li
              key={link.id}
              style={{
                borderBottom: idx < LINKS.length - 1
                  ? '1px solid rgba(255,255,255,0.05)'
                  : 'none',
              }}
            >
              <a
                href={link.href}
                target={link.id !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display    : 'flex',
                  alignItems : 'center',
                  gap        : '12px',
                  padding    : '11px 4px',
                  textDecoration: 'none',
                  color      : 'rgba(240,240,244,0.60)',
                  transition : 'color 0.18s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(240,240,244,1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,244,0.60)')}
              >
                <span style={{
                  color  : 'var(--accent, #38bdf8)',
                  opacity: 0.65,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <link.Icon />
                </span>

                <div>
                  <div style={{
                    ...MONO,
                    fontSize    : '9px',
                    color       : 'rgba(240,240,244,0.28)',
                    marginBottom: '2px',
                    textTransform: 'lowercase',
                  }}>
                    {link.label}
                  </div>
                  <div style={{ ...MONO, fontSize: '11px' }}>
                    {link.value}
                  </div>
                </div>

                <span style={{
                  marginLeft  : 'auto',
                  fontSize    : '11px',
                  opacity     : 0.25,
                  ...MONO,
                }}>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        padding    : '8px 14px',
        borderTop  : '1px solid rgba(255,255,255,0.05)',
        display    : 'flex',
        alignItems : 'center',
        gap        : 6,
      }}>
        <span style={{
          display     : 'inline-block',
          width       : 5,
          height      : 5,
          borderRadius: '50%',
          background  : 'rgba(56,189,248,0.50)',
          animation   : 'pulse-dot 2s ease-in-out infinite',
        }}/>
        <span style={{ ...MONO, fontSize: '9px', color: 'rgba(240,240,244,0.20)' }}>
          jose-david.com — educación &amp; IA
        </span>
      </div>
    </div>
  );
}
