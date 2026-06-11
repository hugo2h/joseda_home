import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate } from '@/lib/blog';

// ── BLOG — Artículo individual (Server Component async) ──

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} — Blog Joseda`,
      description: post.excerpt,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: 'article',
        title: post.title,
        description: post.excerpt,
        url: `/blog/${slug}`,
        publishedTime: post.date,
        authors: ['José David Pérez Ibáñez'],
        images: [{ url: post.coverImage ?? '/images/logo-joseda-white.png' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage ?? '/images/logo-joseda-white.png'],
      },
    };
  } catch {
    return { title: 'Artículo no encontrado' };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Sugeridos: otros posts (máx. 3, sin el actual)
  const sugeridos = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'José David Pérez Ibáñez' },
    publisher: { '@type': 'Organization', name: 'SERENDIPIUM IA S.L.' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://joseda.education/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* CABECERA */}
        <section className="section" style={{ background: 'var(--bg-primary)', paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/blog" style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--eyebrow-color)', textDecoration: 'none' }}>
                ← Blog
              </Link>
              <span style={{ color: 'var(--border-subtle)' }}>·</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min de lectura
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', marginBottom: '1.25rem' }}>
              {post.title}
            </h1>

            {post.excerpt && (
              <p style={{ fontSize: 'clamp(1.05rem,1.8vw,1.2rem)', lineHeight: 1.65,
                color: 'rgba(255,255,255,0.72)', maxWidth: '60ch', marginBottom: '3rem' }}>
                {post.excerpt}
              </p>
            )}

            <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: '3rem' }} />
          </div>
        </section>

        {/* CUERPO */}
        <section style={{ background: 'var(--bg-primary)', paddingBottom: 'clamp(4rem,10vh,7rem)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <style>{`
              [data-blog-body] h2 { font-family: var(--sans); font-size: clamp(1.4rem,3vw,1.9rem); font-weight: 700; letter-spacing: -0.025em; color: #fff; margin: 2.5rem 0 0.85rem; }
              [data-blog-body] h3 { font-family: var(--sans); font-size: clamp(1.1rem,2vw,1.35rem); font-weight: 600; color: #fff; margin: 2rem 0 0.65rem; }
              [data-blog-body] p  { font-size: clamp(0.98rem,1.8vw,1.08rem); line-height: 1.8; color: rgba(255,255,255,0.82); margin-bottom: 1.4rem; }
              [data-blog-body] a  { color: var(--link-color); text-decoration: underline; text-underline-offset: 3px; }
              [data-blog-body] ul, [data-blog-body] ol { padding-left: 1.5rem; margin-bottom: 1.4rem; }
              [data-blog-body] li { font-size: clamp(0.98rem,1.8vw,1.08rem); line-height: 1.75; color: rgba(255,255,255,0.82); margin-bottom: 0.4rem; }
              [data-blog-body] hr { border: none; border-top: 1px solid var(--border-subtle); margin: 2.5rem 0; }
              [data-blog-body] blockquote { border-left: 3px solid var(--eyebrow-color); padding-left: 1.25rem; margin: 1.5rem 0; color: var(--text-secondary); font-style: italic; }
              [data-blog-body] strong { color: #fff; font-weight: 700; }
              [data-blog-body] code { font-family: var(--mono); font-size: 0.88em; background: var(--bg-card); padding: 0.15em 0.4em; border-radius: 4px; }
            `}</style>
            <div data-blog-body dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </section>
      </article>

      {/* CTA BOLETÍN */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--eyebrow-color)', marginBottom: '1rem' }}>EDU + IA</p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '1rem' }}>
            ¿Te ha resultado útil? Cada semana hay más.
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Suscríbete al boletín EDU + IA y recibe ideas como esta cada semana.
          </p>
          <CTAButton href="/boletin" variant="primary">Suscribirme al boletín</CTAButton>
        </div>
      </section>

      {/* SUGERIDOS */}
      {sugeridos.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-primary)' }}>
          <div className="container">
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--eyebrow-color)', marginBottom: '2rem' }}>También te puede interesar</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.5rem' }}>
              {sugeridos.map((p) => (
                <Card key={p.slug}
                  meta={`${p.category} · ${formatDate(p.date)}`}
                  title={p.title}
                  body={p.excerpt}
                  linkText="Leer artículo"
                  href={`/blog/${p.slug}`}
                  center
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
