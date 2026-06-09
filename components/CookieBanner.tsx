'use client';

import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CookieBanner — consentimiento RGPD al estilo de profelibre.joseda.education:
// "Rechazar todas" / "Configurar cookies" / "Aceptar todas". La elección se
// guarda en localStorage. Necesarias siempre activas; analíticas/marketing opt-in.
// Reabrir: window.dispatchEvent(new Event('open-cookie-config')) (lo usa el footer).
// ─────────────────────────────────────────────────────────────────────────────
const KEY = 'joseda-cookie-consent';
const POLICY = 'https://profelibre.joseda.education/politica-cookies';

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig]   = useState(false);
  const [analytics, setAnalytics]   = useState(false);
  const [marketing, setMarketing]   = useState(false);

  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch {}
    if (!stored) setVisible(true);
    const reopen = () => { setConfig(true); setVisible(true); };
    window.addEventListener('open-cookie-config', reopen);
    return () => window.removeEventListener('open-cookie-config', reopen);
  }, []);

  const save = (c: Consent) => {
    try { localStorage.setItem(KEY, JSON.stringify({ ...c, ts: Date.now() })); } catch {}
    setVisible(false);
    setConfig(false);
  };

  if (!visible) return null;

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em',
    padding: '0.7rem 1.2rem', borderRadius: 10, cursor: 'pointer', border: '1px solid transparent',
    whiteSpace: 'nowrap',
  };

  return (
    <div role="dialog" aria-label="Aviso de cookies" aria-live="polite"
      style={{ position: 'fixed', left: 'clamp(0.75rem, 3vw, 1.5rem)', right: 'clamp(0.75rem, 3vw, 1.5rem)',
        bottom: 'clamp(0.75rem, 3vw, 1.5rem)', zIndex: 1900, maxWidth: 520, marginInline: 'auto',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 16,
        boxShadow: '0 24px 70px rgba(0,0,0,0.6)', padding: 'clamp(1.25rem, 3vw, 1.75rem)',
        animation: 'cookie-in 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>
      <style>{`
        @keyframes cookie-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { [aria-label="Aviso de cookies"] { animation: none !important; } }
      `}</style>

      <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Usamos cookies propias y de terceros para analizar el uso de la web y mejorar tu experiencia.
        Puedes aceptarlas, rechazarlas o configurarlas. Más info en la{' '}
        <a href={POLICY} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'underline' }}>
          política de cookies
        </a>.
      </p>

      {config && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.1rem',
          padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>
            Necesarias <input type="checkbox" checked disabled aria-label="Necesarias (siempre activas)" />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}>
            Analíticas <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}>
            Marketing <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          </label>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'flex-end' }}>
        <button type="button" onClick={() => save({ necessary: true, analytics: false, marketing: false })}
          style={{ ...btnBase, background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
          Rechazar todas
        </button>
        {config ? (
          <button type="button" onClick={() => save({ necessary: true, analytics, marketing })}
            style={{ ...btnBase, background: 'transparent', color: 'var(--link-color)', borderColor: 'var(--border-subtle)' }}>
            Guardar selección
          </button>
        ) : (
          <button type="button" onClick={() => setConfig(true)}
            style={{ ...btnBase, background: 'transparent', color: 'rgba(255,255,255,0.7)', borderColor: 'var(--border-subtle)' }}>
            Configurar
          </button>
        )}
        <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })}
          style={{ ...btnBase, background: '#fff', color: '#0A0A0A', borderColor: '#fff' }}>
          Aceptar todas
        </button>
      </div>
    </div>
  );
}
