# getRoutes

GET `/routes`

Get Routes

API to enumerate the routes that a principal has permissions to. The returned route `id` is the persisted Port OS route identifier. For routes created through synchronization, use `associatedPluginRouteId` to match the stable plugin-owned or fixture route identity from the discovery payload.


## Authorization

```yaml
path: /routes
runtimePath: /routes
method: GET
operationId: getRoutes
security:
  - oauth2:
      - endpoint:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /routes
get:
  tags:
    - Routes
  operationId: getRoutes
  summary: Get Routes
  description: >
    API to enumerate the routes that a principal has permissions to. The returned route `id` is the
    persisted Port OS route identifier. For routes created through synchronization, use
    `associatedPluginRouteId` to match the stable plugin-owned or fixture route identity from the
    discovery payload.
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateRoutesResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
  parameters:
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for each result.
      required: false
      schema:
        type: array
        items:
          type: string
      style: form
      explode: false
      examples:
        include-related:
          value:
            - metadata
    - name: nextToken
      in: query
      description: Opaque cursor token returned by a previous query response.
      required: false
      schema:
        type: string
      examples:
        next-page:
          value: abc123
    - name: maxResults
      in: query
      description: Maximum number of results to return.
      required: false
      schema:
        type: integer
      examples:
        page-size:
          value: 50
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
