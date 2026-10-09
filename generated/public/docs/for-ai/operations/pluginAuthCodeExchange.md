# pluginAuthCodeExchange

POST `/plugin-auth-code-exchange`



This API is used to exchange a code for an access token for a plugin. This is done as often times, the plugin requires a backend service to exchange the code for an access token.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugin-auth-code-exchange
runtimePath: /plugin-auth-code-exchange
method: POST
operationId: pluginAuthCodeExchange
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugin-auth-code-exchange
post:
  operationId: pluginAuthCodeExchange
  tags:
    - Plugins
  description: >-
    This API is used to exchange a code for an access token for a plugin. This is done as often
    times, the plugin requires a backend service to exchange the code for an access token.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/PluginAuthCodeExchangeRequest.json
        example:
          pluginId: port1/principals/example
          principalId: port1/principals/example
          pluginAuthenticationData: {}
  responses:
    '202':
      description: Plugin auth code exchange started successfully, the operation is ongoing in the background.
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

- [PluginAuthCodeExchangeRequest.json](/docs/references/schemas/PluginAuthCodeExchangeRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
