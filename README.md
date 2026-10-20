---
author: Port OS Team
last modified: 2026, october, 9
---

# Port OS reference data

`@portpowered/reference-data` bundles the capability catalog and OpenAPI specification as reusable JSON exports. Website field tables, capability navigation, and native Fumadocs HTTP documentation render automatically from these exports; no per-capability page authoring is required.

## Updating resources

Canonical inputs in the application repository are `docs/user-guides/` (guides in `skills/general`, `skills/devices`, `oauth`, `connect-ai` and `api` subdirectories; the reader walks them recursively and rejects a duplicate `guide-id` or `skill-id`), `api/ci/`, `api/openapi-main.yaml` and its modular references. `api/cif/` and `api/openapi.yaml` are bundled projections. Generation reuses the existing capability normalizer, preserving the application's generated catalog contract. Install the website dependencies before generating this package.

Agent skills are authored in `docs/agent-skills/*/SKILL.md`. The existing task
guides are authored in `backend/internal/services/documentation/guides/internal/core/content/`;
the `setup.md` and `connected-home.md` files there are generated skill copies.
`reference:generate` synchronizes the skills into both plugin packages and the
MCP embed before publishing the original Markdown as `skill-*` and `task-*`
public guides. All of these inputs participate in source provenance. Backend
embedding, pre-review and plugin packaging reject independently edited skill
copies. See the [publishing worksheet](../../docs/design/cloud-plugin-publishing-worksheet.md)
for the ownership map and publisher decisions.

1. Change the canonical reference resources.
2. Record the source commit with `bun packages/reference-data/scripts/source-provenance.mjs --record <full-commit>` from the repository root, then run `bun run reference:generate` from `website/`.
3. Run `bun run reference:check` to verify generated data. The website production build also runs this check.

The documentation package omits generated descriptions beginning with `Schema for`, while preserving useful field descriptions and all validation properties. `descriptions.json` supplies capability introductions independently of validation rules. Edit it for concise customer-facing copy, then regenerate.

Never edit generated JSON manually. Regeneration removes obsolete resources when capabilities or members are removed or renamed.

The manifest records the canonical input snapshot's `sourceCommit` and `sourceInputState`; inputs are identified by that revision, never by a content hash, and drift is found by regenerating and diffing. Local development can record inputs modified from the base commit; publication requires `sourceInputState: committed`. After committing canonical changes, record that commit and regenerate before preparing the public tag. This keeps ordinary builds possible before publication and avoids embedding a self-referential release commit. Default-version aliases explicitly record `aliasOf` and have exactly the canonical file's bytes; Markdown `links` describe navigation relationships.

## Guide frontmatter and the docs export

Every guide needs `title`, `guide-id` (equal to the file name), `description` (when to use it) and `content-authorship`. Guides under `skills/` also need a `skill-id`; device guides list the `capabilities` they cover, and each name must be a capability in `api/ci`. `guides.json` publishes `description`, `group`, `skillId` and `capabilities` next to the existing fields. Public guide URLs come from `slug` or `title`, never from the directory.

`bun scripts/exportPublicDocs.mjs <directory>` writes a self-contained copy of the guides and agent skills for the public `portpowered/portos-docs` repository, as this package is copied to `portpowered/portos-reference-data`. See [Guides as skills](../../docs/design/guides-as-skills.md).

## Private REST contracts

For future internal REST endpoints, put the boolean extension `x-internal: true` on the canonical OpenAPI path item or individual operation. Annotate internal component schemas (or individual properties) the same way. An omitted annotation or `x-internal: false` retains the current public behavior. A private path hides all its operations; a private operation leaves its public siblings available.

Generation parses the bundled YAML with `js-yaml` and applies one structured public projection before producing the JSON export, raw OpenAPI YAML, operation guides and authorization inventories. The static website assets and backend runtime schema consumers use this projection, and the legacy website `/docs/agents/api.md` overview uses the same filter. Canonical contracts remain available to internal code generation. This annotation controls documentation publication; runtime authentication and authorization still apply independently.

