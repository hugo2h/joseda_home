import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';

// ── 03 · SOBRE JOSEDA — COLOR MOMENT #1 · gradiente vibrante (§5.2) ──
// Composición: vertical en móvil (imagen arriba), imagen a la derecha en desktop.
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

      <div className="container about03" style={{ position: 'relative', zIndex: 1 }}>
        {/* Texto */}
        <div className="about03__text">
          <SectionEyebrow number="03" text="Sobre Joseda" />

          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.4rem, 8vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 0.98, color: '#fff', marginBottom: '1rem' }}>
            Maestro.<br />Psicopedagogo.<br />Ingeniero.
          </h2>

          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', fontWeight: 600, color: '#fff',
            letterSpacing: '-0.01em', marginBottom: '1rem' }}>
            Tres miradas. Una persona detrás de cada formación.
          </p>

          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.9)',
            maxWidth: '52ch', marginBottom: '1.75rem' }}>
            Llevo años traduciendo la inteligencia artificial al aula real. No vengo del marketing: vengo de la
            tiza, las programaciones a las 11 de la noche y los septiembres reventado. Por eso enseño a usar la
            IA con criterio, no con hype.
          </p>

          <CTAButton variant="secondary" href="/sobre-joseda">Conoce mi historia</CTAButton>
        </div>

        {/* Retrato a color */}
        <Reveal as="div" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="about03__media" style={{ position: 'relative', width: '100%', maxWidth: 360,
            aspectRatio: '3 / 4', borderRadius: '20px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.18)', boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
            <Image src="/images/jose-david-contacto.jpg" alt="Joseda dando una formación" fill quality={90}
              sizes="(max-width: 900px) 80vw, 360px" style={{ objectFit: 'cover', objectPosition: 'center 12%' }} />
          </div>
        </Reveal>
      </div>

      {/* Layout responsive: vertical en móvil (imagen arriba), imagen a la derecha en desktop */}
      <style>{`
        .about03 { display: grid; gap: 2rem; align-items: center; }
        .about03 > div:last-child { order: -1; }          /* imagen arriba en móvil */
        .about03__text { text-align: center; }
        @media (min-width: 900px) {
          .about03 { grid-template-columns: 1.05fr 0.95fr; gap: clamp(2rem, 5vw, 4rem); }
          .about03 > div:last-child { order: 1; }          /* imagen a la derecha en desktop */
          .about03__text { text-align: left; }
        }
      `}</style>
    </section>
  );
}
