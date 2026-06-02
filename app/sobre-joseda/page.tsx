import type { Metadata } from 'next';
import Image from 'next/image';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title      : 'Sobre Joseda',
  description: 'Maestro de Primaria, psicopedagogo e ingeniero de telecomunicación. Más de 10 años formando a docentes en IA aplicada a la educación, con criterio y los pies en el aula.',
};

// ── §5.4 · SOBRE JOSEDA (contenido real de jose-david.com) ──
const STATS = [
  { value: '+160.000', label: 'suscriptores en YouTube · Botón de Plata' },
  { value: '+17M',     label: 'personas ayudadas con sus vídeos' },
  { value: '+10 años', label: 'formando a docentes y centros' },
];

const HITOS = [
  { year: 'El aula', text: 'Más de 10 años como maestro de Primaria en un colegio de Alicante. Por el camino, jefe de estudios de Infantil y Primaria, profesor de Secundaria, coordinador de innovación educativa y miembro de las comisiones de innovación y digitalización.' },
  { year: 'Las tres miradas', text: 'Maestro de Primaria, licenciado en Psicopedagogía e ingeniero de Telecomunicación, con másteres en Orientación Educativa y en Lenguajes y Sistemas Informáticos. Tres formaciones que se cruzan en cómo aprenden las personas.' },
  { year: 'Divulgación', text: 'Canal de YouTube con más de 160.000 suscriptores y Botón de Plata, y creador de pódcasts educativos: Tribu de Profes, Libros de Educación, Acción Educativa y LEOcuentos.' },
  { year: 'Reconocimiento', text: 'Premio de Innovación Educativa en Formación e Implicación del Profesorado. Ponente nacional e internacional y formador en IA de equipos directivos, inspección educativa, profesorado universitario y organismos como la ONU.' },
];

const FORMACION = [
  'Maestro de Primaria — Premio Extraordinario Fin de Carrera y Beca a la Excelencia Académica',
  'Licenciado en Psicopedagogía — nota media 9,06',
  'Ingeniero de Telecomunicación — Premio Extraordinario Fin de Carrera',
  'Máster Oficial en Profesorado de Secundaria — especialidad Orientación Educativa',
  'Máster Oficial en Lenguajes y Sistemas Informáticos',
  'Experto Universitario en Innovación, Metodologías y Evaluación aplicados a la Educación — 9,4',
  'Google Certified Innovator (ESP18), Certified Trainer, Educator L1 y L2, Mentor y Coach',
];

const PRINCIPIOS = [
  { title: 'Criterio, no hype', body: 'La IA es una herramienta, no una religión. Enseño cuándo usarla y, sobre todo, cuándo no.' },
  { title: 'Del aula, para el aula', body: 'Todo lo que comparto lo he probado como maestro en activo, con docentes y problemas reales, no en un laboratorio.' },
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
                <Image src="/images/jose-david-contacto.jpg" alt="Joseda dando una formación" fill quality={90}
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }} />
              </div>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Me llamo José David. Llevo más de diez años como maestro de Primaria en un colegio de Alicante, así que
                no vengo del marketing: vengo de la tiza, las programaciones a las once de la noche y los septiembres
                reventado.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Soy también psicopedagogo e ingeniero de telecomunicación. Tres miradas que se cruzan en una sola
                pregunta: cómo aprenden las personas y cómo la tecnología puede ayudar de verdad, sin convertir al
                docente en un robot.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Desde hace más de una década formo a docentes y acompaño a centros. Por eso enseño a usar la IA con
                criterio, no con hype: para enseñar mejor y para recuperar el tiempo que el sistema te roba.
              </p>
            </div>
          </div>

          {/* Cifras */}
          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '3rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
                  letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: 1.45, color: 'var(--text-secondary)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <SectionEyebrow text="Trayectoria" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '64ch', marginTop: '1rem' }}>
            {HITOS.map((h, idx) => (
              <Reveal key={h.year} delay={idx * 60}>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1.5rem', alignItems: 'start',
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

      {/* Formación y credenciales */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <SectionEyebrow text="Formación y credenciales" />
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem',
            maxWidth: '70ch', marginTop: '1rem' }}>
            {FORMACION.map((f) => (
              <li key={f} style={{ display: 'flex', gap: '0.85rem', fontSize: '1.02rem', lineHeight: 1.55,
                color: 'var(--text-secondary)' }}>
                <span aria-hidden="true" style={{ color: 'var(--accent-blue)', flexShrink: 0 }}>▸</span>{f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Principios */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
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
            José David · SERENDIPIUM IA S.L.
          </p>
        </div>
      </section>
    </>
  );
}
