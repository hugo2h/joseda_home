'use client';

import HeroJD    from '@/components/HeroJD';
import PageLayout from '@/components/PageLayout';
import AboutJD   from '@/components/AboutJD';
import Cursos    from '@/components/Cursos';
import Podcasts  from '@/components/Podcasts';
import ContactJD from '@/components/ContactJD';
import { MagicText } from '@/components/ui/magic-text';
import CinematicFooter from '@/components/ui/motion-footer';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero — vídeo cinematográfico, 100vh */}
      <HeroJD />

      {/* Texto mágico — revelado palabra a palabra al scroll (monocromo) */}
      <MagicText text="José David. Maestro. Ingeniero. Formador de docentes." />

      {/* Sobre Mí — ContainerScroll 3D + Bento Grid con efecto Spotlight */}
      <AboutJD />

      {/* Cursos — Acordeón vertical (Aristide Benoist style) */}
      <Cursos />

      {/* Podcasts — Acordeón vertical */}
      <Podcasts />

      {/* Contacto — ultra minimalista */}
      <ContactJD />

      {/* Footer cinemático */}
      <CinematicFooter />

    </PageLayout>
  );
}
