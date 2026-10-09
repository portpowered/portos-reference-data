# Using the REST API

Discover authorization metadata, then use [OAuth setup](/docs/for-ai/guides/authentication-and-dcr.md). Obtain exact REST paths and schemas from [OpenAPI](/docs/references/openapi.yaml) or [small operation pages](/docs/for-ai/operations/index.md).

Enumerate endpoints with endpoint:read. Follow returned pagination links/tokens exactly and stop only when continuation is absent. Inspect declared capabilities and versions; retrieve one message/attribute schema as needed. Send messages through POST /messages (the existing /messages/send alias also works). Never invent target IDs or message fields.

REST dispatch and subsequent physical observation are separate facts. A 202 describes unfinished work. A timeout can mean the operation already acted; inspect existing results/state before repeating. IR/Bluetooth fire-and-forget and long-delay devices may never provide immediate confirmation. Use bounded polling and report unresolved state. An endpoint edit marked committed with cleanup pending must not be repeated as though it failed.

Use documented idempotency/correlation and version preconditions only where the operation guarantees them. Setting a value and incrementing it have different replay risks. On an ambiguous lost relative-command response, report unknown or read back rather than blindly send again.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md), [lighting](/docs/for-ai/guides/lighting.md) or the relevant task guide.
