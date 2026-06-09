import type { MarqueeLogo } from '@/components/LogoMarquee';

// ── Logos institucionales (20) — set canónico tomado de profelibre.joseda.education ──
// Mismas instituciones y versiones aprobadas. Se usan en Home (§02), Formaciones (§03)
// y Ponencias (§03). Render monocromo blanco (igual que la home) vía LogoMarquee.
export const INSTITUTION_LOGOS: MarqueeLogo[] = [
  { name: 'Premios Innovación Educativa', src: '/logos/premios_ie.svg' },
  { name: 'ESA — Agencia Espacial Europea', src: '/logos/esa.svg' },
  { name: 'ONU', src: '/logos/onu.svg' },
  { name: 'Google for Education', src: '/logos/google.svg' },
  { name: 'Universidad de Alicante', src: '/logos/ua.png' },
  { name: 'UNIR', src: '/logos/unir.png' },
  { name: 'SIMO Educación', src: '/logos/simo.png' },
  { name: 'Fundación Edelvives', src: '/logos/edelvives-v2.png' },
  { name: 'Edpuzzle', src: '/logos/edpuzzle.svg' },
  { name: 'CEFIRE', src: '/logos/cefire.png' },
  { name: 'Escuelas Católicas', src: '/logos/escuelas_catolicas.png' },
  { name: 'Maristas', src: '/logos/maristas.png', scale: 1.3 },
  { name: 'Jesuitas', src: '/logos/jesuitas.png' },
  { name: 'Salesianos', src: '/logos/salesianos.png' },
  { name: 'Colegios Franciscanos', src: '/logos/franciscanos.png', scale: 1.2 },
  { name: 'Hijas de la Caridad', src: '/logos/hijas_caridad.png', scale: 1.2 },
  { name: 'Agustinos', src: '/logos/agustinos-v2.png', scale: 1.3 },
  { name: 'Consejería de Educación · Región de Murcia', src: '/logos/murcia.png', scale: 1.2 },
  { name: 'Xunta de Galicia', src: '/logos/xunta_galicia.png' },
  { name: 'Junta de Andalucía', src: '/logos/junta_andalucia.svg' },
];

// 3 filas para el marquee de la home (7 / 7 / 6)
export const LOGO_ROWS: MarqueeLogo[][] = [
  INSTITUTION_LOGOS.slice(0, 7),
  INSTITUTION_LOGOS.slice(7, 14),
  INSTITUTION_LOGOS.slice(14),
];
