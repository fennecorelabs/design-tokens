# Design tokens 0.5.1 flat-shell mapping correction

## Prepared source and scope

The patch keeps the owner-selected direction 03 palette unchanged and corrects the LenzABA semantic mappings to preserve the existing flat app-shell design. Ordinary surfaces and dividers reuse the app-shell declarations. Matching sidebar text and category text mixing preserve readability. Control borders and focus remain separate from decorative dividers. No application layout or workflow is changed.

Version 0.5.0 remains immutable. Version 0.5.1 was confirmed absent from the registry before preparation. The repository publishes on version tags or manual workflow dispatch; its existing publish credential previously failed, so an authorized local publication may use the known dedicated Azure Key Vault publishing credential in memory. Never persist that credential.

## Validation and review

Package generator freshness, seven package tests, typecheck, build, and local synthetic landing/error browser previews passed. See [mapping verification](../flat-shell-mapping.md). Independent review and final committed source binding are pending. This record describes preparation, not publication or deployment.

## Rollout and rollback

Verify the registry artifact version, tarball, integrity, and shasum before changing consumer dependencies. Update Sessions, Docs, and Scheduling with their actual package managers, then validate installed artifacts, focused checks, builds, browser acceptance, and PR CI. The owner authorized reviewed pushes, publication, merges, and staging deployment on 2026-10-16; production is outside scope.

Rollback staging by restoring each app's previous verified image/source and its matching package lock. Do not overwrite a published package version. Exact staging sources, workflow runs, deployed image identities, and smoke results remain pending.

## Documentation coverage

| Area | Evidence | Status |
| --- | --- | --- |
| PR | design-tokens #2 | Existing PR; reconcile final description after review |
| Changelog | CHANGELOG.md unreleased entry | Prepared |
| Docs/runbook | docs/flat-shell-mapping.md | Prepared |
| Release record | This record | Prepared; publication and staging pending |
