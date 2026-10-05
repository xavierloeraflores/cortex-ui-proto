# Verification

## Catalog coverage

The October 4, 2026 shadcn documentation lists 64 component families. Cortex includes all 64, plus the established Form and Sonner APIs, for 66 modules.

Checked the catalog against the component files, package exports, and overview panel mapping: 66 entries in each, with no missing or extra names. Command is demonstrated by the global search dialog; the other 65 are grouped into 26 live panels. The on-page index lists every component.

## Checks

- `pnpm build`: type checks both packages and builds the production playground.
- `pnpm lint`: passes across the app and library.
- `pnpm peers check`: no peer dependency issues.
- `git diff --check`: no whitespace errors.
- Reference-image checksum matches the supplied attachment. `git check-ignore` confirms it is ignored, and `git ls-files references` is empty.

## Browser verification

Verified the rendered desktop dashboard and a 390-pixel mobile viewport. All 26 panels render, with no horizontal overflow at the page or panel level. Menus and dialogs use the shared theme when rendered in portals.

Exercised button activation; switch, checkbox, and radio changes; slider keyboard input; milestone submission; combobox search and selection; native and custom select controls; calendar date selection; editor toggles; and OTP entry.

Exercised dialog, alert dialog, sheet, drawer, popover, hover card, tooltip, dropdown menu, menubar, context menu, and command palette. Checked Escape dismissal, search filtering, index navigation, and the index's empty result state.

Exercised data-table filtering, its empty state, sorting, and pagination. Checked accordion and collapsible expansion, tab selection, RTL direction, carousel navigation, resizable-panel keyboard input, pagination cards, progress, and empty-state creation.

Checked local chat messages, attachment removal, message-scroller content, questionnaire required-answer validation, multi-choice answers, and submission. Checked form validation and toast feedback. Inspected the production browser console for errors and warnings.

This is component-level verification in the local in-app browser. It is not an exhaustive assistive-technology or cross-browser certification. Example business actions are deliberately local previews.

## Site pages update, October 5, 2026

- `pnpm lint`, `pnpm typecheck`, and the production `pnpm build` pass.
- All 66 guide snippets were compiled against the local UI package in a temporary TSX file; the temporary file was removed afterward.
- All 66 component detail pages rendered in the browser without console errors or warnings.
- Verified component filtering and command search, including navigation to the Date Picker guide.
- Verified project creation, filtering, and moving a task into progress; inbox replies and resolution; profile and notification saves; analytics period changes; and a complete mock booking.
- Inspected desktop and mobile layouts. At a 390px browser viewport, the homepage, component guide, showcase, example gallery, and all five examples had no horizontal document overflow.
- The examples use local state. No external account, message, payment, or booking service is connected.
