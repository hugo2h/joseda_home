'use client';

import HeroJD    from '@/components/HeroJD';
import PageLayout from '@/components/PageLayout';
import AboutJD   from '@/components/AboutJD';
import Cursos    from '@/components/Cursos';
import Podcasts  from '@/components/Podcasts';
import ContactJD from '@/components/ContactJD';
import { MagicText } from '@/components/ui/magic-text';
import StackSection from '@/components/ui/stack-section';
import CinematicFooter from '@/components/ui/motion-footer';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero — vídeo cinematográfico, 100vh */}
      <HeroJD />

      {/* Texto mágico — revelado palabra a palabra al scroll (monocromo) */}
      <MagicText text="José David. Maestro. Ingeniero. Formador de docentes." />

      {/* Sobre Mí — Scroll Storytelling inmersivo (retrato sticky + texto) */}
      <AboutJD />

      {/* Cursos + Podcasts — galería acordeón horizontal con stacking 3D */}
      <StackSection>
        <Cursos />
      </StackSection>

      <StackSection>
        <Podcasts />
      </StackSection>

      {/* Contacto — ultra minimalista */}
      <ContactJD />

      {/* Footer cinemático */}
      <CinematicFooter />

    </PageLayout>
  );
}
