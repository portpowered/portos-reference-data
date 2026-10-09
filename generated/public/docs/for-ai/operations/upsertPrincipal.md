# upsertPrincipal

POST `/principals`



Creates a new principal

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /principals
runtimePath: /principals
method: POST
operationId: upsertPrincipal
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /principals
post:
  operationId: upsertPrincipal
  tags:
    - Principals
  description: >-
    Creates a new principal


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertPrincipalRequest'
        example:
          items: port1/principals/example
  responses:
    '200':
      description: Principal created successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertPrincipalResponse'
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
