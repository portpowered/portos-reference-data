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
    '409':
      description: >-
        subscription_identity_immutable: request attempts to change monitoring identity. Existing
        binding and queued jobs are untouched.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: >-
              subscription_identity_immutable: request attempts to change monitoring identity.
              Existing binding and queued jobs are untouched.
            type: CONCURRENT_MODIFICATION
            family: CONFLICT
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
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatchSubscriptionRequest'
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

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
