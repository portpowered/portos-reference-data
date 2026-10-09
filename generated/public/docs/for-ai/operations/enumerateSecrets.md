# enumerateSecrets

GET `/secrets`



Lists all secrets

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /secrets
runtimePath: /secrets
method: GET
operationId: enumerateSecrets
security:
  - oauth2: []
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /secrets
get:
  operationId: enumerateSecrets
  tags:
    - Secrets
  description: >-
    Lists all secrets


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: id
      in: query
      description: The ID of the secret to get
      required: false
      schema:
        type: string
    - name: owner
      in: query
      description: The owner of the secrets to get
      required: false
      schema:
        type: string
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
      description: Secrets retrieved successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateSecretsResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
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

- [EnumerateSecretsResponse.json](/docs/references/schemas/EnumerateSecretsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
