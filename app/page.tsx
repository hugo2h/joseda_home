import Hero         from '@/components/home/Hero';
import TrustedBy    from '@/components/home/TrustedBy';
import AboutTeaser  from '@/components/home/AboutTeaser';
import Manifesto    from '@/components/home/Manifesto';
import HowIHelp     from '@/components/home/HowIHelp';
import Newsletter   from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import News         from '@/components/home/News';
import FinalCTA     from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
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
