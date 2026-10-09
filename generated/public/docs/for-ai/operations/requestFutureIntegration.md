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
          $ref: '#/components/schemas/IntegrationRequest'
  responses:
    '201':
      description: Request saved
      content:
        application/json:
          example:
            status: requested
          schema:
            type: object
            required:
              - status
            properties:
              status:
                type: string
                enum:
                  - requested
    '400':
      description: Invalid email, consent, or future plugin identifier
      content:
        application/json:
          example:
            message: Invalid email, consent, or future plugin identifier
            type: BAD_REQUEST
            family: BAD_REQUEST
          schema:
            $ref: '#/components/schemas/Error'
    '429':
      description: Too many requests; retry after the Retry-After interval
      content:
        application/json:
          example:
            message: Too many requests; retry after the Retry-After interval
            type: TOO_MANY_REQUESTS
            family: TOO_MANY_REQUESTS
          schema:
            $ref: '#/components/schemas/Error'
    '500':
      description: Waitlist temporarily unavailable; the client may retry
      content:
        application/json:
          example:
            message: Waitlist temporarily unavailable; the client may retry
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
          schema:
            $ref: '#/components/schemas/Error'
  x-portos-delegated: false
  x-portos-resource-permission: false
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
