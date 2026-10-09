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
          $ref: /docs/references/schemas/EstablishAuthLinkRequest.json
        example:
          pluginId: port1/principals/example
  responses:
    '200':
      description: Auth link established successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EstablishAuthLinkResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Missing or invalid authentication
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [EstablishAuthLinkRequest.json](/docs/references/schemas/EstablishAuthLinkRequest.json)
- [EstablishAuthLinkResponse.json](/docs/references/schemas/EstablishAuthLinkResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
