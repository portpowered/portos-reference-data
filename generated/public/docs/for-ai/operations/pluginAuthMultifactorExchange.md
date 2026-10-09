# pluginAuthMultifactorExchange

POST `/plugin-auth-multifactor-exchange`



This API is used to generate a multifactor authentication code for a plugin.  For example, if the plugin requires a third party service to receive an SMS code, this API is used to request for that code. 

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugin-auth-multifactor-exchange
runtimePath: /plugin-auth-multifactor-exchange
method: POST
operationId: pluginAuthMultifactorExchange
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugin-auth-multifactor-exchange
post:
  operationId: pluginAuthMultifactorExchange
  tags:
    - Plugins
  description: >-
    This API is used to generate a multifactor authentication code for a plugin.  For example, if
    the plugin requires a third party service to receive an SMS code, this API is used to request
    for that code. 


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PluginAuthMultifactorExchangeRequest'
  responses:
    '202':
      description: Auth link setup started successfully, the operation is ongoing in the background.
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
