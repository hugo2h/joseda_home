/* eslint-disable @next/next/no-img-element */
// ─────────────────────────────────────────────────────────────────────────────
// LogoMarquee — carrusel infinito de logos (§6 guía técnica)
//   · Acepta imágenes (SVG/PNG) o, como stopgap, wordmarks de texto.
//   · Cada logo: string (texto) o { name, src } (imagen con alt = name).
//   · 3 filas en home (dir. alternada). Pausa al hover (CSS, solo desktop).
// ─────────────────────────────────────────────────────────────────────────────
export type MarqueeLogo = { name: string; src?: string; scale?: number };

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
  // Repetimos la lista hasta tener suficientes por mitad y duplicamos en dos
  // mitades idénticas para que el loop (-50%) sea continuo y siempre llene la fila.
  const reps = Math.max(1, Math.ceil(12 / Math.max(1, norm.length)));
  const half = Array.from({ length: reps }).flatMap(() => norm);
  const loop = [...half, ...half];

  return (
    <div className="marquee" data-dir={direction} style={{ ['--marquee-duration' as string]: `${duration}s` }}>
      <div className="marquee__track" aria-hidden="true">
        {loop.map((logo, i) =>
          logo.src ? (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              style={{ flexShrink: 0, height: `calc(clamp(30px, 5vw, 44px) * ${logo.scale ?? 1})`, width: 'auto',
                maxWidth: `calc(clamp(120px, 19vw, 185px) * ${logo.scale ?? 1})`, objectFit: 'contain', display: 'block',
                opacity: 0.8, filter: 'brightness(0) invert(1)' }}
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
