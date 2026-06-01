import type { Metadata } from 'next';
import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title      : 'Sobre Joseda',
  description: 'Maestro, psicopedagogo e ingeniero. Llevo años traduciendo la inteligencia artificial al aula real, con criterio docente y los pies en la tierra.',
};

// ── §5.4 · SOBRE JOSEDA ──
const HITOS = [
  { year: 'Origen',  text: 'Maestro en activo: tiza, programaciones a las 11 de la noche y septiembres reventado. El aula real, no la teoría.' },
  { year: 'Salto',   text: 'Psicopedagogía e ingeniería: tres miradas que se cruzan en cómo aprenden las personas y cómo la tecnología puede ayudar.' },
  { year: 'Hoy',     text: 'Formador de docentes y centros en IA aplicada a la educación. Cursos, formaciones a medida y ponencias por toda España.' },
  { year: 'Ahora',   text: 'EDU + IA: un boletín semanal y una comunidad de docentes que usan la IA con criterio, no con hype.' },
];

const PRINCIPIOS = [
  { title: 'Criterio, no hype', body: 'La IA es una herramienta, no una religión. Enseño cuándo usarla y, sobre todo, cuándo no.' },
  { title: 'Del aula, para el aula', body: 'Todo lo que comparto lo he probado con docentes reales y problemas reales, no en un laboratorio.' },
  { title: 'Recuperar tu tiempo', body: 'El objetivo nunca es hacer más cosas: es que el sistema te robe menos horas y vivas mejor tu vocación.' },
];

export default function SobreJoseda() {
  return (
    <>
      {/* Intro */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <SectionEyebrow text="Sobre Joseda" />
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', maxWidth: '16ch', marginBottom: '2rem' }}>
            Joseda. Maestro. Psicopedagogo. Ingeniero.
          </h1>

          <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', alignItems: 'start' }}>
            <Reveal>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: '18px', overflow: 'hidden',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <Image src="/images/jose-david-contacto.jpg" alt="Joseda" fill quality={90}
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }} />
              </div>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Llevo años traduciendo la inteligencia artificial al aula real. No vengo del marketing: vengo de la
                tiza, las programaciones a las 11 de la noche y los septiembres reventado.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Soy maestro, psicopedagogo e ingeniero. Tres miradas que se cruzan en una sola pregunta: cómo aprenden
                las personas y cómo la tecnología puede ayudar de verdad, sin convertir al docente en un robot.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Por eso enseño a usar la IA con criterio, no con hype. Para enseñar mejor y para recuperar el tiempo
                que el sistema te roba.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hitos */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <SectionEyebrow text="Trayectoria" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '60ch', marginTop: '1rem' }}>
            {HITOS.map((h, idx) => (
              <Reveal key={h.year} delay={idx * 60}>
                <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '1.5rem', alignItems: 'start',
                  paddingBlock: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', textTransform: 'uppercase',
                    letterSpacing: '0.08em', color: 'var(--accent-blue-soft)', paddingTop: '0.2rem' }}>{h.year}</span>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <SectionEyebrow text="Cómo trabajo" />
          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {PRINCIPIOS.map((p) => (
              <div key={p.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: '14px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em',
                  color: '#fff', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{p.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
            <CTAButton variant="secondary" href="/contacto">Hablemos</CTAButton>
          </div>

          <p style={{ marginTop: '2.5rem', fontFamily: 'var(--mono)', fontSize: '0.8rem',
            color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>
            Joseda David Pérez Ibáñez · SERENDIPIUM IA SLU
          </p>
        </div>
      </section>
    </>
  );
}
