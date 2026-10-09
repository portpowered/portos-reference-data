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
          value: port1/user/alice/user/alice
    - name: id
      in: query
      description: The unique identifier of a specific endpoint to retrieve
      required: false
      schema:
        type: string
      examples:
        endpoint-id:
          value: port1/user/alice/endpoints/abc-123
    - name: type
      in: query
      description: Filter endpoints by their primary type
      required: false
      schema:
        type: string
      examples:
        type-filter:
          value: light
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
          value: '123'
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
            $ref: '#/components/schemas/EndpointQueryResponse'
          examples: {}
    '400':
      description: Bad request - missing required parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Bad request - missing required parameters
            type: BAD_REQUEST
            family: BAD_REQUEST
            code: bad-request
    '401':
      description: Unauthorized - invalid or missing authentication token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Unauthorized - invalid or missing authentication token
            type: UNAUTHORIZED
            family: AUTHENTICATION
            code: unauthorized
    '500':
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            message: Internal server error
            type: INTERNAL_SERVER_ERROR
            family: INTERNAL_SERVER_ERROR
            code: internal-server-error
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

Resolve component references against [OpenAPI](/docs/references/openapi.yaml). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
