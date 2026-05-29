// ─────────────────────────────────────────────────────────────────────────────
// SectionEyebrow — "01 — INICIO" (Geist Mono, azul acento). §2.2 / §4
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionEyebrow({
  number,
  text,
}: {
  number?: string;
  text: string;
}) {
  return (
    <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>
      {number ? `${number} — ` : ''}{text}
    </p>
  );
}
