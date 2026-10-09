# requestFutureIntegration

POST `/integration-requests`

Join a future integration waitlist

Records explicit consent to receive updates for the selected future device or AI integration. Adds the subscriber to the provider group without removing existing groups or reactivating unsubscribed contacts.

## Authorization

```yaml
path: /integration-requests
runtimePath: /integration-requests
method: POST
operationId: requestFutureIntegration
security: []
delegated: false
resourcePermissionRequired: false
```

## Complete operation contract

```yaml
path: /integration-requests
post:
  operationId: requestFutureIntegration
  tags:
    - Plugins
  summary: Join a future integration waitlist
  description: >-
    Records explicit consent to receive updates for the selected future device or AI integration.
    Adds the subscriber to the provider group without removing existing groups or reactivating
    unsubscribed contacts.
  security: []
  requestBody:
    required: true
    content:
      application/json:
        example:
          email: person@example.test
          pluginId: port1/systems/zero/plugins/715b7b85-311f-4851-8430-88bbac6dd3e7
          consent: true
        schema:
          $ref: /docs/references/schemas/IntegrationRequest.json
  responses:
    '201':
      description: Request saved
      content:
        application/json:
          example:
            status: REQUESTED
          schema:
            type: object
            required:
              - status
            properties:
              status:
                type: string
                enum:
                  - REQUESTED
                x-enum-varnames:
                  - Requested
    '400':
      description: Invalid email, consent, or future plugin identifier
      content:
        application/json:
          example:
            message: Invalid email, consent, or future plugin identifier
            code: BAD_REQUEST
            family: BAD_REQUEST
          schema:
            $ref: /docs/references/schemas/Error.json
    '429':
      description: Too many requests; retry after the Retry-After interval
      content:
        application/json:
          example:
            message: Too many requests; retry after the Retry-After interval
            code: TOO_MANY_REQUESTS
            family: TOO_MANY_REQUESTS
          schema:
            $ref: /docs/references/schemas/Error.json
    '500':
      description: Waitlist temporarily unavailable; the client may retry
      content:
        application/json:
          example:
            message: Waitlist temporarily unavailable; the client may retry
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
          schema:
            $ref: /docs/references/schemas/Error.json
  x-portos-delegated: false
  x-portos-resource-permission: false
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [IntegrationRequest.json](/docs/references/schemas/IntegrationRequest.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
