# Authentication and dynamic client registration

All supported agents use the same OAuth components. REST and MCP select different protected resources; DCR and CIMD select different registration methods. Neither product branding nor registration grants device access.

Choose one reading path. This complete walkthrough already includes discovery, registration, consent, token lifecycle and authorization rules below; you do not need to fetch those component links again. If your connector already implements some steps, read only the missing components instead. Both paths use the same canonical instructions.

For REST, use the discovered issuer as the OAuth resource. For MCP, use the MCP protected-resource metadata. Keep that choice through authorization, exchange and refresh. If you chose the wrong transport, start a new authorization flow for the correct resource; refresh does not switch audiences.

Walkthrough steps (the linked components are also included below):

1. [Discover endpoints and choose REST or MCP](/docs/for-ai/guides/oauth-discovery.md).
2. [Register with DCR or supported CIMD](/docs/for-ai/guides/oauth-client-registration.md). Remote callbacks require HTTPS; local callback registrations contain only localhost/loopback callbacks. Repeated canonical fingerprints reuse the original public client without expanding scopes.
3. [Obtain user consent and validate the callback](/docs/for-ai/guides/oauth-consent-and-callback.md). PKCE S256 is required. Pause for the user to sign in and approve access.
4. [Exchange, refresh and revoke tokens](/docs/for-ai/guides/oauth-token-lifecycle.md). Keep the same canonical resource through authorization, exchange and refresh.
5. [Verify the connection](/docs/for-ai/guides/first-setup.md), then use [the REST quickstart](/docs/for-ai/guides/quickstart.md) or your client's MCP tools.

Read [authorization rules](/docs/for-ai/guides/authorization-rules.md) for scopes, principal/resource policies, sharing and denial diagnosis. Never ask for a Google password, paste credentials into chat, or approve the agent's own grant. Claimed client names such as Muse and Grok remain unverified.

## Discover the OAuth server and choose REST or MCP

This discovery step is shared by every client. The deployed pilot API is https://api.portoperatingsystem.lol. Fetch its /.well-known/oauth-authorization-server document anonymously. Read issuer, authorization_endpoint, token_endpoint, registration_endpoint, revocation_endpoint and scopes_supported. Use the returned endpoints exactly. An alias can advertise a different canonical Cloud Run issuer; do not substitute the alias into token audiences.

| Interface | API destination | OAuth resource |
| --- | --- | --- |
| REST | The returned issuer, plus the documented operation path | The exact returned issuer |
| MCP | The returned issuer plus /mcp, Streamable HTTP | The resource returned by /.well-known/oauth-protected-resource/mcp, normally issuer plus /mcp |

An MCP connector can start at https://api.portoperatingsystem.lol/mcp and follow its WWW-Authenticate resource_metadata URL. Fetch that public metadata and the authorization server it names. MCP initialization alone does not prove that the account's devices are accessible. Never use a REST token on MCP or an MCP token on REST.

Choose the transport before authorizing. Keep its resource unchanged through authorization, token exchange and refresh. If a REST request fails because you authorized the MCP resource (or the reverse), obtain a new user authorization for the correct resource. Refresh cannot change the token's audience.

Choose one supported [client registration method](/docs/for-ai/guides/oauth-client-registration.md), then follow the same [consent and callback steps](/docs/for-ai/guides/oauth-consent-and-callback.md). If metadata omits registration_endpoint, new DCR registration is unavailable; do not guess a replacement endpoint or silently switch to another client's credentials.

See [scopes and resource rules](/docs/for-ai/guides/authorization-rules.md). Authorization-server scopes_supported describes server vocabulary; a particular client's accepted scopes can be narrower.

### Carry discovery values into every request

This JavaScript fragment initializes a REST connection. Keep `authorizationServer` and `resource` for the consent and token examples; the API alias is only the discovery starting point.

```javascript
const response = await fetch('https://api.portoperatingsystem.lol/.well-known/oauth-authorization-server');
if (!response.ok) throw new Error('OAuth discovery failed');
const authorizationServer = await response.json();
const resource = authorizationServer.issuer;
const apiBase = authorizationServer.issuer;
```

For MCP, assign `resource` from the protected-resource metadata's `resource` field instead. Do not replace either value with the hostname you started from. A wrong `resource` can produce an `invalid_request` error callback even when client registration succeeded.

Canonical component: [Discover the OAuth server and choose REST or MCP](/docs/for-ai/guides/oauth-discovery.md).

## Register an OAuth client with DCR or CIMD

Start with [discovery](/docs/for-ai/guides/oauth-discovery.md). DCR and CIMD identify a client; they do not sign in a user or grant device access. Both use the same [PKCE consent and callback flow](/docs/for-ai/guides/oauth-consent-and-callback.md) and [token lifecycle](/docs/for-ai/guides/oauth-token-lifecycle.md).

### DCR: public clients

POST application/json to the discovered registration_endpoint:

```json
{"client_name":"My device assistant","redirect_uris":["https://your-client.example/oauth/callback"],"token_endpoint_auth_method":"none","grant_types":["authorization_code","refresh_token"],"response_types":["code"],"scope":"endpoint:read message:send"}
```

Use a callback the client controls. Remote callbacks require HTTPS. Local clients may use exact HTTP callbacks on localhost or literal loopback IPs, such as http://127.0.0.1:8765/callback. All callbacks in a registration must be local or all must be remote; these sets cannot be mixed. No fragments or user information are permitted. Start the local callback listener before authorization. The website's client-management interface enforces this same callback-set policy.

