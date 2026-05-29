'use client';

import ExpandableGallery, { type GalleryItem } from '@/components/ui/expandable-gallery';

// ─── Datos ────────────────────────────────────────────────────────────────────
const PODCASTS: GalleryItem[] = [
  {
    id         : 'tribu-de-profes',
    num        : '01',
    title      : 'Tribu de Profes',
    subtitle   : 'Educación · IA',
    description: 'El podcast para docentes que quieren transformar su práctica educativa con IA y tecnología.',
    cta        : 'Escuchar',
    image      : '/images/jd-stage.jpg',
  },
  {
    id         : 'vamos-a-clase',
    num        : '02',
    title      : '¡Vamos a clase!',
    subtitle   : 'Recursos didácticos',
    description: 'Recursos, estrategias y herramientas prácticas para el día a día en el aula.',
    cta        : 'Escuchar',
    image      : '/images/ponencia-7.jpg',
  },
  {
    id         : 'google-edu',
    num        : '03',
    title      : 'Google Edu Podcast',
    subtitle   : 'EdTech · Google',
    description: 'Conversaciones sobre tecnología educativa, Google Workspace y transformación digital en centros escolares.',
    cta        : 'Escuchar',
    image      : '/images/ponencia-9.jpg',
  },
  {
    id         : 'leocuentos',
    num        : '04',
    title      : 'LEOcuentos',
    subtitle   : 'Lectura · Primaria',
    description: 'Cuentos y relatos para fomentar el amor por la lectura en los más pequeños.',
    cta        : 'Escuchar',
    image      : '/images/ponencia-11.jpg',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Podcasts — galería de acordeón horizontal expandible (B&N)
// ─────────────────────────────────────────────────────────────────────────────
export default function Podcasts() {
  return (
    <section
      id="podcasts"
      style={{
        padding      : 'clamp(3rem, 8vh, 6rem) 5vw',
        display      : 'flex',
        flexDirection: 'column',
        gap          : 'clamp(2rem, 5vh, 3.5rem)',
      }}
    >
      {/* ── Cabecera ── */}
      <div>
        <p style={{
          fontFamily   : 'monospace',
          fontSize     : '0.75rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color        : '#71717a',
          marginBottom : '1rem',
        }}>
          04 / Podcasts
        </p>
        <h2 style={{
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight   : 800,
          letterSpacing: '-0.045em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Voces que inspiran.
        </h2>
      </div>

      <ExpandableGallery items={PODCASTS} />
    </section>
  );
}
