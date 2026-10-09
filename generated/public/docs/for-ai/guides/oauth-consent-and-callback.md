# Obtain user consent and validate the OAuth callback

Use the endpoints and resource from [discovery](/docs/for-ai/guides/oauth-discovery.md) and the client ID and exact callback from [registration](/docs/for-ai/guides/oauth-client-registration.md). These steps are identical for DCR and CIMD, REST and MCP; the chosen resource is the transport-specific input.

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

After approval, Port OS navigates to the exact callback with code, state and iss. Reject a callback whose state or issuer does not match this attempt. Treat an error callback as a denied or failed authorization, not a code. Codes and pending consent expire after ten minutes and are single-use. Do not paste codes or credentials into shared chat or logs. Continue with [code exchange and token lifecycle](/docs/for-ai/guides/oauth-token-lifecycle.md).
