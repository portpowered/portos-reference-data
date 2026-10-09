# deleteSubscription

DELETE `/{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}`



Delete a subscription.


## Authorization

```yaml
path: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
runtimePath: /{namespace}/{principalType}/{principalId}/subscriptions/{subscriptionId}
method: DELETE
operationId: deleteSubscription
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
delete:
  tags:
    - Subscriptions
  operationId: deleteSubscription
  description: |
    Delete a subscription.
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
      description: Subscription deleted successfully
    '400':
      description: Invalid request payload
    '500':
      description: Internal server error
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - subscription:write
    - bearerAuth: []
```

## Linked components

This operation uses inline schemas.

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
