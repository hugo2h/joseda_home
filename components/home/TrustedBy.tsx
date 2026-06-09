import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import { LOGO_ROWS } from '@/components/institutionLogos';

// ── 02 · HAN CONFIADO EN MIS FORMACIONES — 3 filas de logos en marquee (§5.2) ──
// Logos institucionales (20) desde components/institutionLogos.ts (set canónico
// de profelibre.joseda.education). Render monocromo blanco vía LogoMarquee.
export default function TrustedBy() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container" style={{ marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}>
        <SectionEyebrow number="02" text="Han confiado en mis formaciones" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3.25rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '20ch' }}>
          Más de 15 años formando a docentes en instituciones, congregaciones y organismos.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
        <LogoMarquee logos={LOGO_ROWS[0]} direction="right" duration={65} />
        <LogoMarquee logos={LOGO_ROWS[1]} direction="left"  duration={58} />
        <LogoMarquee logos={LOGO_ROWS[2]} direction="right" duration={72} />
      </div>
    </section>
  );
}
