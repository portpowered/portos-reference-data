# queryFlows

GET `/flows`

List flows

Queries for flows. Supports filtering by owner and ID, and pagination via nextToken and maxResults.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flows
runtimePath: /flows
method: GET
operationId: queryFlows
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flows
get:
  tags:
    - Flows
  operationId: queryFlows
  summary: List flows
  description: >-
    Queries for flows. Supports filtering by owner and ID, and pagination via nextToken and
    maxResults.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  parameters:
    - name: owner
      in: query
      required: false
      schema:
        type: string
      description: Filter flows by owner.
    - name: id
      in: query
      required: false
      schema:
        type: string
      description: Filter flows by ID.
    - name: nextToken
      in: query
      required: false
      schema:
        type: string
      description: Token for paginating through results.
    - name: maxResults
      in: query
      required: false
      schema:
        type: integer
      description: Maximum number of results to return.
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
      description: OK
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/QueryFlowsResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [QueryFlowsResponse.json](/docs/references/schemas/QueryFlowsResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
