'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── 06 · BOLETÍN EDU + IA — COLOR MOMENT #2 (máxima ruptura visual) (§5.2) ──
// El alta real vive en /boletin (form Brevo de Dev B). Aquí es teaser inline:
// al enviar, lleva a /boletin sin transmitir el email (privacidad).
const BULLETS = [
  'Una idea aplicable al aula desde el lunes siguiente.',
  'Las novedades reales de IA en educación, filtradas.',
  'Un prompt, recurso o caso concreto para probar.',
  'Cero hype. Cero relleno.',
];

export default function Newsletter() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <section
      id="boletin"
      style={{
        position    : 'relative',
        background  : 'var(--brand-gradient)',
        paddingBlock: 'clamp(4.5rem, 13vh, 8.5rem)',
        overflow    : 'hidden',
      }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(100% 100% at 0% 0%, rgba(0,0,0,0.25) 0%, transparent 55%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
        <SectionEyebrow number="06" text="Boletín" />

        <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(3.5rem, 13vw, 7rem)', fontWeight: 800,
          letterSpacing: '-0.05em', lineHeight: 0.9, color: '#fff', marginBottom: '1rem' }}>
          EDU + IA
        </h2>

        <p style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 600, color: '#fff',
          letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '20ch', marginBottom: '2rem' }}>
          El boletín semanal de educación e inteligencia artificial.
        </p>

        <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.05rem', marginBottom: '0.75rem' }}>Cada miércoles, en tu bandeja:</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.25rem' }}>
          {BULLETS.map((b) => (
            <li key={b} style={{ display: 'flex', gap: '0.7rem', color: 'rgba(255,255,255,0.95)', fontSize: '1.02rem', lineHeight: 1.5 }}>
              <span aria-hidden="true" style={{ color: '#fff' }}>▸</span>{b}
            </li>
          ))}
        </ul>

        <form
          onSubmit={(e) => { e.preventDefault(); router.push('/boletin'); }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '520px' }}
        >
          <label htmlFor="nl-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Tu email</label>
          <input
            id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com" autoComplete="email"
            style={{ flex: '1 1 240px', padding: '0.95rem 1.1rem', fontSize: '1rem', color: '#fff',
              background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '10px',
              fontFamily: 'var(--sans)' }}
          />
          <button type="submit"
            style={{ padding: '0.95rem 1.7rem', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--button-on-brand-text)', background: 'var(--button-on-brand-bg)',
              border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Quiero recibirlo <span aria-hidden="true">→</span>
          </button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
          Sin spam. Te das de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
