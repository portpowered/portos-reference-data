# deleteRoute

DELETE `/routes`



Deletes a route

## Authorization

```yaml
path: /routes
runtimePath: /routes
method: DELETE
operationId: deleteRoute
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
delete:
  operationId: deleteRoute
  tags:
    - Routes
  description: Deletes a route
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/DeleteRouteRequest'
        example:
          id: port1/principals/example/routes/light-route
  responses:
    '200':
      description: Route deleted successfully
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
