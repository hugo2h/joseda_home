/**
 * lenisControl.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Bridge de módulo para el ciclo de vida de Lenis.
 *
 * PROBLEMA ANTERIOR:
 *   SmoothScrollProvider registraba window.__mav_destroyLenis y
 *   window.__mav_initLenis en su useEffect. MinimizedShell leía esas funciones
 *   en tiempo de minimize/restore mediante (window as Record<string, unknown>)[key].
 *   Race condition idéntica a la del bridge 3D: si los helpers de window no
 *   estuvieran definidos en el momento exacto del minimize, Lenis no se destruía
 *   → su listener wheel con preventDefault() seguía activo → los eventos de
 *   scroll no llegaban al content-flow → la animación 3D no funcionaba.
 *
 * SOLUCIÓN:
 *   Mismo patrón que heroScrollBridge: módulo singleton cargado antes de
 *   cualquier render. SmoothScrollProvider registra las funciones reales.
 *   MinimizedShell las invoca directamente vía import.
 */

let _destroy: (() => void) | null = null;
let _init   : ((scrollTo?: number) => void) | null = null;

/** SmoothScrollProvider llama a esto al crear las funciones de ciclo de vida. */
export function registerLenisControl(
  destroy: () => void,
  init   : (scrollTo?: number) => void,
): void {
  _destroy = destroy;
  _init    = init;
}

/** SmoothScrollProvider llama a esto en su cleanup. */
export function unregisterLenisControl(): void {
  _destroy = null;
  _init    = null;
}

/** Destruye la instancia Lenis activa (si existe). No-op si no está registrado. */
export function destroyLenis(): void {
  _destroy?.();
}

/**
 * Destruye la instancia Lenis activa y crea una nueva.
 * @param scrollTo  posición de scroll a restaurar (px). Default 0.
 */
export function initLenis(scrollTo = 0): void {
  _init?.(scrollTo);
}
