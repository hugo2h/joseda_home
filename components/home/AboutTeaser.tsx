import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';

// ── 03 · SOBRE JOSEDA — COLOR MOMENT #1 · gradiente vibrante (§5.2) ──
export default function AboutTeaser() {
  return (
    <section
      style={{
        position    : 'relative',
        background  : 'var(--grad-moment)',
        paddingBlock: 'clamp(4.5rem, 12vh, 8rem)',
        overflow    : 'hidden',
      }}
    >
      {/* Sutil oscurecido en los bordes para legibilidad */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>

        <div style={{ alignSelf: 'stretch' }}>
          <SectionEyebrow number="03" text="Sobre Joseda" />
        </div>

        {/* Retrato B/N */}
        <Reveal>
          <div style={{ position: 'relative', width: 'clamp(180px, 40vw, 260px)', aspectRatio: '1 / 1',
            borderRadius: '20px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.85)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
            <Image src="/images/jose-david-contacto.jpg" alt="Joseda" fill quality={90}
              sizes="260px" style={{ objectFit: 'cover', objectPosition: 'center 25%', filter: 'grayscale(100%) contrast(1.05)' }} />
          </div>
        </Reveal>

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.4rem, 8vw, 4.5rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.98, color: '#fff' }}>
          Maestro.<br />Psicopedagogo.<br />Ingeniero.
        </h2>

        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
          Tres miradas. Una persona detrás de cada formación.
        </p>

        <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.9)', maxWidth: '54ch' }}>
          Llevo años traduciendo la inteligencia artificial al aula real. No vengo del marketing: vengo de la
          tiza, las programaciones a las 11 de la noche y los septiembres reventado. Por eso enseño a usar la
          IA con criterio, no con hype.
        </p>

        <div style={{ marginTop: '0.5rem' }}>
          <CTAButton variant="secondary" href="/sobre-joseda">Conoce mi historia</CTAButton>
        </div>
      </div>
    </section>
  );
}
