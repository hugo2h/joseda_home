// ─────────────────────────────────────────────────────────────────────────────
// TimelineHorizontal — pasos en línea (§4). ProfeLibre §05 "Cómo funciona".
//   Desktop: fila horizontal con línea conectora y nodos.
//   Móvil: columna vertical con línea a la izquierda.
// ─────────────────────────────────────────────────────────────────────────────
export type TimelineStep = { label?: string; title: string; text?: string };

export default function TimelineHorizontal({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="tl">
      {steps.map((s, i) => (
        <div className="tl__step" key={s.title}>
          <div className="tl__node" aria-hidden="true">
            <span className="tl__dot" />
            {i < steps.length - 1 && <span className="tl__line" />}
          </div>
          <div className="tl__body">
            {s.label && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--eyebrow-color)' }}>{s.label}</span>
            )}
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em',
              color: '#fff', margin: '0.35rem 0 0.4rem' }}>{s.title}</h3>
            {s.text && <p style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{s.text}</p>}
          </div>
        </div>
      ))}

      <style>{`
        .tl { display: flex; flex-direction: column; gap: 0; }
        .tl__step { display: grid; grid-template-columns: 28px 1fr; gap: 1rem; }
        .tl__node { position: relative; display: flex; flex-direction: column; align-items: center; }
        .tl__dot { width: 14px; height: 14px; border-radius: 50%; background: var(--brand-gradient); margin-top: 4px; flex-shrink: 0; }
        .tl__line { width: 2px; flex: 1; background: var(--border-subtle); margin: 4px 0; }
        .tl__body { padding-bottom: 2rem; }
        @media (min-width: 880px) {
          .tl { flex-direction: row; gap: clamp(1rem, 3vw, 2.5rem); }
          .tl__step { grid-template-columns: 1fr; grid-template-rows: 28px 1fr; gap: 1rem; flex: 1; }
          .tl__node { flex-direction: row; width: 100%; }
          .tl__line { width: auto; height: 2px; flex: 1; margin: 0 0 0 6px; align-self: center; }
          .tl__body { padding-bottom: 0; }
        }
      `}</style>
    </div>
  );
}
