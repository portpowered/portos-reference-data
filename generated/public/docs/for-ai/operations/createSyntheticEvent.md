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
          $ref: '#/components/schemas/SyntheticEventRequest'
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
            $ref: '#/components/schemas/SyntheticEventAccepted'
          example:
            receiptId: receipt-demo-1
            eventId: event-demo-1
            endpointId: port1.endpoint.camera-demo
            status: accepted
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
    '413':
      description: Encoded admission exceeds the 64 KiB limit.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Encoded admission exceeds the 64 KiB limit.
            type: FILE_TOO_LARGE
            family: PAYLOAD_TOO_LARGE
            code: event_request_failed
    '415':
      description: Unsupported request media type.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Unsupported request media type.
            type: BAD_REQUEST
            family: BAD_REQUEST
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
    '503':
      description: Retryable storage/admission failure; input not durably accepted.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Retryable storage/admission failure; input not durably accepted.
            type: STORAGE_UNAVAILABLE
            family: SERVICE_UNAVAILABLE
            code: event_request_failed
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
