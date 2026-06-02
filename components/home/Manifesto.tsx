import SectionEyebrow from '@/components/SectionEyebrow';

// ── 04 · MANIFIESTO — fondo negro absoluto, solo tipografía (§5.2) ──
export default function Manifesto() {
  return (
    <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(5rem, 14vh, 9rem)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <SectionEyebrow number="04" text="Manifiesto" />

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.6rem, 9vw, 6rem)', fontWeight: 800,
          letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff', marginBottom: '2.5rem' }}>
          No estás roto.<br />El sistema lo está.
        </h2>

        <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '56ch' }}>
          Si un médico se llevara doce horas de trabajo a casa cada semana, sería un escándalo en el telediario.
          En docencia lo llamamos vocación y miramos para otro lado.
        </p>

        <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)',
          maxWidth: '56ch', marginTop: '1.5rem' }}>
          No es que no llegues. Es que te piden absurdos.
        </p>

        <div aria-hidden="true" style={{ width: 64, height: 3, background: 'var(--brand-gradient)', margin: '2.5rem 0' }} />

        <p style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)', lineHeight: 1.55, color: '#fff', fontWeight: 500, maxWidth: '50ch' }}>
          La IA bien usada no te convierte en un robot: te devuelve las horas que el sistema te roba.
        </p>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800,
          fontStyle: 'italic', letterSpacing: '-0.03em', color: '#fff', marginTop: '2rem' }}>
          Eso es ser un profe libre.
        </p>
      </div>
    </section>
  );
}
