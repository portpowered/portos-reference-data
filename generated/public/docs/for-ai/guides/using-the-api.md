# Using the REST API

Discover authorization metadata, then use [OAuth setup](/docs/for-ai/guides/authentication-and-dcr.md).
Start with the [compact API catalog](/docs/for-ai/api-catalog.md). It
contains auth context, public operation links, parameter names and top-level JSON
keys. Obtain exact REST paths from its links or the [small operation index](/docs/for-ai/operations/index.md).
Follow one operation's linked schemas for required/conditional fields and
nested payloads. It does not inline all schemas or examples.

For SDK generation or a comprehensive contract download, request the
[full OpenAPI document](/docs/references/openapi.yaml).

The website's `/api/` route serves this compact Markdown when the request puts
`text/markdown` first in `Accept` (for example,
`text/markdown, text/plain;q=0.9, text/html;q=0.8`). Browser HTML requests keep the
interactive reference. Add `?full=1` to explicitly retrieve the complete HTML
catalog; keep HTML in your accepted formats for that request. Both variants
include `Vary: Accept` for caches. The direct compact Markdown URL works on both
the website and API host and does not depend on negotiation.

Enumerate endpoints with endpoint:read. Follow returned pagination links/tokens exactly and stop only when continuation is absent. Inspect declared capabilities and versions; retrieve one message/attribute schema as needed. Send messages through POST /messages (the existing /messages/send alias also works). Never invent target IDs or message fields.

For filtered inventory including readable shared endpoints, use [POST /endpoint-query](/docs/for-ai/operations/endpointQuery.md). Its query accepts exact match and nested and/or/not predicates; read the request schema's supported fields rather than inventing comparisons or text search. A groupId predicate additionally needs group:read and access to that group. Keep the query, page size, expansions, forceDeviceQuery setting and grant unchanged while following paginationContext.nextToken. Empty pages can have a continuation. Cursors expire after fifteen minutes; restart without nextToken on a 400 cursor error.

REST dispatch and subsequent physical observation are separate facts. A 202 describes unfinished work. A timeout can mean the operation already acted; inspect existing results/state before repeating. IR/Bluetooth fire-and-forget and long-delay devices may never provide immediate confirmation. Use bounded polling and report unresolved state. An endpoint edit marked committed with cleanup pending must not be repeated as though it failed.

Use documented idempotency/correlation and version preconditions only where the operation guarantees them. Setting a value and incrementing it have different replay risks. On an ambiguous lost relative-command response, report unknown or read back rather than blindly send again.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md), [lighting](/docs/for-ai/guides/lighting.md) or the relevant task guide.
