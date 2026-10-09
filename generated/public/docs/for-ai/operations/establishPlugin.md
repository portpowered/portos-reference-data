# establishPlugin

POST `/plugins/establish`

Establish or update a plugin registration

Registers a new plugin or updates an existing one. Supports three plugin types: local (running on the server instance), webservice (HTTP-based remote plugins with OAuth credentials), and Apple Push Notification (APNS-based plugins). Associated secrets (OAuth client credentials or APNS tokens) are stored alongside the plugin registration.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugins/establish
runtimePath: /plugins/establish
method: POST
operationId: establishPlugin
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugins/establish
post:
  operationId: establishPlugin
  tags:
    - Plugins
  summary: Establish or update a plugin registration
  description: >-
    Registers a new plugin or updates an existing one. Supports three plugin types: local (running
    on the server instance), webservice (HTTP-based remote plugins with OAuth credentials), and
    Apple Push Notification (APNS-based plugins). Associated secrets (OAuth client credentials or
    APNS tokens) are stored alongside the plugin registration.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/EstablishPluginRequest'
  responses:
    '200':
      description: Plugin established successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EstablishPluginResponse'
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
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
