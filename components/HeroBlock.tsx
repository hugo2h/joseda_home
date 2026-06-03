import Image from 'next/image';
import type { ReactNode } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton, { type CTAVariant } from '@/components/CTAButton';

// ─────────────────────────────────────────────────────────────────────────────
// HeroBlock — cabecera reutilizable (§4). Usado en Home, Sobre, ProfeLibre.
//   Fondo de imagen opcional con velo oscuro + insinuación del gradiente de marca.
//   (Para el hero de la home con VÍDEO se usa components/home/Hero.tsx aparte.)
// ─────────────────────────────────────────────────────────────────────────────
export type HeroCta = { label: string; href: string; variant?: CTAVariant; arrow?: boolean };

export default function HeroBlock({
  bgImage,
  bgAlt = '',
  eyebrow,
  title,
  subtitle,
  body,
  ctas = [],
  align = 'left',
  minHeight = '95svh',
}: {
  bgImage?: string;
  bgAlt?: string;
  eyebrow?: { number?: string; text: string };
  title: ReactNode;
  subtitle?: ReactNode;
  body?: ReactNode;
  ctas?: HeroCta[];
  align?: 'left' | 'center';
  minHeight?: string;
}) {
  const centered = align === 'center';

  return (
    <section
      style={{
        position      : 'relative',
        minHeight,
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        overflow      : 'hidden',
        paddingBlock  : 'clamp(3rem, 8vh, 6rem)',
        background    : bgImage ? undefined : 'var(--bg-primary)',
      }}
    >
      {bgImage && (
        <div aria-hidden={bgAlt ? undefined : true} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src={bgImage} alt={bgAlt} fill priority quality={90} sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
          {/* Velo de legibilidad (§2.3: overlay negro 40-50% sobre el gradiente/foto) */}
          <div style={{ position: 'absolute', inset: 0,
            background: centered
              ? 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.5) 100%)'
              : 'linear-gradient(90deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.15) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(120% 90% at 100% 0%, rgba(214,53,149,0.18) 0%, rgba(232,90,44,0.10) 40%, transparent 70%)' }} />
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: centered ? '900px' : '1100px',
        marginInline: centered ? 'auto' : undefined, textAlign: centered ? 'center' : 'left' }}>
        {eyebrow && <SectionEyebrow number={eyebrow.number} text={eyebrow.text} />}

        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.6rem, 9vw, 5.5rem)', fontWeight: 800,
          letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', marginBottom: subtitle || body ? '1rem' : '1.75rem' }}>
          {title}
        </h1>

        {subtitle && (
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 600,
            letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff', maxWidth: '24ch',
            marginInline: centered ? 'auto' : undefined, marginBottom: body ? '1.25rem' : '2rem' }}>
            {subtitle}
          </h2>
        )}

        {body && (
          <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)',
            maxWidth: '50ch', marginInline: centered ? 'auto' : undefined, marginBottom: '2.25rem' }}>
            {body}
          </p>
        )}

        {ctas.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem',
            justifyContent: centered ? 'center' : 'flex-start' }}>
            {ctas.map((c) => (
              <CTAButton key={c.label} href={c.href} variant={c.variant ?? 'primary'} arrow={c.arrow ?? true}>
                {c.label}
              </CTAButton>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
