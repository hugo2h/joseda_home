import Image from 'next/image';

// ─────────────────────────────────────────────────────────────────────────────
// TestimonialCard — tarjeta de testimonio reutilizable (§4). Home, ProfeLibre.
//   Con foto opcional; si no hay, muestra un avatar con las iniciales.
// ─────────────────────────────────────────────────────────────────────────────
export default function TestimonialCard({
  photo,
  quote,
  name,
  role,
}: {
  photo?: string;
  quote: string;
  name: string;
  role?: string;
}) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <figure
      style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : '1.25rem',
        background   : 'var(--bg-card)',
        border       : '1px solid var(--border-subtle)',
        borderRadius : '14px',
        padding      : '1.75rem',
        height       : '100%',
        margin       : 0,
      }}
    >
      <blockquote style={{ margin: 0, fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
        fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.01em', color: '#fff' }}>
        “{quote}”
      </blockquote>

      <figcaption style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: 'auto' }}>
        {photo ? (
          <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
            flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
            <Image src={photo} alt={name} fill quality={90} sizes="48px" style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div aria-hidden="true" style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--border-subtle)', fontFamily: 'var(--mono)', fontSize: '0.85rem',
            color: 'var(--eyebrow-color)' }}>
            {initials}
          </div>
        )}
        <div>
          <span style={{ display: 'block', color: '#fff', fontWeight: 600, fontSize: '0.98rem' }}>{name}</span>
          {role && <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{role}</span>}
        </div>
      </figcaption>
    </figure>
  );
}
