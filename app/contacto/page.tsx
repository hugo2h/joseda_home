'use client';

import { useState } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── §5.5 · CONTACTO ──
// El envío real (backend/Brevo) es trabajo pendiente (§8). De momento el form
// compone un correo en el cliente del usuario (mailto): no se transmite ningún
// dato personal a terceros ni viaja PII en la URL.
const MOTIVOS = [
  'Formación para mi centro',
  'Ponencia o charla',
  'Curso ProfeLibre',
  'Colaboración / podcast',
  'Otro',
];

const inputStyle = {
  width        : '100%',
  padding      : '0.85rem 1rem',
  fontSize     : '1rem',
  color        : '#fff',
  background   : 'var(--bg-card)',
  border       : '1px solid var(--border-subtle)',
  borderRadius : '10px',
  fontFamily   : 'var(--sans)',
} as const;

const labelStyle = {
  display      : 'block',
  fontFamily   : 'var(--mono)',
  fontSize     : '0.75rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color        : 'var(--text-secondary)',
  marginBottom : '0.5rem',
};

export default function Contacto() {
  const [nombre, setNombre]   = useState('');
  const [email, setEmail]     = useState('');
  const [centro, setCentro]   = useState('');
  const [motivo, setMotivo]   = useState(MOTIVOS[0]);
  const [mensaje, setMensaje] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Web] ${motivo} — ${nombre || 'Contacto'}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nCentro / organización: ${centro}\nMotivo: ${motivo}\n\n${mensaje}`,
    );
    window.location.href = `mailto:hola@serendipium.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionEyebrow text="Contacto" />
        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', maxWidth: '18ch', marginBottom: '1.25rem' }}>
          Hablemos de tu proyecto educativo y de IA.
        </h1>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: 1.6, color: 'var(--text-secondary)',
          maxWidth: '52ch', marginBottom: '3rem' }}>
          Cuéntame qué necesitas —una formación para tu centro, una ponencia o cualquier otra cosa— y te respondo
          personalmente.
        </p>

        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', alignItems: 'start' }}>
          {/* Formulario */}
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '560px' }}>
            <div>
              <label htmlFor="c-nombre" style={labelStyle}>Nombre</label>
              <input id="c-nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                required autoComplete="name" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="c-email" style={labelStyle}>Email</label>
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required autoComplete="email" placeholder="tu@email.com" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="c-centro" style={labelStyle}>Centro / organización</label>
              <input id="c-centro" type="text" value={centro} onChange={(e) => setCentro(e.target.value)}
                autoComplete="organization" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="c-motivo" style={labelStyle}>Motivo</label>
              <select id="c-motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)}
                style={{ ...inputStyle, appearance: 'none' }}>
                {MOTIVOS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="c-mensaje" style={labelStyle}>Mensaje</label>
              <textarea id="c-mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)}
                required rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <button type="submit"
              style={{ alignSelf: 'flex-start', padding: '0.95rem 1.9rem', fontSize: '0.82rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0A0A0A', background: '#fff',
                border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'var(--sans)' }}>
              Enviar mensaje →
            </button>
          </form>

          {/* Vía directa */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <p style={labelStyle}>Email directo</p>
              <a href="mailto:hola@serendipium.com" style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600,
                textDecoration: 'none' }}>hola@serendipium.com</a>
            </div>
            <div>
              <p style={labelStyle}>Sígueme</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue-soft)', textDecoration: 'none' }}>LinkedIn</a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue-soft)', textDecoration: 'none' }}>YouTube</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue-soft)', textDecoration: 'none' }}>Instagram</a>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Respondo personalmente. Tus datos solo se usan para responderte.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
