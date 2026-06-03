import type { MetadataRoute } from 'next';

const SITE_URL = 'https://joseda.education';

// Rutas públicas existentes en este repo (Dev A). Las de Dev B se añadirán
// cuando estén disponibles (/cursos, /formaciones, /ponencias, /podcasts, /boletin, /blog…).
const ROUTES = ['', '/sobre-joseda', '/contacto'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
