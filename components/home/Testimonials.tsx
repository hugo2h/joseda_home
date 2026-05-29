'use client';

import { useState } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 07 · TESTIMONIOS — carrusel (§5.2) ──
// ⚠️ Placeholder: pendiente recoger 6-8 testimonios reales con permiso (§8).
// Sustituir TESTIMONIALS por los reales (o ocultar la sección si no hay).
const TESTIMONIALS = [
  { quote: 'Recuperé mis tardes el primer trimestre.', name: 'María L.',  role: 'Profesora · Secundaria' },
  { quote: 'Por fin entiendo para qué sirve la IA y para qué no.', name: 'Javier R.', role: 'Jefe de estudios · Primaria' },
  { quote: 'Mi claustro pasó del miedo a usarla con criterio.', name: 'Ana P.', role: 'Coordinadora TIC · FP' },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const initials = t.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section className="section" style={{ background: 'var(--bg-deep)' }}>
      <div className="container">
        <SectionEyebrow number="07" text="Testimonios" />
        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800,
          letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', maxWidth: '22ch', marginBottom: '2.5rem' }}>
          Esto cuentan quienes ya han pasado por aquí.
        </h2>

        <figure style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem',
          maxWidth: '40ch', marginInline: 'auto' }}>
          <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontSize: '1.1rem', color: 'var(--accent-blue-soft)' }}>
            {initials}
          </div>
          <blockquote style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 600,
            letterSpacing: '-0.02em', lineHeight: 1.25, color: '#fff' }}>
            “{t.quote}”
          </blockquote>
          <figcaption style={{ color: 'var(--text-secondary)' }}>
            <span style={{ display: 'block', color: '#fff', fontWeight: 600 }}>{t.name}</span>
            <span style={{ fontSize: '0.9rem' }}>{t.role}</span>
          </figcaption>
        </figure>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '2.5rem' }}>
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} type="button" aria-label={`Testimonio ${idx + 1}`} onClick={() => setI(idx)}
              style={{ width: idx === i ? 24 : 10, height: 10, borderRadius: '9999px', border: 'none', cursor: 'pointer',
                background: idx === i ? 'var(--accent-blue)' : 'rgba(255,255,255,0.25)', transition: 'width 0.25s, background 0.25s' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
