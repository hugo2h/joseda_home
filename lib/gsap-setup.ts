/**
 * gsap-setup.ts — Singleton GSAP
 * Importa y registra los plugins UNA SOLA VEZ para toda la app.
 * Todos los componentes importan gsap (y ScrollTrigger) desde aquí.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { ScrollTrigger };
export default gsap;
