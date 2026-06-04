import type { CSSProperties } from 'react';
import HeroBlock from '@/components/HeroBlock';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';

// ── §5.x · FORMACIONES — B2B para centros, redes y organismos ──

const BENEFICIOS = [
  { emoji: '🎯', text: 'Formación 100% práctica: el docente sale con herramientas listas para usar el lunes siguiente.' },
  { emoji: '🧭', text: 'Adaptada al nivel real del claustro: desde cero hasta uso avanzado.' },
  { emoji: '📊', text: 'Memoria de formación y materiales incluidos para el centro.' },
  { emoji: '🔁', text: 'Acompañamiento post-formación disponible en modalidades premium.' },
];

const FORMATOS = [
  { icon: '⚡', title: 'Sesión de choque', body: 'Una sesión intensiva de 2-3 h para descubrir la IA en el aula. Ideal para claustros que empiezan.', meta: '2–3 h · Presencial / Online' },
  { icon: '📅', title: 'Taller de un día', body: 'Jornada completa de 6 h con teoría, práctica guiada y propuesta de implementación.', meta: '6 h · Presencial' },
  { icon: '🗓️', title: 'Programa trimestral', body: '4 sesiones distribuidas en un trimestre con seguimiento entre sesiones y entregables.', meta: '4 sesiones · Presencial / Mixto' },
  { icon: '🏫', title: 'Proyecto de centro', body: 'Plan anual de formación con diagnóstico inicial, itinerario personalizado y evaluación final.', meta: 'Curso completo · A medida' },
];

const INSTITUCIONES = [
  'ESA — Agencia Espacial Europea',
  'ONU',
  'Junta de Andalucía',
  'Xunta de Galicia',
  'CEFIRE',
  'FUNDAE',
  'Escuelas Católicas',
  'Maristas',
];

const CASOS = [
  {
    meta: 'Red de colegios · 2024',
    title: '320 docentes formados en IA en un trimestre',
    body: 'Red de 12 colegios concertados de Andalucía. Programa de 4 sesiones por centro. Resultado: el 78 % del profesorado incorporó al menos una herramienta de IA a su práctica docente antes de finalizar el trimestre.',
  },
  {
    meta: 'Organismo público · 2023',
    title: 'Formación certificada para 150 orientadores del SEPE',
    body: 'Diseño e impartición del módulo de IA aplicada a la orientación laboral dentro del plan de formación interno del SEPE. Valoración media del curso: 4,8 / 5.',
  },
];

const wrap: CSSProperties = { width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem,5vw,4rem)' };
const h2s: CSSProperties = { fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff' };

export default function FormacionesPage() {
  return (
    <>
      {/* HERO */}
      <HeroBlock
        eyebrow={{ text: 'Formaciones' }}
        title={<>IA en el aula,<br />con criterio docente.</>}
        subtitle="Formación in-company para centros, redes y organismos educativos."
        body="Llevo más de 15 años formando a docentes. Hoy lo hago con IA: sin humo, sin moda pasajera. Solo lo que funciona en el aula."
        ctas={[
          { label: 'Pedir propuesta', href: '/contacto', variant: 'primary' },
          { label: 'Ver cómo trabajo', href: '/sobre-joseda', variant: 'secondary' },
        ]}
      />

      {/* 01 · QUÉ TE LLEVAS */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={wrap}>
          <SectionEyebrow number="01" text="Qué te llevas" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Formación que se nota el lunes siguiente.
          </h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.5rem', listStyle: 'none', padding: 0 }}>
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.text} delay={i * 0.1}>
                <li style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '1.75rem' }}>
                  <span style={{ display: 'inline-block', fontSize: '1.5rem', marginBottom: '1rem', background: 'rgba(94,45,214,0.18)', padding: '0.5rem 0.75rem', borderRadius: 8 }} aria-hidden="true">{b.emoji}</span>
                  <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{b.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 · FORMATOS */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="02" text="Formatos disponibles" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Desde una sesión hasta un proyecto de centro.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.5rem' }}>
            {FORMATOS.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '1.75rem', height: '100%' }}>
                  <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '1rem' }} aria-hidden="true">{f.icon}</span>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eyebrow-color)', marginBottom: '0.5rem' }}>{f.meta}</p>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · INSTITUCIONES */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, marginBottom: 'clamp(2rem,5vh,3rem)' }}>
          <SectionEyebrow number="03" text="Instituciones" />
          <h2 style={{ ...h2s, maxWidth: '28ch' }}>Han confiado en este programa.</h2>
        </div>
        <LogoMarquee logos={INSTITUCIONES} duration={80} />
      </section>

      {/* 04 · CASOS REALES */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="04" text="Casos reales" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Resultados concretos, no promesas.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '2rem' }}>
            {CASOS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.15}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '2rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eyebrow-color)', marginBottom: '1rem' }}>{c.meta}</p>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, textAlign: 'center', maxWidth: 700 }}>
          <Reveal>
            <h2 style={{ ...h2s, marginBottom: '1.25rem' }}>¿Quieres una propuesta para tu centro o red?</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              Respondo en menos de 48 h con una propuesta adaptada a vuestro contexto y nivel de partida.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <CTAButton href="/contacto" variant="primary">Pedir propuesta</CTAButton>
              <CTAButton href="/sobre-joseda" variant="secondary">Conocer a Joseda</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