Success is 201 with client_id, client_id_issued_at and accepted metadata. Public clients get no client_secret. Supported DCR scopes are endpoint:read, endpoint:write, message:read, message:send, group:read, group:manage, subscription:read and subscription:write. The default is endpoint:read. Request only the task's necessary scopes and check the returned scope. Broader static-client scopes are outside this anonymous profile.

The registration fingerprint is SHA-256 of compact canonical JSON with sorted object keys and sorted redirect_uris, grant_types and response_types arrays, plus client_name and token_endpoint_auth_method. Defaults are applied before hashing. Array ordering does not create another client. A matching registration returns the original client ID, issue time, scopes and descriptive metadata. It never overwrites the existing client or expands scopes, even if scope or software_id differs in the new request. Fingerprinting is deduplication, not proof of callback ownership or vendor identity.

Default quotas are 1,000 new registrations per rolling day and 10,000 retained registrations. Reuse does not consume new-registration quota. A quota failure returns 429 with Retry-After. An operator can disable new registrations without retiring existing grants. Read the [registration operation](/docs/for-ai/operations/registerDynamicOAuthClient.md) for exact request, response and error schemas.

### CIMD: allowlisted metadata clients

A supported CIMD client uses its allowlisted HTTPS metadata URL as client_id instead of posting a DCR request. Port OS retrieves and validates that client metadata, including its exact callbacks and public PKCE profile. Arbitrary metadata URLs and redirects from the metadata fetch are not supported. If your metadata URL is not allowlisted, arrange onboarding or use DCR if your client supports it. Do not pretend another client's metadata URL belongs to you.

Client_name, software_id, software_version and client_uri remain unverified claims. No trusted software-statement issuer is configured; software_statement is rejected. A registration called Muse or Grok does not establish a verified vendor integration or gain additional permissions. Static confidential clients retain their separately configured client authentication method.

Canonical component: [Register an OAuth client with DCR or CIMD](/docs/for-ai/guides/oauth-client-registration.md).

## Obtain user consent and validate the OAuth callback

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

Refresh with grant_type=refresh_token, client_id, refresh_token and the original resource at token_endpoint. Scope may stay the same or narrow; it cannot expand. Credentials rotate: store the newly returned refresh token atomically and stop using the previous one. A revoked or reused refresh token must not be retried in a loop. Reauthorize when the grant no longer permits the intended operation.

Revoke by POSTing application/x-www-form-urlencoded token=<refresh_token>&client_id=<client_id> to revocation_endpoint. Revoked grants stop authorizing both access and refresh requests. Removing a local configuration file alone is not server-side revocation.

Read [the token operation](/docs/for-ai/operations/generateToken.md), [revocation operation](/docs/for-ai/operations/revokeOAuthGrant.md), and [connection recovery](/docs/for-ai/guides/troubleshooting.md) for schemas and failures. Verify account access using [first setup](/docs/for-ai/guides/first-setup.md), then perform only the customer's intended task. Dispatch acceptance is distinct from observed device state.

Canonical component: [Exchange, refresh and revoke scoped OAuth tokens](/docs/for-ai/guides/oauth-token-lifecycle.md).

## Scopes and authorization rules

Authentication establishes the principal and client. OAuth scopes bound the user's delegated authority; resource rules decide which selected resources and actions that principal may access. A scope is not an ownership or sharing grant.

For delegated REST grants, Port OS verifies token signature, expiry, issuer, REST audience, access-token type and active grant, then checks the operation's scope before existing service resource-policy evaluation. MCP tokens have a separate /mcp audience and cannot be reused on REST. A refresh token is never an API bearer credential.

| Task | Scope |
| --- | --- |
| Enumerate or query endpoints/routes | endpoint:read |
| Modify endpoints/routes | endpoint:write |
| Send a device message | message:send |
| Read groups and relationships | group:read |
| Manage group membership | group:manage |
| Read subscriptions | subscription:read |
| Create/update/delete subscriptions | subscription:write |

Other operations are outside the anonymous DCR device profile and fail closed. [Operation pages](/docs/for-ai/operations/index.md) expose exact credential alternatives and resource requirements. [Machine-readable authorization metadata](/docs/references/authorization.yaml) links the contract.

The existing resource engine converts principal, action, resource and entity data into Cedar requests. Default owner rules and applicable sharing/conditional rules are evaluated; only an Allow outcome admits access. The typed operation IDs come from Port OS's policy action catalog, not invented dotted action names. Owning an endpoint does not override a delegated token's missing scope.

A token with endpoint:read can enumerate permitted lights but cannot dispatch a command. Adding message:send permits dispatch only to endpoints that the signed-in principal's rules allow. An authorized light does not imply camera access. A generic power-capable plug is not automatically a light. For a group request, evaluate the selected targets and report denied or unresolved members separately.

An invalid/expired/revoked token needs renewed authentication. A scope denial requires the user to approve the needed scope. A resource denial requires the owner to grant the appropriate resource/action access. Never fix denial by switching principal, requesting unrestricted credentials or retrying blindly. Provider authentication failures can require account relinking; they are different from Port OS policy denial. Keep inaccessible resource identities out of diagnostics.

See [troubleshooting](/docs/for-ai/guides/troubleshooting.md).

Canonical component: [Scopes and authorization rules](/docs/for-ai/guides/authorization-rules.md).
