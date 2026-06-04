'use client';

import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText — efecto máquina de escribir al entrar en viewport.
// ─────────────────────────────────────────────────────────────────────────────
export default function TypewriterText({
  text,
  speed = 28,
  style,
}: {
  text: string;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState('');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const id = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(id);
          }, speed);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} style={style}>
      {displayed}
      <span aria-hidden="true" style={{ opacity: displayed.length < text.length ? 1 : 0, transition: 'opacity 0.2s' }}>|</span>
    </span>
  );
}
