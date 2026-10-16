# LenzABA direction 03 package release

This release adds the owner-selected Purple, Teal and Amber direction 03 as opt-in CSS exports in `@fennecorelabs/design-tokens@0.5.0`. Existing app-shell defaults and other product palettes are unchanged.

Import `@fennecorelabs/design-tokens/css/lenzaba` after `css/app-shell`, then set `data-product="lenzaba"` on the document root. Existing app theme providers continue to own the `.dark` class. Sessions marketing also imports `css/lenzaba-marketing` after its marketing tokens; its default subtree uses `data-theme="cold-purple"`. Fonts, logos, layouts, persistence and workflows retain their existing owners.

## Source and validation

The package implementation was independently reviewed across Standards and Spec. The subsequent consumer-only delta review closed three P2 findings: Sessions final CTA foreground, Scheduling secondary outline contrast, and preservation of alternative Sessions surfaces. Package executable content is unchanged from that review. Historical checks are in `docs/theme-03-evidence/`; fresh release checks and the committed source will be recorded during publication.

Publication uses the repository's existing Publish Package workflow on the exact feature-branch commit. Registry metadata and packed artifact identity must be verified before consumers regenerate lockfiles. A git merge does not establish package availability.

## Consumer adoption and rollback

Sessions uses npm; Docs and Scheduling use Bun. Require `^0.5.0` and regenerate authoritative locks against the published registry artifact. Validate clean installs and production builds; do not commit local package paths or invent integrity metadata. Application deployment is separate from package publication.

Rollback an affected application by reverting its palette imports, product opt-in and token-related component changes together, restoring its earlier dependency requirement/lock. Existing consumers remain on their locked versions until explicitly updated. Do not overwrite or delete a published version.

## Documentation coverage

| Area | Evidence | Status |
| --- | --- | --- |
| PR | Package release PR will contain source and validation evidence | Pending creation |
| Changelog | `CHANGELOG.md`, 0.5.0 | Prepared |
| Usage/runbook | Import, scope and rollback instructions above | Prepared |
| Release record | This record; registry metadata will follow publication | Publication pending |

No application deployment is included in this package release.
