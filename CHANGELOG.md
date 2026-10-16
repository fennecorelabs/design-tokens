# Changelog

## [Unreleased]

## [0.5.1] - 2026-10-16

- Preserve the existing flat app-shell surfaces and decorative dividers in the LenzABA opt-in mapping; retain direction 03 swatches, purposeful accents, readable category text, and separate control/focus boundaries.

## [0.5.0] - 2026-10-16

- Add opt-in `css/lenzaba` and `css/lenzaba-marketing` exports for owner-selected direction 03. Existing app-shell and palette defaults remain unchanged.
- Preserve complete OKLCH color values, paired action/status foregrounds, six chart roles, and a separate visible control boundary.

## [0.4.0] - 2026-06-04
### Added
- Cold-purple app-shell status tokens for info, success, warning, attention, and danger states, with subtle, muted, border, and foreground variants exposed through `css/app-shell.css` and the Tailwind preset.
- Lifecycle status aliases for draft, pending, active, open, claimed, confirmed, completed, cancelled, and expired states, mapped to the generic status families for migration-safe app updates.
- App-shell category color tokens for aqua, mint, amber, coral, berry, and indigo labels, with subtle, muted, border, and foreground variants for non-status operational UI.
- Expanded surface/depth tokens for elevated, surface-2, surface-3, hover, active, selected, floating, tinted-border, strong border, and tertiary text patterns.
- Semantic status badge, surface, text, and meter recipes with guidance for category roles, action/readiness mappings, chart separation, and no-gradient operational dashboards.

## [0.3.0] - 2026-04-19
### Added
- Neutral app-shell helper tokens in `css/app-shell.css` for elevated surfaces, overlay scrims, contrast foreground, sidebar helper aliases, and shared shadow presets for card, soft, popover, dialog, and focus states

## [0.2.0] - 2026-03-24
### Added
- Shared app-shell CSS entrypoint (`css/app-shell.css`) with the cold-purple shadcn/sidebar semantic bridge and chart tokens
- Cold-purple `--border` baseline on `themes.css` root for shared shell consumers

## [0.1.1] - 2026-03-17
### Added
- Organic curved section divider utility classes (`.curve-top`, `.curve-bottom`) in tokens.css

## [0.1.0] - 2026-03-17
### Added
- Initial release
- 4 OKLCH theme scales (Cold Purple, Half Baked, Apricot Peach, Evergreen) with tinted neutrals
- Design D (Organic Warm) semantic tokens: radius, shadows, spacing, transitions, z-index
- Typography system: Bricolage Grotesque + Plus Jakarta Sans with type scale
- Tailwind 4 preset mapping CSS custom properties to utility classes
- ThemePicker React component with localStorage persistence
