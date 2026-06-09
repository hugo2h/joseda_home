import { NextResponse } from 'next/server';

// ── POST /api/contacto — Envía el formulario de contacto por email (Brevo) ──
// Variables de entorno (Vercel → Settings → Environment Variables):
//   BREVO_API_KEY   → API key de Brevo (la misma que el boletín)
//   CONTACT_TO      → (opcional) email destino. Por defecto hola@serendipium.com
//   CONTACT_SENDER  → (opcional) remitente verificado en Brevo. Por defecto hola@serendipium.com
//
// IMPORTANTE: el email remitente (CONTACT_SENDER) debe estar verificado en Brevo
// (Senders & IP). El reply-to se fija al email del visitante para poder responderle directamente.

function esc(s: string): string {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

export async function POST(req: Request) {
  try {
    const { nombre, email, centro, consulta, mensaje } = await req.json();

    if (!email || !email.includes('@') || !mensaje || !nombre) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('[contacto] Falta BREVO_API_KEY');
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 });
    }

    const to     = process.env.CONTACT_TO     || 'hola@serendipium.com';
    const sender = process.env.CONTACT_SENDER || 'hola@serendipium.com';

    const html = `
      <h2>Nuevo mensaje desde la web</h2>
      <p><strong>Nombre:</strong> ${esc(nombre)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Centro / organización:</strong> ${esc(centro || '—')}</p>
      <p><strong>Tipo de consulta:</strong> ${esc(consulta || '—')}</p>
      <hr />
      <p style="white-space:pre-wrap">${esc(mensaje)}</p>
    `;

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept'      : 'application/json',
        'content-type': 'application/json',
        'api-key'     : apiKey,
      },
      body: JSON.stringify({
        sender : { name: 'Web Joseda', email: sender },
        to     : [{ email: to, name: 'Joseda' }],
        replyTo: { email, name: nombre },
        subject: `[Web] ${consulta || 'Consulta'} — ${nombre}`,
        htmlContent: html,
      }),
    });

    if (res.status === 201 || res.ok) {
      return NextResponse.json({ ok: true });
    }

    const data = await res.json().catch(() => ({}));
    console.error('[contacto] Error Brevo:', res.status, data);
    return NextResponse.json({ error: data.message ?? 'No se pudo enviar el mensaje' }, { status: 500 });

  } catch (err) {
    console.error('[contacto] Error inesperado:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
