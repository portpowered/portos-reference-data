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
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
