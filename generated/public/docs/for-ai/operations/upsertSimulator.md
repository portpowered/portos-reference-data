# upsertSimulator

POST `/endpoint-simulators`

Create or update a simulator

Creates a new endpoint simulator or updates an existing one. When an `id` is provided in the request body, the simulator with that ID is updated. When no `id` is provided, a new simulator is created along with its associated endpoint, auth link, and route.
 Missing or ordinary JSON Accept selects the existing string-name projection. Explicit application/vnd.portos.simulator.v2+json selects name-value output; unsupported explicit representations fail 406. Content-Type selects request projection, independent of Accept. Legacy object names fail 400. No legacy default flip or removal is authorized.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /endpoint-simulators
runtimePath: /endpoint-simulators
method: POST
operationId: upsertSimulator
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-simulators
post:
  operationId: upsertSimulator
  tags:
    - Endpoint Simulators
  summary: Create or update a simulator
  description: >-
    Creates a new endpoint simulator or updates an existing one. When an `id` is provided in the
    request body, the simulator with that ID is updated. When no `id` is provided, a new simulator
    is created along with its associated endpoint, auth link, and route.
     Missing or ordinary JSON Accept selects the existing string-name projection. Explicit application/vnd.portos.simulator.v2+json selects name-value output; unsupported explicit representations fail 406. Content-Type selects request projection, independent of Accept. Legacy object names fail 400. No legacy default flip or removal is authorized.

    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/UpsertSimulatorRequest'
        example:
          name: Demo front door
          device_type: camera
          configuration:
            eventProfile: doorbell
      application/vnd.portos.simulator.v2+json:
        schema:
          $ref: '#/components/schemas/UpsertSimulatorRequestV2'
        example:
          name:
            type: PLAIN
            value: Demo front door
          device_type: camera
          configuration:
            eventProfile: doorbell
  responses:
    '200':
      description: Simulator upserted successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Simulator'
        application/vnd.portos.simulator.v2+json:
          schema:
            $ref: '#/components/schemas/SimulatorV2'
          example:
            id: port1.simulator.camera-demo
            name:
              type: PLAIN
              value: Front door camera
            device_type: camera
            configuration:
              eventProfile: doorbell
      headers:
        Vary:
          description: Response representation is selected by Accept.
          schema:
            type: string
            example: Accept
    '400':
      description: Invalid request payload
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Invalid request payload
            type: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Authentication required
            type: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Insufficient permissions
            type: FORBIDDEN
    '406':
      description: Unsupported explicitly requested representation.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Unsupported explicitly requested representation.
            type: BAD_REQUEST
            family: BAD_REQUEST
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
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL
  x-portos-delegated: false
  x-portos-resource-permission: true
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
