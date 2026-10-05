# Cortex UI

A React playground and shared library of 66 components, styled with dark surfaces, cyan accents, fine borders, and technical typography. The site includes a focused homepage, a searchable component guide with usage snippets and variations, the original 26-panel showcase wall, and five interactive product examples.

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

## Build for GitHub Pages

The playground uses Vite and runs entirely in the browser. Build it locally and commit the generated HTML, JavaScript, CSS, and fonts to `docs/`. GitHub Pages can serve those files without a Node.js server or a Vercel deployment.

The Pages setup includes commands and an empty `docs/.nojekyll` marker. It does not include a generated website. Run the following steps when you are ready to publish.

### Generate and preview

From the repository root, using the Node.js and pnpm versions listed above:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm build:pages
pnpm preview:pages
```

`build:pages` type-checks the workspace, sets `NODE_ENV=production`, and builds into the repository's `docs/` directory. The build empties that directory before writing its output, removing stale assets. Keep handwritten documentation in `guides/`. Put files that must survive regeneration in `apps/playground/public/`; Vite copies them into the output, including `.nojekyll` to disable Jekyll processing.

Open the preview URL Vite prints, normally `http://127.0.0.1:4173/cortex-ui-proto/`. Check fonts, styling, demo navigation, and interactive controls. Reload the page and check the browser console and network panel for errors or missing assets. Stop the preview with `Ctrl+C`.

The dedicated configuration in `apps/playground/vite.pages.config.ts` sets `base` to `/cortex-ui-proto/` for this repository's project URL. If the repository name changes, update it to `/<new-repository-name>/` before rebuilding. A user site or custom domain served at its root needs `base: "/"`. The regular `pnpm build` and `pnpm preview` commands continue to use `apps/playground/dist/` and the root URL.

### Commit the generated site

After reviewing and committing any source changes, review the generated output on your working branch:

```sh
git status --short
git add -A -- docs
git diff --cached --stat
git diff --cached -- docs/index.html
git commit -m "Build static site for GitHub Pages"
git push -u origin HEAD
```

Commit all of `docs/`, including `index.html`, `assets/`, `.nojekyll`, and deleted assets from the previous build. This directory is intentionally not ignored by Git. Merge the branch into `main` before publishing from `main`. Repeat the build, preview, and output commit whenever source changes should reach the hosted site.

### Enable publishing on GitHub

Once the generated files are on `main`:

1. Open the repository's **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select **main** and **/docs**, then save.
4. Wait for GitHub's Pages deployment to finish. Visit [the site's expected address](https://xavierloeraflores.github.io/cortex-ui-proto/) and repeat the preview checks.

GitHub deploys the committed files. No custom workflow needs to install dependencies or run Vite. Source-only commits do not regenerate the hosted website. Publishing requires `docs/index.html`; the initial `.nojekyll` marker alone is not a website.

See GitHub's [publishing source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and Vite's [GitHub Pages base-path guidance](https://vite.dev/guide/static-deploy.html#github-pages).

## Explore the site

- `#/`: library overview and starting points.
- `#/components`: searchable catalog of all 66 components. Each detail page includes a description, usage, variations, source link, and a live example.
- `#/showcase`: the original interactive component wall.
- `#/examples`: five product previews: analytics, project board, customer inbox, account settings, and session booking.

The examples use local state and sample data. You can change reporting periods and export a CSV, create and move tasks, reply to conversations, save preferences, and complete a mock booking. They reset when you leave the example or reload. They do not send messages, charge payments, or create real appointments.

Routes use URL hashes so direct links, reloads, and browser history work on GitHub Pages without a server fallback. The floating theme preview applies across every page.

## Workspace

- `packages/ui/src/components`: all 66 component modules, exported from `@cortex/ui` and individual subpaths.
- `packages/ui/src/styles.css`: shared theme tokens and component styling, including portaled menus and dialogs.
- `packages/ui/src/catalog.ts`: the complete component inventory.
- `apps/playground/src/pages`: homepage, component guide, showcase, and product examples.
- `apps/playground/src/component-docs.ts`: typed usage notes, variations, and snippets for the complete catalog.
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

<Button variant="outline">Create project</Button>;
```

Import styles once in the consuming app. Tailwind v4 scans the UI package explicitly. The playground bundles Space Grotesk and IBM Plex Mono locally; other consumers can load those fonts or override the font tokens. Use `.dark` on the document root for the dark variants.

The component guide and `⌘K` / `Ctrl+K` search open a component detail page with usage notes, variations, and a live demo. Example actions run locally; the gallery has no AI service, account system, or persistence.

## Reference and attribution

The supplied design reference is saved at `references/system-ui-inspiration.png` and excluded from Git. It is not required to build or run the app. The artwork in the playground is an original SVG study.

Components adapt the official shadcn/ui sources. The upstream MIT license is preserved in `packages/ui/LICENSE.shadcn.md`.
