# CONTEXT_LOG — jose-david-web
> **LEER SIEMPRE** antes de tocar cualquier archivo del proyecto.  
> Actualizar en cada sesión de trabajo significativo.

---

## REGLAS ESTRICTAS DEL PROYECTO

### 1. Componentes de cliente
- **NUNCA** usar `next/dynamic` con `{ ssr: false }` en un archivo sin `'use client'`.
- `app/page.tsx` SIEMPRE debe tener `'use client';` en la primera línea mientras importe componentes con efectos de cliente (GSAP, Lenis, R3F...).
- Si un componente usa WebGL / Canvas / APIs de browser → importar con `dynamic(..., { ssr: false })`.
- Si el componente usa sólo GSAP + imagen → importar directamente (sin dynamic).

### 2. GSAP + Lenis (smooth scroll)
- El scroller de ScrollTrigger es SIEMPRE `.scroll-viewport` (el div que hace scroll real dentro del `.app-shell`).
- Pasar `scroller: document.querySelector('.scroll-viewport')` a todos los ScrollTriggers.
- Registrar plugins con `gsap.registerPlugin(...)` UNA SOLA VEZ por archivo, fuera del componente.
- Cleanup: siempre usar `gsap.context()` + `ctx.revert()` en el return del useEffect.

### 3. Next.js Image
- Todas las imágenes grandes de fondo → usar `<Image fill />` con `sizes="100vw"`.
- El contenedor padre de `<Image fill>` DEBE tener `position: relative | absolute | fixed`.
- Imágenes de fondo absolutas van en `z-index: 0`; el contenido encima en `z-index: 1`.

### 4. Hidratación (SSR ↔ Client)
- Nunca leer `sessionStorage` / `localStorage` / `window` fuera de `useEffect`.
- Para valores que difieren entre server y cliente: usar patrón `useMounted` (retornar `null` hasta que el componente esté montado).
- Si aparece hydration error → buscar lectura de APIs de browser en render path.

### 5. Memoria de Windows / Turbopack OOM
- El servidor puede crashear con "El archivo de paginación es demasiado pequeño" si hay escasez de memoria virtual en Windows.
- Iniciar siempre con: `NODE_OPTIONS="--max-old-space-size=2048" npm run dev`
- `next.config.ts` tiene `turbopack.root: __dirname` para silenciar warning de múltiples lockfiles.

---

## ARQUITECTURA ACTUAL

```
app/
  page.tsx          — Client Component ('use client'), imports HeroJD DIRECTAMENTE
  globals.css       — CSS global: variables, shell, nav, hero, about, cursos, podcasts, contact, responsive
  layout.tsx        — Root layout (no tocar sin razón)

components/
  HeroJD.tsx        — Hero con imagen de fondo + GSAP pin+scrub (SIN React Three Fiber)
  AboutJD.tsx       — Ventanas OS draggables (GSAP Draggable)
  Cursos.tsx        — 3 paneles con fan hover (GSAP)
  Podcasts.tsx      — Lista de podcasts + modal flotante hover + IMAGEN DE FONDO
  ContactJD.tsx     — NeuralCanvas SVG animado (canvas de contacto, NO es el hero)
  FooterJD.tsx      — Footer con nav links
  PageLayout.tsx    — Wrapper: TopBar + SmoothScrollProvider + Nav + CustomScrollbar
  Nav.tsx           — Sidebar izquierda + bottom bar
  TopBar.tsx        — Barra superior con brand + controles
  SmoothScrollProvider.tsx — Lenis + app-shell

public/
  images/           — Fotos reales de José David (ver tabla abajo)
  models/           — GLB 3D (ya no se usan en el Hero; disponibles si se necesitan)

lib/
  useIsomorphicLayoutEffect.ts
  heroScrollBridge.ts   — Ya no se usa (se mantenía para el Canvas 3D eliminado)
  heroSTBridge.ts       — Ya no se usa (ídem)

context/
  MinimizeContext.tsx   — Ya no se usa en HeroJD tras eliminar Canvas
```

---

## IMÁGENES DISPONIBLES EN /public/images/

