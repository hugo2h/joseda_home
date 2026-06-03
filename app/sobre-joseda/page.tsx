import type { Metadata } from 'next';
import Image from 'next/image';
import { Target, Ban, Heart } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title      : 'Sobre Joseda',
  description: 'Maestro en activo, psicopedagogo e ingeniero de telecomunicación. Más de 15 años aplicando la IA al aula real, con criterio y sin hype.',
};

// ── §5.4 · SOBRE JOSEDA (copy del documento maestro v1.2) ──
const HITOS = [
  'Más de 15 años aplicando tecnología e IA al aula.',
  'Cientos de docentes formados en varias cohortes de ProfeLibre.',
  'Google Certified Trainer · Innovator · Innovator Coach.',
  'Premio Innovación Educativa 2019.',
  'Ponente en SIMO, congresos universitarios y jornadas internacionales.',
  'Creador del sistema ProfeLibre y la App ProfeLibre.',
];

const PRINCIPIOS = [
  { Icon: Target, title: 'Criterio antes que herramienta.', body: 'La IA no sustituye al docente: amplifica su juicio.' },
  { Icon: Ban,    title: 'Honestidad anti-hype.',           body: 'Te cuento lo que la IA SÍ puede hacer y lo que NO.' },
  { Icon: Heart,  title: 'Tecnología al servicio de la vida.', body: 'El éxito no es hacer más; es recuperar tiempo y presencia.' },
];

export default function SobreJoseda() {
  return (
    <>
      {/* Intro */}
      <section style={{ background: 'var(--bg-primary)', paddingTop: 'clamp(4rem, 8vh, 6rem)',
        paddingBottom: 'clamp(4rem, 12vh, 8rem)' }}>
        <div className="container">
          <SectionEyebrow text="Sobre Joseda" />
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.02, color: '#fff', maxWidth: '16ch', marginBottom: '2.5rem' }}>
            Joseda.<br />Maestro. Psicopedagogo. Ingeniero.
          </h1>

          <div className="about-intro">
            <Reveal>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 3', borderRadius: '18px', overflow: 'hidden',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <Image src="/images/ponencia-11.jpg" alt="Joseda en una ponencia" fill quality={90}
                  sizes="(max-width: 768px) 100vw, 460px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>
            </Reveal>

            <div className="about-intro__text" style={{ display: 'flex', flexDirection: 'column',
              gap: '1.25rem', height: '100%' }}>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Soy de los que llegan a clase con la tiza y se quedan hasta las once corrigiendo en casa. Por eso
                entiendo el agobio: lo he vivido.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                He pasado años traduciendo la inteligencia artificial al aula real, antes de que la IA estuviera de
                moda. Soy maestro en activo, psicopedagogo de formación e ingeniero de telecomunicación de carrera.
                Esa combinación es rara y es la razón por la que mis formaciones funcionan: piso el aula, entiendo
                cómo se aprende y sé domar la tecnología.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                Hoy formo a docentes, claustros, redes de colegios y organismos en cómo usar la IA con criterio, sin
                perder lo más importante: tu juicio y tu tiempo.
              </p>
            </div>
          </div>
        </div>

        {/* Imagen grande; el texto se reparte (space-between) para ocupar su misma altura (desktop) */}
        <style>{`
          .about-intro { display: grid; gap: 2.5rem; align-items: stretch; }
          .about-intro__text { justify-content: flex-start; }
          @media (min-width: 900px) {
            .about-intro { grid-template-columns: 1fr 1.08fr; gap: clamp(2rem, 5vw, 4rem); }
            .about-intro__text { justify-content: space-between; }
          }
        `}</style>
      </section>

      {/* Hitos */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <SectionEyebrow as="h2" text="Hitos" />
          <div style={{ display: 'grid', gap: '1rem', marginTop: '0.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {HITOS.map((h, idx) => (
              <Reveal key={h} delay={idx * 0.06}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '1.25rem', height: '100%' }}>
                  <span aria-hidden="true" style={{ color: 'var(--eyebrow-color)', flexShrink: 0 }}>▸</span>
                  <p style={{ fontSize: '1rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Qué me guía */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <SectionEyebrow as="h2" text="Qué me guía" />
          <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {PRINCIPIOS.map(({ Icon, title, body }) => (
              <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: '14px', padding: '1.75rem' }}>
                <Icon size={28} strokeWidth={1.75} aria-hidden="true"
                  style={{ color: 'var(--eyebrow-color)', marginBottom: '0.85rem' }} />
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em',
                  color: '#fff', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
          </div>

          <p style={{ marginTop: '2.5rem', fontFamily: 'var(--mono)', fontSize: '0.8rem',
            color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>
            José David Pérez Ibáñez · SERENDIPIUM IA S.L.
          </p>
        </div>
      </section>
    </>
  );
}
