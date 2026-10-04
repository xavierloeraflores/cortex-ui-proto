# Cortex UI

A workspace for designing our UI components, with a React playground to preview them. The long-term goal is a custom shadcn component collection. This repo is currently a prototype, with no registry or publishing setup.

## Development

Use Node.js 22.13+ LTS or 24+ and pnpm 11.9.0.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite.

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Structure

- `apps/playground`: React + Vite preview app. Component demos and page layouts live here.
- `packages/ui`: Shared React components, theme tokens, and class utilities. The app consumes its TypeScript source directly, so edits update during development without a separate package build.

Both packages are private. Keep reusable components in `packages/ui/src/components` and export them from `packages/ui/src/index.ts`. Keep preview-specific styling in the app.

## Button

```tsx
import { Button } from "@cortex/ui";
import "@cortex/ui/styles.css";

<Button variant="outline" size="sm">Save changes</Button>
```

The button supports `default`, `secondary`, `outline`, `ghost`, `destructive`, and `link` variants; `default`, `sm`, `lg`, and `icon` sizes; native button props; and `asChild` composition through Radix Slot. Give icon-only buttons an accessible label. Use native buttons for disabled actions, since anchors do not support `disabled`.

Tailwind CSS v4 compiles styles in the playground. Shared theme tokens and explicit UI source scanning live in `packages/ui/src/styles.css`. The initial green and neutral palette is a starting point for design work.