Public output may name only `*.portoperatingsystem.com` hosts, example hosts (`example.com`, `*.example`, localhost and loopback), standards and the listed third-party provider hosts; `scripts/public-hosts.mjs` holds the allowlist and `bun run reference:check` fails generation on any other host (an internal Cloud Run host, a retired domain). An operation tagged `Internal` must also carry `x-internal: true`; `bun run lint:spec` in `api/` enforces it.

Public references to removed components, including discriminator mappings and security requirements, fail generation. Move the reference behind an internal operation or provide a separate public schema; do not publish a dangling reference. Literal examples are customer data, not annotation containers. `bun run reference:check` runs exclusion and reference-integrity tests and checks generated bytes before a website release. The raw YAML is serialized from the same filtered document, with a regression checking the parsed exported bytes directly.

## Consuming the package

Internal website builds (`bun run build`) resolve the checked-in generated exports through the source build entry point. They validate generation without requiring an npm publication or publishing credentials. Backend development uses the local Go workspace module. Public dependencies can be downloaded anonymously.

Website release builds (`bun run build:release`, including the pilot Docker image) resolve the exact registry pin and require its manifest to equal the checked-in projection. Backend release images download the pinned public Go tag and check the same manifest. Neither consumer build publishes packages.

## Automated publication

The public data repository owns `.github/workflows/npm-publish.yml`; its source template lives in `release/npm-publish.yml` here. It validates immutable `vX.Y.Z` tags, public asset hashes and Go embeds before publishing under the `next` npm tag. Ordinary application CI has no publishing permission.

Configure a trusted publisher once in [npm package settings](https://www.npmjs.com/package/@portpowered/reference-data/access): provider **GitHub Actions**, organization **portpowered**, repository **portos-reference-data**, workflow filename **npm-publish.yml**, no environment name, and allow direct publishing. The workflow requests `id-token: write`; npm exchanges that short-lived GitHub OIDC identity for publication authority. No user OAuth refresh grant, stored npm token or per-release security-key approval is required. Setup itself may require the package owner's security-key verification. See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

Commit the public data projection and push its immutable Go tag to release. Manual dispatch accepts an existing tag for retrying a failed publication; published versions cannot be replaced. Confirm both registry availability and Go module retrieval before updating consumer pins.

Import `@portpowered/reference-data/capabilities`, `@portpowered/reference-data/openapi` or `@portpowered/reference-data/guides` with your runtime's JSON import mechanism. The release repository contains public projections only. Authored application sources stay in the private application repository. Release the same version to npm and the public Go module `github.com/portpowered/portos-reference-data`; the manifest lists identical file hashes for both distributions.

Individual schemas are exported as `@portpowered/reference-data/resources/<capability>/configuration.json`, `state-<attribute>.json`, and `message-<name>.json`. Consumers can render field tables directly from these resources. Keep the package imports on the server or at build time to avoid shipping the complete catalog in browser JavaScript.

REST operation guides link directly to `/docs/references/schemas/<name>.json`, `/docs/references/parameters/<name>.json` and `/docs/references/headers/<name>.json`. Schema files use JSON Schema draft-07 with OpenAPI nullability and exclusive bounds converted; parameter/header files retain their OpenAPI definitions. References and discriminator mappings point to the same public host. `/docs/for-ai/schemas.md` is a small hub linking alphabetical `/docs/for-ai/schemas/<letter>-<page>.md` shards of at most 40 components. `/docs/references/schemas/index.json` retains the complete machine index. Agents can retrieve the components needed for one operation without reading the full OpenAPI bundle. Generation checks compile the complete linked schema graph and validate the API's complete request/response examples through it.

Run `npm pack` in this directory to produce a portable bundle. The bundle contains generated JSON, the raw public tree and this README; regeneration belongs to the source repository. The Go module embeds that public tree and exposes it through `Files() fs.FS`. Public URLs are rooted at `/llms.txt`, `/docs/for-ai/` and `/docs/references/`; missing files are absent rather than an app-shell fallback. Run `node scripts/validate-public-assets.mjs` and `go test ./...` before release.
