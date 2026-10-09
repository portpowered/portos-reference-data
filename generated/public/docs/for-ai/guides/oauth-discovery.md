# Discover the OAuth server and choose REST or MCP

This discovery step is shared by every client. The deployed pilot API is https://api.portoperatingsystem.lol. Fetch its /.well-known/oauth-authorization-server document anonymously. Read issuer, authorization_endpoint, token_endpoint, registration_endpoint, revocation_endpoint and scopes_supported. Use the returned endpoints exactly. An alias can advertise a different canonical Cloud Run issuer; do not substitute the alias into token audiences.

| Interface | API destination | OAuth resource |
| --- | --- | --- |
| REST | The returned issuer, plus the documented operation path | The exact returned issuer |
| MCP | The returned issuer plus /mcp, Streamable HTTP | The resource returned by /.well-known/oauth-protected-resource/mcp, normally issuer plus /mcp |

An MCP connector can start at https://api.portoperatingsystem.lol/mcp and follow its WWW-Authenticate resource_metadata URL. Fetch that public metadata and the authorization server it names. MCP initialization alone does not prove that the account's devices are accessible. Never use a REST token on MCP or an MCP token on REST.

Choose one supported [client registration method](/docs/for-ai/guides/oauth-client-registration.md), then follow the same [consent and callback steps](/docs/for-ai/guides/oauth-consent-and-callback.md). If metadata omits registration_endpoint, new DCR registration is unavailable; do not guess a replacement endpoint or silently switch to another client's credentials.

See [scopes and resource rules](/docs/for-ai/guides/authorization-rules.md). Authorization-server scopes_supported describes server vocabulary; a particular client's accepted scopes can be narrower.
