# pdf-primitives

Tailwind-powered primitives for `@react-pdf/renderer`. The base layer that makes react-pdf feel like writing HTML with Tailwind classes.

## Monorepo structure (Turborepo)

Bootstrapped with `npx create-turbo@latest --example blank` + `pnpm dlx ultracite init` for linting/formatting.

```
pdf-primitives/
├── turbo.json
├── package.json              — workspaces root (pnpm)
├── packages/
│   └── pdf-primitives/       — the npm package
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts    — build config
│       └── src/
│           ├── index.ts      — barrel export (public API)
│           ├── tw.ts         — Tailwind engine (pure TS, no React)
│           ├── tailwind.tsx  — <Tailwind> provider + useTw()
│           └── primitives.tsx — Block, Text, Page, Image, Link, Document
├── apps/
│   ├── docs/                 — Fumadocs documentation site
│   │   └── ...
│   └── demo/                 — current shadcn-pdf Vite app (component playground)
│       └── ...
└── ...                       — future packages/apps
```

## Packages

### `packages/pdf-primitives`

The core library published to npm as `pdf-primitives`.

**Exports:**

```
pdf-primitives
├── Block, Text, Page, Image, Link, Document  — className-enabled primitives
├── View          — alias for Block (compat with react-pdf / React Native users)
├── Tailwind      — <Tailwind theme={...}> provider
├── useTw         — hook to access tw() in custom components
├── createTw      — factory: createTw(themeVars) → tw (for non-React usage)
├── tw            — default tw() instance (no custom theme)
└── types: ThemeVars, TwFn, StyleObject, PDFBlockProps, PDFTextProps, etc.
```

**Naming:**
- `Block` replaces `View` — more explicit in PDF context (block-level container, like `<div>`). `View` re-exported as alias.
- `breakable` replaces `wrap` — react-pdf's `wrap` boolean controls page-break behavior, not flex-wrap. `breakable` is unambiguous (`<Block breakable={false}>` = keep together on one page).

**Dependencies:**

| Dependency | Type | Why |
|---|---|---|
| `@react-pdf/renderer` | **peer** | We wrap its components |
| `react` | **peer** | JSX, hooks, context |

No runtime dependencies. Pure TypeScript.

**Build:** tsup (dual ESM/CJS, .d.ts generation)

### Future packages (potential)

- `packages/pdf-icons` — Lucide-compatible SVG icons for react-pdf (if worth extracting)
- `packages/create-pdf-primitives` — CLI scaffolding (far future)

## Apps

### `apps/docs`

Fumadocs-powered documentation site.

