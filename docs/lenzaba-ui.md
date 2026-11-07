# Opt-in LenzABA application tokens

The `@fennecorelabs/design-tokens/css/lenzaba-ui` export adapts the accepted
reference-v1 application design. Import it after the application's existing theme
CSS, then add both attributes to the LenzABA application root:

```tsx
import '@fennecorelabs/design-tokens/css/lenzaba-ui';

<div data-product="lenzaba" data-ui="reference-v1">
  {children}
</div>
```

The application continues to own theme selection and persistence. `.dark` may be
on the opt-in root or an ancestor. Nested `[data-theme="cold-purple"]` shell
wrappers receive the same color and font aliases. This adapter changes no legacy
stylesheet and introduces no global theme or element sizing rules. Its local font
import registers the existing font faces and LenzABA font roles; application
color and metric overrides require both opt-in attributes.

## Color and typography roles

The generator reuses `src/lenzaba-palette.json`; it does not maintain a second
palette. `src/lenzaba-ui.json` supplies the additional control boundary,
destructive foreground, and accepted sizing values.

| Role | Variables |
| --- | --- |
| Page, card, nested detail | `--background`, `--card` / `--surface`, `--surface-raised` |
| Body and secondary text | `--foreground`, `--muted-foreground` |
| Actions | `--primary` / `--primary-foreground`, `--secondary` / `--secondary-foreground` |
| Essential control boundary | `--control-border`, `--input`, `--border-strong` |
| Keyboard focus | `--ring` |
| Destructive action | `--destructive` / `--destructive-foreground` |
| Body and display fonts | `--font-body` / `--font-sans`, `--font-display` |

Decorative dividers retain `--border`. Essential controls use `--control-border`
(light `#85718F`, dark `#A48BB8`). Status families `success`, `warning`, `error`,
`danger`, `info`, and `attention` expose `--status-<family>-foreground` text on
`--status-<family>-surface`; `-subtle` and `-muted` alias that surface. Bare status
and `-border` roles use the foreground. Keep visible status labels and existing
application meanings. Destructive actions use their own paired foreground,
including dark mode; do not force white text on a status surface.

## Metrics consumed by presentation primitives

| Variable | Default |
| --- | --- |
| `--ui-control-height` | `44px` |
| `--ui-control-font-size` | `14px` (`16px` in readable mode) |
| `--ui-radius-control` | `8px` |
| `--ui-radius-card` | `12px` |
| `--ui-radius-dialog` | `16px` |
| `--ui-feedback-duration` | `120ms` (`0ms` for reduced motion) |

The adapter also exposes `--ui-type-*`, `--ui-icons-*`, and `--ui-space-*`
metrics from the accepted source. Primitives consume these variables with their
existing size fallbacks. The adapter does not resize switches, radios, or
checkboxes. Components retain responsibility for font application, heading sizes,
focus styling, layout, and accessible interaction.

Set `data-density="compact"` on the opt-in root or a nested view for `32px`
controls on desktop; `data-density="comfortable"` restores `44px`. Nested views
inherit their nearest density setting. `data-readable="true"` on the root or a
nested view keeps controls at `44px`, including compact descendants. Devices
reporting any coarse pointer also retain `44px` controls. Theme wrappers do not
reset inherited density or readable settings.

## Validation and delivery

Run `npm run generate:lenzaba` after source changes and `npm test` to check generated
output and the focused source contracts. Tests check emitted colors, contrast,
selector boundaries, metrics, and package resolution. They do not prove browser
cascade behavior or real application layout. Coordinator-owned application QA
must verify light/dark, root/nested compact/readable settings, coarse-pointer
controls, focus, and existing workflows against the candidate packages.

This change does not bump or publish a package version. Until publication is
separately authorized, application reproduction requires the coordinator's exact
locally packed candidate packages rather than a remote release.
