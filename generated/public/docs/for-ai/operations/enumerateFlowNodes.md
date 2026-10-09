# enumerateFlowNodes

GET `/flow-nodes`

List all flow nodes

Enumerates all flow nodes for the authenticated user.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flow-nodes
runtimePath: /flow-nodes
method: GET
operationId: enumerateFlowNodes
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flow-nodes
get:
  tags:
    - Flow Nodes
  operationId: enumerateFlowNodes
  summary: List all flow nodes
  description: >-
    Enumerates all flow nodes for the authenticated user.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  responses:
    '200':
      description: Flow nodes retrieved successfully.
      content:
        application/json:
          schema:
            type: object
            properties:
              results:
                type: array
                items:
                  $ref: '#/components/schemas/FlowNode'
              paginationContext:
                $ref: '#/components/schemas/PaginationContext'
              errors:
                type: array
                description: Partial query errors collected while returning available results.
                items:
                  $ref: '#/components/schemas/Error'
          example:
            key: value
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '500':
      description: Internal server error.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
