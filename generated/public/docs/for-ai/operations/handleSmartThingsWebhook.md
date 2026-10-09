# handleSmartThingsWebhook

POST `/webhooks/smartthings`



This is the API endpoint for receiving events from smart things

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /webhooks/smartthings
runtimePath: /webhooks/smartthings
method: POST
operationId: handleSmartThingsWebhook
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /webhooks/smartthings
post:
  tags:
    - Webhooks
  description: >-
    This is the API endpoint for receiving events from smart things


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  operationId: handleSmartThingsWebhook
  responses:
    '200':
      description: OK
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
