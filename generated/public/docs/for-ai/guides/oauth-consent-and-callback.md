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

The user signs in on Port OS and reviews the requested permissions. Pause for the user; an agent must not approve its own grant, request passwords or manufacture a production sign-in identity. Local functional tests substitute an existing signed fixture identity at this boundary without changing production sign-in.

After approval, Port OS navigates to the exact callback with code, state and iss. Reject a callback whose state or issuer does not match this attempt. Treat an error callback as a denied or failed authorization, not a code. Codes and pending consent expire after ten minutes and are single-use. Do not paste codes or credentials into shared chat or logs. Continue with [code exchange and token lifecycle](/docs/for-ai/guides/oauth-token-lifecycle.md).
