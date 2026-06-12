// ─────────────────────────────────────────────────────────────────────────────
// lib/blogTypes.ts — Tipos y utilidades del blog seguros para Client Components.
// No importa 'fs'/'path' (a diferencia de lib/blog.ts) para poder usarse en el cliente.
// ─────────────────────────────────────────────────────────────────────────────

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: number;
  coverImage?: string;
  draft?: boolean;
};

export type Post = PostMeta & { contentHtml: string };

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
