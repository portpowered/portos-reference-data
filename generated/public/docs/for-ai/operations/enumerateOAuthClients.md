# enumerateOAuthClients

GET `/oauth-clients`

Enumerate OAuth Clients

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
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
    - $ref: /docs/references/parameters/ExpandQuery.json
  responses:
    '200':
      description: OAuth clients retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateOAuthClientsResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Invalid request payload
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
            message: Unauthorized - invalid or missing authentication token
            code: UNAUTHORIZED
            family: AUTHENTICATION
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
  summary: Enumerate OAuth Clients
```

## Linked components

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [EnumerateOAuthClientsResponse.json](/docs/references/schemas/EnumerateOAuthClientsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
