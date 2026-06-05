import { NextResponse } from 'next/server';

// ── POST /api/suscribir — Añade un email a la lista de Brevo ──
// Variables de entorno necesarias (añadir en Vercel → Settings → Environment Variables):
//   BREVO_API_KEY  → tu API key de Brevo (Account → SMTP & API → API Keys)
//   BREVO_LIST_ID  → ID numérico de la lista de contactos en Brevo

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const apiKey  = process.env.BREVO_API_KEY;
    const listId  = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.error('[suscribir] Faltan variables de entorno BREVO_API_KEY o BREVO_LIST_ID');
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 });
    }

    // Añadir o actualizar contacto en Brevo
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept'      : 'application/json',
        'content-type': 'application/json',
        'api-key'     : apiKey,
      },
      body: JSON.stringify({
        email,
        listIds        : [Number(listId)],
        updateEnabled  : true,   // si ya existe, actualiza en vez de dar error
      }),
    });

    // 201 = creado, 204 = actualizado (ya existía)
    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ ok: true });
    }

    const data = await res.json();
    console.error('[suscribir] Error Brevo:', data);
    return NextResponse.json({ error: data.message ?? 'Error al suscribir' }, { status: 500 });

  } catch (err) {
    console.error('[suscribir] Error inesperado:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
