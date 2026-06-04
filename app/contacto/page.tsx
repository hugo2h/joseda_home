'use client';

import { useState } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';

// ── §5.5 · CONTACTO ──
// El envío real (backend/Brevo) es trabajo pendiente. De momento el form
// compone un correo en el cliente del usuario (mailto): no se transmite ningún
// dato personal a terceros ni viaja PII en la URL.
const CONSULTAS = [
  'Formación a centro / red',
  'Ponencia / charla',
  'Colaboración / partnership',
  'Consulta individual',
  'Medios / prensa',
];

const BULLETS = [
  '¿Quieres una formación para tu centro o red?',
  '¿Buscas un ponente para tu congreso o jornada?',
  '¿Quieres colaborar conmigo en un proyecto?',
  '¿Tienes una pregunta como docente individual?',
];

const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/jose-david-perez-ibanez/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@jose-david' },
  { label: 'Instagram', href: 'https://www.instagram.com/joseda.education' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@joseda.ai' },
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
  const [nombre, setNombre]     = useState('');
  const [email, setEmail]       = useState('');
  const [centro, setCentro]     = useState('');
  const [consulta, setConsulta] = useState(CONSULTAS[0]);
  const [mensaje, setMensaje]   = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Web] ${consulta} — ${nombre || 'Contacto'}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nCentro / organización: ${centro}\nTipo de consulta: ${consulta}\n\n${mensaje}`,
    );
    window.location.href = `mailto:hola@serendipium.com?subject=${subject}&body=${body}`;
  };

  return (
    <section style={{ background: 'var(--bg-primary)', paddingTop: 'clamp(4rem, 8vh, 6rem)',
      paddingBottom: 'clamp(4rem, 12vh, 8rem)' }}>
      <div className="container">
        <SectionEyebrow text="Contacto" />
        <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', maxWidth: '18ch', marginBottom: '1.5rem' }}>
          Hablemos de tu proyecto educativo y de IA.
        </h1>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem',
          maxWidth: '52ch', marginBottom: '1.5rem' }}>
          {BULLETS.map((b) => (
            <li key={b} style={{ display: 'flex', gap: '0.7rem', fontSize: '1.05rem', lineHeight: 1.5,
              color: 'var(--text-secondary)' }}>
              <span aria-hidden="true" style={{ color: 'var(--eyebrow-color)' }}>▸</span>{b}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.6, color: '#fff',
          maxWidth: '52ch', marginBottom: '3rem' }}>
          Cuéntame qué necesitas y te respondo personalmente en menos de 48 horas.
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
              <label htmlFor="c-centro" style={labelStyle}>Centro / organización (opcional)</label>
              <input id="c-centro" type="text" value={centro} onChange={(e) => setCentro(e.target.value)}
                autoComplete="organization" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="c-consulta" style={labelStyle}>Tipo de consulta</label>
              <select id="c-consulta" value={consulta} onChange={(e) => setConsulta(e.target.value)}
                style={{ ...inputStyle, appearance: 'none' }}>
                {CONSULTAS.map((c) => <option key={c} value={c}>{c}</option>)}
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
              Enviar →
            </button>
          </form>

          {/* Vía directa */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <p style={labelStyle}>O escríbeme directamente a</p>
              <a href="mailto:hola@serendipium.com" style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600,
                textDecoration: 'none' }}>hola@serendipium.com</a>
            </div>
            <div>
              <p style={labelStyle}>Disponible en redes</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {SOCIAL.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}>{label}</a>
                ))}
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
