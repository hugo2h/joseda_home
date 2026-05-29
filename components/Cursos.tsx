'use client';

import ExpandableGallery, { type GalleryItem } from '@/components/ui/expandable-gallery';

// ─── Datos ────────────────────────────────────────────────────────────────────
const CURSOS: GalleryItem[] = [
  {
    id         : 'cursos-online',
    num        : '01',
    title      : 'Cursos Online para Docentes',
    subtitle   : 'IA en el aula',
    description: 'Formación online práctica y actualizada para integrar la Inteligencia Artificial en el aula. Aprende a automatizar tareas, crear recursos y recuperar tu tiempo sin perder calidad educativa.',
    cta        : 'Ver cursos',
    image      : '/images/ponencia-1.jpg',
  },
  {
    id         : 'formaciones',
    num        : '02',
    title      : 'Formaciones y Mentorías',
    subtitle   : 'Conferencias · Talleres',
    description: 'Ponente nacional e internacional para centros educativos, institutos y universidades. Talleres, conferencias y mentorías personalizadas para equipos docentes que quieren liderar el cambio.',
    cta        : 'Solicitar formación',
    image      : '/images/ponencia-3.jpg',
  },
  {
    id         : 'comunidad',
    num        : '03',
    title      : 'Comunidad Tribu de Profes',
    subtitle   : 'Networking docente',
    description: 'Una comunidad activa de docentes que comparten recursos, estrategias y herramientas de IA. Aprende en comunidad, avanza más rápido y conecta con otros profes innovadores de toda España.',
    cta        : 'Unirse a la tribu',
    image      : '/images/ponencia-5.jpg',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cursos — galería de acordeón horizontal expandible (B&N)
// ─────────────────────────────────────────────────────────────────────────────
export default function Cursos() {
  return (
    <section
      id="cursos"
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
          03 / Cursos
        </p>
        <h2 style={{
          fontFamily   : 'var(--sans)',
          fontSize     : 'clamp(2.5rem, 7vw, 6rem)',
          fontWeight   : 800,
          letterSpacing: '-0.045em',
          lineHeight   : 0.95,
          color        : '#fff',
        }}>
          Aprende. Transforma.
        </h2>
      </div>

      <ExpandableGallery items={CURSOS} />
    </section>
  );
}
