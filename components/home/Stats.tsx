import AnimatedCounter from '@/components/AnimatedCounter';
import Reveal from '@/components/Reveal';

// ── BANDA DE CIFRAS — autoridad de un vistazo ──
// Cifras reales (fuente: jose-david.com). Edita value/prefix/suffix/label aquí.
const STATS = [
  { value: 12,  prefix: '+', suffix: 'K', label: 'Docentes formados en IA' },
  { value: 300, prefix: '+', suffix: '',  label: 'Formaciones en centros' },
  { value: 160, prefix: '+', suffix: 'K', label: 'Suscriptores en YouTube' },
  { value: 17,  prefix: '+', suffix: 'M', label: 'Personas alcanzadas' },
];

export default function Stats() {
  return (
    <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(3rem, 8vh, 5.5rem)',
      borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(1.5rem, 5vw, 3rem)' }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.2rem, 7vw, 4rem)', fontWeight: 800,
                letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', marginBottom: '0.6rem', whiteSpace: 'nowrap',
                background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent' }}>
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
