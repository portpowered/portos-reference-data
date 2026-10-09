# establishAuthLink

POST `/auth-links/establish`

Establish an auth link between a plugin and a principal

Creates an auth link that binds a plugin to a principal with the appropriate credentials. Supports multiple credential types: OAuth tokens, username/password, API keys, and Apple Push Notification device tokens.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /auth-links/establish
runtimePath: /auth-links/establish
method: POST
operationId: establishAuthLink
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /auth-links/establish
post:
  operationId: establishAuthLink
  tags:
    - Auth Links
  summary: Establish an auth link between a plugin and a principal
  description: >-
    Creates an auth link that binds a plugin to a principal with the appropriate credentials.
    Supports multiple credential types: OAuth tokens, username/password, API keys, and Apple Push
    Notification device tokens.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/EstablishAuthLinkRequest'
  responses:
    '200':
      description: Auth link established successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EstablishAuthLinkResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Missing or invalid authentication
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