| Archivo | Contenido | Uso actual |
|---|---|---|
| `hero-bg.jpg` | José David en silueta ante auditorio lleno, glow azul en pantalla | **Hero — fondo principal** |
| `podcast-bg.jpg` | Vista frontal auditorio + pantalla presentación | **Podcasts — fondo** |
| `ponencia-1.jpg` → `ponencia-12.jpg` | Ponencia profesional, auditorio, banderas ES/EU | Disponibles |
| `pasado-1.jpg` → `pasado-3.jpg` | Fotos históricas y eventos pasados | Disponibles |
| `formacion-C2183_*.jpg` | Capturas de formación, JD señalando pantalla IA | Disponibles |
| `formacion-C2184_*.jpg` | Capturas taller, alumnos con ordenadores | Disponibles |
| `formacion-C2185_*.jpg` → `C2187_*.jpg` | Sesiones formación, trabajo en grupo | Disponibles |
| `jd-stage.jpg` | JD en ponencia (usada en AboutJD ventana foto) | About — ventana OS |
| `jd-formacion.jpg` | JD en formación (Cursos panel 1) | Cursos |
| `jd-auditorio.jpg` | Auditorio (Cursos panel 2) | Cursos |
| `jd-ponente.jpg` | JD ponente (Cursos panel 3) | Cursos |

---

## HISTORIAL DE CAMBIOS

### 2026-05-27 — Sesión 8 (actual)

#### Fix: centrado y altura exacta del Hero en móvil
- **Problema**: el Hero se cortaba por abajo y el texto no quedaba centrado verticalmente en móvil porque el padding vertical era excesivo y `100dvh` no descontaba los frames del app-shell.
- **Fix en `globals.css` (≤768px)**:
  - `.hero { height: calc(100svh - (var(--frame) * 2)) !important }` — altura exacta descontando los 2 frames del shell (4px × 2).
  - `padding: 3.5rem 5% 3.5rem !important` — paddings verticales reducidos para que flexbox pueda centrar.
  - `.hero-inner { margin-top: -1.5rem }` — compensa visualmente la topbar + bottombar.

---

### 2026-05-27 — Sesión 7

#### PASO 1 — Integración de assets locales + fundidos CSS premium
- **Imágenes**: ya usaban `/public/images/` correctamente. No había placeholders.
- **`object-position`**: actualizado a `50% 20%` en Hero y Contact (responsive: 50% 18% en ≤768px, 50% 15% en ≤480px / Contact móvil: `50% 10%`).
- **`mask-image` Hero (`.hero-bg-img`)**: fade inferior `black 45% → transparent 96%` para fundir la foto con el fondo oscuro sin corte brusco.
- **`mask-image` Contact (`.ct-photo-img`)**: fade lateral izquierdo `transparent → black 30%` en desktop; fade superior en móvil (columna apilada).
- Nota: `-webkit-mask-image` incluido para compatibilidad Safari/iOS.

#### PASO 2 — Optimización de scroll y animación de entrada
- **`HeroJD.tsx`**: Clase `hero-bg-wrap` añadida al contenedor de imagen para targetearla con GSAP.
- **Animación de entrada (GSAP)**: `hero-bg-wrap` hace `scale: 1.05 → 1, opacity: 0 → 1, duration: 1.2s, ease: power2.out` en el mismo `gsap.context` (cleanup automático). Texto sigue a continuación con offset temporal.
- **`scrub: 2.5 → 1.5`**: scroll-driven animation 40% más reactiva al empezar a bajar.
- **`SmoothScrollProvider.tsx`**: Lenis desktop `duration: 1.2 → 1.0` para mayor inmediatez.
- `heroScrollBridge.ts` y `lenisControl.ts`: son puentes de ciclo de vida sin config de scroll, no se modifican.

#### Build verificado
- `npx tsc --noEmit` → 0 errores.
- `npm run build` → ✓ Compiled successfully.

---

### 2026-05-27 — Sesión 6

