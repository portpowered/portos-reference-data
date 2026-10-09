# enumerateViews

GET `/views`



Enumerate views for a principal.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /views
runtimePath: /views
method: GET
operationId: enumerateViews
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /views
get:
  tags:
    - Views
  operationId: enumerateViews
  description: >-
    Enumerate views for a principal.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
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
        minimum: 1
        maximum: 1000
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
      description: Views retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateViewsResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
