# enumerateSubscriptions

GET `/subscriptions`

Enumerate Subscriptions

Lists subscriptions owned by the authenticated caller when owner is omitted. Supplying owner selects that owner's subscriptions, filtered by the caller's SubscriptionRead permissions. Supplying id selects the exact subscription and still applies its read permission. The default page size is 10 and the maximum is 100; results use nextToken pagination.

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
  description: >-
    Lists subscriptions owned by the authenticated caller when owner is omitted. Supplying owner
    selects that owner's subscriptions, filtered by the caller's SubscriptionRead permissions.
    Supplying id selects the exact subscription and still applies its read permission. The default
    page size is 10 and the maximum is 100; results use nextToken pagination.
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
    '400':
      description: Invalid query parameter.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: maxResults must be between 1 and 100; choose a value in that range and retry.
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized — invalid or missing authentication token.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: The authentication token is missing or invalid; sign in with a valid token and retry.
            code: UNAUTHORIZED
            family: AUTHENTICATION
    '403':
      description: Forbidden — insufficient permissions for the requested owner.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: >-
              You cannot read subscriptions for the requested owner; choose an owner you can access
              or request read permission.
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
  parameters:
    - name: id
      in: query
      description: Exact subscription ID to retrieve, subject to the caller's read permission.
      required: false
      schema:
        type: string
    - name: owner
      in: query
      description: >-
        Owner whose subscriptions to list. Defaults to the authenticated caller when omitted. A
        different owner is permitted only for subscriptions the caller can read.
      required: false
      schema:
        type: string
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
      description: Maximum number of results to return. Defaults to 10 and cannot exceed 100.
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 100
      examples:
        page-size:
          value: 50
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - subscription:read
    - bearerAuth: []
  summary: Enumerate Subscriptions
```

## Linked components

- [EnumerateSubscriptionsResponse.json](/docs/references/schemas/EnumerateSubscriptionsResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
