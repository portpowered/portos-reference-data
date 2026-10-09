# upsertRoute

POST `/routes`



Creates or updates a route

## Authorization

```yaml
path: /routes
runtimePath: /routes
method: POST
operationId: upsertRoute
security:
  - oauth2:
      - endpoint:write
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /routes
post:
  operationId: upsertRoute
  tags:
    - Routes
  description: Creates or updates a route
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertRouteRequest'
  responses:
    '200':
      description: Route upserted successfully
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:write
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
