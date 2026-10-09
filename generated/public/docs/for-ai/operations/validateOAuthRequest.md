# validateOAuthRequest

POST `/oauth/validate-request`

OAuth2 Validate Authorization Request

This endpoint validates OAuth 2.0 authorization request parameters without creating an authorization code. It returns client information relevant for displaying on the authorization page, such as client name, Terms of Service URI, Privacy Policy URI, logo URI, and validated scopes.
This endpoint is useful for pre-validation before user consent, allowing the frontend to display relevant client information to the user.


## Authorization

```yaml
path: /oauth/validate-request
runtimePath: /oauth/validate-request
method: POST
operationId: validateOAuthRequest
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /oauth/validate-request
post:
  operationId: validateOAuthRequest
  tags:
    - Internal
  summary: OAuth2 Validate Authorization Request
  description: >
    This endpoint validates OAuth 2.0 authorization request parameters without creating an
    authorization code. It returns client information relevant for displaying on the authorization
    page, such as client name, Terms of Service URI, Privacy Policy URI, logo URI, and validated
    scopes.

    This endpoint is useful for pre-validation before user consent, allowing the frontend to display
    relevant client information to the user.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ValidateOAuthRequestRequest'
  responses:
    '200':
      description: Request validated successfully, returns client information
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidateOAuthRequestResponse'
    '400':
      description: Invalid request (e.g., invalid client_id, redirect_uri, or scopes)
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
