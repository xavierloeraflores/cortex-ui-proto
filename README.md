# Cortex UI

A React playground and shared library of 66 components, styled with dark surfaces, cyan accents, fine borders, and technical typography. The single-page workbench shows every component through 26 demo panels and a command palette.

## Run locally

Use Node.js 22.13+ LTS or 24+ and pnpm 11.9.0.

```sh
pnpm install
pnpm dev
```

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

The build explicitly sets `NODE_ENV=production`. Vite prints the development or production-preview URL.

## Workspace

- `packages/ui/src/components`: all 66 component modules, exported from `@cortex/ui` and individual subpaths.
- `packages/ui/src/styles.css`: shared theme tokens and component styling, including portaled menus and dialogs.
- `packages/ui/src/catalog.ts`: the complete component inventory.
- `apps/playground/src/demos`: interactive examples grouped by component family.
- `apps/playground/src/panels.ts`: the mapping between components and their overview panels.
- `guides/component-library.md`: source attribution, scope, and visual direction.
- `guides/verification.md`: checks and interaction coverage.
- `docs/`: reserved for generated GitHub Pages output that can be committed. Keep developer documentation in `guides/`.

Both packages remain private. The playground consumes the UI package's TypeScript directly. There is no registry or publishing setup.

## Use a component

```tsx
import { Button } from "@cortex/ui";
// Individual imports also work: import { Button } from "@cortex/ui/button";
import "@cortex/ui/styles.css";

<Button variant="outline">Create project</Button>
```

Import styles once in the consuming app. Tailwind v4 scans the UI package explicitly. The playground bundles Space Grotesk and IBM Plex Mono locally; other consumers can load those fonts or override the font tokens. Use `.dark` on the document root for the dark variants.

The component index and `⌘K` / `Ctrl+K` search jump to each live demo. Example actions run locally; the gallery has no AI service, account system, or persistence.

## Reference and attribution

The supplied design reference is saved at `references/system-ui-inspiration.png` and excluded from Git. It is not required to build or run the app. The artwork in the playground is an original SVG study.

Components adapt the official shadcn/ui sources. The upstream MIT license is preserved in `packages/ui/LICENSE.shadcn.md`.
