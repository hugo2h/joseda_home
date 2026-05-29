// ─────────────────────────────────────────────────────────────────────────────
// LogoMarquee — carrusel infinito de logos/wordmarks (§6 guía técnica)
//   · Mientras no haya SVG curados, se renderizan wordmarks de texto monocromos.
//   · 3 filas en home (dir. alternada). Pausa al hover (CSS, solo desktop).
// ─────────────────────────────────────────────────────────────────────────────
export default function LogoMarquee({
  logos,
  direction = 'left',
  duration = 60,
}: {
  logos: string[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  // Duplicamos la lista para un loop continuo sin saltos.
  const loop = [...logos, ...logos];

  return (
    <div className="marquee" data-dir={direction} style={{ ['--marquee-duration' as string]: `${duration}s` }}>
      <div className="marquee__track" aria-hidden="true">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
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
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
