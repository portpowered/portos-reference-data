# enumerateEventDeadLetters

GET `/event-dead-letters`

List authorized redacted event dead letters

Tenant/operator scope; unresolved provider diagnostics require provider operator authorization. Uses opaque cursors.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /event-dead-letters
runtimePath: /event-dead-letters
method: GET
operationId: enumerateEventDeadLetters
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /event-dead-letters
get:
  operationId: enumerateEventDeadLetters
  tags:
    - Events
  summary: List authorized redacted event dead letters
  security:
    - bearerAuth: []
  description: >-
    Tenant/operator scope; unresolved provider diagnostics require provider operator authorization.
    Uses opaque cursors.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  parameters:
    - name: nextToken
      in: query
      required: false
      schema:
        type: string
    - name: maxResults
      in: query
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 1000
    - name: query
      in: query
      required: false
      description: >-
        Shared Port OS Query encoded as JSON. Evaluated only over authorized redacted diagnostic
        fields.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Query'
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
      description: List authorized redacted event dead letters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/EventDeadLetterQueryResponse'
          example:
            results: []
            errors: []
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
