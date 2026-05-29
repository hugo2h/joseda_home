import SectionEyebrow from '@/components/SectionEyebrow';
import Card from '@/components/Card';

// ── 05 · CÓMO TE AYUDO — 4 cards (1 col móvil · grid 2×2 desktop) (§5.2) ──
const CARDS = [
  { icon: '🎓', title: 'ProfeLibre',           body: 'El sistema completo para usar IA en el aula durante todo el curso. Curso + comunidad + acompañamiento.', linkText: 'Descubrir ProfeLibre', href: '/cursos/profelibre' },
  { icon: '🏫', title: 'Formaciones a medida', body: 'Para centros, redes de colegios, congregaciones y organismos. IA aplicada con sentido pedagógico.',     linkText: 'Pedir formación',      href: '/formaciones' },
  { icon: '🎤', title: 'Ponencias y charlas',  body: 'Intervenciones en congresos, jornadas y claustros. Inspirar y mover a la acción, sin humo.',                linkText: 'Contratar ponencia',   href: '/ponencias' },
  { icon: '🎙️', title: 'Podcasts',             body: 'Conversaciones y píldoras sobre IA y educación, con criterio y los pies en la tierra.',                       linkText: 'Escuchar',             href: '/podcasts' },
];

export default function HowIHelp() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionEyebrow number="05" text="Cómo te ayudo" />
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', marginTop: '0.5rem' }}>
          {CARDS.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} linkText={c.linkText} href={c.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
