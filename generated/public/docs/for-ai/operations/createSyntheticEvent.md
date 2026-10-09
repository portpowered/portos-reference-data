# createSyntheticEvent

POST `/events`

Admit an authenticated synthetic simulator event

Requires enabled demonstration environment, endpoint access and simulator write authorization. Rejects production endpoints and caller-supplied source/tenant/credential/occurrence identity. Durable 202 admission is idempotent by requestId and semantic input; immediate processing may attempt delivery during the request.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /events
runtimePath: /events
method: POST
operationId: createSyntheticEvent
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /events
post:
  operationId: createSyntheticEvent
  tags:
    - Events
  summary: Admit an authenticated synthetic simulator event
  security:
    - bearerAuth: []
  description: >-
    Requires enabled demonstration environment, endpoint access and simulator write authorization.
    Rejects production endpoints and caller-supplied source/tenant/credential/occurrence identity.
    Durable 202 admission is idempotent by requestId and semantic input; immediate processing may
    attempt delivery during the request.


    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: /docs/references/schemas/SyntheticEventRequest.json
        example:
          requestId: camera-motion-demo-1
          endpoint:
            id: port1.endpoint.camera-demo
          header:
            namespace: port1/systems/zero/capability-interfaces/motion-sensor
            name: motion-detected
            version: '1.0'
          body:
            value: DETECTED
  responses:
    '202':
      description: Admit an authenticated synthetic simulator event
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/SyntheticEventAccepted.json
          example:
            receiptId: receipt-demo-1
            eventId: event-demo-1
            endpointId: port1.endpoint.camera-demo
            status: ACCEPTED
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
    '413':
      description: Encoded admission exceeds the 64 KiB limit.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Encoded admission exceeds the 64 KiB limit.
            code: FILE_TOO_LARGE
            family: PAYLOAD_TOO_LARGE
    '415':
      description: Unsupported request media type.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unsupported request media type.
            code: BAD_REQUEST
            family: BAD_REQUEST
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
    '503':
      description: Retryable storage/admission failure; input not durably accepted.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Retryable storage/admission failure; input not durably accepted.
            code: STORAGE_UNAVAILABLE
            family: SERVICE_UNAVAILABLE
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [SyntheticEventAccepted.json](/docs/references/schemas/SyntheticEventAccepted.json)
- [SyntheticEventRequest.json](/docs/references/schemas/SyntheticEventRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
