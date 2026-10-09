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
                  $ref: /docs/references/schemas/FlowNode.json
              paginationContext:
                $ref: /docs/references/schemas/PaginationContext.json
              errors:
                type: array
                description: Partial query errors collected while returning available results.
                items:
                  $ref: /docs/references/schemas/Error.json
          example:
            key: value
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden — insufficient permissions.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '500':
      description: Internal server error.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
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

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [FlowNode.json](/docs/references/schemas/FlowNode.json)
- [PaginationContext.json](/docs/references/schemas/PaginationContext.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
