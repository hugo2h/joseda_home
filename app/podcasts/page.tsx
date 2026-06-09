import type { Metadata } from 'next';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Podcasts — Joseda',
  description: 'Conversaciones y píldoras sobre IA y educación. Próximamente.',
};

export default function PodcastsPage() {
  return (
    <section style={{ background: 'var(--bg-primary)', minHeight: '80svh', display: 'flex',
      flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <SectionEyebrow text="Podcasts" />
        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.6rem, 9vw, 5rem)', fontWeight: 800,
          letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', margin: '0.75rem 0 1.25rem' }}>
          Próximamente…
        </h1>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.65, color: 'var(--text-secondary)',
          maxWidth: '52ch', marginBottom: '2.5rem' }}>
          Estoy preparando conversaciones y píldoras sobre IA y educación, con criterio docente y los pies
          en la tierra. Mientras tanto, suscríbete al boletín y serás de los primeros en escucharlas.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <CTAButton href="/boletin" variant="primary">Suscríbete a EDU + IA</CTAButton>
          <CTAButton href="/" variant="secondary" arrow={false}>Volver al inicio</CTAButton>
        </div>
      </div>
    </section>
  );
}
