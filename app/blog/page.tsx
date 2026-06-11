import SectionEyebrow from '@/components/SectionEyebrow';
import BlogDirectory from '@/components/BlogDirectory';
import { getAllPosts } from '@/lib/blog';

// ── BLOG — Índice de artículos (Server Component) ──

export const metadata = {
  title: 'Blog — Joseda',
  description: 'Ideas sobre IA y educación que llegan al lunes siguiente.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
};

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
        </div>
      </section>

      {/* DIRECTORIO INTERACTIVO */}
      <section className="section" style={{ background: 'var(--bg-primary)', paddingTop: 0 }}>
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Próximamente — los primeros artículos están en camino.</p>
          ) : (
            <BlogDirectory initialPosts={posts} />
          )}
        </div>
      </section>
    </>
  );
}
