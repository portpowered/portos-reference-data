# upsertPluginRequest

POST `/plugins`



Creates a new plugin

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugins
runtimePath: /plugins
method: POST
operationId: upsertPluginRequest
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugins
post:
  operationId: upsertPluginRequest
  tags:
    - Plugins
  description: >-
    Creates a new plugin


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertPluginRequest'
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: Plugin created successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpsertPluginResponse'
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
