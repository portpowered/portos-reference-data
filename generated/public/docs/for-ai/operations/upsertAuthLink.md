# upsertAuthLink

POST `/auth-links`



Creates a new auth link

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /auth-links
runtimePath: /auth-links
method: POST
operationId: upsertAuthLink
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /auth-links
post:
  operationId: upsertAuthLink
  tags:
    - Auth Links
  description: >-
    Creates a new auth link


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertAuthLinkRequest'
  responses:
    '200':
      description: Auth link created successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertAuthLinkResponse'
          example:
            id: port1/principals/user123/resources/abc-123
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
