/**
 * gsap-setup.ts — Singleton GSAP
 * Importa y registra los plugins UNA SOLA VEZ para toda la app.
 * Todos los componentes importan gsap desde aquí, nunca directamente.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default gsap;
