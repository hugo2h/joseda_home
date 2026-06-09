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
      // "Cursos" → landing de lanzamiento (clase en directo 8 abril), servida desde /public.
      { source: '/cursos', destination: '/clase-en-directo.html', permanent: false },
      // Avisos legales → web anterior de Joseda (provisional, hasta tener páginas propias).
      { source: '/legal', destination: 'https://jose-david.com/legal/', permanent: false },
      { source: '/legal/:path*', destination: 'https://jose-david.com/legal/', permanent: false },
    ];
  },
};

export default nextConfig;
