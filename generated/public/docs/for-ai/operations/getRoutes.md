# getRoutes

GET `/routes`

Get Routes

Lists routes owned by the authenticated caller by default. Supplying an owner selects that owner's routes, subject to the caller's route-read permissions. The default page size is 10 and the maximum is 100. The returned route `id` is the persisted Port OS route identifier. For routes created through synchronization, use `associatedPluginRouteId` to match the stable plugin-owned or fixture route identity from the discovery payload.


## Authorization

```yaml
path: /routes
runtimePath: /routes
method: GET
operationId: getRoutes
security:
  - oauth2:
      - endpoint:read
  - bearerAuth: []
delegated: true
resourcePermissionRequired: true
```

## Complete operation contract

```yaml
path: /routes
get:
  tags:
    - Routes
  operationId: getRoutes
  summary: Get Routes
  description: >
    Lists routes owned by the authenticated caller by default. Supplying an owner selects that
    owner's routes, subject to the caller's route-read permissions. The default page size is 10 and
    the maximum is 100. The returned route `id` is the persisted Port OS route identifier. For
    routes created through synchronization, use `associatedPluginRouteId` to match the stable
    plugin-owned or fixture route identity from the discovery payload.
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/EnumerateRoutesResponse.json
          example:
            results: []
            paginationContext:
              nextToken: abc123
    '400':
      description: Invalid query parameter, including an invalid maxResults value or pagination token.
      content:
        application/json:
          schema:
            $ref: /docs/references/schemas/Error.json
          example:
            message: maxResults must be between 1 and 100; choose a value in that range and retry.
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
  parameters:
    - name: owner
      in: query
      description: >-
        Owner whose routes to list. Defaults to the authenticated caller when omitted. A different
        owner is permitted only for routes the caller can read.
      required: false
      schema:
        type: string
      examples:
        caller:
          value: ~caller
        specific-owner:
          value: port1/principals/user123
    - $ref: /docs/references/parameters/ExpandQuery.json
    - $ref: /docs/references/parameters/NextTokenQuery.json
    - $ref: /docs/references/parameters/MaxResultsQuery.json
  x-portos-delegated: true
  x-portos-resource-permission: true
  security:
    - oauth2:
        - endpoint:read
    - bearerAuth: []
```

## Linked components

- [ExpandQuery.json](/docs/references/parameters/ExpandQuery.json)
- [MaxResultsQuery.json](/docs/references/parameters/MaxResultsQuery.json)
- [NextTokenQuery.json](/docs/references/parameters/NextTokenQuery.json)
- [EnumerateRoutesResponse.json](/docs/references/schemas/EnumerateRoutesResponse.json)
- [Error.json](/docs/references/schemas/Error.json)

Follow only the linked components needed for this operation. [Schema directory](/docs/for-ai/schemas.md). [Auth guide](/docs/for-ai/guides/authentication-and-dcr.md).
