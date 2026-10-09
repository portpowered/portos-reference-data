# createToken

POST `/tokens`



Creates a token (JWT) for token exchange. The caller becomes the owner. The raw JWT is returned only once at creation; the client must store it securely. Use the OAuth /auth/token endpoint with grant_type refresh_token to exchange this JWT for an access token. Subject may be ~self (current user) or another principal if policy allows.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /tokens
runtimePath: /tokens
method: POST
operationId: createToken
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /tokens
post:
  operationId: createToken
  tags:
    - Tokens
  description: >-
    Creates a token (JWT) for token exchange. The caller becomes the owner. The raw JWT is returned
    only once at creation; the client must store it securely. Use the OAuth /auth/token endpoint
    with grant_type refresh_token to exchange this JWT for an access token. Subject may be ~self
    (current user) or another principal if policy allows.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/CreateTokenRequest'
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: Token created successfully. The raw JWT is returned only once.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateTokenResponse'
          example:
            id: port1/principals/example
            token: port1/principals/example
            expires_at: '2026-10-08T12:00:00Z'
    '400':
      description: Invalid request (e.g. invalid subject, malformed body)
    '401':
      description: Unauthorized
    '403':
      description: Forbidden - not allowed to create a token for the given subject
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
