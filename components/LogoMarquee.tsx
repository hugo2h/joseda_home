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
            <span
              key={`${logo.name}-${i}`}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                height: 'clamp(52px, 7vw, 68px)', padding: '0 clamp(14px, 2vw, 22px)', background: '#fff',
                borderRadius: '12px' }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: 'auto', width: 'auto', maxHeight: 'clamp(26px, 4vw, 38px)',
                  maxWidth: 'clamp(90px, 16vw, 150px)', objectFit: 'contain', display: 'block' }}
              />
            </span>
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
