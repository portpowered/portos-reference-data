# deletePlugin

DELETE `/plugins`



Deletes a plugin

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugins
runtimePath: /plugins
method: DELETE
operationId: deletePlugin
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugins
delete:
  operationId: deletePlugin
  tags:
    - Plugins
  description: >-
    Deletes a plugin


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/DeletePluginRequest'
        example:
          id: port1/principals/user123/resources/abc-123
  responses:
    '200':
      description: Plugin deleted successfully
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
