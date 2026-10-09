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
    - name: owner
      in: query
      description: >-
        The owner of the group routes to get. Use '~caller' to get group routes for the
        authenticated user
      required: true
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
        check-id:
          value: port1/user/alice/user/alice
    - name: nextToken
      in: query
      description: The next token to get the next page of results
      required: false
      schema:
        type: string
      examples:
        next-token:
          value: '123'
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
      examples:
        max-results:
          value: 10
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
  responses:
    '200':
      description: Group routes retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateGroupRoutesResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request - missing required parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: true
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
