'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CTAButton — jerarquía estricta de CTAs (§2.4)
//   primary   → botón blanco sólido (CTA principal: Suscríbete a EDU + IA)
//   secondary → botón outline blanco (contextual: Hablemos, Ver formaciones…)
//   ghost     → link de texto subrayado al hover (terciario)
// ─────────────────────────────────────────────────────────────────────────────
export type CTAVariant = 'primary' | 'secondary' | 'ghost';

const base: CSSProperties = {
  display       : 'inline-flex',
  alignItems    : 'center',
  gap           : '0.55rem',
  fontFamily    : 'var(--sans)',
  fontSize      : '0.82rem',
  fontWeight    : 600,
  letterSpacing : '0.06em',
  textTransform : 'uppercase',
  lineHeight    : 1,
  cursor        : 'pointer',
  transition    : 'background 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s',
  whiteSpace    : 'nowrap',
};

const variants: Record<CTAVariant, CSSProperties> = {
  primary: {
    ...base,
    padding     : '0.95rem 1.9rem',
    background  : '#ffffff',
    color       : '#0A0A0A',
    border      : '1px solid #ffffff',
  },
  secondary: {
    ...base,
    padding     : '0.95rem 1.9rem',
    background  : 'transparent',
    color       : '#ffffff',
    border      : '1px solid rgba(255,255,255,0.45)',
  },
  ghost: {
    ...base,
    padding     : '0.25rem 0',
    background  : 'transparent',
    color       : 'var(--accent-blue-soft)',
    border      : 'none',
    textTransform: 'none',
    letterSpacing: '0.01em',
  },
};

export default function CTAButton({
  variant = 'primary',
  href,
  children,
  arrow = true,
  onClick,
  type,
  style,
}: {
  variant?: CTAVariant;
  href?: string;
  children: ReactNode;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: CSSProperties;
}) {
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true" style={{ fontSize: '1em', lineHeight: 1 }}>→</span>}
    </>
  );

  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === 'primary')   el.style.opacity = on ? '0.85' : '1';
    if (variant === 'secondary') { el.style.background = on ? '#ffffff' : 'transparent'; el.style.color = on ? '#0A0A0A' : '#ffffff'; }
    if (variant === 'ghost')     el.style.textDecoration = on ? 'underline' : 'none';
  };

  const css = { ...variants[variant], ...style };

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} style={css} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={css} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} style={css}
      onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
      {content}
    </button>
  );
}
