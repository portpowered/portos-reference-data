# enumerateGroupRoutes

GET `/group-routes`

List group routes

API to enumerate the group routes that a principal has permissions to.


## Authorization

```yaml
path: /group-routes
runtimePath: /group-routes
method: GET
operationId: enumerateGroupRoutes
security:
  - oauth2:
      - group:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /group-routes
get:
  tags:
    - Endpoint Group Routes
  operationId: enumerateGroupRoutes
  summary: List group routes
  description: |
    API to enumerate the group routes that a principal has permissions to.
  security:
    - oauth2:
        - group:read
    - bearerAuth: []
  parameters:
    - $ref: /docs/references/parameters/OwnerQuery.json
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - $ref: /docs/references/parameters/MaxResultsQuery.json
    - $ref: /docs/references/parameters/ExpandQuery.json
  responses:
    '200':
      description: Group routes retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateGroupRoutesResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing required parameters
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
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
  x-portos-delegated: true
  x-portos-resource-permission: true
```

## Linked components

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [MaxResultsQuery.json](/docs/references/parameters/MaxResultsQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [OwnerQuery.json](/docs/references/parameters/OwnerQuery.json)
- [EnumerateGroupRoutesResponse.json](/docs/references/schemas/EnumerateGroupRoutesResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
