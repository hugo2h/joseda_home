'use client';

import { useRef, useEffect } from 'react';
import { Play, Mic, Mail, ArrowUpRight } from 'lucide-react';
import gsap from '@/lib/gsap-setup';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicFooter — GSAP scroll-triggered cinematic entrance
// ─────────────────────────────────────────────────────────────────────────────

const LINKS = [
  {
    label   : 'Ver Cursos',
    href    : '#cursos',
    desc    : 'Formación en IA',
    Icon    : Play,
  },
  {
    label   : 'Unirse a la Tribu',
    href    : '#podcasts',
    desc    : 'Comunidad docente',
    Icon    : Mic,
  },
  {
    label   : 'Contacto',
    href    : '#contact',
    desc    : 'Hablemos',
    Icon    : Mail,
  },
];

const SOCIAL = [
  { label: 'YouTube',  Icon: Play,    href: 'https://youtube.com' },
  { label: 'Podcast',  Icon: Mic,     href: '#podcasts'           },
  { label: 'Email',    Icon: Mail,    href: '#contact'            },
];

export default function CinematicFooter() {
  const footerRef  = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger  : footerRef.current,
          start    : 'top 85%',
          end      : 'top 30%',
          scrub    : false,
          once     : true,
        },
      });

      // Título entra con blur + fade + slide
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 60, filter: 'blur(12px)' });
        tl.to(titleRef.current, {
          opacity : 1,
          y       : 0,
          filter  : 'blur(0px)',
          duration: 1.1,
          ease    : 'power2.inOut',
        }, 0);
      }

      // Links en stagger
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('.footer-link-item');
        gsap.set(items, { opacity: 0, y: 32 });
        tl.to(items, {
          opacity : 1,
          y       : 0,
          duration: 0.8,
          ease    : 'power2.inOut',
          stagger : 0.12,
        }, 0.25);
      }

      // Franja inferior
      if (bottomRef.current) {
        gsap.set(bottomRef.current, { opacity: 0 });
        tl.to(bottomRef.current, {
          opacity : 1,
          duration: 0.7,
          ease    : 'power2.inOut',
        }, 0.7);
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer
      ref={footerRef}
      style={{
        position  : 'relative',
        background: '#080808',
        borderTop : '1px solid rgba(255,255,255,0.07)',
        overflow  : 'hidden',
        padding   : '6rem 5vw 0',
      }}
    >
      {/* ── Marca de agua decorativa ── */}
      <div aria-hidden="true" style={{
        position     : 'absolute',
        bottom       : '-2rem',
        right        : '-2vw',
        fontFamily   : 'var(--serif)',
        fontSize     : 'clamp(8rem, 22vw, 20rem)',
        fontWeight   : 100,
        color        : 'rgba(255,255,255,0.025)',
        lineHeight   : 1,
        letterSpacing: '-0.04em',
        userSelect   : 'none',
        pointerEvents: 'none',
        whiteSpace   : 'nowrap',
      }}>
        JD
      </div>

      {/* ── Título cinemático ── */}
      <h2
        ref={titleRef}
        style={{
          fontFamily   : 'var(--serif)',
          fontSize     : 'clamp(3.5rem, 10vw, 10rem)',
          fontWeight   : 300,
          letterSpacing: '-0.04em',
          lineHeight   : 0.9,
          color        : '#ffffff',
          marginBottom : '4.5rem',
          maxWidth     : '18ch',
        }}
      >
        Juntos,<br />
        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
          transformamos
        </em>
        <br />la educación.
      </h2>

      {/* ── Grid de links ── */}
      <div
        ref={linksRef}
        style={{
          display             : 'grid',
          gridTemplateColumns : 'repeat(3, 1fr)',
          gap                 : '1px',
          borderTop           : '1px solid rgba(255,255,255,0.08)',
          borderBottom        : '1px solid rgba(255,255,255,0.08)',
          marginBottom        : '4rem',
        }}
      >
        {LINKS.map(({ label, href, desc, Icon }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleAnchorClick(e, href)}
            className="footer-link-item"
            style={{
              display       : 'flex',
              alignItems    : 'center',
              justifyContent: 'space-between',
              padding       : '2rem 0',
              paddingRight  : '1.5rem',
              borderRight   : '1px solid rgba(255,255,255,0.06)',
              textDecoration: 'none',
              color         : 'rgba(255,255,255,0.65)',
              transition    : 'color 0.25s',
              cursor        : 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)'; }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{
                fontSize     : '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color        : 'var(--accent)',
                opacity      : 0.75,
              }}>
                {desc}
              </span>
              <span style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight   : 300,
                letterSpacing: '-0.02em',
                color        : 'inherit',
              }}>
                {label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Icon size={16} strokeWidth={1.5} style={{ opacity: 0.5 }} />
              <ArrowUpRight size={14} strokeWidth={1.5} style={{ opacity: 0.4 }} />
            </div>
          </a>
        ))}
      </div>

      {/* ── Franja inferior ── */}
      <div
        ref={bottomRef}
        style={{
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'space-between',
          paddingBottom : '2.5rem',
          gap           : '2rem',
          flexWrap      : 'wrap',
        }}
      >
        {/* Copyright */}
        <p style={{
          fontSize     : '0.75rem',
          color        : 'rgba(255,255,255,0.28)',
          letterSpacing: '0.04em',
        }}>
          © {new Date().getFullYear()} José David Pérez Ibáñez — Todos los derechos reservados
        </p>

        {/* Redes sociales */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {SOCIAL.map(({ label, Icon: SIcon, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleAnchorClick(e, href)}
              aria-label={label}
              style={{
                display    : 'flex',
                alignItems : 'center',
                gap        : '0.4rem',
                color      : 'rgba(255,255,255,0.32)',
                textDecoration: 'none',
                fontSize   : '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition : 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.32)'; }}
            >
              <SIcon size={14} strokeWidth={1.5} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