- Installation guide
- Primitives API reference (View, Text, Page, etc.)
- Theme configuration
- Tailwind utility reference (what's supported)
- Shadcn UI component registry (copy-paste components)
- Examples / playground

### `apps/demo`

The current Vite app from `shadcn-pdf/`. Component playground for development.

## Internal architecture of `packages/pdf-primitives`

```
src/
├── index.ts              — barrel export
├── tw.ts                 — Tailwind engine (zero imports, pure TS)
│   ├── createTw()        — creates a tw() from theme vars
│   ├── resolveTheme()    — merges user theme vars with defaults
│   ├── buildMatchers()   — parser chain for each utility class
│   ├── oklchToRgb()      — oklch → hex (react-pdf only supports hex/rgb/rgba/hsl)
│   ├── hexToRgba()       — hex + alpha → rgba (for bg-red-500/50 syntax)
│   └── default palette   — Tailwind v4 colors + Shadcn semantic tokens
├── tailwind.tsx          — <Tailwind> provider + useTw() hook
└── primitives.tsx        — View, Text, Page, Image, Link, Document wrappers
```

`tw.ts` has zero imports — it can be used outside React (SSR, Node scripts, etc.). This is intentional and should stay that way. Consider exposing it as a separate entry point (`pdf-primitives/tw`) for non-React consumers.

## What primitives wrap

Each primitive is a thin forwardRef wrapper that:

1. Takes a `className` prop (string of Tailwind classes)
2. Calls `useTw()` to get the theme-aware `tw()` function
3. Converts `className` to a style object via `tw(className)`
4. Merges with any explicit `style` prop (style wins)
5. Passes everything to the underlying react-pdf component

```tsx
// Usage
import { Block, Text, Page, Document, Tailwind } from "pdf-primitives";

<Tailwind theme={{ "--color-brand": "#0073e6" }}>
  <Document>
    <Page className="p-8 bg-white">
      <Block className="flex-row gap-2 p-4 bg-brand rounded-lg">
        <Text className="text-sm font-medium text-white">Hello PDF</Text>
      </Block>
    </Page>
  </Document>
</Tailwind>
```

## Tailwind engine — supported utilities

### Layout
flex, hidden, flex-row, flex-col, flex-wrap, flex-1, grow, shrink, items-*, justify-*, self-*, content-*, gap-*

### Spacing
p-*, px-*, py-*, pt/pr/pb/pl-*, m-* (same pattern), negative values (-mt-2), arbitrary (p-[12])

### Sizing
w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-*, w-full, h-full, w-auto

### Typography
text-xs..text-5xl, font-thin..font-black, italic, text-left/center/right, underline, uppercase, leading-*, tracking-*, line-clamp-*

### Colors
Tailwind palette (bg-red-500), Shadcn tokens (bg-primary, text-muted-foreground), opacity modifier (bg-destructive/10), oklch auto-conversion, arbitrary (bg-[#ff0000])

### Borders
border, border-2, border-t, border-red-500, border-solid/dashed/dotted, rounded, rounded-lg, rounded-full, rounded-t-lg

### Positioning
relative, absolute, top/right/bottom/left-*, z-*

### Other
opacity-*, overflow-hidden/visible, object-cover/contain

## Theme system

Tailwind v4 CSS variable convention:

```tsx
<Tailwind theme={{
  "--color-primary": "oklch(0.205 0 0)",  // auto-converted to hex
  "--color-brand-500": "#0073e6",
  "--color-*": "initial",                  // reset all defaults
  "--text-tiny": 5,
  "--spacing": 4,                          // base unit override
  "--radius-pill": 50,
}}>
```

Default Shadcn semantic tokens (light) are included out of the box:
background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring (+ their -foreground variants).

## Unit system

react-pdf uses **points** (pt): 1px = 0.75pt. Tailwind base unit: `1` = 4px = **3pt**. All values are pre-converted.

## react-pdf constraints

No support for: `transparent` keyword (mapped to `rgba(0,0,0,0)`), oklch (auto-converted), CSS Grid, calc(), box-shadow, transitions, hover/focus/responsive.

## TODO

### Phase 1 — Monorepo setup
- [ ] `npx create-turbo@latest --example blank` in pdf-primitives/
- [ ] `pnpm dlx ultracite init` for linting/formatting
- [ ] Create `packages/pdf-primitives/` with package.json, tsconfig, tsup
- [ ] Move `tw.ts`, `tailwind.tsx`, `primitives/index.tsx` from shadcn-pdf
- [ ] Rename View → Block (keep View as alias)
- [ ] Create `src/index.ts` barrel export
- [ ] Set `@react-pdf/renderer` and `react` as peer deps
- [ ] Verify build outputs (ESM, CJS, .d.ts)

### Phase 2 — Demo app
- [ ] Move current shadcn-pdf Vite app to `apps/demo/`
- [ ] Update imports to use `pdf-primitives` package (workspace reference)
- [ ] Verify everything still works

### Phase 3 — Docs
- [ ] Scaffold Fumadocs app in `apps/docs/`
- [ ] Write installation + getting started guide
- [ ] Document primitives API
- [ ] Document theme system
- [ ] Document supported Tailwind utilities
- [ ] Add Shadcn component registry section

### Phase 4 — Publish
- [ ] Choose final package name (check npm availability)
- [ ] Add README, LICENSE
- [ ] Configure changesets or manual versioning
- [ ] Publish to npm

### Open questions
- [ ] Should we wrap `Svg` too? (icons currently use react-pdf Svg directly)
- [ ] Separate entry point for `tw.ts` (`pdf-primitives/tw`)?
- [ ] Should `Canvas` be a primitive?
- [ ] Package name: `pdf-primitives` vs `react-pdf-primitives` vs other?
