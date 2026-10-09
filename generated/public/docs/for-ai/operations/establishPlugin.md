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
          $ref: /docs/references/schemas/EstablishPluginRequest.json
        example:
          plugin:
            type: LIGHT
  responses:
    '200':
      description: Plugin established successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EstablishPluginResponse.json
          example:
            pluginId: port1/principals/example
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
- [EstablishPluginRequest.json](/docs/references/schemas/EstablishPluginRequest.json)
- [EstablishPluginResponse.json](/docs/references/schemas/EstablishPluginResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
