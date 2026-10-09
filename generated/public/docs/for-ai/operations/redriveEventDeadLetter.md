# redriveEventDeadLetter

POST `/event-dead-letters/{id}/redrives`

Create an audited redrive of the original event

At most three redrives. Revalidates current source mapping, schema, query, destination, subscription generation and permissions. Retains occurrence identity, immutable delivery bytes, original acceptedAt/cutoff and deadline. Stale, revoked, deleted or expired records cannot be reopened; missing retained original context yields 410 RECEIPT_CONTEXT_EXPIRED.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /event-dead-letters/{id}/redrives
runtimePath: /event-dead-letters/{id}/redrives
method: POST
operationId: redriveEventDeadLetter
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /event-dead-letters/{id}/redrives
post:
  operationId: redriveEventDeadLetter
  tags:
    - Events
  summary: Create an audited redrive of the original event
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  description: >-
    At most three redrives. Revalidates current source mapping, schema, query, destination,
    subscription generation and permissions. Retains occurrence identity, immutable delivery bytes,
    original acceptedAt/cutoff and deadline. Stale, revoked, deleted or expired records cannot be
    reopened; missing retained original context yields 410 RECEIPT_CONTEXT_EXPIRED.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  responses:
    '202':
      description: Create an audited redrive of the original event
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EventRedriveResult.json
          example:
            deadLetterId: dead-letter-demo-1
            receiptId: receipt-demo-1
            status: ACCEPTED
            redriveCount: 1
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
      description: Idempotency conflict or lifecycle/generation conflict.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Idempotency conflict or lifecycle/generation conflict.
            code: CONCURRENT_MODIFICATION
            family: CONFLICT
    '410':
      description: >-
        Payload or original receipt context expired; RECEIPT_CONTEXT_EXPIRED prevents reconstruction
        with a new cutoff.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: >-
              Payload or original receipt context expired; RECEIPT_CONTEXT_EXPIRED prevents
              reconstruction with a new cutoff.
            code: NOT_FOUND
            family: NOT_FOUND
    '429':
      description: Source or tenant rate/quota exceeded; no unpersisted input is acknowledged.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Source or tenant rate/quota exceeded; no unpersisted input is acknowledged.
            code: RATE_LIMIT_EXCEEDED
            family: TOO_MANY_REQUESTS
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [EventRedriveResult.json](/docs/references/schemas/EventRedriveResult.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
