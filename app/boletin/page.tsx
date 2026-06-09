'use client';

import { useState, useRef } from 'react';
import { Clock, FlaskConical, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';

// ── BOLETÍN EDU + IA — Landing de suscripción ──

const ICO = { size: 20, strokeWidth: 1.75 } as const;

const COMPROMISOS = [
  { icon: <Clock {...ICO} />, text: 'Menos de 5 minutos de lectura.' },
  { icon: <FlaskConical {...ICO} />, text: 'Solo lo que tiene fundamento: sin hype ni tendencias vacías.' },
  { icon: <Wrench {...ICO} />, text: 'Al menos una herramienta o técnica aplicable cada semana.' },
  { icon: <ShieldCheck {...ICO} />, text: 'Cero spam. Te puedes dar de baja cuando quieras.' },
];

const EDICIONES = [
  { meta: 'Nº 12 · 27 may 2026', title: 'El docente que usa IA vs. el que aún espera', body: 'La brecha no es tecnológica. Es de mentalidad. Y se está abriendo más rápido de lo que creemos.', linkText: 'Leer edición', href: '/blog/ia-en-el-aula-por-donde-empezar' },
  { meta: 'Nº 11 · 20 may 2026', title: 'Evaluar en 2026: el examen ha muerto', body: 'Cuando la IA puede responder cualquier examen convencional, el problema no es la IA. Es el examen.', linkText: 'Leer edición', href: '/blog/evaluar-en-la-era-ia' },
  { meta: 'Nº 10 · 13 may 2026', title: '5 herramientas que uso cada semana', body: 'No te doy una lista de 50. Te doy las 5 que realmente abro y por qué te pueden servir.', linkText: 'Leer edición', href: '/blog/cinco-herramientas-ia-docentes' },
  { meta: 'Nº 9 · 6 may 2026', title: 'NotebookLM: el más infravalorado', body: 'El 90% de los docentes que asisten a mis talleres no lo conocen. El 100% salen con ganas de usarlo.', linkText: 'Leer edición', href: '/blog' },
];

export default function BoletinPage() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEstado('loading');
    try {
      const res = await fetch('/api/suscribir', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email }),
      });
      if (res.ok) {
        setEstado('ok');
      } else {
        const data = await res.json();
        alert(data.error ?? 'Ha ocurrido un error. Inténtalo de nuevo.');
        setEstado('idle');
      }
    } catch {
      alert('Error de conexión. Inténtalo de nuevo.');
      setEstado('idle');
    }
  }

  return (
    <>
      {/* HERO + FORMULARIO */}
      <section className="section" style={{ background: 'var(--bg-primary)', minHeight: '95svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <SectionEyebrow text="Boletín semanal" />
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.8rem,9vw,5rem)', fontWeight: 800,
            letterSpacing: '-0.045em', lineHeight: 0.95, color: '#fff', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
            EDU + IA
          </h1>
          <p style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.75)',
            marginBottom: '2rem', maxWidth: '48ch' }}>
            Cada semana, ideas prácticas sobre IA y educación. Para docentes que quieren llegar al lunes con algo útil.
          </p>

          {/* Compromisos */}
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2.5rem' }}>
            {COMPROMISOS.map((c) => (
              <li key={c.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ display: 'inline-flex', flexShrink: 0, color: 'var(--eyebrow-color)', marginTop: '0.1rem' }} aria-hidden="true">{c.icon}</span>
                <span style={{ fontSize: '0.97rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.78)' }}>{c.text}</span>
              </li>
            ))}
          </ul>

          {/* Formulario */}
          <div ref={formRef}>
            {estado === 'ok' ? (
              <div style={{ background: 'rgba(94,45,214,0.15)', border: '1px solid var(--brand-violet)', borderRadius: 12, padding: '1.5rem 2rem' }}>
                <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={22} strokeWidth={2} style={{ color: 'var(--eyebrow-color)', flexShrink: 0 }} /> ¡Ya estás dentro!
                </p>
                <p style={{ fontSize: '0.93rem', color: 'var(--text-secondary)' }}>Revisa tu bandeja de entrada — deberías recibir la confirmación en unos minutos.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="email" required placeholder="tu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: '1 1 220px', padding: '0.9rem 1.1rem', fontSize: '1rem', color: '#fff',
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10,
                    fontFamily: 'var(--sans)', outline: 'none' }}
                />
                <CTAButton type="submit" variant="primary" style={{ opacity: estado === 'loading' ? 0.6 : 1 }}>
                  {estado === 'loading' ? 'Enviando…' : 'Suscribirme'}
                </CTAButton>
              </form>
            )}
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.04em',
              color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              +<AnimatedCounter value={20000} /> docentes ya suscritos · Sin spam · Baja cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* 01 · ÚLTIMAS EDICIONES */}
      <section className="section" style={{ background: 'var(--bg-primary)', paddingTop: 0 }}>
        <div className="container">
          <SectionEyebrow number="01" text="Últimas ediciones" />
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800,
            letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginBottom: 'clamp(2.5rem,6vh,4rem)', maxWidth: '28ch' }}>
            Lo que encontrarás dentro.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.5rem' }}>
            {EDICIONES.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <Card meta={e.meta} title={e.title} body={e.body} linkText={e.linkText} href={e.href} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · QUIÉN ESCRIBE */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <style>{`
            .quien-escribe { display: flex; flex-direction: column; gap: 2rem; max-width: 860px; align-items: flex-start; }
            @media (min-width: 768px) { .quien-escribe { flex-direction: row; align-items: center; } }
          `}</style>
          <Reveal>
            <div className="quien-escribe">
              <div style={{ flexShrink: 0, width: 'min(260px, 100%)', aspectRatio: '3/4', borderRadius: 14,
                overflow: 'hidden', position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/joseda-bio.jpg"
                  alt="José David Pérez — formador de docentes"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
              <div>
                <SectionEyebrow number="02" text="Quién escribe esto" />
                <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', fontWeight: 800,
                  letterSpacing: '-0.03em', color: '#fff', margin: '0.75rem 0 1rem' }}>José David Pérez</h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '52ch' }}>
                  Formador especializado en IA y educación. Más de 15 años trabajando con docentes en instituciones como la ESA, la ONU, Google for Education o el SEPE.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '52ch' }}>
                  Escribo este boletín porque es lo que me habría gustado leer cuando empecé a explorar la IA en educación: sin jerga, sin humo, con criterio docente.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CIERRE */}
      <section className="section" style={{ background: 'var(--brand-gradient)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 620 }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800,
              letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginBottom: '1.25rem' }}>
              Cada semana, una idea que puedes usar el lunes.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
              Únete a más de 20.000 docentes que ya reciben EDU + IA.
            </p>
            <button onClick={scrollToForm}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.95rem 1.9rem',
                background: '#0A0A0A', color: '#fff', border: 'none', borderRadius: 0, cursor: 'pointer',
                fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Me apunto <span aria-hidden="true">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
