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
          $ref: /docs/references/schemas/UpsertSimulatorRequest.json
        example:
          name: Demo front door
          device_type: CAMERA
          configuration:
            eventProfile: DOORBELL
      application/vnd.portos.simulator.v2+json:
        schema:
          $ref: /docs/references/schemas/UpsertSimulatorRequestV2.json
        example:
          name:
            type: PLAIN
            value: Demo front door
          device_type: CAMERA
          configuration:
            eventProfile: DOORBELL
  responses:
    '200':
      description: Simulator upserted successfully
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Simulator.json
          example:
            device_type: LIGHT
            id: port1.simulator.example
            name: Example device
        application/vnd.portos.simulator.v2+json:
          schema:
            $ref: /docs/references/schemas/SimulatorV2.json
          example:
            id: port1.simulator.camera-demo
            name:
              type: PLAIN
              value: Front door camera
            device_type: CAMERA
            configuration:
              eventProfile: DOORBELL
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
            $ref: /docs/references/schemas/Error.json
          example:
            message: Invalid request payload
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Authentication required
            code: UNAUTHORIZED
            family: UNAUTHORIZED
    '403':
      description: Forbidden - insufficient permissions
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Insufficient permissions
            code: FORBIDDEN
            family: FORBIDDEN
    '406':
      description: Unsupported explicitly requested representation.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unsupported explicitly requested representation.
            code: BAD_REQUEST
            family: BAD_REQUEST
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
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Internal server error
            code: INTERNAL
            family: INTERNAL_SERVER_ERROR
  x-portos-delegated: false
  x-portos-resource-permission: true
```

## Linked components

- [Error.json](/docs/references/schemas/Error.json)
- [Simulator.json](/docs/references/schemas/Simulator.json)
- [SimulatorV2.json](/docs/references/schemas/SimulatorV2.json)
- [UpsertSimulatorRequest.json](/docs/references/schemas/UpsertSimulatorRequest.json)
- [UpsertSimulatorRequestV2.json](/docs/references/schemas/UpsertSimulatorRequestV2.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
