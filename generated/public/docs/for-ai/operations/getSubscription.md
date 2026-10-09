# getSubscription

GET `/{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}`

Inspect an authorized subscription

Returns the authorized canonical subscription. The verified MCP target is a same-ID binding reference; callback credentials and URL are never included.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
runtimePath: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
method: GET
operationId: getSubscription
security:
  - oauth2:
      - subscription:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
get:
  operationId: getSubscription
  tags:
    - Subscriptions
  summary: Inspect an authorized subscription
  security:
    - oauth2:
        - subscription:read
    - bearerAuth: []
  parameters:
    - name: namespace
      required: true
      in: path
      schema:
        type: string
      description: The namespace of the principal
    - name: principalType
      required: true
      in: path
      schema:
        type: string
      description: The type of principal
    - name: principalId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the principal
    - name: subscriptionId
      required: true
      in: path
      schema:
        type: string
      description: The ID of the subscription to delete
    - name: expand
      in: query
      required: false
      description: >-
        Expansion tokens. This projection has no expandable relationships; omit or supply an empty
        array. Non-empty tokens are rejected.
      schema:
        type: array
        maxItems: 0
        items:
          type: string
      style: form
      explode: false
      example: []
  responses:
    '200':
      description: Inspect an authorized subscription
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Subscription.json
          example:
            id: port1.subscription.camera-demo
            query:
              match:
                key: endpoint.id
                value: port1.endpoint.camera-demo
            target:
              type: MCP_EVENT_BINDING
              id: port1.subscription.camera-demo
            name:
              type: PLAIN
              value: Front door camera
            status: ACTIVE
    '400':
      description: Invalid request; stable code identifies the validation failure.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request; stable code identifies the validation failure.
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Authentication required.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required.
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Resource authorization denied.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource authorization denied.
            code: FORBIDDEN
            family: FORBIDDEN
    '404':
      description: Resource inaccessible, missing or past retention.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Resource inaccessible, missing or past retention.
            code: NOT_FOUND
            family: NOT_FOUND
    '500':
      description: Internal failure.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal failure.
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  description: >-
    Returns the authorized canonical subscription. The verified MCP target is a same-ID binding
    reference; callback credentials and URL are never included.
  x-portos-delegated: true
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [Subscription.json](/docs/references/schemas/Subscription.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
