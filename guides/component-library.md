# Component library

All 66 components live in `packages/ui/src/components` and are exported from `@cortex/ui` and individual subpaths. The catalog in `packages/ui/src/catalog.ts` is the coverage checklist.

## Source and scope

Based on the [official shadcn component catalog](https://ui.shadcn.com/docs/components), checked on October 4, 2026. Form and Sonner are included in addition to the current catalog. Component sources were adapted from the official new-york-v4 registry, with Questionnaire from radix-nova. The upstream MIT license is in `packages/ui/LICENSE.shadcn.md`. Data Table, Date Picker, Toast, and Typography are local reusable implementations of the documented patterns.

## Visual direction

The local reference is `references/system-ui-inspiration.png`. It is intentionally ignored by Git. Use near-black surfaces, ice-cyan emphasis, fine teal borders, compact geometric type, monospace labels, corner marks, and restrained glow. All tokens and component treatments belong to the UI package, including portaled overlays.

## Components

### Actions

button, button-group, toggle, toggle-group.

### Forms

calendar, checkbox, combobox, date-picker, field, form, input, input-group, input-otp, label, native-select, radio-group, select, slider, switch, textarea.

### Layout

accordion, aspect-ratio, card, collapsible, direction, resizable, scroll-area, separator, sidebar, tabs.

### Navigation

breadcrumb, command, context-menu, dropdown-menu, menubar, navigation-menu, pagination.

### Overlays

alert-dialog, dialog, drawer, hover-card, popover, sheet, tooltip.

### Data & feedback

alert, avatar, badge, carousel, chart, data-table, empty, item, kbd, marker, progress, skeleton, sonner, spinner, table, toast, typography.

### Conversation

attachment, bubble, message, message-scroller, questionnaire.

