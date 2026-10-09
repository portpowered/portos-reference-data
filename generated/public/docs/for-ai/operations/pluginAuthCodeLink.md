# pluginAuthCodeLink

POST `/plugin-auth-code-link`



Start code-based linking. Private vendor codes and tokens are retained on the server. Complete through plugin-auth-code-exchange using pluginAuthenticationData.sessionId.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /plugin-auth-code-link
runtimePath: /plugin-auth-code-link
method: POST
operationId: pluginAuthCodeLink
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /plugin-auth-code-link
post:
  operationId: pluginAuthCodeLink
  tags:
    - Plugins
  description: >-
    Start code-based linking. Private vendor codes and tokens are retained on the server. Complete
    through plugin-auth-code-exchange using pluginAuthenticationData.sessionId.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PluginAuthCodeLinkRequest'
        example:
          pluginId: port1/systems/zero/plugins/b220efd5-d59e-44cb-8ecd-57a98d4df48b
          principalId: ~self
  responses:
    '200':
      description: Linking session started; this does not mean the account is connected.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PluginAuthCodeLinkResponse'
          example:
            sessionId: example-session
            userCode: ABCD
            verificationUri: https://www.amazon.com/code
            expiresIn: 300
    '400':
      description: Invalid request or plugin does not support code-based linking.
    '401':
      description: Authentication required.
    '403':
      description: Plugin linking permission denied.
    '500':
      description: Linking service failed.
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
