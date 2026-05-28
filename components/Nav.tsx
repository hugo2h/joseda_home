'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { Home, User, BookOpen, Mic, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export interface NavItem {
  Icon : ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href : string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLenis = () => (typeof window !== 'undefined' ? (window as any).lenis : null);

const EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function scrollToSection(href: string) {
  const l  = getLenis();
  const vp = document.querySelector<HTMLElement>('.scroll-viewport');

  if (l) {
    if (href === '#inicio') l.scrollTo(0, { duration: 1.4, easing: EASE });
    else l.scrollTo(href, { duration: 1.2, easing: EASE, offset: -80 });
    return;
  }
  // Fallback nativo (móvil — Lenis desactivado)
  if (href === '#inicio') {
    if (vp) vp.scrollTop = 0;
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.querySelector<HTMLElement>(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

const SECTIONS: NavItem[] = [
  { Icon: Home,     label: 'Inicio',   href: '#inicio'   },
  { Icon: BookOpen, label: 'Cursos',   href: '#cursos'   },
  { Icon: User,     label: 'Sobre Mí', href: '#about'    },
  { Icon: Mic,      label: 'Podcasts', href: '#podcasts' },
  { Icon: Mail,     label: 'Contacto', href: '#contact'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Nav — pill flotante estilo Apple / Aristide
// ─────────────────────────────────────────────────────────────────────────────
export default function Nav({ navConfig }: { navConfig?: NavItem[] }) {
  const sections = navConfig ?? SECTIONS;
  const [active,   setActive]   = useState('#inicio');
  const [scrolled, setScrolled] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const isHome   = pathname === '/';

  // Intensidad del glass según scroll — window scroll (Lenis sobre window)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sección activa via IntersectionObserver
  useEffect(() => {
    if (!isHome) return;
    const els = sections
      .filter(({ href }) => href.startsWith('#'))
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: '-40% 0px -40% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome, sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (!href.startsWith('#')) { router.push(href); return; }
    if (isHome) { setActive(href); scrollToSection(href); }
    else router.push(`/${href}`);
  }

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (isHome) { setActive('#inicio'); scrollToSection('#inicio'); }
    else router.push('/');
  }

  return (
    <header
      style={{
        position       : 'fixed',
        top            : '14px',
        left           : '50%',
        transform      : 'translateX(-50%)',
        zIndex         : 9500,
        display        : 'flex',
        alignItems     : 'center',
        gap            : '0.125rem',
        padding        : '0.45rem 0.75rem 0.45rem 1rem',
        borderRadius   : '9999px',
        backdropFilter : scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px)',
        background     : scrolled ? 'rgba(8,8,8,0.75)' : 'rgba(8,8,8,0.38)',
        border         : '1px solid rgba(255,255,255,0.09)',
        boxShadow      : scrolled
          ? '0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset'
          : '0 2px 16px rgba(0,0,0,0.2)',
        transition     : 'background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
        whiteSpace     : 'nowrap',
      }}
    >
      {/* Logo */}
      <a
        href={isHome ? '#inicio' : '/'}
        onClick={handleLogoClick}
        aria-label="Ir al inicio"
        style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center', opacity: 0.85 }}
      >
        <Logo style={{ height: 17, width: 'auto', display: 'block' }} />
      </a>

      {/* Links */}
      <nav aria-label="Secciones" style={{ display: 'flex', gap: '0.05rem' }}>
        {sections.map(({ label, href }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              style={{
                padding       : '0.32rem 0.8rem',
                borderRadius  : '9999px',
                fontSize      : '0.76rem',
                letterSpacing : '0.03em',
                fontWeight    : isActive ? 500 : 400,
                color         : isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                background    : isActive ? 'rgba(255,255,255,0.11)' : 'transparent',
                textDecoration: 'none',
                transition    : 'color 0.2s, background 0.2s',
              }}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          if (isHome) scrollToSection('#contact');
          else router.push('/#contact');
        }}
        style={{
          marginLeft    : '0.5rem',
          padding       : '0.38rem 1.1rem',
          borderRadius  : '9999px',
          fontSize      : '0.76rem',
          letterSpacing : '0.04em',
          fontWeight    : 600,
          color         : '#0a0a0a',
          background    : 'rgba(255,255,255,0.92)',
          textDecoration: 'none',
          transition    : 'background 0.2s, transform 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.92)'; }}
      >
        Contratar&nbsp;→
      </a>
    </header>
  );
}
