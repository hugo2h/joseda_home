'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Card — tarjeta reutilizable (§4). Soporta dos usos:
//   · "Cómo te ayudo": icon + title + body + link
//   · "Novedades":     image + meta + title + link
// ─────────────────────────────────────────────────────────────────────────────
export default function Card({
  icon,
  image,
  imageAlt,
  meta,
  title,
  body,
  linkText,
  href,
  center = false,
  className,
}: {
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  meta?: string;
  title: string;
  body?: string;
  linkText?: string;
  href?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <article
      className={className}
      style={{
        display      : 'flex',
        flexDirection: 'column',
        background   : 'var(--bg-card)',
        border       : '1px solid var(--border-subtle)',
        borderRadius : '14px',
        overflow     : 'hidden',
        height       : '100%',
      }}
    >
      {image && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#1f1f1f' }}>
          <Image src={image} alt={imageAlt ?? title} fill quality={90} sizes="(max-width:768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }} />
        </div>
      )}

      <div style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : '0.75rem',
        padding      : '1.5rem',
        flex         : 1,
        textAlign    : center ? 'center' : undefined,
        alignItems   : center ? 'center' : undefined,
      }}>
        {icon && <div style={{ fontSize: '1.6rem', lineHeight: 1 }} aria-hidden="true">{icon}</div>}

        {meta && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--accent-blue)' }}>
            {meta}
          </span>
        )}

        <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: '#fff' }}>
          {title}
        </h3>

        {body && (
          <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {body}
          </p>
        )}

        {linkText && href && (
          <Link href={href} style={{ marginTop: center ? 'auto' : '0.35rem', paddingTop: center ? '0.35rem' : undefined,
            display: 'inline-flex', alignItems: 'center',
            gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue-soft)' }}>
            {linkText} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
