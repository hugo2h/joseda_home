/* eslint-disable @next/next/no-img-element */
// ─────────────────────────────────────────────────────────────────────────────
// LogoMarquee — carrusel infinito de logos (§6 guía técnica)
//   · Acepta imágenes (SVG/PNG) o, como stopgap, wordmarks de texto.
//   · Cada logo: string (texto) o { name, src } (imagen con alt = name).
//   · 3 filas en home (dir. alternada). Pausa al hover (CSS, solo desktop).
// ─────────────────────────────────────────────────────────────────────────────
export type MarqueeLogo = { name: string; src?: string };

export default function LogoMarquee({
  logos,
  direction = 'left',
  duration = 60,
}: {
  logos: (string | MarqueeLogo)[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const norm: MarqueeLogo[] = logos.map((l) => (typeof l === 'string' ? { name: l } : l));
  // Duplicamos la lista para un loop continuo sin saltos.
  const loop = [...norm, ...norm];

  return (
    <div className="marquee" data-dir={direction} style={{ ['--marquee-duration' as string]: `${duration}s` }}>
      <div className="marquee__track" aria-hidden="true">
        {loop.map((logo, i) =>
          logo.src ? (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              style={{ height: 'clamp(28px, 4.5vw, 44px)', width: 'auto', objectFit: 'contain',
                opacity: 0.75, filter: 'grayscale(1) brightness(0) invert(1)' }}
            />
          ) : (
            <span
              key={`${logo.name}-${i}`}
              style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(0.95rem, 1.6vw, 1.25rem)',
                fontWeight   : 700,
                letterSpacing: '-0.01em',
                color        : 'rgba(255,255,255,0.55)',
                whiteSpace   : 'nowrap',
                transition   : 'color 0.2s',
              }}
            >
              {logo.name}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
