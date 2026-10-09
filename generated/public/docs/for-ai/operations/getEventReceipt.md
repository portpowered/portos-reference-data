# getEventReceipt

GET `/events/receipts/{receiptId}`

Read an authorized retained event receipt

Requires source endpoint read permission for processing metadata and event/subscription read permission for delivery details. Includes only inspectable subscriptions. Returns 410 for an authorized expired receipt and 404 for inaccessible or physically removed records; detail TTL is enforced on access.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /events/receipts/{receiptId}
runtimePath: /events/receipts/{receiptId}
method: GET
operationId: getEventReceipt
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /events/receipts/{receiptId}
get:
  operationId: getEventReceipt
  tags:
    - Events
  summary: Read an authorized retained event receipt
  security:
    - bearerAuth: []
  description: >-
    Requires source endpoint read permission for processing metadata and event/subscription read
    permission for delivery details. Includes only inspectable subscriptions. Returns 410 for an
    authorized expired receipt and 404 for inaccessible or physically removed records; detail TTL is
    enforced on access.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: receiptId
      in: path
      required: true
      schema:
        type: string
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
      description: Read an authorized retained event receipt
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EventReceipt.json
          example:
            id: receipt-demo-1
            receiptId: receipt-demo-1
            eventId: event-demo-1
            endpointId: port1.endpoint.camera-demo
            status: COMPLETED
            acceptedAt: '2026-10-05T12:00:00Z'
            observedAt: '2026-10-05T12:00:00Z'
            eventIds:
              - event-demo-1
            deliveryDetail: AVAILABLE
            deliveries: []
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
    '410':
      description: Authorized receipt context has expired.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authorized receipt context has expired.
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
    '503':
      description: Retryable receipt storage failure.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Retryable receipt storage failure.
            code: STORAGE_UNAVAILABLE
            family: SERVICE_UNAVAILABLE
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [EventReceipt.json](/docs/references/schemas/EventReceipt.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
