# upsertSubscription

POST `/subscriptions`



Used to upsert a subscription to an event stream.


## Authorization

```yaml
path: /subscriptions
runtimePath: /subscriptions
method: POST
operationId: upsertSubscription
security:
  - oauth2:
      - subscription:write
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /subscriptions
post:
  tags:
    - Subscriptions
  operationId: upsertSubscription
  description: |
    Used to upsert a subscription to an event stream.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/UpsertSubscriptionRequest.json
        example:
          name:
            type: PLAIN
            value: My Resource
  responses:
    '200':
      description: OK, this confirms a subscription occurs, this is eventually consistent and is not guarantee
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/UpsertSubscriptionResponse.json
          example:
            id: port1/principals/user123/resources/abc-123
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

- [UpsertSubscriptionRequest.json](/docs/references/schemas/UpsertSubscriptionRequest.json)
- [UpsertSubscriptionResponse.json](/docs/references/schemas/UpsertSubscriptionResponse.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
