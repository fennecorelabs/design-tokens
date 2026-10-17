# Flat-shell mapping correction

## Current delivery status

Version 0.5.1 is published and independently reviewed. See the [0.5.1 release record](releases/2026-10-16-design-tokens-0.5.1.md) for publication source and rollout gates. Consumer staging acceptance remains pending.

## Historical preparation snapshot

The following records the earlier local-only checkpoint. Its publication, review, consumer-install and browser-tab statements describe that checkpoint, not current delivery state. Original browser tabs were subsequently observed unavailable; no authentication state was silently recreated.

The direction 03 palette remains unchanged in `src/lenzaba-palette.json`. This local correction changes semantic mapping only; it has not been published or deployed. Published version 0.5.0 remains immutable.

The LenzABA generator now reads ordinary surface and decorative divider declarations from the existing app-shell contract. Light paper/cloud references resolve against the shell theme before marketing aliases are rebound. Raised, selected, hover, and tinted helpers retain the shell's semantic formulas rather than sharing one palette raised swatch. The product scope and its default marketing subtree both receive these declarations.

Primary actions, secondary actions, amber accents, charts, status colors, control boundaries, and focus retain the selected palette mappings. Sidebar text follows the shell sidebar surface, and category text uses the shell’s established 72% category / 28% foreground mix to preserve contrast on subtle fills. Layout, border widths, radii, and shadows are unchanged. No consumer dependencies or lockfiles are changed by this correction. Browser inspection can preview generated CSS in memory without replacing installed 0.5.0 assets.

Run `npm test`, `npm run typecheck`, and `npm run build` in this package. Browser verification should compare the actual Graphs landing component in an equivalent ready state against live styling, then check light/dark text and control contrast, keyboard focus, and error states. Consumer adoption and independent review remain separate delivery gates before any future publication or deployment.

## Local verification on 2026-10-16

- Generator freshness and seven package tests passed. Package typecheck and build passed; source TypeScript is unchanged by this correction.
- The actual Graphs landing component was rendered with two synthetic ready-state clients, an empty search and recent list, and the same content width as the observed live page. Corrected dark card and border colors match the live CSS measurements. The client card remains 314.5 × 82 pixels, without a gradient or shadow. The saved synthetic dark screenshot was visually inspected.
- WCAG A/AA scans reported zero violations on the landing and target-error previews in both themes. Incomplete checks remain for existing ARIA attributes and axe's inability to parse the near-zero-chroma white Ask AI foreground. These are not clean full-app accessibility certifications. The landing component alone had zero violations and zero incomplete checks in both themes.
- Effective CSS contrast checks across six shell surfaces found minimum text contrast 4.68:1 in light mode and 7.82:1 in dark mode. Control and focus boundaries exceeded 3:1. A light-sidebar foreground mismatch and category-label contrast failures discovered during this validation were corrected in mapping only and the scans rerun. Keyboard navigation retained a visible 2px solid outline.
- Consumer source, dependencies, and locks were not modified. No new servers, workers, commits, pushes, package versions, merges, or deployments were created. Original inspection tabs remain open. The live inspection tab was later observed showing sign-in; no login or navigation was initiated there by this correction.

See [filtered validation evidence](flat-shell-mapping-validation-20261016.json) and [synthetic dark landing preview](flat-shell-landing-dark-20261016.png). Full consumer build/CI acceptance and independent review remain pending before delivery. A second screenshot attempt timed out; the first saved image is the retained visual evidence.
