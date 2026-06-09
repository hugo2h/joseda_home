import type { CSSProperties } from 'react';
import { Mic, Presentation, Users, Zap, Check } from 'lucide-react';
import HeroBlock from '@/components/HeroBlock';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import LogoMarquee from '@/components/LogoMarquee';
import { LOGO_ROWS } from '@/components/institutionLogos';
import Reveal from '@/components/Reveal';

// ── §5.x · PONENCIAS — keynotes y charlas para congresos y jornadas ──

const ICO = { strokeWidth: 1.75 } as const;

const FORMATOS = [
  { icon: <Mic size={30} {...ICO} />, label: 'Keynote de apertura', desc: 'Charla de 45-60 min que abre el evento con energía, datos y provocación intelectual.' },
  { icon: <Presentation size={30} {...ICO} />, label: 'Ponencia central', desc: 'Sesión de 30-45 min centrada en un tema concreto con demostraciones en vivo.' },
  { icon: <Users size={30} {...ICO} />, label: 'Mesa redonda', desc: 'Participación como experto en debates moderados sobre IA y educación.' },
  { icon: <Zap size={30} {...ICO} />, label: 'TED-style', desc: 'Formato corto de 18 min, alta energía y mensaje claro. Ideal para eventos híbridos.' },
];

const TEMAS = [
  { num: '01', title: 'IA y docencia: qué cambia realmente', desc: 'Más allá del hype: qué herramientas tienen impacto real en el aprendizaje y cuáles son ruido.' },
  { num: '02', title: 'El docente aumentado', desc: 'Cómo la IA puede devolver tiempo al profesor para lo que solo un humano puede hacer.' },
  { num: '03', title: 'Evaluación en la era de la IA', desc: 'Repensar la evaluación cuando la IA puede responder cualquier examen convencional.' },
  { num: '04', title: 'IA sin brecha digital', desc: 'Cómo integrar IA en centros con recursos limitados y docentes escépticos.' },
  { num: '05', title: 'Creatividad y IA en el aula', desc: 'Proyectos reales de creación con IA: escritura, imagen, música y código.' },
  { num: '06', title: 'Ética e IA para docentes', desc: 'Marco práctico para enseñar a los alumnos a usar la IA con criterio y responsabilidad.' },
];

const PASOS = [
  { paso: '01', titulo: 'Primer contacto', texto: 'Cuéntame el evento, la audiencia y la fecha. Respondo en menos de 48 h.' },
  { paso: '02', titulo: 'Propuesta', texto: 'Envío una propuesta con tema, formato, duración y condiciones.' },
  { paso: '03', titulo: 'Personalización', texto: 'Adapto el contenido a la temática del evento y al perfil de los asistentes.' },
  { paso: '04', titulo: 'La ponencia', texto: 'Llego preparado, con materiales y listo para conectar con tu audiencia.' },
];

const wrap: CSSProperties = { width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem,5vw,4rem)' };
const h2s: CSSProperties = { fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff' };

export default function PonenciasPage() {
  return (
    <>
      {/* HERO */}
      <HeroBlock
        eyebrow={{ text: 'Ponencias' }}
        title={<>Una charla que<br />tu audiencia no olvidará.</>}
        subtitle="Keynotes y ponencias sobre IA y educación para congresos, jornadas y eventos."
        body="He hablado en congresos nacionales e internacionales, ante docentes, directivos y organismos. Agenda disponible para el segundo semestre de 2026."
        ctas={[
          { label: 'Contratar ponencia', href: '/contacto', variant: 'primary' },
          { label: 'Ver temas', href: '#temas', variant: 'secondary' },
        ]}
      />

      {/* 01 · FORMATOS */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={wrap}>
          <SectionEyebrow number="01" text="Formatos" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Un formato para cada evento.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '1.5rem' }}>
            {FORMATOS.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '2rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', marginBottom: '1rem', color: 'var(--eyebrow-color)' }} aria-hidden="true">{f.icon}</span>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.65rem' }}>{f.label}</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · TEMAS */}
      <section id="temas" className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="02" text="Temas tratados" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Seis temas que mueven al público docente.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '1.25rem' }}>
            {TEMAS.map((t, i) => (
              <Reveal key={t.num} delay={i * 0.08}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--eyebrow-color)', flexShrink: 0, paddingTop: '0.15rem' }}>{t.num}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={17} strokeWidth={2.5} style={{ color: 'var(--eyebrow-color)', flexShrink: 0 }} /> {t.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · DÓNDE HE ESTADO */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div style={{ ...wrap, marginBottom: 'clamp(2rem,5vh,3rem)' }}>
          <SectionEyebrow number="03" text="Dónde he estado" />
          <h2 style={{ ...h2s, maxWidth: '28ch' }}>Instituciones y eventos que han confiado en mí.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
          <LogoMarquee logos={LOGO_ROWS[0]} direction="left"  duration={66} />
          <LogoMarquee logos={LOGO_ROWS[1]} direction="right" duration={58} />
          <LogoMarquee logos={[...LOGO_ROWS[2]]} direction="left"  duration={72} />
        </div>
      </section>

      {/* 04 · CÓMO FUNCIONA */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={wrap}>
          <SectionEyebrow number="04" text="Cómo funciona" />
          <h2 style={{ ...h2s, marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Del primer contacto a la ponencia en 4 pasos.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1.5rem' }}>
            {PASOS.map((p, i) => (
              <Reveal key={p.paso} delay={i * 0.1}>
                <div style={{ borderTop: '2px solid var(--eyebrow-color)', paddingTop: '1.25rem' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--eyebrow-color)', marginBottom: '0.75rem' }}>{p.paso}</p>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{p.titulo}</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{p.texto}</p>
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
            <h2 style={{ ...h2s, marginBottom: '1.25rem' }}>¿Quieres que hable en tu evento?</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              Consulta disponibilidad y recibe una propuesta en menos de 48 h.
            </p>
            <CTAButton href="/contacto" variant="primary">Contratar ponencia</CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
