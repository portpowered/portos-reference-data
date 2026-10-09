# registerDynamicOAuthClient

POST `/oauth/register`

Register a public OAuth client

RFC 7591 anonymous public-client registration. No Google session is required.
This registration gives no user or resource permissions. Public clients must
use PKCE S256, resource-bound authorization_code flow and explicit user consent.
Client name, software_id and client_uri are unverified claims, not proof of Muse
or any other product. Untrusted software_statement is rejected.
HTTPS callbacks are allowed; HTTP callbacks require literal loopback IPs.
Unknown metadata extensions are ignored as required by RFC 7591.
The deployment enforces rolling registration and retained-client quotas.


## Authorization

```yaml
path: /oauth/register
runtimePath: /oauth/register
method: POST
operationId: registerDynamicOAuthClient
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/register
post:
  operationId: registerDynamicOAuthClient
  tags:
    - Auth
  summary: Register a public OAuth client
  security: []
  x-portos-delegated: false
  x-portos-resource-permission: false
  description: |
    RFC 7591 anonymous public-client registration. No Google session is required.
    This registration gives no user or resource permissions. Public clients must
    use PKCE S256, resource-bound authorization_code flow and explicit user consent.
    Client name, software_id and client_uri are unverified claims, not proof of Muse
    or any other product. Untrusted software_statement is rejected.
    HTTPS callbacks are allowed; HTTP callbacks require literal loopback IPs.
    Unknown metadata extensions are ignored as required by RFC 7591.
    The deployment enforces rolling registration and retained-client quotas.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/DynamicClientMetadata'
        example:
          client_name: My agent
          redirect_uris:
            - http://127.0.0.1:8765/callback
          token_endpoint_auth_method: none
          grant_types:
            - authorization_code
            - refresh_token
          scope: endpoint:read message:send
  responses:
    '201':
      description: Public client created; no client_secret is issued.
      content:
        application/json:
          schema:
            allOf:
              - $ref: '#/components/schemas/DynamicClientMetadata'
              - type: object
                required:
                  - client_id
                  - client_id_issued_at
                properties:
                  client_id:
                    type: string
                  client_id_issued_at:
                    type: integer
                    format: int64
    '400':
      description: Invalid metadata, redirect URI, or unapproved software statement.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthProtocolError'
    '415':
      description: Use application/json.
    '429':
      description: Registration quota reached. Wait before retrying; do not loop.
      headers:
        Retry-After:
          schema:
            type: integer
    '503':
      description: Registration storage unavailable.
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
