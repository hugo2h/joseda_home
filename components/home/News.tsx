import Link from 'next/link';
import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import { getAllPosts, formatDate } from '@/lib/blog';

// ── 08 · NOVEDADES — Hero post + sidebar (asimétrico tipo periódico) ──
export default function News() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionEyebrow number="08" text="Novedades" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '24ch', marginBottom: '2.5rem' }}>
          Ideas, casos reales y lo último de IA aplicada a la educación.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mt-12">
          {/* Artículo destacado */}
          <Link href={`/blog/${featured.slug}`} className="lg:col-span-2 group cursor-pointer flex flex-col justify-center">
            <article>
              <p className="text-sm font-mono text-purple-400 mb-4 tracking-wide">
                {featured.category} · {formatDate(featured.date)}
              </p>
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500 shadow-2xl shadow-purple-900/20">
                {featured.coverImage ? (
                  <Image src={featured.coverImage} alt={featured.title} fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-zinc-900" />
                )}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors leading-tight tracking-tight">
                {featured.title}
              </h3>
              <p className="line-clamp-3 text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-500 hover:scale-105 transition-all duration-300 w-fit">
                Leer artículo principal
              </span>
            </article>
          </Link>

          {/* Feed secundario */}
          <div className="lg:col-span-1 flex flex-col justify-start space-y-10 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-10">
            {secondary.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer flex flex-col p-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex items-center gap-2 text-xs font-mono mb-3">
                    <span className="text-purple-400">{post.category}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">{formatDate(post.date)}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <span className="mt-4 text-sm font-bold text-zinc-500 group-hover:text-purple-400 flex items-center gap-2 transition-colors">
                    Leer <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <CTAButton variant="ghost" href="/blog">Ver todas las novedades</CTAButton>
        </div>
      </div>
    </section>
  );
}
