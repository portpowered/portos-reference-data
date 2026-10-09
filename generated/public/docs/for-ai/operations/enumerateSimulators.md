# enumerateSimulators

GET `/endpoint-simulators`

List all simulators

Lists endpoint simulators for the authenticated user. Supports pagination via `maxResults` and `nextToken` query parameters. When `owner` is not specified, defaults to the authenticated caller.
 Missing or ordinary JSON Accept selects the existing string-name projection. Explicit application/vnd.portos.simulator.v2+json selects name-value output; unsupported explicit representations fail 406. Content-Type selects request projection, independent of Accept. Legacy object names fail 400. No legacy default flip or removal is authorized.

Requires a signed user/session or the existing authenticated client flow. The anonymous DCR delegated device profile cannot invoke this operation.

## Authorization

```yaml
path: /endpoint-simulators
runtimePath: /endpoint-simulators
method: GET
operationId: enumerateSimulators
security:
  - bearerAuth: []
delegated: false
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoint-simulators
get:
  operationId: enumerateSimulators
  tags:
    - Endpoint Simulators
  summary: List all simulators
  description: >-
    Lists endpoint simulators for the authenticated user. Supports pagination via `maxResults` and
    `nextToken` query parameters. When `owner` is not specified, defaults to the authenticated
    caller.
     Missing or ordinary JSON Accept selects the existing string-name projection. Explicit application/vnd.portos.simulator.v2+json selects name-value output; unsupported explicit representations fail 406. Content-Type selects request projection, independent of Accept. Legacy object names fail 400. No legacy default flip or removal is authorized.

    Requires a signed user/session or the existing authenticated client flow. The anonymous DCR
    delegated device profile cannot invoke this operation.
  security:
    - bearerAuth: []
  parameters:
    - name: owner
      in: query
      description: >-
        The owner of the simulators to retrieve. Defaults to the authenticated caller when not
        specified.
      required: false
      schema:
        type: string
      examples:
        caller:
          value: ~caller
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 1000
      examples:
        max-results:
          value: 10
    - name: nextToken
      in: query
      description: >-
        An opaque token to retrieve the next page of results. Returned in the paginationContext of a
        previous response.
      required: false
      schema:
        type: string
    - name: expand
      in: query
      description: Expansion tokens that request related or computed fields for each result.
      required: false
      schema:
        type: array
        items:
          type: string
      style: form
      explode: false
      examples:
        include-related:
          value:
            - metadata
  responses:
    '200':
      description: Simulators retrieved successfully
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SimulatorQueryResponse'
          example:
            results: []
            paginationContext:
              nextToken: abc123
        application/vnd.portos.simulator.v2+json:
          schema:
            $ref: '#/components/schemas/SimulatorQueryResponseV2'
          example:
            results:
              - id: port1.simulator.camera-demo
                name:
                  type: PLAIN
                  value: Front door camera
                device_type: camera
                configuration:
                  eventProfile: doorbell
            errors: []
      headers:
        Vary:
          description: Response representation is selected by Accept.
          schema:
            type: string
            example: Accept
    '400':
      description: Invalid request parameters
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
