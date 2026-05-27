/**
 * heroScrollBridge.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Bridge de módulo (no window-global) entre MinimizedShell y Hero/HeroScene.
 *
 * PROBLEMA ANTERIOR:
 *   Hero exponía window.__mav_setHeroProgress en un useEffect.
 *   MinimizedShell leía esa función en el momento del minimize.
 *   Race condition: si el minimize ocurría antes de que el useEffect de Hero
 *   se ejecutara (HMR, React StrictMode, minimize muy temprano), la función
 *   era undefined → el scroll listener se saltaba la actualización del ref
 *   → la animación 3D quedaba congelada en progress=0.
 *
 * SOLUCIÓN:
 *   Este módulo se carga UNA sola vez al iniciar el bundle (antes de cualquier
 *   render de React). El setter se registra cuando Hero monta y se elimina cuando
 *   desmonta. MinimizedShell llama a setHeroProgress() directamente —
 *   si el setter aún no está registrado, la llamada es un no-op silencioso.
 *   Cero window globals, cero timing issues.
 */

let _setter: ((p: number) => void) | null = null;

/** Hero llama a esto en su useEffect para registrar su scrollRef setter. */
export function registerProgressSetter(fn: (p: number) => void): void {
  _setter = fn;
}

/** Hero llama a esto en el cleanup del useEffect (desmontaje). */
export function unregisterProgressSetter(): void {
  _setter = null;
}

/**
 * MinimizedShell llama a esto desde el scroll listener del content-flow.
 * Si Hero todavía no ha registrado su setter, es un no-op (no lanza error).
 */
export function setHeroProgress(p: number): void {
  _setter?.(p);
}
