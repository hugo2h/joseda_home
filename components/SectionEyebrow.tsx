// ─────────────────────────────────────────────────────────────────────────────
// SectionEyebrow — "01 — INICIO" (Geist Mono, lavanda de marca). §2.2 / §4
// `as` permite renderizarlo como heading (h2) cuando es el título de la sección,
// manteniendo el estilo de eyebrow (mejora la jerarquía para lectores de pantalla).
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionEyebrow({
  number,
  text,
  as: Tag = 'p',
}: {
  number?: string;
  text: string;
  as?: 'p' | 'h2';
}) {
  return (
    <Tag className="eyebrow" style={{ marginBottom: '1.25rem' }}>
      {number ? `${number} — ` : ''}{text}
    </Tag>
  );
}
