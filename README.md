# Layout UI

Token-contracted, reskinnable React components for the AI agent era. From [layout.design](https://layout.design).

One base component system. Every brand. Components consume only semantic `--layout-*` tokens, so an entire app re-skins from a single token block (compiled from a layout.md kit) with zero markup changes.

## Why

- **Token contract.** Components never hardcode colours, radii, shadows or motion. Everything flows from the canonical `--layout-*` semantic layer.
- **shadcn compatible.** Utilities resolve through fallback chains (`var(--background, var(--layout-bg))`), so existing shadcn and tweakcn themes work unchanged, and Layout themes install into stock shadcn projects.
- **Built for AI agents.** Every registry item carries `meta.usage`, `meta.never` and `meta.tokens`: machine-readable rules agents can follow and the Layout MCP server can validate.
- **Runtime axes.** `data-brand`, `data-theme="dark"` and `data-density="compact"` on any element scope a full reskin, dark mode, or density change.

## Install

Add the registry to `components.json`:

```json
{
  "registries": {
    "@layout": "https://layout.design/r/{name}.json"
  }
}
```

Then:

```bash
npx shadcn add @layout/theme-layout
npx shadcn add @layout/button
```

Works with Next.js, Vite, Laravel (Inertia), React Router, Astro and TanStack Start. See the docs site (`npm run dev`, then `/docs`) for per-framework guides.

## Gallery kit themes

Every kit in the [layout.design gallery](https://layout.design/gallery) compiles into a `[data-brand="<slug>"]` theme block automatically:

```bash
npm run sync:kits    # fetches all gallery kits, compiles style profiles
                     # → app/kit-themes.css + lib/docs/brands.json
```

New kit in the gallery? Re-run the sync and it appears in the brand switcher. Kits without a style profile are skipped and listed; generate one in the Layout admin (Kits → Regen style profile) and sync again.

## Development

```bash
npm run dev          # docs site on http://localhost:3000
npm run build        # production build
npx shadcn build     # emit registry JSON to public/r/
```

Components live in `registry/layout/<name>/`, one directory per component, indexed by `registry.json`. Primitives come from [Base UI](https://base-ui.com); styling is Tailwind CSS v4.

## Licence

MIT