#### PASO 1 — Optimización de imágenes responsive (Hero + Contacto)
- **Problema**: `objectPosition` estaba como inline style → los media-queries CSS no podían sobreescribirlo.
- **HeroJD.tsx**: Eliminado `objectPosition` del inline style. Añadida clase `hero-bg-img`. `priority` y `sizes="100vw"` ya estaban correctos.
- **ContactJD.tsx**: Eliminado `objectPosition` del inline style. Ya tenía clase `ct-photo-img`.
- **globals.css**:
  - `.hero-bg-img { object-position: center 30% }` → `@768px: center 22%` → `@480px: center 18%`.
  - `.ct-photo-img { object-position: center 15% }` → `@768px: center top` (columna apilada en móvil).

#### PASO 2 — Performance y accesibilidad
- **`SmoothScrollProvider.tsx`**: `prefersReducedMotion` → `duration: 0, smoothWheel: false`. `isMobile` → `duration: 0.75` (vs 1.2 desktop). Scroll más rápido y menos lag en gama baja.
- **`Cursos.tsx`**: `useReducedMotion()` de Framer Motion → `initial={false}` cuando está activo (sin animación de entrada).
- **`Podcasts.tsx`**: Mismo patrón en `PRow` + prop `reduceMotion` añadida a la interface.
- **`globals.css`** — nuevo bloque `@media (prefers-reduced-motion: reduce)`:
  - `*, *::before, *::after`: `animation-duration: 0.01ms`, `transition-duration: 0.01ms` (estándar W3C).
  - `.mq-row`, `.wave-char`, `.ct-photo-img`, `.scroll-line`: animaciones y transiciones desactivadas.
- **`globals.css`** — `@media (max-width: 768px)`:
  - `.mq-row { animation-play-state: paused }` — marquee 120s pausado en móvil (GPU ahorro).
- **Three.js / R3F**: ya eliminado desde Sesión 3, no hay Canvas ni `dpr` que gestionar.

#### Build verificado
- `npx tsc --noEmit` → 0 errores.
- `npm run build` → ✓ Compiled successfully, 0 warnings.

---

### 2026-05-27 — Sesión 5

#### PASO 1 — Corrección espaciado Hero (bug palabras pegadas)
- **Bug**: `.hero-char` usa `display: inline-block`. Los spans de espacio (`{' '}`) con ese display podían colapsar su ancho a 0, causando que las palabras se visualizaran juntas ("Transformatuformade").
- **Fix en `HeroJD.tsx`**: En la función `chars()`, los spans de espacio ahora usan `{' '}` (non-breaking space, nunca colapsa) y se les añade la clase `hero-char--space`.
- **Fix en `globals.css`**: Nueva regla `.hero-char--space { min-width: 0.28em; user-select: none; }` — garantía doble de anchura visible.

#### PASO 2 — Responsive móvil Hero
- **`globals.css` ≤768px**:
  - `.hero-inner { padding: 0 1.25rem }` — zona segura interior, texto nunca toca los bordes.
  - `.hero-headline { font-size: clamp(2rem, 9vw, 3.2rem); line-height: 1.08 }`.
  - `.hero-sub { font-size: 0.9rem; max-width: 100% }` — ancho completo en móvil.
- **`globals.css` ≤480px**:
  - `.hero-inner { padding: 0 1rem }` — zona segura en pantallas muy pequeñas.
  - `.hero-headline { font-size: clamp(1.75rem, 8.5vw, 2.4rem); line-height: 1.1 }`.
  - `.hero-sub { font-size: 0.84rem }` — legible en pantallas de 320px.

#### Regla nueva añadida
- **`display: inline-block` + whitespace**: Los spans con `display: inline-block` que contengan solo un espacio regular pueden colapsar a 0 de anchura. Usar siempre ` ` (non-breaking space) o `min-width` explícito en spans de espacio para GSAP character animations.

---

### 2026-05-27 — Sesión 4

