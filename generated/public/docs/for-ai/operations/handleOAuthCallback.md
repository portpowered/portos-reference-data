# handleOAuthCallback

POST `/auth/callback`

OAuth provider callback

Handles callbacks from OAuth providers (Apple, Google, etc.) that do not support PKCE or have not configured CORS. The provider submits either an authorization code or an ID token. When a code is present the server exchanges it with the provider for tokens; when an id_token is present the server processes it directly.


## Authorization

```yaml
path: /auth/callback
runtimePath: /auth/callback
method: POST
operationId: handleOAuthCallback
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/callback
post:
  operationId: handleOAuthCallback
  tags:
    - Auth
  summary: OAuth provider callback
  description: >
    Handles callbacks from OAuth providers (Apple, Google, etc.) that do not support PKCE or have
    not configured CORS. The provider submits either an authorization code or an ID token. When a
    code is present the server exchanges it with the provider for tokens; when an id_token is
    present the server processes it directly.
  security: []
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          type: object
          properties:
            code:
              type: string
              description: Authorization code from the OAuth provider (e.g. Apple)
            id_token:
              type: string
              description: ID token from the OAuth provider
            state:
              type: string
              description: State parameter for CSRF protection
            user:
              type: string
              description: Additional user data (used by Apple Sign-In on first authorization)
        example:
          field: value
  responses:
    '200':
      description: Callback processed successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenerateTokenResponse'
          example:
            access_token: port1/principals/example
            token_type: port1/principals/example
            expires_in: 1
    '400':
      description: Invalid callback data or provider error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OAuthErrorResponse'
          example:
            error: invalid_request
            error_description: user_code is required
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
