import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';

// ── 09 · CTA FINAL — cierre editorial (§5.2) ──
export default function FinalCTA() {
  return (
    <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(5rem, 14vh, 9rem)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <SectionEyebrow number="09" text="Da el siguiente paso" />

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 6vw, 3.6rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', maxWidth: '20ch', marginBottom: '2.5rem' }}>
          Si has llegado hasta aquí, algo te resuena. Tú decides cómo seguir.
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
          <CTAButton variant="secondary" href="/contacto">Hablemos de tu proyecto</CTAButton>
        </div>
      </div>
    </section>
  );
}
