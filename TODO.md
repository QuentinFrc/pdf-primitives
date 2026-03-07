# pdf-primitives — TODO

## Done

- [x] Monorepo scaffold (Turborepo, pnpm workspaces)
- [x] `packages/pdf-primitives` with tsup build (ESM/CJS/DTS)
- [x] tw engine — Tailwind utility → react-pdf style objects
- [x] `<Tailwind>` provider + `useTw()` hook
- [x] Primitives: Block, Text, Page, Image, Link, Document
- [x] View→Block rename (View kept as alias)
- [x] `breakable` prop (maps to react-pdf `wrap`)
- [x] Theme system (CSS variable convention, wildcards, oklch conversion)
- [x] Tests: tw engine, resolveTheme, components, exports (143 tests)
- [x] Demo app (`apps/demo/`)
- [x] Vitest UI (`test:ui`)

---

## Plan: Solidify pdf-primitives for v0.1

Objectif : que `pdf-primitives` soit **standalone** — l'utilisateur n'importe jamais `@react-pdf/renderer` directement. On est le seul point d'entrée.

### Step 1 — Re-exports complets de react-pdf

Le consommateur ne doit jamais avoir à `import { ... } from "@react-pdf/renderer"`. On re-exporte tout ce qui est utile.

**Re-exports directs (pass-through, aucun wrapping) :**
- `Font` — Font.register(), Font.registerHyphenationCallback(), Font.registerEmojiSource()
- `StyleSheet` — StyleSheet.create() pour ceux qui veulent du style objet pur
- `PDFViewer` — composant web pour preview (iframe)
- `PDFDownloadLink` — lien de téléchargement
- `BlobProvider` — accès au blob sans UI
- `usePDF` — hook pour génération programmatique
- `pdf()` — fonction pour génération Node/SSR

**Re-exports SVG (pass-through, pas de className dessus) :**
- `Svg`, `G`, `Path`, `Rect`, `Circle`, `Ellipse`, `Line`, `Polyline`, `Polygon`, `Text as SvgText`, `Tspan`, `Defs`, `ClipPath`, `Stop`, `LinearGradient`, `RadialGradient`

**Nouveaux primitives wrappés (className support) :**
- `Canvas` — wrapper mince avec className, re-expose le `paint` callback
- `Note` — wrapper mince avec className

### Step 2 — tw engine : classes manquantes (react-pdf supported)

Ajouter uniquement ce qui est **supporté par react-pdf**. On ne simule pas ce qui n'existe pas.

**Fractional widths/heights :**
- `w-1/2` → `50%`, `w-1/3` → `33.333%`, `w-2/3` → `66.667%`, `w-1/4` → `25%`, `w-3/4` → `75%`, `w-1/5`, `w-2/5`... etc.
- Même chose pour `h-1/2` etc.

**Flex-basis :**
- `basis-0`, `basis-1`...`basis-96` (spacing values)
- `basis-auto`, `basis-full`, `basis-1/2`, `basis-1/3`...

**Order :**
- `order-1`...`order-12`, `order-first` (-9999), `order-last` (9999), `order-none` (0)

**Aspect ratio :**
- `aspect-square` → `{ aspectRatio: 1 }`, `aspect-video` → `{ aspectRatio: 16/9 }`, `aspect-auto`, `aspect-[4/3]`

**Negative prefix :**
- `-mt-2`, `-ml-4`, `-top-2`, etc. — parser le prefix `-` au niveau du class split

**Text decoration extras (react-pdf les supporte) :**
- `decoration-red-500` → `textDecorationColor`
- `decoration-solid`, `decoration-dashed`, etc. → `textDecorationStyle`
- `indent-*` → `textIndent` (avec spacing values)

**Transform (react-pdf supporte) :**
- `rotate-45`, `rotate-90`, `rotate-180` → `transform: rotate(45deg)`
- `scale-50`, `scale-75`, `scale-100`, `scale-125`, `scale-150` → `transform: scale(0.5)` etc.
- `translate-x-*`, `translate-y-*` → `transform: translateX()`
- Arbitraires : `rotate-[30]`, `scale-[1.5]`

**Unités react-pdf (pt, in, mm, cm, vw, vh) :**
- Supporter dans les valeurs arbitraires : `w-[210mm]`, `h-[297mm]`, `p-[1in]`, `w-[50vw]`
- Parser les suffixes d'unité dans les `[...]`

### Step 3 — DX

**Dev warnings :**
- En `process.env.NODE_ENV !== 'production'`, `console.warn` quand une classe n'est reconnue par aucun matcher
- Warn une seule fois par classe (Set de classes déjà averties)

**Sub-path export `pdf-primitives/tw` :**
- Ajouter un entry point dans tsup + package.json exports pour `import { createTw } from "pdf-primitives/tw"`
- Permet d'utiliser le moteur tw sans React (scripts Node, SSR, tests)

**Utilitaire `cn()` :**
- Exporter un helper `cn(...classes)` qui concat des strings conditionnellement (comme `clsx` mais embarqué)
- Léger : juste filter les falsy et join avec espace

### Step 4 — Tests pour tout le nouveau

- Tests tw engine pour chaque nouvelle catégorie de classe
- Tests re-exports (Font, StyleSheet, PDFViewer, etc. sont bien exportés)
- Tests Canvas et Note primitives
- Tests cn()
- Tests dev warnings
- Tests unités arbitraires

### Step 5 — README + LICENSE

- README.md avec : install, usage basique, API reference, liste des classes supportées
- LICENSE (MIT)

---

## Hors scope v0.1

- `space-x/y`, `divide-x/y` — nécessitent de wrapper les children, trop magique pour des primitives
- `ring-*`, `shadow-*` — pas de box-shadow dans react-pdf
- `font-sans/mono/serif` — dépend de la config font de l'utilisateur, pas générique
- `sm:`, `md:`, `hover:`, `focus:` — pas de sens en PDF
- Media queries `@media` — react-pdf les supporte mais c'est un cas avancé, pas du Tailwind
- Documentation site (Fumadocs) — phase suivante
- npm publish — phase suivante
- CI/CD — phase suivante
