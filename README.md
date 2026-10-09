---
author: Port OS Team
last modified: 2026, october, 7
---

# Port OS reference data

`@portos/reference-data` bundles the capability catalog and OpenAPI specification as reusable JSON exports. Website field tables, capability navigation, and native Fumadocs HTTP documentation render automatically from these exports; no per-capability page authoring is required.

## Updating resources

Canonical inputs in the application repository are `docs/user-guides/`, `api/ci/`, `api/openapi-main.yaml` and its modular references. `api/cif/` and `api/openapi.yaml` are bundled projections. Generation reuses the existing capability normalizer, preserving the application's generated catalog contract. Install the website dependencies before generating this package.

1. Change the canonical reference resources.
2. Run `npm run reference:generate` from `website/`.
3. Run `npm run reference:check` to verify generated data. The website production build also runs this check.

The documentation package omits generated descriptions beginning with `Schema for`, while preserving useful field descriptions and all validation properties. `descriptions.json` supplies capability introductions independently of validation rules. Edit it for concise customer-facing copy, then regenerate.

Never edit generated JSON manually. Regeneration removes obsolete resources when capabilities or members are removed or renamed.

## Consuming the package

Import `@portos/reference-data/capabilities`, `@portos/reference-data/openapi` or `@portos/reference-data/guides` with your runtime's JSON import mechanism. The release repository contains public projections only. Authored application sources stay in the private application repository. Release the same version to npm and the public Go module `github.com/portpowered/portos-reference-data`; the manifest lists identical file hashes for both distributions.

Individual schemas are exported as `@portos/reference-data/resources/<capability>/configuration.json`, `state-<attribute>.json`, and `message-<name>.json`. Consumers can render field tables directly from these resources. Keep the package imports on the server or at build time to avoid shipping the complete catalog in browser JavaScript.

Run `npm pack` in this directory to produce a portable bundle. The bundle contains generated JSON, the raw public tree and this README; regeneration belongs to the source repository. The Go module embeds that public tree and exposes it through `Files() fs.FS`. Public URLs are rooted at `/llms.txt`, `/docs/for-ai/` and `/docs/references/`; missing files are absent rather than an app-shell fallback. Run `node scripts/validate-public-assets.mjs` and `go test ./...` before release.
