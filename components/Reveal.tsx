'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Reveal — fade-up sutil al entrar en viewport (respeta reduced-motion vía CSS).
// ─────────────────────────────────────────────────────────────────────────────
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'span';
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as 'div';
  return (
    <Comp
      ref={ref}
      style={{
        opacity   : shown ? 1 : 0,
        transform : shown ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}
