import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee from '@/components/LogoMarquee';

// ── 02 · HAN CONFIADO EN MÍ — 3 filas de logos en marquee (§5.2 / §6) ──
// Wordmarks de texto como stopgap hasta tener los SVG monocromos curados (§8).
const ROW_1 = ['ESA', 'ONU', 'Google for Education', 'Ministerio de Educación', 'Junta de Andalucía', 'Xunta de Galicia', 'Universidad de Alicante', 'SEPE', 'FUNDAE'];
const ROW_2 = ['Edelvives', 'Edpuzzle', 'Escuelas Católicas', 'CEFIRE', 'AMCO', 'SIMO Educación', 'Maecenas', 'Grupo AE'];
const ROW_3 = ['Maristas', 'Jesuitas', 'Salesianos', 'Escolapios', 'Agustinos', 'Teresianas', 'UNED', 'La Salle Madrid', 'UMH'];

export default function TrustedBy() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container" style={{ marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}>
        <SectionEyebrow number="02" text="Han confiado en mí" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3.25rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '20ch' }}>
          Más de 15 años formando a docentes en instituciones, congregaciones y organismos.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 3vh, 2rem)' }}>
        <LogoMarquee logos={ROW_1} direction="right" duration={65} />
        <LogoMarquee logos={ROW_2} direction="left"  duration={55} />
        <LogoMarquee logos={ROW_3} direction="right" duration={72} />
      </div>
    </section>
  );
}
