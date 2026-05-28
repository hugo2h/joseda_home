'use client';

import HeroJD    from '@/components/HeroJD';
import PageLayout from '@/components/PageLayout';
import AboutJD   from '@/components/AboutJD';
import Cursos    from '@/components/Cursos';
import Podcasts  from '@/components/Podcasts';
import ContactJD from '@/components/ContactJD';
import FooterJD  from '@/components/FooterJD';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero — vídeo cinematográfico, 100vh */}
      <HeroJD />

      {/* Sobre Mí — Bento Grid con efecto Spotlight */}
      <AboutJD />

      {/* Cursos — Horizontal scroll (Aristide Benoist style) */}
      <Cursos />

      {/* Podcasts — Horizontal scroll */}
      <Podcasts />

      {/* Contacto */}
      <div className="cards-wrapper" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="section-card"><ContactJD /></div>
      </div>

      <FooterJD />

    </PageLayout>
  );
}
