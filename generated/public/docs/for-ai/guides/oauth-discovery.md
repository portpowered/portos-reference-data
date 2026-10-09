# Discover the OAuth server and choose REST or MCP

This discovery step is shared by every client. The deployed pilot API is https://api.portoperatingsystem.lol. Fetch its /.well-known/oauth-authorization-server document anonymously. Read issuer, authorization_endpoint, token_endpoint, registration_endpoint, revocation_endpoint and scopes_supported. Use the returned endpoints exactly. An alias can advertise a different canonical Cloud Run issuer; do not substitute the alias into token audiences.

| Interface | API destination | OAuth resource |
| --- | --- | --- |
| REST | The returned issuer, plus the documented operation path | The exact returned issuer |
| MCP | The returned issuer plus /mcp, Streamable HTTP | The resource returned by /.well-known/oauth-protected-resource/mcp, normally issuer plus /mcp |

An MCP connector can start at https://api.portoperatingsystem.lol/mcp and follow its WWW-Authenticate resource_metadata URL. Fetch that public metadata and the authorization server it names. MCP initialization alone does not prove that the account's devices are accessible. Never use a REST token on MCP or an MCP token on REST.

Choose the transport before authorizing. Keep its resource unchanged through authorization, token exchange and refresh. If a REST request fails because you authorized the MCP resource (or the reverse), obtain a new user authorization for the correct resource. Refresh cannot change the token's audience.

Choose one supported [client registration method](/docs/for-ai/guides/oauth-client-registration.md), then follow the same [consent and callback steps](/docs/for-ai/guides/oauth-consent-and-callback.md). If metadata omits registration_endpoint, new DCR registration is unavailable; do not guess a replacement endpoint or silently switch to another client's credentials.

See [scopes and resource rules](/docs/for-ai/guides/authorization-rules.md). Authorization-server scopes_supported describes server vocabulary; a particular client's accepted scopes can be narrower.

## Carry discovery values into every request

This JavaScript fragment initializes a REST connection. Keep `authorizationServer` and `resource` for the consent and token examples; the API alias is only the discovery starting point.

```javascript
const response = await fetch('https://api.portoperatingsystem.lol/.well-known/oauth-authorization-server');
if (!response.ok) throw new Error('OAuth discovery failed');
const authorizationServer = await response.json();
const resource = authorizationServer.issuer;
const apiBase = authorizationServer.issuer;
```

For MCP, assign `resource` from the protected-resource metadata's `resource` field instead. Do not replace either value with the hostname you started from. A wrong `resource` can produce an `invalid_request` error callback even when client registration succeeded.
