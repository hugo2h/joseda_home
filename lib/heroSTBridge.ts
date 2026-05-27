/**
 * heroSTBridge.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Bridge de módulo para el ciclo de vida del ScrollTrigger del Hero.
 *
 * PROBLEMA:
 *   En modo minimizado el scroll ocurre en content-flow (overflow-y:scroll),
 *   no en window. El ScrollTrigger del Hero fue creado con scroller:window y
 *   no se puede cambiar de scroller después de la creación.
 *
 * SOLUCIÓN:
 *   Al minimizar → destroyHeroST() mata el ST de window y registra un nuevo
 *   ST con scroller:content-flow + pinType:'transform' (necesario porque
 *   position:fixed no funciona dentro de un transform:scale).
 *   Al restaurar → destroyHeroST() mata el ST de content-flow y
 *   initHeroST() recrea el ST con scroller:window.
 *
 * Hero.tsx registra las funciones reales via registerHeroST().
 * MinimizedShell.tsx las invoca via destroyHeroST() / initHeroST().
 */

type ScrollerArg = Element | Window | string | null | undefined;

let _init   : ((scroller?: ScrollerArg) => void) | null = null;
let _destroy: (() => void)              | null = null;

/** Hero.tsx llama a esto para registrar las funciones de ciclo de vida. */
export function registerHeroST(
  init   : (scroller?: ScrollerArg) => void,
  destroy: () => void,
): void {
  _init    = init;
  _destroy = destroy;
}

/** Hero.tsx llama a esto en su cleanup de useEffect. */
export function unregisterHeroST(): void {
  _init    = null;
  _destroy = null;
}

/**
 * Destruye el ScrollTrigger activo del Hero (sin crear uno nuevo).
 * No-op si no está registrado.
 */
export function destroyHeroST(): void {
  _destroy?.();
}

/**
 * Destruye el ScrollTrigger activo y crea uno nuevo con el scroller dado.
 * @param scroller  El contenedor de scroll. Omitir (o pasar null/window) = window.
 */
export function initHeroST(scroller?: ScrollerArg): void {
  _init?.(scroller);
}