#### PASO 1 — Rediseño de Contacto (ContactJD.tsx)
- **Eliminado**: `NeuralCanvas` component completo — SVG con nodos/líneas animados en RAF + GSAP pulso.
- **Eliminado**: `NODE_COUNT`, `CONN_PER_NODE`, interfaz `Node`, `useEffect` RAF, `svgRef`, `rafRef`, `nodesRef`.
- **Eliminado**: imports `useEffect` (queda solo `useRef`), ya no se usa para la animación de nodos.
- **Añadido**: `<Image src="/images/jose-david-contacto.jpg" fill>` en la columna derecha.
- **Añadido**: overlay degradado `linear-gradient(to right, rgba(10,10,18,0.45), transparent)` para fundir con columna de texto.
- **CSS añadido** en `globals.css`: `.ct-photo`, `.ct-photo-img`, `.ct-photo-overlay`, hover scale en `.ct-canvas:hover .ct-photo-img`.
- **Foto elegida (v1)**: `formacion-C2183_1.1.22.jpg` → encuadre demasiado ajustado, mano recortada, demasiado brillante. Sustituida.
- **Foto definitiva (v2)**: `formacion-C2183_1.1.11.jpg` → `jose-david-contacto.jpg`. JD en plano medio-largo delante de pantalla táctil, vista 3/4, torso completo visible, espacio negativo suficiente. Oscuridad de sala compatible con tema dark.
- **`objectPosition`**: `center 15%` (muestra cara + torso sin recorte superior).
- **Overlays mejorados** en `.ct-photo-overlay`: capa de oscurecimiento global `rgba(0,0,0,0.25)` + fade izquierdo `rgba(5,5,5,0.68)→transparent 48%` + fade inferior `rgba(5,5,5,0.42)→transparent 28%`.

#### PASO 3 — Micro-animaciones Framer Motion
- **Instalado**: `framer-motion@12.40.0`.
- **Cursos.tsx**:
  - Añadido import `motion` de framer-motion.
  - Añadido `scrollViewportRef` (ref al `.scroll-viewport` para `viewport.root`).
  - **Eliminado**: bloque GSAP `panelRefs.current.forEach(...)` (ScrollTrigger por panel con `fromTo opacity/scale/y`).
  - **Cambiado**: `<div className="work-panel">` → `<motion.div>` con `initial={opacity:0,y:30}`, `whileInView={opacity:1,y:0}`, `transition={duration:0.65,delay:i*0.13}`, `viewport={once:true,margin:'-80px',root:scrollViewportRef}`.
- **Podcasts.tsx**:
  - Añadido import `motion` y `useEffect`.
  - Añadido `scrollViewportRef` inicializado en `useEffect`.
  - `PRow` interface ampliada: recibe `index` y `svRoot`.
  - `<div className="p-row">` → `<motion.div>` con `initial={opacity:0,y:20}`, `whileInView={opacity:1,y:0}`, `transition={duration:0.6,delay:index*0.10}`, `viewport={once:true,margin:'-50px',root:svRoot}`.

#### Regla nueva añadida
- **Framer Motion + app-shell**: `viewport.root` debe apuntar a `.scroll-viewport` para que `whileInView` funcione con el custom scroller (Lenis wrapper). Sin `root`, IntersectionObserver usa el viewport del browser, que puede no coincidir.

#### Rutas de imágenes temporales preparadas en esta sesión
| Ruta | Descripción | Estado |
|---|---|---|
| `/images/jose-david-contacto.jpg` | Foto sección Contacto — JD plano medio-largo delante pantalla táctil (`formacion-C2183_1.1.11.jpg`) | **Activa** — puede mejorarse si hay foto más amplia |
| `/images/hero-bg.jpg` | Fondo Hero — auditorio lleno, JD silueta | **Temporal** — reemplazar si se desea |
| `/images/podcast-bg.jpg` | Fondo Podcasts — auditorio frontal | **Temporal** — reemplazar si se desea |

---

### 2026-05-27 — Sesión 3

#### Paso 1 — Error de compilación page.tsx
- **Problema**: `ssr:false` en Server Component.
- **Fix**: `'use client';` ya estaba en la primera línea (resuelto en sesión anterior).
- **Extra**: Cambiado import de HeroJD de `dynamic(..., { ssr: false })` a import directo, ya que HeroJD ya no usa WebGL.

