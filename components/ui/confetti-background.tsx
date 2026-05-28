'use client';

import { useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ConfettiBackground — campo de partículas sutil con sensación de profundidad 3D.
// Canvas 2D ligero (sin three.js) → cero coste SSR, animación fluida.
// Fijo detrás de todo el contenido.
// ─────────────────────────────────────────────────────────────────────────────
interface Particle {
  x : number;
  y : number;
  z : number;          // profundidad 0..1 → tamaño + opacidad + velocidad
  vx: number;
  vy: number;
  r : number;
}

export default function ConfettiBackground({
  count = 60,
  color = '255,255,255',   // monocromo: blanco
}: {
  count?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): Particle => {
      const z = Math.random();
      return {
        x : Math.random() * w,
        y : Math.random() * h,
        z,
        vx: (Math.random() - 0.5) * 0.12 * (0.4 + z),
        vy: (Math.random() - 0.5) * 0.12 * (0.4 + z),
        r : 0.6 + z * 2.4,
      };
    };

    const init = () => {
      particles = Array.from({ length: count }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap-around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const alpha = 0.06 + p.z * 0.22;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    init();

    if (prefersReduced) {
      // Render estático único, sin animación
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position     : 'fixed',
        inset        : 0,
        width        : '100%',
        height       : '100%',
        pointerEvents: 'none',
        zIndex       : 0,
      }}
    />
  );
}
