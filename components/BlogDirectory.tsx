'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Reveal from '@/components/Reveal';
import CTAButton from '@/components/CTAButton';
import { formatDate, type PostMeta } from '@/lib/blogTypes';

// ── BLOG — Directorio interactivo: búsqueda + filtros + paginación ──

const POSTS_PER_PAGE = 9;

export default function BlogDirectory({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['Todos', ...Array.from(new Set(initialPosts.map((p) => p.category)))];

  const filteredPosts = initialPosts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = query === ''
      || post.title.toLowerCase().includes(query)
      || post.excerpt.toLowerCase().includes(query);
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      {/* BUSCADOR + FILTROS */}
      <div style={{ marginTop: '2rem' }}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar artículos…"
          style={{
            width: '100%',
            maxWidth: 480,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12,
            padding: '0.85rem 1.25rem',
            color: '#fff',
            fontSize: '1rem',
            fontFamily: 'var(--sans)',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '0.4rem 0.85rem', borderRadius: 999, cursor: 'pointer',
                  background: active ? 'rgba(181,159,229,0.18)' : 'transparent',
                  border: `1px solid ${active ? 'var(--eyebrow-color)' : 'var(--border-subtle)'}`,
                  color: active ? 'var(--eyebrow-color)' : 'var(--text-secondary)',
                  transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* GRID DE ARTÍCULOS */}
      <div style={{ marginTop: '2.5rem' }}>
        {visiblePosts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            No se han encontrado artículos con esos criterios.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.75rem' }}>
            <style>{`
              .blog-card { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; }
              .blog-card:hover { transform: scale(1.03) translateX(6px); box-shadow: 0 16px 45px rgba(168,85,247,0.35); }
            `}</style>
            {visiblePosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07} style={{ height: '100%' }}>
                <Card
                  className="blog-card"
                  meta={`${post.category} · ${formatDate(post.date)} · ${post.readingTime} min`}
                  title={post.title}
                  body={post.excerpt}
                  linkText="Leer artículo"
                  href={`/blog/${post.slug}`}
                  center
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '3rem' }}>
          <CTAButton
            variant="secondary"
            arrow={false}
            onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
            style={currentPage === 1 ? { opacity: 0.35, pointerEvents: 'none' } : undefined}
          >
            ← Anterior
          </CTAButton>

          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em',
            color: 'var(--text-secondary)', padding: '0 0.5rem' }}>
            {currentPage} / {totalPages}
          </span>

          <CTAButton
            variant="secondary"
            arrow={false}
            onClick={() => currentPage < totalPages && setCurrentPage((p) => p + 1)}
            style={currentPage === totalPages ? { opacity: 0.35, pointerEvents: 'none' } : undefined}
          >
            Siguiente →
          </CTAButton>
        </div>
      )}
    </>
  );
}
