# getOAuthClient

GET `/port1/{principalType}/{principalId}/oauth-clients/{clientId}`



Retrieves details of a specific OAuth client

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
runtimePath: /{namespace}/{principalType}/{principalId}/oauth-clients/{clientId}
method: GET
operationId: getOAuthClient
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /port1/{principalType}/{principalId}/oauth-clients/{clientId}
get:
  operationId: getOAuthClient
  tags:
    - Clients
  description: >-
    Retrieves details of a specific OAuth client


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: principalType
      in: path
      required: true
      schema:
        type: string
      description: The type of principal that owns the OAuth client
    - name: principalId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the principal that owns the OAuth client
    - name: clientId
      in: path
      required: true
      schema:
        type: string
      description: The ID of the OAuth client to retrieve
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for the returned resource.
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
      description: OAuth client retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/OAuthClient.json
          example:
            clientId: port1/systems/zero/oauth-clients/1234567890
            clientName: port1/principals/example
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
    '404':
      description: OAuth client not found
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: OAuth client not found
            code: INVALID_VALUE
            family: NOT_FOUND
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

- [Error.json](/docs/references/schemas/Error.json)
- [OAuthClient.json](/docs/references/schemas/OAuthClient.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
