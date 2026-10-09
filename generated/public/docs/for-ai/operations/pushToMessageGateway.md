# pushToMessageGateway

POST `/messages-gateway`



Sends a message to a recipient

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /messages-gateway
runtimePath: /messages-gateway
method: POST
operationId: pushToMessageGateway
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /messages-gateway
post:
  operationId: pushToMessageGateway
  tags:
    - Messages
  description: >-
    Sends a message to a recipient


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/Message.json
        example:
          body: {}
  responses:
    '202':
      description: Message accepted for processing
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

- [Message.json](/docs/references/schemas/Message.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
