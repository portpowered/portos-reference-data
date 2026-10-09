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
            $ref: '#/components/schemas/Subscription'
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
            status: active
    '400':
      description: Invalid request; stable code identifies the validation failure.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request; stable code identifies the validation failure.
            type: BAD_REQUEST
            family: BAD_REQUEST
            code: event_request_failed
    '401':
      description: Authentication required.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required.
            type: UNAUTHORIZED
            family: UNAUTHORIZED
            code: event_request_failed
    '403':
      description: Resource authorization denied.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource authorization denied.
            type: FORBIDDEN
            family: FORBIDDEN
            code: event_request_failed
    '404':
      description: Resource inaccessible, missing or past retention.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Resource inaccessible, missing or past retention.
            type: NOT_FOUND
            family: NOT_FOUND
            code: event_request_failed
    '500':
      description: Internal failure.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal failure.
            type: INTERNAL
            family: INTERNAL_SERVER_ERROR
            code: event_request_failed
  description: >-
    Returns the authorized canonical subscription. The verified MCP target is a same-ID binding
    reference; callback credentials and URL are never included.
  x-portos-delegated: true
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
