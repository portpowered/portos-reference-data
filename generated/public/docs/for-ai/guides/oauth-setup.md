# Set up an OAuth client for Port OS

Connect your application with OAuth, ask the user to approve access, and manage its tokens. First [register your client](/docs/for-ai/guides/oauth-client-registration.md). Follow the steps below in order. Use the same REST or MCP resource through the whole connection.

## Discover the OAuth server and choose REST or MCP

This discovery step is shared by every client. The API is https://api.portoperatingsystem.com and the authorization server is https://auth.portoperatingsystem.com. Fetch the API's /.well-known/oauth-authorization-server document anonymously. Read issuer, authorization_endpoint, token_endpoint, registration_endpoint, revocation_endpoint and scopes_supported. Use the returned auth endpoints exactly. The issuer and API resource have different origins; do not use the auth issuer as the API destination or token audience. Port OS exposes OAuth authorization-server metadata here; it does not advertise OpenID Connect discovery or issue OpenID Connect ID tokens.

| Interface | API destination | OAuth resource |
| --- | --- | --- |
| REST | https://api.portoperatingsystem.com plus the documented operation path | https://api.portoperatingsystem.com |
| MCP | https://api.portoperatingsystem.com/mcp, Streamable HTTP | The resource returned by /.well-known/oauth-protected-resource/mcp |

An MCP connector can start at https://api.portoperatingsystem.com/mcp and follow its WWW-Authenticate resource_metadata URL. Fetch that public metadata and the authorization server it names. MCP initialization alone does not prove that the account's devices are accessible. Never use a REST token on MCP or an MCP token on REST.

Choose the transport before authorizing. Omitting resource at authorization selects REST. Supply the discovered resource explicitly to select MCP. Code exchange and refresh may omit resource and inherit the grant audience; an explicit resource must stay unchanged. If a REST request fails because you authorized the MCP resource (or the reverse), obtain a new user authorization for the correct resource. Refresh cannot change the token's audience.

Choose one supported [client registration method](/docs/for-ai/guides/oauth-client-registration.md), then follow the same [consent and callback steps](/docs/for-ai/guides/oauth-consent-and-callback.md). If metadata omits registration_endpoint, new DCR registration is unavailable; do not guess a replacement endpoint or silently switch to another client's credentials.

See [scopes and resource rules](/docs/for-ai/guides/authorization-rules.md). Authorization-server scopes_supported describes server vocabulary; a particular client's accepted scopes can be narrower.

### Carry discovery values into every request

This JavaScript fragment initializes a REST connection. Keep `authorizationServer` and `resource` for the consent and token examples; the API base is the protected resource, independently of the discovered auth issuer.

```javascript
const apiBase = 'https://api.portoperatingsystem.com';
const response = await fetch(apiBase + '/.well-known/oauth-authorization-server');
if (!response.ok) throw new Error('OAuth discovery failed');
const authorizationServer = await response.json();
const resource = apiBase;
```

For MCP, assign `resource` from the protected-resource metadata's `resource` field instead. Keep the auth issuer separate from the API resource. A wrong `resource` can produce an `invalid_target` error callback even when client registration succeeded.

Canonical component: [Discover the OAuth server and choose REST or MCP](/docs/for-ai/guides/oauth-discovery.md).

## Obtain user consent and validate the OAuth callback

Use the endpoints and resource from [discovery](/docs/for-ai/guides/oauth-discovery.md) and the client ID and exact callback from [registration](/docs/for-ai/guides/oauth-client-registration.md). These steps are identical for DCR and CIMD, REST and MCP; the chosen resource is the transport-specific input.

`resource` is optional. Omitting it selects the canonical REST audience (the authorization-server issuer). For MCP, supply its discovered `/mcp` resource explicitly. Token exchange and refresh can omit `resource` and inherit the audience bound to the authorization code or refresh token. Explicit mismatches are rejected as `invalid_target`.

1. Start the callback handler the client controls. For a loopback callback, bind its listener locally before opening authorization.
2. Generate a cryptographically random PKCE verifier of 43–128 permitted characters. Compute code_challenge = BASE64URL(SHA256(verifier)), without padding. Generate a separate random state and retain both in this authorization attempt.
3. Open the discovered authorization_endpoint with the following query parameters. Percent-encode parameter values; do not append raw callback URLs or scopes into an unescaped query.

```text
client_id=<registered ID or supported CIMD metadata URL>
redirect_uri=<exact registered callback>
response_type=code
scope=<requested subset of the client's accepted scopes>
resource=<chosen canonical REST or MCP resource>
state=<random client state>
code_challenge=<S256 challenge>
code_challenge_method=S256
```

For REST, use the `resource = authorizationServer.issuer` value retained from discovery. Construct the URL rather than writing an alias into a template. This JavaScript fragment assumes `clientId`, `redirectUri` and `acceptedScope` come from your registration response and callback configuration:

