# Exchange, refresh and revoke scoped OAuth tokens

Complete [callback validation](/docs/for-ai/guides/oauth-consent-and-callback.md) first. For a public DCR/CIMD client, POST application/x-www-form-urlencoded to the discovered token_endpoint with:

```text
grant_type=authorization_code
client_id=<client ID used for authorization>
code=<validated callback code>
redirect_uri=<the same exact callback>
code_verifier=<this attempt's original verifier>
resource=<the same canonical resource used for authorization>
```

Save access_token, refresh_token and returned scope in the connector's secure credential store. Public clients have no client secret. Use Authorization: Bearer <access_token> with REST requests or the MCP HTTP connection, according to that token's resource. A refresh token is never an API credential. [Scopes bound access; resource policies still apply](/docs/for-ai/guides/authorization-rules.md).

Refresh with grant_type=refresh_token, client_id, refresh_token and the original resource at token_endpoint. Scope may stay the same or narrow; it cannot expand. Credentials rotate: store the newly returned refresh token atomically and stop using the previous one. A revoked or reused refresh token must not be retried in a loop. Reauthorize when the grant no longer permits the intended operation.

Revoke by POSTing application/x-www-form-urlencoded token=<refresh_token>&client_id=<client_id> to revocation_endpoint. Revoked grants stop authorizing both access and refresh requests. Removing a local configuration file alone is not server-side revocation.

Read [the token operation](/docs/for-ai/operations/generateToken.md), [revocation operation](/docs/for-ai/operations/revokeOAuthGrant.md), and [connection recovery](/docs/for-ai/guides/troubleshooting.md) for schemas and failures. Verify account access using [first setup](/docs/for-ai/guides/first-setup.md), then perform only the customer's intended task. Dispatch acceptance is distinct from observed device state.
