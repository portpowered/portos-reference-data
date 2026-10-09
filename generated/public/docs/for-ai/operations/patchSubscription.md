# patchSubscription

PATCH `/{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}`

Edit an authorized subscription label

Changes the label only. Preserves the ID, original host arguments, query, target, generation and activation sequence. Refresh and unsubscribe continue to resolve the original host identity.

## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
runtimePath: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
method: PATCH
operationId: patchSubscription
security:
  - oauth2:
      - subscription:write
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
patch:
  operationId: patchSubscription
  tags:
    - Subscriptions
  summary: Edit an authorized subscription label
  security:
    - oauth2:
        - subscription:write
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
  responses:
    '200':
      description: Edit an authorized subscription label
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
    '409':
      description: >-
        subscription_identity_immutable: request attempts to change monitoring identity. Existing
        binding and queued jobs are untouched.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: >-
              subscription_identity_immutable: request attempts to change monitoring identity.
              Existing binding and queued jobs are untouched.
            code: CONCURRENT_MODIFICATION
            family: CONFLICT
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
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/PatchSubscriptionRequest.json
        example:
          name:
            type: PLAIN
            value: Front door camera
  description: >-
    Changes the label only. Preserves the ID, original host arguments, query, target, generation and
    activation sequence. Refresh and unsubscribe continue to resolve the original host identity.
  x-portos-delegated: true
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [PatchSubscriptionRequest.json](/docs/references/schemas/PatchSubscriptionRequest.json)
- [Subscription.json](/docs/references/schemas/Subscription.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