#### Paso 2 — Eliminación del Canvas 3D del Hero
- **Eliminado**: Todo el código de React Three Fiber (`Canvas`, `useFrame`, `useGLTF`, `Float`, `THREE`, `SpinningModel`, `HeroScene`, `useGLTF.preload`).
- **Eliminado**: Bridges de scroll 3D (`registerProgressSetter`, `registerHeroST`, `unregisterProgressSetter`, `unregisterHeroST`).
- **Eliminado**: `useMinimize` context (era para ajustar posiciones de modelos 3D).
- **Añadido**: `<Image src="/images/hero-bg.jpg" fill priority>` como fondo fotográfico.
- **Añadido**: Overlay oscuro diagonal `rgba(5,5,5,0.82→0.52→0.78)` + glow de acento `rgba(56,189,248,0.09)`.
- **Mantenido**: GSAP entrance animation + pin+scrub + character proximity hover.
- **Foto elegida**: `_DSC5498.jpg` (auditorio lleno, JD en silueta, círculo azul = paleta del proyecto).

#### Paso 3 — Fondo de la sección Podcasts
- **Modificado**: `Podcasts.tsx` — añadido `<Image src="/images/podcast-bg.jpg" fill>` + overlay oscuro + degradado superior de transición.
- **Foto elegida**: `_DSC5542.jpg` (vista frontal auditorio + pantalla grande).
- **Añadidos**: `position: relative` en el `<section>`, `z-index: 1` en `.portfolio-header` y `.portfolio-list`.

#### Paso 4 — Imágenes copiadas a public/images/
- Extraídos 3 ZIPs: `FOTOS_JD_PONENCIA`, `FOTOS_JD_PASADO`, `FOTOS_JD_FORMACIÓN`.
- Copiados todos los JPG/JPEG usables (no HEIC, no ARW, no MOV).
- Ver tabla de imágenes arriba para el catálogo completo.

---

### 2026-05-27 — Sesión 2

- Revertido el proyecto a baseline app-mav (git no disponible — revert manual).
- Limpiados archivos creados en sesión 1: `Preloader.tsx`, `HeroScene.tsx`, `ui/lamp.tsx`, `ui/sparkles.tsx`, `lib/utils.ts`.
- Eliminadas dependencias no-baseline: `@tsparticles/*`, `clsx`, `tailwind-merge`, `framer-motion`.
- Implementado diseño responsive mobile completo (`@media max-width: 768px` + `480px`).
- Corregido error OOM de Windows (page file): servidor reiniciado.
- Añadido `next.config.ts` con `turbopack.root` para silenciar warning de lockfiles.

---

### 2026-05-27 — Sesión 1

- Creado scaffold completo del proyecto (29 archivos).
- Hero con React Three Fiber Canvas + 4 modelos GLB.
- Secciones: AboutJD, Cursos, Podcasts, ContactJD, FooterJD.
- Error de hidratación en Preloader (patrón useMounted).
- Error de lamp invisible (scaleY fix con clip-path).

---

## RUTAS DE IMÁGENES TEMPORALES

Si se quieren cambiar las fotos de fondo en el futuro:

```bash
# Hero background
public/images/hero-bg.jpg          → reemplazar con la foto definitiva

# Podcasts background  
public/images/podcast-bg.jpg       → reemplazar con la foto definitiva
```

No cambiar los nombres de archivo — sólo sustituir el contenido del fichero.

---

## DEPENDENCIAS ACTUALES (package.json)

```json
{
  "@react-three/drei": "^10.7.7",   ← ya no se usa en Hero, disponible para otras secciones
  "@react-three/fiber": "^9.6.0",   ← ídem
  "framer-motion": "^12.40.0",      ← AÑADIDO sesión 4 (stagger whileInView en Cursos + Podcasts)
  "gsap": "^3.15.0",
  "lenis": "^1.3.23",
  "lucide-react": "^1.14.0",
  "next": "16.2.4",
  "react": "19.2.4",
  "three": "^0.184.0"               ← ídem
}
```

> `@react-three/*` y `three` pueden eliminarse de `package.json` si no se van a reutilizar en otras secciones. Por ahora se mantienen.
