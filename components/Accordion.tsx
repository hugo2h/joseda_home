'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Accordion — lista plegable accesible (§4). ProfeLibre FAQ, Formaciones.
//   allowMultiple: si varios paneles pueden estar abiertos a la vez.
// ─────────────────────────────────────────────────────────────────────────────
export type AccordionItem = { title: string; content: ReactNode };

export default function Accordion({
  items,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
}) {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : allowMultiple ? [...prev, i] : [i],
    );

  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const panelId = `acc-panel-${i}`;
        const btnId = `acc-btn-${i}`;
        return (
          <div key={item.title} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ margin: 0 }}>
              <button
                id={btnId} type="button" aria-expanded={isOpen} aria-controls={panelId}
                onClick={() => toggle(i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem', padding: '1.25rem 0', background: 'transparent', border: 'none', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'var(--sans)', fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                  fontWeight: 600, color: '#fff',
                }}
              >
                {item.title}
                <ChevronDown size={20} aria-hidden="true"
                  style={{ flexShrink: 0, color: 'var(--eyebrow-color)', transition: 'transform 0.25s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
            </h3>
            <div
              id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}
              style={{ paddingBottom: isOpen ? '1.25rem' : 0 }}
            >
              <div style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '70ch' }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
