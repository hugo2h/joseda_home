import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://joseda.education';

// Rutas públicas existentes en este repo (Dev A). Las de Dev B se añadirán
// cuando estén disponibles (/cursos, /formaciones, /ponencias, /podcasts, /boletin…).
const ROUTES = ['', '/sobre-joseda', '/contacto'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const blogIndexEntry: MetadataRoute.Sitemap = [{
    url: `${SITE_URL}/blog`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }];

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogIndexEntry, ...postEntries];
}
