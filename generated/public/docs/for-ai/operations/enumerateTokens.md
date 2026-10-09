# enumerateTokens

GET `/tokens`



Lists tokens owned by the authenticated principal. A principal may only list tokens they own.


Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /tokens
runtimePath: /tokens
method: GET
operationId: enumerateTokens
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /tokens
get:
  operationId: enumerateTokens
  tags:
    - Tokens
  description: >-
    Lists tokens owned by the authenticated principal. A principal may only list tokens they own.



    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: nextToken
      in: query
      description: Opaque token for the next page of results
      required: false
      schema:
        type: string
    - name: maxResults
      in: query
      description: Maximum number of results to return
      required: false
      schema:
        type: integer
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
      description: Tokens retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateTokensResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Bad request
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Bad request
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unauthorized
            code: UNAUTHORIZED
            family: AUTHENTICATION
    '403':
      description: Forbidden - not allowed to list tokens
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Forbidden - not allowed to list tokens
            code: INSUFFICIENT_PERMISSIONS
            family: PERMISSION
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
  x-portos-delegated: false
  x-portos-resource-permission: true
  security:
    - oauth2: []
    - bearerAuth: []
```

## Linked components

- [EnumerateTokensResponse.json](/docs/references/schemas/EnumerateTokensResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
