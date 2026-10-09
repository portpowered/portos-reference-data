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
          $ref: /docs/references/schemas/UpsertPrincipalRequest.json
        example:
          items: port1/principals/example
  responses:
    '200':
      description: Principal created successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/UpsertPrincipalResponse.json
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

## Linked components

- [UpsertPrincipalRequest.json](/docs/references/schemas/UpsertPrincipalRequest.json)
- [UpsertPrincipalResponse.json](/docs/references/schemas/UpsertPrincipalResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
