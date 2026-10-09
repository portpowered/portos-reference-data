# enumerateOAuthClients

GET `/oauth-clients`



Lists all OAuth clients for the authenticated user

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /oauth-clients
runtimePath: /oauth-clients
method: GET
operationId: enumerateOAuthClients
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /oauth-clients
get:
  operationId: enumerateOAuthClients
  tags:
    - Clients
  description: >-
    Lists all OAuth clients for the authenticated user


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: nextToken
      in: query
      description: The next token to get the next page of results
      required: false
      schema:
        type: string
    - name: maxResults
      in: query
      description: The maximum number of results to return
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
      description: OAuth clients retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EnumerateOAuthClientsResponse'
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
  security:
    - oauth2: []
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
