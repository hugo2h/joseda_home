import type { Metadata } from 'next';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title      : 'Podcasts',
  description: 'Los pódcasts de educación de José David: Tribu de Profes, Libros de Educación, Acción Educativa y más. Conversaciones sobre enseñanza, IA y criterio docente.',
};

// ── Podcasts (datos reales de jose-david.com/podcast) ──
const EN_ACTIVO = [
  {
    name: 'Tribu de Profes',
    desc: 'El pódcast semanal de educación: actualidad, competencia digital, evaluación e inteligencia artificial para aprender y reflexionar sobre el aula.',
    href: 'https://open.spotify.com/show/1uzkIrSrMjSHxwkC1odyLG',
    cta : 'Escuchar en Spotify',
  },
  {
    name: 'Libros de Educación',
    desc: 'Análisis y conversación sobre los libros educativos más relevantes, junto a David Santos y Jordi Rodríguez.',
    href: 'https://www.librosdeeducacion.com',
    cta : 'Escuchar',
  },
  {
    name: 'Acción Educativa',
    desc: 'Un pódcast sobre el trabajo interdisciplinar por proyectos, junto a Jordi Rodríguez.',
    href: 'https://www.librosdeeducacion.com',
    cta : 'Escuchar',
  },
];

const ANTERIORES = [
  {
    name: 'Google Edu Podcast',
    desc: 'Transformación educativa con las herramientas de Google, junto a David Santos.',
    href: 'https://www.googleedupodcast.com',
    cta : 'Escuchar',
  },
  {
    name: 'LEOcuentos',
    desc: 'Un cuento en cada episodio. Estuvo destacado en la categoría de Nuevos y Destacados de Apple Podcasts.',
    href: 'https://leocuentos.es',
    cta : 'Escuchar',
  },
];

function PodcastCard({ name, desc, href, cta }: { name: string; desc: string; href: string; cta: string }) {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.75rem', height: '100%' }}>
      <span aria-hidden="true" style={{ fontSize: '1.6rem', lineHeight: 1 }}>🎙️</span>
      <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.2rem, 2.4vw, 1.45rem)', fontWeight: 700,
        letterSpacing: '-0.02em', color: '#fff' }}>{name}</h3>
      <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-secondary)', flexGrow: 1 }}>{desc}</p>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600,
          color: 'var(--accent-blue-soft)' }}>
        {cta} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export default function Podcasts() {
  return (
    <>
      {/* Intro */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <SectionEyebrow text="Podcasts" />
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', maxWidth: '20ch', marginBottom: '1.25rem' }}>
            Conversaciones sobre educación, con criterio.
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.6, color: 'var(--text-secondary)',
            maxWidth: '56ch' }}>
            Llevo años grabando pódcasts para pensar la educación en voz alta: enseñanza, IA, evaluación y los temas
            que de verdad ocupan al profesorado. Estos son los que tengo en marcha y los que ya forman parte del
            archivo.
          </p>
        </div>
      </section>

      {/* En activo */}
      <section className="section" style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(2rem, 6vh, 4rem)' }}>
        <div className="container">
          <SectionEyebrow text="En activo" />
          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '0.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            {EN_ACTIVO.map((p) => <PodcastCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* Anteriores */}
      <section className="section" style={{ background: 'var(--bg-deep)', paddingTop: 0 }}>
        <div className="container">
          <SectionEyebrow text="Del archivo" />
          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '0.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            {ANTERIORES.map((p) => <PodcastCard key={p.name} {...p} />)}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
            <CTAButton variant="secondary" href="/contacto">¿Colaboramos?</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
