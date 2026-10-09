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
          $ref: /docs/references/schemas/ValidateOAuthRequestRequest.json
        example:
          client_id: port1/principals/user123/oauth-clients/my-client
          redirect_uri: https://myapp.com/callback
  responses:
    '200':
      description: Request validated successfully, returns client information
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/ValidateOAuthRequestResponse.json
          example:
            clientName: My OAuth Application
            scopes: []
    '400':
      description: Invalid request (e.g., invalid client_id, redirect_uri, or scopes)
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [ValidateOAuthRequestRequest.json](/docs/references/schemas/ValidateOAuthRequestRequest.json)
- [ValidateOAuthRequestResponse.json](/docs/references/schemas/ValidateOAuthRequestResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
