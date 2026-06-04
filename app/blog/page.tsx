import SectionEyebrow from '@/components/SectionEyebrow';
import Card from '@/components/Card';
import Reveal from '@/components/Reveal';
import { getAllPosts, formatDate } from '@/lib/blog';

// ── BLOG — Índice de artículos (Server Component) ──

export const metadata = {
  title: 'Blog — Joseda',
  description: 'Ideas sobre IA y educación que llegan al lunes siguiente.',
};

const CATEGORIAS = ['Todos', 'IA', 'Pedagogía', 'Casos', 'Opinión'];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* HERO */}
      <section className="section" style={{ background: 'var(--bg-primary)', minHeight: '50svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container">
          <SectionEyebrow text="Blog" />
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.6rem,9vw,5.5rem)', fontWeight: 800,
            letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', marginTop: '0.75rem',
            marginBottom: '1.25rem', maxWidth: '18ch' }}>
            Ideas que llegan al lunes siguiente.
          </h1>
          <p style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', maxWidth: '48ch' }}>
            Reflexiones, casos y herramientas sobre IA y educación. Sin hype, con criterio docente.
          </p>

          {/* Chips de categoría — decorativos */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
            {CATEGORIAS.map((cat, i) => (
              <span key={cat} style={{
                fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0.4rem 0.85rem', borderRadius: 999,
                background: i === 0 ? 'rgba(181,159,229,0.18)' : 'transparent',
                border: `1px solid ${i === 0 ? 'var(--eyebrow-color)' : 'var(--border-subtle)'}`,
                color: i === 0 ? 'var(--eyebrow-color)' : 'var(--text-secondary)',
              }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GRID DE ARTÍCULOS */}
      <section className="section" style={{ background: 'var(--bg-primary)', paddingTop: 0 }}>
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Próximamente — los primeros artículos están en camino.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '1.75rem' }}>
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.07}>
                  <Card
                    meta={`${post.category} · ${formatDate(post.date)} · ${post.readingTime} min`}
                    title={post.title}
                    body={post.excerpt}
                    linkText="Leer artículo"
                    href={`/blog/${post.slug}`}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
