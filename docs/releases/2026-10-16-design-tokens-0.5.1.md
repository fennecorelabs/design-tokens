# Design tokens 0.5.1 flat-shell mapping correction

## Published source and scope

The patch keeps the owner-selected direction 03 palette unchanged and corrects the LenzABA semantic mappings to preserve the existing flat app-shell design. Ordinary surfaces and dividers reuse the app-shell declarations. Matching sidebar text and category text mixing preserve readability. Control borders and focus remain separate from decorative dividers. No application layout or workflow is changed.

Versions 0.5.0 and 0.5.1 are published and immutable. Owner-authorized local publication of 0.5.1 succeeded from independently approved source `d736043e95de9c5bce8b4d849ff2660078ae058d`, using the dedicated Azure Key Vault credential only in memory. No workflow secret was changed. Registry SHA-1 `ce2b88d4bbfae26d61fec57c3295c5ba5c7e9bed` and SHA-512 integrity match the reviewed local artifact. Authoritative publication metadata is recorded in the Scheduling rollout checkpoint at `rollout-validation/published-package-0.5.1.json`.

## Validation and review

Package generator freshness, seven package tests, typecheck, build, and local synthetic landing/error browser previews passed. See [mapping verification](../flat-shell-mapping.md). Independent Standards and Spec review passed with no blockers and was bound to publication source `d736043e95de9c5bce8b4d849ff2660078ae058d`. The palette source SHA-256 remains `c78da3e7d1eefe3226b51690af8eb45e91c9cad16f333da40707ee883d92fa2d`. Package publication is complete; application staging acceptance remains pending.

## Rollout and rollback

Registry metadata and artifact hashes were verified before consumer adoption. Sessions uses npm; Docs and Scheduling use Bun 1.3.9. All three now require `^0.5.1` with installer-generated locks and installed CSS matching reviewed source. Consumer validation, browser acceptance, final review and PR CI remain separate delivery gates. The owner authorized reviewed pushes, publication, merges, and staging deployment on 2026-10-16; production is outside scope.

Rollback staging by restoring each app's previous verified image/source and its matching package lock. Do not overwrite a published package version. Exact staging sources, workflow runs, deployed image identities, and smoke results remain pending.

## Documentation coverage

| Area | Evidence | Status |
| --- | --- | --- |
| PR | design-tokens #2 | Existing PR; reconcile final description after review |
| Changelog | CHANGELOG.md, 0.5.1 | Published artifact scope recorded |
| Docs/runbook | docs/flat-shell-mapping.md | Prepared |
| Release record | This record | Publication verified; staging pending |
