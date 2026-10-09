# generateToken

POST `/auth/token`

OAuth2 Token Endpoint

Public DCR/CIMD clients exchange authorization_code with client_id, redirect_uri,
code_verifier and the same resource as the consent request. No client_secret is
issued. Refresh these grants with grant_type refresh_token, client_id, rotating
refresh_token and the original resource. Store the replacement securely.
The legacy JWT vending flow uses urn:ietf:params:oauth:grant-type:refresh_token;
it is separate from DCR refresh.


## Authorization

```yaml
path: /auth/token
runtimePath: /auth/token
method: POST
operationId: generateToken
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/token
post:
  operationId: generateToken
  tags:
    - Auth
  summary: OAuth2 Token Endpoint
  description: |
    Public DCR/CIMD clients exchange authorization_code with client_id, redirect_uri,
    code_verifier and the same resource as the consent request. No client_secret is
    issued. Refresh these grants with grant_type refresh_token, client_id, rotating
    refresh_token and the original resource. Store the replacement securely.
    The legacy JWT vending flow uses urn:ietf:params:oauth:grant-type:refresh_token;
    it is separate from DCR refresh.
  requestBody:
    required: true
    content:
      application/x-www-form-urlencoded:
        schema:
          $ref: '#/components/schemas/GenerateTokenRequest'
        example:
          grant_type: authorization_code
          client_id: dcr_example
          redirect_uri: http://127.0.0.1:8765/callback
          code: CALLBACK_CODE
          code_verifier: ORIGINAL_RANDOM_PKCE_VERIFIER
          resource: https://api.portpowered.com
  responses:
    '200':
      description: Token generated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenerateTokenResponse'
          example:
            access_token: ACCESS_TOKEN_STORE_PRIVATELY
            refresh_token: ROTATING_REFRESH_TOKEN_STORE_PRIVATELY
            token_type: Bearer
            expires_in: 3600
            scope: endpoint:read message:send
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: false
  security: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
