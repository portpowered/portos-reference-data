# enumerateEndpoints

GET `/endpoints`



Lists endpoints for the authenticated user and supports query-API endpoint-state retrieval. To retrieve deep endpoint state for a specific endpoint, send `id=<endpoint-id>` together with `expand=interfaces.attributes`. That expansion populates each returned endpoint's `attributes` array with deep interface attribute state. Add `forceDeviceAttributeQuery=true` to force a live device-backed attribute refresh before the response is returned.

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
    Lists endpoints for the authenticated user and supports query-API endpoint-state retrieval. To
    retrieve deep endpoint state for a specific endpoint, send `id=<endpoint-id>` together with
    `expand=interfaces.attributes`. That expansion populates each returned endpoint's `attributes`
    array with deep interface attribute state. Add `forceDeviceAttributeQuery=true` to force a live
    device-backed attribute refresh before the response is returned.
  parameters:
    - name: enablement
      in: query
      description: >-
        Collection visibility. Defaults to ENABLED. Use '*' to include all authorized endpoints, or
        DISABLED to list hidden endpoints. Exact id metadata reads ignore this filter; live
        messaging remains blocked for disabled endpoints.
      schema:
        type: string
        enum:
          - ENABLED
          - DISABLED
          - '*'
    - name: owner
      in: query
      description: The owner of the endpoints to get. Use '~caller' to get endpoints for the authenticated user
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
      description: The unique identifier of a specific endpoint to retrieve
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
      description: The next token to get the next page of results
      required: false
      schema:
        type: string
      examples:
        next-token:
          value: OPAQUE_TOKEN_FROM_PREVIOUS_RESPONSE
    - name: maxResults
      in: query
      description: The maximum number of results to return
      required: false
      schema:
        type: integer
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
        items:
          type: string
      examples:
        deep-interface-attributes:
          value: interfaces.attributes
      style: form
      explode: false
    - name: forceDeviceAttributeQuery
      in: query
      description: >-
        Forces a live device-backed attribute refresh for endpoint-state queries. This flag is only
        applied when `expand` includes `interfaces.attributes`. Send `true` to force the refresh;
        absent, invalid, or `false` values fall back to the non-forced query behavior.
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
      description: Bad request - missing required parameters
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
```

## Linked components

- [EndpointQueryResponse.json](/docs/references/schemas/EndpointQueryResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
