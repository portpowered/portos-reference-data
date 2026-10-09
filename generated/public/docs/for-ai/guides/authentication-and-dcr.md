# Authentication and dynamic client registration

Use OAuth authorization code with PKCE S256 for agent access. Dynamic Client Registration (DCR) creates a client; the user must separately sign in and consent. Do not request a Google password or paste tokens into chat.

## Discover the server

For the deployed pilot, fetch https://api.portoperatingsystem.lol/.well-known/oauth-authorization-server. Production uses https://api.portpowered.com when that environment is available. Read issuer, registration_endpoint, authorization_endpoint, token_endpoint, revocation_endpoint and scopes_supported from the response. Use the returned issuer as the REST resource. The pilot alias can resolve to a Cloud Run issuer; follow the returned endpoints instead of constructing competing hostnames.

## Register a public client

POST JSON to registration_endpoint:

```json
{"client_name":"My device assistant","redirect_uris":["https://your-client.example/oauth/callback"],"token_endpoint_auth_method":"none","grant_types":["authorization_code","refresh_token"],"response_types":["code"],"scope":"endpoint:read message:send"}
```

Replace the example callback with the client's actual controlled callback. A local client can use an exact HTTP callback on a literal loopback address such as http://127.0.0.1:8765/callback. HTTPS is required elsewhere. No fragments or user information are permitted. Save the returned client_id and accepted metadata. Success is 201; public clients receive no client_secret. The initial profile supports endpoint, message, group and subscription scopes; ask only for the task's needed access. The default scope is endpoint:read. Reuse registrations; limits are 1,000 registrations per rolling day and 10,000 retained registrations. A quota failure returns 429 and Retry-After.

## Request user authorization

Generate a cryptographically random PKCE verifier of 43–128 permitted characters, compute BASE64URL(SHA256(verifier)) without padding, and generate a random state value. Open authorization_endpoint with these query parameters:

```text
client_id=<registered ID>
redirect_uri=<exact registered callback>
response_type=code
scope=endpoint:read message:send
resource=<discovered issuer>
state=<random client state>
code_challenge=<S256 challenge>
code_challenge_method=S256
```

The user signs in on Port OS and reviews consent. The agent must pause for the user; it must not approve its own grant. After approval, the website navigates to the registered callback with code, state and iss. Validate the state and issuer before using the code. Codes/pending consent expire after ten minutes and are single-use.

## Exchange and refresh

POST application/x-www-form-urlencoded to token_endpoint with grant_type=authorization_code, client_id, code, redirect_uri, code_verifier and the same resource. Save access_token and refresh_token in the client's secure credential store. Use Authorization: Bearer <access_token> on REST requests. Refresh with grant_type=refresh_token, client_id, refresh_token and the original resource; store the rotated credentials and never expand scope. To revoke, POST token=<refresh_token>&client_id=<client_id> to revocation_endpoint. Revoked grants stop authorizing requests.

## CIMD and client identity

Allowlisted Client ID Metadata Documents (CIMD) use an HTTPS metadata URL as client_id instead of calling registration_endpoint. Port OS validates the allowlisted metadata, redirect and PKCE profile before consent. Arbitrary metadata URLs are not supported. Static confidential clients use their separately configured authentication method. DCR and CIMD both require user authorization; neither grants ownership. Client names and software IDs are unverified claims. No trusted software-statement issuer is configured; do not claim that a registration named Muse is a verified Muse integration.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md) and [quickstart](/docs/for-ai/guides/quickstart.md) next.
