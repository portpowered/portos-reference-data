# deleteEventDeadLetter

DELETE `/event-dead-letters/{id}`

Delete an authorized dead letter

Idempotent diagnostic deletion. Does not alter subscription identity or emit an event.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /event-dead-letters/{id}
runtimePath: /event-dead-letters/{id}
method: DELETE
operationId: deleteEventDeadLetter
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /event-dead-letters/{id}
delete:
  operationId: deleteEventDeadLetter
  tags:
    - Events
  summary: Delete an authorized dead letter
  security:
    - bearerAuth: []
  parameters:
    - name: id
      in: path
      required: true
      schema:
        type: string
  description: >-
    Idempotent diagnostic deletion. Does not alter subscription identity or emit an event.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  responses:
    '204':
      description: Delete an authorized dead letter
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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
