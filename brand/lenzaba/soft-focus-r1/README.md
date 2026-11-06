# LenzABA H1 + Soft focus R1

This directory contains the accepted H1 owl and Soft focus R1 lettering from the FenneCore Media Workspace. `manifest.json` records the source paths, selection IDs, acceptance date, dimensions and SHA-256 hashes. All 15 artwork files preserve their accepted bytes. The media workspace remains the artwork master; this package provides versioned distribution to applications.

## Choose an asset

- `R1-compact-light.svg` and `.png`: horizontal owl/lettering pairing for light backgrounds, including marketing headers. Intrinsic size: 900 × 220.
- `R1-compact-dark.svg` and `.png`: the same pairing with light lettering for dark backgrounds and footers.
- `R1-primary-light.*` and `R1-primary-dark.*`: wider-margin primary pairings, 1600 × 500.
- `R1-wordmark-light.*`, `R1-wordmark-dark.*` and `R1-wordmark-mono.*`: lettering only, 1200 × 250. The monochrome version uses dark ink and needs a light background.
- `H1-refined.png`: the accepted standalone raster owl. Check its contrast and legibility in the intended placement.

The `light` and `dark` suffixes name the intended background, not the artwork color. Preserve aspect ratio and transparent margins. The accepted marketing sizing is 240 CSS pixels on desktop/tablet and 210 on mobile, constrained to the available width. Other applications should validate sizing in their own layouts.

## Use in an application

The package export is a file path, not a browser URL. After a release containing these assets is published and deliberately adopted, copy the selected files into the application's versioned public assets during its existing build or asset preparation step. For example, Node can resolve a source file with:

```js
import { createRequire } from 'node:module';
import { copyFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const source = require.resolve('@fennecorelabs/design-tokens/brand/lenzaba/soft-focus-r1/R1-compact-light.svg');
// Create the destination directory through the application's existing asset step.
await copyFile(source, 'public/brand/soft-focus-r1/R1-compact-light.svg');
```

Render the resulting public URL with meaningful alternative text such as `LenzABA`, or an empty alt when adjacent text already names the brand. Explicitly select the appropriate background variant. Do not inline the SVG unchanged: its historical internal descriptions still include draft wording. Review accessible labeling separately if inline SVG becomes necessary.

The paired SVGs embed the original raster owl; they are not fully vector artwork and are approximately 1.27 MB each. Use normal static asset caching and avoid embedding their bytes repeatedly in page markup. No owl cleanup, expanded-outline master, animation, React wrapper, or token-generation change is included.

## Release and typography

Version 0.6.0 distributes these accepted assets alongside the existing light/dark palette. The registry artifact must be verified before application adoption.

Import `@fennecorelabs/design-tokens/css/lenzaba-brand` after `css/app-shell` and `css/lenzaba` to load the licensed, self-hosted Bricolage Grotesque and Plus Jakarta Sans variable fonts. Bundlers resolve the CSS-relative font URLs. The entrypoint only defines font faces and `--font-lenzaba-display` / `--font-lenzaba-body` under `[data-product="lenzaba"]`; it sets no element styles, colors, sizes, spacing, animations or theme preference.

Bind the application's existing body and display variables to these families. For the shared app-shell's `font-sans`, bind `--font-geist-sans: var(--font-lenzaba-body)` on the product root. Preserve mono fonts and existing heading sizes. Remove duplicate remote font loaders only where this entrypoint replaces them. Font files, OFL licenses and source hashes are exported under `brand/lenzaba/fonts/room-to-grow-v1/*`.

Use the published artifact and each application's real package manager for dependency updates. Copy selected artwork into versioned public assets; check light/dark contrast, mobile sizing, navigation and accessibility through the app's existing QA and release workflow.
