'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap, { ScrollTrigger } from '@/lib/gsap-setup';
import { registerLenisControl, unregisterLenisControl } from '@/lib/lenisControl';

/**
 * SmoothScrollProvider — Lenis sobre WINDOW (no sobre contenedor).
 * Sin wrapper / sin scrollerProxy → ScrollTrigger usa el scroll nativo de window.
 * Este es el patrón canónico Lenis + GSAP que no tiene problemas de timing.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let lenisRAF: ((time: number) => void) | null = null;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile       = window.matchMedia('(max-width: 768px)').matches;

    function init() {
      if (lenis) destroy();
      if (isMobile || prefersReduced) return;

      lenis = new Lenis({
        duration   : 1.0,
        easing     : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      (window as unknown as Record<string, unknown>)['lenis'] = lenis;

      // Integración canónica Lenis ↔ GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      lenisRAF = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(lenisRAF);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    function destroy() {
      if (lenisRAF) { gsap.ticker.remove(lenisRAF); lenisRAF = null; }
      if (lenis)    { lenis.destroy(); lenis = null; }
      delete (window as unknown as Record<string, unknown>)['lenis'];
    }

    init();
    registerLenisControl(destroy, init);

    return () => {
      destroy();
      unregisterLenisControl();
    };
  }, []);

  return <>{children}</>;
}
