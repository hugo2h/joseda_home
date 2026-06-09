'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import CTAButton from './CTAButton';

// Menú principal (§3 sitemap)
const NAV = [
  { label: 'Inicio',      href: '/' },
  { label: 'Sobre',       href: '/sobre-joseda' },
  { label: 'Cursos',      href: 'https://profelibre.joseda.education/', external: true },
  { label: 'Formaciones', href: '/formaciones' },
  { label: 'Ponencias',   href: '/ponencias' },
  { label: 'Podcasts',    href: '/podcasts' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contacto',    href: '/contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  // Bloquea scroll de fondo con el menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
    <header
      style={{
        position      : 'sticky',
        top           : 0,
        zIndex        : 1000,
        height        : 'var(--header-h)',
        display       : 'flex',
        alignItems    : 'center',
        paddingTop    : 'env(safe-area-inset-top)',
        background    : open ? '#0A0A0A' : (scrolled ? 'rgba(10,10,10,0.82)' : 'transparent'),
        backdropFilter: (scrolled && !open) ? 'blur(16px) saturate(160%)' : 'none',
        WebkitBackdropFilter: (scrolled && !open) ? 'blur(16px) saturate(160%)' : 'none',
        borderBottom  : (scrolled && !open) ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition    : 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link href="/" aria-label="Joseda — inicio" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/images/logo-joseda-white.png" alt="Joseda" width={150} height={35} priority
            style={{ height: 34, width: 'auto' }} />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navegación principal" className="nav-desktop"
          style={{ display: 'none', alignItems: 'center', gap: '1.4rem' }}>
          {NAV.map(({ label, href, external }) => {
            const active = external ? false : (href === '/' ? pathname === '/' : pathname.startsWith(href));
            const css = { fontSize: '0.85rem', fontWeight: active ? 600 : 400,
              color: active ? '#fff' : 'rgba(255,255,255,0.62)', transition: 'color 0.2s' } as const;
            return external ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="nav-link" style={css}>{label}</a>
            ) : (
              <Link key={href} href={href} className="nav-link" data-active={active || undefined} style={css}>{label}</Link>
            );
          })}
          <CTAButton variant="primary" href="/boletin" arrow={false} style={{ padding: '0.6rem 1.1rem', fontSize: '0.74rem' }}>
            EDU + IA
          </CTAButton>
        </nav>

        {/* Botón hamburguesa (≤768px) */}
        <button type="button" className="nav-burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open} onClick={() => setOpen((v) => !v)}
          style={{ display: 'flex', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.4rem' }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>

      {/* Menú móvil a PANTALLA COMPLETA con su propia barra (logo + X dentro).
          Es autónomo: cubre toda la pantalla desde y=0 y la X siempre es
          pulsable, sin depender de la posición del header (que en móvil dejaba
          un hueco arriba y bloqueaba la X). */}
      {open && (
        <div
          style={{
            position      : 'fixed',
            inset         : 0,
            zIndex        : 2100,
            background    : '#0A0A0A',
            display       : 'flex',
            flexDirection : 'column',
            paddingTop    : 'env(safe-area-inset-top)',
            overflowY     : 'auto',
            animation     : 'menu-in 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Barra superior del menú: logo + cerrar (alineada con el header) */}
          <div style={{ height: 'var(--header-h)', flexShrink: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Link href="/" aria-label="Joseda — inicio" onClick={() => setOpen(false)}
              style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Image src="/images/logo-joseda-white.png" alt="Joseda" width={150} height={35}
                style={{ height: 34, width: 'auto' }} />
            </Link>
            <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)}
              style={{ display: 'flex', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.4rem' }}>
              <X size={28} />
            </button>
          </div>

          {/* Enlaces */}
          <nav aria-label="Menú móvil" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem',
            padding: '1.5rem clamp(1.25rem, 5vw, 4rem) 3rem' }}>
            {NAV.map(({ label, href, external }, idx) => {
              const css = { ['--d' as string]: `${idx * 0.04}s`, padding: '0.95rem 0', fontSize: '1.5rem',
                fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', borderBottom: '1px solid var(--border-subtle)' };
              return external ? (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="menu-item" style={css}>{label}</a>
              ) : (
                <Link key={href} href={href} className="menu-item" style={css}>{label}</Link>
              );
            })}
            <div style={{ marginTop: '1.75rem' }}>
              <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-burger  { display: none !important; }
        }
        /* Subrayado animado de los enlaces de navegación */
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -5px; height: 1.5px;
          background: var(--brand-gradient); border-radius: 1px;
          transform: scaleX(0); transform-origin: right center;
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after,
        .nav-link[data-active]::after { transform: scaleX(1); transform-origin: left center; }
        /* Entrada del menú móvil + sus items escalonados */
        @keyframes menu-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes menu-item-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .menu-item { animation: menu-item-in 0.4s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--d); }
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after { transition: none; }
          .menu-item { animation: none; }
        }
      `}</style>
    </>
  );
}
