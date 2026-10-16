# LenzABA direction 03 package release

This release adds the owner-selected Purple, Teal and Amber direction 03 as opt-in CSS exports in `@fennecorelabs/design-tokens@0.5.0`. Existing app-shell defaults and other product palettes are unchanged.

Import `@fennecorelabs/design-tokens/css/lenzaba` after `css/app-shell`, then set `data-product="lenzaba"` on the document root. Existing app theme providers continue to own the `.dark` class. Sessions marketing also imports `css/lenzaba-marketing` after its marketing tokens; its default subtree uses `data-theme="cold-purple"`. Fonts, logos, layouts, persistence and workflows retain their existing owners.

## Source and validation

The package implementation was independently reviewed across Standards and Spec. The subsequent consumer-only delta review closed three P2 findings: Sessions final CTA foreground, Scheduling secondary outline contrast, and preservation of alternative Sessions surfaces. Package executable content is unchanged from that review. Historical checks are in `docs/theme-03-evidence/`; fresh release checks passed: generator freshness, five tests, standalone typecheck, build and pack exports. Reviewed executable content is bound to publication source `cf33b0272d30be73f64082e5233424815d2c380c`.

The existing Publish Package workflow passed clean install, typecheck and build on the exact feature-branch commit, then failed publication because its stored token could not authenticate. The owner authorized locating the dedicated publishing credential in Azure Key Vault. Publication then succeeded using `npm publish --ignore-scripts`, with that credential held only in the process environment. Registry SHA-1 and SHA-512 match the reviewed local package exactly. See `2026-10-16-design-tokens-0.5.0.json` for authoritative metadata. The failed workflow secret was not modified.

## Consumer adoption and rollback

Sessions uses npm; Docs and Scheduling use Bun. Require `^0.5.0` and regenerate authoritative locks against the published registry artifact. Validate clean installs and production builds; do not commit local package paths or invent integrity metadata. Application deployment is separate from package publication.

Rollback an affected application by reverting its palette imports, product opt-in and token-related component changes together, restoring its earlier dependency requirement/lock. Existing consumers remain on their locked versions until explicitly updated. Do not overwrite or delete a published version.

## Documentation coverage

| Area | Evidence | Status |
| --- | --- | --- |
| PR | https://github.com/fennecorelabs/design-tokens/pull/2 | Open |
| Changelog | `CHANGELOG.md`, 0.5.0 | Prepared |
| Usage/runbook | Import, scope and rollback instructions above | Prepared |
| Release record | This record and registry metadata JSON | Published and verified |

No application deployment is included in this package release.
