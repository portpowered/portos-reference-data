# redriveEventDeadLetter

POST `/event-dead-letters/{id}/redrives`

Create an audited redrive of the original event

At most three redrives. Revalidates current source mapping, schema, query, destination, subscription generation and permissions. Retains occurrence identity, immutable delivery bytes, original acceptedAt/cutoff and deadline. Stale, revoked, deleted or expired records cannot be reopened; missing retained original context yields 410 receipt_context_expired.

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
    reopened; missing retained original context yields 410 receipt_context_expired.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  responses:
    '202':
      description: Create an audited redrive of the original event
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EventRedriveResult'
          example:
            deadLetterId: dead-letter-demo-1
            receiptId: receipt-demo-1
            status: accepted
            redriveCount: 1
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
      description: Idempotency conflict or lifecycle/generation conflict.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Idempotency conflict or lifecycle/generation conflict.
            type: CONCURRENT_MODIFICATION
            family: CONFLICT
            code: event_request_failed
    '410':
      description: >-
        Payload or original receipt context expired; receipt_context_expired prevents reconstruction
        with a new cutoff.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: >-
              Payload or original receipt context expired; receipt_context_expired prevents
              reconstruction with a new cutoff.
            type: NOT_FOUND
            family: NOT_FOUND
            code: event_request_failed
    '429':
      description: Source or tenant rate/quota exceeded; no unpersisted input is acknowledged.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Source or tenant rate/quota exceeded; no unpersisted input is acknowledged.
            type: RATE_LIMIT_EXCEEDED
            family: TOO_MANY_REQUESTS
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
