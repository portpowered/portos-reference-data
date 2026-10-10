# Port OS: start here for agents

## New REST connection

Read [the complete authentication walkthrough](/docs/for-ai/guides/authentication-and-dcr.md), then [the REST quickstart](/docs/for-ai/guides/quickstart.md). The walkthrough includes discovery, DCR/CIMD, consent, callback, token lifecycle and permission rules. You do not need to read their separate component files again. Follow an operation or capability link from the quickstart only when you need its exact contract.

Registration alone gives no device access. Wait for user consent and validate the callback before exchanging its code with PKCE. Never request the user’s Google password or reuse another client’s tokens.

## Existing connector or MCP

Use [the shared connection guide](/docs/for-ai/guides/connect-agent.md) to select the transport and only the components your client needs. REST and MCP use different OAuth resources; choose before authorization and retain the resource through exchange and refresh.

## Documentation tree: look up what you need

- [Task/component guide directory](/docs/for-ai/guides/index.md): alternatives, not a required reading checklist
- [Compact API catalog](/docs/for-ai/api-catalog.md): auth context and parameter/key index
- [REST operation directory](/docs/for-ai/operations/index.md): individual operations and their scopes
- [Small REST schema files](/docs/for-ai/schemas.md): linked request/response components
- [Capability directory](/docs/for-ai/capability-interfaces.md): match the discovered namespace and version
- [Authorization inventory](/docs/references/authorization.yaml): machine-readable scope/policy rules
- [Full OpenAPI YAML](/docs/references/openapi.yaml): comprehensive lookup and SDK generation; unnecessary for the quickstart
- [Capability YAML index](/docs/references/capability-interfaces.yaml)
- [Release manifest](/docs/references/manifest.json)

These links are public UTF-8 documents. You do not need JavaScript, sign-in, or a repository checkout to read them. Device data still requires consent and resource permission.
