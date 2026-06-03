import type { Metadata } from 'next';
import Hero         from '@/components/home/Hero';
import TrustedBy    from '@/components/home/TrustedBy';
import AboutTeaser  from '@/components/home/AboutTeaser';
import Manifesto    from '@/components/home/Manifesto';
import HowIHelp     from '@/components/home/HowIHelp';
import Newsletter   from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import News         from '@/components/home/News';
import FinalCTA     from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Schema.org Person (§2.9)
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type'   : 'Person',
  name          : 'José David Pérez Ibáñez',
  alternateName : 'Joseda',
  jobTitle      : 'Formador de docentes en IA educativa · Maestro · Psicopedagogo · Ingeniero',
  description   : 'Maestro en activo, psicopedagogo e ingeniero de telecomunicación. Forma a docentes y centros en el uso de la inteligencia artificial con criterio pedagógico.',
  url           : 'https://joseda.education',
  worksFor      : { '@type': 'Organization', name: 'SERENDIPIUM IA S.L.' },
  sameAs: [
    'https://www.linkedin.com/in/jose-david-perez-ibanez/',
    'https://www.youtube.com/@jose-david',
    'https://www.instagram.com/joseda.education',
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <TrustedBy />
      <AboutTeaser />
      <Manifesto />
      <HowIHelp />
      <Newsletter />
      <Testimonials />
      <News />
      <FinalCTA />
    </>
  );
}
