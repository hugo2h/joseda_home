import { GraduationCap, School, MicVocal, Podcast } from 'lucide-react';
import Link from 'next/link';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 05 · CÓMO TE AYUDO — sistema de tarjetas unificado con icono interactivo ──
const ICON_PROPS = { size: 26, strokeWidth: 1.75, className: 'text-purple-400 group-hover:text-white transition-colors duration-300' };
const CARDS = [
  {
    icon: <GraduationCap {...ICON_PROPS} />,
    title: 'ProfeLibre',
    body: 'El sistema completo para usar IA en el aula durante todo el curso. Curso + comunidad + acompañamiento.',
    linkText: 'Descubrir ProfeLibre',
    href: '/cursos/profelibre',
  },
  {
    icon: <School {...ICON_PROPS} />,
    title: 'Formaciones a medida',
    body: 'Para centros, redes de colegios, congregaciones y organismos. IA aplicada con sentido pedagógico.',
    linkText: 'Pedir formación',
    href: '/formaciones',
  },
  {
    icon: <MicVocal {...ICON_PROPS} />,
    title: 'Ponencias y charlas',
    body: 'Intervenciones en congresos, jornadas y claustros. Inspirar y mover a la acción, sin humo.',
    linkText: 'Contratar ponencia',
    href: '/ponencias',
  },
  {
    icon: <Podcast {...ICON_PROPS} />,
    title: 'Podcasts',
    body: 'Conversaciones y píldoras sobre IA y educación, con criterio y los pies en la tierra.',
    linkText: 'Escuchar',
    href: '/podcasts',
  },
];

export default function HowIHelp() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionEyebrow number="05" text="Cómo te ayudo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col"
            >
              <div className="mb-6 w-12 h-12 rounded-xl bg-purple-500/10 border border-transparent flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors duration-300">
                {c.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{c.title}</h3>
              <p className="text-zinc-400 text-base leading-relaxed">{c.body}</p>
              <span className="mt-auto pt-6 flex items-center gap-2 text-purple-400 font-bold group-hover:gap-4 transition-all">
                {c.linkText} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