```javascript
const base64url = bytes => btoa(String.fromCharCode(...bytes))
  .replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
const state = base64url(crypto.getRandomValues(new Uint8Array(32)));
const challenge = base64url(new Uint8Array(await crypto.subtle.digest(
  'SHA-256', new TextEncoder().encode(verifier))));
const authorizationURL = new URL(authorizationServer.authorization_endpoint);
authorizationURL.search = new URLSearchParams({
  client_id: clientId, redirect_uri: redirectUri, response_type: 'code',
  scope: acceptedScope, resource, state,
  code_challenge: challenge, code_challenge_method: 'S256',
}).toString();
// Retain verifier, state and authorizationServer.issuer privately until callback validation.
// Open authorizationURL.href in the user's browser; wait for their consent.
```

The user signs in on Port OS and reviews the requested permissions. Pause for the user; an agent must not approve its own grant, request passwords or manufacture a production sign-in identity. Local functional tests substitute an existing signed fixture identity at this boundary without changing production sign-in.

After approval, the consent page navigates to a one-time Port OS continuation.
That endpoint returns HTTP 302 Found with the exact registered callback in
Location, carrying code, original state and iss. Denial uses the same 302 handoff
with access_denied instead of a code. The authenticated consent fetch returns
200 JSON only for the intermediate continuation; it must be followed by document
navigation, not another fetch. Continuations expire after two minutes and are
single-use. They require no login token and cannot be used to approve consent.

Reject a callback whose state or issuer does not match this attempt. Treat an
error callback as a denied or failed authorization, not a code. Codes and pending
consent expire after ten minutes and are single-use. Do not paste codes,
continuation references or credentials into shared chat or logs. Continue with
[code exchange and token lifecycle](/docs/for-ai/guides/oauth-token-lifecycle.md).

For hosted-client acceptance, preserve the browser network log and approve a
fresh request. Verify the document request to /oauth/authorization-response
returns 302, the next GET reaches the registered client callback, and the client
posts its code and original PKCE verifier to the discovered token endpoint.
Repeat with Deny and verify access_denied without a code. Backend functional and
website browser tests cover these boundaries against an isolated callback;
compatibility with a specific hosted client still requires that live trace.

Canonical component: [Obtain user consent and validate the OAuth callback](/docs/for-ai/guides/oauth-consent-and-callback.md).

## Exchange, refresh and revoke scoped OAuth tokens

Complete [callback validation](/docs/for-ai/guides/oauth-consent-and-callback.md) first. For a public DCR/CIMD client, POST application/x-www-form-urlencoded to the discovered token_endpoint with:

```text
grant_type=authorization_code
client_id=<client ID used for authorization>
code=<validated callback code>
redirect_uri=<the same exact callback>
code_verifier=<this attempt's original verifier>
resource=<the same canonical resource used for authorization>
```

Continue with the same discovery values and verifier from the consent example. `code` below must be from a callback whose `state` and `iss` you validated; abort on any callback `error`:

```javascript
const tokenResponse = await fetch(authorizationServer.token_endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code', client_id: clientId, code,
    redirect_uri: redirectUri, code_verifier: verifier, resource,
  }),
});
if (!tokenResponse.ok) throw new Error('OAuth code exchange failed');
const tokens = await tokenResponse.json(); // Store securely; do not print tokens.
```

Save access_token, refresh_token and returned scope in the connector's secure credential store. Public clients have no client secret. Use Authorization: Bearer <access_token> with REST requests or the MCP HTTP connection, according to that token's resource. A refresh token is never an API credential. [Scopes bound access; resource policies still apply](/docs/for-ai/guides/authorization-rules.md).

### Confidential clients

A client is confidential unless its token_endpoint_auth_method is none. A confidential client must authenticate on code exchange and on refresh, even when it uses PKCE:

- client_secret_post: add client_secret=<secret> to the form body.
- client_secret_basic: send Authorization: Basic with the client ID and secret, and leave them out of the form body.
- private_key_jwt: send client_assertion and client_assertion_type.

Use exactly one method. Missing or wrong credentials return invalid_client: 400 for form credentials, or 401 with WWW-Authenticate: Basic for Basic. Basic and form credentials together return 400 invalid_request. A client without the requested grant returns 400 unauthorized_client. Public clients (none) send no secret and rely on PKCE.

Refresh with grant_type=refresh_token, client_id and refresh_token at token_endpoint; a confidential client also authenticates as above. The resource parameter is optional for code exchange and refresh: omission inherits the existing grant audience; if supplied, it must match the original resource. Scope may stay the same or narrow; it cannot expand. Credentials rotate: store the newly returned refresh token atomically and stop using the previous one. A revoked or reused refresh token must not be retried in a loop. Reauthorize when the grant no longer permits the intended operation.

Revoke by POSTing application/x-www-form-urlencoded token=<refresh_token>&client_id=<client_id> to revocation_endpoint. Revoked grants stop authorizing both access and refresh requests. Removing a local configuration file alone is not server-side revocation.

Read [the token operation](/docs/for-ai/operations/generateToken.md), [revocation operation](/docs/for-ai/operations/revokeOAuthGrant.md), and [connection recovery](/docs/for-ai/guides/troubleshooting.md) for schemas and failures. Verify account access using [first setup](/docs/for-ai/guides/first-setup.md), then perform only the customer's intended task. Dispatch acceptance is distinct from observed device state.

Canonical component: [Exchange, refresh and revoke scoped OAuth tokens](/docs/for-ai/guides/oauth-token-lifecycle.md).
