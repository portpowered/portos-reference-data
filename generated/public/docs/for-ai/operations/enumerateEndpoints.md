# enumerateEndpoints

GET `/endpoints`

Enumerate Endpoints

Lists enabled endpoints owned by the authenticated user by default. Type and serialNumber filters remain within that caller-owned scope. An explicit owner can select another owner's endpoints when they are readable by the caller. An exact id lookup takes precedence over owner, type, serialNumber, and enablement filters; it can return a readable shared endpoint, including disabled endpoint metadata, but still requires endpoint-read permission. To retrieve deep endpoint state for a specific endpoint, send `id=<endpoint-id>` together with `expand=interfaces.attributes`. That expansion populates each returned endpoint's `attributes` array with deep interface attribute state. Add `forceDeviceAttributeQuery=true` to force a live device-backed attribute refresh before the response is returned. The filters and pagination use the shared authorized endpoint query service.

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
  description: >-
    Lists enabled endpoints owned by the authenticated user by default. Type and serialNumber
    filters remain within that caller-owned scope. An explicit owner can select another owner's
    endpoints when they are readable by the caller. An exact id lookup takes precedence over owner,
    type, serialNumber, and enablement filters; it can return a readable shared endpoint, including
    disabled endpoint metadata, but still requires endpoint-read permission. To retrieve deep
    endpoint state for a specific endpoint, send `id=<endpoint-id>` together with
    `expand=interfaces.attributes`. That expansion populates each returned endpoint's `attributes`
    array with deep interface attribute state. Add `forceDeviceAttributeQuery=true` to force a live
    device-backed attribute refresh before the response is returned. The filters and pagination use
    the shared authorized endpoint query service.
  parameters:
    - name: enablement
      in: query
      description: >-
        Collection visibility within the selected owner scope. Defaults to ENABLED. Use '*' to
        include both enabled and disabled endpoints, or DISABLED to list disabled endpoints. An
        exact id metadata read ignores this filter and can return a disabled endpoint when readable;
        live messaging remains blocked for disabled endpoints.
      schema:
        type: string
        enum:
          - ENABLED
          - DISABLED
          - '*'
    - name: owner
      in: query
      description: >-
        Owner of the endpoints to get. Defaults to the authenticated user's endpoints. Use '~caller'
        to make that scope explicit; another owner can be selected only for endpoints readable by
        the caller.
      required: false
      schema:
        type: string
      examples:
        check-token:
          value: ~caller
        check-id:
          value: port1/principals/example
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
      description: >-
        Comma-separated expansion tokens. Use `interfaces.attributes` to populate each endpoint's
        `attributes` array with deep interface attribute state. When omitted, the response keeps the
        default shallow endpoint shape and does not populate deep attribute payloads.
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
      description: >-
        Forces a live device-backed attribute refresh for endpoint-state queries. This flag is only
        applied when `expand` includes `interfaces.attributes`. Send `true` to force the refresh;
        absent or `false` values use stored state. Invalid values, or `true` without the required
        expansion, return 400.
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

- [EndpointQueryResponse.json](/docs/references/schemas/EndpointQueryResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
