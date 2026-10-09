# enumerateFlowNodeSpecifications

GET `/flow-node-specifications`

List flow node specifications

Lists all available flow node specifications for the authenticated user.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /flow-node-specifications
runtimePath: /flow-node-specifications
method: GET
operationId: enumerateFlowNodeSpecifications
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /flow-node-specifications
get:
  operationId: enumerateFlowNodeSpecifications
  tags:
    - Flow Node Specifications
  summary: List flow node specifications
  description: >-
    Lists all available flow node specifications for the authenticated user.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  parameters:
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
      description: Flow node specifications retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateFlowNodeSpecificationsResponse'
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
            message: Bad request - missing required parameters
            type: BAD_REQUEST
            family: BAD_REQUEST
            code: bad-request
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Unauthorized - invalid or missing authentication token
            type: UNAUTHORIZED
            family: AUTHENTICATION
            code: unauthorized
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
