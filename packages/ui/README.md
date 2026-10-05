# Theming Cortex UI

Import `@cortex/ui/styles.css` once, then override CSS variables after that import.
Colors accept any CSS color value, including hex, `oklch()`, and `color-mix()`.

```css
:root {
  --primary: #ffa1a8;
  --primary-foreground: #26080d;
  --radius: 8px;
}
```

Changing `--primary` also updates the default surfaces, borders, focus rings,
chart palette, gradients, and glows. Override individual semantic tokens when
you want more control. Choose a readable `--primary-foreground` when using a
custom primary color. The included presets use pale accents on dark surfaces.

| Purpose | Variables |
| --- | --- |
| Page and surfaces | `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground` |
| Actions and states | `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground` |
| Controls | `--border`, `--input`, `--ring`, `--overlay`, `--radius` |
| Charts | `--chart-1` through `--chart-5` |
| Sidebar | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` |
| Materials | `--primary-gradient-start`, `--primary-gradient-end`, `--card-gradient-start`, `--card-gradient-end`, `--card-border`, `--field-background`, `--popover-border`, `--skeleton-start`, `--skeleton-end`, `--shadow-color` |
| Fonts | `--font-family-sans`, `--font-family-mono` |

For a preset, set `data-cortex-theme` to `cyan`, `red`, `amber`, `green`, or
`violet` on `<html>`. Menus, dialogs, and toasts inherit the same variables even
when rendered in portals. The existing `.dark` class enables dark Tailwind variants.

For an inline component preview, put `.cortex-theme` on a container and override
variables there, or give it `data-cortex-theme`. That redeclares the derived tokens
at the container so they use its primary color. Portals render outside that
container and use the document theme. Use document-level theming for the full app.
