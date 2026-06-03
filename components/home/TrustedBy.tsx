import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee, { type MarqueeLogo } from '@/components/LogoMarquee';

// ── 02 · HAN CONFIADO EN MÍ — 3 filas de logos en marquee (§5.2 / §6) ──
// Logos reales confirmados. Las instituciones aún sin logo o sin confirmar se
// añaden cuando estén (ver §6: confirmar colaboración antes de publicar).
const ROW_1: MarqueeLogo[] = [
  { name: 'ESA — Agencia Espacial Europea', src: '/logos/esa.png' },
  { name: 'ONU', src: '/logos/onu.png' },
  { name: 'Google for Education', src: '/logos/google.webp' },
  { name: 'Ministerio de Educación, FP y Deportes', src: '/logos/ministerio-educacion.png' },
  { name: 'Junta de Andalucía', src: '/logos/junta-andalucia.png' },
  { name: 'Xunta de Galicia', src: '/logos/xunta-galicia.png' },
];

const ROW_2: MarqueeLogo[] = [
  { name: 'Universidad de Alicante', src: '/logos/universidad-alicante.webp' },
  { name: 'SEPE', src: '/logos/sepe.jpg' },
  { name: 'FUNDAE', src: '/logos/fundae.webp' },
  { name: 'Universidad Miguel Hernández de Elche', src: '/logos/umh.png' },
  { name: 'SIMO Educación', src: '/logos/simo.png' },
  { name: 'Edpuzzle', src: '/logos/edpuzzle.png' },
];

const ROW_3: MarqueeLogo[] = [
  { name: 'Edelvives', src: '/logos/edelvives.jpg' },
  { name: 'AMCO', src: '/logos/amco.png' },
  { name: 'Escuelas Católicas', src: '/logos/escuelas-catolicas.png' },
  { name: 'Jesuitas (Compañía de Jesús)', src: '/logos/jesuitas.png' },
  { name: 'Salesianos', src: '/logos/salesianos.png' },
];

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
        <LogoMarquee logos={ROW_1} direction="right" duration={65} />
        <LogoMarquee logos={ROW_2} direction="left"  duration={55} />
        <LogoMarquee logos={ROW_3} direction="right" duration={72} />
      </div>
    </section>
  );
}
