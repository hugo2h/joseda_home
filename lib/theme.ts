/**
 * SiteThemeConfig
 * ───────────────
 * Objeto de configuración para sobreescribir las variables CSS del :root
 * declaradas en globals.css. Pásalo a <SiteTheme config={…} /> en cualquier
 * página para cambiar la paleta completa sin tocar CSS global.
 *
 * Los valores por defecto (los que se ven si no pasas nada) están en globals.css.
 */
export interface SiteThemeConfig {
  /** Color de fondo principal.          Por defecto: #0a0908  */
  bg?          : string;
  /** Color de fondo secundario.         Por defecto: #0f0e0c  */
  bg2?         : string;
  /** Color del texto principal.         Por defecto: #f0e8d8  */
  text?        : string;
  /** Color del texto secundario/muted.  Por defecto: #a89f93  */
  muted?       : string;
  /** Color de acento / highlight.       Por defecto: #d4a843  */
  accent?      : string;
  /** Color de los bordes (rgba).        Por defecto: rgba(240,232,216,0.08) */
  border?      : string;
  /**
   * Colores de los focos de luz ambiente (.bg-lights).
   * Úsalos para dar identidad cromática a cada ruta sin tocar layout.tsx.
   * Por defecto: azul (Home). Ejemplo rojo: 'rgba(200,50,30,0.15)'
   */
  lightColorA? : string;   /* foco principal (0%  of gradient stop) */
  lightColorB? : string;   /* foco secundario (35% stop) */
  lightColorC? : string;   /* foco lejano    (60% stop) */
}
