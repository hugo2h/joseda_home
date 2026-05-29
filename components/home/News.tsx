import SectionEyebrow from '@/components/SectionEyebrow';
import Card from '@/components/Card';
import CTAButton from '@/components/CTAButton';

// ── 08 · NOVEDADES — 3 cards de blog (§5.2) ──
// ⚠️ Placeholder: pendiente conectar al blog real (§8). Sustituir POSTS.
const POSTS = [
  {
    image: '/images/ponencia-7.jpg',
    imageAlt: 'Artículo de blog',
    meta: 'Aula · 22 may 2026',
    title: 'Cinco usos de la IA que sí ahorran tiempo al corregir.',
    linkText: 'Leer',
    href: '/blog',
  },
  {
    image: '/images/ponencia-9.jpg',
    imageAlt: 'Artículo de blog',
    meta: 'Criterio · 8 may 2026',
    title: 'Lo que la IA no debería hacer nunca por un docente.',
    linkText: 'Leer',
    href: '/blog',
  },
  {
    image: '/images/ponencia-11.jpg',
    imageAlt: 'Artículo de blog',
    meta: 'Casos · 30 abr 2026',
    title: 'Cómo un claustro pasó del miedo a la IA al criterio.',
    linkText: 'Leer',
    href: '/blog',
  },
];

export default function News() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionEyebrow number="08" text="Novedades" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '24ch', marginBottom: '2.5rem' }}>
          Ideas, casos reales y lo último de IA aplicada a la educación.
        </h2>

        <div style={{ display: 'grid', gap: '1.25rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
          {POSTS.map((p) => (
            <Card key={p.title} image={p.image} imageAlt={p.imageAlt} meta={p.meta}
              title={p.title} linkText={p.linkText} href={p.href} />
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <CTAButton variant="ghost" href="/blog">Ver todas las novedades</CTAButton>
        </div>
      </div>
    </section>
  );
}
