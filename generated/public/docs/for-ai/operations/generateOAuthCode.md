# generateOAuthCode

POST `/oauth/generate-code`

OAuth2 Generate Device Code

This endpoint generates an OAuth 2.0 authorization code that can be exchanged for an access token. This endpoint is called by the frontend /oauth/authorize page after the user grants consent.
The endpoint validates the client, redirect URI, and scopes, then creates an authorization code for the authenticated user principal.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /oauth/generate-code
runtimePath: /oauth/generate-code
method: POST
operationId: generateOAuthCode
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/generate-code
post:
  operationId: generateOAuthCode
  tags:
    - Internal
  summary: OAuth2 Generate Device Code
  description: >-
    This endpoint generates an OAuth 2.0 authorization code that can be exchanged for an access
    token. This endpoint is called by the frontend /oauth/authorize page after the user grants
    consent.

    The endpoint validates the client, redirect URI, and scopes, then creates an authorization code
    for the authenticated user principal.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/GenerateOAuthCodeRequest'
  responses:
    '200':
      description: Authorization code generated successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenerateOAuthCodeResponse'
    '400':
      description: Invalid request (e.g., invalid client_id, redirect_uri, or scopes)
    '401':
      description: Unauthorized (missing or invalid authentication token)
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: false
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
