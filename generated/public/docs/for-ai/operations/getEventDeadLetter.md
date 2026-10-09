# getEventDeadLetter

GET `/event-dead-letters/{id}`

Inspect an authorized redacted dead letter

Returns an authorized retained diagnostic with redacted metadata only. Raw event payloads, callback addresses and credentials are never returned.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /event-dead-letters/{id}
runtimePath: /event-dead-letters/{id}
method: GET
operationId: getEventDeadLetter
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /event-dead-letters/{id}
get:
  operationId: getEventDeadLetter
  tags:
    - Events
  summary: Inspect an authorized redacted dead letter
  security:
    - bearerAuth: []
  parameters:
    - name: id
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
      description: Inspect an authorized redacted dead letter
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EventDeadLetter.json
          example:
            id: dead-letter-demo-1
            stage: DELIVERY
            reasonCode: callback_unavailable
            createdAt: '2026-10-05T12:00:00Z'
            expiresAt: '2026-10-06T12:00:00Z'
            redriveCount: 0
            redriveEligible: true
            observedAt: '2026-10-05T12:00:00Z'
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
    Returns an authorized retained diagnostic with redacted metadata only. Raw event payloads,
    callback addresses and credentials are never returned.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [EventDeadLetter.json](/docs/references/schemas/EventDeadLetter.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
