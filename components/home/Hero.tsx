import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';

// ── 01 · HERO — 95svh · foto Joseda escenario + CTA newsletter (§5.2) ──
export default function Hero() {
  return (
    <section
      style={{
        position      : 'relative',
        minHeight     : '95svh',
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        overflow      : 'hidden',
        paddingBlock  : 'clamp(3rem, 8vh, 6rem)',
      }}
    >
      {/* Foto de fondo (escenario) */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image src="/images/jd-stage.jpg" alt="" fill priority quality={90}
          sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
        {/* Velo para legibilidad + insinuación de color de escenario */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.78) 42%, rgba(10,10,10,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(120% 90% at 100% 0%, rgba(124,58,237,0.28) 0%, rgba(190,24,93,0.12) 40%, transparent 70%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
        <SectionEyebrow number="01" text="Inicio" />

        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(3.5rem, 14vw, 8rem)', fontWeight: 800,
          letterSpacing: '-0.05em', lineHeight: 0.92, color: '#fff', marginBottom: '0.75rem' }}>
          JOSEDA
        </h1>

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', fontWeight: 600,
          letterSpacing: '-0.025em', lineHeight: 1.08, color: '#fff', maxWidth: '18ch', marginBottom: '1.5rem' }}>
          Educación + Inteligencia Artificial, con criterio docente.
        </h2>

        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.6, color: 'var(--text-secondary)',
          maxWidth: '46ch', marginBottom: '2.5rem' }}>
          Ayudo a docentes y centros a usar la IA con método para enseñar mejor y recuperar su tiempo.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
          <CTAButton variant="secondary" href="/contacto" arrow={false}>Hablemos</CTAButton>
        </div>
      </div>
    </section>
  );
}
