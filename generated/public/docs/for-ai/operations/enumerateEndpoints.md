# enumerateEndpoints

GET `/endpoints`

Enumerate Endpoints

List the endpoints that a customer has access to. For example, you
enumerate to list the customer's lights, vacuums, or similar devices.

Endpoints contain information such as:
  1. The endpoint's name, description, and other top-level data.
  2. The capabilities the endpoint has, like power, camera, etc.
  3. The state of the endpoint.

Usage of the API is controlled by the query parameters. By default it
lists enabled endpoints owned by the authenticated user. Type and
serialNumber filters stay within that scope. An explicit owner can select
another owner's endpoints when the caller can read them.

An exact id lookup takes precedence over the owner, type, serialNumber, and
enablement filters. It can return a readable shared endpoint, including a
disabled one, but still requires endpoint-read permission.

To retrieve the state of a specific endpoint, send `id=<endpoint-id>`
together with `expand=interfaces.attributes`. Add
`forceDeviceAttributeQuery=true` to refresh that state from the device
before the response is returned.


## Authorization

```yaml
path: /endpoints
runtimePath: /endpoints
method: GET
operationId: enumerateEndpoints
security:
  - oauth2:
      - endpoint:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /endpoints
get:
  operationId: enumerateEndpoints
  tags:
    - Endpoints
  description: |
    List the endpoints that a customer has access to. For example, you
    enumerate to list the customer's lights, vacuums, or similar devices.

    Endpoints contain information such as:
      1. The endpoint's name, description, and other top-level data.
      2. The capabilities the endpoint has, like power, camera, etc.
      3. The state of the endpoint.

    Usage of the API is controlled by the query parameters. By default it
    lists enabled endpoints owned by the authenticated user. Type and
    serialNumber filters stay within that scope. An explicit owner can select
    another owner's endpoints when the caller can read them.

    An exact id lookup takes precedence over the owner, type, serialNumber, and
    enablement filters. It can return a readable shared endpoint, including a
    disabled one, but still requires endpoint-read permission.

    To retrieve the state of a specific endpoint, send `id=<endpoint-id>`
    together with `expand=interfaces.attributes`. Add
    `forceDeviceAttributeQuery=true` to refresh that state from the device
    before the response is returned.
  parameters:
    - $ref: /docs/references/parameters/EnablementQuery.json
    - $ref: /docs/references/parameters/OwnerQuery.json
    - name: id
      in: query
      description: >-
        The unique identifier of a specific endpoint to retrieve. When provided, this exact-ID
        filter takes precedence over owner, type, serialNumber and enablement filters. It can return
        a shared or disabled endpoint when the caller has endpoint-read permission.
      required: false
      schema:
        type: string
      examples:
        endpoint-id:
          value: port1/principals/example/endpoints/light-1
    - name: type
      in: query
      description: Filter endpoints by their primary type
      required: false
      schema:
        type: string
      examples:
        type-filter:
          value: LIGHT
    - name: serialNumber
      in: query
      description: Filter endpoints by their serial number
      required: false
      schema:
        type: string
      examples:
        serial-number-filter:
          value: SN-12345
    - name: nextToken
      in: query
      description: >-
        Opaque server-issued continuation token. Repeat the same selection, page size, expansion,
        force-refresh setting and authenticated grant. Modified, expired or differently bound tokens
        return 400; restart without nextToken.
      required: false
      schema:
        type: string
        minLength: 1
      examples:
        next-token:
          value: OPAQUE_TOKEN_FROM_PREVIOUS_RESPONSE
    - name: maxResults
      in: query
      description: The maximum number of results to return, from 1 through 100.
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 100
      examples:
        max-results:
          value: 10
    - name: expand
      in: query
      description: |
        Expand determines what data we retrieve for each endpoint.

        Use `interfaces.attributes` to populate each endpoint's `attributes`
        array so you can, for example, find their states.

        When omitted, the response returns only a limited set of data.
      required: false
      schema:
        type: array
        uniqueItems: true
        maxItems: 1
        items:
          type: string
          enum:
            - interfaces.attributes
      examples:
        deep-interface-attributes:
          value:
            - interfaces.attributes
      style: form
      explode: false
    - name: forceDeviceAttributeQuery
      in: query
      description: |
        Forces a live device-backed attribute refresh for endpoint-state
        queries.

        This makes Port OS call into the device to get its data, if the device
        provider does not update the state automatically.

        This flag is only applied when `expand` includes
        `interfaces.attributes`. Send `true` to force the refresh; absent or
        `false` values use stored state. Invalid values, or `true` without
        the required expansion, return 400.
      required: false
      schema:
        type: boolean
      examples:
        forced-deep-query:
          value: true
  responses:
    '200':
      description: >-
        Endpoints retrieved successfully. Responses without `expand=interfaces.attributes` return
        the default shallow endpoint shape. Responses with that expansion populate deep attribute
        state in each endpoint's `attributes` array. If endpoint enumeration succeeds but one or
        more forced deep-query items fail, the response can include an `errors` array describing
        those partial state-refresh failures; request-level failures still use HTTP error responses.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EndpointQueryResponse.json
          examples:
            partial-deep-query-failure:
              value:
                results:
                  - id: port1/principals/user123/endpoints/robot-1
                    name:
                      type: plain
                      value: Downstairs Vacuum
                    type: robotic-vacuum-cleaner
                    interfaces:
                      - name: port1/systems/zero/capability-interfaces/robotic-vacuum-cleaner
                    attributes: []
                    ownerId: port1/principals/user123
                    enablement: ENABLED
                paginationContext: {}
                errors:
                  - location: >-
                      endpoints/port1/principals/user123/endpoints/robot-1/routes/port1/principals/user123/routes/route-1
                    code: DEEP_QUERY_FAILED
                    family: INTERNAL_SERVER_ERROR
                    message: failed to rebuild stateless metadata for route
            empty:
              value:
                results:
                  - id: port1/principals/example/endpoints/light-1
                    name:
                      type: PLAIN
                      value: Office light
                    type: LIGHT
                    interfaces: []
                    ownerId: port1/principals/example
                    enablement: ENABLED
    '400':
      description: Missing or malformed endpoint query parameters
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Bad request - missing required parameters
            code: BAD_REQUEST
            family: BAD_REQUEST
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: Unauthorized - invalid or missing authentication token
            code: UNAUTHORIZED
            family: AUTHENTICATION
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
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
  summary: Enumerate Endpoints
```

## Linked components

- [EnablementQuery.json](/docs/references/parameters/EnablementQuery.json)
- [OwnerQuery.json](/docs/references/parameters/OwnerQuery.json)
- [EndpointQueryResponse.json](/docs/references/schemas/EndpointQueryResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
