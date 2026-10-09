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
            $ref: /docs/references/schemas/Query.json
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
            $ref: /docs/references/schemas/EventDeadLetterQueryResponse.json
          example:
            results: []
            errors: []
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
- [EventDeadLetterQueryResponse.json](/docs/references/schemas/EventDeadLetterQueryResponse.json)
- [Query.json](/docs/references/schemas/Query.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
