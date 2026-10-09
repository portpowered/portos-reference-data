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
          $ref: /docs/references/schemas/DeleteRouteRequest.json
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

## Linked components

- [DeleteRouteRequest.json](/docs/references/schemas/DeleteRouteRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
