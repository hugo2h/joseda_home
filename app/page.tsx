'use client';

// HeroJD ya no usa WebGL/Three.js — import directo, sin ssr:false
import HeroJD     from '@/components/HeroJD';
import PageLayout from '@/components/PageLayout';
import AboutJD    from '@/components/AboutJD';
import Cursos     from '@/components/Cursos';
import Podcasts   from '@/components/Podcasts';
import ContactJD  from '@/components/ContactJD';
import FooterJD   from '@/components/FooterJD';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero: pin + scrub GSAP, fondo fotográfico con overlay */}
      <HeroJD />

      {/* Sobre Mí — OS draggable windows full-bleed */}
      <AboutJD />

      {/* Cursos — 3 paneles con hover fan effect */}
      <div className="cards-wrapper">
        <div className="section-card"><Cursos /></div>
      </div>

      {/* Podcasts — lista con modal flotante */}
      <Podcasts />

      {/* Contacto — GSAP neural animation */}
      <div className="cards-wrapper">
        <div className="section-card"><ContactJD /></div>
      </div>

      <FooterJD />

    </PageLayout>
  );
}
