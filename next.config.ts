import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Next 16 exige whitelist de calidades; sin esto, quality={100} se ignora (cae a 75).
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // "Cursos" → web del curso ProfeLibre.
      { source: '/cursos', destination: 'https://profelibre.joseda.education/', permanent: false },
      // Legales → páginas del footer de ProfeLibre (por si alguien entra por /legal/*).
      { source: '/legal/aviso-legal', destination: 'https://profelibre.joseda.education/aviso-legal', permanent: false },
      { source: '/legal/privacidad', destination: 'https://profelibre.joseda.education/politica-privacidad', permanent: false },
      { source: '/legal/cookies', destination: 'https://profelibre.joseda.education/politica-cookies', permanent: false },
    ];
  },
};

export default nextConfig;
