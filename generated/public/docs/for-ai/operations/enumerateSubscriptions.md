# enumerateSubscriptions

GET `/subscriptions`



Used to query for subscriptions to an event stream.


## Authorization

```yaml
path: /subscriptions
runtimePath: /subscriptions
method: GET
operationId: enumerateSubscriptions
security:
  - oauth2:
      - subscription:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /subscriptions
get:
  tags:
    - Subscriptions
  operationId: enumerateSubscriptions
  description: |
    Used to query for subscriptions to an event stream.
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateSubscriptionsResponse.json
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
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - subscription:read
    - bearerAuth: []
```

## Linked components

- [EnumerateSubscriptionsResponse.json](/docs/references/schemas/EnumerateSubscriptionsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
