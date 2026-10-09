# authorize

POST `/auth/authorize`

OAuth2 Authorization

This API is used by your website/browser/user-agent to obtain authorization for port OS resources from the resource owner via user-agent redirection. 


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /auth/authorize
runtimePath: /auth/authorize
method: POST
operationId: authorize
security:
  - {}
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /auth/authorize
post:
  tags:
    - Auth
  summary: OAuth2 Authorization
  description: >-
    This API is used by your website/browser/user-agent to obtain authorization for port OS
    resources from the resource owner via user-agent redirection. 



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  operationId: authorize
  security:
    - {}
  responses:
    '201':
      description: Token Created
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Token'
          example:
            key: value
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
